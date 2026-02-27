// =============================================
// GODTIDE: BASTION SEA - Wardensea Escalation
// =============================================
// The Wardensea doesn't forget. Your bounty grows,
// their response intensifies. Every island you take
// puts another ship on your trail.
// =============================================

import { TravelEvent } from './seaTravel';

/**
 * Calculate Wardensea threat level based on player progress.
 * Returns 0-5 scale:
 * 0 = Unknown (bounty < 10M)
 * 1 = Person of Interest (bounty 10-30M)
 * 2 = Wanted (bounty 30-60M, or 3+ islands)
 * 3 = High Priority (bounty 60-100M, or 5+ islands)
 * 4 = Kill-On-Sight (bounty 100-200M, or 7+ islands)
 * 5 = Fleet Mobilization (bounty 200M+, or 9+ islands)
 */
export function getWardenThreatLevel(bounty: number, conqueredCount: number): number {
  let level = 0;

  // Bounty-based escalation
  if (bounty >= 200000000) level = Math.max(level, 5);
  else if (bounty >= 100000000) level = Math.max(level, 4);
  else if (bounty >= 60000000) level = Math.max(level, 3);
  else if (bounty >= 30000000) level = Math.max(level, 2);
  else if (bounty >= 10000000) level = Math.max(level, 1);

  // Territory-based escalation
  if (conqueredCount >= 9) level = Math.max(level, 5);
  else if (conqueredCount >= 7) level = Math.max(level, 4);
  else if (conqueredCount >= 5) level = Math.max(level, 3);
  else if (conqueredCount >= 3) level = Math.max(level, 2);

  return level;
}

/**
 * Get the encounter ID for a Wardensea patrol based on threat level.
 */
export function getWardenEncounterId(threatLevel: number): string {
  if (threatLevel <= 1) return 'wardensea_sea_ambush';          // basic sea encounter
  if (threatLevel <= 3) return 'wardensea_escalated_patrol';    // mid-tier
  if (threatLevel <= 4) {
    // 40% chance of Templar strike at high threat
    return Math.random() < 0.4 ? 'wardensea_templar_strike' : 'wardensea_hunting_party';
  }
  // Threat 5 - alternates between hunting party and Templar strike
  return Math.random() < 0.5 ? 'wardensea_templar_strike' : 'wardensea_hunting_party';
}

/**
 * Get a non-Wardensea faction encounter based on game phase and flags.
 * Returns an encounter ID or null if no faction encounter triggers.
 */
export function getFactionEncounterId(
  gamePhase: string,
  flags: Record<string, unknown>,
): string | null {
  // Conqueror ambush - act2+ when alliance wasn't accepted
  if (
    (gamePhase === 'act2' || gamePhase === 'act3') &&
    flags['conqueror_alliance'] !== 'allied' &&
    Math.random() < 0.15
  ) {
    return 'conqueror_ambush';
  }

  // Kolmari ironclad assault - act3 when blockade was resolved by force
  if (
    gamePhase === 'act3' &&
    flags['blockade_resolved'] &&
    !flags['ironclad_assault_survived'] &&
    Math.random() < 0.2
  ) {
    return 'kolmari_ironclad_assault';
  }

  return null;
}

/**
 * Generate a travel event for a non-Wardensea faction encounter.
 * Uses the same pattern as generateWardenPatrolEvent.
 */
export function generateFactionEncounterEvent(
  encounterId: string,
): TravelEvent | null {
  if (encounterId === 'conqueror_ambush') {
    return {
      id: `faction_conqueror_${Date.now()}`,
      category: 'combat',
      title: 'CONQUEROR AMBUSH',
      description: 'The ship appears from nowhere. Black sails, no flag, running silent. A Conqueror vessel. Not merchants. Not diplomats. Sight-users who read your heading before you made it.',
      weight: 10,
      repeatable: true,
      choices: [
        {
          id: 'fight_conquerors',
          text: '"They came to the wrong sea."',
          resultText: 'Danzai sings in your grip. The Conquerors brought Sight-users and blade dancers, soldiers who read intent like text. But Karyudon\'s intent is simple: break everything.',
          triggerCombat: 'conqueror_ambush',
          infamyChange: 2,
        },
        {
          id: 'signal_parley',
          text: 'Signal for parley. Let\'s hear what they want.',
          resultText: 'You raise the white signal. The Conqueror vessel slows. A voice carries across the water, cold, precise: "The Sixth Seat is watching. This was a test of response time. You passed." They withdraw without another word. Vorreth looks uneasy.',
          loyaltyEffects: { vorreth: -2, delvessa: 2 },
          setFlags: { conqueror_tested: true },
        },
      ],
    };
  }

  if (encounterId === 'kolmari_ironclad_assault') {
    return {
      id: `faction_kolmari_${Date.now()}`,
      category: 'combat',
      title: 'KOLMARI IRONCLAD ASSAULT',
      description: 'Steam and metal on the horizon. Kolmari ironclads, armored vessels belching smoke, their hull plating too thick for conventional weapons. The Confederation sent their heaviest ships.',
      weight: 10,
      repeatable: false,
      choices: [
        {
          id: 'fight_ironclads',
          text: 'Iron breaks too. Show them.',
          resultText: 'Dragghen cracks his knuckles. "Solid construction," he says, studying the approaching ironclads. "I rate the hull plating a five. Good metal breaks loud." The powered fists and shock cannons are new. The Kolmari have been building for this fight specifically.',
          triggerCombat: 'kolmari_ironclad_assault',
          infamyChange: 4,
          bountyChange: 15000000,
        },
        {
          id: 'evade_ironclads',
          text: 'Suulen - speed over armor. Lose them.',
          resultText: 'Ironclads are slow. Suulen threads the ship through shallow channels where the heavy vessels can\'t follow. Their shock cannons fire wide, plumes of water erupting around the hull. You lose supplies in the sprint but keep the ship intact. For now.',
          effects: { supplies: -25 },
          loyaltyEffects: { suulen: 3, dragghen: -2 },
        },
      ],
    };
  }

  return null;
}

/**
 * Chance of a Wardensea encounter during travel (0-1).
 * Higher threat = more likely to be intercepted.
 * Dangerous routes increase chance.
 */
export function getWardenEncounterChance(threatLevel: number, dangerLevel: string): number {
  const baseChance: Record<number, number> = {
    0: 0.00,
    1: 0.05,
    2: 0.12,
    3: 0.20,
    4: 0.30,
    5: 0.40,
  };

  const dangerMultiplier: Record<string, number> = {
    safe: 0.3,
    moderate: 1.0,
    dangerous: 1.8,
    deadly: 2.5,
  };

  const base = baseChance[threatLevel] || 0;
  const multiplier = dangerMultiplier[dangerLevel] || 1.0;

  return Math.min(0.6, base * multiplier); // Cap at 60%
}

/**
 * Generate a Wardensea patrol travel event based on current threat level.
 * Returns a TravelEvent matching the seaTravel.ts interface.
 */
export function generateWardenPatrolEvent(threatLevel: number): TravelEvent {
  const encounterId = getWardenEncounterId(threatLevel);

  if (threatLevel <= 2) {
    return {
      id: `warden_patrol_${Date.now()}`,
      category: 'wardensea',
      title: 'WARDENSEA PATROL',
      description: 'Signal flags on the horizon. A patrol vessel adjusts its heading, toward you.',
      weight: 10,
      repeatable: true,
      choices: [
        {
          id: 'fight_patrol',
          text: 'Let them come.',
          resultText: '"Danzai\'s hungry," you say, rolling your shoulders. "Let\'s feed it."',
          triggerCombat: encounterId,
        },
        {
          id: 'evade_patrol',
          text: 'Change heading. Lose them in the shallows.',
          resultText: 'Suulen navigates through a reef passage too narrow for a warship. The patrol vessel falls behind, but you burn supplies running hard.',
          effects: { supplies: -10 },
          loyaltyEffects: { suulen: 3 },
        },
      ],
    };
  }

  if (threatLevel <= 4) {
    return {
      id: `warden_hunt_${Date.now()}`,
      category: 'wardensea',
      title: 'WARDENSEA HUNTING PARTY',
      description: 'Three ships in formation. Your bounty poster is nailed to the lead vessel\'s mast. They\'ve been looking for you specifically.',
      weight: 10,
      repeatable: true,
      choices: [
        {
          id: 'fight_hunters',
          text: 'Finally, a real fight.',
          resultText: 'Karyudon stands at the prow, Danzai across his shoulders, grinning at three warships. "You brought friends. Smart."',
          triggerCombat: encounterId,
          infamyChange: 3,
        },
        {
          id: 'run_hunters',
          text: 'Not today. Suulen - find us a way out.',
          resultText: 'Running from Wardensea costs supplies and dignity. Suulen finds an escape route through a storm front, but the crew sees you retreat. They don\'t say anything. They don\'t have to.',
          effects: { supplies: -20 },
          reputationChange: -3,
          loyaltyEffects: { suulen: 2, vorreth: -1, dragghen: -1 },
        },
      ],
    };
  }

  // Threat level 5 - fleet mobilization
  return {
    id: `warden_fleet_${Date.now()}`,
    category: 'wardensea',
    title: 'WARDENSEA FLEET MOBILIZATION',
    description: 'The horizon is full of sails. Five ships. Seven. More behind them. The entire Second Division has been mobilized. For you.',
    weight: 10,
    repeatable: true,
    choices: [
      {
        id: 'fight_fleet',
        text: '"Good. I was getting bored."',
        resultText: 'Vorreth\'s eyes snap open. "Finally." Dragghen rates the enemy fleet a four. Tessek draws Redtide and starts naming his opening technique. Delvessa starts calculating odds. Kovesse is already broadcasting. Orren\'s ears are flat but his hands are crackling. Suulen just steers into them. This is what a Conqueror\'s crew looks like.',
        triggerCombat: 'wardensea_hunting_party',
        infamyChange: 5,
        bountyChange: 10000000,
      },
      {
        id: 'tactical_retreat_fleet',
        text: 'Vorreth. Options.',
        resultText: 'Vorreth earns his keep. A combination of false signal flags, deliberate misdirection, and Suulen\'s insane reef navigation burns through your supplies and intelligence but buys you one more day of freedom. The fleet will regroup. They always do.',
        effects: { supplies: -30, intelligence: -5 },
        loyaltyEffects: { vorreth: 3, suulen: 2, kovesse: -1 },
      },
    ],
  };
}

/**
 * Get a flavor description of current threat level for UI display.
 */
export function getWardenThreatDescription(level: number): { label: string; color: string } {
  switch (level) {
    case 0: return { label: 'UNKNOWN', color: 'text-ocean-400' };
    case 1: return { label: 'PERSON OF INTEREST', color: 'text-ocean-300' };
    case 2: return { label: 'WANTED', color: 'text-amber-400' };
    case 3: return { label: 'HIGH PRIORITY', color: 'text-amber-300' };
    case 4: return { label: 'KILL ON SIGHT', color: 'text-crimson-400' };
    case 5: return { label: 'FLEET MOBILIZATION', color: 'text-crimson-300' };
    default: return { label: 'UNKNOWN', color: 'text-ocean-400' };
  }
}
