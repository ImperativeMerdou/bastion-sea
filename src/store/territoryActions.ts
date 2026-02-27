// =============================================
// GODTIDE: BASTION SEA - Territory Actions Slice
// =============================================
// Extracted from gameStore.ts: conquerIsland, beginConquest,
// startTerritoryUpgrade, dispatchCrewToIsland, processTerritoryDay,
// getTerritoryBonuses, boostTerritoryMorale, setIslandRole, runCounterEspionage.

import { ConquestApproach, Resources, StoryScene } from '../types/game';
import type { IslandRole } from '../types/game';
import {
  calculateTerritoryBonuses,
  processTerritoryMorale,
  processRebellions,
  territoryUpgrades,
  dispatchCrewToTerritory,
} from '../systems/territory';
import { audioManager } from '../systems/audio';
import { stingerManager } from '../systems/stingers';
import { ECONOMY, TERRITORY, CONQUEST, THREAT, MISC, FORTIFICATION } from '../constants/balance';
import type { GameState } from './gameStore';

export function createTerritoryActions(
  set: (partial: Partial<GameState> | ((s: GameState) => Partial<GameState>)) => void,
  get: () => GameState,
  sceneRegistry: Record<string, StoryScene>,
) {
  return {
    conquerIsland: (id: string, approach: ConquestApproach) => {
      // Conquest approach determines starting territory conditions
      // This is the mechanical payoff for the player's strategic choice
      let morale: number;
      let defenseRating: number;
      let bonusResources: Partial<Resources> = {};
      let bonusBounty = 0;
      let bonusReputation = 0;
      let bonusInfamy = 0;

      switch (approach) {
        case 'force':
          // Conquered by violence - they fear you, but the walls are intact
          morale = CONQUEST.FORCE_MORALE;
          defenseRating = CONQUEST.FORCE_DEFENSE;
          bonusBounty = 5000000;
          bonusInfamy = CONQUEST.FORCE_INFAMY;
          break;
        case 'negotiation':
          // Talked them into it - high morale, minimal fortification
          morale = CONQUEST.NEGOTIATION_MORALE;
          defenseRating = CONQUEST.NEGOTIATION_DEFENSE;
          bonusReputation = CONQUEST.NEGOTIATION_REPUTATION;
          bonusResources = { intelligence: CONQUEST.NEGOTIATION_INTEL };
          break;
        case 'economic':
          // Bought them out - moderate everything, immediate income
          morale = CONQUEST.ECONOMIC_MORALE;
          defenseRating = CONQUEST.ECONOMIC_DEFENSE;
          bonusResources = { sovereigns: CONQUEST.ECONOMIC_SOVEREIGNS, materials: CONQUEST.ECONOMIC_MATERIALS };
          break;
        case 'subversion':
          // Infiltrated from within - they don't fully trust you, but you know everything
          morale = CONQUEST.SUBVERSION_MORALE;
          defenseRating = CONQUEST.SUBVERSION_DEFENSE;
          bonusResources = { intelligence: CONQUEST.SUBVERSION_INTEL };
          bonusInfamy = CONQUEST.SUBVERSION_INFAMY;
          break;
        default:
          morale = CONQUEST.DEFAULT_MORALE;
          defenseRating = CONQUEST.DEFAULT_DEFENSE;
      }

      // Reputation/Infamy modify conquest outcomes
      const rep = get().mc.reputation;
      const inf = get().mc.infamy;
      // High reputation boosts starting morale (people welcome you)
      if (rep > 0 && approach !== 'force') {
        morale = Math.min(TERRITORY.MORALE_MAX, morale + Math.floor(rep / CONQUEST.REP_MORALE_DIVISOR));
      }
      // High infamy boosts morale for force (intimidation is effective) but lowers others
      if (inf > CONQUEST.INFAMY_FORCE_THRESHOLD && approach === 'force') {
        morale = Math.min(TERRITORY.MORALE_MAX, morale + Math.floor((inf - CONQUEST.INFAMY_FORCE_THRESHOLD) / CONQUEST.INFAMY_FORCE_DIVISOR));
      } else if (inf > CONQUEST.INFAMY_PENALTY_THRESHOLD && approach !== 'force') {
        morale = Math.max(CONQUEST.INFAMY_MORALE_FLOOR, morale - Math.floor((inf - CONQUEST.INFAMY_PENALTY_THRESHOLD) / CONQUEST.INFAMY_PENALTY_DIVISOR));
      }
      // High reputation reduces bounty increase from conquest
      if (rep > CONQUEST.REP_BOUNTY_THRESHOLD) {
        bonusBounty = Math.floor(bonusBounty * (1 - Math.min(rep - CONQUEST.REP_BOUNTY_THRESHOLD, CONQUEST.REP_BOUNTY_MAX_EFFECT) / 100 * CONQUEST.REP_BOUNTY_MULTIPLIER));
      }

      // Guard: don't re-conquer an already controlled island (would reset upgrades)
      const existing = get().islands.find((i) => i.id === id);
      if (existing?.status === 'controlled') return;

      set((state) => ({
        islands: state.islands.map((i) =>
          i.id === id
            ? { ...i, status: 'controlled', conquered: true, conquestApproach: approach, controller: 'Karyudon' }
            : i
        ),
        mc: {
          ...state.mc,
          territory: state.mc.territory.includes(id) ? state.mc.territory : [...state.mc.territory, id],
          bounty: state.mc.bounty + bonusBounty,
          reputation: Math.min(TERRITORY.REPUTATION_MAX, state.mc.reputation + bonusReputation),
          infamy: Math.min(TERRITORY.REPUTATION_MAX, state.mc.infamy + bonusInfamy),
        },
        resources: {
          sovereigns: state.resources.sovereigns + (bonusResources.sovereigns || 0),
          supplies: state.resources.supplies + (bonusResources.supplies || 0),
          materials: state.resources.materials + (bonusResources.materials || 0),
          intelligence: state.resources.intelligence + (bonusResources.intelligence || 0),
        },
        territoryStates: {
          ...state.territoryStates,
          [id]: {
            islandId: id,
            controlledSince: state.dayCount,
            upgrades: [],
            morale,
            defenseRating,
            underAttack: false,
            islandRole: 'unassigned' as const,
            roleChangedDay: 0,
          },
        },
      }));

      // Track that the player has conquered at least one territory (for territory_lost game over)
      get().setFlag('has_conquered_territory', true);

      // Musical stinger: island conquered
      stingerManager.play('conquest_victory');
    },

    beginConquest: (islandId: string) => {
      // Look up island-specific conquest scene, or use a generic approach scene
      const conquestSceneId = `conquest_${islandId}`;
      const scene = sceneRegistry[conquestSceneId];

      if (scene) {
        // Island has a dedicated conquest scene
        set({
          activePanel: 'story',
          selectedIsland: null,
          currentScene: { ...scene, currentBeat: 0 },
          isTyping: true,
        });
      } else {
        // No dedicated scene -- generic conquest with a default approach
        const island = get().islands.find((i) => i.id === islandId);
        const islandName = island?.name || islandId;
        const approach = (get().flags['conquest_approach'] as string as ConquestApproach) || 'force';

        get().conquerIsland(islandId, approach);

        get().addNotification({
          type: 'story',
          title: 'ISLAND SECURED',
          message: `Your crew moves in to establish control over ${islandName}. Resistance crumbles. The flag goes up.`,
        });

        set({ activePanel: 'map' });
      }
    },

    startTerritoryUpgrade: (islandId: string, upgradeId: string): boolean => {
      const state = get();
      const upgrades = territoryUpgrades[islandId];
      if (!upgrades) return false;

      const upgrade = upgrades.find((u) => u.id === upgradeId);
      if (!upgrade) return false;

      const tState = state.territoryStates[islandId];
      if (!tState) return false;

      // Check if already upgrading
      if (tState.upgradeInProgress) return false;

      // Check prereqs
      if (upgrade.requires && !upgrade.requires.every((r) => tState.upgrades.includes(r))) {
        return false;
      }

      // Check if already completed
      if (tState.upgrades.includes(upgradeId)) return false;

      // Check cost
      const canAfford = Object.entries(upgrade.cost).every(
        ([key, value]) => state.resources[key as keyof Resources] >= (value as number)
      );
      if (!canAfford) return false;

      // Deduct cost
      const newResources = { ...state.resources };
      Object.entries(upgrade.cost).forEach(([key, value]) => {
        newResources[key as keyof Resources] = Math.max(0, newResources[key as keyof Resources] - (value as number));
      });

      set({
        resources: newResources,
        territoryStates: {
          ...state.territoryStates,
          [islandId]: {
            ...tState,
            upgradeInProgress: {
              upgradeId,
              completionDay: state.dayCount + upgrade.daysToComplete,
            },
          },
        },
      });

      state.addNotification({
        type: 'story',
        title: `🏗️ UPGRADE STARTED`,
        message: `${upgrade.name} at ${state.islands.find((i) => i.id === islandId)?.name || islandId}. Completes in ${upgrade.daysToComplete} days.`,
      });

      return true;
    },

    dispatchCrewToIsland: (islandId: string, crewId: string): boolean => {
      const state = get();
      const tState = state.territoryStates[islandId];
      if (!tState) return false;

      // Can't dispatch if already have crew dispatched here
      if (tState.crewDispatched && state.dayCount < tState.crewDispatched.untilDay) return false;

      // Check crew member exists, is recruited, and not injured
      const crewMember = state.crew.find((m) => m.id === crewId && m.recruited && m.alive && !m.injured);
      if (!crewMember) return false;

      // Check not already dispatched elsewhere
      const alreadyDispatched = Object.values(state.territoryStates).some(
        (ts) => ts.crewDispatched?.crewId === crewId && state.dayCount < ts.crewDispatched.untilDay
      );
      if (alreadyDispatched) return false;

      // Cost: supplies
      if (state.resources.supplies < ECONOMY.DISPATCH_COST) return false;

      const islandName = state.islands.find((i) => i.id === islandId)?.name || islandId;

      set({
        resources: { ...state.resources, supplies: state.resources.supplies - ECONOMY.DISPATCH_COST },
        territoryStates: {
          ...state.territoryStates,
          [islandId]: dispatchCrewToTerritory(tState, crewId, state.dayCount),
        },
      });

      state.addNotification({
        type: 'story',
        title: `🤝 CREW DISPATCHED`,
        message: `${crewMember.name} sent to ${islandName} for ${MISC.DISPATCH_DURATION} days. +${MISC.DISPATCH_MORALE_PER_DAY} morale/day. Cost: ${ECONOMY.DISPATCH_COST} supplies.`,
      });

      return true;
    },

    processTerritoryDay: () => {
      const state = get();
      const newTerritoryStates = { ...state.territoryStates };
      const supplyDeficit = state.resources.supplies <= 0;
      const controlledCount = Object.keys(newTerritoryStates).length;

      Object.keys(newTerritoryStates).forEach((islandId) => {
        let tState = { ...newTerritoryStates[islandId] };

        // Check upgrade completion
        if (tState.upgradeInProgress && state.dayCount >= tState.upgradeInProgress.completionDay) {
          const completedId = tState.upgradeInProgress.upgradeId;
          tState.upgrades = [...tState.upgrades, completedId];
          tState.upgradeInProgress = undefined;
          tState.defenseRating = Math.min(TERRITORY.MORALE_MAX, tState.defenseRating + 5);

          const upgrades = territoryUpgrades[islandId] || [];
          const completed = upgrades.find((u) => u.id === completedId);
          if (completed) {
            audioManager.playSfx('upgrade_complete');
            state.addNotification({
              type: 'story',
              title: `✅ UPGRADE COMPLETE`,
              message: `${completed.name} is now operational! Bonuses active.`,
            });
          }

          // Track first upgrade for objective
          if (!state.flags['first_upgrade_complete']) {
            state.setFlag('first_upgrade_complete', true);
          }
        }

        // Process morale
        const playerPresent = state.currentIsland === islandId;
        tState = processTerritoryMorale(tState, playerPresent, supplyDeficit, state.dayCount, state.mc.reputation, state.mc.infamy, state.threatState.level, controlledCount);

        newTerritoryStates[islandId] = tState;
      });

      set({ territoryStates: newTerritoryStates });

      // --- Rebellion Processing ---
      // Check for morale-based income warnings and territory loss
      const rebelledIslands = processRebellions(get().territoryStates);
      rebelledIslands.forEach((islandId) => {
        const island = state.islands.find((i) => i.id === islandId);
        const islandName = island?.name || islandId;

        // Lose control of the island
        set((s) => ({
          islands: s.islands.map((i) =>
            i.id === islandId
              ? { ...i, status: 'hostile' as const, conquered: false, controller: 'Rebel Forces' }
              : i
          ),
          mc: {
            ...s.mc,
            territory: s.mc.territory.filter((t) => t !== islandId),
          },
          territoryStates: Object.fromEntries(
            Object.entries(s.territoryStates).filter(([tid]) => tid !== islandId)
          ),
        }));

        // Remove trade routes involving the lost island
        set((s) => ({
          tradeRoutes: s.tradeRoutes.filter(
            r => r.fromIsland !== islandId && r.toIsland !== islandId
          ),
        }));

        get().addNotification({
          type: 'wardensea',
          title: `REBELLION - ${islandName.toUpperCase()} LOST`,
          message: `The people of ${islandName} have risen against your rule. Your garrison was overrun. The island is no longer under your control.`,
        });

        // Bounty increase - the world notices when your empire cracks
        get().addBounty(2000000);

        // Track rebellion for grimoire broadcasts and world reactions
        get().setFlag('territory_recently_lost', true);
        get().setFlag('last_rebellion_island', islandName);
      });

      // Warn about reduced income from low-morale territories
      const currentTStates = get().territoryStates;
      Object.entries(currentTStates).forEach(([islandId, tState]) => {
        const island = state.islands.find((i) => i.id === islandId);
        if (tState.morale > 0 && tState.morale < MISC.CIVIL_UNREST_THRESHOLD) {
          get().addNotification({
            type: 'crew',
            title: `${(island?.name || islandId).toUpperCase()} - CIVIL UNREST`,
            message: `Morale at ${tState.morale}. Income suspended. One more drop and they revolt.`,
          });
        }
      });
    },

    getTerritoryBonuses: () => {
      const state = get();
      const controlledIslands = state.islands.filter((i) => i.status === 'controlled');
      return calculateTerritoryBonuses(controlledIslands, state.territoryStates);
    },

    boostTerritoryMorale: (islandId: string, moraleBoost: number, defenseBoost: number = 0) => {
      const existing = get().territoryStates[islandId];
      if (!existing) return; // No territory state - nothing to boost
      set((state) => ({
        territoryStates: {
          ...state.territoryStates,
          [islandId]: {
            ...state.territoryStates[islandId],
            morale: Math.max(0, Math.min(TERRITORY.MORALE_MAX, state.territoryStates[islandId].morale + moraleBoost)),
            defenseRating: Math.max(0, Math.min(100, state.territoryStates[islandId].defenseRating + defenseBoost)),
          },
        },
      }));
    },

    fortifyTerritory: (islandId: string): boolean => {
      const state = get();
      const tState = state.territoryStates[islandId];
      if (!tState) return false;
      if (state.resources.sovereigns < FORTIFICATION.COST) return false;

      // Apply defense boost + morale boost
      set((s) => ({
        resources: { ...s.resources, sovereigns: Math.max(0, s.resources.sovereigns - FORTIFICATION.COST) },
        territoryStates: {
          ...s.territoryStates,
          [islandId]: {
            ...s.territoryStates[islandId],
            defenseRating: Math.min(100, s.territoryStates[islandId].defenseRating + FORTIFICATION.DEFENSE_BOOST),
            morale: Math.min(TERRITORY.MORALE_MAX, s.territoryStates[islandId].morale + 5),
          },
        },
      }));

      const island = state.islands.find(i => i.id === islandId);
      state.addNotification({
        type: 'story',
        title: `FORTIFICATION - ${(island?.name || islandId).toUpperCase()}`,
        message: `Spent ${FORTIFICATION.COST} sovereigns reinforcing ${island?.name || islandId}. Defense +${FORTIFICATION.DEFENSE_BOOST}, morale +5.`,
      });

      audioManager.playSfx('purchase');
      return true;
    },

    setIslandRole: (islandId: string, role: IslandRole): boolean => {
      const state = get();
      const tState = state.territoryStates[islandId];
      if (!tState) return false;

      // Role change cooldown
      if (state.dayCount - tState.roleChangedDay < MISC.ROLE_CHANGE_COOLDOWN) return false;

      set((s) => ({
        territoryStates: {
          ...s.territoryStates,
          [islandId]: {
            ...s.territoryStates[islandId],
            islandRole: role,
            roleChangedDay: s.dayCount,
          },
        },
      }));
      return true;
    },

    // --- Counter-Espionage (intelligence sink) ---
    runCounterEspionage: (): boolean => {
      const state = get();
      if (state.resources.intelligence < THREAT.COUNTER_ESPIONAGE_INTEL_COST) return false;

      // Spend intelligence
      state.updateResources({
        intelligence: state.resources.intelligence - THREAT.COUNTER_ESPIONAGE_INTEL_COST,
      });

      // Reduce threat level
      const newLevel = Math.max(0, state.threatState.level - THREAT.COUNTER_ESPIONAGE_THREAT_REDUCTION);

      // Chance to clear one spy operation
      let clearedSpy = false;
      let newSpyOps = state.threatState.spyOperations;
      if (newSpyOps > 0 && Math.random() < THREAT.COUNTER_ESPIONAGE_SPY_CLEAR_CHANCE) {
        newSpyOps--;
        clearedSpy = true;
      }

      set({
        threatState: {
          ...state.threatState,
          level: newLevel,
          spyOperations: newSpyOps,
        },
      });

      const parts = [`Threat reduced by ${THREAT.COUNTER_ESPIONAGE_THREAT_REDUCTION}`];
      if (clearedSpy) parts.push('spy operation neutralized');
      state.addNotification({
        type: 'wardensea',
        title: 'COUNTER-ESPIONAGE',
        message: `Your intelligence network strikes back. ${parts.join(', ')}.`,
      });

      return true;
    },
  };
}
