import { StoryScene } from '../../types/game';

export const nightWatchScene: StoryScene = {
  id: 'night_watch',
  title: 'THE WATCH',
  nextSceneId: 'act1_intel',
  characters: ['karyudon', 'dragghen'],
  beats: [
    {
      id: 'watch_01',
      title: 'MIDDLE WATCH',
      paragraphs: [
        'Two in the morning.',
        'The harbor is dead. No movement on the docks. No lanterns in the market. The Fallow Tide rocks on a tide so gentle it barely counts as motion, hull creaking in the rhythm of old wood adjusting to cold water.',
        'You\'re on deck because you can\'t sleep. This happens. Has happened since the prison ship. The hold was dark and the ceiling was low and the chains were tight and now, four weeks free, your body still wakes at two in the morning and puts you somewhere with open sky and no walls.',
        'The stars are out. Every one of them. Open sky, the whole field. Tavven Shoal\'s lights are weak enough that the stars win.',
      ],
    },
    {
      id: 'watch_02',
      paragraphs: [
        'Your hands are on the railing. The wood is cold. Salt-damp. Your Iron sits just under the surface, not active, just present. The way a muscle holds tension even when you\'re not flexing it.',
        'Kirin\'s face.',
        'It comes at two in the morning. Always. The meal the night before. The laugh that was too loud. The hands that kept moving to his belt. You should have read it. You didn\'t read it.',
        'The uncle\'s patient fingers. Three years of invisible work. By the time you noticed, the foundation was dust.',
        'The twins.',
        'You grip the railing hard enough to hear the wood protest.',
      ],
    },
    {
      id: 'watch_03',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"You\'re going to break that."',
        'You didn\'t hear him come up. For a man his size, Dragghen moves quietly when he wants to. He\'s leaning against the mainmast in a way that suggests he\'s been there for a while. Nightclothes. Bare feet on the deck. His natural plating catches starlight.',
        '"Can\'t sleep either," he says. Not a question. He knows. "I was checking the port-side keel joint. It\'s been singing when the tide shifts. E-flat. I don\'t like E-flat in a keel joint."',
        'He comes to the railing. Stands next to you. Two large men looking at a harbor that\'s asleep.',
      ],
    },
    {
      id: 'watch_04',
      paragraphs: [
        'Silence. Two people not needing to fill the air with words because the air is fine empty.',
        'A fishing boat enters the harbor. Running lights dim. Late return or early departure. Either way, someone out there is working when the rest of the world is sleeping.',
        '"You ever rate the ocean?" you ask.',
        '"No."',
        '"Why not?"',
      ],
    },
    {
      id: 'watch_05',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'He thinks about it. Dragghen thinks about everything.',
        '"Some things are outside the scale. The ocean is one of them. You can rate a ship. You can rate a harbor. You can rate the timber and the rigging and the paint job. But the ocean is the thing that tests all of it. You don\'t rate the test. You rate how well the thing holds up."',
        'He leans on the railing. It doesn\'t protest under his weight. He\'s standing in the exact spot where the rail is reinforced. He knows every inch of this ship.',
        '"I rate the crew a four. That\'s high for a week. Most crews take a month to reach a four. Some never do."',
      ],
    },
    {
      id: 'watch_06',
      paragraphs: [
        'The fishing boat docks. Two figures climb out, move ropes, tie off. Practiced motions. Work that doesn\'t need light because the hands remember the knots.',
        'You look at the stars.',
        '"My brother sold me out."',
        'You don\'t know why you say it. Two in the morning. Open sky. A man next to you who doesn\'t fill silence with noise.',
        '"Kirin. The uncle got to him. Three years of quiet work. I didn\'t see it." Your grip on the railing relaxes. Not because the anger is gone. Because you\'re tired of holding it in the same shape. "The twins are out there somewhere. I don\'t know where."',
      ],
    },
    {
      id: 'watch_07',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen doesn\'t respond for a long time. The tide turns. Somewhere in the hull, a keel joint sings. E-flat.',
        '"Forty workers. I trained them. Five years. The Kolmari signed them over to a mining consortium because the numbers made sense." He says it the same way he says hull ratings. Flat. Precise. Measured. "I punched through the foreman\'s desk. Walked out. Didn\'t look back." A pause. "I think about those forty names every night. Right around two in the morning."',
        'He straightens up.',
        '"Can\'t fix what happened. Can fix what happens next. That\'s the job."',
      ],
    },
    {
      id: 'watch_08',
      paragraphs: [
        'The stars. The harbor. The ship.',
        'Two men on a deck at two in the morning, awake because the past won\'t let them sleep and the future hasn\'t learned their names yet.',
        'Dragghen goes below. You hear him stop at the keel joint. Tap it. Listen. Tap it again. He\'ll fix the E-flat by morning. That\'s what Dragghen does. He hears the wrong note and he fixes it.',
        'You stay on deck. The stars wheel. The tide turns. The harbor sleeps.',
        'Two in the morning. Open sky. No chains.',
        'You can work with that.',
      ],
      autoAdvance: false,
    },
  ],
  onComplete: [
    { type: 'flag', target: 'night_watch_complete', value: true },
    { type: 'loyalty', target: 'dragghen', value: 5 },
  ],
  currentBeat: 0,
};
