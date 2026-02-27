import { StoryScene } from '../../types/game';

export const dragonFruitActivationScene: StoryScene = {
  id: 'dragon_fruit_activation',
  title: 'THE BECOMING',
  beats: [
    {
      id: 'dragon_fruit_01',
      title: 'NO GOING BACK',
      paragraphs: [
        'You hold the Western Dragon Fruit in both hands.',
        'It pulses. Dark crimson and black, scaled like reptile skin, too bright, too present, like the color is bleeding into the air around it. Your palms are sweating. The fruit is warm. Not warm like sunlight. Warm like a living thing. Warm like it has a heartbeat.',
        'The crew watches. Nobody speaks. Even Kovesse turned her Grimoires off.',
        'Delvessa stands closest. Her arms are crossed but her fingers are digging into her own sleeves. She ran the numbers. She always runs the numbers. But there are no numbers for this.',
      ],
    },
    {
      id: 'dragon_fruit_01b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Karyudon." Vorreth\'s voice is low. Steady. The voice he uses when giving field reports that include casualty counts. "The texts say the change is permanent. Structural."',
      ],
    },
    {
      id: 'dragon_fruit_01c',
      paragraphs: [
        'You know.',
        'You look at the fruit. The fruit looks back. That\'s not a metaphor. Something inside it is aware of you. Something old and patient, coiled in the flesh of a fruit that shouldn\'t exist, waiting for someone desperate or hungry enough to let it in.',
        'You\'re both.',
      ],
    },
    {
      id: 'dragon_fruit_02',
      stinger: 'story_revelation',
      effect: 'flash_crimson',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'You bite.',
        'The taste is wrong in a way that has nothing to do with flavor. Like tasting a color. Like swallowing thunder. The juice runs down your chin and it\'s hot, hotter than blood, and for one second nothing happens.',
        'One second.',
        'Then it hits.',
      ],
    },
    {
      id: 'dragon_fruit_03',
      title: 'TRANSFORMATION',
      effect: 'heavy_shake',
      sfx: 'combat_crunch',
      paragraphs: [
        'Your knees crack against the deck. You didn\'t fall. Your legs gave out because your bones are moving, rearranging. Your spine extends two inches in half a second and the sound it makes is the sound of a ship\'s hull splitting.',
        'Someone screams your name. Dragghen, maybe. You can\'t tell. Your ears are full of a sound like the ocean inside a shell except the ocean is roaring and the shell is your skull.',
        'Your forearms split. The Esmer skin peels back and underneath it, gunmetal scales are rising to the surface like something buried is finally clawing its way out. They spread up your arms, across your shoulders, down your ribs. Each scale locks into place with a click you feel in your teeth.',
        'The iron in your blood catches fire. Your Korvaan refinement, every hour of training, every broken bone reforged. Your veins light up like fuses and the heat is so intense that the air around you shimmers and the wood under your knees starts to smoke.',
      ],
    },
    {
      id: 'dragon_fruit_04',
      effect: 'explosion',
      sfx: 'combat_explosion',
      paragraphs: [
        'Wings.',
        'They don\'t grow. They erupt. Two slabs of muscle and membrane punch through the back of your shirt and unfurl like sails catching a gale. Leathery. Veined with gold. Each one wider than you are tall. The force of them opening knocks Kovesse back three steps and sends papers scattering across the deck.',
        'Your horns crack. The two Oni horns you\'ve had since birth, splitting down the middle. And then they regrow. Longer. Thicker. Curving back like a crown made of bone. The old horn fragments hit the deck like spent shells.',
        'You open your mouth to scream and what comes out is not a scream.',
        'It is fire.',
        'White-gold. The color of the fruit\'s juice. It hits the open air above the ship and the sky splits into heat and light for three full seconds. Sailors on neighboring vessels will talk about this moment for the rest of their lives.',
      ],
    },
    {
      id: 'dragon_fruit_05',
      title: 'THE SILENCE AFTER',
      effect: 'flash',
      paragraphs: [
        'And then it stops.',
        'You\'re on your knees. Your hands are on the deck. The deck is scorched in the shape of your palms. Your chest is heaving. Every breath pulls in more air than your lungs held five minutes ago because your lungs are bigger now. Everything is bigger. Denser. The scales cover your forearms, your shoulders, the base of your neck, gunmetal plates that catch the light like polished iron.',
        'The wings fold against your back. They\'re heavy. You can feel the muscles for them -- new muscles, muscles that didn\'t exist before, slotted into your shoulders like they were always supposed to be there.',
        'Your old horns lie on the deck in pieces. The new ones are warm. You reach up and touch one. It hums.',
        'The Dragon Fruit is gone, absorbed completely. There\'s no core, no seed, no rind. It dissolved into you and you dissolved into it and what\'s left is neither the Oni who picked up the fruit nor the dragon that was sleeping inside it.',
        'What\'s left is both.',
      ],
    },
    {
      id: 'dragon_fruit_06',
      paragraphs: [
        'Nobody moves.',
        'Dragghen\'s hand is on his cleaver but he\'s not drawing it. He\'s holding it for comfort, not combat. Something familiar while the world stops making sense. His other hand is gripping the rail. His knuckles are the color of bone.',
        'Suulen\'s Spatial Sight is blazing. Silver-blue light pouring from her eyes like she can\'t turn it off. She\'s reading you. Mapping the new geometry of your body the way she maps islands and cave systems. Her mouth is open.',
        'Kovesse has both hands over her mouth. She\'s shaking. Something she doesn\'t have a broadcast name for yet.',
        'Vorreth hasn\'t moved. Not a muscle. He\'s watching you the way a soldier watches an unexploded shell. His hand is on his saber but his grip is loose. He\'s not afraid of you. He\'s recalculating everything he thought he knew about what you are.',
      ],
    },
    {
      id: 'dragon_fruit_06b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa speaks first.',
        '"Are you still in there?"',
      ],
    },
    {
      id: 'dragon_fruit_06c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'Your voice, when it comes, has a second frequency underneath it. A resonance. A bass note that lives in the deck planks and the rigging and the bones of everyone standing near you.',
        '"Yeah. I\'m here."',
      ],
    },
    {
      id: 'dragon_fruit_06d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She exhales. Long and shaking. Her hands drop from her sleeves.',
        '"Good. Because your shirt is on fire and I\'m not putting it out."',
      ],
    },
    {
      id: 'dragon_fruit_07a',
      paragraphs: [
        'You look down. She\'s right. The back of your shirt is in tatters around the wing joints and the hem is smoldering. You pat it out. Your palm is scaled. The fire doesn\'t hurt.',
        'Dragghen lets go of the rail. Walks to you. Doesn\'t flinch, doesn\'t slow, just walks right up to you and looks at your face. Studies it. The new horns. The scale patterns at your jawline. The eyes that are the same color they\'ve always been.',
      ],
    },
    {
      id: 'dragon_fruit_07a2',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'awe',
      paragraphs: [
        '"You\'re still ugly," he says.',
      ],
    },
    {
      id: 'dragon_fruit_07b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse makes a sound that\'s half sob and half laugh. "Captain, I need a Grimoire. I need SEVEN Grimoires. The Bastion Sea needs to see this. The WORLD needs to see this."',
      ],
    },
    {
      id: 'dragon_fruit_07c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Not yet." Your voice. The new resonance. It takes a second to get used to. "Not yet. Let them wonder."',
      ],
    },
    {
      id: 'dragon_fruit_07d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth nods. First time he\'s moved since the transformation started. "Smart. Let the rumors outrun the truth. By the time they see what you\'ve become, they\'ll have already been afraid of it for weeks."',
      ],
    },
    {
      id: 'dragon_fruit_08',
      title: 'WHAT YOU ARE NOW',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      expression: 'shock',
      paragraphs: [
        'Suulen finally blinks. The Sight dims. She looks at you, and for the first time since you\'ve known her, her hands are shaking.',
        '"You\'re different all the way through." She says it like she\'s describing a building that just rebuilt itself from the foundations up. "The bones. The muscles around the wings. There are channels in you now, like the veins in the fruit. Carrying something. I can see it moving."',
        'She reaches toward your forearm. Stops. Pulls her hand back.',
      ],
    },
    {
      id: 'dragon_fruit_08b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Resonance," Kovesse says quietly. "That\'s the word the old texts use."',
      ],
    },
    {
      id: 'dragon_fruit_08c',
      effect: 'flash_crimson',
      paragraphs: [
        'Resonance. You can feel it. A hum in your chest. In your horns. In the tips of the wings folded against your back. A pilot light that will never go out.',
        'You flex your hands. The claws retract. The scales remain. Claw. Flame. Wing. Scale. And something else, something heavy, coiled at the base of your spine like a word you\'ve always known but never had reason to say.',
        'Kalameet Descent.',
        'You flex your hands again. Close them. Open them. The claws retract on the third try.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'dragon_fruit_scene_complete', value: true },
  ],
  currentBeat: 0,
};
