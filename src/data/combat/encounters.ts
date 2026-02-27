import { CombatEncounter, CombatAction, EnemyTemplate } from '../../types/combat';
import { bossEncounters } from './boss_encounters';

// ==========================================
// ENEMY ACTION TEMPLATES
// ==========================================

const WARDENSEA_SOLDIER_ACTIONS: CombatAction[] = [
  {
    id: 'soldier_slash',
    name: 'Saber Slash',
    description: 'Standard Wardensea saber technique.',
    category: 'strike',
    targetType: 'single',
    damage: 16,
    damageType: 'physical',
    accuracy: 80,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 8,
    animation: 'slash',
    flavorText: 'The soldier lunges with trained precision. Wardensea steel bites.',
    missText: 'The slash goes wide. Academy form. Predictable.',
  },
  {
    id: 'soldier_brace',
    name: 'Formation Hold',
    description: 'Drop into defensive formation.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 5,
    animation: 'block',
    flavorText: 'The soldier drops into a low guard. Textbook Wardensea defensive form.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 18, duration: 2, chance: 100, description: 'Formation guard' },
    ],
  },
  {
    id: 'soldier_coordinated_thrust',
    name: 'Coordinated Thrust',
    description: 'Academy-trained formation strike. Two soldiers, one motion.',
    category: 'strike',
    targetType: 'single',
    damage: 20,
    damageType: 'physical',
    accuracy: 75,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'slash',
    flavorText: 'The soldier steps into the gap left by their partner. The thrust comes from an angle you weren\'t guarding. Formation fighting, the Wardensea\'s real weapon.',
    missText: 'You break the formation line. They scramble to re-form.',
    effects: [
      { type: 'bleed', value: 4, duration: 2, chance: 30, description: 'Puncture wound' },
    ],
  },
];

const WARDENSEA_OFFICER_ACTIONS: CombatAction[] = [
  {
    id: 'officer_command_strike',
    name: 'Command Strike',
    description: 'An officer\'s disciplined assault.',
    category: 'strike',
    targetType: 'single',
    damage: 22,
    damageType: 'dominion_iron',
    accuracy: 85,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'slash',
    flavorText: 'The officer steps forward with Tempered Iron behind the blade. This one trained at the Academy.',
    missText: 'You read the feint. The officer resets, eyes narrowing.',
    effects: [
      { type: 'bleed', value: 6, duration: 2, chance: 30, description: 'Clean cut' },
    ],
  },
  {
    id: 'officer_rally',
    name: 'Rally',
    description: 'The officer rallies nearby troops.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'crew_assist',
    flavorText: '"Hold formation! We\'ve brought down bigger!" The soldiers tighten up.',
    missText: '',
    effects: [
      { type: 'buff_attack', value: 12, duration: 2, chance: 100, description: 'Officer\'s rally' },
      { type: 'buff_defense', value: 12, duration: 2, chance: 100, description: 'Tightened formation' },
      { type: 'heal', value: 15, duration: 1, chance: 100, description: 'Morale boost' },
    ],
  },
  {
    id: 'officer_iron_thrust',
    name: 'Iron Thrust',
    description: 'A Dominion-reinforced lunge.',
    category: 'dominion',
    targetType: 'single',
    damage: 30,
    damageType: 'dominion_iron',
    accuracy: 75,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 18,
    animation: 'iron_pulse',
    flavorText: 'The officer\'s blade glows with Iron. The thrust comes fast. Faster than a normal human should manage.',
    missText: 'The Iron-charged lunge whistles past your ear. Close.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 25, description: 'Staggered' },
      { type: 'weaken', value: 8, duration: 1, chance: 35, description: 'Iron disruption' },
    ],
  },
];

const DOCK_THUG_ACTIONS: CombatAction[] = [
  {
    id: 'thug_haymaker',
    name: 'Haymaker',
    description: 'A wild swing.',
    category: 'strike',
    targetType: 'single',
    damage: 18,
    damageType: 'physical',
    accuracy: 73,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 8,
    animation: 'slash',
    flavorText: 'The thug winds up and swings. No technique, all desperation.',
    missText: 'Wild swing. You don\'t even have to dodge. Just lean.',
  },
  {
    id: 'thug_dirty_trick',
    name: 'Dirty Trick',
    description: 'Pocket sand, eye gouge, low blow. Dock rules.',
    category: 'strike',
    targetType: 'single',
    damage: 12,
    damageType: 'physical',
    accuracy: 88,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 5,
    animation: 'flash_white',
    flavorText: 'Something gritty hits your eyes. Dock fighters don\'t play fair.',
    missText: 'You see it coming. Amateurs.',
    effects: [
      { type: 'weaken', value: 10, duration: 1, chance: 55, description: 'Blinded briefly' },
    ],
  },
];

const KOLMARI_ENFORCER_ACTIONS: CombatAction[] = [
  {
    id: 'enforcer_baton_strike',
    name: 'Baton Strike',
    description: 'Kolmari enforcement baton, designed for pain compliance.',
    category: 'strike',
    targetType: 'single',
    damage: 24,
    damageType: 'physical',
    accuracy: 85,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'slash',
    flavorText: 'The enforcer swings the weighted baton with practiced efficiency. Kolmari don\'t fight. They disperse.',
    missText: 'The baton cracks empty air. You\'re bigger than their usual targets.',
  },
  {
    id: 'enforcer_suppress',
    name: 'Suppression',
    description: 'Coordinated takedown technique.',
    category: 'strike',
    targetType: 'single',
    damage: 18,
    damageType: 'physical',
    accuracy: 90,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'counter',
    flavorText: 'The enforcer goes for joints and pressure points. Efficient. Impersonal.',
    missText: 'Hard to suppress an Oni. They\'re learning that.',
    effects: [
      { type: 'weaken', value: 12, duration: 2, chance: 45, description: 'Joint lock' },
      { type: 'stun', value: 1, duration: 1, chance: 25, description: 'Pinned' },
    ],
  },
  {
    id: 'enforcer_shock_baton',
    name: 'Shock Discharge',
    description: 'The baton has a surprise built in. Kolmari tech.',
    category: 'dominion',
    targetType: 'single',
    damage: 20,
    damageType: 'dominion_iron',
    accuracy: 82,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 15,
    animation: 'flash_white',
    flavorText: 'The baton crackles. Blue-white discharge arcs from the tip, Grimoire-tech weaponry. Kolmari don\'t fight fair because fair loses money.',
    missText: 'The discharge grounds through the floor. Your hair stands on end. Close.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 45, description: 'Electrocuted' },
    ],
  },
];

// ==========================================
// ENEMY TEMPLATES
// ==========================================

const wardenseaSoldier: EnemyTemplate = {
  id: 'wardensea_soldier',
  name: 'Wardensea Soldier',
  tier: 'soldier',
  hp: 53,
  stamina: 55,
  attack: 8,
  defense: 12,
  speed: 20,
  dominion: { iron: 20, sight: 12, king: 0 },
  actions: WARDENSEA_SOLDIER_ACTIONS,
  aiPattern: 'defensive',
  flavorIntro: 'Storm-grey coat, standard-issue saber, regulation stance. Wardensea rank-and-file.',
  flavorDefeat: 'The soldier crumples. The coat falls around them like a shroud.',
};

const wardenseaOfficer: EnemyTemplate = {
  id: 'wardensea_officer',
  name: 'Wardensea Officer',
  title: 'Lieutenant',
  tier: 'elite',
  hp: 91,
  stamina: 70,
  attack: 12,
  defense: 16,
  speed: 22,
  dominion: { iron: 30, sight: 18, king: 6 },
  actions: WARDENSEA_OFFICER_ACTIONS,
  aiPattern: 'tactical',
  flavorIntro: 'This one carries rank. Silver pin on the collar. Iron behind the eyes.',
  flavorDefeat: '"This... isn\'t..." The officer goes down. The silver pin rolls across the deck.',
};

const dockThug: EnemyTemplate = {
  id: 'dock_thug',
  name: 'Dock Thug',
  tier: 'fodder',
  hp: 35,
  stamina: 45,
  attack: 7,
  defense: 7,
  speed: 18,
  dominion: { iron: 8, sight: 5, king: 0 },
  actions: DOCK_THUG_ACTIONS,
  aiPattern: 'aggressive',
  flavorIntro: 'Scarred hands, missing teeth, absolutely no survival instinct.',
  flavorDefeat: 'They don\'t get up. Smart.',
};

const kolmariEnforcer: EnemyTemplate = {
  id: 'kolmari_enforcer',
  name: 'Kolmari Enforcer',
  tier: 'soldier',
  hp: 67,
  stamina: 65,
  attack: 11,
  defense: 15,
  speed: 24,
  dominion: { iron: 25, sight: 18, king: 0 },
  actions: KOLMARI_ENFORCER_ACTIONS,
  aiPattern: 'tactical',
  flavorIntro: 'Black coat, no insignia. Kolmari enforcement doesn\'t advertise.',
  flavorDefeat: 'The enforcer hits the ground. Somewhere, a Kolmari accountant writes off the damage.',
};

// ==========================================
// COMBAT ENCOUNTERS
// ==========================================

/**
 * Prologue combat - first fight of the game.
 * Karyudon breaks free during the prison transport attack.
 */
export const prologueBrawl: CombatEncounter = {
  id: 'prologue_brawl',
  title: 'PRISON BREAK',
  subtitle: 'The chains are off. Show them why they kept you in them.',
  noScaling: true,
  narrativeIntro: [
    'The chains shatter against the bulkhead. Iron links scatter across the deck like thrown coins.',
    'Two Wardensea soldiers stare at you. They\'re used to prisoners who cower. They are not used to an Oni standing up in their cell with murder in your eyes and no reason left to behave.',
    'One of them reaches for a saber. The other reaches for a whistle. Neither is going to finish the motion.',
  ],
  narrativeVictory: [
    'The soldiers are down. The deck is quiet except for the sound of the hull being hammered from outside. Whoever is attacking this transport, they\'re not done.',
    'You flex your hands. The Iron flows like it was never gone. Weeks in chains and your body remembers what it is.',
    'The door ahead leads deeper into the ship. Somewhere in this chaos is opportunity. Somewhere in this chaos is a future.',
    'You start walking.',
  ],
  narrativeDefeat: [
    'The soldiers beat you back. More arrive. The chains go back on, heavier this time.',
    'But the attack on the ship isn\'t over. There will be another chance.',
  ],
  enemies: [wardenseaSoldier, wardenseaSoldier],
  rewards: [
    { type: 'reputation', value: 3, label: '+3 Reputation' },
    { type: 'bounty', value: 5000000, label: '+5M Bounty' },
  ],
  defeatConsequence: 'story_continue',
  availableCrew: [],
  onVictoryEffects: [
    { type: 'flag', target: 'prologue_combat_won', value: true },
  ],
  onDefeatEffects: [
    { type: 'flag', target: 'prologue_combat_lost', value: true },
  ],
};

/**
 * Dockside confrontation - Kolmari enforcers try to intimidate the new arrival.
 */
export const docksideFight: CombatEncounter = {
  id: 'dockside_fight',
  title: 'DOCKSIDE CONFRONTATION',
  subtitle: 'Tessurren\'s enforcers think they can make a point. Correct them.',
  noScaling: true,
  narrativeIntro: [
    'Tessurren Dolch doesn\'t fight her own battles. That\'s what enforcers are for.',
    'Three of them step out from between the fishing stalls. Black coats, no insignia, weighted batons designed for "crowd dispersal." They\'re used to dispersing crowds. They are not used to what you are.',
    '"Wardensea fugitive. Bounty unknown. You\'re going to come quietly, or--"',
    'You crack your knuckles. The sound echoes across the dock.',
    '"Or." You say it like a period.',
  ],
  narrativeVictory: [
    'The enforcers are scattered across the dock like dropped cargo. One of them is in the water. You\'re not sure how he got there, but the splash was satisfying.',
    'Tessurren watches from the second-floor window of the harbor office. She doesn\'t look angry. She looks like she\'s recalculating.',
    'Good. Let her calculate. Let the whole Bastion Sea calculate.',
    'Kovesse is already broadcasting. "THAT WAS INCREDIBLE. Do you know how many views this is going to get? The METRICS, Captain. The METRICS."',
  ],
  narrativeDefeat: [
    'The enforcers are better coordinated than you expected. They know how to fight as a unit. You\'re pushed back to the dock\'s edge.',
    'But Dragghen appears behind them with his keel plate shield, and the situation... evolves.',
  ],
  enemies: [kolmariEnforcer, kolmariEnforcer, dockThug],
  rewards: [
    { type: 'reputation', value: 5, label: '+5 Reputation' },
    { type: 'infamy', value: 3, label: '+3 Infamy' },
    { type: 'sovereigns', value: 80, label: '+80 Sovereigns (looted)' },
    { type: 'bounty', value: 8000000, label: '+8M Bounty' },
  ],
  defeatConsequence: 'story_continue',
  availableCrew: ['dragghen', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'dockside_combat_won', value: true },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE TRENDING - #DockBrawl',
      message: 'Kovesse\'s livestream of the dockside fight hits 4,000 viewers in under an hour. Comments range from "absolute unit" to "who gave the Oni a dock" to "I\'m moving to Tavven Shoal."',
    }},
  ],
};

/**
 * Wardensea patrol encounter - more serious fight.
 * Higher tier enemies. This is Act 1 mid-game content.
 */
export const wardenseaPatrolFight: CombatEncounter = {
  id: 'wardensea_patrol',
  title: 'WARDENSEA PATROL',
  subtitle: 'They found you. The grey coats are here.',
  narrativeIntro: [
    'The patrol ship appears on the horizon at dawn. By midday, they\'re alongside. By afternoon, they\'re boarding.',
    'An officer leads four soldiers onto the dock. She reads from an actual warrant: names, charges, bounty figures. It\'s almost quaint.',
    '"Karyudon. Oni. No registered family name. Charged with destruction of Wardensea property, assault on Wardensea personnel, escape from custody, and--" she pauses, "--announced intent to conquer the world."',
    '"You forgot \'looking incredible while doing it.\'"',
    'The officer folds the warrant. "Surrender or be taken by force."',
    'You grin. "Force."',
  ],
  narrativeVictory: [
    'The officer is the last one standing. She\'s good. Better than the soldiers, better than most people you\'ve fought. Forged Iron behind her strikes, Academy-trained form, Academy-trained discipline. Years of service behind every stance.',
    'She goes down on one knee, saber still raised. Still fighting.',
    '"Yield," you say.',
    'She stares at you. Then drives her saber point-first into the dock and rises. "Report this," she says to no one. Then she walks back to her ship.',
    'The Wardensea will remember this. They always do.',
  ],
  narrativeDefeat: [
    'The officer is formidable. The soldiers coordinate. You\'re pushed back, and for a moment, the chains feel close again.',
    'But Vorreth steps between you and the officer. Former Daaz Accord captain facing current Lieutenant. Some conversations happen in steel.',
  ],
  enemies: [wardenseaOfficer, wardenseaSoldier, wardenseaSoldier],
  waves: [
    [wardenseaSoldier, wardenseaSoldier], // Reinforcements
  ],
  rewards: [
    { type: 'reputation', value: 8, label: '+8 Reputation' },
    { type: 'infamy', value: 5, label: '+5 Infamy' },
    { type: 'bounty', value: 15000000, label: '+15M Bounty' },
    { type: 'intelligence', value: 5, label: '+5 Intelligence' },
    { type: 'flag', value: true, target: 'defeated_wardensea_patrol', label: 'Wardensea Patrol Defeated' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'wardensea_patrol_defeated', value: true },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA ALERT - Patrol Defeated',
      message: 'Wardensea Second Division has lost contact with Patrol Unit 7 in the Tavven Shoal area. Reinforcement requests have been filed. The Oni fugitive is confirmed combat-capable.',
    }},
  ],
};

// ==========================================
// DIFFICULTY SCALING SYSTEM
// ==========================================
// Enemies scale based on:
//   - Day count (time pressure)
//   - Player bounty (you're attracting stronger enemies)
//   - Territory count (empire draws attention)
//   - Infamy (the scarier you are, the scarier they send)

export interface DifficultyContext {
  dayCount: number;
  bounty: number;
  territoryCount: number;
  infamy: number;
  reputation?: number;
}

/**
 * Calculate a difficulty multiplier based on game state.
 * Returns a multiplier from 1.0 (base) upward.
 */
export function calculateDifficultyMultiplier(ctx: DifficultyContext): number {
  let mult = 1.0;

  // Day scaling: quadratic ramp. Gentle early, punishing late.
  // Day 10: +0.08, Day 30: +0.88, Day 50: +2.93, Day 80: +8.63, Day 100: +14.2
  // After floor/cap this means real fights after day 40+.
  if (ctx.dayCount > 5) {
    const d = ctx.dayCount - 5;
    mult += d * 0.01 + (d * d) * 0.0015;
  }

  // Bounty scaling: +6% per 10M bounty (bigger bounty = scarier hunters)
  mult += Math.floor(ctx.bounty / 10_000_000) * 0.06;

  // Territory scaling: +10% per territory after first (empire draws attention)
  if (ctx.territoryCount > 1) {
    mult += (ctx.territoryCount - 1) * 0.10;
  }

  // Infamy scaling: +2% per infamy point
  mult += ctx.infamy * 0.02;

  // Reputation anti-scaling: -1.5% per rep point, capped at -0.2x
  if (ctx.reputation && ctx.reputation > 0) {
    mult -= Math.min(ctx.reputation * 0.015, 0.2);
  }

  // Floor at 0.8x, cap at 4.0x (late-game should be brutal)
  return Math.max(0.8, Math.min(4.0, mult));
}

/**
 * Apply difficulty scaling to enemy templates within an encounter.
 * Returns a new encounter with scaled enemies.
 */
export function scaleEncounter(
  encounter: CombatEncounter,
  ctx: DifficultyContext,
): CombatEncounter {
  if (encounter.noScaling) return encounter; // Tutorial/scripted fights skip scaling
  const mult = calculateDifficultyMultiplier(ctx);
  if (mult <= 1.0) return encounter; // No scaling needed

  const scaleAction = (a: EnemyTemplate['actions'][0]) => ({
    ...a,
    damage: a.damage > 0 ? Math.round(a.damage * (1 + (mult - 1) * 0.5)) : 0,
  });

  const scaleEnemy = (template: EnemyTemplate): EnemyTemplate => ({
    ...template,
    hp: Math.round(template.hp * mult),
    stamina: Math.round(template.stamina * mult),
    attack: Math.round(template.attack * (1 + (mult - 1) * 0.6)),  // Attack scales slower
    defense: Math.round(template.defense * (1 + (mult - 1) * 0.5)), // Defense scales slowest
    speed: Math.round(template.speed * (1 + (mult - 1) * 0.3)),     // Speed barely scales
    dominion: {
      iron: Math.round(template.dominion.iron * (1 + (mult - 1) * 0.4)),
      sight: Math.round(template.dominion.sight * (1 + (mult - 1) * 0.3)),
      king: template.dominion.king,  // King doesn't scale - it's narrative
    },
    actions: template.actions.map(scaleAction),
    // Scale boss phase actions too so phase 2 keeps up with difficulty
    bossPhases: template.bossPhases?.map((phase) => ({
      ...phase,
      newActions: phase.newActions?.map(scaleAction),
    })),
  });

  return {
    ...encounter,
    enemies: encounter.enemies.map(scaleEnemy),
    waves: encounter.waves?.map((wave) => wave.map(scaleEnemy)),
  };
}

/**
 * Get the threat level label for UI display
 */
export function getThreatLevel(mult: number): { label: string; color: string } {
  if (mult < 1.2) return { label: 'ROUTINE', color: 'text-green-400' };
  if (mult < 1.6) return { label: 'ELEVATED', color: 'text-yellow-400' };
  if (mult < 2.2) return { label: 'DANGEROUS', color: 'text-orange-400' };
  if (mult < 3.0) return { label: 'SEVERE', color: 'text-red-400' };
  return { label: 'EXTREME', color: 'text-red-300 animate-pulse' };
}

// ==========================================
// KELDRISS ENEMIES
// ==========================================

const SMUGGLER_ACTIONS: CombatAction[] = [
  {
    id: 'smuggler_knife',
    name: 'Reef Knife',
    description: 'Quick slash with a coral-edged blade.',
    category: 'strike',
    targetType: 'single',
    damage: 20,
    damageType: 'physical',
    accuracy: 82,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 7,
    animation: 'slash',
    flavorText: 'The smuggler is fast. Reef-running fast. The coral knife draws a thin red line.',
    missText: 'You\'re faster. The blade finds air instead of skin.',
  },
  {
    id: 'smuggler_poison_dart',
    name: 'Tidepool Dart',
    description: 'Blowgun dart tipped with reef toxin.',
    category: 'strike',
    targetType: 'single',
    damage: 14,
    damageType: 'physical',
    accuracy: 90,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 5,
    animation: 'flash_white',
    flavorText: 'A prick. Nothing. Then a slow burn spreading from the wound. Reef toxin.',
    missText: 'The dart embeds in the wood behind you. These people fight dirty.',
    effects: [
      { type: 'weaken', value: 8, duration: 2, chance: 60, description: 'Reef toxin' },
      { type: 'bleed', value: 3, duration: 3, chance: 40, description: 'Poison bleed' },
    ],
  },
];

const KELDRISS_CUTTHROAT_ACTIONS: CombatAction[] = [
  {
    id: 'cutthroat_ambush_strike',
    name: 'Ambush Strike',
    description: 'A killing blow from the shadows.',
    category: 'strike',
    targetType: 'single',
    damage: 35,
    damageType: 'physical',
    accuracy: 78,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 14,
    animation: 'slash',
    flavorText: 'The cutthroat appears from nowhere. The blade goes for the throat. This one has killed before. You can see it in the economy of the motion.',
    missText: 'Your horns catch the blade. The cutthroat\'s eyes widen. They expected human anatomy.',
  },
  {
    id: 'cutthroat_smoke_bomb',
    name: 'Smoke Screen',
    description: 'Keldriss alchemical smoke: cheap, effective, miserable.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 8,
    animation: 'flash_white',
    flavorText: 'Thick grey smoke fills the space. Chemical, acrid, designed for exactly this. Keldriss doesn\'t fight fair.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 20, duration: 1, chance: 100, description: 'Smoke cover' },
      { type: 'weaken', value: 15, duration: 1, chance: 50, description: 'Blinding smoke' },
    ],
  },
  {
    id: 'cutthroat_twin_slash',
    name: 'Twin Blades',
    description: 'Two knives, two cuts, one intent.',
    category: 'strike',
    targetType: 'single',
    damage: 26,
    damageType: 'physical',
    accuracy: 75,
    cooldown: 1,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'slash',
    flavorText: 'Left blade, right blade, no pause between. The cutthroat fights like a whirlpool: circular, relentless, pulling you in.',
    missText: 'You step through the pattern. Oni instincts are faster than dual knives.',
    effects: [
      { type: 'bleed', value: 5, duration: 2, chance: 35, description: 'Double cut' },
    ],
  },
];

const keldrisSmuggler: EnemyTemplate = {
  id: 'keldriss_smuggler',
  name: 'Keldriss Smuggler',
  tier: 'soldier',
  hp: 49,
  stamina: 60,
  attack: 8,
  defense: 10,
  speed: 30,
  dominion: { iron: 10, sight: 20, king: 0 },
  actions: SMUGGLER_ACTIONS,
  aiPattern: 'aggressive',
  flavorIntro: 'Lean, salt-scarred, fast. Runs contraband through reef passages at midnight.',
  flavorDefeat: 'Goes down silently. Smugglers learn to fall without screaming.',
};

const keldrissCutthroat: EnemyTemplate = {
  id: 'keldriss_cutthroat',
  name: 'Shadow Market Cutthroat',
  tier: 'elite',
  hp: 84,
  stamina: 75,
  attack: 13,
  defense: 13,
  speed: 32,
  dominion: { iron: 18, sight: 30, king: 0 },
  actions: KELDRISS_CUTTHROAT_ACTIONS,
  aiPattern: 'tactical',
  flavorIntro: 'This one isn\'t a smuggler. This is what happens when smugglers need someone killed. Professional, quiet, expensive.',
  flavorDefeat: '"Heh." The cutthroat almost smiles as they fall. "Worth the fee. Almost."',
};

// ==========================================
// COPPERVEIN ENEMIES
// ==========================================

const GORUNDAI_MINER_ACTIONS: CombatAction[] = [
  {
    id: 'miner_pickaxe',
    name: 'Mining Pick',
    description: 'A copper-weighted pickaxe. Work tool. War tool. Same thing.',
    category: 'strike',
    targetType: 'single',
    damage: 28,
    damageType: 'physical',
    accuracy: 75,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'heavy_smash',
    flavorText: 'The Gorundai swings the pick like they\'ve been swinging it twelve hours a day for thirty years. Because they have. The weight behind it is industrial.',
    missText: 'The pick buries in stone where you were standing. Gorundai don\'t miss often. You moved fast.',
  },
  {
    id: 'miner_headbutt',
    name: 'Copper Headbutt',
    description: 'Gorundai settle arguments head-first. Literally.',
    category: 'strike',
    targetType: 'single',
    damage: 22,
    damageType: 'physical',
    accuracy: 80,
    cooldown: 1,
    currentCooldown: 0,
    staminaCost: 8,
    animation: 'screen_shake',
    flavorText: 'The Gorundai lowers their head and charges. No subtlety. No technique. Just mass and conviction.',
    missText: 'You sidestep the charge. The wall behind you is less lucky.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 30, description: 'Rattled' },
    ],
  },
];

const GORUNDAI_FOREMAN_ACTIONS: CombatAction[] = [
  {
    id: 'foreman_hammer',
    name: 'Forge Hammer',
    description: 'A smith\'s hammer that\'s seen more arguments than anvils.',
    category: 'strike',
    targetType: 'single',
    damage: 38,
    damageType: 'dominion_iron',
    accuracy: 78,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 14,
    animation: 'heavy_smash',
    flavorText: 'Forged Iron behind a forge hammer. The impact sends shockwaves through your forearms. This Gorundai has been shaping metal, and people, for decades.',
    missText: 'The hammer cracks the ground. The foreman grunts. Recalibrates. They don\'t rush.',
  },
  {
    id: 'foreman_iron_wall',
    name: 'Iron Constitution',
    description: 'Gorundai don\'t dodge. They endure.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'iron_pulse',
    flavorText: 'The foreman plants both feet and crosses their arms. Iron flows through their skin like ore through stone. Immovable.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 25, duration: 2, chance: 100, description: 'Gorundai constitution' },
      { type: 'heal', value: 15, duration: 1, chance: 100, description: 'Regeneration' },
    ],
  },
  {
    id: 'foreman_earthquake',
    name: 'Ground Slam',
    description: 'Punch the earth. Let the earth handle the rest.',
    category: 'dominion',
    targetType: 'all',
    damage: 25,
    damageType: 'dominion_iron',
    accuracy: 70,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 20,
    animation: 'screen_shake',
    flavorText: 'The foreman drives a fist into the ground. The stone cracks. The air shakes. Everything not bolted down moves.',
    missText: 'You jump. The shockwave passes beneath your feet. Barely.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 40, description: 'Seismic stagger' },
    ],
  },
];

const gorundaiMiner: EnemyTemplate = {
  id: 'gorundai_miner',
  name: 'Gorundai Miner',
  tier: 'soldier',
  hp: 77,
  stamina: 60,
  attack: 11,
  defense: 18,
  speed: 15,
  dominion: { iron: 28, sight: 5, king: 0 },
  actions: GORUNDAI_MINER_ACTIONS,
  aiPattern: 'defensive',
  flavorIntro: 'Built like a foundation. Forty years of moving ore built this. No formal training, just forty years of hard labor that functions as the same thing.',
  flavorDefeat: 'The miner sits down heavily. "Vote of no confidence," they mutter. "Accepted."',
};

const gorundaiForeman: EnemyTemplate = {
  id: 'gorundai_foreman',
  name: 'Gorundai Foreman',
  title: 'Shift Boss',
  tier: 'elite',
  hp: 126,
  stamina: 80,
  attack: 16,
  defense: 22,
  speed: 14,
  dominion: { iron: 48, sight: 12, king: 0 },
  actions: GORUNDAI_FOREMAN_ACTIONS,
  aiPattern: 'defensive',
  flavorIntro: 'The foreman steps forward. Not tall, Gorundai rarely are, but wide as a doorframe and twice as hard to get through. Forge scars up both arms. This one has been shaping metal and settling disputes for longer than you\'ve been alive.',
  flavorDefeat: '"Good... hit." The foreman goes down on one knee. The ground cracks where the knee lands. They stay there, beaten but not broken.',
};

// ==========================================
// MOSSBREAK ENEMIES
// ==========================================

const RENEGADE_SAILOR_ACTIONS: CombatAction[] = [
  {
    id: 'renegade_cutlass',
    name: 'Cutlass Swing',
    description: 'Standard Renegade close-quarters.',
    category: 'strike',
    targetType: 'single',
    damage: 22,
    damageType: 'physical',
    accuracy: 78,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 9,
    animation: 'slash',
    flavorText: 'The Renegade swings with sloppy aggression born from a lifetime of bar fights. Not elegant. Not ineffective.',
    missText: 'Wild. Desperate. Not even close.',
  },
  {
    id: 'renegade_grapple',
    name: 'Bar Grapple',
    description: 'Grab. Headbutt. Repeat.',
    category: 'strike',
    targetType: 'single',
    damage: 16,
    damageType: 'physical',
    accuracy: 85,
    cooldown: 1,
    currentCooldown: 0,
    staminaCost: 8,
    animation: 'counter',
    flavorText: 'The sailor grabs your arm and pulls. Tavern brawler instinct: get close, stay close, make it ugly.',
    missText: 'You\'re too big to grapple. They learn this the hard way.',
    effects: [
      { type: 'weaken', value: 6, duration: 1, chance: 40, description: 'Grappled' },
    ],
  },
];

const COPPERHAND_OFFICER_ACTIONS: CombatAction[] = [
  {
    id: 'copperhand_sabre',
    name: 'Copperhand Sabre',
    description: 'Iren Saltz\'s crew fights with matching weapons. There\'s a word for that: discipline.',
    category: 'strike',
    targetType: 'single',
    damage: 30,
    damageType: 'physical',
    accuracy: 82,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 11,
    animation: 'slash',
    flavorText: 'The Copperhand officer fights with mechanical precision, literally. The prosthetic arm drives the sabre with inhuman consistency.',
    missText: 'You read the pattern. Mechanical consistency is another word for predictability.',
  },
  {
    id: 'copperhand_rally_cry',
    name: 'Copperhand Rally',
    description: '"For Saltz! For the Copperhands!"',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'crew_assist',
    flavorText: '"COPPERHANDS!" The crew tightens formation. Whatever you think of their captain, these people believe in something.',
    missText: '',
    effects: [
      { type: 'buff_attack', value: 12, duration: 2, chance: 100, description: 'Crew rally' },
      { type: 'heal', value: 10, duration: 1, chance: 100, description: 'Second wind' },
    ],
  },
  {
    id: 'copperhand_iron_fist',
    name: 'Copper Fist',
    description: 'That arm isn\'t just for show.',
    category: 'dominion',
    targetType: 'single',
    damage: 40,
    damageType: 'dominion_iron',
    accuracy: 72,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 18,
    animation: 'iron_pulse',
    flavorText: 'Iron channels through the prosthetic arm. The punch lands like a battering ram. Whoever built that arm understood violence.',
    missText: 'The copper fist whistles past. Heavy. Slow. You file that information away.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 25, description: 'Mechanical impact' },
    ],
  },
];

const renegadeSailor: EnemyTemplate = {
  id: 'renegade_sailor',
  name: 'Renegade Sailor',
  tier: 'fodder',
  hp: 42,
  stamina: 50,
  attack: 8,
  defense: 9,
  speed: 22,
  dominion: { iron: 10, sight: 8, king: 0 },
  actions: RENEGADE_SAILOR_ACTIONS,
  aiPattern: 'aggressive',
  flavorIntro: 'Rum-brave and stupid enough to think numbers matter against you.',
  flavorDefeat: 'Hits the tavern floor. Probably not the first time today.',
};

const copperhandOfficer: EnemyTemplate = {
  id: 'copperhand_officer',
  name: 'Copperhand Officer',
  title: 'Saltz\'s Lieutenant',
  tier: 'elite',
  hp: 98,
  stamina: 75,
  attack: 13,
  defense: 16,
  speed: 26,
  dominion: { iron: 32, sight: 18, king: 8 },
  actions: COPPERHAND_OFFICER_ACTIONS,
  aiPattern: 'tactical',
  flavorIntro: 'Copper prosthetic from the elbow down. Military bearing despite the Renegade colors. Iren Saltz recruits well.',
  flavorDefeat: 'The officer drops the sabre. Holds the mechanical hand to their chest. "Tell Saltz... it wasn\'t enough."',
};

// ==========================================
// DURREK GARRISON ENEMIES
// ==========================================

const GARRISON_MARINE_ACTIONS: CombatAction[] = [
  {
    id: 'marine_bayonet',
    name: 'Bayonet Thrust',
    description: 'Wardensea garrison marines. The real military.',
    category: 'strike',
    targetType: 'single',
    damage: 26,
    damageType: 'physical',
    accuracy: 87,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'slash',
    flavorText: 'No wasted motion. This isn\'t a dock patrol. These are trained garrison marines. The bayonet thrust comes with thirty years of institutional memory behind it.',
    missText: 'You pivot. The bayonet punches through the air where your ribs were.',
  },
  {
    id: 'marine_shield_wall',
    name: 'Shield Wall',
    description: 'Lock shields. Advance. Repeat.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 8,
    animation: 'block',
    flavorText: 'Shields lock with a sound like a door slamming shut. Garrison formation. You\'re not fighting individuals. You\'re fighting a wall.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 25, duration: 2, chance: 100, description: 'Shield wall' },
    ],
  },
  {
    id: 'marine_disciplined_volley',
    name: 'Disciplined Volley',
    description: 'Coordinated ranged assault. Garrison marines train for this every day.',
    category: 'strike',
    targetType: 'single',
    damage: 32,
    damageType: 'physical',
    accuracy: 80,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 14,
    animation: 'flash_white',
    flavorText: 'Three marines step back, raise, and fire in unison. The sound is singular: one crack, not three. That\'s discipline.',
    missText: 'You\'re already moving before the order comes. Sight reads the timing.',
    effects: [
      { type: 'bleed', value: 5, duration: 2, chance: 35, description: 'Bolt wound' },
    ],
  },
];

const GARRISON_COMMANDER_ACTIONS: CombatAction[] = [
  {
    id: 'commander_cleave',
    name: 'Command Cleave',
    description: 'A two-handed strike backed by years of command and Forged Iron.',
    category: 'dominion',
    targetType: 'single',
    damage: 45,
    damageType: 'dominion_iron',
    accuracy: 82,
    cooldown: 1,
    currentCooldown: 0,
    staminaCost: 16,
    animation: 'heavy_smash',
    flavorText: 'The commander\'s blade glows white-hot with Iron. The cleave splits the air itself. You feel the heat before the edge arrives.',
    missText: 'You duck under the arc. The wall behind you isn\'t a wall anymore.',
    effects: [
      { type: 'bleed', value: 8, duration: 2, chance: 40, description: 'Iron burn' },
    ],
  },
  {
    id: 'commander_tactical_order',
    name: 'Tactical Formation',
    description: '"On my mark. Reform. Press the advantage."',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'crew_assist',
    flavorText: '"REFORM!" The garrison tightens. The commander doesn\'t fight alone. They fight as an institution.',
    missText: '',
    effects: [
      { type: 'buff_attack', value: 18, duration: 2, chance: 100, description: 'Tactical advantage' },
      { type: 'buff_defense', value: 18, duration: 2, chance: 100, description: 'Formation defense' },
      { type: 'heal', value: 30, duration: 1, chance: 100, description: 'Rally morale' },
    ],
  },
  {
    id: 'commander_iron_authority',
    name: 'Iron Authority',
    description: 'The weight of the Wardensea behind a single strike.',
    category: 'dominion',
    targetType: 'single',
    damage: 60,
    damageType: 'dominion_iron',
    accuracy: 73,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 25,
    animation: 'iron_pulse',
    flavorText: 'The commander channels everything. Not just Iron, but conviction. The Wardensea isn\'t just a navy. It\'s an idea. And ideas hit harder than steel.',
    missText: 'The air ruptures where you were standing. You feel the shockwave in your teeth. That would have ended most fights.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 40, description: 'Overwhelming force' },
      { type: 'weaken', value: 12, duration: 2, chance: 55, description: 'Authority pressure' },
    ],
  },
];

const garrisonMarine: EnemyTemplate = {
  id: 'garrison_marine',
  name: 'Garrison Marine',
  tier: 'soldier',
  hp: 70,
  stamina: 70,
  attack: 12,
  defense: 20,
  speed: 20,
  dominion: { iron: 28, sight: 14, king: 0 },
  actions: GARRISON_MARINE_ACTIONS,
  aiPattern: 'defensive',
  flavorIntro: 'Durrek garrison standard. Better equipped, better trained, better fed than the patrol sailors you\'ve been fighting. These are the real Wardensea.',
  flavorDefeat: 'The marine falls. The shield clatters. But another one steps forward to fill the gap. That\'s what "garrison" means.',
};

const garrisonCommander: EnemyTemplate = {
  id: 'garrison_commander',
  name: 'Garrison Commander',
  title: 'Captain of Durrek',
  tier: 'commander',
  hp: 182,
  stamina: 100,
  attack: 18,
  defense: 24,
  speed: 24,
  dominion: { iron: 58, sight: 35, king: 15 },
  actions: GARRISON_COMMANDER_ACTIONS,
  aiPattern: 'tactical',
  flavorIntro: 'Full dress uniform under the armor. Medals. Service ribbons. The Wardensea cross on the chest. This isn\'t a soldier. This is an institution wearing a face. They build statues of this, or gallows. Depends on who\'s winning.',
  flavorDefeat: 'The commander drives their sword into the ground and kneels. Not in surrender, but in acknowledgment. "You fought well, pirate." They spit the last word like it\'s still an insult. Maybe it is.',
};

// ==========================================
// SEA / RANDOM ENCOUNTER ENEMIES
// ==========================================

const PIRATE_RAIDER_ACTIONS: CombatAction[] = [
  {
    id: 'raider_boarding_axe',
    name: 'Boarding Axe',
    description: 'Standard Renegade boarding weapon.',
    category: 'strike',
    targetType: 'single',
    damage: 24,
    damageType: 'physical',
    accuracy: 77,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 9,
    animation: 'slash',
    flavorText: 'The raider swings from the rigging, axe-first. Standard boarding procedure: fast, violent, decisive.',
    missText: 'The axe bites into the rail. You grab the handle and yank the raider off-balance.',
  },
  {
    id: 'raider_grappling_hook',
    name: 'Grapple & Pull',
    description: 'Hook into flesh. Pull. Not pleasant.',
    category: 'strike',
    targetType: 'single',
    damage: 10,
    damageType: 'physical',
    accuracy: 88,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 6,
    animation: 'counter',
    flavorText: 'The hook catches your arm. The raider pulls. It\'s exactly as unpleasant as it sounds.',
    missText: 'The hook sails past. These raiders need better aim.',
    effects: [
      { type: 'bleed', value: 4, duration: 2, chance: 60, description: 'Hook wound' },
      { type: 'weaken', value: 5, duration: 1, chance: 30, description: 'Off-balance' },
    ],
  },
];

const SEA_BEAST_ACTIONS: CombatAction[] = [
  {
    id: 'beast_tentacle',
    name: 'Tentacle Strike',
    description: 'Something from below the surface that shouldn\'t exist.',
    category: 'strike',
    targetType: 'single',
    damage: 35,
    damageType: 'physical',
    accuracy: 72,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'heavy_smash',
    flavorText: 'A limb the thickness of a mainmast crashes across the deck. The wood splinters. Your ribs suggest that dodging was a good idea.',
    missText: 'The tentacle smashes the deck where you were. Salt spray. Splinters. The sound of something ancient and hungry.',
  },
  {
    id: 'beast_constrict',
    name: 'Constriction',
    description: 'It wraps. It squeezes. It doesn\'t let go.',
    category: 'dominion',
    targetType: 'single',
    damage: 45,
    damageType: 'resonance',
    accuracy: 65,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 18,
    animation: 'screen_shake',
    flavorText: 'It wraps around your torso and SQUEEZES. You feel your ribs shift. The Iron in your bones is the only reason they don\'t crack.',
    missText: 'You rip free before it can lock. Your skin is raw. Your pride is intact.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 50, description: 'Constricted' },
      { type: 'weaken', value: 12, duration: 1, chance: 40, description: 'Crushed' },
    ],
  },
  {
    id: 'beast_ink_spray',
    name: 'Abyssal Ink',
    description: 'Blinding, corrosive, and it stains forever.',
    category: 'strike',
    targetType: 'all',
    damage: 12,
    damageType: 'resonance',
    accuracy: 80,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'flash_red',
    flavorText: 'Black ink erupts from below. It burns where it touches and smells like the bottom of the sea, things that died and never decomposed.',
    missText: 'You shield your eyes. The deck isn\'t so lucky.',
    effects: [
      { type: 'weaken', value: 8, duration: 2, chance: 60, description: 'Ink-blinded' },
    ],
  },
];

const pirateRaider: EnemyTemplate = {
  id: 'pirate_raider',
  name: 'Pirate Raider',
  tier: 'fodder',
  hp: 39,
  stamina: 48,
  attack: 8,
  defense: 8,
  speed: 24,
  dominion: { iron: 8, sight: 5, king: 0 },
  actions: PIRATE_RAIDER_ACTIONS,
  aiPattern: 'aggressive',
  flavorIntro: 'Scarred, hungry, and boarding your ship. These aren\'t career pirates. These are desperate people. Doesn\'t make the axes less sharp.',
  flavorDefeat: 'Overboard. The splash is barely audible over the combat.',
};

const seaBeast: EnemyTemplate = {
  id: 'sea_beast',
  name: 'Deep Current Horror',
  tier: 'elite',
  hp: 154,
  stamina: 90,
  attack: 16,
  defense: 15,
  speed: 18,
  dominion: { iron: 12, sight: 8, king: 20 },
  actions: SEA_BEAST_ACTIONS,
  aiPattern: 'berserker',
  flavorIntro: 'It surfaces without warning. Tentacles the color of deep water, almost black, almost blue. Eyes like lanterns filled with something that isn\'t light. The crew goes quiet. Dragghen picks up a hull brace. Vorreth cracks his knuckles. Suulen is already gone, probably on the rigging.',
  flavorDefeat: 'It sinks. Slowly. The tentacles release the hull one by one, leaving suction-cup welts in the wood. The sea closes over it like a wound. Nobody speaks for a full minute.',
};

// ==========================================
// NEW COMBAT ENCOUNTERS
// ==========================================

/**
 * Keldriss Shadow Market Ambush - someone doesn't want you asking questions.
 */
export const keldrissAmbush: CombatEncounter = {
  id: 'keldriss_ambush',
  title: 'SHADOW MARKET AMBUSH',
  subtitle: 'You asked the wrong questions. Now the answers are sharp.',
  narrativeIntro: [
    'The market goes quiet in the wrong way. Not the silence of respect, but the silence of preparation. Three figures step out from behind stacked crates, moving with the coordinated economy of people who\'ve done this before.',
    'Suulen appears at your shoulder. "Two more on the rooftop. Longbow. They\'re covering the exits."',
    '"Let them." You crack your neck. The sound carries. "I wasn\'t planning to exit."',
    'Delvessa sighs from somewhere behind you. "Could we, just once, arrive at an island without a fight?"',
    '"Where\'s the fun in that?"',
  ],
  narrativeVictory: [
    'The cutthroat leader is on the ground, blade arm pinned under your boot. The smugglers are scattered. The market watches.',
    '"Who sent you?" You apply pressure. The arm creaks.',
    '"Nobody... nobody sent... we heard there was an Oni bounty--"',
    '"Wrong answer." More pressure. "I\'m going to ask one more time, and if I don\'t like the response, Tessek is going to name a technique after you. Who. Sent. You."',
    'The answer changes everything about what Keldriss means to your plans.',
  ],
  narrativeDefeat: [
    'The smoke bombs give them the advantage. In the narrow market corridors, even an Oni can be cornered.',
    'Suulen pulls you out before it gets worse. "Live to conquer, Captain. That\'s the rule."',
  ],
  enemies: [keldrissCutthroat, keldrisSmuggler, keldrisSmuggler],
  rewards: [
    { type: 'reputation', value: 5, label: '+5 Reputation' },
    { type: 'infamy', value: 3, label: '+3 Infamy' },
    { type: 'intelligence', value: 8, label: '+8 Intelligence' },
    { type: 'sovereigns', value: 120, label: '+120 Sovereigns (bounty hunter loot)' },
    { type: 'bounty', value: 5000000, label: '+5M Bounty' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['suulen', 'dragghen', 'tessek', 'orren', 'vorreth', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'keldriss_ambush_won', value: true },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'KELDRISS - WORD SPREADS',
      message: 'The Shadow Market cutthroats are nursing their wounds and their egos. Nobody\'s tried to collect your bounty in Keldriss since. Funny how that works.',
    }},
  ],
};

/**
 * Coppervein Labor Dispute - a disagreement that goes physical.
 * Dragghen\'s homecoming isn\'t entirely welcome.
 */
export const copperveinDispute: CombatEncounter = {
  id: 'coppervein_dispute',
  title: 'LABOR DISPUTE',
  subtitle: 'Some disagreements can\'t be settled by committee vote.',
  narrativeIntro: [
    'The voting hall erupts.',
    'It starts with words: accusations about Dragghen leaving, about outsiders exploiting Gorundai resources, about Renegades being parasites. Standard political discourse.',
    'Then someone throws a chair.',
    'Gorundai political discourse is... physical.',
    'Three miners step forward, led by a foreman with arms like anchor chains. "Dragghen Kolve abandoned the yards. He doesn\'t get to bring his pirate captain here and pretend nothing changed."',
    'Dragghen starts to speak. You put a hand on his shoulder.',
    '"I\'ll handle it."',
    '"Captain, you can\'t just--"',
    '"Dragghen. I\'m seven feet tall, I have horns, and I intend to conquer the world. What I CAN\'T do is let someone disrespect my shipwright." You grin. "Let\'s vote."',
  ],
  narrativeVictory: [
    'The foreman is sitting against the wall, laughing. Actually laughing. Blood on their teeth and genuine amusement in their eyes.',
    '"You hit like the mine shaft collapse of \'08." The foreman wipes their mouth. "Alright. You\'re strong. That doesn\'t change the politics."',
    '"I\'m not here for politics. I\'m here for copper, fair prices, and making sure my shipwright\'s homecoming doesn\'t end with hurt feelings."',
    'Dragghen is looking at his feet. When he looks up, the foreman meets his eyes.',
    '"You left us, Dragghen."',
    '"I know."',
    '"Forty workers in that yard collapse. You could have braced the frame. You weren\'t there."',
    '"I know that too."',
    '"Don\'t leave again."',
    'Something passes between them that\'s beyond your understanding. Gorundai. They settle things differently.',
  ],
  narrativeDefeat: [
    'The Gorundai are STRONG. Mining-strong. Strength that doesn\'t tire. You\'re pushed back, overwhelmed by sheer endurance.',
    'Dragghen steps in. "ENOUGH! By cooperative charter, I call for mediation!"',
    'The fighting stops. Even Gorundai respect the charter.',
  ],
  enemies: [gorundaiForeman, gorundaiMiner, gorundaiMiner],
  rewards: [
    { type: 'reputation', value: 6, label: '+6 Reputation' },
    { type: 'materials', value: 15, label: '+15 Materials (goodwill gift)' },
    { type: 'flag', value: true, target: 'coppervein_respect_earned', label: 'Coppervein Respect' },
  ],
  defeatConsequence: 'story_continue',
  availableCrew: ['dragghen'],
  onVictoryEffects: [
    { type: 'flag', target: 'coppervein_respect_earned', value: true },
    { type: 'loyalty', target: 'dragghen', value: 10 },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'COPPERVEIN - RESPECT EARNED',
      message: 'You didn\'t conquer anything. You just punched a foreman until they respected you. In Gorundai culture, this is apparently how foreign policy works.',
    }},
  ],
};

/**
 * Mossbreak Tavern Brawl - the neutral ground rules break down.
 * Iren Saltz\'s Copperhand crew picks a fight.
 */
export const mossbreakBrawl: CombatEncounter = {
  id: 'mossbreak_brawl',
  title: 'TAVERN BRAWL',
  subtitle: 'So much for neutral ground.',
  narrativeIntro: [
    'It starts with drinks. It always starts with drinks.',
    'Iren Saltz sits across from you, copper arm resting on the table, watching you with the calculating eyes of someone who used to have territory and wants it back.',
    '"You took Tavven Shoal." Not a question.',
    '"I took Tavven Shoal."',
    '"I had Windrow for six months. You know how I lost it?" She doesn\'t wait for an answer. "I was soft. I let people vote, negotiate, build consensus. While I was building consensus, a Conqueror\'s lieutenant landed with forty fighters and took it in an afternoon."',
    'She leans forward. "You\'re not soft. I can see that. But you\'re also sitting in MY tavern, on MY neutral ground, with a crew of five against my twenty."',
    '"Delvessa." You don\'t look away from Iren. "How many of her twenty are actually combat-ready?"',
    '"Seven. The rest are deckhands and a cook."',
    'Iren\'s mouth goes flat. The copper arm whirs.',
    '"Seven against five." You drain your rum. "I like those odds."',
  ],
  narrativeVictory: [
    'Tables are broken. Three walls have new holes. The bartender is going to charge you for this, probably a lot.',
    'Iren Saltz is on her back, copper arm sparking. She looks up at you. Not with hatred, but with something closer to respect.',
    '"Alright." She coughs. "Point made."',
    '"Was there a point? I thought this was just fun."',
    'She laughs despite herself. The copper arm twitches. "You\'re insane."',
    '"I\'m an Oni who intends to conquer the world. Insane is the minimum qualification."',
    'Kovesse is already broadcasting. Of course she is. "Captain, the ENGAGEMENT on this fight... we\'re trending in THREE Grimoire channels. The comments are BEAUTIFUL."',
    'A woman at the bar, copper-skinned, dark eyes, hadn\'t moved during the entire brawl, raises her glass to you. She has a smile like trouble.',
    'You nod back. Trouble is your favorite kind of company.',
  ],
  narrativeDefeat: [
    'Saltz\'s crew has numbers. They pull you down by weight. The copper fist connects once. It\'s like being hit by a ship.',
    'But Kovesse triggers the Grimoire emergency broadcast, and suddenly every eye in the Bastion Sea is watching. Iren backs off. Bad press.',
  ],
  enemies: [copperhandOfficer, renegadeSailor, renegadeSailor, renegadeSailor],
  rewards: [
    { type: 'reputation', value: 7, label: '+7 Reputation' },
    { type: 'infamy', value: 4, label: '+4 Infamy' },
    { type: 'bounty', value: 5000000, label: '+5M Bounty' },
    { type: 'sovereigns', value: 60, label: '+60 Sovereigns' },
    { type: 'flag', value: true, target: 'mossbreak_brawl_won', label: 'Tavern Champion' },
  ],
  defeatConsequence: 'story_continue',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'delvessa', 'suulen', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'mossbreak_brawl_won', value: true },
    { type: 'flag', target: 'iren_saltz_impressed', value: true },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE TRENDING - #TavernDestroyed',
      message: 'Kovesse\'s livestream of the Mossbreak tavern brawl is the #1 trending topic on three Grimoire channels. Comments include: "marry me oni man," "the copper arm FLEW," and "someone calculate the property damage."',
    }},
  ],
};

/**
 * Durrek Garrison Assault - the hardest fight in Act 1.
 * Wardensea fortress. Real military. This is where the game gets serious.
 */
export const durrekAssault: CombatEncounter = {
  id: 'durrek_assault',
  title: 'GARRISON ASSAULT',
  subtitle: 'You didn\'t come to the Wardensea\'s doorstep to knock politely.',
  narrativeIntro: [
    'Durrek sits on the horizon like a fist made of stone. No natural harbor. The Wardensea carved one from volcanic rock and filled it with warships. The fortress above is three stories of reinforced basalt with cannon emplacements and a flag that\'s never been lowered.',
    'Vorreth stands at the prow, watching. His face is unreadable.',
    '"You know this place," Delvessa says.',
    '"Spent two years in their prison. Lower garrison, cell block four." He rolls his shoulders. "They didn\'t feed well."',
    '"And now you\'re attacking it."',
    '"And now I\'m attacking it." He doesn\'t look away from the fortress. "The commander is Captain Drezh. He\'s competent. Disciplined. He won\'t surrender."',
    '"Good." You stand. The Danzai war club feels right in your hands. "I didn\'t cross the Bastion Sea to accept surrenders."',
    'The garrison marines form up on the dock as you approach. Shields. Bayonets. Formation discipline. Behind them, the commander descends the fortress steps in full dress uniform, the Wardensea cross glinting on their chest.',
    '"KARYUDON!" The commander\'s voice carries across the water. "On behalf of the Wardensea Navy, you are hereby--"',
    '"SHUT UP!" Your voice is louder. Oni lungs. "I am KARYUDON! FUTURE CONQUEROR OF THE WORLD! And your garrison is in my way!"',
    'Silence.',
    'Then Kovesse, from somewhere behind you: "Oh that\'s CONTENT."',
  ],
  narrativeVictory: [
    'The fortress flag comes down.',
    'Not because you lowered it, but because the commander lowered it. The marines are beaten. The walls are cracked. The dock is rubble. But the commander, Captain Drezh, walks to the flagpole with the last of his dignity and pulls it down himself.',
    '"Garrison Durrek stands down." His voice is steady. The blood on his face doesn\'t waver his composure. "But understand this, pirate: the Wardensea is not one garrison. We are a thousand garrisons. You\'ve taken a stone from a mountain."',
    '"Then I\'ll take the mountain." You plant the Danzai in the dock. "One stone at a time."',
    'Vorreth is quiet for a long time. When he speaks, it\'s barely above a whisper.',
    '"I knew Drezh. He ran my cell block. Fair, for a jailer. Good man."',
    '"Was he going to let us pass?"',
    '"No."',
    '"Then he was in the way." You turn. "Being a good man and being in my way are not mutually exclusive."',
    'Vorreth nods. He doesn\'t agree, exactly. But he nods.',
  ],
  narrativeDefeat: [
    'The garrison holds. The marines are too well-coordinated, too disciplined, too entrenched. You\'re pushed back to the water.',
    '"Retreat," Vorreth says, and for once, you listen. Not because you\'re beaten, but because you\'re outmatched. For now.',
    '"We\'ll be back."',
    '"I know," Vorreth says. He sounds tired. "They know too."',
  ],
  enemies: [garrisonCommander, garrisonMarine, garrisonMarine, garrisonMarine],
  waves: [
    [garrisonMarine, garrisonMarine],  // Reinforcements from the barracks
  ],
  rewards: [
    { type: 'reputation', value: 12, label: '+12 Reputation' },
    { type: 'infamy', value: 8, label: '+8 Infamy' },
    { type: 'bounty', value: 25000000, label: '+25M Bounty' },
    { type: 'sovereigns', value: 200, label: '+200 Sovereigns (garrison coffers)' },
    { type: 'materials', value: 20, label: '+20 Materials (seized equipment)' },
    { type: 'intelligence', value: 10, label: '+10 Intelligence (garrison records)' },
    { type: 'flag', value: true, target: 'durrek_conquered', label: 'Durrek Garrison Conquered' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'durrek_conquered', value: true },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: '⚠️ WARDENSEA EMERGENCY - DURREK GARRISON FALLEN',
      message: 'Priority alert to all Wardensea commands: Garrison Durrek has been taken by the Oni Renegade designated KARYUDON. Commander Drezh has surrendered. Recommend immediate dispatch of First Division response fleet. The Northern Arc is no longer secure.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BREAKING - A GARRISON FALLS',
      message: 'The Bastion Sea hasn\'t seen a Wardensea garrison fall in seventeen years. Karyudon\'s crew broadcast the entire assault. The Wardensea is issuing takedown orders to every Grimoire hub. The clips are already archived.',
    }},
  ],
  onDefeatEffects: [
    { type: 'flag', target: 'durrek_assault_failed', value: true },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'DURREK - REPELLED',
      message: 'The garrison held. But they know you tried. And they know you\'ll try again. Durrek is on alert now. The next assault will be harder.',
    }},
  ],
};

/**
 * Sea Encounter - Pirate Raiders (random encounter during travel)
 */
export const seaPirateRaid: CombatEncounter = {
  id: 'sea_pirate_raid',
  title: 'BOARDING PARTY',
  subtitle: 'Renegades who picked the wrong ship.',
  narrativeIntro: [
    'The ship comes out of the morning fog. No colors. No warning. Just grappling hooks and screaming.',
    'Five raiders hit the deck before you\'re fully awake. Dragghen is already swinging a hull brace. Vorreth has his fists up. Suulen, nobody knows where Suulen is, which means she\'s in the worst possible position. For them.',
    'The raider captain points at you. Takes in the horns. The height. The Danzai. His mouth works silently for a moment.',
    '"...wrong ship."',
    '"Yeah." You stretch. You actually stretch. "Really wrong ship."',
  ],
  narrativeVictory: [
    'The raiders are in the water. Their ship is drifting. You claimed the grappling hooks, good iron.',
    'Delvessa inventories the raider ship. "Provisions. Some copper. Nothing exceptional. These weren\'t career pirates, just desperate sailors who thought they saw an easy mark."',
    '"An easy mark." You look down at the Danzai. "Me."',
    '"In their defense, Captain, you were sleeping."',
    '"Delvessa."',
    '"Yes?"',
    '"Shut up." But you\'re grinning.',
  ],
  narrativeDefeat: [
    'The raiders are more coordinated than they looked. They\'re fighting for survival, which makes them dangerous.',
    'But Kovesse sounds the retreat horn, and your crew regroups. You don\'t lose the ship. You don\'t lose anyone. You just lose some cargo and your good mood.',
  ],
  enemies: [pirateRaider, pirateRaider, pirateRaider],
  rewards: [
    { type: 'reputation', value: 3, label: '+3 Reputation' },
    { type: 'sovereigns', value: 40, label: '+40 Sovereigns (raider loot)' },
    { type: 'supplies', value: 5, label: '+5 Supplies (seized provisions)' },
  ],
  defeatConsequence: 'story_continue',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'survived_pirate_raid', value: true },
  ],
};

/**
 * Sea Encounter - Deep Current Horror (rare sea monster)
 */
export const seaMonsterAttack: CombatEncounter = {
  id: 'sea_monster',
  title: 'DEEP CURRENT HORROR',
  subtitle: 'The sea remembers things that shouldn\'t exist.',
  narrativeIntro: [
    'The water changes color first. From blue to dark. From dark to black. Not shadow, but something beneath the surface displacing light itself.',
    'Suulen is the first to react. "ALL HANDS!" Her spatial awareness, Forged Sight, gives her about three seconds of warning. She uses all three.',
    'It surfaces.',
    'Tentacles first. Then the body, if you can call it a body. It\'s more a suggestion of mass, a volume of sea-dark muscle and too many eyes. The Bastion Sea has these. Nobody talks about them. Nobody knows what they are. The Wardensea classifies them as "deep current anomalies" and pretends that\'s an explanation.',
    'Dragghen picks up a hull brace. Vorreth cracks his knuckles. Kovesse starts recording.',
    '"Kovesse."',
    '"Captain?"',
    '"Really?"',
    '"Captain, this is going to get SO many views."',
    'You raise the Danzai. The Iron flows. "Fine. Make it look good."',
  ],
  narrativeVictory: [
    'It sinks. Slowly, grudgingly, as if the sea itself is reluctant to take it back. The tentacles release the hull one by one, leaving suction-cup welts in the ironwood. The eyes, all of them, watch you as it descends.',
    'You watch it go.',
    '"What..." Dragghen stares at the damage. "What WAS that?"',
    '"Dinner, if it had gone differently." You inspect the Danzai. Sea-beast blood smells like copper and ozone.',
    'Delvessa is already calculating repair costs. "We need ironwood. The hull took significant damage."',
    'Kovesse is vibrating. "Captain. CAPTAIN. The feed hit EIGHT THOUSAND viewers. The comments. They\'re calling you \'The Oni Who Punched the Ocean.\' This is LEGENDARY content."',
    'You stare at the dark water. Somewhere down there, something is nursing its wounds.',
    '"Let it remember," you say.',
  ],
  narrativeDefeat: [
    'The creature is too strong. Too large. Too ancient. You can\'t kill it. You can only survive it.',
    'Vorreth orders evasive maneuvers. Suulen navigates by Sight. The ship escapes, damaged but afloat.',
    '"It let us go," Suulen says quietly.',
    '"What?"',
    '"It let us go. It could have sunk us. It chose not to."',
    'You don\'t sleep well that night.',
  ],
  enemies: [seaBeast],
  rewards: [
    { type: 'reputation', value: 10, label: '+10 Reputation' },
    { type: 'infamy', value: 5, label: '+5 Infamy (even the sea knows)' },
    { type: 'bounty', value: 10000000, label: '+10M Bounty' },
    { type: 'flag', value: true, target: 'killed_sea_beast', label: 'Beast Slayer' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'kovesse', 'delvessa'],
  onVictoryEffects: [
    { type: 'flag', target: 'killed_sea_beast', value: true },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE VIRAL - #OniPunchedTheOcean',
      message: 'Kovesse\'s footage of the Deep Current Horror fight has gone completely viral. Every Renegade crew in the Bastion Sea is talking about it. The Wardensea Marine Biology division wants to know how you survived. Three separate Conqueror lieutenants have reportedly asked: "Who?"',
    }},
  ],
  onDefeatEffects: [
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'THE DEEP REMEMBERS',
      message: 'You survived a deep current horror. The ship needs repairs, but you\'re alive. Suulen says it chose to let you go. You don\'t know what that means.',
    }},
  ],
};

/**
 * Wardensea Ambush at Sea - a coordinated strike from a Wardensea cutter.
 */
export const wardenseaSeaAmbush: CombatEncounter = {
  id: 'wardensea_sea_ambush',
  title: 'WARDENSEA INTERCEPTION',
  subtitle: 'They\'ve been tracking you. Time to un-track them.',
  narrativeIntro: [
    'The cutter comes from the east, running with the wind. Wardensea colors. Bow chasers loaded. This isn\'t a patrol. This is a hunter.',
    'Vorreth identifies it immediately. "Interceptor class. Fast, lightly armed, crew of twenty. They\'re not here to sink us. They\'re here to slow us down until the heavy ships arrive."',
    '"How long until heavy ships?"',
    '"Hours. Maybe less."',
    '"Then we finish this fast." You crack your knuckles. "Delvessa, boarding plan."',
    '"Already done." She\'s been planning this since the cutter appeared. "Their weakness is the stern. Low freeboard. We can get aboard in thirty seconds."',
    '"Dragghen?"',
    '"I\'ll bring the good brace."',
    'Twenty-two seconds later, you\'re on their deck.',
  ],
  narrativeVictory: [
    'The cutter\'s crew surrenders after you throw their officer into the mainmast. The crack is very loud. The silence afterward is very instructive.',
    'Vorreth moves through the ship with professional efficiency, gathering intelligence. Charts. Patrol schedules. Communication logs. The Wardensea is methodical, which means their information is valuable.',
    '"They\'ve been tracking us for three days," he reports. "They know our route patterns. This was coordinated. Someone in the port offices is reporting our movements."',
    '"Then we change our routes."',
    '"Or we find the informant."',
    'You consider this. Finding problems is Delvessa\'s specialty. Removing them is yours.',
    '"Both." You pick up the officer\'s whistle. Nice silver. You pocket it. Spoils of war.',
  ],
  narrativeDefeat: [
    'The interceptor is fast, and its crew fights with the desperation of people who know reinforcements are coming. You\'re pushed back to your own ship.',
    'Suulen charts an escape route through shallow water where the cutter can\'t follow. You survive. Barely.',
  ],
  enemies: [wardenseaOfficer, wardenseaSoldier, wardenseaSoldier],
  rewards: [
    { type: 'reputation', value: 6, label: '+6 Reputation' },
    { type: 'infamy', value: 4, label: '+4 Infamy' },
    { type: 'intelligence', value: 8, label: '+8 Intelligence (intercepted orders)' },
    { type: 'bounty', value: 12000000, label: '+12M Bounty' },
    { type: 'sovereigns', value: 100, label: '+100 Sovereigns (officer\'s lockbox)' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'delvessa', 'suulen', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'wardensea_interceptor_defeated', value: true },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA - CUTTER LOST',
      message: 'Interceptor WSS Resolve is unresponsive. Last known position: Bastion Sea central corridor. Crew status unknown. The fugitive Karyudon is confirmed in the area.',
    }},
  ],
};

// ==========================================
// BASTION FLEET ENEMIES (Conqueror-tier)
// ==========================================

const BASTION_MARINE_ACTIONS: CombatAction[] = [
  {
    id: 'bastion_cutlass',
    name: 'Bastion Cutlass',
    description: 'Conqueror-fleet standard issue. Heavier than Wardensea steel, sharper than anything the navy fields.',
    category: 'strike',
    targetType: 'single',
    damage: 30,
    damageType: 'physical',
    accuracy: 83,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'slash',
    flavorText: 'The marine strikes with disciplined naval precision, but this isn\'t Wardensea form. This is faster. Meaner. Vassago\'s fleet trains on live targets.',
    missText: 'The blade cuts air. Close, though, closer than you\'d like. These aren\'t garrison conscripts. The gap in Conqueror training is narrow, and it shows.',
  },
  {
    id: 'bastion_formation_advance',
    name: 'Formation Advance',
    description: 'Fleet formation discipline. Advance as one. Die as one.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'block',
    flavorText: 'The marines lock step without a word. No shouted orders. Vassago\'s fleet trains in silence. They advance like a closing fist, each covering the other. This is what fleet discipline looks like when it\'s forged by a Conqueror.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 18, duration: 2, chance: 100, description: 'Fleet formation' },
    ],
  },
];

const BASTION_LIEUTENANT_ACTIONS: CombatAction[] = [
  {
    id: 'lieutenant_command_slash',
    name: 'Command Slash',
    description: 'Conqueror-grade Iron behind a blade that\'s tasted blood on six islands.',
    category: 'strike',
    targetType: 'single',
    damage: 45,
    damageType: 'dominion_iron',
    accuracy: 80,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'heavy_smash',
    flavorText: 'Gharen moves with Conqueror-grade Iron flowing through the blade. The slash doesn\'t just cut. It DISPLACES. The air splits ahead of the edge. This is what real Dominion looks like when someone with authority wields it.',
    missText: 'The slash tears a groove in the stone dock. Overwhelming force, telegraphed by conviction. He swings like a man who\'s never had to worry about missing.',
  },
  {
    id: 'lieutenant_fleet_authority',
    name: 'Fleet Authority',
    description: 'Rally the authority of a Conqueror\'s fleet. Heal. Harden. Hit harder.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 4,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'crew_assist',
    flavorText: '"IN VASSAGO\'S NAME!" Gharen plants his feet and the Iron surges outward like a shockwave. The marines straighten. The gold trim on his armor catches forge-light and for a moment he looks like something more than a lieutenant. He looks like what Vassago\'s authority was designed to create.',
    missText: '',
    effects: [
      { type: 'buff_attack', value: 15, duration: 2, chance: 100, description: 'Conqueror\'s rally' },
      { type: 'buff_defense', value: 15, duration: 2, chance: 100, description: 'Fleet resolve' },
      { type: 'heal', value: 25, duration: 1, chance: 100, description: 'Iron mending' },
    ],
  },
  {
    id: 'lieutenant_conquerors_iron',
    name: 'Conqueror\'s Iron',
    description: 'The real thing. Not tempered, but FORGED by a Conqueror\'s will.',
    category: 'dominion',
    targetType: 'single',
    damage: 65,
    damageType: 'dominion_iron',
    accuracy: 70,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'iron_pulse',
    flavorText: 'Gharen raises his hand and the air SCREAMS. Conqueror-grade Dominion: not the diluted Iron the Wardensea teaches, not the raw stuff Renegades swing around. This is refined. Focused. The Iron hits like a battering ram wrapped in lightning. You feel it in your bones, in the horns, in the part of your blood that recognizes what power ACTUALLY looks like.',
    missText: 'The Iron pulse sears the air beside you. Your own Dominion flickers in response: recognition. Resistance. The Conqueror\'s Iron is real, but it\'s filtered through a subordinate. Under pressure, it wavers.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 35, description: 'Conqueror\'s weight' },
    ],
  },
  {
    id: 'lieutenant_overwhelming_force',
    name: 'Overwhelming Force',
    description: 'Coordinated assault. Everyone hits everything. The dock shakes.',
    category: 'special',
    targetType: 'all',
    damage: 30,
    damageType: 'physical',
    accuracy: 75,
    cooldown: 4,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'screen_shake',
    flavorText: 'Gharen snaps his fingers and the marines attack as one. Not individually, but SIMULTANEOUSLY. The coordinated assault rocks the dock. Steel and Iron from every angle. This is what happens when a Conqueror\'s fleet fights as a single organism.',
    missText: 'The coordinated strike shatters the ground around you but you\'re already moving. Suulen\'s spatial calls in your ear, Vorreth\'s tactical instinct pulling your crew clear of the kill zone.',
    effects: [
      { type: 'weaken', value: 12, duration: 1, chance: 40, description: 'Suppressive assault' },
    ],
  },
];

// ==========================================
// BASTION FLEET TEMPLATES
// ==========================================

const bastionMarine: EnemyTemplate = {
  id: 'bastion_marine',
  name: 'Bastion Marine',
  title: 'Vassago\'s Fleet',
  tier: 'soldier',
  hp: 84,
  stamina: 100,
  attack: 13,
  defense: 22,
  speed: 22,
  dominion: { iron: 35, sight: 8, king: 0 },
  actions: BASTION_MARINE_ACTIONS.map(a => ({ ...a, currentCooldown: 0 })),
  aiPattern: 'defensive',
  flavorIntro: 'Bastion Fleet marine: better trained, better equipped, and better motivated than anything the Wardensea fields. Vassago Moren doesn\'t keep soldiers who lose.',
  flavorDefeat: 'The marine drops. Conqueror discipline holds to the last. He falls at attention.',
};

const bastionLieutenant: EnemyTemplate = {
  id: 'bastion_lieutenant',
  name: 'Fleet Lieutenant Gharen',
  title: 'Vassago\'s Enforcer',
  tier: 'commander',
  hp: 210,
  stamina: 100,
  attack: 20,
  defense: 26,
  speed: 26,
  dominion: { iron: 62, sight: 30, king: 20 },
  actions: BASTION_LIEUTENANT_ACTIONS.map(a => ({ ...a, currentCooldown: 0 })),
  aiPattern: 'tactical',
  flavorIntro: 'Fleet Lieutenant Gharen. Gold-trimmed armor. Vassago\'s personal insignia on his pauldron. The Iron radiates from him like heat from a forge. This is Conqueror-grade Dominion, and he wears it like a second skin. "You\'re the Oni from the broadcasts," he says. "My Lord will want to hear about this. Personally."',
  flavorDefeat: 'Gharen staggers. Blood on the gold trim. The Iron flickers and dies. But he\'s smiling, the cold smile of a man who knows something you don\'t. "Well fought," he says. "He\'ll come for you now. And he won\'t send a lieutenant."',
};

// ==========================================
// ANVIL CAY COMBAT ENCOUNTER
// ==========================================

/**
 * Anvil Cay Assault - first encounter with Conqueror-tier opposition.
 * Vassago Moren's forward operating base. This changes the game.
 */
export const anvilCayAssault: CombatEncounter = {
  id: 'anvil_cay_assault',
  title: 'BASTION FLEET ENGAGEMENT',
  subtitle: 'You\'re in Vassago\'s house. He doesn\'t knock.',
  narrativeIntro: [
    'Anvil Cay at night. The volcanic vents paint the water in streaks of orange and black. You come through the thermal channels on Suulen\'s navigation. She reads the heat distortion like a map, threading the ship between steam plumes and boiling current. Nobody else could find a path through this. Nobody else has her Sight.',
    'The dock appears through the haze. Forge-light from the shipyard casts long shadows across reinforced berths and dry-dock cranes. This isn\'t a harbor. It\'s a military installation. A place where warships are born. And standing on the dock, armor catching the fire-glow, is a man who was expecting you. Gold trim. Vassago\'s insignia. Three marines at his flanks, weapons already drawn. Behind them, the shipyard burns bright with the light of a Conqueror\'s industry.',
    'Vorreth goes rigid beside you. "That\'s a fleet lieutenant. Conqueror rank." His voice is careful. Measured. The voice of a man who understands what he\'s looking at. "Captain, this isn\'t Wardensea. This isn\'t garrison soldiers or Kolmari enforcers. This is Vassago Moren\'s personal military. They train against Dominion users. They\'ve KILLED Dominion users."',
    'The lieutenant\'s voice carries across the water like an order. "Karyudon. The Oni who announces his ambitions on the Grimoire and calls it strategy." He draws his blade. The Iron that flows into it is unlike anything you\'ve felt: dense, refined, the product of a Conqueror\'s authority filtered through years of service. "Lord Vassago extends his compliments. And his invitation. You can come with me, or I can bring what\'s left of you." He smiles. It doesn\'t reach his eyes. "I prefer the second option."',
  ],
  narrativeVictory: [
    'The shipyard falls in silence. Not the silence of surrender, but the silence of something fundamental shifting in the Bastion Sea. The marines are down. The forge-light flickers over broken formation lines and Conqueror steel scattered across the dock. And Gharen, Fleet Lieutenant Gharen, Vassago\'s enforcer, the man with Conqueror-grade Iron in his veins, is on his knees, blood dripping from the gold trim, staring at you with an expression that isn\'t fear. It\'s recognition.',
    '"Drag him out," you tell Vorreth. But Gharen is already being pulled back by his surviving marines, two of them, bloodied, retreating into the shipyard\'s back corridors. He goes without resistance, but his eyes don\'t leave yours. And his last words hang in the volcanic air like a promise: "He\'ll come for you now." The smile is the worst part. He MEANS it. And somewhere in the Bastion Sea, a Conqueror is about to learn that an Oni broke his forward base.',
    'The crew moves through the shipyard like professionals. Delvessa catalogs fleet documents: patrol routes, supply lines, communication codes. Vorreth secures the dry-dock. Dragghen finds the treasury. Suulen maps every exit, every passage, every blind spot. Kovesse broadcasts everything, because of course she does. "GRIMOIRE EXCLUSIVE - KARYUDON TAKES A CONQUEROR\'S BASE." You can hear the viewer count climbing from across the dock. The forge-fire burns at your back. Anvil Cay is yours. And the game just changed.',
  ],
  narrativeDefeat: [
    'The Iron is too much. Gharen\'s Conqueror-grade Dominion hits different from anything you\'ve faced. It\'s not just power, it\'s AUTHORITY, the weight of Vassago Moren\'s will channeled through a subordinate who believes absolutely in the chain of command. The marines fight like extensions of that will. You\'re driven back across the dock, the forge-light turning your retreat into long shadows on volcanic stone.',
    'Vorreth calls the retreat. You don\'t argue, not because you\'re beaten, but because you\'re smart enough to know the difference between a lost battle and a lost war. The ship pulls away through the thermal vents, Suulen guiding blind through steam and heat. Behind you, Gharen watches from the dock. He doesn\'t pursue. He doesn\'t need to. But the intelligence Delvessa gathered during the fight, patrol schedules, fleet positions, the layout of the base itself, that\'s worth the bruises. Next time, you won\'t come through the front door.',
  ],
  enemies: [bastionLieutenant, bastionMarine, bastionMarine, bastionMarine],
  waves: [
    [bastionMarine, bastionMarine],  // Reinforcements from the shipyard
  ],
  rewards: [
    { type: 'reputation', value: 15, label: 'Reputation +15 (Conqueror territory seized)' },
    { type: 'bounty', value: 35000000, label: 'Bounty +35,000,000 (Attacked Vassago\'s Fleet)' },
    { type: 'materials', value: 30, label: '30 Materials (shipyard salvage)' },
    { type: 'intelligence', value: 20, label: '20 Intelligence (fleet documents)' },
    { type: 'sovereigns', value: 300, label: '300 Sovereigns (captured treasury)' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['delvessa', 'dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'anvil_cay_battle_won', value: true },
    { type: 'reputation', target: 'reputation', value: 15 },
    { type: 'infamy', target: 'infamy', value: 10 },
    { type: 'bounty', target: 'bounty', value: 35000000 },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - CONQUEROR ALERT',
      message: 'BREAKING: The Oni Renegade Karyudon has attacked and seized a Bastion Fleet forward operating base on Anvil Cay. Fleet Lieutenant Gharen, a known enforcer of Conqueror Vassago Moren, was defeated in direct combat. This is the first confirmed assault on Conqueror military infrastructure by a non-Conqueror force in over a decade. Vassago Moren\'s office has not issued a statement. The silence is louder than any response.',
    }},
  ],
  onDefeatEffects: [
    { type: 'flag', target: 'anvil_cay_battle_lost', value: true },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'ANVIL CAY - TACTICAL RETREAT',
      message: 'The Bastion Fleet held. Conqueror-grade opposition is a different beast entirely. But the intelligence gathered during the assault, fleet documents, patrol routes, base layout, makes the retreat a strategic loss, not a total one. Gharen knows your face now. Vassago will know your name. The next move matters.',
    }},
  ],
};

// ==========================================
// WINDROW ENEMIES (Environmental / Debris)
// ==========================================

const CLIFF_DEBRIS_ACTIONS: CombatAction[] = [
  {
    id: 'debris_rockfall',
    name: 'Rockfall',
    description: 'Loose stone tumbling from the collapsed cliff face.',
    category: 'strike',
    targetType: 'single',
    damage: 25,
    damageType: 'physical',
    accuracy: 75,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'heavy_smash',
    flavorText: 'Stone breaks free from the cliff face and hammers down. The sound is like thunder trapped in a bottle: sharp, immediate, inescapable.',
    missText: 'The rock shatters against the ground beside you. Dust and gravel. Close enough to feel the wind.',
  },
  {
    id: 'debris_collapse',
    name: 'Structural Collapse',
    description: 'A section of cliff gives way entirely.',
    category: 'strike',
    targetType: 'all',
    damage: 18,
    damageType: 'physical',
    accuracy: 70,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'screen_shake',
    flavorText: 'The cliff groans, a deep, geological sound that vibrates in your chest. Then a whole section gives way. Stone, timber, packed earth, an avalanche in miniature.',
    missText: 'You throw yourself clear as the cliff face comes apart. Dust everywhere. Someone is screaming under the rubble.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 30, description: 'Buried in debris' },
    ],
  },
];

const cliffDebris: EnemyTemplate = {
  id: 'cliff_debris',
  name: 'Falling Debris',
  tier: 'soldier',
  hp: 70,
  stamina: 100,
  attack: 14,
  defense: 20,
  speed: 5,
  dominion: { iron: 0, sight: 0, king: 0 },
  actions: CLIFF_DEBRIS_ACTIONS,
  aiPattern: 'aggressive',
  flavorIntro: 'Loose stone and shattered timber suspended above the trapped workers. Gravity is the enemy here, and gravity doesn\'t negotiate.',
  flavorDefeat: 'The debris collapses into harmless rubble. The path forward is clear.',
};

const cliffFace: EnemyTemplate = {
  id: 'cliff_face',
  name: 'Collapsed Cliff Face',
  tier: 'elite',
  hp: 160,
  stamina: 100,
  attack: 20,
  defense: 25,
  speed: 3,
  dominion: { iron: 0, sight: 0, king: 0 },
  actions: CLIFF_DEBRIS_ACTIONS,
  aiPattern: 'defensive',
  flavorIntro: 'The main collapse: a wall of fractured stone and compressed earth blocking the rescue path. It shifts with every tremor, threatening to bring more down. You\'re not fighting an enemy. You\'re fighting geology.',
  flavorDefeat: 'The last section crumbles under the Danzai. Dust billows outward. Behind it: voices. The workers are alive.',
};

// ==========================================
// WINDROW CLIFF RESCUE ENCOUNTER
// ==========================================

/**
 * Windrow Cliff Rescue - environmental combat against collapsed terrain.
 * Workers are trapped. Smash through to save them.
 */
export const windrowCliffRescue: CombatEncounter = {
  id: 'windrow_cliff_rescue',
  title: 'WINDROW CLIFF RESCUE',
  subtitle: 'Smash through collapsed rock to save trapped workers.',
  narrativeIntro: [
    'The wind corridor hits Windrow\'s eastern face like a battering ram. It always has. The locals built their timber mills into the cliff shelves specifically for it: wind-powered saws that never stop turning.',
    'Until the cliff gave way.',
    'You hear the collapse before you see it. A sound like the world cracking its knuckles: deep, percussive, final. The eastern shelf is gone. Where the mill stood, there\'s now a wall of fractured stone and splintered timber. And underneath it, according to the foreman screaming at the edge, twelve workers who were on the morning shift.',
    '"They\'re alive," Suulen says, her Sight cutting through stone like it isn\'t there. "Pocket in the rock. Air for maybe an hour."',
    'You look at the collapse. Tons of stone. Compressed earth. Shattered ironwood beams that could shift at any moment and bring the whole face down.',
    'You crack your knuckles. "Then we have an hour."',
    'Dragghen steps up beside you. "Captain, you can\'t just PUNCH a cliff."',
    'You raise the Danzai. Iron flows through the spikes.',
    '"Watch me."',
  ],
  narrativeVictory: [
    'The last section of cliff face crumbles under the Danzai. Dust billows outward like a held breath finally released. Behind it: voices. Coughing. Swearing. Alive.',
    'Twelve workers crawl out of the pocket, covered in dust and blood and disbelief. The foreman counts them. Counts again. All twelve.',
    'One of them, a grey-haired woman with arms like anchor rope, stares up at you. Seven feet of dust-covered Oni, war club dripping with stone fragments, horns catching the wind.',
    '"Who the hell are you?"',
    '"Karyudon. I\'m going to conquer the world. But today I\'m just digging."',
    'She laughs. It starts as shock. Ends as something like faith.',
    'Windrow remembers. The cliff took their workers. The Oni brought them back.',
  ],
  narrativeDefeat: [
    'The cliff is too unstable. Every strike brings more down. Suulen pulls you back before the whole face collapses.',
    '"The pocket held," she says. "They\'re still alive. But we need equipment: bracing, pulleys. Brute force won\'t work here."',
    'It takes another four hours with proper gear. The workers survive. But you didn\'t save them with the Danzai. That bothers you more than it should.',
  ],
  enemies: [cliffFace, cliffDebris, cliffDebris],
  rewards: [
    { type: 'sovereigns', value: 50, label: '+50 Sovereigns (grateful workers)' },
    { type: 'materials', value: 20, label: '+20 Materials (salvaged timber)' },
    { type: 'reputation', value: 30, label: '+30 Reputation (cliff rescue)' },
  ],
  defeatConsequence: 'story_continue',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'windrow_cliff_rescue_won', value: true },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'WINDROW - THE CLIFF RESCUE',
      message: 'Twelve workers pulled from a collapsed cliff face by an Oni with a war club. Windrow\'s council is reconsidering their position on Renegade visitors. The foreman bought you a drink. It was terrible. It was the best drink you\'ve ever had.',
    }},
  ],
};

// ==========================================
// GHOSTLIGHT REEF ENEMIES (Sea Monster Boss)
// ==========================================

const LEVIATHAN_ACTIONS: CombatAction[] = [
  {
    id: 'leviathan_bite',
    name: 'Crushing Bite',
    description: 'Jaws designed to crack ship hulls.',
    category: 'strike',
    targetType: 'single',
    damage: 40,
    damageType: 'physical',
    accuracy: 80,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'heavy_smash',
    flavorText: 'The Leviathan\'s jaws open wide enough to swallow a longboat. The bite comes with the force of a collapsing building: massive, inexorable, pressure that turns ironwood to splinters.',
    missText: 'The jaws snap shut on empty water. The displacement wave alone rocks the ship sideways. That was a warning shot from something that doesn\'t give warnings.',
  },
  {
    id: 'leviathan_tail_sweep',
    name: 'Tail Sweep',
    description: 'A tail the size of a mainmast, moving at the speed of a whip.',
    category: 'strike',
    targetType: 'all',
    damage: 25,
    damageType: 'physical',
    accuracy: 75,
    cooldown: 1,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'screen_shake',
    flavorText: 'The tail erupts from the water in a curtain of spray. It sweeps across the deck like God\'s own broom. Everything not bolted down goes airborne. Including people.',
    missText: 'You drop flat. The tail passes overhead close enough to clip your horns. The wind from it smells like the deep ocean: salt and something older.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 25, description: 'Swept off feet' },
    ],
  },
  {
    id: 'leviathan_depth_charge',
    name: 'Depth Charge',
    description: 'The Leviathan dives and surfaces with concussive force.',
    category: 'strike',
    targetType: 'single',
    damage: 35,
    damageType: 'physical',
    accuracy: 70,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'screen_shake',
    flavorText: 'It goes under. The water goes still, unnaturally still. Then it hits from below, the entire mass of it driving upward through the hull like a living torpedo. The ship lifts. The timbers scream.',
    missText: 'The ship lurches but holds. The Leviathan surfaces ten meters off the bow, watching. Calculating. This thing is SMART.',
    effects: [
      { type: 'weaken', value: 10, duration: 2, chance: 30, description: 'Hull shock' },
    ],
  },
  {
    id: 'leviathan_bioluminescent_blind',
    name: 'Blinding Flash',
    description: 'Bioluminescent organs along its body ignite simultaneously.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 90,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'flash_white',
    flavorText: 'Every bioluminescent organ along the Leviathan\'s body ignites at once. The reef lights up like sunrise: blinding, beautiful, disorienting. You can\'t see. Can\'t aim. The afterimage burns green and blue behind your eyelids.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 15, duration: 2, chance: 100, description: 'Bioluminescent dazzle' },
    ],
  },
];

const reefLeviathan: EnemyTemplate = {
  id: 'reef_leviathan',
  name: 'Reef Leviathan',
  tier: 'prime',
  hp: 245,
  stamina: 100,
  attack: 18,
  defense: 18,
  speed: 16,
  dominion: { iron: 10, sight: 5, king: 30 },
  actions: LEVIATHAN_ACTIONS,
  aiPattern: 'berserker',
  flavorIntro: 'It surfaces slowly. Deliberately. Like it wants you to see all of it before it kills you. Sixty feet of bioluminescent muscle and armored scale, reef coral growing along its spine like a crown. The fishing collective calls it the Reef Leviathan. They\'ve been losing boats to it for three seasons. Up close, you understand why. This isn\'t a fish. This is a cathedral of violence with a nervous system.',
  flavorDefeat: 'The Leviathan shudders. The bioluminescence dims, pulsing, fading, like a heartbeat slowing. It rolls, showing the pale belly, the massive gills flaring one last time. Then it sinks. Not thrashing. Not dying violently. It goes down with the dignity of something ancient that has simply decided this fight is over. The reef goes dark. The fishing collective won\'t lose any more boats.',
};

// ==========================================
// GHOSTLIGHT LEVIATHAN ENCOUNTER
// ==========================================

/**
 * Ghostlight Leviathan - boss fight against a massive deepwater predator.
 * The fishing collective needs this thing dead.
 */
export const ghostlightLeviathan: CombatEncounter = {
  id: 'ghostlight_leviathan',
  title: 'THE REEF LEVIATHAN',
  subtitle: 'A massive deepwater predator terrorizing the fishing collective.',
  narrativeIntro: [
    'Ghostlight Reef at night is something else. The coral formations glow, not reflected light, not phosphorescence, but genuine bioluminescence that pulses in patterns too regular to be random. The fishing collective navigates by it, reading the light-language of the reef like a chart.',
    'But something has been disrupting the patterns. Boats going missing. Nets coming up shredded. Fishermen who go out at dusk and don\'t come back at dawn.',
    '"Three boats in two weeks," the collective\'s elder says. She\'s a weathered woman who\'s fished these waters for forty years and has never seen anything like this. "Something\'s moved into the deep channel. Something big."',
    'Suulen confirms it. Her Sight can read the water, the currents, the displaced mass of something enormous moving through the reef passage. "It\'s there," she says quietly. "Sixty feet. Maybe more. Bioluminescent. It\'s been feeding on the reef fish. The boats are just in its way."',
    '"Sixty feet." You stand at the prow, watching the reef glow in the dark water. The Danzai rests on your shoulder. "I\'ve never hit anything sixty feet long."',
    '"Is that... a concern, Captain?" Delvessa asks carefully.',
    '"No." You grin. "It\'s motivation."',
  ],
  narrativeVictory: [
    'The Leviathan sinks into the deep channel, trailing bioluminescent blood that turns the water into a light show. The reef pulses, brighter now, as if the coral itself is relieved.',
    'The fishing collective watches from their boats, lanterns held high. In the aftermath glow, they can see you, standing on the prow, covered in luminescent blood and seawater, the Danzai dripping with something that glows green in the dark.',
    '"That..." The elder\'s voice carries across the water. "That was in our reef?"',
    '"Was." You wipe the luminescent blood from your face. It smears across your horns, making them glow. Kovesse is recording. Of course she is.',
    '"Captain, the VISUALS on this. You\'re GLOWING. Literally glowing. The viewers are losing their minds."',
    'Dragghen appears with a bucket. "Scale fragments. This thing\'s hide is like ship armor. If we can cure it properly--"',
    '"Do it." You look at the elder. "Your reef is clear. What do we talk about next?"',
    'She looks at you. At the crew. At the glowing reef and the dark water where something massive just learned that the Bastion Sea has a new apex predator.',
    '"I think," she says slowly, "we talk about an alliance."',
  ],
  narrativeDefeat: [
    'The Leviathan is too fast in its own territory. It knows the reef: every current, every passage, every blind spot. It hits from below, from the sides, always where you\'re not looking.',
    'Suulen calls the retreat before the hull gives way. "The reef channels. I can get us out. But we leave NOW."',
    'The Leviathan watches you go. In the bioluminescent glow, you could swear it\'s smiling.',
    '"We\'ll be back," you say to the water.',
    'Dragghen puts a hand on your shoulder. "Captain, it\'s a fish. It can\'t hear you."',
    '"It knows."',
  ],
  enemies: [reefLeviathan],
  rewards: [
    { type: 'sovereigns', value: 150, label: '+150 Sovereigns (collective bounty)' },
    { type: 'supplies', value: 25, label: '+25 Supplies (grateful fishermen)' },
    { type: 'reputation', value: 50, label: '+50 Reputation (leviathan slayer)' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'ghostlight_leviathan_killed', value: true },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE VIRAL - #LeviathanSlayer',
      message: 'Kovesse\'s footage of the Reef Leviathan fight is breaking viewer records across every Grimoire channel in the Southern Reach. The bioluminescent blood on Karyudon\'s horns has become an instant meme. Three Conqueror scouts have reportedly changed course toward Ghostlight Reef. Everyone wants to know who killed a sixty-foot sea monster with a war club.',
    }},
  ],
  onDefeatEffects: [
    { type: 'flag', target: 'ghostlight_leviathan_survived', value: true },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'GHOSTLIGHT REEF - TACTICAL RETREAT',
      message: 'The Leviathan owns that reef. For now. The fishing collective is still losing boats, and the creature is still down there, glowing in the dark. You\'ll need a better plan. Or a bigger club.',
    }},
  ],
};

// ==========================================
// WARDENSEA ESCALATION ENEMIES
// ==========================================
// As Karyudon's bounty grows, the Wardensea
// sends better people. These are those people.
// ==========================================

const WARDENSEA_PATROL_OFFICER_ACTIONS: CombatAction[] = [
  {
    id: 'officer_saber',
    name: 'Officer\'s Saber',
    description: 'Academy-trained precision.',
    category: 'strike',
    targetType: 'single',
    damage: 28,
    damageType: 'dominion_iron',
    accuracy: 85,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'slash',
    flavorText: 'Academy-trained precision. The blade moves like it was born in the officer\'s hand, because it was. They train with live steel from age twelve.',
    missText: 'The saber cuts a clean line through empty air. Close. Academy form is predictable if you know where to look.',
  },
  {
    id: 'officer_rally_formation',
    name: 'Rally Formation',
    description: 'The officer barks orders.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'crew_assist',
    flavorText: 'The officer barks orders. Soldiers snap into position. The formation tightens like a fist.',
    missText: '',
    effects: [
      { type: 'buff_attack', value: 8, duration: 3, chance: 100, description: 'Rally attack' },
      { type: 'buff_defense', value: 8, duration: 3, chance: 100, description: 'Rally defense' },
    ],
  },
  {
    id: 'officer_chains',
    name: 'Binding Chains',
    description: 'Iron chains designed to capture, not kill.',
    category: 'strike',
    targetType: 'single',
    damage: 20,
    damageType: 'physical',
    accuracy: 75,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 14,
    animation: 'counter',
    flavorText: 'Iron chains designed to capture, not kill. The Wardensea wants you alive. You\'re worth more breathing.',
    missText: 'The chains rattle past. You\'re too big and too fast for restraints. They should know that by now.',
    effects: [
      { type: 'weaken', value: 5, duration: 2, chance: 60, description: 'Chain-slowed' },
    ],
  },
];

const wardenSeaPatrolOfficer: EnemyTemplate = {
  id: 'wardensea_patrol_officer',
  name: 'Wardensea Officer',
  title: 'Patrol Commander',
  tier: 'elite',
  hp: 98,
  stamina: 60,
  attack: 13,
  defense: 20,
  speed: 18,
  dominion: { iron: 35, sight: 20, king: 5 },
  actions: WARDENSEA_PATROL_OFFICER_ACTIONS,
  aiPattern: 'tactical',
  flavorIntro: 'Silver epaulettes, iron composure. This one has hunted fugitives before, and caught them.',
  flavorDefeat: 'The officer drops to one knee. Still reaching for the saber. Still trying. "Report... filed..." They collapse.',
};

/**
 * Wardensea Patrol - mid-tier escalated encounter.
 * Dispatched when Karyudon's threat level reaches 2-3.
 */
export const wardenseaEscalatedPatrol: CombatEncounter = {
  id: 'wardensea_escalated_patrol',
  title: 'WARDENSEA PATROL',
  subtitle: 'A standard Wardensea patrol has spotted your vessel.',
  narrativeIntro: [
    'Signal flags on the horizon. A patrol vessel adjusts its heading, toward you. Standard Wardensea procedure: identify, hail, demand surrender.',
    'The patrol ship closes fast. Regulation grey hull, Second Division markings, bow chasers loaded. They run up the signal: HEAVE TO. PREPARE FOR BOARDING.',
    'Vorreth reads their flags with a practiced eye. "Standard patrol. One officer, four soldiers. Disciplined but not elite. They\'ll follow procedure."',
    '"And if we don\'t follow procedure?"',
    'Vorreth almost smiles. "Then they\'ll improvise. Wardensea officers are trained for that too."',
    'You pick up the Danzai. "Good. Improvisation is more fun."',
  ],
  narrativeVictory: [
    'The patrol vessel drifts, its crew unconscious or wise enough to play dead. The officer is the last one standing, jaw set, one hand on a broken saber, the other pressing a wound.',
    '"You can\'t fight the entire Wardensea," she says.',
    '"Not yet," you agree. "But I\'m working on it."',
    'The officer watches you walk back to your ship. She\'ll file a report. They always file reports. And each report brings something bigger next time.',
    'Kovesse is already broadcasting. Vorreth is already calculating how long before the next patrol finds you.',
  ],
  narrativeDefeat: [
    'They clap you in irons. You\'ll escape eventually. You always do.',
    'The patrol officer reads the charges while you memorize her face. Faces are useful. So is patience.',
  ],
  enemies: [wardenSeaPatrolOfficer, wardenseaSoldier, wardenseaSoldier],
  waves: [
    [wardenseaSoldier, wardenseaSoldier],
  ],
  rewards: [
    { type: 'sovereigns', value: 80, label: '+80 Sovereigns' },
    { type: 'reputation', value: 6, label: '+6 Reputation' },
    { type: 'infamy', value: 4, label: '+4 Infamy' },
    { type: 'bounty', value: 10000000, label: '+10M Bounty' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'wardensea_escalated_patrol_defeated', value: true },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA - PATROL NEUTRALIZED',
      message: 'Second Division Patrol Unit 12 is unresponsive. Last contact reported engagement with confirmed Oni fugitive. Escalation request filed. Hunting parties authorized.',
    }},
  ],
};

// ==========================================
// WARDENSEA HUNTING PARTY (HIGH-TIER)
// ==========================================

const WARDENSEA_CAPTAIN_ACTIONS: CombatAction[] = [
  {
    id: 'captain_precision_strike',
    name: 'Precision Strike',
    description: 'A captain\'s blade finds the gaps in any guard.',
    category: 'strike',
    targetType: 'single',
    damage: 35,
    damageType: 'dominion_iron',
    accuracy: 90,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 14,
    animation: 'slash',
    flavorText: 'The captain moves with lethal economy. No wasted motion. The strike comes from an angle you didn\'t know existed.',
    missText: 'You read it, barely. Instinct more than skill. This one is dangerous.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 20, description: 'Staggered' },
    ],
  },
  {
    id: 'captain_ironclad_order',
    name: 'Ironclad Order',
    description: 'Naval discipline at its finest.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'block',
    flavorText: 'Naval discipline at its finest. The captain raises a fist and the entire formation hardens. Iron Dominion flows through the ranks like voltage through wire.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 15, duration: 3, chance: 100, description: 'Ironclad formation' },
    ],
  },
  {
    id: 'captain_broadside',
    name: 'Broadside Command',
    description: 'Fire everything!',
    category: 'dominion',
    targetType: 'single',
    damage: 25,
    damageType: 'dominion_iron',
    accuracy: 80,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 20,
    animation: 'screen_shake',
    flavorText: '"Fire everything!" The deck erupts. Iron-charged shot tears through wood and air and anything unfortunate enough to be standing where it lands.',
    missText: 'The broadside goes wide, but the shockwave alone rattles your teeth. Next time they won\'t miss.',
  },
  {
    id: 'captain_warrant',
    name: 'Execute Warrant',
    description: 'Dead or alive, preferably alive, but accidents happen.',
    category: 'dominion',
    targetType: 'single',
    damage: 45,
    damageType: 'dominion_iron',
    accuracy: 75,
    cooldown: 4,
    currentCooldown: 0,
    staminaCost: 25,
    animation: 'iron_pulse',
    flavorText: 'Dead or alive, preferably alive, but accidents happen. The captain\'s blade ignites with Iron. This is personal. This is authorized. This is everything the Wardensea has been wanting to do since you broke free.',
    missText: 'The warrant strike hammers the deck where you were standing. Splinters fly. The crater smokes. You weren\'t there. The captain\'s eyes track you with predatory patience.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 30, description: 'Warrant executed' },
    ],
  },
];

const wardenSeaCaptain: EnemyTemplate = {
  id: 'wardensea_captain',
  name: 'Wardensea Captain Vorreth',
  title: 'Captain of the Third Patrol',
  tier: 'commander',
  hp: 175,
  stamina: 80,
  attack: 17,
  defense: 24,
  speed: 20,
  dominion: { iron: 50, sight: 30, king: 10 },
  actions: WARDENSEA_CAPTAIN_ACTIONS,
  aiPattern: 'tactical',
  flavorIntro: 'Captain Vorreth. Third Patrol. The name is on the warrant and the warrant is in his hand. Tall, iron-grey hair, Forged Iron coiling around both fists. This one has taken down Conqueror lieutenants before.',
  flavorDefeat: 'Vorreth hits the deck. The warrant flutters from his hand. He stares at you with something that isn\'t quite fear and isn\'t quite respect. "They\'ll send someone worse," he says. You believe him.',
};

/**
 * Wardensea Hunting Party - high-tier encounter.
 * Dispatched when Karyudon's threat level reaches 4+.
 * Three warships. Your bounty on the sail.
 */
export const wardenseaHuntingParty: CombatEncounter = {
  id: 'wardensea_hunting_party',
  title: 'WARDENSEA HUNTING PARTY',
  subtitle: 'A full hunting party, dispatched with your name on the warrant.',
  narrativeIntro: [
    'Three warships in formation. Regulation grey, but heavier than patrol cutters. These are hunter-killers, built for one purpose. Your bounty poster is nailed to the lead vessel\'s mast. They\'ve been looking for you specifically.',
    'Captain Vorreth stands at the prow of the lead ship. Even from this distance, you can feel his Iron: dense, controlled, honed by decades of service. He raises a speaking trumpet.',
    '"KARYUDON. ONI. BOUNTY CLASS: PRIORITY. YOU ARE ORDERED TO SURRENDER BY AUTHORITY OF THE WARDENSEA SECOND DIVISION. FAILURE TO COMPLY WILL RESULT IN LETHAL FORCE. THIS IS YOUR ONLY WARNING."',
    'Delvessa is already calculating approach vectors. Vorreth is checking weapons. Dragghen cracks his knuckles. Suulen steers toward them.',
    'You rest the Danzai across your shoulders and grin at three warships.',
    '"You brought friends. Smart."',
  ],
  narrativeVictory: [
    'Vorreth is on his knees. His ship is listing. His crew is scattered across two decks. The other two warships are pulling back, disengaging, which is Wardensea for "we\'ve seen enough."',
    'You stand over the captain. The Danzai drips. The warrant lies between you, your name in bold ink.',
    '"Tell them," you say. "Tell them what you saw."',
    'Vorreth looks up. "They already know what you are."',
    '"No. They know what I was. Tell them what I\'m becoming."',
    'Kovesse\'s broadcast hits thirty thousand views before you\'re back on your own ship. The Grimoire feed is on fire. Your name is the top trend for six hours.',
    'The Wardensea will regroup. They always do. But today, the Bastion Sea saw something it won\'t forget.',
  ],
  narrativeDefeat: [
    'Vorreth is good. Too good. The three-ship formation pins you in a crossfire, and even the Danzai can\'t be everywhere at once.',
    'Vorreth calls the retreat. Suulen finds an escape route through a squall line. You survive, but the hunting party holds the field.',
    '"They\'ll be emboldened," Delvessa says quietly. "Every officer in the Second Division will want to be the one who caught us."',
    'You stare at the retreating warships. "Let them try."',
  ],
  enemies: [wardenSeaCaptain, wardenSeaPatrolOfficer, wardenseaSoldier],
  waves: [
    [wardenSeaPatrolOfficer, wardenseaSoldier, wardenseaSoldier],
  ],
  rewards: [
    { type: 'sovereigns', value: 200, label: '+200 Sovereigns' },
    { type: 'intelligence', value: 10, label: '+10 Intelligence (captured orders)' },
    { type: 'reputation', value: 10, label: '+10 Reputation' },
    { type: 'infamy', value: 8, label: '+8 Infamy' },
    { type: 'bounty', value: 25000000, label: '+25M Bounty' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'wardensea_hunting_party_defeated', value: true },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA - HUNTING PARTY DESTROYED',
      message: 'Captain Vorreth\'s Third Patrol hunting party has been neutralized by fugitive Karyudon. Three vessels damaged. Multiple casualties. Request immediate escalation to Spiral Division. This is no longer a bounty hunt. This is a war.',
    }},
  ],
};

/**
 * Wardensea First Strike - Act 2 probing attack.
 * Three reconnaissance cutters at Keldriss. Testing defenses.
 * Not a full assault - but they came ready to fight.
 */
export const wardenseaFirstStrike: CombatEncounter = {
  id: 'wardensea_first_strike',
  title: 'WARDENSEA FIRST STRIKE',
  subtitle: 'Reconnaissance in force. They came to learn, and they came armed.',
  narrativeIntro: [
    'Three cutters break formation at the Keldriss approach. Second Division markings, but the hull modifications are wrong: reinforced ram prows, extra cannon mounts. These are not patrol boats. These are probing vessels designed to draw fire and survive it.',
    'Vorreth reads the formation from the quarterdeck. His expression does not change.',
    '\u201cReconnaissance in force. They want to see how fast we respond, how many ships we commit, and what our fire patterns look like. Every second of this fight is being recorded.\u201d',
    'Delvessa stands beside you, arms crossed. \u201cThen we give them something worth recording.\u201d',
    'The Danzai comes off your back. The Keldriss channel is narrow, rocky, and terrain where an Oni with a greatsword has every advantage over three boats trying to be clever.',
    '\u201cSchool\'s in session.\u201d',
  ],
  narrativeVictory: [
    'The third cutter is burning. The other two are limping east, trailing smoke and seawater. The Keldriss harbor is littered with debris: shattered wood, torn sails, a Wardensea officer facedown in the shallows.',
    'Vorreth pulls the officer out of the water. Alive. Barely. There are reconnaissance documents in his coat: fleet positions, deployment schedules, a rough sketch of your island defense patterns.',
    '\u201cThis is valuable,\u201d Delvessa says, already reading. \u201cThey have been watching us for weeks. But now we know what they know. That changes the equation.\u201d',
    'Dragghen watches the retreating ships. \u201cThey will be back.\u201d',
    '\u201cYes,\u201d you say. \u201cBut next time they won\'t underestimate us.\u201d',
  ],
  narrativeDefeat: [
    'The three cutters are faster than they look. They split, regroup, and hammer the Keldriss defenses from three angles. You hold the line, but the cutters complete their sweep and pull back before you can finish them.',
    'They got what they came for. Formation data. Response times. Your fighting patterns.',
    'Vorreth is bleeding from a shrapnel wound. He wraps it without looking down. \u201cThey know everything they need now. The next attack will not be a probe.\u201d',
    'You stare at the smoke on the horizon. \u201cGood. I was getting tired of tests.\u201d',
  ],
  enemies: [wardenSeaPatrolOfficer, wardenseaSoldier, wardenseaSoldier],
  rewards: [
    { type: 'sovereigns', value: 150, label: '+150 Sovereigns (salvage)' },
    { type: 'intelligence', value: 15, label: '+15 Intelligence (captured documents)' },
    { type: 'reputation', value: 8, label: '+8 Reputation' },
    { type: 'infamy', value: 5, label: '+5 Infamy' },
    { type: 'bounty', value: 15000000, label: '+15M Bounty' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'first_strike_survived', value: true },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA - RECONNAISSANCE REPELLED',
      message: 'Second Division reconnaissance force engaged by Karyudon at Keldriss. Three cutters neutralized. Captured documents indicate extensive prior surveillance. Recommend immediate reassessment of operational approach.',
    }},
  ],
  onDefeatEffects: [
    { type: 'flag', target: 'first_strike_survived', value: true },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA - RECONNAISSANCE COMPLETE',
      message: 'Second Division reconnaissance force completed sweep of Karyudon-controlled waters. Full defensive analysis compiled. Target engaged but withdrew. Fleet response data captured. Forwarding to Admiral Vasshen.',
    }},
  ],
};

// ==========================================
// ACT 2 - IRON TEMPLAR (Wardensea Dominion Elite)
// ==========================================
// Wardensea's answer to Karyudon's growing power.
// Iron Dominion specialists - they fight like institutions given human form.

const IRON_TEMPLAR_ACTIONS: CombatAction[] = [
  {
    id: 'templar_forged_slash',
    name: 'Forged Slash',
    description: 'Iron-tempered blade. Academy perfected. Wardensea approved.',
    category: 'strike',
    targetType: 'single',
    damage: 36,
    damageType: 'dominion_iron',
    accuracy: 86,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'iron_pulse',
    flavorText: 'The Templar\'s blade hums with compressed Iron. The cut is clean, surgical. Every motion has been drilled ten thousand times until the body forgot how to waste energy.',
    missText: 'You read the form. Academy strokes have patterns. Even the best ones.',
    effects: [
      { type: 'bleed', value: 5, duration: 2, chance: 35, description: 'Iron laceration' },
    ],
  },
  {
    id: 'templar_iron_wall',
    name: 'Iron Wall',
    description: 'The Templar becomes a fortress. Iron hardens around them like armor.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 14,
    animation: 'iron_pulse',
    flavorText: 'Iron ripples outward from the Templar\'s core. The air goes dense. Your next strike lands, and bounces. Like hitting a ship\'s hull with a stick.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 25, duration: 2, chance: 100, description: 'Iron Wall' },
      { type: 'heal', value: 15, duration: 1, chance: 100, description: 'Iron restoration' },
    ],
  },
  {
    id: 'templar_dominion_crush',
    name: 'Dominion Crush',
    description: 'Raw Iron Dominion compressed into a single point. Then released.',
    category: 'dominion',
    targetType: 'single',
    damage: 50,
    damageType: 'dominion_iron',
    accuracy: 78,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 22,
    animation: 'iron_pulse',
    flavorText: 'The Templar plants their feet. Iron gathers, visible now, a distortion in the air like heat haze. Then it fires. A column of compressed dominion that hits like a ship\'s ram.',
    missText: 'The crush splits the deck where you were. Splinters hang in the air. The Templar\'s eyes track you without expression.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 40, description: 'Iron concussion' },
      { type: 'weaken', value: 12, duration: 2, chance: 45, description: 'Dominion suppression' },
    ],
  },
  {
    id: 'templar_judgment_chain',
    name: 'Judgment Chain',
    description: 'Iron links form in the air. The Wardensea\'s favorite party trick.',
    category: 'special',
    targetType: 'single',
    damage: 30,
    damageType: 'dominion_iron',
    accuracy: 82,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 18,
    animation: 'flash_white',
    flavorText: 'Iron condenses from nothing, links forming in the air, snapping shut around your limbs. The Templar pulls. The chains tighten. You\'ve been in chains before. You remember what they felt like. These are worse.',
    missText: 'The chains miss by inches. You shatter the closest link with a Danzai backhand. The Templar recoils. They didn\'t expect that.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 50, description: 'Chain bind' },
      { type: 'expose', value: 12, duration: 2, chance: 40, description: 'Bound and exposed' },
    ],
  },
];

const ironTemplar: EnemyTemplate = {
  id: 'wardensea_iron_templar',
  name: 'Iron Templar',
  title: 'Wardensea Dominion Corps',
  tier: 'elite',
  hp: 140,
  stamina: 90,
  attack: 17,
  defense: 24,
  speed: 20,
  dominion: { iron: 55, sight: 18, king: 5 },
  actions: IRON_TEMPLAR_ACTIONS,
  aiPattern: 'tactical',
  flavorIntro: 'White coat over grey. The Templar insignia on the collar, a chain link circled by iron. Wardensea Dominion Corps. These are the ones they send when regular soldiers aren\'t enough. Iron radiates from them like body heat.',
  flavorDefeat: 'The Templar drops to one knee. The Iron flickers out like a dying lamp. They look up at you with the expression of someone who has just discovered their ceiling. "Report this," they say to no one.',
};

/**
 * Act 2 - Wardensea Templar Strike
 * Elite Dominion users dispatched specifically to counter Karyudon.
 */
export const wardenseaTemplarStrike: CombatEncounter = {
  id: 'wardensea_templar_strike',
  title: 'DOMINION CORPS STRIKE',
  subtitle: 'The Wardensea stopped sending soldiers. They sent Dominion users.',
  narrativeIntro: [
    'The ship that approaches doesn\'t fly standard Wardensea colors. White flag over grey, the Dominion Corps pennant. These aren\'t patrol soldiers. These are the Wardensea\'s answer to people like you.',
    'Two Iron Templars board without asking. Their Iron hits like a wall. The air goes thick, the deck groans under invisible weight. An officer follows, saber drawn, Iron crackling along the edge.',
    '"Karyudon. Threat assessment: Extreme. Authorization: Lethal force, Dominion-grade. Last chance to surrender."',
    'You rest the Danzai on your shoulder. "You brought the fancy ones. I\'m flattered."',
    'The lead Templar doesn\'t smile. "You shouldn\'t be."',
  ],
  narrativeVictory: [
    'The Templars are down. Both of them. The officer is backed against the mast, saber shaking in their hand.',
    '"Tell your Admiral," you say, wiping Iron residue from the Danzai, "that his Dominion Corps needs a refund."',
    'The officer scrambles back to their ship. The Templars are dragged after them. The deck is scarred with Iron discharge marks, deep grooves where dominion clashed with dominion.',
    'Vorreth examines the marks. "They were strong. Forged Iron, both of them. Academy-trained Dominion users with combat deployment experience."',
    '"And?"',
    '"And you broke them in four minutes." He looks at you. "The Wardensea is going to run out of Templars before you run out of patience."',
  ],
  narrativeDefeat: [
    'The Templars are coordinated. Their Iron works in tandem: one suppresses, one strikes. It\'s like fighting two halves of the same weapon.',
    'You\'re driven back. The Danzai catches a Judgment Chain and the vibration rattles your bones. Suulen calls the retreat.',
    '"Regroup," you say. "And remember their faces."',
  ],
  enemies: [ironTemplar, ironTemplar, wardenseaOfficer],
  rewards: [
    { type: 'sovereigns', value: 180, label: '+180 Sovereigns' },
    { type: 'intelligence', value: 12, label: '+12 Intelligence (Dominion Corps intel)' },
    { type: 'reputation', value: 10, label: '+10 Reputation' },
    { type: 'infamy', value: 6, label: '+6 Infamy' },
    { type: 'bounty', value: 20000000, label: '+20M Bounty' },
    { type: 'materials', value: 8, label: '+8 Materials (Iron-forged equipment)' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'templar_strike_defeated', value: true },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA DOMINION CORPS - UNIT LOST',
      message: 'Templar Strike Team 3 failed to neutralize target Karyudon. Both Iron Templars incapacitated. Dominion-class engagement unsuccessful. Recommend Spiral Division involvement. This Oni is not a standard threat classification.',
    }},
  ],
};

// ==========================================
// ACT 3 - CONQUEROR SIGHT ASSASSIN
// ==========================================
// Sent by the Conqueror faction - either as a test or betrayal.
// Sight Dominion specialists. They fight by reading you.

const SIGHT_ASSASSIN_ACTIONS: CombatAction[] = [
  {
    id: 'assassin_precognitive_strike',
    name: 'Precognitive Strike',
    description: 'The blade arrives before the decision to swing.',
    category: 'strike',
    targetType: 'single',
    damage: 40,
    damageType: 'dominion_sight',
    accuracy: 93,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 14,
    animation: 'sight_flash',
    flavorText: 'The assassin moves before you do. Sight Dominion, reading your intent before you\'ve finished forming it. The blade is already where you\'re going to be.',
    missText: 'You move on instinct. No thought, no intent, nothing for them to read. The blade finds empty air.',
    effects: [
      { type: 'bleed', value: 7, duration: 2, chance: 40, description: 'Precognitive wound' },
    ],
  },
  {
    id: 'assassin_mirror_dodge',
    name: 'Mirror Dodge',
    description: 'Your attack passes through an afterimage.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'sight_flash',
    flavorText: 'Your strike connects, with nothing. The assassin was already elsewhere, leaving a visual ghost that fades like smoke. Sight Dominion bending perception.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 30, duration: 1, chance: 100, description: 'Mirror image' },
    ],
  },
  {
    id: 'assassin_nerve_read',
    name: 'Nerve Read',
    description: 'Sight finds every weakness in your body\'s architecture.',
    category: 'dominion',
    targetType: 'single',
    damage: 35,
    damageType: 'dominion_sight',
    accuracy: 88,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 18,
    animation: 'sight_flash',
    flavorText: 'The assassin\'s eyes flare, Sight Dominion mapping your nervous system in real time. The strike hits a nerve cluster you didn\'t know you had. Your arm goes numb. Your knee buckles. They know your body better than you do.',
    missText: 'You flood your body with Iron. The nerve map shifts. The assassin\'s eyes widen. You just changed your own architecture mid-fight.',
    effects: [
      { type: 'weaken', value: 15, duration: 2, chance: 60, description: 'Nerve disruption' },
      { type: 'stun', value: 1, duration: 1, chance: 30, description: 'Paralysis point' },
    ],
  },
  {
    id: 'assassin_killing_insight',
    name: 'Killing Insight',
    description: 'The assassin sees your death. Then makes it happen.',
    category: 'special',
    targetType: 'single',
    damage: 60,
    damageType: 'dominion_sight',
    accuracy: 80,
    cooldown: 4,
    currentCooldown: 0,
    staminaCost: 28,
    animation: 'flash_red',
    flavorText: 'Time slows. The assassin\'s eyes go silver, deep Sight. Reads futures. They see the moment of impact before it exists and collapse the probability into certainty. The blade finds the one gap in your guard that you didn\'t know was there.',
    missText: 'Silver eyes meet yours. For a frozen second, they see your death, and you refuse it. Raw King Dominion flares, rewriting the future they tried to script. Their expression cracks. "Impossible."',
    effects: [
      { type: 'bleed', value: 10, duration: 3, chance: 50, description: 'Fated wound' },
      { type: 'expose', value: 15, duration: 2, chance: 40, description: 'Read and exposed' },
    ],
  },
];

const conquerorSightAssassin: EnemyTemplate = {
  id: 'conqueror_sight_assassin',
  name: 'Ghostlight Assassin',
  title: 'Conqueror Sight Specialist',
  tier: 'elite',
  hp: 112,
  stamina: 95,
  attack: 18,
  defense: 16,
  speed: 36,
  dominion: { iron: 15, sight: 65, king: 10 },
  actions: SIGHT_ASSASSIN_ACTIONS,
  aiPattern: 'aggressive',
  flavorIntro: 'You don\'t see them arrive. One moment the deck is empty. The next, there\'s someone standing in your shadow. Black coat, no insignia, silver eyes that don\'t blink. Conqueror Sight specialist. They\'ve been reading you for the last thirty seconds.',
  flavorDefeat: 'The assassin hits the deck. The silver drains from their eyes. They look up at you, for the first time, actually surprised. "You can\'t be read." It\'s not a complaint. It\'s a data point. Conquerors always learn.',
};

const conquerorBladeDancer: EnemyTemplate = {
  id: 'conqueror_blade_dancer',
  name: 'Conqueror Blade Dancer',
  tier: 'soldier',
  hp: 77,
  stamina: 70,
  attack: 13,
  defense: 12,
  speed: 34,
  dominion: { iron: 20, sight: 40, king: 0 },
  actions: [
    {
      id: 'dancer_whirl_slash',
      name: 'Whirl Slash',
      description: 'Sight-guided spinning strike.',
      category: 'strike',
      targetType: 'single',
      damage: 26,
      damageType: 'dominion_sight',
      accuracy: 86,
      cooldown: 0,
      currentCooldown: 0,
      staminaCost: 10,
      animation: 'sight_flash',
      flavorText: 'The dancer spins, blade tracing an arc guided by Sight. The cut comes from an impossible angle.',
      missText: 'You step inside the arc. The dance breaks.',
    },
    {
      id: 'dancer_fade',
      name: 'Fade Step',
      description: 'Sight-enhanced dodge.',
      category: 'defend',
      targetType: 'self',
      damage: 0,
      damageType: 'physical',
      accuracy: 100,
      cooldown: 2,
      currentCooldown: 0,
      staminaCost: 8,
      animation: 'sight_flash',
      flavorText: 'The dancer blurs sideways. Sight shows them where the blow will land before you swing.',
      missText: '',
      effects: [
        { type: 'buff_defense', value: 20, duration: 1, chance: 100, description: 'Fade step' },
      ],
    },
  ],
  aiPattern: 'aggressive',
  flavorIntro: 'Light armor, twin blades, eyes that track faster than human. Conqueror-trained. They fight like water, flowing around everything you throw.',
  flavorDefeat: 'The dancer crumples. The twin blades clatter. They weren\'t good enough. They knew it before you did.',
};

/**
 * Act 3 - Conqueror Ambush
 * Sight-based Conqueror operatives testing Karyudon's defenses.
 */
export const conquerorAmbush: CombatEncounter = {
  id: 'conqueror_ambush',
  title: 'GHOSTLIGHT AMBUSH',
  subtitle: 'The Conquerors sent their Sight specialists. They came in silence.',
  narrativeIntro: [
    'Suulen notices first. A flicker at the edge of perception, something wrong with the shadows on the quarterdeck. She draws her blade before you even turn around.',
    'Three figures materialize from nothing. Sight Dominion at work. They\'ve been standing there for minutes, bending light around themselves like water around stone. Conqueror operatives. Ghostlight Collective.',
    'The lead assassin tilts their head. Silver eyes catalog your stance, your breathing, the way you grip the Danzai. They\'re reading you. Sight specialists always read first, kill second.',
    '"Tessavarra sends her regards," the assassin says. "And a question: can you still be killed?"',
    '"Tell her to come ask in person."',
    'Silver eyes narrow. "She will. But first, the audition."',
  ],
  narrativeVictory: [
    'The Ghostlight operatives are scattered across the deck. The assassin is the last standing, bleeding from a dozen cuts, silver eyes flickering in and out.',
    '"Can you be killed?" you repeat their question. "No. But you can tell Tessavarra I\'m open to negotiation."',
    'The assassin manages a broken laugh. "She was right about you. You\'re exactly as dangerous as she said. And exactly as useful."',
    'They vanish. Sight Dominion pulling them into the light. One moment bleeding on your deck, the next, gone.',
    'Suulen stares at the empty space. "Conquerors," she says. Like a weather report. Like this is just Tuesday.',
  ],
  narrativeDefeat: [
    'Sight specialists fight on a different level. They read your intentions before you form them. Every attack meets a counter. Every defense finds a gap.',
    'The assassin pins you with silver eyes. "Not dead. Not yet. Tessavarra\'s orders." They vanish, leaving three cuts across your chest that burn like prophecy.',
    '"That was a message," Delvessa says. "The Conquerors want us to know they can reach us."',
  ],
  enemies: [conquerorSightAssassin, conquerorBladeDancer, conquerorBladeDancer],
  rewards: [
    { type: 'sovereigns', value: 120, label: '+120 Sovereigns (Conqueror gear)' },
    { type: 'intelligence', value: 15, label: '+15 Intelligence (Conqueror tactics)' },
    { type: 'reputation', value: 8, label: '+8 Reputation' },
    { type: 'infamy', value: 4, label: '+4 Infamy' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'conqueror_ambush_survived', value: true },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - GHOSTLIGHT INCIDENT',
      message: 'Reports of a Conqueror Ghostlight Collective incursion into Karyudon-controlled waters. Three operatives engaged. Three operatives withdrawn. The Bastion Sea power structure continues to recalibrate around the Oni fleet.',
    }},
  ],
};

// ==========================================
// ACT 3 - KOLMARI IRONCLAD MARINES
// ==========================================
// Kolmari's mechanical answer to Dominion users.
// Tech over talent. Money over magic.

const IRONCLAD_MARINE_ACTIONS: CombatAction[] = [
  {
    id: 'marine_powered_fist',
    name: 'Powered Fist',
    description: 'Grimoire-tech hydraulic gauntlet. The Kolmari don\'t need Dominion. They buy better.',
    category: 'strike',
    targetType: 'single',
    damage: 32,
    damageType: 'physical',
    accuracy: 84,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'heavy_smash',
    flavorText: 'The marine\'s gauntlet hisses, hydraulics engaging. The fist connects with the force of something that costs more than your ship. Kolmari engineering: if you can\'t outfight them, outspend them.',
    missText: 'The gauntlet slams into the deck. The wood crazes. Expensive miss.',
  },
  {
    id: 'marine_shield_generator',
    name: 'Shield Generator',
    description: 'Portable Grimoire-tech barrier. Kolmari R&D at work.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'flash_white',
    flavorText: 'A shimmer in the air, hexagonal plates of compressed light forming a barrier. Grimoire-tech shielding. The Kolmari spent three years and twelve million sovereigns developing this. Worth every coin.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 22, duration: 2, chance: 100, description: 'Grimoire shield' },
    ],
  },
  {
    id: 'marine_shock_cannon',
    name: 'Shock Cannon',
    description: 'Compact shipboard weapon, miniaturized for infantry. Extremely expensive.',
    category: 'dominion',
    targetType: 'single',
    damage: 45,
    damageType: 'dominion_iron',
    accuracy: 76,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 20,
    animation: 'screen_shake',
    flavorText: 'The marine shoulders a weapon that looks like a ship\'s cannon had an affair with a Grimoire relay. The discharge is blue-white, deafening, and costs approximately eight thousand sovereigns per shot. The Kolmari fight with checkbooks.',
    missText: 'The shot screams past. The air ionizes. Your hair stands on end. That was an eight-thousand-sovereign miss.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 35, description: 'Shock disruption' },
    ],
  },
];

const kolmariIroncladMarine: EnemyTemplate = {
  id: 'kolmari_ironclad_marine',
  name: 'Ironclad Marine',
  title: 'Kolmari Heavy Infantry',
  tier: 'elite',
  hp: 154,
  stamina: 75,
  attack: 16,
  defense: 28,
  speed: 16,
  dominion: { iron: 10, sight: 10, king: 0 },
  actions: IRONCLAD_MARINE_ACTIONS,
  aiPattern: 'defensive',
  flavorIntro: 'Heavy plating. Hydraulic joints. A helmet with a Grimoire heads-up display projecting tactical data across the visor. Kolmari Ironclad Marines: no Dominion, all technology, absolutely no budget constraints.',
  flavorDefeat: 'The marine goes down with a crash of metal and sparking circuitry. The Grimoire display flickers: COMBAT EFFECTIVENESS: 0%. RECOMMEND WITHDRAWAL. The technology doesn\'t know it\'s already too late.',
};

/**
 * Act 3 - Kolmari Ironclad Assault
 * Technology vs Dominion. Money vs willpower.
 */
export const kolmariIroncladAssault: CombatEncounter = {
  id: 'kolmari_ironclad_assault',
  title: 'IRONCLAD ASSAULT',
  subtitle: 'The Kolmari Confederation sent their money. All of it.',
  narrativeIntro: [
    'The ship that arrives isn\'t a warship. It\'s a floating factory, Kolmari industrial engineering applied to naval combat. The hull gleams with alloy plating. The guns are automated. The crew wears power armor.',
    'Three Ironclad Marines drop from the deck to yours. The impact cracks planks. Each one costs more than most ships in the Bastion Sea. The Kolmari Confederation doesn\'t have Dominion users. They have something the Wardensea and Conquerors don\'t. Unlimited budget.',
    'A speaker crackles: "Karyudon. The Kolmari Confederation has assessed your operations as a Class A disruption to regional trade infrastructure. Our response is proportional to the economic damage sustained."',
    'Kovesse looks at the power armor. "That\'s... a LOT of sovereigns walking toward us."',
    '"Good," you say, hefting the Danzai. "More to take."',
  ],
  narrativeVictory: [
    'Three Ironclad Marines lie scattered across the deck like expensive scrap metal. Sparks fly from damaged hydraulics. Grimoire displays blink error messages into the salt air.',
    'Delvessa examines the wreckage with professional interest. "Each suit costs approximately forty million sovereigns. The weapons are custom. The shielding is Grimoire-prototype."',
    '"And?"',
    '"And you just destroyed a hundred and twenty million sovereigns of military hardware in under ten minutes." She looks at you. "The Kolmari will either stop sending money or start sending more. With the Confederation, it\'s always more."',
    'Kovesse is already broadcasting. The Grimoire feed shows three Ironclad Marines face-down on your deck. The comments section is a war zone of disbelief.',
  ],
  narrativeDefeat: [
    'The Ironclads are slow but impossible to stop. Their shields absorb everything. Their powered fists crack ribs through the Danzai\'s guard. Technology has its own kind of dominion.',
    'Suulen calls the retreat. The Ironclads don\'t pursue. They\'re too expensive to risk on a chase. The Kolmari fight with cost-benefit analysis, not anger.',
  ],
  enemies: [kolmariIroncladMarine, kolmariIroncladMarine, kolmariEnforcer],
  rewards: [
    { type: 'sovereigns', value: 250, label: '+250 Sovereigns (salvaged tech)' },
    { type: 'materials', value: 15, label: '+15 Materials (Ironclad components)' },
    { type: 'intelligence', value: 8, label: '+8 Intelligence (Kolmari military specs)' },
    { type: 'reputation', value: 12, label: '+12 Reputation' },
    { type: 'infamy', value: 5, label: '+5 Infamy' },
    { type: 'bounty', value: 15000000, label: '+15M Bounty' },
  ],
  defeatConsequence: 'retreat',
  availableCrew: ['dragghen', 'vorreth', 'tessek', 'orren', 'suulen', 'delvessa', 'kovesse'],
  onVictoryEffects: [
    { type: 'flag', target: 'ironclad_assault_survived', value: true },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'KOLMARI CONFEDERATION - ASSET WRITE-OFF',
      message: 'Three Ironclad Marine units (serial: KCM-7741 through KCM-7743) lost in engagement with target Karyudon. Total equipment loss: 127.4M SOV. Requesting emergency budget allocation for replacement units. Recommend upgrading threat classification to Economic Hazard: Class S.',
    }},
  ],
};

// Export all encounters for registration
export const allCombatEncounters: CombatEncounter[] = [
  prologueBrawl,
  docksideFight,
  wardenseaPatrolFight,
  keldrissAmbush,
  copperveinDispute,
  mossbreakBrawl,
  durrekAssault,
  seaPirateRaid,
  seaMonsterAttack,
  wardenseaSeaAmbush,
  anvilCayAssault,
  windrowCliffRescue,
  ghostlightLeviathan,
  wardenseaEscalatedPatrol,
  wardenseaHuntingParty,
  wardenseaFirstStrike,
  wardenseaTemplarStrike,
  conquerorAmbush,
  kolmariIroncladAssault,
  ...bossEncounters,
];
