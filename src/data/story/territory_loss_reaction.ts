import { StoryScene } from '../../types/game';

export const territoryLossReactionScene: StoryScene = {
  id: 'territory_loss_reaction',
  title: 'WHAT FALLS',
  characters: ['karyudon', 'delvessa', 'dragghen', 'kovesse'],
  onComplete: [
    { type: 'flag', target: 'territory_loss_reaction_seen', value: true },
  ],
  beats: [
    {
      id: 'tl_01',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        'Delvessa doesn\'t wait for you to bring it up.',
        '"The island is gone. Trade route income drops by whatever that route was worth. The garrison is either dead or scattered. Whatever we put into upgrades there -- those are sunk costs. They don\'t come back."',
        'She\'s not angry. She\'s not consoling. She reads the ledger the way she always reads it: out loud, so you can\'t pretend you didn\'t hear it.',
      ],
    },
    {
      id: 'tl_02',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen looks at the map for a long moment.',
        '"You can win it back," he says. "Or you can learn what you did wrong. Both take time you don\'t have."',
        'He doesn\'t say which one he thinks you should do.',
      ],
    },
    {
      id: 'tl_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse has her Grimoire open. Her pen is hovering but not moving.',
        '"I\'m trying to figure out how to write this," she admits. "There\'s a version where this is a setback. There\'s a version where this is the story. I can\'t tell yet which one it is."',
        'Her pen stays hovering. She looks at you.',
        '"You should probably decide that part."',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
};
