import { StoryScene } from '../../types/game';

export const kirinArrivalScene: StoryScene = {
  id: 'kirin_arrival',
  title: 'BLOOD IN THE WATER',
  characters: ['karyudon'],
  beats: [
    {
      id: 'kirin_01',
      title: 'A FAMILIAR HULL',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse spots it first. She\'s running the Grimoire scan from the crow\'s nest, one eye on the feed and one eye on the horizon, when her voice comes down the rigging flat and wrong.',
        '"Captain. Ship approaching from the north-northeast. Highland colors."',
        'Highland colors. Dark leather over unpainted wood. The kind of ship built in mountain docks where the trees grow harder than they grow tall.',
      ],
    },
    {
      id: 'kirin_02',
      speaker: 'vorreth',
      paragraphs: [
        '"I see it." Vorreth is already at the rail, one hand on his blade. Not drawing. Reading. "Single mast. Fast hull. No escort. That\'s not a raiding party."',
        'He looks at you.',
        '"That\'s a messenger."',
      ],
      expression: 'grim',
    },
    {
      id: 'kirin_03',
      stinger: 'story_revelation',
      paragraphs: [
        'The ship comes in without hailing. No signal flags. No warning. It cuts through the harbor approach like it owns the water, and the harbor pilot\'s skiff swerves hard to avoid getting clipped.',
        'On the deck: one figure. Standing at the prow.',
        'Tall. Not as tall as you. Lean where you\'re broad. Two horns, ram-curved, slightly smaller. The same amber eyes.',
        'Kirin.',
      ],
      effect: 'shake',
    },
    {
      id: 'kirin_04',
      paragraphs: [
        'Your brother steps off his ship onto the dock like he\'s walking into a room where someone died. Slow. Careful. Looking at his feet.',
        'He\'s thinner than you remember. The jaw is sharper. The arms have new scars, long ones, the kind you get from training with someone who doesn\'t pull their strikes. Iron-band tattoos on his forearms that weren\'t there before. The uncle\'s marks.',
        'He stops twenty feet away. Doesn\'t look up.',
      ],
    },
    {
      id: 'kirin_05',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        '"Karyudon."',
        'Just the name. No greeting. No explanation. Just a name and twenty feet of dock and everything that happened in between.',
        'He still doesn\'t look up.',
      ],
    },
    {
      id: 'kirin_06',
      paragraphs: [
        'The crew goes quiet. Dragghen\'s hand stops mid-motion on the rope he was coiling. Delvessa\'s eyes narrow, calculating, filing, cataloguing the new variable. Suulen steps back into a shadow and watches.',
        'Twenty feet. Your brother. The last time you saw that face, it was stepping backward while strangers put you on a deck.',
      ],
      choices: [
        {
          id: 'kirin_confront_now',
          text: 'Close the distance. Get in his face. Make him look at you.',
          consequence: 'Direct. No buffer. No diplomacy.',
          available: true,
          effects: [
            { type: 'flag', target: 'kirin_approach', value: 'direct' },
            { type: 'infamy', value: 3 },
          ],
        },
        {
          id: 'kirin_investigate_first',
          text: 'Stay on the ship. Send Delvessa to find out why he\'s here before you get within arm\'s reach.',
          consequence: 'Patience. Information before emotion.',
          available: true,
          effects: [
            { type: 'flag', target: 'kirin_approach', value: 'cautious' },
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'loyalty', target: 'delvessa', value: 3 },
          ],
        },
        {
          id: 'kirin_wait_and_watch',
          text: 'Don\'t move. Let him come to you. He\'s the one who showed up uninvited.',
          consequence: 'Silence. Stillness. Let him come to you.',
          available: true,
          effects: [
            { type: 'flag', target: 'kirin_approach', value: 'patient' },
            { type: 'reputation', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'kirin_07',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        'Kirin finally looks up. The amber eyes are wrong. Not hostile. Not cold. Tired.',
        '"I need to talk to you. Alone." His voice cracks on the last word. He catches it. Straightens. "It\'s about the twins."',
      ],
    },
    {
      id: 'kirin_08',
      speaker: 'delvessa',
      paragraphs: [
        '"Captain." Delvessa is at your shoulder. Her voice is low enough that only you hear it. "He sailed here alone. No crew. No backup. Either he\'s desperate, or he\'s bait."',
        'She pauses.',
        '"Both options are bad."',
      ],
      expression: 'grim',
    },
    {
      id: 'kirin_09',
      paragraphs: [
        'Kirin stands on the dock and waits. He\'s not going to force this. Whatever brought him here, it cost him something to come.',
        'The Bastion Sea moves around you. Ships. Commerce. Gulls. The ordinary machinery of a harbor that doesn\'t know it\'s hosting a family reunion with teeth.',
        'The twins. He said it\'s about the twins.',
        'That changes things. That changes everything.',
      ],
    },
    {
      id: 'kirin_10',
      paragraphs: [
        'You will deal with Kirin. Not today. Today you have a fleet to run and territory to hold. But soon.',
        'The highland ship sits in your harbor like a splinter under the skin. Your brother sleeps aboard it. Alone.',
        'Kovesse runs a Grimoire trace on the ship\'s signal and finds nothing. No registered owner. No port of origin. No crew manifest. The ship doesn\'t exist on paper.',
        'Delvessa notes this. She doesn\'t comment. She doesn\'t need to.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'kirin_arrived', value: true },
    { type: 'flag', target: 'kirin_arrival_day', value: 0 }, // Will be set to current day by trigger
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'KIRIN HAS ARRIVED',
      message: 'Your brother is in the harbor. He says it\'s about the twins. Whatever this is, it won\'t wait forever.',
    }},
  ],
};
