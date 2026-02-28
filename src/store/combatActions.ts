// =============================================
// GODTIDE: BASTION SEA - Combat Actions Slice
// =============================================
// Extracted from gameStore.ts: startCombat, startCombatEncounter,
// updateCombatState, endCombat.

import { CombatState, CombatEncounter } from '../types/combat';
import { StoryScene } from '../types/game';
import { initializeCombat } from '../systems/combat';
import { scaleEncounter } from '../data/combat/encounters';
import { calculateTerritoryBonuses } from '../systems/territory';
import { getShipBonuses } from '../systems/shipUpgrades';
import { stingerManager } from '../systems/stingers';
import { calculateCombatDominionXP, DominionGainResult } from '../systems/dominion';
import { TERRITORY, DEFEAT, LIMITS } from '../constants/balance';
import type { GameState } from './gameStore';

export function createCombatActions(
  set: (partial: Partial<GameState> | ((s: GameState) => Partial<GameState>)) => void,
  get: () => GameState,
  combatRegistry: Record<string, CombatEncounter>,
  sceneRegistry: Record<string, StoryScene>,
  capArray: <T>(arr: T[], max: number) => T[],
  trackedTimeout: (fn: () => void, ms: number) => ReturnType<typeof setTimeout>,
) {
  return {
    startCombat: (encounterId: string) => {
      const encounter = combatRegistry[encounterId];
      if (!encounter) {
        get().addNotification({
          type: 'story',
          title: 'COMBAT NOT AVAILABLE',
          message: 'This combat encounter is not yet implemented.',
        });
        return;
      }
      get().startCombatEncounter(encounter);
    },

    startCombatEncounter: (encounter: CombatEncounter) => {
      const state = get();
      // Apply difficulty scaling based on game state
      const controlledIslands = state.islands.filter((i) => i.status === 'controlled');
      const scaledEncounter = scaleEncounter(encounter, {
        dayCount: state.dayCount,
        bounty: state.mc.bounty,
        territoryCount: controlledIslands.length,
        infamy: state.mc.infamy,
        reputation: state.mc.reputation,
      });
      // Calculate territory combat bonuses (conquered islands buff Karyudon)
      const territoryBonuses = controlledIslands.length > 0
        ? calculateTerritoryBonuses(controlledIslands, state.territoryStates).combatBonuses
        : undefined;
      const shipCombatBonuses = getShipBonuses(state.ship);
      // Detect if combat is happening at sea (during travel)
      const isAtSea = !!state.travelState;
      const combatState = initializeCombat(
        scaledEncounter, state.mc, state.crew, territoryBonuses, state.equipment,
        { combatDefense: shipCombatBonuses.combatDefense, combatAttack: shipCombatBonuses.combatAttack },
        isAtSea,
      );
      // Boss intro stinger: play before combat panel renders
      const isBoss = scaledEncounter.enemies.some((e) => e.bossPhases && e.bossPhases.length > 0);
      if (isBoss) {
        stingerManager.play('boss_intro');
      }

      set({
        combatState,
        activePanel: 'combat',
      });
    },

    updateCombatState: (newCombatState: CombatState) => {
      set({ combatState: newCombatState });
    },

    endCombat: (result: 'victory' | 'defeat') => {
      const state = get();
      if (!state.combatState) return;

      const encounter = state.combatState.encounter;

      if (result === 'victory') {
        // Track combat victories for Korvaan requirements
        const currentVictories = (state.flags['combat_victories'] as number) || 0;
        state.setFlag('combat_victories', currentVictories + 1);

        // First combat victory objective
        if (!state.flags['survived_pirate_raid']) {
          state.setFlag('survived_pirate_raid', true);
        }

        // Apply victory rewards (re-read state each iteration so same-type rewards stack correctly)
        encounter.rewards.forEach((reward) => {
          const fresh = get();
          switch (reward.type) {
            case 'sovereigns':
              fresh.updateResources({
                sovereigns: fresh.resources.sovereigns + (reward.value as number),
              });
              break;
            case 'supplies':
              fresh.updateResources({
                supplies: fresh.resources.supplies + (reward.value as number),
              });
              break;
            case 'materials':
              fresh.updateResources({
                materials: fresh.resources.materials + (reward.value as number),
              });
              break;
            case 'intelligence':
              fresh.updateResources({
                intelligence: fresh.resources.intelligence + (reward.value as number),
              });
              break;
            case 'reputation':
              fresh.updateMC({
                reputation: Math.max(0, Math.min(TERRITORY.REPUTATION_MAX, fresh.mc.reputation + (reward.value as number))),
              });
              break;
            case 'infamy':
              fresh.updateMC({
                infamy: Math.max(0, Math.min(TERRITORY.REPUTATION_MAX, fresh.mc.infamy + (reward.value as number))),
              });
              break;
            case 'bounty':
              fresh.addBounty(reward.value as number);
              break;
            case 'flag':
              if (reward.target) fresh.setFlag(reward.target, reward.value);
              break;
          }
        });

        // Apply victory effects
        if (encounter.onVictoryEffects) {
          state.applyEffects(encounter.onVictoryEffects);
        }

        // ============================
        // DOMINION XP FROM COMBAT
        // ============================
        const combatState = state.combatState;
        if (combatState) {
          // Determine highest enemy tier
          const tierPriority = ['fodder', 'soldier', 'elite', 'commander', 'prime'];
          const highestTier = encounter.enemies.reduce((best, e) => {
            const idx = tierPriority.indexOf(e.tier);
            return idx > tierPriority.indexOf(best) ? e.tier : best;
          }, 'fodder');

          const dmgTaken = combatState.player.maxHp - combatState.player.hp;
          const xpAmounts = calculateCombatDominionXP(
            highestTier,
            combatState.round,
            dmgTaken,
            combatState.player.maxHp,
            combatState.kingMeter,
          );

          // Expression Pressure: dominant expressions gain XP slower, lagging ones gain faster.
          // This creates soft zero-sum pressure without hard penalties.
          const mc = state.mc;
          const tiers = ['flicker', 'tempered', 'forged', 'prime', 'conqueror'];
          const ironPow = tiers.indexOf(mc.dominion.iron.tier) * 100 + mc.dominion.iron.level;
          const sightPow = tiers.indexOf(mc.dominion.sight.tier) * 100 + mc.dominion.sight.level;
          const kingPow = tiers.indexOf(mc.dominion.king.tier) * 100 + mc.dominion.king.level;
          const avg = (ironPow + sightPow + kingPow) / 3;

          // Scale: each point above average reduces XP by 0.5%, each point below adds 0.5%. Clamped 50%-150%.
          const pressureScale = (power: number) => Math.max(0.5, Math.min(1.5, 1 - (power - avg) * 0.005));
          xpAmounts.iron = Math.max(1, Math.round(xpAmounts.iron * pressureScale(ironPow)));
          xpAmounts.sight = Math.max(1, Math.round(xpAmounts.sight * pressureScale(sightPow)));
          xpAmounts.king = Math.max(1, Math.round(xpAmounts.king * pressureScale(kingPow)));

          const results: DominionGainResult[] = [];
          const ironResult = state.trainDominion('iron', xpAmounts.iron);
          if (ironResult) results.push(ironResult);
          const sightResult = state.trainDominion('sight', xpAmounts.sight);
          if (sightResult) results.push(sightResult);
          const kingResult = state.trainDominion('king', xpAmounts.king);
          if (kingResult) results.push(kingResult);

          // Show combined XP notification
          const xpParts = results
            .filter((r) => r.levelsGained > 0)
            .map((r) => `${r.expression.charAt(0).toUpperCase() + r.expression.slice(1)} +${r.levelsGained}`);
          if (xpParts.length > 0) {
            state.addNotification({
              type: 'conqueror',
              title: 'DOMINION GROWTH',
              message: `Combat sharpens you. ${xpParts.join(', ')}.`,
            });
          }
        }

        // ============================
        // CREW INJURY ROLL (Victory)
        // ============================
        // After tough fights (elite+ enemies), 20% chance per crew to be injured
        const highestEnemyTier = encounter.enemies.reduce((best, e) => {
          const tiers = ['fodder', 'soldier', 'elite', 'commander', 'prime', 'boss'];
          return tiers.indexOf(e.tier) > tiers.indexOf(best) ? e.tier : best;
        }, 'fodder' as string);
        const isToughFight = ['elite', 'commander', 'prime', 'boss'].includes(highestEnemyTier);
        if (isToughFight) {
          const injuryChance = highestEnemyTier === 'boss' ? DEFEAT.VICTORY_INJURY_BOSS : highestEnemyTier === 'prime' ? DEFEAT.VICTORY_INJURY_PRIME : DEFEAT.VICTORY_INJURY_ELITE;
          const healDays = state.ship.upgrades.includes('medical_bay') ? DEFEAT.HEAL_DAYS_WITH_MEDBAY : DEFEAT.HEAL_DAYS_WITHOUT_MEDBAY;
          const eligibleCrew = state.crew.filter((m) => m.recruited && m.alive && !m.injured);
          const injuredNames: string[] = [];
          eligibleCrew.forEach((m) => {
            if (Math.random() < injuryChance) {
              const healDay = state.dayCount + healDays;
              state.updateCrewMember(m.id, { injured: true, injuredUntilDay: healDay });
              injuredNames.push(`${m.name.split(' ')[0]} (Day ${healDay})`);
            }
          });
          if (injuredNames.length > 0) {
            state.addNotification({
              type: 'crew',
              title: 'CREW INJURIES',
              message: `The fight took its toll. Injured: ${injuredNames.join(', ')}.`,
            });
          }
        }
      } else {
        // ============================
        // DEFEAT CONSEQUENCES - Real setbacks
        // ============================
        const consequences: string[] = [];

        // 1. Resource loss - always lose some supplies and sovereigns
        const suppliesLost = Math.min(state.resources.supplies, Math.floor(state.resources.supplies * DEFEAT.SUPPLY_LOSS_PERCENT) + DEFEAT.SUPPLY_LOSS_FLAT);
        const sovereignsLost = Math.min(state.resources.sovereigns, Math.floor(state.resources.sovereigns * DEFEAT.SOVEREIGN_LOSS_PERCENT) + DEFEAT.SOVEREIGN_LOSS_FLAT);
        state.updateResources({
          supplies: Math.max(0, state.resources.supplies - suppliesLost),
          sovereigns: Math.max(0, state.resources.sovereigns - sovereignsLost),
        });
        if (suppliesLost > 0) consequences.push(`-${suppliesLost} supplies (lost in retreat)`);
        if (sovereignsLost > 0) consequences.push(`-${sovereignsLost}\u2B21 sovereigns (dropped/looted)`);

        // 2. Crew loyalty hit - defeat shakes confidence
        const loyaltyHit = DEFEAT.LOYALTY_HIT;
        state.crew.filter((m) => m.recruited && m.alive).forEach((m) => {
          state.adjustLoyalty(m.id, loyaltyHit);
        });
        consequences.push(`Crew loyalty ${loyaltyHit} (shaken confidence)`);

        // 3. Random crew injury - chance a crew member takes a wound
        const recruitedCrew = state.crew.filter((m) => m.recruited && m.alive && !m.injured);
        if (recruitedCrew.length > 0 && Math.random() < DEFEAT.INJURY_CHANCE) {
          const injuredMember = recruitedCrew[Math.floor(Math.random() * recruitedCrew.length)];
          const defeatHealDays = state.ship.upgrades.includes('medical_bay') ? DEFEAT.HEAL_DAYS_WITH_MEDBAY : DEFEAT.HEAL_DAYS_WITHOUT_MEDBAY;
          const healDay = state.dayCount + defeatHealDays;
          state.updateCrewMember(injuredMember.id, { injured: true, injuredUntilDay: healDay });
          state.adjustLoyalty(injuredMember.id, DEFEAT.INJURED_LOYALTY_HIT);
          consequences.push(`${injuredMember.name} was injured in the retreat (recovers Day ${healDay})`);
        }

        // 4. Reputation loss - getting beaten hurts your name
        if (state.mc.reputation > 0) {
          const repLoss = Math.min(state.mc.reputation, DEFEAT.REPUTATION_LOSS);
          state.updateMC({ reputation: state.mc.reputation - repLoss });
          consequences.push(`-${repLoss} reputation (word spreads)`);
        }

        // 5. Infamy can go UP from a fight (they know you're dangerous, even when losing)
        if (state.combatState && state.combatState.round > DEFEAT.INFAMY_GAIN_MIN_ROUNDS) {
          state.updateMC({ infamy: state.mc.infamy + DEFEAT.INFAMY_GAIN });
          consequences.push(`+${DEFEAT.INFAMY_GAIN} infamy (you fought hard)`);
        }

        // 6. Recovery time - forced day advance
        // Apply custom defeat effects
        if (encounter.onDefeatEffects) {
          state.applyEffects(encounter.onDefeatEffects);
        }

        // Show defeat summary
        state.addNotification({
          type: 'story',
          title: '\u{1F480} DEFEATED',
          message: consequences.join(' \u2022 '),
        });

        // Retreat consequence
        if (encounter.defeatConsequence === 'retreat') {
          state.addNotification({
            type: 'story',
            title: 'FORCED RETREAT',
            message: 'The crew drags you back to the ship. Danzai still in hand. This isn\'t over.',
          });
        }
      }

      // Clear combat state and any lingering travel state (combat from travel choices)
      const hadTravelState = !!get().travelState;

      // If combat was triggered mid-travel, complete the voyage
      if (hadTravelState) {
        set({ combatState: null, travelState: null });
        const tState = state.travelState;
        if (tState) {
          const destId = tState.toIsland;
          // Advance remaining uneventful days
          const remainingDays = tState.totalDays - tState.events.length;
          for (let i = 0; i < remainingDays; i++) {
            get().advanceDay();
            if (get().flags['game_over']) return;
          }
          set({ currentIsland: destId });
          get().completeTravelArrival(destId);
        }
        return;
      }

      // If there's an active story scene, return to it and advance past the combat beat
      // CRITICAL: Merge combatState clearing with panel transition in ONE atomic set()
      // to prevent race condition with AnimatePresence exit animations
      const currentScene = get().currentScene;
      if (currentScene) {
        // Advance the beat inline (avoid intermediate render with stale beat)
        const nextBeat = currentScene.currentBeat + 1;
        if (nextBeat >= currentScene.beats.length) {
          // Scene complete - apply effects first, then chain to next scene or clear
          const history = capArray([...get().storyHistory, currentScene.id], LIMITS.STORY_HISTORY_MAX);
          if (currentScene.onComplete) {
            get().applyEffects(currentScene.onComplete);
          }
          if (currentScene.nextSceneId && sceneRegistry[currentScene.nextSceneId]) {
            const nextScene = sceneRegistry[currentScene.nextSceneId];
            set({
              combatState: null,
              activePanel: 'story',
              currentScene: { ...nextScene, currentBeat: 0 },
              isTyping: true,
              storyHistory: history,
            });
          } else {
            set({
              combatState: null,
              activePanel: 'map',
              currentScene: null,
              isTyping: false,
              storyHistory: history,
            });
          }
        } else {
          // Advance to the next beat in a single atomic update
          set({
            combatState: null,
            activePanel: 'story',
            currentScene: { ...currentScene, currentBeat: nextBeat },
            isTyping: true,
          });
        }
      } else {
        // No active story scene - return to map (not 'story', which would show blank panel)
        set({ combatState: null, activePanel: 'map' });
      }

      // Auto-save after combat resolves
      trackedTimeout(() => {
        if (!get().saveGame(0)) {
          // Autosave failed silently after combat
        }
      }, 200);
    },
  };
}
