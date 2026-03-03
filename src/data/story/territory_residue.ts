import { StoryScene } from '../../types/game';

// ==========================================
// TERRITORY RESIDUE SCENES
// Short (2-3 beat) "world breathes" scenes
// that fire the day after each conquest.
// No choices. Pure atmosphere + consequence.
// They answer: "What did that actually mean?"
// ==========================================

export const keldrissResidue: StoryScene = {
  id: 'territory_residue_keldriss',
  title: 'Channel Watch',
  currentBeat: 0,
  beats: [
    {
      id: 'kr_01',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"The Wardensea has had a cutter positioned at the north channel entrance since yesterday. Not moving. Not approaching. Just watching." She sets the intelligence report on the table between you. "They are not sending soldiers yet. They are counting. How many ships. How many crew. What direction we patrol." She pauses. "They are deciding what kind of problem we are."',
      ],
    },
    {
      id: 'kr_02',
      paragraphs: [
        'You look at the report. The cutter\'s registration is a Third Division vessel out of the Volneth anchorage. Not a combat ship. An observation post with sails.',
        '"Let them count," you say.',
        'Delvessa folds the report. "They already are."',
        'The counting goes both ways. You note this.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'keldriss_residue_seen', value: true },
  ],
};

export const copperveinResidue: StoryScene = {
  id: 'territory_residue_coppervein',
  title: 'The Lawyers Move First',
  currentBeat: 0,
  beats: [
    {
      id: 'cvr_01',
      speaker: 'kovesse',
      speakerName: 'Kovesse Shan',
      paragraphs: [
        '"Okay so the Grimoire feed is a complete catastrophe right now and I mean that in an interesting way." She holds up the receiver so you can see the scroll of incoming messages. "The Kingsrun Mining Consortium filed an emergency legal claim this morning against -- and I am reading this exactly as written -- \'unnamed pirate forces operating in violation of the Bastion Sea Extraction Accords.\' The Accords, Captain. They are trying to sue you." She almost sounds impressed. "They have also filed a separate claim against the Wardensea for \'failure to maintain extraction zone security.\'" She lowers the receiver. "The soldiers haven\'t even gotten here yet and we are already in three simultaneous lawsuits."',
      ],
    },
    {
      id: 'cvr_02',
      paragraphs: [
        'You think about this for a moment.',
        '"Who enforces the Accords?"',
        '"The Wardensea," Kovesse says. "Who is also being sued by the Consortium. For negligence." She clicks the receiver off. "I love this sea."',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'coppervein_residue_seen', value: true },
  ],
};

export const mossbreakResidue: StoryScene = {
  id: 'territory_residue_mossbreak',
  title: 'The Old Carving',
  currentBeat: 0,
  beats: [
    {
      id: 'mbr_01',
      speaker: 'dragghen',
      speakerName: 'Dragghen Oriss',
      paragraphs: [
        '"Found something in the back wall of the main taproom. Figured you\'d want to see it."',
        'He leads you through the bar to the far wall behind the barrels. Cut into the old stone -- deep, with a proper chisel, not a knife -- are eight words: LAST ONE WHO TRIED THIS LASTED THREE YEARS.',
        '"No date," Dragghen says. "No name. Just the words." He runs one finger along the carving. Old enough that the edges have rounded with age. "I asked the barkeep. He says it was already there when his father bought the place."',
      ],
    },
    {
      id: 'mbr_02',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: ['"Good. I\'ll last four."'],
    },
    {
      id: 'mbr_03',
      paragraphs: [
        'Dragghen looks at the carving for another moment. Then he puts his hand flat against the stone -- not quite a salute, more like an acknowledgment -- and goes back to the work.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'mossbreak_residue_seen', value: true },
  ],
};

export const durrekResidue: StoryScene = {
  id: 'territory_residue_durrek',
  title: 'The Defector',
  currentBeat: 0,
  beats: [
    {
      id: 'drr_01',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"One of the garrison soldiers who surrendered has started working the supply dock. His name is Hennat. Former Third Division, eight years in, moved his family to Durrek two years ago when he was posted here." She slides a dossier across the table. "He did not wait to be asked. He volunteered."',
      ],
    },
    {
      id: 'drr_02',
      paragraphs: [
        '"Loyalty or survival?" you ask.',
        '"Unknown. Possibly both. Possibly neither -- he may simply have nowhere else to go." She closes the dossier. "He has been a soldier for eight years. He knows supply logistics, garrison rotation schedules, and the names and locations of every Wardensea bribery contact in the southern islands." She pauses. "I am not telling you he is trustworthy. I am telling you he is useful. There is a difference."',
        'You think about the distinction.',
        '"Watch him," you say.',
        '"I already am," she says. "I have been since yesterday."',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'durrek_residue_seen', value: true },
  ],
};

export const anvilCayResidue: StoryScene = {
  id: 'territory_residue_anvil_cay',
  title: 'Eight Hours in the Forge',
  currentBeat: 0,
  beats: [
    {
      id: 'acr_01',
      paragraphs: [
        'Dragghen went into the Anvil Cay forge after breakfast and did not come out until the evening watch. No explanation given. When he finally emerges, his hands are red from heat and there is a burn across his forearm he has wrapped without ceremony.',
        'He sets something on the table in front of you. A blade collar -- the fitting where the Danzai\'s haft meets the head. You had not noticed it was wearing.',
      ],
    },
    {
      id: 'acr_02',
      speaker: 'dragghen',
      speakerName: 'Dragghen Oriss',
      paragraphs: [
        '"The original was Gorundai ironwood. Good material, wrong joint geometry for the impact profile you generate. I re-fitted it in composite. You\'ll get better transfer." He rolls his shoulder. "Also the balance was off by about three degrees. Fixed that too."',
      ],
    },
    {
      id: 'acr_03',
      paragraphs: [
        'You pick up the Danzai and feel the difference immediately. He is right about the balance.',
        '"You knew it was off?" you ask.',
        '"Since the prison break," he says. "Needed a proper forge."',
        'He goes to sleep without waiting for thanks. He did not do it for thanks.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'anvil_cay_residue_seen', value: true },
  ],
};

export const mirrorwaterResidue: StoryScene = {
  id: 'territory_residue_mirrorwater',
  title: 'Wrong Reflection',
  currentBeat: 0,
  beats: [
    {
      id: 'mwr_01',
      paragraphs: [
        'Suulen walked the full perimeter of the lake at dawn. You watched from the ridge. She moved slowly, stopping at intervals, her Sight open the whole time. When she returned, she was quiet in a way that was different from her usual quiet.',
        'At midday she finds you.',
      ],
    },
    {
      id: 'mwr_02',
      speaker: 'suulen',
      speakerName: 'Suulen Varek',
      paragraphs: [
        '"The lake does not reflect the sky." She says it with the same calm she uses for navigational reports. "I mean that precisely: when I look at the surface under Sight, it is showing me something that is not what is above it. An older sky. Or a different one." She pauses. "I do not know what that means. I am telling you because you should know what you have taken."',
      ],
    },
    {
      id: 'mwr_03',
      paragraphs: [
        '"Is it dangerous?"',
        '"I do not know," she says. "Nothing has happened. But some things that have not happened yet are still real." She returns to her charts.',
        'You look at the lake for a long time after she leaves.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'mirrorwater_residue_seen', value: true },
  ],
};

export const windrowResidue: StoryScene = {
  id: 'territory_residue_windrow',
  title: 'Seventeen Merchants',
  currentBeat: 0,
  beats: [
    {
      id: 'wr_01',
      speaker: 'kovesse',
      speakerName: 'Kovesse Shan',
      paragraphs: [
        '"Seventeen merchant houses have opened Grimoire channels requesting trade negotiations since we took Windrow. Seventeen. In two days." She scrolls through the list. "Three Kolmari textile operations, a Kingsrun shipping consortium -- not the mining one, a different one -- two independent fish processors, and a lot of people I have never heard of who are suddenly very interested in talking to us." She looks up. "Windrow was where the southern shipping lanes met the northern ones. We just became the toll gate."',
      ],
    },
    {
      id: 'wr_02',
      paragraphs: [
        '"What do they want?"',
        '"Assurance that their ships won\'t be raided. Safe passage agreements. Possibly a formal tariff structure." She pauses. "They want to pay us to leave them alone. Which is, historically speaking, how most territorial power actually works." Another pause. "I can manage the Grimoire correspondence if you want. I am good at this kind of thing."',
        'You consider the seventeen merchant houses. Seventeen problems, or seventeen sources of income. Probably both.',
        '"Open the channel. Tell them we\'ll talk."',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'windrow_residue_seen', value: true },
  ],
};

export const ghostlightResidue: StoryScene = {
  id: 'territory_residue_ghostlight',
  title: 'The Watching',
  currentBeat: 0,
  beats: [
    {
      id: 'glr_01',
      paragraphs: [
        'Night after the conquest. Two crew members -- independently, without knowing the other was reporting -- tell you they saw something in the water below the reef during the watch.',
        'Not hostile. Not approaching. Just present. A shape in the deep that was aware of them and did not move.',
        'You find Suulen on the bow at third watch.',
      ],
    },
    {
      id: 'glr_02',
      speaker: 'suulen',
      speakerName: 'Suulen Varek',
      paragraphs: [
        '"It was there before us," she says, before you ask. "Whatever is in that reef. It has been there a long time." She looks down at the water. "It is not an animal. It is not a spirit, exactly. More like a place that learned to pay attention." A pause. "Ghostlight Reef is a good name for it."',
      ],
    },
    {
      id: 'glr_03',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: ['"Is it going to be a problem?"'],
    },
    {
      id: 'glr_04',
      speaker: 'suulen',
      speakerName: 'Suulen Varek',
      paragraphs: [
        '"It has not decided yet," she says. "That may be a good sign. Things that have decided are usually simpler."',
        'She watches the water for a while longer. So do you.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'ghostlight_residue_seen', value: true },
  ],
};
