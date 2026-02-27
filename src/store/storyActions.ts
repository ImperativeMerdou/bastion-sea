import type { StoryScene } from '../types/game';
import { LIMITS, MISC } from '../constants/balance';
import type { GameState } from './gameStore';

export function createStoryActions(
  set: (partial: Partial<GameState> | ((s: GameState) => Partial<GameState>)) => void,
  get: () => GameState,
  sceneRegistry: Record<string, StoryScene>,
  capArray: <T>(arr: T[], max: number) => T[],
  trackedTimeout: (fn: () => void, ms: number) => ReturnType<typeof setTimeout>,
) {
  return {
    startScene: (scene: StoryScene) => set({
      currentScene: { ...scene, currentBeat: 0 },
      isTyping: true,
    }),

    advanceBeat: () => {
      const state = get();
      if (!state.currentScene) return;
      // Skip beats whose requireFlag is not satisfied
      let nextBeat = state.currentScene.currentBeat + 1;
      while (
        nextBeat < state.currentScene.beats.length &&
        state.currentScene.beats[nextBeat].requireFlag &&
        !state.flags[state.currentScene.beats[nextBeat].requireFlag!]
      ) {
        nextBeat++;
      }
      if (nextBeat >= state.currentScene.beats.length) {
        const completedScene = state.currentScene;
        const history = capArray([...state.storyHistory, completedScene.id], LIMITS.STORY_HISTORY_MAX);
        if (completedScene.onComplete) {
          state.applyEffects(completedScene.onComplete);
        }
        let nextSceneId = completedScene.nextSceneId;
        let chainedHistory = history;
        let chainCount = 0;
        while (nextSceneId && sceneRegistry[nextSceneId] && chainCount < 10) {
          const candidate = sceneRegistry[nextSceneId];
          if (candidate.beats.length > 0) {
            set({
              currentScene: { ...candidate, currentBeat: 0 },
              isTyping: true,
              storyHistory: chainedHistory,
            });
            return;
          }
          chainedHistory = capArray([...chainedHistory, candidate.id], LIMITS.STORY_HISTORY_MAX);
          if (candidate.onComplete) {
            get().applyEffects(candidate.onComplete);
          }
          nextSceneId = candidate.nextSceneId;
          chainCount++;
        }
        if (chainCount >= MISC.SCENE_CHAIN_LIMIT) {
          // Scene chain limit reached - remaining scenes dropped
        }
        set({
          currentScene: null,
          isTyping: false,
          storyHistory: chainedHistory,
        });
      } else {
        set({
          currentScene: { ...state.currentScene, currentBeat: nextBeat },
          isTyping: true,
        });
      }
    },

    makeChoice: (choiceId: string) => {
      const { currentScene, applyEffects } = get();
      if (!currentScene) return;
      const beat = currentScene.beats[currentScene.currentBeat];
      const choice = beat.choices?.find((c) => c.id === choiceId);
      if (!choice) return;
      const hasSceneEffect = choice.effects.some((e) => e.type === 'scene');
      const hasCombatEffect = choice.effects.some((e) => e.type === 'combat');
      const normalEffects = choice.effects.filter((e) => e.type !== 'scene' && e.type !== 'combat');
      const sceneEffects = choice.effects.filter((e) => e.type === 'scene');
      const combatEffects = choice.effects.filter((e) => e.type === 'combat');
      applyEffects(normalEffects);
      if (hasSceneEffect) {
        applyEffects(sceneEffects);
      } else if (hasCombatEffect) {
        applyEffects(combatEffects);
      } else {
        get().advanceBeat();
      }
    },

    clearScene: () => {
      set({ currentScene: null, isTyping: false });
      trackedTimeout(() => {
        if (!get().saveGame(0)) {
          // Autosave failed silently after scene clear
        }
      }, 100);
    },

    setTyping: (typing: boolean) => set({ isTyping: typing }),

    setTypingSpeed: (preset: 'slow' | 'normal' | 'fast' | 'instant') => {
      const speedMap = { slow: 35, normal: 18, fast: 8, instant: 0 };
      set({ typingSpeedPreset: preset, typingSpeed: speedMap[preset] });
    },
  };
}
