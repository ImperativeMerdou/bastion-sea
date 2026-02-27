import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import {
  evaluateObjectives,
  getCurrentMainObjective,
  getActiveObjectiveCount,
  ObjectiveStatus,
} from '../../systems/objectives';

/**
 * Compact objective indicator for the TopBar.
 * Shows current main objective + click to expand full tracker.
 */
export const ObjectiveIndicator: React.FC = () => {
  const flags = useGameStore(s => s.flags);
  const gamePhase = useGameStore(s => s.gamePhase);
  const [showTracker, setShowTracker] = useState(false);

  const mainObjective = getCurrentMainObjective(flags, gamePhase);
  const activeCount = getActiveObjectiveCount(flags, gamePhase);

  if (!mainObjective) return null;

  return (
    <div className="relative">
      {/* Compact indicator */}
      <button
        onClick={() => setShowTracker(!showTracker)}
        className={`flex items-center gap-2 px-3 py-1 rounded transition-all duration-300 text-sm ${
          showTracker
            ? 'bg-amber-600/20 border border-amber-500/40 text-amber-300'
            : 'text-ocean-300 hover:text-amber-400 hover:bg-ocean-700'
        }`}
        title="Objectives"
      >
        <span className="text-amber-400">{mainObjective.icon}</span>
        <span className="hidden md:inline font-bold tracking-wider text-xs max-w-[200px] truncate">
          {mainObjective.title.toUpperCase()}
        </span>
        {activeCount > 1 && (
          <span className="text-xs text-ocean-400 hidden md:inline">+{activeCount - 1}</span>
        )}
        <span className="text-xs text-ocean-500">▼</span>
      </button>

      {/* Expanded tracker overlay */}
      {showTracker && (
        <ObjectivePanel onClose={() => setShowTracker(false)} />
      )}
    </div>
  );
};

/**
 * Full objective panel - shows all active, completed, and locked objectives.
 */
const ObjectivePanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const flags = useGameStore(s => s.flags);
  const gamePhase = useGameStore(s => s.gamePhase);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const evaluated = evaluateObjectives(flags, gamePhase);

  const filtered = evaluated.filter((e) => {
    if (filter === 'active') return e.status === 'active';
    if (filter === 'completed') return e.status === 'completed';
    return e.status !== 'locked'; // 'all' shows active + completed, not locked
  });

  const activeCount = evaluated.filter((e) => e.status === 'active').length;
  const completedCount = evaluated.filter((e) => e.status === 'completed').length;

  const statusStyles: Record<ObjectiveStatus, string> = {
    active: 'border-l-amber-400 bg-ocean-800/80',
    completed: 'border-l-green-400 bg-ocean-800/40 opacity-70',
    locked: 'border-l-ocean-600 bg-ocean-900/40 opacity-40',
  };

  const categoryLabels: Record<string, string> = {
    main: 'MAIN QUEST',
    territory: 'TERRITORY',
    crew: 'CREW',
    combat: 'COMBAT',
    exploration: 'EXPLORATION',
  };

  const categoryColors: Record<string, string> = {
    main: 'text-amber-400',
    territory: 'text-crimson-400',
    crew: 'text-purple-400',
    combat: 'text-red-400',
    exploration: 'text-green-400',
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-96 max-h-[500px] bg-ocean-850 border border-ocean-500 rounded shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-ocean-600 flex items-center justify-between bg-ocean-800">
        <div>
          <h3 className="text-amber-400 font-display text-sm font-bold tracking-wider">OBJECTIVES</h3>
          <p className="text-ocean-400 text-xs mt-0.5">
            {activeCount} active • {completedCount} complete
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-ocean-400 hover:text-ocean-200 text-sm"
        >
          ✕
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-1 p-2 border-b border-ocean-700">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs font-bold tracking-wider rounded transition-colors ${
              filter === f
                ? 'bg-amber-600/30 text-amber-300 border border-amber-500/30'
                : 'text-ocean-400 hover:text-ocean-200 hover:bg-ocean-700'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Objective List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filtered.length === 0 && (
          <p className="text-ocean-500 text-sm text-center py-4 italic">
            {filter === 'completed' ? 'Nothing completed yet. Get to work.' : 'No objectives available.'}
          </p>
        )}

        {filtered.map(({ objective, status }) => (
          <div
            key={objective.id}
            className={`border-l-2 rounded-r px-3 py-2 ${statusStyles[status]}`}
          >
            <div className="flex items-start gap-2">
              <span className="text-base mt-0.5">
                {status === 'completed' ? '✅' : objective.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-bold ${
                    status === 'completed' ? 'text-ocean-400 line-through' : 'text-ocean-100'
                  }`}>
                    {objective.title}
                  </h4>
                  <span className={`text-xs ${categoryColors[objective.category] || 'text-ocean-400'}`}>
                    {categoryLabels[objective.category]}
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${
                  status === 'completed' ? 'text-ocean-500' : 'text-ocean-300'
                }`}>
                  {objective.description}
                </p>
                {status === 'active' && (
                  <p className="text-xs text-amber-400/80 mt-1 italic">
                    💡 {objective.hint}
                  </p>
                )}
                {objective.reward && status === 'active' && (
                  <p className="text-xs text-green-400/70 mt-0.5">
                    🎁 {objective.reward}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
