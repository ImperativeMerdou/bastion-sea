// =============================================
// GODTIDE: BASTION SEA - Player Behavior Profile
// =============================================
// Tracks player's choice patterns across the
// game to determine behavioral archetype.
// Used by the Grimoire to editorialize.
// =============================================

import type { ChoiceArchetype } from './crewAdvisor';

// ==========================================
// TYPES
// ==========================================

export interface PlayerBehaviorProfile {
  violentChoices: number;
  diplomaticChoices: number;
  greedyChoices: number;
  mercifulChoices: number;
  totalChoices: number;
}

export type PlayerArchetype =
  | 'conqueror'
  | 'diplomat'
  | 'merchant'
  | 'liberator'
  | 'pragmatist';

// ==========================================
// DEFAULTS
// ==========================================

export const DEFAULT_PLAYER_PROFILE: PlayerBehaviorProfile = {
  violentChoices: 0,
  diplomaticChoices: 0,
  greedyChoices: 0,
  mercifulChoices: 0,
  totalChoices: 0,
};

// ==========================================
// CLASSIFICATION
// ==========================================

/**
 * Map a choice archetype to which behavioral counter it increments.
 * Returns null for archetypes that don't strongly map (practical).
 */
export function classifyChoice(archetype: ChoiceArchetype): keyof PlayerBehaviorProfile | null {
  switch (archetype) {
    case 'aggressive': return 'violentChoices';
    case 'diplomatic': return 'diplomaticChoices';
    case 'trade':      return 'greedyChoices';
    case 'cautious':   return 'mercifulChoices';
    case 'risky':      return 'violentChoices'; // risk-takers overlap with conqueror archetype
    case 'practical':  return null; // neutral, doesn't push any archetype
  }
}

/**
 * Determine the dominant player archetype from their choice history.
 * Requires at least 15 total choices to have enough signal.
 * Returns 'pragmatist' if no clear dominant pattern (balanced play).
 */
export function getPlayerArchetype(profile: PlayerBehaviorProfile): PlayerArchetype {
  if (profile.totalChoices < 15) return 'pragmatist';

  const total = profile.totalChoices;
  const threshold = 0.35; // 35% of choices must lean one way

  const ratios = {
    conqueror: profile.violentChoices / total,
    diplomat: profile.diplomaticChoices / total,
    merchant: profile.greedyChoices / total,
    liberator: profile.mercifulChoices / total,
  };

  // Find the highest ratio
  let best: PlayerArchetype = 'pragmatist';
  let bestRatio = threshold;

  for (const [archetype, ratio] of Object.entries(ratios)) {
    if (ratio > bestRatio) {
      bestRatio = ratio;
      best = archetype as PlayerArchetype;
    }
  }

  return best;
}

/**
 * Increment the appropriate counter in the profile.
 * Returns a new profile object (immutable update).
 */
export function incrementProfile(
  profile: PlayerBehaviorProfile,
  archetype: ChoiceArchetype,
): PlayerBehaviorProfile {
  const counter = classifyChoice(archetype);
  const updated = {
    ...profile,
    totalChoices: profile.totalChoices + 1,
  };
  if (counter && counter !== 'totalChoices') {
    updated[counter] = profile[counter] + 1;
  }
  return updated;
}
