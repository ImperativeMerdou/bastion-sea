import { StoryScene } from '../../types/game';

// ===== SCENE 1: THE THRONE ROOM IS EMPTY =====

export const act3BeginScene: StoryScene = {
  id: 'act3_begin',
  title: 'ACT 3 - GODTIDE',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
  beats: [
    {
      id: 'a3_begin_01',
      title: 'THE THRONE ROOM IS EMPTY',
      paragraphs: [
        'Vasshen\'s quarters smell like her. Not perfume, cold iron and paper. Navy regulation ledgers stacked by height. A desk bolted to the floor with three locks on the drawers. Charts pinned to the walls with brass tacks, each one annotated in a hand so controlled it could have been printed.',
        'You stand in the center of the room. Your horns scrape the ceiling. The Danzai leans against the Admiral\'s desk, and the desk groans under its weight like it knows what happened here.',
        'Vess Harbour belongs to you.',
        'The Wardensea\'s southern fortress, twelve warships, six thousand personnel, two shore batteries, and every shipping lane south of the Central Belt, is yours. You took it with a crew of five, a stolen intelligence report, and the kind of plan that only works when the people executing it would rather die than fail.',
      ],
    },
    {
      id: 'a3_begin_02',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa kicks the door open because her arms are full. Captured ledgers, maps, intelligence reports, a sealed envelope she hasn\'t opened yet. She dumps all of it on Vasshen\'s desk and the desk groans again.',
        '"Shipping lanes are ours. Everything south of the Belt. Drydock works. Armory\'s stocked. Transit fees alone are worth more per week than Tavven Shoal makes in a month." She\'s talking fast. Not excited. Urgent.',
        'She picks up the sealed envelope. Turns it over in her hands. Doesn\'t open it.',
        '"First Division is mobilizing out of Rotstone. Forty-eight capital warships. Full complement. Vasshen\'s personal fleet, the one she held back while we fought the garrison." She sets the envelope down. "Nine days."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'a3_begin_03',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth hasn\'t moved from the window since you took the room. Below: captured warships at anchor, your crews swarming the docks, smoke still rising from the eastern battery where Kovesse\'s charges blew through the wall.',
        '"Forty-eight ships." He says it the way you\'d say a death sentence. "That\'s everything she has. This isn\'t a response. This is an erasure. She\'s coming to turn Vess Harbour back into a Wardensea installation and pretend we never happened."',
        'His hand finds Greysalt\'s hilt without looking. His thumb moves across the pommel in a pattern worn smooth by years.',
        '"I saw the First Division deploy once. The Shattered Shelf. Eleven years ago. They broke a fortified island into gravel in six hours." He swallows. "Vasshen doesn\'t take prisoners when she\'s angry. She was angry then. She\'s angrier now."',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'a3_begin_04',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      expression: 'shock',
      paragraphs: [
        'Kovesse is sitting cross-legged on Vasshen\'s desk, her tail draped over the edge, fingers flying across the Grimoire tablet. At four-foot-one, she looks like a child playing in an adult\'s office.',
        '"Every feed. Every single feed in the Bastion Sea. I have never--" She catches herself. Scrolls. Scrolls faster. "The Conquerors are reacting. The Kolmari are panicking. Three merchant guilds have already sent trade proposals and we have been here for four hours."',
        'She looks up from the tablet. Her ears are flat. Not with fear. With the specific overwhelm of someone whose instrument just started measuring something off the scale.',
        '"Captain. I don\'t have a broadcast for this. I genuinely do not know what to say about this and I always know what to say."',
      ],
      characters: ['karyudon', 'kovesse'],
    },
    {
      id: 'a3_begin_05',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen has been leaning against the doorframe. He does not enter Vasshen\'s quarters. He watches from the threshold like a man who has learned that rooms of power have a cost.',
        '"Captain."',
        'Just the one word. But Dragghen has never needed more than one word to say what matters. He waits until the room is quiet.',
        '"Whatever we do next, this is the part they remember. Not Tavven Shoal. Not the Central Belt. This. What we do when we have a fortress and the whole world is watching."',
        'He looks at each of them. Delvessa, Vorreth, Kovesse, Suulen.',
        '"So what do we do?"',
      ],
      characters: ['karyudon', 'dragghen'],
    },
    {
      id: 'a3_begin_06',
      paragraphs: [
        'You sit in Vasshen\'s chair. It is too small for you. Everything in this room is too small for you: the chair, the desk, the ceiling, the war.',
        'The hinge point. Everything after this bends around what you do next.',
        'Nine days until the First Division arrives. The Conquerors are circling. The Kolmari are calculating. Every choice from here determines whether you are king of the Bastion Sea or a cautionary tale told in harbour bars.',
        'Three stances. Three ways to meet what is coming.',
      ],
      characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
      choices: [
        {
          id: 'endgame_defensive',
          text: '"We hold what we have and dare them to take it."',
          consequence: 'Dig in. Let them break on you.',
          available: true,
          effects: [
            { type: 'flag', target: 'endgame_stance', value: 'defensive' },
            { type: 'dominion', target: 'iron', value: 25 },
            { type: 'resource', target: 'materials', value: 30 },
            { type: 'reputation', value: 5 },
          ],
        },
        {
          id: 'endgame_aggressive',
          text: '"We push north. Rotstone, then the Kingsrun."',
          consequence: 'Aggressive. Strike first.',
          available: true,
          effects: [
            { type: 'flag', target: 'endgame_stance', value: 'aggressive' },
            { type: 'dominion', target: 'iron', value: 15 },
            { type: 'infamy', value: 10 },
            { type: 'bounty', value: 30000000 },
          ],
        },
        {
          id: 'endgame_strategic',
          text: '"We make them come to us, then break them."',
          consequence: 'Strategic. Bait the trap.',
          available: true,
          effects: [
            { type: 'flag', target: 'endgame_stance', value: 'strategic' },
            { type: 'dominion', target: 'sight', value: 25 },
            { type: 'resource', target: 'intelligence', value: 20 },
          ],
        },
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'act3_begun', value: true },
    { type: 'resource', target: 'sovereigns', value: 500 },
    { type: 'resource', target: 'supplies', value: 30 },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'ACT 3 - GODTIDE',
      message: 'Vess Harbour has fallen. The endgame begins. The Wardensea\'s First Division is nine days out. The Bastion Sea is watching.',
    }},
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 2: THE ADMIRAL COMES
// =============================================
// Vasshen arrives with the First Division.
// Full military confrontation. Boss fight trigger.
// =============================================

export const act3VasshenScene: StoryScene = {
  id: 'act3_vasshen',
  title: 'THE ADMIRAL COMES',
  characters: ['karyudon', 'delvessa', 'vorreth', 'dragghen', 'suulen', 'kovesse'],
  beats: [
    {
      id: 'a3_vasshen_01',
      title: 'THE ADMIRAL COMES',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen walks into the command room without knocking. Her silver-blue eyes are blazing, pupils dilated, the Spatial Sight burning so hard you can almost see the distance reflected in them.',
        '"They\'re here."',
        'You are on the battlements in thirty seconds. The Danzai is on your back in thirty-five. By the time you reach the eastern lookout, the horizon has changed.',
        'A wall. Grey steel from horizon to horizon.',
      ],
      effect: 'shake',
    },
    {
      id: 'a3_vasshen_02',
      paragraphs: [
        'Forty-eight warships. You count them because Vorreth taught you to count them. Twelve heavy cruisers forming the vanguard. Twenty-four corvettes in a crescent screen. Eight destroyers anchoring the flanks. Four supply vessels trailing behind like vultures.',
        'The formation is perfect. Every ship in position, spacing maintained, flags sharp in the wind. A weapon loaded, aimed, and fired.',
        'And at the center of the formation, flying the black-and-silver command pennant of the Southern Fleet: the Severance. Vasshen\'s flagship. You recognize it from Vorreth\'s briefings. Three hundred meters of armored hull, eight main gun batteries, crew complement of four hundred.',
        'She brought everything.',
      ],
    },
    {
      id: 'a3_vasshen_03',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth is beside you. Greysalt drawn, blade trembling slightly because his hand won\'t stop shaking. He clenches tighter. Forces it still.',
        '"The First Division." His voice is hoarse. "Full deployment. I haven\'t seen this since..."',
        'He stops. Swallows. Doesn\'t start again for a while.',
        '"The man on the quarterdeck of the third cruiser taught me how to read fleet formations. Torek. His name is Torek." He says it like it costs something. "Two of the officers on the Severance. I drank with them. They\'re good at this."',
        'His hand is still shaking. He doesn\'t look at you.',
        '"I should have--" He cuts himself off. Tries a different sentence. Can\'t find it. Goes back to the one he had.',
        '"The First Division can be beaten. I spent twelve years studying how." His thumb moves across Greysalt\'s pommel. The pattern worn smooth by years. "That\'s what I have. That\'s the only useful thing I have right now."',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'a3_vasshen_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        'Delvessa arrives with the captured harbour charts rolled under her arm and ink on her fingers.',
        '"Three hundred meters at the mouth. Six ships at a time, maximum. Shore batteries are live, Kovesse has them at seventy percent. The terrain is ours." She unrolls the chart across the battlement wall and pins it with her elbows. "Forty-eight ships against a fortified harbour. Textbook says the attacker needs three-to-one. She has eight-to-one."',
        'She straightens up. Wind catches her hair and she ignores it.',
        '"Eight-to-one is not enough if we\'re smart. It\'s more than enough if we\'re stupid." She holds your gaze. "Don\'t be stupid."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'a3_vasshen_05',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      expression: 'shock',
      paragraphs: [
        'Kovesse scrambles up the battlement stairs two at a time, Grimoire tablet clutched to her chest, tail lashing behind her. She\'s out of breath. She doesn\'t care.',
        '"Open channel. She\'s broadcasting on an open channel. Vasshen wants every Grimoire in the Bastion Sea listening."',
        'Kovesse holds up the tablet. The audio crackles, then clears.',
        'The voice that comes through is low and precise. A voice that has never needed volume.',
      ],
      characters: ['karyudon', 'kovesse'],
    },
    {
      id: 'a3_vasshen_06',
      speaker: 'vasshen',
      speakerName: 'Admiral Vasshen',
      paragraphs: [
        '"This is Admiral Vasshen, Commander of the Wardensea First Division, addressing the criminal known as Karyudon."',
        '"You are occupying a Wardensea military installation. You have killed Wardensea personnel. You have disrupted trade routes, destabilized territories, and declared yourself sovereign over waters that belong to the Wardensea by treaty and by law."',
        '"I gave you fourteen days to surrender. You used them to take my fortress."',
        'A pause. When the voice returns, it is quieter. Not softer. Quieter.',
        '"I respect that. It was well-executed. Your tactician, Daaz, I believe, trained under Commander Sorelle. I can see her fingerprints on the assault plan. Good. I taught Sorelle."',
        '"You have one hour. Surrender Vess Harbour and submit to custody, and your crew will receive military tribunal, not execution. Refuse, and I will reduce this fortress to rubble with you inside it. This is not an ultimatum. Ultimatums imply negotiation. This is arithmetic."',
      ],
    },
    {
      id: 'a3_vasshen_07',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You take the tablet from Kovesse. Hold it up. The Grimoire feed is still live. Every bar, every dock, every ship in the Bastion Sea is listening.',
        '"Vasshen."',
        'Your voice carries. It always carries.',
        '"Yeah. I heard you."',
        'You look out at the wall of ships. Forty-eight. You can count them from here.',
        '"One hour\'s fine. I wasn\'t going anywhere."',
      ],
    },
    {
      id: 'a3_vasshen_08',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'The broadcast cuts. Silence on the battlements. Then Dragghen laughs, a real laugh. Kovesse is already drafting the Grimoire post. Suulen has vanished to coordinate the scout network.',
        'Delvessa looks at you.',
        '"Forty-seven minutes. Battle stations."',
        'You take the Danzai off your back. Hold it in front of you. The blade catches the light from forty-eight warships and throws it back.',
      ],
      characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
      choices: [
        {
          id: 'vasshen_fight',
          text: '"All hands. All guns. Everything we have."',
          consequence: 'Everything. Now.',
          available: true,
          effects: [
            { type: 'combat', target: 'vasshen_confrontation', value: true },
          ],
        },
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'vasshen_confrontation_begun', value: true },
    { type: 'bounty', value: 50000000 },
    { type: 'infamy', value: 15 },
    { type: 'reputation', value: 10 },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'THE FIRST DIVISION',
      message: 'Admiral Vasshen has arrived with the full strength of the Wardensea First Division. Forty-eight warships against a captured fortress. The Bastion Sea is watching.',
    }},
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 3: THE PRICE OF ALLIES
// =============================================
// Tessavarra arrives. Outcome depends on the
// conqueror_alliance flag from Act 2.
// =============================================

export const act3ConquerorGambitScene: StoryScene = {
  id: 'act3_conqueror_gambit',
  title: 'THE PRICE OF ALLIES',
  characters: ['karyudon', 'tessavarra', 'delvessa', 'suulen'],
  beats: [
    {
      id: 'a3_conqueror_01',
      title: 'THE PRICE OF ALLIES',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'The sails appear from the south three days after Vasshen\'s fleet withdraws. Not Wardensea sails. Conqueror canvas, unmarked and dark, cutting through the water in a formation that says: we are not sneaking in. We are arriving.',
        'Seven ships. More than Tessavarra had before. Somebody has been recruiting.',
        'Suulen is on the dock before you are. She watches the approaching fleet with those silver-blue eyes.',
        '"She brought the Third and Fifth Seat crews with her. This is not a social call."',
      ],
    },
    {
      id: 'a3_conqueror_02',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        'Tessavarra walks the dock like she owns it. She does not own it. But she walks it that way regardless, and the dock workers move aside because some people carry authority in the angle of their shoulders.',
        'She is taller than you remember. Or maybe the context changed. The last time you saw her, she was making an offer in the dark. Now she is making one in broad daylight, with seven ships at her back and the stink of gunpowder still hanging over Vess Harbour.',
        '"Karyudon."',
        'She stops. Looks at the fortress. At the Wardensea flag you tore down. At your flag going up in its place.',
        '"You actually did it. The Seats are still arguing about whether you are lucky or something else entirely. I stopped arguing. I came to see for myself."',
      ],
      characters: ['karyudon', 'tessavarra'],
    },
    {
      id: 'a3_conqueror_03_allied',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"We had a deal, Sixth Seat. Mutual defense. Blood contract. I honoured my end. My informants fed Suulen the patrol schedules that got you through the harbour mouth. The Third Seat provided the diversion off Rotstone. The Fifth Seat kept the Kolmari supply ships away from the fight."',
        'She crosses her arms.',
        '"The Seats have a price for continued support. Not gold. Not territory. A permanent seat at your council. Equal voice. The Conquerors do not serve. We partner."',
        '"We fought beside you. Now we sit beside you. Or we walk, and you face whatever comes next alone."',
      ],
      characters: ['karyudon', 'tessavarra'],
    },
    {
      id: 'a3_conqueror_03_rejected',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"You turned us down. The Sixth Seat, empty. Our networks, refused. And then you did what five Conquerors with decades of experience never managed. You took Vess Harbour with a crew of five and a sword."',
        'Her voice goes cold.',
        '"That makes you dangerous. To us. To everything the Seats built over forty years. You proved that one captain with enough nerve can do what we told ourselves was impossible. And now every warlord in the Bastion Sea is looking at you instead of at us."',
        '"I did not come to negotiate, Karyudon. I came to take what you would not share. Half of Vess Harbour. Half of the shipping lanes. Or we take all of it."',
      ],
      characters: ['karyudon', 'tessavarra'],
    },
    {
      id: 'a3_conqueror_03_pending',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"You asked for time. I gave it. The Seats gave it. We watched. We waited. You took Windrow, Ghostlight, Vess Harbour, all without our help. Impressive. Inconvenient."',
        'She tilts her head. Measuring.',
        '"The offer is still on the table. Sixth Seat. Blood contract. Mutual defense, shared intelligence, combined fleet strength. But the terms have changed. You proved you can fight alone. That makes you valuable. It also makes you a threat."',
        '"Last chance, Karyudon. Ally or obstacle. There is no more \'pending.\'"',
      ],
      characters: ['karyudon', 'tessavarra'],
    },
    {
      id: 'a3_conqueror_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa is at your shoulder. She speaks low enough that only you can hear.',
        '"If she is allied: giving the Conquerors a council seat means sharing intelligence, revenue, and strategic decisions. Permanently. The benefit is real: five additional fleets, dozens of islands, a network that spans the sea. The cost is that you will never make a decision alone again."',
        '"If she is hostile: seven ships is not enough to take Vess Harbour. But seven ships plus whatever the other Seats send could make the next Wardensea attack survivable for them and fatal for us. She knows that."',
        '"Either way, the price of this moment is the same. You decide what Karyudon means: a name on a flag, or a name on a contract."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'a3_conqueror_05_allied',
      paragraphs: [
        'She came as an ally asking for more. The blood contract is real. The support was real. And the price, a seat at the table, is the kind of demand that only comes from someone who has already earned the right to make it.',
      ],
      characters: ['karyudon', 'tessavarra', 'delvessa', 'suulen'],
      choices: [
        {
          id: 'conqueror_accept_seat',
          text: '"Sit down, Tessavarra. The table is big enough."',
          consequence: 'Share the table.',
          available: true,
          effects: [
            { type: 'flag', target: 'conqueror_council_seat', value: true },
            { type: 'dominion', target: 'king', value: 20 },
            { type: 'resource', target: 'intelligence', value: 25 },
            { type: 'loyalty', target: 'suulen', value: 10 },
            { type: 'loyalty', target: 'delvessa', value: -5 },
            { type: 'reputation', value: 5 },
          ],
        },
        {
          id: 'conqueror_reject_seat',
          text: '"You earned support, not sovereignty. I set the terms."',
          consequence: 'My table. My terms.',
          available: true,
          effects: [
            { type: 'flag', target: 'conqueror_council_seat', value: false },
            { type: 'dominion', target: 'iron', value: 15 },
            { type: 'loyalty', target: 'delvessa', value: 5 },
            { type: 'loyalty', target: 'suulen', value: -8 },
            { type: 'infamy', value: 5 },
          ],
        },
      ],
    },
    {
      id: 'a3_conqueror_05_hostile',
      paragraphs: [
        'She came for blood or territory. Seven ships at her back. The other Seats watching through her eyes. Whatever happens next, the Conquerors will know whether Karyudon shares or whether Karyudon fights.',
        'You already know which one you are.',
      ],
      characters: ['karyudon', 'tessavarra', 'delvessa', 'suulen'],
      choices: [
        {
          id: 'conqueror_fight_tessavarra',
          text: '"You want Vess Harbour? Come and take it."',
          consequence: 'Violence answers violence.',
          available: true,
          effects: [
            { type: 'combat', target: 'tessavarra_confrontation', value: true },
            { type: 'flag', target: 'tessavarra_fought', value: true },
            { type: 'infamy', value: 10 },
            { type: 'bounty', value: 15000000 },
          ],
        },
        {
          id: 'conqueror_concede_half',
          text: '"Half. Not the harbour. The shipping lanes south of Ghostlight."',
          consequence: 'Pragmatic. Give ground to hold ground.',
          available: true,
          effects: [
            { type: 'flag', target: 'conqueror_concession', value: true },
            { type: 'resource', target: 'sovereigns', value: -400 },
            { type: 'reputation', value: -5 },
            { type: 'loyalty', target: 'delvessa', value: 8 },
          ],
        },
      ],
    },
    {
      id: 'a3_conqueror_06',
      paragraphs: [
        'Tessavarra watches your decision land. She is a woman who has survived forty years in the Bastion Sea by reading people the way sailors read weather, and right now, she is reading you.',
        'Whatever she sees, she nods. Once. Sharp.',
        '"The Seats will know within the hour. The Bastion Sea will know by morning."',
        'Her crew starts casting off before she reaches the gangplank. Efficient. They\'ve done this before. Seven keels, one after another, cutting the harbour water south.',
        'Delvessa is already beside you. She has a tablet out, running numbers on what just happened, converting a political event into logistics before the last Conqueror sail clears the headland. She\'s chewing on her thumbnail. You\'ve never seen her do that before.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'conqueror_gambit_resolved', value: true },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'THE CONQUERORS\' GAMBIT',
      message: 'Tessavarra and the Conqueror Seats have made their play. The balance of power in the Bastion Sea has shifted. The question is which direction.',
    }},
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 4: THE MACHINE ARRIVES
// =============================================
// The Kolmari Ironclad. Final economic threat
// made metal. Capture or destroy.
// =============================================

export const act3IroncladScene: StoryScene = {
  id: 'act3_ironclad',
  title: 'THE MACHINE ARRIVES',
  characters: ['karyudon', 'kovesse', 'dragghen', 'vorreth', 'delvessa'],
  beats: [
    {
      id: 'a3_ironclad_01',
      title: 'THE MACHINE ARRIVES',
      stinger: 'story_revelation',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse screams.',
        'A fascinated scream. The scream of a four-foot-one Rathai engineer whose instruments just showed her something that should not exist.',
        'She bursts into the command room holding the Grimoire Pulse Mapper over her head, tail rigid, ears flat, eyes the size of dinner plates.',
        '"CAPTAIN. CAPTAIN. Look at this. Look at this right now. Something is coming through the southern approach and it is reading like an island that learned how to swim."',
      ],
      effect: 'shake',
    },
    {
      id: 'a3_ironclad_02',
      paragraphs: [
        'You reach the eastern battlement. Look south. At first you see nothing. The horizon is grey, the water is grey, the clouds are grey.',
        'Then the grey moves.',
        'A cathedral of riveted iron. Three hundred and fifty meters of riveted iron, riding low in the water, too heavy for reason, too solid for belief. No sails. No oars. The hull is a continuous slab of bolted plate, and where a figurehead should be, there is a ram made of solid copper alloy that parts the water without spray.',
        'Twin smokestacks belch black clouds. Gun turrets, not cannons, turrets, rotate on armored platforms. The deck is sealed. No crew visible. The entire vessel looks like it was built by someone who hated the ocean and decided to punish it.',
        'The Kolmari Ironclad. You have heard the rumours. Everyone in the Bastion Sea has heard the rumours. Nobody believed them.',
      ],
    },
    {
      id: 'a3_ironclad_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      expression: 'awe',
      paragraphs: [
        'Kovesse is vibrating. Literally vibrating. Her hands shake as she adjusts the Pulse Mapper.',
        '"Coal-fired engine. Internal combustion, not steam, something else, something I have never... the metallurgy alone... Captain, the copper content in that hull is worth more than everything we own combined. The Kolmari have been building this in secret for years. Years. This is what their R&D budget was for. Not trade routes. Not credit systems. This."',
        'She lowers the tablet. When she speaks again, her voice is different. Reverent.',
        '"I want it. I want to take it apart and see how it breathes."',
      ],
      characters: ['karyudon', 'kovesse'],
    },
    {
      id: 'a3_ironclad_04',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth stares at the Ironclad the way a man stares at a funeral.',
        '"Our cannons won\'t scratch it." Flat. No room for argument. "Shore batteries are designed for wood. That is not wood."',
        'He watches the ram part the water. His hand finds Greysalt\'s hilt.',
        '"It\'s going to come straight through the harbour mouth. That ram, and then the turrets. Suppress us while it closes. They don\'t need to be clever. They just need to not stop."',
        'He\'s quiet. His hand tightens on Greysalt\'s hilt. Then, almost to himself:',
        '"They spent years on this. While we were taking islands, they were building the thing that takes them back."',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'a3_ironclad_05',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        'Delvessa watches the Ironclad through the spyglass. When she lowers it, her knuckles are white around the brass.',
        '"We can sink it. Deep water off the harbour approach, below recovery depth. The Kolmari eat the loss." She hands you the spyglass. Doesn\'t let go immediately. "Or."',
        'She looks at Kovesse. Kovesse is vibrating.',
        '"If we board it. If Kovesse can get inside the engine compartment. If we take it intact." Each \'if\' lands harder than the last. "Then the Kolmari built us the most dangerous thing in the Bastion Sea and paid for it themselves."',
        'She lets go of the spyglass.',
        '"That\'s a lot of ifs, Captain."',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'a3_ironclad_06',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'The Ironclad is closing. Two hours, maybe less. The harbour mouth will not stop it. The shore batteries will annoy it. The captured warships in your fleet are wooden hulls against an iron fist.',
        'Dragghen stands beside you. He looks at the machine on the horizon and then looks at you.',
        '"Captain. I have watched you punch through a prison transport hull with your bare hands. I have watched you eat a cannonball and spit out the shrapnel. I am not worried about the ship."',
        'He grins.',
        '"I am worried about the ship."',
        'The Ironclad\'s horn sounds across the water. Low. Sustained. The Kolmari sent their best argument. Time to answer it.',
      ],
      characters: ['karyudon', 'dragghen', 'delvessa', 'kovesse', 'vorreth'],
      choices: [
        {
          id: 'ironclad_fight',
          text: '"We go out and meet it. Every ship, every gun, every trick we have."',
          consequence: 'Meet it head-on. Everything.',
          available: true,
          effects: [
            { type: 'combat', target: 'kolmari_ironclad_fight', value: true },
          ],
        },
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'ironclad_engaged', value: true },
    { type: 'bounty', value: 25000000 },
    { type: 'infamy', value: 10 },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'THE KOLMARI IRONCLAD',
      message: 'The Kolmari Confederation has deployed its ultimate weapon. The Ironclad approaches Vess Harbour. Everything rides on what happens next.',
    }},
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 5: THE CROWN OR THE CHAIN
// =============================================
// Final crew council. Character arc payoffs.
// Major identity and endgame choices.
// =============================================

export const act3FinalCouncilScene: StoryScene = {
  id: 'act3_final_council',
  title: 'THE CROWN OR THE CHAIN',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
  beats: [
    {
      id: 'a3_council_01',
      title: 'THE CROWN OR THE CHAIN',
      paragraphs: [
        'After the smoke. After the bodies counted and the fires out and the harbour water back to something close to its natural colour.',
        'The crew gathers. Not in Vasshen\'s command room. You burned the furniture and replaced it with a long table from the harbour mess, scarred with knife marks and stained with salt. Six chairs. None of them match. Dragghen cooked. He always cooks when it matters. The room smells like garlic, rendered fat, and something sweet he will not explain.',
        'Storm tea in chipped cups. Bread torn by hand. Nobody talks for a while. Kovesse is on the table with her legs swinging, Grimoire tablet face-down. Suulen has one knee up against the wall, silver-blue eyes half-closed. Vorreth stands by the window because twelve years in the Wardensea trained him never to sit with his back to a door. Delvessa turns her storm tea cup in slow circles, leaving a wet ring on the wood.',
        'Dragghen is the one who breaks it.',
      ],
    },
    {
      id: 'a3_council_02',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"I got a letter from Coppervein today."',
        'He pulls a folded paper from his apron pocket. Doesn\'t open it.',
        '"A woman named Pela. Her kid is sick. She wrote to ask if we could send a healer, because she heard the Captain takes care of his people."',
      ],
      characters: ['karyudon', 'dragghen'],
    },
    {
      id: 'a3_council_02b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"How did she even get a letter through? The courier networks are--"',
      ],
      characters: ['karyudon', 'kovesse'],
    },
    {
      id: 'a3_council_02c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'grim',
      paragraphs: [
        '"She gave it to a fishing captain. Fishing captain gave it to a dock kid. Dock kid brought it to the galley because he wanted food and I was cooking."',
        'He sets the letter on the table. His hand stays on it.',
        '"She didn\'t write to the Wardensea. Didn\'t write to the Kolmari. Wrote to us." He tears off a piece of bread and chews it. Talks through it. "That scares me more than the fleet, Captain. Not because of what she asked. Because of what happens if nobody answers."',
      ],
      characters: ['karyudon', 'dragghen'],
    },
    {
      id: 'a3_council_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      expression: 'grim',
      paragraphs: [
        'Kovesse stops swinging her legs. She reaches into her pocket and pulls out a folded piece of paper. Smoothed flat from being carried around too long.',
        '"Speaking of letters. A kid on Sorrens Flat drew this." She unfolds it. A child\'s drawing: horns, a big sword, a grin wider than the face. "Gave it to a dockworker. Dockworker mailed it. Suulen intercepted it because Suulen intercepts everything--"',
      ],
      characters: ['karyudon', 'kovesse'],
    },
    {
      id: 'a3_council_03b',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"I intercept threats. That was addressed to the Captain with his full physical description and current location."',
      ],
      characters: ['karyudon', 'suulen'],
    },
    {
      id: 'a3_council_03c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"It\'s a drawing, Suulen. From a child."',
      ],
      characters: ['karyudon', 'kovesse', 'suulen'],
    },
    {
      id: 'a3_council_03d',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"An accurately addressed drawing."',
      ],
      characters: ['karyudon', 'kovesse', 'suulen'],
    },
    {
      id: 'a3_council_03e',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse looks at the picture again. Her voice drops. The Kovesse who broadcasts to thirty thousand feeds is gone. "Sixty-three percent favorable. That\'s the number. I know the number. Data I understand." She smooths a crease in the drawing with her thumb. "I don\'t understand this. And I don\'t know what happens to it if we lose."',
      ],
      characters: ['karyudon', 'kovesse', 'suulen'],
    },
    {
      id: 'a3_council_04',
      paragraphs: [
        'Quiet. Dragghen tears bread. Kovesse puts the drawing on the table next to the letter. The two pieces of paper sit there between the bread and the storm tea, and nobody looks directly at them.',
        'Vorreth has been staring out the window the whole time. His thumb moves across Greysalt\'s pommel in a pattern worn smooth by years.',
      ],
      characters: ['karyudon', 'dragghen', 'kovesse', 'vorreth'],
    },
    {
      id: 'a3_council_04b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      expression: 'grim',
      paragraphs: [
        '"I killed a man I trained with."',
        'He says it to the window. Not to the room.',
        '"Two weeks ago. Eastern dock. During the assault. He recognized me. Said my name." His thumb stops moving on the pommel. "He didn\'t understand why I was on the wrong side of the wall. And I didn\'t have an answer for him. Not one that would make sense. Not one that--"',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'a3_council_04c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Vorreth."',
        'Dragghen pushes the bread plate toward the window. Just pushes it. Doesn\'t say anything else. Vorreth looks at the bread. Looks at Dragghen. Takes a piece. Holds it without eating.',
      ],
      characters: ['karyudon', 'vorreth', 'dragghen'],
    },
    {
      id: 'a3_council_04d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"I don\'t have a speech about duty." He\'s still talking to the window. "I turned on my own people because their people turned on theirs first, and that\'s the only way I can say it that lets me sleep."',
        'He turns around. Looks at you.',
        '"Build something I don\'t have to betray. That\'s it. That\'s all I have."',
      ],
      characters: ['karyudon', 'vorreth'],
    },
    {
      id: 'a3_council_05',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      expression: 'grim',
      paragraphs: [
        'Suulen has been quiet so long everyone forgot she was going to speak. When she does, it\'s mid-thought, like she\'s been having a conversation with herself and just opened the last part of it to the room.',
        '"Eleven. That\'s how many I\'ve watched rise. Conquerors, warlords, fleet captains. Three of them I liked. Two I mourned." She\'s studying the lines on her palm. "They all died the same way. Not the Wardensea. Not the Kolmari. They stopped paying attention to the small things because the big things were louder."',
        'She looks up. At you. Eighty-seven years behind twenty-five-year-old eyes.',
        '"You never asked me to watch your crew. Every other captain did. They all wanted to know who was loyal." She closes her hand. "You never asked. Don\'t start."',
      ],
      characters: ['karyudon', 'suulen'],
    },
    {
      id: 'a3_council_05b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"That\'s... weirdly threatening and also the nicest thing you\'ve ever said."',
      ],
      characters: ['karyudon', 'kovesse', 'suulen'],
    },
    {
      id: 'a3_council_05c',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"It wasn\'t nice. It was accurate."',
      ],
      characters: ['karyudon', 'kovesse', 'suulen'],
    },
    {
      id: 'a3_council_06',
      paragraphs: [
        'Delvessa hasn\'t spoken. She\'s been turning that cup the whole time, slow circles, the wet ring on the table getting wider. Everyone knows she\'s working up to something. Delvessa doesn\'t speak until the sentence is built.',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'a3_council_06b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'fear',
      paragraphs: [
        '"The revenue projections for the harbour are good."',
        'Silence.',
        '"The revenue projections are-- I\'m not--" She stops turning the cup. Sets it down too hard. Tea splashes over the rim. "I had a model. For everything. People, trade routes, wars. I could put a number on anything. That was the whole point of me."',
        'She\'s not looking at anyone. She\'s looking at the wet ring on the table where the cup used to be.',
        '"The numbers don\'t work here. I have tried. I have run every model I know and none of them explain why a captain goes back to make sure fishermen on Keldriss have enough nets. Or why his cook--" She glances at Dragghen. Catches herself. Looks away. "Why we changed an entire supply chain because dock workers weren\'t eating."',
        'She picks up the cup again. Puts it back in the ring. Takes it out. Can\'t decide where it goes.',
        '"I would rather trust something I can\'t measure than go back to the version of my life where I could measure everything and none of it mattered."',
        'She says it fast. Like if she slowed down she wouldn\'t finish.',
      ],
      characters: ['karyudon', 'delvessa'],
    },
    {
      id: 'a3_council_07',
      paragraphs: [
        'The bread is half-gone. The tea is cold. A child\'s drawing and a letter from Coppervein sit on the table between the crumbs. Vorreth is eating his piece of bread now, slowly, looking at nothing.',
        'You stand. Your chair scrapes the wall. Your horns catch the lamplight.',
      ],
      characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
      choices: [
        {
          id: 'ruler_conqueror',
          text: '"I am a Conqueror. I take what the strong refuse to share and I give it to the people who earned it."',
          consequence: 'Conqueror. Strength with purpose.',
          available: true,
          effects: [
            { type: 'flag', target: 'ruler_identity', value: 'conqueror' },
            { type: 'dominion', target: 'iron', value: 30 },
            { type: 'infamy', value: 10 },
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'loyalty', target: 'dragghen', value: -3 },
          ],
        },
        {
          id: 'ruler_liberator',
          text: '"I am not a king. I am the reason kings are not necessary. The sea belongs to the people who sail it."',
          consequence: 'Liberator. Freedom as foundation.',
          available: true,
          effects: [
            { type: 'flag', target: 'ruler_identity', value: 'liberator' },
            { type: 'dominion', target: 'king', value: 30 },
            { type: 'reputation', value: 15 },
            { type: 'loyalty', target: 'dragghen', value: 10 },
            { type: 'loyalty', target: 'delvessa', value: 3 },
          ],
        },
        {
          id: 'ruler_pragmatist',
          text: '"I am whatever these islands need me to be. Today that is a sword. Tomorrow it might be a handshake. I do what works."',
          consequence: 'Pragmatist. Whatever works.',
          available: true,
          effects: [
            { type: 'flag', target: 'ruler_identity', value: 'pragmatist' },
            { type: 'dominion', target: 'sight', value: 20 },
            { type: 'dominion', target: 'king', value: 10 },
            { type: 'resource', target: 'sovereigns', value: 500 },
            { type: 'loyalty', target: 'delvessa', value: 8 },
            { type: 'loyalty', target: 'suulen', value: 5 },
          ],
        },
      ],
    },
    {
      id: 'a3_council_08',
      paragraphs: [
        'Dragghen nods or furrows his brow. Vorreth adjusts Greysalt on the table. Kovesse types something on her tablet, the first line of a narrative that will define how the Bastion Sea remembers this moment.',
        'Then the second question. The one that has been waiting since you first heard the name.',
      ],
      characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
      choices: [
        {
          id: 'pursue_kingsrun',
          text: '"The Kingsrun. The route to the top of the world. We take it."',
          consequence: 'The Kingsrun. Legend over legacy.',
          available: true,
          effects: [
            { type: 'flag', target: 'kingsrun_pursuit', value: true },
            { type: 'dominion', target: 'iron', value: 15 },
            { type: 'dominion', target: 'sight', value: 15 },
            { type: 'infamy', value: 10 },
          ],
        },
        {
          id: 'hold_domain',
          text: '"The Kingsrun can wait. We build what we have into something that lasts."',
          consequence: 'Build institutions, not legends.',
          available: true,
          effects: [
            { type: 'flag', target: 'kingsrun_pursuit', value: false },
            { type: 'dominion', target: 'king', value: 25 },
            { type: 'reputation', value: 10 },
            { type: 'resource', target: 'materials', value: 30 },
          ],
        },
      ],
    },
    {
      id: 'a3_council_09',
      paragraphs: [
        'Final question. The practical one. Where does each of them go when the endgame plays out?',
      ],
      characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
      choices: [
        {
          id: 'deploy_together',
          text: '"Together. All of us. Whatever comes, we face it as one crew."',
          consequence: 'Together. All or nothing.',
          available: true,
          effects: [
            { type: 'flag', target: 'crew_deployment', value: 'together' },
            { type: 'dominion', target: 'iron', value: 10 },
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'loyalty', target: 'kovesse', value: 5 },
          ],
        },
        {
          id: 'deploy_strategic',
          text: '"Vorreth and Delvessa with me. Dragghen holds the islands. Suulen runs the network. Kovesse controls the narrative."',
          consequence: 'Distributed. Each where they\'re strongest.',
          available: true,
          effects: [
            { type: 'flag', target: 'crew_deployment', value: 'strategic' },
            { type: 'dominion', target: 'sight', value: 10 },
            { type: 'dominion', target: 'king', value: 10 },
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'loyalty', target: 'delvessa', value: 5 },
          ],
        },
      ],
    },
    {
      id: 'a3_council_10',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'The council doesn\'t end. It dissolves. Dragghen stacks the plates. Kovesse pockets the drawing alongside her tablet. Vorreth picks up Greysalt, holds it, testing the balance, and slides it back into the sheath. Suulen is already gone. The window is open. You didn\'t see her leave.',
        'Delvessa is last. She stops in the doorway. One hand on the frame.',
        '"Karyudon."',
        'She says your name like she\'s testing how it sounds now, after everything.',
        '"Get some sleep."',
        'The door closes. You sit alone with a table full of breadcrumbs and cold tea and a child\'s drawing and the silence that comes after people tell you the truth.',
        'Tomorrow, the endgame. Tomorrow, the Sea decides whether you were right or just lucky.',
        'Tonight, the quiet. Hold it. It doesn\'t come back.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'final_council_complete', value: true },
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'THE FINAL COUNCIL',
      message: 'Crew identity finalized. All hands informed. Operational stance updated.',
    }},
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};

// =============================================
// SCENE 6: GODTIDE
// =============================================
// The ending. Standing above the Bastion Sea.
// Summary of what was built. The door stays open.
// =============================================

export const act3EndingScene: StoryScene = {
  id: 'act3_ending',
  title: 'GODTIDE',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
  beats: [
    {
      id: 'a3_ending_01',
      title: 'GODTIDE',
      paragraphs: [
        'Morning.',
        'You climb the signal tower at the top of Vess Harbour. The highest point on the highest island you own. Two hundred feet of stone steps, spiralling up through a tower that the Wardensea built to watch for enemies.',
        'Now you stand where the watchmen stood and look out at what you built.',
      ],
    },
    {
      id: 'a3_ending_02',
      paragraphs: [
        'The Bastion Sea spreads below you. North to south, the islands trace a spine of stone and green, harbour lights scattered through water that is every shade of grey and blue the world has to offer.',
        'Tavven Shoal, where it started. A prison transport. A stolen fruit. A man with nothing who decided to have everything.',
        'Keldriss. Coppervein. Sorrens Flat. Anvil Cay. Mirrorwater. The Central Belt, five islands that had been taxed and bled dry by people who never set foot on their docks. Five islands that fly your flag now because you gave them something the Wardensea never did: a reason to.',
        'Windrow. Ghostlight Reef. The southern arc, the stepping stones to the fortress where you now stand.',
        'And Vess Harbour itself. The Wardensea\'s crown jewel. The seat of Admiral Vasshen\'s power. The fortress that was supposed to be the wall that stopped everything like you.',
        'The wall fell. You are still standing.',
      ],
    },
    {
      id: 'a3_ending_03',
      paragraphs: [
        'The Wardensea is broken. Not destroyed, broken. Vasshen\'s First Division is scattered across three anchorages, licking wounds that will take months to heal. The officers who survived are filing reports that nobody in command wants to read, because the reports all say the same thing: he was stronger than we calculated.',
        'They will rebuild. They always rebuild. But they will rebuild around the knowledge that the Bastion Sea has a new power in it, and that power has horns, a spiked war club, and a crew of five who would burn the world down before they let it be caged again.',
      ],
    },
    {
      id: 'a3_ending_04',
      paragraphs: [
        'The Conquerors are recalculating. Five Seats, five captains, forty years of defiance, and none of them did what you did in six months. The balance has shifted. Whether they sit at your table or sharpen their knives, they will never look at the Bastion Sea the same way.',
        'The Kolmari are quiet. Their Ironclad is gone, destroyed or captured, depending on the choices you made, and the silence from their boardrooms is the silence of people rewriting their financial models to account for a variable that should not exist.',
        'You should not exist. An Oni, escaped from a prison transport, with no fleet and no army and no name worth knowing.',
      ],
    },
    {
      id: 'a3_ending_05',
      paragraphs: [
        'Below, on the docks, your crew moves through the morning routine. Routines. The kind of thing that means permanence.',
        'Dragghen is in the harbour kitchen, feeding dock workers and captured sailors alike because Dragghen does not distinguish between people who deserve to eat. They all do. The smell of his cooking rises up the tower like a promise.',
        'Kovesse is in the signals room, rewiring the Wardensea\'s communication array into something louder and far more chaotic. She has not slept in two days and she is happy about it. The Grimoire feed pulses with stories about what happened here, and every one of them has her fingerprints.',
        'Suulen is gone. She left before dawn. Nobody saw her go. Her network stretches across the Bastion Sea like a web made of whispers, and somewhere in those whispers is the next threat, the next opportunity, the next piece of the picture that only she can see.',
        'Vorreth is on the battlements, training the harbour garrison. Not his garrison. Yours. But he trains them the way the Wardensea trained him, because some things are worth keeping even when you burn the institution they came from.',
      ],
    },
    {
      id: 'a3_ending_06',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'And Delvessa.',
        'Delvessa is climbing the signal tower. You hear her footsteps on the stone, precise, measured. She reaches the top. Stands beside you. The wind off the harbour pulls at her hair, and she lets it.',
        'She does not speak for a long time. She looks at the sea. At the islands. At the ships. At everything you built together while pretending it was just strategy.',
        '"The revenue projections are good."',
        'You look at her.',
        '"The revenue projections."',
        '"Yes. They are good. I thought you should know."',
        'You laugh. The sound carries out over Vess Harbour and the dock workers look up and the sailors stop what they are doing because the Oni on the tower is laughing, and when Karyudon laughs, the whole harbour knows it.',
        'Delvessa watches you laugh. The corner of her mouth moves. Holds.',
      ],
    },
    {
      id: 'a3_ending_07',
      paragraphs: [
        'The tide comes in. The water rises against the harbour walls, fills the channels, lifts the ships at anchor. The morning light turns the Bastion Sea gold.',
        'The historians will get it wrong. They always do. They will sand down the edges, polish the mess, make it sound inevitable. They will say you were destined for this. They will leave out the parts where you were broke, hungry, arguing about supply chains at two in the morning.',
        'It was five people in a stolen ship with bad odds and worse manners, held together by cooking and stubbornness and loyalty that nobody had the sense to put in a contract.',
        'But it worked. Against every calculation, every model, every precedent in the Bastion Sea\'s long and bloody history, it worked.',
        'You are still here. Your crew is still here. Your islands are still here.',
        'And the sea, the whole vast, grey, beautiful, terrible sea, is yours.',
      ],
    },
    {
      id: 'a3_ending_08',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You stand on the tower. The wind is cold. The Danzai is warm on your back. Delvessa is beside you. The crew is below. The Bastion Sea is in front of you.',
        'Somewhere north, past the Conqueror waters, past the Wardensea\'s diminished patrols, past the edge of every map Delvessa has drawn, the Kingsrun waits. The route nobody has completed in a hundred years. The path to the top of the world.',
        'But that is tomorrow\'s problem. Today, you have a harbour to run, a crew to feed, and a reputation to maintain. Today, you are exactly where you are supposed to be.',
        'You look at Delvessa. She looks at you. Neither of you speaks.',
        'You turn back to the sea. Take a breath. The salt air fills your lungs. The harbour hums below you. The world stretches out in every direction, Unclaimed. Full of things that have not been fought for yet.',
        '"Alright," you say, to nobody in particular, to everybody at once. "What\'s next?"',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'game_complete', value: true },
    { type: 'flag', target: 'act3_complete', value: true },
    { type: 'reputation', value: 20 },
    { type: 'dominion', target: 'king', value: 50 },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'GODTIDE',
      message: 'The Bastion Sea is yours. The Wardensea is broken. The Conquerors are answered. The Kolmari are silent. Whatever comes next, the Kingsrun, the wider world, the future you have not yet imagined, it starts here. It starts with you.',
    }},
  ],
  currentBeat: 0,
};
