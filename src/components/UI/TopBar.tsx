import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { GamePanel } from '../../types/game';
import { useSfx } from '../../hooks/useAudio';
import { ObjectiveIndicator } from './ObjectiveTracker';
import { getWardenThreatLevel, getWardenThreatDescription } from '../../systems/wardenscale';
import { NotificationLog } from './NotificationLog';
import { getImagePath } from '../../utils/images';
import GameIcon from './GameIcon';

// Hook to detect resource changes and flash the indicator
function useResourceFlash(value: number): string {
  const prevRef = useRef(value);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlash(value > prevRef.current ? 'up' : 'down');
      prevRef.current = value;
      const t = setTimeout(() => setFlash(null), 800);
      return () => clearTimeout(t);
    }
  }, [value]);

  if (flash === 'up') return 'animate-pulse text-green-300';
  if (flash === 'down') return 'animate-pulse text-crimson-300';
  return '';
}

const panelTabs: { id: GamePanel; label: string; icon: string; key: string }[] = [
  { id: 'story', label: 'STORY', icon: '📜', key: '1' },
  { id: 'map', label: 'MAP', icon: '🗺️', key: '2' },
  { id: 'management', label: 'COMMAND', icon: '⚓', key: '3' },
];

export const TopBar: React.FC = () => {
  const activePanel = useGameStore(s => s.activePanel);
  const setActivePanel = useGameStore(s => s.setActivePanel);
  const mc = useGameStore(s => s.mc);
  const dayCount = useGameStore(s => s.dayCount);
  const resources = useGameStore(s => s.resources);
  const gameStarted = useGameStore(s => s.gameStarted);
  const saveGame = useGameStore(s => s.saveGame);
  const hasSaveData = useGameStore(s => s.hasSaveData);
  const loadGame = useGameStore(s => s.loadGame);
  const deleteSave = useGameStore(s => s.deleteSave);
  const islands = useGameStore(s => s.islands);
  const crew = useGameStore(s => s.crew);
  const playSfx = useSfx();
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);
  const [showNotifLog, setShowNotifLog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | 'load' | 'deleteSave'>(null);
  const [confirmSlot, setConfirmSlot] = useState<number>(0);
  const notifications = useGameStore((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Resource change flash animations
  const sovFlash = useResourceFlash(resources.sovereigns);
  const supFlash = useResourceFlash(resources.supplies);
  const matFlash = useResourceFlash(resources.materials);
  const intFlash = useResourceFlash(resources.intelligence);

  // Wardensea threat level calculation
  const conqueredCount = islands ? islands.filter((i) => i.status === 'controlled').length : 0;
  const threatLevel = getWardenThreatLevel(mc.bounty, conqueredCount);
  const threatInfo = getWardenThreatDescription(threatLevel);

  if (!gameStarted) return null;

  const inCombat = activePanel === 'combat';

  const handleQuickSave = () => {
    const success = saveGame(1);
    if (success) {
      setSaveFlash(true);
      setTimeout(() => setSaveFlash(false), 1200);
    }
  };

  const handleSaveToSlot = (slot: number) => {
    const success = saveGame(slot);
    if (success) {
      setSaveFlash(true);
      setTimeout(() => {
        setSaveFlash(false);
        setShowSaveMenu(false);
      }, 800);
    }
  };

  const handleLoadFromSlot = (slot: number) => {
    setConfirmSlot(slot);
    setConfirmAction('load');
  };

  const handleDeleteFromSlot = (slot: number) => {
    setConfirmSlot(slot);
    setConfirmAction('deleteSave');
  };

  const executeConfirmedAction = () => {
    if (confirmAction === 'load') {
      loadGame(confirmSlot);
      setShowSaveMenu(false);
    }
    if (confirmAction === 'deleteSave') {
      deleteSave(confirmSlot);
      setShowSaveMenu(false);
      requestAnimationFrame(() => setShowSaveMenu(true));
    }
    setConfirmAction(null);
  };

  // During combat, show a minimal top bar
  if (inCombat) {
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-crimson-900/80 border-b border-crimson-600">
        <div className="flex items-center gap-2">
          <span className="text-crimson-400 text-base font-display font-bold tracking-widest">⚔️ COMBAT</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-base">
            <span className="text-ocean-400 font-display">BOUNTY</span>{' '}
            <span className={`font-bold ${mc.bounty > 0 ? 'text-crimson-400' : 'text-ocean-300'}`}>
              {mc.bounty > 0 ? `${(mc.bounty / 1000000).toFixed(0)}M` : 'UNKNOWN'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-ocean-800 border-b border-ocean-600 relative z-50">
      {/* Left: Icon + Panel Tabs */}
      <div className="flex items-center gap-3" role="tablist" aria-label="Game panels">
        {(() => {
          const icon = getImagePath('icon_godtide.webp');
          return icon ? (
            <img src={icon} alt="" className="w-9 h-9 rounded-md opacity-80" draggable={false} />
          ) : null;
        })()}
        <div className="flex gap-1">
        {panelTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { playSfx('click'); setActivePanel(tab.id); }}
            className={`px-5 py-2.5 text-base font-display font-bold tracking-[0.15em] transition-all duration-200 rounded-sm ${
              activePanel === tab.id
                ? 'bg-ocean-600 text-gold-400 border border-gold-500/30'
                : 'text-ocean-300 hover:text-ocean-100 hover:bg-ocean-700'
            }`}
            title={`${tab.label} (${tab.key})`}
            aria-label={`${tab.label} panel, keyboard shortcut ${tab.key}`}
            aria-selected={activePanel === tab.id}
            role="tab"
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            <span className="ml-1.5 text-ocean-500 text-xs opacity-60">{tab.key}</span>
          </button>
        ))}
        </div>
      </div>

      {/* Center: Objective + Day & Bounty */}
      <div className="flex items-center gap-4">
        <ObjectiveIndicator />
        <div className="border-l border-ocean-600 pl-4 flex items-center gap-4">
          <div className="text-base text-ocean-300">
            <span className="text-ocean-400 font-display">DAY</span>{' '}
            <span className="text-ocean-100 font-bold text-lg">{dayCount}</span>
          </div>
          <div className="text-base">
            <span className="text-ocean-400 font-display">BOUNTY</span>{' '}
            <span className={`font-bold text-lg ${mc.bounty > 0 ? 'text-crimson-400' : 'text-ocean-300'}`}>
              {mc.bounty > 0 ? `${(mc.bounty / 1000000).toFixed(0)}M` : 'UNKNOWN'}
            </span>
          </div>
          {threatLevel > 0 && (
            <div className="text-base">
              <span className="text-ocean-400 font-display">WARDENSEA</span>{' '}
              <span className={`font-bold text-sm ${threatInfo.color}`}>
                {threatInfo.label}
              </span>
            </div>
          )}
          {/* Crew count */}
          {(() => {
            const recruited = (crew || []).filter((m) => m.recruited && m.alive);
            const unhappy = recruited.filter((m) => m.mood === 'disgruntled' || m.mood === 'mutinous');
            return (
              <div className="text-base" title={`${recruited.length} crew members active${unhappy.length > 0 ? `, ${unhappy.length} unhappy` : ''}`}>
                <span className="text-ocean-400 font-display">CREW</span>{' '}
                <span className={`font-bold text-lg ${unhappy.length > 0 ? 'text-amber-400' : 'text-ocean-200'}`}>
                  {recruited.length}
                </span>
                {unhappy.length > 0 && (
                  <span className="text-crimson-400 text-xs ml-1 animate-pulse">⚠</span>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Right: Resources + Save + Settings + Log */}
      <div className="flex items-center gap-4 text-base">
        <div className="flex items-center gap-1.5 cursor-help group relative" title="Sovereigns - Currency for purchases, upgrades, and bribes">
          <GameIcon iconKey="sovereignty" fallback="⬡" className="w-6 h-6" />
          <span className={`text-ocean-200 font-bold text-lg group-hover:text-gold-400 transition-colors ${sovFlash}`}>{resources.sovereigns.toLocaleString()}</span>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-ocean-800 border border-ocean-600 px-3 py-2 rounded shadow-xl text-xs text-ocean-300 w-44 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            <span className="text-gold-400 font-bold">SOVEREIGNS</span>
            <p className="mt-1">Currency. Buy gear, bribe officials, fund upgrades.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 cursor-help group relative" title="Supplies - Daily upkeep for crew and territories">
          <GameIcon iconKey="supplies" fallback="◈" className="w-6 h-6" />
          <span className={`text-ocean-200 font-bold text-lg group-hover:text-green-400 transition-colors ${supFlash}`}>{resources.supplies}</span>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-ocean-800 border border-ocean-600 px-3 py-2 rounded shadow-xl text-xs text-ocean-300 w-44 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            <span className="text-green-400 font-bold">SUPPLIES</span>
            <p className="mt-1">Food and provisions. Consumed daily. Running out loses crew morale.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 cursor-help group relative" title="Materials - Used for territory upgrades and ship repairs">
          <GameIcon iconKey="materials" fallback="⬢" className="w-6 h-6" />
          <span className={`text-ocean-200 font-bold text-lg group-hover:text-iron-300 transition-colors ${matFlash}`}>{resources.materials}</span>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-ocean-800 border border-ocean-600 px-3 py-2 rounded shadow-xl text-xs text-ocean-300 w-44 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            <span className="text-iron-300 font-bold">MATERIALS</span>
            <p className="mt-1">Building materials. Build territory upgrades and repair infrastructure.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 cursor-help group relative" title="Intelligence - Information for conquests and strategy">
          <GameIcon iconKey="intelligence" fallback="◉" className="w-6 h-6" />
          <span className={`text-ocean-200 font-bold text-lg group-hover:text-purple-400 transition-colors ${intFlash}`}>{resources.intelligence}</span>
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-ocean-800 border border-ocean-600 px-3 py-2 rounded shadow-xl text-xs text-ocean-300 w-44 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            <span className="text-purple-400 font-bold">INTELLIGENCE</span>
            <p className="mt-1">Intel and contacts. Required for subversion conquests and strategic advantages.</p>
          </div>
        </div>
        <div className="border-l border-ocean-600 pl-3 ml-1 flex items-center gap-3">
          {/* Quick Save */}
          <button
            onClick={handleQuickSave}
            className={`text-base font-bold tracking-wider px-2 py-1 rounded transition-all duration-300 ${
              saveFlash
                ? 'text-amber-300 bg-amber-600/30 border border-amber-500/50'
                : 'text-ocean-400 hover:text-amber-400 hover:bg-ocean-700'
            }`}
            title="Quick Save (Slot 1)"
            aria-label="Quick save to slot 1"
          >
            {saveFlash ? '✓ SAVED' : '💾'}
          </button>

          {/* Save Menu Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowSaveMenu(!showSaveMenu)}
              className={`text-ocean-400 hover:text-ocean-200 transition-colors text-sm px-1 ${
                showSaveMenu ? 'text-amber-400' : ''
              }`}
              title="Save/Load Menu"
              aria-label="Save and load menu"
              aria-expanded={showSaveMenu}
            >
              ▼
            </button>

            {showSaveMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-ocean-800 border border-ocean-500 rounded shadow-xl z-50">
                <div className="p-3 border-b border-ocean-600">
                  <h3 className="text-amber-400 font-display text-sm font-bold tracking-wider">SAVE / LOAD</h3>
                </div>

                {[1, 2].map((slot) => {
                  const has = hasSaveData(slot);
                  const raw = has ? localStorage.getItem(`godtide_save_${slot}`) : null;
                  let meta: any = null;
                  try { meta = raw ? JSON.parse(raw) : null; } catch { /* corrupted save */ }

                  return (
                    <div key={slot} className="p-3 border-b border-ocean-700 hover:bg-ocean-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-ocean-200 text-sm font-bold">SLOT {slot}</span>
                        {has && meta && (
                          <span className="text-ocean-400 text-xs">
                            Day {meta.dayCount} - {new Date(meta.timestamp).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => handleSaveToSlot(slot)}
                          className="px-3 py-1 text-xs font-bold bg-ocean-600 text-ocean-100 hover:bg-amber-600 transition-colors rounded"
                          aria-label={`Save to slot ${slot}`}
                        >
                          SAVE
                        </button>
                        {has && (
                          <>
                            <button
                              onClick={() => handleLoadFromSlot(slot)}
                              className="px-3 py-1 text-xs font-bold bg-ocean-600 text-ocean-100 hover:bg-ocean-500 transition-colors rounded"
                              aria-label={`Load from slot ${slot}`}
                            >
                              LOAD
                            </button>
                            <button
                              onClick={() => handleDeleteFromSlot(slot)}
                              className="px-2 py-1 text-xs text-crimson-400 hover:text-crimson-300 hover:bg-crimson-900/30 transition-colors rounded"
                              aria-label={`Delete save slot ${slot}`}
                            >
                              ✕
                            </button>
                          </>
                        )}
                        {!has && (
                          <span className="text-ocean-500 text-xs italic self-center">Empty</span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Autosave info */}
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-ocean-400 text-xs">
                      {hasSaveData(0) ? '✓ Autosave active' : 'No autosave'}
                    </span>
                    <button
                      onClick={() => setShowSaveMenu(false)}
                      className="text-ocean-400 hover:text-ocean-200 text-xs"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pause/Menu Button */}
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }))}
            className="text-ocean-400 hover:text-ocean-200 transition-colors text-lg"
            title="Menu (Esc)"
            aria-label="Open pause menu"
          >
            ⚙
          </button>

          {/* Event Log */}
          <button
            onClick={() => { playSfx('click'); setShowNotifLog(true); }}
            className="text-ocean-400 hover:text-ocean-200 transition-colors text-lg relative"
            title="Event Log"
            aria-label={`Event log${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
          >
            📋
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-crimson-500 rounded-full text-xs text-white flex items-center justify-center font-bold animate-pulse" aria-hidden="true">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Confirmation overlay */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[75]">
          <div className="bg-ocean-900 border border-amber-500/30 rounded-lg p-6 max-w-sm text-center">
            <p className="text-ocean-200 mb-4">
              {confirmAction === 'load' && 'Load this save? Unsaved progress will be lost.'}
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

      {/* Notification Log Panel */}
      <NotificationLog isOpen={showNotifLog} onClose={() => setShowNotifLog(false)} />
    </div>
  );
};
