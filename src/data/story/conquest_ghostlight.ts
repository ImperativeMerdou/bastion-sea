import { StoryScene } from '../../types/game';

export const ghostlightConquestScene: StoryScene = {
  id: 'conquest_ghostlight_reef',
  title: 'GHOSTLIGHT REEF - THE LEVIATHAN\'S WAKE',
  beats: [
    {
      id: 'ghostlight_conquest_01',
      title: 'BLOOD IN THE WATER',
      paragraphs: [
        'You return to Ghostlight Reef because Suulen asks you to.',
        'That alone is unusual. Suulen doesn\'t ask. Suulen informs, navigates, corrects your course by two degrees and pretends she didn\'t. She doesn\'t stand in the doorway of your cabin at dawn with her charts rolled tight in both hands and say, "Captain, I need to show you something." She doesn\'t use the word NEED.',
        'The Grimoire feed told part of the story. Scattered reports from the Southern Reach: fishing yields down forty percent. Three boats missing. Two bodies recovered from the reef channels, torn open from keel to prow by something with teeth the size of boarding axes. The Ghostlight Collectives had gone quiet. No trade shipments. No supply runs. The islands that depended on their fish were starting to feel it.',
        'Suulen tells the rest.',
      ],
    },
    {
      id: 'ghostlight_conquest_01b',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      expression: 'grim',
      paragraphs: [
        '"A deepwater predator. The fishers are calling it the Reef Leviathan." She spreads a chart on the table. The reef channels are marked in her precise hand, but new marks overlay the old. Red ink. Kill sites. Sighting reports. A pattern that starts at the reef\'s deep edge and spirals inward like something hunting. "It surfaced three weeks ago from the abyssal shelf south of the reef. Mature specimen, sixty feet, possibly more. Armored head, multiple jaw articulation, bioluminescent lure organs along the dorsal ridge."',
      ],
    },
    {
      id: 'ghostlight_conquest_01c',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"It mimics the ghostlight," Delvessa says. She\'s already reading the pattern. "The lure organs, it uses them to blend with the reef\'s bioluminescence. The fishers can\'t distinguish it from the coral until it\'s already beneath them."',
      ],
    },
    {
      id: 'ghostlight_conquest_01d',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Seventeen dead," Suulen says. The number lands like a stone in still water. "The collectives are pulling their boats from the deep channels. Half their fishing grounds are abandoned. They\'re running out of time."',
      ],
    },
    {
      id: 'ghostlight_conquest_01e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You look at the chart. The red marks. The spiral pattern tightening like a noose around the village.',
        '"Tessavarra asked for help?"',
      ],
    },
    {
      id: 'ghostlight_conquest_01f',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Tessavarra would die before asking anyone for anything." Suulen\'s voice is flat. Honest. "I\'m asking. The reef took us in. It showed us its light. The people who live there fed us their fish and gave us their dock and didn\'t ask for a single thing in return."',
        'She meets your eyes. Eighty-seven years of Morventhi composure, and right now every year of it is holding the line.',
        '"We owe them this."',
      ],
    },
    {
      id: 'ghostlight_conquest_01g',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You stand. Danzai is already in your hand. The iron spikes catch the cabin lamplight.',
        '"Set course for the reef."',
      ],
    },
    {
      id: 'ghostlight_conquest_02',
      title: 'THE HUNT',
      paragraphs: [
        'The reef is different at night when something is hunting in it.',
        'The bioluminescence still burns, blue and green, shot through with purple, the same living light that stopped you in your tracks the first time, but now it carries a different frequency. Fear. The coral pulses in sharp, irregular flickers instead of the slow tidal rhythm you remember. The fish have retreated to the shallow channels. The deep runs are dark and empty, wrong.',
        'Tessavarra meets you at the central dock. She looks ten years older than the last time. The fishing gaff across her shoulders isn\'t ceremonial anymore. The blade is freshly sharpened, and there\'s a stain on the ironwood shaft that didn\'t come from fish.',
      ],
    },
    {
      id: 'ghostlight_conquest_02b',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"You came back." Not a thank-you. Not surprise. Just the observation of a woman who has been measuring people for thirty-one years and is recalculating.',
      ],
    },
    {
      id: 'ghostlight_conquest_02c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Where was it last seen?"',
      ],
    },
    {
      id: 'ghostlight_conquest_02d',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"South deep run. Last night. Took a boat with three fishers aboard. We found the hull this morning." She pauses. "Just the hull."',
      ],
    },
    {
      id: 'ghostlight_conquest_02e',
      paragraphs: [
        'The crew assembles on the dock. The ghostlight flickers beneath them, and in the shifting bioluminescence their faces cycle through blue, green, purple, like masks changing. Vorreth is already thinking tactically. Kovesse is checking equipment. Dragghen is cracking his knuckles. Delvessa is watching the water with the expression of a woman running calculations she doesn\'t like the answer to.',
      ],
    },
    {
      id: 'ghostlight_conquest_02f',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen crouches at the dock\'s edge. Her Sight reaches into the water, down, deeper than the coral, into the dark channels where the reef meets the abyssal shelf. Her hands tremble. She\'s reading something massive.',
        '"It\'s in the deep structure," she says. "Resting. Sixty feet down, in a coral canyon on the south face. Its lure organs are dark. It\'s conserving energy." She looks up. "It will hunt again at full dark. Two hours."',
      ],
    },
    {
      id: 'ghostlight_conquest_02g',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Then we hunt first."',
        'Three approaches. Three different ways to kill something that has been killing this reef for three weeks. The crew looks at you, and the ghostlight makes their eyes glow.',
      ],
      choices: [
        {
          id: 'ghostlight_direct_fight',
          text: '"I\'m going in the water. Danzai and I will handle this personally."',
          consequence: 'Personal. Into the deep.',
          available: true,
          effects: [
            { type: 'combat', target: 'ghostlight_leviathan', value: true },
            { type: 'infamy', value: 6 },
            { type: 'reputation', value: 5 },
            { type: 'bounty', value: 5000000 },
            { type: 'flag', target: 'ghostlight_direct_fight', value: true },
          ],
        },
        {
          id: 'ghostlight_trap',
          text: '"Kovesse, build me a trap. Use the ghostlight against it."',
          consequence: 'Clever. Use the light against it.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 8 },
            { type: 'resource', target: 'intelligence', value: 6 },
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'ghostlight_trap', value: true },
          ],
        },
        {
          id: 'ghostlight_track_lair',
          text: '"Suulen, find its lair. We kill it where it sleeps."',
          consequence: 'Precision. Find the lair. Strike first.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 10 },
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'reputation', value: 4 },
            { type: 'flag', target: 'ghostlight_track_lair', value: true },
          ],
        },
      ],
    },
    {
      id: 'ghostlight_conquest_03',
      title: 'THE AFTERMATH',
      paragraphs: [
        'The leviathan dies hard. They always do, the old things, the deep things, the creatures that lived in the dark before anyone built a boat or cast a net. It thrashes. It screams, a sound that travels through the water and through the coral and through the reef itself, vibrating the stilt-houses above until the fishers clutch their children and stare at the sea.',
        'And then it stops.',
        'The water goes still. The bioluminescence, which had been flickering wild and arrhythmic since the fight began, settles. Slowly, the coral returns to its rhythm. Blue. Green. Purple. The tidal pulse that has measured this reef for a thousand years resumes as if it had never been interrupted.',
        'The ghostlight burns steady again.',
        'You surface.',
        'You come up in the shallows near the central dock, chest-deep in water that glows around you in blues and greens. The bioluminescence clings to your skin, your horns, the iron spikes of Danzai. Seven feet of Oni wreathed in living light, saltwater streaming from your hair, amber eyes bright in a face streaked with something dark that isn\'t entirely the leviathan\'s.',
        'You plant Danzai in the coral shelf. The war club stands upright in the shallow water, iron spikes haloed in blue ghostlight.',
        'And the fishers stare.',
        'They line the walkways and the dock edges and the bridges between stilt-houses. Fifteen hundred people. Nobody speaks.',
        'A child throws a flower. One of the reef orchids that grow on the stilt-house roofs, small, white, fragile. It lands in the glowing water next to Karyudon and drifts there, caught in the bioluminescence, petals lit from below.',
        'Then another flower. Then a handful. Then the walkways are raining white petals into the ghostlight, and the water around the Oni is a field of tiny lights and tiny flowers, and the fishers are not cheering, fishers don\'t cheer, they are quiet, practical people, but they are doing something. Acknowledging. In their own way, in the language of the reef, they are saying: we see you.',
        'You look at the flowers in the water. The bioluminescence. Your own blood mixing with the leviathan\'s in the current.',
        'You have no idea what to do with any of it.',
      ],
    },
    {
      id: 'ghostlight_conquest_04',
      title: 'THE PACT',
      paragraphs: [
        'Tessavarra finds you on the central dock the next morning. She brings fish again. The same reef-caught silver bass, the same driftwood coals, the same ironwood plank. But this time she sits next to you instead of across from you. The difference is not small.',
      ],
    },
    {
      id: 'ghostlight_conquest_04b',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"The Ghostlight Collectives have been independent for longer than I\'ve been alive," she says. "My mother led before me. Her mother before her. We answer to the reef and the tide and nothing else." She eats. Chews slowly. The way old people eat when they\'re thinking about what comes out of their mouth next. "Nobody has ever killed a deep predator for us. The Wardensea offered to patrol our waters once. We told them to leave. The Conquerors offered protection. We told them the reef was protection enough."',
      ],
    },
    {
      id: 'ghostlight_conquest_04c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"And now?"',
      ],
    },
    {
      id: 'ghostlight_conquest_04d',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"And now my fishers threw flowers at an Oni." The ghost of something, not a smile, exactly, but the space where a smile would be if Tessavarra were the kind of woman who smiled. "My fishers, who don\'t trust anyone who wasn\'t born on a stilt-house, threw flowers at a seven-foot horned outsider covered in monster blood. Because he went into the water for them."',
        'She sets down her fish. Turns to face you.',
        '"I will not call you conqueror. I will not swear fealty. I will not bow to anyone, I haven\'t bowed in sixty-three years and I\'m not starting now." Each word is a plank laid down, solid, weight-bearing. "But I will make a pact. The Ghostlight Collectives will feed your fleet. Every ship under your flag gets our fish, our salt, our reef-cured provisions. In exchange--"',
      ],
    },
    {
      id: 'ghostlight_conquest_04e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Your fishing grounds stay open. Anything comes out of the deep, anything with teeth or a flag, I deal with it. Personally if I have to." You shrug. "That\'s what I\'ve got."',
      ],
    },
    {
      id: 'ghostlight_conquest_04f',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        'She studies you. The same flat stare from the first meeting. But warmer. A degree, maybe two. On Tessavarra, that\'s a bonfire.',
        '"You don\'t talk like a king."',
      ],
    },
    {
      id: 'ghostlight_conquest_04g',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I\'m not a king yet."',
      ],
    },
    {
      id: 'ghostlight_conquest_04h',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"No. You\'re not." She extends her hand. Rough, scarred, strong. A hand that has hauled nets and gutted fish and held the tiller in storms for longer than most people live. "Fishing grounds stay open. You deal with what comes. Your words. I\'m holding you to them, Oni."',
      ],
    },
    {
      id: 'ghostlight_conquest_04i',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You take her hand. The grip is iron. Hers, not just yours.',
        '"Pact."',
      ],
    },
    {
      id: 'ghostlight_conquest_04j',
      speaker: 'tessavarra',
      speakerName: 'Tessavarra',
      paragraphs: [
        '"Pact."',
        'Somewhere on the walkway above, Kovesse is furiously scribbling in her notebook. The headline writes itself.',
      ],
    },
    {
      id: 'ghostlight_conquest_05',
      title: 'THE QUIET HOUR',
      paragraphs: [
        'Night again. The last night before departure.',
        'The reef glows. The same impossible colors: the blues that breathe, the greens that write themselves across the coral, the purples that bloom in the deep like flowers made of light. But it feels different now. Calmer. The arrhythmic flicker of fear is gone. The leviathan is dead. The ghostlight remembers what it was before the predator came, and what it is now is steady, and old, and beautiful.',
        'You sit at the edge of the north dock. Alone. Danzai laid across your knees. Your feet hang over the water, and the bioluminescence drifts around your ankles in slow blue spirals. The iron spikes of the war club glow faintly with reflected reef-light. You look like a painting of something that shouldn\'t be peaceful but is.',
        'You hear her coming. Delvessa is not loud, but she\'s deliberate. She sits down next to you on the dock and folds her hands in her lap.',
        'For a long time, the ghostlight is the only conversation.',
      ],
    },
    {
      id: 'ghostlight_conquest_05b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"You were quiet again," she says.',
      ],
    },
    {
      id: 'ghostlight_conquest_05c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I\'m sitting on a dock."',
      ],
    },
    {
      id: 'ghostlight_conquest_05d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"That\'s not what I mean." She pauses. "When you saw the reef the first time. Three words. Tonight, watching the bioluminescence settle after the kill, nothing. You just stood in the water and looked at it." She turns her head. "I\'m used to you being loud. I planned for loud. Loud is predictable. Loud I can work with."',
      ],
    },
    {
      id: 'ghostlight_conquest_05e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"And quiet?"',
      ],
    },
    {
      id: 'ghostlight_conquest_05f',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Quiet is something else entirely."',
        'The reef glows beneath you. A fish darts through a blue channel, trailing sparks.',
        '"Why do you want to be king?"',
      ],
    },
    {
      id: 'ghostlight_conquest_05g',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You watch the water for a long time.',
        '"I went into the water today."',
      ],
    },
    {
      id: 'ghostlight_conquest_05h',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"You did."',
      ],
    },
    {
      id: 'ghostlight_conquest_05i',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Nobody asked me to. No tactical advantage. No territory gained. Just a reef full of fish and some people who needed help."',
        'You scratch the back of your neck. "I don\'t have a good answer to your question. I know what I\'d do with the chair. I don\'t know how to say it without sounding like every other bastard who wanted one."',
      ],
    },
    {
      id: 'ghostlight_conquest_05j',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa pulls her knees up. Hugs them. A posture you\'ve never seen from her.',
        '"Try."',
      ],
    },
    {
      id: 'ghostlight_conquest_05k',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"No." You shake your head. "I\'ll show you instead. Every island. Every time. You\'ll get sick of watching me jump off boats."',
      ],
    },
    {
      id: 'ghostlight_conquest_05l',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She doesn\'t respond to that. A night-bird calls from somewhere in the mangroves, two sharp notes repeated. The reef pulses beneath them.',
        '"You\'re wet," she says. "You\'ve been wet for six hours and you haven\'t changed."',
      ],
    },
    {
      id: 'ghostlight_conquest_05m',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Didn\'t think about it."',
      ],
    },
    {
      id: 'ghostlight_conquest_05n',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"You smell like dead leviathan."',
      ],
    },
    {
      id: 'ghostlight_conquest_05o',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"That too."',
      ],
    },
    {
      id: 'ghostlight_conquest_05p',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She stands up. Brushes off her trousers. "Go change. You\'re ruining a perfectly good dock." She\'s halfway to the walkway before she adds, without turning, "I\'ll be running the numbers on today. The real ones. Don\'t stay up."',
      ],
    },
    {
      id: 'ghostlight_conquest_05q',
      paragraphs: [
        'You stay up.',
        'She stays. Two figures on a dock above a sea of light.',
        'Tomorrow, you sail.',
        'Tonight, the ghostlight is enough.',
      ],
    },
  ],
  onComplete: [
    { type: 'conquer', target: 'ghostlight_reef', value: true },
    { type: 'flag', target: 'ghostlight_reef_conquered', value: true },
    { type: 'resource', target: 'sovereigns', value: 200 },
    { type: 'resource', target: 'supplies', value: 30 },
    { type: 'reputation', value: 10 },
    { type: 'bounty', value: 10000000 },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE FEED - SOUTHERN REACH',
      message: 'BREAKING: Renegade captain Karyudon spotted at Ghostlight Reef. Eyewitness reports claim the Oni killed a deepwater leviathan single-handedly in the reef channels. The Ghostlight Fishing Collectives, independent for over a century, have entered a supply pact with the renegade fleet. First non-local alliance in collective history. Southern Reach trade routes are expected to shift. Wardensea advisory issued for all patrol vessels south of Anvil Cay.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'DELVESSA GHAL - Strategic Assessment',
      message: 'The Ghostlight pact secures our southern supply line. Consistent fish and salt provisions reduce our dependence on Central Belt trade. More importantly, the collectives\' fishing fleet provides passive intelligence on naval movements through the Southern Reach. Tessavarra is not our subordinate. She is our partner. I recommend we honor that distinction precisely. The reef remembers how it has been treated. So does she.',
    }},
    { type: 'dominion', target: 'iron', value: 25 },
    { type: 'dominion', target: 'sight', value: 15 },
    { type: 'dominion', target: 'king', value: 15 },
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};
