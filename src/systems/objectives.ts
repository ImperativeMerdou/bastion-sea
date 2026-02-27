// =============================================
// GODTIDE: BASTION SEA - Objective / Quest System
// =============================================
// Guides the player through the game with
// clear objectives and progress tracking.
// Not a hand-hold - a compass.
// =============================================

import { GameFlags, GamePhase } from '../types/game';

export type ObjectiveStatus = 'locked' | 'active' | 'completed';

export interface Objective {
  id: string;
  title: string;
  description: string;
  phase: GamePhase;
  /** Icon/emoji for display */
  icon: string;
  /** How to check if this objective is complete */
  completionFlag: string;
  /** Flags required for this objective to become active */
  activationFlags?: string[];
  /** Objectives that must be completed first */
  requires?: string[];
  /** Category for grouping */
  category: 'main' | 'territory' | 'crew' | 'combat' | 'exploration';
  /** Hint text shown when objective is active */
  hint: string;
  /** Reward description (flavor only, actual rewards come from game systems) */
  reward?: string;
  /** Sort priority within phase (lower = higher) */
  priority: number;
}

// ==========================================
// ALL OBJECTIVES
// ==========================================

export const allObjectives: Objective[] = [
  // === PROLOGUE ===
  {
    id: 'prologue_escape',
    title: 'Break Free',
    description: 'Escape the Wardensea prison transport during the Conqueror attack.',
    phase: 'prologue',
    icon: '⛓️',
    completionFlag: 'prologue_combat_won',
    category: 'main',
    hint: 'Fight the guards. Break the chains. Find a way out.',
    priority: 1,
  },
  {
    id: 'prologue_survive',
    title: 'Reach Tavven Shoal',
    description: 'Survive the chaos and reach the nearest port.',
    phase: 'prologue',
    icon: '🏝️',
    completionFlag: 'tavven_arrival_complete',
    requires: ['prologue_escape'],
    category: 'main',
    hint: 'Follow the story. Tavven Shoal is your first destination.',
    priority: 2,
  },

  // === ACT 1 - TAVVEN SHOAL & NORTHERN ARC ===
  {
    id: 'gather_crew',
    title: 'Gather Your Crew',
    description: 'Meet and recruit the five people who will change the Bastion Sea.',
    phase: 'act1',
    icon: '👥',
    completionFlag: 'crew_recruited',
    activationFlags: ['tavven_arrival_complete'],
    category: 'crew',
    hint: 'Progress the story at Tavven Shoal. Your crew finds you.',
    priority: 3,
  },
  {
    id: 'conquer_tavven',
    title: 'Conquer Tavven Shoal',
    description: 'Take control of Tavven Shoal, your first territory. Four approaches: Force, Negotiation, Economic Pressure, or Subversion.',
    phase: 'act1',
    icon: '🏴',
    completionFlag: 'tavven_conquered',
    activationFlags: ['tavven_arrival_complete'],
    category: 'main',
    hint: 'Talk to Delvessa. Gather intelligence. Choose your approach from the Map panel.',
    reward: 'Territory income, +Reputation, first base of operations.',
    priority: 5,
  },
  {
    id: 'explore_keldriss',
    title: 'Scout Keldriss',
    description: 'Visit the smuggler\'s haven of Keldriss. See what the Shadow Market has to offer.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'keldriss_explored',
    activationFlags: ['tavven_conquered'],
    category: 'exploration',
    hint: 'Travel to Keldriss from the Map panel. It\'s a short voyage from Tavven Shoal.',
    priority: 10,
  },
  {
    id: 'explore_coppervein',
    title: 'Visit Coppervein',
    description: 'Travel to the Gorundai mining cooperative. Dragghen knows the shipyard operations here.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'coppervein_explored',
    activationFlags: ['tavven_conquered'],
    category: 'exploration',
    hint: 'Travel to Coppervein. Dragghen has history with the Kolmari shipyards there.',
    priority: 11,
  },
  {
    id: 'explore_mossbreak',
    title: 'Visit Mossbreak',
    description: 'Neutral ground. Three taverns, no rules, and a Renegade captain who lost her territory.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'mossbreak_explored',
    activationFlags: ['tavven_conquered'],
    category: 'exploration',
    hint: 'Travel to Mossbreak. It\'s a good place to gather intelligence and meet allies.',
    priority: 12,
  },
  {
    id: 'explore_durrek',
    title: 'Scout Durrek Garrison',
    description: 'Observe the Wardensea fortress. Vorreth spent two years inside. He knows it well.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'durrek_garrison_explored',
    activationFlags: ['tavven_conquered'],
    category: 'exploration',
    hint: 'Travel to Durrek Garrison. Dangerous, but the intelligence is worth it.',
    priority: 13,
  },
  {
    id: 'conquer_keldriss',
    title: 'Take the Shadow Market',
    description: 'Bring Keldriss under your influence. Control the intelligence networks.',
    phase: 'act1',
    icon: '🏴',
    completionFlag: 'keldriss_conquered',
    activationFlags: ['keldriss_explored'],
    category: 'territory',
    hint: 'Begin conquest of Keldriss from the Map panel. Keldriss requires... subtlety.',
    reward: 'Intelligence income, Reef Runner network, expanded Grimoire range.',
    priority: 20,
  },
  {
    id: 'conquer_durrek',
    title: 'Storm Durrek Garrison',
    description: 'Take the Wardensea fortress. The hardest fight in the Northern Arc.',
    phase: 'act1',
    icon: '⚔️',
    completionFlag: 'durrek_conquered',
    activationFlags: ['durrek_garrison_explored'],
    category: 'territory',
    hint: 'Begin conquest of Durrek Garrison from the Map panel. Prepare your crew and resources.',
    reward: 'Northern Arc trade routes, garrison military supplies, massive reputation.',
    priority: 25,
  },
  {
    id: 'conquer_coppervein',
    title: 'Win the Cooperative',
    description: 'Convince the Gorundai Mining Cooperative to join your alliance. Diplomacy, not force.',
    phase: 'act1',
    icon: '⛏️',
    completionFlag: 'coppervein_conquered',
    activationFlags: ['coppervein_explored'],
    category: 'territory',
    hint: 'Begin conquest of Coppervein from the Map panel. Dragghen has connections here. Use them.',
    reward: 'Copper supply chain, materials income, Gorundai loyalty.',
    priority: 30,
  },
  {
    id: 'conquer_mossbreak',
    title: 'Claim Renegade Ground',
    description: 'Turn Mossbreak from neutral ground into your fleet headquarters. Build a network.',
    phase: 'act1',
    icon: '🍺',
    completionFlag: 'mossbreak_conquered',
    activationFlags: ['mossbreak_explored'],
    category: 'territory',
    hint: 'Begin conquest of Mossbreak from the Map panel. Reputation matters here more than force.',
    reward: 'Intelligence network, recruit pool, fleet headquarters.',
    priority: 31,
  },
  {
    id: 'explore_sorrens',
    title: "Scout Sorren's Flat",
    description: 'Visit the Trade Consortium\'s island. Delvessa speaks their language, literally.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'sorrens_flat_explored',
    activationFlags: ['coppervein_explored'],
    category: 'exploration',
    hint: "Travel to Sorren's Flat from Coppervein. The Consortium trades with everyone.",
    priority: 33,
  },
  {
    id: 'explore_mirrorwater',
    title: 'Discover Mirrorwater',
    description: 'Find the hidden lagoon. Suulen says the charts hint at something remarkable.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'mirrorwater_explored',
    activationFlags: ['mossbreak_explored'],
    category: 'exploration',
    hint: 'Travel to Mirrorwater from Mossbreak. A short, calm voyage to a hidden anchorage.',
    priority: 34,
  },
  {
    id: 'talk_to_crew',
    title: 'Know Your Crew',
    description: 'Talk to each crew member. Build loyalty. Learn their stories.',
    phase: 'act1',
    icon: '💬',
    completionFlag: 'talked_to_all_crew',
    activationFlags: ['tavven_conquered'],
    category: 'crew',
    hint: 'Visit the COMMAND panel and click TALK TO on crew members with available conversations.',
    priority: 15,
  },
  {
    id: 'upgrade_territory',
    title: 'Build Your Empire',
    description: 'Construct at least one territory upgrade at a controlled island.',
    phase: 'act1',
    icon: '🏗️',
    completionFlag: 'first_upgrade_complete',
    activationFlags: ['tavven_conquered'],
    category: 'territory',
    hint: 'Open the COMMAND panel > TERRITORY tab. Select a controlled island and start an upgrade.',
    priority: 16,
  },
  {
    id: 'survive_sea_combat',
    title: 'Blood in the Water',
    description: 'Survive your first combat encounter at sea.',
    phase: 'act1',
    icon: '⚔️',
    completionFlag: 'survived_pirate_raid',
    category: 'combat',
    hint: 'Travel between islands. The sea is dangerous. Encounters happen.',
    priority: 17,
  },
  {
    id: 'northern_arc_complete',
    title: 'Master of the Northern Arc',
    description: 'Control Tavven Shoal, Keldriss, and Durrek Garrison. The Northern Arc is yours.',
    phase: 'act1',
    icon: '👑',
    completionFlag: 'northern_arc_complete',
    requires: ['conquer_tavven', 'conquer_keldriss', 'conquer_durrek'],
    category: 'main',
    hint: 'Conquer all three Northern Arc islands to complete Act 1.',
    reward: 'Unlock the Central Belt. The Conquerors notice you.',
    priority: 50,
  },

  // === CENTRAL BELT - ANVIL CAY ===
  {
    id: 'explore_anvil',
    title: 'Scout the Forge',
    description: 'Investigate Anvil Cay, the Conqueror\'s forward base in the Central Belt. Vorreth knows what to look for.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'anvil_cay_explored',
    activationFlags: ['coppervein_conquered'],
    category: 'exploration',
    hint: 'Travel to Anvil Cay from the Map panel. This is Conqueror territory, prepare accordingly.',
    priority: 35,
  },
  {
    id: 'conquer_anvil',
    title: 'Break the Anvil',
    description: 'Seize Anvil Cay and its military shipyard. Defeat Fleet Lieutenant Gharen. Declare war on the Conquerors.',
    phase: 'act1',
    icon: '⚔️',
    completionFlag: 'anvil_cay_conquered',
    activationFlags: ['anvil_cay_explored'],
    category: 'territory',
    hint: 'Begin conquest of Anvil Cay from the Map panel. The hardest fight in the Central Belt. Bring everything.',
    reward: 'Military shipyard, Conqueror intelligence, massive reputation. Vassago will respond.',
    priority: 36,
  },

  // === CENTRAL BELT - SORREN'S FLAT ===
  {
    id: 'conquer_sorrens',
    title: 'The Hostile Takeover',
    description: 'Bring Sorren\'s Flat under your flag. Delvessa has a plan: contracts, not combat.',
    phase: 'act1',
    icon: '📜',
    completionFlag: 'sorrens_conquered',
    activationFlags: ['sorrens_flat_explored'],
    category: 'territory',
    hint: 'Begin conquest of Sorren\'s Flat from the Map panel. Let Delvessa lead. This is her arena.',
    reward: 'Trade Consortium alliance, massive economic income, Delvessa\'s finest hour.',
    priority: 37,
  },

  // === CENTRAL BELT - MIRRORWATER ===
  {
    id: 'conquer_mirrorwater',
    title: 'The Hidden Haven',
    description: 'Claim Mirrorwater as your secret base. No combat, no conquest. Just building something that lasts.',
    phase: 'act1',
    icon: '🏗️',
    completionFlag: 'mirrorwater_conquered',
    activationFlags: ['mirrorwater_explored'],
    category: 'territory',
    hint: 'Begin conquest of Mirrorwater from the Map panel. Suulen has plans. Let her build.',
    reward: 'Hidden base, Sight training grounds, a place the Grimoire can\'t find.',
    priority: 38,
  },

  // === SOUTHERN REACH - WINDROW ===
  {
    id: 'explore_windrow',
    title: 'Scout Windrow',
    description: 'Visit the Southern Reach gateway. Windrow controls the wind corridor. Every ship heading south passes through their territory.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'windrow_explored',
    activationFlags: ['sorrens_conquered'],
    category: 'exploration',
    hint: 'Travel to Windrow from the Map panel. The wind corridor is the gateway to the Southern Reach.',
    priority: 39,
  },
  {
    id: 'conquer_windrow',
    title: 'Claim the Wind Corridor',
    description: 'Take control of Windrow and its wind corridor. Every ship heading south pays your toll.',
    phase: 'act1',
    icon: '🌬️',
    completionFlag: 'windrow_conquered',
    activationFlags: ['windrow_explored'],
    category: 'territory',
    hint: 'Begin conquest of Windrow from the Map panel. The council governs here. Force may not be the only option.',
    reward: 'Wind corridor toll revenue, cliff timber, Southern Reach access.',
    priority: 40,
  },

  // === SOUTHERN REACH - GHOSTLIGHT REEF ===
  {
    id: 'explore_ghostlight',
    title: 'Discover Ghostlight Reef',
    description: 'Find the bioluminescent reef. The fishing collective has a problem: something massive in the deep channels.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'ghostlight_reef_explored',
    activationFlags: ['windrow_conquered'],
    category: 'exploration',
    hint: 'Travel to Ghostlight Reef from Windrow. The reef glows at night. You can\'t miss it.',
    priority: 41,
  },
  {
    id: 'conquer_ghostlight',
    title: 'Light the Reef',
    description: 'Win over the Ghostlight fishing collective. Deal with the Leviathan. Claim the reef.',
    phase: 'act1',
    icon: '🐟',
    completionFlag: 'ghostlight_reef_conquered',
    activationFlags: ['ghostlight_reef_explored'],
    category: 'territory',
    hint: 'Begin conquest of Ghostlight Reef from the Map panel. The collective needs a protector, not a conqueror.',
    reward: 'Reef fishery supplies, bioluminescent beacon network, Leviathan materials.',
    priority: 42,
  },

  // === SOUTHERN REACH - VESS HARBOUR & NOON ISLAND ===
  {
    id: 'explore_vess',
    title: 'Scout Vess Harbour',
    description: 'Reconnaissance of the Wardensea\'s southern fortress.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'vess_harbour_explored',
    activationFlags: ['ghostlight_reef_conquered'],
    category: 'exploration',
    hint: 'Travel to Vess Harbour from the Map panel. The Wardensea\'s southern stronghold. Tread carefully.',
    priority: 43,
  },
  {
    id: 'explore_noon',
    title: 'Investigate Noon Island',
    description: 'Chart the shadowless waypoint between the southern powers.',
    phase: 'act1',
    icon: '🗺️',
    completionFlag: 'noon_island_explored',
    activationFlags: ['ghostlight_reef_conquered'],
    category: 'exploration',
    hint: 'Travel to Noon Island from the Map panel. A small, strange waypoint in the Southern Reach.',
    priority: 44,
  },

  // === CONQUEST - VESS HARBOUR & NOON ISLAND ===
  {
    id: 'conquer_vess',
    title: 'Break the Wardensea',
    description: 'Seize Vess Harbour, the Wardensea\'s southern fortress. Twelve warships. Six thousand personnel. The most audacious conquest in the Bastion Sea.',
    phase: 'act2',
    icon: '⚔️',
    completionFlag: 'vess_harbour_conquered',
    activationFlags: ['vess_harbour_explored'],
    category: 'territory',
    hint: 'Begin conquest of Vess Harbour from the Map panel. Vorreth knows the layout from his prison years. This changes everything.',
    reward: 'Capital warships, southern naval supremacy, Act 3 begins. The Wardensea declares war.',
    priority: 45,
  },
  {
    id: 'conquer_noon',
    title: 'Claim the Waypoint',
    description: 'Plant the flag on Noon Island. A small gesture, but the smallest territories are the hardest to forget.',
    phase: 'act1',
    icon: '🏝️',
    completionFlag: 'noon_island_conquered',
    activationFlags: ['noon_island_explored'],
    category: 'territory',
    hint: 'Begin conquest of Noon Island from the Map panel. Talk to Maren. This one is about conversation, not combat.',
    reward: 'Southern Reach waypoint, relay station potential, old Grimoire signal.',
    priority: 46,
  },

  // === CENTRAL BELT COMPLETION - ACT 1 → ACT 2 TRIGGER ===
  {
    id: 'central_belt_complete',
    title: 'Lord of the Central Belt',
    description: 'Control the economic heart of the Bastion Sea. The Central Belt is yours, and every faction in the region knows it.',
    phase: 'act1',
    icon: '👑',
    completionFlag: 'central_belt_secured',
    requires: ['conquer_coppervein', 'conquer_mossbreak', 'conquer_sorrens', 'conquer_anvil', 'conquer_mirrorwater'],
    category: 'main',
    hint: 'Conquer all Central Belt islands: Coppervein, Mossbreak, Sorrens Flat, Anvil Cay, and Mirrorwater.',
    reward: 'Act 2 begins. The world responds.',
    priority: 48,
  },

  // =========================================================
  // ACT 2 - THE RESPONSE
  // =========================================================

  // --- ACT 2 MAIN OBJECTIVES ---
  {
    id: 'respond_to_ultimatum',
    title: 'Answer the Admiral',
    description: 'The Wardensea has delivered an ultimatum. Admiral Vasshen demands your surrender. Respond.',
    phase: 'act2',
    icon: '📜',
    completionFlag: 'ultimatum_answered',
    activationFlags: ['act2_begun'],
    category: 'main',
    hint: 'The ultimatum scene will trigger within days of Act 2 beginning. Watch for the courier.',
    priority: 51,
  },
  {
    id: 'conqueror_decision',
    title: 'The Sixth Seat',
    description: 'A Conqueror lieutenant has made contact. Tessavarra offers an alliance, but Conqueror alliances have teeth.',
    phase: 'act2',
    icon: '🏴',
    completionFlag: 'conqueror_contacted',
    activationFlags: ['act2_begun'],
    category: 'main',
    hint: 'The Conqueror contact scene will trigger after Act 2 begins. Consider the cost of alliance.',
    priority: 52,
  },
  {
    id: 'break_blockade',
    title: 'Break the Blockade',
    description: 'The Kolmari have strangled your trade lanes. Your islands are running low. Find a way through.',
    phase: 'act2',
    icon: '🚢',
    completionFlag: 'blockade_resolved',
    activationFlags: ['ultimatum_answered'],
    category: 'main',
    hint: 'The blockade scene triggers after the ultimatum is answered. Three approaches: force, negotiation, or alternative routes.',
    priority: 53,
  },
  {
    id: 'crew_council',
    title: 'Hold the War Council',
    description: 'Gather your crew. Every voice at the table. Decide what comes next.',
    phase: 'act2',
    icon: '⚓',
    completionFlag: 'crew_council_complete',
    activationFlags: ['ultimatum_answered', 'conqueror_contacted'],
    category: 'crew',
    hint: 'The war council triggers after both the ultimatum and the Conqueror contact are resolved.',
    priority: 54,
  },
  {
    id: 'survive_first_strike',
    title: 'Survive the First Strike',
    description: 'The Wardensea is testing your defenses. Three patrol cutters at Keldriss. This is reconnaissance, but they came armed.',
    phase: 'act2',
    icon: '⚔️',
    completionFlag: 'first_strike_survived',
    activationFlags: ['crew_council_complete'],
    category: 'combat',
    hint: 'The first strike triggers after the war council. Prepare for combat.',
    priority: 55,
  },
  {
    id: 'resolve_territory_crisis',
    title: 'Hold the Line',
    description: 'Mossbreak is fracturing. Kolmari agitators, withheld harvests, a local leader demanding concessions. Handle it, or lose the island.',
    phase: 'act2',
    icon: '🔥',
    completionFlag: 'territory_crisis_resolved',
    activationFlags: ['first_strike_survived'],
    category: 'territory',
    hint: 'The territory crisis triggers after surviving the first strike. Send crew, spend resources, or crush resistance.',
    priority: 56,
  },
  {
    id: 'southern_gambit',
    title: 'Plan the Southern Gambit',
    description: 'Vess Harbour. Twelve warships. Six thousand personnel. Admiral Vasshen\'s flagship. The most audacious conquest in the Bastion Sea.',
    phase: 'act2',
    icon: '🗡️',
    completionFlag: 'southern_gambit_begun',
    activationFlags: ['territory_crisis_resolved'],
    category: 'main',
    hint: 'The final Act 2 scene, intelligence briefing on Vess Harbour. Prepare everything.',
    priority: 57,
  },

  // === SOUTHERN REACH - COMPLETION ===
  {
    id: 'southern_reach_complete',
    title: 'Lord of the Southern Reach',
    description: 'Control every island south of the Central Belt. The Southern Reach is yours.',
    phase: 'act2',
    icon: '👑',
    completionFlag: 'southern_reach_secured',
    requires: ['conquer_windrow', 'conquer_ghostlight', 'conquer_vess', 'conquer_noon'],
    category: 'main',
    hint: 'Conquer all Southern Reach islands. Vess Harbour is the final challenge.',
    reward: 'Full southern naval dominance. The old powers notice. Act 3 begins.',
    priority: 60,
  },

  // === ACT 3 - GODTIDE ===
  {
    id: 'endgame_begins',
    title: 'The Throne Room Is Empty',
    description: 'The three powers converge on your position. The endgame has begun.',
    phase: 'act3',
    icon: '⚔️',
    completionFlag: 'act3_begun',
    activationFlags: ['vess_harbour_conquered'],
    category: 'main',
    hint: 'Act 3 begins automatically after conquering Vess Harbour.',
    priority: 70,
  },
  {
    id: 'defeat_vasshen',
    title: 'Break the Admiral',
    description: 'Admiral Vasshen and the First Division are coming. Forty-eight capital warships. Meet her in battle.',
    phase: 'act3',
    icon: '🗡️',
    completionFlag: 'vasshen_confrontation_begun',
    activationFlags: ['act3_begun'],
    category: 'combat',
    hint: 'The Vasshen confrontation triggers automatically in Act 3.',
    priority: 71,
  },
  {
    id: 'resolve_conqueror_gambit',
    title: 'The Price of Allies',
    description: 'The Conqueror coalition makes its move. Honor the alliance or break it. Either way, there\'s a cost.',
    phase: 'act3',
    icon: '🏴',
    completionFlag: 'conqueror_gambit_resolved',
    activationFlags: ['vasshen_confrontation_begun'],
    category: 'main',
    hint: 'The Conqueror gambit unfolds after the Vasshen confrontation.',
    priority: 72,
  },
  {
    id: 'defeat_ironclad',
    title: 'The Machine Arrives',
    description: 'The Kolmari Confederation deploys its most devastating weapon. Steel and steam against flesh and will.',
    phase: 'act3',
    icon: '⚙️',
    completionFlag: 'ironclad_engaged',
    activationFlags: ['conqueror_gambit_resolved'],
    category: 'combat',
    hint: 'The Ironclad encounter follows the Conqueror gambit resolution.',
    priority: 73,
  },
  {
    id: 'final_council',
    title: 'The Crown or the Chain',
    description: 'Every crew member. Every choice. One table. Decide what kind of authority you want to be, and what it costs.',
    phase: 'act3',
    icon: '👑',
    completionFlag: 'final_council_complete',
    activationFlags: ['ironclad_engaged'],
    category: 'main',
    hint: 'The final war council convenes after all three faction threats are resolved.',
    priority: 74,
  },
  {
    id: 'complete_game',
    title: 'GODTIDE',
    description: 'The sea belongs to no one. But if it did, it would know your name.',
    phase: 'act3',
    icon: '🌊',
    completionFlag: 'game_complete',
    activationFlags: ['final_council_complete'],
    category: 'main',
    hint: 'The ending follows the final council. What kind of ruler are you?',
    reward: 'You built something that might last.',
    priority: 75,
  },
  {
    id: 'explore_rotstone_obj',
    title: 'The Compass Killer',
    description: 'Investigate Rotstone, the magnetic anomaly that kills compasses and swallows settlement attempts. Something ancient broadcasts from within.',
    phase: 'act3',
    icon: '🧭',
    completionFlag: 'rotstone_explored',
    activationFlags: ['noon_island_conquered'],
    category: 'exploration',
    hint: 'Travel to Rotstone after conquering Noon Island. Suulen leads the way.',
    priority: 76,
  },
];

// ==========================================
// OBJECTIVE EVALUATION
// ==========================================

/**
 * Get the status of an objective based on current game state
 */
export function getObjectiveStatus(
  objective: Objective,
  flags: GameFlags,
  completedObjectives: string[],
): ObjectiveStatus {
  // Check if completed
  if (flags[objective.completionFlag]) return 'completed';

  // Check if requirements are met
  if (objective.requires) {
    const allReqsMet = objective.requires.every((reqId) =>
      completedObjectives.includes(reqId)
    );
    if (!allReqsMet) return 'locked';
  }

  // Check activation flags
  if (objective.activationFlags) {
    const allFlagsMet = objective.activationFlags.every((flag) => flags[flag]);
    if (!allFlagsMet) return 'locked';
  }

  return 'active';
}

/**
 * Get all objectives with their current status
 */
export function evaluateObjectives(
  flags: GameFlags,
  gamePhase: GamePhase,
): { objective: Objective; status: ObjectiveStatus }[] {
  // First pass: determine which objectives are completed
  const completedIds = allObjectives
    .filter((obj) => flags[obj.completionFlag])
    .map((obj) => obj.id);

  // Check synthetic completion flags
  // "talked_to_all_crew" - check individual crew event flags
  const talkedToAll = ['delvessa_event_01_complete', 'dragghen_event_01_complete', 'kovesse_event_01_complete', 'suulen_event_01_complete', 'tessek_event_01_complete', 'orren_event_01_complete', 'vorreth_event_01_complete']
    .every((f) => flags[f]);
  if (talkedToAll && !completedIds.includes('talk_to_crew')) {
    completedIds.push('talk_to_crew');
  }

  // "northern_arc_complete" - check all three islands
  const northernComplete = flags['tavven_conquered'] && flags['keldriss_conquered'] && flags['durrek_conquered'];
  if (northernComplete && !completedIds.includes('northern_arc_complete')) {
    completedIds.push('northern_arc_complete');
  }

  // "central_belt_secured" - check all five Central Belt islands
  const centralComplete = flags['coppervein_conquered'] && flags['mossbreak_conquered'] &&
    flags['sorrens_conquered'] && flags['anvil_cay_conquered'] && flags['mirrorwater_conquered'];
  if (centralComplete && !completedIds.includes('central_belt_complete')) {
    completedIds.push('central_belt_complete');
  }

  // "southern_reach_secured" - check all four Southern Reach islands
  const southernComplete = flags['windrow_conquered'] && flags['ghostlight_reef_conquered'] &&
    flags['vess_harbour_conquered'] && flags['noon_island_conquered'];
  if (southernComplete && !completedIds.includes('southern_reach_complete')) {
    completedIds.push('southern_reach_complete');
  }

  // "act3_begun" - fires when Vess Harbour falls and phase transitions
  // (This is handled by the phase transition system, no synthetic check needed)

  // "first_upgrade_complete" - check any upgrade flag
  // (This will be set when a territory upgrade completes)

  // Second pass: evaluate all objectives
  return allObjectives
    .map((objective) => ({
      objective,
      status: getObjectiveStatus(objective, flags, completedIds),
    }))
    .sort((a, b) => {
      // Active first, then completed, then locked
      const statusOrder: Record<ObjectiveStatus, number> = {
        active: 0,
        completed: 1,
        locked: 2,
      };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return a.objective.priority - b.objective.priority;
    });
}

/**
 * Get the current "main quest" - the highest priority active main objective
 */
export function getCurrentMainObjective(
  flags: GameFlags,
  gamePhase: GamePhase,
): Objective | null {
  const evaluated = evaluateObjectives(flags, gamePhase);
  const activeMain = evaluated.find(
    (e) => e.status === 'active' && e.objective.category === 'main'
  );
  return activeMain?.objective || null;
}

/**
 * Get count of active objectives
 */
export function getActiveObjectiveCount(
  flags: GameFlags,
  gamePhase: GamePhase,
): number {
  return evaluateObjectives(flags, gamePhase).filter((e) => e.status === 'active').length;
}
