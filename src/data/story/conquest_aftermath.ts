import { StoryScene } from '../../types/game';

export const conquestAftermathScene: StoryScene = {
  id: 'conquest_aftermath',
  title: 'FIRST TERRITORY',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth', 'tessek'],
  beats: [
    {
      id: 'aftermath_01',
      title: 'TAVVEN SHOAL IS YOURS',
      paragraphs: [
        'Hella puts a plate down in front of you before you ask. Storm tea. Eel skewers. Same price as the first day.',
        '"You own the island now," she says, already turning back to the grill. "Congratulations. Try not to ruin it."',
        'The fish market opens the same way it opened yesterday. Pettha Koss is already at the Harbor Board, managing schedules, with you or despite you. The rope-bridge district woke up this morning under new ownership and most of them haven\'t noticed yet.',
      ],
    },
    {
      id: 'aftermath_02',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse slides onto the bench across from you, tablet in hand, grinning the way she grins when the numbers are interesting. "Your name just appeared on a bounty board." She turns the screen around. KARYUDON. The number is small. She doesn\'t care about the number.',
        '"Every Grimoire feed in the Northern Arc picked it up. The Wardensea, the Kolmari, three independent bounty aggregators." Her tail is lashing. "You\'re a variable now, Captain. And variables make people nervous."',
      ],
    },
    {
      id: 'aftermath_03',
      title: 'THE CREW RESPONDS',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Vorreth is leaning against the Harbor Board doorframe when you come in. Arms folded. Eyes closed. You think he is asleep until he speaks.',
        '"One." He holds up a single finger without opening his eyes. "That is how many islands you have. One." A pause. "The Daaz Accord held six before they came for us. Six islands and thirty years of blood contracts, and the Wardensea still ground us down in eleven days."',
        'He opens one eye. "Do not make the mistake of thinking this is the hard part, Karyudon. Taking ground is easy. Holding it when they send the fleet is something else entirely."',
      ],
      expression: 'grim',
    },
    {
      id: 'aftermath_04',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen finds you on the upper platform at dusk. You did not hear her approach. You never do.',
        '"The dock workers are not afraid of you." She says it like she is reporting the weather. "That is good. Afraid people hide things. Calm people forget you are listening."',
        'She is already looking south, where the sea turns dark. "I have been listening. Three fishermen mentioned routes through Mossbreak that do not appear on any chart. Interesting, given that Mossbreak is supposed to be uninhabited."',
      ],
      expression: 'grim',
    },
    {
      id: 'aftermath_05',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        'Tessek is practicing forms on the beach when you find him. Redtide catches the last of the sunset, the blade vibrating at a frequency you can feel in your teeth.',
        '"Captain." He sheathes the nodachi in one fluid motion. "I have been thinking about what happens when we fight someone who matters. Not the garrison commander. Someone with a name. A bounty. A crew that believes in them the way yours believes in you."',
        'He looks at the water. "When that fight comes, I want to be ready. Not adequate. Ready."',
      ],
      expression: 'grim',
    },
    {
      id: 'aftermath_06',
      title: 'WHAT\'S NEXT',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa has already pinned a chart to the wall of the Harbor Board office. You didn\'t ask her to. She does this.',
        '"Keldriss." She taps the eastern mark. "Smugglers. Useful or dangerous, depending on how we approach." Dragghen is standing behind you. She glances at him, then back at the chart. "Coppervein. Southwest. Mining colony under Kolmari management."',
        'Dragghen says nothing.',
        '"And south." She taps a smudge on the chart that barely qualifies as a mark. "Mossbreak. Overgrown. The fishermen I\'ve talked to change the subject when I ask about it."',
      ],
    },
    {
      id: 'aftermath_07',
      paragraphs: [
        'You stand on the coral platform and look south. The wind smells like salt and fish oil and something else. Something new. Yours.',
        'One island. Twelve more out there. And every one of them just heard your name for the first time.',
      ],
    },
  ],
  onComplete: [
    { type: 'conquer', target: 'tavven_shoal', value: true },
    { type: 'flag', target: 'tavven_conquered', value: true },
    { type: 'flag', target: 'crew_recruited', value: true },
    { type: 'recruit', target: 'delvessa', value: true },
    { type: 'recruit', target: 'dragghen', value: true },
    { type: 'recruit', target: 'suulen', value: true },
    { type: 'recruit', target: 'kovesse', value: true },
    { type: 'recruit', target: 'vorreth', value: true },
    { type: 'recruit', target: 'tessek', value: true },
    { type: 'resource', target: 'sovereigns', value: 500 },
    { type: 'resource', target: 'supplies', value: 30 },
    { type: 'resource', target: 'intelligence', value: 10 },
    { type: 'unlock', target: 'coppervein', value: true },
    { type: 'unlock', target: 'mossbreak', value: true },
    { type: 'unlock', target: 'keldriss', value: true },
    { type: 'dominion', target: 'iron', value: 20 },
    { type: 'dominion', target: 'sight', value: 15 },
    { type: 'dominion', target: 'king', value: 25 },
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};
