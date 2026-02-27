import { StoryScene } from '../../types/game';

export const rotstoneArrivalScene: StoryScene = {
  id: 'explore_rotstone',
  title: 'ROTSTONE - THE COMPASS KILLER',
  characters: ['karyudon', 'suulen', 'kovesse', 'vorreth'],
  beats: [
    {
      id: 'rotstone_arrive_01',
      title: 'THE ISLAND THAT SAYS NO',
      paragraphs: [
        'Your compass died forty minutes ago. Kovesse\'s three Grimoires went dark twelve minutes after that. The navigation instruments spin or freeze or display numbers that don\'t correspond to any heading that exists.',
        'Suulen got you here. Spatial Sight doesn\'t care about magnetic fields. She reads the shape of the ocean floor, the displacement of the current, the volume of the island itself. She stood at the prow with her eyes closed and pointed.',
        'Rotstone is exactly the color its name suggests. Reddish-black volcanic rock rising from the sea. The stone itself radiates heat. Not enough to burn, but enough to notice. Warm like a body. Warm like something alive.',
      ],
    },
    {
      id: 'rotstone_arrive_02',
      paragraphs: [
        'There is no harbor. No dock. No sign that anyone has ever built anything here. The Kolmari estimated Rotstone\'s mineral value at four billion Sovereigns and still couldn\'t establish a mining operation. Three attempts. Three evacuations. The island rejects settlement the way a body rejects a transplant.',
        'You anchor offshore and take a landing craft in. The rock under your feet hums, a low vibration you feel in your teeth, in the base of your horns, in the marrow of your Oni bones. It\'s not unpleasant. It\'s familiar in a way you can\'t explain.',
      ],
    },
    {
      id: 'rotstone_arrive_03',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen stops walking. She\'s been fine, better than fine, moving with a certainty you\'ve never seen from her on open ground. But now she stops, and her silver-blue eyes are wide.',
        '"Captain. The interior of this island is not solid rock."',
        '"What is it?"',
        '"I don\'t know. My Spatial Sight reads it as... structured. Chambers. Passages. Something built, not carved, not natural. And it goes deep, deeper than any mine I\'ve mapped. The geometry is wrong. The angles don\'t match anything in my forty years of cartography."',
        'She looks at you. "This is like what I found under Kingsrun. But bigger. Much bigger."',
      ],
    },
    {
      id: 'rotstone_arrive_04',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse has her tools out. She\'s running a bare wire along the rock surface, reading the conductivity with her tongue on the other end. "Captain, this rock is emitting a signal. Not Grimoire. Pre-Grimoire. Whatever frequency this is, it predates the communication network by... I don\'t even know. A lot. The signal is the reason compasses fail. It\'s not a magnetic anomaly. It\'s a broadcast. Something in there is talking. It has been talking for a very long time and nobody built a receiver."',
      ],
    },
    {
      id: 'rotstone_arrive_05',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"The Wardensea classified Rotstone as a navigation hazard and prohibited approach within five nautical miles." He scans the rock face with a professional eye. "I always assumed it was because of the compass interference. Now I wonder if they knew what was inside and decided the best strategy was to make sure nobody looked."',
      ],
    },
    {
      id: 'rotstone_arrive_choice',
      paragraphs: ['The entrance Suulen identified is a fissure in the western face, natural-looking from the outside, but her Spatial Sight says the passage beyond is too regular, too deliberate.'],
      choices: [
        {
          id: 'rotstone_enter',
          text: '"We go in. Suulen leads. Everyone else stays close."',
          consequence: 'Into the unknown. Suulen\'s domain.',
          available: true,
          effects: [
            { type: 'flag', target: 'rotstone_entered', value: true },
            { type: 'loyalty', target: 'suulen', value: 5 },
            { type: 'resource', target: 'intelligence', value: 10 },
          ],
        },
        {
          id: 'rotstone_scan_first',
          text: '"Kovesse, can you build a receiver for that signal? I want to know what it\'s saying before we walk into it."',
          consequence: 'Careful approach. Decode the signal before entering.',
          available: true,
          effects: [
            { type: 'flag', target: 'rotstone_signal_decoded', value: true },
            { type: 'loyalty', target: 'kovesse', value: 5 },
            { type: 'resource', target: 'intelligence', value: 15 },
          ],
        },
        {
          id: 'rotstone_claim_surface',
          text: '"Mark it. Map the surface. We\'ll come back prepared."',
          consequence: 'Strategic patience. The island isn\'t going anywhere.',
          available: true,
          effects: [
            { type: 'flag', target: 'rotstone_surface_mapped', value: true },
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'resource', target: 'materials', value: 20 },
          ],
        },
      ],
    },
    {
      id: 'rotstone_arrive_06',
      effect: 'flash',
      paragraphs: [
        'Whatever you choose, the island hums beneath your feet. The vibration settles into your bones like a second heartbeat.',
        'And then it changes.',
        'Not the hum. The island. The fissure Suulen identified begins to glow. Faint at first, warm amber light bleeding from the rock. The light pulses. Once. Twice. In time with your heartbeat.',
        'Your heartbeat. Not Suulen\'s. Not Vorreth\'s. Yours.',
        'Kovesse\'s dead Grimoires crackle. Static. Then a sound that isn\'t static. A sound like a voice speaking a language that doesn\'t have words, just shapes. Just pressure. It lasts three seconds and then the Grimoires die again.',
      ],
    },
    {
      id: 'rotstone_arrive_06b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Captain." Kovesse\'s hands are shaking. "That signal. The one I said was a broadcast? It just changed frequency." She looks at you. "It changed when you got close."',
      ],
    },
    {
      id: 'rotstone_arrive_07',
      title: 'THE DOOR',
      effect: 'heavy_shake',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'You walk to the fissure. Nobody stops you. Nobody could.',
        'The glow intensifies with every step. The rock is warm under your boots. Then hot. Then exactly the temperature of your own skin, which is wrong, which is impossible, which means the island is reading you the way Suulen reads cave systems.',
        'At the entrance, you press your palm to the stone.',
        'The entire island shudders.',
        'A reaction. Like metal touching a live current. The fissure widens. The rock opens. It slides apart with a low grinding hiss, and behind it is a corridor of smooth stone lit from within by veins of molten amber that run through the walls like a circulatory system.',
        'The corridor goes down. Deep. The warm air rising from it smells like ozone and old metal and something sweet that you can\'t identify. At the far edge of your vision, the corridor turns, and the light beyond the turn is brighter.',
        'Suulen\'s Spatial Sight blazes. "Captain. The structure below us just... activated. Sections that were inert are powering on. Whatever this place is, it was dormant. It\'s reacting." Her voice drops. "Iron Forging. It\'s reacting to Iron Forging. The same way mineral veins respond to heat, but on a scale I\'ve never seen."',
      ],
    },
    {
      id: 'rotstone_arrive_end',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'You don\'t go deeper. Not today. The corridor hums with a patience that says it will still be here tomorrow, and next year, and in a thousand years. It waited this long. It can wait a little longer.',
        'But when you pull your hand from the wall, there\'s a mark. Burned into your palm. A pattern. Geometric. Angular. It looks like a horn. It looks like a crown. It looks like something older than both.',
        'The mark fades in seconds. But Suulen saw it. Kovesse recorded it. And you can still feel it, a warmth in the center of your hand that wasn\'t there before.',
        '"Captain." Suulen stands at the edge of the fissure. Her silver-blue eyes reflect the warm amber light from within. "Whatever is in there has been in there longer than any nation in the Bastion Sea. Longer than the Wardensea. Longer than the Morventhi. Longer than the Oni."',
      ],
    },
    {
      id: 'rotstone_arrive_endb',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"I don\'t know what it wants. But it\'s awake now, and I don\'t think it goes back to sleep."',
        'The island hums. The sea around it is strangely calm. Somewhere deep in the reddish-black stone, a door that has been closed longer than history has records stands open.',
        'You\'ll be back.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'rotstone_explored', value: true },
    { type: 'resource', target: 'intelligence', value: 5 },
    { type: 'dominion', target: 'sight', value: 15 },
    { type: 'dominion', target: 'king', value: 10 },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'ROTSTONE EXPLORED',
      message: 'The magnetic anomaly is more than a navigation hazard. Something ancient lives inside the island, something that predates every civilization in the Bastion Sea. Suulen believes it may be connected to the structure she found beneath Kingsrun.',
    }},
  ],
  currentBeat: 0,
};
