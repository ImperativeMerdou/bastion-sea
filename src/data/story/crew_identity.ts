import { StoryScene } from '../../types/game';

export const crewIdentityScene: StoryScene = {
  id: 'crew_identity',
  title: 'THE NAME',
  characters: ['karyudon', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
  beats: [
    {
      id: 'identity_01',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'It happens on the fifth night.',
        'The crew gathers in Hella\'s stall after the market closes. Dragghen cooks. The smell of Coppervein spices fills the air. Kovesse is broadcasting something, she\'s always broadcasting something, but tonight she pauses. Sets her Grimoire tablet down. Looks at the group.',
        '"We need a name."',
      ],
    },
    {
      id: 'identity_01b',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen doesn\'t look up from the pot. "We have names."',
      ],
    },
    {
      id: 'identity_01c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Not OUR names. A NAME. A crew name. The thing they put on the bounty posters under the big scary number. The thing people whisper when they see our flag. Every crew in the Bastion Sea has one. The Wardensea calls themselves the Grey Fleet. The Kolmari have the Arbitration Corps. Every Conqueror has a crew name that means something." She turns to Karyudon. "We\'re about to take an island, Captain. When people talk about what happened here, what do they call us?"',
      ],
    },
    {
      id: 'identity_02',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth leans against the wall, arms crossed. "She\'s right. The Wardensea put names on everything. Divisions. Operations. Even the punishments had names. Makes it real. Makes people act like they belong to something instead of standing next to it."',
        'At the next table, a short-haired woman with a ledger under her arm glances up. She\'s been at Hella\'s every night this week.',
        'Suulen says nothing. Her silver eyes move from face to face.',
      ],
    },
    {
      id: 'identity_02b',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen tastes the stew. Adds salt. "A name should mean something. Not just sound good."',
      ],
    },
    {
      id: 'identity_02c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You grin. You\'ve been listening. You\'re always listening, even when you look like you\'re just waiting for someone to stop talking so you can hit something.',
        '"Alright. What are we called?"',
      ],
    },
    {
      id: 'identity_name_choice',
      title: 'NAME YOUR CREW',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'Four people look at you. The fire crackles. Hella wipes down the counter and pretends not to listen. The Bastion Sea stretches dark and infinite beyond the harbor.',
        'What is this crew called?',
      ],
      choices: [
        {
          id: 'name_godtide',
          text: '"The Godtide."',
          consequence: 'The divine wave. Conquest incarnate.',
          available: true,
          effects: [
            { type: 'crew_identity', target: 'name', value: 'The Godtide' },
            { type: 'loyalty', target: 'kovesse', value: 5 },
            { type: 'reputation', value: 3 },
          ],
        },
        {
          id: 'name_danzai',
          text: '"The Danzai Crew."',
          consequence: 'Named after the weapon. Just iron.',
          available: true,
          effects: [
            { type: 'crew_identity', target: 'name', value: 'The Danzai Crew' },
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'infamy', value: 2 },
          ],
        },
        {
          id: 'name_black_standard',
          text: '"The Black Standard."',
          consequence: 'Vorreth\'s old call-sign. Reclaimed.',
          available: true,
          effects: [
            { type: 'crew_identity', target: 'name', value: 'The Black Standard' },
            { type: 'loyalty', target: 'vorreth', value: 15 },
            { type: 'reputation', value: 2 },
            { type: 'infamy', value: 2 },
          ],
        },
        {
          id: 'name_bastion',
          text: '"The Bastion."',
          consequence: 'Bold. Claim the sea itself.',
          available: true,
          effects: [
            { type: 'crew_identity', target: 'name', value: 'The Bastion' },
            { type: 'reputation', value: 5 },
          ],
        },
      ],
    },
    {
      id: 'identity_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse is already typing. Her Grimoire tablet glows as she pulls up a design interface. Her whiskers vibrate with creative energy. Her tail curls and uncurls like a metronome.',
        '"A name needs a flag. A symbol. The thing that goes up the pole when you take an island. The thing that tells the Wardensea, the Kolmari, every Conqueror and their grandmother: this territory belongs to someone who isn\'t you."',
        'She projects three designs onto the stall wall. They hover in Grimoire light, sharp and simple, unmistakable.',
      ],
    },
    {
      id: 'identity_flag_choice',
      title: 'CHOOSE YOUR FLAG',
      paragraphs: [
        'Three designs. Each one says something different about what this crew is.',
      ],
      choices: [
        {
          id: 'flag_horns',
          text: 'CROSSED HORNS ON BLACK -- Karyudon\'s horns, crossed like swords. Raw. Aggressive. Unmistakable.',
          consequence: 'Raw. Aggressive. Unmistakable.',
          available: true,
          effects: [
            { type: 'crew_identity', target: 'flag', value: 'crossed_horns' },
            { type: 'infamy', value: 5 },
          ],
        },
        {
          id: 'flag_dragon',
          text: 'DRAGON COILED AROUND AN ANCHOR -- The Dragon Fruit\'s promise, wrapped around the sea. Mythic. Ambitious.',
          consequence: 'Power and permanence.',
          available: true,
          effects: [
            { type: 'crew_identity', target: 'flag', value: 'dragon_anchor' },
            { type: 'reputation', value: 5 },
          ],
        },
        {
          id: 'flag_spike',
          text: 'IRON SPIKE THROUGH A WAVE -- Danzai piercing the ocean. Simple. Violent. Honest.',
          consequence: 'Simple. Violent. Honest.',
          available: true,
          effects: [
            { type: 'crew_identity', target: 'flag', value: 'spike_wave' },
            { type: 'infamy', value: 3 },
            { type: 'reputation', value: 2 },
          ],
        },
      ],
    },
    {
      id: 'identity_04',
      paragraphs: [
        'Kovesse finalizes the design. The flag fills the Grimoire projection, sharp and bold against the night.',
        'Four people look at it. Their flag. The thing that will fly over islands and precede them into harbors and be sewn onto bounty posters by Wardensea analysts who will learn, over time, to take it very seriously.',
        'Dragghen raises his cup. He doesn\'t make speeches. He doesn\'t need to. The gesture is enough.',
        'They drink. Even Vorreth.',
        'Hella refills their cups without being asked and doesn\'t charge them for it. It\'s the last free meal any of them will ever get on Tavven Shoal, because by this time tomorrow, they\'ll own it.',
        'The fire dies. The flag glows. The sea waits.',
      ],
    },
  ],
  nextSceneId: 'delvessa_recruitment',
  onComplete: [
    { type: 'flag', target: 'crew_identity_chosen', value: true },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'NEW CREW REGISTERED ON GRIMOIRE',
      message: 'A new Renegade crew has been registered in the Bastion Sea. Captain: Karyudon. Race: Oni. Bounty: Pending Review. Crew complement: six. The Grimoire network is watching. First broadcast impressions are strong. Stay tuned.',
    }},
  ],
  currentBeat: 0,
};
