import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { audioManager } from '../../systems/audio';
import { DailyReportEntry } from '../../types/game';

const categoryConfig: Record<string, { label: string; color: string; borderColor: string }> = {
  economy: { label: 'ECONOMY', color: 'text-amber-400', borderColor: 'border-amber-500/30' },
  territory: { label: 'TERRITORY', color: 'text-ocean-300', borderColor: 'border-ocean-400/30' },
  crew: { label: 'CREW', color: 'text-green-400', borderColor: 'border-green-500/30' },
  event: { label: 'EVENT', color: 'text-purple-400', borderColor: 'border-purple-500/30' },
  broadcast: { label: 'GRIMOIRE BROADCAST', color: 'text-amber-300', borderColor: 'border-amber-400/30' },
};

const severityStyles: Record<string, string> = {
  info: 'text-ocean-200',
  warning: 'text-amber-300',
  critical: 'text-crimson-400',
};

export const DailyReportModal: React.FC = () => {
  const pendingDailyReport = useGameStore(s => s.pendingDailyReport);
  const dismissDailyReport = useGameStore(s => s.dismissDailyReport);
  const dayCount = useGameStore(s => s.dayCount);
  const gamePhase = useGameStore(s => s.gamePhase);

  const isVisible = !!pendingDailyReport && pendingDailyReport.length > 0;
  const trapRef = useFocusTrap(isVisible);

  const handleDismiss = () => {
    audioManager.playSfx('text_advance');
    dismissDailyReport();
  };

  // Keyboard dismiss -- Enter, Escape, or Space closes the report
  // Only active when the modal is actually visible (pendingDailyReport is truthy)
  const dismissRef = useRef(handleDismiss);
  dismissRef.current = handleDismiss;
  useEffect(() => {
    if (!isVisible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        e.stopPropagation();
        dismissRef.current();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isVisible]);

  if (!pendingDailyReport || pendingDailyReport.length === 0) return null;

  const formatPhase = (phase: string) => {
    const map: Record<string, string> = {
      prologue: 'PROLOGUE', act1: 'ACT 1', act2: 'ACT 2', act3: 'ACT 3', endgame: 'ENDGAME',
    };
    return map[phase] || phase.toUpperCase();
  };

  // Group entries by category
  const grouped: Record<string, DailyReportEntry[]> = {};
  pendingDailyReport.forEach((entry) => {
    if (!grouped[entry.category]) grouped[entry.category] = [];
    grouped[entry.category].push(entry);
  });

  const categoryOrder = ['economy', 'territory', 'crew', 'event', 'broadcast'];
  const hasCritical = pendingDailyReport.some((e) => e.severity === 'critical');

  return (
    <div
      ref={trapRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-report-title"
    >
      <div className="absolute inset-0 bg-ocean-950/80 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-lg bg-ocean-900 border border-ocean-600 rounded-lg shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b ${hasCritical ? 'border-crimson-500/40' : 'border-ocean-700'}`}>
          <h2 id="daily-report-title" className="text-amber-400 font-display text-lg font-bold tracking-[0.15em]">
            DAY {dayCount} REPORT
          </h2>
          <p className="text-ocean-500 text-xs mt-1">
            {formatPhase(gamePhase)}
          </p>
        </div>

        {/* Report entries grouped by category */}
        <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {categoryOrder.map((cat) => {
            const entries = grouped[cat];
            if (!entries || entries.length === 0) return null;
            const config = categoryConfig[cat] || categoryConfig.event;

            return (
              <div key={cat}>
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${config.color}`}>
                  {config.label}
                </div>
                <div className={`space-y-1.5 pl-1 border-l-2 ${config.borderColor}`}>
                  {entries.map((entry, i) => (
                    <div key={i} className="flex items-start gap-2 pl-3">
                      <span className="text-sm mt-px shrink-0">{entry.icon}</span>
                      <span className={`text-sm ${severityStyles[entry.severity] || 'text-ocean-200'}`}>
                        {entry.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dismiss */}
        <div className="px-6 py-4 border-t border-ocean-700">
          <button
            onClick={handleDismiss}
            className="w-full py-3 bg-ocean-700 hover:bg-ocean-600 border border-ocean-500 hover:border-amber-500/50 text-ocean-100 text-sm font-bold tracking-[0.15em] uppercase transition-all rounded"
          >
            DISMISS <span className="text-ocean-500 text-xs ml-2">[ENTER]</span>
          </button>
        </div>
      </div>
    </div>
  );
};
