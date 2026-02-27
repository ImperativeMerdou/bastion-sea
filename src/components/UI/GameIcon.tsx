import React from 'react';
import { getIconPath } from '../../utils/images';

/**
 * Maps combat effect types and game concepts to icon image keys.
 * Falls back to emoji if no image asset exists.
 */
const EFFECT_ICON_MAP: Record<string, string> = {
  // Combat status effects
  bleed: 'bleed',
  shield: 'shield',
  dodge: 'dodge',
  heal: 'heal',
  expose: 'expose',
  buff_accuracy: 'precision',
  dominion_surge: 'thunder',
  buff_attack: 'iron_attack',
  buff_defense: 'iron_defense',

  // Combat action categories
  combat_attack: 'combat_attack',
  combat_defend: 'combat_defend',
  combat_crew: 'combat_crew',

  // Dominion stats
  iron: 'iron',
  sight: 'sight',
  king: 'king',

  // Resources
  sovereignty: 'sovereignty',
  sovereigns: 'sovereignty',
  supplies: 'supplies',
  materials: 'materials',
  intelligence: 'intelligence',
};

interface GameIconProps {
  /** Either an effect type key (e.g. 'bleed', 'shield') or a direct icon key */
  iconKey: string;
  /** Emoji fallback to display if no image is found */
  fallback?: string;
  /** CSS class for sizing -- defaults to 'w-4 h-4' */
  className?: string;
  /** Alt text for accessibility */
  alt?: string;
}

/**
 * Renders a game icon as an image if the asset exists,
 * otherwise falls back to the provided emoji string.
 */
const GameIcon: React.FC<GameIconProps> = ({
  iconKey,
  fallback,
  className = 'w-4 h-4',
  alt,
}) => {
  // Resolve through the effect map first, then try direct key
  const resolvedKey = EFFECT_ICON_MAP[iconKey] || iconKey;
  const imagePath = getIconPath(resolvedKey);

  if (imagePath) {
    return (
      <img
        src={imagePath}
        alt={alt || iconKey}
        className={`${className} inline-block object-contain`}
        draggable={false}
      />
    );
  }

  // Fallback to emoji
  return <span>{fallback || '✦'}</span>;
};

export default GameIcon;

/**
 * Get an icon image path for a combat effect type, or null.
 * Useful for non-React contexts (e.g. building status effect objects).
 */
export function getEffectIconPath(effectType: string): string | null {
  const key = EFFECT_ICON_MAP[effectType] || effectType;
  return getIconPath(key);
}
