import { StoryScene } from '../../types/game';

export const docksideScene: StoryScene = {
  id: 'dockside_confrontation',
  title: 'THE DOCKSIDE',
  characters: ['karyudon', 'dragghen', 'kovesse'],
  nextSceneId: 'explore_keldriss',
  onComplete: [
    { type: 'flag', target: 'dockside_complete', value: true },
    { type: 'flag', target: 'prologue_complete', value: true },
    { type: 'phase', value: 'act1' },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'UNKNOWN ONI DISRUPTS KOLMARI OPERATION',
      message: 'Eyewitnesses report a seven-foot Oni intervened in a Kolmari debt collection at Tavven Shoal\'s fish market. No identification. No bounty on file. The Kolmari Trade Office has filed an incident report.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'bounty',
      title: 'INCIDENT FILED',
      message: 'KARYUDON - Oni - Physical interference with authorized Kolmari trade operations. Bounty: PENDING REVIEW.',
    }},
  ],
  beats: [
    {
      id: 'dock_01',
      title: 'THE DEBT COLLECTOR',
      paragraphs: [
        'You hear it before you see it.',
        'A voice cutting through the market noise. Clipped. Professional. The specific tone of someone who has practiced sounding reasonable while saying unreasonable things, the way a knife practices being sharp.',
      ],
    },
    {
      id: 'dock_02',
      speaker: 'tessurren',
      speakerName: 'Tessurren',
      paragraphs: [
        '"The payment schedule is non-negotiable. The Kolmari Trade Confederation extended credit in good faith. Interest accrues daily. Your stall, your inventory, and your license are all listed as collateral. I am authorized to begin seizure proceedings at the close of business today."',
      ],
    },
    {
      id: 'dock_03',
      paragraphs: [
        'The source: a thin human man in Kolmari blue standing in front of a spice vendor\'s stall. Two escorts behind him. Hired muscle, not Kolmari proper. One human, one Gorundai. Both Tempered Iron. Both bored. They\'ve done this before.',
        'The spice vendor is an older Rathai woman barely four feet tall, hands stained yellow with turmeric. She\'s standing behind her counter like it\'s a barricade. Chin up. Voice shaking but steady.',
      ],
    },
    {
      id: 'dock_04',
      speaker: 'rukessa',
      speakerName: 'Rukessa',
      paragraphs: [
        '"I paid last month. I have the receipt. The interest changed after I signed."',
      ],
    },
    {
      id: 'dock_05',
      speaker: 'tessurren',
      speakerName: 'Tessurren',
      paragraphs: [
        '"The terms are in the contract. Section fourteen, subsection three. The rate adjustment clause. You signed it."',
      ],
    },
    {
      id: 'dock_06',
      speaker: 'rukessa',
      speakerName: 'Rukessa',
      paragraphs: [
        '"I didn\'t understand--"',
      ],
    },
    {
      id: 'dock_07',
      speaker: 'tessurren',
      speakerName: 'Tessurren',
      paragraphs: [
        '"Comprehension is not a prerequisite for compliance."',
        'The market around them has gone quiet. Not silent. Markets never go truly silent. But the immediate vicinity has developed a bubble of tension that the surrounding noise respects.',
      ],
    },
    {
      id: 'dock_08',
      paragraphs: [
        'Hella is watching from her grill. Her hands haven\'t moved from the skewers but her eyes haven\'t left the scene. Three other vendors are pretending to work while tracking every word. The Varrek dockhand with the folded ear has stopped coiling rope.',
        'Dragghen is standing beside you. His jaw is set. He\'s seen this before. The Kolmari playbook: legal language as a weapon, compliance as currency, the specific cruelty of a system designed so that understanding the rules requires the money to hire someone who already does.',
        'Kovesse has one Grimoire up and recording. She\'s not broadcasting yet. Waiting.',
      ],
    },
    {
      id: 'dock_09',
      paragraphs: [
        'Rukessa is running out of words. The Kolmari agent isn\'t. He has a contract, a schedule, and the absolute confidence of a man who knows the law is on his side regardless of whether justice is.',
        'One of the escorts adjusts his stance. The Gorundai. He\'s scanning the crowd. Not for threats. For witnesses. Counting who\'s watching so the report will be accurate.',
        'You don\'t decide to move. Your body decides. The highland reflex that says when someone is being crushed and you can stop it, you stop it, and you figure out the politics later.',
        'You stand up from Hella\'s stall. The bench groans with relief. You walk toward the confrontation. Slow. Unhurried. Seven feet of Oni making sure everyone sees you coming.',
        'The crowd parts. Not a lot. Enough.',
      ],
    },
    {
      id: 'dock_10',
      paragraphs: [
        'You plant yourself between Rukessa and the Kolmari agent.',
        'The agent looks up. His expression performs a rapid calculation: height, build, horns, the torn Wardensea scraps, the complete absence of concern on your face. He arrives at a conclusion he doesn\'t like.',
        '"This is an authorized Kolmari trade operation. Step aside."',
      ],
      choices: [
        {
          id: 'dock_intimidate',
          text: '"No."',
          consequence: 'One word. Let the silence do the work.',
          available: true,
          effects: [
            { type: 'infamy', value: 5 },
            { type: 'flag', target: 'dockside_approach', value: 'intimidate' },
            { type: 'flag', target: 'kolmari_hostile', value: true },
          ],
        },
        {
          id: 'dock_argue',
          text: '"Show me the contract. The rate adjustment clause. Let\'s read it together."',
          consequence: 'Challenge the terms. Make him prove his ground.',
          available: true,
          effects: [
            { type: 'reputation', value: 5 },
            { type: 'resource', target: 'intelligence', value: 3 },
            { type: 'flag', target: 'dockside_approach', value: 'argue' },
          ],
        },
        {
          id: 'dock_pay',
          text: '"How much does she owe? I\'m settling it."',
          consequence: 'You have no money. The bluff buys time.',
          available: true,
          effects: [
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'dockside_approach', value: 'bluff' },
            { type: 'flag', target: 'kolmari_noticed', value: true },
          ],
        },
      ],
    },
    {
      id: 'dock_11',
      paragraphs: [
        'The agent\'s eyes narrow. He\'s recalculating. Behind him, the two escorts move. Not to fighting stances. Not yet. But to readiness.',
        'The Gorundai\'s Iron shimmers faintly at his knuckles. Tempered. You could break him in three seconds and he probably knows it.',
        'The human escort is smarter. He\'s looking at your hands. At the charcoal-black Iron that\'s already spreading across your forearms without you consciously calling it. Forged Iron, announcing itself the way Forged Iron does. Not as a threat but as a fact.',
        '"You\'re making a mistake," the agent says. He\'s talking to you but looking at the escorts. Measuring whether they\'ll back his play.',
        'The Gorundai takes a half-step back. The human doesn\'t move but his Iron drops. They\'ve done the math.',
      ],
    },
    {
      id: 'dock_12',
      paragraphs: [
        '"We\'ll return," the agent says. Not a threat. A schedule update. He folds the contract, slides it into his coat, and walks away with the precise stride of a man who has lost a battle and is already drafting the report that will win the war.',
        'The escorts follow. The Gorundai doesn\'t look back. The human does. One glance, measuring, filing your face for the incident report.',
        'The market exhales.',
      ],
    },
    {
      id: 'dock_13',
      speaker: 'rukessa',
      speakerName: 'Rukessa',
      paragraphs: [
        'Rukessa looks up at you. Way up. Her turmeric-stained hands are trembling but her voice is steady.',
        '"Who are you?"',
      ],
    },
    {
      id: 'dock_14',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Karyudon."',
      ],
    },
    {
      id: 'dock_15',
      speaker: 'rukessa',
      speakerName: 'Rukessa',
      paragraphs: [
        '"Is that a name or a title?"',
      ],
    },
    {
      id: 'dock_16',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"It\'s what I go by."',
      ],
    },
    {
      id: 'dock_17',
      speaker: 'rukessa',
      speakerName: 'Rukessa',
      paragraphs: [
        'She stares at you, eyes narrowing. Then she reaches behind her counter and produces a leather pouch. Dried spices, expensive ones. Traders pay premium for these.',
        '"For the help. It\'s not much."',
      ],
    },
    {
      id: 'dock_18',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"It\'s a start."',
      ],
    },
    {
      id: 'dock_19',
      paragraphs: [
        'The market returns to its noise. But the room has changed shape around you. Vendors who wouldn\'t have looked twice are looking now. The Varrek dockhand with the folded ear is telling someone something and pointing in your direction.',
        'A name has been spoken in public. A Kolmari agent has been faced down. The market has a new variable, and Tavven Shoal\'s gossip network, which moves faster than any Grimoire signal, is already processing it.',
      ],
    },
    {
      id: 'dock_20',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse appears at your elbow. All three Grimoires are active.',
        '"Live broadcast. Eight hundred views and climbing. \'Oni confronts Kolmari debt collector at Tavven fish market, agent retreats, crowd watches.\' I\'ve got five clips from different angles. The moment where you said \'no\' is already being shared on six networks."',
        'She\'s vibrating. Literally. Her tail is going so fast it\'s a green blur.',
        '"Captain. This is the story. Right here. This is it."',
      ],
    },
    {
      id: 'dock_21',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen is standing where the escorts were standing, arms crossed. His face hasn\'t changed. Same flat, evaluating expression he uses on hull joints.',
        '"I rate the confrontation a seven," he says.',
        'You wait.',
        '"Out of ten. The Iron deployment was instinctive, which is good, but you didn\'t control the perimeter, which means the escorts could have flanked. The verbal engagement was efficient. The physical intimidation was..." He pauses. Considers. "Adequate."',
        '"Adequate."',
        '"For a first public appearance, seven is high. I don\'t give sevens lightly."',
      ],
    },
    {
      id: 'dock_22',
      paragraphs: [
        'One person watched the entire confrontation without moving.',
        'A dark-haired human woman at a tea house across from the market. Olive skin, narrow face, dark hair cut short. She hasn\'t touched her drink in twenty minutes. She carries a ledger under her arm and she\'s been watching over the rim of her cup with eyes that measure the way scales measure.',
        'She sees you looking.',
        'She doesn\'t look away.',
      ],
    },
    {
      id: 'dock_final',
      paragraphs: [
        'Hella catches your eye from her stall. She doesn\'t smile. Hella doesn\'t seem like the type. But she nods once. The nod says: you just became a person in this market. What you do with that is your business.',
        'The Kolmari will come back. The Wardensea patrol is seven days out. And somewhere in this coral-built, commerce-fueled, politically exposed island, the first piece of a kingdom is waiting to be picked up.',
        'The woman at the tea house closes her ledger. Stands. Walks toward you. Not quickly, not slowly. With the exact pace of someone who has already decided what they\'re going to say.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
};
