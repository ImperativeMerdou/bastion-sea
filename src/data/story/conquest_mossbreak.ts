import { StoryScene } from '../../types/game';

export const mossbreakConquestScene: StoryScene = {
  id: 'conquest_mossbreak',
  title: 'MOSSBREAK - THE RENEGADE NETWORK',
  beats: [
    {
      id: 'mossbreak_conquest_01',
      title: 'THE RETURN',
      speaker: 'bartender',
      speakerName: 'Bartender',
      paragraphs: [
        'You come back to Mossbreak with a reputation.',
        'Last time, you were a curiosity, an Oni with a spiked club and ambitions that sounded like jokes. Now, Tavven Shoal flies under your flag. Keldriss bends to your will. Durrek Garrison, the Iron Gate, fell to your crew in broad daylight while twenty thousand people watched on Grimoire channels.',
        'When you walk into the tavern this time, nobody pretends not to notice.',
        '"Well," says the bartender, pouring a drink she already knows you\'ll order, "the mountain walks back in."',
      ],
    },
    {
      id: 'mossbreak_conquest_01b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Miss me?"',
      ],
    },
    {
      id: 'mossbreak_conquest_01c',
      speaker: 'bartender',
      speakerName: 'Bartender',
      paragraphs: [
        '"You tipped well. That counts for more than reputation at Mossbreak."',
        'The tavern has changed. Or maybe it hasn\'t. Maybe the people in it have. Fewer unknowns. More familiar faces. Renegade crews who\'ve heard the broadcasts. Merchants who smell opportunity. And at the back table, where she sat before, Iren Saltz watches you with the copper arm resting on the table like a weapon.',
      ],
    },
    {
      id: 'mossbreak_conquest_02',
      title: 'THE COPPERHAND',
      speaker: 'iren_saltz',
      speakerName: 'Iren Saltz',
      paragraphs: [
        'Iren Saltz lost Windrow two years ago. Not to a superior force. To politics. The Kolmari offered the island\'s merchants better trade terms than Iren could match, and one morning she woke up to find her own people had opened the harbor gates.',
        '"They didn\'t even fight me," she says. The copper arm clicks against the table, a nervous habit she\'s turned into a statement. "They just... voted. One morning I was the captain. Next morning I was a guest being asked to leave."',
        'She\'s thirty-one. Sun-dark skin. Cropped hair. The mechanical arm is a masterwork: Rathai engineering, copper-plated, with articulated fingers that move like real ones. She lost the original arm in a fight she won. She won\'t tell you who made the replacement.',
        '"You didn\'t come back here to drink," she says.',
      ],
    },
    {
      id: 'mossbreak_conquest_02b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I came back to offer you a job."',
      ],
    },
    {
      id: 'mossbreak_conquest_02c',
      speaker: 'iren_saltz',
      speakerName: 'Iren Saltz',
      paragraphs: [
        '"I have a crew."',
      ],
    },
    {
      id: 'mossbreak_conquest_02d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You have twelve people on a ship that needs thirty. You have no territory, no income, and no plan. What you have is experience: you took an island and you lost one. I need someone who knows both sides of that."',
        'She stares at you. The copper fingers click.',
      ],
      choices: [
        {
          id: 'mossbreak_recruit_iren',
          text: '"Join my fleet. I\'ll give you a ship, a crew, and a territory to run when I take the next one. Windrow included."',
          consequence: 'Direct offer. Territory for loyalty.',
          available: true,
          effects: [
            { type: 'reputation', value: 8 },
            { type: 'loyalty', target: 'kovesse', value: 5 },
            { type: 'flag', target: 'iren_recruited', value: true },
          ],
        },
        {
          id: 'mossbreak_alliance_iren',
          text: '"I don\'t want your crew. I want your network. The contacts you built at Windrow, the supply chains, the people who owe you favors."',
          consequence: 'Intelligence over manpower.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'loyalty', target: 'delvessa', value: 8 },
            { type: 'flag', target: 'iren_network', value: true },
          ],
        },
        {
          id: 'mossbreak_challenge_iren',
          text: '"You lost your island because you were soft. I\'m not soft. Prove you\'re worth the investment. Fight me. Right here. If you can stand for ten seconds, you\'re in."',
          consequence: 'Violence as job interview.',
          available: true,
          effects: [
            { type: 'infamy', value: 3 },
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'flag', target: 'iren_tested', value: true },
          ],
        },
      ],
    },
    {
      id: 'mossbreak_conquest_03',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      title: 'THE TAVERN DECLARATION',
      paragraphs: [
        'Word travels fast at Mossbreak. By midnight, every tavern knows: Karyudon is building a fleet.',
        'A fleet. Multiple ships. Multiple captains. Territory holdings across the Northern Arc and expanding south. An operation that hasn\'t existed in the Bastion Sea since Vassago Moren declared his Conqueror candidacy three years ago.',
        'Suulen appears from somewhere above. She\'s been in the rafters for two hours, listening. "I count seventeen independent crews at Mossbreak right now. Six have expressed interest in hearing your terms. Three are already committed to other operations. The rest are watching."',
      ],
    },
    {
      id: 'mossbreak_conquest_03b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"And the hooded figure from last time?"',
      ],
    },
    {
      id: 'mossbreak_conquest_03c',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Gone. Left two days before we arrived." Suulen\'s expression doesn\'t change. "But they left a message at the bar. Addressed to you."',
        'She hands you a slip of paper. The handwriting is precise, elegant, practiced.',
      ],
    },
    {
      id: 'mossbreak_conquest_04',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'The note reads: "The sea remembers who feeds it. - A friend."',
        'Kovesse scans it. Checks for Grimoire signatures. Finds nothing.',
        '"Anonymous. No trace. Whoever wrote this knows how to avoid detection, which means they\'re either very good or very dangerous."',
      ],
    },
    {
      id: 'mossbreak_conquest_04b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Usually both," Delvessa says.',
        'You fold the note and put it in your coat. A mystery for another day.',
      ],
    },
    {
      id: 'mossbreak_conquest_04c',
      speaker: 'bartender',
      speakerName: 'Bartender',
      paragraphs: [
        'The tavern is full now. Crews from six different ships have gathered. Iren Saltz sits at your right, the copper arm gleaming in the lamplight. Information brokers line the bar, writing furiously. And the bartender, the closest thing Mossbreak has to a government, stands behind the counter with crossed arms and the expression of a woman watching history happen in her establishment.',
        '"Mossbreak has never belonged to anyone," she says. "Not the Kolmari. Not the Wardensea. Not the Renegades. It belongs to everyone who passes through."',
      ],
    },
    {
      id: 'mossbreak_conquest_04d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      effect: 'flash',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        '"I\'m not here to take Mossbreak." You stand. Seven feet of Oni, horns catching the lamplight, amber eyes sweeping the room. "I\'m here to turn it into something bigger. A headquarters. A meeting point. The place where the Bastion Sea comes when it wants to be part of what happens next."',
        'Silence.',
        'Then someone at the back raises a glass. Then another. Then the whole tavern.',
        '"THE MOUNTAIN!" someone shouts.',
      ],
    },
    {
      id: 'mossbreak_conquest_04db',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"THE MOUNTAIN!"',
        'Mossbreak doesn\'t fly a flag. But tonight, it raises a glass.',
      ],
    },
  ],
  onComplete: [
    { type: 'conquer', target: 'mossbreak', value: true },
    { type: 'flag', target: 'mossbreak_conquered', value: true },
    { type: 'bounty', value: 8000000 },
    { type: 'resource', target: 'intelligence', value: 15 },
    { type: 'resource', target: 'supplies', value: 10 },
    { type: 'resource', target: 'sovereigns', value: 100 },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: '🍺 MOSSBREAK - CLAIMED',
      message: 'Mossbreak is yours. Not through force. Through presence. The neutral ground is now the meeting point of the Karyudon fleet. Independent crews gather. The Bastion Sea is listening.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - THE FLEET GROWS',
      message: 'The Oni Renegade Karyudon has declared Mossbreak as his fleet headquarters. Multiple independent crews have pledged allegiance. Estimated combined bounty exceeds 200 million. Conqueror Lieutenants are monitoring.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'KOVESSE GRENN - Broadcast Report',
      message: 'Captain. CAPTAIN. Forty-seven thousand concurrent viewers on the Mossbreak declaration stream. The previous record for a non-Conqueror event was nine thousand. We\'re not just news anymore. We\'re a MOVEMENT.',
    }},
    { type: 'dominion', target: 'king', value: 20 },
    { type: 'dominion', target: 'sight', value: 15 },
    { type: 'unlock', target: 'mirrorwater', value: true },
    { type: 'unlock', target: 'anvil_cay', value: true },
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};
