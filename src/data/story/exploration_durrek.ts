import { StoryScene } from '../../types/game';

export const durrekArrivalScene: StoryScene = {
  id: 'explore_durrek_garrison',
  title: 'DURREK GARRISON - THE IRON GATE',
  beats: [
    {
      id: 'durrek_arrive_01',
      title: 'THE FORTRESS',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Durrek doesn\'t welcome you. Durrek doesn\'t welcome anyone.',
        'The island is a volcanic outcrop reinforced by thirty years of Wardensea engineering. Natural stone carved, shaped, and armored until the island itself is a weapon. Three stories of reinforced basalt. Cannon emplacements on every face. A carved harbor with chain booms that can seal the entrance in under a minute. The Wardensea flag, grey on steel-blue, flies from the highest tower. It has never been lowered.',
        'Vorreth stands at the prow. His hands are steady. His eyes are not.',
        '"I served here for six years. Commandant of the Lower Garrison. I knew every corridor, every patrol route, every weakness."',
        '"And now?"',
        '"Now I\'m looking at it from the outside." He watches the fortress the way a man watches a house he built and can never enter again. "Strange what a difference perspective makes."',
      ],
    },
    {
      id: 'durrek_arrive_02',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa joins you at the rail. She\'s been watching the fortress through a spyglass for twenty minutes. She puts it down.',
        '"That\'s a lot of marines."',
      ],
    },
    {
      id: 'durrek_arrive_02b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"A hundred and twenty," Vorreth says. He doesn\'t need the spyglass. "They rotate every six months. The commander is Drezh." His voice flattens on the name. "We served together. Methodical. Disciplined. The kind of officer who won\'t make mistakes because he doesn\'t believe in improvisation."',
      ],
    },
    {
      id: 'durrek_arrive_02c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Everyone improvises when an Oni breaks through their front door," you say.',
      ],
    },
    {
      id: 'durrek_arrive_02d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"That\'s... not wrong." Vorreth\'s mouth twitches. Not quite a smile. "Drezh has one weakness: he follows procedure. Every situation has a procedure. Every threat has a response. What he can\'t handle is something that doesn\'t have a procedure."',
        'You look at your crew. A deserter Commandant. A Morventhi tunnel-runner. A Gorundai with fists like anvils. A Rathai engineer broadcasting everything to the world. An ex-Kolmari strategist running your finances.',
      ],
    },
    {
      id: 'durrek_arrive_02e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I don\'t think there\'s a procedure for us."',
      ],
    },
    {
      id: 'durrek_arrive_02f',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"No. There definitely is not."',
      ],
    },
    {
      id: 'durrek_arrive_03',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'You don\'t dock at Durrek. The harbor is sealed to non-military vessels. Instead, you anchor at a rocky outcropping a mile south that Suulen identified from the charts.',
        '"Observation post," she reports, reappearing from a two-hour reconnaissance. "Patrol routes run like clockwork. Shift changes every four hours. Gate inspections every two. The only gap is during the commander\'s evening briefing: twenty minutes when the south wall has minimal coverage."',
      ],
    },
    {
      id: 'durrek_arrive_03b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse is setting up equipment. Directional microphones. Signal intercepts. "I can\'t crack their Grimoire encryption, but I can listen to the unencrypted chatter. Duty complaints, mostly. Supply requests. One marine who keeps writing terrible poetry to someone named Elisse."',
      ],
    },
    {
      id: 'durrek_arrive_03c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Useful?"',
      ],
    },
    {
      id: 'durrek_arrive_03d',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"The poetry? No. The supply requests? Very. They\'re low on medical supplies and behind on their quarterly ammunition shipment. Logistics tells you everything about a garrison\'s readiness."',
      ],
      choices: [
        {
          id: 'durrek_observe',
          text: 'Observe for three days. Learn the patterns. Plan the assault properly.',
          consequence: 'Patience. Vorreth\'s way. Intelligence before action.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 12 },
            { type: 'loyalty', target: 'vorreth', value: 8 },
            { type: 'loyalty', target: 'suulen', value: 5 },
            { type: 'flag', target: 'durrek_observed', value: true },
          ],
        },
        {
          id: 'durrek_probe',
          text: 'Send Dragghen and Vorreth to the garrison gates under a trade flag. Test their response.',
          consequence: 'Risky. Test the gates under a trade flag.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 8 },
            { type: 'loyalty', target: 'dragghen', value: 3 },
            { type: 'flag', target: 'durrek_probed', value: true },
          ],
        },
        {
          id: 'durrek_challenge',
          text: '"Signal them. Tell them Karyudon is here. Tell them to come out and fight."',
          consequence: 'Pure Karyudon. Challenge them all.',
          available: true,
          effects: [
            { type: 'infamy', value: 5 },
            { type: 'bounty', value: 5000000 },
            { type: 'reputation', value: 3 },
            { type: 'loyalty', target: 'kovesse', value: 10 },
            { type: 'loyalty', target: 'vorreth', value: -10 },
            { type: 'flag', target: 'durrek_challenged', value: true },
          ],
        },
      ],
    },
    {
      id: 'durrek_arrive_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'That night. The observation post. Fortress lights on the water.',
        'Every window is lit. Every patrol is on schedule. The Wardensea doesn\'t sleep. It rotates.',
        'Delvessa sits beside you. Close enough to smell salt and parchment.',
        '"You\'re going to attack it," she says. Already certain.',
        '"I\'m going to take it."',
        '"The difference between attacking and taking is the plan that comes after the violence." She opens her ledger. Numbers in her precise hand. "Taking Durrek would give us control of the Northern Arc trade routes. The garrison\'s supply chains include seven merchant vessels on regular rotation. We intercept those, three other islands lose their lifeline."',
        '"That\'s the strategist talking."',
        '"This is the strategist." She looks at you. Moonlight on her features. Harder angles than usual. "What would the Captain say?"',
        '"The Captain says those seven merchant vessels would rather work for someone who doesn\'t make them run a fortress."',
        '"Blunt."',
        '"Delvessa, you just said it with more syllables."',
        'She closes the ledger. "I\'ll have the full assessment by morning."',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'durrek_garrison_explored', value: true },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA - INTELLIGENCE REPORT',
      message: 'Unidentified vessel spotted near Durrek Garrison observation perimeter. Profile matches the Renegade crew associated with fugitive Karyudon. Commander Drezh has been notified. Garrison placed on elevated alert status.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - Assessment',
      message: 'Durrek can be taken. Not easily. Not without cost. But the garrison\'s weakness is its rigidity: they follow procedure. We need to be the thing that doesn\'t have a procedure.',
    }},
  ],
  currentBeat: 0,
};
