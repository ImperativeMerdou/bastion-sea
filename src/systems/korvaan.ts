// =============================================
// GODTIDE: BASTION SEA - Korvaan System
// =============================================
// Body refinement through training and combat.
// Korvaan hardens the physical form - calluses
// over the fists, iron threading through the
// bones, nerves rebuilt for faster response.
// Each stage has a physical cost and a permanent
// combat benefit.
// =============================================

import { KorvaanStage } from '../types/game';

/**
 * Korvaan progression order.
 * Each stage represents a deeper level of body refinement.
 *
 * none       - Untrained. Normal body.
 * callus     - Skin hardens. Fists and forearms toughen. First real step.
 * ironset    - Bone density increases. Blows that would break normal bones bounce off.
 * fleshweave - Muscle fibers restructure. Raw strength increases dramatically.
 * nerveburn  - Nerve pathways rewired for combat speed. Painful process. Permanent.
 * reforged   - Complete body refinement. The body is a weapon equal to any blade.
 */
const KORVAAN_ORDER: KorvaanStage[] = [
  'none', 'callus', 'ironset', 'fleshweave', 'nerveburn', 'reforged',
];

/**
 * Get the stage index (0-5).
 */
export function getKorvaanIndex(stage: KorvaanStage): number {
  return KORVAAN_ORDER.indexOf(stage);
}

/**
 * Get the next stage. Returns null if already at max.
 */
export function getNextKorvaanStage(current: KorvaanStage): KorvaanStage | null {
  const idx = KORVAAN_ORDER.indexOf(current);
  if (idx < 0 || idx >= KORVAAN_ORDER.length - 1) return null;
  return KORVAAN_ORDER[idx + 1];
}

/**
 * Combat stat bonuses per Korvaan stage.
 * These are FLAT bonuses added to combat stats.
 */
export interface KorvaanBonuses {
  attack: number;
  defense: number;
  hp: number;
  staminaRegen: number;
  description: string;
}

export function getKorvaanBonuses(stage: KorvaanStage): KorvaanBonuses {
  switch (stage) {
    case 'none':
      return { attack: 0, defense: 0, hp: 0, staminaRegen: 0, description: 'No refinement.' };
    case 'callus':
      return { attack: 2, defense: 3, hp: 10, staminaRegen: 0, description: 'Hardened skin. Fists like stone.' };
    case 'ironset':
      return { attack: 4, defense: 6, hp: 20, staminaRegen: 1, description: 'Bones dense as iron. Breaks nothing.' };
    case 'fleshweave':
      return { attack: 8, defense: 8, hp: 35, staminaRegen: 1, description: 'Restructured muscle. Raw power.' };
    case 'nerveburn':
      return { attack: 10, defense: 10, hp: 45, staminaRegen: 2, description: 'Rewired nerves. Combat reflexes.' };
    case 'reforged':
      return { attack: 18, defense: 18, hp: 80, staminaRegen: 4, description: 'The body is the weapon.' };
    default:
      return { attack: 0, defense: 0, hp: 0, staminaRegen: 0, description: 'No refinement.' };
  }
}

/**
 * Requirements to advance to the next Korvaan stage.
 */
export interface KorvaanAdvanceReq {
  stage: KorvaanStage;
  label: string;
  description: string;
  cost: {
    sovereigns: number;
    supplies: number;
    materials: number;
  };
  /** Minimum Iron dominion level required */
  minIronLevel: number;
  /** Minimum number of combat victories */
  minCombatVictories: number;
  /** Flavor text for the training scene */
  trainingText: string;
  /** Notification on completion */
  completionText: string;
}

/**
 * Get requirements for advancing to the next stage.
 * Returns null if already at max.
 */
export function getKorvaanAdvanceReq(current: KorvaanStage): KorvaanAdvanceReq | null {
  const next = getNextKorvaanStage(current);
  if (!next) return null;

  const reqs: Record<KorvaanStage, KorvaanAdvanceReq> = {
    none: {
      // This entry won't be used since 'none' is the "from" stage
      stage: 'callus',
      label: 'CALLUS TRAINING',
      description: 'Begin hardening the body. Fists wrapped in sea-soaked rope, slammed into coral until the skin stops splitting.',
      cost: { sovereigns: 50, supplies: 10, materials: 5 },
      minIronLevel: 20,
      minCombatVictories: 2,
      trainingText: 'Three days of hitting coral with bare fists. The skin splits, heals, splits again. On the fourth day it stops splitting. On the fifth, the coral cracks first.',
      completionText: 'Korvaan - Callus stage reached. The hands don\'t bleed anymore.',
    },
    callus: {
      stage: 'ironset',
      label: 'IRONSET CONDITIONING',
      description: 'Bone compression training. Dragghen knows the Gorundai method: controlled impact, mineral supplements, weeks of structured pain.',
      cost: { sovereigns: 120, supplies: 20, materials: 15 },
      minIronLevel: 35,
      minCombatVictories: 5,
      trainingText: 'Dragghen supervises. Iron rods against the shins, forearms, ribs. Gorundai shipwrights did this for centuries. Built bodies that survived hull collapses. The bone aches for weeks. Then it stops aching. Then nothing breaks it. Dragghen rates your pain tolerance a four.',
      completionText: 'Korvaan - Ironset achieved. The bones are dense as the ore they were trained against.',
    },
    ironset: {
      stage: 'fleshweave',
      label: 'FLESHWEAVE RESTRUCTURING',
      description: 'Deep muscle restructuring. Requires sustained extreme physical conditioning and specific dietary protocols. The body rebuilds itself stronger.',
      cost: { sovereigns: 200, supplies: 35, materials: 20 },
      minIronLevel: 50,
      minCombatVictories: 10,
      trainingText: 'The regimen is brutal and specific. Load-bearing exercises until the muscles fail, then force them further. The body protests. The body adapts. Muscle fibers tear and rebuild in denser configurations. Two weeks of agony. Then the strength arrives.',
      completionText: 'Korvaan - Fleshweave complete. The muscle moves different now. Heavier. Faster.',
    },
    fleshweave: {
      stage: 'nerveburn',
      label: 'NERVEBURN REWIRING',
      description: 'The most dangerous stage. Deliberate nerve pathway reconstruction through sustained combat stress. The body learns to react before the mind decides.',
      cost: { sovereigns: 350, supplies: 40, materials: 30 },
      minIronLevel: 65,
      minCombatVictories: 15,
      trainingText: 'This one hurts. Not the clean pain of impact: the deep, electric burn of nerves rebuilding their pathways. Combat drills at speed, for hours, until the body stops waiting for the brain\'s permission and starts moving on its own. Three days of feeling like every nerve is on fire. Then silence. Then speed.',
      completionText: 'Korvaan - Nerveburn complete. The reflexes are inhuman now. The body moves before thought catches up.',
    },
    nerveburn: {
      stage: 'reforged',
      label: 'REFORGED - FINAL STAGE',
      description: 'Complete body refinement. Every system optimized. The body becomes a weapon equal to any blade forged by any smith. Irreversible.',
      cost: { sovereigns: 500, supplies: 50, materials: 40 },
      minIronLevel: 80,
      minCombatVictories: 20,
      trainingText: 'There is no dramatic moment. No breakthrough. One morning you wake up and realize the body has finished becoming what it was becoming. Every fiber, every nerve, every bone, refined. The cage of flesh has been reforged into something that matches the will inside it. Danzai feels lighter. The world feels slower. You feel exactly right.',
      completionText: 'Korvaan - REFORGED. The body is complete. What walks through the world now is not what went into the training. It is better.',
    },
    reforged: {
      // Max stage - no further advancement
      stage: 'reforged',
      label: '',
      description: '',
      cost: { sovereigns: 0, supplies: 0, materials: 0 },
      minIronLevel: 0,
      minCombatVictories: 0,
      trainingText: '',
      completionText: '',
    },
  };

  return reqs[current];
}

/**
 * UI display data for each Korvaan stage.
 */
export function getKorvaanDisplay(stage: KorvaanStage): {
  label: string;
  color: string;
  icon: string;
} {
  switch (stage) {
    case 'none': return { label: 'UNTRAINED', color: 'text-ocean-500', icon: '○' };
    case 'callus': return { label: 'CALLUS', color: 'text-ocean-300', icon: '◐' };
    case 'ironset': return { label: 'IRONSET', color: 'text-amber-400', icon: '◑' };
    case 'fleshweave': return { label: 'FLESHWEAVE', color: 'text-amber-300', icon: '◕' };
    case 'nerveburn': return { label: 'NERVEBURN', color: 'text-crimson-400', icon: '◉' };
    case 'reforged': return { label: 'REFORGED', color: 'text-crimson-300', icon: '●' };
  }
}
