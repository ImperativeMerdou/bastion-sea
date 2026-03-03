// =============================================
// GODTIDE: BASTION SEA - Random Events
// =============================================
// Events that can trigger on day advance to
// keep the world feeling dynamic and alive.
// =============================================

import type { GameFlags, GamePhase, Resources } from '../types/game';
import type { ChoiceArchetype } from './crewAdvisor';

export interface RandomEventChoice {
  id: string;
  text: string;
  /** Narrative result shown after choosing */
  resultText: string;
  /** Archetype tag for crew advisor lines */
  choiceArchetype?: ChoiceArchetype;
  /** Resource changes */
  effects?: Partial<Resources>;
  /** Loyalty changes: { crewId: amount } */
  loyaltyEffects?: Record<string, number>;
  /** Reputation change */
  reputationChange?: number;
  /** Infamy change */
  infamyChange?: number;
  /** Bounty change */
  bountyChange?: number;
  /** Flags to set */
  setFlags?: Record<string, boolean | string | number>;
  /** Triggers a combat encounter by ID */
  triggerCombat?: string;
  /** Stat check - percentage success (0-100) */
  successChance?: number;
  /** Text shown on failure */
  failText?: string;
  /** Effects applied on failure */
  failEffects?: Partial<Resources>;
  /** Equipment ID to grant on success (from equipment registry) */
  grantEquipmentId?: string;
}

export interface RandomEvent {
  id: string;
  /** Weight for random selection (higher = more likely). */
  weight: number;
  /** Game phase required. */
  phase?: GamePhase;
  /** Minimum day for this event to appear. */
  minDay?: number;
  /** Minimum bounty (in raw value) for this event to appear. */
  minBounty?: number;
  /** Flags required for this event. */
  requiredFlags?: Record<string, boolean | string | number>;
  /** Notification to show when event fires. */
  notification: {
    type: 'grimoire' | 'crew' | 'wardensea' | 'conqueror' | 'story' | 'bounty';
    title: string;
    message: string;
  };
  /** Resource changes when this event fires (auto-applied for non-choice events). */
  resourceChanges?: {
    sovereigns?: number;
    supplies?: number;
    materials?: number;
    intelligence?: number;
  };
  /** Can this event fire multiple times? */
  repeatable: boolean;
  /** Optional choices - if present, show modal instead of auto-applying. */
  choices?: RandomEventChoice[];
}

export const randomEvents: RandomEvent[] = [
  // ============================================
  // EARLY GAME - Before & During Tavven Conquest
  // ============================================
  {
    id: 'danzai_restless',
    weight: 3,
    phase: 'prologue',
    notification: {
      type: 'crew',
      title: 'THE DANZAI - Resonance',
      message: 'The greatsword hums against your back. Not a warning. Something older. Delvessa noticed. "It does that when the wind shifts from the southeast. I\'ve been tracking it." She won\'t say what she thinks it means. Not yet.',
    },
    repeatable: false,
  },
  {
    id: 'early_dock_rumors',
    weight: 4,
    phase: 'prologue',
    notification: {
      type: 'story',
      title: 'DOCK TALK',
      message: 'The fishermen at the nearest pier don\'t know who you are yet. You hear fragments: Wardensea patrols thinning in the north. A merchant guild raising tariffs at Sorrens Flat. Someone saw a Conqueror flag near Ghostlight. The Bastion Sea talks. You just have to listen.',
    },
    repeatable: true,
  },
  {
    id: 'early_suulen_scouting',
    weight: 3,
    phase: 'prologue',
    notification: {
      type: 'crew',
      title: 'SUULEN VASSERE - Reconnaissance',
      message: '"I went ahead. Mapped three approach channels to the shoal, rated by depth and patrol coverage. The eastern route is blind. No Wardensea sightlines for half a nautical mile. That\'s our way in." She hands you the chart without looking up.',
    },
    resourceChanges: { intelligence: 2 },
    repeatable: false,
  },
  {
    id: 'early_dragghen_inspection',
    weight: 3,
    phase: 'prologue',
    notification: {
      type: 'crew',
      title: 'DRAGGHEN KOLVE - Ready',
      message: 'Dragghen is on his hands and knees by the hull, running his palm along every seam. He raps his knuckles against a rivet and listens. "Combat readiness. Three out of ten." He stands, all six-foot-eight of him. "Four, once I reinforce the forward plates. Five if you give me until morning." He is already reaching for Bulkhead.',
    },
    repeatable: false,
  },
  {
    id: 'early_weather_calm',
    weight: 4,
    phase: 'prologue',
    notification: {
      type: 'story',
      title: 'CLEAR SKIES',
      message: 'A rare windless day. The sea is glass from horizon to horizon, every island reflected perfectly below the waterline. Vorreth says the old sailors called it "the Tide\'s Mirror", the one day the Bastion Sea shows you what it really looks like. Tomorrow the waves return.',
    },
    repeatable: true,
  },

  // ============================================
  // ACT 1 - Post-Tavven, Pre-Central Belt
  // ============================================

  // --- Trade & Economy ---
  {
    id: 'merchant_ship_arrives',
    weight: 3,
    phase: 'act1',
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'story',
      title: 'MERCHANT VESSEL DOCKS',
      message: 'An independent trader from the Central Belt noses into the harbor at dawn, salt-crusted hull and a captain who smells like bilge and cinnamon. She trades Southern Reach spices and Coppervein copper sheeting for berth rates half what the Wardensea charges. "You\'re cheaper and you don\'t inspect my hold," she says. Delvessa is watching from the dock, already running numbers.',
    },
    repeatable: true,
    choices: [
      {
        id: 'merchant_welcome',
        text: 'Standard berth rate. Take the trade.',
        resultText: 'Clean transaction. She\'ll be back. Delvessa marks her as reliable.',
        choiceArchetype: 'trade',
        effects: { sovereigns: 30, supplies: 5 },
      },
      {
        id: 'merchant_routes',
        text: '"Tell me your route. I\'ll give you half rates."',
        resultText: 'She talks. Two hours of navigation charts, patrol avoidance lanes, and supplier contacts. Worth more than the tariff reduction. She doesn\'t know she just paid twice.',
        choiceArchetype: 'practical',
        effects: { sovereigns: 10, intelligence: 6 },
      },
    ],
  },
  {
    id: 'fishing_bounty',
    weight: 4,
    phase: 'act1',
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'story',
      title: 'GOOD CATCH',
      message: 'The fishing boats came back heavy today, hulls riding low, decks silver with catch. The harbor smells like brine and copper. Dragghen is already in the market before the boats are tied off, trading surplus fish for hull patch materials while the fishmongers stare up at him. He haggles like a man who has been cheated before and has decided it will not happen again. The dried fish go into sealed barrels. Tessek inspects each one.',
    },
    resourceChanges: { supplies: 8 },
    repeatable: true,
  },
  {
    id: 'storm_warning',
    weight: 2,
    phase: 'act1',
    notification: {
      type: 'story',
      title: 'STORM APPROACHING',
      message: 'The barometric drop hits at midmorning. Suulen feels it before anyone sees the clouds. "Southern wall. Big. Four hours." The fishing fleet turns for port. Dragghen is already looking at you.',
    },
    repeatable: true,
    choices: [
      {
        id: 'storm_batten',
        text: 'Full lockdown. Spend what it takes.',
        resultText: 'Dragghen seals every gap. By the time the rain hits, nothing moves. Nothing is lost. The crew is tired but the holds are dry.',
        choiceArchetype: 'cautious',
        effects: { materials: -4 },
      },
      {
        id: 'storm_skeleton',
        text: 'Skeleton crew. Ride it out.',
        resultText: 'Most of the crew shelters. The storm hammers for eight hours. You lose some supplies to spray damage and a barrel comes loose below. Could have been worse.',
        choiceArchetype: 'risky',
        effects: { supplies: -6 },
      },
    ],
  },
  {
    id: 'smuggler_contact',
    weight: 2,
    phase: 'act1',
    minDay: 5,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'crew',
      title: 'SUULEN VAREK - Intelligence',
      message: '"A contact from Keldriss reached out through the tunnel network. They have materials to move, discreetly. They want a quick clean exchange and no questions."',
    },
    repeatable: true,
    choices: [
      {
        id: 'smuggler_accept',
        text: 'Accept the deal as offered.',
        resultText: 'Clean drop. No complications. Suulen handles it herself. Materials arrive before dawn.',
        choiceArchetype: 'trade',
        effects: { materials: 5, intelligence: 2 },
      },
      {
        id: 'smuggler_info',
        text: '"I want to know who they are before anything moves."',
        resultText: 'Suulen negotiates. The contact is a former Wardensea harbormaster who moved to Keldriss three years ago and has not stopped being useful since. The materials are delayed but the contact is worth more.',
        choiceArchetype: 'practical',
        effects: { materials: 3, intelligence: 7 },
        setFlags: { 'keldriss_network_contact': true },
      },
    ],
  },

  // --- Grimoire Chatter ---
  {
    id: 'grimoire_gossip_1',
    weight: 3,
    phase: 'act1',
    minDay: 3,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE CHATTER - Northern Arc',
      message: 'User @storm_watcher_89: "Heard there\'s new management at Tavven Shoal. Anyone been there recently? Is the eel stall still open? That\'s all I care about." - 2.4k reactions.',
    },
    repeatable: false,
  },
  {
    id: 'grimoire_gossip_2',
    weight: 2,
    phase: 'act1',
    minDay: 6,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE BROADCAST - Regional Rumor',
      message: 'Unconfirmed reports of Conqueror activity near Ghostlight Reef. Three vessels spotted running dark. No flags, no Grimoire signatures. The Southern Reach is getting busy.',
    },
    repeatable: false,
  },
  {
    id: 'grimoire_gossip_3',
    weight: 2,
    phase: 'act1',
    minDay: 8,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE TRENDING - Bastion Sea',
      message: '"What\'s the best island to start on?" is trending. The replies are predictable: Keldriss for smugglers, Coppervein for builders, Sorrens Flat for traders. Nobody mentions Tavven Shoal. Smart money or ignorance?',
    },
    repeatable: false,
  },

  // --- Crew Interactions ---
  {
    id: 'dragghen_repair',
    weight: 3,
    phase: 'act1',
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'crew',
      title: 'DRAGGHEN KOLVE - Crew Morale',
      message: 'Dragghen spent the morning repairing dock structures for the locals. Replaced three rotten pilings, reinforced a gangway, re-set the moorings on the south side. "If we fix their docks, they remember us. If they remember us, they talk. If they talk, we know what\'s coming before it arrives." He rates his own work a five.',
    },
    repeatable: true,
  },
  {
    id: 'kovesse_metrics',
    weight: 2,
    phase: 'act1',
    minDay: 4,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'crew',
      title: 'KOVESSE GRENN - Broadcast Report',
      message: '"Captain! Our Grimoire engagement is up 340% this week. That\'s good! The Wardensea monitoring of our Grimoire is also up 340%. That\'s... less good. But NUMBERS, Captain! NUMBERS!"',
    },
    repeatable: false,
  },
  {
    id: 'vorreth_assessment',
    weight: 2,
    phase: 'act1',
    minDay: 3,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - Daily Report',
      message: '"I have been drilling the dock workers on basic security protocols. They are not soldiers, but they can spot a Wardensea scout at two hundred meters. It is something." He says this while leaning against the harbor wall, eyes half-closed. He adds: "I have a request."',
    },
    repeatable: false,
    choices: [
      {
        id: 'vorreth_hear',
        text: '"Go ahead."',
        resultText: '"More armed men on the south pier. The approach angle is blind." You authorize it. He nods once, like he expected this, and goes to set it up. The south pier is covered by morning.',
        choiceArchetype: 'practical',
        loyaltyEffects: { vorreth: 3 },
        effects: { materials: -2 },
      },
      {
        id: 'vorreth_hold',
        text: '"We don\'t have the people. Not yet."',
        resultText: '"Understood." He doesn\'t argue. He doesn\'t push. He notes the blind spot in his report and moves on. Three days later he finds a way to cover it with two people instead of four. He does not report this as a request.',
        choiceArchetype: 'cautious',
        loyaltyEffects: { vorreth: 1 },
      },
    ],
  },
  {
    id: 'delvessa_ledger',
    weight: 2,
    phase: 'act1',
    minDay: 5,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'crew',
      title: 'DELVESSA GHAL - Financial Note',
      message: '"I\'ve been reviewing the harbor\'s account books. Pettha keeps immaculate records. There are some... interesting patterns in the historical data. I\'ll have a full report by week\'s end."',
    },
    resourceChanges: { intelligence: 3 },
    repeatable: false,
  },

  // --- World Color & Daily Life ---
  {
    id: 'hull_barnacles',
    weight: 3,
    phase: 'act1',
    minDay: 4,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'story',
      title: 'SHIP MAINTENANCE',
      message: 'Dragghen comes up from the hull inspection with a barnacle cluster the size of his fist. "She\'s been screaming for a week. Rudder housing, keel seam, probably the starboard prop channel too." He sets the cluster down. "I can do it right or I can do it fast. Tell me which one you want."',
    },
    repeatable: true,
    choices: [
      {
        id: 'hull_full',
        text: '"Do it right."',
        resultText: '"Eight out of ten," Dragghen says at sundown, wiping his hands. He rates his own work higher than he rates most things. The hull sits noticeably lighter in the water.',
        choiceArchetype: 'practical',
        effects: { materials: -5 },
      },
      {
        id: 'hull_fast',
        text: '"Do it fast. We might need to move."',
        resultText: 'Two hours. He gets most of it. "Six out of ten," he says. "Functional." He has opinions about this. He does not share them.',
        choiceArchetype: 'cautious',
        effects: { materials: -2 },
      },
    ],
  },
  {
    id: 'harbor_celebration',
    weight: 2,
    phase: 'act1',
    minDay: 6,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'story',
      title: 'HARBOR FESTIVAL',
      message: 'The dock workers organized a feast. Lanterns between the mooring posts, salt-grilled fish, a fiddler playing shanties older than the Wardensea. Pettha contributed three barrels of something she calls "harbor wine." The crew is already moving toward the noise.',
    },
    repeatable: true,
    choices: [
      {
        id: 'festival_join',
        text: 'Go. Let the crew see you in it.',
        resultText: 'You eat, drink harbor wine (it is mostly fermented fruit), and someone challenges you to a drinking contest that you win by existing. The crew comes back closer. Supplies are lower.',
        choiceArchetype: 'diplomatic',
        effects: { supplies: -6 },
        loyaltyEffects: { dragghen: 2, delvessa: 1, suulen: 1, kovesse: 2, tessek: 1, orren: 1, vorreth: 1 },
      },
      {
        id: 'festival_watch',
        text: 'Let them celebrate. You listen from the edge.',
        resultText: 'You learn things at the edge of a party that you don\'t learn in the middle of one. Three dock workers have ties to a Wardensea informant network they think is still active. Delvessa is interested.',
        choiceArchetype: 'practical',
        effects: { supplies: -2, intelligence: 3 },
      },
    ],
  },
  {
    id: 'tide_pool_find',
    weight: 2,
    phase: 'act1',
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'crew',
      title: 'KOVESSE GRENN - Discovery',
      message: '"Captain! I found something in the tide pools on the eastern shelf. Old signal equipment, pre-Wardensea, from the looks of it. Brass housings, crystal arrays, the whole setup. Suulen says she can get it working. This could extend our intelligence range by fifty percent."',
    },
    resourceChanges: { intelligence: 4, materials: 2 },
    repeatable: false,
  },
  {
    id: 'rat_infestation',
    weight: 3,
    phase: 'act1',
    minDay: 3,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'story',
      title: 'RAT PROBLEM',
      message: 'Rats got into the grain stores. Not the small island kind -- the big grey ones off merchant ships. Dragghen reports it at dawn, which means he found it at midnight and has already been thinking about it for six hours. He has two approaches.',
    },
    repeatable: true,
    choices: [
      {
        id: 'rats_hunt',
        text: 'Full sweep. Dragghen hunts them tonight.',
        resultText: 'Four hours with a lantern and a boat hook. He gets most of them and seals every gap by morning. The grain stores are safe. The smell takes longer to leave.',
        choiceArchetype: 'aggressive',
        effects: { supplies: -4 },
      },
      {
        id: 'rats_traps',
        text: 'Set traps. Let them come to us.',
        resultText: 'Twelve traps, three days. The kill count is respectable but the rats got another two days of access. More supplies lost than the sweep would have cost. Dragghen says nothing. His expression says everything.',
        choiceArchetype: 'cautious',
        effects: { supplies: -8, materials: -1 },
      },
    ],
  },
  {
    id: 'drifting_wreckage',
    weight: 2,
    phase: 'act1',
    minDay: 5,
    notification: {
      type: 'story',
      title: 'DRIFTING WRECKAGE',
      message: 'A shattered hull drifted into the harbor mouth overnight. No flag, no crew, no name. Vorreth identified the damage pattern: Wardensea cannon, close range. Whoever this was, they ran and didn\'t make it. Delvessa and Dragghen are waiting on your call.',
    },
    repeatable: true,
    choices: [
      {
        id: 'wreck_strip',
        text: 'Strip it for materials. Fast.',
        resultText: 'Two hours. Dragghen and three dock workers take everything worth taking. The hull goes under by afternoon. Whatever story it carried goes with it.',
        choiceArchetype: 'practical',
        effects: { materials: 6, sovereigns: 10 },
      },
      {
        id: 'wreck_investigate',
        text: 'Examine it first. Delvessa reads the damage.',
        resultText: 'Three hours. Delvessa finds a log fragment, partial manifest, and a merchant seal from a Sorrens Flat trading house. Vorreth cross-references the cannon angle. This ship was running from a position two miles east of where any Wardensea patrol should have been. Delvessa calls it a ghost patrol. She wants to follow up.',
        choiceArchetype: 'cautious',
        effects: { materials: 3, intelligence: 8 },
        setFlags: { 'wreckage_investigated': true },
      },
    ],
  },
  {
    id: 'kovesse_interview',
    weight: 2,
    phase: 'act1',
    minDay: 7,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE EXCLUSIVE - The Oni Captain',
      message: 'Kovesse published a profile piece. "Who Is Karyudon? A Grimoire Investigation." She interviewed dock workers, fishermen, and a Wardensea deserter. The piece describes an Oni who carries a greatsword older than most navies and whose crew would follow him into a hurricane. Engagement is through the roof.',
    },
    repeatable: false,
  },
  {
    id: 'night_fog',
    weight: 3,
    phase: 'act1',
    minDay: 2,
    notification: {
      type: 'story',
      title: 'SEA FOG',
      message: 'A heavy fog rolled in after midnight. The harbor disappeared. Ships knocked against pilings. Someone lit the old lighthouse, nobody knows who, and the beam cut a slow circle through the grey. By morning it burned off, but the unease lingers. The sea hides things in weather like that.',
    },
    repeatable: true,
  },
  {
    id: 'karyudon_training',
    weight: 2,
    phase: 'act1',
    minDay: 3,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - Observation',
      message: '"I watched you train this morning, Captain. The Danzai moves different from any weapon I have seen, and I have seen most of them. There is a weight to it that does not match the steel. When you swing, the air changes." He pauses, arms folded, eyes calm. "I do not know what that sword is, exactly. But I know it chose correctly."',
    },
    repeatable: false,
  },
  {
    id: 'pettha_supplies',
    weight: 3,
    phase: 'act1',
    minDay: 4,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'story',
      title: 'PETTHA KOSS',
      message: 'Pettha showed up at the harbor office with two carts of dried fish, rope, and tar. "This is an investment, not a gift," she says. "I expect returns. Specifically, I expect you to make sure the Wardensea doesn\'t torch my pier." She folds her arms. "Those are my terms."',
    },
    repeatable: false,
    choices: [
      {
        id: 'pettha_agree',
        text: '"Agreed. Your pier is protected."',
        resultText: 'She pushes both carts forward and walks back to her business. Delvessa notes the arrangement in the ledger under "local partnerships." Pettha notes it in whatever she uses for a ledger, probably a very good memory.',
        choiceArchetype: 'diplomatic',
        effects: { supplies: 6, materials: 3 },
        setFlags: { 'pettha_pier_deal': true },
      },
      {
        id: 'pettha_push',
        text: '"Your pier is already protected. The supplies are welcome."',
        resultText: 'She looks at you for a long moment. Then she laughs, once, short. "Fair." She pushes the carts in and walks away. The protection isn\'t in writing. Neither is the trust that just got built.',
        choiceArchetype: 'aggressive',
        effects: { supplies: 6, materials: 3 },
        reputationChange: 2,
      },
    ],
  },

  // ============================================
  // ACT 2 - CENTRAL BELT & SOUTHERN REACH
  // ============================================

  // --- Territory Management ---
  {
    id: 'territory_tax_revenue',
    weight: 4,
    phase: 'act2',
    notification: {
      type: 'story',
      title: 'TAX COLLECTION',
      message: 'Delvessa spreads the ledgers across the harbor office table. Copper Bits and Silver Spans counted, weighed, and recorded in her precise hand. Tavven paid in fish and coin. Keldriss paid in coin and attitude. Coppervein paid in raw copper and a note that says "We voted on this. 9-5." The numbers are modest. But there are numbers. People are paying taxes to a man the Wardensea calls a pirate. That is its own kind of victory.',
    },
    resourceChanges: { sovereigns: 50, supplies: 10 },
    repeatable: true,
  },
  {
    id: 'territory_dispute',
    weight: 3,
    phase: 'act2',
    notification: {
      type: 'story',
      title: 'TERRITORIAL DISPUTE',
      message: 'Two of your island governors arrived on the same morning boat and started shouting before their feet hit the dock. Fishing rights. The reef between their territories is productive enough for both, but neither will say so first. Delvessa intercepts them at the gangway and looks at you. Her expression says: your call.',
    },
    repeatable: true,
    choices: [
      {
        id: 'dispute_delvessa',
        text: 'Let Delvessa handle it.',
        resultText: '"Three hours in the harbor office. I split the reef at the tideline." She emerges looking like she aged a year. "Neither is happy. Both accepted." She pauses. "This is what governing looks like. It looks like this." Delvessa has a talent for this. It costs her something every time.',
        choiceArchetype: 'diplomatic',
        effects: { supplies: -5, intelligence: 2 },
        loyaltyEffects: { delvessa: -1 },
      },
      {
        id: 'dispute_yourself',
        text: 'Handle it yourself.',
        resultText: 'You sit them down and tell them: you both fish the reef, split the catch three ways -- two thirds to the territories, one third to the harbor fund. Neither had considered a tax solution. They accept because you are very large and very calm and neither of them wants to find out what happens if you get less calm.',
        choiceArchetype: 'aggressive',
        effects: { sovereigns: 20, supplies: -3 },
      },
    ],
  },
  {
    id: 'conqueror_sighting',
    weight: 3,
    phase: 'act2',
    minDay: 20,
    notification: {
      type: 'conqueror',
      title: 'CONQUEROR FLEET SIGHTING',
      message: 'Three Conqueror warships cutting through the Central Belt. Four nautical miles from your outer territories. Not approaching. Not avoiding. Vorreth puts down the spyglass. "Forged-tier Iron on the lead ship. God Fruit signatures on the second. They are here to be seen." He pauses. "Question is: do we let them see us looking back?"',
    },
    repeatable: true,
    choices: [
      {
        id: 'conqueror_ignore',
        text: 'Don\'t react. Log it and move on.',
        resultText: 'You note the formation, heading, and time. Delvessa adds it to the pattern analysis. The Conquerors continue their transit and disappear south. You learn nothing new. They learn nothing new. The standoff continues.',
        choiceArchetype: 'cautious',
        effects: { intelligence: 2 },
      },
      {
        id: 'conqueror_signal',
        text: 'Send a ship to shadow them. Make it obvious.',
        resultText: 'You put a single fast sloop on their wake at two miles. The lead warship adjusts course slightly -- acknowledging without engaging. Vorreth says this is Conqueror protocol for "we see your message." Delvessa says this is either an opening or a test. She cannot determine which. The intelligence yield is significant.',
        choiceArchetype: 'risky',
        effects: { intelligence: 8 },
        infamyChange: 2,
      },
    ],
  },
  {
    id: 'wardensea_probe',
    weight: 3,
    phase: 'act2',
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA RECONNAISSANCE',
      message: 'A light cutter with Wardensea markings running the perimeter near {current_island}. Vorreth: "Intelligence vessel. Hull type 3. They are mapping our patrol patterns across {territory_count} territories." He is already watching it through the glass. "Your call."',
    },
    repeatable: true,
    choices: [
      {
        id: 'probe_let_pass',
        text: 'Let it run. Don\'t engage.',
        resultText: 'You watch it complete the survey. Delvessa notes the course and timing. Next time you know where it will be and when. Sometimes information is better than an incident.',
        choiceArchetype: 'cautious',
        effects: { intelligence: 5 },
      },
      {
        id: 'probe_intercept',
        text: 'Intercept. Board and search.',
        resultText: 'Vorreth takes a fast sloop and cuts it off at the channel mouth. The Wardensea crew surrenders without a fight -- they are surveyors, not soldiers. The intelligence cache on board is considerable. The diplomatic cost is also considerable. Delvessa marks both in the ledger.',
        choiceArchetype: 'aggressive',
        effects: { intelligence: 12, materials: 2 },
        infamyChange: 3,
        bountyChange: 5000000,
      },
    ],
  },
  {
    id: 'kolmari_trade_embargo',
    weight: 2,
    phase: 'act2',
    minDay: 15,
    notification: {
      type: 'grimoire',
      title: 'KOLMARI TRADE OFFICE - Sanctions',
      message: 'The Kolmari Confederation has extended trade sanctions to all ports under Renegade control. Independent merchants face penalties for docking with you. Kovesse has the full text. She also has three ideas.',
    },
    repeatable: false,
    choices: [
      {
        id: 'embargo_absorb',
        text: 'Absorb the cost. Keep existing trade relationships.',
        resultText: 'You eat the price increase. Merchants who value your lower tariffs stay anyway -- the Confederation fine is less than the Wardensea inspection tax they were already paying. Delvessa calls this a wash. It is not a comfortable wash.',
        choiceArchetype: 'cautious',
        effects: { sovereigns: -20, supplies: -5 },
      },
      {
        id: 'embargo_smuggle',
        text: '"Kovesse. Find me the routes that avoid Kolmari customs."',
        resultText: 'She finds four. Two are barely legal, one is not legal at all, and one is "a grey area that the Confederation itself uses for internal logistics." The embargo loses most of its bite within a week. The Kolmari Trade Office files a protest on the Grimoire. Kovesse responds publicly. It is a very entertaining read.',
        choiceArchetype: 'risky',
        effects: { sovereigns: -5, intelligence: 6 },
        infamyChange: 2,
      },
    ],
  },
  {
    id: 'recruit_volunteers',
    weight: 3,
    phase: 'act2',
    notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - Personnel Report',
      message: '"Twelve volunteers this week at {current_island}. Fishermen, dock workers, a retired Wardensea marine who says she is done pretending." Vorreth pauses. "I can take them all, or I can screen for the three who will actually hold a line. Your call. Resources are different either way."',
    },
    repeatable: true,
    choices: [
      {
        id: 'recruit_all',
        text: 'Take them all. Volume matters.',
        resultText: 'Vorreth runs a hard week. Three quit. Two are quietly redirected to dock labor. Seven make it to basic. Four of those will be useful in three months. None of it is clean but all of it is movement.',
        choiceArchetype: 'aggressive',
        effects: { supplies: -8, sovereigns: -15 },
        reputationChange: 2,
      },
      {
        id: 'recruit_screen',
        text: '"Screen for three. I want people who will hold."',
        resultText: 'Vorreth selects three. The retired Wardensea marine, a dock worker who already knew how to throw a punch correctly, and a fisherman who asked the right questions during the interview. He puts them with Tessek immediately. "These three will be ready faster than twelve would have been," he says.',
        choiceArchetype: 'practical',
        effects: { supplies: -3, intelligence: 3 },
      },
    ],
  },

  // --- Grimoire Chatter Act 2 ---
  {
    id: 'grimoire_act2_debate',
    weight: 3,
    phase: 'act2',
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE TRENDING - The Oni Question',
      message: 'The Grimoire is split. Half the Bastion Sea calls Karyudon a liberator. The other half calls him a warlord with better marketing. A political commentator wrote a twelve-page analysis titled "The Difference Between a Conqueror and a King." It has 80,000 views. Kovesse is beside herself.',
    },
    repeatable: false,
  },
  {
    id: 'grimoire_act2_economy',
    weight: 2,
    phase: 'act2',
    minDay: 20,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE ANALYSIS - Trade Routes',
      message: 'Market analysts report that trade volume through Renegade-controlled waters has increased 23% since Karyudon\'s territorial expansion across {territory_count} territories. Independent merchants prefer Renegade ports: lower tariffs, fewer bribes, and nobody gets their cargo "inspected" into a {threat_desc} warehouse.',
    },
    repeatable: false,
  },
  {
    id: 'crew_moment_act2_dragghen',
    weight: 2,
    phase: 'act2',
    notification: {
      type: 'crew',
      title: 'DRAGGHEN KOLVE - Observation',
      message: '"I built a table today. For the harbor office. Oak and copper fittings. Took me four hours." He runs his hand along the surface and frowns. "Five out of ten. The joints could be tighter." He pauses. "Have not built something just to build it in three years. Forgot what it felt like. That is all I wanted to say."',
    },
    repeatable: false,
  },
  {
    id: 'crew_moment_act2_suulen',
    weight: 2,
    phase: 'act2',
    notification: {
      type: 'crew',
      title: 'SUULEN VASSERE - Navigation Note',
      message: '"Captain. I\'ve been mapping the current patterns between our territories. There\'s an undocumented deep channel that cuts travel time by thirty percent between Coppervein and the southern islands. I charted it last night. Nobody else knows it exists. Nobody else will."',
    },
    repeatable: false,
  },

  // ============================================
  // ACT 3 - ENDGAME / WAR FOOTING
  // ============================================

  {
    id: 'wardensea_full_mobilization',
    weight: 4,
    phase: 'act3',
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA - Fleet Movement',
      message: 'Kovesse cracks a Grey-band signal at 0300 hours and wakes Delvessa, who wakes you. The First Division has moved three capital ships into the Central Belt. Not patrol vessels. Capital ships: armored hulls, Iron-forged prow rams, crew complements of four hundred each. They are establishing a forward operating base at a position that puts them within striking distance of your northern territories. Vorreth reads the intelligence report once. "Two weeks to full combat readiness. Maybe less if Vasshen is pushing them."',
    },
    repeatable: true,
  },
  {
    id: 'conqueror_contact',
    weight: 3,
    phase: 'act3',
    notification: {
      type: 'conqueror',
      title: 'ENCRYPTED GRIMOIRE SIGNAL',
      message: 'An encrypted message on a frequency reserved for Conqueror Lieutenants. Kovesse cracked the header: it\'s addressed to all five Lieutenants. Subject line: "The Sixth Seat." The body is still encrypted. She\'s working on it.',
    },
    resourceChanges: { intelligence: 5 },
    repeatable: false,
  },
  {
    id: 'territory_attack_warning',
    weight: 3,
    phase: 'act3',
    notification: {
      type: 'wardensea',
      title: 'TERRITORY DEFENSE ALERT',
      message: 'Suulen\'s reef network: a {threat_desc} strike group staging near {island:random}. Three cruisers, two support ships. Testing your response times across {territory_count} territories. Delvessa has two recommendations and they cost different things.',
    },
    repeatable: true,
    choices: [
      {
        id: 'attack_reinforce',
        text: 'Reinforce the threatened territory. Full deployment.',
        resultText: 'You move everything to the threat position. The strike group assesses the response time, notes the reinforcement, and pulls back without engaging. Delvessa marks this as "deterrence success." It cost significantly to get there.',
        choiceArchetype: 'aggressive',
        effects: { supplies: -15, materials: -8 },
        reputationChange: 3,
      },
      {
        id: 'attack_scout',
        text: 'Send a fast sloop. Get eyes on their command ship.',
        resultText: 'Suulen takes the sloop herself. She comes back with formation data, flag registry, and the name of the strike group commander stenciled on the lead cruiser\'s stern. Intelligence that Delvessa calls "worth more than a territorial defense." The territory remains exposed for six hours. Nothing attacks it.',
        choiceArchetype: 'cautious',
        effects: { intelligence: 12, supplies: -4 },
      },
    ],
  },
  {
    id: 'grimoire_act3_fame',
    weight: 3,
    phase: 'act3',
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - Celebrity Status',
      message: 'Someone is selling Karyudon merchandise at Mossbreak. Wooden figurines of an Oni with a war club. Kovesse bought twelve. "For historical documentation," she says. Dragghen rates the craftsmanship a four. Delvessa pretends she doesn\'t have one on her desk. She does.',
    },
    repeatable: false,
  },
  {
    id: 'crew_moment_act3_delvessa',
    weight: 2,
    phase: 'act3',
    notification: {
      type: 'crew',
      title: 'DELVESSA GHAL - Strategic Warning',
      message: '"Captain. The numbers don\'t lie. We\'re spending more than we\'re earning. The war footing is burning through supplies at three times the peacetime rate. We need either a decisive victory or a diplomatic breakthrough within the month. I\'ve prepared three scenarios. None of them are comfortable."',
    },
    resourceChanges: { supplies: -8, intelligence: 5 },
    repeatable: false,
  },
  {
    id: 'war_footing_drain',
    weight: 4,
    phase: 'act3',
    notification: {
      type: 'story',
      title: 'WAR COSTS',
      message: 'Delvessa\'s morning report is three numbers, and none of them are good. Garrison supply costs: up 18%. Ship maintenance: up 22%. Reserve days at current burn rate: eleven. "Every ship in your navy eats," she says, tapping the ledger with one finger. "Every garrison sleeps on supplies we cannot replace at current trade rates." She closes the book. "The cost of ambition is measured in grain barrels and ship timber. We are spending both faster than we earn them."',
    },
    resourceChanges: { sovereigns: -30, supplies: -10 },
    repeatable: true,
  },
  {
    id: 'allied_fleet_arrives',
    weight: 2,
    phase: 'act3',
    minDay: 30,
    notification: {
      type: 'story',
      title: 'REINFORCEMENTS',
      message: 'Three ships round the headland at dawn, flying no flag but the pennant you designed. Independent crews from Mossbreak, honoring a pledge made over reef rum and firelight. The first captain is a Gorundai fisherwoman with forearms thicker than Dragghen\'s and a crew of twelve. The second is a retired Wardensea marine who brought her own ammunition. The third is a Khari navigator who says he can find a route through anything, and his ship\'s log says he\'s not lying. They\'re not soldiers. They\'re people who chose a side. Dragghen watches them dock and rates the first captain\'s ship a six. From him, at first sight, that is a declaration of respect.',
    },
    resourceChanges: { sovereigns: 40, supplies: 20, materials: 15 },
    repeatable: false,
  },

  // ============================================
  // INTERACTIVE EVENTS (with choices)
  // ============================================

  {
    id: 'choice_merchant_ship',
    weight: 3,
    phase: 'act1',
    minDay: 3,
    notification: {
      type: 'story',
      title: 'UNIDENTIFIED VESSEL',
      message: 'A merchant ship flying no colors has anchored just outside the harbor at {current_island}. They\'re signaling for permission to dock. Vorreth notes the hull is reinforced. Could be a trader. Could be a scout.',
    },
    repeatable: true,
    choices: [
      {
        id: 'merchant_welcome',
        text: 'Grant docking permission. Trade is trade.',
        resultText: 'The ship carries Southern Reach spices and Coppervein copper. Their captain is nervous but grateful. Fair prices, no trouble. They leave at dawn with a good impression.',
        choiceArchetype: 'trade',
        effects: { sovereigns: 20, supplies: 5 },
        reputationChange: 2,
      },
      {
        id: 'merchant_inspect',
        text: 'Allow docking, but search the ship first.',
        resultText: 'The search turns up contraband: Wardensea signal equipment hidden in grain sacks. The captain claims ignorance. You confiscate the equipment. The intelligence it contains is valuable.',
        choiceArchetype: 'cautious',
        effects: { intelligence: 5 },
        successChance: 70,
        failText: 'The search is clean. The captain is insulted. They dock, trade at marked-up prices, and leave quickly. Word of your hospitality will spread, and not favorably.',
        failEffects: { sovereigns: -10 },
      },
      {
        id: 'merchant_turn_away',
        text: 'Signal them to leave. Not worth the risk.',
        resultText: 'The ship turns and sails east without incident. Cautious. Maybe wise. You\'ll never know what was on board.',
        choiceArchetype: 'cautious',
      },
    ],
  },
  {
    id: 'choice_wardensea_informant',
    weight: 2,
    phase: 'act1',
    minDay: 8,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA DESERTER',
      message: 'A man in civilian clothes approaches Delvessa at the market. He says he\'s a Wardensea clerk who wants out. He has patrol schedules for the next month. He wants passage to the Southern Reach.',
    },
    repeatable: false,
    choices: [
      {
        id: 'informant_accept',
        text: 'Accept the trade. Patrol schedules for passage.',
        resultText: 'The schedules are genuine. Three weeks of Wardensea patrol patterns, officer rotations, and resupply windows. Delvessa is already reorganizing your travel plans around the gaps.',
        choiceArchetype: 'diplomatic',
        effects: { intelligence: 8 },
        setFlags: { wardensea_informant_helped: true },
      },
      {
        id: 'informant_refuse',
        text: 'Too convenient. Could be a plant.',
        resultText: 'He leaves. Two weeks later, Kovesse picks up a Grimoire report: a Wardensea clerk was found dead on the road to Sorrens Flat. You\'ll never know if it was the same man.',
        choiceArchetype: 'cautious',
      },
      {
        id: 'informant_bargain',
        text: 'Take the schedules, give him coin instead of passage.',
        resultText: 'He hesitates. Fifty sovereigns buys his cooperation. The patrol data is solid. Whether he makes it to the Southern Reach on his own is his problem now.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -50, intelligence: 8 },
        infamyChange: 1,
      },
    ],
  },
  {
    id: 'choice_storm_incoming',
    weight: 3,
    phase: 'act1',
    notification: {
      type: 'story',
      title: 'STORM FRONT',
      message: 'Suulen reads the pressure drop in the air itself. "Big one. Coming from the west. We have maybe four hours to prepare." The harbor is exposed on the windward side.',
    },
    repeatable: true,
    choices: [
      {
        id: 'storm_shelter',
        text: 'Batten down. Secure everything.',
        resultText: 'Four hours of frantic work. Every line doubled, every hatch sealed, cargo moved inland. When the storm hits, it hits hard. But nothing is lost. Just a day of labor.',
        choiceArchetype: 'cautious',
        effects: { supplies: -2 },
      },
      {
        id: 'storm_use_it',
        text: 'Use the storm as cover. Send scouts out under it.',
        resultText: 'Suulen takes a small boat into the chaos. She returns soaked, freezing, and carrying detailed observations of the patrol cutter anchored behind the headland. They can\'t see in this weather. Neither could they see her.',
        choiceArchetype: 'risky',
        effects: { intelligence: 4, supplies: -3 },
        successChance: 65,
        failText: 'The scouts get pushed back by the weather. One boat is lost. Everyone survives, but the supplies aboard don\'t.',
        failEffects: { supplies: -8 },
      },
    ],
  },
  {
    id: 'choice_rival_message',
    weight: 2,
    phase: 'act2',
    minDay: 15,
    notification: {
      type: 'conqueror',
      title: 'CONQUEROR ENVOY',
      message: 'A small vessel arrives under a white flag. The courier carries a sealed letter with a Conqueror Lieutenant\'s seal. The message is brief: "You have what we want. We have what you need. Name a neutral port. Bring your strategist."',
    },
    repeatable: false,
    choices: [
      {
        id: 'rival_meet',
        text: 'Accept the meeting. Bring Delvessa.',
        resultText: 'Mossbreak, three days later. The Lieutenant is younger than you expected. The proposal: shared intelligence against the Wardensea in exchange for territorial guarantees. Delvessa negotiates hard. You leave with a tentative accord and valuable fleet position data.',
        choiceArchetype: 'diplomatic',
        effects: { intelligence: 6 },
        setFlags: { conqueror_dialogue_opened: true },
        loyaltyEffects: { delvessa: 3 },
      },
      {
        id: 'rival_refuse',
        text: 'Send the courier back. No deals.',
        resultText: 'The courier leaves. The message is clear: Karyudon doesn\'t negotiate from weakness. Whether that\'s strength or stubbornness depends on what happens next.',
        choiceArchetype: 'aggressive',
        bountyChange: 5000000,
        reputationChange: 2,
      },
      {
        id: 'rival_counter',
        text: 'Send a counter-proposal: they come to us.',
        resultText: 'Bold. They accept, reluctantly. The meeting happens on your territory, on your terms. The power dynamic is established before a word is spoken. Vorreth approves.',
        choiceArchetype: 'aggressive',
        effects: { intelligence: 4 },
        setFlags: { conqueror_dialogue_opened: true },
        loyaltyEffects: { vorreth: 3 },
      },
    ],
  },
  {
    id: 'choice_crew_old_friend',
    weight: 2,
    phase: 'act1',
    minDay: 6,
    notification: {
      type: 'crew',
      title: 'DRAGGHEN KOLVE - A Face From Before',
      message: 'Dragghen is standing at the dock, very still. A woman is speaking to him. She\'s Gorundai, scarred, carrying a pack. "Someone from my old crew at the yards," he says, not turning around. "She needs help. Wardensea took everything she had."',
    },
    repeatable: false,
    choices: [
      {
        id: 'friend_help',
        text: 'Help her. Give her supplies and coin.',
        resultText: 'Dragghen doesn\'t say thank you. He doesn\'t need to. The quiet relief in his shoulders says it all. The woman leaves with supplies and a direction. Dragghen spends the rest of the night reinforcing the dock in silence. Best repair work you\'ve seen from him.',
        choiceArchetype: 'diplomatic',
        effects: { supplies: -5, sovereigns: -15 },
        loyaltyEffects: { dragghen: 8 },
      },
      {
        id: 'friend_recruit',
        text: 'Offer her work. We always need hands.',
        resultText: 'She considers. Looks at Dragghen. He nods, barely. "I can weld," she says. "Not as well as him. But I can weld." She joins the repair crew. Dragghen doesn\'t smile, but he rates her first patch job a four. From him, that is high praise.',
        choiceArchetype: 'practical',
        loyaltyEffects: { dragghen: 6 },
        effects: { supplies: -3 },
        setFlags: { dragghen_friend_hired: true },
      },
      {
        id: 'friend_refuse',
        text: 'We can\'t afford to help everyone.',
        resultText: 'Dragghen doesn\'t argue. He gives the woman food from his own rations and walks away. He doesn\'t touch a tool for two days. When he comes back, the work is the same quality. The conversation isn\'t.',
        choiceArchetype: 'cautious',
        loyaltyEffects: { dragghen: -6 },
      },
    ],
  },
  {
    id: 'choice_weapons_cache',
    weight: 2,
    phase: 'act2',
    minDay: 12,
    notification: {
      type: 'story',
      title: 'HIDDEN ARMORY',
      message: 'Kovesse found a sealed chamber beneath the harbor office at {current_island}. Pre-war construction, Wardensea design. Inside: crated weapons, ammunition, and what appears to be a prototype signal jammer. Everything is functional.',
    },
    repeatable: false,
    choices: [
      {
        id: 'cache_keep',
        text: 'Distribute the weapons to our people.',
        resultText: 'Twenty sets of arms and armor, enough to outfit a proper garrison. The signal jammer goes to Kovesse, who promises "very exciting results" within the week.',
        choiceArchetype: 'aggressive',
        effects: { materials: 10, intelligence: 3 },
        setFlags: { signal_jammer_acquired: true },
      },
      {
        id: 'cache_sell',
        text: 'Sell the weapons. We need coin more than guns.',
        resultText: 'The independent arms dealers pay well for Wardensea-grade equipment. No questions asked. The treasury swells. Vorreth looks disapproving.',
        choiceArchetype: 'trade',
        effects: { sovereigns: 80 },
        loyaltyEffects: { vorreth: -2 },
      },
      {
        id: 'cache_bait',
        text: 'Leave it. If the Wardensea comes looking, we\'ll be ready.',
        resultText: 'Delvessa sets up a monitoring system. If anyone comes for the cache, you\'ll know about it first. In the meantime, the weapons stay sealed. Insurance.',
        choiceArchetype: 'cautious',
        effects: { intelligence: 5 },
        loyaltyEffects: { delvessa: 3 },
        setFlags: { weapons_cache_trapped: true },
      },
    ],
  },
  {
    id: 'choice_grimoire_scandal',
    weight: 2,
    phase: 'act2',
    minDay: 18,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE CRISIS - Leaked Documents',
      message: 'Someone leaked internal Wardensea communications to the Grimoire network. Corruption, embezzlement, falsified patrol reports. It\'s everywhere. Kovesse is vibrating. "Captain, this is HUGE. But if we amplify it, the Wardensea will know we have Grimoire capabilities. If we stay quiet, someone else takes the credit."',
    },
    repeatable: false,
    choices: [
      {
        id: 'scandal_amplify',
        text: 'Amplify it. Maximum exposure.',
        resultText: 'Kovesse broadcasts the documents through every relay in the network. The Bastion Sea erupts. Three Wardensea officers are recalled for investigation. Your Grimoire footprint is now visible to everyone. Worth it.',
        choiceArchetype: 'risky',
        reputationChange: 6,
        bountyChange: 10000000,
        setFlags: { wardensea_scandal_amplified: true },
      },
      {
        id: 'scandal_archive',
        text: 'Save it. Use it as a bargaining chip privately.',
        resultText: 'Delvessa archives every document with annotations. "This is worth more as a threat than as a headline," she says. "When we need the Wardensea to back down from something, we\'ll have ammunition."',
        choiceArchetype: 'cautious',
        effects: { intelligence: 8 },
        loyaltyEffects: { delvessa: 3 },
        setFlags: { wardensea_leverage: true },
      },
    ],
  },
  {
    id: 'choice_mysterious_cargo',
    weight: 3,
    phase: 'act1',
    minDay: 5,
    notification: {
      type: 'story',
      title: 'UNCLAIMED CARGO',
      message: 'A crate washed ashore overnight. No markings. Heavy. When Dragghen pried it open, he found high-quality provisions sealed in wax paper, enough to last a crew for a week. No note. No explanation.',
    },
    repeatable: true,
    choices: [
      {
        id: 'cargo_use',
        text: 'Use the provisions. Don\'t question gifts.',
        resultText: 'The food is excellent. Nothing poisoned, nothing tainted. Dragghen is suspicious but rates the provisions a solid five. Whoever sent this knew exactly what a crew on the run needs.',
        choiceArchetype: 'practical',
        effects: { supplies: 10 },
      },
      {
        id: 'cargo_investigate',
        text: 'Investigate the source before touching it.',
        resultText: 'Delvessa traces the wax sealing compound to a specific supplier in Sorrens Flat. Someone there is watching. Someone with resources and an interest in your survival. "An ally we haven\'t met," she says. "Or a handler."',
        choiceArchetype: 'cautious',
        effects: { intelligence: 4, supplies: 5 },
      },
    ],
  },
  {
    id: 'choice_wardensea_defector',
    weight: 2,
    phase: 'act2',
    minDay: 14,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA DEFECTION',
      message: 'A Wardensea lieutenant has sailed into the harbor at {current_island}, alone, in a stolen patrol boat. She says she has information about an imminent strike on your {territory_count} territories. She wants protection and a fresh start.',
    },
    repeatable: false,
    choices: [
      {
        id: 'defector_welcome',
        text: 'Welcome her. Protection for information.',
        resultText: 'The intelligence is genuine and urgent: a three-pronged attack planned for next week, targeting {island:random} and your weakest holdings. You have time to prepare. The lieutenant is given quarters and watched carefully.',
        choiceArchetype: 'diplomatic',
        effects: { intelligence: 10 },
        setFlags: { wardensea_defector_sheltered: true },
        reputationChange: 2,
      },
      {
        id: 'defector_suspicious',
        text: 'Take the information but confine her to the brig.',
        resultText: 'She cooperates, barely. The information checks out against what Suulen has observed independently. But she\'ll remember the brig. Trust is a currency, and you just spent some.',
        choiceArchetype: 'aggressive',
        effects: { intelligence: 8 },
        infamyChange: 1,
      },
      {
        id: 'defector_send_back',
        text: 'Send her back. Could be a Wardensea trap.',
        resultText: 'She leaves. Delvessa watches from the harbor wall. "That was either the safest decision you\'ve ever made, or the most expensive." Two weeks later, you hear the Wardensea executed a lieutenant for treason. No name given.',
        choiceArchetype: 'cautious',
        infamyChange: 1,
      },
    ],
  },
  {
    id: 'choice_kolmari_trader',
    weight: 3,
    phase: 'act2',
    minDay: 10,
    notification: {
      type: 'story',
      title: 'KOLMARI TRADE VESSEL',
      message: 'A Kolmari Confederation merchant ship has anchored offshore at {current_island}, flying trade colors. Officially, the Kolmari don\'t trade with Renegades. Unofficially, their captain is signaling for a private meeting.',
    },
    repeatable: true,
    choices: [
      {
        id: 'kolmari_trade',
        text: 'Meet them. Business is business.',
        resultText: 'Premium goods at fair prices, plus intelligence about Kolmari fleet movements shared over drinks. "The Confederation talks about sanctions," the captain says. "The Confederation also likes money." A profitable arrangement.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -30, supplies: 15, materials: 8, intelligence: 3 },
      },
      {
        id: 'kolmari_alliance',
        text: 'Propose an ongoing arrangement.',
        resultText: 'The captain is cautious but interested. "Regular shipments, discreet docking, mutual benefit." She agrees to return monthly. The Kolmari sanctions just developed a very large hole.',
        choiceArchetype: 'diplomatic',
        effects: { sovereigns: -20, supplies: 10 },
        setFlags: { kolmari_trade_contact: true },
        reputationChange: 2,
      },
    ],
  },
  {
    id: 'choice_bounty_hunters',
    weight: 3,
    phase: 'act2',
    minDay: 12,
    notification: {
      type: 'bounty',
      title: 'BOUNTY HUNTERS',
      message: 'Vorreth identifies them first: three professionals sitting in the harbor tavern at {current_island}, pretending to be fishermen. Their boots are wrong. Their hands are wrong. Everything about them is wrong. They\'re here for the {bounty_desc} bounty.',
    },
    repeatable: true,
    choices: [
      {
        id: 'bounty_confront',
        text: 'Walk in. Let them see the Danzai.',
        resultText: 'The tavern goes quiet when you enter. The three hunters look at each other. Look at you. Look at the Danzai. "Drinks are on us," the lead hunter says. They leave at dawn and don\'t come back.',
        choiceArchetype: 'aggressive',
        bountyChange: 3000000,
        reputationChange: 1,
      },
      {
        id: 'bounty_ambush_them',
        text: 'Let Vorreth handle it. Quietly.',
        resultText: 'Vorreth and Suulen work together. Three unconscious hunters wake up on a boat headed to the Southern Reach with no weapons, no money, and a clear message.',
        choiceArchetype: 'aggressive',
        bountyChange: 2000000,
        infamyChange: 2,
        loyaltyEffects: { vorreth: 2, suulen: 2 },
      },
      {
        id: 'bounty_ignore',
        text: 'Ignore them. They\'ll figure out the odds.',
        resultText: 'They watch for two days. They see Dragghen lift a keel plate one-handed. They see Vorreth drill the garrison. They see Karyudon train with the Danzai. On the third day, their table is empty.',
        choiceArchetype: 'cautious',
      },
    ],
  },
  {
    id: 'choice_refugee_ship',
    weight: 2,
    phase: 'act2',
    notification: {
      type: 'story',
      title: 'REFUGEES',
      message: 'An overcrowded fishing boat arrives at {current_island} carrying forty people from a Wardensea-controlled island. Families. Children. They say the garrison is confiscating food and conscripting workers. They have nothing.',
    },
    repeatable: false,
    choices: [
      {
        id: 'refugee_welcome',
        text: 'Take them in. Feed them. Find them work.',
        resultText: 'Forty mouths to feed. But also forty pairs of hands. Within a week, the newcomers are integrated: fishing, building, repairing. The harbor is louder. Fuller. More alive. Dragghen builds shelters for all of them.',
        choiceArchetype: 'diplomatic',
        effects: { supplies: -15 },
        reputationChange: 6,
      },
      {
        id: 'refugee_limited',
        text: 'Help them, but they can\'t stay permanently.',
        resultText: 'You provide food, water, and a safe harbor for three days. Then you help them plot a course to Mossbreak, which is better equipped for refugees. Practical. Not cruel. Not generous.',
        choiceArchetype: 'practical',
        effects: { supplies: -5 },
        reputationChange: 2,
      },
      {
        id: 'refugee_turn_away',
        text: 'We can\'t afford the burden. Send them on.',
        resultText: 'The boat drifts south. Dragghen watches it go. He doesn\'t say anything. He doesn\'t need to. The look on his face is a sentence you\'ll carry.',
        choiceArchetype: 'cautious',
        loyaltyEffects: { dragghen: -5 },
        reputationChange: -3,
      },
    ],
  },
  {
    id: 'choice_supply_ship_attacked',
    weight: 3,
    phase: 'act2',
    minDay: 16,
    notification: {
      type: 'story',
      title: 'SUPPLY LINE DISRUPTED',
      message: 'One of your trade ships was attacked en route from the Northern Arc. The crew survived but lost the cargo. Suulen tracked the attackers to a cove two hours south. They\'re still there.',
    },
    repeatable: true,
    choices: [
      {
        id: 'supply_retaliate',
        text: 'Send a strike team. Get our cargo back.',
        resultText: 'Vorreth leads the raid. Seven pirates, well-armed but not prepared for Wardensea-trained discipline. Your cargo is recovered, plus everything they\'d stolen from others. A productive evening.',
        choiceArchetype: 'aggressive',
        effects: { supplies: 8, sovereigns: 15 },
        infamyChange: 2,
        loyaltyEffects: { vorreth: 2 },
      },
      {
        id: 'supply_negotiate',
        text: 'Send Delvessa to negotiate.',
        resultText: 'She returns with the cargo AND a protection agreement. The pirates will leave your ships alone in exchange for safe harbor rights during storms. "Everyone has a price," she says.',
        choiceArchetype: 'diplomatic',
        effects: { supplies: 5 },
        loyaltyEffects: { delvessa: 3 },
        setFlags: { pirate_non_aggression: true },
      },
      {
        id: 'supply_absorb',
        text: 'Write it off. Divert resources from another route.',
        resultText: 'The loss stings but doesn\'t cripple. You adjust supply routes and add escorts to future convoys. The cost of doing business in lawless waters.',
        choiceArchetype: 'practical',
        effects: { supplies: -5, sovereigns: -10 },
      },
    ],
  },
  {
    id: 'choice_dominion_tremor',
    weight: 2,
    phase: 'act2',
    minDay: 20,
    notification: {
      type: 'story',
      title: 'DOMINION TREMOR',
      message: 'At dawn, every Dominion user within fifty miles felt it: a pulse, deep and resonant, from somewhere in the Southern Reach. Delvessa\'s Sight flared involuntarily. Suulen\'s charts moved. Even Dragghen felt something, and he\'s barely Flicker. Something woke up down south.',
    },
    repeatable: false,
    choices: [
      {
        id: 'tremor_investigate',
        text: 'Investigate. Send scouts to the source.',
        resultText: 'Two days of tracking puts the origin near Ghostlight Reef. The deep currents there carry resonance like wire carries current. Whatever caused this pulse, it\'s connected to the reef\'s bioluminescent ecosystem. Suulen wants to see it in person.',
        choiceArchetype: 'risky',
        effects: { intelligence: 6 },
        loyaltyEffects: { suulen: 3 },
        setFlags: { dominion_tremor_investigated: true },
      },
      {
        id: 'tremor_fortify',
        text: 'Ignore the source. Fortify in case something\'s coming.',
        resultText: 'Vorreth agrees. Unknown Dominion events mean unknown threats. Your defenses tighten. Patrols double. If something comes, you\'ll be ready. If nothing comes, you\'ve lost nothing but sleep.',
        choiceArchetype: 'cautious',
        effects: { materials: -5 },
      },
    ],
  },
  {
    id: 'choice_kovesse_broadcast',
    weight: 2,
    phase: 'act2',
    minDay: 15,
    notification: {
      type: 'grimoire',
      title: 'KOVESSE GRENN - Big Idea',
      message: '"Captain. CAPTAIN. I\'ve figured out how to hijack the Wardensea\'s encrypted Grimoire channel for exactly forty-five seconds. What do you want to say to the entire Bastion Sea?"',
    },
    repeatable: false,
    choices: [
      {
        id: 'broadcast_defiance',
        text: '"The Wardensea does not speak for these waters."',
        resultText: 'Forty-five seconds of raw broadcast across every Grimoire frequency. Kovesse records the engagement metrics: 2.3 million impressions in the first hour. The Wardensea is furious. The Bastion Sea is listening.',
        choiceArchetype: 'aggressive',
        reputationChange: 5,
        bountyChange: 15000000,
        loyaltyEffects: { kovesse: 5 },
        setFlags: { wardensea_broadcast_hijacked: true },
      },
      {
        id: 'broadcast_intel',
        text: 'Don\'t broadcast. Record their traffic instead.',
        resultText: 'Forty-five seconds of unencrypted Wardensea communications captured. Troop positions, supply routes, officer assignments. Delvessa is speechless. Kovesse is disappointed but understands.',
        choiceArchetype: 'practical',
        effects: { intelligence: 12 },
        loyaltyEffects: { delvessa: 4, kovesse: -1 },
      },
      {
        id: 'broadcast_save',
        text: 'Save it. We\'ll use it when the timing is right.',
        resultText: 'Kovesse seals the exploit in a secure protocol. "Forty-five seconds, Captain. Whenever you want them." One shot. One message. One moment. It\'ll matter more later.',
        choiceArchetype: 'cautious',
        loyaltyEffects: { kovesse: 2 },
        setFlags: { grimoire_exploit_saved: true },
      },
    ],
  },
  {
    id: 'choice_storm_wreckage',
    weight: 1,
    phase: 'act2',
    minDay: 20,
    notification: {
      type: 'conqueror',
      title: 'Storm Wreckage',
      message: 'A violent squall passed through last night. Debris from a wrecked vessel drifts past, among the wreckage, something glows with Dominion energy.',
    },
    repeatable: false,
    choices: [
      {
        id: 'wreck_retrieve',
        text: 'Send a crew to retrieve the glowing object.',
        resultText: 'Pulled from the salt-soaked wreckage: an amulet of storm-glass and Dominion-infused iron. It crackles with residual tempest energy. Suulen examines it. "This was forged inside a storm. The energy is bound, not channeled. Whoever made this understood something we don\'t." It is warm to the touch.',
        choiceArchetype: 'risky',
        effects: { supplies: -3 },
        grantEquipmentId: 'stormheart_amulet',
        setFlags: { found_stormheart: true },
      },
      {
        id: 'wreck_salvage_materials',
        text: 'Focus on salvaging useful materials from the wreck.',
        resultText: 'The crew strips the wreckage efficiently. Ironwood planks, copper fittings, sealed containers of provisions. Practical, valuable, immediately useful. The glowing object sinks beneath the waves.',
        choiceArchetype: 'practical',
        effects: { materials: 12, supplies: 8 },
      },
    ],
  },
  // ============================================
  // ACT 2-3: WORLD NEWS - Things Happening Beyond the Player
  // ============================================

  // --- Conqueror Rumors ---
  {
    id: 'world_conqueror_daeshara',
    weight: 2,
    phase: 'act2',
    minDay: 14,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE CHATTER - Conqueror Movement',
      message: 'Kovesse picks up a thread on the Black-band frequencies: Nettava Daeshara has tripled her eastern garrison. The Irontread Horde is moving heavy equipment through mountain passes that haven\'t seen traffic in six years. Kolmari ore interests in the region are quietly pulling their surveyors out. "When a Conqueror moves equipment," Kovesse says, "everyone else moves their people."',
    },
    repeatable: false,
  },
  {
    id: 'world_conqueror_kuldhara',
    weight: 2,
    phase: 'act2',
    minDay: 18,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE REPORT - Sennaku Highlands',
      message: 'Weather stations across the eastern Bastion Sea report a 40% increase in storm activity originating from the Sennaku Highlands. Kuldhara Mabaan\'s emotional weather link is getting worse. Kovesse says the local fishermen have a saying: "When the Living Storm sleeps badly, we all get wet." Nobody knows what\'s keeping her up at night.',
    },
    repeatable: false,
  },
  {
    id: 'world_conqueror_goltieri',
    weight: 2,
    phase: 'act2',
    minDay: 22,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE INTELLIGENCE - Montalvo Bureau',
      message: 'Delvessa intercepts a peculiar Grimoire thread: the Smiling Sovereign, Dessaren Goltieri, just tried to recruit a bartender at Selvaggio. The bartender said no. This is the fourth recruitment attempt this year that ended in polite refusal. Kovesse is fascinated. "The most dangerous intelligence operative alive, and he can\'t hire a bartender. There\'s a lesson in that."',
    },
    repeatable: false,
  },
  {
    id: 'world_conqueror_vassago',
    weight: 2,
    phase: 'act2',
    minDay: 16,
    notification: {
      type: 'conqueror',
      title: 'WARDENSEA INTERCEPT - Bastion Fleet',
      message: 'Suulen picks up a Wardensea signal report: Vassago Moren\'s Bastion Fleet was spotted in the Denn Corridor running exercises with live ammunition. Seventeen ships. Twenty-four hundred fighters. Firepower that makes the Wardensea lose sleep. Vorreth reads the report twice. "He is not practicing. He is reminding."',
    },
    repeatable: false,
  },
  {
    id: 'world_conqueror_senmovar',
    weight: 2,
    phase: 'act3',
    notification: {
      type: 'conqueror',
      title: 'DEEP KINGSRUN REPORT',
      message: 'A merchant crew limps into Coppervein with a strange report: they saw Senmovar\'s Undertow running patrol at twice the normal frequency in the deep Kingsrun. Six ships covering waters they usually leave empty. The captain is 241 years old and has never changed his patrol pattern. Until now. Suulen unfolds a chart and stares at it for a long time. "Something is happening past the Threshold. Something he can feel and we can\'t."',
    },
    repeatable: false,
  },

  // --- Kingsrun News ---
  {
    id: 'world_kingsrun_season',
    weight: 3,
    phase: 'act2',
    minDay: 10,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - KINGSRUN WATCH',
      message: '"Kingsrun season opens in three weeks. Forty-two crews registered at Selvaggio. Odds on anyone reaching the Threshold: eighteen to one. Odds on anyone making it past Ossengaard without getting their cargo \'inspected\' into a Wardensea warehouse: four to one. Betting pools are open. I don\'t endorse gambling. I endorse information." -- Kingsrun Watch, daily digest.',
    },
    repeatable: false,
  },
  {
    id: 'world_kingsrun_brannach',
    weight: 2,
    phase: 'act2',
    minDay: 20,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE CHATTER - Kingsrun Stops',
      message: 'Black-band thread: a rookie crew got stuck at Brannach for two weeks. Went in for volcanic ore, came out with sulfur burns and a newfound respect for Gorundai miners. Their captain posted a review on the Grimoire: "The food tastes like someone seasoned it with a volcano. Because they did. Three out of ten, would not recommend." Fourteen thousand reactions.',
    },
    repeatable: false,
  },
  {
    id: 'world_kingsrun_ossengaard',
    weight: 2,
    phase: 'act2',
    minDay: 24,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - KINGSRUN NEWS',
      message: 'Kingsrun Watch reports that Ossengaard fortress has turned back seventeen crews this season. High Commandant Belvan Orech asked each captain the same question he\'s asked for twenty years: "Where are you going, and is it worth dying for?" One captain reportedly answered "I\'m going to find better food than yours." He was not turned back. He was promoted to Belvan\'s personal list of interesting people.',
    },
    repeatable: false,
  },
  {
    id: 'world_kingsrun_casualty',
    weight: 2,
    phase: 'act3',
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - KINGSRUN WATCH',
      message: 'A crew called the Pale Current went dark past Kassuran Spire eleven days ago. No Grimoire signal. No wreckage. Nothing. That\'s three crews lost in the deep Kingsrun this season. The commentators argue about deepcallers and currents. The captains who\'ve been past Kassuran don\'t argue. They just drink and stare at the wall.',
    },
    repeatable: false,
  },

  // --- Cursed Generation Sightings ---
  {
    id: 'world_cg_tomoe',
    weight: 2,
    phase: 'act2',
    minDay: 16,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE TRENDING - Cursed Generation',
      message: 'Kovesse flags a trending thread: the Gannet Crew was spotted near Gallun\'s Tooth. Captain Tomoe Gallacs, the Khari with the stolen Wardensea coat and the four-second Sight, reportedly talked her way past a Wardensea checkpoint by predicting the officer\'s next three sentences before he said them. The clip has 900,000 views. Kovesse is jealous of the engagement numbers.',
    },
    repeatable: false,
  },
  {
    id: 'world_cg_mavrokka',
    weight: 2,
    phase: 'act2',
    minDay: 20,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - BOUNTY UPDATE',
      message: 'The Deshanni Reapers just punched through a Wardensea blockade near the Central Belt. Captain Mavrokka Deshaan, the half-Oni with the broken horn and the Bull Fruit, reportedly told her crew: "The blockade is a suggestion." Her bounty went up by 30 million. A commentator named Drussara Kenn published a breakdown: "The MEAB formula says that\'s 25% combat, 20% territorial disruption, and 55% making the Wardensea look stupid."',
    },
    repeatable: false,
  },

  // --- Civilian Life & Cross-Racial Friction ---
  {
    id: 'world_nettleworks_news',
    weight: 2,
    phase: 'act2',
    minDay: 12,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - THALVERIS LOCAL',
      message: 'The Reckoning reports labor unrest in the Nettleworks. Rathai workers in the Chalkwall sub-district are refusing overtime shifts. "We built it, didn\'t name it," says a floor supervisor quoted anonymously. "We keep it running, don\'t get paid for it." The Wardensea garrison has been asked to monitor. One point eight million people in converted drainage tunnels. The monitoring should be interesting.',
    },
    repeatable: false,
  },
  {
    id: 'world_gorundai_furniture',
    weight: 3,
    phase: 'act1',
    minDay: 4,
    requiredFlags: { tavven_conquered: true },
    notification: {
      type: 'story',
      title: 'HARBOR INCIDENT',
      message: 'A Gorundai merchant broke a third chair in Pettha\'s harbor office this week. Gorundai bone density adds thirty to fifty pounds to their frame that you can\'t see, and standard-issue harbor furniture is not built for it. Pettha had Dragghen reinforce every seat in the office with copper bracing. "I\'m not buying new chairs every month," she said. Dragghen rates the reinforcement a seven. From him, that is practically a standing ovation.',
    },
    repeatable: false,
  },
  {
    id: 'world_oni_volume',
    weight: 2,
    phase: 'act2',
    notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - Diplomatic Incident',
      message: '"Captain. There has been a complaint from the Varrek traders at the eastern pier. They say our morning drills are, and I quote, acoustically distressing. They are measuring the decibel levels with a device I have not seen before. I have explained that an Oni captain conducts his crew at Oni volume. They have asked if there is a lower setting." He pauses. "There is not."',
    },
    repeatable: false,
  },
  {
    id: 'world_thalessi_morventhi',
    weight: 2,
    phase: 'act2',
    minDay: 15,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE CHATTER - Family Dinner',
      message: 'A trending thread on the Gold-band: a Thalessi archivist and her Morventhi cousin had their annual dinner at Vethara. It followed the usual pattern. Polite questions. Competitive references to ancestry. A debate about archival methodology that lasted ninety minutes. They parted with promises to do this again next year. Both parties have been saying this for forty-seven years. Neither has missed one.',
    },
    repeatable: false,
  },
  {
    id: 'world_power_scaling',
    weight: 2,
    phase: 'act2',
    minDay: 18,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE TRENDING - Power Rankings',
      message: 'The Iron vs. Sight debate hit its fourteenth year this week on the Black-band forums. A commentator named Hollenne Tavk, who has never left Selvaggio in her life, predicted the outcome of three Wardensea engagements using nothing but publicly available bounty data. She was right every time. A professional analyst named Gorune Vassik, who actually watches the footage, was right once. Nobody can explain this. Kovesse is investigating.',
    },
    repeatable: false,
  },
  {
    id: 'world_reform_congress',
    weight: 2,
    phase: 'act2',
    minDay: 22,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - POLITICAL UPDATE',
      message: 'Kollivaan Gesst\'s latest broadcast on The Reckoning drew 22 million listeners. Speaker Selvane\'s response drew 18 million. The Reform Congress is having a popularity contest it didn\'t schedule. Gesst gains two or three chapters per year. At this rate, the man who broadcasts from a closet in the Nettleworks will have a voting majority in four years. Delvessa calls it "the most dangerous arithmetic in the world."',
    },
    repeatable: false,
  },
  {
    id: 'world_bounty_culture',
    weight: 3,
    phase: 'act2',
    minDay: 14,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE CHATTER - Bounty Board',
      message: 'Every bounty announcement for the past eleven years has received a "first" comment within three seconds from the same anonymous account. Nobody knows who runs it. The Wardensea investigated twice and found nothing. A Varrek data analyst proved statistically that the response time is physically impossible from any single location. The account is called @before_the_ink_dries. It has 6 million followers. It has never posted anything else.',
    },
    repeatable: false,
  },

  // ============================================
  // FOLLOW-UP EVENTS - Payoffs for earlier choices
  // ============================================
  {
    id: 'followup_informant_payoff',
    weight: 3,
    phase: 'act2',
    minDay: 18,
    requiredFlags: { wardensea_informant_helped: true },
    notification: {
      type: 'wardensea',
      title: 'THE INFORMANT\'S GIFT',
      message: 'A sealed package arrives at the Harbor Board, no return address. Inside: updated Wardensea patrol routes and a note in familiar handwriting. "Made it to the Southern Reach. Thought you could use these. Burn this note."',
    },
    repeatable: false,
    resourceChanges: { intelligence: 12 },
  },
  {
    id: 'followup_conqueror_intel',
    weight: 2,
    phase: 'act2',
    minDay: 22,
    requiredFlags: { conqueror_dialogue_opened: true },
    notification: {
      type: 'conqueror',
      title: 'CONQUEROR CHANNEL',
      message: 'The unofficial channel you opened with the Conqueror Lieutenant pays off. A coded message arrives through Kovesse\'s Grimoire relay: Wardensea fleet movements for the next two weeks. Delvessa is already updating the charts.',
    },
    repeatable: false,
    choices: [
      {
        id: 'conqueror_share_back',
        text: 'Share our patrol data in return. Keep the channel alive.',
        resultText: 'Delvessa packages sanitized intelligence and sends it through the relay. The channel stays open. Having eyes on both sides of the Bastion Sea is worth more than any single battle.',
        choiceArchetype: 'diplomatic',
        effects: { intelligence: 10 },
        reputationChange: 1,
      },
      {
        id: 'conqueror_take_only',
        text: 'Accept the intel. Give nothing back.',
        resultText: 'Free intelligence is free intelligence. Whether the channel survives your silence is another question.',
        choiceArchetype: 'aggressive',
        effects: { intelligence: 10 },
        infamyChange: 1,
      },
    ],
  },
  {
    id: 'followup_kolmari_return',
    weight: 3,
    phase: 'act2',
    minDay: 20,
    requiredFlags: { kolmari_trade_contact: true },
    notification: {
      type: 'story',
      title: 'THE KOLMARI RETURNS',
      message: 'The Kolmari merchant captain keeps her word. Her ship appears at dawn, holds full. She\'s brought premium goods at below-market prices and a warning: "The Confederation is watching your expansion. I can keep coming, but the window is closing."',
    },
    repeatable: false,
    choices: [
      {
        id: 'kolmari_bulk_buy',
        text: 'Buy everything she has. Stock up while we can.',
        resultText: 'Sixty sovereigns buys enough supplies and materials to last three weeks. The captain nods. "Smart. Next time I come, the price goes up. That\'s just how it works." She sails before noon.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -60, supplies: 20, materials: 15 },
      },
      {
        id: 'kolmari_intel_buy',
        text: 'Supplies can wait. What does the Confederation know about us?',
        resultText: 'She leans forward. "They know your island count. They know your trade routes. They know your crew roster." She taps the table. "But they don\'t know about the God Fruit. Keep it that way." Worth every sovereign.',
        choiceArchetype: 'risky',
        effects: { sovereigns: -40, intelligence: 15 },
      },
    ],
  },
  {
    id: 'followup_defector_intel',
    weight: 2,
    phase: 'act2',
    minDay: 25,
    requiredFlags: { wardensea_defector_sheltered: true },
    notification: {
      type: 'wardensea',
      title: 'DEFECTOR\'S KNOWLEDGE',
      message: 'The Wardensea defector you sheltered at {current_island} has been watching and listening. {crew:random} brings you the handoff: the command structure of the nearest Wardensea garrison, including who can be bribed and who can\'t.',
    },
    repeatable: false,
    resourceChanges: { intelligence: 10 },
  },
  {
    id: 'followup_broadcast_reputation',
    weight: 2,
    phase: 'act2',
    minDay: 20,
    requiredFlags: { wardensea_broadcast_hijacked: true },
    notification: {
      type: 'grimoire',
      title: 'THE SIGNAL HEARD ROUND THE SEA',
      message: 'Kovesse is vibrating. Literally vibrating. "That broadcast we hijacked? It\'s still spreading. Someone copied the signal and rebroadcast it from {island:random}. Then Mirrorwater picked it up. Captain, EVERY independent frequency in the northern arc is carrying your words. The {threat_desc} tried to jam it. They FAILED." Her tail is doing figure eights. "You just became the most famous voice in the Bastion Sea."',
    },
    repeatable: false,
    resourceChanges: { intelligence: 5 },
  },

  // ============================================
  // ACT 3 ADDITIONS -- 8 new events
  // ============================================

  // --- Wardensea Diplomatic Offers ---
  {
    id: 'wardensea_final_offer',
    weight: 3,
    phase: 'act3',
    minDay: 45,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA HIGH COMMAND -- DIPLOMATIC CONTACT',
      message: 'A Kolmari trade vessel requests neutral harbor. The captain -- who has absolutely nothing to do with the Wardensea, according to the manifest -- delivers a sealed document. Three conditions, stamped with the High Command seal: cease expansion. Pay 200 sovereigns monthly tribute. Accept a Wardensea liaison officer aboard. In exchange: your existing territories remain yours, under Wardensea recognition. Delvessa reads it twice. "They are scared," she says. "They would not offer this if they were not scared."',
    },
    repeatable: false,
    choices: [
      {
        id: 'negotiate_wardensea_offer',
        text: 'Send a counter-offer. Open the channel.',
        resultText: 'Your counter-offer goes back via the same neutral vessel. Full recognition. No tribute. No liaison. No response yet. But the channel is open, which is not nothing.',
        reputationChange: 5,
        loyaltyEffects: { delvessa: 3 },
        setFlags: { wardensea_negotiation_opened: true },
      },
      {
        id: 'reject_wardensea_offer',
        text: 'No terms. No liaison. No.',
        resultText: 'The neutral captain waits an hour, reads the silence correctly, and leaves. The document goes into the sea. Vorreth watches it sink and says nothing. The silence is approval.',
        infamyChange: 3,
        loyaltyEffects: { vorreth: 4, dragghen: 2, delvessa: -2 },
        setFlags: { wardensea_offer_rejected: true },
      },
    ],
  },
  {
    id: 'wardensea_back_channel',
    weight: 2,
    phase: 'act3',
    minDay: 50,
    notification: {
      type: 'wardensea',
      title: 'PRIVATE WARDENSEA CONTACT',
      message: 'A personal Grimoire signal. No seal. The sender identifies as Commander Yeleth Branne, 4th Division, currently at the forward base. Their message: "I have been in four campaigns. I know what a war that nobody wins looks like. This is one. I am not speaking for High Command. I am speaking for the two thousand sailors who would prefer to go home." A pause. Then: "Is there a version of this where people stop dying?"',
    },
    repeatable: false,
    choices: [
      {
        id: 'back_channel_yes',
        text: 'Tell them: yes. Find out what they\'re actually offering.',
        resultText: 'You send back: working on it. It\'s true. You don\'t know what comes next. But someone on the other side doesn\'t want to die either, and that is a fact worth having.',
        loyaltyEffects: { delvessa: 2 },
        effects: { intelligence: 8 },
        reputationChange: 4,
      },
      {
        id: 'back_channel_no',
        text: 'No contact. This is a probe.',
        resultText: 'Vorreth calls it right: "They want to know if you\'re soft." No response goes out. No response is an answer.',
        infamyChange: 2,
        loyaltyEffects: { vorreth: 3 },
      },
    ],
  },

  // --- Crew Endgame Moments ---
  {
    id: 'crew_act3_dragghen_end',
    weight: 2,
    phase: 'act3',
    notification: {
      type: 'crew',
      title: 'DRAGGHEN KOLVE -- After Watch',
      message: 'After the evening watch change, Dragghen is in the hold. Not fixing anything. Hand flat on the main keel. You ask what he\'s doing. "Learning her," he says. "She has four years of hard sailing in the planks. Storms. That boarding action off Anvil Cay. The channel she almost went under in, past Windrow." He pulls his hand back. "A ship this used either breaks or becomes something else. Something that knows what it survived." He heads topside. You stand in the hold a moment longer.',
    },
    repeatable: false,
  },
  {
    id: 'crew_act3_suulen_end',
    weight: 2,
    phase: 'act3',
    notification: {
      type: 'crew',
      title: 'SUULEN VASSERE -- Navigation Log',
      message: 'Suulen\'s navigation log for the past month is ninety pages. Routes mapped. Hazards marked. Places that do not appear on any Wardensea chart. She leaves it on the table without comment, open to a page showing a route through the eastern shoals you have never used. Annotated in her handwriting: "After. If we are still here." Below that, smaller: "We will be." You have no idea when she started believing that.',
    },
    repeatable: false,
  },

  // --- Grimoire: World Scale Broadens ---
  {
    id: 'grimoire_act3_kingsrun',
    weight: 2,
    phase: 'act3',
    minDay: 40,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE -- KINGSRUN DISPATCH',
      message: '"Writing from past Ossengaard Fortress, which is already more danger than most of you will accept. The Kingsrun crews are talking about something that has nothing to do with the Threshold. They are talking about an Oni in the Bastion Sea. Took Tavven Shoal from a standing Wardensea garrison in three hours. The deepcallers are watching. The navigators who have run the Kingsrun for thirty years are watching. They do not get impressed often." -- Kingsrun Watch, dispatched from Brannach.',
    },
    repeatable: false,
  },
  {
    id: 'grimoire_act3_world_scale',
    weight: 2,
    phase: 'act3',
    minDay: 48,
    notification: {
      type: 'grimoire',
      title: 'GRIMOIRE -- FOREIGN OBSERVER',
      message: '"From outside the Bastion Sea, since apparently we are a spectator sport now: the Ossengaard Guild has opened a betting pool. Options: Wardensea victory. Oni capitulation. Mutual destruction. Conqueror intervention. And what they call The Third Thing, described only as \'unexpected.\' Odds on The Third Thing: three to one. That is the highest probability any Ossengaard bookmaker has ever assigned to a category they cannot define." -- Cross-sea dispatch, source redacted.',
    },
    repeatable: false,
  },

  // --- Ally Island Tribute ---
  {
    id: 'ally_island_tribute_act3',
    weight: 2,
    phase: 'act3',
    minDay: 35,
    notification: {
      type: 'story',
      title: 'TRIBUTE FROM THE TERRITORIES',
      message: 'A delegation arrives from {island:random}. Six people. They bring smoked fish, copper, and forty sovereigns wrapped in oilcloth. The delegation\'s head, a Gorundai man with grey in his plating, says: "We do not have soldiers to offer. We have what the island makes." He puts the oilcloth on the table. "It is not enough. But it is what we have and we want you to have it." He is not asking for anything in return. He already calculated that he owed it.',
    },
    repeatable: false,
    resourceChanges: { sovereigns: 40, supplies: 15, materials: 10 },
  },

  // --- Kirin Final Message ---
  {
    id: 'kirin_final_message',
    weight: 2,
    phase: 'act3',
    minDay: 45,
    requiredFlags: { kirin_arrived: true },
    notification: {
      type: 'story',
      title: 'MESSAGE FROM KIRIN',
      message: 'A sealed message, through a channel you did not know Kirin had. No preamble. "I have watched you burn across the Bastion Sea for two years. I am still not certain what you are. But I know what you have done." Then: "The Wardensea is going to make a decisive move in the next three weeks. They will not announce it. I am telling you because I am not done with this sea, and your dying would bore me. Watch your northern approaches." No signature. You do not need one.',
    },
    repeatable: false,
    resourceChanges: { intelligence: 12 },
  },

  // =========================================================
  // WARDENSEA AMBIENT PRESENCE -- fires when bounty > 1M
  // The player should feel watched before they feel hunted.
  // Threshold: minBounty 1,000,000. Repeatable: false each.
  // =========================================================

  {
    id: 'wardensea_presence_informant',
    weight: 3,
    minBounty: 1000000,
    repeatable: false,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA -- EYES IN THE MARKET',
      message: 'A dockworker you have not seen before keeps turning up in the same places. Near your ship in the morning. At the edge of the market when your crew is resupplying. He is not subtle. He is not trying to be. The Wardensea does not always send soldiers first. Sometimes they send people to count.',
    },
  },

  {
    id: 'wardensea_presence_horizon_ship',
    weight: 3,
    minBounty: 1000000,
    repeatable: false,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA -- VESSEL ON THE HORIZON',
      message: 'Suulen flags a ship at the edge of visual range. Single mast, no flag, sitting with the current instead of moving with it. A patrol vessel at rest is not a patrol vessel. It is a vessel watching something. It has been there since before dawn. By midday it is gone. You have not stopped being watched. They just finished the count.',
    },
  },

  {
    id: 'wardensea_presence_local_warning',
    weight: 3,
    minBounty: 1000000,
    repeatable: false,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA -- A WARNING FROM THE PORT',
      message: 'Hella from the fish market sends word through a dockhand. Brief: "Three Wardensea officers ate here this morning. They asked about you. Not by name -- by description. I told them I didn\'t know anyone matching it. They wrote something down and left." She does not add anything else. She does not need to. The Wardensea is asking questions. They already know the answers.',
    },
    requiredFlags: { tavven_conquered: true },
  },

  {
    id: 'wardensea_presence_register_update',
    weight: 2,
    minBounty: 2000000,
    repeatable: false,
    notification: {
      type: 'wardensea',
      title: 'WARDENSEA -- PERSON OF INTEREST: ELEVATED',
      message: 'Kovesse intercepts a routing message on Wardensea administrative frequencies. Classification update: KARYUDON, renegade authority, Northern Arc. Status changed from MONITOR to PRIORITY INTERCEPT. That means dedicated personnel. Assigned watchers. A file that does not get closed. The Wardensea has been patient. They are deciding to stop being patient.',
    },
  },

  {
    id: 'wardensea_presence_crew_report',
    weight: 3,
    minBounty: 1000000,
    repeatable: false,
    notification: {
      type: 'crew',
      title: 'VORRETH DAAZ -- Wardensea Movement',
      message: '"Captain. A fast cutter passed through the outer channel this morning at a speed inconsistent with routine patrol. I recognize the configuration: that is a reconnaissance vessel. It did not stop. It did not challenge us. It recorded what it saw and it left." He pauses. "They have logged us. A formal response takes four to six weeks to organize. You have time. Not much of it, but some."',
    },
  },
];

// --- Event Reward Scaling ---

interface ScaleContext {
  dayCount: number;
  gamePhase: GamePhase;
  territoryCount: number;
}

/**
 * Scale event resource rewards based on game progression.
 * Early game rewards are baseline. Mid-game and late-game rewards
 * scale up so events remain meaningful as the economy grows.
 *
 * Multiplier: phaseMultiplier + (territoryCount * 0.15)
 * Prologue: 1.0x, Act1: 1.3x, Act2: 2.0x, Act3: 3.0x + territory bonus
 */
export function scaleEventRewards(
  effects: Partial<Resources>,
  ctx: ScaleContext,
): Partial<Resources> {
  const phaseMultiplier: Record<GamePhase, number> = {
    prologue: 1.0,
    act1: 1.3,
    act2: 2.0,
    act3: 3.0,
    endgame: 3.5,
  };

  const base = phaseMultiplier[ctx.gamePhase] || 1.0;
  const territoryBonus = Math.min(0.75, ctx.territoryCount * 0.1);
  const multiplier = base + territoryBonus;

  const scaled: Partial<Resources> = {};
  for (const [key, value] of Object.entries(effects)) {
    if (typeof value === 'number' && value !== 0) {
      // Scale both gains and losses (bigger economy = bigger stakes)
      scaled[key as keyof Resources] = Math.floor(value * multiplier);
    }
  }
  return scaled;
}

// --- Event Selection ---

interface EventCheckInput {
  dayCount: number;
  gamePhase: GamePhase;
  flags: GameFlags;
  firedEventIds: string[];
  bounty?: number;
}

/**
 * Select a random event to fire, if any.
 * Returns null if no event triggers (events don't fire every day).
 * Base chance: 40% per day that SOMETHING happens.
 */
export function rollRandomEvent(input: EventCheckInput): RandomEvent | null {
  const { dayCount, gamePhase, flags, firedEventIds, bounty } = input;
  const firedSet = new Set(firedEventIds);

  // 40% base chance of an event firing
  if (Math.random() > 0.40) return null;

  // Filter eligible events
  const eligible = randomEvents.filter((event) => {
    // Check if already fired (non-repeatable)
    if (!event.repeatable && firedSet.has(event.id)) return false;

    // Phase check
    if (event.phase && event.phase !== gamePhase) return false;

    // Day check
    if (event.minDay && dayCount < event.minDay) return false;

    // Bounty check (for threat-scaled events)
    if (event.minBounty !== undefined && (bounty ?? 0) < event.minBounty) return false;

    // Flag check
    if (event.requiredFlags) {
      for (const [key, required] of Object.entries(event.requiredFlags)) {
        const actual = flags[key];
        if (typeof required === 'boolean') {
          if (required && !actual) return false;
          if (!required && actual) return false;
        } else {
          if (actual !== required) return false;
        }
      }
    }

    return true;
  });

  if (eligible.length === 0) return null;

  // Weighted random selection
  const totalWeight = eligible.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const event of eligible) {
    roll -= event.weight;
    if (roll <= 0) return event;
  }

  return eligible[eligible.length - 1]; // fallback
}
