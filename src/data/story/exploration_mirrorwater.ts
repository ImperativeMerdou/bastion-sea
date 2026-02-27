import { StoryScene } from '../../types/game';

export const mirrorwaterArrivalScene: StoryScene = {
  id: 'explore_mirrorwater',
  title: 'MIRRORWATER - STILL WATERS',
  beats: [
    {
      id: 'mirrorwater_arrive_01',
      title: 'THE GLASS SEA',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'You almost miss it.',
        'Mirrorwater doesn\'t announce itself. No harbor, no lighthouse, no smoke from cooking fires. The island is a ring of low coral walls surrounding a lagoon so still it reflects the sky like hammered silver. Suulen spots it first. Her Spatial Sight reads gaps in the coral from half a mile out, and she points toward a break in the reef that isn\'t on any official chart.',
        '"There," she says. "See how the current breaks? The coral wall is hollow. Natural channel, wide enough for our hull if we go single-mast."',
        'You enter the lagoon at dawn. The water is so clear you can see the bottom. Forty feet of turquoise nothing. Schools of silver fish part around the hull like a living curtain.',
        'Nobody speaks. Even Kovesse puts down her relay.',
      ],
    },
    {
      id: 'mirrorwater_arrive_02',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'The lagoon is a near-perfect circle. The coral walls rise ten feet above the waterline, covered in moss and bird nests. Inside, the water is calm. Unnaturally calm. No waves. No current. The surface is a mirror.',
        'Suulen stands at the bow, eyes wide, hands braced on the rail. The navigator who treats geography as a problem to solve is staring at this lagoon like it solved itself.',
        '"I\'ve read about places like this," she says. "Tunnel-runner archives. The old routes through the southern reefs. They called them \'Rest Pools.\' Natural harbors where the current cancels itself out. Opposing tidal forces creating a pocket of perfect stillness."',
        '"It\'s a pond, Suulen."',
        '"It\'s a miracle of hydrodynamic equilibrium, Captain. Show some respect."',
        'She\'s right. There\'s something about Mirrorwater that feels different. Protected. Hidden from the chaos of the Bastion Sea like a secret someone forgot to tell.',
      ],
    },
    {
      id: 'mirrorwater_arrive_03',
      paragraphs: [
        'An old man watches you from a platform built on stilts at the lagoon\'s edge. Driftwood and canvas. Seven structures total, maybe two hundred people. Hermits. The kind who came to the Bastion Sea to disappear and succeeded.',
        'He has the weathered look of someone the coral has started to accept as furniture.',
        '"You\'re big," he says.',
        '"I\'m an Oni."',
        '"That explains it." He goes back to mending a fishing net. The conversation, apparently, is over.',
      ],
    },
    {
      id: 'mirrorwater_arrive_03b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Vorreth surveys the lagoon with professional eyes. "This is a perfect staging area. Hidden approach. Protected anchorage. Fresh water. You could park a small fleet in here and nobody would know until you sailed out."',
      ],
      choices: [
        {
          id: 'mirrorwater_chart_lagoon',
          text: 'Have Suulen chart the lagoon. Every depth, every entry point, every current.',
          consequence: 'Knowledge is territory. Map it before someone else does.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'loyalty', target: 'suulen', value: 8 },
            { type: 'flag', target: 'mirrorwater_charted', value: true },
          ],
        },
        {
          id: 'mirrorwater_claim_anchorage',
          text: 'Plant a marker. This lagoon is yours now.',
          consequence: 'First claim. Unclaimed territory.',
          available: true,
          effects: [
            { type: 'reputation', value: 2 },
            { type: 'infamy', value: 1 },
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'flag', target: 'mirrorwater_claimed', value: true },
          ],
        },
        {
          id: 'mirrorwater_rest',
          text: 'Rest. The crew needs it. You need it. Even conquerors sleep.',
          consequence: 'Recover. Breathe.',
          available: true,
          effects: [
            { type: 'resource', target: 'supplies', value: 5 },
            { type: 'loyalty', target: 'dragghen', value: 3 },
            { type: 'loyalty', target: 'delvessa', value: 3 },
            { type: 'loyalty', target: 'suulen', value: 3 },
            { type: 'loyalty', target: 'kovesse', value: 3 },
            { type: 'loyalty', target: 'vorreth', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'mirrorwater_arrive_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Night at Mirrorwater is something else.',
        'The lagoon reflects the stars so perfectly that it feels like floating in space. The coral walls block the wind, so the only sound is water lapping against the hull and the distant cry of night birds.',
        'Dragghen cooks. Fresh-caught lagoon fish, prepared with herbs from the spring bank. The crew eats on deck, bare feet dangling over the mirror-still water, and for the first time in weeks, nobody mentions conquest or bounties or the Wardensea.',
        'Delvessa sits next to you. Close.',
        '"This is the first time I\'ve seen you stop," she says.',
        '"I haven\'t stopped."',
        '"You\'ve slowed down. That\'s close enough." She pulls her coat tighter. "Places like this are dangerous for people like us."',
        '"Because they\'re hidden?"',
        '"Because they\'re quiet. Quiet makes room for things that don\'t fit in the planning."',
        'She watches the stars in the lagoon.',
        '"We should inventory the freshwater source in the morning."',
      ],
    },
    {
      id: 'mirrorwater_arrive_05',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Dawn. The lagoon is gold. The freshwater spring catches the first light and throws prisms across the coral walls.',
        'Suulen has been awake for hours, mapping. Precise Morventhi notation that captures depth, current, reef composition, and entry angles in a single diagram.',
        '"Three hidden channels," she reports. "Two accessible at high tide, one at all times. The main channel is navigable by anything up to a war galleon. The secondary channels are single-ship only." She pauses. "There\'s also something interesting on the southern wall. Carved marks. Old. Possibly pre-colonial."',
        '"What kind of marks?"',
        '"Navigation. Someone used this lagoon as a waypoint centuries ago. The carvings match Tunnel-Runner notation from the Fourth Era." She looks at you with quiet intensity. "Captain, this place has history. We should respect that."',
      ],
    },
    {
      id: 'mirrorwater_arrive_05b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse starts recording. "Mysterious ancient carvings at the hidden lagoon. The Oni Captain Karyudon discovers a forgotten waypoint. Is this a sign? A message from the old world? Stay tuned--"',
      ],
    },
    {
      id: 'mirrorwater_arrive_05c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Kovesse."',
      ],
    },
    {
      id: 'mirrorwater_arrive_05d',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Fine. But this is CONTENT, Captain."',
      ],
    },
    {
      id: 'mirrorwater_arrive_06',
      paragraphs: [
        'Dragghen wraps leftover fish in dock leaves. Suulen double-checks her charts. Vorreth stands at the stern as the ship clears the channel.',
        'The open sea hits after the stillness of the lagoon. Wind, waves, current. Suulen adjusts the heading without being asked.',
        'Behind you, Mirrorwater vanishes into the reef line.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'mirrorwater_explored', value: true },
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'SUULEN VASSERE - Mirrorwater Analysis',
      message: 'Mirrorwater is a natural fortress. Three entry channels, all defensible. Fresh water. Calm anchorage. The pre-colonial carvings suggest Tunnel-Runner origin. This was a waypoint on the old routes before the current factions existed. Strategic value: immense. Recommend establishing a permanent cache here at minimum.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - Tactical Assessment',
      message: 'Mirrorwater could serve as a forward operating base for Central Belt operations. The hidden approach makes it ideal for staging without Wardensea or Kolmari detection. A fleet of up to twelve ships could anchor here undetected. War-winning advantage.',
    }},
  ],
  currentBeat: 0,
};
