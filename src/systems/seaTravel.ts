// =============================================
// GODTIDE: BASTION SEA - Sea Travel System
// =============================================
// Travel between islands isn't just loading screens.
// The sea is where Karyudon's crew becomes a crew.
// Storms hit. Ships pass. Conversations happen.
// =============================================

import type { GameFlags, CrewMember, Resources } from '../types/game';

// ==========================================
// TRAVEL EVENT TYPES
// ==========================================

export type TravelEventCategory =
  | 'combat'       // Sea encounter - pirates, Wardensea, sea beasts
  | 'storm'        // Weather event - costs supplies or time
  | 'discovery'    // Found something - flotsam, wreckage, small island
  | 'crew'         // Crew moment - conversation, argument, bonding
  | 'trade'        // Passing merchant - opportunity to trade
  | 'omen'         // Strange sighting - foreshadowing, worldbuilding
  | 'wardensea';   // Wardensea patrol - evade or confront

export interface TravelEvent {
  id: string;
  category: TravelEventCategory;
  title: string;
  description: string;        // Narrative text shown during travel
  weight: number;             // Weighted random selection
  dangerLevel?: 'safe' | 'moderate' | 'dangerous' | 'deadly';
  /** Only trigger on routes with this danger level or higher */
  minDanger?: 'safe' | 'moderate' | 'dangerous' | 'deadly';
  /** Flag requirements */
  requiredFlags?: Record<string, boolean | string | number>;
  /** Minimum day */
  minDay?: number;
  /** Specific crew member must be recruited */
  requiresCrew?: string;
  /** Can fire multiple times? */
  repeatable: boolean;
  /** Choices presented to the player */
  choices: TravelChoice[];
  /** Resource changes that happen regardless of choice */
  baseEffects?: Partial<Resources>;
}

export interface TravelChoice {
  id: string;
  text: string;
  /** Narrative result text */
  resultText: string;
  /** Resource changes from this choice */
  effects?: Partial<Resources>;
  /** Loyalty changes: { crewId: amount } */
  loyaltyEffects?: Record<string, number>;
  /** Bounty change */
  bountyChange?: number;
  /** Reputation change */
  reputationChange?: number;
  /** Infamy change */
  infamyChange?: number;
  /** Flags to set */
  setFlags?: Record<string, boolean | string | number>;
  /** Triggers a combat encounter by ID */
  triggerCombat?: string;
  /** Crew member required for this option */
  requiresCrew?: string;
  /** Stat check - percentage success chance */
  successChance?: number;
  /** Text shown on failure */
  failText?: string;
  /** Effects on failure */
  failEffects?: Partial<Resources>;
}

// ==========================================
// TRAVEL STATE
// ==========================================

export interface TravelState {
  fromIsland: string;
  toIsland: string;
  totalDays: number;
  currentDay: number;       // 0-indexed, which day of travel
  dangerLevel: 'safe' | 'moderate' | 'dangerous' | 'deadly';
  events: TravelEvent[];    // Events queued for this voyage
  currentEvent: TravelEvent | null;
  eventResolved: boolean;
  selectedChoice: TravelChoice | null;
  choiceResult: string | null;
  choiceSucceeded: boolean;
  complete: boolean;
}

// ==========================================
// SEA TRAVEL EVENTS
// ==========================================

const dangerRank: Record<string, number> = {
  safe: 0,
  moderate: 1,
  dangerous: 2,
  deadly: 3,
};

export const seaTravelEvents: TravelEvent[] = [
  // === CREW MOMENTS ===
  {
    id: 'dragghen_maintains_ship',
    category: 'crew',
    title: 'BELOW DECK HAMMERING',
    description: 'A rhythmic clanging drifts up from below deck. Dragghen has found a warped hull brace, a squealing hinge, and a bilge pump that was "a solid two, generous." He has been down there for three hours. The crew gathers on the lower deck because somehow, the space he fixed is warmer, quieter, and fits better than it did this morning.',
    weight: 4,
    repeatable: true,
    choices: [
      {
        id: 'sit_with_crew',
        text: 'Sit down. Enjoy what he built.',
        resultText: 'You take a seat on a crate he re-braced with copper strapping. Dragghen glances over, nods once, goes back to tightening a bolt. Delvessa is already reading by the new lantern hook he mounted. Suulen materializes from somewhere aft. For a few minutes, nobody talks about conquest or bounties or the Wardensea. Just the sound of a man fixing things and a crew that feels, for once, like they belong somewhere.',
        loyaltyEffects: { dragghen: 3, delvessa: 1, suulen: 1, kovesse: 1, vorreth: 1, tessek: 1, orren: 1 },
      },
      {
        id: 'stay_topside',
        text: 'Stay on deck. You\'ve got things to think about.',
        resultText: 'You stay at the rail, watching the horizon. Dragghen sends a mug of copper-root tea up with Kovesse. She sets it next to you and leaves without a word. He also re-leveled the helm step while nobody was looking. "Solid four," he told Kovesse. "Could be a five with better timber."',
        loyaltyEffects: { dragghen: 1 },
      },
    ],
  },
  {
    id: 'delvessa_strategy_talk',
    category: 'crew',
    title: 'MIDNIGHT WATCH',
    description: 'Delvessa is awake at the helm, studying a chart by lamplight. She glances up when your shadow crosses the deck. "Can\'t sleep either?"',
    weight: 3,
    requiresCrew: 'delvessa',
    repeatable: true,
    choices: [
      {
        id: 'talk_strategy',
        text: '"Tell me what you see on that chart."',
        resultText: '"Three routes to the Central Belt. Two of them go through Wardensea patrol zones. The third is longer but passes Mossbreak, neutral ground, good for resupply. I recommend the third." She pauses. "But you don\'t take recommendations, do you?" A half-smile. Kolmari habits die hard.',
        loyaltyEffects: { delvessa: 3 },
        effects: { intelligence: 1 },
      },
      {
        id: 'talk_past',
        text: '"You ever sail under someone else\'s flag before mine?"',
        resultText: '"The Kolmari don\'t have flags. They have ledgers." Her voice is flat. "I served the Arbitration Bureau for eleven years. Left because the numbers stopped adding up in ways I could live with." She folds the chart. "Your numbers add up. For now."',
        loyaltyEffects: { delvessa: 2 },
      },
    ],
  },
  {
    id: 'kovesse_signal_intercept',
    category: 'crew',
    title: 'GRIMOIRE INTERCEPT',
    description: 'Kovesse bursts from below deck holding her portable Grimoire relay, eyes wide. "Captain! I picked up something on the military frequency. Encrypted, but the encryption is Wardensea standard, which means I already cracked it."',
    weight: 2,
    requiresCrew: 'kovesse',
    minDay: 4,
    repeatable: true,
    choices: [
      {
        id: 'listen_in',
        text: '"Play it."',
        resultText: 'Static, then a clipped voice: "--patrol route seven adjusted. Northern Arc coverage reduced through end of cycle. Priority assets redeployed to Southern Reach per Spiral Division request." Kovesse grins. "Northern Arc patrols are lighter than we thought. That\'s useful."',
        effects: { intelligence: 3 },
        loyaltyEffects: { kovesse: 2 },
      },
      {
        id: 'broadcast_back',
        text: '"Can you broadcast back on their frequency?"',
        resultText: '"Can I--" She looks at you like you asked if water is wet. "Captain, I could broadcast a sea shanty on their frequency if you wanted. But doing so would give away that we cracked their encryption. I\'d recommend listening only." She\'s right. This time.',
        effects: { intelligence: 2 },
        loyaltyEffects: { kovesse: 1 },
      },
    ],
  },
  {
    id: 'suulen_navigation',
    category: 'crew',
    title: 'SHORTCUT',
    description: 'Suulen appears at your shoulder, her usual trick of being nowhere and then suddenly being somewhere. "There\'s a current running forty meters below the surface. Morventhi tunnel-runners used it. I can feel it through the hull. It\'ll shave hours off our trip."',
    weight: 3,
    requiresCrew: 'suulen',
    repeatable: true,
    choices: [
      {
        id: 'take_shortcut',
        text: '"Do it."',
        resultText: 'Suulen takes the helm, her spatial Sight mapping currents you can\'t see. The ship lurches into a deep channel and accelerates. The crew grabs for handholds. When it\'s over, the sun has barely moved but the horizon has changed. She\'s good.',
        loyaltyEffects: { suulen: 3 },
        effects: { supplies: 2 },
      },
      {
        id: 'stay_course',
        text: '"We stay on the mapped route. I want predictable."',
        resultText: 'She nods once, no expression. "Predictable. Understood." The word hangs in the air. Whether it\'s agreement or commentary, you can\'t tell with Suulen.',
        loyaltyEffects: { suulen: -1 },
      },
    ],
  },
  {
    id: 'vorreth_drill',
    category: 'crew',
    title: 'DAWN DRILL',
    description: 'Vorreth is running tactical drills on the main deck before sunrise. Dock workers they picked up as crew fumble through formations. He corrects them with the calm, direct patience of a man who ran a pirate fleet\'s second chair and expects nothing from the first hundred recruits. Halfway through a correction, he falls asleep standing up for four seconds, then continues the sentence like nothing happened.',
    weight: 3,
    requiresCrew: 'vorreth',
    repeatable: true,
    choices: [
      {
        id: 'join_drill',
        text: 'Join the drill. Show them what Oni conditioning looks like.',
        resultText: 'You step into the formation. The dock workers freeze. Vorreth doesn\'t miss a beat: "Same drill. Just because the Captain is here doesn\'t mean the blade stops." They resume. You move through the forms at half speed, making the movements visible. By the end, two of them are almost getting it right. Vorreth gives a nod. From the man who enforced the Daaz Accord, that nod is a standing ovation.',
        loyaltyEffects: { vorreth: 4 },
        reputationChange: 1,
      },
      {
        id: 'watch_drill',
        text: 'Watch from the helm. Let Vorreth handle it.',
        resultText: 'You watch the drill with your arms crossed. Vorreth catches you watching and straightens slightly. The drills get sharper. The recruits try harder. There\'s something about being watched by a 6\'11" Oni who used to be second-in-command of a pirate fleet that motivates people. He falls asleep mid-stance for three seconds. Nobody dares stop.',
        loyaltyEffects: { vorreth: 2 },
      },
    ],
  },

  // === STORMS & WEATHER ===
  {
    id: 'minor_storm',
    category: 'storm',
    title: 'SQUALL LINE',
    description: 'A wall of grey sweeps in from the west. Not a hurricane, just the Bastion Sea reminding you that it doesn\'t care about your schedule. Waves crash across the bow. The rigging screams.',
    weight: 3,
    repeatable: true,
    choices: [
      {
        id: 'push_through',
        text: 'Push through it. We don\'t stop for weather.',
        resultText: 'You hold course. The ship bucks and groans. Kovesse gets seasick. Dragghen secures the hull braces below deck with the grim efficiency of a man who\'s shipwrighted through worse. "Solid three storm," he mutters. Two hours later, the sky clears. Nothing lost but comfort.',
        effects: { supplies: -2 },
      },
      {
        id: 'wait_it_out',
        text: 'Reef the sails. Ride it out.',
        resultText: 'You heave to and wait. The storm passes in three hours, leaving the sea glass-calm and strange. Vorreth nods approval. "Patience keeps hulls intact." He\'s not wrong, but patience also costs time.',
        effects: { supplies: -1 },
      },
    ],
  },
  {
    id: 'heavy_storm',
    category: 'storm',
    title: 'BASTION SEA GALE',
    description: 'The sky turns the color of a bruise. Wind hits like a wall. This isn\'t a squall, it\'s a proper Bastion Sea gale, a gale that grinds ships into memory. Lightning cracks the horizon in half.',
    weight: 2,
    minDanger: 'moderate',
    repeatable: true,
    choices: [
      {
        id: 'fight_storm',
        text: 'All hands on deck. We ride this bastard out.',
        resultText: 'You stand at the helm with the sea trying to murder you. Dragghen and Vorreth work the rigging. Suulen calls out wave patterns before they hit. Three hours of controlled chaos. When it breaks, the ship is intact but battered. You\'re soaked, bruised, and grinning. The crew watches you standing in the rain and something shifts in the way they look at you.',
        effects: { supplies: -4 },
        loyaltyEffects: { dragghen: 2, vorreth: 2, suulen: 1 },
        reputationChange: 1,
        successChance: 75,
        failText: 'A rogue wave catches the ship broadside. Cargo breaks loose. Someone screams. When the storm passes, the deck is a mess of splintered wood and seawater. You\'re alive. That\'s the best that can be said.',
        failEffects: { supplies: -8, materials: -3 },
      },
      {
        id: 'find_shelter',
        text: 'Find shelter. No point dying to weather.',
        resultText: 'Suulen spots a lee shore behind a reef formation. You tuck in and wait. The storm rages overhead for hours. Lightning turns the sea white. When it passes, you\'re behind schedule but everything is intact.',
        effects: { supplies: -2 },
        loyaltyEffects: { suulen: 1 },
      },
    ],
  },

  // === DISCOVERIES ===
  {
    id: 'floating_wreckage',
    category: 'discovery',
    title: 'WRECKAGE',
    description: 'Debris in the water. Splintered hull planks, waterlogged cargo, a torn flag. The ship is gone. Whatever happened was recent. Dragghen leans over the rail, face grim. "That\'s a merchant hull. Mid-size. Maybe forty crew. Keel snapped clean. Solid two craftsmanship."',
    weight: 3,
    repeatable: true,
    choices: [
      {
        id: 'salvage',
        text: 'Salvage what we can.',
        resultText: 'You spend an hour pulling useful material from the water. Rope, sealed barrels of supplies, a locked strongbox Kovesse cracks in twenty seconds. Not a fortune, but the sea provides.',
        effects: { supplies: 4, materials: 2, sovereigns: 15 },
      },
      {
        id: 'investigate',
        text: 'Look for survivors.',
        resultText: 'You circle the wreckage twice. No survivors. But Delvessa reads the damage patterns: "This wasn\'t weather. These are cannon marks. Someone hit them and didn\'t want witnesses." She makes a note. The information might be worth more than salvage.',
        effects: { intelligence: 2 },
        loyaltyEffects: { delvessa: 1 },
      },
    ],
  },
  {
    id: 'uncharted_reef',
    category: 'discovery',
    title: 'UNMARKED REEF',
    description: 'The water changes color ahead, shallow reef, unmarked on any chart. Suulen spots it before the hull does. The reef teems with life. Something glints beneath the surface.',
    weight: 2,
    repeatable: false,
    choices: [
      {
        id: 'dive_down',
        text: 'Send someone to check what\'s down there.',
        resultText: 'Dragghen volunteers. Gorundai lungs hold air longer than you\'d think. He surfaces with a sealed crate bearing an old Conqueror\'s mark, already assessing the hull damage from below. "Reef scored the planking. Solid three, could be worse." Inside the crate: materials, old maps, a sealed letter nobody can read. "Someone hid this here on purpose," Delvessa says.',
        effects: { materials: 5, intelligence: 3 },
        loyaltyEffects: { dragghen: 2 },
      },
      {
        id: 'mark_location',
        text: 'Mark the location and move on. We\'ll come back.',
        resultText: 'Suulen plots the reef coordinates with her spatial Sight. More accurate than any chart. "I won\'t forget it," she says. She means it literally. Morventhi spatial memory doesn\'t decay.',
        effects: { intelligence: 1 },
        setFlags: { 'unmarked_reef_found': true },
      },
    ],
  },
  {
    id: 'sea_creature_sighting',
    category: 'omen',
    title: 'SOMETHING BELOW',
    description: 'The water beside the ship darkens. Not a shadow, a shape. Something enormous passes beneath the hull, close enough to feel the displacement rock the ship. Nobody speaks for thirty seconds.',
    weight: 2,
    repeatable: false,
    choices: [
      {
        id: 'watch_it',
        text: 'Watch it pass.',
        resultText: 'You watch the dark shape glide under the ship and away into the deep. It must be sixty meters long. No sound, no aggression, just passage. Suulen\'s voice is barely a whisper: "Sea King. Juvenile, by the size. The adults are... bigger." The crew is very quiet for the rest of the day.',
      },
      {
        id: 'pour_drink',
        text: 'Pour a drink over the rail. Old sailor\'s respect.',
        resultText: 'You uncork a bottle and pour it into the sea. The dark shape pauses, or seems to. Then it moves on. Dragghen exhales. "My grandmother used to say the sea kings remember who shows respect. She rated them a six. Only thing she ever rated above five." He\'s probably just telling stories. Probably.',
        loyaltyEffects: { dragghen: 2 },
      },
    ],
  },

  // === TRADE ENCOUNTERS ===
  {
    id: 'passing_merchant',
    category: 'trade',
    title: 'MERCHANT VESSEL',
    description: 'A merchant brig on a perpendicular course. Her flag is Selvaggio Free Trade, neutral, profitable, and very interested in not getting robbed. They signal a willingness to trade.',
    weight: 3,
    repeatable: true,
    choices: [
      {
        id: 'trade_fair',
        text: 'Trade fair. Buy supplies.',
        resultText: 'A fair exchange. Their supplies for your sovereigns. The merchant captain is professional and fast. She wants to be gone before anyone gets ideas. Smart woman.',
        effects: { sovereigns: -20, supplies: 8, materials: 2 },
      },
      {
        id: 'trade_intel',
        text: '"What have you seen out here?"',
        resultText: 'The merchant captain squints at you. "An Oni asking questions. There\'s a first." She trades gossip for a modest fee. Wardensea patrol schedules, shipping lane changes, who\'s buying what where. Delvessa takes notes.',
        effects: { sovereigns: -10, intelligence: 3 },
      },
      {
        id: 'let_pass',
        text: 'Let them pass. Save the sovereigns.',
        resultText: 'You wave them on. The merchant captain looks relieved and sails on. Some opportunities aren\'t worth the coin.',
      },
    ],
  },

  // === WARDENSEA ENCOUNTERS ===
  {
    id: 'wardensea_patrol_distant',
    category: 'wardensea',
    title: 'STORM-GREY SAILS',
    description: 'Wardensea cutter on the horizon. Storm-grey sails, clean lines, and speed that comes from government funding. They haven\'t spotted you yet, or they\'re pretending they haven\'t.',
    weight: 2,
    minDanger: 'moderate',
    repeatable: true,
    choices: [
      {
        id: 'evade',
        text: 'Change course. Avoid contact.',
        resultText: 'You adjust heading twenty degrees and let the horizon swallow the grey sails. Vorreth watches them go with an unreadable expression. "That was a scout cutter. Spiral Division markings. They\'ll file a report on every ship they saw today." Meaning: your course change was noted. He falls asleep for three seconds, then: "I fought six of those. They turn slow to port."',
        effects: { supplies: -1 },
        loyaltyEffects: { vorreth: 1 },
      },
      {
        id: 'hold_course',
        text: 'Hold course. We\'re not hiding.',
        resultText: 'You hold course. The Wardensea cutter adjusts to pass closer. A look. An officer on their deck studies your ship through a scope. You stand at the rail and let them see exactly who\'s on board. A seven-foot Oni is hard to misidentify. They sail on without engagement. "That\'s going in a file somewhere," Delvessa says.',
        bountyChange: 2000000,
        infamyChange: 1,
      },
    ],
  },
  {
    id: 'wardensea_checkpoint',
    category: 'wardensea',
    title: 'CHECKPOINT',
    description: 'Two Wardensea cutters anchored at a narrows, checking ships. Standard customs inspection, or so they claim. The crews wear Second Division grey. There\'s no way around without adding a full day.',
    weight: 2,
    minDanger: 'dangerous',
    repeatable: true,
    choices: [
      {
        id: 'bluff_through',
        text: 'Fly false colors. Bluff through the checkpoint.',
        resultText: 'Kovesse rigs a false flag: Selvaggio merchant colors. Vorreth coaches the crew on what to say. You stay below deck because a seven-foot Oni is a difficult thing to explain on a merchant vessel. It works. Barely. One of the inspectors pauses too long at the cargo hold, but Delvessa talks numbers until his eyes glaze over.',
        loyaltyEffects: { kovesse: 2, vorreth: 1, delvessa: 2 },
        successChance: 65,
        failText: 'The inspector isn\'t buying it. He spots Karyudon\'s shadow below deck and reaches for his signal flare. Vorreth drops him with a single bare-knuckle strike to the jaw. Ex-fleet second knows where the nerve clusters are. You run the checkpoint under fire. Two cannonballs splash close enough to shower the deck.',
        failEffects: { supplies: -5 },
      },
      {
        id: 'go_around',
        text: 'Take the long way. Not worth the risk.',
        resultText: 'A full day lost circling the patrol zone. Nobody complains. The crew has seen what Wardensea cutters can do to a ship that fails inspection. Safety costs time. Time costs supplies.',
        effects: { supplies: -3 },
      },
      {
        id: 'fight_through',
        text: 'We go through. They can try to stop us.',
        resultText: 'You run the checkpoint at full sail. The Wardensea cutters scramble to intercept but you\'re already through the narrows by the time they raise anchor. Cannonfire chases you but falls short. Bold. Stupid. Effective. Your bounty will reflect the choice.',
        bountyChange: 5000000,
        infamyChange: 2,
        reputationChange: 1,
      },
    ],
  },

  // === OMENS & WORLDBUILDING ===
  {
    id: 'old_conqueror_marker',
    category: 'omen',
    title: 'STONE MARKER',
    description: 'A stone pillar jutting from the sea, barely above the waterline. Old. Carved with a name and a bounty figure. "Tessarion Veld - 3.2 Billion Sovereigns." A Conqueror from fifty years ago. Nobody remembers what happened to him.',
    weight: 2,
    repeatable: false,
    choices: [
      {
        id: 'read_inscription',
        text: 'Read the full inscription.',
        resultText: 'Below the bounty: "The sea takes back what the land cannot hold." Delvessa is quiet for a long time after reading it. "Tessarion held nine islands at his peak. More than anyone before the current Five. He vanished in a single night. No battle. No body. Just gone." She looks at you. "The game doesn\'t forgive."',
        effects: { intelligence: 1 },
      },
      {
        id: 'sail_on',
        text: 'Sail on. Dead men\'s markers aren\'t your concern.',
        resultText: 'You leave the pillar behind. The Bastion Sea has a lot of markers. If you stopped for every dead Conqueror\'s memorial, you\'d never reach port.',
      },
    ],
  },
  {
    id: 'grimoire_broadcast_at_sea',
    category: 'omen',
    title: 'GRIMOIRE SIGNAL',
    description: 'Kovesse picks up a Grimoire broadcast bouncing off the open water. Someone is talking about you.',
    weight: 3,
    minDay: 5,
    requiresCrew: 'kovesse',
    repeatable: true,
    choices: [
      {
        id: 'listen',
        text: '"What are they saying?"',
        resultText: 'Kovesse reads it aloud: "@BastonWatch: The Oni who took Tavven Shoal is moving. Ship spotted heading south. Bounty watchers, place your bets." She grins. "We\'re trending, Captain."',
        loyaltyEffects: { kovesse: 1 },
      },
      {
        id: 'respond',
        text: '"Broadcast back. Let them know exactly where we\'re going."',
        resultText: 'Kovesse\'s eyes light up. She taps out a message on the relay: "KARYUDON - heading where the money is. Try to keep up." Within minutes, the channel explodes. She\'s laughing so hard she can barely read the responses.',
        bountyChange: 1000000,
        infamyChange: 1,
        reputationChange: 2,
        loyaltyEffects: { kovesse: 3 },
      },
    ],
  },

  // === KARYUDON MOMENTS - Banter, Drinking, Being an Oni ===
  {
    id: 'karyudon_drinks_alone',
    category: 'crew',
    title: 'MIDNIGHT BOTTLE',
    description: 'The stars are sharp tonight. You\'re at the rail with a bottle of something Dragghen improvised from engine coolant and copper-root shavings. He rated it "a solid three, but the bottle\'s a five." The sea stretches out in every direction, black and endless. It\'s quiet enough to think, which is exactly the problem.',
    weight: 3,
    repeatable: true,
    choices: [
      {
        id: 'drink_and_think',
        text: 'Drink. Think about Kirin. About home.',
        resultText: 'Three swallows. The burn is almost good. You think about your brother\'s face the last time you saw it, not the betrayal, but before. When you were still just two Oni kids in the highlands, scaring merchants and pretending to be Conquerors. Before the old shaman got his hooks into Kirin. Before it all went sideways. You finish the bottle. Throw it into the sea. The sound it makes when it hits the water is very, very small.',
      },
      {
        id: 'drink_and_laugh',
        text: 'Drink. Laugh at the absurdity of it all.',
        resultText: 'You laugh loud enough that someone below deck stirs. An Oni escaped prisoner with a bounty, a war club named Danzai, a crew of misfits, and a dream stupid enough to be magnificent. World Conqueror. You said it out loud in a fish market and meant every syllable. The Bastion Sea is your proving ground. And tonight, the stars are bright, the liquor burns right, and everything ahead of you is something worth taking.',
        reputationChange: 1,
      },
      {
        id: 'share_bottle',
        text: 'Someone\'s awake. Share the bottle.',
        resultText: 'Delvessa materializes from the dark like she\'s been there the whole time. Maybe she has. You offer the bottle without a word. She takes it, drinks, and doesn\'t wince. "You\'re thinking about the next island." It\'s not a question. "Among other things." "The \'other things\' are what make you dangerous," she says. "The islands are just geography." She hands the bottle back. Your fingers touch. She doesn\'t pull away fast.',
        loyaltyEffects: { delvessa: 3 },
      },
    ],
  },
  {
    id: 'delvessa_close_quarters',
    category: 'crew',
    title: 'TIGHT SHIP',
    description: 'Ships are small. Privacy is a luxury. You round a corner below deck and nearly walk into Delvessa, freshly washed, hair still damp, wearing considerably less than her usual Arbiter composure. She freezes. You freeze. The corridor is very narrow.',
    weight: 2,
    requiresCrew: 'delvessa',
    repeatable: false,
    choices: [
      {
        id: 'flirt',
        text: '"Nice view. And the ocean\'s decent too."',
        resultText: 'Her eyes narrow. Then, barely, the corner of her mouth twitches. "You have the subtlety of a cannonball, Captain." She doesn\'t move out of the way. Neither do you. The ship rocks. The corridor gets narrower. "This conversation is over," she says, in the tone of someone who intends to have a longer one later. Much later. When there\'s a door with a lock.',
        loyaltyEffects: { delvessa: 4 },
      },
      {
        id: 'play_cool',
        text: 'Eyes up. "Didn\'t see anything."',
        resultText: '"Your eyes say otherwise." She pulls a shirt on with the clinical efficiency of someone who managed entire arbitration cases in worse conditions. "I appreciate the attempt at chivalry, Captain. Even if your horns scraped the ceiling on the way in." She slides past you. The contact is brief and very, very deliberate.',
        loyaltyEffects: { delvessa: 2 },
      },
    ],
  },
  {
    id: 'port_woman_at_sea',
    category: 'trade',
    title: 'FAMILIAR FACE',
    description: 'A supply tender pulls alongside: small crew, fast ship, independent operator. The woman running it is tall, dark-haired, with the sun-weathered beauty of someone who\'s been on the sea longer than most. She spots you at the rail and her eyebrows go up. "Seven feet of Oni. My day just got more interesting."',
    weight: 2,
    repeatable: false,
    choices: [
      {
        id: 'flirt_back',
        text: '"Interesting is my specialty. What else are you selling?"',
        resultText: 'She laughs: full, real, carries over water. "Supplies, information, and charm, in that order. The charm\'s expensive." You buy supplies. You buy information. The charm comes free when she leans over the rail gap to hand you a sealed note. "Wardensea patrol schedules. Southern corridor. On the house." Her fingers brush yours. "For the interesting seven-foot Oni." She sails away grinning. Delvessa watches the whole exchange from the quarterdeck, expression unreadable.',
        effects: { sovereigns: -15, supplies: 6, intelligence: 2 },
        loyaltyEffects: { delvessa: -1 },
      },
      {
        id: 'just_trade',
        text: '"Show me what you\'ve got. Business first."',
        resultText: '"Business first." She grins. "And second? And third?" But she\'s professional underneath the banter. Good supplies, fair prices, clean ledgers. "If you\'re heading south, avoid the Windrow corridor after sunset. Wardensea has night patrols running." She says it casually, like good information costs nothing when you like someone\'s face.',
        effects: { sovereigns: -10, supplies: 5, intelligence: 1 },
      },
    ],
  },
  {
    id: 'karyudon_announces_himself',
    category: 'crew',
    title: 'DECLARATION',
    description: 'Morning. The crew is gathered for breakfast on deck. Sun\'s up. Wind\'s good. Something about the day makes you want to say it out loud. Again.',
    weight: 2,
    repeatable: true,
    choices: [
      {
        id: 'declare',
        text: 'Stand up. "I\'m going to conquer the world."',
        resultText: 'You say it like you\'re ordering breakfast. "I\'m going to conquer the world." Dead silence. Then Dragghen: "Solid five ambition, Captain. Could be a six with better logistics." Kovesse, mouth full: "Could you conquer it after I finish eating?" Vorreth doesn\'t even look up from his tea. He might be asleep. Only Delvessa meets your eyes. "Every day you say that," she says. "Every day you get closer to meaning it." Suulen, from somewhere you can\'t see: "He already means it." Orren\'s ears perk straight up. Tessek murmurs something about "The World-Cleaving Declaration" and how it needs a wider stance. The wind catches your hair. The Bastion Sea stretches out ahead. Yeah. You mean it.',
        loyaltyEffects: { dragghen: 1, kovesse: 1, delvessa: 1, suulen: 2, vorreth: 1, tessek: 1, orren: 1 },
        reputationChange: 1,
      },
      {
        id: 'stay_quiet',
        text: 'Not today. Today you let the silence speak.',
        resultText: 'You eat. The crew eats. The ship moves south. Sometimes the most powerful thing a man can do is not say the thing everyone\'s waiting for. They watch you from the corners of their eyes. He\'s quiet today. That means something. Good or bad, it means something.',
      },
    ],
  },
  {
    id: 'arm_wrestling_contest',
    category: 'crew',
    title: 'ARM WRESTLING',
    description: 'Vorreth has been beating everyone on the ship at arm wrestling. The dock workers, the deckhands, even Dragghen (who rated the loss "a solid four, respectable"). Now Vorreth turns to you, cracking 6\'11" worth of Oni knuckles. "Captain. Two Oni, one table. The crew needs to see this."',
    weight: 3,
    requiresCrew: 'vorreth',
    repeatable: false,
    choices: [
      {
        id: 'accept',
        text: 'Roll up your sleeve. "Oni against Oni. Let\'s see who the sea made stronger."',
        resultText: 'You grip hands. Two Oni. The table groans under the combined weight of forearms that could bend anchor chain. "Go." For five seconds, neither arm moves. The table cracks down the middle. The crew is screaming. Kovesse is taking bets. Vorreth\'s expression doesn\'t change, which is terrifying. Your arm doesn\'t move because it doesn\'t feel like moving yet. Then you push. One inch. Two. Vorreth\'s arm hits the table and the whole thing collapses into splinters. He looks at the wreckage, falls asleep for four seconds, wakes up. "Again." Dragghen stares at the destroyed table. "That was a solid five table. Was."',
        loyaltyEffects: { vorreth: 3, kovesse: 1 },
        effects: { sovereigns: 5 }, // Won bets
      },
      {
        id: 'let_him_win',
        text: 'Let him have it. The First Mate needs the win more than the Captain does.',
        resultText: 'You put up a fight, enough that it looks real. Oni conditioning against Oni conditioning, a contest that cracks tables and makes the deck shake. Vorreth slams your arm down and the crew erupts. You rub your wrist and shrug. "The Black Standard lives up to the name." Vorreth nods once. Then falls asleep standing up. Delvessa catches your eye from across the deck. She knows. You know she knows. She says nothing, which is its own form of approval.',
        loyaltyEffects: { vorreth: 4, delvessa: 2 },
      },
    ],
  },
  {
    id: 'starlight_swim',
    category: 'crew',
    title: 'WARM WATER',
    description: 'The ship anchors in warm shallows for the night. The water is clear enough to see the coral below, lit by bioluminescence: blue-green light pulsing like a heartbeat. Suulen is already in the water before anyone suggests it, gliding beneath the surface like she was born there. The crew looks at the water, then at you.',
    weight: 2,
    repeatable: false,
    choices: [
      {
        id: 'dive_in',
        text: 'Shuck the shirt. Dive in.',
        resultText: 'You hit the water and it lights up around you like a second sky. The bioluminescence traces your body: every scar, every line of muscle earned through Oni conditioning and prison fights and the simple act of refusing to break. Kovesse cannonballs in behind you, shrieking. Dragghen wades in waist-deep, rating the water temperature ("Solid four. Five if it were warmer."). Vorreth watches from the rail, almost smiling. He might also be asleep. Orren steps in carefully, grey fur slicking flat, amber eyes wide. Then his Storm Eel Dominion sparks and the bioluminescence around him flares bright white. "Sorry! Sorry!" His ears flatten. The water around him buzzes for ten seconds before settling down. Tessek calls it "The Luminous Baptism" and declares Orren the winner of a contest nobody entered. Delvessa sits on the deck with her feet in the water, watching the light play across your shoulders with an expression she\'d deny later. Suulen surfaces next to you, silent as always. "You glow," she says. "The water likes you." The night stretches out, warm and strange and good.',
        loyaltyEffects: { suulen: 2, kovesse: 2, dragghen: 1, delvessa: 2, vorreth: 1, orren: 2, tessek: 1 },
      },
      {
        id: 'watch_from_deck',
        text: 'Stay on deck. Enjoy the view.',
        resultText: 'You lean on the rail and watch your crew become human, or Gorundai, or Morventhi, or Khari, or Oni, as the case may be. Kovesse splashes Dragghen. Dragghen rates the splash ("Solid three. Weak follow-through.") and starts fixing a loose plank on the swimming platform. Orren accidentally magnetizes the ladder and has to be talked down by Vorreth, who falls asleep mid-sentence. Suulen floats motionless on her back, staring at stars. The bioluminescence paints them all in blue-green light. You drink from the bottle in your hand and think: this is what I\'m building. Not just territory. This.',
        loyaltyEffects: { dragghen: 1, kovesse: 1, suulen: 1, orren: 1 },
      },
    ],
  },
  {
    id: 'karyudon_training',
    category: 'crew',
    title: 'IRON CONDITIONING',
    description: 'Pre-dawn. You\'re on the foredeck, running Oni conditioning drills in the dark. Forged Iron flows through your arms as you swing Danzai in patterns that leave afterimages in the salt air. The war club weighs enough to anchor a small boat. You swing it like it\'s made of air.',
    weight: 3,
    repeatable: true,
    choices: [
      {
        id: 'push_harder',
        text: 'Push until something in your Dominion cracks wider.',
        resultText: 'Three hundred swings. Four hundred. The Iron burns brighter. Your muscles scream and you tell them to shut up because they\'re Oni muscles and they don\'t get to quit. On swing four-seventy, something shifts: a crack in the ceiling of your Dominion, letting more Iron through. It\'s not a breakthrough. It\'s a promise of one. You stop. Danzai steams in the morning air. Behind you, Tessek has been watching. He names what you just did: "The Four-Hundred-Seventy-Fold Iron Awakening." It sounds ridiculous. It also sounds exactly right.',
        loyaltyEffects: { tessek: 2 },
        reputationChange: 1,
      },
      {
        id: 'spar_with_crew',
        text: 'Invite whoever\'s watching to step in. Controlled sparring.',
        resultText: 'Tessek takes you up on it. Nodachi versus an Oni with a war club. He moves like theatre: sweeping, theatrical, every cut named before it lands. "Cascading Moon Descent!" He announces each technique with complete sincerity. You move like chaos with a purpose. The "sparring" wrecks three deck planks and Dragghen\'s toolbox. Tessek lands one clean hit to your ribs that actually stings. "The Rib-Splitting Horizon," he whispers reverently. "Garroden Harsk himself could not have placed it better." You grin. "Good thing I\'m not Garroden Harsk." The crew has gathered to watch. Nobody mentions the broken toolbox.',
        loyaltyEffects: { tessek: 3, dragghen: -1 }, // Dragghen's toolbox died
      },
    ],
  },

  // === MORE CREW BANTER & ROLEPLAY ===
  {
    id: 'delvessa_ledger_lesson',
    category: 'crew',
    title: 'THE NUMBERS GAME',
    description: 'Delvessa is at the chart table, surrounded by ledgers. She\'s calculating territory projections and muttering numbers under her breath. She looks up when she notices you watching. "Do you want to learn how to read a balance sheet, or are you just here to look intimidating?"',
    weight: 3,
    requiresCrew: 'delvessa',
    repeatable: false,
    choices: [
      {
        id: 'learn_finance',
        text: '"Teach me. A Conqueror should know his own numbers."',
        resultText: 'She blinks. Twice. Then pulls a chair over. For two hours, Delvessa Ghal, former Kolmari Arbiter, woman who quit the most powerful trade organization in the world, teaches you how compound interest works. You understand about sixty percent of it. The other forty percent is watching her hands move across the pages, precise and sure, and the way she tucks her hair behind her ear when she\'s concentrating. "You\'re staring at me, not the numbers," she says without looking up. "The numbers are less interesting."  "The numbers are the whole point." But she\'s smiling.',
        loyaltyEffects: { delvessa: 5 },
        effects: { intelligence: 2 },
      },
      {
        id: 'flirt_numbers',
        text: '"I\'m here to look intimidating. Is it working?"',
        resultText: '"On a scale of one to ten?" She glances over her glasses. She only wears them for close work, and they make her look devastating. "Six. You lose points for the bed-head." "I didn\'t sleep." "Neither did I." A pause that lasts one heartbeat too long. "The projections look good, Captain. If you stop getting into fights for one full week, we might actually turn a profit." "Where\'s the fun in profit?" "The fun," she says, closing the ledger, "is in watching you try to say that with a straight face."',
        loyaltyEffects: { delvessa: 4 },
      },
    ],
  },
  {
    id: 'kovesse_broadcasts_karyudon',
    category: 'crew',
    title: 'THE INTERVIEW',
    description: 'Kovesse corners you on the main deck with her portable Grimoire relay set up for a broadcast. "Captain, I need content. The followers want to know the real Karyudon. Give me five minutes."',
    weight: 2,
    requiresCrew: 'kovesse',
    repeatable: false,
    minDay: 8,
    choices: [
      {
        id: 'do_interview',
        text: '"Five minutes? Fine. Ask."',
        resultText: 'Kovesse goes live. Thirty-one hundred viewers in the first minute. "So, Karyudon, world conquest. Seriously?" "Seriously." "What happens when you run out of islands?" "Then I start on continents." "Favorite food?" "Whatever Dragghen brews. The man rates his own tea a three but it\'s a five." "Romantic interest?" "The Bastion Sea." "That\'s a dodge." "That\'s a boundary." She grins. "He has boundaries, folks! The man who punched through a shield wall in broad daylight has BOUNDARIES." Twelve hundred new followers by the time you walk away.',
        bountyChange: 2000000,
        reputationChange: 3,
        infamyChange: 1,
        loyaltyEffects: { kovesse: 5 },
      },
      {
        id: 'refuse_interview',
        text: '"Kovesse. No."',
        resultText: '"But Captain--" "No." She deflates. Then perks up. "What if I just broadcast you training? No words. Just the visual?" You consider this. "...Fine." The training broadcast goes viral. Something about a seven-foot Oni doing four hundred war club swings in silence is apparently very compelling content. Kovesse titles it "THE MOUNTAIN WORKS." Forty thousand views in a day.',
        reputationChange: 2,
        loyaltyEffects: { kovesse: 3 },
      },
    ],
  },
  {
    id: 'crew_card_game',
    category: 'crew',
    title: 'HIGH TIDE',
    description: 'Below deck, the crew has broken out a card game. High Tide, the Bastion Sea\'s favorite gambling game, played with seventy-eight cards and a lot of bluffing. Kovesse is winning. Dragghen is losing badly but rating every hand ("Solid two. The shuffle was a four."). Vorreth fell asleep three hands ago and nobody has noticed because his cards are face-down. Someone waves you over.',
    weight: 3,
    repeatable: true,
    choices: [
      {
        id: 'play_cards',
        text: 'Sit down. Deal in.',
        resultText: 'You are terrible at High Tide. Oni do not bluff well: your face is an open book written in large font. Kovesse takes your money with the cheerful efficiency of someone who\'s been card-sharking since age twelve. Delvessa watches from her bunk, not playing, just... observing the way you laugh when you lose. She makes a note in her ledger. It\'s not a financial note. "Captain lost forty sovereigns at cards," Dragghen announces. "I only lost twenty. Solid three performance from both of us." Vorreth wakes up, looks at his cards, plays a perfect hand, and falls back asleep. The crew stares. "He does that," Orren whispers, ears flat. The crew laughs. You laugh. The ship moves through the night.',
        effects: { sovereigns: -15 },
        loyaltyEffects: { kovesse: 2, dragghen: 2, delvessa: 1, vorreth: 1, orren: 1 },
      },
      {
        id: 'raise_stakes',
        text: '"I don\'t play for sovereigns. I play for favors. Deal me in."',
        resultText: 'The game gets interesting fast. Favors are worth more than money on a ship this small. You win a hand. Kovesse owes you one unquestioned broadcast edit. You lose a hand. You owe Dragghen a full day helping with hull maintenance. By midnight, the favor economy is more complex than the Kolmari trade index. Delvessa calls it "the most entertaining economic system I\'ve ever seen collapse." Vorreth somehow won three hands while unconscious. Nobody remembers who won. Everyone remembers the night.',
        loyaltyEffects: { kovesse: 1, dragghen: 3, vorreth: 1 },
      },
    ],
  },
  {
    id: 'suulen_above',
    category: 'crew',
    title: 'THE LOOKOUT',
    description: 'Suulen is on the highest point of the ship, a crossbeam that nobody else would climb, eighty feet above the waterline. She\'s sitting perfectly still, legs dangling, watching something you can\'t see. The moonlight makes her look like part of the rigging.',
    weight: 2,
    requiresCrew: 'suulen',
    repeatable: false,
    choices: [
      {
        id: 'climb_up',
        text: 'Climb up. See what she sees.',
        resultText: 'You haul yourself up the rigging, not graceful, but Oni don\'t need graceful. You need strong. The crossbeam groans when you sit next to her. She doesn\'t flinch. "The ocean has layers," she says, not looking at you. "Surface currents. Deep currents. Thermal flows. I can feel them all from up here." "What do they tell you?" "That the world is bigger than anyone on it." Eighty-seven years of Morventhi spatial awareness, packed into a woman who barely speaks, seeing patterns in water that nobody else can perceive. You sit with her for an hour. Neither of you says another word. It\'s the most comfortable silence you\'ve experienced since leaving the highlands.',
        loyaltyEffects: { suulen: 5 },
      },
      {
        id: 'call_down',
        text: '"Suulen. See anything worth knowing?"',
        resultText: '"Storm system. Two days out. It\'ll pass north." She doesn\'t elaborate. With Suulen, the information is always exactly as precise as it needs to be. No more. "Thanks." "Captain." A pause. "The currents like your ship." You have no idea what that means. But from Suulen, it sounds like a compliment.',
        loyaltyEffects: { suulen: 2 },
        effects: { intelligence: 1 },
      },
    ],
  },
  {
    id: 'drinking_contest',
    category: 'crew',
    title: 'THE CHALLENGE',
    description: 'Shore leave before departure. A tavern. A crowd. A large, bearded man at the bar who\'s been eyeing you since you walked in. He stands: six-four, broad, not impressed by Oni. "I heard the mountain drinks. Let\'s see how the mountain pours."',
    weight: 2,
    repeatable: false,
    choices: [
      {
        id: 'accept_challenge',
        text: '"Line them up."',
        resultText: 'Seven rounds in, the bearded man hits the floor. You\'re on round twelve when Delvessa cuts you off. "Captain, we sail in four hours." "I can sail drunk." "I know. That\'s what worries me." You finish round thirteen to prove a point, then carry the unconscious challenger to a bench. His friends stare at you. "Tell him he lasted longer than most," you say. On the way out, a woman at the bar catches your eye and mouths "impressive." Delvessa notices. Delvessa notices everything.',
        effects: { sovereigns: -5 },
        reputationChange: 2,
        loyaltyEffects: { delvessa: 1, dragghen: 2 },
      },
      {
        id: 'decline_gracefully',
        text: '"Not tonight. We sail at dawn and I need my Oni alive."',
        resultText: 'The crowd boos. The bearded man looks disappointed. But Vorreth nods from the corner. Tactical restraint. You buy the man a drink instead. "Next time I\'m through, the challenge stands." He accepts. Dragghen approves of the diplomacy. "Solid five restraint." Kovesse does NOT approve of the missed content opportunity.',
        loyaltyEffects: { vorreth: 2, dragghen: 1, kovesse: -1 },
      },
    ],
  },
  {
    id: 'dragghen_confession',
    category: 'crew',
    title: 'SHIPYARD GUILT',
    description: 'Late watch. Dragghen is in the hold, re-seating rivets that don\'t need re-seating. His hands need something to do. He looks up when you enter. There\'s something in his face you haven\'t seen before. Bulkhead, the 90-pound keel plate shield, leans against the wall beside him like a sleeping dog.',
    weight: 2,
    requiresCrew: 'dragghen',
    minDay: 10,
    repeatable: false,
    choices: [
      {
        id: 'ask_whats_wrong',
        text: '"Talk to me."',
        resultText: '"Forty workers," he says. No preamble. Gorundai directness. "I was yard foreman at Drekkvoss. The Kolmari bought the shipyard. New owners said the workers were \'redundant.\' Forty Gorundai shipwrights. I had the keys to the gate. I could have opened it. Let them stay, finish their contracts, keep their families fed." His hands stop moving. "I didn\'t. I followed the order because the PAPERWORK said I should." He looks at you. "That\'s why I fix things. Because keeping something whole is the one choice you don\'t need permission for." You sit down. You don\'t say anything for a while. Then: "When I take the world, Dragghen, every shipyard answers to the workers. Not a ledger. The workers." He nods. Once. Goes back to riveting. But the silence between you has changed. It\'s heavier. And warmer.',
        loyaltyEffects: { dragghen: 8 },
      },
      {
        id: 'sit_quietly',
        text: 'Sit down. Sometimes presence is enough.',
        resultText: 'You sit on a cargo crate. Dragghen works. Neither of you speaks. After twenty minutes, he slides a cup of something warm across to you, brewed from moss herbs and copper-root, the drink Gorundai workers share after a bad shift. You drink it. It tastes like belonging and sadness and a very stubborn people who refuse to quit. "Solid five, Captain," he says quietly. He\'s not rating the drink.',
        loyaltyEffects: { dragghen: 5 },
      },
    ],
  },
  {
    id: 'delvessa_moonlight_deck',
    category: 'crew',
    title: 'SALT AND MOONLIGHT',
    description: 'The deck is empty. The crew is asleep. The moon is full and the sea is so calm it looks like hammered silver. You find Delvessa at the stern rail, barefoot, her usual composure softened by the hour and the light. She\'s holding a cup of wine she didn\'t pour herself.',
    weight: 2,
    requiresCrew: 'delvessa',
    minDay: 12,
    repeatable: false,
    choices: [
      {
        id: 'join_her',
        text: 'Stand next to her. Close.',
        resultText: 'You lean on the rail. Close enough that your arm touches hers. She doesn\'t move away. "I used to hate the sea," she says. "The Kolmari Arbiter offices were inland. Controlled temperature. No weather. Numbers don\'t get wet." She takes a sip. "Now I can\'t imagine being anywhere else." "Is that the sea or the company?" She looks at you. Full eye contact. Kolmari-trained, which means every look is calculated. Except this one isn\'t. This one is real. "The company," she says. Quiet. "Definitely the company." The moon reflects on the water. Your shoulders are touching. She leans, slightly, barely, but she leans, into you. The moment lasts exactly as long as it should.',
        loyaltyEffects: { delvessa: 6 },
      },
      {
        id: 'tease_her',
        text: '"Delvessa Ghal. Barefoot. With wine. Who are you and what have you done with my strategist?"',
        resultText: 'She laughs. An actual laugh, not the measured diplomatic sound she uses in meetings, but the real one. It\'s warm and unexpected and it changes her whole face. "Your strategist is off-duty. This is Delvessa. She doesn\'t do spreadsheets after midnight." "I like this version." "Don\'t get used to her. She has a terrible habit of disappearing at dawn." But she\'s smiling as she says it. And she offers you the wine. And when your fingers touch around the cup, neither of you lets go for a beat longer than necessary.',
        loyaltyEffects: { delvessa: 5 },
      },
    ],
  },
  {
    id: 'pirate_legend_discussion',
    category: 'omen',
    title: 'THE FIVE CONQUERORS',
    description: 'Kovesse has been reading old Grimoire archives. She bursts onto deck with the breathless energy of someone who\'s found the best piece of gossip in the world. "Captain. Did you know that the current Five Conquerors have a combined bounty of forty-seven BILLION sovereigns?"',
    weight: 2,
    minDay: 6,
    requiresCrew: 'kovesse',
    repeatable: false,
    choices: [
      {
        id: 'ask_about_them',
        text: '"Tell me about them. All five."',
        resultText: 'Kovesse rattles them off like a fan listing their heroes. "Gold Vassago, first seat, fourteen billion. Controls the Bastion Fleet. The Ember, second seat, eleven billion, nobody\'s seen her face in three years. Iron Tessarion, wait, he\'s dead. Replaced by Dread Kahren, eight billion. Then there\'s the Pale Judge, seven billion, runs the Southern Reach. And Ironmask, seven billion, holds the Eastern Waters." Delvessa adds quietly: "Your current bounty would place you approximately two thousand three hundred and forty-seventh on the ranking." "Then I have work to do."',
        effects: { intelligence: 3 },
        loyaltyEffects: { kovesse: 2 },
      },
      {
        id: 'dismiss_them',
        text: '"They\'re sitting at the top of a mountain I\'m climbing. They should be worried about me, not the other way around."',
        resultText: 'Kovesse stares. Then starts typing furiously on her relay. "I\'m quoting that. I\'m QUOTING THAT. \'They should be worried about me\'. Captain, that\'s going to break the Grimoire." Vorreth pinches the bridge of his nose. "You just painted a target on us that\'s visible from orbit." Then he falls asleep. Dragghen: "Solid four declaration. Five if you\'d used the horns more." "Targets are just invitations," you say. Delvessa: "Invitations to get killed." You: "Invitations to get FAMOUS." Nobody can argue with that. Mostly because it\'s technically true.',
        bountyChange: 3000000,
        reputationChange: 2,
        infamyChange: 2,
        loyaltyEffects: { kovesse: 4, vorreth: -1, dragghen: 1 },
      },
    ],
  },
  {
    id: 'sea_shanty',
    category: 'crew',
    title: 'SONG',
    description: 'Evening. Calm seas. Someone starts singing below deck, a Bastion Sea shanty about a captain who loved the waves more than the shore. The tune is old. The voices are rough. But it carries across the water like it was born there.',
    weight: 3,
    repeatable: true,
    choices: [
      {
        id: 'join_singing',
        text: 'You know this one. Join in.',
        resultText: 'Your voice is deep enough to rattle the hull planks. You don\'t sing well. Oni aren\'t built for melody, but you sing LOUD, and in a shanty, volume counts for more than pitch. The crew joins in. Kovesse adds harmony. Dragghen keeps time by striking Bulkhead with an open palm, the 90-pound keel plate ringing like a bell. By the third verse, even Vorreth is humming. He falls asleep mid-hum on the fourth verse, but the low note he holds while unconscious somehow makes the harmony better. The song rises over the Bastion Sea, carried by salt wind and something that feels dangerously close to joy.',
        loyaltyEffects: { dragghen: 2, kovesse: 2, vorreth: 1, delvessa: 1, suulen: 1, orren: 1, tessek: 1 },
      },
      {
        id: 'listen_quietly',
        text: 'Listen. The captain doesn\'t always need to lead.',
        resultText: 'You listen from the helm. The song rises and falls like the swells. Delvessa appears beside you. She\'s been listening too. "They\'re happy," she says, with the faint surprise of someone who forgot that was possible. "Happy crews fight harder." "Is that the strategist talking?" "No," she says. "That\'s the woman who chose the right ship." The song ends. The silence that follows is the good kind.',
        loyaltyEffects: { delvessa: 2 },
      },
    ],
  },

  // === COMBAT ENCOUNTERS AT SEA ===
  {
    id: 'sea_pirate_ambush',
    category: 'combat',
    title: 'BOARDERS',
    description: 'The ship hits your port side at dawn. No warning. No flag. A boarding vessel: fast, low, crewed by people who do this for a living. Grappling hooks bite into the rail before Vorreth can sound the alarm. Six pirates swing across the gap, blades drawn, eyes hungry. The captain, a scarred woman with bone-white teeth, lands on your deck and grins.',
    weight: 3,
    minDanger: 'moderate',
    repeatable: true,
    dangerLevel: 'dangerous',
    choices: [
      {
        id: 'fight_boarders',
        text: 'Pick up the Danzai. Remind them why they should have stayed home.',
        resultText: 'The first pirate doesn\'t even get his blade up. The Danzai catches him mid-chest and launches him back over the rail. The second one hesitates. Fatal mistake. Dragghen takes him from the flank with Bulkhead, 90 pounds of keel plate to the ribs. Vorreth drops a third with a single bare-knuckle strike to the jaw, calm as a man ordering tea. The pirate captain reassesses her life choices in real time. She\'s fast, though, fast enough to make it interesting. But interesting isn\'t the same as winning.',
        triggerCombat: 'sea_pirate_raid',
      },
      {
        id: 'intimidate_boarders',
        text: 'Stand up. Full height. Let the horns do the negotiating.',
        resultText: 'You step out of the cabin. Seven feet. Two horns catching the dawn light. Iron-hardened forearms that could bend ship rails. The pirate captain\'s grin freezes. Her crew stops mid-swing. One of them whispers something. You catch "Oni" and "Karyudon". The grappling hooks start coming loose before you say a single word. The captain backs away. "Wrong ship," she says. "We\'ll just... be going." They cut the ropes and pull away at speed. Kovesse is already composing the Grimoire post.',
        reputationChange: 3,
        infamyChange: 2,
        loyaltyEffects: { kovesse: 2, vorreth: 1 },
        successChance: 70,
        failText: 'You step out. Full height. Horns. Iron. The pirate captain looks you up and down... and laughs. "Big don\'t mean scary, goat-boy. GET HIM." They rush you. Well. You tried the peaceful option.',
      },
    ],
  },
  {
    id: 'sea_deep_current',
    category: 'combat',
    title: 'SOMETHING BENEATH',
    description: 'The water changes color. Suulen notices first, the deep blue shifting to something darker, something that moves against the current. Then the ship lurches. Something massive scrapes the hull from below, and the entire vessel rocks sideways hard enough to topple Dragghen\'s tool chest. Whatever is down there, it\'s bigger than the ship. And it\'s circling.',
    weight: 2,
    minDanger: 'dangerous',
    minDay: 5,
    repeatable: true,
    dangerLevel: 'deadly',
    choices: [
      {
        id: 'fight_sea_beast',
        text: 'Lean over the rail. Wait for it to surface. Hit it with everything.',
        resultText: 'It surfaces. A Deep Current Horror: all muscle, teeth, and bioluminescent fury. The thing is thirty feet of predatory evolution that decided boats are food. Its eyes catch the light like black mirrors. You grip the Danzai. "DRAGGHEN! VORRETH! ON ME!" The beast lunges. This is going to hurt.',
        triggerCombat: 'sea_monster',
      },
      {
        id: 'outrun_sea_beast',
        text: '"Suulen! Find us faster water! Kovesse, every sail, NOW!"',
        resultText: 'Suulen reads the current like poetry, finding a faster flow that can carry you away from the predator\'s hunting ground. Kovesse scrambles up the rigging with the fearless agility of someone who doesn\'t understand physics. The sails catch. The ship surges forward. Behind you, the water erupts: the beast breaching, jaws wide, missing the stern by inches. You clear its territory in three minutes of white-knuckle sailing. Vorreth exhales for the first time since the lurch. "I hate the sea," he says. Then falls asleep.',
        loyaltyEffects: { suulen: 4, kovesse: 2 },
        effects: { supplies: -5 },
        successChance: 60,
        failText: 'Suulen tries to read the current but the beast is faster than the water. It rams the hull, HARD, and the ship staggers. Timbers crack. Dragghen swears in Gorundai and grabs Bulkhead. The thing surfaces, all teeth and rage, and you realize outrunning it was optimistic. Time for Plan B. Plan B is the Danzai.',
      },
    ],
  },
  {
    id: 'wardensea_patrol_intercept',
    category: 'wardensea',
    title: 'GREY COATS ON THE HORIZON',
    description: 'Wardensea cutter. Storm-grey hull, regulation sails, cannon ports open. It appears on the starboard horizon and changes course immediately, not toward you, but to cut off your heading. Professional. Methodical. This problem doesn\'t go away when you ignore it. Vorreth straightens. His old reflexes from fighting the Wardensea kick in before his new loyalties do.',
    weight: 3,
    minDanger: 'moderate',
    repeatable: true,
    dangerLevel: 'dangerous',
    choices: [
      {
        id: 'fight_wardensea',
        text: '"Run the flag. Let them know who they\'re chasing."',
        resultText: 'You run the black. Not a pirate flag: your flag. Karyudon\'s mark. The cutter sees it and accelerates. They\'re not deterred. They\'re excited. A confirmed sighting of the Oni Renegade is worth promotion points. The engagement is fast and brutal. They come alongside, marines swinging across with discipline and training. You meet them with the Danzai and a grin.',
        triggerCombat: 'wardensea_sea_ambush',
        bountyChange: 5000000,
      },
      {
        id: 'evade_wardensea',
        text: '"Suulen, lose them. Take us through the shallows."',
        resultText: 'Suulen takes the helm with the quiet confidence of someone who\'s been running from things since before you were born. She steers toward a reef system that no sane captain would attempt, but Suulen isn\'t sane. She\'s Morventhi. She reads water the way other people read books. The ship threads through coral gaps that shouldn\'t fit, riding currents that shouldn\'t exist, and the Wardensea cutter, regulation-built for deep water, can\'t follow. They break off pursuit after twenty minutes. Vorreth lets out a breath he\'s been holding since the sighting.',
        loyaltyEffects: { suulen: 5, vorreth: 2 },
        effects: { supplies: -3 },
        successChance: 65,
        failText: 'Suulen tries the reef approach but the Wardensea captain is better than expected. They know these waters too. The cutter cuts you off at the southern gap. Marines are already on deck. Vorreth swears under his breath. There\'s no running from this one.',
      },
    ],
  },
  {
    id: 'sea_merchant_rescue',
    category: 'discovery',
    title: 'WRECKAGE',
    description: 'Debris in the water. A merchant vessel, or what\'s left of one, listing badly, mast snapped, hull breached. Smoke rises from the forward hold. Two figures cling to the wreckage, waving desperately. The ship isn\'t going to float much longer.',
    weight: 2,
    repeatable: false,
    choices: [
      {
        id: 'rescue_merchants',
        text: 'Bring them aboard. Pull them out of the water.',
        resultText: 'You pull alongside. Dragghen hauls them up, two merchants, Veshtari trade runners, soaked and terrified. They babble about pirates, about a ship with a red hull, about cargo lost and insurance claims and "please, please, the water." You give them blankets and broth. They give you information, shipping schedules, patrol routes, trade prices at Sorren\'s Flat. Gratitude is the cheapest intelligence in the Bastion Sea.',
        effects: { intelligence: 5, supplies: -3 },
        reputationChange: 3,
        loyaltyEffects: { dragghen: 3, delvessa: 2 },
        setFlags: { rescued_merchants: true },
      },
      {
        id: 'salvage_wreck',
        text: 'Save the cargo first. Then the people.',
        resultText: 'Priorities. The cargo hold is still above water, barely. You send Dragghen and Kovesse to pull what they can before the ship goes under. They come back with crates of copper ingots and a sealed chest of Sovereigns. Dragghen rates the sinking ship\'s construction ("Solid one. Deserved to go under."). The merchants are furious about the order of operations but alive enough to complain, which is better than the alternative. Delvessa notes the salvage in her ledger with the careful detachment of someone who\'s done worse for less.',
        effects: { sovereigns: 80, materials: 8, supplies: -2 },
        loyaltyEffects: { dragghen: -2, delvessa: 1 },
        infamyChange: 1,
      },
      {
        id: 'ignore_wreck',
        text: 'Keep sailing. Not your problem.',
        resultText: 'You sail past. The figures on the wreckage watch you go. Two small shapes getting smaller against the horizon. Dragghen doesn\'t say anything. He goes below deck and stays there for an hour. When he comes back, he\'s repairing things. He fixes things when he can\'t talk. Every bolt he tightens sounds like the word he won\'t say. Being a conqueror means making choices that cost things that don\'t show up in ledgers.',
        loyaltyEffects: { dragghen: -5, vorreth: -2, delvessa: 1 },
        infamyChange: 2,
      },
    ],
  },
  {
    id: 'sea_storm_brutal',
    category: 'storm',
    title: 'WRATH',
    description: 'The sky goes black in twenty minutes. Not dark, black. The wind hits like a wall, and the waves go from swells to mountains. This isn\'t weather. This is the Bastion Sea reminding you who\'s in charge. Suulen grabs the helm. Dragghen ties down everything that moves, rating knots as he goes. Kovesse ties down herself.',
    weight: 3,
    minDanger: 'moderate',
    repeatable: true,
    dangerLevel: 'dangerous',
    baseEffects: { supplies: -5 },
    choices: [
      {
        id: 'storm_fight_through',
        text: 'Hold course. Fight through it. Conquerors don\'t run from weather.',
        resultText: 'Four hours. Four hours of waves high enough to block the sky and wind that screams louder than Kovesse\'s worst broadcasts. The hull groans. The rigging shrieks. You stand at the helm beside Suulen, both of you soaked, both of you refusing to yield. Somewhere around hour three, Delvessa appears with hot broth. She\'s drenched. Her glasses are gone. She looks beautiful. "You\'re insane," she yells over the wind. "THANK YOU," you yell back. The storm breaks at dawn. The ship is battered but afloat. The crew is exhausted but alive. You have never felt more awake.',
        effects: { supplies: -8 },
        loyaltyEffects: { suulen: 3, delvessa: 2, dragghen: 2, kovesse: 1 },
        reputationChange: 1,
        successChance: 55,
        failText: 'You hold course but the storm holds harder. A rogue wave catches the port side and the ship rolls: not a list, a ROLL. Cargo shifts. The mast cracks. Suulen screams a correction and somehow... somehow... keeps the keel from turning. You lose supplies overboard and two hours of repairs follow. But you\'re alive. Barely.',
        failEffects: { supplies: -15, materials: -5 },
      },
      {
        id: 'storm_shelter',
        text: '"Suulen, find us shelter. Any cove, any reef, anything."',
        resultText: 'Suulen\'s eyes go distant: the Morventhi spatial sense kicking in, reading the water and wind like a map. "Reef system, southeast. Natural breakwater. Twenty minutes if we angle the current." Twenty minutes of brutal sailing, but she\'s right. The reef breaks the worst of the waves and the ship slides into the lee like a hand into a glove. The storm rages overhead. Your crew huddles below deck. Dragghen patches hull stress fractures, rating the reef shelter ("Solid five. Good rock."). Kovesse starts a card game. Vorreth falls asleep against the bulkhead. For once, nobody is trying to conquer anything.',
        effects: { supplies: -3 },
        loyaltyEffects: { suulen: 5, dragghen: 2, kovesse: 2, vorreth: 2 },
      },
    ],
  },
  {
    id: 'delvessa_seasick',
    category: 'crew',
    title: 'THE STRATEGIST AND THE SEA',
    description: 'You find Delvessa at the stern rail, gripping it with both hands, staring at the horizon with the focused intensity of someone who is absolutely, definitely, categorically not going to be sick. She\'s wearing the expression of a woman who has calculated the probability of vomiting and is refusing to accept the result.',
    weight: 2,
    requiresCrew: 'delvessa',
    repeatable: false,
    choices: [
      {
        id: 'hold_her_hair',
        text: 'Stand behind her. Brace her shoulders. Don\'t say a word.',
        resultText: 'You stand behind her. Your hands on her shoulders, steady, warm, big enough that she could probably use one as a lifeboat. She doesn\'t look back. But she leans into your grip. Five minutes pass. The nausea fades. She straightens, adjusts her coat, pushes her glasses up. "If you tell anyone about this," she says, "I will reroute your finances through seventeen shell companies and you will never see a sovereign again." "Tell anyone about what?" "Exactly." But her hand finds yours on the rail and squeezes once. Quick. Tight. Gone before anyone could see it.',
        loyaltyEffects: { delvessa: 6 },
      },
      {
        id: 'tease_delvessa_sick',
        text: '"Delvessa Ghal. The woman who stared down Kolmari Arbiters. Defeated by water."',
        resultText: '"I am NOT--" She pauses. Swallows. The horizon lurches. "I am experiencing a temporary recalibration of my vestibular system." "You\'re seasick." "I will END your financial infrastructure." But she laughs, a genuine laugh, out before the Kolmari training can catch it. "Dragghen told me copper-root tea helps." "Dragghen rates everything a four at best. Don\'t trust his medical advice." She looks at you. Full eye contact despite the nausea. "Your crew is ridiculous." "Our crew." "...Our crew." The correction lands like a dropped anchor. Heavy. Final. Exactly where it should be.',
        loyaltyEffects: { delvessa: 4, dragghen: 1 },
      },
    ],
  },
  {
    id: 'floating_cargo',
    category: 'discovery',
    title: 'FLOTSAM',
    description: 'Crates in the water. Six of them, lashed together, bobbing in the current. No ship nearby. No wreckage. Just cargo, floating free, as if someone dumped it overboard in a hurry. Suulen identifies the lashing pattern as Kolmari standard freight. Whatever was in those crates, someone wanted it gone.',
    weight: 3,
    repeatable: true,
    choices: [
      {
        id: 'retrieve_cargo',
        text: 'Haul it aboard. Finders keepers.',
        resultText: 'Dragghen hooks the crates with a grapple and hauls them up. He rates the lashing ("Solid four. Kolmari know their knots."). Inside: sealed containers of preserved rations, a crate of copper trade bars stamped with Coppervein marks, and a locked strongbox that Kovesse opens in eleven seconds with a hairpin and a confident grin. Sovereigns. Not a fortune, but enough to make the detour worthwhile. Delvessa logs it as "maritime salvage." The legal term for "we found money in the ocean and kept it."',
        effects: { sovereigns: 40, supplies: 8, materials: 3 },
        loyaltyEffects: { kovesse: 2, dragghen: 1 },
      },
      {
        id: 'check_for_traps',
        text: '"Check it first. Nobody dumps cargo without a reason."',
        resultText: 'Smart call. Suulen examines the crates from the water before they\'re brought aboard. She finds a tracking device: Kolmari-issue, still pinging. Someone dumped this cargo and marked it for retrieval. If you\'d hauled it aboard without checking, you\'d have a Kolmari retrieval team following your wake within hours. You disable the tracker, take the contents, and scatter the empty crates. Whoever comes looking will find nothing but salt water.',
        effects: { sovereigns: 40, supplies: 8, materials: 3, intelligence: 3 },
        loyaltyEffects: { suulen: 3, vorreth: 2 },
      },
    ],
  },
  {
    id: 'tessek_teaches_blade',
    category: 'crew',
    title: 'THE NAMED FORMS',
    description: 'Dawn. Tessek is on the foredeck, drilling with his nodachi. Not the casual practice of a man keeping fit: sweeping, theatrical movements where every cut has a name and every name is announced with complete sincerity. "Ascending Lunar Ruin!" he calls, pivoting. "Garroden Harsk used this to split a mast in the Battle of the Shattered Keel!" Whether Garroden Harsk is real remains unclear. Tessek does not care. His Sight Dominion blade work is absurd and beautiful.',
    weight: 2,
    requiresCrew: 'tessek',
    minDay: 8,
    repeatable: false,
    choices: [
      {
        id: 'spar_with_tessek',
        text: 'Join him. Pick up the Danzai. See if the Sight Dominion can teach an Oni.',
        resultText: 'The spar lasts forty minutes. Tessek is theatrical where you\'re powerful, precise where you\'re instinctive. He parries the Danzai three times, naming each parry ("The Three-Fold Rejection!"), and actually lands a training strike on your ribs that you feel through the Iron. "You swing wide," he says, eyes gleaming. "The Danzai creates openings on the backswing. Garroden Harsk called this \'The Invited Mistake.\' Tighten the recovery arc by six inches." "That\'s very specific." "Every technique deserves a name, Captain. Even the corrections." You adjust. The next swing is faster. Tessek names it on the spot: "The Corrected Mountain." It sounds ridiculous. It also works.',
        loyaltyEffects: { tessek: 6 },
        reputationChange: 1,
      },
      {
        id: 'watch_tessek',
        text: 'Watch. Learn the Sight Dominion style. Know what your blade master knows.',
        resultText: 'You lean against the mast and study every movement. Tessek\'s forms are nothing like doctrine. They\'re fluid, improvisational, each technique named in the moment and performed with the dramatic commitment of a man who believes every sword fight is a story. "The Descending Amber Divide!" "The Horizon Splitter!" After twenty minutes, you realize the theatrics hide something genuine: the movements are precise, efficient, deadly. After thirty, you can predict the forms before he makes them. Tessek finishes. Catches your eye. Sees that you\'ve been memorizing. "Learning to surpass Garroden Harsk?" he asks, breathless. "Learning what you already know." He considers this. His eyes well up slightly. "That might be the most beautiful thing anyone has said about my technique, Captain."',
        effects: { intelligence: 3 },
        loyaltyEffects: { tessek: 4 },
      },
    ],
  },

  // =========================================================
  // ACT 3 TRAVEL EVENTS - The sea at war
  // =========================================================

  {
    id: 'wardensea_scout_ship',
    category: 'wardensea',
    title: 'EYES ON THE HORIZON',
    description: 'A Wardensea frigate at the edge of visibility. It isn\'t closing, it\'s pacing you. Matching speed, maintaining distance, cataloging your heading and bearing. A scout. Vasshen\'s eyes, watching where you go so the fleet knows where you\'ll be.',
    weight: 4,
    dangerLevel: 'dangerous',
    requiredFlags: { act3_begun: true },
    repeatable: true,
    choices: [
      {
        id: 'chase_scout',
        text: '"Run it down. No reports get back to the Admiral."',
        resultText: 'You turn hard to starboard and close the distance. The frigate breaks immediately. It\'s fast, built for observation, not engagement. Your ship is heavier but the wind favors you. After twenty minutes the scout captain realizes he can\'t outrun you and dumps his signal flares overboard. You pull alongside. Vorreth boards with six marines and seizes the navigation charts. Calm, direct, terrifyingly competent. The scout captain surrenders before Vorreth finishes crossing the gangplank. Fresh intelligence on Wardensea patrol patterns, fleet positioning, supply routes. The scout crew goes into the water in longboats. Alive. Humiliated. Vasshen will know you caught her eyes, but she won\'t know what you learned.',
        effects: { intelligence: 8 },
        loyaltyEffects: { vorreth: 3 },
        infamyChange: 2,
        bountyChange: 500000,
      },
      {
        id: 'ignore_scout',
        text: '"Let it watch. We\'re not hiding."',
        resultText: 'The frigate follows for three hours, cataloging your course. Kovesse intercepts its signal transmissions and reads them in real time: your heading, speed, crew count estimates, armament assessment. "They\'re overestimating our cannon count by four," she says, amused. "Should I correct them?" "No." Let Vasshen think you\'re more armed than you are. Let the Admiral plan for a ship that doesn\'t exist. Deception works both ways.',
        effects: { intelligence: 2 },
        loyaltyEffects: { kovesse: 2 },
      },
    ],
  },
  {
    id: 'conqueror_fleet_sighting',
    category: 'omen',
    title: 'THE CONGRESS MOVES',
    description: 'Fourteen ships on the southern horizon. Black sails, no formation, every Conqueror crew maintains its own heading, its own speed, its own ego. But they\'re moving in the same direction, and that\'s unusual enough to make Delvessa put down her ledger and come topside. Fourteen independent captains heading the same way means someone called a Congress. Someone powerful enough to be heard.',
    weight: 2,
    dangerLevel: 'moderate',
    requiredFlags: { act3_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'signal_congress',
        text: '"Run up our colors. Let them see the Oni who took Vess Harbour."',
        resultText: 'Your flag goes up. Fourteen ships, and every one of them turns slightly. Not to engage. To look. You can feel the binoculars on your hull, the whispered conversations on distant decks. One ship breaks formation and approaches. The captain, a woman with Conqueror tattoos covering both arms, salutes from her quarterdeck. Not a mock salute. A real one. "The Sixth Seat heard about Vess Harbour," Delvessa murmurs. "This is what respect looks like when it comes from people who don\'t respect anyone." The ship peels away. The fourteen continue south. But they know your name now. All of them.',
        reputationChange: 3,
        infamyChange: 3,
        loyaltyEffects: { delvessa: 2 },
      },
      {
        id: 'observe_congress',
        text: '"Stay dark. Watch where they\'re heading."',
        resultText: 'You track the fleet without revealing yourself. Kovesse triangulates their course from signal fragments and Suulen reads their wake patterns. Heading: the deep south. Past Noon Island, past the charted waters, into the stretch of ocean where old Conqueror legends say the first pirate king built his throne room. Vorreth says nothing, but his jaw tightens. Whatever\'s down there, the Conquerors want it before the Wardensea does.',
        effects: { intelligence: 5 },
        loyaltyEffects: { suulen: 2, kovesse: 2 },
      },
    ],
  },
  {
    id: 'iron_rain',
    category: 'storm',
    title: 'IRON RAIN',
    description: 'The storm comes from nowhere. Not unusual, storms in the Bastion Sea form fast. What\'s unusual is the color. The rain is red. Not blood-red, not rust-red: the dull orange of raw iron oxide falling from a sky that looks like it\'s bleeding. Suulen says the magnetic anomalies from Rotstone have been getting stronger. Kovesse says her Grimoires are screaming. The sea itself has turned the color of a bruise.',
    weight: 3,
    dangerLevel: 'dangerous',
    requiredFlags: { act3_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'push_through_storm',
        text: '"Full sail. We don\'t stop for weather."',
        resultText: 'The iron rain strips paint from the hull and stings exposed skin. Your crew works the rigging with their heads down, jackets pulled high, moving by muscle memory because visibility drops to nothing. Dragghen keeps the ship steady through sheer force, his hands on the wheel like they\'re welded there. He rates the storm between gusts: "Solid six." The crew freezes. Dragghen has never rated anything above five. Three hours of it. When the storm passes, your ship looks like it sailed through a forge. But the heading held. The schedule holds. Sometimes leadership is just refusing to stop.',
        effects: { supplies: -4 },
        loyaltyEffects: { dragghen: 4 },
      },
      {
        id: 'shelter_storm',
        text: '"Find shelter. Suulen, nearest lee shore."',
        resultText: 'Suulen guides you to a rocky outcrop that blocks the worst of it. You anchor in the shadow of volcanic stone while the iron rain hammers the exposed sea around you. During the wait, Kovesse analyzes the rain itself. "This isn\'t normal precipitation. The iron content is absurd, like something below the seafloor is being ground up and ejected into the atmosphere. Rotstone?" Maybe. Or maybe the sea is doing what the sea has always done, changing, whether anyone\'s ready or not.',
        effects: { intelligence: 4 },
        loyaltyEffects: { suulen: 3, kovesse: 2 },
      },
    ],
  },
  {
    id: 'kolmari_supply_convoy',
    category: 'trade',
    title: 'CONFEDERATION CONVOY',
    description: 'A Kolmari supply convoy. Eight merchant vessels under armed escort: two frigates flying the double-diamond of the Sovereign Docks. The convoy is heading north, probably supplying the blockade infrastructure. Rich targets. Legitimate targets, if you consider the blockade an act of war. Which you do.',
    weight: 3,
    requiredFlags: { act3_begun: true },
    repeatable: true,
    dangerLevel: 'dangerous',
    choices: [
      {
        id: 'raid_convoy',
        text: '"Hit the trailing ship. Fast raid. Take supplies and run."',
        resultText: 'You hit the last merchant ship in the line, the one the escorts can\'t turn back to protect without breaking formation. Vorreth leads the boarding action. Sixty seconds. His marines storm the deck, overwhelm the skeleton crew, and strip the cargo hold of everything portable. Supplies. Materials. A crate of Iron-infused hull plating that Dragghen practically salivates over. "Solid five plating," he breathes, already planning where to mount it. You\'re gone before the frigates can reverse course. The convoy sails on, one ship lighter. The Kolmari will add it to your bill.',
        effects: { supplies: 15, materials: 8 },
        loyaltyEffects: { vorreth: 3, dragghen: 2 },
        bountyChange: 1000000,
        infamyChange: 3,
      },
      {
        id: 'let_convoy_pass',
        text: '"Let it pass. We\'re not pirates, not today."',
        resultText: 'The convoy passes within cannon range and you let it go. Delvessa watches the merchant ships glide by and does the math out loud. "Six hundred thousand Sovereigns of cargo in those holds. Minimum." She looks at you. "I know why you let them go. But the treasury knows too." Discipline has a cost. Restraint has a cost. The question is whether the Kolmari will ever notice the price you paid to leave their ships alone.',
        reputationChange: 3,
        loyaltyEffects: { delvessa: -1 },
      },
    ],
  },
  {
    id: 'karyudon_rooftop',
    category: 'crew',
    title: 'THE WEIGHT OF IT',
    description: 'Night watch. The crew sleeps below. The helm is lashed, the wind steady, the sea flat black under a sky full of unfamiliar stars. You\'re alone on the quarterdeck with nothing but the sound of water against the hull and the weight of every decision you\'ve made sitting on your shoulders like a second set of horns.',
    weight: 2,
    requiredFlags: { act3_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'karyudon_reflects',
        text: 'Think about how you got here. The prison. The breakout. Every island that bent or broke.',
        resultText: 'You trace the route in your head. A cell in Tavven Shoal. Dragghen\'s repairs. Delvessa\'s ledger. Vorreth\'s tactical mind. Kovesse\'s network. Suulen\'s sight. Tessek\'s blade. Orren\'s storm. Every island a choice. Every choice a door that closed behind you. You didn\'t plan any of this. You just kept moving and the sea kept opening. Now you\'re here, a former prisoner commanding a fleet, at war with the oldest naval power in the world, and the only thing between you and the ocean floor is the loyalty of seven people who bet everything on a jailbreak. You don\'t regret any of it. You\'re not sure you could.',
        loyaltyEffects: { dragghen: 1, delvessa: 1, vorreth: 1, kovesse: 1, suulen: 1, tessek: 1, orren: 1 },
      },
      {
        id: 'karyudon_forward',
        text: 'Think about what comes after. If you win. If you actually pull this off.',
        resultText: 'The hardest question isn\'t how to win. It\'s what winning looks like the day after. You take the Bastion Sea, then what? Someone has to govern. Someone has to keep the trade routes open, the harbors maintained, the pirates in check and the Wardensea out. Someone has to sit in a room and make decisions that aren\'t about survival but about infrastructure. Roads. Taxes. Fishing rights. It\'s not romantic. It\'s not dramatic. But it\'s what comes after the last flag falls and the last sword goes back in its sheath. Can an Oni do that? Can you? The stars don\'t answer. The sea doesn\'t answer. The question sits there, patient and enormous, waiting for a day when you have to.',
        reputationChange: 2,
      },
    ],
  },
  {
    id: 'delvessa_war_math',
    category: 'crew',
    title: 'THE NUMBERS DON\'T LIE',
    description: 'Delvessa is at her table in the cabin, surrounded by ledgers and Grimoire readouts. The candlelight catches the sharp angles of her face and the ink stains on her fingers. She\'s been running projections for sixteen hours straight and the numbers aren\'t getting better.',
    weight: 2,
    requiresCrew: 'delvessa',
    requiredFlags: { act3_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'ask_delvessa_numbers',
        text: '"Give me the honest version."',
        resultText: '"We\'re spending faster than we\'re earning. Every day this war continues costs us territory income because the trade lanes are contested. The Kolmari blockade, even partially broken, reduced our revenue by thirty percent." She taps a column of figures. "At current burn rate, we have enough to operate for twenty-two days. After that, we start choosing between feeding the crew and maintaining the ships." She pauses. "I didn\'t say this to scare you, Captain. I said it because you need to make decisions faster. Every day we wait costs more than the day before." You nod. This is why you have her. Not for comfort, for truth.',
        effects: { intelligence: 3 },
        loyaltyEffects: { delvessa: 4 },
      },
      {
        id: 'reassure_delvessa',
        text: '"We\'ll manage. We always have."',
        resultText: '"We have managed so far because the margins were large enough to absorb mistakes." She doesn\'t look up. "The margins are gone, Captain. From here, every mistake costs something real." She closes the ledger. "I\'m not questioning your leadership. I\'m telling you that the math has changed. We used to be an insurgency: cheap, fast, unpredictable. Now we\'re an authority. Authorities are expensive." She\'s right. You both know it. The silence between you acknowledges what words don\'t need to.',
        loyaltyEffects: { delvessa: 2 },
      },
    ],
  },

  // === ACT 2 TRAVEL EVENTS ===
  {
    id: 'act2_wardensea_deserters',
    category: 'discovery',
    title: 'WARDENSEA DESERTERS',
    description: 'A battered rowboat bobs in the channel ahead. Three people in grey coats, or what\'s left of grey coats. Wardensea sailors. Deserters, by the look of it. One waves a white rag. The other two look like they haven\'t eaten in days.',
    weight: 2,
    requiredFlags: { act2_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'take_deserters',
        text: 'Take them aboard. Information is more valuable than rations.',
        resultText: 'The deserters climb aboard with the gratitude of drowning men. Over cups of copper-root tea, Dragghen patches their rowboat while they talk. Second Division morale is cratering. Officers are filing transfers. Supply lines are stretched. "Vasshen\'s pushing too hard," the senior one says. "Half the Division thinks you\'re unstoppable. The other half thinks you\'re a myth." They\'re not fighters. But they know patrol routes, resupply schedules, and who in the command structure is losing faith.',
        effects: { intelligence: 5, supplies: -3 },
        loyaltyEffects: { vorreth: 2, delvessa: 1 },
      },
      {
        id: 'leave_deserters',
        text: 'Mark the location and move on. Deserters attract attention.',
        resultText: 'You note the coordinates and leave them with a water barrel. Vorreth watches them shrink behind you. "I was a prisoner once, too," he says. Nothing else. He falls asleep against the rail. The silence on the quarterdeck lasts the rest of the day.',
        loyaltyEffects: { vorreth: -2 },
      },
    ],
  },
  {
    id: 'act2_grimoire_propaganda',
    category: 'crew',
    title: 'GRIMOIRE WAR',
    description: 'Kovesse bursts onto deck holding her relay, face tight with something between fury and professional admiration. "Captain. The Wardensea hired a Grimoire influencer. Someone calling themselves \'The Admiral\'s Voice\' just published a twelve-part series calling you a terrorist. It has THREE HUNDRED THOUSAND views."',
    weight: 3,
    requiresCrew: 'kovesse',
    requiredFlags: { act2_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'counter_propaganda',
        text: '"Then make something with four hundred thousand views."',
        resultText: 'Kovesse\'s eyes light up with the fire of a true professional. "Already drafted. Working title: \'The Oni Who Broke The Fleet - A Firsthand Account.\' I\'ve been saving footage. Captain, you gave me permission to broadcast you punching through a warship hull. That\'s PREMIUM content." She vanishes below deck. Twelve hours later, the counter-series drops. Five hundred thousand views in a day. The Admiral\'s Voice goes quiet.',
        loyaltyEffects: { kovesse: 5 },
        reputationChange: 3,
      },
      {
        id: 'ignore_propaganda',
        text: '"Let them talk. Our actions speak louder."',
        resultText: '"Actions don\'t have ENGAGEMENT METRICS, Captain!" But she accepts it. Grudgingly. The series runs its course. Public opinion is mixed. Kovesse spends the next three days composing rebuttals she\'ll never publish, which is its own form of suffering.',
        loyaltyEffects: { kovesse: -1 },
        reputationChange: -1,
      },
    ],
  },
  {
    id: 'act2_kolmari_smuggler_contact',
    category: 'trade',
    title: 'KOLMARI BACK CHANNEL',
    description: 'A sleek black-hulled cutter pulls alongside. No flag, no markings, hull painted to absorb lantern light. A Kolmari smuggler. They flash a signal that Suulen recognizes. "Shadow market courier. They want to talk business."',
    weight: 2,
    requiresCrew: 'suulen',
    requiredFlags: { act2_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'deal_with_smuggler',
        text: '"What kind of business?"',
        resultText: 'The smuggler offers supplies at triple market rate, the blockade premium. But they also offer something better: Kolmari internal communications. "The Confederation isn\'t unified," the smuggler says. "Three voting blocs. Two of them think the blockade is costing more than you are. The third is making money from it." Intelligence is currency. You pay the triple rate and get something worth ten times the cost.',
        effects: { supplies: 10, intelligence: 8, sovereigns: -80 },
        loyaltyEffects: { suulen: 3, delvessa: 2 },
      },
      {
        id: 'refuse_smuggler',
        text: '"We don\'t pay blockade prices."',
        resultText: 'The smuggler shrugs, professionally. "Your choice. The offer stands for forty-eight hours. After that, we sell to whoever pays." The black cutter vanishes into the dark like it was never there. Suulen watches it go. "That was a mistake," she says, without inflection. Whether it was or wasn\'t, you\'ll find out later.',
        loyaltyEffects: { suulen: -2 },
      },
    ],
  },
  {
    id: 'act2_vorreth_old_comrade',
    category: 'crew',
    title: 'GHOST FROM THE ACCORD',
    description: 'Vorreth is at the rail, staring at a passing merchant ship. He hasn\'t moved in twenty minutes. Something about the ship, or someone on it, has frozen him. You follow his gaze and see a figure on the merchant\'s deck. Broad-shouldered, moving with the deliberate gait of someone who learned discipline the hard way. A former pirate. Daaz Accord crew, by the tattoos.',
    weight: 2,
    requiresCrew: 'vorreth',
    requiredFlags: { act2_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'ask_vorreth',
        text: '"Someone you know?"',
        resultText: '"Morath. He sailed under me in the Accord. Ten years." His voice is calm. Direct. But his hands are white-knuckled on the rail. "He\'s on a merchant vessel. That means he got out." A pause. "Or he\'s still running." He watches until the ship is gone. Then he turns back to the crew and starts the evening drill harder than usual. He falls asleep once, mid-correction, then continues the sentence. Some conversations happen in silence.',
        loyaltyEffects: { vorreth: 3 },
      },
      {
        id: 'leave_vorreth',
        text: 'Give him his space.',
        resultText: 'You walk past without comment. Some ghosts are private. Vorreth stands at the rail until the merchant ship disappears beyond the horizon. When he finally turns away, his expression is the same as always: calm, composed, giving nothing. But the evening drill is lighter than usual. Almost gentle. He falls asleep standing up twice.',
        loyaltyEffects: { vorreth: 1 },
      },
    ],
  },

  // === ACT 3 TRAVEL EVENTS ===
  {
    id: 'act3_wardensea_ceasefire_signal',
    category: 'wardensea',
    title: 'WHITE FLAGS',
    description: 'A Wardensea cutter approaches under white flag. No weapons visible. No boarding posture. The signal is unmistakable: parley. Vorreth reads the pennants. "That\'s Vasshen\'s personal cipher. The Admiral wants to talk."',
    weight: 3,
    requiredFlags: { act3_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'accept_parley',
        text: '"Let them approach."',
        resultText: 'A junior officer boards alone. She carries a sealed letter from Vasshen. The contents are brief: a proposed demarcation line. The Wardensea keeps the eastern approaches. You keep everything else. "She\'s offering terms," Delvessa says. "Real ones. The Wardensea doesn\'t offer terms unless they\'ve run the numbers and the numbers say stop fighting." This could end the war. Or it could be a trap. The officer waits, hands clasped, eyes on the horizon.',
        effects: { intelligence: 5 },
        loyaltyEffects: { vorreth: 2, delvessa: 3 },
        reputationChange: 2,
      },
      {
        id: 'reject_parley',
        text: '"No terms. We take what we want."',
        resultText: 'The cutter withdraws. The white flag comes down. Vorreth watches it go. "That was the easy way out, Captain." He\'s not wrong. But you didn\'t break out of a prison transport to negotiate with the people who put you in one. The war continues. It was always going to.',
        loyaltyEffects: { vorreth: -2, delvessa: -1 },
        infamyChange: 3,
      },
    ],
  },
  {
    id: 'act3_final_calm',
    category: 'omen',
    title: 'THE CALM BEFORE',
    description: 'The sea is glass. Not a ripple. Not a wave. The sails hang limp. The hull barely moves. Even the gulls are silent. Suulen stands at the bow, eyes closed, one hand on the rail. "Something is coming," she says. "The sea knows."',
    weight: 2,
    requiredFlags: { act3_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'prepare_for_storm',
        text: '"Then we prepare."',
        resultText: 'You call all hands. Weapons checked. Supplies secured. The ship is battened down for whatever the sea has in mind. When the wind finally returns, sudden, hard, salt-scented, the crew is ready. Vorreth nods approval. Dragghen hands out rations and checks every seal on the hull without being asked. The storm or battle or whatever comes next will find you standing.',
        effects: { supplies: -2 },
        loyaltyEffects: { dragghen: 1, vorreth: 2, suulen: 2 },
      },
      {
        id: 'enjoy_the_calm',
        text: '"Then enjoy the quiet while it lasts."',
        resultText: 'You sit on the deck, back against the mast, and close your eyes. The Danzai lies across your legs. Delvessa sits down next to you, close, but not touching. Dragghen opens a bottle of something expensive he\'s been saving. He rates it without speaking, just holds up five fingers. Kovesse turns off the Grimoire relay for the first time in months. The crew exists in the silence together. There are worse ways to spend the time before the world changes.',
        loyaltyEffects: { delvessa: 2, dragghen: 2, kovesse: 1 },
      },
    ],
  },
  {
    id: 'act3_conqueror_fleet_passing',
    category: 'omen',
    title: 'CONQUEROR FLEET',
    description: 'The horizon fills with sails. Dozens of them. Conqueror vessels in full war formation: black hulls, red pennants, a fleet that makes naval historians update their textbooks. They pass half a mile to starboard. Close enough to count the cannons. Close enough to see the crews watching you.',
    weight: 2,
    requiredFlags: { act3_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'signal_conquerors',
        text: 'Signal them. Show the flag.',
        resultText: 'You run up your colors. The nearest Conqueror vessel dips its pennant, the Conqueror salute. Acknowledgment. Not submission, not alliance. Just recognition. One power to another. Kovesse records the exchange. "That\'s going to look incredible on the feed," she says. She\'s not wrong. The Bastion Sea just saw the Conqueror fleet acknowledge you as an equal.',
        reputationChange: 3,
        loyaltyEffects: { kovesse: 2 },
      },
      {
        id: 'watch_conquerors',
        text: 'Watch them pass. Say nothing.',
        resultText: 'The fleet passes in silence. Ship after ship after ship. Vorreth counts them, forty-two vessels. "That\'s their full strength," he says. "Wherever they\'re going, they\'re committing everything." He falls asleep for four seconds, then: "I\'ve fought a fleet that size. Once. We won. Barely." The Conquerors don\'t look back. Neither do you. The sea has room for two predators. For now.',
        effects: { intelligence: 2 },
        loyaltyEffects: { vorreth: 1 },
      },
    ],
  },
  {
    id: 'act3_karyudon_remembers',
    category: 'crew',
    title: 'THE TRANSPORT',
    description: 'You pass through the waters where it happened. The coordinates are burned into your memory, the place where the prison transport was attacked. Where the chains broke. Where everything began. The water looks the same as everywhere else. The sea doesn\'t mark graves.',
    weight: 2,
    requiredFlags: { act3_begun: true },
    repeatable: false,
    choices: [
      {
        id: 'acknowledge_past',
        text: 'Stop the ship. A moment of silence.',
        resultText: 'The crew understands without being told. The ship heaves to. You stand at the rail where the chains were. The water is dark. Somewhere below, the wreckage of the transport sits on the seabed, steel and bone and the memory of the person you were before. You don\'t speak. Delvessa puts a hand on your shoulder. Dragghen pours a drink overboard, then quietly checks the rail fittings because his hands need something to do. Vorreth salutes, fist to chest. Old habits from a hard life. Even here, they die hard. Orren\'s ears flatten. Tessek is silent for perhaps the first time. "That was the last day I was afraid," you say. Nobody responds. Nobody needs to.',
        loyaltyEffects: { delvessa: 3, dragghen: 2, vorreth: 2, suulen: 1, kovesse: 1, tessek: 1, orren: 1 },
        reputationChange: 1,
      },
      {
        id: 'sail_on',
        text: 'Keep sailing. That person died in those waters.',
        resultText: 'You don\'t slow down. The coordinates pass beneath the hull. The crew watches you, waiting for something, a reaction, a pause. You give them nothing. The past is a country you left. The horizon is the only direction that matters. Suulen catches your eye and nods. She understands. Some people move forward by letting go.',
        loyaltyEffects: { suulen: 2 },
      },
    ],
  },
];

// ==========================================
// TRAVEL EVENT SELECTION
// ==========================================

interface TravelEventContext {
  dangerLevel: 'safe' | 'moderate' | 'dangerous' | 'deadly';
  dayCount: number;
  flags: GameFlags;
  crew: CrewMember[];
  firedTravelEventIds: string[];
}

/**
 * Select travel events for a voyage.
 * Longer/more dangerous routes get more events.
 */
export function selectTravelEvents(
  travelDays: number,
  context: TravelEventContext,
): TravelEvent[] {
  const { dangerLevel, dayCount, flags, crew, firedTravelEventIds } = context;
  const firedSet = new Set(firedTravelEventIds);
  const recruitedCrew = crew.filter((c) => c.recruited).map((c) => c.id);

  // Filter eligible events
  const eligible = seaTravelEvents.filter((event) => {
    // Non-repeatable already fired
    if (!event.repeatable && firedSet.has(event.id)) return false;

    // Danger level check
    if (event.minDanger && dangerRank[dangerLevel] < dangerRank[event.minDanger]) return false;

    // Day check
    if (event.minDay && dayCount < event.minDay) return false;

    // Crew requirement
    if (event.requiresCrew && !recruitedCrew.includes(event.requiresCrew)) return false;

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

  if (eligible.length === 0) return [];

  // Number of events scales with travel days and danger (halved for story-first pacing)
  // 1 day safe = 20% chance of 1 event
  // 2 day moderate = ~0.6 events
  // 3 day dangerous = ~1 event
  const dangerBonus = dangerRank[dangerLevel] * 0.15;
  const expectedEvents = Math.min(travelDays * (0.25 + dangerBonus), travelDays);
  const eventCount = Math.min(
    eligible.length,
    Math.max(
      Math.random() < 0.2 ? 1 : 0, // 20% chance of one event (halved for story pacing)
      Math.floor(expectedEvents + (Math.random() > 0.7 ? 1 : 0)),
    ),
  );

  if (eventCount === 0) return [];

  // Weighted random selection without replacement
  const selected: TravelEvent[] = [];
  const pool = [...eligible];

  for (let i = 0; i < eventCount && pool.length > 0; i++) {
    const totalWeight = pool.reduce((sum, e) => sum + e.weight, 0);
    let roll = Math.random() * totalWeight;

    let picked = false;
    for (let j = 0; j < pool.length; j++) {
      roll -= pool[j].weight;
      if (roll <= 0) {
        selected.push(pool[j]);
        pool.splice(j, 1);
        picked = true;
        break;
      }
    }
    // Floating-point fallback: pick last item if loop didn't select
    if (!picked && pool.length > 0) {
      selected.push(pool[pool.length - 1]);
      pool.splice(pool.length - 1, 1);
    }
  }

  return selected;
}

/**
 * Initialize a travel state for a voyage
 */
export function initializeTravel(
  fromIsland: string,
  toIsland: string,
  travelDays: number,
  dangerLevel: 'safe' | 'moderate' | 'dangerous' | 'deadly',
  events: TravelEvent[],
): TravelState {
  return {
    fromIsland,
    toIsland,
    totalDays: travelDays,
    currentDay: 0,
    dangerLevel,
    events,
    currentEvent: events.length > 0 ? events[0] : null,
    eventResolved: false,
    selectedChoice: null,
    choiceResult: null,
    choiceSucceeded: true,
    complete: events.length === 0, // If no events, travel is instant
  };
}

/**
 * Advance to the next event or complete travel
 */
export function advanceTravelEvent(state: TravelState): TravelState {
  const nextDay = state.currentDay + 1;

  if (nextDay >= state.events.length) {
    return {
      ...state,
      currentDay: nextDay,
      currentEvent: null,
      eventResolved: false,
      selectedChoice: null,
      choiceResult: null,
      choiceSucceeded: true,
      complete: true,
    };
  }

  return {
    ...state,
    currentDay: nextDay,
    currentEvent: state.events[nextDay],
    eventResolved: false,
    selectedChoice: null,
    choiceResult: null,
    choiceSucceeded: true,
  };
}

/**
 * Resolve a travel choice (check success chance, return result)
 */
export function resolveTravelChoice(
  state: TravelState,
  choiceId: string,
): { newState: TravelState; success: boolean } {
  if (!state.currentEvent) return { newState: state, success: false };

  const choice = state.currentEvent.choices.find((c) => c.id === choiceId);
  if (!choice) return { newState: state, success: false };

  // Check success chance
  let success = true;
  if (choice.successChance !== undefined) {
    success = Math.random() * 100 < choice.successChance;
  }

  const resultText = success
    ? choice.resultText
    : choice.failText || choice.resultText;

  return {
    newState: {
      ...state,
      eventResolved: true,
      selectedChoice: choice,
      choiceResult: resultText,
      choiceSucceeded: success,
    },
    success,
  };
}
