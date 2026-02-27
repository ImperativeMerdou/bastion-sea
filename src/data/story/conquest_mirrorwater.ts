import { StoryScene } from '../../types/game';

export const mirrorwaterConquestScene: StoryScene = {
  id: 'conquest_mirrorwater',
  title: 'MIRRORWATER - THE HIDDEN HAVEN',
  beats: [
    {
      id: 'mirrorwater_conquest_01',
      title: 'THE STILL PLACE',
      paragraphs: [
        'The cavern mouth swallows the ship like a secret being kept.',
        'You remember the entrance from the first time, the gap in the cliff face that looks like shadow until you\'re inside it, the narrow channel where the water goes dark and the hull scrapes stone on both sides. Suulen navigated it then with the calm of a woman threading a needle in the dark. She does it again now with something different. Ownership.',
      ],
    },
    {
      id: 'mirrorwater_conquest_01b',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      expression: 'satisfaction',
      paragraphs: [
        '"Hard starboard in three," she calls from the bowsprit, one hand raised, her Forged Sight mapping the passage in dimensions the rest of you can\'t perceive. "Two. One. Now."',
        'The ship turns. The stone walls fall away. And Mirrorwater opens up.',
        'Even the second time, it stops you.',
        'The lagoon is vast, wider than you remembered, the water so still it doesn\'t look like water at all. It looks like sky poured into a bowl of stone. The cliffs rise on all sides, sheer and dark, draped in vines that trail into the surface without breaking it. The light comes in from above, a ragged opening in the rock ceiling three hundred feet up where the sun falls through in columns that make the water glow.',
        'Nobody speaks for a long time. Even Kovesse just stands at the rail with her mouth open.',
      ],
    },
    {
      id: 'mirrorwater_conquest_01c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"We\'re not visiting this time," you say.',
      ],
    },
    {
      id: 'mirrorwater_conquest_01d',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen turns from the bowsprit. Something in her stance is different.',
        '"No," she says. "We\'re not."',
      ],
    },
    {
      id: 'mirrorwater_conquest_02',
      title: 'THE BLUEPRINT',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen unrolls the plans on the flat stone platform where the crew has gathered. Actual paper. Actual ink. She drew these by hand, not from memory, not in the dark by touch the way she usually works, but with light and care she\'s never taken before.',
        'The crew notices. Nobody says anything about it.',
        '"The lagoon has three natural advantages." Her voice is the same dry precision it always is, but her fingers smooth the paper like she\'s touching something alive. "Deep-water anchorage: twelve fathoms at the center, shelving to four at the edges. Flat stone platforms on the eastern wall, natural shelving suitable for construction. And here--" she taps a point on the map "--a freshwater spring. Tested. Clean. Enough volume for a permanent installation."',
      ],
    },
    {
      id: 'mirrorwater_conquest_02a',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"The cavern entrance is the only approach by sea. The cliff face above is sheer for two hundred feet in every direction. From the air, the canopy and overhang conceal ninety percent of the lagoon surface. This place is invisible."',
      ],
    },
    {
      id: 'mirrorwater_conquest_02b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth leans forward. "I want defensive positions on the cavern mouth. Three choke points minimum. If someone finds this place, I want to make them regret it before they\'re twenty feet inside."',
      ],
    },
    {
      id: 'mirrorwater_conquest_02c',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Noted." Suulen marks it without looking up.',
      ],
    },
    {
      id: 'mirrorwater_conquest_02d',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen raises a hand like he\'s in school. "Kitchen."',
      ],
    },
    {
      id: 'mirrorwater_conquest_02e',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"You always want a kitchen."',
      ],
    },
    {
      id: 'mirrorwater_conquest_02f',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"If we\'re going to hide, we\'re going to eat well while we do it. I\'m not living off hardtack in a place this beautiful."',
      ],
    },
    {
      id: 'mirrorwater_conquest_02g',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse bounces on her heels. "Grimoire monitoring station. Full signal array. I can set up passive receivers that--"',
      ],
    },
    {
      id: 'mirrorwater_conquest_02h',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Receive only," Suulen cuts her off.',
      ],
    },
    {
      id: 'mirrorwater_conquest_02i',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"...fine. Receive only. But a GOOD one. Multi-band. Long range. I want to hear everything the Bastion Sea says about us."',
      ],
    },
    {
      id: 'mirrorwater_conquest_02j',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa speaks last, as she usually does. "A records room. Secure storage for intelligence files, financial ledgers, operational planning. Somewhere dry, somewhere locked."',
      ],
    },
    {
      id: 'mirrorwater_conquest_02k',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen looks at you. The plans are spread between all of them, the kitchen, the signal station, the defensive positions, the records room. And beneath it all, the bones of something elegant. Something Morventhi.',
        '"Captain. Your call on priorities."',
      ],
      choices: [
        {
          id: 'mirrorwater_suulen_design',
          text: '"Suulen, build it your way. This is your project."',
          consequence: 'Full trust. Her project.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 12 },
            { type: 'resource', target: 'intelligence', value: 8 },
            { type: 'resource', target: 'materials', value: -30 },
            { type: 'flag', target: 'mirrorwater_suulen_design', value: true },
          ],
        },
        {
          id: 'mirrorwater_defense_first',
          text: '"Defense first. Vorreth designs the perimeter, Suulen handles the rest."',
          consequence: 'Practical. Defense first.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 6 },
            { type: 'loyalty', target: 'suulen', value: 4 },
            { type: 'resource', target: 'materials', value: -40 },
            { type: 'flag', target: 'mirrorwater_defense_first', value: true },
          ],
        },
        {
          id: 'mirrorwater_crew_focused',
          text: '"Build it for the crew. Kitchen, monitoring station, everything they asked for."',
          consequence: 'For the crew. Everything they asked.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 4 },
            { type: 'loyalty', target: 'dragghen', value: 4 },
            { type: 'loyalty', target: 'kovesse', value: 4 },
            { type: 'loyalty', target: 'vorreth', value: 4 },
            { type: 'loyalty', target: 'delvessa', value: 4 },
            { type: 'resource', target: 'materials', value: -50 },
            { type: 'resource', target: 'supplies', value: -15 },
            { type: 'flag', target: 'mirrorwater_crew_focused', value: true },
          ],
        },
      ],
    },
    {
      id: 'mirrorwater_conquest_03',
      title: 'EIGHTY-SEVEN YEARS',
      paragraphs: [
        'The days blur together. Not unpleasantly, the way good work blurs, when the body is tired and the mind is full and the hours feel earned.',
        'Dragghen hauls stone like he was born to it. The Gorundai muscles that were made for copper mines turn out to be perfect for dragging slabs of flat rock into position. He sings while he works, low Gorundai mining songs that echo off the cavern walls and come back sounding like a choir. By the third day, even Vorreth is humming along.',
        'Kovesse rigs the signal station in a natural alcove above the waterline. She runs cable through crevices, mounts receivers in places nobody would think to look, and somehow turns a pile of salvaged parts into something that pulls Grimoire signals from two hundred miles out. When Suulen reminds her, again, that it\'s receive-only, she just grins and says, "For now."',
        'Vorreth walks the cavern mouth seventeen times before he\'s satisfied. He marks sight lines with chalk, tests angles of fire with a plumb line, and spends an entire afternoon stacking stones into defensive positions that look natural from the water. When he\'s done, the entrance looks exactly the same as before. That\'s the point.',
        'Delvessa claims a dry alcove near the back of the cavern and turns it into something that looks like it\'s been there for years. Shelves carved from the rock. A desk made from driftwood. Ledgers arranged by island, by date, by threat level. She works with the quiet efficiency of a woman who has organized intelligence operations for governments. Which she has.',
        'And Suulen moves through all of it like a current.',
        'She\'s everywhere. Adjusting Dragghen\'s stonework by inches. Rerouting Kovesse\'s cables along paths that follow the rock\'s natural grain. Standing with Vorreth at the cavern mouth, eyes unfocused, her Forged Sight reading the space in ways none of them can follow. She doesn\'t give orders. She gives corrections. Small ones.',
        'On the fourth evening, you find her on the lookout point.',
        'It\'s the highest flat surface in the cavern, a ledge of stone that juts out over the lagoon like a balcony. Below, the water reflects everything: the construction lights, the moving figures, the slow work of a hidden place becoming a home. The mirror surface is broken now, disturbed by activity, by boats, by the ripples of things being built. It doesn\'t look worse. It looks lived in.',
        'Suulen is sitting with her legs hanging over the edge. Her hands are still. Suulen\'s hands are never still.',
      ],
    },
    {
      id: 'mirrorwater_conquest_03b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Suulen."',
      ],
    },
    {
      id: 'mirrorwater_conquest_03c',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'She doesn\'t startle. She heard you coming sixty feet ago. Forged Sight.',
        '"Captain."',
      ],
    },
    {
      id: 'mirrorwater_conquest_03d',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'You sit next to her. The ledge groans. Seven feet of Oni is a lot for a rock shelf. She glances at you sideways, the closest thing to alarm a Morventhi shows, and then decides the stone will hold.',
        'For a while, neither of you says anything. Below, Dragghen laughs at something Kovesse said. The sound rises and softens against the cavern walls.',
        '"Morventhi live underground," she says. Not to you. To the lagoon. "The deep places. Touch, sound, the shape of air on skin. I was a tunnel-runner for forty years."',
        'She stops. Her hands move once, measuring something that isn\'t there.',
        '"I never built anything." Quiet. "Eighty-seven years. I found places. I mapped places. I led people to places." She\'s looking at the construction below, the lights reflecting in the water. "Finding was always the job. I didn\'t know it wasn\'t enough."',
        'You sit with that. Below, Dragghen drops something metal and swears in Gorundai.',
        '"The ventilation shaft on the kitchen is wrong," she says. "The angle pulls smoke toward the signal station. Kovesse hasn\'t noticed yet because she\'s been too busy hiding a transmitter inside the receiver array." She stands up. Her hands are moving again. "I need to fix it before she broadcasts our location to the entire Central Belt."',
        'She\'s halfway down the ledge before she stops.',
      ],
    },
    {
      id: 'mirrorwater_conquest_03e',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Captain."',
      ],
    },
    {
      id: 'mirrorwater_conquest_03f',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Yeah."',
      ],
    },
    {
      id: 'mirrorwater_conquest_03g',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"The stone here is good. Old limestone. It holds." She doesn\'t turn around. "I\'m going to make it hold."',
        'She leaves. You stay on the ledge. Below, the lagoon reflects the construction lights back imperfectly, the water disturbed by work, by boats, by the ripples of things being built. Not a mirror anymore. Something better. Something used.',
      ],
    },
    {
      id: 'mirrorwater_conquest_04',
      title: 'THE MIRROR AND THE DARK',
      paragraphs: [
        'The base is finished on the sixth day.',
        'Three concealed berths inside the cavern, invisible from the channel. Underground storage carved from natural rock formations. Suulen used the existing cave structure, expanding where the stone allowed, leaving it where it didn\'t. A passive signal station that pulls Grimoire traffic from across the Central Belt. Defensive positions so well-integrated into the cavern walls that Vorreth himself walked past one of his own choke points without seeing it.',
        'And the kitchen. Because Dragghen got his kitchen. A proper one, built into an alcove near the freshwater spring, with a stone hearth and a ventilation shaft that disperses smoke through three different crevices so it\'s invisible from above. He\'s already cooked two meals in it. Both were unreasonably good.',
      ],
    },
    {
      id: 'mirrorwater_conquest_04b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse stands at the dock with the expression of a woman in physical pain.',
        '"The world should know about this."',
      ],
    },
    {
      id: 'mirrorwater_conquest_04c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"No."',
      ],
    },
    {
      id: 'mirrorwater_conquest_04d',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"But Captain, the visuals alone, a hidden lagoon base? The Grimoire audience would lose their minds. I can see the headline: KARYUDON\'S SECRET FORTRESS--"',
      ],
    },
    {
      id: 'mirrorwater_conquest_04e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Kovesse."',
      ],
    },
    {
      id: 'mirrorwater_conquest_04f',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"One broadcast. Five minutes. I won\'t even show the entrance--"',
      ],
    },
    {
      id: 'mirrorwater_conquest_04g',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Some things are ours." You put a hand on her shoulder. Gently, by your standards, which means she only staggers a little. "Just ours."',
      ],
    },
    {
      id: 'mirrorwater_conquest_04h',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'She looks at the lagoon. The still water. The hidden docks. The base that nobody in the Bastion Sea knows exists.',
        '"...fine." She pulls out a notebook. "But I\'m keeping notes for the memoir."',
      ],
    },
    {
      id: 'mirrorwater_conquest_04i',
      paragraphs: [
        'Night falls differently at Mirrorwater.',
        'No sunset. The cliffs cut it off. The light retreats upward through the ceiling gap by degrees until the cavern goes dark. Then the lagoon starts glowing. Bioluminescence. Organisms in the water that react to warmth, movement, the underground spring. Pale blue and green, drifting.',
        'You sit on the dock. Feet in the water. The glow swirls around your ankles.',
        'Delvessa sits down next to you. Doesn\'t say anything. Neither do you. The signal station hums somewhere in the dark. Below the dock, something large moves through the deeper water. You both watch it pass.',
      ],
    },
    {
      id: 'mirrorwater_conquest_04j',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I need to tell you something," she says.',
      ],
    },
    {
      id: 'mirrorwater_conquest_04k',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Go ahead."',
      ],
    },
    {
      id: 'mirrorwater_conquest_04l',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"The supply calculations for this base assume continued access to Sorrens shipping lanes. If we lose Sorrens, Mirrorwater starves in three weeks." She pulls her feet out of the water. The glow clings for a second, then fades. "I should have mentioned that before we committed six days of labor."',
      ],
    },
    {
      id: 'mirrorwater_conquest_04m',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You\'re mentioning it now."',
      ],
    },
    {
      id: 'mirrorwater_conquest_04n',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I\'m mentioning it now." She dries her feet on the dock planks. "I wanted to wait until it was built. Because if I said it before, you might have made a practical decision. And Suulen needed this."',
        'You look at her. She\'s not looking at you. She\'s looking at the lagoon like it\'s a spreadsheet with a formula error she can\'t find.',
      ],
    },
    {
      id: 'mirrorwater_conquest_04o',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"That\'s the least strategic thing you\'ve ever done," you say.',
      ],
    },
    {
      id: 'mirrorwater_conquest_04p',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I know." She stands up. "Don\'t tell Vorreth."',
        'She leaves. The dock is quieter with one person on it. The bioluminescence drifts. Somewhere in the dark, the large thing circles back.',
      ],
    },
  ],
  onComplete: [
    { type: 'conquer', target: 'mirrorwater', value: true },
    { type: 'flag', target: 'mirrorwater_conquered', value: true },
    { type: 'resource', target: 'materials', value: 30 },
    { type: 'resource', target: 'intelligence', value: 10 },
    { type: 'reputation', value: 3 },
    // NOTE: NO Grimoire notification - the base stays SECRET
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'SUULEN VASSERE - Personal Entry',
      message: 'The base is complete. Three concealed berths, underground storage, passive signal station. Defensive positions on the cavern mouth and two secondary exits through the rock face. Freshwater supply from the natural spring. I\'ve charted every current, every tide pattern, every approach vector. This place is ours. Nobody will find it unless we want them to. For eighty-seven years, I\'ve been finding places for other people. This one is mine.',
    }},
    { type: 'dominion', target: 'sight', value: 20 },
    { type: 'dominion', target: 'king', value: 10 },
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};
