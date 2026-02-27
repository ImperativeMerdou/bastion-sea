// =============================================
// GODTIDE: BASTION SEA - Music System
// =============================================
// Looping background music with crossfade transitions.
// Tracks are mapped to game scenes and panels.
// Only one track plays at a time. Crossfade is 2.5s.
// Missing files are silently skipped.
// =============================================

import { Howl } from 'howler';

// --- Music Track IDs ---

export type MusicTrackId =
  | 'title'       // Title/menu screen
  | 'adventure'   // Default: exploration, map, sailing, general story
  | 'cinematic'   // Cinematic intro, world intro, prologue opening
  | 'combat'      // Combat encounters
  | 'tavern'      // Port scenes, crew bonding, management
  | 'suspense'    // Ghostlight, Kirin, villain scenes, eerie/tense
  | 'dramatic'    // Dragon Fruit, epilogue, romance, emotional peaks
  | 'ambient'     // Ambient normal state (fallback/quiet moments)
  | 'silence';    // No music

const trackSources: Record<Exclude<MusicTrackId, 'silence'>, string> = {
  title: './audio/music/title_screen.mp3',
  adventure: './audio/music/adventure.mp3',
  cinematic: './audio/music/cinematic.wav',
  combat: './audio/music/combat.mp3',
  tavern: './audio/music/tavern.mp3',
  suspense: './audio/music/suspense.mp3',
  dramatic: './audio/music/dramatic.mp3',
  ambient: './audio/music/ambient.mp3',
};

// --- Scene-to-Music Mapping ---

/** Specific scene IDs that override the default track */
const SCENE_MUSIC_MAP: Record<string, MusicTrackId> = {
  // TITLE
  title: 'title',

  // TAVERN/CHILL - port, crew bonding, market
  tavven_arrival: 'tavern',
  dockside_confrontation: 'tavern',
  dragghen_recruitment: 'tavern',
  kovesse_recruitment: 'tavern',
  first_crew_dinner: 'tavern',
  crew_identity: 'tavern',
  crew_argument: 'tavern',
  vorreth_recruitment: 'tavern',
  delvessa_recruitment: 'tavern',
  first_night: 'tavern',

  // EERIE/TENSE - villain, ghostlight, kirin
  explore_ghostlight: 'suspense',
  explore_mossbreak: 'suspense',
  kirin_act2: 'suspense',
  kirin_confrontation: 'suspense',
  prime_khoss: 'suspense',
  rival_intro: 'suspense',
  act2_wardensea: 'suspense',
  act2_threat: 'suspense',

  // DRAMATIC/PIANO - emotional peaks
  dragon_fruit_activation: 'dramatic',
  epilogue: 'dramatic',
  delvessa_romance: 'dramatic',
  act3_main: 'dramatic',
  night_watch: 'dramatic',

  // CINEMATIC - intro sequences, world intro
  world_intro: 'cinematic',
  prologue_intro: 'cinematic',

  // ADVENTURE - conquest, exploration (defaults)
  prologue_escape: 'adventure',
  conquest_aftermath: 'adventure',
  act1_intel: 'adventure',
  act2_main: 'adventure',
};

/** Pattern-based matching for scene IDs not in the explicit map */
function getTrackByPattern(sceneId: string): MusicTrackId | null {
  // Ghostlight and mossbreak cave sections
  if (sceneId.includes('ghostlight')) return 'suspense';
  if (sceneId.includes('mossbreak') && sceneId.includes('cave')) return 'suspense';

  // Kirin and villain scenes
  if (sceneId.includes('kirin')) return 'suspense';
  if (sceneId.includes('prime')) return 'suspense';
  if (sceneId.includes('ironclad')) return 'suspense';
  if (sceneId.includes('blockade')) return 'suspense';
  if (sceneId.includes('ultimatum')) return 'suspense';

  // Romance
  if (sceneId.includes('romance')) return 'dramatic';

  // Tavern/dock/dinner/crew social
  if (sceneId.includes('tavern')) return 'tavern';
  if (sceneId.includes('dinner')) return 'tavern';
  if (sceneId.includes('dock')) return 'tavern';

  // Conquest scenes
  if (sceneId.includes('conquest_')) return 'adventure';

  // Exploration scenes (except ghostlight/mossbreak already handled)
  if (sceneId.includes('explore_')) return 'adventure';

  return null;
}

/** Determine music track for the current game context */
export function getMusicTrackForContext(context: {
  activePanel: string;
  sceneId: string | null;
  gameStarted: boolean;
  inCombat: boolean;
  inTravel: boolean;
}): MusicTrackId {
  // Title screen
  if (!context.gameStarted) return 'title';

  // Combat always gets combat music
  if (context.inCombat) return 'combat';

  // Story panel: check scene-specific mapping
  if (context.activePanel === 'story' && context.sceneId) {
    // Explicit map first
    const explicit = SCENE_MUSIC_MAP[context.sceneId];
    if (explicit) return explicit;

    // Pattern-based fallback
    const pattern = getTrackByPattern(context.sceneId);
    if (pattern) return pattern;

    // Default for story scenes
    return 'adventure';
  }

  // Management panel (docked at port)
  if (context.activePanel === 'management') return 'tavern';

  // Map panel, travel
  if (context.activePanel === 'map') return 'adventure';
  if (context.inTravel) return 'adventure';

  // Default
  return 'adventure';
}

// --- Music Manager ---

const CROSSFADE_MS = 2500;

class MusicManager {
  private tracks: Map<string, Howl> = new Map();
  private failedSources: Set<string> = new Set();
  private _volume: number = 0.15;
  private _masterVolume: number = 0.60;
  private _muted: boolean = false;
  private _currentTrack: MusicTrackId = 'silence';
  private _currentHowl: Howl | null = null;
  private _fadingOut: Howl | null = null;
  private _pauseDimmed: boolean = false;
  private _prePauseVolume: number = 0.15;

  /** Effective volume = channel * master */
  private get effectiveVol(): number {
    return this._volume * this._masterVolume;
  }

  private loadTrack(id: Exclude<MusicTrackId, 'silence'>): Howl | null {
    const src = trackSources[id];
    if (this.failedSources.has(src)) return null;

    if (this.tracks.has(id)) {
      return this.tracks.get(id)!;
    }

    const howl = new Howl({
      src: [src],
      volume: 0,
      loop: true,
      // NO html5:true -- Web Audio API works with Howler.ctx.resume() for autoplay unlock.
      // html5 Audio elements have their own autoplay policy that ctx.resume() can't fix.
      onloaderror: () => {
        this.failedSources.add(src);
        this.tracks.delete(id);
      },
    });

    this.tracks.set(id, howl);
    return howl;
  }

  /** Play a track with crossfade. If same track is already playing, do nothing. */
  play(id: MusicTrackId): void {
    if (id === this._currentTrack) return;
    if (id === 'silence') {
      this.stop();
      return;
    }

    // Fade out current track
    if (this._currentHowl) {
      const old = this._currentHowl;
      old.fade(old.volume(), 0, CROSSFADE_MS);
      // Clean up fading-out track
      if (this._fadingOut) {
        this._fadingOut.stop();
      }
      this._fadingOut = old;
      setTimeout(() => {
        if (this._fadingOut === old) {
          old.stop();
          this._fadingOut = null;
        }
      }, CROSSFADE_MS + 100);
    }

    // Load and play new track
    const sound = this.loadTrack(id);
    if (!sound) {
      this._currentTrack = id;
      this._currentHowl = null;
      return;
    }

    this._currentTrack = id;
    this._currentHowl = sound;

    // If Howler is globally muted, still set up the track (it just won't be audible)
    const targetVol = this._muted ? 0 : this.effectiveVol;
    sound.volume(0);
    sound.play();
    sound.fade(0, targetVol, CROSSFADE_MS);
  }

  /** Stop all music with fade */
  stop(fadeMs: number = CROSSFADE_MS): void {
    if (this._currentHowl) {
      const old = this._currentHowl;
      old.fade(old.volume(), 0, fadeMs);
      setTimeout(() => {
        old.stop();
      }, fadeMs + 100);
    }
    this._currentTrack = 'silence';
    this._currentHowl = null;
  }

  /** Dim music when pause menu opens */
  onPauseOpen(): void {
    if (this._pauseDimmed || !this._currentHowl) return;
    this._pauseDimmed = true;
    this._prePauseVolume = this._currentHowl.volume();
    this._currentHowl.fade(this._prePauseVolume, this._prePauseVolume * 0.5, 300);
  }

  /** Restore music when pause menu closes */
  onPauseClose(): void {
    if (!this._pauseDimmed || !this._currentHowl) return;
    this._pauseDimmed = false;
    this._currentHowl.fade(this._currentHowl.volume(), this.effectiveVol, 1000);
  }

  get currentTrack(): MusicTrackId {
    return this._currentTrack;
  }

  set volume(vol: number) {
    this._volume = Math.max(0, Math.min(1, vol));
    if (this._currentHowl && !this._muted && !this._pauseDimmed) {
      this._currentHowl.volume(this.effectiveVol);
    }
  }

  get volume(): number {
    return this._volume;
  }

  set masterVolume(vol: number) {
    this._masterVolume = Math.max(0, Math.min(1, vol));
    if (this._currentHowl && !this._muted && !this._pauseDimmed) {
      this._currentHowl.volume(this.effectiveVol);
    }
  }

  get masterVolume(): number {
    return this._masterVolume;
  }

  set muted(m: boolean) {
    this._muted = m;
    // Howler.mute is called globally by audioManager.toggleMute
    // We track locally to prevent starting tracks at audible volume
  }

  get muted(): boolean {
    return this._muted;
  }

  /** Re-trigger current track (e.g. after browser autoplay unlock) */
  retrigger(): void {
    if (this._currentTrack !== 'silence') {
      const track = this._currentTrack;
      // Stop and unload the old (possibly broken) Howl
      if (this._currentHowl) {
        this._currentHowl.stop();
        this._currentHowl.unload();
      }
      // Clear cache so loadTrack creates a fresh Howl post-unlock
      this.tracks.delete(track);
      this._currentTrack = 'silence';
      this._currentHowl = null;
      this.play(track);
    }
  }

  cleanup(): void {
    this.stop(0);
    this.tracks.forEach((howl) => howl.unload());
    this.tracks.clear();
    this._fadingOut = null;
  }
}

// Singleton
export const musicManager = new MusicManager();
