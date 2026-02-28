import { StoryScene } from '../../types/game';

export const delvessaRecruitmentScene: StoryScene = {
  id: 'delvessa_recruitment',
  title: 'THE LEDGER',
  characters: ['karyudon', 'delvessa', 'dragghen', 'kovesse'],
  nextSceneId: 'first_crew_dinner',
  onComplete: [
    { type: 'recruit', target: 'delvessa', value: true },
    { type: 'flag', target: 'delvessa_recruited', value: true },
  ],
  beats: [
    {
      id: 'del_01',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        '"You handled that poorly."',
        'The woman from the tea house. The one with the ledger who\'s been at Hella\'s stall every night, at every port, always at the edge of the crowd. Watching.',
        'She says it the way someone reads a weather report. Factual. Uninterested in your feelings about the data.',
        'She\'s standing three feet from you, ledger under her arm, tea untouched in her other hand. Five-six. Olive skin. Dark hair cut short. Narrow face, steady hands. She\'s dressed like someone who\'s about to audit a company and expects to find exactly what she came looking for.',
      ],
    },
    {
      id: 'del_01b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Excuse me?"',
      ],
    },
    {
      id: 'del_01c',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        '"The Kolmari agent. Tessurren. You faced him down. That was the right instinct. But you gave him a story. A Wardensea-marked Oni disrupting authorized Kolmari operations. That goes in the incident report. The report goes to the regional office. The regional office sets a bounty. You\'ve been on this island for one day and you already have a file."',
      ],
    },
    {
      id: 'del_02',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"The smart play was to buy the debt. Kolmari contracts have a transfer clause in section nine. You pay the balance, the contract transfers to you, you write it off. Rukessa keeps her stall. The Kolmari get their money. No incident report. No file. No bounty."',
      ],
    },
    {
      id: 'del_02b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I didn\'t have any money."',
      ],
    },
    {
      id: 'del_02c',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I know. That\'s why I said you handled it poorly, not that you should have done something different."',
        'She sips her tea. Finally.',
        '"Delvessa Ghal. Former Kolmari Ledger Agent. I left with copies of eleven classified financial instruments, which is why I\'m here instead of in a Kolmari office."',
      ],
    },
    {
      id: 'del_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse has materialized between you and Delvessa, Grimoires in hand, tail going.',
        '"Ledger Agent. LEDGER AGENT. Captain, do you know what a Kolmari Ledger Agent does? They run the numbers. ALL the numbers. Trade routes, debt portfolios, shipping manifests, harbor tariffs. If the Kolmari are a body, Ledger Agents are the nervous system. They know where every Sovereign goes and why."',
      ],
    },
    {
      id: 'del_03b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I\'m aware of what I am."',
      ],
    },
    {
      id: 'del_03c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"You\'re a weapon disguised as an accountant!"',
        'Delvessa looks at Kovesse with an expression that could cut glass.',
      ],
    },
    {
      id: 'del_03d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I prefer \'analyst.\'"',
      ],
    },
    {
      id: 'del_04',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen is sitting on a crate, eel skewer in hand, watching the exchange with the expression of a man who\'s seen this kind of person before.',
        '"Kolmari," he says. The word lands flat, halfway between observation and verdict.',
      ],
    },
    {
      id: 'del_04b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Former Kolmari."',
      ],
    },
    {
      id: 'del_04c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Former covers a lot of ground. I\'m former Kolmari too. I left because they sold people. Why did you leave?"',
        'If you weren\'t watching, you\'d miss the pause.',
      ],
    },
    {
      id: 'del_04d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Because I could read the ledgers. And I didn\'t like what they said."',
      ],
    },
    {
      id: 'del_04e',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen studies her for three seconds.',
        '"Fair. I rate the answer a four. Honest but incomplete."',
      ],
    },
    {
      id: 'del_04f',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"That\'s because it is incomplete. The rest you earn."',
      ],
    },
    {
      id: 'del_05',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She turns back to you. The ledger is still under her arm. You\'re starting to understand that the ledger is as much a part of her as your horns are a part of you.',
        '"I\'ve been watching you since you waded ashore. You have no resources, no contacts, no intelligence network, and no plan beyond the next meal. You have Forged Iron, a stolen God Fruit that every faction in the Bastion Sea will be looking for within the week, a shipwright who can build but can\'t strategize, and a broadcaster who\'s already made you visible to everyone."',
      ],
    },
    {
      id: 'del_05b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You\'ve been watching me for one day."',
      ],
    },
    {
      id: 'del_05c',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I\'m thorough."',
      ],
    },
    {
      id: 'del_06',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She opens the ledger. Turns it toward you. The page is covered in numbers, annotations, small diagrams. You can read some of it: shipping routes, harbor fees, Kolmari debt structures for Tavven Shoal specifically. The rest is in a notation system you don\'t recognize.',
        '"This is Tavven Shoal\'s financial architecture. Debt obligations, trade dependencies, revenue sources, and the three points where the entire structure is vulnerable to disruption. The Kolmari built it. I know where the load-bearing walls are."',
        'She closes the ledger.',
        '"You want to take this island. I can show you how."',
      ],
    },
    {
      id: 'del_07',
      paragraphs: [
        'The afternoon light is turning gold. The market is thinning. Somewhere nearby, a vendor is arguing with a customer about the freshness of his kelp. Hella\'s grill is still smoking.',
        'You look at Delvessa Ghal. Former Kolmari analyst. Dressed for an audit. Carrying the financial x-ray of the island you\'re standing on.',
        'You look at Dragghen. Arms crossed. Skeptical but listening.',
        'You look at Kovesse. All three Grimoires up. Recording everything.',
      ],
      choices: [
        {
          id: 'del_accept',
          text: '"Show me what you know. All of it."',
          consequence: 'Let the analyst in. Give her access. Trust the numbers.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 10 },
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'flag', target: 'delvessa_approach', value: 'trusted' },
          ],
        },
        {
          id: 'del_test',
          text: '"Prove it. Pick one of those vulnerabilities and tell me what happens if I pull the thread."',
          consequence: 'Test her. Make her show the work before you show the trust.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 5 },
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'reputation', value: 2 },
            { type: 'flag', target: 'delvessa_approach', value: 'tested' },
          ],
        },
        {
          id: 'del_honest',
          text: '"I don\'t take this island. I\'m taking all of them."',
          consequence: 'Tell her the real plan. Watch what her face does.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 3 },
            { type: 'loyalty', target: 'kovesse', value: 5 },
            { type: 'infamy', value: 2 },
            { type: 'flag', target: 'delvessa_approach', value: 'honest' },
          ],
        },
      ],
    },
    {
      id: 'del_08',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Whatever you said, she doesn\'t flinch. She processes it the way she processes everything: data in, analysis out, emotional response filed for later review.',
        '"Then you\'ll need better intelligence than what you have, which is nothing. You\'ll need a financial strategy, a reputation plan, and someone who can read a Kolmari contract without needing it explained."',
        'She tucks the ledger back under her arm.',
        '"I can be that. But I don\'t work for free and I don\'t work blind. If I\'m in, I\'m in the room where the decisions happen. Not taking notes outside."',
      ],
    },
    {
      id: 'del_09',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You\'re in the room."',
        'Delvessa nods. One nod. Efficient. Nothing wasted.',
        'Kovesse lets out a sound that is part celebration and part broadcast announcement.',
        'Dragghen rates the recruitment a six.',
      ],
    },
    {
      id: 'del_final',
      paragraphs: [
        'Delvessa pulls a chair to the table. Dragghen slides a plate toward her without being asked. Kovesse starts narrating the meal to her Grimoire in a whisper that isn\'t quiet enough.',
        'Not a crew yet. Something less defined than that. Three strangers eating together because one of them stood in front of a debt collector and said no.',
        'But the shape is there. You can feel it forming, the way you can feel weather change before the clouds arrive.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
};
