import React from 'react';
import { DominionTier } from '../../types/game';
import { getPortrait } from '../../utils/images';
import GameIcon from '../UI/GameIcon';

export const tierColors: Record<DominionTier, string> = {
  flicker: 'text-ocean-400',
  tempered: 'text-ocean-200',
  forged: 'text-amber-400',
  prime: 'text-crimson-400',
  conqueror: 'text-crimson-300',
};

export const tierLabels: Record<DominionTier, string> = {
  flicker: 'FLICKER',
  tempered: 'TEMPERED',
  forged: 'FORGED',
  prime: 'PRIME',
  conqueror: 'CONQUEROR',
};

export const moodColors: Record<string, string> = {
  loyal: 'text-green-400',
  content: 'text-ocean-200',
  uneasy: 'text-amber-400',
  disgruntled: 'text-crimson-400',
  mutinous: 'text-crimson-300',
};

export const DominionBar: React.FC<{ label: string; tier: DominionTier; level: number; showLevel?: boolean }> = ({
  label, tier, level, showLevel = false,
}) => {
  const tierIndex = ['flicker', 'tempered', 'forged', 'prime', 'conqueror'].indexOf(tier);
  const totalProgress = (tierIndex * 100 + level) / 5;

  return (
    <div className="flex items-center gap-3">
      <span className="text-ocean-400 text-xs w-12 uppercase tracking-wider inline-flex items-center gap-1">
        <GameIcon iconKey={label.toLowerCase()} fallback="" className="w-4 h-4" />
        {label}
      </span>
      <div className="flex-1 h-2 bg-ocean-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            tier === 'conqueror' ? 'bg-crimson-400' :
            tier === 'prime' ? 'bg-crimson-500' :
            tier === 'forged' ? 'bg-amber-500' :
            tier === 'tempered' ? 'bg-ocean-300' :
            'bg-ocean-500'
          }`}
          style={{ width: `${totalProgress}%` }}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold tracking-wider ${tierColors[tier]}`}>
          {tierLabels[tier]}
        </span>
        {showLevel && (
          <span className="text-ocean-500 text-xs font-mono">{level}/100</span>
        )}
      </div>
    </div>
  );
};

export const PortraitImage: React.FC<{ characterId: string; fallback: string; size?: string }> = ({
  characterId, fallback, size = 'w-24 h-32',
}) => {
  const portrait = getPortrait(characterId);
  return portrait ? (
    <img
      src={portrait}
      alt={characterId}
      className={`${size} object-cover border-2 border-ocean-500 rounded-sm`}
    />
  ) : (
    <div className={`${size} bg-ocean-800 border-2 border-ocean-500 rounded-sm flex items-center justify-center`}>
      <span className="text-4xl">{fallback}</span>
    </div>
  );
};
