// =============================================
// GODTIDE: BASTION SEA - Save System
// =============================================
// Extracted save/load actions from gameStore.ts
// =============================================

import type { StoryScene } from '../types/game';
import { DEFAULT_THREAT_STATE } from '../systems/threat';
import { DEFAULT_SHIP } from '../systems/shipUpgrades';
import type { GameState } from './gameStore';

export function createSaveActions(
  set: (partial: Partial<GameState> | ((s: GameState) => Partial<GameState>)) => void,
  get: () => GameState,
  sceneRegistry: Record<string, StoryScene>,
  pendingTimeouts: Set<ReturnType<typeof setTimeout>>,
) {
  return {
    saveGame: (slot = 0): boolean => {
      try {
        const state = get();
        const saveData = {
          version: 2,
          timestamp: Date.now(),
          // Core state
          gamePhase: state.gamePhase,
          dayCount: state.dayCount,
          flags: state.flags,
          firedReactionIds: state.firedReactionIds,
          firedEventIds: state.firedEventIds,
          firedDayEventIds: state.firedDayEventIds,
          firedTravelEventIds: state.firedTravelEventIds,
          grimoireBroadcastDays: state.grimoireBroadcastDays,
          playerProfile: state.playerProfile,
          currentIsland: state.currentIsland,
          activePanel: state.activePanel,
          // Characters
          mc: state.mc,
          crew: state.crew,
          // World
          islands: state.islands,
          resources: state.resources,
          // Territory
          territoryStates: state.territoryStates,
          // Threat
          threatState: state.threatState,
          // Story - save current scene ID and beat index (not full scene object)
          currentSceneId: state.currentScene?.id || null,
          currentBeat: state.currentScene?.currentBeat || 0,
          storyHistory: state.storyHistory,
          // UI state
          selectedIsland: state.selectedIsland,
          typingSpeed: state.typingSpeed,
          typingSpeedPreset: state.typingSpeedPreset,
          // Equipment
          equipment: state.equipment,
          inventory: state.inventory,
          // Ship
          ship: state.ship,
          // Trade Routes
          tradeRoutes: state.tradeRoutes,
          // Crew Identity
          crewIdentity: state.crewIdentity,
          // Notifications (newest 20 only - notifications are prepended, so slice from front)
          notifications: state.notifications.slice(0, 20),
        };

        const key = slot === 0 ? 'godtide_autosave' : `godtide_save_${slot}`;
        localStorage.setItem(key, JSON.stringify(saveData));

        if (slot !== 0) {
          state.addNotification({
            type: 'story',
            title: 'GAME SAVED',
            message: `Progress saved to slot ${slot}. Day ${state.dayCount}.`,
          });
        }

        return true;
      } catch (e) {
        console.error('Save failed:', e);
        get().addNotification({ type: 'story', title: 'SAVE FAILED', message: 'Unable to save game. Storage may be full. Try deleting old saves.' });
        return false;
      }
    },

    loadGame: (slot = 0): boolean => {
      // Cancel any pending timeouts from the previous session to prevent stale triggers
      pendingTimeouts.forEach(id => clearTimeout(id));
      pendingTimeouts.clear();

      try {
        const key = slot === 0 ? 'godtide_autosave' : `godtide_save_${slot}`;
        const raw = localStorage.getItem(key);
        if (!raw) return false;

        const data = JSON.parse(raw);
        if (!data.version) return false;

        // Validation: reject corrupted save data
        if (!data.mc || typeof data.mc !== 'object') return false;
        if (!data.islands || !Array.isArray(data.islands)) return false;
        if (!data.resources || typeof data.resources !== 'object') return false;
        if (data.crew && !Array.isArray(data.crew)) return false;
        if (data.tradeRoutes && !Array.isArray(data.tradeRoutes)) return false;
        if (data.equipment && typeof data.equipment !== 'object') return false;
        if (data.ship && typeof data.ship !== 'object') return false;
        if (data.notifications && !Array.isArray(data.notifications)) return false;

        // Restore scene from registry if player was in a scene
        let currentScene: StoryScene | null = null;
        if (data.currentSceneId) {
          const scene = sceneRegistry[data.currentSceneId];
          if (scene) {
            currentScene = { ...scene, currentBeat: data.currentBeat || 0 };
          }
        }

        const currentState = get();

        // Strip game-over flags from loaded save to prevent immediate re-trigger
        const loadedFlags = { ...(data.flags || {}) };
        delete loadedFlags['game_over'];
        delete loadedFlags['game_over_cause'];

        set({
          gameStarted: true,
          gamePhase: data.gamePhase,
          dayCount: data.dayCount,
          flags: loadedFlags,
          firedReactionIds: data.firedReactionIds || [],
          firedEventIds: data.firedEventIds || [],
          firedDayEventIds: data.firedDayEventIds || [],
          firedTravelEventIds: data.firedTravelEventIds || [],
          grimoireBroadcastDays: data.grimoireBroadcastDays || {},
          playerProfile: data.playerProfile || { violentChoices: 0, diplomaticChoices: 0, greedyChoices: 0, mercifulChoices: 0, totalChoices: 0 },
          currentIsland: data.currentIsland,
          activePanel: data.activePanel || 'map',
          mc: data.mc ? {
            ...data.mc,
            korvaan: data.mc.korvaan || 'none',
            dragonFruitEaten: data.mc.dragonFruitEaten || false,
            dragonFruitPossessed: data.mc.dragonFruitPossessed ?? true,
            godFruit: data.mc.godFruit || undefined,
            reputation: data.mc.reputation ?? 0,
            infamy: data.mc.infamy ?? 0,
            territory: data.mc.territory || [],
          } : currentState.mc,
          islands: data.islands || currentState.islands,
          resources: data.resources || currentState.resources,
          territoryStates: Object.fromEntries(
            Object.entries(data.territoryStates || {}).map(([id, s]: [string, any]) => [
              id,
              {
                ...s,
                islandId: s.islandId || id,
                controlledSince: s.controlledSince ?? 1,
                upgrades: Array.isArray(s.upgrades) ? s.upgrades : [],
                morale: typeof s.morale === 'number' ? s.morale : 60,
                defenseRating: typeof s.defenseRating === 'number' ? s.defenseRating : 20,
                underAttack: s.underAttack ?? false,
                islandRole: s.islandRole || 'unassigned',
                roleChangedDay: s.roleChangedDay ?? 0,
                upgradeInProgress: s.upgradeInProgress || undefined,
                crewDispatched: s.crewDispatched || undefined,
              },
            ])
          ),
          currentScene,
          storyHistory: data.storyHistory || [],
          notifications: (data.notifications || []).slice(0, 20),
          isTyping: currentScene ? true : false,
          typingSpeed: data.typingSpeed || 18,
          typingSpeedPreset: data.typingSpeedPreset || 'normal',
          combatState: null,
          travelState: null,
          selectedIsland: data.selectedIsland || null,
          threatState: data.threatState ? {
            ...DEFAULT_THREAT_STATE,
            ...data.threatState,
            // Ensure arrays/objects have correct types even from old saves
            blockadedRoutes: Array.isArray(data.threatState.blockadedRoutes) ? data.threatState.blockadedRoutes : [],
            blockadeEndDays: data.threatState.blockadeEndDays || {},
          } : { ...DEFAULT_THREAT_STATE },
          crewIdentity: data.crewIdentity || { name: '', flagDesign: 'crossed_horns', named: false },
          tradeRoutes: data.tradeRoutes || [],
          equipment: data.equipment || { weapon: null, armor: null, accessory: null },
          inventory: data.inventory || [],
          ship: data.ship ? {
            ...DEFAULT_SHIP,
            ...data.ship,
            upgrades: Array.isArray(data.ship.upgrades) ? data.ship.upgrades : [],
          } : { ...DEFAULT_SHIP },
          dayPlannerOpen: false,
          pendingDayEvent: null,
          pendingRandomEvent: null,
          pendingDailyReport: null,
          crew: (data.crew || []).map((m: any) => ({
            ...m,
            alive: m.alive ?? true,
            recruited: m.recruited ?? false,
            loyalty: typeof m.loyalty === 'number' ? m.loyalty : 50,
            mood: m.mood || 'content',
            backstoryRevealed: typeof m.backstoryRevealed === 'number' ? m.backstoryRevealed : 0,
            assignment: m.assignment || 'unassigned',
            injured: m.injured ?? false,
            injuredUntilDay: m.injuredUntilDay ?? 0,
          })),
        });

        // No "GAME LOADED" notification - the player just clicked Continue, they know.

        return true;
      } catch (e) {
        console.error('Load failed:', e);
        return false;
      }
    },

    hasSaveData: (slot = 0): boolean => {
      const key = slot === 0 ? 'godtide_autosave' : `godtide_save_${slot}`;
      return localStorage.getItem(key) !== null;
    },

    deleteSave: (slot = 0): void => {
      const key = slot === 0 ? 'godtide_autosave' : `godtide_save_${slot}`;
      localStorage.removeItem(key);
    },
  };
}
