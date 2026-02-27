import { StoryScene } from '../../types/game';

export const firstCrewDinnerScene: StoryScene = {
  id: 'first_crew_dinner',
  title: 'THE TABLE',
  characters: ['karyudon', 'dragghen', 'kovesse', 'delvessa', 'vorreth'],
  nextSceneId: 'crew_argument',
  beats: [
    {
      id: 'dinner_01',
      title: 'FIVE',
      paragraphs: [
        'The stall closes at sundown. Hella flips the sign, drops the counter board, and starts cleaning the grill with the efficiency of a woman who has done this nine thousand times and will do it nine thousand more.',
        'You sit.',
        'Dragghen sits. Kovesse sits, which means she perches on the counter because the bench doesn\'t put her at table height. Delvessa pulls a chair from somewhere, positions it at the table\'s edge. Not at the table. At the edge. Vorreth leans against the wall behind the last bench and folds his arms.',
        'Five people. One food stall. A harbor going dark around them.',
        'This is the first time all of you have been in the same place at the same time without someone trying to collect a debt, start a fight, or broadcast it.',
      ],
    },
    {
      id: 'dinner_02',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen takes the grill.',
        'Nobody asks him to. He just does it. Moves Hella aside with a nod that says "I\'ve got this" in a language that doesn\'t need words, and starts pulling ingredients from the stall\'s pantry. Fish. Rice. Three types of pepper. Something green that he sniffs twice before deciding it passes inspection.',
        '"The fish here is a six," he says, laying filets on the grill. "Which is high for island catch. The rice is a four. Overcooked at the base, underdone at the surface. Classic harbor stall problem. Too many orders, not enough attention."',
        'He adjusts the heat. The fish starts to sizzle.',
        '"I can work with a four."',
      ],
    },
    {
      id: 'dinner_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse has three Grimoires on the counter. She\'s broadcasting. Of course she\'s broadcasting.',
        '"The crew sits down for their first meal. Five members. The captain, the shipwright, the broadcaster, the analyst, and the first mate. One Oni. One Gorundai. One Rathai. One Human. One more Oni. The species breakdown alone would crash a Wardensea diversity memo."',
      ],
    },
    {
      id: 'dinner_03b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa looks at her.',
        '"You\'re narrating our dinner."',
      ],
    },
    {
      id: 'dinner_03c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"I\'m DOCUMENTING our dinner. There\'s a difference. Documentation is for history. Narration is for entertainment." She flips a Grimoire. "This is both."',
      ],
    },
    {
      id: 'dinner_04',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth hasn\'t moved from the wall. He watches the food with the patience of someone who knows that meals come when they come and waiting is not a hardship.',
        '"The Daaz Accord ate together every night," he says. It\'s not a correction. It\'s not a suggestion. It\'s a fact about a crew that doesn\'t exist anymore, offered to a crew that barely exists yet. "Douren insisted. Even during blockades. Even when the food was hardtack and rainwater. He said a crew that doesn\'t eat together is a crew that doesn\'t know each other. A crew that doesn\'t know each other breaks."',
        'He unfolds his arms. Sits on the bench. The bench protests.',
        '"He was right about most things. He was right about that."',
      ],
    },
    {
      id: 'dinner_05',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa moves her chair. Two inches closer to the table. Not at it. Closer.',
        '"I don\'t eat with colleagues. It creates social debt. You share food, you share obligation. The obligation creates expectation. Expectation distorts judgment." She opens her ledger. Closes it. Opens it again. "This is, technically, a professional arrangement."',
      ],
    },
    {
      id: 'dinner_05b',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Technically," Dragghen says from the grill, "shut up and eat."',
        'He puts a plate in front of her. Three filets, rice shaped into a clean mound, pepper sauce in a stripe across the top. Precise. Deliberate. The plate of a man who treats cooking the way he treats hull repair: every element in its place.',
        'She looks at the plate. Looks at Dragghen. Looks at the plate.',
        'She moves the chair the rest of the way to the table.',
      ],
    },
    {
      id: 'dinner_06',
      paragraphs: [
        'You eat.',
        'The fish is better than a six. Dragghen knows it. He doesn\'t revise the rating. That\'s a Dragghen thing. The number stands even when the evidence argues against it because the system only works if you trust the system.',
        'Kovesse talks. Vorreth listens. Delvessa eats in small, precise bites and writes something in her ledger between courses. Dragghen cooks seconds without being asked.',
        'It\'s not a bonding moment. It\'s not a team-building exercise. It\'s five people eating fish at a stall after the market closes because one of them started cooking and the rest of them sat down.',
        'That\'s how crews start. Not with speeches. With tables.',
      ],
    },
    {
      id: 'dinner_07',
      speaker: 'hella',
      speakerName: 'Hella',
      paragraphs: [
        'Hella brings storm tea. Doesn\'t charge for it. Sits at the edge of the counter and watches the five of you with the expression of a woman who has fed a lot of people and knows the difference between customers and something else.',
        '"You know what you\'re doing?" she asks. Not to anyone specific. To the table.',
      ],
    },
    {
      id: 'dinner_07b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"No," you say.',
      ],
    },
    {
      id: 'dinner_07c',
      speaker: 'hella',
      speakerName: 'Hella',
      paragraphs: [
        '"Good." She pours herself a cup. "The ones who know what they\'re doing are the ones who get it wrong."',
      ],
    },
    {
      id: 'dinner_07d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [],
      choices: [
        {
          id: 'dinner_toast_crew',
          text: 'Raise your cup. "To the ones who don\'t know what they\'re doing."',
          consequence: 'The toast that starts it.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 3 },
            { type: 'loyalty', target: 'kovesse', value: 3 },
            { type: 'loyalty', target: 'delvessa', value: 3 },
            { type: 'loyalty', target: 'vorreth', value: 3 },
            { type: 'flag', target: 'first_dinner_toast', value: 'crew' },
          ],
        },
        {
          id: 'dinner_toast_hella',
          text: 'Raise your cup to Hella. "To the woman who fed us when we couldn\'t pay."',
          consequence: 'Remember who helped first.',
          available: true,
          effects: [
            { type: 'reputation', value: 3 },
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'flag', target: 'first_dinner_toast', value: 'hella' },
          ],
        },
        {
          id: 'dinner_toast_future',
          text: 'Raise your cup. "To the Bastion Sea. It doesn\'t know us yet."',
          consequence: 'The promise. The threat. Same thing.',
          available: true,
          effects: [
            { type: 'infamy', value: 2 },
            { type: 'loyalty', target: 'kovesse', value: 5 },
            { type: 'loyalty', target: 'vorreth', value: 3 },
            { type: 'flag', target: 'first_dinner_toast', value: 'future' },
          ],
        },
      ],
    },
    {
      id: 'dinner_08',
      paragraphs: [
        'They drink.',
        'Cups clink. Storm tea burns on the way down and warms on the way back. Kovesse coughs. Vorreth drinks his in one pull and doesn\'t blink. Delvessa sips. Dragghen holds his cup in both hands and stares into it like he\'s rating the steam.',
        'The harbor lamps come on. One by one, reflected in the black water. The Fallow Tide sits at anchor, hull patched, rigging re-strung, Dragghen\'s work visible in every joint and seam.',
        'Five people. One table. One ship.',
        'Tomorrow, you plan. Tonight, you eat.',
      ],
      autoAdvance: false,
    },
  ],
  onComplete: [
    { type: 'flag', target: 'first_crew_dinner_complete', value: true },
  ],
  currentBeat: 0,
};
