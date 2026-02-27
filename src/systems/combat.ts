// =============================================
// GODTIDE: BASTION SEA - Combat Engine
// =============================================
// Karyudon hits like a natural disaster.
// The combat system needs to feel that way.

import {
  CombatAction, CombatState, CombatEncounter, CombatLogEntry,
  Combatant, StatusEffect, EnemyTemplate, CombatPhase,
  CrewAssist, ActionEffect, CombatAnimation, CrewCombo,
} from '../types/combat';
import { MC, CrewMember, Equipment, EquipmentSlot } from '../types/game';
import { getKorvaanBonuses } from './korvaan';
import { getDragonFruitBonuses, getDragonCombatActions } from './godfruit';
import { COMBAT } from '../constants/balance';
import { getPortrait } from '../utils/images';

// ==========================================
// KARYUDON'S MOVESET
// ==========================================

export const KARYUDON_ACTIONS: CombatAction[] = [
  // --- BASIC STRIKES ---
  {
    id: 'iron_fist',
    name: 'Iron Fist',
    description: 'A straight punch reinforced with Forged Iron. Simple. Devastating.',
    category: 'strike',
    targetType: 'single',
    damage: 25,
    damageType: 'dominion_iron',
    accuracy: 90,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 10,
    animation: 'slash',
    flavorText: 'Your fist connects like a cannonball finding a hull.',
    missText: 'They\'re faster than they look. Your fist cracks the wood behind them.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 20, description: 'Stagger' },
    ],
  },
  {
    id: 'danzai_swing',
    name: 'Danzai Swing',
    description: 'A horizontal sweep with your iron-spiked war club. The spikes don\'t care about armor.',
    category: 'strike',
    targetType: 'single',
    damage: 35,
    damageType: 'dominion_iron',
    accuracy: 85,
    cooldown: 0,
    currentCooldown: 0,
    staminaCost: 12,
    animation: 'slash',
    flavorText: 'Danzai whistles through the air. The spikes catch flesh and don\'t let go.',
    missText: 'They duck under the swing. Danzai bites into the wall instead.',
    effects: [
      { type: 'bleed', value: 5, duration: 2, chance: 35, description: 'Spiked wound' },
    ],
  },
  {
    id: 'overhead_smash',
    name: 'Overhead Smash',
    description: 'Bring Danzai down like an executioner\'s verdict. Slow, but if it lands...',
    category: 'strike',
    targetType: 'single',
    damage: 50,
    damageType: 'dominion_iron',
    accuracy: 70,
    cooldown: 1,
    currentCooldown: 0,
    staminaCost: 20,
    animation: 'heavy_smash',
    flavorText: 'Danzai drops like a guillotine. The ground cracks under the impact. So does everything between.',
    missText: 'They roll clear. Danzai craters the floor where they stood.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 50, description: 'Floored' },
    ],
    unlockCondition: {
      stat: 'iron_tier',
      minValue: 1, // flicker
    },
  },
  {
    id: 'german_suplex',
    name: 'German Suplex',
    description: 'Grab them. Lift them. Drive them headfirst into the ground. You\'re a brawler before anything else.',
    category: 'strike',
    targetType: 'single',
    damage: 40,
    damageType: 'physical',
    accuracy: 75,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 25,
    animation: 'heavy_smash',
    flavorText: 'You hook them around the waist. Seven feet of Oni launches backward. The planet meets their skull. The planet wins.',
    missText: 'They slip free before you can get the grip. Slippery bastard.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 65, description: 'Suplexed into the ground' },
      { type: 'expose', value: 10, duration: 2, chance: 50, description: 'Disoriented' },
    ],
    unlockCondition: {
      stat: 'iron_tier',
      minValue: 2, // tempered
    },
  },

  // --- DOMINION ABILITIES ---
  {
    id: 'iron_wave',
    name: 'Iron Wave',
    description: 'Channel Iron through the ground. A shockwave that throws everyone off their feet.',
    category: 'dominion',
    targetType: 'all',
    damage: 28,
    damageType: 'dominion_iron',
    accuracy: 85,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 22,
    animation: 'iron_pulse',
    flavorText: 'The deck buckles outward from your fist. Bodies scatter like loose cargo.',
    missText: 'The Iron ripples outward but they brace in time.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 45, description: 'Knocked back' },
    ],
    unlockCondition: {
      stat: 'iron_tier',
      minValue: 1, // flicker
    },
  },
  {
    id: 'iron_body',
    name: 'Iron Body',
    description: 'Harden your entire body with Forged Iron. Heavy stamina cost. 3-round cooldown.',
    category: 'dominion',
    targetType: 'self',
    damage: 0,
    damageType: 'dominion_iron',
    accuracy: 100,
    cooldown: 4,
    currentCooldown: 0,
    staminaCost: 28,
    animation: 'iron_pulse',
    flavorText: 'Your skin darkens to gunmetal grey. They can hit you. It won\'t matter.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 20, duration: 2, chance: 100, description: 'Iron Skin (+20 DEF)' },
      { type: 'shield', value: 15, duration: 2, chance: 100, description: 'Absorbs 15 damage' },
    ],
    unlockCondition: {
      stat: 'iron_tier',
      minValue: 2, // tempered
    },
  },

  // --- SPECIAL ATTACKS (Named moves - Kaidou-inspired) ---
  {
    id: 'thunder_danzai',
    name: 'THUNDER DANZAI',
    description: 'One-shot kill technique. Channel all Iron into Danzai and swing so fast the air shatters. Thunder follows the impact.',
    category: 'special',
    targetType: 'single',
    damage: 70,
    damageType: 'dominion_iron',
    accuracy: 80,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 35,
    animation: 'thunder_strike',
    flavorText: 'You close the distance in a blink. Danzai swings with every ounce of Iron you own. The air cracks before the club lands. When it does, thunder follows. The shockwave flattens everything within twenty feet.',
    missText: 'They see the wind-up, barely. The shockwave still sends them skidding across the deck.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 60, description: 'Thunder-struck' },
      { type: 'expose', value: 15, duration: 2, chance: 40, description: 'Guard broken' },
    ],
    unlockCondition: {
      stat: 'iron_tier',
      minValue: 3, // forged
    },
  },
  {
    id: 'kosanze_ragnaraku',
    name: 'KOSANZE RAGNARAKU',
    description: 'Conquest Destroyer. Slam Danzai into the ground with a full-body Iron detonation. Reshapes the battlefield.',
    category: 'special',
    targetType: 'all',
    damage: 55,
    damageType: 'dominion_iron',
    accuracy: 75,
    cooldown: 4,
    currentCooldown: 0,
    staminaCost: 45,
    animation: 'screen_shake',
    flavorText: 'You lift Danzai overhead with both hands and bring it down like a god passing judgment. The ground erupts. Wood splinters. Metal bends. Bodies fly. The crater spreads outward from the point of impact.',
    missText: 'The shockwave disperses unevenly. They duck behind cover.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 50, description: 'Devastated' },
      { type: 'weaken', value: 10, duration: 2, chance: 30, description: 'Shattered morale' },
    ],
    unlockCondition: {
      stat: 'iron_tier',
      minValue: 3, // forged
    },
  },
  {
    id: 'boro_breath',
    name: 'BORO BREATH',
    description: 'Blast Breath. Not fire: pure compressed Iron expelled as a cone of destruction. The dragon doesn\'t need a fruit.',
    category: 'special',
    targetType: 'all',
    damage: 40,
    damageType: 'dominion_iron',
    accuracy: 85,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 30,
    animation: 'flash_white',
    flavorText: 'You exhale. The air ahead of you turns to plasma-bright pressure. Everything in the cone breaks.',
    missText: 'They scatter before the blast connects fully, but the edges still catch them.',
    effects: [
      { type: 'weaken', value: 8, duration: 2, chance: 45, description: 'Overwhelmed' },
    ],
    unlockCondition: {
      stat: 'iron_tier',
      minValue: 2, // tempered
      requireDragonFruit: true,
    },
  },

  // --- KING ABILITY (Builds over the fight, dormant/flickering) ---
  {
    id: 'kings_pressure',
    name: 'KING\'S PRESSURE',
    description: 'It\'s not a technique. It\'s your will, given weight. The weaker ones can\'t stand.',
    category: 'dominion',
    targetType: 'all',
    damage: 25,
    damageType: 'dominion_king',
    accuracy: 100,
    cooldown: 0, // Available when King meter is full
    currentCooldown: 0,
    staminaCost: 0,
    animation: 'king_pressure',
    flavorText: 'The air thickens. Your opponents feel it before they understand it: the crushing certainty that they are facing something beyond them. The weak-willed crumble.',
    missText: '',
    effects: [
      { type: 'intimidate', value: 20, duration: 99, chance: 100, description: 'Will crushed' },
      { type: 'stun', value: 1, duration: 1, chance: 55, description: 'Paralyzed by pressure' },
    ],
    unlockCondition: {
      stat: 'kingMeter',
      minValue: 100,
    },
  },

  // --- DEFEND ---
  {
    id: 'brace',
    name: 'Brace',
    description: 'Set your feet and take it. You\'re an Oni. You can take it. Heals 15% HP. 2-round cooldown.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 8,
    animation: 'block',
    flavorText: 'You plant yourself. Whatever comes next hits you and stops.',
    missText: '',
    effects: [
      { type: 'buff_defense', value: 15, duration: 1, chance: 100, description: 'Braced (+15 DEF)' },
      { type: 'heal', value: 5, duration: 1, chance: 100, description: 'Stamina recovery' },
      { type: 'heal_hp', value: 40, duration: 1, chance: 100, description: 'Oni regeneration (+40 HP)' },
    ],
  },
  {
    id: 'iron_will',
    name: 'Iron Will',
    description: 'Dig deep. The Oni body heals what should kill lesser races. Restores 35% HP. 4-round cooldown.',
    category: 'defend',
    targetType: 'self',
    damage: 0,
    damageType: 'physical',
    accuracy: 100,
    cooldown: 4,
    currentCooldown: 0,
    staminaCost: 15,
    animation: 'block',
    flavorText: 'Your wounds close. Your bones knit. The Oni body remembers what it was built for.',
    missText: '',
    effects: [
      { type: 'heal_hp', value: 90, duration: 1, chance: 100, description: 'Iron regeneration (+90 HP)' },
      { type: 'heal', value: 8, duration: 1, chance: 100, description: 'Deep recovery' },
    ],
  },

  // --- SIGHT DOMINION ABILITIES ---
  {
    id: 'fault_read',
    name: 'FAULT READ',
    description: 'Read the structural weaknesses in every enemy on the field. Their guard means nothing when you can see through it.',
    category: 'dominion',
    targetType: 'all',
    damage: 0,
    damageType: 'dominion_sight',
    accuracy: 100,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 15,
    animation: 'sight_flash',
    flavorText: 'Your Sight flares. The world strips down to stress lines and weak points. Every enemy on the field lights up like a schematic. Two turns. That is how long the data stays relevant.',
    missText: '',
    effects: [
      { type: 'expose', value: 15, duration: 2, chance: 100, description: 'Weak points revealed' },
    ],
    unlockCondition: {
      stat: 'sight_tier',
      minValue: 2, // tempered
    },
  },
  {
    id: 'pressure_point_strike',
    name: 'PRESSURE POINT STRIKE',
    description: 'Iron-reinforced strike aimed at an exposed weak point. If the target is already exposed, damage doubles.',
    category: 'dominion',
    targetType: 'single',
    damage: 45,
    damageType: 'dominion_sight',
    accuracy: 90,
    cooldown: 2,
    currentCooldown: 0,
    staminaCost: 20,
    animation: 'slash',
    flavorText: 'You see the fault line. Your fist finds it. The impact resonates through their entire frame like a tuning fork struck at the exact frequency of structural failure.',
    missText: 'They twist at the last second. Your knuckles graze the weak point but do not find purchase.',
    effects: [
      { type: 'expose', value: 10, duration: 1, chance: 40, description: 'Secondary fracture' },
    ],
    unlockCondition: {
      stat: 'sight_tier',
      minValue: 2, // tempered
      secondaryStat: 'iron_tier',
      secondaryMinValue: 2, // tempered
    },
  },
  {
    id: 'spatial_awareness',
    name: 'SPATIAL AWARENESS',
    description: 'Sight-enhanced perception. Read the trajectory of every incoming attack before it arrives. Dodge the next 2 attacks.',
    category: 'dominion',
    targetType: 'self',
    damage: 0,
    damageType: 'dominion_sight',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 18,
    animation: 'sight_flash',
    flavorText: 'The world slows. Not really. Your perception accelerates. Every movement becomes a probability arc. You can see the attacks before the muscles fire. Two strikes. You will dodge two strikes.',
    missText: '',
    effects: [
      { type: 'dodge', value: 2, duration: 2, chance: 100, description: 'Evasion (2 attacks)' },
      { type: 'buff_accuracy', value: 10, duration: 2, chance: 100, description: '+10 ACC (heightened awareness)' },
    ],
    unlockCondition: {
      stat: 'sight_tier',
      minValue: 3, // forged
    },
  },
  {
    id: 'killing_intent_read',
    name: 'KILLING INTENT: READ',
    description: 'Sight and King Dominion fused. Read every enemy, then crush their will with the knowledge that you already know how they die.',
    category: 'special',
    targetType: 'all',
    damage: 60,
    damageType: 'dominion_sight',
    accuracy: 80,
    cooldown: 4,
    currentCooldown: 0,
    staminaCost: 35,
    animation: 'sight_flash',
    flavorText: 'Your eyes glow. Not metaphorically. The Sight reads. The King projects. Every enemy on the field feels your attention land on them like a physical weight. You see their weaknesses. They know you see. The combination breaks something psychological.',
    missText: 'They resist. Barely. The pressure cracks but does not shatter them.',
    effects: [
      { type: 'expose', value: 20, duration: 2, chance: 100, description: 'Fully analyzed' },
      { type: 'weaken', value: 10, duration: 2, chance: 100, description: 'Will eroded' },
      { type: 'intimidate', value: 10, duration: 2, chance: 60, description: 'Killing intent' },
    ],
    unlockCondition: {
      stat: 'sight_tier',
      minValue: 3, // forged
      secondaryStat: 'king_tier',
      secondaryMinValue: 2, // tempered
    },
  },

  // --- INTERMEDIATE KING DOMINION ABILITIES ---
  {
    id: 'conquerors_voice',
    name: 'CONQUEROR\'S VOICE',
    description: 'Project your authority. Enemies falter. Allies fight harder. The battlefield shifts because you decided it should.',
    category: 'dominion',
    targetType: 'all',
    damage: 0,
    damageType: 'dominion_king',
    accuracy: 100,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 20,
    animation: 'king_pressure',
    flavorText: '"Stand." One word. Your crew straightens. Your enemies do not. The voice carries weight that has nothing to do with volume. It is authority, made audible.',
    missText: '',
    effects: [
      { type: 'intimidate', value: 10, duration: 2, chance: 100, description: 'Authority projected' },
      { type: 'crew_boost', value: 10, duration: 1, chance: 100, description: 'Crew assists +10 DMG next turn' },
    ],
    unlockCondition: {
      stat: 'kingMeter',
      minValue: 30,
    },
  },
  {
    id: 'dominion_flare',
    name: 'DOMINION FLARE',
    description: 'Release a burst of raw King\'s Dominion. The weaker ones stagger. The strong ones flinch. Everyone remembers who you are.',
    category: 'dominion',
    targetType: 'all',
    damage: 30,
    damageType: 'dominion_king',
    accuracy: 90,
    cooldown: 3,
    currentCooldown: 0,
    staminaCost: 20,
    animation: 'king_pressure',
    flavorText: 'The air thickens. Your Dominion flares outward in a visible pulse. The deck groans. Enemies buckle. Some of them stay down.',
    missText: 'They grit their teeth through the pressure. Strong. Annoyingly strong.',
    effects: [
      { type: 'stun', value: 1, duration: 1, chance: 40, description: 'Overwhelmed' },
      { type: 'weaken', value: 8, duration: 2, chance: 60, description: 'Will tested' },
    ],
    unlockCondition: {
      stat: 'kingMeter',
      minValue: 60,
    },
  },
  {
    id: 'kings_domain',
    name: 'KING\'S DOMAIN',
    description: 'The battlefield belongs to you. For 3 turns, your stats surge and crew assists cost no cooldown. The domain of the Conqueror.',
    category: 'special',
    targetType: 'self',
    damage: 0,
    damageType: 'dominion_king',
    accuracy: 100,
    cooldown: 5,
    currentCooldown: 0,
    staminaCost: 40,
    animation: 'king_pressure',
    flavorText: 'The pressure does not pulse. It stays. The air crystallizes around you into a zone of absolute authority. This space is yours. Every strike lands harder. Every ally moves faster. Every enemy knows, on a primal level, that they are trespassing.',
    missText: '',
    effects: [
      { type: 'buff_attack', value: 15, duration: 3, chance: 100, description: '+15 ATK (Domain)' },
      { type: 'buff_defense', value: 15, duration: 3, chance: 100, description: '+15 DEF (Domain)' },
    ],
    unlockCondition: {
      stat: 'kingMeter',
      minValue: 80,
    },
  },
];

// ==========================================
// CREW ASSIST ABILITIES
// ==========================================

export function getCrewAssists(crew: CrewMember[], isAtSea?: boolean): CrewAssist[] {
  const assists: CrewAssist[] = [];

  // Mutinous crew refuse to assist. Injured crew can't fight. Disgruntled crew assist with reduced effectiveness.
  const recruited = crew.filter((c) => c.recruited && c.alive && !c.injured && c.mood !== 'mutinous');

  // Loyalty-based effectiveness: disgruntled = 60%, uneasy = 85%, content/loyal = 100%
  const getMoodScale = (member: CrewMember): number => {
    switch (member.mood) {
      case 'disgruntled': return COMBAT.CREW_MOOD_DISGRUNTLED;
      case 'uneasy': return COMBAT.CREW_MOOD_UNEASY;
      default: return 1.0;
    }
  };

  recruited.forEach((member) => {
    switch (member.id) {
      case 'dragghen':
        assists.push({
          crewId: 'dragghen',
          crewName: 'Dragghen',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'dragghen_bulkhead_stance',
            name: 'BULKHEAD STANCE',
            description: 'Dragghen plants Bulkhead and braces. 90 pounds of Dampening Tone keel plate between you and everything.',
            category: 'crew',
            targetType: 'self',
            damage: 0,
            damageType: 'physical',
            accuracy: 100,
            cooldown: 2,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'block',
            flavorText: 'Dragghen sets Bulkhead into the deck. "Solid two. I\'ve seen better swings from rigging." The next attack rings off steel and goes nowhere.',
            missText: '',
            effects: [
              { type: 'shield', value: 50, duration: 1, chance: 100, description: 'Bulkhead absorbs next 50 damage' },
              { type: 'buff_defense', value: 20, duration: 1, chance: 100, description: 'Gorundai wall' },
            ],
          },
        });
        assists.push({
          crewId: 'dragghen',
          crewName: 'Dragghen',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'dragghen_keel_breaker',
            name: 'KEEL BREAKER',
            description: 'Dragghen swings Bulkhead like a battering ram. If the keel plate hits, you stay down.',
            category: 'crew',
            targetType: 'single',
            damage: 35,
            damageType: 'physical',
            accuracy: 80,
            cooldown: 2,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'heavy_smash',
            flavorText: '"Hold still. This is a repair." Bulkhead connects. The deck shakes. Dragghen checks for dents on his shield first.',
            missText: '"Missed. That\'s a three." He resets his stance without hurrying.',
            effects: [
              { type: 'stun', value: 1, duration: 1, chance: 65, description: 'Structural failure' },
            ],
          },
        });
        break;

      case 'delvessa':
        assists.push({
          crewId: 'delvessa',
          crewName: 'Delvessa',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'delvessa_sight_read',
            name: 'SIGHT READ',
            description: 'Delvessa maps the enemy\'s patterns. Their next move becomes predictable.',
            category: 'crew',
            targetType: 'single',
            damage: 0,
            damageType: 'dominion_sight',
            accuracy: 95,
            cooldown: 2,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'sight_flash',
            flavorText: '"Left shoulder drops before they swing. Right leg is the plant foot. Next attack, high, from the right." You see it before it happens.',
            missText: '"They\'re... erratic. I can\'t get a clean read."',
            effects: [
              { type: 'expose', value: 20, duration: 2, chance: 100, description: 'Patterns exposed (-20 DEF)' },
            ],
          },
        });
        assists.push({
          crewId: 'delvessa',
          crewName: 'Delvessa',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'delvessa_tactical_call',
            name: 'TACTICAL CALL',
            description: 'Delvessa reads the field and calls openings. Your next attack hits harder.',
            category: 'crew',
            targetType: 'self',
            damage: 0,
            damageType: 'dominion_sight',
            accuracy: 100,
            cooldown: 3,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'sight_flash',
            flavorText: '"Now. Right side, two steps forward, swing low." She makes war sound like arithmetic.',
            missText: '',
            effects: [
              { type: 'buff_attack', value: 20, duration: 2, chance: 100, description: 'Tactical advantage (+20 ATK)' },
            ],
          },
        });
        break;

      case 'suulen':
        assists.push({
          crewId: 'suulen',
          crewName: 'Suulen',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'suulen_shadow_strike',
            name: 'SHADOW STRIKE',
            description: 'Suulen appears from nowhere with Cutting Tone blades. You never see her coming. Neither do they.',
            category: 'crew',
            targetType: 'single',
            damage: 25,
            damageType: 'resonance',
            accuracy: 90,
            cooldown: 2,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'slash',
            flavorText: 'A flicker in the shadow behind your target. Two lines of red. Suulen is already gone.',
            missText: 'The shadow shifts, but they were already moving. "Next time."',
            effects: [
              { type: 'bleed', value: 8, duration: 3, chance: 65, description: 'Resonance cuts bleed' },
            ],
          },
        });
        assists.push({
          crewId: 'suulen',
          crewName: 'Suulen',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'suulen_vanish',
            name: 'VANISHING ACT',
            description: 'Suulen throws down a smoke charge and repositions you. When the air clears, you are somewhere they did not expect.',
            category: 'crew',
            targetType: 'self',
            damage: 0,
            damageType: 'physical',
            accuracy: 100,
            cooldown: 3,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'flash_white',
            flavorText: 'Grey smoke. Silence. You feel a hand on your shoulder, pulling you sideways through the haze. "Move now. Talk later."',
            missText: '',
            effects: [
              { type: 'buff_defense', value: 20, duration: 2, chance: 100, description: 'Repositioned (+20 DEF)' },
              { type: 'buff_attack', value: 10, duration: 2, chance: 100, description: 'Flanking advantage (+10 ATK)' },
            ],
          },
        });
        break;

      case 'tessek':
        assists.push({
          crewId: 'tessek',
          crewName: 'Tessek',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'tessek_red_line',
            name: 'RED LINE SLASH',
            description: 'Tessek channels Sight Dominion through Redtide. The blade finds structural fault lines.',
            category: 'crew',
            targetType: 'single',
            damage: 30,
            damageType: 'resonance',
            accuracy: 88,
            cooldown: 2,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'slash',
            flavorText: '"Crimson Requiem: Fourth Petal Descent." It\'s a diagonal cut. But the Cutting Tone finds the crack in their guard and splits it wide open.',
            missText: '"Hmm. Garroden would have landed that." He flicks Redtide clean and resets.',
            effects: [
              { type: 'expose', value: 18, duration: 2, chance: 100, description: 'Fault line exposed (-18 DEF)' },
              { type: 'bleed', value: 8, duration: 3, chance: 60, description: 'Cutting Tone laceration' },
            ],
          },
        });
        assists.push({
          crewId: 'tessek',
          crewName: 'Tessek',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'tessek_sight_draw',
            name: 'SIGHT DRAW',
            description: 'Tessek reads the field through Sight Dominion. Every weakness lights up.',
            category: 'crew',
            targetType: 'self',
            damage: 0,
            damageType: 'dominion_sight',
            accuracy: 100,
            cooldown: 3,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'sight_flash',
            flavorText: 'Tessek closes his eyes. When they open, he points Redtide at three different targets in sequence. "There, there, and there. The rest is arithmetic."',
            missText: '',
            effects: [
              { type: 'buff_attack', value: 15, duration: 2, chance: 100, description: 'Vayne-style targeting (+15 ATK)' },
              { type: 'expose', value: 10, duration: 2, chance: 100, description: 'All weaknesses mapped' },
            ],
          },
        });
        break;

      case 'orren': {
        // God Fruit seawater weakness: Orren's Storm Eel Fruit is weakened at sea
        const orrenSeaPenalty = isAtSea && member.godFruit?.eaten;
        const orrenDmgScale = orrenSeaPenalty ? COMBAT.SEAWATER_CREW_ASSIST_MULTIPLIER : 1.0;
        assists.push({
          crewId: 'orren',
          crewName: 'Orren',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'orren_storm_pulse',
            name: orrenSeaPenalty ? 'STORM PULSE (WEAKENED)' : 'STORM PULSE',
            description: orrenSeaPenalty
              ? 'Orren releases a burst of bioelectric current. The seawater saps his control. Reduced output.'
              : 'Orren releases a burst of bioelectric current. Everything in range gets hit.',
            category: 'crew',
            targetType: 'all',
            damage: Math.floor(20 * orrenDmgScale),
            damageType: 'dominion_iron',
            accuracy: 85,
            cooldown: 3,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'thunder_strike',
            flavorText: 'Both ears pin flat. "Sorry in advance." Blue-white arcs snap between Orren\'s hands and then everything in front of him lights up.',
            missText: 'Sparks scatter wide. "I... I pulled it. Sorry." His ears are completely sideways.',
            effects: [
              { type: 'stun', value: 1, duration: 1, chance: 40, description: 'Electric shock' },
              { type: 'weaken', value: 10, duration: 2, chance: 60, description: 'Nervous system disruption' },
            ],
          },
        });
        assists.push({
          crewId: 'orren',
          crewName: 'Orren',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'orren_charged_field',
            name: orrenSeaPenalty ? 'CHARGED FIELD (WEAKENED)' : 'CHARGED FIELD',
            description: orrenSeaPenalty
              ? 'Orren floods the area with a low-level electrical field. The ocean fights his current. Reduced effect.'
              : 'Orren floods the area with a low-level electrical field. Metal heats. Nerves jitter.',
            category: 'crew',
            targetType: 'all',
            damage: Math.floor(8 * orrenDmgScale),
            damageType: 'dominion_iron',
            accuracy: 90,
            cooldown: 2,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'thunder_strike',
            flavorText: 'The air crackles. Dragghen\'s shield hums. "Rate that." "Two." Orren\'s ears droop, but the enemy\'s armor is conducting heat into their skin.',
            missText: 'Static pops, but nothing catches. Orren shakes his hands. "Give me a second."',
            effects: [
              { type: 'expose', value: 15, duration: 2, chance: 75, description: 'Metal conducting heat' },
              { type: 'weaken', value: 8, duration: 2, chance: 60, description: 'Nerve interference' },
            ],
          },
        });
        break;
      }

      case 'vorreth':
        assists.push({
          crewId: 'vorreth',
          crewName: 'Vorreth',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'vorreth_black_standard',
            name: 'BLACK STANDARD',
            description: 'Vorreth steps forward. King Dominion radiates from him like heat from a furnace. Lesser fighters freeze.',
            category: 'crew',
            targetType: 'all',
            damage: 15,
            damageType: 'dominion_king',
            accuracy: 90,
            cooldown: 3,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'king_pressure',
            flavorText: 'Vorreth opens his eyes. That\'s all. The air changes weight. Two enemies stumble. One drops their weapon. "You were saying."',
            missText: 'The pressure rolls out but they brace through it. "Decent." High praise.',
            effects: [
              { type: 'expose', value: 20, duration: 2, chance: 80, description: 'Intimidation (-20 DEF)' },
              { type: 'stun', value: 1, duration: 1, chance: 45, description: 'Will crushed' },
            ],
          },
        });
        assists.push({
          crewId: 'vorreth',
          crewName: 'Vorreth',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'vorreth_oni_fang',
            name: 'ONI FANG',
            description: 'Vorreth hits someone with his bare, Korvaan-hardened fist. It sounds like a cannon.',
            category: 'crew',
            targetType: 'single',
            damage: 40,
            damageType: 'physical',
            accuracy: 82,
            cooldown: 2,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'heavy_smash',
            flavorText: '"Forty-eight." Vorreth adds another count to the list and hits them so hard the ground cracks. He yawns.',
            missText: 'They dodge. Vorreth watches them go. "Fast. That was a four."',
            effects: [
              { type: 'stun', value: 1, duration: 1, chance: 55, description: 'Oni impact' },
              { type: 'weaken', value: 12, duration: 2, chance: 70, description: 'Structural damage' },
            ],
          },
        });
        break;

      case 'kovesse':
        assists.push({
          crewId: 'kovesse',
          crewName: 'Kovesse',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'kovesse_flashbang',
            name: 'KOVESSE SPECIAL',
            description: 'Kovesse throws something improvised. She calls it a "percussive recalibrator." It\'s a flashbang.',
            category: 'crew',
            targetType: 'all',
            damage: 10,
            damageType: 'physical',
            accuracy: 80,
            cooldown: 3,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'flash_white',
            flavorText: '"FIRE IN THE-- well, everywhere!" A blinding flash and a crack that rattles teeth.',
            missText: '"It was a dud! Who makes duds? Nobody makes duds! That was a PROTOTYPE!"',
            effects: [
              { type: 'stun', value: 1, duration: 1, chance: 70, description: 'Blinded and deafened' },
              { type: 'expose', value: 10, duration: 2, chance: 50, description: 'Disoriented' },
            ],
          },
        });
        assists.push({
          crewId: 'kovesse',
          crewName: 'Kovesse',
          portrait: member.portrait,
          available: true,

          action: {
            id: 'kovesse_analysis',
            name: 'LIVE ANALYSIS',
            description: 'Kovesse broadcasts combat data in real-time, reading enemy patterns through her Grimoire.',
            category: 'crew',
            targetType: 'self',
            damage: 0,
            damageType: 'dominion_sight',
            accuracy: 100,
            cooldown: 3,
            currentCooldown: 0,
            staminaCost: 0,
            animation: 'sight_flash',
            flavorText: '"Pattern lock! They favor their right side, overcommit on the second swing, and their guard drops for exactly 0.4 seconds after a heavy attack. You\'re WELCOME."',
            missText: '',
            effects: [
              { type: 'buff_attack', value: 12, duration: 3, chance: 100, description: 'Pattern analysis (+12 ATK)' },
              { type: 'buff_accuracy', value: 10, duration: 3, chance: 100, description: 'Predictive targeting (+10 ACC)' },
            ],
          },
        });
        break;
    }
  });

  // Apply mood-based effectiveness scaling to assist damage and effect values
  return assists.map((assist) => {
    const member = recruited.find((m) => m.id === assist.crewId);
    if (!member) return assist;
    const scale = getMoodScale(member);
    if (scale >= 1.0) return assist; // No penalty for content/loyal

    return {
      ...assist,
      action: {
        ...assist.action,
        damage: Math.floor(assist.action.damage * scale),
        effects: assist.action.effects?.map((e) => ({
          ...e,
          value: typeof e.value === 'number' ? Math.floor(e.value * scale) : e.value,
          chance: Math.floor(e.chance * scale), // Lower chance too - they're half-assing it
        })),
      },
    };
  });
}

// ==========================================
// CREW COMBO SYSTEM
// ==========================================

/** Combo definitions: when both crew members are available, unlock a powerful combined assist. */
export const CREW_COMBOS: CrewCombo[] = [
  {
    id: 'iron_wall',
    crewPair: ['dragghen', 'vorreth'],
    name: 'IRON WALL',
    description: 'Dragghen plants Bulkhead. Vorreth reads the attack pattern. Together they build an impenetrable defense that punishes anyone stupid enough to test it.',
    sharedCooldown: 5,
    currentCooldown: 0,
    action: {
      id: 'combo_iron_wall',
      name: 'IRON WALL',
      description: 'Shield 80 + DEF buff 25. Fortress stance.',
      category: 'crew',
      targetType: 'self',
      damage: 0,
      damageType: 'physical',
      accuracy: 100,
      cooldown: 0,
      currentCooldown: 0,
      staminaCost: 0,
      animation: 'block',
      flavorText: 'Dragghen plants ninety pounds of keel plate. Vorreth positions behind him, blade angled for counter-thrusts. Every gap in the Bulkhead is covered by the Cold Logic. Thirty seconds of fortress.',
      missText: '',
      effects: [
        { type: 'shield', value: 80, duration: 2, chance: 100, description: 'Bulkhead + Cold Logic barrier' },
        { type: 'buff_defense', value: 25, duration: 2, chance: 100, description: '+25 DEF (combined stance)' },
      ],
    },
  },
  {
    id: 'perfect_cut',
    crewPair: ['tessek', 'delvessa'],
    name: 'PERFECT CUT',
    description: 'Delvessa identifies the target. Tessek does not miss. The precision of intelligence combined with the precision of a blade.',
    sharedCooldown: 5,
    currentCooldown: 0,
    action: {
      id: 'combo_perfect_cut',
      name: 'PERFECT CUT',
      description: 'Single target precision strike.',
      category: 'crew',
      targetType: 'single',
      damage: 50,
      damageType: 'physical',
      accuracy: 95,
      cooldown: 0,
      currentCooldown: 0,
      staminaCost: 0,
      animation: 'slash',
      flavorText: '"There." Delvessa points. Tessek moves. The blade finds the exact gap between armor plates that Delvessa calculated from the ledger of the smith who forged it. The cut is surgical. The bleeding is not.',
      missText: 'Tessek\'s blade finds air. The target moved. Even perfection has margins.',
      effects: [
        { type: 'expose', value: 25, duration: 2, chance: 100, description: 'Surgically exposed' },
        { type: 'bleed', value: 8, duration: 3, chance: 80, description: 'Precision wound' },
        { type: 'dodge', value: 1, duration: 1, chance: 100, description: 'Tessek predicts retaliation' },
      ],
    },
  },
  {
    id: 'lightning_relay',
    crewPair: ['kovesse', 'orren'],
    name: 'LIGHTNING RELAY',
    description: 'Kovesse channels the Grimoire. Orren conducts the energy. The result is a targeted electromagnetic storm.',
    sharedCooldown: 5,
    currentCooldown: 0,
    action: {
      id: 'combo_lightning_relay',
      name: 'LIGHTNING RELAY',
      description: 'AoE electrical burst + stun.',
      category: 'crew',
      targetType: 'all',
      damage: 35,
      damageType: 'resonance',
      accuracy: 85,
      cooldown: 0,
      currentCooldown: 0,
      staminaCost: 0,
      animation: 'flash_white',
      flavorText: 'Kovesse\'s fingers dance across the Grimoire interface. The crystal harmonics build. Orren touches a copper wire to the resonance plate. The ship\'s electrical system goes haywire for one beautiful, devastating second. Every enemy on deck convulses.',
      missText: 'The relay misfires. Sparks fly but the grounding disperses the charge.',
      effects: [
        { type: 'stun', value: 1, duration: 1, chance: 60, description: 'Electrocuted' },
        { type: 'weaken', value: 10, duration: 2, chance: 100, description: 'System disruption' },
      ],
    },
  },
  {
    id: 'ghost_blade',
    crewPair: ['suulen', 'tessek'],
    name: 'GHOST BLADE',
    description: 'Suulen reads the spatial geometry. Tessek follows her guidance through the gap no one else can see.',
    sharedCooldown: 5,
    currentCooldown: 0,
    action: {
      id: 'combo_ghost_blade',
      name: 'GHOST BLADE',
      description: 'Guaranteed critical + expose.',
      category: 'crew',
      targetType: 'single',
      damage: 45,
      damageType: 'physical',
      accuracy: 100,
      cooldown: 0,
      currentCooldown: 0,
      staminaCost: 0,
      animation: 'sight_flash',
      flavorText: 'Suulen\'s eyes narrow. She sees the gap. "There." Tessek is already moving. He enters the blind spot she mapped and strikes from an angle the target did not know existed. She pointed. He cut.',
      missText: '',
      effects: [
        { type: 'expose', value: 20, duration: 2, chance: 100, description: 'Blind spot revealed' },
        { type: 'bleed', value: 6, duration: 2, chance: 100, description: 'Ghost wound' },
      ],
    },
  },
  {
    id: 'oni_onslaught',
    crewPair: ['vorreth', 'dragghen'],
    name: 'ONI ONSLAUGHT',
    description: 'Two Oni. One target. Vorreth leads. Dragghen follows. The target does not survive the combination.',
    sharedCooldown: 5,
    currentCooldown: 0,
    action: {
      id: 'combo_oni_onslaught',
      name: 'ONI ONSLAUGHT',
      description: 'Massive single-target + stun + intimidate all.',
      category: 'crew',
      targetType: 'single',
      damage: 70,
      damageType: 'physical',
      accuracy: 85,
      cooldown: 0,
      currentCooldown: 0,
      staminaCost: 0,
      animation: 'heavy_smash',
      flavorText: 'Vorreth closes the distance with Cold Logic precision. The first hit staggers. The second opens the guard. Then Dragghen arrives with Bulkhead swinging like a wrecking ball. Two Oni. One target. The math does not favor the target.',
      missText: 'They break formation. The Oni onslaught crashes into empty air.',
      effects: [
        { type: 'stun', value: 1, duration: 1, chance: 80, description: 'Pummeled' },
        { type: 'intimidate', value: 15, duration: 2, chance: 100, description: 'Two Oni. One target.' },
      ],
    },
  },
];

/**
 * Get available crew combos based on which crew are alive and recruited.
 */
export function getAvailableCombos(crew: CrewMember[]): CrewCombo[] {
  const availableIds = new Set(
    crew.filter(c => c.recruited && c.alive && !c.injured && c.mood !== 'mutinous').map(c => c.id)
  );

  return CREW_COMBOS.filter(combo =>
    combo.crewPair.every(id => availableIds.has(id))
  );
}

// ==========================================
// COMBAT ENGINE
// ==========================================

/**
 * Territory combat bonuses applied on top of base stats
 */
export interface TerritoryCombatBonuses {
  attack: number;
  defense: number;
  hp: number;
  staminaRegen: number;
}

/**
 * Build player combatant from MC data + territory bonuses
 */
export function buildPlayerCombatant(
  mc: MC,
  territoryBonuses?: TerritoryCombatBonuses,
  equippedGear?: Record<EquipmentSlot, Equipment | null>,
  shipBonuses?: { combatDefense: number; combatAttack: number },
): Combatant {
  const ironLevel = mc.dominion.iron.level;
  const sightLevel = mc.dominion.sight.level;

  // Legacy Danzai bonus: only applies if no equipment system (old saves without gear)
  const weaponBonus = (!equippedGear || !equippedGear.weapon) && mc.weapon === 'Danzai' ? 8 : 0;

  // Territory bonuses from conquered islands (diminished - empire bloat)
  const tAtk = Math.floor((territoryBonuses?.attack || 0) * COMBAT.TERRITORY_BONUS_ATK_FACTOR);
  const tDef = Math.floor((territoryBonuses?.defense || 0) * COMBAT.TERRITORY_BONUS_DEF_FACTOR);
  const tHp = Math.floor((territoryBonuses?.hp || 0) * COMBAT.TERRITORY_BONUS_HP_FACTOR);

  // Korvaan body refinement bonuses
  const korvaanBonus = getKorvaanBonuses(mc.korvaan);

  // Dragon Fruit bonuses (passive stat boost from transformation)
  const dragonBonus = getDragonFruitBonuses(mc.dragonFruitEaten, mc.godFruit?.awakened || false);

  // Equipment bonuses (sum all equipped gear stat bonuses)
  const eqAtk = sumEquipmentStat(equippedGear, 'attack');
  const eqDef = sumEquipmentStat(equippedGear, 'defense');
  const eqHp = sumEquipmentStat(equippedGear, 'hp');
  const eqSpd = sumEquipmentStat(equippedGear, 'speed');
  const eqStamRegen = sumEquipmentStat(equippedGear, 'staminaRegen');

  // Ship bonuses (from installed upgrades)
  const shipAtk = shipBonuses?.combatAttack || 0;
  const shipDef = shipBonuses?.combatDefense || 0;

  // Equipment special effect bonuses (set bonuses, compass speed, etc.)
  const specials = getEquipmentSpecialBonuses(equippedGear);

  const totalHp = Math.floor(COMBAT.KARYUDON_BASE_HP + ironLevel * COMBAT.KARYUDON_HP_PER_IRON + tHp + korvaanBonus.hp + dragonBonus.hp + eqHp + specials.bonusHp);

  // Dragon Fruit combat actions (unlocked after eating)
  const dragonActions = getDragonCombatActions(mc);

  return {
    id: 'karyudon',
    name: 'Karyudon',
    title: mc.epithet,
    portrait: mc.portrait,
    hp: totalHp,
    maxHp: totalHp,
    stamina: COMBAT.KARYUDON_BASE_STAMINA + Math.floor(ironLevel * COMBAT.KARYUDON_STAMINA_PER_IRON),
    maxStamina: COMBAT.KARYUDON_BASE_STAMINA + Math.floor(ironLevel * COMBAT.KARYUDON_STAMINA_PER_IRON),
    attack: COMBAT.KARYUDON_BASE_ATTACK + Math.floor(ironLevel / 3) + weaponBonus + tAtk + korvaanBonus.attack + dragonBonus.attack + eqAtk + shipAtk,
    defense: COMBAT.KARYUDON_BASE_DEFENSE + Math.floor(ironLevel / 4) + tDef + korvaanBonus.defense + dragonBonus.defense + eqDef + shipDef + specials.bonusDef,
    speed: COMBAT.KARYUDON_BASE_SPEED + Math.floor(sightLevel / 3) + dragonBonus.speed + eqSpd + specials.bonusSpd,
    dominion: {
      iron: ironLevel,
      sight: sightLevel,
      king: mc.dominion.king.level,
    },
    actions: [...KARYUDON_ACTIONS, ...dragonActions],
    statusEffects: [],
    isPlayer: true,
    isAlive: true,
    staminaRegen: COMBAT.STAMINA_REGEN_BASE + korvaanBonus.staminaRegen + dragonBonus.staminaRegen + eqStamRegen,
  };
}

/** Sum a specific stat bonus across all equipped gear */
function sumEquipmentStat(
  gear: Record<EquipmentSlot, Equipment | null> | undefined,
  stat: keyof Equipment['statBonus'],
): number {
  if (!gear) return 0;
  let total = 0;
  for (const slot of ['weapon', 'armor', 'accessory'] as EquipmentSlot[]) {
    const item = gear[slot];
    if (item?.statBonus?.[stat]) {
      total += item.statBonus[stat]!;
    }
  }
  return total;
}

/** Check if a specific equipment special effect is active */
function hasSpecialEffect(gear: Record<EquipmentSlot, Equipment | null> | undefined, effect: string): boolean {
  if (!gear) return false;
  for (const slot of ['weapon', 'armor', 'accessory'] as EquipmentSlot[]) {
    if (gear[slot]?.specialEffect === effect) return true;
  }
  return false;
}

/** Get equipment special effect combat modifiers for buildPlayerCombatant */
function getEquipmentSpecialBonuses(gear: Record<EquipmentSlot, Equipment | null> | undefined): {
  bonusHp: number; bonusDef: number; bonusSpd: number;
} {
  if (!gear) return { bonusHp: 0, bonusDef: 0, bonusSpd: 0 };
  let bonusHp = 0, bonusDef = 0, bonusSpd = 0;

  // Leviathan set bonus: both weapon + armor equipped
  if (hasSpecialEffect(gear, 'leviathan_weapon') && hasSpecialEffect(gear, 'leviathan_armor')) {
    bonusHp += 10;
    bonusDef += 5;
  }

  // Ancient Compass: +3 bonus speed (danger sense)
  if (hasSpecialEffect(gear, 'has_ancient_compass')) {
    bonusSpd += 3;
  }

  return { bonusHp, bonusDef, bonusSpd };
}

/**
 * Build enemy combatant from template
 */
export function buildEnemyCombatant(template: EnemyTemplate, index: number): Combatant {
  // Auto-resolve portrait: try enemy-specific key first, then template id
  const resolvedPortrait = template.portrait
    || getPortrait(template.id + '_enemy')
    || getPortrait(template.id)
    || undefined;

  return {
    id: `${template.id}_${index}`,
    name: template.name,
    title: template.title,
    portrait: resolvedPortrait,
    hp: template.hp,
    maxHp: template.hp,
    stamina: template.stamina,
    maxStamina: template.stamina,
    attack: template.attack,
    defense: template.defense,
    speed: template.speed,
    dominion: { ...template.dominion },
    actions: template.actions.map((a) => ({ ...a })),
    statusEffects: [],
    isPlayer: false,
    isAlive: true,
  };
}

// ==========================================
// TURN ORDER SYSTEM
// ==========================================

/**
 * Compute turn order by sorting alive combatants by speed (descending).
 * Player wins ties to feel responsive.
 */
export function computeTurnOrder(state: CombatState): string[] {
  const alive: Combatant[] = [
    ...(state.player.isAlive ? [state.player] : []),
    ...state.enemies.filter((e) => e.isAlive),
  ];
  return alive
    .sort((a, b) => {
      if (b.speed !== a.speed) return b.speed - a.speed;
      // Player wins ties
      return a.isPlayer ? -1 : b.isPlayer ? 1 : 0;
    })
    .map((c) => c.id);
}

/**
 * Find the next alive combatant in turn order starting from the position
 * AFTER currentTurnIndex. Returns the next combatant ID and index,
 * or signals that the round is complete.
 */
export function advanceTurnIndex(state: CombatState): {
  nextId: string | null;
  newIndex: number;
  roundComplete: boolean;
} {
  const { turnOrder, currentTurnIndex } = state;
  const allCombatants = [state.player, ...state.enemies];

  // Walk forward from current position
  for (let offset = 1; offset <= turnOrder.length; offset++) {
    const idx = currentTurnIndex + offset;
    if (idx >= turnOrder.length) {
      // Wrapped past the end: round is complete
      return { nextId: null, newIndex: idx, roundComplete: true };
    }
    const id = turnOrder[idx];
    const combatant = allCombatants.find((c) => c.id === id);
    if (combatant && combatant.isAlive) {
      return { nextId: id, newIndex: idx, roundComplete: false };
    }
    // Dead combatant: skip
  }

  // All remaining combatants are dead: round complete
  return { nextId: null, newIndex: turnOrder.length, roundComplete: true };
}

/**
 * Resolve the first turn of a round. Returns the ID of the first alive
 * combatant and sets currentTurnIndex to their position.
 */
export function getFirstTurn(state: CombatState): {
  nextId: string | null;
  newIndex: number;
} {
  const { turnOrder } = state;
  const allCombatants = [state.player, ...state.enemies];

  for (let idx = 0; idx < turnOrder.length; idx++) {
    const id = turnOrder[idx];
    const combatant = allCombatants.find((c) => c.id === id);
    if (combatant && combatant.isAlive) {
      return { nextId: id, newIndex: idx };
    }
  }
  return { nextId: null, newIndex: 0 };
}

/**
 * Initialize combat state from an encounter
 */
export function initializeCombat(
  encounter: CombatEncounter,
  mc: MC,
  crew: CrewMember[],
  territoryBonuses?: TerritoryCombatBonuses,
  equippedGear?: Record<EquipmentSlot, Equipment | null>,
  shipBonuses?: { combatDefense: number; combatAttack: number },
  isAtSea?: boolean,
): CombatState {
  const player = buildPlayerCombatant(mc, territoryBonuses, equippedGear, shipBonuses);

  // God Fruit seawater weakness: stat penalties when fighting at sea
  if (isAtSea && mc.dragonFruitEaten) {
    player.defense = Math.max(0, player.defense - COMBAT.SEAWATER_DEFENSE_PENALTY);
    player.speed = Math.max(1, player.speed - COMBAT.SEAWATER_SPEED_PENALTY);
  }

  const enemies = encounter.enemies.map((e, i) => buildEnemyCombatant(e, i));
  const crewAssists = getCrewAssists(crew, isAtSea);

  // Build initial state, then compute turn order from it
  const combatLog: CombatLogEntry[] = [];
  // Notify player about seawater weakness if active
  if (isAtSea && mc.dragonFruitEaten) {
    combatLog.push({
      round: 0,
      actor: 'karyudon',
      action: 'Seawater Proximity',
      target: '',
      text: `The ocean churns beneath you. Your God Fruit recoils from the seawater. DEF -${COMBAT.SEAWATER_DEFENSE_PENALTY}, SPD -${COMBAT.SEAWATER_SPEED_PENALTY}.`,
      animation: 'iron_pulse',
    });
  }

  const initialState: CombatState = {
    encounter,
    phase: 'narrative_intro',
    round: 1,
    player,
    enemies,
    crewAssists,
    selectedAction: null,
    selectedTarget: null,
    combatLog,
    currentWave: 0,
    totalWaves: encounter.waves ? encounter.waves.length + 1 : 1,
    turnOrder: [],
    currentTurnIndex: 0,
    animating: false,
    kingMeter: mc.dominion.king.level * 2, // Start with some King based on MC level
    kingBurstAvailable: false,
    comboCount: 0,
    lastMoveName: null,
    bossPhaseNarration: null,
    bossPhaseTitle: null,
    triggeredBossPhases: [],
    comboCooldowns: {},
    equipmentEffects: collectEquipmentEffects(equippedGear),
    isAtSea,
  };

  // Compute speed-based turn order from the complete state
  initialState.turnOrder = computeTurnOrder(initialState);
  initialState.currentTurnIndex = -1; // Will be advanced to 0 on first turn

  return initialState;
}

/** Collect active special effect strings from equipped gear */
function collectEquipmentEffects(gear?: Record<EquipmentSlot, Equipment | null>): string[] {
  if (!gear) return [];
  const effects: string[] = [];
  for (const slot of ['weapon', 'armor', 'accessory'] as EquipmentSlot[]) {
    const item = gear[slot];
    if (item?.specialEffect) effects.push(item.specialEffect);
  }
  return effects;
}

// ==========================================
// COMBAT RESOLUTION
// ==========================================

/**
 * Calculate damage with modifiers
 */
export function calculateDamage(
  attacker: Combatant,
  target: Combatant,
  action: CombatAction,
  equipmentEffects?: string[],
): { damage: number; isCritical: boolean; shieldAbsorbed: number } {
  // Base: action damage + attacker's attack stat (contribution scaled to reduce snowball)
  let baseDamage = action.damage + Math.floor(attacker.attack * COMBAT.ATTACK_STAT_MULTIPLIER);

  // Dominion scaling
  if (action.damageType === 'dominion_iron') {
    baseDamage += Math.floor(attacker.dominion.iron * COMBAT.DOMINION_DAMAGE_SCALING);
  } else if (action.damageType === 'dominion_king') {
    baseDamage += Math.floor(attacker.dominion.king * COMBAT.DOMINION_DAMAGE_SCALING);
  } else if (action.damageType === 'resonance') {
    baseDamage += COMBAT.RESONANCE_FLAT_BONUS;
  }

  // Apply attack buffs (capped to prevent ridiculous stacking)
  const attackBuffs = Math.min(COMBAT.ATTACK_BUFF_CAP, attacker.statusEffects
    .filter((e) => e.type === 'buff_attack')
    .reduce((sum, e) => sum + e.value, 0));
  baseDamage += attackBuffs;

  // Crew boost bonus (from Conqueror's Voice King ability)
  const crewBoost = attacker.statusEffects
    .filter((e) => e.type === 'crew_boost')
    .reduce((sum, e) => sum + e.value, 0);
  baseDamage += crewBoost;

  // Defense reduction - defense matters more now
  let defense = target.defense;
  const defenseDebuffs = Math.min(30, target.statusEffects
    .filter((e) => e.type === 'expose')
    .reduce((sum, e) => sum + e.value, 0)); // capped at -30 DEF to prevent degenerate stacking
  defense = Math.max(0, defense - defenseDebuffs);

  const defenseBuffs = Math.min(COMBAT.DEFENSE_BUFF_CAP, target.statusEffects
    .filter((e) => e.type === 'buff_defense')
    .reduce((sum, e) => sum + e.value, 0));
  defense += defenseBuffs;

  // Weakened attackers deal less
  const weakenDebuffs = attacker.statusEffects
    .filter((e) => e.type === 'weaken')
    .reduce((sum, e) => sum + e.value, 0);
  baseDamage = Math.max(1, baseDamage - weakenDebuffs);

  // Critical hit (Sight-based + Sight Lens equipment bonus)
  const sightLensBonus = equipmentEffects?.includes('has_sight_lens') ? 12 : 0;
  const critChance = COMBAT.CRIT_CHANCE_BASE + Math.floor(attacker.dominion.sight * COMBAT.CRIT_PER_SIGHT_LEVEL) + sightLensBonus;
  const isCritical = Math.random() * 100 < critChance;
  if (isCritical) {
    baseDamage = Math.floor(baseDamage * COMBAT.CRIT_DAMAGE_MULTIPLIER);
  }

  // Final damage - defense blocks a flat amount + percentage
  const flatReduction = Math.floor(defense * COMBAT.DEFENSE_FLAT_RATIO);
  const percentReduction = 1 - Math.min(COMBAT.DEFENSE_PERCENT_CAP, defense / COMBAT.DEFENSE_DIVISOR);
  let finalDamage = Math.max(1, Math.floor((baseDamage - flatReduction) * percentReduction));

  // Pressure Point Strike: double damage if target already exposed (applied BEFORE shields)
  if (action.id === 'pressure_point_strike' && target.statusEffects.some((e) => e.type === 'expose')) {
    finalDamage = Math.floor(finalDamage * COMBAT.EXPOSE_PRESSURE_MULTIPLIER);
  }

  // Shield absorption - work on copies to avoid mutating the original state
  const shields = target.statusEffects.filter((e) => e.type === 'shield');
  let shieldAbsorbed = 0;
  for (const shield of shields) {
    if (finalDamage <= 0) break;
    const absorbed = Math.min(shield.value, finalDamage);
    finalDamage -= absorbed;
    shieldAbsorbed += absorbed;
  }

  // Random variance (wider swings = more tension) - applied AFTER shield calc
  const variance = COMBAT.DAMAGE_VARIANCE_MIN + Math.random() * COMBAT.DAMAGE_VARIANCE_RANGE;
  finalDamage = Math.max(1, Math.floor(finalDamage * variance));

  return { damage: finalDamage, isCritical, shieldAbsorbed };
}

/**
 * Roll accuracy check
 */
export function rollAccuracy(action: CombatAction, attacker: Combatant, target: Combatant): boolean {
  // Check for dodge effect on target -- auto-miss and consume one dodge stack
  const dodgeEffect = target.statusEffects.find((e) => e.type === 'dodge' && e.remainingRounds > 0);
  if (dodgeEffect) {
    const newValue = Math.max(0, (dodgeEffect.value || 1) - 1);
    if (newValue <= 0) {
      target.statusEffects = target.statusEffects.filter((e) => e.id !== dodgeEffect.id);
    } else {
      target.statusEffects = target.statusEffects.map((e) =>
        e.id === dodgeEffect.id ? { ...e, value: newValue } : e
      );
    }
    return false; // Dodged
  }

  let accuracy = action.accuracy;

  // Sight bonus to accuracy
  accuracy += Math.floor(attacker.dominion.sight * COMBAT.SIGHT_ACCURACY_BONUS);

  // Attacker buff_accuracy bonus (stacks from multiple sources)
  const accBuffTotal = attacker.statusEffects
    .filter((e) => e.type === 'buff_accuracy')
    .reduce((sum, e) => sum + (e.value || 0), 0);
  accuracy += accBuffTotal;

  // Attacker intimidate debuff reduces accuracy (applied by enemy King abilities)
  const intimidateTotal = attacker.statusEffects
    .filter((e) => e.type === 'intimidate')
    .reduce((sum, e) => sum + (e.value || 0), 0);
  accuracy -= intimidateTotal;

  // Target sight helps dodge
  accuracy -= Math.floor(target.dominion.sight * COMBAT.SIGHT_EVASION_BONUS);

  // Stunned targets no longer get accuracy bonus (prevents stun snowball)

  return Math.random() * 100 < Math.min(COMBAT.ACCURACY_CAP, accuracy);
}

/**
 * Apply status effects from an action
 */
export function applyActionEffects(
  effects: ActionEffect[],
  target: Combatant,
  options?: { isBossOrCommander?: boolean },
): StatusEffect[] {
  const applied: StatusEffect[] = [];

  effects.forEach((effect) => {
    let effectiveChance = effect.chance;

    // Stun diminishing returns
    if (effect.type === 'stun') {
      const stunCount = target.stunCount || 0;
      // After STUN_IMMUNE_AFTER stuns, target is immune for the rest of combat
      if (stunCount >= COMBAT.STUN_IMMUNE_AFTER) return;
      // Bosses/commanders have reduced stun chance
      if (options?.isBossOrCommander) {
        effectiveChance *= COMBAT.STUN_BOSS_CHANCE_REDUCTION;
      }
    }

    if (Math.random() * 100 < effectiveChance) {
      // For intimidate, check King resistance
      if (effect.type === 'intimidate' && target.dominion.king > 30) {
        return; // Strong-willed targets resist King pressure
      }

      let duration = effect.duration;

      // Stun duration diminishing returns
      if (effect.type === 'stun') {
        const stunCount = target.stunCount || 0;
        // After threshold, each successive stun loses 1 round of duration
        if (stunCount >= COMBAT.STUN_DIMINISH_THRESHOLD) {
          duration = Math.max(1, duration - (stunCount - COMBAT.STUN_DIMINISH_THRESHOLD + 1));
        }
        // Track stun count on target
        target.stunCount = stunCount + 1;
      }

      const statusEffect: StatusEffect = {
        id: `${effect.type}_${Date.now()}_${Math.random().toString(36).slice(2, 4)}`,
        name: effect.description,
        type: effect.type,
        value: effect.value,
        remainingRounds: duration,
        icon: getEffectIcon(effect.type),
      };
      applied.push(statusEffect);
      target.statusEffects.push(statusEffect);
    }
  });

  return applied;
}

function getEffectIcon(type: ActionEffect['type']): string {
  switch (type) {
    case 'stun': return '💫';
    case 'bleed': return '🩸';
    case 'weaken': return '⬇️';
    case 'buff_defense': return '🛡️';
    case 'buff_attack': return '⚔️';
    case 'heal': return '💚';
    case 'dominion_surge': return '⚡';
    case 'intimidate': return '👁️';
    case 'expose': return '🎯';
    case 'shield': return '🔰';
    case 'dodge': return '💨';
    case 'buff_accuracy': return '🎯';
    case 'crew_boost': return '👥';
    default: return '✦';
  }
}

/**
 * Execute a player action
 */
export function executePlayerAction(
  state: CombatState,
  action: CombatAction,
  targetId?: string,
): { newState: CombatState; logEntry: CombatLogEntry } {
  const newState = { ...state };
  const player = { ...newState.player };
  player.statusEffects = [...player.statusEffects];
  newState.player = player;
  // Deep-copy enemies to avoid mutating original state
  newState.enemies = state.enemies.map((e) => ({
    ...e,
    statusEffects: [...e.statusEffects],
    actions: [...e.actions],
  }));

  // Guard: insufficient stamina
  if (player.stamina < action.staminaCost) {
    const logEntry: CombatLogEntry = {
      round: state.round,
      actor: 'Karyudon',
      action: action.name,
      target: '',
      text: 'Not enough stamina.',
      damage: 0,
      animation: 'flash_red',
    };
    newState.combatLog = [...state.combatLog, logEntry].slice(-100);
    return { newState, logEntry };
  }

  // Deduct stamina
  player.stamina = Math.max(0, player.stamina - action.staminaCost);

  // Set cooldown (+1 because end-of-round processing ticks cooldowns immediately)
  const actionIndex = player.actions.findIndex((a) => a.id === action.id);
  if (actionIndex >= 0) {
    player.actions = [...player.actions];
    player.actions[actionIndex] = { ...player.actions[actionIndex], currentCooldown: action.cooldown + 1 };
  }

  // Determine targets
  let targets: Combatant[] = [];
  if (action.targetType === 'self') {
    targets = [player];
  } else if (action.targetType === 'all') {
    targets = newState.enemies.filter((e) => e.isAlive);
  } else if (action.targetType === 'single' && targetId) {
    const target = newState.enemies.find((e) => e.id === targetId && e.isAlive);
    if (target) targets = [target];
  }

  let logText = '';
  let totalDamage = 0;
  const effectNames: string[] = [];
  let isCrit = false;

  if (action.targetType === 'self') {
    // Self-buff actions
    logText = action.flavorText;
    if (action.effects) {
      const applied = applyActionEffects(action.effects, player);
      applied.forEach((e) => effectNames.push(e.name));
    }
    // Heal effects are applied at end-of-round via processEndOfRound
    // (no immediate application here to avoid double-healing)
  } else {
    // Attack actions
    const eqFx = newState.equipmentEffects;
    targets.forEach((target) => {
      const hit = rollAccuracy(action, player, target);
      if (hit) {
        let { damage, isCritical, shieldAbsorbed } = calculateDamage(player, target, action, eqFx);

        // Equipment special effects: Leviathan Fang (+20% dominion damage)
        if (eqFx.includes('leviathan_weapon') && action.category === 'dominion') {
          damage = Math.floor(damage * 1.2);
        }

        // Sight Lens crit bonus now applied in calculateDamage() via +12% crit chance

        // Equipment special effects: Stormheart (25% chance bonus lightning damage)
        if (eqFx.includes('stormheart') && Math.random() < 0.25) {
          const lightning = 8 + Math.floor(Math.random() * 8);
          damage += lightning;
          effectNames.push('Stormheart');
        }

        // Equipment special effects: Ancient Compass (round 1 bonus damage)
        if (eqFx.includes('has_ancient_compass') && state.round === 1) {
          damage += 10;
        }

        target.hp = Math.max(0, target.hp - damage);
        totalDamage += damage;
        if (isCritical) isCrit = true;

        // Drain shields by the absorbed amount
        if (shieldAbsorbed > 0) {
          let remaining = shieldAbsorbed;
          target.statusEffects = target.statusEffects.map((e) => {
            if (e.type !== 'shield' || remaining <= 0) return e;
            const drain = Math.min(e.value, remaining);
            remaining -= drain;
            return { ...e, value: e.value - drain };
          }).filter((e) => e.type !== 'shield' || e.value > 0);
        }

        if (target.hp <= 0) {
          target.isAlive = false;
        }

        if (action.effects) {
          const template = state.encounter.enemies.find((t) => target.id.startsWith(t.id));
          const isBossOrCommander = !!template && ['commander', 'prime', 'boss'].includes(template.tier);
          const applied = applyActionEffects(action.effects, target, { isBossOrCommander });
          applied.forEach((e) => effectNames.push(e.name));
        }

        logText = isCritical
          ? `CRITICAL! ${action.flavorText}`
          : action.flavorText;
      } else {
        logText = action.missText;
      }
    });
  }

  // King's Pressure fires and resets meter (check before increment)
  if (action.id === 'kings_pressure') {
    newState.kingMeter = 0;
    newState.kingBurstAvailable = false;
  } else {
    // King meter builds from combat (more from special attacks)
    if (action.category === 'special') {
      newState.kingMeter = Math.min(100, newState.kingMeter + COMBAT.KING_METER_PER_KILL);
    } else if (action.category === 'strike') {
      newState.kingMeter = Math.min(100, newState.kingMeter + COMBAT.KING_METER_PER_ATTACK);
    } else if (action.category === 'dominion') {
      newState.kingMeter = Math.min(100, newState.kingMeter + COMBAT.KING_METER_PER_DOMINION);
    } else if (action.category === 'defend') {
      newState.kingMeter = Math.min(100, newState.kingMeter + COMBAT.KING_METER_PER_DEFEND);
    }

    // Check if King burst is now available
    if (newState.kingMeter >= 100 && !newState.kingBurstAvailable) {
      newState.kingBurstAvailable = true;
    }
  }

  // Update enemies array
  newState.enemies = newState.enemies.map((e) => {
    const target = targets.find((t) => t.id === e.id);
    return target || e;
  });

  const logEntry: CombatLogEntry = {
    round: state.round,
    actor: 'Karyudon',
    action: action.name,
    target: targets.map((t) => t.name).join(', ') || 'Self',
    damage: totalDamage || undefined,
    effects: effectNames.length > 0 ? effectNames : undefined,
    isCritical: isCrit || undefined,
    text: logText,
    animation: action.animation,
  };

  newState.combatLog = [...state.combatLog, logEntry].slice(-100);

  return { newState, logEntry };
}

/**
 * Player ends turn voluntarily -- recovers stamina instead of acting.
 */
export function playerEndTurn(state: CombatState): { newState: CombatState; logEntry: CombatLogEntry } {
  const newState = { ...state };
  const player = { ...newState.player };

  // Same recovery formula as enemy catch-breath
  const recoveryAmount = Math.max(8, Math.floor(player.maxStamina * 0.20));
  player.stamina = Math.min(player.maxStamina, player.stamina + recoveryAmount);
  newState.player = player;

  const logEntry: CombatLogEntry = {
    round: state.round,
    actor: player.name,
    action: 'Catch Breath',
    target: '',
    text: `${player.name} steadies and recovers ${recoveryAmount} stamina.`,
    animation: 'block',
  };

  return { newState, logEntry };
}

/**
 * Execute enemy AI turn
 */
export function executeEnemyTurn(
  state: CombatState,
  enemyId: string,
): { newState: CombatState; logEntry: CombatLogEntry } {
  const newState = { ...state };
  // Deep-copy enemies to avoid mutating original state
  newState.enemies = state.enemies.map((e) => ({
    ...e,
    statusEffects: [...e.statusEffects],
    actions: [...e.actions],
  }));
  const enemy = newState.enemies.find((e) => e.id === enemyId);

  if (!enemy || !enemy.isAlive) {
    return {
      newState,
      logEntry: {
        round: state.round, actor: '', action: '', target: '',
        text: '', animation: 'slash',
      },
    };
  }

  // Check if stunned
  if (enemy.statusEffects.some((e) => e.type === 'stun')) {
    const logEntry: CombatLogEntry = {
      round: state.round,
      actor: enemy.name,
      action: 'Stunned',
      target: '',
      text: `${enemy.name} is stunned and cannot act!`,
      animation: 'slash',
    };
    newState.combatLog = [...state.combatLog, logEntry].slice(-100);
    return { newState, logEntry };
  }

  // Pick action based on AI pattern
  const availableActions = enemy.actions.filter((a) =>
    a.currentCooldown === 0 && enemy.stamina >= a.staminaCost
  );

  if (availableActions.length === 0) {
    // Out of actions - recover stamina and skip turn
    const updatedEnemy = { ...enemy };
    const recoveryAmount = Math.max(5, Math.floor(enemy.maxStamina * 0.15));
    updatedEnemy.stamina = Math.min(enemy.maxStamina, enemy.stamina + recoveryAmount);
    newState.enemies = newState.enemies.map((e) => e.id === enemy.id ? updatedEnemy : e);
    const logEntry: CombatLogEntry = {
      round: state.round,
      actor: enemy.name,
      action: 'Catching Breath',
      target: '',
      text: `${enemy.name} is exhausted and catches their breath, recovering stamina.`,
      animation: 'slash',
    };
    newState.combatLog = [...state.combatLog, logEntry].slice(-100);
    return { newState, logEntry };
  }

  // ---- Enhanced AI: pattern-based action selection with memory and adaptation ----
  let action: CombatAction;
  const hpPercent = enemy.maxHp > 0 ? enemy.hp / enemy.maxHp : 0.5;
  const template = state.encounter.enemies.find((e) => enemy.id.startsWith(e.id));
  const aiPattern = template?.aiPattern || 'aggressive';
  const playerHpPct = state.player.maxHp > 0 ? state.player.hp / state.player.maxHp : 0.5;
  const hasBuffs = enemy.statusEffects.some((e) => e.type === 'buff_defense' || e.type === 'buff_attack');
  const playerHasDebuffs = state.player.statusEffects.some((e) => e.type === 'weaken' || e.type === 'stun' || e.type === 'expose');
  const offensiveActions = availableActions.filter((a) => a.damage > 0 && a.targetType !== 'self');
  const defensiveActions = availableActions.filter((a) => a.targetType === 'self');
  const debuffActions = availableActions.filter((a) => a.effects?.some((e) => e.type === 'weaken' || e.type === 'stun' || e.type === 'expose'));

  // --- AI Memory: avoid repeating the same action twice in a row ---
  const lastEnemyLog = [...state.combatLog].reverse().find((l) => l.actor === enemy.name);
  const lastActionName = lastEnemyLog?.action;
  const preferVariety = (actions: CombatAction[]): CombatAction => {
    if (actions.length === 0) return availableActions[0]; // Fallback to any available action
    // If we have multiple options, avoid the one we used last turn
    if (actions.length > 1 && lastActionName) {
      const different = actions.filter((a) => a.name !== lastActionName);
      if (different.length > 0) return different[Math.floor(Math.random() * different.length)];
    }
    return actions[Math.floor(Math.random() * actions.length)];
  };

  // --- Stamina awareness: prefer cheaper moves when stamina is low ---
  const staminaPct = enemy.maxStamina > 0 ? enemy.stamina / enemy.maxStamina : 0.5;
  const conserveStamina = staminaPct < 0.3;
  const efficientOffensive = conserveStamina && offensiveActions.length > 1
    ? offensiveActions.sort((a, b) => (b.damage / Math.max(1, b.staminaCost)) - (a.damage / Math.max(1, a.staminaCost)))
    : offensiveActions.sort((a, b) => b.damage - a.damage);

  // --- Fight progression: later rounds make AI more aggressive ---
  const fightDuration = state.round;
  const urgency = Math.min(1, fightDuration / 8); // 0 to 1 over 8 rounds

  if (aiPattern === 'aggressive') {
    // Aggressive: damage-focused with occasional debuffs, stamina-aware
    if (playerHpPct > 0.5 && debuffActions.length > 0 && Math.random() < 0.25 + urgency * 0.1) {
      action = preferVariety(debuffActions);
    } else if (playerHpPct < 0.25 && offensiveActions.length > 0) {
      // Smell blood - use the biggest hit available
      action = preferVariety(offensiveActions.sort((a, b) => b.damage - a.damage).slice(0, 1));
    } else {
      action = preferVariety(efficientOffensive.length > 0 ? efficientOffensive.slice(0, 3) : availableActions.slice(0, 2));
    }
  } else if (aiPattern === 'defensive') {
    // Defensive: buff early, turtle when hurt, but still fight back
    if (!hasBuffs && defensiveActions.length > 0 && (hpPercent > 0.6 ? Math.random() < 0.45 : true)) {
      // Buff BEFORE they're nearly dead - proactive defense
      action = preferVariety(defensiveActions);
    } else if (hpPercent < 0.3 && defensiveActions.length > 0 && Math.random() < 0.6) {
      action = preferVariety(defensiveActions);
    } else {
      // Attack, but don't always pick the biggest move
      action = preferVariety(efficientOffensive.length > 0 ? efficientOffensive.slice(0, 2) : availableActions.slice(0, 2));
    }
  } else if (aiPattern === 'tactical') {
    // Tactical: adapts based on fight state. Most dangerous AI pattern.
    const debuffPriority = !playerHasDebuffs && debuffActions.length > 0;
    const buffPriority = !hasBuffs && defensiveActions.length > 0;
    const killShot = playerHpPct < 0.25 && offensiveActions.length > 0;

    if (killShot) {
      // Go for the kill - biggest hit, no hesitation
      action = preferVariety(offensiveActions.sort((a, b) => b.damage - a.damage).slice(0, 1));
    } else if (debuffPriority && Math.random() < 0.4 + urgency * 0.15) {
      // Debuff early in the fight, more likely as rounds progress
      action = preferVariety(debuffActions);
    } else if (buffPriority && Math.random() < 0.35) {
      action = preferVariety(defensiveActions);
    } else {
      // Vary attacks - don't be predictable
      const pool = efficientOffensive.length > 0 ? efficientOffensive : availableActions;
      action = preferVariety(pool.slice(0, Math.min(3, pool.length)));
    }
  } else if (aiPattern === 'berserker') {
    // Berserker: damage scales up as HP drops. At critical HP, considers one last stand.
    const berserkMult = 1 + (1 - hpPercent) * 0.5; // Up to 50% more damage at low HP
    if (offensiveActions.length > 0) {
      // At very low HP, pick the absolute hardest hit regardless of stamina
      if (hpPercent < 0.15) {
        action = preferVariety(offensiveActions.sort((a, b) => b.damage - a.damage).slice(0, 1));
      } else {
        action = preferVariety(offensiveActions.sort((a, b) => b.damage - a.damage).slice(0, 2));
      }
      action = { ...action, damage: Math.floor(action.damage * berserkMult) };
    } else {
      action = availableActions[0];
    }
  } else if (aiPattern === 'support') {
    // Support: buff self when unprotected, debuff player, then chip damage
    if (!hasBuffs && defensiveActions.length > 0) {
      action = preferVariety(defensiveActions);
    } else if (!playerHasDebuffs && debuffActions.length > 0 && Math.random() < 0.55) {
      action = preferVariety(debuffActions);
    } else if (debuffActions.length > 0 && Math.random() < 0.3) {
      action = preferVariety(debuffActions);
    } else {
      action = preferVariety(offensiveActions.length > 0 ? offensiveActions : availableActions);
    }
  } else {
    action = preferVariety(efficientOffensive.length > 0 ? efficientOffensive : availableActions);
  }

  // Deduct stamina
  enemy.stamina = Math.max(0, enemy.stamina - action.staminaCost);

  // Set cooldown (+1 because end-of-round processing ticks cooldowns immediately)
  const actionIdx = enemy.actions.findIndex((a) => a.id === action.id);
  if (actionIdx >= 0) {
    enemy.actions[actionIdx] = { ...enemy.actions[actionIdx], currentCooldown: action.cooldown + 1 };
  }

  const player = { ...newState.player };
  player.statusEffects = [...player.statusEffects];

  // Resolve action
  let logText = '';
  let totalDamage = 0;
  const effectNames: string[] = [];
  let isCrit = false;

  if (action.targetType === 'self') {
    logText = action.flavorText;
    if (action.effects) {
      const applied = applyActionEffects(action.effects, enemy);
      applied.forEach((e) => effectNames.push(e.name));
    }
  } else {
    // Bio Lantern: 15% chance to dodge enemy attacks
    const bioLanternDodge = newState.equipmentEffects.includes('has_bio_lantern') && Math.random() < 0.15;
    const hit = bioLanternDodge ? false : rollAccuracy(action, enemy, player);
    if (hit) {
      const { damage, isCritical, shieldAbsorbed } = calculateDamage(enemy, player, action);
      player.hp = Math.max(0, player.hp - damage);
      totalDamage = damage;
      isCrit = isCritical;

      // Drain player shields by the absorbed amount
      if (shieldAbsorbed > 0) {
        let remaining = shieldAbsorbed;
        player.statusEffects = player.statusEffects.map((e) => {
          if (e.type !== 'shield' || remaining <= 0) return e;
          const drain = Math.min(e.value, remaining);
          remaining -= drain;
          return { ...e, value: e.value - drain };
        }).filter((e) => e.type !== 'shield' || e.value > 0);
      }

      if (action.effects) {
        const applied = applyActionEffects(action.effects, player);
        applied.forEach((e) => effectNames.push(e.name));
      }

      logText = isCrit
        ? `CRITICAL! ${action.flavorText}`
        : action.flavorText;
    } else {
      logText = bioLanternDodge
        ? `The lantern flares. Karyudon reads the current and sidesteps.`
        : (action.missText || `${enemy.name}'s attack misses!`);
    }
  }

  // King meter builds when player takes damage
  if (totalDamage > 0) {
    newState.kingMeter = Math.min(100, (newState.kingMeter || 0) + Math.floor(totalDamage / 5));
  }

  newState.player = player;

  const logEntry: CombatLogEntry = {
    round: state.round,
    actor: enemy.name,
    action: action.name,
    target: action.targetType === 'self' ? 'Self' : 'Karyudon',
    damage: totalDamage || undefined,
    effects: effectNames.length > 0 ? effectNames : undefined,
    isCritical: isCrit || undefined,
    text: logText,
    animation: action.animation,
  };

  newState.combatLog = [...state.combatLog, logEntry].slice(-100);

  return { newState, logEntry };
}

/**
 * Predict what action an enemy is likely to use next turn.
 * Does NOT modify state - purely informational for the intent preview UI.
 * Returns a simplified hint: icon + category name.
 */
export function predictEnemyIntent(
  state: CombatState,
  enemyId: string,
): { icon: string; label: string; category: string } | null {
  const enemy = state.enemies.find((e) => e.id === enemyId);
  if (!enemy || !enemy.isAlive) return null;

  // Stunned enemies can't act
  if (enemy.statusEffects.some((e) => e.type === 'stun')) {
    return { icon: '💫', label: 'Stunned', category: 'stun' };
  }

  const availableActions = enemy.actions.filter((a) =>
    a.currentCooldown === 0 && enemy.stamina >= a.staminaCost
  );
  if (availableActions.length === 0) {
    return { icon: '😤', label: 'Exhausted', category: 'exhausted' };
  }

  const hpPercent = enemy.maxHp > 0 ? enemy.hp / enemy.maxHp : 0.5;
  const template = state.encounter.enemies.find((e) => enemy.id.startsWith(e.id));
  const aiPattern = template?.aiPattern || 'aggressive';
  const playerHpPct = state.player.maxHp > 0 ? state.player.hp / state.player.maxHp : 0.5;
  const hasBuffs = enemy.statusEffects.some((e) => e.type === 'buff_defense' || e.type === 'buff_attack');
  const offensiveActions = availableActions.filter((a) => a.damage > 0 && a.targetType !== 'self');
  const defensiveActions = availableActions.filter((a) => a.targetType === 'self');
  const debuffActions = availableActions.filter((a) => a.effects?.some((e) => e.type === 'weaken' || e.type === 'stun' || e.type === 'expose'));

  // Predict based on AI pattern (simplified - doesn't include randomness)
  let likelyCategory: 'attack' | 'defend' | 'debuff' | 'special' = 'attack';

  if (aiPattern === 'aggressive') {
    if (playerHpPct < 0.25 && offensiveActions.length > 0) likelyCategory = 'attack';
    else if (debuffActions.length > 0 && playerHpPct > 0.5) likelyCategory = 'debuff';
    else likelyCategory = 'attack';
  } else if (aiPattern === 'defensive') {
    if (!hasBuffs && defensiveActions.length > 0 && hpPercent > 0.5) likelyCategory = 'defend';
    else if (hpPercent < 0.3 && defensiveActions.length > 0) likelyCategory = 'defend';
    else likelyCategory = 'attack';
  } else if (aiPattern === 'tactical') {
    if (playerHpPct < 0.25 && offensiveActions.length > 0) likelyCategory = 'attack';
    else if (debuffActions.length > 0 && !state.player.statusEffects.some(e => e.type === 'weaken' || e.type === 'expose')) likelyCategory = 'debuff';
    else if (!hasBuffs && defensiveActions.length > 0) likelyCategory = 'defend';
    else likelyCategory = 'attack';
  } else if (aiPattern === 'berserker') {
    likelyCategory = 'attack';
  } else if (aiPattern === 'support') {
    if (!hasBuffs && defensiveActions.length > 0) likelyCategory = 'defend';
    else if (debuffActions.length > 0) likelyCategory = 'debuff';
    else likelyCategory = 'attack';
  }

  // Build descriptive labels based on likely action
  if (likelyCategory === 'attack') {
    // Show estimated damage from strongest available offensive action
    const strongest = offensiveActions.reduce((best, a) => a.damage > best.damage ? a : best, offensiveActions[0]);
    if (strongest) {
      const atkDmg = strongest.damage + Math.floor(enemy.attack * COMBAT.ATTACK_STAT_MULTIPLIER);
      return { icon: '⚔️', label: `Attack ~${atkDmg}`, category: 'attack' };
    }
    return { icon: '⚔️', label: 'Attacking', category: 'attack' };
  }
  if (likelyCategory === 'defend') {
    return { icon: '🛡️', label: 'Fortifying', category: 'defend' };
  }
  if (likelyCategory === 'debuff') {
    // Tell the player what type of debuff to expect
    const debuffTypes = new Set<string>();
    for (const a of debuffActions) {
      for (const eff of (a.effects || [])) {
        if (eff.type === 'stun') debuffTypes.add('Stun');
        if (eff.type === 'weaken') debuffTypes.add('Weaken');
        if (eff.type === 'expose') debuffTypes.add('Expose');
      }
    }
    const hint = [...debuffTypes].slice(0, 2).join('/');
    return { icon: '⚡', label: hint || 'Scheming', category: 'debuff' };
  }
  return { icon: '💥', label: 'Charging', category: 'special' };
}

/**
 * Process end-of-round effects (tick status effects, recover cooldowns, etc.)
 */
export function processEndOfRound(state: CombatState): CombatState {
  const newState = { ...state };

  // Process status effects and cooldowns for all combatants
  const processCombatant = (c: Combatant): Combatant => {
    const updated = { ...c };

    // Tick bleed damage
    const bleeds = updated.statusEffects.filter((e) => e.type === 'bleed');
    bleeds.forEach((b) => {
      updated.hp = Math.max(0, updated.hp - b.value);
      if (updated.hp <= 0) updated.isAlive = false;
    });

    // Heal effects (stamina)
    const heals = updated.statusEffects.filter((e) => e.type === 'heal');
    heals.forEach((h) => {
      updated.stamina = Math.min(updated.maxStamina, updated.stamina + h.value);
    });

    // HP heal effects (actual HP regeneration)
    const hpHeals = updated.statusEffects.filter((e) => e.type === 'heal_hp');
    hpHeals.forEach((h) => {
      updated.hp = Math.min(updated.maxHp, updated.hp + h.value);
    });

    // Tick down status effects
    updated.statusEffects = updated.statusEffects
      .map((e) => ({ ...e, remainingRounds: e.remainingRounds - 1 }))
      .filter((e) => e.remainingRounds > 0 && (e.type !== 'shield' || e.value > 0));

    // Tick down cooldowns
    updated.actions = updated.actions.map((a) => ({
      ...a,
      currentCooldown: Math.max(0, a.currentCooldown - 1),
    }));

    // Passive stamina recovery (base 1, dragon fruit adds more)
    const regenAmount = updated.staminaRegen || 1;
    updated.stamina = Math.min(updated.maxStamina, updated.stamina + regenAmount);

    return updated;
  };

  newState.player = processCombatant(newState.player);
  newState.enemies = newState.enemies.map(processCombatant);

  // Tick crew assist cooldowns
  newState.crewAssists = newState.crewAssists.map((ca) => ({
    ...ca,
    action: {
      ...ca.action,
      currentCooldown: Math.max(0, ca.action.currentCooldown - 1),
    },
  }));

  // Tick crew combo cooldowns
  const updatedComboCDs: Record<string, number> = {};
  for (const [comboId, cd] of Object.entries(newState.comboCooldowns)) {
    if (cd > 1) updatedComboCDs[comboId] = cd - 1;
    // If cd <= 1, it expires (don't add to map)
  }
  newState.comboCooldowns = updatedComboCDs;

  // Advance round
  newState.round += 1;

  // Check King burst
  if (newState.kingMeter >= 100) {
    newState.kingBurstAvailable = true;
  }

  return newState;
}

/**
 * Check victory/defeat conditions
 */
export function checkCombatEnd(state: CombatState): CombatPhase | null {
  // All enemies dead
  if (state.enemies.every((e) => !e.isAlive)) {
    // Check for additional waves
    if (state.encounter.waves && state.currentWave < state.encounter.waves.length) {
      return 'wave_transition';
    }
    return 'victory';
  }

  // Player dead
  if (state.player.hp <= 0) {
    return 'defeat';
  }

  // Turn limit reached
  if (state.encounter.turnLimit && state.round > state.encounter.turnLimit) {
    return 'defeat';
  }

  return null;
}

/**
 * Spawn next wave of enemies
 */
export function spawnNextWave(state: CombatState): CombatState {
  const newState = { ...state };
  const waves = state.encounter.waves;

  if (!waves || newState.currentWave >= waves.length) return newState;

  const nextWaveTemplates = waves[newState.currentWave];
  const newEnemies = nextWaveTemplates.map((t, i) => buildEnemyCombatant(t, i + 100));

  newState.enemies = [...newState.enemies.filter((e) => e.isAlive), ...newEnemies];
  newState.currentWave += 1;

  // Recalculate turn order for new round with new enemies
  newState.turnOrder = computeTurnOrder(newState);
  newState.currentTurnIndex = -1; // Fresh round starts from beginning

  return newState;
}

// ==========================================
// BOSS PHASE SYSTEM
// ==========================================

/**
 * Check if any enemy crossed a boss phase HP threshold.
 * Returns the modified state with phase narration if triggered, or null if no phase triggered.
 */
export function checkBossPhases(state: CombatState): CombatState | null {
  let result: CombatState = { ...state };
  let anyTriggered = false;

  for (const enemy of result.enemies) {
    if (!enemy.isAlive) continue;

    // Find the matching enemy template to get bossPhases
    const template = result.encounter.enemies.find((t) => enemy.id.startsWith(t.id));
    if (!template?.bossPhases) continue;

    const hpPercent = enemy.maxHp > 0 ? (enemy.hp / enemy.maxHp) * 100 : 50;

    // Sort phases by hpThreshold descending so we trigger highest first on burst damage
    const sortedPhases = [...template.bossPhases].sort((a, b) => b.hpThreshold - a.hpThreshold);

    for (const phase of sortedPhases) {
      // Skip already triggered phases (check accumulated state)
      if (result.triggeredBossPhases.includes(phase.id)) continue;

      // Check if HP crossed below the threshold
      if (hpPercent <= phase.hpThreshold) {
        anyTriggered = true;

        result.enemies = result.enemies.map((e) => {
          if (e.id !== enemy.id) return e;
          const updated = { ...e };

          // Apply stat changes
          if (phase.statChanges) {
            if (phase.statChanges.attack) updated.attack += phase.statChanges.attack;
            if (phase.statChanges.defense) updated.defense += phase.statChanges.defense;
            if (phase.statChanges.speed) updated.speed += phase.statChanges.speed;
          }

          // Heal
          if (phase.heal) {
            updated.hp = Math.min(updated.maxHp, updated.hp + phase.heal);
          }

          // Add new actions
          if (phase.newActions) {
            updated.actions = [...updated.actions, ...phase.newActions];
          }

          return updated;
        });

        // Apply AI pattern change to the encounter template (so enemy AI reads the new pattern)
        if (phase.aiPatternChange) {
          result.encounter = {
            ...result.encounter,
            enemies: result.encounter.enemies.map((t) =>
              t.id === template.id ? { ...t, aiPattern: phase.aiPatternChange! } : t
            ),
          };
        }

        // Set narration for display (last triggered phase wins for display)
        result.bossPhaseNarration = phase.narration;
        result.bossPhaseTitle = phase.name;
        result.triggeredBossPhases = [...result.triggeredBossPhases, phase.id];
        result.animating = true;

        // Add to combat log
        result.combatLog = [
          ...result.combatLog,
          {
            round: state.round,
            actor: enemy.name,
            action: phase.name,
            target: '',
            text: phase.narration[0] || `${enemy.name} enters a new phase: ${phase.name}.`,
            animation: 'screen_shake' as CombatAnimation,
          },
        ].slice(-100);
      }
    }
  }

  return anyTriggered ? result : null;
}
