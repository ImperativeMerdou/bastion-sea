import { StoryScene } from '../../types/game';

export const crewArgumentScene: StoryScene = {
  id: 'crew_argument',
  title: 'THE FRACTURE',
  nextSceneId: 'night_watch',
  characters: ['karyudon', 'delvessa', 'vorreth', 'dragghen', 'kovesse'],
  beats: [
    {
      id: 'argument_01',
      title: 'THE LINE',
      paragraphs: [
        'It starts over a map.',
        'Delvessa has pinned a chart of the Bastion Sea to the galley wall. Trade routes in blue. Wardensea patrol patterns in grey. Kolmari credit networks in green. She\'s drawn a red circle around Tavven Shoal and three arrows pointing outward. Expansion vectors. Where the money goes next.',
        'Vorreth is standing across the table. Arms folded. The tally marks on his forearms catching lamplight. He hasn\'t said anything yet. That\'s how you know.',
      ],
    },
    {
      id: 'argument_02',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        '"The numbers support a trade-first approach. Build economic partnerships. Use Tavven as a hub. Let the outer islands come to us because we\'re more profitable than the Kolmari, not because we showed up with Iron and threats." She taps the map twice. Her habit. "This is sustainable. This is how you hold territory without bleeding for it every week."',
      ],
    },
    {
      id: 'argument_03',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"The Daaz Accord tried that."',
        'Four words. The temperature in the galley drops.',
        '"We built trade routes. Made partnerships. Held territory through economics and goodwill for two years before the Wardensea cornered us off Noon Island." He unfolds his arms. Puts both hands on the table. "They didn\'t send accountants, Delvessa. They sent warships. And every trade partner we\'d cultivated watched from their harbors and did nothing. Because trade partnerships dissolve when the alternative is a Wardensea cannon pointed at your dock."',
      ],
    },
    {
      id: 'argument_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"That was a different crew. Different circumstances. Different--"',
      ],
    },
    {
      id: 'argument_04b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Different captain. Same ocean." Vorreth doesn\'t raise his voice. He doesn\'t need to. "I\'m not arguing against intelligence. I\'m arguing against the assumption that intelligence is a substitute for force. It isn\'t. It\'s a complement. One without the other breaks."',
      ],
    },
    {
      id: 'argument_04c',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'The ledger closes.',
        '"You\'re describing the Wardensea\'s own doctrine. Force backed by intelligence. That\'s not revolution. That\'s replacement."',
      ],
    },
    {
      id: 'argument_04d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Maybe replacement is enough."',
      ],
    },
    {
      id: 'argument_04e',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"It isn\'t."',
      ],
    },
    {
      id: 'argument_05',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen is at the stove. He hasn\'t turned around.',
        '"I rate this argument a two."',
        'Both of them look at him.',
        '"You\'re arguing about method when you haven\'t agreed on the goal. Delvessa wants stability. Vorreth wants survival. Those aren\'t the same thing, and until someone at this table decides which one we\'re building toward, the map doesn\'t matter."',
        'He stirs the pot. Tastes it. Adds salt.',
        '"The map never matters. The people at the table matter."',
      ],
    },
    {
      id: 'argument_06',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse is sitting on the counter. She\'s been recording. She\'s always recording. But her Grimoires are face-down on her lap. Not broadcasting. Just recording.',
        '"For the record," she says, "the audience numbers when we look like we know what we\'re doing are triple the numbers when we look like we\'re improvising." She holds up a hand. "I\'m not saying that should decide anything. I\'m saying it\'s data."',
      ],
    },
    {
      id: 'argument_06b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Everything is data to you people," Vorreth says.',
      ],
    },
    {
      id: 'argument_06c',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Yes," Delvessa says. "That\'s the point."',
      ],
    },
    {
      id: 'argument_07',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'They\'re both right. You know it. They know it. Dragghen knows it, which is why he rated the argument a two. Not because it\'s bad. Because it\'s incomplete.',
        'Delvessa\'s approach works in a world where the Wardensea plays by economic rules. Vorreth\'s approach works in a world where they don\'t. The Bastion Sea is both worlds depending on which day it is and which island you\'re standing on.',
        'The galley is quiet. The pot bubbles. The map stares at you from the wall with its colored lines and its arrows and its clean, confident geometry that has nothing to do with the messy reality of five people trying to agree on a direction.',
      ],
      choices: [
        {
          id: 'argument_side_delvessa',
          text: '"Delvessa\'s right. Trade first. If force becomes necessary, we use it. But we don\'t lead with it."',
          consequence: 'Strategy over strength. The long game.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 8 },
            { type: 'loyalty', target: 'vorreth', value: -3 },
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'argument_decision', value: 'trade_first' },
          ],
        },
        {
          id: 'argument_side_vorreth',
          text: '"Vorreth\'s right. The Wardensea doesn\'t negotiate with ledgers. We need to be strong enough that trade is a choice, not a necessity."',
          consequence: 'Strength creates options. Options create strategy.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 8 },
            { type: 'loyalty', target: 'delvessa', value: -3 },
            { type: 'infamy', value: 3 },
            { type: 'flag', target: 'argument_decision', value: 'strength_first' },
          ],
        },
        {
          id: 'argument_both',
          text: '"You\'re both right. That\'s the problem. And Dragghen\'s right that we haven\'t decided what we\'re building. So let me decide."',
          consequence: 'Take the weight. That\'s what captains do.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 3 },
            { type: 'loyalty', target: 'vorreth', value: 3 },
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'flag', target: 'argument_decision', value: 'captain_decides' },
          ],
        },
      ],
    },
    {
      id: 'argument_08',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'The silence after your decision is different from the silence before it. Before, the silence was a gap. A question waiting for an answer. After, it\'s a weight being redistributed. Five people adjusting their expectations to match the thing their captain just said.',
        'Vorreth nods. Once. Whatever you chose, he nods. Because Vorreth Daaz has served captains before and he knows that the decision matters less than the fact that someone made it.',
        'Delvessa opens her ledger. Writes something. The writing is smaller than usual.',
        'Dragghen serves dinner.',
        '"I rate the decision a five," he says. "Which is the highest rating I give to anything I don\'t fully understand yet. Check back in a month."',
      ],
    },
    {
      id: 'argument_09',
      paragraphs: [
        'They eat. The argument doesn\'t go away. It sits at the table with them like a sixth crew member, present and uncomfortable and necessary.',
        'Good.',
        'A crew that agrees on everything is a crew that isn\'t thinking. A crew that fights about direction is a crew that cares enough to fight.',
        'The map stays on the wall. The arrows point outward. The red circle around Tavven Shoal looks smaller than it did an hour ago.',
      ],
      autoAdvance: false,
    },
  ],
  onComplete: [
    { type: 'flag', target: 'crew_argument_complete', value: true },
  ],
  currentBeat: 0,
};
