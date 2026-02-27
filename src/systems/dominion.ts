// =============================================
// GODTIDE: BASTION SEA - Dominion Progression
// =============================================
// Dominion grows through combat, conquest, and
// critical story moments. Iron sharpens through
// fighting. Sight deepens through observation.
// King awakens through leading.
// =============================================

import { DominionTier, DominionExpression, DominionProfile } from '../types/game';

/**
 * Tier order - each tier is 0-100 levels within it.
 * Total effective power = tierIndex * 100 + level
 */
const TIER_ORDER: DominionTier[] = ['flicker', 'tempered', 'forged', 'prime', 'conqueror'];

/**
 * XP required to gain one level at each tier.
 * Higher tiers need more XP per level.
 */
const XP_PER_LEVEL: Record<DominionTier, number> = {
  flicker: 10,
  tempered: 18,
  forged: 30,
  prime: 50,
  conqueror: 80,
};

/**
 * Get the next tier. Returns null if already at max.
 */
export function getNextTier(current: DominionTier): DominionTier | null {
  const idx = TIER_ORDER.indexOf(current);
  if (idx < 0 || idx >= TIER_ORDER.length - 1) return null;
  return TIER_ORDER[idx + 1];
}

/**
 * Result of applying dominion XP.
 */
export interface DominionGainResult {
  expression: DominionExpression;
  xpGained: number;
  levelsGained: number;
  oldTier: DominionTier;
  newTier: DominionTier;
  oldLevel: number;
  newLevel: number;
  promoted: boolean;  // tier changed
}

/**
 * Apply XP to a dominion expression. Handles level-up and tier promotion.
 * Returns new tier/level and metadata about what changed.
 *
 * @param profile Current dominion profile
 * @param expression Which expression to train
 * @param xp Raw XP to add
 * @param xpBonus Percentage bonus from territory/gear (0 = none)
 */
export function applyDominionXP(
  profile: DominionProfile,
  expression: DominionExpression,
  xp: number,
  xpBonus: number = 0,
): { newProfile: DominionProfile; result: DominionGainResult } {
  const current = profile[expression];
  const effectiveXP = Math.floor(xp * (1 + xpBonus / 100));

  let tier = current.tier;
  let level = current.level;
  let partialXP = (current.xp || 0) + effectiveXP;
  let levelsGained = 0;
  const oldTier = tier;
  const oldLevel = level;

  while (partialXP > 0) {
    const costPerLevel = XP_PER_LEVEL[tier];

    if (partialXP >= costPerLevel) {
      partialXP -= costPerLevel;
      level++;

      // Check for tier promotion
      if (level >= 100) {
        const next = getNextTier(tier);
        if (next) {
          tier = next;
          level = 0; // Reset level within new tier
          levelsGained++;
        } else {
          level = 100; // Cap at conqueror 100
          partialXP = 0;
          // At max tier+level: don't count as a level gained (prevents phantom notifications)
          break;
        }
      } else {
        levelsGained++;
      }
    } else {
      // Carry partial XP to next gain
      break;
    }
  }

  const newProfile: DominionProfile = {
    ...profile,
    [expression]: { tier, level, xp: partialXP },
  };

  return {
    newProfile,
    result: {
      expression,
      xpGained: effectiveXP,
      levelsGained,
      oldTier,
      newTier: tier,
      oldLevel,
      newLevel: level,
      promoted: oldTier !== tier,
    },
  };
}

/**
 * Combat XP rewards based on enemy difficulty.
 * Returns XP amounts for each expression based on combat performance.
 */
export function calculateCombatDominionXP(
  enemyTier: string,
  rounds: number,
  damageTaken: number,
  maxHp: number,
  kingMeter: number,
): { iron: number; sight: number; king: number } {
  // Base XP by enemy tier
  const baseXP: Record<string, number> = {
    fodder: 8,
    soldier: 15,
    elite: 25,
    commander: 40,
    prime: 60,
  };

  const base = baseXP[enemyTier] || 15;

  // Iron XP - scales with damage dealt (fighting hard)
  // Base + bonus for surviving heavy damage
  const survivalBonus = damageTaken > maxHp * 0.5 ? Math.floor(base * 0.3) : 0;
  const ironXP = base + survivalBonus;

  // Sight XP - scales inversely with rounds (efficiency)
  // Quick fights = better reading of the enemy
  const efficiencyBonus = rounds <= 3 ? Math.floor(base * 0.4) : rounds <= 5 ? Math.floor(base * 0.2) : 0;
  const sightXP = Math.floor(base * 0.6) + efficiencyBonus;

  // King XP - scales with King meter usage
  // Leading through combat presence
  const kingBonus = kingMeter > 50 ? Math.floor(base * 0.5) : kingMeter > 25 ? Math.floor(base * 0.25) : 0;
  const kingXP = Math.floor(base * 0.3) + kingBonus;

  return { iron: ironXP, sight: sightXP, king: kingXP };
}

/**
 * Get display description for a tier promotion.
 */
export function getTierPromotionText(expression: DominionExpression, newTier: DominionTier): string {
  const descriptions: Record<DominionExpression, Record<DominionTier, string>> = {
    iron: {
      flicker: 'Your body remembers violence.',
      tempered: 'Your strikes carry weight. Iron Dominion tempered.',
      forged: 'Every blow lands like a forge hammer. Iron Dominion forged.',
      prime: 'The sea itself flinches. Iron Dominion: Prime.',
      conqueror: 'Danzai sings in your hands. Iron Dominion: CONQUEROR.',
    },
    sight: {
      flicker: 'You notice things others miss.',
      tempered: 'The battlefield reads like a page. Sight Dominion tempered.',
      forged: 'You see the move before they make it. Sight Dominion forged.',
      prime: 'Nothing escapes you. Sight Dominion: Prime.',
      conqueror: 'The world is transparent. Sight Dominion: CONQUEROR.',
    },
    king: {
      flicker: 'Something stirs when you speak.',
      tempered: 'People listen when you talk. King Dominion tempered.',
      forged: 'Your presence changes the room. King Dominion forged.',
      prime: 'Even enemies hesitate. King Dominion: Prime.',
      conqueror: 'The sea knows your name. King Dominion: CONQUEROR.',
    },
  };

  return descriptions[expression][newTier];
}
