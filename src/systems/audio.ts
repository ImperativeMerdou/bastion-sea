// =============================================
// GODTIDE: BASTION SEA - Audio System
// =============================================
// Sound effects via Howler.js. Music removed by design.
// Audio files load gracefully - missing files are silently skipped.
// =============================================

import { Howl, Howler } from 'howler';

// --- Audio Types ---

type SfxId =
  | 'click'
  | 'choice_select'
  | 'notification'
  | 'day_advance'
  | 'conquest_begin'
  | 'travel_depart'
  | 'text_advance'
  | 'combat_hit'
  | 'combat_sword'
  | 'combat_heavy'
  | 'combat_explosion'
  | 'combat_crunch'
  | 'combat_cinematic_boom'
  | 'combat_crew_assist'
  | 'combat_victory'
  | 'combat_defeat'
  | 'purchase'
  | 'sell'
  | 'upgrade_complete'
  | 'level_up'
  | 'warning'
  | 'error'
  | 'objective_complete';

const sfxSources: Record<SfxId, string> = {
  click: '/audio/sfx_click.mp3',
  choice_select: '/audio/sfx_choice.mp3',
  notification: '/audio/sfx_notification.mp3',
  day_advance: '/audio/sfx_day_advance.mp3',
  conquest_begin: '/audio/sfx_conquest.mp3',
  travel_depart: '/audio/sfx_travel.mp3',
  text_advance: '/audio/sfx_text.mp3',
  combat_hit: '/audio/sfx_hit.wav',
  combat_sword: '/audio/sfx_sword.wav',
  combat_heavy: '/audio/sfx_heavy_hit.wav',
  combat_explosion: '/audio/sfx_explosion.mp3',
  combat_crunch: '/audio/sfx_crunch_hit.wav',
  combat_cinematic_boom: '/audio/sfx_cinematic_boom.wav',
  combat_crew_assist: '/audio/sfx_crew_assist.mp3',
  combat_victory: '/audio/sfx_victory.mp3',
  combat_defeat: '/audio/sfx_defeat.mp3',
  purchase: '/audio/sfx_choice.mp3',
  sell: '/audio/sfx_click.mp3',
  upgrade_complete: '/audio/sfx_victory.mp3',
  level_up: '/audio/sfx_victory.mp3',
  warning: '/audio/sfx_notification.mp3',
  error: '/audio/sfx_defeat.mp3',
  objective_complete: '/audio/sfx_conquest.mp3',
};

// --- Audio Manager ---

class AudioManager {
  private sfx: Map<string, Howl> = new Map();
  private _sfxVolume: number = 0.30;
  private _masterVolume: number = 0.7;
  private _muted: boolean = false;
  private failedSources: Set<string> = new Set();

  /** Effective volume = channel * master */
  private get effectiveVol(): number {
    return this._sfxVolume * this._masterVolume;
  }

  private loadSfx(id: SfxId): Howl | null {
    const src = sfxSources[id];
    if (this.failedSources.has(src)) return null;

    if (this.sfx.has(id)) {
      return this.sfx.get(id)!;
    }

    const howl = new Howl({
      src: [src],
      volume: this.effectiveVol,
      onloaderror: () => {
        this.failedSources.add(src);
        this.sfx.delete(id);
      },
    });

    this.sfx.set(id, howl);
    return howl;
  }

  playSfx(id: SfxId): void {
    if (this._muted) return;
    const sound = this.loadSfx(id);
    if (sound) {
      sound.volume(this.effectiveVol);
      sound.play();
    }
  }

  // Music stubs (no-ops, kept for API compatibility)
  playTrack(_id: string, _fadeDuration?: number): void {}
  stopTrack(_fadeDuration?: number): void {}
  get currentTrackId(): string | null { return null; }

  set musicVolume(_vol: number) {}
  get musicVolume(): number { return 0; }

  set sfxVolume(vol: number) {
    this._sfxVolume = Math.max(0, Math.min(1, vol));
    this.sfx.forEach((howl) => howl.volume(this.effectiveVol));
  }

  get sfxVolume(): number {
    return this._sfxVolume;
  }

  set masterVolume(vol: number) {
    this._masterVolume = Math.max(0, Math.min(1, vol));
    this.sfx.forEach((howl) => howl.volume(this.effectiveVol));
  }

  get masterVolume(): number {
    return this._masterVolume;
  }

  toggleMute(): boolean {
    this._muted = !this._muted;
    Howler.mute(this._muted);
    return this._muted;
  }

  get muted(): boolean {
    return this._muted;
  }

  setMuted(muted: boolean): void {
    this._muted = muted;
    Howler.mute(muted);
  }

  cleanup(): void {
    this.sfx.forEach((howl) => howl.unload());
    this.sfx.clear();
  }
}

// Singleton instance
export const audioManager = new AudioManager();

export type { SfxId };
