import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useAudioControls } from '../../hooks/useAudio';
import { musicManager } from '../../systems/music';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { CODEX_ENTRIES, CODEX_CATEGORIES, type CodexCategory } from '../../data/codex';
import { getImagePath } from '../../utils/images';

type PauseTab = 'main' | 'save' | 'load' | 'settings' | 'codex';

interface PauseMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({ isOpen, onClose }) => {
  const saveGame = useGameStore(s => s.saveGame);
  const loadGame = useGameStore(s => s.loadGame);
  const hasSaveData = useGameStore(s => s.hasSaveData);
  const deleteSave = useGameStore(s => s.deleteSave);
  const dayCount = useGameStore(s => s.dayCount);
  const gamePhase = useGameStore(s => s.gamePhase);
  const mc = useGameStore(s => s.mc);
  const combatState = useGameStore(s => s.combatState);
  const typingSpeedPreset = useGameStore(s => s.typingSpeedPreset);
  const setTypingSpeed = useGameStore(s => s.setTypingSpeed);
  const flags = useGameStore(s => s.flags);
  const inCombat = !!combatState;
  const { isMuted, masterVol, sfxVol, ambientVol, musicVol, toggleMute, setMasterVolume, setSfxVolume, setAmbientVolume, setMusicVolume } = useAudioControls();
  const [tab, setTab] = useState<PauseTab>('main');
  const [saveFlash, setSaveFlash] = useState<number | null>(null);
  const [codexCategory, setCodexCategory] = useState<CodexCategory>('world');
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<null | 'save' | 'load' | 'mainMenu' | 'deleteSave'>(null);
  const [confirmSlot, setConfirmSlot] = useState<number>(0);
  const trapRef = useFocusTrap(isOpen);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup flash timer on unmount
  useEffect(() => {
    return () => { if (flashTimerRef.current) clearTimeout(flashTimerRef.current); };
  }, []);

  // Reset to main tab when opened, dim music
  useEffect(() => {
    if (isOpen) {
      setTab('main');
      musicManager.onPauseOpen();
    } else {
      musicManager.onPauseClose();
    }
  }, [isOpen]);

  // Refs to avoid stale closures and listener churn
  const tabRef = useRef(tab);
  const onCloseRef = useRef(onClose);
  const confirmActionRef = useRef(confirmAction);
  useEffect(() => { tabRef.current = tab; }, [tab]);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);
  useEffect(() => { confirmActionRef.current = confirmAction; }, [confirmAction]);

  // Escape to close or go back -- single stable listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        e.preventDefault();
        // Dismiss confirmation dialog first
        if (confirmActionRef.current) {
          setConfirmAction(null);
        } else if (tabRef.current !== 'main') {
          setTab('main');
        } else {
          onCloseRef.current();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (slot: number) => {
    if (hasSaveData(slot)) {
      setConfirmSlot(slot);
      setConfirmAction('save');
      return;
    }
    const success = saveGame(slot);
    if (success) {
      setSaveFlash(slot);
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => setSaveFlash(null), 1200);
    }
  };

  const handleLoad = (slot: number) => {
    setConfirmSlot(slot);
    setConfirmAction('load');
  };

  const handleDelete = (slot: number) => {
    setConfirmSlot(slot);
    setConfirmAction('deleteSave');
  };

  const handleReturnToTitle = () => {
    setConfirmAction('mainMenu');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const executeConfirmedAction = () => {
    if (confirmAction === 'save') {
      const success = saveGame(confirmSlot);
      if (success) {
        setSaveFlash(confirmSlot);
        if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
        flashTimerRef.current = setTimeout(() => setSaveFlash(null), 1200);
      }
    }
    if (confirmAction === 'load') {
      loadGame(confirmSlot);
      onClose();
    }
    if (confirmAction === 'mainMenu') {
      window.location.reload();
    }
    if (confirmAction === 'deleteSave') {
      deleteSave(confirmSlot);
    }
    setConfirmAction(null);
  };

  const getSaveMeta = (slot: number) => {
    try {
      const key = slot === 0 ? 'godtide_autosave' : `godtide_save_${slot}`;
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const formatPhase = (phase: string) => {
    const map: Record<string, string> = {
      prologue: 'PROLOGUE',
      act1: 'ACT 1',
      act2: 'ACT 2',
      act3: 'ACT 3',
      endgame: 'ENDGAME',
    };
    return map[phase] || (phase ? phase.toUpperCase() : '???');
  };

  const renderSlot = (slot: number, mode: 'save' | 'load') => {
    const has = hasSaveData(slot);
    const meta = has ? getSaveMeta(slot) : null;

    return (
      <div
        key={slot}
        className="bg-ocean-800/80 border border-ocean-600 rounded px-5 py-4 hover:border-ocean-400 transition-colors"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-ocean-100 text-sm font-display font-bold tracking-[0.15em]">
            {slot === 0 ? 'AUTOSAVE' : `SLOT ${slot}`}
          </span>
          {has && meta && (
            <span className="text-ocean-400 text-xs">
              {formatPhase(meta.gamePhase)} - Day {meta.dayCount}
            </span>
          )}
        </div>

        {has && meta && (
          <div className="text-ocean-500 text-xs mb-3">
            {meta.timestamp ? new Date(meta.timestamp).toLocaleString() : 'Unknown date'} - Bounty: {
              meta.mc?.bounty ? `${(meta.mc.bounty / 1000000).toFixed(0)}M` : 'Unknown'
            }
          </div>
        )}

        {!has && (
          <div className="text-ocean-600 text-xs mb-3 italic">Empty slot</div>
        )}

        <div className="flex gap-2">
          {mode === 'save' && slot !== 0 && (
            <button
              onClick={() => handleSave(slot)}
              className={`px-4 py-2 text-xs font-bold tracking-wider rounded transition-all duration-300 ${
                saveFlash === slot
                  ? 'bg-amber-600/40 text-amber-300 border border-amber-500/50'
                  : 'bg-ocean-600 text-ocean-100 hover:bg-amber-600 hover:text-white border border-ocean-500'
              }`}
              aria-label={`Save to slot ${slot}`}
            >
              {saveFlash === slot ? 'SAVED' : 'SAVE HERE'}
            </button>
          )}
          {mode === 'load' && has && (
            <button
              onClick={() => handleLoad(slot)}
              className="px-4 py-2 text-xs font-bold tracking-wider bg-ocean-600 text-ocean-100 hover:bg-ocean-500 border border-ocean-500 rounded transition-colors"
              aria-label={`Load from ${slot === 0 ? 'autosave' : `slot ${slot}`}`}
            >
              LOAD
            </button>
          )}
          {has && slot !== 0 && (
            <button
              onClick={() => handleDelete(slot)}
              className="px-3 py-2 text-xs text-crimson-500 hover:text-crimson-300 hover:bg-crimson-900/30 rounded transition-colors"
              aria-label={`Delete save slot ${slot}`}
            >
              DELETE
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={trapRef}
      className="fixed inset-0 z-[70] flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pause menu"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ocean-950/85 backdrop-blur-sm" />

      {/* Menu Panel */}
      <div
        className={`relative z-10 w-full bg-ocean-900 border border-ocean-600 rounded-lg shadow-2xl animate-fade-in ${
          tab === 'codex' ? 'max-w-2xl' : 'max-w-lg'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-ocean-700 flex items-center justify-between">
          <div>
            <h2 className="text-gold-400 font-display text-lg font-bold tracking-[0.15em]">
              {tab === 'main' ? 'PAUSED' : tab === 'save' ? 'SAVE GAME' : tab === 'load' ? 'LOAD GAME' : tab === 'codex' ? 'CODEX' : 'SETTINGS'}
            </h2>
            {tab === 'main' && (
              <p className="text-ocean-500 text-xs mt-1">
                {formatPhase(gamePhase)} - Day {dayCount} - Bounty: {mc.bounty > 0 ? `${(mc.bounty / 1000000).toFixed(0)}M` : 'Unknown'}
              </p>
            )}
          </div>
          <button
            onClick={tab !== 'main' ? () => setTab('main') : onClose}
            className="text-ocean-400 hover:text-ocean-200 text-sm font-bold tracking-wider transition-colors"
            aria-label={tab !== 'main' ? 'Back to main menu' : 'Close pause menu'}
          >
            {tab !== 'main' ? 'BACK' : 'ESC'}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {tab === 'main' && (
            <div className="space-y-3">
              <button
                onClick={onClose}
                className="w-full py-3 bg-amber-700/80 hover:bg-amber-600 border border-amber-500/50 hover:border-amber-400 text-amber-100 text-sm font-display font-bold tracking-[0.15em] uppercase transition-all rounded shadow-sm shadow-amber-500/10"
              >
                RESUME
              </button>
              <button
                onClick={() => !inCombat && setTab('save')}
                disabled={inCombat}
                className={`w-full py-3 border text-sm font-display font-bold tracking-[0.15em] uppercase transition-all rounded ${
                  inCombat
                    ? 'bg-ocean-800 border-ocean-700 text-ocean-600 cursor-not-allowed'
                    : 'bg-ocean-700 hover:bg-ocean-600 border-ocean-500 hover:border-ocean-400 text-ocean-200'
                }`}
              >
                {inCombat ? 'SAVE GAME (IN COMBAT)' : 'SAVE GAME'}
              </button>
              <button
                onClick={() => setTab('load')}
                className="w-full py-3 bg-ocean-700 hover:bg-ocean-600 border border-ocean-500 hover:border-ocean-400 text-ocean-200 text-sm font-display font-bold tracking-[0.15em] uppercase transition-all rounded"
              >
                LOAD GAME
              </button>
              <button
                onClick={() => setTab('settings')}
                className="w-full py-3 bg-ocean-700 hover:bg-ocean-600 border border-ocean-500 hover:border-ocean-400 text-ocean-200 text-sm font-display font-bold tracking-[0.15em] uppercase transition-all rounded"
              >
                SETTINGS
              </button>
              <button
                onClick={() => setTab('codex')}
                className="w-full py-3 bg-ocean-700 hover:bg-ocean-600 border border-ocean-500 hover:border-amber-500/50 text-ocean-200 text-sm font-display font-bold tracking-[0.15em] uppercase transition-all rounded"
              >
                CODEX
              </button>
              <div className="pt-2 border-t border-ocean-700">
                <button
                  onClick={handleReturnToTitle}
                  className="w-full py-3 bg-ocean-800 hover:bg-crimson-900/40 border border-ocean-600 hover:border-crimson-500/50 text-ocean-400 hover:text-crimson-400 text-sm font-display font-bold tracking-[0.15em] uppercase transition-all rounded"
                >
                  RETURN TO TITLE
                </button>
              </div>
            </div>
          )}

          {tab === 'save' && (
            <div className="space-y-3">
              {[1, 2].map((slot) => renderSlot(slot, 'save'))}
            </div>
          )}

          {tab === 'load' && (
            <div className="space-y-3">
              {renderSlot(0, 'load')}
              {[1, 2].map((slot) => renderSlot(slot, 'load'))}
            </div>
          )}

          {tab === 'settings' && (
            <div className="space-y-5">
              {/* Audio */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-ocean-200 text-sm font-display font-bold tracking-[0.15em]">AUDIO</h3>
                  <button
                    onClick={toggleMute}
                    className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                      isMuted
                        ? 'bg-crimson-600/30 text-crimson-400 border border-crimson-500/50'
                        : 'bg-ocean-600 text-ocean-200 hover:bg-ocean-500 border border-ocean-500'
                    }`}
                    aria-label={isMuted ? 'Unmute all audio' : 'Mute all audio'}
                    aria-pressed={isMuted}
                  >
                    {isMuted ? 'UNMUTE' : 'MUTE ALL'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-gold-300 text-xs font-display font-bold tracking-[0.15em]">MASTER</span>
                      <span className="text-ocean-400 text-xs">{Math.round(masterVol * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round(masterVol * 100)}
                      onChange={(e) => setMasterVolume(Number(e.target.value) / 100)}
                      className="w-full h-1.5 bg-ocean-700 rounded-full appearance-none cursor-pointer accent-gold-400"
                      aria-label="Master volume"
                    />
                  </div>
                  <div className="border-t border-ocean-700/50 pt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-ocean-300 text-xs font-display font-bold tracking-[0.15em]">EFFECTS</span>
                      <span className="text-ocean-400 text-xs">{Math.round(sfxVol * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round(sfxVol * 100)}
                      onChange={(e) => setSfxVolume(Number(e.target.value) / 100)}
                      className="w-full h-1.5 bg-ocean-700 rounded-full appearance-none cursor-pointer accent-amber-500"
                      aria-label="Sound effects volume"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-ocean-300 text-xs font-display font-bold tracking-[0.15em]">MUSIC</span>
                      <span className="text-ocean-400 text-xs">{Math.round(musicVol * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round(musicVol * 100)}
                      onChange={(e) => setMusicVolume(Number(e.target.value) / 100)}
                      className="w-full h-1.5 bg-ocean-700 rounded-full appearance-none cursor-pointer accent-crimson-400"
                      aria-label="Music volume"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-ocean-300 text-xs font-display font-bold tracking-[0.15em]">AMBIENCE</span>
                      <span className="text-ocean-400 text-xs">{Math.round(ambientVol * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round(ambientVol * 100)}
                      onChange={(e) => setAmbientVolume(Number(e.target.value) / 100)}
                      className="w-full h-1.5 bg-ocean-700 rounded-full appearance-none cursor-pointer accent-blue-400"
                      aria-label="Ambience volume"
                    />
                  </div>
                </div>
              </div>

              {/* Text Speed */}
              <div className="pt-4 border-t border-ocean-700">
                <h3 className="text-ocean-200 text-sm font-display font-bold tracking-[0.15em] mb-3">TEXT SPEED</h3>
                <div className="flex gap-2">
                  {(['slow', 'normal', 'fast', 'instant'] as const).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setTypingSpeed(preset)}
                      className={`flex-1 py-2 text-xs font-bold tracking-wider rounded transition-all ${
                        typingSpeedPreset === preset
                          ? 'bg-amber-600/40 text-amber-300 border border-amber-500/50'
                          : 'bg-ocean-700 text-ocean-300 hover:bg-ocean-600 border border-ocean-600'
                      }`}
                    >
                      {preset.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Info */}
              <div className="pt-4 border-t border-ocean-700">
                <h3 className="text-ocean-200 text-sm font-display font-bold tracking-[0.15em] mb-2">GAME INFO</h3>
                <div className="text-ocean-500 text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const icon = getImagePath('icon_godtide.webp');
                      return icon ? <img src={icon} alt="" className="w-5 h-5 rounded-sm" draggable={false} /> : null;
                    })()}
                    <p>GODTIDE: BASTION SEA</p>
                  </div>
                  <p>{formatPhase(gamePhase)} - Day {dayCount}</p>
                  <p>Bounty: {mc.bounty > 0 ? `${(mc.bounty / 1000000).toFixed(0)}M` : 'Unknown'}</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'codex' && (
            <div className="space-y-4">
              {/* Category filter buttons */}
              <div className="flex gap-2 flex-wrap">
                {CODEX_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setCodexCategory(cat.id); setExpandedEntry(null); }}
                    className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded transition-all ${
                      codexCategory === cat.id
                        ? 'bg-amber-600/40 text-amber-300 border border-amber-500/50'
                        : 'bg-ocean-700 text-ocean-400 hover:bg-ocean-600 border border-ocean-600'
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>

              {/* Entry list */}
              <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-1">
                {CODEX_ENTRIES.filter((e) => e.category === codexCategory).map((entry) => {
                  const locked = entry.unlockFlag ? !flags[entry.unlockFlag] : false;
                  const isExpanded = expandedEntry === entry.id;

                  if (locked) {
                    return (
                      <div
                        key={entry.id}
                        className="px-4 py-3 bg-ocean-800/50 border border-ocean-700/50 rounded"
                      >
                        <span className="text-ocean-600 text-sm font-display font-bold tracking-[0.15em]">?? UNKNOWN ??</span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={entry.id}
                      onClick={() => setExpandedEntry(isExpanded ? null : entry.id)}
                      className={`w-full text-left px-4 py-3 rounded transition-all ${
                        isExpanded
                          ? 'bg-ocean-700/80 border border-ocean-500'
                          : 'bg-ocean-800/50 border border-ocean-700/50 hover:border-ocean-500/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{entry.icon}</span>
                        <span className={`text-sm font-display font-bold tracking-[0.15em] ${
                          isExpanded ? 'text-gold-300' : 'text-ocean-200'
                        }`}>
                          {entry.title}
                        </span>
                      </div>
                      {isExpanded && (
                        <p className="text-ocean-300 text-sm leading-relaxed mt-3 pl-7 font-narration">
                          {entry.body}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Confirmation overlay */}
        {confirmAction && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[200]" onClick={() => setConfirmAction(null)}>
            <div className="bg-ocean-900 border border-amber-500/30 rounded-lg p-6 max-w-sm text-center" role="alertdialog" aria-modal="true" aria-label="Confirm action" onClick={(e) => e.stopPropagation()}>
              <p className="text-ocean-200 mb-4">
                {confirmAction === 'save' && 'Overwrite this save?'}
                {confirmAction === 'load' && 'Load this save? Unsaved progress will be lost.'}
                {confirmAction === 'mainMenu' && 'Return to title screen? Unsaved progress will be lost.'}
                {confirmAction === 'deleteSave' && 'Delete this save permanently?'}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={executeConfirmedAction}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
