import { StoryScene } from '../../types/game';

// ==========================================
// SCENE 1: THE CARTOGRAPHER'S QUESTION
// Early romance. After 3+ islands conquered.
// Late night. Maps. The real question.
// ==========================================

export const delvessaRomance01: StoryScene = {
  id: 'delvessa_romance_01',
  title: 'THE CARTOGRAPHER\'S QUESTION',
  characters: ['karyudon', 'delvessa'],
  beats: [
    // --- BEAT 1: The Late Hour ---
    {
      id: 'dr01_beat1_1',

      paragraphs: [
        'Past midnight. The command room was empty hours ago. Vorreth filed his reports at sundown, Kovesse dragged her tools back to the workshop before the lamps dimmed. But there was light under the door. Warm and steady. Someone had fed the oil twice already and wasn\'t planning to stop.',
        'Karyudon pushed it open with his shoulder, plate in one hand, bottle in the other. Dragghen had made something with salt fish and peppered rice, salt fish and peppered rice at two in the morning. The Gorundai had pressed it into his hands without being asked. "She hasn\'t eaten," was all he said.',
        'Delvessa didn\'t look up.',
      ],
    },
    {
      id: 'dr01_beat1_2',

      paragraphs: [
        'She was surrounded. Not by enemies, by information. Charts layered over charts, ink still wet on half of them. Territorial boundary lines redrawn in her precise hand. Trade route projections. Garrison estimates. Three different maps of the same coastline, each annotated with a different conquest scenario. The table wasn\'t big enough. She\'d moved to the floor hours ago, kneeling among the papers like a general surveying a battlefield from above.',
        'Her hair was down. That was the first thing he noticed. Delvessa Ghal kept her hair pulled back in a knot so tight it looked like it could stop a blade. But not tonight. Tonight it fell past her shoulders, dark brown, almost black in the lamplight, and there was ink on her collarbone where she\'d brushed a wet pen against her throat without realizing.',
        'There was ink on her fingers, her jaw, the hollow of her throat. She hadn\'t noticed. She hadn\'t noticed anything in hours.',
      ],
    },
    {
      id: 'dr01_beat1_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'He set the plate down on the one clear corner of the table. "Eat."',
      ],
    },
    {
      id: 'dr01_beat1_4',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Her pen didn\'t stop. "I\'m recalculating the supply corridor between Keldriss and Coppervein. The current projections assume stable weather, which is optimistic for--"',
      ],
    },
    {
      id: 'dr01_beat1_5',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Delvessa. Eat."',
      ],
    },
    {
      id: 'dr01_beat1_6',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She stopped. Looked at the plate. Looked at him, all seven feet of Oni filling the doorframe, horns nearly scraping the lintel, amber eyes catching the lamplight like forge coals. Then back at the plate.',
        '"Nobody asked you to bring that."',
        '"Nobody asks me to do most of the things I do. Eat the food, Delvessa."',
        'She ate. Slowly at first, then faster, as if her body had just remembered it existed below the neck. He poured from the bottle, not into a cup, because there weren\'t any clean ones. Straight onto the desk, into a measuring glass she\'d been using for ink ratios. She stared at him.',
        '"That had calibration marks."',
        '"Now it has whiskey. Better calibration."',
        'The corner of her mouth twitched. She drank.',
      ],
    },
    // --- BEAT 2: The Real Question ---
    {
      id: 'dr01_beat2_1',

      paragraphs: [
        'The food was gone. The whiskey was half gone. Delvessa sat back against the wall, legs stretched out among her charts, and looked like a woman instead of a weapon. The lamplight made her skin warm, caught the sharp line of her jaw, the faint scar under her left ear that she never explained.',
        'She was studying him. He could feel it, that Forged Sight of hers, the one that peeled back layers and saw patterns in everything. The one that made her dangerous in a room full of liars and invaluable in a war room.',
      ],
    },
    {
      id: 'dr01_beat2_2',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Can I ask you something?" She turned the measuring glass in her hands. "Not as your strategist. Not as crew. Just... a question."',
      ],
    },
    {
      id: 'dr01_beat2_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You\'ve never needed permission to ask me anything."',
      ],
    },
    {
      id: 'dr01_beat2_4',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Why do you actually want to conquer the world?"',
        'She held up a hand before he could answer. "Not the version you shout in taverns. Not the one you roar at harbormasters and Wardensea patrols. I\'ve heard those. I\'ve catalogued them. You have seven variations, did you know that? Seven different ways of saying \'because I\'m Karyudon and the world hasn\'t earned the right to tell me no.\'" She set the glass down. "I want the version you haven\'t told anyone."',
      ],
    },
    {
      id: 'dr01_beat2_5',

      paragraphs: [
        'The lamp guttered. Outside, the harbor creaked, wood and rope in salt water, doing what they always did while the rest of the world slept.',
        'She waited. Delvessa Ghal was one of the few people alive who could outwait an Oni.',
      ],
    },
    {
      id: 'dr01_beat2_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'dr01_choice_duty',
          text: '"Because nobody else will do it right."',
          consequence: 'Conviction. Duty as the answer.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 5 },
            { type: 'flag', target: 'delvessa_romance_answer', value: 'duty' },
          ],
        },
        {
          id: 'dr01_choice_nature',
          text: '"Because I can. Same reason I breathe."',
          consequence: 'Primal honesty. Nature as the answer.',
          available: true,
          effects: [
            { type: 'infamy', value: 3 },
            { type: 'flag', target: 'delvessa_romance_answer', value: 'nature' },
          ],
        },
        {
          id: 'dr01_choice_revenge',
          text: '"Because the world took everything from me first."',
          consequence: 'The rawest answer. Revenge as the driver.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 5 },
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'delvessa_romance_answer', value: 'revenge' },
          ],
        },
      ],
    },
    {
      id: 'dr01_beat2_response_1',

      paragraphs: [
        'Whatever answer he gave, she didn\'t react the way he expected. No argument. No analysis. No Kolmari deconstruction of his logic. She just looked at him with those dark eyes, the ones that had interrogated diplomats and war criminals and never blinked. She\'d heard her own answer in his.',
        'Her hand tightened on the measuring glass.',
      ],
    },
    // --- BEAT 3: The Map of Him ---
    {
      id: 'dr01_beat3_1',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Do you know what I\'ve been mapping? Besides the territory."',
        'She stood. Moved through the papers with the precision of someone who\'d memorized where every sheet lay. She pulled a chart from the bottom of a stack, not islands. Not trade routes. This one was covered in shorthand notation. Behavioral markers. Decision trees. Probability chains.',
        '"You." She held it up. "I\'ve been mapping you."',
      ],
    },
    {
      id: 'dr01_beat3_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'He stood too. The ceiling was low enough that his horns grazed it. He didn\'t crouch. "Should I be worried?"',
      ],
    },
    {
      id: 'dr01_beat3_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"How you fight. What you protect. Who you threaten versus who you actually hurt. They\'re never the same list, did you know that? You roar at everyone but you only swing Danzai at people who\'ve earned it." She was talking faster now. The Arbiter composure was slipping, and underneath it was something fierce and focused that had nothing to do with strategy. "You brought food tonight because Dragghen told you I hadn\'t eaten. You didn\'t have to. You had a day of conquest planning and supply negotiations and you still walked across this building at two in the morning with a plate of fish."',
        'She took a breath. Steadied.',
        '"You\'re the most transparent person I\'ve ever met, Karyudon. And I served the Kolmari for twelve years. I have interviewed warlords and saints and every shade of liar in between. None of them confused me." She set the chart down. Her voice dropped. "You confuse me."',
      ],
    },
    {
      id: 'dr01_beat3_4',

      paragraphs: [
        'Two steps. He\'d crossed the space before he\'d finished deciding to. The maps were behind him and she was in front of him and the lamplight caught the ink stain on her collarbone.',
        'He reached for her hand.',
        'She pulled it back.',
        'But slower than last time. Measurably, undeniably slower. Her fingers hesitated, half-extended, like they were running their own calculations, and the answer they got back wasn\'t the one she\'d been expecting.',
        'She exhaled: a thin, fractured sound, air leaving her in pieces.',
      ],
    },
    // --- BEAT 4: The Exit ---
    {
      id: 'dr01_beat4_1',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She stepped back. Put the table between them. Her hand was still in the air for a half-second before she folded her arms, protective, deliberate, the Arbiter mask slamming back into place like a portcullis.',
        '"The map." She gestured at the territorial chart, the real one, the islands and shipping lanes. "It\'s beautiful. The work we\'re doing. The shape of what this is becoming."',
      ],
    },
    {
      id: 'dr01_beat4_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'Karyudon looked at the map. Then at her. He did not look at the map again.',
        '"I wasn\'t looking at the map."',
      ],
    },
    {
      id: 'dr01_beat4_3',

      paragraphs: [
        'Silence. She didn\'t break it. Her fingers pressed the edge of the chart hard enough to bend the paper.',
      ],
    },
    {
      id: 'dr01_beat4_4',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Get out." Her voice was tight. Strained the way a rope strains before it snaps, all the tension going somewhere it wasn\'t designed to go. "Get out of this room before I say something I can\'t take back."',
      ],
    },
    {
      id: 'dr01_beat4_5',

      paragraphs: [
        'He left. The door closed behind him.',
        'In his quarters, he stretched out on the bunk. Hands behind his head. Horns gouging fresh marks in the headboard. Through two walls and a corridor, the faint sound of her pen on paper.',
        'The measuring glass was still on her desk. The one with whiskey in it now. She\'d have something to say about that in the morning.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'delvessa_romance_1', value: true },
    {
      type: 'notification',
      value: true,
      notification: {
        type: 'crew',
        title: 'LATE NIGHTS',
        message: 'Delvessa has been working late again. The command room lamp oil consumption has doubled.',
      },
    },
  ],
};

// ==========================================
// SCENE 2: IRON AND SIGHT
// Mid romance. After 5+ islands conquered
// AND delvessa_romance_1 flag set.
// A storm. Two people who shouldn't be
// standing in the rain. Neither one leaves.
// ==========================================

export const delvessaRomance02: StoryScene = {
  id: 'delvessa_romance_02',
  title: 'IRON AND SIGHT',
  characters: ['karyudon', 'delvessa'],
  beats: [
    // --- BEAT 1: The Storm ---
    {
      id: 'dr02_beat1_1',

      paragraphs: [
        'The storm hit at the fourth bell. The real thing. The kind of weather that turned the Bastion Sea into a churning nightmare of black water and white foam, the kind that made seasoned sailors lash themselves to the mast and pray to gods they didn\'t believe in on clear days.',
        'The crew went below. Dragghen herded them like a Gorundai sheepdog, his broad frame blocking the hatch until every last hand was accounted for. Kovesse had already waterproofed her equipment and sealed herself in the hold with enough wire and solder to build a second ship. Suulen was somewhere in the rigging. She\'d been up there since the first gust, reading the wind with her Spatial Sight like it was sheet music. Vorreth had the watch rotation handled. Everything was secure.',
        'Karyudon went to the prow.',
      ],
    },
    {
      id: 'dr02_beat1_2',

      paragraphs: [
        'He stood with his hands on the rail and his face in the gale and let the storm take him apart. Rain hammered his shoulders, ran down the ridges of his horns, soaked through his shirt until it clung to muscle, scar tissue, the iron-dense Oni bone structure that made him weigh half again what a human his height should. Lightning cracked the sky white. Thunder followed like a war drum.',
        'He loved this. The raw, stupid, magnificent violence of weather that didn\'t care who you were or what you\'d conquered. The sea didn\'t negotiate. It didn\'t make deals. It just was, enormous and indifferent, beautiful in the way that things are beautiful when they could kill you without noticing.',
        'The rain was warm. Summer storm. The best kind.',
      ],
    },
    {
      id: 'dr02_beat1_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Are you trying to die?"',
        'Her voice came from behind him, almost swallowed by the wind. She was at the base of the forecastle stairs, soaked through, hair plastered to her face and neck. She\'d thrown a coat on over her sleeping clothes and it wasn\'t doing a damn thing. The rain had found every gap, and the white linen underneath clung to her in ways that the Kolmari dress code would have found deeply inappropriate.',
        'She didn\'t seem to notice. Or she\'d noticed and decided to be here anyway.',
      ],
    },
    {
      id: 'dr02_beat1_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'He laughed. The storm took the sound and threw it back. "The sea can\'t kill me. I won\'t let it."',
      ],
    },
    {
      id: 'dr02_beat1_5',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"That\'s not how the sea works." She climbed the stairs anyway. The ship rolled and she caught the rail. Her hand landed two inches from his, close enough that the rain running off his knuckles splashed her fingers. "The sea doesn\'t ask permission."',
      ],
    },
    {
      id: 'dr02_beat1_6',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Neither do I."',
      ],
    },
    {
      id: 'dr02_beat1_7',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She looked up at him. Rain on her lashes. The scar under her ear was visible now, the one she kept hidden beneath her hair. In the lightning flash he could see her clearly, not the Arbiter, not the strategist. Just Delvessa, thirty-four years old, standing in a storm next to a man who scared everyone and somehow didn\'t scare her.',
        '"Why are you out here?" he asked.',
        '"Couldn\'t sleep."',
        '"Bullshit. You sleep through everything. I\'ve seen you nap during Kovesse\'s equipment tests."',
        'She didn\'t deny it.',
      ],
    },
    // --- BEAT 2: The Kolmari Mission ---
    {
      id: 'dr02_beat2_1',

      paragraphs: [
        'They stood at the rail together. The storm wasn\'t getting worse but it wasn\'t getting better either. It had found a rhythm. The ship rose and fell. The rain was relentless.',
        'Delvessa was quiet for a long time. He let her be. One of the first things he\'d learned about her: she talked when she was ready and not a second before. Rushing Delvessa Ghal was like trying to rush a glacier. Technically possible. Practically stupid.',
      ],
    },
    {
      id: 'dr02_beat2_2',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"There was a village." She said it like pulling a blade from a wound: careful, steady, knowing the blood would follow. "Tessik\'s Landing, on the southern reach of the Kolmari Protectorate. Sixty-three families. Fishermen, farmers, a school that doubled as a meeting hall." She gripped the rail. "I was sent to assess them for clearance. Standard territorial review, determine if the settlement met Kolmari productive thresholds."',
      ],
    },
    {
      id: 'dr02_beat2_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Productive thresholds."',
      ],
    },
    {
      id: 'dr02_beat2_4',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Whether they generated enough tax revenue to justify the cost of governance." Her voice was flat. Arbiter flat. The voice she used when she was reciting facts so she didn\'t have to feel them. "They didn\'t. The quota was two hundred percent of what sixty-three fishing families could produce in three seasons. It was designed to fail. The land had been earmarked for a Kolmari naval installation. The review was a formality. My report was supposed to confirm what they\'d already decided."',
        'Her fingers were pressing grooves into the wet wood of the rail.',
        '"I filed a favorable review. Certified them as productive. Falsified the revenue projections to meet threshold." She turned to look at him. "It bought them three years. The Kolmari found out in eighteen months. They sent someone else. Someone who didn\'t falsify anything."',
      ],
    },
    {
      id: 'dr02_beat2_5',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"What happened to the village?"',
      ],
    },
    {
      id: 'dr02_beat2_6',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Condemned. Relocated. The school is a barracks now." She said it the same way she\'d say coordinates: clipped, precise, each word placed like a pin in a map. "And what happened to me was worse, because I had to watch and I couldn\'t stop it. They stripped my clearance. Suspended my rank. Twelve years of service: interrogations, crisis negotiations, field operations in places that don\'t appear on Kolmari maps, and they put me behind a desk and told me I\'d demonstrated \'compromised objectivity.\'"',
        'She laughed. It was not a pleasant sound. The storm almost drowned it.',
        '"Compromised objectivity. I didn\'t lose my objectivity. I found it. That was the problem. The Kolmari don\'t want Arbiters who see clearly. They want ones who see selectively."',
      ],
    },
    {
      id: 'dr02_beat2_7',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'The rain streaked her face. It might have been only rain. She didn\'t wipe it.',
        '"So I left. Walked out of Kolmari Central with nothing but the clothes on my back and a Forged Sight that wouldn\'t let me unsee what I\'d seen. I burned every bridge. Every contact. Every favor I was owed. Twelve years, gone." She snapped her fingers. The sound was lost in the wind. "That was two years ago. And then I found a seven-foot Oni announcing world conquest in a fish market, and I thought, well. At least this one\'s honest about what he is."',
      ],
    },
    // --- BEAT 3: The Oni's Answer ---
    {
      id: 'dr02_beat3_1',

      paragraphs: [
        'He didn\'t say anything for a while. The rain hammered the deck between them.',
      ],
    },
    {
      id: 'dr02_beat3_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You did the right thing." He said it the way he said everything, like a hammer hitting an anvil. No softness. No ambiguity. "That village got three more years because of you. Three years of kids in that school. Three years of fishermen bringing catches home. The Kolmari would have taken that immediately. You fought for those years." He turned to face her fully. The rain ran between them. "That\'s why you\'re here and they\'re not."',
      ],
    },
    {
      id: 'dr02_beat3_3',

      paragraphs: [
        'She stared at him. The Forged Sight was active. He could see it in the shift of her pupils, the way her eyes tracked his face faster than a normal human could process. Reading him for lies.',
        'Whatever she found, it made her grip on the rail tighten.',
      ],
    },
    {
      id: 'dr02_beat3_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'dr02_choice_touch',
          text: 'Touch her face. Brush the rain from her cheek.',
          consequence: 'Physical. Close the gap. Touch her face.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 7 },
            { type: 'flag', target: 'delvessa_storm_touch', value: true },
            { type: 'flag_increment', target: 'delvessa_flirt_count', value: 1 },
          ],
        },
        {
          id: 'dr02_choice_words',
          text: '"You\'re better than them. That\'s not a compliment - it\'s an observation."',
          consequence: 'Words. Tell her what she is, plainly.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 6 },
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'delvessa_storm_words', value: true },
          ],
        },
        {
          id: 'dr02_choice_silence',
          text: 'Say nothing. Just stand with her in the storm.',
          consequence: 'Silence. Stand with her. Let the storm speak.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 6 },
            { type: 'flag', target: 'delvessa_storm_silence', value: true },
          ],
        },
      ],
    },
    {
      id: 'dr02_beat3_response',

      paragraphs: [
        'Whatever he did, whatever he chose in that moment, the storm went quiet around it. The rain hammered down and neither of them moved.',
        'She didn\'t pull away. Didn\'t lean in. She stopped breathing. Not dramatically. Just stopped.',
        'For Delvessa Ghal, who calculated everything, the absence of calculation was itself a declaration. Her pulse was doing something rapid. Forged Sight meant she knew he could feel it. She didn\'t care. Or she\'d stopped caring. For her, that was the same thing.',
        'The rain hammered down around them. The ship groaned. Lightning turned the world white, then blue.',
      ],
    },
    // --- BEAT 4: First Light ---
    {
      id: 'dr02_beat4_1',

      paragraphs: [
        'The rain stopped two hours before dawn. The air went cold and flat, the way it does when weather moves on without warning.',
        'Delvessa was asleep.',
        'She\'d fought it. He\'d watched her fight it: the gradual slowing of her breath, the way her sentences got shorter and further apart, the moment her Forged Sight dimmed and her eyes lost focus. She\'d been leaning against his arm for the last hour of the storm. Somewhere in the final squall, her weight had come to rest against him and her head had tilted against his bicep and she\'d lost the war with consciousness.',
        'Karyudon hadn\'t moved.',
      ],
    },
    {
      id: 'dr02_beat4_2',

      paragraphs: [
        'Two hours. His left arm was numb. His legs ached from standing rigid against the ship\'s roll. There was a cramp forming in his lower back that was going to be spectacular later. He didn\'t care. He\'d stood through worse. He\'d stood through prison. Standing still while a woman slept against his arm was nothing.',
        'Her breathing was slow and even. In sleep, every sharp edge softened. The line between her brows smoothed out. The set of her jaw relaxed. She looked younger. She looked her age, which was the same thing, thirty-four years old, and most of them spent carrying burdens she\'d never asked for.',
        'The first true light hit her face and she didn\'t stir.',
      ],
    },
    {
      id: 'dr02_beat4_3',

      paragraphs: [
        'Footsteps on the deck behind them. Heavy. Measured. The unmistakable gait of Dragghen Kolve, who always did the first check after a storm because the kitchen was closest to the upper deck and he worried about everyone and showed it by pretending to check on provisions.',
        'The footsteps stopped.',
        'Karyudon turned his head, just his head, nothing else, because moving anything else would wake her. Dragghen was at the top of the stairs. The Gorundai\'s broad face took in the scene: the Oni captain, rigid as iron at the prow, one arm claimed by a sleeping woman who would have denied this was happening if she\'d been conscious to deny it.',
        'Dragghen said nothing.',
        'He stood there for three full seconds. Then he scratched his jaw, looked at the sky like he was calculating weather, and went back below deck. His footsteps were quieter than usual. The Gorundai was not a quiet man.',
        'The sun climbed. Delvessa slept. Karyudon\'s arm was going numb. He didn\'t move it.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'delvessa_romance_2', value: true },
    {
      type: 'notification',
      value: true,
      notification: {
        type: 'crew',
        title: 'UNLOCKED DOORS',
        message: 'Delvessa has stopped locking her cabin at night.',
      },
    },
  ],
};

// ==========================================
// SCENE 3: THE ARBITER'S CHOICE
// Late romance. After 7+ islands conquered
// AND delvessa_romance_2 flag set.
// The Kolmari come calling. Delvessa answers.
// ==========================================

export const delvessaRomance03: StoryScene = {
  id: 'delvessa_romance_03',
  title: 'THE ARBITER\'S CHOICE',
  characters: ['karyudon', 'delvessa'],
  beats: [
    // --- BEAT 1: The View From Above ---
    {
      id: 'dr03_beat1_1',

      paragraphs: [
        'The crew was celebrating below.',
        'Seven islands. Seven seats of power under Karyudon\'s banner, from Tavven Shoal to the edge of the Southern Reach. The Grimoire networks were lit up with it. Kovesse\'s feeds had made sure every soul in the Bastion Sea knew the name and feared what came with it. Somewhere on the lower deck, Dragghen had turned the galley into a festival kitchen. The smell of roasted spice-fish and fried bread drifted up through the planks. Kovesse was doing something with the ship\'s signal horns that might have been music. Suulen was perched somewhere in the rigging, watching the celebration from above with those silver-blue eyes. Vorreth was, against all odds, drinking.',
        'Karyudon was on the upper deck.',
      ],
    },
    {
      id: 'dr03_beat1_2',

      paragraphs: [
        'He sat with his back against the gunwale, Danzai across his knees. The war club was scarred from the latest conquest, fresh notches in the iron spikes, a crack in the haft he\'d need Kovesse to reinforce. It had been a hard fight. They were all hard now. The easy targets were behind them. What lay ahead was the part of the map where the lines stopped and the legends started.',
        'Below him, his crew sang. Off-key, half-drunk, loud enough to carry across the water. He could pick out individual voices. Dragghen\'s deep bass, Kovesse\'s rapid-fire Rathai drinking song that she was making up as she went, a Gorundai hymn that had no business being that catchy. Somebody was clapping on the wrong beat. It might have been Vorreth.',
        'He heard her before he saw her. The specific cadence of her footsteps on the ladder: precise, measured, the walk of a woman who\'d trained herself to move through hostile environments without making a sound and now did it by default even when she wasn\'t trying.',
      ],
    },
    {
      id: 'dr03_beat1_3',

      paragraphs: [
        'Delvessa carried two cups. She\'d changed out of her field gear into a linen shirt and trousers, off-duty clothes that he\'d almost never seen her in. Her hair was down again. It was down more often now. He\'d noticed. She knew he\'d noticed. Neither of them had mentioned it.',
        'She sat next to him. Not across from him. Not at a strategic distance. Next to him, close enough that her shoulder pressed against his arm, the same arm she\'d fallen asleep against in the storm, weeks ago, the memory that neither of them had spoken about and both of them carried like a bruise they kept pressing to make sure it was still there.',
        'She handed him a cup.',
      ],
    },
    {
      id: 'dr03_beat1_4',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"You\'re not celebrating with them."',
      ],
    },
    {
      id: 'dr03_beat1_5',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I am. From here."',
      ],
    },
    {
      id: 'dr03_beat1_6',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She looked at him, the long, measuring look that used to be clinical and now was something else entirely. The Forged Sight was active. It was always active around him these days, like she couldn\'t stop herself from reading every shift in his expression, every micro-tension in his jaw. He\'d learned not to hide from it. There was no point hiding from a woman whose Dominion was seeing the truth.',
        '"You do this every time," she said. "After every conquest. Everyone celebrates and you sit above them and watch."',
        '"Someone has to remember what it cost."',
        'She turned her glass in her hands. Then she drank. He drank. Below, Dragghen started a new song and Kovesse harmonized in a key that hadn\'t been invented yet.',
      ],
    },
    // --- BEAT 2: The Kolmari Message ---
    {
      id: 'dr03_beat2_1',

      paragraphs: [
        'The singing faded to a comfortable murmur. Stars appeared through the cloud breaks. Delvessa turned the cup in her hands, the same nervous habit he\'d seen in the command room that first night, when she\'d told him she\'d been mapping his patterns. She did it when she was building toward something.',
        'He waited. He\'d learned to be patient with her. It was the only form of patience he\'d ever mastered.',
      ],
    },
    {
      id: 'dr03_beat2_2',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"The Kolmari sent a message."',
        'She said it the way she said everything that mattered: flat, controlled, like she\'d rehearsed the delivery a dozen times to strip it of every emotion. But her hand had stopped turning the cup. It was perfectly still. Delvessa\'s hands were only still when she was working very hard to keep them that way.',
        '"Three days ago. Coded transmission on a frequency I haven\'t used in two years. They shouldn\'t have been able to reach me. Kovesse rerouted my signal chain months ago. They found it anyway." She paused. "The Kolmari are very good at finding things they want."',
      ],
    },
    {
      id: 'dr03_beat2_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"What do they want?"',
      ],
    },
    {
      id: 'dr03_beat2_4',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Me."',
        'She reached into her shirt pocket and pulled out a folded paper, not parchment, not the rough local stock they used for navigation. Kolmari paper. White, smooth, watermarked with the Arbiter seal. Even the material was a message: we are civilization, it said. We are order. Come home.',
        '"Full pardon. Restoration of rank, not my old rank, a promotion. Senior Arbiter, Western Operations. Command authority over field teams. An independent operational budget." Her voice was steady. Clinical. The voice of a woman reading an autopsy report on her own past. "It\'s everything I wanted two years ago. Everything I\'d worked twelve years to earn. They\'re offering it back like a coat I left at the door."',
      ],
    },
    {
      id: 'dr03_beat2_5',

      paragraphs: [
        'The wind moved between them. Below, someone laughed. Dragghen, probably. Everything felt thin, one wrong word from shattering. Seven islands conquered and the thing that could break it wasn\'t a Wardensea fleet or a rival conqueror. It was a piece of white paper with a seal on it.',
        'Karyudon looked at the letter. Then at her. She wasn\'t looking at the letter either.',
      ],
    },
    // --- BEAT 3: The Question ---
    {
      id: 'dr03_beat3_1',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She turned to face him fully. Her knees touched his thigh. She didn\'t move them. The lamplight from below caught her face at an angle that made the scar under her ear glow silver. Her eyes were dark and clear, terrified in a way she would never, ever admit to.',
        '"I have one question."',
      ],
    },
    {
      id: 'dr03_beat3_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Ask."',
      ],
    },
    {
      id: 'dr03_beat3_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"When you conquer the world--" When, not if. She\'d never said if. "--what happens to me?"',
        'Below, someone dropped a bottle. Laughter. Glass on wood.',
        '"Where do I go? What am I, in the world you\'re building? Your strategist? Your Arbiter? Your--" She stopped. Took a drink. Took another. "I ran the numbers on this too. Did you know that? I ran the numbers on us. Probability matrices. Risk assessment." A sound that might have been a laugh. "The numbers are terrible."',
      ],
    },
    {
      id: 'dr03_beat3_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'dr03_choice_direct',
          text: '"You stand next to me. That\'s where you belong."',
          consequence: 'Direct. Honest. Claim her place beside you.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 8 },
            { type: 'reputation', value: 5 },
            { type: 'flag', target: 'delvessa_answer_direct', value: true },
          ],
        },
        {
          id: 'dr03_choice_freedom',
          text: '"Whatever you choose. I don\'t conquer my crew."',
          consequence: 'Give her the choice. No pressure. No conquest.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 8 },
            { type: 'flag', target: 'delvessa_answer_freedom', value: true },
          ],
        },
        {
          id: 'dr03_choice_kiss',
          text: 'Kiss her. No words. No strategy. Just this.',
          consequence: 'Kiss her. No words. No strategy.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 10 },
            { type: 'infamy', value: 3 },
            { type: 'flag', target: 'delvessa_first_kiss', value: true },
            { type: 'flag_increment', target: 'delvessa_flirt_count', value: 1 },
          ],
        },
      ],
    },
    {
      id: 'dr03_beat3_response_direct',

      requireFlag: 'delvessa_answer_direct',
      paragraphs: [
        'He didn\'t hesitate. Karyudon had never hesitated about anything in his life and he wasn\'t going to start now, not with her, not with this.',
        'The Forged Sight blazed. He could almost see it working, scanning his face the way she scanned intelligence reports. Checking for the seams. Finding none.',
        'Her hand came up to her collarbone and pressed flat, fingers spread. She looked away. Looked back. Her mouth opened and closed without producing anything useful.',
      ],
    },
    {
      id: 'dr03_beat3_response_freedom',

      requireFlag: 'delvessa_answer_freedom',
      paragraphs: [
        'He let the silence sit. Didn\'t reach for her. Didn\'t close the distance. Gave her the one thing nobody in her life had ever given her: room.',
        'The Forged Sight blazed. He could almost see it working, scanning his face the way she scanned intelligence reports. Checking for the catch. Finding none.',
        'Her hand came up to her collarbone and pressed flat, fingers spread. Her eyes went wider for a fraction of a second, then narrowed. Not relief. Closer to vertigo. The look of a woman who\'d braced for a cage and found an open door instead.',
      ],
    },
    {
      id: 'dr03_beat3_response_kiss',

      requireFlag: 'delvessa_first_kiss',
      paragraphs: [
        'No words. No strategy. He closed the distance before either of them could think better of it.',
        'The Forged Sight blazed behind her eyelids. She made a sound, quiet, startled.',
        'When he pulled back, her hand was on his jaw. She\'d put it there without deciding to. Her fingers were shaking. She didn\'t move them.',
      ],
    },
    // --- BEAT 4: The Choice (Convergence) ---
    {
      id: 'dr03_beat4_1',

      paragraphs: [
        'She looked at the Kolmari letter in her hand. White paper, Arbiter seal, twelve years of service and two years of exile compressed into a single offer. Full pardon. Restored rank. The life she\'d lost, returned to her on a silver tray.',
        'She tore it in half.',
        'The sound was louder than it should have been. Paper, seal, watermark, the entire Kolmari intelligence apparatus\'s best offer, ripped down the middle with the efficiency of a woman who\'d made her decision long before the question was asked.',
      ],
    },
    {
      id: 'dr03_beat4_2',

      paragraphs: [
        'She held the pieces over the rail. The wind took them, white fragments spinning into the dark water below, dissolving into the Bastion Sea like they\'d never existed. Like the Kolmari had never existed. Like there had never been a version of Delvessa Ghal who would have said yes.',
        'She watched them go. Her hand was steady. Her breathing was not.',
      ],
    },
    {
      id: 'dr03_beat4_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I already made my choice."',
      ],
    },
    {
      id: 'dr03_beat4_4',

      paragraphs: [
        'She stood. The cup stayed on the deck beside him. She took three steps toward the ladder, back straight, shoulders squared. Professional. Controlled. The same walk she used leaving briefing rooms.',
        'She stopped.',
        'She turned.',
      ],
    },
    {
      id: 'dr03_beat4_5',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"For the record--" Something in her voice. She cleared her throat. "I chose before they asked."',
      ],
    },
    {
      id: 'dr03_beat4_6',

      paragraphs: [
        'She left. Her footsteps descended the ladder. Precise. Measured.',
        'Karyudon sat on the upper deck. He picked up Danzai. He picked up her abandoned cup and drained it. Below, the crew launched into another song, something Gorundai, something that Dragghen sang with his whole chest and Kovesse murdered enthusiastically and Vorreth hummed under his breath like a man learning how to enjoy things again.',
        'The stars were out. All of them. The Bastion Sea stretched from horizon to horizon, dark and vast, full of islands that didn\'t know his name yet.',
        'Three hours later, Dragghen climbed to the upper deck with breakfast. Two plates. He set them down. Looked at the two cups. Looked at Karyudon, who was still sitting there. Danzai across his knees. The empty cups beside him.',
        'Dragghen set the plates down. Looked at the two cups. Looked at Karyudon. Said nothing for long enough that it became a conversation.',
        '"Eggs are getting cold, Captain."',
        'He went back below. Karyudon ate breakfast. The eggs were already cold.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'delvessa_romance_3', value: true },
    { type: 'flag', target: 'delvessa_kolmari_declined', value: true },
    { type: 'reputation', value: 5 },
    {
      type: 'notification',
      value: true,
      notification: {
        type: 'crew',
        title: 'ARBITER NO MORE',
        message: 'Delvessa has formally declined Kolmari reinstatement. She isn\'t going anywhere.',
      },
    },
  ],
};

// ==========================================
// SCENE 4: THE CAPTAIN'S ANSWER
// Late romance resolution. After act2 begins,
// 9+ islands conquered, AND delvessa_romance_3.
// The morning after a battle that got close.
// She waited. He noticed. Two people who've
// been orbiting each other finally stop
// pretending the gravity isn't there.
// ==========================================

export const delvessaRomance04: StoryScene = {
  id: 'delvessa_romance_04',
  title: 'THE CAPTAIN\'S ANSWER',
  characters: ['karyudon', 'delvessa'],
  beats: [
    // --- BEAT 1: The Morning After ---
    {
      id: 'dr04_beat1_1',

      paragraphs: [
        'Dawn. The base smells like smoke and copper, the particular kind of exhaustion that settles into wood and stone after a fight that went too long. Last night\'s engagement had been ugly, three Wardensea cutters in the harbor mouth, a boarding action that turned into a brawl across two decks, and a stretch of about forty seconds where Karyudon took a harpoon bolt through the shoulder and kept swinging Danzai one-handed because stopping wasn\'t something his body understood how to do.',
        'The bolt was out. Dragghen had pulled it while Kovesse held the lantern and Vorreth held Karyudon\'s arm still, which was the hardest job of the three. The wound was already closing. Oni iron-dense tissue knitting itself back together, the meat of him too stubborn to stay open. It would scar. Everything scarred. He had a collection.',
      ],
    },
    {
      id: 'dr04_beat1_2',

      paragraphs: [
        'He found her in the corridor outside the infirmary.',
        'Delvessa was sitting on the floor. Back against the wall, knees drawn up, ledger closed in her lap. She wasn\'t writing. She wasn\'t calculating. She was just sitting there in the grey pre-dawn light with her hair down and her sleeves rolled to the elbows and her hands dead still.',
        'Her hands were never still.',
        'She\'d been there all night. He could tell because there was a blanket on the floor next to her that she hadn\'t used, and an untouched cup of tea that Dragghen had obviously brought hours ago. The tea was cold. She hadn\'t moved enough to drink it.',
      ],
    },
    {
      id: 'dr04_beat1_3',

      paragraphs: [
        'She looked up when he came through the door. The Forged Sight hit him immediately. He could feel it scanning, cataloguing the bandage on his shoulder, the color of his skin, the steadiness of his gait. Running diagnostics on him like he was a supply chain she needed to verify was intact.',
        'Her eyes were red. Not from crying. From not blinking. From staring at a door for six hours and refusing to look away in case it opened and the news was bad.',
        'She\'d waited.',
        'Delvessa Ghal, who calculated everything, who never invested in an outcome she couldn\'t control, who kept the entire Bastion Sea campaign running inside her head like a machine made of numbers and contingencies, had sat on a cold floor all night because she couldn\'t make herself leave.',
      ],
    },
    // --- BEAT 2: What She Doesn't Say ---
    {
      id: 'dr04_beat2_1',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She stood up. The ledger went under her arm. The mask came on, not all the way, not the full Arbiter composure, but enough. The professional version of Delvessa Ghal that could brief a room on casualty projections without her voice changing.',
        '"The shoulder. How bad?"',
      ],
    },
    {
      id: 'dr04_beat2_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Flesh wound. I\'ve had worse from Dragghen\'s cooking."',
      ],
    },
    {
      id: 'dr04_beat2_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"You took a harpoon bolt at close range. The barbed kind. Dragghen had to cut the flanges before he could pull it." Her voice was flat. Data. "If it had been four inches to the right, it would have gone through your throat. Oni tissue regeneration doesn\'t work on severed arteries."',
      ],
    },
    {
      id: 'dr04_beat2_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You measured the distance."',
      ],
    },
    {
      id: 'dr04_beat2_5',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I measure everything." She said it like an accusation against herself. "I watched it happen from the command deck. Forged Sight at full range. I saw the bolt leave the launcher and I calculated the trajectory and I knew, before it hit you, exactly where it was going to land. And I couldn\'t do anything except watch and count the inches."',
        'Her hand tightened on the ledger. The knuckles went white.',
        '"Four inches, Karyudon. I have built projections for thirty-seven military engagements. I have modeled the fall of island garrisons and the collapse of trade networks and the movements of Wardensea fleets across nine hundred miles of ocean. And last night, the only number in my head was four."',
      ],
    },
    // --- BEAT 3: The Wall Cracks ---
    {
      id: 'dr04_beat3_1',

      paragraphs: [
        'The corridor was empty. First light was coming through the windows: thin, pale, the color of new metal. Somewhere below, Dragghen was starting breakfast. The smell of bread and oil drifted up through the floorboards. The base was waking up. The world was moving on from last night\'s fight. It always did.',
        'But she was still standing in the corridor with cold tea on the floor and a number she couldn\'t stop counting.',
      ],
    },
    {
      id: 'dr04_beat3_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Delvessa."',
      ],
    },
    {
      id: 'dr04_beat3_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Don\'t." Her voice cracked. "Don\'t say my name like that when I\'m trying to--"',
        'She stopped. The sentence didn\'t finish because the end of it would have cost her something she\'d spent two years refusing to pay.',
      ],
    },
    {
      id: 'dr04_beat3_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Trying to what?"',
      ],
    },
    {
      id: 'dr04_beat3_5',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She closed her eyes. The Forged Sight went dark. First time he\'d seen her turn it off in his presence.',
        '"Trying to be your strategist," she said quietly. "Trying to do the math. Trying to treat this like a position on a board and not--"',
        'She opened her eyes. No Sight. Just her.',
        '"I sat on that floor for six hours. I have never in my life sat anywhere for six hours without working. I ran out of calculations by the second hour. I spent the other four staring at a door." Her voice dropped to almost nothing. "That is not strategic behavior."',
      ],
    },
    // --- BEAT 4: The Choice ---
    {
      id: 'dr04_beat4_1',

      paragraphs: [
        'He looked at her. She was holding the ledger against her chest. Her fingers were white on the spine.',
        'The corridor smelled like salt and lamp oil. Somewhere below, Dragghen was clattering pots. The ship groaned. Normal sounds. Normal morning. Nothing about this was normal.',
        'She\'d turned off the Sight. He could tell because her eyes were different without it. Darker. Just eyes.',
      ],
    },
    {
      id: 'dr04_beat4_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'dr04_choice_commit',
          text: 'Close the distance. Take the ledger out of her hands. Set it on the floor. "Then stop doing the math."',
          consequence: 'Close the distance. Take the ledger out of her hands. Commit.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 12 },
            { type: 'flag', target: 'delvessa_romance_complete', value: true },
            { type: 'flag', target: 'delvessa_romance_path', value: 'committed' },
          ],
        },
        {
          id: 'dr04_choice_honest',
          text: '"I don\'t know what to call this. I don\'t think there\'s a word big enough. But I\'m not going anywhere, and neither are you."',
          consequence: 'No labels. Just truth. Say what this is without naming it.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 10 },
            { type: 'flag', target: 'delvessa_romance_path', value: 'unlabeled' },
          ],
        },
        {
          id: 'dr04_choice_pull_away',
          text: '"You\'re the best strategist in the Bastion Sea. I can\'t afford to compromise that. Not even for this."',
          consequence: 'Step back. Choose the mission over this.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: -5 },
            { type: 'flag', target: 'delvessa_romance_path', value: 'rejected' },
          ],
        },
      ],
    },
    // --- BEAT 5: Resolution ---
    {
      id: 'dr04_beat5_1',

      paragraphs: [
        'Whatever he said, the corridor held it. The dawn light held it. The cold tea and the ledger and the six hours she\'d spent staring at a door held it.',
        'Neither of them moved. The distance between them, the careful, measured, Kolmari-trained gap that had been maintained for months, became the loudest thing in the room.',
        'Her hands tightened on the ledger. Then loosened. Then tightened again, like she was recalculating the structural load of what she\'d just heard.',
      ],
    },
    {
      id: 'dr04_beat5_2',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She breathed. One long exhale. Whatever calculation she\'d been running, whatever equation she\'d been trying to solve with six hours on a cold floor and a number she couldn\'t stop counting, the answer was written on her face.',
        'She was still Delvessa. Twelve years of training didn\'t dissolve in a corridor. The Arbiter composure reassembled itself, plate by plate, the professional mask settling back into place.',
        'But the eyes underneath were different. The Forged Sight was off. Just her.',
        '"Don\'t get hit again," she said quietly.',
        '"No promises."',
        'Her hands pressed the bandage on his shoulder. Checking it. Always checking.',
      ],
    },
    // --- BEAT 6: The Morning ---
    {
      id: 'dr04_beat6_1',

      paragraphs: [
        'Footsteps on the stairs. Dragghen, carrying two plates. The Gorundai rounded the corner and stopped. Took in the scene: the Captain and the strategist, standing in a corridor, her face against his chest, his arms around her, the cold tea and the ledger on the floor and the dawn light turning everything gold.',
        'Dragghen set the plates down on a windowsill. Went back downstairs without a word.',
      ],
    },
    {
      id: 'dr04_beat6_2',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa pulled back. Not far. Just enough to look up at him. Her eyes were clear: Forged Sight off, no mask, no calculations, just dark brown and steady, certain in a way that had nothing to do with data.',
        '"This doesn\'t change the strategy," she said.',
        '"Wouldn\'t dream of it."',
        '"I\'m still going to argue with every plan you make."',
        '"I\'d be worried if you stopped."',
        '"And if you take another harpoon bolt, I am going to be professionally furious."',
        '"Professionally."',
        '"Professionally." She straightened his collar. Her fingers lingered on the bandage. "Go eat breakfast. I need to recalculate our force projections."',
        'She picked up the ledger. She picked up the cold tea. She walked toward the command room with the stride of a woman who had renegotiated the terms of her existence and was already running the new numbers.',
        'At the end of the corridor, she stopped.',
      ],
    },
    {
      id: 'dr04_beat6_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Karyudon."',
        '"Yeah?"',
        '"Four inches to the right." She didn\'t turn around. "Don\'t you ever make me count that close again."',
      ],
    },
    {
      id: 'dr04_beat6_4',

      paragraphs: [
        'She went inside. The door closed. He could hear the pen start, scratching across paper.',
        'He picked up the plates Dragghen had left. Ate standing in the corridor. The shoulder ached. The food was lukewarm. The pen kept scratching behind the door.',
        'At the strategy meeting that afternoon, Delvessa sat in her usual seat. Across from him. Same distance as always. She briefed the room on force projections without looking up from her notes.',
        'But her handwriting was different. Looser. Kovesse noticed. Kovesse noticed everything. She didn\'t say anything about it.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'delvessa_romance_4', value: true },
    { type: 'loyalty', target: 'delvessa', value: 10 },
    { type: 'notification', value: true, notification: { type: 'crew', title: 'THE ANSWER', message: 'Delvessa\'s force projections have been updated. Her handwriting has changed.' }},
  ],
};
