import { StoryScene } from '../../types/game';

export const anvilCayConquestScene: StoryScene = {
  id: 'conquest_anvil_cay',
  title: 'ANVIL CAY - THE IRON FALLS',
  beats: [
    {
      id: 'anvil_conquest_01',
      title: 'IRON NIGHT',
      paragraphs: [
        'The water is warm. Not warm like a bath, warm like blood. Like the sea itself is running a fever.',
      ],
    },
    {
      id: 'anvil_conquest_01b',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen sits at the bow of the longboat, one hand trailing the surface, reading the thermal currents with the same quiet certainty other people use to read street signs. "Vent cluster ahead. Thirty meters. We go left or we boil."',
      ],
    },
    {
      id: 'anvil_conquest_01c',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Left," Vorreth confirms. He hasn\'t looked up from the geological survey in twenty minutes. The paper is damp with condensation and his own sweat, but he traces the tunnel routes with a finger that doesn\'t waver. "The southern tube opens into a natural cavern beneath the dock facility. Conqueror engineers widened it for supply access three years ago. They sealed it after the last inspection cycle, but the grating is iron, not reinforced."',
      ],
    },
    {
      id: 'anvil_conquest_01d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Iron." You flex your grip on the Danzai. The volcanic heat has made the weapon warm in your hands. "I can work with iron."',
      ],
    },
    {
      id: 'anvil_conquest_01e',
      paragraphs: [
        'Steam rises from vents in the sea floor, pale columns that catch the moonlight and dissolve into the dark. The volcanic rock on either side glows faintly orange where magma channels run close to the surface. Dragghen\'s stone-grey skin looks like cooling metal. Delvessa\'s glasses reflect twin points of amber light. Kovesse is quiet for once, her ears flat, her broadcast rig powered down.',
        'You enter the lava tube.',
        'The world narrows to stone and heat, the sound of water lapping against volcanic glass. The ceiling drops. Dragghen has to duck. You don\'t. Your horns scrape the rock with a sound like a blade being drawn.',
        'Sulfur burns in the back of your throat. The air is thick, mineral, alive with the deep-earth stink of a volcano that hasn\'t decided whether it\'s sleeping or dying. Somewhere below, magma moves. You can feel it through the hull of the longboat: a low vibration, patient and enormous.',
        'Vorreth signals a halt. Points upward. Through a crack in the tube ceiling: firelight. The glow of forges. The underside of Anvil Cay\'s shipyard, lit from above by industry that never sleeps.',
        'Your hands are steady on the Danzai. The iron spikes are warm from the volcanic heat. So is the rock. So is the water. Everything down here runs hot.',
      ],
    },
    {
      id: 'anvil_conquest_02',
      title: 'THE BREACH',
      paragraphs: [
        'The tube opens into a natural cavern, just like Vorreth said. The iron grating above is bolted to volcanic rock, already rusted by the sulfuric air. Beyond it: the southern dock facility. Supply crates. Loading cranes. And two sentries walking a lazy patrol under lamplight, their Conqueror uniforms dark against the glow of the distant forges.',
        'Delvessa counts silently. Holds up two fingers. Points left, a third guard, sitting on a crate, half-asleep. Then she taps her temple. Grimoire relay. A squat metal tower on the dock\'s east edge, its antenna blinking in steady intervals. That\'s the communication line to the main garrison.',
      ],
    },
    {
      id: 'anvil_conquest_02b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth studies the sentries. "Standard two-man roving patrol. Four-minute cycle. The third is a dock watcher, civilian contractor, not military. He\'ll run before he fights."',
      ],
    },
    {
      id: 'anvil_conquest_02c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"And the relay?" Kovesse whispers, already eyeing it.',
      ],
    },
    {
      id: 'anvil_conquest_02d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Hardlined to the command center. Kill it and Gharen loses real-time coordination with the outer defenses for at least six minutes. Maybe eight if their backup is on the secondary frequency I think it is."',
        'Everyone looks at you. The iron grating is the only thing between your crew and the Conqueror\'s forward base.',
      ],
      choices: [
        {
          id: 'anvil_silent_breach',
          text: '"Vorreth takes the sentries. Quiet and clean. We don\'t exist until I say we do."',
          consequence: 'Silent. Surgical.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 8 },
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'flag', target: 'anvil_silent_breach', value: true },
          ],
        },
        {
          id: 'anvil_comms_cut',
          text: '"Kovesse, kill the relay first. I want Gharen deaf and blind before he knows we\'re here."',
          consequence: 'Deaf and blind. Then we move.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 6 },
            { type: 'resource', target: 'intelligence', value: 8 },
            { type: 'infamy', value: 2 },
            { type: 'flag', target: 'anvil_comms_cut', value: true },
          ],
        },
        {
          id: 'anvil_front_assault',
          text: '"Front door."',
          consequence: 'Front door. Loud.',
          available: true,
          effects: [
            { type: 'infamy', value: 5 },
            { type: 'reputation', value: 4 },
            { type: 'bounty', value: 20000000 },
            { type: 'loyalty', target: 'vorreth', value: -3 },
            { type: 'flag', target: 'anvil_front_assault', value: true },
          ],
        },
      ],
    },
    {
      id: 'anvil_conquest_03',
      title: 'THE LIEUTENANT',
      paragraphs: [
        'Iron walls. Iron doors. Iron decorations bolted to every surface, the Conqueror insignia repeated in obsessive detail, hammered into metal plates that line the corridor.',
        'You kick the door open. It doesn\'t break. It bends. Good iron. Conqueror iron.',
        'Fleet Lieutenant Gharen stands behind the war table.',
        'He\'s smaller than you expected. Five-ten, maybe five-eleven, with the lean build of a man who runs before he eats and fights before he runs. Dark hair cut to regulation length. His uniform bears more iron than fabric: rank pins, campaign markers, the double-anchor insignia of a Bastion Fleet command officer. His sword is already drawn. He was waiting.',
        'His eyes don\'t land on you first. They land on Vorreth.',
      ],
    },
    {
      id: 'anvil_conquest_03b',
      speaker: 'gharen',
      speakerName: 'Fleet Lieutenant Gharen',
      paragraphs: [
        '"Commandant Daaz." The word drops like a verdict. "Or should I say, deserter Daaz."',
      ],
    },
    {
      id: 'anvil_conquest_03c',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth steps forward. His hand rests on his blade but doesn\'t draw. "Lieutenant. Still following orders that shouldn\'t be given."',
      ],
    },
    {
      id: 'anvil_conquest_03d',
      speaker: 'gharen',
      speakerName: 'Fleet Lieutenant Gharen',
      paragraphs: [
        '"I follow the orders that hold the Bastion Sea together. You abandoned yours because holding things together got difficult." Gharen\'s lip curls. "I read your file, Daaz. Thirty-seven commendations. Twelve years of service. And you threw it away to follow--" His eyes finally move to you. "--an Oni renegade with a bounty and a death wish."',
      ],
    },
    {
      id: 'anvil_conquest_03e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You lean the Danzai against your shoulder. The volcanic heat has made the iron spikes almost glow.',
        '"No death wish, Lieutenant. I want the shipyard, the dry docks, the intelligence in this command center, and the forge. Specifically the forge. You built a fleet production facility on a volcanic vent and staffed it with people who\'d rather go home. I can use all of it."',
      ],
    },
    {
      id: 'anvil_conquest_03f',
      speaker: 'gharen',
      speakerName: 'Fleet Lieutenant Gharen',
      paragraphs: [
        'Gharen\'s fingers tighten on his sword. Behind him, eight Bastion Marines form up.',
        '"You\'re welcome to try," he says.',
      ],
      choices: [
        {
          id: 'anvil_direct_fight',
          text: '"Danzai does the talking now."',
          consequence: 'No words. Iron.',
          available: true,
          effects: [
            { type: 'flag', target: 'anvil_direct_fight', value: true },
            { type: 'combat', target: 'anvil_cay_assault', value: true },
          ],
        },
        {
          id: 'anvil_intimidated_first',
          text: '"Surrender the shipyard, Lieutenant. You\'re outmatched and you know it."',
          consequence: 'Demand surrender. Voice first.',
          available: true,
          effects: [
            { type: 'infamy', value: 3 },
            { type: 'reputation', value: 2 },
            { type: 'flag', target: 'anvil_intimidated_first', value: true },
            { type: 'combat', target: 'anvil_cay_assault', value: true },
          ],
        },
        {
          id: 'anvil_vorreth_leads',
          text: '"Vorreth. He\'s yours."',
          consequence: 'Personal. Vorreth\'s fight.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 10 },
            { type: 'flag', target: 'anvil_vorreth_leads', value: true },
            { type: 'combat', target: 'anvil_cay_assault', value: true },
          ],
        },
      ],
    },
    {
      id: 'anvil_conquest_04',
      title: 'THE SPOILS',
      paragraphs: [
        'The command center smells like blood and hot iron.',
        'Gharen is down. Not dead. You don\'t kill competent men when you can collect them. He sits against the war table with his sword arm hanging wrong and his grey eyes already planning. Even beaten.',
        'Three dry docks. Two of them holding half-built patrol vessels, fast, armored, with iron-reinforced hulls that could take cannon fire and keep moving. The third dock is empty, its cradle waiting for something bigger. Something that was never finished.',
        'A weapons forge. Still burning. The coals glow white-orange and the anvils, the real anvils, the ones that gave this island its name, stand in a row. Hammers hang from wall racks. Molds for sword blanks, cannon components, chain links, hull plates. This isn\'t a blacksmith shop. This is an industrial weapons facility.',
        'Delvessa is already at the intelligence cache. Papers. Charts. Deployment schedules. Fleet patrol routes.',
      ],
    },
    {
      id: 'anvil_conquest_04b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"The shipyard alone is worth more than every territory in the Northern Arc combined." She doesn\'t look up. Her pen moves across a ledger, cataloging. "Three dry docks. Active weapons forge. Material stockpiles sufficient for six months of production. And these--" She holds up a sheaf of papers. "--are Conqueror fleet movements for the next quarter. Patrol rotations. Supply chain logistics. Officer assignments."',
      ],
    },
    {
      id: 'anvil_conquest_04c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"How current?"',
      ],
    },
    {
      id: 'anvil_conquest_04d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Updated four days ago. Gharen was thorough."',
      ],
    },
    {
      id: 'anvil_conquest_04e',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen returns from the garrison pantry. One eyebrow slightly raised.',
        '"They eat well, I\'ll give them that." He sets down a crate of provisions on the war table. "Smoked meats. Preserved fruits. Three varieties of rice. A spice rack that would make a Kolmari merchant weep." He pauses. "I found a wine cellar."',
      ],
    },
    {
      id: 'anvil_conquest_04f',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Conqueror officers don\'t suffer."',
      ],
    },
    {
      id: 'anvil_conquest_04g',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"No. They don\'t." He looks at the crate. Looks away. "I can feed the entire garrison population with what\'s in that pantry. And I will."',
      ],
    },
    {
      id: 'anvil_conquest_04h',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"PEOPLE OF THE BASTION SEA--" Kovesse\'s broadcast cuts through the night. She\'s found the garrison\'s own Grimoire amplifier, ten times more powerful than her portable rig, and she\'s commandeered it. "THE IRON FALLS! KARYUDON TAKES ANVIL CAY! THE CONQUEROR SHIPYARD IS UNDER NEW MANAGEMENT!"',
        'Kovesse\'s broadcast will reach every Grimoire receiver in the Bastion Sea by morning. More enemies, less sleep, and a forge that needs to be operational by the time someone comes to take it back.',
      ],
    },
    {
      id: 'anvil_conquest_05',
      title: 'THE FORGE BURNS',
      paragraphs: [
        'The forge still burns.',
        'Orange light on everything. The volcanic heat beneath Anvil Cay feeds the furnaces through natural vents. The Conquerors didn\'t build the forge so much as channel what was already there. A volcano that wants to make things. All they did was give it direction.',
        'You stand in the command center. The Conqueror war table is yours now. Iron-framed, bolted to the floor, covered in charts and markers that told the story of Gharen\'s control over the Central Belt. You sweep the markers aside.',
      ],
    },
    {
      id: 'anvil_conquest_05b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth arrives first. He\'s cleaned the blood from his blade but not from his knuckles. "Garrison security protocols are standard Conqueror tier-three. I\'ve already changed the access codes. More importantly, Gharen\'s intelligence files include fleet movement projections through the end of the season. Patrol schedules. Supply routes. Officer rotations." He sets a leather folder on the table. "Vassago\'s fleet is spread thin. He\'s holding too many islands with too few ships. Anvil Cay was supposed to be the production center that solved that problem."',
      ],
    },
    {
      id: 'anvil_conquest_05c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Was."',
      ],
    },
    {
      id: 'anvil_conquest_05d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Was."',
      ],
    },
    {
      id: 'anvil_conquest_05e',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen materializes from a shadow that shouldn\'t have been large enough to hide a Morventhi. "The volcanic tunnel network is extensive. I\'ve mapped seven viable routes: four connect to the southern coast, two to the eastern ridge, one loops back to the thermal vents where we entered. Emergency extraction, supply smuggling, or a second invasion route if someone tries to take this island back." Her silver eyes catch the forge-light. "They won\'t find us easy to uproot."',
      ],
    },
    {
      id: 'anvil_conquest_05f',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse is practically vibrating. "Captain. CAPTAIN. The Grimoire amplifier on this base has a broadcast range of four hundred miles. Four. Hundred. Miles. I can reach every island in the Central Belt and half the Northern Arc from this room. The viewer count is still climbing. We broke a hundred thousand during the initial broadcast." Her ears are straight up, her tail lashing. "The Renegade network isn\'t whispering anymore. It\'s SCREAMING."',
      ],
    },
    {
      id: 'anvil_conquest_05g',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen sets a plate of food on the war table. Hot rice. Smoked fish. Some kind of pepper sauce that smells like it could strip paint.',
        '"The forge workers are locals. Pressed into service by the Conquerors, not volunteers. I\'ve spoken with their foreman." He crosses his arms. "They\'re relieved. Not hostile. Most of them are metalworkers by trade. Good people who got conscripted into building warships for a fleet they hate." He meets your eyes. "Treat them right, Captain. They\'ll build for us because they want to. Not because they have to."',
      ],
    },
    {
      id: 'anvil_conquest_05h',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"They\'ll be treated right. That\'s not negotiable."',
        'Dragghen nods. Once.',
      ],
    },
    {
      id: 'anvil_conquest_05i',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'The crew disperses. The command center empties.',
        'Not entirely.',
        'Delvessa finds you at the forge observation point, a reinforced window that looks out over the main furnace hall. Below, the coals glow white-orange. The heat radiates through the glass.',
        'She stands beside you. Close enough that you can smell ink and sea salt.',
        '"You just declared war on the most powerful military force in the Bastion Sea."',
      ],
    },
    {
      id: 'anvil_conquest_05j',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You watch the forge.',
        '"I declared war on them the day I broke my chains."',
      ],
    },
    {
      id: 'anvil_conquest_05k',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'The forge crackles below. Somewhere in the distance, Kovesse\'s broadcast echoes off the volcanic cliffs.',
        '"I know." Her voice is different. Not the strategist. "I just wanted to hear you say it."',
        'You look at her. She holds the look. She doesn\'t adjust her glasses.',
      ],
    },
    {
      id: 'anvil_conquest_05l',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Karyudon." Vorreth\'s voice from the command center doorway. "Grimoire intercept. Conqueror patrol vessel changing course, heading this direction. We need to discuss defense rotations."',
      ],
    },
    {
      id: 'anvil_conquest_05m',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa adjusts her glasses. Turns from the window.',
        '"Get some rest, Captain." She pauses in the doorway. Doesn\'t look back. "Tomorrow we start building."',
        'The forge burns below you. Tomorrow you build.',
      ],
    },
  ],

  onComplete: [
    { type: 'conquer', target: 'anvil_cay', value: true },
    { type: 'flag', target: 'anvil_cay_conquered', value: true },
    { type: 'resource', target: 'materials', value: 100 },
    { type: 'resource', target: 'intelligence', value: 25 },
    { type: 'resource', target: 'sovereigns', value: 200 },
    { type: 'reputation', value: 20 },
    { type: 'infamy', value: 8 },
    { type: 'bounty', value: 35000000 },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE WILDFIRE - ANVIL CAY FALLS',
      message: 'BREAKING: Renegade captain Karyudon has seized Anvil Cay, a Conqueror military installation. The Bastion Fleet shipyard is now under Renegade control. Fleet Lieutenant Gharen defeated. Vassago\'s response expected within days. The Central Belt is in upheaval.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'DELVESSA GHAL - Strategic Impact Assessment',
      message: 'Anvil Cay changes everything. The shipyard gives us military production capability. The intelligence cache gives us Conqueror fleet movements for the next three months. We just did what nobody thought possible. Recommended priority: fortify immediately. Vassago will not let this stand.',
    }},
    { type: 'dominion', target: 'iron', value: 35 },
    { type: 'dominion', target: 'sight', value: 20 },
    { type: 'dominion', target: 'king', value: 30 },
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};
