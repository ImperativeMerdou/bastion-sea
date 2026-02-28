// =============================================
// GODTIDE: BASTION SEA - Day Action Events
// =============================================
// Every daily action can trigger a narrative
// mini-event with choices, risk, and consequences.
// Modeled on the TravelChoice pattern.
// =============================================

import type { DayAction, Resources, GameFlags, DominionExpression } from '../types/game';
import type { ChoiceArchetype } from './crewAdvisor';

// ==========================================
// DAY ACTION EVENT TYPES
// ==========================================

export interface DayActionChoice {
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
  /** Crew member required for this option to appear */
  requiresCrew?: string;
  /** Dominion XP reward */
  dominionXP?: { expression: DominionExpression; amount: number };
  /** Stat check - percentage success (0-100). If absent, always succeeds. */
  successChance?: number;
  /** Text shown on failure */
  failText?: string;
  /** Effects applied on failure instead of main effects */
  failEffects?: Partial<Resources>;
  /** Territory morale change for current island */
  moraleChange?: number;
  /** Equipment ID to grant on success (from equipment registry) */
  grantEquipmentId?: string;
}

export interface DayActionEvent {
  id: string;
  /** Which day action triggers this event */
  action: DayAction;
  title: string;
  /** Narrative setup text */
  description: string;
  /** Weighted random selection (higher = more likely) */
  weight: number;
  /** Flag requirements */
  requiredFlags?: Record<string, boolean | string | number>;
  /** Minimum day count */
  minDay?: number;
  /** Only fires on this specific island */
  requiresIsland?: string;
  /** Crew member must be alive and recruited */
  requiresCrew?: string;
  /** Can fire multiple times? */
  repeatable: boolean;
  /** Choices presented to the player */
  choices: DayActionChoice[];
}

// ==========================================
// EVENT SELECTION
// ==========================================

export interface DayActionEventInput {
  action: DayAction;
  dayCount: number;
  flags: GameFlags;
  currentIsland: string;
  aliveCrew: string[];      // IDs of alive, recruited crew
  firedEventIds: string[];
}

export function rollDayActionEvent(input: DayActionEventInput): DayActionEvent | null {
  const { action, dayCount, flags, currentIsland, aliveCrew, firedEventIds } = input;
  const firedSet = new Set(firedEventIds);

  // Event chance scales down over time: 85% early game, decreasing as events fire
  // Prevents narrative fatigue in late game while keeping early days rich
  const baseChance = 0.85;
  const firedPenalty = Math.min(0.25, firedEventIds.length * 0.005); // -0.5% per fired event, max -25%
  const eventChance = Math.max(0.45, baseChance - firedPenalty); // Floor at 45%
  if (Math.random() > eventChance) return null;

  const eligible = dayActionEvents.filter((event) => {
    // Must match the action type
    if (event.action !== action) return false;

    // Repeatability check
    if (!event.repeatable && firedSet.has(event.id)) return false;

    // Day check
    if (event.minDay && dayCount < event.minDay) return false;

    // Island check
    if (event.requiresIsland && event.requiresIsland !== currentIsland) return false;

    // Crew check
    if (event.requiresCrew && !aliveCrew.includes(event.requiresCrew)) return false;

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

  return eligible[eligible.length - 1];
}

// ==========================================
// REST EVENTS
// ==========================================

const restEvents: DayActionEvent[] = [
  {
    id: 'rest_campfire_stories',
    action: 'rest',
    title: 'CAMPFIRE',
    description: 'The crew gathers around a fire on the shore of {current_island}. Dragghen is inspecting the camp setup, tapping support beams and testing knot tension. The mood is loose, quiet. A good night to talk.',
    weight: 5,
    repeatable: true,
    choices: [
      {
        id: 'campfire_dragghen',
        text: 'Sit with Dragghen',
        resultText: 'You sit beside him while he runs a hand along a crooked tent pole. "Structural integrity of this camp. Solid four." He pulls a wrench from somewhere and straightens it without looking. "Four and a half now."',
        choiceArchetype: 'practical',
        loyaltyEffects: { dragghen: 4 },
        requiresCrew: 'dragghen',
      },
      {
        id: 'campfire_delvessa',
        text: 'Join Delvessa by the water',
        resultText: 'She\'s watching the tide patterns, cross-referencing with a chart she drew herself. "You know what separates a pirate from a conqueror?" She doesn\'t wait for your answer. "Logistics."',
        choiceArchetype: 'practical',
        loyaltyEffects: { delvessa: 4 },
        effects: { intelligence: 1 },
        requiresCrew: 'delvessa',
      },
      {
        id: 'campfire_everyone',
        text: 'Stay with the group',
        resultText: 'You sit among them. No speeches, no orders. Just the fire, the waves, and the sound of people who chose to follow you. Everyone sleeps better tonight.',
        choiceArchetype: 'practical',
        loyaltyEffects: { dragghen: 2, delvessa: 2, suulen: 2, tessek: 2, kovesse: 2, orren: 2, vorreth: 2 },
      },
    ],
  },
  {
    id: 'rest_shore_leave_trouble',
    action: 'rest',
    title: 'SHORE LEAVE INCIDENT',
    description: 'Kovesse comes running from the port district. "Small problem, Captain. Dragghen got into it with some locals at a dockside workshop. Something about their joinery being a structural hazard. He\'s... remodeling their storefront."',
    weight: 4,
    repeatable: true,
    requiresCrew: 'dragghen',
    choices: [
      {
        id: 'shore_intervene',
        text: 'Go handle it personally',
        resultText: 'You walk in, and the room goes still. Karyudon doesn\'t need to raise a voice. The locals back down. Dragghen grumbles but follows you out. "Load-bearing wall, Captain. They used PINE. For a load-bearing wall."',
        choiceArchetype: 'diplomatic',
        loyaltyEffects: { dragghen: 3 },
        reputationChange: 2,
      },
      {
        id: 'shore_let_play',
        text: 'Let Dragghen sort it out',
        resultText: 'Twenty minutes later he walks back with a split knuckle and a stolen set of carpentry tools. "Settled. Also, I braced their support beams. They\'ll thank me later." You notice he\'s carrying a slab of ironwood under one arm.',
        choiceArchetype: 'risky',
        loyaltyEffects: { dragghen: 1 },
        effects: { sovereigns: -5 },
        infamyChange: 1,
      },
      {
        id: 'shore_pay_damages',
        text: 'Send Kovesse with coin to smooth it over',
        resultText: 'Kovesse handles it with her usual efficiency. Fifteen sovereigns, a sincere apology, and a promise that "the large man will not return." Dragghen is offended. Everyone else is relieved.',
        choiceArchetype: 'diplomatic',
        effects: { sovereigns: -15 },
        loyaltyEffects: { dragghen: -2, kovesse: 2 },
        reputationChange: 1,
      },
    ],
  },
  {
    id: 'rest_night_raid',
    action: 'rest',
    title: 'NIGHT VISITORS',
    description: 'Vorreth shakes you awake. His voice is flat and level, which means trouble. "Six figures approaching the camp. Armed. Moving in formation. Not {current_island} locals. They know where we sleep." He says it the way someone else would say the weather changed.',
    weight: 3,
    repeatable: true,
    minDay: 5,
    choices: [
      {
        id: 'raid_fight',
        text: 'Wake the crew. Form up.',
        resultText: 'The ambush becomes a rout. Six against Karyudon and a crew that sleeps with weapons. It\'s over in ninety seconds. They were bounty hunters, poorly informed about what they were hunting.',
        choiceArchetype: 'aggressive',
        dominionXP: { expression: 'iron', amount: 5 },
        loyaltyEffects: { vorreth: 2 },
        bountyChange: 5000000,
      },
      {
        id: 'raid_ambush',
        text: 'Let them get close. Then strike.',
        resultText: 'Vorreth nods. You wait until they\'re in the firelight, then hit from three sides. Delvessa called the angles. Suulen cut the escape route. Professional. Clean. Work that builds legends.',
        choiceArchetype: 'risky',
        dominionXP: { expression: 'sight', amount: 5 },
        effects: { intelligence: 2 },
        successChance: 55,
        failText: 'The ambush was sloppy. They spotted Suulen early and two got away. One is wounded, angry, and now knows your camp patterns. Supplies were scattered in the chaos.',
        failEffects: { supplies: -12 },
      },
      {
        id: 'raid_relocate',
        text: 'Abandon camp. Move in the dark.',
        resultText: 'No fight. No glory. Just survival. You move the entire camp in twenty minutes, gear and all. The raiders find cold embers and nothing else. Vorreth approves. "Discipline over ego, Captain." Then falls asleep standing against a tree.',
        choiceArchetype: 'cautious',
        effects: { supplies: -3 },
        loyaltyEffects: { vorreth: 3, dragghen: -1 },
      },
    ],
  },
  {
    id: 'rest_crew_argument',
    action: 'rest',
    title: 'DISAGREEMENT',
    description: 'Voices carry across the camp. Delvessa and Vorreth are going at it, professional and cold. The argument: resource allocation. Delvessa wants to invest in intelligence networks. Vorreth wants to stockpile for the fights ahead. Both have a point.',
    weight: 4,
    repeatable: false,
    requiresCrew: 'delvessa',
    choices: [
      {
        id: 'argue_delvessa',
        text: 'Side with Delvessa. Intel wins wars.',
        resultText: '"Thank you," Delvessa says, and means it. Vorreth says nothing. His expression doesn\'t change. He\'ll follow the order. He always does. But he\'ll remember.',
        choiceArchetype: 'diplomatic',
        loyaltyEffects: { delvessa: 5, vorreth: -3 },
        effects: { intelligence: 5 },
      },
      {
        id: 'argue_vorreth',
        text: 'Side with Vorreth. Supplies first.',
        resultText: 'Vorreth nods once, decisive. Delvessa exhales through her nose. "Your call, Captain." She\'ll find another way to get what she needs. She always does.',
        choiceArchetype: 'practical',
        loyaltyEffects: { vorreth: 5, delvessa: -3 },
        effects: { supplies: 8 },
      },
      {
        id: 'argue_compromise',
        text: 'Split the difference. Both matter.',
        resultText: 'Neither is happy. Neither is angry. This is what leadership looks like most days: not the perfect answer, but the one everyone can live with.',
        choiceArchetype: 'diplomatic',
        loyaltyEffects: { delvessa: 1, vorreth: 1 },
        effects: { intelligence: 2, supplies: 3 },
        dominionXP: { expression: 'king', amount: 4 },
      },
    ],
  },
  {
    id: 'rest_delvessa_strategy',
    action: 'rest',
    title: 'STRATEGIC COUNSEL',
    description: 'Delvessa finds you alone. She has that look, the one that means she\'s been thinking three moves ahead. "Captain, I\'ve been mapping the regional power structure. I can brief you, if you have the patience for it."',
    weight: 3,
    repeatable: true,
    requiresCrew: 'delvessa',
    minDay: 8,
    choices: [
      {
        id: 'strategy_intel',
        text: 'Give me everything you\'ve got.',
        resultText: 'Two hours of charts, names, and connection lines. Your head hurts. But now you see the shape of it: who controls what, who owes whom, where the pressure points are. Knowledge is weight, and Delvessa just loaded the scales.',
        choiceArchetype: 'practical',
        effects: { intelligence: 4 },
        loyaltyEffects: { delvessa: 3 },
      },
      {
        id: 'strategy_reputation',
        text: 'Focus on how we\'re perceived. What do people say?',
        resultText: 'Delvessa pulls out Grimoire transcripts. "You\'re a curiosity. That\'s the word they use. A curiosity with a warclub." She smiles. "We can shape that. Give me time."',
        choiceArchetype: 'diplomatic',
        reputationChange: 4,
        loyaltyEffects: { delvessa: 2 },
      },
    ],
  },
  {
    id: 'rest_suulen_stars',
    action: 'rest',
    title: 'STAR READING',
    description: 'Suulen is on the highest point she could find, staring up. Her Forged Sight gives the sky a different meaning. "Captain. Come look at this. The constellation of the Drowning King is visible tonight. That hasn\'t happened in eleven years."',
    weight: 3,
    repeatable: false,
    requiresCrew: 'suulen',
    choices: [
      {
        id: 'stars_watch',
        text: 'Watch with her. Ask what it means.',
        resultText: '"Bad omen for kings," she says flatly. "Good omen for those who replace them." She glances at you sideways. Almost smiling. Almost. You sit in silence until the constellation sets.',
        choiceArchetype: 'practical',
        loyaltyEffects: { suulen: 5 },
        dominionXP: { expression: 'sight', amount: 3 },
      },
      {
        id: 'stars_practical',
        text: 'Beautiful. Can it tell us anything useful?',
        resultText: 'Suulen blinks, then actually laughs. It\'s the first time you\'ve heard it. "Navigation markers. I can calculate three new route shortcuts from the positions." She spends the rest of the night taking measurements.',
        choiceArchetype: 'practical',
        loyaltyEffects: { suulen: 3 },
        effects: { intelligence: 3 },
      },
    ],
  },
  {
    id: 'rest_kovesse_tinkering',
    action: 'rest',
    title: 'LATE NIGHT ENGINEERING',
    description: 'The lantern in Kovesse\'s workshop is still lit. She\'s elbow-deep in something mechanical, surrounded by brass fittings and grease. "Captain! Perfect timing. I need someone to hold this while I--" A small explosion. She blinks. "That was intentional."',
    weight: 4,
    repeatable: true,
    requiresCrew: 'kovesse',
    choices: [
      {
        id: 'kovesse_help',
        text: 'Roll up your sleeves and help.',
        resultText: 'Two hours of holding bolts, passing tools, and trying not to ask what any of this does. By dawn, she\'s built something that hums. "Signal booster for the Grimoire relay. Three times the range." She beams. You have grease on your face.',
        choiceArchetype: 'practical',
        loyaltyEffects: { kovesse: 4 },
        effects: { intelligence: 2 },
      },
      {
        id: 'kovesse_fund',
        text: 'Ask what she needs. Fund the project.',
        resultText: '"Materials. Good ones. Not the recycled garbage we\'ve been working with." You authorize the expense. Kovesse\'s eyes light up like she found a second birthday. The results will speak for themselves.',
        choiceArchetype: 'trade',
        effects: { materials: -5, sovereigns: -10 },
        loyaltyEffects: { kovesse: 5 },
        setFlags: { kovesse_workshop_funded: true },
      },
    ],
  },
  {
    id: 'rest_quiet_night',
    action: 'rest',
    title: 'A QUIET NIGHT',
    description: 'Nothing happens. No raids, no arguments, no crises. Just the wind off {current_island} and the slow creak of the ship. Rare enough to feel strange. Rarer still to appreciate.',
    weight: 6,
    repeatable: true,
    choices: [
      {
        id: 'quiet_sleep',
        text: 'Sleep properly for once.',
        resultText: 'Eight full hours. You\'d forgotten what that felt like. The crew notices the difference in the morning. "Rested captain. Solid five," Dragghen says, which is his version of a glowing review.',
        choiceArchetype: 'practical',
        loyaltyEffects: { dragghen: 1, delvessa: 1, suulen: 1, tessek: 1, kovesse: 1, orren: 1, vorreth: 1 },
      },
      {
        id: 'quiet_plan',
        text: 'Use the silence to plan ahead.',
        resultText: 'You spread out the charts and think. Really think. Not the reactive scramble of daily survival, but actual strategy. By morning, three things are clearer than they were.',
        choiceArchetype: 'practical',
        effects: { intelligence: 2 },
        dominionXP: { expression: 'king', amount: 3 },
      },
    ],
  },
];

// ==========================================
// TRAIN EVENTS
// ==========================================

const trainEvents: DayActionEvent[] = [
  {
    id: 'train_sparring_tessek',
    action: 'train',
    title: 'TESSEK\'S DRILL',
    description: 'Tessek stands on the beach, nodachi planted in the sand, hair blowing in the wind like he arranged it. "Captain. Today I teach you the Crimson Tide: First Movement. Or the Silver Gale: Opening Passage. Your choice. Both are lethal. Both are beautiful."',
    weight: 5,
    repeatable: true,
    requiresCrew: 'tessek',
    choices: [
      {
        id: 'drill_offense',
        text: 'Offense. The Crimson Tide.',
        resultText: 'Four hours of flowing combination work. Tessek names every transition. "Crimson Tide: Seven-Fold Petal Cut. No, more wrist. Garroden Harsk would have had your arm off by now." By the end your timing has improved by a margin you can feel in your bones.',
        choiceArchetype: 'aggressive',
        dominionXP: { expression: 'iron', amount: 12 },
        loyaltyEffects: { tessek: 2 },
        effects: { supplies: -2 },
      },
      {
        id: 'drill_defense',
        text: 'Defense. The Silver Gale.',
        resultText: 'He swings at you for three hours straight while you practice deflection stances. "Silver Gale: Sixth Redirection. Feel the blade\'s intention, not its edge." Theatrical, but the technique underneath is devastatingly real.',
        choiceArchetype: 'cautious',
        dominionXP: { expression: 'iron', amount: 10 },
        loyaltyEffects: { tessek: 3 },
        effects: { supplies: -2 },
      },
      {
        id: 'drill_tactics',
        text: 'Forget the blade. Teach me Sight Dominion through steel.',
        resultText: 'Tessek blinks. Then smiles, slowly. "You want to learn how the blade sees." Three hours of meditation with a live edge against your palm. Reading intent, reading distance, reading fear. The nodachi becomes an extension of perception.',
        choiceArchetype: 'practical',
        dominionXP: { expression: 'sight', amount: 8 },
        effects: { intelligence: 3, supplies: -2 },
        loyaltyEffects: { tessek: 4 },
      },
    ],
  },
  {
    id: 'train_dominion_surge',
    action: 'train',
    title: 'DOMINION SURGE',
    description: 'It happens mid-training. A pulse of raw Dominion force that makes the air taste like copper. Your vision tunnels. Delvessa\'s Forged Sight flares in response across the camp. "Captain! Your expression levels are spiking. You can push through this, or pull back."',
    weight: 3,
    repeatable: true,
    minDay: 10,
    choices: [
      {
        id: 'surge_push',
        text: 'Push through. Chase the breakthrough.',
        resultText: 'The world narrows to a point of light and force. When it passes, you\'re on your knees. Bleeding from the nose. But the power that anchors in your frame afterward is permanent. Worth it.',
        choiceArchetype: 'risky',
        dominionXP: { expression: 'iron', amount: 20 },
        successChance: 40,
        failText: 'You push too hard. The surge collapses inward. Something tears inside. You\'re coughing blood for an hour while Delvessa force-feeds you water and lectures you about limits. The crew watches in silence. Morale takes a hit when the captain bleeds from training.',
        failEffects: { supplies: -8 },
      },
      {
        id: 'surge_control',
        text: 'Channel it carefully. Control over power.',
        resultText: 'You guide the surge like water through a channel. No explosion, no drama. Just steady, measured growth. Delvessa nods. "Good. You\'re learning to listen to your own Dominion instead of fighting it."',
        choiceArchetype: 'cautious',
        dominionXP: { expression: 'sight', amount: 12 },
        loyaltyEffects: { delvessa: 2 },
        effects: { supplies: -2 },
      },
      {
        id: 'surge_command',
        text: 'Project it outward. Make them feel it.',
        resultText: 'The wave rolls out across the camp. Every person within fifty meters stops what they\'re doing. Dragghen drops a bolt he was threading. Vorreth snaps awake from a standing nap. It\'s not pain. It\'s presence. King Dominion in its rawest form.',
        choiceArchetype: 'aggressive',
        dominionXP: { expression: 'king', amount: 15 },
        effects: { supplies: -2 },
        reputationChange: 2,
      },
    ],
  },
  {
    id: 'train_meditation',
    action: 'train',
    title: 'IRON MEDITATION',
    description: 'The morning is still. No wind. Vorreth once mentioned a technique from his pirate fleet days: "Iron Body, Iron Mind." Stillness as training. Breathing as resistance. It sounded like nonsense then. It doesn\'t now.',
    weight: 4,
    repeatable: true,
    choices: [
      {
        id: 'meditate_iron',
        text: 'Focus on physical endurance.',
        resultText: 'Four hours of stillness. Your muscles scream. Your Dominion drops into a deeper pattern, like a river finding bedrock. When you stand, the ground feels more solid.',
        choiceArchetype: 'practical',
        dominionXP: { expression: 'iron', amount: 8 },
        loyaltyEffects: { dragghen: 1, delvessa: 1, suulen: 1, tessek: 1, kovesse: 1, orren: 1, vorreth: 1 },
        effects: { supplies: -2 },
      },
      {
        id: 'meditate_sight',
        text: 'Focus on perception. Read the environment.',
        resultText: 'You close your eyes and listen. Really listen. The waves have patterns. The birds change calls before weather shifts. After two hours, you can hear conversations from the other side of camp. Suulen gives you a knowing look.',
        choiceArchetype: 'practical',
        dominionXP: { expression: 'sight', amount: 8 },
        loyaltyEffects: { dragghen: 1, delvessa: 1, suulen: 1, tessek: 1, kovesse: 1, orren: 1, vorreth: 1 },
        effects: { supplies: -2 },
      },
    ],
  },
  {
    id: 'train_dragghen_spar',
    action: 'train',
    title: 'THE BULWARK WANTS A ROUND',
    description: 'Dragghen sets down Bulkhead, his ninety-pound keel plate shield, and cracks his knuckles. "Captain. Need to stress-test my joints. You\'re the best load I\'ve got." He\'s already in a fighting stance. Gorundai don\'t ask twice.',
    weight: 4,
    repeatable: true,
    requiresCrew: 'dragghen',
    choices: [
      {
        id: 'dragghen_brawl',
        text: 'Pure brawl. No Dominion, no weapons.',
        resultText: 'Dragghen is shorter than you by a head and outweighs you by forty pounds of Gorundai muscle. The fight is ugly, bruising, and exactly what both of you needed. He wins on points. You won\'t admit it. "Solid five," he says, breathing hard. "Your guard needs re-bracing."',
        choiceArchetype: 'aggressive',
        dominionXP: { expression: 'iron', amount: 10 },
        loyaltyEffects: { dragghen: 5 },
        effects: { supplies: -2 },
      },
      {
        id: 'dragghen_teach',
        text: 'Spar with structure. Teach him what Tessek showed you.',
        resultText: 'You pass on the guard positions, the footwork drills. Dragghen absorbs them with the same focus he brings to a hull repair. "Huh. This is like load distribution. Angle, timing, economy of force." He\'s right.',
        choiceArchetype: 'diplomatic',
        dominionXP: { expression: 'king', amount: 6 },
        loyaltyEffects: { dragghen: 4 },
        effects: { supplies: -2 },
      },
    ],
  },
  {
    id: 'train_danzai_communion',
    action: 'train',
    title: 'THE DANZAI RESPONDS',
    description: 'During a routine swing drill, the Danzai pulses. Not the familiar low hum, but something deeper. The greatsword\'s resonance matches your heartbeat for exactly three seconds. Then it stops. But in that moment, you felt something unlock.',
    weight: 2,
    repeatable: false,
    minDay: 15,
    choices: [
      {
        id: 'danzai_follow',
        text: 'Follow the resonance. Let it guide your next swing.',
        resultText: 'You swing. The Danzai sings. The practice post doesn\'t break. It evaporates. Splinters in a cone fifty feet wide. Dragghen stops mid-repair. Vorreth wakes up from a standing nap. Everyone is very quiet for a very long time.',
        choiceArchetype: 'risky',
        dominionXP: { expression: 'iron', amount: 18 },
        effects: { supplies: -2 },
        setFlags: { danzai_resonance_trained: true },
      },
      {
        id: 'danzai_analyze',
        text: 'Hold still. Analyze the resonance with Sight.',
        resultText: 'You close your eyes and feel the frequency. It\'s not random. It\'s a pattern, old and deliberate. Whoever forged this weapon encoded something into the steel. A technique. You\'ll need more time to decode it, but you know it\'s there.',
        choiceArchetype: 'cautious',
        dominionXP: { expression: 'sight', amount: 15 },
        effects: { intelligence: 3, supplies: -2 },
        setFlags: { danzai_resonance_analyzed: true },
      },
    ],
  },
  {
    id: 'train_weights',
    action: 'train',
    title: 'HEAVY LIFTING',
    description: 'No technique today. No philosophy. Just weight. Dragghen found anchor chain segments that make excellent training implements. "Solid six. Best chain I\'ve seen in months." Sometimes growth requires nothing more complicated than effort.',
    weight: 5,
    repeatable: true,
    choices: [
      {
        id: 'weights_heavy',
        text: 'Go heavy. Maximum effort.',
        resultText: 'Three hours of grinding, awful, beautiful work. Your Dominion doesn\'t surge or spike. It compresses. Becomes denser. Strength you build brick by brick.',
        choiceArchetype: 'aggressive',
        dominionXP: { expression: 'iron', amount: 10 },
        effects: { supplies: -2 },
      },
      {
        id: 'weights_endurance',
        text: 'Light weight, high reps. Build stamina.',
        resultText: 'The burn starts at the thirty-minute mark and doesn\'t stop. By the end, your muscles have memorized the motions. Recovery will be faster next time. Combat will last longer.',
        choiceArchetype: 'practical',
        dominionXP: { expression: 'iron', amount: 7 },
        effects: { supplies: -2 },
      },
    ],
  },
  {
    id: 'train_suulen_perception',
    action: 'train',
    title: 'SIGHT TRAINING',
    description: 'Suulen tosses you a blindfold. "Put it on." When you hesitate: "Trust exercise. I\'m going to throw things at you. You\'re going to learn to read air displacement." She is completely serious.',
    weight: 3,
    repeatable: true,
    requiresCrew: 'suulen',
    choices: [
      {
        id: 'sight_accept',
        text: 'Put on the blindfold.',
        resultText: 'You get hit eleven times in the first ten minutes. By the end of the hour, you\'re dodging three out of five. Suulen is genuinely impressed, which she expresses by throwing harder.',
        choiceArchetype: 'risky',
        dominionXP: { expression: 'sight', amount: 12 },
        loyaltyEffects: { suulen: 4 },
        effects: { supplies: -2 },
        successChance: 45,
        failText: 'You get hit forty-seven times. Suulen stops when your left eye swells shut. "We\'ll try again next week," she says, with a note of something that might be guilt. You spend the rest of the day lying down.',
        failEffects: { supplies: -6 },
      },
      {
        id: 'sight_counter',
        text: 'Counter-proposal: teach me to read people instead.',
        resultText: 'She pauses. Then grins. "Harder. Better. Fine." She spends the afternoon teaching you micro-expressions, breathing tells, and the seventeen ways someone reveals a lie with their hands.',
        choiceArchetype: 'diplomatic',
        dominionXP: { expression: 'sight', amount: 8 },
        effects: { intelligence: 3, supplies: -2 },
        loyaltyEffects: { suulen: 3 },
      },
    ],
  },
];

// ==========================================
// EXPLORE EVENTS
// ==========================================

const exploreEvents: DayActionEvent[] = [
  {
    id: 'explore_hidden_cache',
    action: 'explore_local',
    title: 'HIDDEN CACHE',
    description: 'Behind a collapsed wall on {current_island}, half-buried in coral growth: a sealed metal container. Old pirate markings. Could be a supply cache, could be a trap box. The lock mechanism is still functional.',
    weight: 5,
    repeatable: true,
    choices: [
      {
        id: 'cache_careful',
        text: 'Open it carefully. Check for traps first.',
        resultText: 'Smart call. A pressure plate was connected to a vial of something that smells like concentrated death. You disarm it, then open the cache: supplies, a handful of coins, and a sealed envelope with shipping routes.',
        choiceArchetype: 'cautious',
        effects: { supplies: 4, sovereigns: 8, intelligence: 2 },
      },
      {
        id: 'cache_force',
        text: 'Smash it open. Fortune favors the bold.',
        resultText: 'The lock shatters. So does the trap. A cloud of acidic powder hits you in the face. Through watering eyes, you grab what you can: heavy, metal, valuable. Worth it. Probably.',
        choiceArchetype: 'risky',
        effects: { materials: 8, sovereigns: 12 },
        successChance: 45,
        failText: 'The trap detonates properly. Acid eats through the cache contents and your left glove. Your hands will sting for a week. The supplies you carried here? Also corroded. Lesson learned.',
        failEffects: { supplies: -8, materials: -3 },
      },
    ],
  },
  {
    id: 'explore_local_informant',
    action: 'explore_local',
    title: 'A FAMILIAR FACE',
    description: 'A dock worker on {current_island} catches your eye. Deliberate. She approaches when nobody\'s watching. "You\'re Karyudon\'s crew. I have information about the Wardensea patrol rotations in this sector. But I need something in return."',
    weight: 4,
    repeatable: true,
    minDay: 5,
    choices: [
      {
        id: 'informant_pay',
        text: 'Pay for the information.',
        resultText: 'Twenty sovereigns changes hands. The patrol routes she provides are current, detailed, and worth ten times what you paid. Delvessa will be pleased.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -20, intelligence: 6 },
      },
      {
        id: 'informant_intimidate',
        text: 'You could just tell me. Willingly.',
        resultText: 'She looks at you. Measures the threat. Decides it\'s real. The information comes freely, along with a look you\'ll remember. You\'ve made an enemy today. A small one. They add up.',
        choiceArchetype: 'aggressive',
        effects: { intelligence: 6 },
        infamyChange: 3,
      },
      {
        id: 'informant_trade',
        text: 'What do you need? Maybe we can trade.',
        resultText: '"My brother is on a work crew at the garrison. They won\'t let him leave." You nod. She talks. It\'s the beginning of something, a local network. Trust earned, not bought.',
        choiceArchetype: 'diplomatic',
        effects: { intelligence: 4 },
        reputationChange: 3,
        setFlags: { local_contact_established: true },
      },
    ],
  },
  {
    id: 'explore_ambush',
    action: 'explore_local',
    title: 'WRONG TURN',
    description: 'The alley narrows in the back streets of {current_island}. The shadows move wrong. By the time you hear the blade clear its sheath, there are four of them blocking the way back. Bounty hunters, judging by the quality of their steel.',
    weight: 3,
    repeatable: true,
    minDay: 8,
    choices: [
      {
        id: 'ambush_fight',
        text: 'Draw the Danzai. Make this quick.',
        resultText: 'Four against one, in a confined space, with a weapon built for open combat. Disadvantageous. Also irrelevant. You\'re Karyudon. The alley is painted red in under a minute.',
        choiceArchetype: 'aggressive',
        dominionXP: { expression: 'iron', amount: 8 },
        bountyChange: 3000000,
        effects: { sovereigns: 10 },
      },
      {
        id: 'ambush_flee',
        text: 'Not worth the trouble. Find another route.',
        resultText: 'You vault a market stall and disappear into a crowd before they can coordinate. Undignified, but efficient. The Danzai stays clean and your position stays uncompromised.',
        choiceArchetype: 'cautious',
        effects: { supplies: -2 },
      },
      {
        id: 'ambush_talk',
        text: '"You know who I am. Name your price to walk away."',
        resultText: 'Their leader looks at the Danzai. Looks at you. Does the math. "Hundred sovereigns and we never saw you." Expensive, but blood draws attention.',
        choiceArchetype: 'diplomatic',
        effects: { sovereigns: -100 },
        successChance: 55,
        failText: '"Hundred sov? Try three hundred." They know they have the upper hand in this alley. You pay. Through gritted teeth. And they take your supply pouch too.',
        failEffects: { sovereigns: -300, supplies: -5 },
      },
    ],
  },
  {
    id: 'explore_ancient_ruin',
    action: 'explore_local',
    title: 'BENEATH THE SURFACE',
    description: 'A collapsed foundation reveals carved stone below. Old. Pre-colonial. The markings are Dominion script, not the modern kind. {current_island} had practitioners long before the current residents arrived.',
    weight: 3,
    repeatable: false,
    choices: [
      {
        id: 'ruin_excavate',
        text: 'Spend the day excavating.',
        resultText: 'Beneath three feet of packed earth: a chamber. Small, ceremonial. The walls pulse faintly with residual Dominion energy. You find inscribed training stances that predate modern technique by centuries.',
        choiceArchetype: 'practical',
        effects: { materials: 6 },
        dominionXP: { expression: 'iron', amount: 10 },
        setFlags: { ancient_ruin_discovered: true },
      },
      {
        id: 'ruin_catalog',
        text: 'Document the markings. Bring them to Delvessa.',
        resultText: 'Delvessa spends three hours with your sketches, cross-referencing with her archives. "This changes our understanding of Dominion expression lineage. The tier system isn\'t natural. It was engineered." Heavy implications.',
        choiceArchetype: 'practical',
        effects: { intelligence: 8 },
        loyaltyEffects: { delvessa: 3 },
        setFlags: { ancient_ruin_studied: true },
      },
    ],
  },
  {
    id: 'explore_smuggler',
    action: 'explore_local',
    title: 'THE BACK CHANNEL',
    description: 'In a warehouse on {current_island} that officially doesn\'t exist, a woman with Kolmari tattoos offers you a deal. "Military-grade supplies. Fell off a Wardensea transport. Very reasonable prices. Very limited window."',
    weight: 4,
    repeatable: true,
    minDay: 5,
    choices: [
      {
        id: 'smuggler_buy',
        text: 'Buy. Don\'t ask questions.',
        resultText: 'The supplies are genuine, high quality, and definitely stolen. Your hold is fuller. Your conscience is lighter than it should be.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -30, supplies: 15, materials: 5 },
        infamyChange: 1,
      },
      {
        id: 'smuggler_report',
        text: 'Report the operation to local authorities.',
        resultText: 'The warehouse is raided that evening. The smuggler vanishes. The authorities are grateful, publicly. Your name shows up in favorable Grimoire reports the next day.',
        choiceArchetype: 'cautious',
        reputationChange: 5,
        effects: { intelligence: 2 },
      },
      {
        id: 'smuggler_negotiate',
        text: 'I don\'t want goods. I want a contact.',
        resultText: 'She studies you. Then smiles. "Smarter than you look, Karyudon." She gives you a name and a signal pattern. A Kolmari information broker who owes her a favor. Now they owe you.',
        choiceArchetype: 'diplomatic',
        effects: { intelligence: 5 },
        setFlags: { kolmari_contact: true },
      },
    ],
  },
  {
    id: 'explore_wrecked_ship',
    action: 'explore_local',
    title: 'BEACHED WRECK',
    description: 'Suulen spotted it from the high ground: a ship run aground on the reef, recent. The hull is intact enough to salvage. But the flag it flies belongs to the Wardensea.',
    weight: 3,
    repeatable: false,
    choices: [
      {
        id: 'wreck_salvage',
        text: 'Salvage everything. They can\'t stop us.',
        resultText: 'Six hours of hard labor yields excellent results. Supplies, materials, even a locked intelligence case that Kovesse cracks in twenty minutes. The Wardensea will know who took it. You don\'t care.',
        choiceArchetype: 'aggressive',
        effects: { supplies: 10, materials: 8, intelligence: 4, sovereigns: 15 },
        bountyChange: 5000000,
        infamyChange: 2,
      },
      {
        id: 'wreck_selective',
        text: 'Take what we need. Leave the rest.',
        resultText: 'Selective salvage. Enough to matter, not enough to provoke a full response. Delvessa approves of the restraint. Dragghen does not.',
        choiceArchetype: 'cautious',
        effects: { supplies: 5, materials: 4 },
        loyaltyEffects: { delvessa: 2, dragghen: -1 },
      },
      {
        id: 'wreck_rescue',
        text: 'Check for survivors first.',
        resultText: 'Three sailors, dehydrated, grateful. You give them water and directions to the nearest port. One of them says "I\'ll remember this, Karyudon." Whether that\'s a promise or a threat depends on what the Wardensea does with the information.',
        choiceArchetype: 'diplomatic',
        effects: { supplies: -3 },
        reputationChange: 5,
      },
    ],
  },
  {
    id: 'explore_nothing_special',
    action: 'explore_local',
    title: 'LONG WALK',
    description: 'Hours of searching {current_island}. Empty shoreline, quiet woods, nothing remarkable. Sometimes the sea gives you treasures. Sometimes it just gives you exercise.',
    weight: 6,
    repeatable: true,
    choices: [
      {
        id: 'nothing_thorough',
        text: 'Keep searching. There\'s always something.',
        resultText: 'Persistence pays off in small ways. A handful of salvageable materials from an old campsite. Some usable timber Dragghen can work with. Not a fortune, but not nothing.',
        choiceArchetype: 'practical',
        effects: { materials: 3, supplies: 2 },
      },
      {
        id: 'nothing_map',
        text: 'Use the time to map the terrain.',
        resultText: 'If you can\'t find treasure, find knowledge. You sketch coastline features, note landmark positions, and identify three potential ambush points. Vorreth will want to see these.',
        choiceArchetype: 'practical',
        effects: { intelligence: 3 },
      },
    ],
  },
  {
    id: 'explore_conqueror_cache',
    action: 'explore_local',
    title: 'THE CONQUEROR\'S STASH',
    description: 'Behind a false wall in an abandoned outpost, you find a sealed chest. The lock bears a Conqueror\'s seal, years old and corroded. Someone powerful left this here and never came back for it.',
    weight: 2,
    minDay: 12,
    repeatable: false,
    requiredFlags: { anvil_cay_conquered: true },
    choices: [
      {
        id: 'cache_open',
        text: 'Break the seal. Whatever\'s inside is yours now.',
        resultText: 'Inside: a signet ring, heavy iron, bearing the mark of a former Bastion Sea Conqueror. It pulses with faint Dominion resonance. The previous owner is dead or gone. The ring remembers power.',
        choiceArchetype: 'risky',
        grantEquipmentId: 'conqueror_signet',
        setFlags: { found_conqueror_cache: true },
      },
      {
        id: 'cache_sell',
        text: 'Sell the chest sealed. Collectors pay for mystery.',
        resultText: 'A collector in the port district pays handsomely for a "genuine Conqueror relic, provenance unknown, seal intact." You walk away richer. You wonder what was inside. You wonder if you\'ll regret that.',
        choiceArchetype: 'trade',
        effects: { sovereigns: 120 },
      },
    ],
  },
  {
    id: 'explore_leviathan_tooth',
    action: 'explore_local',
    title: 'TOOTH OF THE DEEP',
    description: 'Washed up in a tidal cave: a massive fang, longer than your forearm. The enamel is shot through with bioluminescent veins. This belonged to something enormous. Dragghen examines it, turning it over with a shipwright\'s eye. "I can shape this. Material quality, solid six. Maybe higher once I see how it takes an edge."',
    weight: 1,
    minDay: 18,
    repeatable: false,
    requiresIsland: 'ghostlight_reef',
    requiresCrew: 'dragghen',
    choices: [
      {
        id: 'leviathan_forge',
        text: 'Let Dragghen shape it.',
        resultText: 'Three hours of careful work. Dragghen carves and shapes the fang into a blade that seems to drink the light around it. The edge is supernaturally sharp. "Don\'t test it on anything you want to keep," he says. "Craftsmanship rating: six." From him, that\'s practically reverence.',
        choiceArchetype: 'practical',
        effects: { materials: -5 },
        grantEquipmentId: 'leviathan_fang',
        loyaltyEffects: { dragghen: 3 },
        setFlags: { leviathan_fang_forged: true },
      },
      {
        id: 'leviathan_sell',
        text: 'Sell it. A fang this rare is worth a fortune.',
        resultText: 'A marine biologist from the Consortium offers 200 Sovereigns. No questions, no paperwork. Dragghen looks disappointed but says nothing. The money is real. The weapon that could have been is just a hypothetical now.',
        choiceArchetype: 'trade',
        effects: { sovereigns: 200 },
      },
    ],
  },
  {
    id: 'explore_old_compass',
    action: 'explore_local',
    title: 'THE NEEDLE THAT DOESN\'T POINT NORTH',
    description: 'In a waterlogged lockbox half-buried in sand: a navigation instrument. Pre-Wardensea design, materials nobody uses anymore. The needle doesn\'t point north. Suulen takes one look and goes quiet. "That\'s not broken," she says. "It points toward large concentrations of Dominion energy."',
    weight: 2,
    minDay: 15,
    repeatable: false,
    requiresIsland: 'mirrorwater',
    requiresCrew: 'suulen',
    choices: [
      {
        id: 'compass_keep',
        text: 'Keep it. A Dominion compass is invaluable.',
        resultText: 'Suulen calibrates the compass over the next hour. It works. Dominion sources light up the needle like a signal fire. "The ancients used these to find each other," she says. "And to find threats." Both useful.',
        choiceArchetype: 'practical',
        grantEquipmentId: 'ancient_compass',
        loyaltyEffects: { suulen: 4 },
        setFlags: { found_ancient_compass: true },
      },
      {
        id: 'compass_study',
        text: 'Let Suulen study it. The technology matters more than the artifact.',
        resultText: 'Suulen disassembles it carefully, documenting every component. The knowledge gained is substantial, even if the compass itself is now in pieces. "I can build a better one," she promises. "Eventually."',
        choiceArchetype: 'practical',
        effects: { intelligence: 15 },
        loyaltyEffects: { suulen: 2 },
        dominionXP: { expression: 'sight', amount: 8 },
      },
    ],
  },

  // --- Kingsrun & World Connection Events ---

  {
    id: 'explore_kingsrun_map',
    action: 'explore_local',
    title: 'THE SIXTEEN STOPS',
    description: 'Pinned to a tavern wall: a navigation chart showing the Kingsrun course. Sixteen stops, each one labeled in a different hand. Someone has crossed out three of them and written "dead" next to each. The chart is recent.',
    weight: 2,
    minDay: 10,
    repeatable: false,
    choices: [
      {
        id: 'kingsrun_study',
        text: 'Memorize the route. Every stop, every hazard.',
        resultText: 'Selvaggio, Caldruun, The Verethrin Span, the Kassuran Crossing. Sixteen gates between the Bastion Sea and the top of the world. The chart includes current depths, tidal windows, and garrison positions. Whoever made this was planning a run.',
        choiceArchetype: 'cautious',
        effects: { intelligence: 8 },
        setFlags: { kingsrun_route_studied: true },
      },
      {
        id: 'kingsrun_take',
        text: 'Pull it off the wall. This is too valuable to leave.',
        resultText: 'The barkeep watches you take it. Says nothing. Either he does not care, or the person who pinned it there is already dead. Either way, the chart is yours. Delvessa will want to see every inch of it.',
        choiceArchetype: 'risky',
        effects: { intelligence: 12 },
        loyaltyEffects: { delvessa: 2 },
        infamyChange: 1,
        setFlags: { kingsrun_route_studied: true },
      },
    ],
  },
  {
    id: 'explore_kingsrun_survivor',
    action: 'explore_local',
    title: 'THE ONE WHO CAME BACK',
    description: 'A woman sits alone at the end of a dock, staring at the horizon. Missing her left hand below the wrist. The scars on her neck are Resonance burns, the kind you get when a ship\'s core cracks. She ran the Kingsrun. She did not finish.',
    weight: 2,
    minDay: 15,
    repeatable: false,
    choices: [
      {
        id: 'survivor_listen',
        text: 'Sit down. Listen.',
        resultText: 'Her crew broke apart at the ninth stop. Verethrin Span. The Wardensea had repositioned a full blockade there, three days ahead of schedule. Someone talked. She lost fourteen people and her ship. "The Kingsrun doesn\'t forgive hesitation," she says. "And it doesn\'t forgive trust."',
        choiceArchetype: 'diplomatic',
        effects: { intelligence: 6 },
        reputationChange: 2,
        setFlags: { kingsrun_survivor_met: true },
      },
      {
        id: 'survivor_recruit_offer',
        text: 'You know the route. I need someone who knows the route.',
        resultText: 'She looks at you for a long time. Then at the water. "I\'m done, Karyudon. But I can draw you what I remember. Every patrol timing, every current shift between stops five and twelve." She draws for two hours straight. Her hands shake the entire time.',
        choiceArchetype: 'practical',
        effects: { intelligence: 10 },
        setFlags: { kingsrun_survivor_met: true, kingsrun_intel_partial: true },
      },
    ],
  },
  {
    id: 'explore_kingsrun_betting',
    action: 'explore_local',
    title: 'SEASON ODDS',
    description: 'A crowd has gathered around a posted broadsheet: this year\'s Kingsrun betting odds. Your name is on the list. Whoever compiled this has you at 14-to-1, which is either flattering or insulting depending on how you feel about being ranked behind six people you have never heard of.',
    weight: 3,
    minDay: 20,
    repeatable: true,
    choices: [
      {
        id: 'betting_read',
        text: 'Read the full list. Know your competition.',
        resultText: 'Vassago Moren, 3-to-1 favorite. Daeshara Kolvaan, 5-to-1. Goltieri Masrinn, 8-to-1. Your name sits in the middle of the pack, sandwiched between a Kassuran raider crew and a Gorundai privateer collective. The commentary section describes your territory gains as "aggressive but unsustainable." Delvessa disagrees. Loudly.',
        choiceArchetype: 'cautious',
        effects: { intelligence: 3 },
      },
      {
        id: 'betting_bet',
        text: 'Place a bet. On yourself, obviously.',
        resultText: 'The bookie takes your money with a grin. "14-to-1 on Karyudon? Your money, friend." If you complete the Kingsrun, that bet pays 1,400 sovereigns. If you don\'t, the bookie retires comfortably on the collective hubris of Conquerors who believed their own legend.',
        choiceArchetype: 'risky',
        effects: { sovereigns: -100 },
        setFlags: { kingsrun_bet_placed: true },
      },
    ],
  },
  {
    id: 'explore_kingsrun_wreckage',
    action: 'explore_local',
    title: 'FLOTSAM FROM THE ROUTE',
    description: 'Debris washed into the shallows. Charred planking, a shattered mast, cargo barrels stamped with a Conqueror\'s seal. Someone attempted the Kingsrun recently. The sea returned what was left of them.',
    weight: 2,
    minDay: 25,
    repeatable: false,
    choices: [
      {
        id: 'wreckage_salvage',
        text: 'Salvage what you can.',
        resultText: 'The cargo barrels hold sealed charts and a waterproof journal. The last entry reads: "Stop 11, Ossengaard. Belvan Orech has closed the strait. No passage without tribute. Crew voted to force it." There is no twelfth entry. Orren picks through the wreckage quietly. His ears are flat.',
        choiceArchetype: 'practical',
        effects: { materials: 6, intelligence: 5 },
        requiresCrew: 'orren',
        loyaltyEffects: { orren: -2 },
        setFlags: { kingsrun_wreckage_found: true },
      },
      {
        id: 'wreckage_memorial',
        text: 'Mark the site. Sailors deserve that much.',
        resultText: 'Dragghen drives a timber post into the sand. Vorreth says nothing, but he stands with you for a while. The Bastion Sea takes everyone eventually. The question is whether you leave a mark before it does.',
        choiceArchetype: 'diplomatic',
        reputationChange: 3,
        loyaltyEffects: { dragghen: 2, vorreth: 1 },
      },
    ],
  },
];

// ==========================================
// MANAGE TERRITORY EVENTS
// ==========================================

const manageTerritoryEvents: DayActionEvent[] = [
  {
    id: 'manage_resource_dispute',
    action: 'manage_territory',
    title: 'RESOURCE DISPUTE',
    description: 'Two {current_island} faction leaders are in your hall, both speaking at once. The fishers want exclusive access to the south docks. The merchants say that will kill trade. Both are threatening to pull their support if they don\'t get satisfaction.',
    weight: 5,
    repeatable: true,
    choices: [
      {
        id: 'dispute_fishers',
        text: 'The fishers feed this island. Give them priority.',
        resultText: 'The fishers cheer. The merchants grumble but comply. Food security improves. Trade slows. The people eat. That\'s what matters.',
        choiceArchetype: 'practical',
        effects: { supplies: 5 },
        moraleChange: 4,
      },
      {
        id: 'dispute_merchants',
        text: 'Trade keeps the economy alive. Merchants get access.',
        resultText: 'Coin flows. The merchants are efficient, organized, grateful. The fishers find workarounds. Not ideal, but the treasury notices.',
        choiceArchetype: 'trade',
        effects: { sovereigns: 15 },
        moraleChange: 2,
      },
      {
        id: 'dispute_shared',
        text: 'Split the docks. Morning for fishers, afternoon for merchants.',
        resultText: 'Neither side is thrilled. Both sides can live with it. You\'ve discovered the fundamental truth of governance: the best solutions make everyone equally annoyed.',
        choiceArchetype: 'diplomatic',
        moraleChange: 3,
        dominionXP: { expression: 'king', amount: 5 },
      },
    ],
  },
  {
    id: 'manage_infrastructure',
    action: 'manage_territory',
    title: 'BUILDING PROJECT',
    description: 'The {current_island} governor presents two proposals, each urgent, each requiring the same pool of workers. "We can fortify the harbor entrance or build a marketplace. Not both. Not this month."',
    weight: 4,
    repeatable: true,
    choices: [
      {
        id: 'infra_fortify',
        text: 'Fortify the harbor. Security first.',
        resultText: 'Walls go up. Watchtowers follow. The population sleeps better knowing the harbor has teeth. Morale rises with the stonework.',
        choiceArchetype: 'cautious',
        moraleChange: 6,
        effects: { materials: -8 },
        setFlags: { territory_fortified: true },
      },
      {
        id: 'infra_market',
        text: 'Build the marketplace. Economy drives everything.',
        resultText: 'Within a week, the marketplace is buzzing. Traders from neighboring islands start arriving. Revenue climbs. The people see prosperity, and prosperity buys loyalty.',
        choiceArchetype: 'trade',
        effects: { materials: -8, sovereigns: 10 },
        moraleChange: 3,
        setFlags: { territory_marketplace_built: true },
      },
    ],
  },
  {
    id: 'manage_civilian_petition',
    action: 'manage_territory',
    title: 'PETITION',
    description: 'A delegation of {current_island} civilians requests an audience. Their concerns are practical: water supply is unreliable, the old well system needs repair. It\'s not dramatic. It\'s not exciting. It\'s governance.',
    weight: 5,
    repeatable: true,
    choices: [
      {
        id: 'petition_fix',
        text: 'Authorize the repairs. Allocate supplies.',
        resultText: 'The well system is fixed in three days. Clean water flows. The delegation spreads the word: Karyudon listens. It\'s a small thing. Small things compound.',
        choiceArchetype: 'practical',
        effects: { supplies: -5 },
        moraleChange: 6,
        reputationChange: 2,
      },
      {
        id: 'petition_later',
        text: 'Acknowledge the issue. Promise action when resources allow.',
        resultText: 'They leave unsatisfied but not hostile. You\'ve bought time. The question is whether you\'ll spend it well.',
        choiceArchetype: 'cautious',
        moraleChange: -2,
      },
      {
        id: 'petition_delegate',
        text: 'Send Kovesse. She\'ll engineer a permanent solution.',
        resultText: 'Kovesse designs a rainwater collection system that makes the old wells redundant. It costs more upfront but the islanders will never ask about water again.',
        choiceArchetype: 'practical',
        effects: { materials: -6, supplies: -3 },
        moraleChange: 8,
        loyaltyEffects: { kovesse: 3 },
        requiresCrew: 'kovesse',
      },
    ],
  },
  {
    id: 'manage_spy_caught',
    action: 'manage_territory',
    title: 'SPY IN THE RANKS',
    description: 'Delvessa is waiting when you arrive at {current_island}. Her expression is the carefully neutral one she uses for bad news. "We caught someone sending Grimoire transmissions to the Wardensea. A clerk in the supply office. He\'s in custody. Your call."',
    weight: 3,
    repeatable: true,
    minDay: 10,
    choices: [
      {
        id: 'spy_public',
        text: 'Public trial. Make an example.',
        resultText: 'The trial is swift, the verdict public, the punishment visible. Fear has a smell, and {current_island} reeks of it for a week. Nobody else will be sending unauthorized transmissions. Probably.',
        choiceArchetype: 'aggressive',
        moraleChange: -3,
        infamyChange: 4,
        effects: { intelligence: 2 },
      },
      {
        id: 'spy_flip',
        text: 'Turn him. Feed false intelligence through his channel.',
        resultText: 'Delvessa handles the conversion with surgical precision. Within a day, the Wardensea is receiving carefully crafted misinformation. A liability becomes an asset.',
        choiceArchetype: 'risky',
        effects: { intelligence: 6 },
        loyaltyEffects: { delvessa: 4 },
        setFlags: { wardensea_double_agent: true },
      },
      {
        id: 'spy_mercy',
        text: 'Release him. With a message for his handlers.',
        resultText: '"Tell the Wardensea that Karyudon catches spies and sends them back alive. That should concern them more than a dead one." The man leaves trembling. The message is received.',
        choiceArchetype: 'diplomatic',
        reputationChange: 3,
        moraleChange: 2,
        dominionXP: { expression: 'king', amount: 5 },
      },
    ],
  },
  {
    id: 'manage_festival',
    action: 'manage_territory',
    title: 'FESTIVAL PROPOSAL',
    description: 'The {current_island} council proposes a festival. "The people need something to celebrate, Captain. Morale is currency here. A day of food, drink, and music would buy us months of goodwill."',
    weight: 4,
    repeatable: true,
    choices: [
      {
        id: 'festival_grand',
        text: 'Go big. Spare no expense.',
        resultText: 'The festival becomes a legend. People come from neighboring islands. There\'s music, Vorreth\'s bare-knuckle exhibition draws a crowd of hundreds, and Dragghen fixes three buildings while everyone watches. The cost is significant. The returns are incalculable.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -40, supplies: -10 },
        moraleChange: 12,
        reputationChange: 4,
      },
      {
        id: 'festival_modest',
        text: 'Approve it, but keep costs reasonable.',
        resultText: 'A modest celebration. Good food, some entertainment, an evening of normalcy in a world that doesn\'t offer much of it. The people appreciate the gesture.',
        choiceArchetype: 'practical',
        effects: { sovereigns: -15, supplies: -5 },
        moraleChange: 7,
        reputationChange: 1,
      },
      {
        id: 'festival_deny',
        text: 'Not now. We can\'t afford distractions.',
        resultText: 'The council accepts the decision without enthusiasm. The streets stay quiet. Efficient. Joyless. The supplies stay in the hold. Dragghen rates the decision under his breath. "Two."',
        choiceArchetype: 'cautious',
        loyaltyEffects: { dragghen: -2 },
        moraleChange: -3,
      },
    ],
  },
  {
    id: 'manage_construction_crew',
    action: 'manage_territory',
    title: 'LABOR SHORTAGE',
    description: 'The {current_island} upgrade construction has stalled. Workers are quitting. The foreman says the hours are too long and the pay is too low. He\'s not wrong, but the timeline can\'t slip.',
    weight: 4,
    repeatable: true,
    choices: [
      {
        id: 'labor_pay',
        text: 'Increase wages. Happy workers build faster.',
        resultText: 'The budget takes a hit, but the work resumes at double pace. The foreman nods respect. "First ruler on this rock who understood that walls are built by people, not by orders."',
        choiceArchetype: 'trade',
        effects: { sovereigns: -25 },
        moraleChange: 5,
        reputationChange: 2,
      },
      {
        id: 'labor_crew',
        text: 'Put the crew to work alongside them.',
        resultText: 'Dragghen carries stones and redesigns the foundation layout on the fly. Vorreth organizes shifts with terrifying calm. The locals see Karyudon\'s crew sweating beside them and something shifts. "If the captain\'s people work, I work." The shortage ends.',
        choiceArchetype: 'practical',
        loyaltyEffects: { dragghen: 2, vorreth: 2 },
        moraleChange: 4,
      },
    ],
  },
];

// ==========================================
// TRADE RUN EVENTS
// ==========================================

const tradeRunEvents: DayActionEvent[] = [
  {
    id: 'trade_rare_goods',
    action: 'trade_run',
    title: 'RARE FIND',
    description: 'A merchant from the Southern Reach has arrived with cargo that shouldn\'t be here: Ghostlight reef pearls, worth a fortune to the right buyer. She\'s selling cheap because she needs to leave fast. Very fast.',
    weight: 4,
    repeatable: true,
    minDay: 8,
    choices: [
      {
        id: 'rare_buy',
        text: 'Buy everything she has.',
        resultText: 'Forty sovereigns for what\'s worth two hundred on any civilized market. The pearls will sell. The question of why she was running will answer itself eventually.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -40 },
        setFlags: { ghostlight_pearls_acquired: true },
      },
      {
        id: 'rare_ask',
        text: 'Why the rush? What are you running from?',
        resultText: '"Wardensea trade embargo on Southern Reach goods. Effective tomorrow." The information is more valuable than any pearl. You buy a handful and memorize every word she says.',
        choiceArchetype: 'cautious',
        effects: { sovereigns: -15, intelligence: 5 },
      },
      {
        id: 'rare_pass',
        text: 'Too good to be true. Walk away.',
        resultText: 'Delvessa gives you a look. "Sometimes paranoia is wisdom, Captain." The merchant finds another buyer within the hour. You\'ll never know if it was the right call.',
        choiceArchetype: 'cautious',
      },
    ],
  },
  {
    id: 'trade_price_dispute',
    action: 'trade_run',
    title: 'HARD BARGAIN',
    description: 'The {current_island} port master wants a tariff. Fifteen percent on all goods, effective immediately. "New policy," he says, not meeting your eyes. Someone is pressuring him. Someone with authority.',
    weight: 5,
    repeatable: true,
    choices: [
      {
        id: 'tariff_pay',
        text: 'Pay the tariff. Pick your battles.',
        resultText: 'Fifteen percent hurts, but the market access is worth it. You pay and make a mental note of who is squeezing this port. That information will be useful later.',
        choiceArchetype: 'cautious',
        effects: { sovereigns: -20, intelligence: 2 },
      },
      {
        id: 'tariff_negotiate',
        text: 'Negotiate. Offer something besides coin.',
        resultText: '"Protection services," you suggest. "Your harbor, my crew." The port master considers. Nods. The tariff drops to five percent, and you\'ve gained an ally who now depends on you.',
        choiceArchetype: 'diplomatic',
        reputationChange: 2,
        effects: { sovereigns: -8 },
        successChance: 50,
        failText: 'He won\'t budge. "I have my orders, Karyudon." You pay full price. And he doubles the tariff for next time out of spite.',
        failEffects: { sovereigns: -35 },
      },
      {
        id: 'tariff_refuse',
        text: 'I don\'t pay tariffs.',
        resultText: 'The port master goes pale. He waives the fee. But the person behind the policy will hear about this, and they won\'t be as easily intimidated.',
        choiceArchetype: 'aggressive',
        infamyChange: 3,
        bountyChange: 2000000,
      },
    ],
  },
  {
    id: 'trade_black_market',
    action: 'trade_run',
    title: 'UNDERGROUND OPPORTUNITY',
    description: 'A contact slides a note across the table. "Storage bay four. Midnight. Wardensea supply crates, already cracked. First come, first serve. Bring coin, not questions."',
    weight: 3,
    repeatable: true,
    minDay: 10,
    choices: [
      {
        id: 'black_buy',
        text: 'Show up with coin.',
        resultText: 'The crates contain military-grade supplies and intelligence documents. The price is steep but the quality is unquestionable. Whoever is running this operation knows their business.',
        choiceArchetype: 'risky',
        effects: { sovereigns: -50, supplies: 12, intelligence: 4 },
        infamyChange: 2,
        successChance: 60,
        failText: 'The crates are already gone when you arrive. Worse, someone tipped off a patrol. You barely escape the warehouse before Wardensea officers sweep the block. The night costs you supplies and nerves.',
        failEffects: { supplies: -6 },
      },
      {
        id: 'black_tip_off',
        text: 'Tip off the authorities.',
        resultText: 'The bust makes the Grimoire feeds. Three arrests. The local constable owes you a favor, publicly. The underground market goes quiet for a month.',
        choiceArchetype: 'cautious',
        reputationChange: 5,
        effects: { intelligence: 2 },
      },
    ],
  },
  {
    id: 'trade_merchant_gossip',
    action: 'trade_run',
    title: 'MERCHANT TALK',
    description: 'Over drinks at the trade hall, a traveling merchant leans in. "You want to know something interesting? I just came from the Northern Arc. The things I saw..." She trails off, glancing at your coin purse.',
    weight: 5,
    repeatable: true,
    choices: [
      {
        id: 'gossip_buy',
        text: 'Buy her a round. Let her talk.',
        resultText: 'Three rounds and two hours later, you have a detailed picture of trade flows, patrol patterns, and which islands are struggling. Worth every sovereign. Delvessa will want to hear this.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -8, intelligence: 4 },
      },
      {
        id: 'gossip_trade_info',
        text: 'Trade information for information.',
        resultText: 'You share what you can afford to share. She shares back. Both of you walk away richer in the only currency that matters in the Bastion Sea: knowledge.',
        choiceArchetype: 'diplomatic',
        effects: { intelligence: 3 },
      },
    ],
  },
  {
    id: 'trade_tax_collectors',
    action: 'trade_run',
    title: 'WARDENSEA AUDIT',
    description: 'Two officers in Wardensea uniforms approach your market stall. Official badges, official expressions, official clipboards. "Routine trade audit. All goods subject to inspection and a ten percent import levy." They know exactly who you are.',
    weight: 3,
    repeatable: true,
    minDay: 12,
    choices: [
      {
        id: 'audit_comply',
        text: 'Comply. No point provoking them here.',
        resultText: 'You surrender ten percent and endure an hour of bureaucratic theater. They find nothing illegal because Delvessa is thorough. The officers leave, disappointed.',
        choiceArchetype: 'cautious',
        effects: { sovereigns: -15 },
      },
      {
        id: 'audit_bribe',
        text: 'Offer an "expedited processing fee."',
        resultText: 'One officer looks at the other. A small bag of coin changes hands under the counter. "Audit complete. No violations found." Corruption is a universal language.',
        choiceArchetype: 'risky',
        effects: { sovereigns: -25 },
        infamyChange: 1,
      },
      {
        id: 'audit_refuse',
        text: '"You have no jurisdiction here."',
        resultText: 'They do, technically. But they also know who you are, and enforcing the audit would require backup they don\'t have. They leave. They\'ll be back. With friends.',
        choiceArchetype: 'aggressive',
        bountyChange: 5000000,
        infamyChange: 2,
        dominionXP: { expression: 'king', amount: 4 },
      },
    ],
  },
  {
    id: 'trade_good_deals',
    action: 'trade_run',
    title: 'BUYER\'S MARKET',
    description: 'A merchant fleet just arrived at {current_island} with surplus cargo. Prices are temporarily depressed. It\'s a rare chance to stock up.',
    weight: 6,
    repeatable: true,
    choices: [
      {
        id: 'deals_supplies',
        text: 'Buy supplies at half price.',
        resultText: 'Crates of provisions fill your hold. Dragghen inspects each one personally, checking crate construction and seal integrity. "Packaging, solid four. Contents look intact." He tightens a loose nail on the way out.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -20, supplies: 15 },
      },
      {
        id: 'deals_materials',
        text: 'Buy raw materials. Invest in upgrades.',
        resultText: 'Iron, copper, hardwood, rope. The building blocks of power. Kovesse is practically vibrating with excitement when she sees the haul.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -25, materials: 12 },
        loyaltyEffects: { kovesse: 2 },
      },
      {
        id: 'deals_resell',
        text: 'Buy low here, sell high elsewhere.',
        resultText: 'You buy what you can carry and calculate the markup at every other port you know. Pure profit, if you can get it there.',
        choiceArchetype: 'trade',
        effects: { sovereigns: -30 },
        setFlags: { trade_surplus_purchased: true },
      },
    ],
  },
];

// ==========================================
// COMBINED EVENT POOL
// ==========================================

// ==========================================
// ARRIVAL APPROACH PAYOFF EVENTS
// ==========================================
// These fire based on what the player chose in Tavven (worker/bold/silent)
// and the prologue dragon fruit decision (kept/tempted).
// Making early choices matter mechanically.

const arrivalPayoffEvents: DayActionEvent[] = [
  {
    id: 'payoff_worker_reputation',
    action: 'rest',
    title: 'THE DOCKWORKER REMEMBERS',
    description: 'A burly woman approaches the camp fire. She looks familiar. "You\'re the Oni who asked for work at the fish market, first day on the island. I was watching." She sets down a crate. "People who ask before they take get remembered here."',
    weight: 4,
    repeatable: false,
    minDay: 6,
    requiredFlags: { arrival_approach: 'worker' },
    choices: [
      {
        id: 'worker_accept',
        text: 'Accept the gift. Thank her.',
        resultText: 'The crate contains dried fish, fresh water, and a hand-drawn map of safe harbors along the Northern Arc. She tips her hat and walks away. Word of mouth built this. A single choice at a food stall, compounding.',
        choiceArchetype: 'diplomatic',
        effects: { supplies: 12, intelligence: 3 },
        reputationChange: 3,
      },
      {
        id: 'worker_recruit',
        text: 'I could use people who pay attention.',
        resultText: '"Thought you\'d say that." She grins. "Name\'s Mira. I know every dock schedule in the Central Belt." She\'s not a fighter, but the logistics knowledge alone is worth five soldiers.',
        choiceArchetype: 'practical',
        effects: { intelligence: 6 },
        reputationChange: 5,
        setFlags: { local_dock_contact: true },
      },
    ],
  },
  {
    id: 'payoff_bold_infamy',
    action: 'explore_local',
    title: 'BOLD REPUTATION',
    description: 'Three young fighters block your path. Not threatening, eager. "You\'re the Oni who took food from a Kolmari stall on his first day and told the vendor to put it on his tab. That was the funniest thing anyone\'s done on this island in years." They want to fight you. For practice. For bragging rights.',
    weight: 4,
    repeatable: false,
    minDay: 6,
    requiredFlags: { arrival_approach: 'bold' },
    choices: [
      {
        id: 'bold_spar',
        text: 'Three against one? Make it five.',
        resultText: 'The fight draws a crowd. You don\'t use Dominion, just fists. Fifteen minutes later, five local fighters are on their backs and you\'re standing with a split lip and a crowd chanting something that sounds suspiciously like a nickname.',
        choiceArchetype: 'aggressive',
        dominionXP: { expression: 'iron', amount: 8 },
        infamyChange: 4,
        bountyChange: 2000000,
      },
      {
        id: 'bold_drink',
        text: 'Buy them a drink instead. Save the violence.',
        resultText: 'They\'re disappointed but they drink. Two hours later they\'re telling you everything about the port district, which warehouses are watched, which docks have blind spots, who pays bribes to whom. Boldness opened the door. Generosity opened the mouths.',
        choiceArchetype: 'diplomatic',
        effects: { sovereigns: -15, intelligence: 5 },
        reputationChange: 2,
      },
    ],
  },
  {
    id: 'payoff_silent_intelligence',
    action: 'explore_local',
    title: 'THE SHADOW KNOWS',
    description: 'Suulen finds you with a report. "Captain. Remember your first day? You watched the market for an hour before making a move. I noticed. So did someone else." She holds out a sealed note, left at your camp by someone who never showed their face.',
    weight: 4,
    repeatable: false,
    minDay: 6,
    requiredFlags: { arrival_approach: 'silent' },
    choices: [
      {
        id: 'silent_read',
        text: 'Open it.',
        resultText: 'Inside: a detailed map of Wardensea patrol schedules for the next month, a list of informants in Pettha Koss\'s circle, and a single sentence. "Patience is rare. Here is its reward." Unsigned. Whoever is watching, they approve of how you operate.',
        choiceArchetype: 'risky',
        effects: { intelligence: 10 },
        setFlags: { shadow_benefactor: true },
      },
      {
        id: 'silent_burn',
        text: 'Burn it. Gifts from unknowns are never free.',
        resultText: 'Suulen nods approvingly. "Smart." The note burns. But the fact that someone is watching, someone with access to Wardensea intelligence, is information in itself. You file that away.',
        choiceArchetype: 'cautious',
        effects: { intelligence: 3 },
        dominionXP: { expression: 'sight', amount: 5 },
      },
    ],
  },
  {
    id: 'payoff_fruit_temptation',
    action: 'train',
    title: 'THE FRUIT CALLS',
    description: 'During training, the sealed case in your coat pulses. Hot. Insistent. The Dragon Fruit inside knows you\'re getting stronger, and it wants to be part of that. Your hands shake for a moment. Just a moment.',
    weight: 3,
    repeatable: false,
    minDay: 12,
    requiredFlags: { dragon_fruit_decision: 'kept' },
    choices: [
      {
        id: 'fruit_resist',
        text: 'Not yet. You resist through will alone.',
        resultText: 'The urge passes. Your King Dominion flares in response, the willpower to deny yourself something you want. Discipline that separates Forged from Prime.',
        choiceArchetype: 'cautious',
        dominionXP: { expression: 'king', amount: 15 },
      },
      {
        id: 'fruit_study',
        text: 'Open the case. Study the Fruit. Don\'t eat it.',
        resultText: 'The Western Dragon scale pattern shimmers under your gaze. Delvessa appears over your shoulder. "The energy signature is increasing. It\'s reacting to your Dominion growth." She pauses. "It wants a host that can handle it. You\'re getting closer to that threshold."',
        choiceArchetype: 'risky',
        effects: { intelligence: 3 },
        dominionXP: { expression: 'sight', amount: 8 },
        loyaltyEffects: { delvessa: 2 },
      },
    ],
  },
];

// ==========================================
// DEFEND TERRITORY EVENTS
// ==========================================

const defendTerritoryEvents: DayActionEvent[] = [
  {
    id: 'defend_fortify_walls',
    action: 'defend_territory',
    title: 'STONE AND IRON',
    description: 'The crew hauls stone and iron to the {current_island} wall line. Dragghen surveys the existing foundations with a builder\'s eye. "Sloppy work. Mortar\'s thin on the seaward face. Three hours, I can double the tensile strength." He is not exaggerating.',
    weight: 10,
    repeatable: true,
    choices: [
      {
        id: 'fortify_full',
        text: 'Let Dragghen lead the fortification effort.',
        resultText: 'Four hours of precision stonework. Dragghen moves like a man possessed, directing crew and locals with barked measurements and sharp gestures. By dusk, the wall line is transformed. Solid. Professional. Work that breaks siege rams.',
        choiceArchetype: 'practical',
        effects: { materials: -5 },
        moraleChange: 3,
        requiresCrew: 'dragghen',
      },
      {
        id: 'fortify_basic',
        text: 'Do what you can with what you have.',
        resultText: 'The crew hauls debris and logs into makeshift barricades. It is not elegant. It is not permanent. But it will slow anyone who comes through the gate.',
        choiceArchetype: 'practical',
        effects: { materials: -2 },
      },
      {
        id: 'fortify_trap',
        text: 'Set traps on the approach routes.',
        resultText: 'Tessek handles this. Caltrops on the beach landings. Tripwires in the jungle paths. A cleverly placed false floor over a six-foot drop. "Hospitality," he says, dusting off his hands.',
        choiceArchetype: 'risky',
        effects: { materials: -3 },
        requiresCrew: 'tessek',
        dominionXP: { expression: 'sight', amount: 3 },
      },
    ],
  },
  {
    id: 'defend_rally_populace',
    action: 'defend_territory',
    title: 'RALLY THE POPULACE',
    description: 'The people of {current_island} know the raid is coming. Some are packing. Some are hiding. Some are angry. You stand in the town square and address them directly. Their eyes are on you. Their fear is real.',
    weight: 10,
    repeatable: true,
    choices: [
      {
        id: 'rally_inspire',
        text: '"They will not take what we built. Stand with me."',
        resultText: 'Your voice carries King\'s weight. Not the supernatural pressure of Dominion, but the simpler, older kind. Makes people straighten their spines. By the time you finish, volunteers are lining up for militia duty.',
        choiceArchetype: 'aggressive',
        moraleChange: 8,
        reputationChange: 2,
        dominionXP: { expression: 'king', amount: 4 },
      },
      {
        id: 'rally_practical',
        text: '"Here is the plan. Here is what we need. Here is what happens if we do nothing."',
        resultText: 'No speeches. No theatrics. You lay out the tactical situation, the supply chain, the defense perimeter. The crowd quiets. Heads nod. This is not inspiration. This is competence. And competence, in a crisis, is worth more than fire.',
        choiceArchetype: 'practical',
        moraleChange: 5,
        effects: { intelligence: 2 },
        dominionXP: { expression: 'sight', amount: 3 },
      },
      {
        id: 'rally_arm',
        text: 'Open the armory. Arm anyone who can hold a weapon.',
        resultText: 'Swords. Spears. Crossbows. Half of them are rusty. Half of the people holding them have never swung a blade. But there are a lot of them. And desperation is a multiplier.',
        choiceArchetype: 'aggressive',
        moraleChange: 3,
        effects: { materials: -5 },
        infamyChange: 2,
      },
    ],
  },
  {
    id: 'defend_scout_enemy',
    action: 'defend_territory',
    title: 'ENEMY SCOUTING',
    description: 'Suulen returns from a reconnaissance sweep. Her eyes have that particular distance that means she has seen something she did not like. "Their formation. I can read it." She touches a chart. "Here. Here. And here."',
    weight: 8,
    repeatable: true,
    requiresCrew: 'suulen',
    choices: [
      {
        id: 'scout_full_recon',
        text: 'Full reconnaissance. Map every approach.',
        resultText: 'Suulen spends six hours in the Morventhi navigator trance, reading spatial patterns from the clifftops. When she returns, she has mapped every possible landing zone, approach corridor, and vulnerable chokepoint. The defense plan rewrites itself around her intelligence.',
        choiceArchetype: 'cautious',
        effects: { intelligence: 5 },
        moraleChange: 4,
        dominionXP: { expression: 'sight', amount: 5 },
      },
      {
        id: 'scout_quick',
        text: 'Quick assessment. Focus on the most likely approach.',
        resultText: 'Suulen narrows it to two probable landing sites. Both are defensible if you split resources correctly. If you choose wrong, one flank is exposed. She gives you the odds. You make the call.',
        choiceArchetype: 'practical',
        effects: { intelligence: 3 },
        dominionXP: { expression: 'sight', amount: 2 },
      },
    ],
  },
  {
    id: 'defend_vorreth_command',
    action: 'defend_territory',
    title: 'THE TACTICIAN',
    description: 'Vorreth has been awake for thirty hours. His tactical map is covered in red ink annotations, kill zone calculations, and supply chain flow diagrams. He has not eaten. He has not spoken except in direct orders. This is the version of Vorreth that won seven sieges before he was twenty.',
    weight: 8,
    repeatable: true,
    requiresCrew: 'vorreth',
    choices: [
      {
        id: 'vorreth_command',
        text: 'Give Vorreth tactical command of the defense.',
        resultText: '"Understood." One word. Then he moves. Every crew member gets an assignment. Every civilian gets an evacuation route. Every choke point gets a contingency. It is not warmth. It is not comfort. It is something better. It is precision.',
        choiceArchetype: 'practical',
        moraleChange: 6,
        effects: { intelligence: 3 },
        loyaltyEffects: { vorreth: 3 },
        dominionXP: { expression: 'iron', amount: 3 },
      },
      {
        id: 'vorreth_advise',
        text: 'Consult Vorreth but keep command yourself.',
        resultText: '"Your call, Captain." There is no judgment in the words. Vorreth marks three critical positions on the map, outlines two fallback scenarios, and returns to his calculations. He trusts your leadership. He just makes sure you have the data to justify that trust.',
        choiceArchetype: 'cautious',
        moraleChange: 3,
        effects: { intelligence: 2 },
        dominionXP: { expression: 'king', amount: 3 },
      },
    ],
  },
  {
    id: 'defend_kovesse_grimoire',
    action: 'defend_territory',
    title: 'SIGNAL WARFARE',
    description: 'Kovesse is in the Grimoire relay station, fingers moving across three crystal interfaces simultaneously. "Their communications are encrypted. Mine are better." She does not look up. She does not need to. The Grimoire hums with intercepted data.',
    weight: 8,
    repeatable: true,
    requiresCrew: 'kovesse',
    choices: [
      {
        id: 'kovesse_jam',
        text: 'Jam their communications. Blind the attack force.',
        resultText: 'Kovesse\'s fingers blur. The Grimoire relay spikes, overloading with a targeted electromagnetic burst that turns every Wardensea communication crystal within five miles into an expensive paperweight. "They are deaf," she says. "For approximately six hours. Use them well."',
        choiceArchetype: 'aggressive',
        effects: { intelligence: 4 },
        moraleChange: 5,
        loyaltyEffects: { kovesse: 2 },
        dominionXP: { expression: 'sight', amount: 4 },
      },
      {
        id: 'kovesse_intercept',
        text: 'Intercept their orders. Learn the plan.',
        resultText: 'Three hours of careful decryption. Kovesse peels apart their communication layers like surgical tissue. Wardensea command is thorough but predictable. She maps their assault timing, their reserve positions, their fallback triggers. "Hm. Textbook formation. We can break it."',
        choiceArchetype: 'cautious',
        effects: { intelligence: 6 },
        moraleChange: 3,
        loyaltyEffects: { kovesse: 2 },
      },
    ],
  },
];

export const dayActionEvents: DayActionEvent[] = [
  ...restEvents,
  ...trainEvents,
  ...exploreEvents,
  ...manageTerritoryEvents,
  ...tradeRunEvents,
  ...arrivalPayoffEvents,
  ...defendTerritoryEvents,
];
