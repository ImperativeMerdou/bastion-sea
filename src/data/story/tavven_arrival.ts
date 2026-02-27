import { StoryScene } from '../../types/game';

export const tavvenArrivalScene: StoryScene = {
  id: 'tavven_arrival',
  title: 'TAVVEN SHOAL',
  characters: ['karyudon'],
  nextSceneId: 'dragghen_recruitment',
  onComplete: [
    { type: 'flag', target: 'tavven_arrival_complete', value: true },
  ],
  beats: [
    {
      id: 'arrival_01',
      title: 'THE PORT',
      paragraphs: [
        'Tavven Shoal.',
        'Three hundred buildings on a coral platform that the ocean built and commerce furnished. The fish market is already running at volume and the sound carries across the harbor like an argument that everyone\'s winning. Six piers, forty berths, every one of them occupied.',
        'A boy no older than twelve is hauling a fishing net twice his weight. He sees you wade in from the sand bar and stops pulling. The net sags into the water. His mouth opens. Nothing comes out.',
        'Seven feet of Oni in torn prison scraps, salt-crusted, burnt across the shoulders, dripping seawater onto the dock boards with horns that curve forward like siege rams and the expression of a man who has not eaten in three days and is deeply aware that he\'s standing next to a fish market.',
      ],
    },
    {
      id: 'arrival_02',
      paragraphs: [
        'The dockworkers pretend not to stare. They fail.',
        'A Varrek dockhand, canine-featured, grey-furred, one ear permanently folded from an old break, holds up a hand. "Cargo or crew?"',
        '"Neither."',
        '"Then you\'re a problem or a customer. Which?"',
        '"Haven\'t decided yet."',
        'The Varrek looks at your horns. At the chain marks on your wrists. At your bare feet. He arrives at a conclusion, files it away, and goes back to his ropes. That\'s Tavven Shoal. People see everything and decide what matters later.',
      ],
    },
    {
      id: 'arrival_03',
      paragraphs: [
        'The Kolmari trade office sits behind the main dock: blue-and-silver flag hanging limp in the dead air, clean windows, closed door. Nobody comes out. The Kolmari manage the money in this part of the Bastion Sea the way a landlord manages a building. They own the debt. They don\'t fix the stairs.',
        'Past the merchant quarter, the rope-bridge district. Buildings get smaller. Wood gets older. People get poorer the further you walk from the harbor. Tavven Shoal has a circulation problem: all the blood flows to the center and the edges go numb.',
        'Above it all, on a coral shelf overlooking the harbor: a squat building with a line out the door. The Harbor Board. Run by a woman named Pettha Koss, according to the dockworkers, who say her name the way people say the name of someone who can end their livelihood with a stamp.',
      ],
    },
    {
      id: 'arrival_04',
      paragraphs: [
        'Your stomach growls. Loud enough that the net-hauling boy looks up again from twenty feet away.',
        'You have no money. No contacts. No reputation in this part of the world. What you have is a stolen God Fruit in a dead officer\'s coat pocket, Forged Iron, and a plan that currently has three steps:',
        'Find food. Find a ship. Find a crew.',
        'Food first.',
      ],
    },
    {
      id: 'arrival_05',
      paragraphs: [
        'The fish market is a cathedral of noise and smell. Grilled eel on iron skewers. Rice wrapped in kelp leaves. Something amber-colored in clay cups that smells like it could strip paint. Spices in open barrels: turmeric, black salt, dried chili from the northern islands. A vendor with a cleaver is breaking down a tuna the size of a small child with the casual precision of someone who\'s done this ten thousand times.',
        'Your feet carry you to a food stall at the market\'s edge. A heavyset human woman with burns on her forearms and the posture of someone who has been standing at a grill since before dawn. She watches you approach with the expression of a woman calculating exactly one thing.',
      ],
      choices: [
        {
          id: 'ask_work',
          text: '"Got any heavy lifting that needs doing? I\'ll work for a meal."',
          consequence: 'Honest labor. Strength has value. Trade it.',
          available: true,
          effects: [
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'arrival_approach', value: 'worker' },
          ],
        },
        {
          id: 'ask_direct',
          text: '"Feed me. I\'ll remember it when I own this island."',
          consequence: 'Bold. Ridiculous. The kind of line people remember or laugh at.',
          available: true,
          effects: [
            { type: 'infamy', value: 2 },
            { type: 'flag', target: 'arrival_approach', value: 'bold' },
          ],
        },
        {
          id: 'sit_and_wait',
          text: 'Sit down at the stall. Say nothing. Let your presence make the argument.',
          consequence: 'A seven-foot Oni sitting at a food stall has its own gravity.',
          available: true,
          effects: [
            { type: 'reputation', value: 1 },
            { type: 'infamy', value: 1 },
            { type: 'flag', target: 'arrival_approach', value: 'silent' },
          ],
        },
      ],
    },
    {
      id: 'arrival_06',
      speaker: 'hella',
      speakerName: 'Hella',
      paragraphs: [
        'She studies you the way people study weather: trying to decide if what\'s coming is something to prepare for or something to enjoy.',
        'Then she puts a plate in front of you. Three eel skewers, a mound of rice, and a cup of the amber liquid.',
        '"Storm tea," she says. "Burns going down. Wakes you up coming back."',
        'You eat. The eel is good. The rice is better. The storm tea hits your throat like liquid fire and then unfolds into something warm and sharp that makes the world snap into focus for the first time in weeks.',
        '"Hella," she says. "Everyone eats here. Even the ones who can\'t pay. Especially the ones who look like they need it."',
        'She looks at the chain marks on your wrists. "Wardensea?"',
        '"Former."',
        '"Welcome to Tavven Shoal. Don\'t cause trouble in my market."',
      ],
    },
    {
      id: 'arrival_07',
      paragraphs: [
        'You finish the meal. Your posture changes: back straightens, chin lifts, the prison hunch dropping away one vertebra at a time. The storm tea sits in your gut like a coal.',
        'The market moves around you. Voices, commerce, the clatter of five hundred people conducting business at maximum volume. A Grimoire broadcast plays from someone\'s pocket: bounty updates, weather warnings, the daily noise of a world that doesn\'t know you exist.',
        'That changes today.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
};
