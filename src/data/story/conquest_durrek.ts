import { StoryScene } from '../../types/game';

export const durrekConquestScene: StoryScene = {
  id: 'conquest_durrek_garrison',
  title: 'DURREK - THE GARRISON FALLS',
  beats: [
    {
      id: 'durrek_assault_01',
      title: 'DAWN',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'You attack at dawn. Vorreth wanted to go at night.',
        '"If we attack at dawn," Vorreth argues, "they\'ll see us approach. They\'ll have time to form up. They\'ll--"',
      ],
    },
    {
      id: 'durrek_assault_01b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Good."',
      ],
    },
    {
      id: 'durrek_assault_01c',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Good?"',
      ],
    },
    {
      id: 'durrek_assault_01d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Drezh knows we\'re in the area. He knows we\'re coming. Darkness buys us thirty minutes of confusion. Dawn buys us six hundred marines who have to watch us walk up the dock. Half of them will be making decisions about their careers before we hit the shield wall."',
      ],
    },
    {
      id: 'durrek_assault_01e',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa looks at Vorreth. "He\'s not going to change his mind."',
      ],
    },
    {
      id: 'durrek_assault_01f',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"I know." Vorreth draws his sword. "Then we do it his way. And we make it count."',
      ],
    },
    {
      id: 'durrek_assault_02',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen maps the approach. There\'s a shallow reef passage that bypasses the chain boom, too narrow for warships, but your vessel is small enough. "Two minutes of exposure to the cannon emplacements," she says. "After that, the angle protects us."',
      ],
    },
    {
      id: 'durrek_assault_02b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse rigs a signal jammer. "I can disrupt their Grimoire communications for about ten minutes. After that, their backup frequencies will compensate. But ten minutes without coordination is ten minutes of chaos."',
      ],
    },
    {
      id: 'durrek_assault_02c',
      paragraphs: [
        'Dragghen sharpens the Danzai spikes. He doesn\'t speak while he works.',
      ],
    },
    {
      id: 'durrek_assault_02d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa has the logistics. "The garrison\'s supply ship is due tomorrow. If we attack before it arrives, they\'re fighting on yesterday\'s rations. It\'s not decisive, but it\'s an edge."',
      ],
    },
    {
      id: 'durrek_assault_02e',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth looks at the map one final time. "I know this garrison. I know what Drezh will do. The marines will form a shield wall on the dock. That\'s standard. Drezh will direct from the second-level balcony. We need to break the wall, reach the balcony, and force Drezh to surrender or fight personally."',
      ],
      choices: [
        {
          id: 'durrek_frontal',
          text: '"I\'m going through the shield wall. Personally. Let them try to hold it."',
          consequence: 'The Oni way. Break the formation.',
          available: true,
          effects: [
            { type: 'flag', target: 'durrek_assault_style', value: 'frontal' },
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'loyalty', target: 'kovesse', value: 8 },
          ],
        },
        {
          id: 'durrek_flanking',
          text: '"Suulen takes the south wall during the briefing gap. I hit the dock. Vorreth takes the armory. Three-pronged."',
          consequence: 'Tactical. Divide and hit from three sides.',
          available: true,
          effects: [
            { type: 'flag', target: 'durrek_assault_style', value: 'flanking' },
            { type: 'loyalty', target: 'vorreth', value: 10 },
            { type: 'loyalty', target: 'suulen', value: 5 },
          ],
        },
        {
          id: 'durrek_chaos',
          text: '"Kovesse, can you broadcast our attack live? Every Grimoire channel in the Bastion Sea?"',
          consequence: 'Make it a show. The world watches.',
          available: true,
          effects: [
            { type: 'flag', target: 'durrek_assault_style', value: 'broadcast' },
            { type: 'loyalty', target: 'kovesse', value: 15 },
            { type: 'infamy', value: 5 },
            { type: 'bounty', value: 10000000 },
          ],
        },
      ],
    },
    {
      id: 'durrek_assault_03',
      title: 'THE DOCK',
      paragraphs: [
        'The shield wall breaks on the fourth hit.',
        'You don\'t remember the first three. They\'re a blur of Iron and impact, the sound of metal bending. The Danzai goes through the formation like a fist through paper. Wardensea shields are designed for human opponents. They are not designed for what you are.',
        'Dragghen fights beside you. He doesn\'t have technique. He has mining-strength and a copper-weighted hammer he swings with both hands. The marine who catches it remembers exactly nothing.',
        'Suulen appears on the wall like she grew from the stone. Marines turn. Wrong move. Turning away from an Oni is a mistake you only make once.',
        'Vorreth moves through the garrison corridors with the ease of someone walking through their old house. He knows where every door leads. He knows what every room contains. He locks the armory from the inside. No reinforcements from the weapons cache.',
        'And Kovesse, Kovesse is broadcasting everything. The entire Bastion Sea watches as the Wardensea flag above Durrek trembles in the wind.',
      ],
    },
    {
      id: 'durrek_assault_04',
      title: 'THE COMMANDER',
      speaker: 'captain_drezh',
      speakerName: 'Captain Drezh',
      paragraphs: [
        'Captain Drezh meets you on the command balcony.',
        'He\'s not hiding. He\'s not running. He stands in full dress uniform with a blade at his side and the Wardensea cross on his chest, and he waits for you to climb the stairs.',
        '"Karyudon."',
      ],
    },
    {
      id: 'durrek_assault_04b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Drezh."',
      ],
    },
    {
      id: 'durrek_assault_04c',
      speaker: 'captain_drezh',
      speakerName: 'Captain Drezh',
      paragraphs: [
        '"Your deserter told you about me."',
      ],
    },
    {
      id: 'durrek_assault_04d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Vorreth told me you\'re competent and disciplined."',
      ],
    },
    {
      id: 'durrek_assault_04e',
      speaker: 'captain_drezh',
      speakerName: 'Captain Drezh',
      paragraphs: [
        '"He was competent too. Before he lost his nerve." Drezh draws his sword. Clean steel, well-maintained, regulation-length. Everything about this man is regulation. "You\'ve broken my shield wall. You\'ve disrupted my communications. Your Morventhi is on my walls and your engineer is broadcasting my garrison\'s defeat to the world."',
      ],
    },
    {
      id: 'durrek_assault_04f',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Sounds about right."',
      ],
    },
    {
      id: 'durrek_assault_04g',
      speaker: 'captain_drezh',
      speakerName: 'Captain Drezh',
      paragraphs: [
        '"But you haven\'t taken Durrek. You\'ve damaged it." He raises his blade. "Durrek falls when I say it falls. Not before."',
      ],
    },
    {
      id: 'durrek_assault_04h',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You raise the Danzai.',
        '"Then let\'s find out when you say it."',
      ],
      choices: [
        {
          id: 'durrek_fight_drezh',
          text: 'Raise the Danzai. End this.',
          consequence: 'End this.',
          available: true,
          effects: [
            { type: 'combat', target: 'durrek_assault', value: true },
          ],
        },
      ],
    },
    {
      id: 'durrek_assault_05',
      title: 'THE FLAG COMES DOWN',
      speaker: 'captain_drezh',
      speakerName: 'Captain Drezh',
      paragraphs: [
        'The garrison flag comes down at noon.',
        'Not because you tore it down. Because Drezh lowered it himself. He limps to the flagpole with three broken ribs and a split lip, and he folds it with military precision. Every crease perfect. Every fold regulation.',
        '"Garrison Durrek stands down." His voice carries across the broken dock, over the scattered marines, through the damaged walls. "Effective immediately. By authority of--" He pauses. Looks at you. "By necessity."',
      ],
    },
    {
      id: 'durrek_assault_05b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'Vorreth watches from the armory doorway.',
        'You plant the Danzai in the command balcony floor. The stone cracks. A new flag won\'t fly here, not yet. For now, the empty flagpole is enough. Everyone in the Northern Arc will know what it means.',
        '"Captain Drezh." You extend a hand. He stares at it. "Your garrison fought well."',
      ],
    },
    {
      id: 'durrek_assault_05c',
      speaker: 'captain_drezh',
      speakerName: 'Captain Drezh',
      paragraphs: [
        '"Don\'t patronize me, pirate."',
      ],
    },
    {
      id: 'durrek_assault_05d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I\'m not patronizing. I\'m recruiting." You keep the hand extended. "You\'re competent and disciplined. I could use that."',
      ],
      choices: [
        {
          id: 'durrek_spare_drezh',
          text: '"You can stay. Run the garrison under my flag. Or leave, your choice."',
          consequence: 'Mercy. Pragmatism.',
          available: true,
          effects: [
            { type: 'reputation', value: 10 },
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'loyalty', target: 'delvessa', value: 5 },
            { type: 'flag', target: 'drezh_spared', value: true },
          ],
        },
        {
          id: 'durrek_imprison_drezh',
          text: '"You fought against me. That takes courage. But Durrek is mine now. You\'ll be confined until I decide what to do with you."',
          consequence: 'Firm. Confined until further notice.',
          available: true,
          effects: [
            { type: 'infamy', value: 5 },
            { type: 'loyalty', target: 'vorreth', value: -5 },
            { type: 'flag', target: 'drezh_imprisoned', value: true },
          ],
        },
        {
          id: 'durrek_humiliate_drezh',
          text: '"Kneel. In front of your marines. In front of the cameras. Let the world see."',
          consequence: 'Cruelty. Make a statement.',
          available: true,
          effects: [
            { type: 'infamy', value: 12 },
            { type: 'bounty', value: 10000000 },
            { type: 'loyalty', target: 'kovesse', value: 10 },
            { type: 'loyalty', target: 'vorreth', value: -20 },
            { type: 'loyalty', target: 'dragghen', value: -8 },
            { type: 'flag', target: 'drezh_humiliated', value: true },
          ],
        },
      ],
    },
    {
      id: 'durrek_assault_06',
      title: 'THE NORTHERN ARC',
      paragraphs: [
        'By evening, the word is out. Every Grimoire channel. Every trade vessel. Every Wardensea command post.',
        'Durrek Garrison, the Iron Gate of the Northern Arc, belongs to Karyudon.',
      ],
    },
    {
      id: 'durrek_assault_06b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa runs the numbers. "The garrison\'s supply chains include trade routes to seven merchant vessels on regular rotation. We now control the primary chokepoint for all Northern Arc shipping. This isn\'t just a fortress. It\'s the key to the entire region."',
      ],
    },
    {
      id: 'durrek_assault_06c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen cooks dinner in the garrison kitchen. Three times the size of the ship\'s galley. He opens every cabinet, runs his hand along the iron stove top, and says nothing for a full minute.',
        '"I could feed an army in here."',
      ],
    },
    {
      id: 'durrek_assault_06d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Good. Because that\'s what we\'re building."',
      ],
    },
    {
      id: 'durrek_assault_06e',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen has already mapped the garrison\'s observation network. "From the tower, we can see incoming vessels from forty miles. Combined with Keldriss intelligence, we have complete coverage of the Northern Arc."',
      ],
    },
    {
      id: 'durrek_assault_06f',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'Kovesse\'s stream hit twenty-three thousand concurrent viewers during the assault. The number is still climbing.',
        'You stand on the command balcony as the sun sets over the Bastion Sea. The empty flagpole catches the last light.',
        '"Vorreth."',
      ],
    },
    {
      id: 'durrek_assault_06g',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Karyudon."',
      ],
    },
    {
      id: 'durrek_assault_06h',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You said this was just a stone from a mountain."',
      ],
    },
    {
      id: 'durrek_assault_06i',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'He stands beside you. Doesn\'t answer for a long time. He\'s looking at the garrison he deserted.',
        '"The Wardensea will mobilize the First Division," he says. "Within the week. They\'ll blockade the Northern Arc and cut our supply lines." He turns from the view. "We need to talk about Sorrens."',
      ],
    },
  ],
  onComplete: [
    { type: 'conquer', target: 'durrek_garrison', value: true },
    { type: 'flag', target: 'durrek_conquered', value: true },
    { type: 'bounty', value: 25000000 },
    { type: 'resource', target: 'materials', value: 20 },
    { type: 'resource', target: 'intelligence', value: 15 },
    { type: 'resource', target: 'sovereigns', value: 200 },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: '⚔️ DURREK GARRISON - CONQUERED',
      message: 'Durrek Garrison secured. Northern Arc trade routes now under Renegade control. Garrison marines disarmed and confined. First Division mobilization expected within days.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: '🚨 WARDENSEA PRIORITY ALERT',
      message: 'Garrison Durrek has fallen. All Northern Arc commands: code black. First Division has been mobilized. The fugitive Karyudon is now classified as a primary territorial threat. Bounty reassessment pending.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - THE BASTION SEA CHANGES',
      message: 'A Wardensea garrison has fallen for the first time in seventeen years. The Oni Renegade Karyudon\'s crew broadcast the entire assault. The Conqueror Lieutenants are recalculating. The Wardensea has mobilized the First Division.',
    }},
    { type: 'dominion', target: 'iron', value: 30 },
    { type: 'dominion', target: 'sight', value: 15 },
    { type: 'dominion', target: 'king', value: 25 },
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};
