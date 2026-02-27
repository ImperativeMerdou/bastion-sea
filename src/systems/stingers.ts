// =============================================
// GODTIDE: BASTION SEA - Musical Stinger System
// =============================================
// One-shot musical pieces (3-15 seconds) that play at
// specific narrative/gameplay moments. They layer on top
// of the procedural ambience, never replacing it.
// Missing files are silently skipped.
// =============================================

import { Howl } from 'howler';

// --- Stinger Types ---

export type StingerId =
  | 'title_intro'        // Title screen opening swell
  | 'conquest_victory'   // Island conquered
  | 'boss_intro'         // Boss encounter splash screen
  | 'story_revelation'   // Major plot reveal
  | 'act_transition'     // Act 1->2, Act 2->3 transitions
  | 'crew_join'          // New crew member recruited
  | 'character_death'    // Major character death or loss
  | 'grimoire_ping';     // Grimoire broadcast notification

// Each stinger tries mp3 first, then wav. Howler picks the first it can load.
const stingerSources: Record<StingerId, string[]> = {
  title_intro: ['/audio/stinger_title.mp3', '/audio/stinger_title.wav'],
  conquest_victory: ['/audio/stinger_conquest_victory.mp3', '/audio/stinger_conquest_victory.wav'],
  boss_intro: ['/audio/stinger_boss_intro.mp3', '/audio/stinger_boss_intro.wav'],
  story_revelation: ['/audio/stinger_revelation.mp3', '/audio/stinger_revelation.wav'],
  act_transition: ['/audio/stinger_act_transition.mp3', '/audio/stinger_act_transition.wav'],
  crew_join: ['/audio/stinger_crew_join.mp3', '/audio/stinger_crew_join.wav'],
  character_death: ['/audio/stinger_character_death.mp3', '/audio/stinger_character_death.wav'],
  grimoire_ping: ['/audio/stinger_grimoire_ping.mp3', '/audio/stinger_grimoire_ping.wav'],
};

// --- Stinger Manager ---

class StingerManager {
  private sounds: Map<string, Howl> = new Map();
  private failedSources: Set<string> = new Set();
  private _volume: number = 0.20;
  private _masterVolume: number = 0.7;
  private _muted: boolean = false;
  private currentlyPlaying: { id: StingerId; howl: Howl } | null = null;

  /** Effective volume = channel * master */
  private get effectiveVol(): number {
    return this._volume * this._masterVolume;
  }

  private loadStinger(id: StingerId): Howl | null {
    if (this.failedSources.has(id)) return null;

    if (this.sounds.has(id)) {
      return this.sounds.get(id)!;
    }

    const srcs = stingerSources[id];
    const howl = new Howl({
      src: srcs,
      volume: this.effectiveVol,
      loop: false,
      onloaderror: () => {
        this.failedSources.add(id);
        this.sounds.delete(id);
      },
      onend: () => {
        if (this.currentlyPlaying?.id === id) {
          this.currentlyPlaying = null;
        }
      },
    });

    this.sounds.set(id, howl);
    return howl;
  }

  play(id: StingerId): void {
    if (this._muted) return;

    const sound = this.loadStinger(id);
    if (!sound) return;

    // If a stinger is already playing, fade it out fast (200ms)
    if (this.currentlyPlaying) {
      const old = this.currentlyPlaying.howl;
      old.fade(old.volume(), 0, 200);
      setTimeout(() => {
        old.stop();
      }, 200);
      this.currentlyPlaying = null;
    }

    sound.volume(this.effectiveVol);
    sound.play();
    this.currentlyPlaying = { id, howl: sound };
  }

  stop(): void {
    if (this.currentlyPlaying) {
      this.currentlyPlaying.howl.stop();
      this.currentlyPlaying = null;
    }
  }

  set volume(vol: number) {
    this._volume = Math.max(0, Math.min(1, vol));
    if (this.currentlyPlaying) {
      this.currentlyPlaying.howl.volume(this.effectiveVol);
    }
  }

  get volume(): number {
    return this._volume;
  }

  set masterVolume(vol: number) {
    this._masterVolume = Math.max(0, Math.min(1, vol));
    if (this.currentlyPlaying) {
      this.currentlyPlaying.howl.volume(this.effectiveVol);
    }
  }

  get masterVolume(): number {
    return this._masterVolume;
  }

  set muted(m: boolean) {
    this._muted = m;
    // Howler.mute is already called by audioManager.toggleMute,
    // which globally mutes all Howler instances. But we also
    // track it locally to prevent new stingers from starting.
  }

  get muted(): boolean {
    return this._muted;
  }

  cleanup(): void {
    this.stop();
    this.sounds.forEach((howl) => howl.unload());
    this.sounds.clear();
  }
}

// Singleton instance
export const stingerManager = new StingerManager();
