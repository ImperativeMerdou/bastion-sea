import { useEffect, useCallback, useState, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { audioManager } from '../systems/audio';
import { ambienceManager, getAmbienceForContext } from '../systems/ambience';
import { stingerManager } from '../systems/stingers';
import { loadAudioSettings, saveAudioSettings } from '../systems/audioSettings';
import type { SfxId } from '../systems/audio';

/**
 * Hook that manages background ambience based on game state.
 * Replaces the old music system with procedural ambient sounds.
 * Priority: Combat > Travel > Scene > Panel > Title
 */
export function useAudioManager() {
  const activePanel = useGameStore((s) => s.activePanel);
  const currentScene = useGameStore((s) => s.currentScene);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const combatState = useGameStore((s) => s.combatState);
  const travelState = useGameStore((s) => s.travelState);
  const currentIsland = useGameStore((s) => s.currentIsland);

  useEffect(() => {
    // Music disabled -- SFX only
    audioManager.stopTrack();

    // Determine if this is a boss fight (check encounter templates for bossPhases)
    const isBossFight = combatState && combatState.encounter
      ? combatState.encounter.enemies.some((t) => t.bossPhases && t.bossPhases.length > 0)
      : false;

    // Update procedural ambience based on game context
    const ambienceType = getAmbienceForContext({
      activePanel,
      combatState,
      travelState,
      currentScene,
      gameStarted,
      isBossFight,
      currentIsland,
    });

    ambienceManager.play(ambienceType);
  }, [activePanel, currentScene, gameStarted, combatState, travelState, currentIsland]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioManager.cleanup();
      ambienceManager.cleanup();
      stingerManager.cleanup();
    };
  }, []);
}

/**
 * Returns a function to play sound effects.
 */
export function useSfx() {
  const playSfx = useCallback((id: SfxId) => {
    audioManager.playSfx(id);
  }, []);

  return playSfx;
}

/**
 * Returns audio control state and functions.
 * Loads saved settings on first mount, persists changes to localStorage.
 */
export function useAudioControls() {
  const initialized = useRef(false);
  const [isMuted, setIsMuted] = useState(audioManager.muted);
  const [masterVol, setMasterVol] = useState(audioManager.masterVolume);
  const [sfxVol, setSfxVol] = useState(audioManager.sfxVolume);
  const [ambientVol, setAmbientVol] = useState(ambienceManager.volume);
  const [musicVol, setMusicVol] = useState(stingerManager.volume);

  // Load saved settings once on first mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const saved = loadAudioSettings();
    // Apply saved settings to all managers
    audioManager.masterVolume = saved.masterVolume;
    audioManager.sfxVolume = saved.sfxVolume;
    ambienceManager.masterVolume = saved.masterVolume;
    ambienceManager.volume = saved.ambienceVolume;
    stingerManager.masterVolume = saved.masterVolume;
    stingerManager.volume = saved.stingerVolume;
    if (saved.muted) {
      audioManager.setMuted(true);
      ambienceManager.muted = true;
      stingerManager.muted = true;
    }
    // Sync React state
    setMasterVol(saved.masterVolume);
    setSfxVol(saved.sfxVolume);
    setAmbientVol(saved.ambienceVolume);
    setMusicVol(saved.stingerVolume);
    setIsMuted(saved.muted);
  }, []);

  /** Persist current settings to localStorage */
  const persist = useCallback(() => {
    saveAudioSettings({
      masterVolume: audioManager.masterVolume,
      sfxVolume: audioManager.sfxVolume,
      ambienceVolume: ambienceManager.volume,
      stingerVolume: stingerManager.volume,
      muted: audioManager.muted,
    });
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = audioManager.toggleMute();
    ambienceManager.muted = newMuted;
    stingerManager.muted = newMuted;
    setIsMuted(newMuted);
    // Defer persist so values settle
    setTimeout(() => persist(), 0);
    return newMuted;
  }, [persist]);

  const setMasterVolume = useCallback((vol: number) => {
    audioManager.masterVolume = vol;
    ambienceManager.masterVolume = vol;
    stingerManager.masterVolume = vol;
    setMasterVol(vol);
    persist();
  }, [persist]);

  const setSfxVolume = useCallback((vol: number) => {
    audioManager.sfxVolume = vol;
    setSfxVol(vol);
    persist();
  }, [persist]);

  const setAmbientVolume = useCallback((vol: number) => {
    ambienceManager.volume = vol;
    setAmbientVol(vol);
    persist();
  }, [persist]);

  const setMusicVolume = useCallback((vol: number) => {
    stingerManager.volume = vol;
    setMusicVol(vol);
    persist();
  }, [persist]);

  return {
    isMuted, masterVol, sfxVol, ambientVol, musicVol,
    toggleMute, setMasterVolume, setSfxVolume, setAmbientVolume, setMusicVolume,
  };
}
