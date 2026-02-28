// =============================================
// GODTIDE: BASTION SEA - Travel Actions Slice
// =============================================
// Extracted from gameStore.ts: travelTo, resolveTravelChoice,
// advanceTravel, completeTravelArrival.

import { Resources, StoryScene } from '../types/game';
import { CombatEncounter } from '../types/combat';
import {
  selectTravelEvents,
  initializeTravel,
  advanceTravelEvent,
  resolveTravelChoice as resolveSeaTravelChoice,
} from '../systems/seaTravel';
import {
  getWardenThreatLevel,
  getWardenEncounterChance,
  generateWardenPatrolEvent,
  getFactionEncounterId,
  generateFactionEncounterEvent,
} from '../systems/wardenscale';
import { scaleEncounter } from '../data/combat/encounters';
import { ECONOMY, TRADE } from '../constants/balance';
import type { GameState } from './gameStore';

/** Subset of choice fields used by the unified effect pipeline. */
interface ChoiceEffectFields {
  effects?: Partial<Resources>;
  failEffects?: Partial<Resources>;
  resultText: string;
  loyaltyEffects?: Record<string, number>;
  reputationChange?: number;
  infamyChange?: number;
  bountyChange?: number;
  setFlags?: Record<string, boolean | number | string>;
}

interface ChoiceResolutionResult {
  succeeded: boolean;
  displayText: string;
  statChanges: string[];
}

export function createTravelActions(
  set: (partial: Partial<GameState> | ((s: GameState) => Partial<GameState>)) => void,
  get: () => GameState,
  sceneRegistry: Record<string, StoryScene>,
  combatRegistry: Record<string, CombatEncounter>,
  trackedTimeout: (fn: () => void, ms: number) => ReturnType<typeof setTimeout>,
  applyChoiceEffects: (
    choice: ChoiceEffectFields,
    ctx: { get: () => GameState; set: typeof set; scale: boolean },
  ) => ChoiceResolutionResult,
) {
  return {
    travelTo: (islandId: string): boolean => {
      const state = get();
      const fromIsland = state.islands.find((i) => i.id === state.currentIsland);
      const toIsland = state.islands.find((i) => i.id === islandId);

      if (!fromIsland || !toIsland) return false;

      const route = fromIsland.routes.find((r) => r.targetId === islandId);
      if (!route) {
        state.addNotification({
          type: 'story',
          title: 'NO ROUTE',
          message: `There is no direct sea route from ${fromIsland.name} to ${toIsland.name}.`,
        });
        return false;
      }

      // Navigator crew bonus: -1 travel day (min 1)
      // Ship speed bonus: each -1 on ship.speed reduces travel by 1 day
      const hasNavigator = state.crew.some(m => m.recruited && m.alive && !m.injured && m.assignment === 'navigator');
      const shipSpeedReduction = Math.abs(Math.min(0, state.ship.speed)); // ship.speed is negative = faster
      const travelDays = Math.max(1, route.travelDays - (hasNavigator ? 1 : 0) - shipSpeedReduction);

      // Territory travel discount (from upgrades like Sorren's Flat drydock, Anvil fleet command, etc.)
      const tBonuses = state.getTerritoryBonuses();
      const travelDiscountPct = Math.min(TRADE.TRAVEL_DISCOUNT_CAP, tBonuses.travelDiscount || 0);
      const supplyCost = Math.max(1, Math.floor(travelDays * ECONOMY.SUPPLY_PER_TRAVEL_DAY * (1 - travelDiscountPct / 100)));
      if (state.resources.supplies < supplyCost) {
        state.addNotification({
          type: 'story',
          title: 'INSUFFICIENT SUPPLIES',
          message: `Travel to ${toIsland.name} requires ${supplyCost} supplies (${travelDays} days at sea). You only have ${state.resources.supplies}.`,
        });
        return false;
      }

      if (travelDays < route.travelDays) {
        const reasons: string[] = [];
        if (hasNavigator) reasons.push('navigator shortcut');
        if (shipSpeedReduction > 0) reasons.push('ship upgrades');
        state.addNotification({
          type: 'crew',
          title: 'FASTER VOYAGE',
          message: `Travel reduced to ${travelDays} day${travelDays > 1 ? 's' : ''} (${reasons.join(' + ')}).`,
        });
      }

      // Deduct supplies
      set((s) => ({
        resources: { ...s.resources, supplies: s.resources.supplies - supplyCost },
        selectedIsland: null,
      }));

      // Select travel events for the voyage
      const events = selectTravelEvents(travelDays, {
        dangerLevel: route.dangerLevel,
        dayCount: state.dayCount,
        flags: state.flags,
        crew: state.crew,
        firedTravelEventIds: state.firedTravelEventIds,
      });

      // Wardensea escalation check - the navy hunts harder as you grow
      const conqueredCount = state.islands.filter((i) => i.conquered).length;
      const wardenThreat = getWardenThreatLevel(state.mc.bounty, conqueredCount);
      const wardenChance = getWardenEncounterChance(wardenThreat, route.dangerLevel);
      if (wardenThreat > 0 && Math.random() < wardenChance) {
        const wardenEvent = generateWardenPatrolEvent(wardenThreat);
        events.push(wardenEvent);
      }

      // Faction encounter check - Conquerors, Kolmari in Act 2/3
      const factionEncId = getFactionEncounterId(state.gamePhase, state.flags);
      if (factionEncId) {
        const factionEvent = generateFactionEncounterEvent(factionEncId);
        if (factionEvent) events.push(factionEvent);
      }

      if (events.length > 0) {
        // Start travel with events - show travel UI
        const travelState = initializeTravel(
          state.currentIsland,
          islandId,
          travelDays,
          route.dangerLevel,
          events,
        );
        set({ travelState });
      } else {
        // No events - instant travel (advance days, arrive)
        for (let i = 0; i < travelDays; i++) {
          get().advanceDay();
          // Stop advancing if game over or pending event triggered mid-voyage
          if (get().flags['game_over'] || get().pendingRandomEvent || get().pendingDayEvent) return true;
        }
        set({ currentIsland: islandId });
        get().completeTravelArrival(islandId);
      }

      return true;
    },

    resolveTravelChoice: (choiceId: string) => {
      const state = get();
      if (!state.travelState) return;

      const { newState, success } = resolveSeaTravelChoice(state.travelState, choiceId);
      const choice = state.travelState.currentEvent?.choices.find((c) => c.id === choiceId);
      if (!choice) return;

      // Unified effect pipeline (now with scaling, was missing before)
      // Note: success was already determined by seaTravel.resolveTravelChoice,
      // but applyChoiceEffects will re-roll. We override by passing the choice
      // without successChance so it defaults to succeeded=true, then gate on travel success.
      // Instead, we manually build the choice with pre-resolved success.
      const resolvedChoice: ChoiceEffectFields = {
        effects: success ? choice.effects : undefined,
        failEffects: undefined, // Already resolved
        resultText: choice.resultText,
        loyaltyEffects: success ? choice.loyaltyEffects : undefined,
        reputationChange: success ? choice.reputationChange : undefined,
        infamyChange: success ? choice.infamyChange : undefined,
        bountyChange: success ? choice.bountyChange : undefined,
        setFlags: success ? choice.setFlags : undefined,
      };
      // Apply fail effects as main effects if failed
      if (!success && choice.failEffects) {
        resolvedChoice.effects = choice.failEffects;
      }
      applyChoiceEffects(resolvedChoice, { get, set, scale: true });

      // Trigger combat if the choice specifies it (only on success for skill-gated choices)
      if (choice.triggerCombat && (success || choice.successChance === undefined)) {
        const encounter = combatRegistry[choice.triggerCombat];
        if (encounter) {
          const scaled = scaleEncounter(encounter, {
            dayCount: get().dayCount,
            bounty: get().mc.bounty,
            territoryCount: get().islands.filter(i => i.status === 'controlled').length,
            infamy: get().mc.infamy,
            reputation: get().mc.reputation,
          });
          get().startCombatEncounter(scaled);
        }
      }

      // Batch: event tracking + base effects + travel state in one set()
      {
        const batch: Record<string, unknown> = { travelState: newState };
        if (state.travelState.currentEvent) {
          batch.firedTravelEventIds = [...get().firedTravelEventIds, state.travelState.currentEvent.id];
        }
        if (state.travelState.currentEvent?.baseEffects) {
          const be = state.travelState.currentEvent.baseEffects;
          const r = { ...get().resources };
          if (be.sovereigns) r.sovereigns = Math.max(0, r.sovereigns + be.sovereigns);
          if (be.supplies) r.supplies = Math.max(0, r.supplies + be.supplies);
          if (be.materials) r.materials = Math.max(0, r.materials + be.materials);
          if (be.intelligence) r.intelligence = Math.max(0, r.intelligence + be.intelligence);
          batch.resources = r;
        }
        set(batch as Partial<ReturnType<typeof get>>);
      }
    },

    advanceTravel: () => {
      const state = get();
      if (!state.travelState) return;

      // Advance a day
      get().advanceDay();

      const newTravelState = advanceTravelEvent(state.travelState);

      if (newTravelState.complete) {
        // Travel complete - arrive at destination
        const destId = newTravelState.toIsland;
        // Advance remaining days if multi-day travel
        const remainingDays = newTravelState.totalDays - newTravelState.events.length;
        for (let i = 0; i < remainingDays; i++) {
          get().advanceDay();
          if (get().flags['game_over'] || get().pendingRandomEvent || get().pendingDayEvent) break;
        }
        set({ travelState: null, currentIsland: destId });
        get().completeTravelArrival(destId);
      } else {
        set({ travelState: newTravelState });
      }
    },

    completeTravelArrival: (islandId: string) => {
      const toIsland = get().islands.find((i) => i.id === islandId);
      if (!toIsland) return;

      // Check for exploration scene on first visit
      const exploreSceneId = `explore_${islandId}`;
      const exploreScene = sceneRegistry[exploreSceneId];
      const alreadyExplored = get().flags[`${islandId}_explored`];

      if (exploreScene && !alreadyExplored) {
        set({
          activePanel: 'story',
          currentScene: { ...exploreScene, currentBeat: 0 },
          isTyping: true,
        });
      } else {
        get().addNotification({
          type: 'story',
          title: `ARRIVED AT ${toIsland.name.toUpperCase()}`,
          message: `You've reached ${toIsland.name}. The crew is ashore.`,
        });
      }

      // Auto-save on arrival
      trackedTimeout(() => {
        if (!get().saveGame(0)) {
          // Autosave failed silently on travel arrival
        }
      }, 200);
    },
  };
}
