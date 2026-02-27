import { StoryScene } from '../../types/game';

export const prologueScene: StoryScene = {
  id: 'prologue_escape',
  title: 'THE CHAINS',
  characters: ['karyudon'],
  nextSceneId: 'first_night',
  beats: [
    {
      id: 'prologue_01',
      paragraphs: [
        'Eight chains.',
        'Wardensea standard is four. Someone up the chain of command counted your horns, measured the width of your shoulders, did the math on what happens when a seven-foot Oni decides he\'s done sitting down, and doubled it.',
        'Smart. Not smart enough, but smart.',
      ],
      effect: 'fade-in',
    },
    {
      id: 'prologue_02',
      paragraphs: [
        'The hold stinks. Salt, sweat, the chemical bite of whatever preservative they painted on the timber to keep it from rotting. Sixteen prisoners in a space built for twelve. The Gorundai woman three chains down hasn\'t moved in six hours. Either she\'s sleeping or she\'s dead and from the smell in here you couldn\'t tell the difference. A Rathai kid across the hold has been scratching tally marks into the floor with his thumbnail since you woke up. He\'s at forty-seven. You counted.',
        'You stopped counting your own days after the first week. What matters is the sound: ocean grinding against the hull. Constant. Every wave a reminder that three inches of wood is the only thing between a God Fruit carrier and the bottom of the sea.',
      ],
    },
    {
      id: 'prologue_03',
      paragraphs: [
        'The Western Dragon Fruit is somewhere on this ship.',
        'You know because you watched them load it. A sealed iron case carried by four Wardensea Seawards who held it like it was alive and hostile, which, in a real sense, it was. Mythical Beast-class. Its own section in the Wardensea\'s threat index. Worth more than most islands. Worth more than the ship carrying it. Worth more than every prisoner in this hold put together, and the Wardensea knows it.',
        'They\'re transporting it on the same vessel as sixteen chained criminals because the logistics office had a budget problem and this was the hull that was available.',
        'Bureaucracy. The most reliable vulnerability in the world.',
      ],
    },
    {
      id: 'prologue_04',
      paragraphs: [
        'Kirin.',
        'Your brother\'s face the night before. Not when the rival crew boarded. Before. The meal where he wouldn\'t look at you. Where he laughed too loud at something that wasn\'t funny, where his hands kept moving to his belt and back like he was checking something was still there. You didn\'t read it. You should have read it.',
        'The uncle\'s hand in all of it, obviously. The old man\'s fingers wrapped around every decision Kirin made for three years, patient and invisible, influence that works because it never announces itself. By the time you noticed, the foundation was already gone.',
        'One step back. That\'s all it takes. One step back when your brother should have been stepping forward.',
      ],
    },
    {
      id: 'prologue_05',
      paragraphs: [
        'The twins. Eighteen now.',
        'Gone for weeks. Maybe longer. You don\'t know where. You don\'t know if the uncle reached them. You don\'t know if they\'re still in the highlands or chained to a hull on some other ship heading somewhere worse.',
        'The chains creak.',
        'You close your eyes.',
      ],
    },
    {
      id: 'prologue_06',
      title: 'IMPACT',
      paragraphs: [
        'The first cannon blast hits the stern and the world tilts thirty degrees.',
        'Prisoners scream. The Gorundai woman snaps awake and goes to full Iron in under a second, good reflexes for a corpse. The Rathai kid falls sideways and cracks his head on the floor. Blood from his hairline. He doesn\'t cry. Above, wood splinters and men shout orders.',
        'Second blast. Closer. The hull groans and seawater sprays through a crack in the planking. Cold, salt, and your blood flinches from it before it touches your skin. The God Fruit energy recoils from salt water the way a hand pulls from fire. Not your fruit. You haven\'t eaten it. But you\'re carrying it, and the ocean knows.',
      ],
      effect: 'shake',
    },
    {
      id: 'prologue_07',
      paragraphs: [
        'Third blast.',
        'The ceiling ruptures. Daylight floods the hold. First real light in weeks, raw and grey and violent. Through the hole: sky, smoke, and the silhouette of a ship flying no flag.',
        'No flag. Red hull. A Conqueror crew.',
        'They\'re not here for you. They\'re here for the Fruit.',
        'Grappling hooks bite into the deck above. Boots on wood. The sharp metallic ring of Iron meeting Iron. Someone dies. You hear the specific sound a body makes when it stops being a person and starts being weight.',
      ],
    },
    {
      id: 'prologue_08',
      paragraphs: [
        'The anchor bolts holding your chains groan.',
        'Eight chains. Triple-linked iron. Rated for Forged-tier resistance.',
        'You are Forged-tier. The chains are rated for what you are on paper. They are not rated for what you are after two weeks in a dark hold thinking about your brother\'s face, your uncle\'s hands, your twins\' silence, and a God Fruit sitting somewhere above your head on a ship that is currently on fire.',
      ],
    },
    {
      id: 'prologue_09',
      paragraphs: [
        'You stand up.',
      ],
      effect: 'shake',
    },
    {
      id: 'prologue_combat',
      title: 'FIRST BLOOD',
      paragraphs: [
        'Iron flows across your skin. Charcoal-black over esmer. The plates follow your musculature, grinding faintly as you roll your shoulders for the first time in weeks. The sound is half-metal, half-bone. It fills the hold.',
        'Two Wardensea soldiers stumble down the stairs. They see the broken chains. They see you.',
        'One reaches for a saber. The other reaches for a whistle.',
        'Neither is going to finish.',
      ],
      choices: [
        {
          id: 'prologue_fight',
          text: 'Show them what Forged Iron feels like.',
          consequence: 'The first fight of the rest of your life.',
          available: true,
          effects: [
            { type: 'combat', target: 'prologue_brawl', value: true },
          ],
        },
      ],
    },
    {
      id: 'prologue_choice_01',
      paragraphs: [
        'The chains are still screaming behind you. The prisoners are silent. That specific silence of people watching something they\'ll be talking about for years, if they live long enough.',
        'Above: chaos. Wardensea storm-grey on one side, Conqueror leather on the other. The transport is listing, taking on water from the port side. Smoke rolls across everything.',
        'You see the iron case. Mid-deck. Two Seawards guarding it: Tempered, maybe low Forged. Disciplined. Scared. Doing their jobs.',
        'A raider officer is cutting through the Wardensea line toward the case. Forged, at least, from the way his Iron moves. Fast. Focused.',
        'Thirty feet.',
      ],
      choices: [
        {
          id: 'escape_direct',
          text: 'Straight through. Hit whatever\'s in the way.',
          consequence: 'Maximum chaos. Maximum attention. The Oni way.',
          available: true,
          effects: [
            { type: 'infamy', value: 5 },
            { type: 'flag', target: 'escape_style', value: 'direct' },
          ],
        },
        {
          id: 'escape_smart',
          text: 'Wait. Let them kill each other first.',
          consequence: 'Patience. Let the fight thin out, then move.',
          available: true,
          effects: [
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'escape_style', value: 'patient' },
          ],
        },
        {
          id: 'escape_free_others',
          text: 'Break the other prisoners free. More chaos means more cover.',
          consequence: 'Sixteen loose prisoners on a burning ship. Nobody knows who\'s who.',
          available: true,
          effects: [
            { type: 'reputation', value: 5 },
            { type: 'flag', target: 'escape_style', value: 'liberator' },
            { type: 'flag', target: 'freed_prisoners', value: true },
          ],
        },
      ],
    },
    {
      id: 'prologue_10',
      speaker: 'raider_officer',
      speakerName: 'Raider Officer',
      paragraphs: [
        'You hit the raider officer from the side.',
        'He wasn\'t expecting the prisoners. Nobody was. Seven feet of Oni at full Iron, moving at a speed that a chained man shouldn\'t be capable of, and the impact sends him across the deck. He hits the railing. It cracks. Holds.',
        'He stares at you through the smoke. Fast math behind his eyes. Weight, height, the quality of the Iron, the speed of the approach. He arrives at a number he doesn\'t like.',
        '"Who the HELL--"',
        'You\'re already at the case.',
      ],
    },
    {
      id: 'prologue_11',
      paragraphs: [
        'Wardensea lock. Combination, mechanical, no Dominion component. Your Iron-coated fist goes through it in one punch. The case opens.',
        'The Western Dragon Fruit.',
        'It sits in a cradle of padded leather and it looks wrong. Too bright. Too present. Dark crimson and black, scaled like a reptile\'s hide, shaped like a pear that something ancient and hungry designed. The color bleeds past its edges. Not a metaphor. The air around it bends faintly, the way heat bends light off a deck in summer.',
        'You touch it and everyone on the ship feels it. Wardensea, raiders, prisoners, every living body within fifty feet. The Mythical Beast energy pulses once, like a heartbeat that belongs to something much larger than the fruit in your hand.',
        'One second of absolute stillness.',
        'A God Fruit. In an Oni\'s hand. On a burning ship.',
      ],
      stinger: 'story_revelation',
    },
    {
      id: 'prologue_final_choice',
      paragraphs: [
        'The raider officer is back on his feet. The Seawards are regrouping. The ship is going down and everyone knows it.',
        'You look at what you\'re holding.',
      ],
      choices: [
        {
          id: 'keep_fruit',
          text: 'Pocket it. This is leverage, not lunch.',
          consequence: 'Hold the card. Play it when the table\'s right.',
          available: true,
          effects: [
            { type: 'flag', target: 'dragon_fruit_decision', value: 'kept' },
            { type: 'reputation', value: 5 },
            { type: 'resource', target: 'intelligence', value: 3 },
          ],
        },
        {
          id: 'bite_fruit',
          text: 'Bite into it. Right here. Right now. On a burning ship.',
          consequence: 'Power. Immediate. Irreversible.',
          available: true,
          effects: [
            { type: 'flag', target: 'dragon_fruit_decision', value: 'eaten' },
            { type: 'flag', target: 'dragon_fruit_eaten_early', value: true },
            { type: 'dominion', target: 'iron', value: 15 },
            { type: 'infamy', value: 8 },
            { type: 'bounty', value: 5000000 },
          ],
        },
        {
          id: 'hide_fruit',
          text: 'Swallow it whole. Nobody sees. Nobody knows.',
          consequence: 'Eat the evidence. Deny everything.',
          available: true,
          effects: [
            { type: 'flag', target: 'dragon_fruit_decision', value: 'hidden' },
            { type: 'flag', target: 'dragon_fruit_eaten_early', value: true },
            { type: 'dominion', target: 'sight', value: 10 },
            { type: 'dominion', target: 'iron', value: 5 },
          ],
        },
      ],
    },
    {
      id: 'prologue_escape_final',
      paragraphs: [
        'You go over the side.',
        'Not into the water. Not that stupid. A chunk of the transport\'s deck, blown loose by cannon fire, is floating twenty feet below. You drop, hit it, feel it buckle under your weight. Your bones jar through the Iron. It holds.',
        'The makeshift raft carries you away from the burning transport. Behind you: fire, screaming, and the sound of two crews killing each other over a prize that\'s already gone.',
        'Ahead of you: open water. No ship, no crew, no money, no name that anyone in this part of the world has heard. A stolen God Fruit. A body full of Forged Iron. And the understanding that everything you had was taken by people who assumed you\'d stay down.',
      ],
    },
    {
      id: 'prologue_end',
      paragraphs: [
        'The current pulls south.',
        'You let it.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
};
