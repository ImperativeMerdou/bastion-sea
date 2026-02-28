import { StoryScene } from '../../types/game';

export const firstNightScene: StoryScene = {
  id: 'first_night',
  title: 'THE RAFT',
  characters: ['karyudon'],
  nextSceneId: 'tavven_arrival',
  lockNavigation: true,
  beats: [
    {
      id: 'night_01',
      title: 'ADRIFT',
      paragraphs: [
        'The raft is six feet of broken deck plank held together by stubbornness and the fact that wood floats. Your legs hang over the edge. The ocean is black and flat and it goes on forever.',
        'Your hands are shaking. Adrenaline bleed. Starts an hour after a fight and doesn\'t stop until your body figures out you\'re not dead. You fold them across your chest and tell them to quit.',
        'They don\'t quit.',
        'Stars come out. Dozens, then hundreds, then more than counting will hold, the whole sky turning into something that looks like it was scattered there on purpose. The same stars that hung over the highlands when you were seven and your father pointed at the Southern Arch and said, "That\'s how the old crews navigated. Stars and gut feeling. Mostly gut feeling."',
      ],
    },
    {
      id: 'night_02',
      paragraphs: [
        'A fish bumps the underside of the raft. You flinch. Hard. Then you look around to make absolutely certain nobody saw you flinch, which is when you remember that you are alone on a piece of wood in the middle of the ocean at night.',
        'Right.',
      ],
    },
    {
      id: 'night_03',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'Inventory. You have a God Fruit, Forged Iron, and prison scraps that barely qualify as clothes. No ship. No crew. No money. No contacts. No reputation in any part of the Bastion Sea that anyone\'s bothered to map.',
        'You need all of those things. You need to find the twins. You need to deal with Kirin. You need, incidentally, to conquer the world.',
        'You say it out loud because saying it makes it real and because there\'s nobody around to tell you you\'re an idiot.',
        '"I\'m going to conquer the world."',
        'The ocean doesn\'t answer. A seabird somewhere in the dark makes a noise that sounds exactly like laughing.',
      ],
    },
    {
      id: 'night_03_choice',
      paragraphs: [
        'The laughing fades. The stars don\'t. You stare at them until your vision blurs and the constellations smear into streaks.',
        'Three things burning in the dark. The twins somewhere out there. Kirin sitting in a chair that used to be your father\'s. The whole rotting sea, full of islands nobody\'s bothered to hold properly.',
        'All of them pull. One pulls hardest.',
      ],
      choices: [
        {
          id: 'drive_family',
          text: '"The twins. Find them first. Everything else can wait."',
          consequence: 'Family first. The rest is noise.',
          available: true,
          effects: [
            { type: 'flag', target: 'primary_drive', value: 'family' },
            { type: 'dominion', target: 'iron', value: 3 },
          ],
        },
        {
          id: 'drive_revenge',
          text: '"Kirin. He handed me to slavers. That gets answered."',
          consequence: 'Revenge. Cold and patient.',
          available: true,
          effects: [
            { type: 'flag', target: 'primary_drive', value: 'revenge' },
            { type: 'dominion', target: 'king', value: 3 },
          ],
        },
        {
          id: 'drive_ambition',
          text: '"The sea. All of it. I didn\'t survive chains to settle for half."',
          consequence: 'Ambition. The only honest answer.',
          available: true,
          effects: [
            { type: 'flag', target: 'primary_drive', value: 'ambition' },
            { type: 'dominion', target: 'sight', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'night_04',
      paragraphs: [
        'You sleep in fits. Wake to the same stars in different positions. The second day is sun and nothing but sun, your lips cracking from salt, your stomach past complaints into offended silence.',
        'Third morning. The current turns and the wind changes and on the horizon, in the grey light before sunrise, there\'s land.',
        'An island. Coral foundations, timber structures stacked three stories high, ships in the harbor. The smell of frying fish carried on the wind from two miles out. Commerce. Industry. People doing business before breakfast.',
        'You don\'t know its name yet.',
        'The raft grounds on a sand bar a hundred yards from the dock. You wade the rest of the way in. The water is warm and the sun is climbing and your feet hit solid ground for the first time since the transport hold and something in your chest, some knot that was wound so tight you\'d stopped noticing it, loosens by exactly one turn.',
        'Not gone. Loosened. That\'s enough for now.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
};
