// =============================================
// GODTIDE: BASTION SEA - God Fruit System
// =============================================
// The Western Dragon Fruit. Mythical Beast-type.
// Transforms the eater into a western dragon -
// winged, fire-breathing, Ancalagon-scaled.
// Karyudon doesn't just eat power. He becomes it.

import { CombatAction } from '../types/combat';
import { MC } from '../types/game';

// ==========================================
// DRAGON HYBRID COMBAT ACTIONS
// ==========================================
// Available only after eating the Western Dragon Fruit.
// These are unlocked permanently - the transformation
// is irreversible. You ate a god's remnant. There's no
// going back.

export const DRAGON_ACTIONS: CombatAction[] = [
  // --- HYBRID FORM ATTACKS ---
  {
    id: 'dragon_claw',
    name: 'Dragon Claw',
    description: 'Partially shift your arm. Scales harden, fingers elongate into talons. One rake opens steel.',
    category: 'strike',
    targetType: 'single',
    damage: 38,
    damageType: 'physical',
    accuracy: 88,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 14,
    animation: 'slash',
    flavorText: 'Your arm ripples. Esmer skin splits into gunmetal scales, fingers stretching into claws the length of daggers. You rake across their guard. The armor underneath doesn\'t matter.',
    missText: 'The claw swipes through air. They read the shift before you finished it.',
    effects: [
      { type: 'bleed', value: 8, duration: 3, chance: 50, description: 'Raked open' },
    ],
  },
  {
    id: 'flame_breath',
    name: 'Flame Breath',
    description: 'Not Iron compression. Real fire. Fire that melts stone and turns seawater to steam.',
    category: 'special',
    targetType: 'all',
    damage: 45,
    damageType: 'resonance',
    accuracy: 82,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 30,
    animation: 'flash_red',
    flavorText: 'Your chest swells. The air in your throat ignites before it leaves your mouth, a cone of white-gold fire that turns everything ahead of you into heat and screaming. The deck chars black in a perfect fan.',
    missText: 'They dive behind cover as the fire rolls overhead. The wall behind them melts.',
    effects: [
      { type: 'weaken', value: 12, duration: 2, chance: 60, description: 'Scorched' },
    ],
  },
  {
    id: 'wing_gust',
    name: 'Wing Gust',
    description: 'Manifest the wings. One beat generates a shockwave that clears the field.',
    category: 'dominion',
    targetType: 'all',
    damage: 22,
    damageType: 'physical',
    accuracy: 90,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 20,
    animation: 'screen_shake',
    flavorText: 'Two wings erupt from your back, leathery, veined with gold, each one wider than you are tall. A single downbeat. The air becomes a wall. Bodies ragdoll across the deck.',
    missText: 'They drop flat and cling to the wood as the gust roars overhead.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 55, description: 'Blown back' },
      { type: 'expose', value: 8, duration: 2, chance: 40, description: 'Guard broken' },
    ],
  },
  {
    id: 'scale_armor',
    name: 'Scale Armor',
    description: 'Let the dragon skin spread. Full-body coverage: every inch becomes a fortress.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 18,
    animation: 'iron_pulse',
    flavorText: 'Scales race down your body like a wave, interlocking plates of gunmetal and gold, harder than anything the forges of Coppervein ever produced. You feel it settle. Impenetrable.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 40, duration: 3, chance: 100, description: 'Dragon Scales (+40 DEF)' },
      { type: 'shield', value: 30, duration: 3, chance: 100, description: 'Absorbs 30 damage' },
      { type: 'heal_hp', value: 15, duration: 3, chance: 100, description: 'Regeneration (+15 HP/round)' },
    ],
  },

  // --- FULL DRAGON FORM (Ultimate) ---
  {
    id: 'kalameet_descent',
    name: 'KALAMEET DESCENT',
    description: 'Full transformation. Become the dragon. Fall on them like the sky decided to attack.',
    category: 'special',
    targetType: 'all',
    damage: 80,
    damageType: 'resonance',
    accuracy: 78,
    cooldown: 5,
    currentCooldown: 0,
    staminaCost: 50,
    animation: 'screen_shake',
    flavorText: 'You stop holding it back. The shift is total. Bones reshape, mass multiplies, wings span the width of the ship. For three seconds you are something that used to be a myth. You rise. You descend. The impact is geological.',
    missText: 'They scatter as your shadow blots out the sun. The crater misses them by feet. The shockwave doesn\'t.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 70, description: 'Devastated' },
      { type: 'intimidate', value: 25, duration: 99, chance: 80, description: 'Witnessed the dragon' },
      { type: 'weaken', value: 15, duration: 3, chance: 50, description: 'Morale shattered' },
    ],
    unlockCondition: {
      stat: 'hp',
      minValue: 50, // Need HP to survive the strain
    },
  },
];

// ==========================================
// DRAGON FRUIT COMBAT BONUSES
// ==========================================
// Passive stat boosts from having eaten the fruit.
// The transformation changes your base physiology
// permanently - even in human form, you're different.

export interface DragonFruitBonuses {
  attack: number;
  defense: number;
  hp: number;
  staminaRegen: number;
  speed: number;
}

export function getDragonFruitBonuses(eaten: boolean, awakened: boolean): DragonFruitBonuses {
  if (!eaten) {
    return { attack: 0, defense: 0, hp: 0, staminaRegen: 0, speed: 0 };
  }

  // Base bonuses from eating
  const base: DragonFruitBonuses = {
    attack: 8,
    defense: 6,
    hp: 40,
    staminaRegen: 2,
    speed: 5,
  };

  // Awakened bonuses (future: unlocked through extreme combat/story trigger)
  if (awakened) {
    base.attack += 12;
    base.defense += 10;
    base.hp += 60;
    base.staminaRegen += 3;
    base.speed += 8;
  }

  return base;
}

// ==========================================
// DRAGON FRUIT ACTIONS FOR COMBAT
// ==========================================
// Returns the actions Karyudon gets from the Dragon Fruit.
// Only returns actions if the fruit has been eaten.

export function getDragonCombatActions(mc: MC): CombatAction[] {
  if (!mc.dragonFruitEaten) return [];
  return [...DRAGON_ACTIONS];
}

// ==========================================
// EAT REQUIREMENTS
// ==========================================
// You don't just pop a God Fruit like a grape.
// There are conditions.

export interface EatRequirements {
  minIronLevel: number;
  minCombatVictories: number;
  description: string;
}

export function getEatRequirements(): EatRequirements {
  return {
    minIronLevel: 30,
    minCombatVictories: 3,
    description: 'Iron dominion level 30+. At least 3 combat victories. A body hardened enough to survive the transformation.',
  };
}

export function canEatDragonFruit(mc: MC, combatVictories: number): { canEat: boolean; reason?: string } {
  if (mc.dragonFruitEaten) {
    return { canEat: false, reason: 'Already consumed.' };
  }
  if (!mc.dragonFruitPossessed) {
    return { canEat: false, reason: 'You don\'t have the fruit.' };
  }

  const req = getEatRequirements();
  const tierRank = ['flicker', 'tempered', 'forged', 'prime', 'conqueror'];
  const effectiveIron = tierRank.indexOf(mc.dominion.iron.tier) * 100 + mc.dominion.iron.level;

  if (effectiveIron < req.minIronLevel) {
    return { canEat: false, reason: `Iron dominion too low (${effectiveIron}/${req.minIronLevel}). Your body would tear itself apart.` };
  }

  if (combatVictories < req.minCombatVictories) {
    return { canEat: false, reason: `Not enough combat experience (${combatVictories}/${req.minCombatVictories} victories). The transformation demands a tested body.` };
  }

  return { canEat: true };
}
