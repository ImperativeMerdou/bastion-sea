// =============================================
// GODTIDE: BASTION SEA - Audio Settings Persistence
// =============================================
// Stores volume preferences in localStorage so they
// survive across sessions. Provides a master volume
// multiplier applied to all audio subsystems.
// =============================================

const STORAGE_KEY = 'godtide_audio_settings';

export interface AudioSettings {
  masterVolume: number;   // 0-1, default 0.7
  sfxVolume: number;      // 0-1, default 0.30
  ambienceVolume: number; // 0-1, default 0.12
  stingerVolume: number;  // 0-1, default 0.35
  muted: boolean;
}

const DEFAULTS: AudioSettings = {
  masterVolume: 0.7,
  sfxVolume: 0.30,
  ambienceVolume: 0.12,
  stingerVolume: 0.20,
  muted: false,
};

/** Load saved audio settings or return defaults */
export function loadAudioSettings(): AudioSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw);
    return {
      masterVolume: clamp(parsed.masterVolume ?? DEFAULTS.masterVolume),
      sfxVolume: clamp(parsed.sfxVolume ?? DEFAULTS.sfxVolume),
      ambienceVolume: clamp(parsed.ambienceVolume ?? DEFAULTS.ambienceVolume),
      stingerVolume: clamp(parsed.stingerVolume ?? DEFAULTS.stingerVolume),
      muted: typeof parsed.muted === 'boolean' ? parsed.muted : DEFAULTS.muted,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

/** Save audio settings to localStorage */
export function saveAudioSettings(settings: AudioSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch { /* storage full -- non-critical */ }
}

/** Compute effective volume: channel volume * master volume */
export function effectiveVolume(channelVol: number, masterVol: number): number {
  return clamp(channelVol) * clamp(masterVol);
}

function clamp(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export { DEFAULTS as AUDIO_DEFAULTS };
