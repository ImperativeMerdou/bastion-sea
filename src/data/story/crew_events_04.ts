import { StoryScene } from '../../types/game';

// ==========================================
// DELVESSA GHAL - Event 04
// "The Kolmari Files"
// She kept copies. Of course she did.
// The question is what you do with them.
// ==========================================

export const delvessaEvent04: StoryScene = {
  id: 'crew_delvessa_04',
  title: 'THE KOLMARI FILES',
  characters: ['karyudon', 'delvessa'],
  beats: [
    {
      id: 'del_04_1',

      paragraphs: [
        'Iron-banded lockbox on the command room table. Kolmari manufacture, three tumblers, false bottom. The metal has gone the color of old blood from years of salt air and hiding places. Delvessa stands over it with both hands flat on the lid, thumbs pressed white against the iron.',
        'The candle beside her has burned down a full inch. Wax pools across the table edge and she hasn\'t touched it. She\'s running numbers that don\'t balance. You can tell because she\'s pressing too hard with the quill.',
      ],
    },
    {
      id: 'del_04_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You lean against the doorframe, arms folded. "That box has been under your bunk since the day you walked aboard. Always figured it was personal."',
      ],
    },
    {
      id: 'del_04_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"It is." Her fingers tighten on the lid. Grip tight enough that the tendons stand out along the backs of her hands. "When I left the Kolmari, I didn\'t just leave. I copied files. Operational files." She lifts the lid. The hinges groan. Inside: paper. Stacks of it, dense with her handwriting, organized with a precision that makes your teeth ache. Wardensea deployment rotations. Conqueror threat assessments. Trade route encryption keys. Garrison strength tables for every Kolmari installation in the central sea.',
        'She pulls a breath through her nose. Lets it out slow. "Spent my last three weeks as an Arbiter transcribing everything I could access. Filled this box. Carried it out in a supply crate marked \'personal effects.\'" The corner of her mouth twitches, thin and sharp. "Nobody checked. The Kolmari trusted me." Her voice drops. "That was their mistake."',
      ],
    },
    {
      id: 'del_04_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You straighten off the doorframe. "You\'ve been sitting on a box of Kolmari secrets for two years, and you\'re telling me NOW?"',
      ],
    },
    {
      id: 'del_04_5',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I was waiting until it mattered." She meets your eyes. Steady. The Arbiter stare, the one that used to make Kolmari officers sweat through their collars. "Until we were far enough along that this would be a weapon instead of a death sentence."',
        'She pulls out a sheaf of charts. Numbers. Names. Her hand is not quite steady. "Naval deployment schedule. Six months out. I designed the rotation pattern, so I know where every gap falls." Another sheaf. "Every Conqueror crew the Wardensea has active intelligence on. Capabilities. Known weaknesses. Kill conditions." She holds up a thinner document. Her thumb leaves a damp print on the paper. "Kolmari trade secrets. Proprietary formulas. Exclusive contracts. Every pressure point they use to choke commerce across three seas."',
        'She sets everything down. The papers fan across the table like a field surgeon\'s instruments.',
        '"This is worth a war, Karyudon." Her throat bobs. "And it\'s mine to give. I need you to decide what we do with it."',
      ],
    },
    {
      id: 'del_04_6',

      paragraphs: [
        'Candlelight caught the edge of every page. Outside, the harbor sat dead quiet, the calm that came after enough islands had been taken that local patrols stopped showing up. The box sat open on the table like a split ribcage. Two years of secrets. The work of a woman who torched every bridge behind her and kept the blueprints tucked against her chest.',
      ],
    },
    {
      id: 'del_04_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'del_04_use_intel',
          text: '"We use everything. Deployment patterns, Conqueror weaknesses, trade advantages, all of it. This is the edge we needed."',
          consequence: 'Use everything. Maximum advantage.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'infamy', value: 3 },
            { type: 'flag', target: 'kolmari_files_used', value: true },
            { type: 'loyalty', target: 'delvessa', value: 5 },
          ],
        },
        {
          id: 'del_04_give_grimoire',
          text: '"Give the trade intelligence to Kovesse. Let the Grimoire broadcast it. Everyone deserves to know how the Kolmari operate."',
          consequence: 'Public disclosure. Let the world see.',
          available: true,
          effects: [
            { type: 'reputation', value: 5 },
            { type: 'loyalty', target: 'kovesse', value: 5 },
            { type: 'flag', target: 'kolmari_files_broadcast', value: true },
            { type: 'loyalty', target: 'delvessa', value: 3 },
          ],
        },
        {
          id: 'del_04_destroy',
          text: '"Burn it. All of it. You didn\'t leave the Kolmari to become their shadow. You\'re better than stolen files."',
          consequence: 'Burn it. Cut the last tie.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 8 },
            { type: 'flag', target: 'kolmari_files_destroyed', value: true },
            { type: 'flag', target: 'delvessa_honor', value: true },
          ],
        },
      ],
    },
    {
      id: 'del_04_end',
      paragraphs: [
        'She closes the lockbox. The latch clicks. Her hand rests on the lid, fingers pressed white against the wood. Then she pulls it off the table and tucks it under one arm.',
        'She opens her mouth. Closes it. Nods once instead.',
        'She walks out. The box catches the doorframe on her way through. She adjusts her grip without stopping.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'delvessa_event_04_complete', value: true },
    { type: 'notification', value: true, notification: { type: 'crew', title: 'THE KOLMARI FILES', message: 'Delvessa disclosed Kolmari intelligence files. Contents under review.' }},
  ],
};

// ==========================================
// DRAGGHEN - Event 04
// "The Seven"
// He's been designing ships since before
// he met Karyudon. Seven of them. Each one
// unsinkable. But the shipyard that built
// his chains still has workers in debt-labor.
// Time to go back.
// ==========================================

export const dragghenEvent04: StoryScene = {
  id: 'crew_dragghen_04',
  title: 'THE SEVEN',
  characters: ['karyudon', 'dragghen'],
  beats: [
    {
      id: 'drag_04_1',

      paragraphs: [
        'Dragghen has taken over the war table with blueprints. Seven of them, spread edge to edge in precise charcoal lines on heavy drafting paper. Each design is detailed down to the keel rivets, annotated in Gorundai shorthand so tight it looks like stitching. Seven ships. Seven vessels designed to never sink.',
        'Bulkhead leans against the table leg. Ninety pounds of shaped iron, resting there like a walking stick. The blueprints are older than his time with the crew. Some of the paper has gone amber at the edges, cracking along the fold lines. He\'s been carrying these for years. Carrying them the way other men carry grudges.',
      ],
    },
    {
      id: 'drag_04_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You lean over the nearest blueprint. The hull geometry is wrong. Not wrong as in broken. Wrong as in nothing in the Bastion Sea looks like this. Double-layered, compartmentalized, the keel structure distributing impact force across the entire frame instead of concentrating it at the strike point. You trace the line with one finger. "These are yours."',
      ],
    },
    {
      id: 'drag_04_3',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'grim',
      paragraphs: [
        '"Mm." He taps one knuckle on the nearest blueprint. Once. Twice. A rhythm. "Nine years at the Kolmari shipyard." Flat. The way you\'d read a shipping manifest. No heat. No pity. Just the fact. "They had me building warships from fourteen. Debt-labor. My family owed the yard for passage to the central sea. The interest compounded. The debt never went down. Classic."',
        'He runs his thumb along the keel line of the nearest design. Slow. The paper whispers under his calluses. "Started drawing these on scrap during meal breaks. Ships that couldn\'t sink. Ships that didn\'t break." His amber eyes come up. Steady as stone foundations. "Not for the Kolmari. For the day I walked out." He stops. "I walked out. Most didn\'t."',
      ],
    },
    {
      id: 'drag_04_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"How many are still there?"',
      ],
    },
    {
      id: 'drag_04_5',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'angry',
      paragraphs: [
        '"Forty-three." No hesitation. He\'s kept count. "Gorundai, Morventhi, a few Rathai. All debt-labor. Contracts structured so the balance never clears. Work harder, owe more." He cracks a knuckle. Pops it loud enough to echo off the walls. "Classic Kolmari arithmetic."',
        'He pulls a separate sheet from under the blueprints. A floor plan. The Kolmari shipyard, drawn from memory with a precision that makes your skin prickle. Guard posts in red. Entry points circled. Shift rotation times in the margins. Nine years of corridors mapped in ink so fine it looks mechanical. Every doorway. Every blind spot. Every structural weakness in the perimeter wall.',
        '"I want to go back." He sets his palm flat on the floor plan. The table groans under the weight. "Not to conquer. Walk in, break the contracts, walk out with whoever wants to leave."',
      ],
    },
    {
      id: 'drag_04_6',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You\'ve got the whole place memorized."',
      ],
    },
    {
      id: 'drag_04_7',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Nn." He taps the perimeter wall on the floor plan. Three points, rapid. "Every entry. Every rotation. Every structural weakness." His mouth twitches. Just the corner. Just barely. "Rated their security once. Solid two."',
      ],
    },
    {
      id: 'drag_04_8',

      paragraphs: [
        'The blueprints cover the entire table. His hand is flat on the floor plan. Bulkhead leans against the table leg, close enough that he could grab it without looking.',
        'He\'s not asking. The way his palm presses the paper flat, the weight behind it. He\'s informing.',
      ],
    },
    {
      id: 'drag_04_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'drag_04_full_support',
          text: '"Do it. Take Bulkhead. Take whoever you need. Those people are owed a walk out."',
          consequence: 'Full support. No conditions. No hesitation.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 8 },
            { type: 'flag', target: 'kolmari_shipyard_raid', value: true },
          ],
        },
        {
          id: 'drag_04_conditional',
          text: '"Free the workers. But bring me the shipyard\'s build plans. We need warships."',
          consequence: 'Conditional support. Free the workers, but bring back the plans.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'flag', target: 'kolmari_shipyard_raid', value: true },
            { type: 'flag', target: 'shipyard_plans_acquired', value: true },
          ],
        },
        {
          id: 'drag_04_not_now',
          text: '"Not yet. We\'re stretched thin. I need you here."',
          consequence: 'Deny the request. The crew needs him here.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: -5 },
            { type: 'flag', target: 'shipyard_delayed', value: true },
          ],
        },
      ],
    },
    {
      id: 'drag_04_end',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'He looks down at the seven blueprints. Runs one finger along the keel line of the nearest design. Slow. Then he stops. His brow furrows.',
        'His lips move. No sound comes out. He folds the blueprints and tucks them under one arm. Picks up Bulkhead with the other hand.',
        'At the door he pauses. Looks back at the table where the blueprints were sitting.',
        '"Don\'t tell the crew."',
        'He walks out. The floor creaks under him. It always does.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'dragghen_event_04_complete', value: true },
    { type: 'notification', value: true, notification: { type: 'crew', title: 'THE SEVEN', message: 'Dragghen disclosed seven ship blueprints and a Kolmari shipyard floor plan. Shipyard liberation request pending.' }},
  ],
};

// ==========================================
// KOVESSE GRENN - Event 04
// "Signal and Noise"
// Someone wants to buy the Grimoire.
// Kovesse doesn't want to sell.
// But the money is the kind of number
// that makes even honest people hesitate.
// ==========================================

export const kovesseEvent04: StoryScene = {
  id: 'crew_kovesse_04',
  title: 'SIGNAL AND NOISE',
  characters: ['karyudon', 'kovesse'],
  beats: [
    {
      id: 'kov_04_1',

      paragraphs: [
        'Kovesse is sitting on her workbench with her legs crossed and a piece of paper in her lap. Her tools are put away. All of them. Wrenches racked. Soldering iron cold. Pliers hung on their pegs by size order. Kovesse Grenn with her tools put away is a distress signal. It\'s a flare over dark water.',
        'She looks up when you walk in. No explosion of words. No jargon. Those sharp Rathai eyes, too big for her face, just watching you. The look she gets when a circuit is drawing power and she can\'t find where the short is.',
      ],
    },
    {
      id: 'kov_04_2',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Got an offer." Her voice is wrong. Too slow. "Big one. Sit down, this is going to be weird."',
      ],
    },
    {
      id: 'kov_04_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Weird for you or weird for normal people? Because your scale is broken, Kovesse."',
      ],
    },
    {
      id: 'kov_04_4',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Weird for everyone." She holds up the paper. Her hand is steady but her foot is bouncing against the workbench leg, tap-tap-tap-tap, fast enough to rattle the tool hooks. "Broadcaster named Devrik Sahl. Runs a network out of the Harken Straits. Commercial signals, entertainment feeds, market prices. Big audience. Bigger money." She swallows. "He wants to buy the Grimoire."',
        'She lets that sit.',
        '"Not hire me. Not license it. Buy. The whole thing. Frequencies, audience, brand, infrastructure, all of it. Two hundred sovereigns up front and a percentage of advertising revenue." She puts the paper down on the workbench. Presses it flat with her palm like she\'s holding it to the table. "Two hundred sovereigns, Captain. That\'s a warship. Six months of supplies. That\'s the gap between surviving and sinking."',
      ],
    },
    {
      id: 'kov_04_5',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"And you\'re bringing this to me because..."',
      ],
    },
    {
      id: 'kov_04_6',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Because I don\'t want to sell." Fast. Like ripping a bandage. Her foot stops bouncing and her whole body goes rigid on the workbench. "The Grimoire is mine. I built every transmitter. Wired every relay. Calibrated every frequency by hand with tools I made from scrap. It\'s the first thing I ever built that people LISTEN to. Not the Academy. Not Tannick. People." Her voice is climbing, getting faster, words piling up like she can\'t clear them fast enough. "Fishermen. Dock workers. Island kids who\'ve never heard a broadcast in their lives tuning in because what we put out MATTERS--"',
        'She catches herself. Clamps her jaw shut. Her nostrils flare. When she speaks again it\'s lower, rougher, scraped raw at the edges.',
        '"But I\'m not stupid. I know what two hundred sovereigns means for this crew. For what you\'re building." Her fingers curl into the edge of the workbench. "I built the Grimoire to serve the fleet. And if selling it serves the fleet better than keeping it--" She stops. Bites the inside of her cheek hard enough to make the muscle jump. "I need you to tell me what to do. Because I can\'t be objective about this, and I know it."',
      ],
    },
    {
      id: 'kov_04_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'kov_04_keep',
          text: '"The Grimoire isn\'t for sale. Not for two hundred. Not for two thousand. You built something people believe in, Kovesse. That\'s worth more than a warship."',
          consequence: 'Not for sale. Period.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 10 },
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'grimoire_independent', value: true },
          ],
        },
        {
          id: 'kov_04_deal',
          text: '"Two hundred sovereigns keeps people alive, Kovesse. Take the deal. You can build something new."',
          consequence: 'Take the money. Pragmatic.',
          available: true,
          effects: [
            { type: 'resource', target: 'sovereigns', value: 200 },
            { type: 'flag', target: 'grimoire_sold', value: true },
            { type: 'loyalty', target: 'kovesse', value: -3 },
          ],
        },
        {
          id: 'kov_04_important',
          text: '"Write Sahl back. Tell him the Grimoire isn\'t a product. It\'s a weapon. And we don\'t sell weapons to people who didn\'t earn them."',
          consequence: 'Reject with defiance.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 6 },
            { type: 'reputation', value: 5 },
            { type: 'flag', target: 'grimoire_defiant', value: true },
          ],
        },
      ],
    },
    {
      id: 'kov_04_end',
      paragraphs: [
        'She hops off the workbench. Her boots hit the floor. She folds the paper and puts it in her pocket. Not the tool drawer. Not the trash. Her pocket.',
        'She pulls the soldering iron off its peg. Holds it for a second without turning it on.',
        '"I need to think about the transmitter array." She\'s already looking at the workbench. Not at you. "The signal clarity on the southern relay has been garbage for a week."',
        'She plugs in the iron. It takes a moment to heat. She waits, tapping her foot, the paper still in her pocket.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'kovesse_event_04_complete', value: true },
    { type: 'notification', value: true, notification: { type: 'crew', title: 'SIGNAL AND NOISE', message: 'Devrik Sahl offered 200 sovereigns for the Grimoire network. Kovesse brought the decision to you.' }},
  ],
};

// ==========================================
// SUULEN VASSERE - Event 04
// "The Southern Channel"
// She knows a way through the reefs.
// The cost is the people who helped her
// escape. Forty years of trust, burned
// for a tactical advantage.
// ==========================================

export const suulenEvent04: StoryScene = {
  id: 'crew_suulen_04',
  title: 'THE SOUTHERN CHANNEL',
  characters: ['karyudon', 'suulen'],
  beats: [
    {
      id: 'suu_04_1',

      paragraphs: [
        'Suulen is in the map room. You didn\'t see her arrive. You never do. You turned to grab a compass and when you turned back she was there, one finger on the southern charts, still as a carved figurehead. The reefs below Vess Harbour. The reefs that have choked every southern approach you\'ve planned, costing weeks of detour every time the fleet needs to move.',
        'She\'s been looking at those charts for three days. You\'ve watched her do it. Three days of standing in the same spot, silver-blue eyes tracing the same reef line, her reflection in the chart glass not moving.',
      ],
    },
    {
      id: 'suu_04_2',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"There\'s a channel." No greeting. No transition. Words dispensed like coin from a miser\'s purse. "Through the southern reef. Not on any chart. I know it because I used it."',
      ],
    },
    {
      id: 'suu_04_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"When?"',
      ],
    },
    {
      id: 'suu_04_4',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      expression: 'grim',
      paragraphs: [
        '"When I left Kingsrun." Her finger traces the reef line. Slow. Precise. Like a surgeon marking an incision. "Forty years underground, Captain. You don\'t leave a place like that through the front door." Her finger stops. A gap. Unmarked on any chart you\'ve ever seen. "A smuggling network. Morventhi runners who mapped routes through these reefs over generations. They got me out. No questions. No payment." Her voice doesn\'t change register. It never does. But her finger presses harder into the chart. "A woman named Rhessa piloted a skiff through channels so narrow the oars scraped rock on both sides. Three days. She didn\'t sleep."',
        'Her hand goes rigid on the map. The knuckles stand out like ridge lines.',
        '"If I give you this route, the Wardensea finds it within a month. They trace the channel backwards. They find the network. Rhessa. The runners. Everyone who uses those reefs to move outside Kolmari control." The same flat register. The same measured cadence. But the tendons in her wrist are taut as anchor rope. "The people who saved my life lose theirs. The Kolmari don\'t do things quickly. They do them thoroughly."',
      ],
    },
    {
      id: 'suu_04_5',

      paragraphs: [
        'The map room was silent. Dead silent. The kind of silence that presses against your eardrums and makes you aware of your own pulse. Suulen stood at the table with eighty-seven years of living behind her, and one decision in front of her that would decide what those years added up to.',
        'Three days she\'d stared at this chart. Three days of running the math that spits out the same answer no matter how you weight the variables: someone pays.',
      ],
    },
    {
      id: 'suu_04_6',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You\'re not asking me whether to use the route. You\'re asking me to make the call so you don\'t have to carry it."',
      ],
    },
    {
      id: 'suu_04_7',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      expression: 'grim',
      paragraphs: [
        '"Yes." No flinch. No excuse. Ground-level truth, delivered the way she delivers everything: clean and final. "I\'ve lived long enough to know what people do with secrets. Eighty-seven years. This is the one I can\'t carry alone."',
      ],
    },
    {
      id: 'suu_04_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'suu_04_use_route',
          text: '"Give me the route. I\'ll use it, and I\'ll make it count. We move fast enough, we take Vess Harbour, and the Wardensea loses the south entirely. Your smugglers get warning. I\'ll see to it."',
          consequence: 'Take the route. Move fast.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 8 },
            { type: 'flag', target: 'southern_channel_known', value: true },
            { type: 'loyalty', target: 'suulen', value: -3 },
            { type: 'flag', target: 'suulen_network_burned', value: true },
          ],
        },
        {
          id: 'suu_04_find_another',
          text: '"We find another way south. I\'m not spending the people who saved you. There\'s always another route."',
          consequence: 'Refuse. Find another way.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 8 },
            { type: 'flag', target: 'southern_channel_refused', value: true },
            { type: 'flag', target: 'suulen_network_safe', value: true },
          ],
        },
        {
          id: 'suu_04_her_choice',
          text: '"This is your debt, Suulen. Your people. I trust you to make the right call."',
          consequence: 'Her debt. Her call.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 5 },
            { type: 'flag', target: 'suulen_chose_herself', value: true },
            { type: 'resource', target: 'intelligence', value: 4 },
          ],
        },
      ],
    },
    {
      id: 'suu_04_end',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'She takes her hand off the map. Steps back.',
        '"Hm." That\'s all she says. She\'s looking at you the way she looks at a route she hasn\'t taken yet. Measuring.',
        'She leaves through the door. Not the window. Not the shadow at the room\'s edge. The door, like anyone else, her footsteps audible in the corridor.',
        'You hear her stop, further down the hall. Something scrapes. She\'s adjusting the wall sconce. It was crooked. It\'s been crooked for three weeks. Nobody else noticed.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'suulen_event_04_complete', value: true },
    { type: 'notification', value: true, notification: { type: 'crew', title: 'THE SOUTHERN CHANNEL', message: 'Suulen disclosed an unmarked channel through the southern reef. Smuggler network at risk if route is used.' }},
  ],
};

// ==========================================
// TESSEK VAYNE - Event 04
// "Vayne-Style"
// He wants to register his sword style.
// Not for fame. For legacy. A kid in a
// harbor ring fifty years from now saying
// the name and knowing what it means.
// ==========================================

export const tessekEvent04: StoryScene = {
  id: 'crew_tessek_04',
  title: 'VAYNE-STYLE',
  characters: ['karyudon', 'tessek'],
  beats: [
    {
      id: 'tes_04_1',

      paragraphs: [
        'Tessek is standing at attention. Not his usual slouch-and-grin. Not the theatrical lean against the doorframe with Redtide slung over one shoulder. He\'s standing the way soldiers stand when the next words out of their mouth will cost them something. Back straight. Chin level. Hands at his sides.',
        'He\'s holding a leather folio. Worn at the corners. The binding has been re-stitched. It looks like he\'s been working on it for a very long time.',
      ],
    },
    {
      id: 'tes_04_2',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"Captain." No joke. No entrance. No Redtide flourish, no half-bow, no grin. Tessek Vayne without the performance is a sky without stars. You notice its absence before you can name it. "I have a formal request."',
      ],
    },
    {
      id: 'tes_04_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"If you\'re about to ask for a raise, the answer is you don\'t get paid."',
      ],
    },
    {
      id: 'tes_04_4',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'grim',
      paragraphs: [
        'He doesn\'t take the bait. Doesn\'t even twitch. That\'s when your stomach tightens.',
        '"Named sword styles carry weight in the Bastion Sea. Registered. Recorded. Respected. The Wardensea keeps a formal archive. Independent registrars operate out of Vess Harbour, the Harken Straits. Nobody names a style unless they\'ve proved it works." His jaw flexes. "Proved it in blood. In public. Against people trying to kill them."',
        'He opens the folio. Inside: documentation. Dense. Meticulous. Written in his own hand, and it\'s not the handwriting you\'d expect from a man who talks like a stage performer. Clean. Precise. Each letter formed with the deliberate care of someone who sat down and decided this would be the most important thing he\'d ever write.',
        '"I want to register my style. Vayne-Style. Sight Dominion channeled through a blade to read structural fault lines in armor, bone, and fighting stance." He takes a breath. Long. Slow. The breath before a duel. "I need your endorsement."',
      ],
    },
    {
      id: 'tes_04_5',

      paragraphs: [
        'The folio was thorough. Three hundred and forty pit fights in Windrow Passage, each one dated, each one annotated. Twelve confirmed combat kills under Karyudon\'s flag, with witnesses named. Technical breakdowns of his core techniques, illustrated with diagrams showing the Sight Dominion overlay on a blade\'s edge. Ink cross-sections of armor plate with fault lines mapped in red. At the back, a single page dedicated to Red Line: Genesis. The technique from his last event. The one nobody had ever seen before.',
        'At the bottom of the last page: "Requires captain\'s endorsement for formal registration."',
        'He needs your signature. That\'s what the folio is. That\'s what this whole moment is.',
      ],
    },
    {
      id: 'tes_04_6',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You flip through the pages. Slow. "Three hundred and forty pit fights."',
      ],
    },
    {
      id: 'tes_04_7',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'fear',
      paragraphs: [
        '"Started when I was sixteen." He\'s watching you read. His eyes track every page turn. And his hands -- his hands are trembling. Tessek Vayne, who draws Redtide in combat without a flicker, who can find a fault line in plate armor at a glance, whose fingers are the steadiest you\'ve ever seen on a swordsman. Shaking. The folio pages vibrate where he\'s holding the edge.',
      ],
    },
    {
      id: 'tes_04_7b',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"Heh." He catches the tremor. Looks at his own hand like it betrayed him. Doesn\'t hide it. Can\'t.',
      ],
    },
    {
      id: 'tes_04_7c',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"This isn\'t about fame, Captain. I\'ve had attention. Attention fades." His voice drops. The showmanship peels away like old paint, and underneath it is just a man holding a leather folder full of his life\'s work. "This is about legacy. A kid in a harbor ring fifty years from now. Broken knuckles. Blunt sword. No money, no teacher, no name." He swallows. "Saying \'Vayne-Style.\' And knowing what it means. Knowing somebody built something with a blade that wasn\'t just about cutting people down."',
      ],
    },
    {
      id: 'tes_04_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'tes_04_sign_immediately',
          text: '"Give me the pen."',
          consequence: 'Sign it. No hesitation. Four words.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 8 },
            { type: 'flag', target: 'vayne_style_registered', value: true },
          ],
        },
        {
          id: 'tes_04_add_note',
          text: '"I\'m adding a line. \'Endorsed by the future ruler of the Bastion Sea.\' Might as well make it count."',
          consequence: 'Sign it with flair. Add your own endorsement.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 5 },
            { type: 'flag', target: 'vayne_style_registered', value: true },
          ],
        },
        {
          id: 'tes_04_ask_garroden',
          text: '"Would Garroden approve?"',
          consequence: 'Invoke Garroden.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 4 },
            { type: 'flag', target: 'vayne_style_registered', value: true },
          ],
        },
      ],
    },
    {
      id: 'tes_04_end',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'satisfaction',
      paragraphs: [
        'He takes the signed folio. Both hands. Holds it the way you\'d hold a newborn. The leather creaks under his grip. His jaw is tight and his eyes are too bright and his chest rises once, slow, the deep pull of a man trying to keep his composure by brute force.',
        '"You know what Garroden would say right now?"',
      ],
    },
    {
      id: 'tes_04_end2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"What?"',
      ],
    },
    {
      id: 'tes_04_end3',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'happy',
      paragraphs: [
        '"Nothing. Because for once, I got there first."',
        'He sheathes Redtide. Tucks the folio under his arm, against his ribs. Walks out. In the corridor, he starts whistling. Off-key. He doesn\'t correct it.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'tessek_event_04_complete', value: true },
    { type: 'notification', value: true, notification: { type: 'crew', title: 'VAYNE-STYLE', message: 'Tessek requested captain\'s endorsement for formal sword style registration. Folio submitted.' }},
  ],
};

// ==========================================
// ORREN - Event 04
// "Full Output"
// He's been holding at 40% since the day
// he joined. Today, 40% isn't enough.
// Today, the crew finds out what 100% looks
// like. So does Orren.
// ==========================================

export const orrenEvent04: StoryScene = {
  id: 'crew_orren_04',
  title: 'FULL OUTPUT',
  characters: ['karyudon', 'orren', 'dragghen', 'kovesse'],
  beats: [
    {
      id: 'orr_04_1',
      effect: 'shake',
      sfx: 'combat_heavy',
      paragraphs: [
        'The dock is coming apart. Not slowly. Support struts buckling, crossbeams splitting, the eastern pier shearing off in sections under sustained fire from a Wardensea raiding party that hit the harbor at dawn. Karyudon is fighting three marines at the waterline, boots sliding on wet planking. Tessek is cut off on the far side of the wreckage, Redtide catching smoke-light in short, vicious arcs. Dragghen has Bulkhead planted between three wounded crew and a section of wall that\'s folding inward, both arms locked, ninety pounds of iron holding back several tons of splintering timber. His boots are gouging trenches in the dock.',
        'Vorreth went down thirty seconds ago, stunned by a concussion charge that caught him mid-stride. He dropped like a slaughtered ox. Breathing. Not moving.',
        'The crew is losing.',
      ],
    },
    {
      id: 'orr_04_2',

      paragraphs: [
        'Orren is at the back. Where he always is. Holding at forty percent, sending controlled bursts of lightning into the enemy line. Precise. Measured. Nowhere near enough. His ears are crushed flat against his skull. Grey fur standing straight up, every strand. He can see the math. Can see Dragghen\'s arms juddering under the wall. Can see Karyudon taking hits that shouldn\'t be landing. Can see the shape of the next thirty seconds, and what it looks like is a grave.',
        'Forty percent isn\'t going to hold the line.',
      ],
    },
    {
      id: 'orr_04_3',

      paragraphs: [
        'Orren steps forward. Both ears pin flat. His hands are shaking. Static crawls up his forearms in blue-white threads. But his voice, when it comes, is steady. Low and level.',
      ],
    },
    {
      id: 'orr_04_4',
      speaker: 'orren',
      speakerName: 'Orren Dael',
      expression: 'grim',
      paragraphs: [
        '"Everyone get behind Dragghen."',
      ],
    },
    {
      id: 'orr_04_5',
      speaker: 'orren',
      speakerName: 'Orren Dael',
      paragraphs: [
        'The crew moves. Something in the way he said it, not volume, not authority, just certainty, makes people listen. They pull back behind Bulkhead. Dragghen braces. Digs in. He doesn\'t ask what\'s coming. He\'s a Gorundai with a shield and a man he trusts just told him to brace. That\'s enough.',
        'Orren plants his feet. His fur lifts off his skin, every strand vertical. The air shifts. Temperature drops five degrees in a heartbeat. Static charge builds until the metal fittings on the dock start whining, high and thin, and the compass mounted on the nearest piling spins once and stops dead.',
        'He looks at the compass. "Sorry about that."',
      ],
    },
    {
      id: 'orr_04_6',
      effect: 'explosion',
      sfx: 'combat_explosion',
      paragraphs: [
        'Full output.',
        'The lightning doesn\'t arc. It POURS. A sustained white-blue discharge from both hands that turns the air into burning glass. It doesn\'t strike one target. It strikes every target. Every enemy in a thirty-foot radius catches the full force of a Rathai lightning wielder who spent months with the valve shut and just ripped it open. The dock planking cracks down the grain. Metal fittings warp and run. Compass needles fuse to their housings. For three seconds the harbor looks like the inside of a thunderhead, everything bleached to blue-white, shadows burned flat, the air itself screaming.',
        'Then silence.',
        'Every enemy Orren hit is down. Smoking. Twitching. Done. Everyone behind Bulkhead is fine. Dragghen grounded the residual charge through the shield, and his hair is standing straight up off his scalp like a hedgehog, but he\'s standing. He\'s always standing.',
        'Orren stands in the aftermath. Chest heaving. Smoke curling off his fur. His ears peel up from flat against his skull, slow, shaking, until they\'re fully perked. He stares at his own hands. Turns them over. Then looks at Karyudon.',
      ],
    },
    {
      id: 'orr_04_7',
      speaker: 'orren',
      speakerName: 'Orren Dael',
      expression: 'happy',
      paragraphs: [
        '"I didn\'t lose it."',
        'He\'s smiling. Not the nervous one. His ears are straight up and his hands are still sparking at the fingertips and he doesn\'t seem to care.',
      ],
    },
    {
      id: 'orr_04_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'orr_04_beautiful',
          text: '"You beautiful, terrifying, furry bastard."',
          consequence: 'Raw praise. Affectionate. Unfiltered.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 8 },
            { type: 'flag', target: 'orren_full_output_achieved', value: true },
          ],
        },
        {
          id: 'orr_04_lead',
          text: '"You held back for months. Next time, lead with that."',
          consequence: 'Push him. Stop holding back.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 5 },
            { type: 'flag', target: 'orren_full_output_achieved', value: true },
          ],
        },
        {
          id: 'orr_04_dragghen_rate',
          text: '"Rate that, Dragghen."',
          consequence: 'Put it to Dragghen.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 6 },
            { type: 'loyalty', target: 'dragghen', value: 2 },
            { type: 'flag', target: 'orren_full_output_achieved', value: true },
          ],
        },
      ],
    },
    {
      id: 'orr_04_end',

      paragraphs: [
        'The dock smells like ozone and scorched timber and something sharp and electric that\'ll cling to clothes for days. The crew picks themselves up. Vorreth groans back to consciousness, opens one eye, surveys the blast radius, closes the eye, and goes back to sleep. Tessek climbs over the wreckage, Redtide still drawn, takes one look at the devastation, and says nothing. Tessek Vayne, struck silent. There\'s your review.',
      ],
    },
    {
      id: 'orr_04_end2',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse is already scribbling into a Grimoire notepad, talking at twice her normal speed, which is already twice anything a sane person could follow. "Output duration: three-point-two seconds. Area of effect: roughly thirty feet. Residual charge dissipation: consistent with mid-Tempered lightning expression. Ear position at moment of discharge--" She squints at him. Licks her pencil. "--position fourteen, sub-variant B, which I\'m classifying as \'terrified but committed.\'"',
      ],
    },
    {
      id: 'orr_04_end3',
      speaker: 'orren',
      speakerName: 'Orren Dael',
      expression: 'angry',
      paragraphs: [
        '"STOP CATALOGUING MY EARS."',
      ],
    },
    {
      id: 'orr_04_end4',

      paragraphs: [
        'His ears are perked straight up. Position one. Textbook. Kovesse is already writing it down. Her pencil hasn\'t stopped moving.',
      ],
    },
    {
      id: 'orr_04_end5',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'satisfaction',
      paragraphs: [
        '"Mm. Fourteen is his best angle."',
      ],
    },
    {
      id: 'orr_04_end6',

      paragraphs: [
        'Orren buries his face in both hands. His ears, despite everything, despite the lightning and the war and the smoking wreckage and his so-called friends, stay perked.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'orren_event_04_complete', value: true },
    { type: 'notification', value: true, notification: { type: 'crew', title: 'FULL OUTPUT', message: 'Orren discharged at full capacity during harbor defense. Dock infrastructure damaged. All compasses in blast radius non-functional.' }},
  ],
};

// ==========================================
// VORRETH - Event 04
// "The Eighteenth Name"
// He's been tracking them for two years.
// A crew member from the Daaz Accord,
// imprisoned in a Wardensea facility.
// This isn't a request.
// ==========================================

export const vorrethEvent04: StoryScene = {
  id: 'crew_vorreth_04',
  title: 'THE EIGHTEENTH NAME',
  characters: ['karyudon', 'vorreth'],
  beats: [
    {
      id: 'vor_04_1',

      paragraphs: [
        'Vorreth is awake.',
        'That sentence alone should set off every alarm on the ship. Vorreth at the war table during operational hours is unusual. Vorreth at the war table with both eyes open, spine straight, and no trace of drowsiness is a crisis on the level of hull breach or sea monster. It is the signal that something has gone deeply wrong, or deeply right.',
        'He\'s standing. Not propped against a wall. Not folded into a corner with his chin on his chest. Standing upright, both hands flat on the table, looking down at a single piece of paper with the focus of a man who has been saving his energy for exactly this.',
      ],
    },
    {
      id: 'vor_04_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You\'re awake." You say it the way you\'d say the ocean is on fire. Factual. Braced.',
      ],
    },
    {
      id: 'vor_04_3',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Sit down."',
        'Two words. No preamble. No buffer. Vorreth spends his energy the way other people spend gold, and right now he\'s spending every coin on being present.',
      ],
    },
    {
      id: 'vor_04_4',

      paragraphs: [
        'He slides the paper across the table. A woman\'s name. A location. Written in his hand, and the handwriting is steady. Too steady. The letters formed with the deliberate pressure of a man who practiced this before you arrived. Below the name, a number: eighteen. The eighteenth name on a list he\'s been keeping since before he set foot on this ship.',
        'The location is a Wardensea detention facility on a small island in the southern chain. Remote. Lightly garrisoned. Within striking distance of territory Karyudon already holds.',
      ],
    },
    {
      id: 'vor_04_5',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Daaz Accord. Former crew. Captured two years ago during the southern collapse. The Wardensea transferred her to this facility six months later." His voice is a low rumble, unhurried, but there\'s no pause between sentences. No drift. No lull. He is, for once, completely here. "I\'ve been tracking the transfers since."',
        'He looks at you. Both eyes. Open. Clear.',
        '"This isn\'t a request."',
      ],
    },
    {
      id: 'vor_04_6',

      paragraphs: [
        'The paper sits between you on the war table. A name and a number. Vorreth is pushing, not advising. His hand stays on the page.',
      ],
    },
    {
      id: 'vor_04_7',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Add it to the route. Next time we sail south, we take that facility." No anger. Past anger. This is the calm on the other side of it, where fury has been compressed into something dense and immovable. "Garrison of twelve. Three-week rotation. Nine prisoners total. One approach by sea, one by a ridge trail on the eastern face. I have both mapped."',
        'He pauses. Straightens the map with both hands, aligning it to the table edge with unnecessary precision.',
        '"She bought me two hours, Karyudon." Lower now. The rumble dropping into a register you\'ve never heard from him. "During the Accord collapse. Greywater Dock. The Wardensea was boarding. I got the remaining crew to the boats. She stayed." His hands press harder into the table. The wood creaks. "Held the line at Greywater alone for two hours against a boarding party. Two hours." His nostrils flare. "I owe her two years."',
      ],
    },
    {
      id: 'vor_04_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'vor_04_immediate',
          text: '"Done. We sail in three days."',
          consequence: 'Immediate. No conditions.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 8 },
            { type: 'flag', target: 'eighteenth_name_mission', value: true },
          ],
        },
        {
          id: 'vor_04_planned',
          text: '"We\'ll do it, but we need a plan. Sit down. Let\'s map it."',
          consequence: 'Agree, but plan it properly.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'flag', target: 'eighteenth_name_planned', value: true },
          ],
        },
        {
          id: 'vor_04_why',
          text: '"You\'ve never pushed like this before. Tell me why this name."',
          consequence: 'Ask why this name.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 4 },
            { type: 'flag', target: 'vorreth_debt_revealed', value: true },
          ],
        },
      ],
    },
    {
      id: 'vor_04_end',

      paragraphs: [
        'He nods. Once. The conversation is over. The decision is made.',
        'Then his eyes close. His chin drops. His breathing evens out in three seconds flat.',
        'Vorreth falls asleep. Standing up. At the war table. His hands are still flat on the surface. His posture doesn\'t shift an inch. He simply stops being awake the way a lantern stops being lit. One state to the next. No transition. No warning.',
        'The snoring starts before you\'ve finished standing up.',
      ],
    },
    {
      id: 'vor_04_end2',

      paragraphs: [
        'You stare at him. The paper with the eighteenth name sits on the table between his massive hands. The war room is quiet except for the deep, rhythmic sound of a man who just delivered the most intense speech of his entire career and then fell asleep standing up at the table where he delivered it.',
      ],
    },
    {
      id: 'vor_04_end3',

      paragraphs: [
        'Tessek walks in. Stops in the doorway. Takes in the scene: Vorreth unconscious and vertical at the war table, you sitting across from him, the paper between his hands, the silence.',
      ],
    },
    {
      id: 'vor_04_end4',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"Oi. Did he just..."',
      ],
    },
    {
      id: 'vor_04_end5',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Yes."',
      ],
    },
    {
      id: 'vor_04_end6',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"During a war planning session."',
      ],
    },
    {
      id: 'vor_04_end7',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Yes."',
      ],
    },
    {
      id: 'vor_04_end8',

      paragraphs: [
        'Tessek considers this. He tilts his head. Folds his arms. Gives it three full seconds of the gravity he normally reserves for naming blade techniques.',
      ],
    },
    {
      id: 'vor_04_end9',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"Heh. Tactical Slumber: War Table Variant."',
      ],
    },
    {
      id: 'vor_04_end10',

      paragraphs: [
        'Karyudon throws a boot at him. Tessek catches it. Redtide doesn\'t even move. Vorreth doesn\'t wake up. The snoring deepens.',
        'The eighteenth name stays on the table. Waiting.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'vorreth_event_04_complete', value: true },
    { type: 'notification', value: true, notification: { type: 'crew', title: 'THE EIGHTEENTH NAME', message: 'Vorreth identified a Wardensea detention facility holding a former Daaz Accord crew member. Extraction mission proposed.' }},
  ],
};
