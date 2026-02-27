import { StoryScene } from '../../types/game';

export const kirinConfrontationScene: StoryScene = {
  id: 'kirin_confrontation',
  title: 'THE HIGHLAND DEBT',
  characters: ['karyudon', 'kirin'],
  beats: [
    {
      id: 'kconf_01',
      title: 'THE BACK ROOM',
      background: 'scene_kirin_confrontation',
      paragraphs: [
        'You meet in the back room of a dockside bar that doesn\'t ask questions. Suulen swept it an hour ago. No listening devices. No Grimoire signals. No windows facing the street.',
        'Kirin is already there. Sitting. Hands flat on the table. The posture of someone who came to confess.',
        'You sit across from him. The table is small. Two Oni in a room built for humans. Your horns nearly scrape the ceiling beams.',
      ],
    },
    {
      id: 'kconf_02',
      paragraphs: [
        'For a long time, neither of you speaks. The bar noise filters through the wall. Someone is arguing about fish prices. A chair scrapes. A glass breaks.',
        'Normal sounds. Normal world. On the other side of the table, your brother is trying to figure out how to say something that doesn\'t have a good way to be said.',
      ],
    },
    {
      id: 'kconf_03',
      stinger: 'story_revelation',
      sfx: 'combat_cinematic_boom',
      speaker: 'kirin',
      speakerName: 'Kirin',
      expression: 'grim',
      paragraphs: [
        '"He has the twins."',
        'No preamble. No throat-clearing. Kirin delivers it the way you rip off a bandage.',
        '"Uncle Tessok. He moved them from the highlands three weeks after you were taken. Put them in a compound on the eastern ridge. Guards. Iron users. The kind of people he used to call \'insurance.\'"',
        'Kirin\'s hands are still flat on the table. His knuckles are white.',
        '"They\'re alive. They\'re not hurt. But they\'re not free."',
      ],
    },
    {
      id: 'kconf_04',
      effect: 'flash_crimson',
      sfx: 'combat_heavy',
      paragraphs: [
        'The room gets smaller. Your Iron responds before your mind does, crawling up your forearms in dark plates. The table creaks under the pressure of your grip.',
        'The twins. Eighteen years old. You raised them after the parents died. Fed them. Taught Korin how to fight and Senne how to read. Carried them both down the mountain during the mudslide when they were six.',
        'And now they\'re in a compound. With guards. Because your uncle decided they were useful.',
      ],
    },
    {
      id: 'kconf_05',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        '"He sent me here." Kirin\'s voice is flat. Controlled. The voice of someone who practiced this in his cabin for three days of sailing. "The deal is: bring you back. Dead or alive, he doesn\'t care. You come back to the highlands and submit to the clan council he controls. Or he moves the twins somewhere I can\'t find them."',
        'He pauses.',
        '"I\'m not going to do it."',
        'He looks at you for the first time since you sat down.',
        '"I\'m not here to bring you back. I\'m here because I don\'t know how to get them out alone."',
      ],
    },
    {
      id: 'kconf_06',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        'Kirin\'s hands are shaking. You can see it now. The Iron-band tattoos on his forearms pulse faintly, a low-grade hum, the uncle\'s conditioning activating under stress. He notices you noticing. He puts his hands under the table.',
        '"Before you decide. I need you to know something."',
        'He swallows.',
        '"That day on the ship. When they took you. I knew. I knew they were coming. The uncle told me it was the only way to protect the highlands from the Wardensea. That you were too dangerous. Too visible. That your bounty would bring the storm-grey coats to our door and they\'d burn everything."',
      ],
    },
    {
      id: 'kconf_06b',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        '"He was lying. I know that now. He wanted you gone because you were the only person in the highlands who didn\'t listen to him."',
      ],
    },
    {
      id: 'kconf_07',
      speaker: 'kirin',
      speakerName: 'Kirin',
      expression: 'fear',
      paragraphs: [
        '"I should have stepped forward. On that deck. When they put you down. I should have stepped forward and fought beside you."',
        'His voice breaks.',
        '"I stepped back. And every day since then I\'ve been trying to figure out how to live with that."',
      ],
    },
    {
      id: 'kconf_08',
      paragraphs: [
        'The room is quiet. The bar noise has faded to nothing, or maybe you\'ve stopped hearing it.',
        'Your brother. The betrayal. The uncle\'s manipulation. The twins in a compound. The Iron-band tattoos pulsing on arms that should be free.',
        'Kirin is looking at the table. Waiting. He\'ll accept whatever comes next.',
      ],
      choices: [
        {
          id: 'kirin_alliance',
          text: 'We take the uncle down. Together. You and me. Like it should have been from the start.',
          consequence: 'Alliance. Together, like before.',
          available: true,
          effects: [
            { type: 'flag', target: 'kirin_path', value: 'alliance' },
            { type: 'flag', target: 'kirin_allied', value: true },
            { type: 'reputation', value: 5 },
            { type: 'notification', value: true, notification: {
              type: 'story',
              title: 'BLOOD ALLIANCE',
              message: 'Kirin has joined your cause. The uncle will answer for the twins. Together.',
            }},
            { type: 'scene', target: 'kirin_confrontation_alliance', value: true },
          ],
        },
        {
          id: 'kirin_rivalry',
          text: 'You chose your side. That day on the ship, you made your choice. Now I\'m making mine.',
          consequence: 'Confrontation. Make him answer.',
          available: true,
          effects: [
            { type: 'flag', target: 'kirin_path', value: 'rivalry' },
            { type: 'flag', target: 'kirin_rivalry', value: true },
            { type: 'infamy', value: 5 },
            { type: 'scene', target: 'kirin_confrontation_rivalry', value: true },
          ],
        },
        {
          id: 'kirin_emotional',
          text: 'Forget us. Forget the uncle. What would the twins want?',
          consequence: 'The question underneath it all.',
          available: true,
          effects: [
            { type: 'flag', target: 'kirin_path', value: 'emotional' },
            { type: 'flag', target: 'kirin_allied', value: true },
            { type: 'loyalty', target: 'delvessa', value: 3 },
            { type: 'loyalty', target: 'vorreth', value: 3 },
            { type: 'reputation', value: 8 },
            { type: 'notification', value: true, notification: {
              type: 'story',
              title: 'THE HIGHLAND DEBT',
              message: 'The twins would want their brothers back. Both of them. Kirin broke. The uncle\'s full plan is on the table.',
            }},
            { type: 'scene', target: 'kirin_confrontation_emotional', value: true },
          ],
        },
      ],
    },
  ],
  currentBeat: 0,
};

// === ALLIANCE PATH ===
export const kirinAllianceScene: StoryScene = {
  id: 'kirin_confrontation_alliance',
  title: 'THE HIGHLAND DEBT',
  characters: ['karyudon', 'kirin'],
  beats: [
    {
      id: 'kconf_alliance_01a',
      background: 'scene_kirin_confrontation',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        'Kirin\'s head comes up.',
        '"Together?" He says it carefully, like testing weight on a broken bridge.',
        'You don\'t move. Neither does he. The word sits on the table between you, next to his white knuckles and the scars on your forearms.',
      ],
    },
    {
      id: 'kconf_alliance_01b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"This doesn\'t fix it," you say. "What you did on that ship. This doesn\'t make that go away."',
      ],
    },
    {
      id: 'kconf_alliance_01c',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        '"I know."',
      ],
    },
    {
      id: 'kconf_alliance_01d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Good. Because I\'m going to need you to do things that are worse than watching. And when this is done, you and I are going to have the conversation we haven\'t had yet. The real one."',
        'He nods. Once. His hands are still shaking.',
      ],
    },
    {
      id: 'kconf_alliance_02a',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        '"The uncle has thirty Iron users at the compound," Kirin says. Back to business. "Highland-trained. Old clan fighters who owe him debts they can\'t pay any other way."',
      ],
    },
    {
      id: 'kconf_alliance_02b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Tell me the layout."',
        'He does. His voice is flat and precise and nothing like the voice he was using thirty seconds ago. You take notes on the table with a nail. Neither of you mentions the other thing. The thing that\'s still sitting in the room. You\'ll get to it. Eventually. Maybe.',
      ],
    },
  ],
  currentBeat: 0,
  nextSceneId: 'kirin_confrontation_end',
};

// === RIVALRY PATH ===
// Plays the pre-fight narration, then launches the Kirin boss fight via onComplete.
export const kirinRivalryScene: StoryScene = {
  id: 'kirin_confrontation_rivalry',
  title: 'THE HIGHLAND DEBT',
  characters: ['karyudon', 'kirin'],
  beats: [
    {
      id: 'kconf_rivalry_01',
      speaker: 'kirin',
      speakerName: 'Kirin',
      background: 'scene_kirin_confrontation',
      effect: 'flash_crimson',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'Kirin\'s face doesn\'t change. Like he expected this. Like he was hoping for it.',
        '"Alright." He stands. The chair falls behind him. "Alright."',
        'His Iron activates. Not the controlled, disciplined glow of a trained fighter. Something rougher. Rawer. The Iron-band tattoos blaze with the uncle\'s pattern, and underneath, Kirin\'s own Dominion fights to surface through the conditioning.',
        '"I didn\'t come here to fight you. But I\'ll fight you. I owe you that much."',
      ],
    },
    {
      id: 'kconf_rivalry_02',
      effect: 'shake',
      sfx: 'combat_heavy',
      paragraphs: [
        'The back room isn\'t big enough. You both know it. You move through the bar, scattering drinkers and furniture, and the night air hits your face as you step onto the dock.',
        'The harbor is empty at this hour. Your crew is aboard the ship, watching. Kirin\'s ship sits dark in the next berth.',
        'The dock planks are wet. You can smell tar and fish guts and the iron coming off both of you.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'combat', target: 'kirin_boss_fight', value: true },
    { type: 'flag', target: 'kirin_confrontation_complete', value: true },
  ],
};

// === EMOTIONAL PATH ===
export const kirinEmotionalScene: StoryScene = {
  id: 'kirin_confrontation_emotional',
  title: 'THE HIGHLAND DEBT',
  characters: ['karyudon', 'kirin'],
  beats: [
    {
      id: 'kconf_emotional_01',
      background: 'scene_kirin_confrontation',
      paragraphs: [
        'Kirin\'s face contorts. The Iron-band tattoos flare and then die. His hands come up and cover his eyes.',
      ],
    },
    {
      id: 'kconf_emotional_02',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        '"They\'d want--" His voice breaks badly. He tries again. "Senne would want-- she\'d want us to stop. She\'d sit us both down at the table and make us eat and not talk until we finished eating. That\'s what she does when people fight. Did. Does."',
        'He\'s crying now. Not dramatic. Just leaking.',
        '"Korin would punch me. Then punch you for taking so long. Then ask what the plan is."',
        '"Korin always wants a plan."',
      ],
    },
    {
      id: 'kconf_emotional_03',
      paragraphs: [
        'You let him finish. You don\'t look away.',
        'When the shaking stops, Kirin wipes his face with the back of his hand .',
      ],
    },
    {
      id: 'kconf_emotional_03b',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        '"The uncle." His voice is hoarse but steady. "I know everything. His network. His allies. His schedule. The compound layout. The guard rotations. Every Iron user and what tier they\'re at."',
      ],
    },
    {
      id: 'kconf_emotional_03c',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        '"He thinks I\'m loyal because of the bands." He holds up his forearms. The tattoos pulse faintly. "They\'re conditioning. Iron imprints from his shaman training. They make it hard to disobey direct orders. Not impossible. Just hard."',
        '"Hard isn\'t the same as can\'t."',
      ],
    },
  ],
  currentBeat: 0,
  nextSceneId: 'kirin_confrontation_end',
};

// === SHARED ENDING ===
// Alliance and Emotional paths both chain here via nextSceneId.
// Rivalry path skips this (goes to boss fight instead).
export const kirinEndScene: StoryScene = {
  id: 'kirin_confrontation_end',
  title: 'THE HIGHLAND DEBT',
  characters: ['karyudon', 'kirin'],
  beats: [
    {
      id: 'kconf_end',
      paragraphs: [
        'The night settles. Inside the bar, someone has started singing, badly. A glass breaks.',
        'In the back room, two brothers sit with a table between them and a plan scratched into the wood with a nail. The plan is incomplete. The trust is worse. But the twins are in a compound and the uncle thinks his puppet is performing on schedule.',
        'Kirin leaves first. You hear his boots on the dock. His ship casts off an hour later. No signal. No farewell.',
        'You sit in the back room for a long time after he\'s gone. The bar noise fills the space where a conversation should have been.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'kirin_confrontation_complete', value: true },
  ],
};
