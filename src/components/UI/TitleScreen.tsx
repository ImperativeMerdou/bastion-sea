import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { getImagePath } from '../../utils/images';
import { audioManager } from '../../systems/audio';
import { stingerManager } from '../../systems/stingers';
import { WorldIntro } from './WorldIntro';

// Read save metadata without loading the full save
function getSaveInfo(slot: number): { dayCount: number; gamePhase: string; timestamp: number } | null {
  try {
    const key = slot === 0 ? 'godtide_autosave' : `godtide_save_${slot}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return {
      dayCount: data.dayCount || 1,
      gamePhase: data.gamePhase || 'prologue',
      timestamp: data.timestamp || 0,
    };
  } catch {
    return null;
  }
}

function formatTimestamp(ts: number): string {
  if (!ts) return '';
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

export const TitleScreen: React.FC = () => {
  const startGame = useGameStore(s => s.startGame);
  const loadGame = useGameStore(s => s.loadGame);
  const hasSaveData = useGameStore(s => s.hasSaveData);
  const [phase, setPhase] = useState<'intro' | 'title' | 'menu'>('intro');
  const [hovering, setHovering] = useState<string | null>(null);
  const [showCredits, setShowCredits] = useState(false);
  const [showLoadMenu, setShowLoadMenu] = useState(false);
  const [showWorldIntro, setShowWorldIntro] = useState(false);

  const titleBg = getImagePath('title_bg_alt.webp') || getImagePath('title_bg.webp');
  const logoImage = getImagePath('logo_godtide.webp');
  const hasAutoSave = hasSaveData(0);
  const hasSave1 = hasSaveData(1);
  const hasSave2 = hasSaveData(2);
  const hasAnySave = hasAutoSave || hasSave1 || hasSave2;

  // Get metadata for the best available save
  const bestSaveSlot = hasAutoSave ? 0 : hasSave1 ? 1 : hasSave2 ? 2 : -1;
  const saveInfo = bestSaveSlot >= 0 ? getSaveInfo(bestSaveSlot) : null;

  // Title intro stinger: play once on mount, do not replay if user returns
  const titleStingerPlayed = useRef(false);
  useEffect(() => {
    if (!titleStingerPlayed.current) {
      titleStingerPlayed.current = true;
      stingerManager.play('title_intro');
    }
  }, []);

  // Cinematic intro sequence
  useEffect(() => {
    const titleTimer = setTimeout(() => setPhase('title'), 2500);
    const menuTimer = setTimeout(() => setPhase('menu'), 4500);
    return () => { clearTimeout(titleTimer); clearTimeout(menuTimer); };
  }, []);

  const handleContinue = () => {
    audioManager.playSfx('click');
    if (hasAutoSave) { loadGame(0); return; }
    if (hasSave1) { loadGame(1); return; }
    if (hasSave2) { loadGame(2); return; }
  };

  const handleNewGame = () => {
    audioManager.playSfx('conquest_begin');
    setShowWorldIntro(true);
  };

  // Skip intro on click (stopPropagation prevents menu buttons from triggering skip)
  const skipIntro = useCallback((e: React.MouseEvent) => {
    // Only skip if the click target is the root container or background layers
    if ((e.target as HTMLElement).closest('button')) return;
    if (phase === 'intro') setPhase('title');
    else if (phase === 'title') setPhase('menu');
  }, [phase]);

  // Keyboard: Enter/Space to skip intro phases, Escape to close dropdowns
  useEffect(() => {
    if (showWorldIntro) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (phase === 'intro') { setPhase('title'); e.preventDefault(); }
        else if (phase === 'title') { setPhase('menu'); e.preventDefault(); }
      }
      if (e.key === 'Escape') {
        if (showLoadMenu) setShowLoadMenu(false);
        if (showCredits) setShowCredits(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, showWorldIntro, showLoadMenu, showCredits]);

  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center bg-ocean-950 relative overflow-hidden cursor-pointer"
      onClick={phase !== 'menu' ? skipIntro : undefined}
      role="main"
      aria-label="Godtide: Bastion Sea title screen"
    >
      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Deep ocean gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-950" />

        {/* Animated fog/mist layers */}
        <div className="absolute inset-0 opacity-[0.18]">
          <div className="absolute w-[200%] h-full animate-drift-slow"
               style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 40%, rgba(245,158,11,0.2) 50%, transparent 60%, transparent)' }} />
        </div>

        {/* Crimson glow - Karyudon's ambition */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-crimson-600/25 blur-[120px] animate-pulse-slow" />

        {/* Ocean depth glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-ocean-500/15 to-transparent" />

        {/* Warm ambient glow behind menu area */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-amber-500/8 blur-[100px]" />

        {/* Particle-like stars/sparks */}
        <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-amber-400/60 rounded-full animate-twinkle" />
        <div className="absolute top-[25%] right-[20%] w-2 h-2 bg-amber-300/50 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[15%] right-[35%] w-1.5 h-1.5 bg-ocean-300/60 rounded-full animate-twinkle" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-[40%] left-[10%] w-1.5 h-1.5 bg-crimson-400/50 rounded-full animate-twinkle" style={{ animationDelay: '2.1s' }} />
        <div className="absolute top-[8%] left-[55%] w-1 h-1 bg-amber-400/50 rounded-full animate-twinkle" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[30%] left-[70%] w-2 h-2 bg-ocean-300/40 rounded-full animate-twinkle" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-[45%] right-[12%] w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-twinkle" style={{ animationDelay: '1.8s' }} />
        <div className="absolute top-[20%] left-[40%] w-1 h-1 bg-crimson-300/40 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[35%] right-[30%] w-1.5 h-1.5 bg-amber-400/45 rounded-full animate-twinkle" style={{ animationDelay: '2.5s' }} />

        {/* Background image overlay if available */}
        {titleBg && (
          <div className="absolute inset-0" style={{
            backgroundImage: `url(${titleBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
            opacity: logoImage && !logoFailed ? 0.40 : 0.50,
          }}>
            <div className="absolute inset-0" style={{
              background: logoImage && !logoFailed
                ? 'linear-gradient(to bottom, rgba(5,15,30,0.7) 0%, rgba(5,15,30,0.3) 25%, rgba(5,15,30,0.1) 50%, rgba(5,15,30,0.5) 80%, rgba(5,15,30,0.85) 100%)'
                : 'linear-gradient(to bottom, rgba(5,15,30,0.4) 0%, rgba(5,15,30,0.15) 40%, rgba(5,15,30,0.5) 100%)',
            }} />
          </div>
        )}
      </div>

      {/* === PHASE 1: Lore intro text === */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
        phase === 'intro' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="text-center max-w-lg px-8">
          <p className="text-ocean-300 text-sm tracking-[0.3em] uppercase mb-6 font-display animate-fade-in">
            In the age of Dominions
          </p>
          <p className="text-ocean-100 text-lg leading-relaxed italic font-narration animate-fade-in" style={{ animationDelay: '0.8s' }}>
            "The sea doesn't care about your bloodline, your bounty, or your god.
            It only asks one question..."
          </p>
          <p className="text-gold-400 text-2xl font-display font-bold mt-6 tracking-wider animate-fade-in drop-shadow-[0_0_20px_rgba(196,148,58,0.4)]" style={{ animationDelay: '1.6s' }}>
            "Can you take what you want?"
          </p>
        </div>
      </div>

      {/* === PHASE 2+3: Title + Menu === */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${
        phase !== 'intro' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Logo / Title */}
        <div className={`transition-all duration-700 ${phase !== 'intro' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {logoImage && !logoFailed ? (
            <img
              src={logoImage}
              alt="Godtide: Bastion Sea"
              className="mx-auto drop-shadow-[0_0_50px_rgba(14,165,233,0.35)]"
              style={{ maxWidth: '500px', width: '90vw', height: 'auto', marginBottom: '1rem' }}
              draggable={false}
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-[0.4em] text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)] mb-1">
                GODTIDE
              </h2>
              <h1 className="text-7xl md:text-9xl font-display font-bold tracking-wider text-ocean-50 drop-shadow-[0_0_50px_rgba(14,165,233,0.25)] leading-none">
                BASTION
              </h1>
              <h1 className="text-7xl md:text-9xl font-display font-bold tracking-wider text-ocean-200 leading-none -mt-2">
                SEA
              </h1>
            </>
          )}
        </div>

        {/* Decorative line */}
        <div className={`my-6 transition-all duration-500 delay-500 ${phase !== 'intro' ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
          <div className="flex items-center justify-center gap-3">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-crimson-400" />
            <span className="text-crimson-400 text-sm drop-shadow-[0_0_8px_rgba(220,38,38,0.4)]">{'\u2B21'}</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-crimson-400" />
          </div>
        </div>

        {/* Tagline */}
        <p className={`text-ocean-300 text-base mb-10 font-display italic tracking-wide transition-all duration-700 delay-500 ${
          phase !== 'intro' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          The world doesn't know your name yet.
        </p>

        {/* === MENU BUTTONS === */}
        <div className={`flex flex-col items-center gap-3 transition-all duration-700 delay-700 ${
          phase === 'menu' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}>
          {hasAnySave && (
            <button
              onClick={handleContinue}
              onMouseEnter={() => setHovering('continue')}
              onMouseLeave={() => setHovering(null)}
              aria-label={saveInfo ? `Continue game from Day ${saveInfo.dayCount}` : 'Continue saved game'}
              className={`group relative px-14 py-4 text-base font-display font-bold tracking-[0.3em] uppercase border-2 transition-all duration-300 w-72 overflow-hidden ${
                hovering === 'continue'
                  ? 'bg-gold-600/25 border-gold-400 text-gold-200 shadow-[0_0_20px_rgba(196,148,58,0.25)] scale-[1.02]'
                  : 'bg-gold-600/15 border-gold-500/50 text-gold-400/90 hover:border-gold-400/70'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-gold-600/0 via-gold-500/15 to-gold-600/0 transition-transform duration-500 ${
                hovering === 'continue' ? 'translate-x-0' : '-translate-x-full'
              }`} />
              <span className="relative">CONTINUE</span>
              {saveInfo && (
                <span className="relative block text-xs tracking-wider text-gold-400/50 font-normal font-mono mt-1 normal-case">
                  Day {saveInfo.dayCount} · {saveInfo.gamePhase.toUpperCase()}
                  {saveInfo.timestamp ? ` · ${formatTimestamp(saveInfo.timestamp)}` : ''}
                </span>
              )}
            </button>
          )}

          <button
            onClick={handleNewGame}
            onMouseEnter={() => setHovering('new')}
            onMouseLeave={() => setHovering(null)}
            aria-label={hasAnySave ? 'Start a new voyage' : 'Set sail and begin the game'}
            className={`group relative px-14 py-4 text-base font-display font-bold tracking-[0.3em] uppercase border-2 transition-all duration-300 w-72 overflow-hidden ${
              hovering === 'new'
                ? 'bg-crimson-600/25 border-crimson-400 text-crimson-200 shadow-[0_0_20px_rgba(220,38,38,0.25)] scale-[1.02]'
                : `bg-ocean-900/30 border-ocean-400/40 text-ocean-200/90 hover:border-ocean-300/60 ${!hasAnySave ? 'border-crimson-500/50 text-crimson-300/90 bg-crimson-900/15' : ''}`
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-crimson-600/0 via-crimson-600/15 to-crimson-600/0 transition-transform duration-500 ${
              hovering === 'new' ? 'translate-x-0' : '-translate-x-full'
            }`} />
            <span className="relative">{hasAnySave ? 'NEW VOYAGE' : 'SET SAIL'}</span>
          </button>

          {/* Load Game Button */}
          {hasAnySave && (
            <button
              onClick={() => { audioManager.playSfx('click'); setShowLoadMenu(!showLoadMenu); setShowCredits(false); }}
              onMouseEnter={() => setHovering('load')}
              onMouseLeave={() => setHovering(null)}
              aria-label="Load a saved game"
              aria-expanded={showLoadMenu}
              className={`group relative px-14 py-3 text-sm font-display font-bold tracking-[0.3em] uppercase border transition-all duration-300 w-72 overflow-hidden ${
                hovering === 'load'
                  ? 'bg-ocean-600/20 border-ocean-300 text-ocean-200 shadow-[0_0_12px_rgba(14,165,233,0.15)] scale-[1.01]'
                  : 'bg-transparent border-ocean-500/30 text-ocean-400/70 hover:border-ocean-400/50'
              }`}
            >
              <span className="relative">LOAD GAME</span>
            </button>
          )}

          {/* Load Menu Dropdown */}
          {showLoadMenu && (
            <div className="w-72 bg-ocean-900/95 border border-ocean-500/40 rounded mt-1 animate-fade-in overflow-hidden">
              {[0, 1, 2].map((slot) => {
                const has = hasSaveData(slot);
                if (!has) return null;
                const info = getSaveInfo(slot);
                const label = slot === 0 ? 'Autosave' : `Slot ${slot}`;
                return (
                  <button
                    key={slot}
                    onClick={() => { audioManager.playSfx('click'); loadGame(slot); }}
                    aria-label={`Load ${label}${info ? ` - Day ${info.dayCount}` : ''}`}
                    className="w-full px-4 py-3 text-left hover:bg-ocean-700/50 border-b border-ocean-700/50 last:border-0 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-ocean-200 text-sm font-bold">{label}</span>
                      {info && (
                        <span className="text-ocean-500 text-xs">
                          {formatTimestamp(info.timestamp)}
                        </span>
                      )}
                    </div>
                    {info && (
                      <p className="text-ocean-400 text-xs mt-0.5">
                        Day {info.dayCount} · {info.gamePhase.toUpperCase()}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Credits toggle */}
          <button
            onClick={() => { audioManager.playSfx('click'); setShowCredits(!showCredits); setShowLoadMenu(false); }}
            aria-label={showCredits ? 'Close credits' : 'View credits'}
            aria-expanded={showCredits}
            className="text-ocean-500/60 text-xs font-display tracking-wider hover:text-ocean-400/80 transition-colors mt-4"
          >
            {showCredits ? 'CLOSE' : 'CREDITS'}
          </button>

          {showCredits && (
            <div className="mt-2 text-center animate-fade-in">
              <p className="text-amber-400/90 text-sm font-display font-bold tracking-[0.2em] uppercase">
                Created by Mert Akhan
              </p>
              <p className="text-ocean-300/50 text-xs tracking-wider mt-1 mb-3">
                Writing &bull; Design &bull; Development &bull; Direction
              </p>
              <div className="w-8 h-px bg-ocean-500/30 mx-auto mb-3" />
              <p className="text-ocean-400/60 text-xs">Audio: OpenGameArt.org (CC0)</p>
              <p className="text-ocean-400/60 text-xs">Alexander Ehlers &bull; CleytonRX &bull; SpringySpringo</p>
              <p className="text-ocean-400/60 text-xs">LokiF &bull; Little Robot Sound Factory &bull; Socapex</p>
              <p className="text-ocean-400/60 text-xs mt-1">RandomMind &bull; Ylmir</p>
            </div>
          )}
        </div>

        {/* Version */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-1000 ${
          phase === 'menu' ? 'opacity-100' : 'opacity-0'
        }`}>
          <p className="text-ocean-400/60 text-xs font-display tracking-[0.25em]">
            A game by Mert Akhan
          </p>
          <p className="text-ocean-500/40 text-xs mt-1 tracking-[0.4em] uppercase">
            v1.0.0
          </p>
          {/* IP brand mark */}
          {(() => {
            const ipLogo = getImagePath('icon_godtide.webp');
            return ipLogo ? (
              <img
                src={ipLogo}
                alt="GODTIDE"
                className="mx-auto mt-4 opacity-40 hover:opacity-60 transition-opacity"
                style={{ width: '120px', height: 'auto' }}
                draggable={false}
              />
            ) : null;
          })()}
        </div>
      </div>

      {/* Skip hint */}
      {phase !== 'menu' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse">
          <p className="text-ocean-400/50 text-xs tracking-wider">Click or press Enter to skip</p>
        </div>
      )}

      {/* World Intro overlay (plays before prologue starts) */}
      {showWorldIntro && (
        <WorldIntro onComplete={() => startGame()} />
      )}
    </div>
  );
};
