import { StoryScene } from '../../types/game';

export const act2BeginScene: StoryScene = {
  id: 'act2_begin',
  title: 'ACT 2 - THE RESPONSE',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
  beats: [
    {
      id: 'act2_begin_01',
      title: 'THE WORLD NOTICED',
      effect: 'flash',
      paragraphs: [
        'Delvessa\'s maps have taken over the chart room. Blue ink for trade routes. Red for Wardensea patrols. Black for Kolmari credit lines, most of them crossed out with a single stroke. Six islands\' worth of problems pinned to every wall.',
        'Your crew is already seated when you arrive. Nobody is talking. Dragghen has brought coffee and nobody is drinking it.',
      ],
      characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
    },
    {
      id: 'act2_begin_02',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        'Delvessa has dark circles under her eyes. She hasn\'t slept. You can tell because she\'s wearing the same ink-stained shirt from yesterday and her hair is pulled back with what appears to be a piece of rope.',
        '"Wardensea." She taps the map hard enough to dent the paper. "Doubled patrols across the northern arc. Vasshen has recalled two destroyer groups from deep water. That\'s not a drill. That\'s preparation."',
        'She drags her finger south. Stops at the trade routes. Red ink.',
        '"Kolmari. Seventeen formal complaints to the Trade Authority. Every route that touches our waters is bleeding them money. They\'ve flagged all of our accounts as hostile." She crosses out a number in her ledger, harder than necessary. "Every merchant we\'ve been working with just lost their credit lines. That hits tomorrow."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'act2_begin_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      expression: 'happy',
      paragraphs: [
        'Kovesse hasn\'t stopped grinning since she walked in. She slides her Grimoire tablet across the table face-up, screen blazing with numbers.',
        '"Eight hundred percent. Your name. Twenty-four hours." She\'s talking too fast. She doesn\'t care. "Six years I\'ve been doing this, Captain, and I have NEVER seen a topic hold that kind of heat. You broke the algorithm. The algorithm doesn\'t break."',
        'She snatches the tablet back, already scrolling.',
        '"Three months ago you were a name nobody knew. Now you\'re all anybody\'s talking about. The bars, the docks, the trade halls. There\'s a question hanging over the whole Bastion Sea and it\'s got your face on it: what the hell is he building?"',
      ],
      characters: ['karyudon', 'kovesse'],
    },
    {
      id: 'act2_begin_04',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth has been standing by the window with his arms crossed. He doesn\'t sit. Hasn\'t sat the entire briefing.',
        '"Vasshen doesn\'t hunt. She exterminates." He says it flat. No drama. The way you say things you know from experience. "Three years I served under her. Probe, provoke, overwhelm. Every time. She\'ll test us inside two weeks. If we look weak, the full fleet comes inside a month."',
        'He finally turns from the window. Meets your eyes.',
        '"She\'s already decided what kind of war she\'s fighting. We need to catch up."',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'act2_begin_05',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen has been eating bread and listening. He tears off another piece, chews, swallows. Then he puts the loaf down.',
        '"Can I ask something?"',
        'Everyone looks at him. Dragghen doesn\'t interrupt.',
        '"All this." He gestures at the maps, the tablet, the military notes. "Patrols and credit lines and fleet movements. I get it. It\'s important. But none of you have said the word yet and somebody needs to."',
        'He leans forward. His hands are flat on the table, scarred from decades in the copper mines.',
        '"What are we FOR? Because right now we\'re just taking. And taking is what the Kolmari do. Taking is what the Wardensea does. If that\'s all this is, I need to know. Because I left one empire already and I\'m too old to build another one just like it."',
        'Nobody answers immediately.',
      ],
      characters: ['karyudon', 'dragghen'],
    },
    {
      id: 'act2_begin_06',
      paragraphs: [
        'You stand. The chart room shrinks around you. Your horns scrape a lantern and it swings, throwing shadows across the maps.',
        'Three ways to answer Dragghen\'s question. Three ways to show the Bastion Sea what you\'re building.',
      ],
      characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
      choices: [
        {
          id: 'act2_priority_military',
          text: '"We prepare for war. Iron first."',
          consequence: 'Iron first. Prepare for war.',
          available: true,
          effects: [
            { type: 'flag', target: 'act2_priority', value: 'military' },
            { type: 'dominion', target: 'iron', value: 30 },
            { type: 'infamy', value: 5 },
            { type: 'resource', target: 'materials', value: 20 },
          ],
        },
        {
          id: 'act2_priority_intelligence',
          text: '"We need to see everything before they move."',
          consequence: 'Eyes everywhere. Know before they move.',
          available: true,
          effects: [
            { type: 'flag', target: 'act2_priority', value: 'intelligence' },
            { type: 'dominion', target: 'sight', value: 30 },
            { type: 'resource', target: 'intelligence', value: 20 },
          ],
        },
        {
          id: 'act2_priority_legitimacy',
          text: '"We build something worth defending."',
          consequence: 'Build something worth defending.',
          available: true,
          effects: [
            { type: 'flag', target: 'act2_priority', value: 'legitimacy' },
            { type: 'dominion', target: 'king', value: 30 },
            { type: 'reputation', value: 10 },
            { type: 'resource', target: 'sovereigns', value: 300 },
          ],
        },
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'act2_begun', value: true },
    { type: 'resource', target: 'sovereigns', value: 200 },
    { type: 'resource', target: 'supplies', value: 20 },
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 2: THE ADMIRAL'S MESSAGE
// =============================================
// Wardensea ultimatum delivered by courier.
// Player must respond.
// =============================================

export const act2UltimatumScene: StoryScene = {
  id: 'act2_ultimatum',
  title: 'THE ADMIRAL\'S MESSAGE',
  characters: ['karyudon', 'delvessa', 'vorreth', 'kovesse'],
  beats: [
    {
      id: 'ultimatum_01',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'The courier ship enters Tavven Shoal\'s harbor at dawn. A single Wardensea cutter, white flag on the mast. No escort. No weapons visible. One officer on deck, standing at attention in regulation blues.',
        'Vorreth watches from the watchtower. He hasn\'t blinked.',
        '"Diplomatic protocol. They\'re using diplomatic protocol. That means whatever they\'re carrying has a seal on it."',
      ],
    },
    {
      id: 'ultimatum_02',
      speaker: 'courier',
      speakerName: 'Wardensea Courier',
      paragraphs: [
        'The officer is young. Too young for what he\'s carrying. He climbs the dock ladder, salutes nobody in particular, and produces a sealed scroll from a leather case.',
        'The seal is black wax pressed with a ship\'s anchor over crossed cannons. Southern Fleet Command.',
        'He holds it out. His hands do not shake. His voice does.',
        '"For the entity known as Karyudon. From Admiral Vasshen, Commander of the Wardensea Southern Fleet. To be read in the presence of witnesses."',
      ],
    },
    {
      id: 'ultimatum_03',
      paragraphs: [
        'You take the scroll. Break the seal. The handwriting inside is precise, angular, written by someone who treats words like ammunition.',
        'The ultimatum is short. Fourteen days to surrender all territories and submit to Wardensea custody. Failure to comply will result in deployment of the First Division: sixty warships, eight thousand personnel, full authorization for lethal engagement.',
        'At the bottom, in smaller script: "I do not make offers twice. Consider this a courtesy extended to an adversary I have not yet had occasion to destroy."',
        'Signed: Admiral Vasshen. Commandant, Vess Harbour.',
      ],
      effect: 'shake',
      sfx: 'combat_cinematic_boom',
    },
    {
      id: 'ultimatum_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa reads over your shoulder. You feel her go still.',
        '"Sixty warships." Her voice is quiet, carefully controlled. "That\'s most of the southern fleet. She\'d have to strip Vess Harbour bare to field that many."',
        'She takes the scroll from you. Reads it again. Her thumb runs along the bottom line, the part about not making offers twice.',
        '"She\'s not bluffing. Vasshen doesn\'t bluff. But sixty ships in fourteen days is fast. Too fast. Somebody\'s pushing her."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'ultimatum_05',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth takes the scroll from Delvessa. Reads it twice. On the second pass, his lips move. Counting ships. Counting days.',
        '"I know this woman." He folds the scroll carefully, like he\'s handling something that used to be his. "She doesn\'t write ultimatums. She writes death sentences and calls them courtesy. But fourteen days..." He shakes his head. "Fourteen days is wrong. She likes thirty. Fourteen means someone\'s leaning on her."',
        'He taps the scroll against his palm.',
        '"That\'s the crack. Full mobilization burns through supplies in three weeks. Force her to commit early and she either overextends or pulls back. Neither option lets her sleep at night."',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'ultimatum_06',
      paragraphs: [
        'The courier is still standing on the dock. Waiting for a response. Protocol demands one.',
        'Kovesse has her tablet ready. One tap and whatever you say goes to thirty thousand Grimoire feeds.',
        'How you respond defines the next chapter.',
      ],
      characters: ['karyudon', 'delvessa', 'vorreth', 'kovesse'],
      choices: [
        {
          id: 'ultimatum_reject_public',
          text: '"Broadcast my response. Every channel. Every feed."',
          consequence: 'Defiance. Public. Loud.',
          available: true,
          effects: [
            { type: 'infamy', value: 15 },
            { type: 'reputation', value: 5 },
            { type: 'bounty', value: 20000000 },
            { type: 'flag', target: 'ultimatum_response', value: 'public_rejection' },
          ],
        },
        {
          id: 'ultimatum_reject_private',
          text: '"Send the courier back with a sealed reply. Eyes only."',
          consequence: 'Private. Controlled. No theater.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'flag', target: 'ultimatum_response', value: 'private_rejection' },
          ],
        },
        {
          id: 'ultimatum_stall',
          text: '"Tell her I\'m considering her terms. Buy us time."',
          consequence: 'Stall. Buy time.',
          available: true,
          effects: [
            { type: 'reputation', value: -5 },
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'flag', target: 'ultimatum_response', value: 'stalled' },
          ],
        },
      ],
    },
    {
      id: 'ultimatum_07',
      paragraphs: [
        'The courier takes your response. He salutes, habit, not respect, and descends the ladder. The cutter pulls out of Tavven Shoal\'s harbor within the hour.',
        'The white flag stays up until it clears the channel. Then it comes down. The Wardensea standard goes up.',
        'The message is clear. The courtesy period is over.',
      ],
    },
    {
      id: 'ultimatum_08',
      paragraphs: [
        'You stand on the dock and watch the cutter disappear. The harbour smells like fish and rope tar.',
        'Fourteen days. You scratch the number into the dock railing with a nail. Delvessa will want it on the board by noon.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'ultimatum_answered', value: true },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA ULTIMATUM - RESPONSE DELIVERED',
      message: 'Your response to Admiral Vasshen has been sent. The fourteen-day clock is ticking. The Wardensea will move. The question is when and how hard.',
    }},
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 3: THE SIXTH SEAT
// =============================================
// Tessavarra makes contact. Conqueror alliance offer.
// =============================================

export const act2ConquerorScene: StoryScene = {
  id: 'act2_conqueror_contact',
  title: 'THE SIXTH SEAT',
  characters: ['karyudon', 'tessavarra', 'delvessa', 'suulen'],
  beats: [
    {
      id: 'conqueror_01',
      paragraphs: [
        'She comes at night. No running lights, no flags, no announcement. An unmarked sloop slides into the shadow channel east of Tavven Shoal and drops anchor in water too shallow for Wardensea hulls.',
        'Suulen is already on the dock when you arrive. That means she knew Tessavarra was coming. That means she did not tell you.',
        'You file that away.',
      ],
    },
    {
      id: 'conqueror_02',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        'The woman who steps off the sloop is Kolmari-blood. Tall, angular, wearing sailor\'s canvas over something expensive. Her hands are callused and her eyes are the kind that have watched people drown.',
        '"Tessavarra. Ghostlight Collective. I run the fishing networks, the information relays, and the smuggling routes between the Southern Reach and the Central Belt."',
        'She does not offer her hand.',
        '"I am a Conqueror. I hold the Fourth Seat. And I am here because the Seats have been watching you for three months."',
      ],
      characters: ['karyudon', 'tessavarra'],
    },
    {
      id: 'conqueror_03',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"The Grimoire calls us pirates." She laughs. It\'s a short, hard sound, like a stone hitting wood. "We\'re not pirates. We\'re the people who said no. No to the Wardensea, no to the Kolmari, no to the whole rotting system. And we built something that works in spite of all of them."',
        'She paces, restless, a woman who spent her life on decks that moved and doesn\'t know what to do with a floor that stays still.',
        '"Five Seats. Five captains. We don\'t answer to each other, we don\'t fight each other, and the only rule that matters is this: the Wardensea is the enemy. Everything else, we figure out."',
      ],
      characters: ['karyudon', 'tessavarra'],
    },
    {
      id: 'conqueror_03b',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"There\'s been a sixth chair sitting empty for two years. Captain Drest went down in the Windrow Strait and nobody\'s been worth replacing him."',
        'She stops pacing. Faces you. Her good eye locks onto yours.',
        '"Three months. You took the Central Belt in three months. Drest couldn\'t do it in ten years. The Seats want to know if you\'re interested. I want to know if you\'re worth it."',
      ],
      characters: ['karyudon', 'tessavarra'],
    },
    {
      id: 'conqueror_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'angry',
      paragraphs: [
        'Delvessa steps between you and Tessavarra. Her arms fold across her chest. When she speaks, her voice could freeze salt water.',
        '"The blood contract." She doesn\'t ask. She\'s read it. Of course she\'s read it. "Mutual defense clause. Attack on one is an attack on all. And if you break it, the other five Seats hunt you down."',
        'She turns to Tessavarra. There\'s something personal in the way she says the next part.',
        '"I already walked away from one organization that kept people loyal through fear. I\'m not eager to sign up for another."',
      ],
      characters: ['karyudon', 'delvessa', 'tessavarra'],
    },
    {
      id: 'conqueror_05',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      expression: 'grim',
      paragraphs: [
        'Suulen\'s voice comes from somewhere near the dock pilings. She hasn\'t moved. You\'d forgotten she was there.',
        '"The contract is real. So is their network." Her silver-blue eyes catch the dock lanterns. "Five captains, dozens of ships, informants in every port between here and the Kingsrun. That kind of intelligence is worth bleeding for."',
        'A pause. When she speaks again, it\'s softer. Almost guilty.',
        '"I\'ve been using their channels for six weeks. Tessavarra\'s channels. That\'s how I knew she was coming tonight." She doesn\'t look at you. "I should have told you. I didn\'t. I wanted to hear what she\'d say when she thought I hadn\'t warned you."',
      ],
      characters: ['karyudon', 'suulen'],
    },
    {
      id: 'conqueror_06',
      paragraphs: [
        'Tessavarra waits. Arms at her sides, chin up, the posture of a woman who has made this pitch before and knows the answer doesn\'t come fast.',
      ],
      characters: ['karyudon', 'tessavarra', 'delvessa', 'suulen'],
      choices: [
        {
          id: 'conqueror_accept',
          text: '"I\'ll take the Sixth Seat."',
          consequence: 'Take the Seat. Join.',
          available: true,
          effects: [
            { type: 'flag', target: 'conqueror_alliance', value: 'allied' },
            { type: 'reputation', value: -10 },
            { type: 'resource', target: 'intelligence', value: 15 },
            { type: 'loyalty', target: 'delvessa', value: -8 },
            { type: 'loyalty', target: 'suulen', value: 10 },
          ],
        },
        {
          id: 'conqueror_reject',
          text: '"I don\'t sit in other people\'s chairs."',
          consequence: 'Stand alone. Answer to no one.',
          available: true,
          effects: [
            { type: 'flag', target: 'conqueror_alliance', value: 'rejected' },
            { type: 'reputation', value: 5 },
            { type: 'loyalty', target: 'delvessa', value: 5 },
            { type: 'loyalty', target: 'suulen', value: -5 },
          ],
        },
        {
          id: 'conqueror_delay',
          text: '"Not yet. But keep the channel open."',
          consequence: 'Not yet. Keep the door open.',
          available: true,
          effects: [
            { type: 'flag', target: 'conqueror_alliance', value: 'pending' },
            { type: 'resource', target: 'intelligence', value: 5 },
          ],
        },
      ],
    },
    {
      id: 'conqueror_07',
      paragraphs: [
        'Tessavarra studies you for a moment. Whatever calculation she\'s running finishes behind her good eye.',
        '"You know where to find me. Ghostlight Reef. The channel is always open, for now."',
        'She steps back onto her sloop. No ceremony. No handshake. The boat slides out of the shadow channel and vanishes into the dark water like it was never there.',
        'Suulen watches her go. She stays on the dock for a long time after the sloop vanishes.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'conqueror_contacted', value: true },
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 4: STRANGLED LANES
// =============================================
// Kolmari trade blockade. Three approaches.
// =============================================

export const act2BlockadeScene: StoryScene = {
  id: 'act2_blockade',
  title: 'STRANGLED LANES',
  characters: ['karyudon', 'delvessa', 'suulen', 'kovesse'],
  beats: [
    {
      id: 'blockade_01',
      paragraphs: [
        'The first sign is absence. Three supply ships that should have arrived at Coppervein don\'t. Two grain barges destined for Mossbreak turn back at the channel entrance. A fuel shipment to Sorrens Flat is rerouted to Durrek Garrison.',
        'By the third day, the pattern is unmistakable. The Kolmari Confederation has imposed a full trade blockade on every island you control.',
      ],
    },
    {
      id: 'blockade_02',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        'Delvessa drops a ledger on the table. It hits with a sound like a verdict.',
        '"Eighteen days." She doesn\'t sit down. "That\'s what we have. Eighteen days of supplies at full consumption. If something goes wrong on any island, twelve."',
        'She opens the ledger and runs her finger down a column of numbers, each one crossed out in red.',
        '"They\'re strangling three routes: Coppervein minerals, Sorrens trade, Mirrorwater fish. They don\'t need to starve us. They just need to make every island cost more than it earns." Her pen stops on a number. Stays there. "It\'s not a blockade. It\'s an invoice. And the Kolmari have been writing these for centuries."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'blockade_03',
      paragraphs: [
        'Prices spike at Tavven Shoal. Hella\'s stall runs out of storm tea by midday. The copper traders at Coppervein are sitting on product they can\'t ship. Mossbreak\'s harvest rots in the warehouses.',
        'The islands you fought to take are starting to feel the cost of belonging to you.',
      ],
    },
    {
      id: 'blockade_04',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      expression: 'grim',
      paragraphs: [
        'Kovesse is chewing her thumbnail.',
        '"It\'s splitting. Half the feeds are saying we bit off more than we can chew and the Kolmari are just doing business. The other half are screaming that this proves the trade cartels run everything and somebody finally had the guts to fight back."',
        'She pulls her thumb from her teeth and points at you with it.',
        '"Right now, both stories are true. Whichever one wins depends on what we do next. Give me something to broadcast and I\'ll make sure it\'s our version. But I can\'t spin a blockade into a victory if we\'re sitting here starving."',
      ],
      characters: ['karyudon', 'kovesse'],
    },
    {
      id: 'blockade_06',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"We hit a convoy." Delvessa is pacing. She does that when the numbers are ugly. "Seize the cargo. Dare the Kolmari to send another one through our waters. Fast, loud, and the Wardensea uses it as an excuse to come faster."',
        'She stops pacing. Picks up a different chart.',
        '"Or. There\'s a Kolmari factor named Drezh on Anvil Cay. Runs a shadow market. He\'s been selling to both sides since before we got here. If we cut a private deal with him, we go around the blockade entirely. Costs money. Buys us time."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'blockade_07',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen unfolds a chart that none of you have seen before. It\'s hand-drawn, ink still fresh, and it shows a web of lines running beneath the islands like veins under skin.',
        '"Third option. The tunnels." She smooths the chart flat. "Smuggler routes. Abandoned mineshafts. Underwater caves that connect half the Central Belt under the waterline. The Kolmari don\'t know they exist. I\'ve been mapping them for three weeks."',
        'She taps a junction point between Coppervein and Sorrens.',
        '"Capacity is thin. Fifteen, twenty percent of normal volume. But you can\'t blockade something you can\'t find."',
      ],
      characters: ['karyudon', 'suulen'],
    },
    {
      id: 'blockade_08',
      paragraphs: [
        'Three paths through. Each one costs something different.',
      ],
      characters: ['karyudon', 'delvessa', 'suulen', 'kovesse'],
      choices: [
        {
          id: 'blockade_force',
          text: '"We hit the next convoy. Hard."',
          consequence: 'Break it open. Force.',
          available: true,
          effects: [
            { type: 'flag', target: 'blockade_approach', value: 'force' },
            { type: 'resource', target: 'supplies', value: 30 },
            { type: 'infamy', value: 10 },
            { type: 'bounty', value: 10000000 },
            { type: 'combat', target: 'wardensea_first_strike', value: true },
          ],
        },
        {
          id: 'blockade_negotiate',
          text: '"Find this factor. Make a deal."',
          consequence: 'Go around them. Pay the price.',
          available: true,
          effects: [
            { type: 'flag', target: 'blockade_approach', value: 'negotiate' },
            { type: 'resource', target: 'sovereigns', value: -500 },
            { type: 'resource', target: 'supplies', value: 20 },
            { type: 'reputation', value: 5 },
          ],
        },
        {
          id: 'blockade_tunnels',
          text: '"Show me these tunnels."',
          consequence: 'Underground. Invisible.',
          available: true,
          effects: [
            { type: 'flag', target: 'blockade_approach', value: 'tunnels' },
            { type: 'resource', target: 'intelligence', value: -15 },
            { type: 'resource', target: 'supplies', value: 15 },
            { type: 'loyalty', target: 'suulen', value: 8 },
          ],
        },
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'blockade_resolved', value: true },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'BLOCKADE RESOLVED',
      message: 'The Kolmari trade blockade has been addressed. Supply lines are stabilizing. The Central Belt breathes a little easier, for now.',
    }},
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 5: THE TABLE
// =============================================
// Full crew war council. Two major choices.
// =============================================

export const act2CouncilScene: StoryScene = {
  id: 'act2_crew_council',
  title: 'THE TABLE',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
  beats: [
    {
      id: 'council_01',
      title: 'WAR COUNCIL',
      effect: 'flash',
      paragraphs: [
        'All six of you sit at the same table. Storm tea in clay cups. Dragghen cooked something that fills the room with the smell of pepper and salt. One map in the center. Candles at the corners.',
        'Nobody says anything for a while. Kovesse is the first to open her mouth and Dragghen shakes his head once. She closes it.',
      ],
      characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
    },
    {
      id: 'council_02',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa has a new ledger. She\'s been filling it for weeks. She opens it to a page that\'s half numbers, half diagrams, and one sentence underlined twice at the bottom.',
        '"Three months." She traces the numbers with her finger, talking to the ledger as much as to you. "That\'s our runway if nothing changes. Six if we tighten belts and squeeze better rates from the trade routes. After that..." She flips to the underlined sentence. "After that, we need to go south."',
        'She turns the ledger around so everyone can read the sentence.',
        'It says: THE SOUTH HAS WHAT WE NEED.',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'council_03',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen has a worn notebook with dog-eared pages and grease stains from the kitchen. He flips through it, looking for something.',
        '"Tavven\'s fine. Keldriss is good. Coppervein..." He almost smiles. "Coppervein is mine. They\'re solid because I told them we\'re solid and I don\'t lie to those people."',
        'The smile fades.',
        '"Mossbreak is shaky. Mirrorwater doesn\'t trust us yet. And Durrek..." He closes the notebook. "Durrek looks at us the way a dog looks at a new owner. Waiting to see if we\'re the kind that feeds or the kind that kicks."',
        'He puts the notebook down. "Three out of eight islands are with us because they want to be. The rest are with us because we showed up. That\'s not the same thing, Captain."',
      ],
      characters: ['karyudon', 'dragghen'],
    },
    {
      id: 'council_04',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen is perched on her chair with one knee drawn up, foot bare, toes curled over the seat edge. She looks like she might bolt through the window at any second. When she talks, it\'s barely above a whisper. Everyone leans in.',
        '"They know where we are. They know what we have. They have a rough headcount." She picks at a thread on her sleeve. "What they don\'t have is a number for you. The Wardensea assessment of your combat strength is listed as \'uncertain.\' I stole a copy of it. They\'re terrified of the word \'uncertain.\'"',
        'Those silver-blue eyes settle on you.',
        '"They think you\'re dangerous. They don\'t know you\'re unprecedented. And that gap between dangerous and unprecedented is the only reason we\'re still here."',
      ],
      characters: ['karyudon', 'suulen'],
    },
    {
      id: 'council_05',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse slaps her tablet down so hard the storm tea cups rattle.',
        '"Three phases. That\'s what I\'ve watched happen on the feeds." She counts on her fingers: "Fugitive. Conqueror. And now this weird third thing where nobody knows what to call you. Which is GREAT, by the way, mystery is gold, but mystery expires."',
        'She pulls the tablet back and holds it up like evidence.',
        '"Right now the Grimoire is ours. The channels, the conversations, the whole narrative. But the Wardensea has a propaganda division and they are not stupid. If we don\'t tell this story, they will. And their version ends with you in chains."',
      ],
      characters: ['karyudon', 'kovesse'],
    },
    {
      id: 'council_06',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth pushes back from the table and stands. It\'s not a choice. It\'s a reflex. Twelve years of briefings burned into his muscles.',
        '"One warship. Six cutters. Four of them combat-ready." He draws a line on the map from Durrek to Vess Harbour. The chalk snaps and he keeps going with the broken half. "The Wardensea has twelve capital ships at Vess Harbour and eight more on patrol. Straight fight, we lose. Every time. Don\'t let anyone in this room tell you otherwise."',
        'He sets the chalk down.',
        '"But we don\'t need to win. We need to cost more than we\'re worth. Fortify the narrows, fight dirty, and hit them once so hard that the admiralty has to sit down and do the math again. Make them realize that taking us out costs more ships than letting us exist."',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'council_07',
      paragraphs: [
        'Then you ask the first question.',
      ],
      characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
      choices: [
        {
          id: 'council_expand',
          text: '"We push south. Windrow, Ghostlight. Expand before they can contain us."',
          consequence: 'Expand. Outgrow their containment.',
          available: true,
          effects: [
            { type: 'flag', target: 'council_strategy', value: 'expand' },
            { type: 'unlock', target: 'windrow', value: true },
            { type: 'unlock', target: 'ghostlight_reef', value: true },
            { type: 'dominion', target: 'iron', value: 15 },
            { type: 'infamy', value: 5 },
          ],
        },
        {
          id: 'council_consolidate',
          text: '"We hold what we have. Make it unbreakable."',
          consequence: 'Consolidate. Dig in. Unbreakable.',
          available: true,
          effects: [
            { type: 'flag', target: 'council_strategy', value: 'consolidate' },
            { type: 'dominion', target: 'king', value: 20 },
            { type: 'reputation', value: 10 },
            { type: 'resource', target: 'supplies', value: 15 },
          ],
        },
      ],
    },
    {
      id: 'council_08',
      paragraphs: [
        'The table absorbs your decision. Delvessa takes notes. Vorreth adjusts his map annotations. Kovesse drafts a Grimoire narrative framework.',
        'Then the second question.',
      ],
      characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
      choices: [
        {
          id: 'council_conqueror_lean',
          text: '"The Conquerors are allies, imperfect, but useful."',
          consequence: 'Alliance. Imperfect but useful.',
          available: true,
          effects: [
            { type: 'flag', target: 'council_alliance', value: 'conqueror' },
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'loyalty', target: 'suulen', value: 5 },
          ],
        },
        {
          id: 'council_independent',
          text: '"We answer to no one. Build our own path."',
          consequence: 'Independence. Harder, but yours.',
          available: true,
          effects: [
            { type: 'flag', target: 'council_alliance', value: 'independent' },
            { type: 'reputation', value: 5 },
            { type: 'dominion', target: 'king', value: 10 },
            { type: 'loyalty', target: 'delvessa', value: 5 },
          ],
        },
        {
          id: 'council_wardensea_moderates',
          text: '"There are Wardensea officers who know this system is broken. Find them."',
          consequence: 'Unconventional. Find the cracks inside.',
          available: true,
          effects: [
            { type: 'flag', target: 'council_alliance', value: 'wardensea_moderates' },
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'loyalty', target: 'vorreth', value: 8 },
          ],
        },
      ],
    },
    {
      id: 'council_09',
      paragraphs: [
        'The council runs for three hours. By the end, the candles are guttering. The storm tea is cold. The map is covered in annotations, arrows, and Delvessa\'s precise handwriting.',
        'When it\'s done, Dragghen stands. He picks up the empty cups. He washes them in the basin by the window.',
        'It\'s a small thing.',
      ],
    },
    {
      id: 'council_10',
      paragraphs: [
        'You are the last to leave. The candles have burned down to stubs, throwing long shadows across the map.',
        'Dragghen washed the dishes before he left. The basin is still wet. Vorreth\'s chalk marks cover the southern approach. Kovesse left her tablet on the table, screen still glowing with a half-drafted broadcast.',
        'The storm tea is cold. You drink it anyway.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'crew_council_complete', value: true },
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'WAR COUNCIL COMPLETE',
      message: 'The crew has spoken. The strategy is set. What comes next depends on whether the plan survives contact with the enemy.',
    }},
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 6: BLOOD IN THE WATER
// =============================================
// Wardensea probing attack. Leads to combat.
// =============================================

export const act2FirstStrikeScene: StoryScene = {
  id: 'act2_first_strike',
  title: 'BLOOD IN THE WATER',
  characters: ['karyudon', 'vorreth', 'delvessa', 'dragghen'],
  beats: [
    {
      id: 'strike_01',
      paragraphs: [
        'It happens at dawn. Three ships at the Keldriss approach. Corvettes, heavier and armed, flying Second Division colors.',
        'The alarm runs through the islands in minutes. Kovesse\'s Grimoire relay network proves its worth: Coppervein, Sorrens, and Anvil Cay are on alert before the corvettes clear the outer channel.',
      ],
      effect: 'shake',
      sfx: 'combat_cinematic_boom',
    },
    {
      id: 'strike_02',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth reads the formation from the watchtower. His spyglass does not waver.',
        '"Second Division Reconnaissance. Three corvettes, modified for fast engagement. They are mapping our response: how quickly we mobilize, what we deploy, and where our defensive gaps are."',
        'He lowers the spyglass.',
        '"Every second of this fight is data for Admiral Vasshen. If we win badly, she learns our weaknesses. If we win cleanly, she respects our strength. Either way, she learns."',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'strike_03',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        'Delvessa is at your side. She\'s already doing math in her head. You can see it in the way her eyes move, tracking the ships, counting guns.',
        '"Good." Her mouth is a thin line. "Then let\'s give her something to calculate."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'strike_04',
      effect: 'flash_crimson',
      sfx: 'combat_heavy',
      paragraphs: [
        'You take the Danzai off your back. The war club catches the dawn light and turns it red.',
        'The Keldriss channel is narrow. Rocky. The kind of terrain where three corvettes have to come at you single-file.',
        'Perfect.',
      ],
      characters: ['karyudon', 'vorreth', 'delvessa', 'dragghen'],
      choices: [
        {
          id: 'strike_engage',
          text: '"We meet them in the channel. No retreat."',
          consequence: 'No retreat. Meet them head-on.',
          available: true,
          effects: [
            { type: 'combat', target: 'wardensea_first_strike', value: true },
          ],
        },
      ],
    },
    {
      id: 'strike_05',
      paragraphs: [
        'The smoke clears. The channel is quiet except for the sound of water slapping against damaged hulls and the distant cries of wounded sailors.',
        'Vorreth pulls a Wardensea officer from the water. Alive. The officer\'s coat contains reconnaissance documents: fleet positions, deployment schedules, a rough assessment of your island defenses.',
      ],
    },
    {
      id: 'strike_06',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'satisfaction',
      paragraphs: [
        'Delvessa reads the captured documents on the dock, saltwater still dripping from the pages. Her hands are shaking with adrenaline. She grips the papers tighter to stop it.',
        '"They\'ve been watching us for weeks. Look. Patrol schedules, garrison estimates, supply chain maps." She flips a page. Points at a line underlined in red. "Your combat capability. \'Uncertain.\' They wrote \'uncertain\' next to your name and that one word is why they only sent three ships."',
        'She folds the documents carefully. Tucks them inside her coat.',
        '"Now we know what they know. And they still haven\'t seen what you can do." The corner of her mouth twitches. Almost a smile. "The intelligence advantage just flipped."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'strike_07',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen watches the retreating ships from the Keldriss cliffs. He\'s got blood on his hands. Not his. He wipes them on his trousers and it doesn\'t come off.',
        '"They\'ll be back."',
        'He keeps scrubbing at the blood.',
        '"But they\'ll bring more money next time. And more ships. Because today they found out the cheap option doesn\'t work."',
      ],
      characters: ['karyudon', 'dragghen'],
    },
    {
      id: 'strike_08',
      paragraphs: [
        'You sheathe the Danzai. Your hands are shaking. The adrenaline takes longer to fade than it used to, or maybe there\'s more of it now.',
        'The channel smells like smoke and salt and something burnt that used to be a corvette hull.',
      ],
    },
    {
      id: 'strike_09',
      paragraphs: [
        'Kovesse\'s broadcast goes out within the hour. You don\'t listen to it. You\'re sitting on the Keldriss dock, watching smoke drift south, picking splinters out of your palm.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'first_strike_survived', value: true },
    { type: 'bounty', value: 15000000 },
    { type: 'reputation', value: 8 },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA PROBE REPELLED',
      message: 'The Second Division reconnaissance force has been defeated at Keldriss. Captured documents provide valuable intelligence on Wardensea operations. Your bounty has increased.',
    }},
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 7: CRACKS IN THE FOUNDATION
// =============================================
// Territory crisis at Mossbreak.
// =============================================

export const act2CrisisScene: StoryScene = {
  id: 'act2_territory_crisis',
  title: 'CRACKS IN THE FOUNDATION',
  characters: ['karyudon', 'dragghen', 'delvessa'],
  beats: [
    {
      id: 'crisis_01',
      paragraphs: [
        'The report arrives from Mossbreak at midday. Hand-delivered by a nervous fisher who made the crossing in a storm because nobody else would go.',
        'Mossbreak is fracturing.',
      ],
    },
    {
      id: 'crisis_02',
      paragraphs: [
        'Three problems at once. The local harvest coordinator, a woman named Pela, is withholding grain from the supply chain. She says the quota Delvessa set is too high. She\'s not wrong, but the timing is deliberate.',
        'Second: Kolmari agitators have been operating on Mossbreak for two weeks. They\'re not trying to retake the island. They\'re trying to make it ungovernable. Whisper campaigns. Rumor networks. The classic destabilization playbook.',
        'Third: morale. The people of Mossbreak did not choose you. They were conquered. The difference between a liberator and an occupier is in the details, and right now the details are not in your favor.',
      ],
    },
    {
      id: 'crisis_03',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        'Delvessa has already done the numbers. She doesn\'t waste time getting to the point.',
        '"Mossbreak withholds the harvest, Coppervein and Sorrens starve. Coppervein\'s got reserves for maybe ten days. Sorrens has nothing. Thirty percent of our supply network goes dark."',
        'She pinches the bridge of her nose. She does that when the problem is political, not mathematical.',
        '"This isn\'t a rebellion. Pela doesn\'t want to overthrow us. She wants to know if we\'re the kind of people who crush dissent or listen to it. The Kolmari agents whispering in her ear want to make sure we pick \'crush.\'"',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'crisis_04',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen clears his throat. He\'s been staring at the floor.',
        '"I know those people." His voice is rough. "They\'re Coppervein people. Same hands, same work, same bullshit they\'ve been swallowing from whoever shows up with a flag and a list of demands. They don\'t hate you, Captain. They don\'t even know you. They just... they\'re tired. They\'ve been promised things before."',
        'He meets your eyes.',
        '"Let me go. Give me three days. I\'ll talk to Pela, I\'ll talk to the elders, I\'ll cook for them and sit at their tables and show them what Coppervein looks like now. No soldiers. No threats. Just me."',
      ],
      characters: ['karyudon', 'dragghen'],
    },
    {
      id: 'crisis_05',
      paragraphs: [
        'Three approaches. Each one shows Mossbreak, and every other island, what kind of ruler you are.',
      ],
      characters: ['karyudon', 'dragghen', 'delvessa'],
      choices: [
        {
          id: 'crisis_send_dragghen',
          text: '"Go, Dragghen. Show them who we are."',
          consequence: 'Community. Send one of theirs.',
          available: true,
          effects: [
            { type: 'flag', target: 'crisis_approach', value: 'community' },
            { type: 'loyalty', target: 'dragghen', value: 12 },
            { type: 'reputation', value: 8 },
            { type: 'dominion', target: 'king', value: 15 },
          ],
        },
        {
          id: 'crisis_buy_compliance',
          text: '"Reduce the quota. Send supplies. Buy their patience."',
          consequence: 'Buy patience. Spend the coin.',
          available: true,
          effects: [
            { type: 'flag', target: 'crisis_approach', value: 'economic' },
            { type: 'resource', target: 'sovereigns', value: -300 },
            { type: 'resource', target: 'supplies', value: -10 },
          ],
        },
        {
          id: 'crisis_crush',
          text: '"Root out the agitators. Make an example."',
          consequence: 'Crush it. Make an example.',
          available: true,
          effects: [
            { type: 'flag', target: 'crisis_approach', value: 'force' },
            { type: 'infamy', value: 8 },
            { type: 'reputation', value: -10 },
            { type: 'dominion', target: 'iron', value: 10 },
          ],
        },
      ],
    },
    {
      id: 'crisis_06',
      paragraphs: [
        'Pela\'s response arrives by courier two days later. One line. "We\'ll see."',
        'Delvessa files it without comment.',
      ],
    },
    {
      id: 'crisis_07',
      paragraphs: [
        'Mossbreak\'s harvest resumes within days. The supply chain stabilizes. The Kolmari agitators withdraw quietly, their story no longer selling.',
        'But the cracks don\'t disappear. They just go quiet.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'territory_crisis_resolved', value: true },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'TERRITORY CRISIS RESOLVED',
      message: 'Mossbreak has stabilized. The Central Belt supply chain is intact. But the deeper question remains: what kind of authority are you building?',
    }},
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 8: THE NEXT STEP
// =============================================
// Intelligence briefing on Vess Harbour.
// Sets up the southern expansion.
// =============================================

export const act2SouthernGambitScene: StoryScene = {
  id: 'act2_southern_gambit',
  title: 'THE NEXT STEP',
  characters: ['karyudon', 'vorreth', 'suulen', 'delvessa'],
  beats: [
    {
      id: 'gambit_01',
      title: 'VESS HARBOUR',
      effect: 'flash',
      paragraphs: [
        'The intelligence arrives in pieces. Suulen\'s network. Vorreth\'s contacts. Delvessa\'s financial analysis. Three separate streams of information that converge on a single conclusion.',
        'Vess Harbour.',
        'The Wardensea\'s southern fortress. The seat of Admiral Vasshen\'s power. The keystone of everything the Wardensea has built south of the Central Belt.',
      ],
    },
    {
      id: 'gambit_02',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth draws the harbor from memory. His hand doesn\'t hesitate. He lived there for three years and the layout is carved into him.',
        '"Twelve warships at anchor. Six thousand souls behind the walls. Two shore batteries, one drydock, and the harbor mouth is three hundred meters wide at the choke." He sets the chalk down. Stares at his own drawing.',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'gambit_02b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"I used to stand on those walls and watch for Conquerors. I knew every gun emplacement, every patrol rotation, every blind spot in the coverage." His voice is steady.',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'gambit_02c',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"The mouth is the key. Four ships at a time, maximum. Vasshen built her entire defense around that bottleneck."',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'gambit_03',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen leans over the map and draws a small X on the eastern dock with her fingernail.',
        '"Every ninth day, third shift, this section goes dark. Six hours. The garrison rotates, the patrol boats are in drydock, and the shore batteries run skeleton crews." She presses the X deeper into the paper. "Eight months I\'ve been watching this pattern through three separate informants. Eight months. Same gap. Same window. Same six hours where the most powerful fortress in the Bastion Sea yawns and looks the other way."',
        'She straightens up.',
        '"Routine is the thing that kills you when you\'re too comfortable to notice."',
      ],
      characters: ['karyudon', 'suulen'],
    },
    {
      id: 'gambit_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'satisfaction',
      paragraphs: [
        'Delvessa picks up where Vorreth left off, and there\'s something hungry in her voice.',
        '"Sixty percent of the southern trade corridor flows through Vess Harbour. Every merchant, every supply ship, every grain barge heading south pays Vasshen\'s toll. Take the harbour and you don\'t just win a fortress." She draws a circle around Vess Harbour on the map. A slow, deliberate circle. "You break the Wardensea\'s money."',
        'She caps the pen.',
        '"No Conqueror has ever tried this. Not because they couldn\'t imagine it. Because they didn\'t have the Central Belt to launch from."',
        'Her eyes find yours. Dark, steady, and absolutely certain.',
        '"You do."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'gambit_05',
      paragraphs: [
        'You look at the map. The Southern Reach stretches below the Central Belt: Windrow, Ghostlight Reef, Noon Island, and at the southern edge, the fortress of Vess Harbour.',
        'Between here and there: open water, Wardensea patrol routes, and twelve warships that know you\'re coming.',
      ],
    },
    {
      id: 'gambit_06',
      paragraphs: [
        'You place your hand on the map. On Vess Harbour. Your palm covers the entire fortress.',
        'Vorreth looks at your hand on the map. He doesn\'t say anything. He picks up the chalk and starts marking approach routes.',
      ],
    },
    {
      id: 'gambit_07a',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse appears in the doorway. She\'s holding a sealed envelope. No stamp. No postmark. Just your name, written in handwriting you\'ve seen once before: precise, elegant, practiced.',
        '"This was on the dock," she says. "No messenger. No ship. Just sitting on the bollard where we tie the bowline. Whoever left it knew exactly which bollard was ours."',
      ],
    },
    {
      id: 'gambit_07b',
      paragraphs: [
        'You break the seal. Inside, a single sheet. The handwriting matches the note from Mossbreak.',
        'Captain,',
        'The sea does remember. You have fed it well. Six islands. A fleet. A name that makes admirals lose sleep. Impressive, for a man who washed ashore on driftwood.',
        'I have watched you since Mossbreak. Before Mossbreak. Since the transport burned. You do not know me. You will.',
        'Vess Harbour is not what it appears. Vasshen is not your enemy. She is your audition. What comes after her is what you should fear.',
        'When the southern wind changes, look east. I will find you.',
        '-- A Friend',
      ],
    },
    {
      id: 'gambit_07c',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen takes the letter. Reads it twice. Holds it up to the light.',
        '"Same hand as the Mossbreak note. Same ink. Same paper." She folds it carefully. "Whoever this is, they have access to military intelligence. \'Vasshen is your audition\' implies knowledge of a threat beyond the Wardensea."',
      ],
    },
    {
      id: 'gambit_07d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Or it\'s bait," Vorreth says. "A provocation designed to make us cautious when we need to be bold."',
      ],
    },
    {
      id: 'gambit_07e',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Could be both," Delvessa says. She\'s watching you. "What do you want to do with it?"',
      ],
    },
    {
      id: 'gambit_07f',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You pocket the letter.',
      ],
      choices: [
        {
          id: 'gambit_south',
          text: '"Move south. Take Windrow. Take Ghostlight. Whoever this is can say hello in Vess Harbour."',
          consequence: 'Push into the southern islands. Bold.',
          available: true,
          effects: [
            { type: 'reputation', value: 5 },
            { type: 'flag', target: 'gambit_response', value: 'aggressive' },
          ],
        },
        {
          id: 'gambit_cautious',
          text: '"South. But carefully. We map the route before we commit."',
          consequence: 'Move south with preparation. The prudent path.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'flag', target: 'gambit_response', value: 'cautious' },
          ],
        },
      ],
    },
    {
      id: 'gambit_07g',
      paragraphs: [
        'Vorreth is already marking the southern route before you finish the sentence.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'southern_gambit_begun', value: true },
    { type: 'unlock', target: 'windrow', value: true },
    { type: 'unlock', target: 'ghostlight_reef', value: true },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'THE SOUTHERN CAMPAIGN',
      message: 'Vess Harbour. Twelve warships. Six thousand personnel. The most audacious conquest in the Bastion Sea. But first: the stepping stones. Windrow and Ghostlight Reef are now accessible.',
    }},
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};
