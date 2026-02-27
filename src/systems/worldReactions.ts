// =============================================
// GODTIDE: BASTION SEA - World Reaction System
// =============================================
// After conquering Tavven Shoal, the world reacts over time.
// Grimoire broadcasts, Wardensea alerts, crew observations,
// and Conqueror intelligence reports fire as notifications
// based on day count, conquest approach, and game flags.
// =============================================

import type { GamePhase, GameFlags } from '../types/game';

// --- Notification type union (matches GameNotification.type) ---

type NotificationType = 'bounty' | 'grimoire' | 'crew' | 'wardensea' | 'conqueror' | 'story';

// --- World Reaction Types ---

export interface WorldReactionTrigger {
  /** Game phase required for this reaction to fire. */
  phase: GamePhase;
  /** Minimum day count (inclusive) since game start. */
  minDay: number;
  /** Maximum day count (inclusive). Omit for no upper bound. */
  maxDay?: number;
  /** Flags that must be present and truthy (or match a specific value). */
  requiredFlags: Record<string, boolean | number | string>;
  /** Flags that must NOT be present or must be falsy. */
  excludedFlags?: Record<string, boolean | number | string>;
}

export interface WorldReactionNotification {
  type: NotificationType;
  title: string;
  message: string;
}

export interface WorldReaction {
  id: string;
  /** Human-readable label for debugging / logs. */
  label: string;
  trigger: WorldReactionTrigger;
  /** How many in-game days after the trigger condition is first met. */
  delay: number;
  notification: WorldReactionNotification;
  /** If true, this reaction fires only once per playthrough. */
  onceOnly: boolean;
}

// --- Reaction Definitions ---

export const worldReactions: WorldReaction[] = [

  // =========================================================
  // UNIVERSAL REACTIONS - fire regardless of conquest approach
  // =========================================================

  {
    id: 'universal_grimoire_day2',
    label: 'Grimoire - Tavven Shoal changes hands',
    trigger: {
      phase: 'act1',
      minDay: 2,
      requiredFlags: { tavven_conquered: true },
    },
    delay: 0,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - Tavven Shoal',
      message:
        'Tavven Shoal has changed hands. Harbor master Pettha Koss confirmed a new authority has claimed operational control of the port. Details remain sparse, more to follow.',
    },
    onceOnly: true,
  },

  {
    id: 'universal_wardensea_day3',
    label: 'Wardensea - Patrol notes new activity',
    trigger: {
      phase: 'act1',
      minDay: 3,
      requiredFlags: { tavven_conquered: true },
    },
    delay: 0,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA PATROL REPORT - Sector 7N',
      message:
        'Routine sweep of the Northern Arc flagged irregular vessel traffic at Tavven Shoal. Shore garrison has not filed its weekly compliance report. Recommend elevated monitoring until status is confirmed.',
    },
    onceOnly: true,
  },

  {
    id: 'universal_conqueror_day4',
    label: 'Conqueror intel - other crews watching',
    trigger: {
      phase: 'act1',
      minDay: 4,
      requiredFlags: { tavven_conquered: true },
    },
    delay: 0,
    notification: {
      type: 'conqueror',
      title: 'INTELLIGENCE BRIEF - Conqueror Movements',
      message:
        'At least two independent Conqueror crews operating in the Central Belt have adjusted heading toward the Northern Arc. No hostile intent confirmed, but someone taking an island draws attention. They want to know who, and whether it sticks.',
    },
    onceOnly: true,
  },

  // =========================================================
  // FORCE-SPECIFIC REACTIONS
  // =========================================================

  {
    id: 'force_wardensea_day2',
    label: 'Wardensea - Violence flagged at Tavven Shoal',
    trigger: {
      phase: 'act1',
      minDay: 2,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'force' },
    },
    delay: 0,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA ALERT - Violent Seizure Reported',
      message:
        'Multiple distress signals received from Tavven Shoal. Eyewitness reports describe an armed takeover, casualties unconfirmed. The aggressor is described as a large Oni male. Alert has been forwarded to Regional Command.',
    },
    onceOnly: true,
  },

  {
    id: 'force_grimoire_day3',
    label: 'Grimoire - KARYUDON trending',
    trigger: {
      phase: 'act1',
      minDay: 3,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'force' },
    },
    delay: 0,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - Trending: KARYUDON',
      message:
        '"KARYUDON" is circulating across Northern Arc Grimoire channels. Bounty speculation is already underway. Some users are placing bets on whether Regional Command issues a capture order by week\'s end. The name is loud, and people are listening.',
    },
    onceOnly: true,
  },

  {
    id: 'force_crew_vorreth_day5',
    label: 'Crew (Vorreth) - Wardensea response concern',
    trigger: {
      phase: 'act1',
      minDay: 5,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'force' },
    },
    delay: 0,
    notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - Tactical Observation',
      message:
        '"Captain. I spent two years inside a Wardensea facility. I know how fast their patrol rotations cycle. A violent seizure at this distance from Durrek Garrison gives us five days, maybe six, before a fast cutter arrives. We should not still be sitting in port when it does."',
    },
    onceOnly: true,
  },

  // =========================================================
  // NEGOTIATION-SPECIFIC REACTIONS
  // =========================================================

  {
    id: 'negotiation_kolmari_day2',
    label: 'Kolmari - Formal complaint about contract interference',
    trigger: {
      phase: 'act1',
      minDay: 2,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'negotiation' },
    },
    delay: 0,
    notification: {
      type: 'wardensea',
      title: 'KOLMARI TRADE AUTHORITY - Formal Complaint',
      message:
        'The Kolmari Arbiter\'s Office has filed a formal complaint regarding unauthorized renegotiation of trade contracts at Tavven Shoal. They are requesting that Wardensea enforce existing agreements. The language is careful, but the intent is clear: they want you removed.',
    },
    onceOnly: true,
  },

  {
    id: 'negotiation_grimoire_day3',
    label: 'Grimoire - New partnership model',
    trigger: {
      phase: 'act1',
      minDay: 3,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'negotiation' },
    },
    delay: 0,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - Tavven Shoal Restructuring',
      message:
        'Reports indicate Tavven Shoal is operating under a new partnership arrangement. Locals describe the transition as orderly. Kolmari representatives have gone conspicuously quiet. One merchant was quoted: "First time in years the port fees made sense."',
    },
    onceOnly: true,
  },

  {
    id: 'negotiation_crew_delvessa_day5',
    label: 'Crew (Delvessa) - Financial exposure notes',
    trigger: {
      phase: 'act1',
      minDay: 5,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'negotiation' },
    },
    delay: 0,
    notification: {
      type: 'crew',
      title: 'DELVESSA GHAL - Strategic Assessment',
      message:
        '"I\'ve reviewed the terms we offered. The margins are thin, Captain. If Tavven Shoal\'s quarterly output falls below projected yield, we absorb the loss, not the locals. It bought us goodwill, but goodwill does not pay for supplies. We need the next island to generate surplus."',
    },
    onceOnly: true,
  },

  // =========================================================
  // ECONOMIC-SPECIFIC REACTIONS
  // =========================================================

  {
    id: 'economic_kolmari_day2',
    label: 'Kolmari - Credit review notice',
    trigger: {
      phase: 'act1',
      minDay: 2,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'economic' },
    },
    delay: 0,
    notification: {
      type: 'wardensea',
      title: 'KOLMARI CREDIT BUREAU - Review Notice',
      message:
        'Kolmari Credit Bureau has initiated a formal review of all outstanding trade agreements at Tavven Shoal. Existing suppliers are being contacted regarding their contractual obligations. This is the Kolmari playbook: they strangle supply lines before they respond with force.',
    },
    onceOnly: true,
  },

  {
    id: 'economic_grimoire_day3',
    label: 'Grimoire - Trade disruption report',
    trigger: {
      phase: 'act1',
      minDay: 3,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'economic' },
    },
    delay: 0,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - Minor Trade Disruption',
      message:
        'Tavven Shoal shipping schedules have been adjusted following a change in port management. Kolmari vessels have reportedly delayed resupply runs pending contractual review. Impact on regional trade is minor, for now.',
    },
    onceOnly: true,
  },

  {
    id: 'economic_crew_suulen_day5',
    label: 'Crew (Suulen) - Kolmari retaliation intelligence',
    trigger: {
      phase: 'act1',
      minDay: 5,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'economic' },
    },
    delay: 0,
    notification: {
      type: 'crew',
      title: 'SUULEN VASSERE - Intelligence Update',
      message:
        '"I picked up chatter through the tunnel network. Kolmari has dispatched a financial assessor to the Northern Arc, someone called Tessurren Dolch. She is not here to negotiate. She is here to calculate how much it will cost to bury us. We should prepare accordingly."',
    },
    onceOnly: true,
  },

  // =========================================================
  // SUBVERSION-SPECIFIC REACTIONS
  // =========================================================

  {
    id: 'subversion_grimoire_day2',
    label: 'Grimoire - Trade report footnote (quiet)',
    trigger: {
      phase: 'act1',
      minDay: 2,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'subversion' },
    },
    delay: 0,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - Regional Trade Summary',
      message:
        'Northern Arc trade volumes remain stable. A footnote in the Tavven Shoal harbor log notes a minor change in port authority certification, filed as routine administrative transition. No further details.',
    },
    onceOnly: true,
  },

  {
    id: 'subversion_crew_vorreth_day4',
    label: 'Crew (Vorreth) - They still don\'t know',
    trigger: {
      phase: 'act1',
      minDay: 4,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'subversion' },
    },
    delay: 0,
    notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - Field Observation',
      message:
        '"Two days and not a single alert on Wardensea channels. No Grimoire chatter worth noting. They still don\'t know, Captain. The island changed hands and nobody noticed. That is either very good for us, or very bad for them."',
    },
    onceOnly: true,
  },

  {
    id: 'subversion_wardensea_day6',
    label: 'Wardensea - Regional report, nothing flagged',
    trigger: {
      phase: 'act1',
      minDay: 6,
      requiredFlags: { tavven_conquered: true, conquest_approach: 'subversion' },
    },
    delay: 0,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA REGIONAL REPORT - Sector 7N',
      message:
        'Weekly compliance report for the Northern Arc filed without incident. All port authorities responding within standard parameters. Tavven Shoal marked as nominal. No anomalies flagged. Patrol rotation unchanged.',
    },
    onceOnly: true,
  },

  // =========================================================
  // LATER GAME REACTIONS - fire regardless of approach
  // =========================================================

  {
    id: 'late_grimoire_conquerors_day8',
    label: 'Grimoire - Other Conquerors react to Tavven news',
    trigger: {
      phase: 'act1',
      minDay: 8,
      requiredFlags: { tavven_conquered: true },
    },
    delay: 0,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - Conqueror Response',
      message:
        'Grimoire channels are buzzing. At least three known Conqueror crews have publicly commented on the Tavven Shoal situation. Reactions range from dismissal to open curiosity. One anonymous post read: "One island means nothing. Two islands means a war."',
    },
    onceOnly: true,
  },

  {
    id: 'late_wardensea_registry_day10',
    label: 'Wardensea - Patrol update, Karyudon in registry',
    trigger: {
      phase: 'act1',
      minDay: 10,
      requiredFlags: { tavven_conquered: true },
    },
    delay: 0,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA NOTICE - Patrol Schedule Update',
      message:
        'Northern Arc patrol frequency increased to twice-weekly effective immediately. A new entry has been added to the Wardensea Person of Interest registry: KARYUDON, Oni, unaffiliated. Classification: Monitor. This is the first step before an active pursuit order.',
    },
    onceOnly: true,
  },

  {
    id: 'late_grimoire_speculation_day12',
    label: 'Grimoire - Who IS Karyudon?',
    trigger: {
      phase: 'act1',
      minDay: 12,
      requiredFlags: { tavven_conquered: true },
    },
    delay: 0,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - Feature Piece',
      message:
        '"Who IS Karyudon?" is trending across three Grimoire regions. No known bounty history, no prior crew affiliations, no Kolmari record. Theories are circulating: escaped prisoner, Conqueror lieutenant gone rogue, or something entirely new. The Bastion Sea is paying attention.',
    },
    onceOnly: true,
  },

  // =========================================================
  // ACT 2 REACTIONS - The world pushes back
  // =========================================================

  {
    id: 'act2_grimoire_central_belt',
    label: 'Grimoire - Central Belt coverage explosion',
    trigger: {
      phase: 'act2',
      minDay: 1,
      requiredFlags: { act2_begun: true },
    },
    delay: 1,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - THE CENTRAL BELT',
      message: 'KARYUDON now controls five islands across the Central Belt. Trade revenue under a single Conqueror authority for the first time in forty years. The Wardensea and Kolmari have issued competing statements. Grimoire traffic on this topic is up 800% in twenty-four hours.',
    },
    onceOnly: true,
  },

  {
    id: 'act2_wardensea_courier',
    label: 'Wardensea courier spotted - ultimatum incoming',
    trigger: {
      phase: 'act2',
      minDay: 1,
      requiredFlags: { act2_begun: true },
      excludedFlags: { ultimatum_answered: true },
    },
    delay: 3,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA - COURIER VESSEL SPOTTED',
      message: 'A single Wardensea cutter under white flag has been spotted approaching Tavven Shoal. No weapons visible. One officer on deck. This is a diplomatic vessel. Someone important has something to say.',
    },
    onceOnly: true,
  },

  {
    id: 'act2_conqueror_whisper',
    label: 'Conqueror contact approaching',
    trigger: {
      phase: 'act2',
      minDay: 1,
      requiredFlags: { act2_begun: true },
      excludedFlags: { conqueror_contacted: true },
    },
    delay: 4,
    notification: {
      type: 'conqueror',
      title: 'INTELLIGENCE - UNMARKED VESSEL',
      message: 'Suulen reports an unmarked vessel anchored in the shadow channel east of Tavven Shoal. No flags, no running lights. Someone is waiting for an invitation.',
    },
    onceOnly: true,
  },

  {
    id: 'act2_crew_dragghen_morale',
    label: 'Dragghen - morale observation',
    trigger: {
      phase: 'act2',
      minDay: 1,
      requiredFlags: { act2_begun: true },
    },
    delay: 5,
    notification: {
      type: 'crew',
      title: 'DRAGGHEN KOLVE - Observation',
      message: '"The islands we took are watching, Captain. Coppervein sends supply reports without being asked. Mossbreak barely talks to us. I rate our alliance cohesion a three. There is a difference between allies and subjects. If we want this to last, we need to be the kind of authority people choose."',
    },
    onceOnly: true,
  },

  {
    id: 'act2_kolmari_blockade_warning',
    label: 'Kolmari trade disruption escalates',
    trigger: {
      phase: 'act2',
      minDay: 1,
      requiredFlags: { ultimatum_answered: true },
      excludedFlags: { blockade_resolved: true },
    },
    delay: 2,
    notification: {
      type: 'wardensea',
      title: 'KOLMARI TRADE AUTHORITY - BLOCKADE NOTICE',
      message: 'Effective immediately, the Kolmari Confederation has suspended all trade agreements with territories under the authority of the fugitive KARYUDON. Supply vessels will be redirected. The squeeze has begun.',
    },
    onceOnly: true,
  },

  {
    id: 'act2_wardensea_mobilization',
    label: 'Wardensea fleet movements',
    trigger: {
      phase: 'act2',
      minDay: 1,
      requiredFlags: { crew_council_complete: true },
      excludedFlags: { first_strike_survived: true },
    },
    delay: 2,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA - FLEET MOVEMENT DETECTED',
      message: 'Multiple Wardensea vessels departing Durrek Garrison on a southern heading. Vorreth identifies the formation: Second Division Reconnaissance. Three fast cutters. They are not coming to talk.',
    },
    onceOnly: true,
  },

  {
    id: 'act2_grimoire_faction_analysis',
    label: 'Grimoire - faction analysis piece',
    trigger: {
      phase: 'act2',
      minDay: 8,
      requiredFlags: { act2_begun: true },
    },
    delay: 0,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - Analysis: The New Order',
      message: 'Opinion piece trending across all regions: \u201cKaryudon is not a Conqueror. Conquerors take islands and strip them. This Oni is building something. The question is not whether the Wardensea will respond. The question is whether they can.\u201d',
    },
    onceOnly: true,
  },

  {
    id: 'act2_suulen_southern_intel',
    label: 'Suulen - southern intelligence',
    trigger: {
      phase: 'act2',
      minDay: 1,
      requiredFlags: { crew_council_complete: true },
    },
    delay: 6,
    notification: {
      type: 'crew',
      title: 'SUULEN VASSERE - Intelligence Report',
      message: '\u201cI have been running channels south for nine days. Vess Harbour is not impregnable. It is defended by habit. Twelve warships, but only four can deploy at once. The harbor mouth is narrow. And there is a maintenance cycle that leaves the eastern dock unguarded for six hours every fourteen days.\u201d',
    },
    onceOnly: true,
  },

  // =========================================================
  // ACT 3 REACTIONS - The endgame
  // =========================================================

  {
    id: 'act3_grimoire_endgame',
    label: 'Grimoire - The Last Conqueror',
    trigger: {
      phase: 'act3',
      minDay: 1,
      requiredFlags: { act3_begun: true },
    },
    delay: 0,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - THE LAST CONQUEROR',
      message:
        'KARYUDON has taken Vess Harbour. The Wardensea\'s southern fortress has fallen for the first time in its history. Grimoire coverage has gone from regional interest to global event. Every power in the Bastion Sea is watching. Every Conqueror is calculating. The question is no longer whether this Oni can be stopped. It\'s whether anyone is willing to pay the cost.',
    },
    onceOnly: true,
  },

  {
    id: 'act3_wardensea_first_division',
    label: 'Wardensea - First Division mobilizes',
    trigger: {
      phase: 'act3',
      minDay: 1,
      requiredFlags: { act3_begun: true },
    },
    delay: 2,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA - FIRST DIVISION MOBILIZATION',
      message:
        'All stations alert: Admiral Vasshen has ordered full deployment of the First Division from Rotstone Anchorage. Forty-eight capital warships, full marine complement. Objective: recapture Vess Harbour and neutralize the renegade authority. Estimated arrival: nine days. This is not reconnaissance. This is war.',
    },
    onceOnly: true,
  },

  {
    id: 'act3_crew_vorreth_assessment',
    label: 'Vorreth - tactical assessment of incoming fleet',
    trigger: {
      phase: 'act3',
      minDay: 1,
      requiredFlags: { act3_begun: true },
    },
    delay: 3,
    notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - Strategic Assessment',
      message:
        '"Forty-eight ships sounds overwhelming. It isn\'t. The harbour mouth is a bottleneck: only six can enter abreast. Vasshen knows this. She\'ll send the vanguard to test our positions and commit the main body once she identifies weakness. We need to make sure she doesn\'t find any." He pauses. His eyes close for two seconds. Then snap open. "I was not sleeping."',
    },
    onceOnly: true,
  },

  {
    id: 'act3_conqueror_coalition',
    label: 'Conqueror coalition movements detected',
    trigger: {
      phase: 'act3',
      minDay: 1,
      requiredFlags: { act3_begun: true },
    },
    delay: 4,
    notification: {
      type: 'conqueror',
      title: 'INTELLIGENCE - CONQUEROR FLEET MOVEMENTS',
      message:
        'Multiple Conqueror crews detected massing near the Central Belt. Formation suggests coordination, not independent action. The coalition, if that\'s what it is, includes at least three named Seats. Whether they\'re here to help or to collect remains unclear.',
    },
    onceOnly: true,
  },

  {
    id: 'act3_kolmari_ironclad_report',
    label: 'Kolmari - classified vessel deployment',
    trigger: {
      phase: 'act3',
      minDay: 1,
      requiredFlags: { act3_begun: true },
    },
    delay: 5,
    notification: {
      type: 'wardensea',
      title: 'KOLMARI - CLASSIFIED VESSEL DEPLOYMENT',
      message:
        'Kolmari Confederation has authorized deployment of a classified military asset from the Sovereign Docks. Kovesse\'s signal intercepts describe something massive: hull displacement exceeding anything in the current Bastion Sea registry. Steam-powered. Iron-plated. One ship, heading south.',
    },
    onceOnly: true,
  },

  {
    id: 'act3_crew_kovesse_signal',
    label: 'Kovesse - signal intelligence on Wardensea comms',
    trigger: {
      phase: 'act3',
      minDay: 1,
      requiredFlags: { vasshen_confrontation_begun: true },
    },
    delay: 1,
    notification: {
      type: 'crew',
      title: 'KOVESSE GRENN - Signal Intelligence',
      message:
        '"I\'ve decoded Wardensea command frequencies, Captain. They\'re talking about us differently now. Before, we were \'the insurgent.\' Now the communications say \'the opposing authority.\' The language changed. That means the people writing the orders stopped thinking they could ignore us."',
    },
    onceOnly: true,
  },

  {
    id: 'act3_grimoire_faction_war',
    label: 'Grimoire - three-way conflict coverage',
    trigger: {
      phase: 'act3',
      minDay: 1,
      requiredFlags: { vasshen_confrontation_begun: true },
    },
    delay: 3,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - THREE-WAY WAR',
      message:
        'Historians will argue about when the Bastion Sea War officially began. Grimoire consensus is forming around yesterday. Three powers, three fleets, and one sea that isn\'t big enough for all of them. Karyudon sits at the center. The last conqueror, or the first king. The next ten days will decide.',
    },
    onceOnly: true,
  },

  {
    id: 'act3_crew_delvessa_numbers',
    label: 'Delvessa - financial burn-rate warning',
    trigger: {
      phase: 'act3',
      minDay: 1,
      requiredFlags: { conqueror_gambit_resolved: true },
    },
    delay: 1,
    notification: {
      type: 'crew',
      title: 'DELVESSA GHAL - Financial Report',
      message:
        '"I\'ve run the numbers three times, Captain. Our territories are generating enough revenue to sustain the fleet for seventeen more days at current burn rate. After that, we start choosing between feeding the crew and arming the ships. Whatever happens next, it needs to happen fast."',
    },
    onceOnly: true,
  },

  {
    id: 'act3_crew_suulen_deep',
    label: 'Suulen - something moving in the deep channels',
    trigger: {
      phase: 'act3',
      minDay: 1,
      requiredFlags: { ironclad_engaged: true },
    },
    delay: 1,
    notification: {
      type: 'crew',
      title: 'SUULEN VASSERE - Observation',
      message:
        '"Captain. I have been scanning with Spatial Sight since the Ironclad engagement. Something is moving in the deep channels. Not a ship, not anything I have mapped before. The displacement signature is enormous. I believe the sea itself is responding to what is happening above it. The old structures: Rotstone, Kingsrun, they are resonating."',
    },
    onceOnly: true,
  },

  {
    id: 'act3_grimoire_final',
    label: 'Grimoire - the world holds its breath',
    trigger: {
      phase: 'act3',
      minDay: 1,
      requiredFlags: { final_council_complete: true },
      excludedFlags: { game_complete: true },
    },
    delay: 1,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - THE WORLD HOLDS ITS BREATH',
      message:
        'Every Grimoire channel in the Bastion Sea has gone quiet. No commentary. No speculation. No bounty bets. For the first time in living memory, the entire network is simply watching. Whatever happens next, it won\'t be reported. It will be witnessed.',
    },
    onceOnly: true,
  },
];

// --- Reaction Check System ---

export interface WorldReactionCheckInput {
  dayCount: number;
  flags: GameFlags;
  storyHistory: string[];
  gamePhase: GamePhase;
  firedReactionIds: string[];
}

/**
 * Evaluates all world reactions against the current game state and returns
 * an array of reactions whose trigger conditions are met and that have not
 * already been fired.
 *
 * The caller is responsible for:
 * 1. Dispatching the returned reactions as notifications via `addNotification`.
 * 2. Recording the fired reaction IDs so they are not fired again.
 */
export function checkWorldReactions(input: WorldReactionCheckInput): WorldReaction[] {
  const { dayCount, flags, gamePhase, firedReactionIds } = input;
  const firedSet = new Set(firedReactionIds);

  return worldReactions.filter((reaction) => {
    // Skip already-fired once-only reactions.
    if (reaction.onceOnly && firedSet.has(reaction.id)) {
      return false;
    }

    const { trigger } = reaction;

    // Phase check.
    if (trigger.phase !== gamePhase) {
      return false;
    }

    // Day range check (minDay + delay = effective trigger day).
    const effectiveDay = trigger.minDay + reaction.delay;
    if (dayCount < effectiveDay) {
      return false;
    }
    if (trigger.maxDay !== undefined && dayCount > trigger.maxDay + reaction.delay) {
      return false;
    }

    // Required flags check.
    for (const [key, requiredValue] of Object.entries(trigger.requiredFlags)) {
      const actual = flags[key];

      if (typeof requiredValue === 'boolean') {
        // For boolean flags, truthy/falsy comparison.
        if (requiredValue && !actual) return false;
        if (!requiredValue && actual) return false;
      } else {
        // For string/number flags, strict equality.
        if (actual !== requiredValue) return false;
      }
    }

    // Excluded flags check.
    if (trigger.excludedFlags) {
      for (const [key, excludedValue] of Object.entries(trigger.excludedFlags)) {
        const actual = flags[key];

        if (typeof excludedValue === 'boolean') {
          if (excludedValue && actual) return false;
          if (!excludedValue && !actual) return false;
        } else {
          if (actual === excludedValue) return false;
        }
      }
    }

    return true;
  });
}

/**
 * Convenience helper: given the full game state shape used by the store,
 * extracts the relevant fields and runs `checkWorldReactions`.
 * Returns reactions sorted by their effective trigger day (earliest first).
 */
export function getReadyReactions(state: {
  dayCount: number;
  flags: GameFlags;
  storyHistory: string[];
  gamePhase: GamePhase;
  firedReactionIds?: string[];
}): WorldReaction[] {
  const results = checkWorldReactions({
    dayCount: state.dayCount,
    flags: state.flags,
    storyHistory: state.storyHistory,
    gamePhase: state.gamePhase,
    firedReactionIds: state.firedReactionIds ?? [],
  });

  // Sort by effective trigger day so earliest reactions fire first.
  return results.sort(
    (a, b) => (a.trigger.minDay + a.delay) - (b.trigger.minDay + b.delay)
  );
}
