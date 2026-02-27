import { StoryScene } from '../../types/game';

export const act1IntelScene: StoryScene = {
  id: 'act1_intel',
  title: 'ACT 1 - SEVEN DAYS',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth', 'tessek', 'orren'],
  beats: [
    {
      id: 'intel_01',
      title: 'THE SITUATION',
      paragraphs: [
        'Delvessa calls the meeting. Nobody is surprised.',
        'Hella\'s stall. After closing. The crew fills the space the way they\'ve learned to fill spaces together: Dragghen at the grill, Kovesse on the counter with all three Grimoires active, Vorreth against the wall with his arms folded, Tessek leaning against a post with Redtide across his knees, Suulen in the corner that nobody noticed was occupied until she spoke, Orren perched on a crate at the edge of the group with his hands in his jacket pockets so the sparks don\'t jump.',
        'Seven people. One stall. A harbor going dark.',
        'Delvessa opens her ledger.',
      ],
    },
    {
      id: 'intel_02',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Pettha Koss." She drops the name on the table like a blade. "Varrek. Middle-aged. Runs the Harbor Board. Every ship, every cargo, every schedule passes through her office. Without her, this island\'s trade network collapses in forty-eight hours."',
        'She taps the table twice. A habit the crew has learned means she finds what comes next interesting.',
        '"She doesn\'t rule. She organizes. Twenty years of it. And nobody on this island has figured out that those are the same thing."',
      ],
    },
    {
      id: 'intel_03',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"The Kolmari agent you stared down at the dockside? Tessurren Dolch." She says the name the way a former smoker says the brand they quit. "Monthly visits. Warehousing agreement. If Pettha signs, Kolmari take forty percent of the island\'s storage. Every merchant pays their rates. Tavven becomes a satellite."',
        'She pauses.',
        '"Pettha has been refusing. Tessurren has been escalating. Interest rates on existing credit lines. Half the small vendors are already on Kolmari loans. He\'s crushing the bottom and waiting for the top to crack."',
      ],
    },
    {
      id: 'intel_04',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth unfolds his arms. This means he has something worth saying.',
        '"Standard economic destabilization protocol. The Wardensea wrote it. The Kolmari licensed it. You squeeze local credit until the population turns on whoever is protecting them." His voice is flat. Professional. The voice of a man reading from a manual he helped write. "Pressure spike. Then buyout. Then occupation by contract. Nobody fires a shot. Nobody needs to."',
      ],
    },
    {
      id: 'intel_04b',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"You\'ve seen this before," Dragghen says.',
      ],
    },
    {
      id: 'intel_04c',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"I\'ve done this before."',
        'The table goes quiet.',
        '"I\'m telling you what they\'ll do next because I know what they\'ll do next. Tessurren will double interest at the end of the week. Every vendor, every boat license, every warehouse lease. The population breaks or bends. Either way, Pettha signs."',
      ],
    },
    {
      id: 'intel_05',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"The patrol."',
        'Two words. Everyone looks at the corner. Suulen\'s silver eyes catch the stall lamp and throw back light.',
        '"Wardensea cutter out of Durrek Garrison. Second Division. Passes every nine days." She holds up two fingers. "Two days before you arrived. Seven days from now. I watched the last pass from the harbor wall. They don\'t dock. They don\'t inspect. They count hulls and flags and move on." A pause. "If they count an Oni next time, it stops being a routine pass."',
      ],
    },
    {
      id: 'intel_06',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse flips a Grimoire around. Numbers. Feeds. Signal traffic.',
        '"Grimoire chatter says the Durrek garrison is at sixty percent complement. Seasonal rotation. Half the crew is on leave at Sorren\'s Flat. The cutter that passes Tavven is a standard patrol, not a response vessel. Two officers, eight crew, Tempered Iron at best. They\'re a scarecrow, not a sword."',
        'She taps a runestone. More data.',
        '"Kolmari signal traffic out of Tavven has tripled in the last week. Tessurren is reporting. Someone on the other end is reading. The escalation is authorized. This isn\'t one agent going rogue. This is the playbook."',
      ],
    },
    {
      id: 'intel_07',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen sets a plate of fish in front of Delvessa. She didn\'t ask. He doesn\'t explain.',
        '"The Fallow Tide is ready." He says it the way he says everything: like a measurement that\'s been taken three times. "Keel reinforced. Standing rigging replaced. Hull sealed below the waterline. I rate her a six now. Seven after another week of work, but we don\'t have another week."',
        'He looks at the fish he cooked, then at the crew.',
        '"If we\'re doing this, the ship can take it. That\'s my part. Everything else is yours."',
      ],
    },
    {
      id: 'intel_08',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        'Tessek has been quiet. For Tessek, this is suspicious.',
        '"How many fighters?" He asks it the way he asks everything about combat: like it\'s the only question that matters and the rest is weather. "Tessurren\'s escorts. The harbor garrison. Anyone who picks up a weapon when things go loud."',
      ],
    },
    {
      id: 'intel_08b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Two permanent escorts," Delvessa says. "Both Tempered Iron. Plus six to eight seasonal dock security. Pettha\'s Harbor Board has no military arm. The island doesn\'t have a militia."',
      ],
    },
    {
      id: 'intel_08c',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        'Tessek nods. The corners of his mouth do something that on a normal person would be a smile.',
        '"CRIMSON TIDE: SEVEN-DAY COUNTDOWN." He touches Redtide\'s hilt. "I\'ve been warming up."',
      ],
    },
    {
      id: 'intel_09',
      speaker: 'orren',
      speakerName: 'Orren Dael',
      paragraphs: [
        'Orren hasn\'t spoken. His hands are in his pockets. A blue-white spark jumps from his right knuckle to the crate he\'s sitting on. He flinches.',
        '"What happens to the people?"',
        'Everyone looks at him.',
        '"The vendors. The fishermen. The kid who hauls nets at the dock." His ears rotate through three positions. "If we take this island. What happens to them?"',
        'The table waits.',
      ],
    },
    {
      id: 'intel_10',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'Seven days. A harbor master. A Kolmari agent. A Wardensea patrol that comes like clockwork. And seven people who showed up at a food stall because one of them started cooking and the rest of them sat down.',
        'You eat a spoonful of Dragghen\'s fish. Deliberately.',
        '"Tavven Shoal. Seven days. The Kolmari are squeezing it. The Wardensea is watching it."',
        'You look at the crew. All seven. The analyst with her ledger. The shipwright with his hands. The broadcaster with her signal. The swordsman with his blade. The ghost with her knives. The first mate with his scars. The helmsman with his spark.',
        '"We\'re going to take it."',
      ],
    },
    {
      id: 'intel_11',
      paragraphs: [
        'Hella puts storm tea on the counter. Doesn\'t charge for it. She\'s been doing this since the first day. She\'ll keep doing it after. Some debts aren\'t denominated in Sovereigns.',
        'Seven cups. Seven people. One island. One week.',
        'The harbor lamps come on. The Fallow Tide sits at anchor. Dragghen\'s work visible in every joint and seam.',
        'Tomorrow, the plan. Tonight, the last meal before everything changes.',
      ],
      autoAdvance: false,
    },
  ],
  nextSceneId: 'act1_intel_conquest',
  onComplete: [
    { type: 'flag', target: 'act1_intel_complete', value: true },
    // Safety net: recruit anyone missed (no-op if already recruited)
    { type: 'recruit', target: 'delvessa', value: true },
    { type: 'recruit', target: 'dragghen', value: true },
    { type: 'recruit', target: 'suulen', value: true },
    { type: 'recruit', target: 'kovesse', value: true },
    { type: 'recruit', target: 'vorreth', value: true },
    { type: 'recruit', target: 'tessek', value: true },
    { type: 'recruit', target: 'orren', value: true },
  ],
  currentBeat: 0,
};

// Conquest approach choice -- separate scene, plays after act1_intel
export const act1ConquestChoiceScene: StoryScene = {
  id: 'act1_intel_conquest',
  title: 'ACT 1 - THE APPROACH',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth', 'tessek', 'orren'],
  beats: [
    {
      id: 'intel_conquest_bridge',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa is already talking when you sit down. Ledger open, ink still drying on the latest page.',
        '"Four ways to take this island."',
      ],
    },
    {
      id: 'intel_conquest_choice',
      title: 'CHOOSE YOUR APPROACH',
      paragraphs: [
        'Delvessa lays it out. Four approaches. Each one shapes how the Bastion Sea sees you, and how Tavven Shoal remembers you.',
      ],
      choices: [
        {
          id: 'approach_force',
          text: 'FORCE - Storm the Harbor Board. Take it by strength.',
          consequence: 'Fast. Loud. Overwhelming.',
          available: true,
          effects: [
            { type: 'flag', target: 'conquest_approach', value: 'force' },
            { type: 'bounty', value: 65000000 },
            { type: 'infamy', value: 20 },
            { type: 'reputation', value: 5 },
            { type: 'loyalty', target: 'vorreth', value: -10 },
            { type: 'loyalty', target: 'dragghen', value: -10 },
            { type: 'loyalty', target: 'kovesse', value: 10 },
            { type: 'notification', value: true, notification: {
              type: 'grimoire',
              title: 'ONI WARLORD SEIZES TAVVEN SHOAL BY FORCE',
              message: 'The Oni known as Karyudon stormed the Harbor Board with a crew of five. Harbor Master Pettha Koss is alive but the island is now under Renegade control. Wardensea response expected within 48 hours. Bounty: 65,000,000 Sovereigns.',
            }},
            { type: 'scene', target: 'conquest_force', value: true },
          ],
        },
        {
          id: 'approach_negotiation',
          text: 'NEGOTIATION - Make Pettha a better offer than the Kolmari.',
          consequence: 'Slower. Smarter. Outbid them.',
          available: true,
          effects: [
            { type: 'flag', target: 'conquest_approach', value: 'negotiation' },
            { type: 'bounty', value: 35000000 },
            { type: 'reputation', value: 15 },
            { type: 'infamy', value: 5 },
            { type: 'loyalty', target: 'delvessa', value: 15 },
            { type: 'loyalty', target: 'vorreth', value: 10 },
            { type: 'notification', value: true, notification: {
              type: 'grimoire',
              title: 'TAVVEN SHOAL ENTERS RENEGADE ALLIANCE',
              message: 'Harbor Master Pettha Koss has formally allied with an Oni captain called Karyudon. The island remains operational. Kolmari Trade Confederation has filed a formal protest. Bounty: 35,000,000 Sovereigns.',
            }},
            { type: 'scene', target: 'conquest_negotiation', value: true },
          ],
        },
        {
          id: 'approach_economic',
          text: 'ECONOMIC PRESSURE - Sabotage the Kolmari deal from the inside.',
          consequence: 'Complex. Surgical. Sabotage from within.',
          available: true,
          effects: [
            { type: 'flag', target: 'conquest_approach', value: 'economic' },
            { type: 'bounty', value: 20000000 },
            { type: 'reputation', value: 20 },
            { type: 'infamy', value: 3 },
            { type: 'loyalty', target: 'delvessa', value: 20 },
            { type: 'loyalty', target: 'kovesse', value: 15 },
            { type: 'loyalty', target: 'suulen', value: 10 },
            { type: 'notification', value: true, notification: {
              type: 'grimoire',
              title: 'KOLMARI TRADE DEAL COLLAPSES AT TAVVEN SHOAL',
              message: 'Leaked contract terms reveal a 40% rent increase hidden in the Kolmari exclusive warehousing agreement. Tavven Shoal residents demand rejection. An Oni captain named Karyudon has been named the island\'s new security provider. Bounty: 20,000,000 Sovereigns.',
            }},
            { type: 'scene', target: 'conquest_economic', value: true },
          ],
        },
        {
          id: 'approach_subversion',
          text: 'SUBVERSION - Become so necessary that the island claims you.',
          consequence: 'The long game. Become essential.',
          available: true,
          effects: [
            { type: 'flag', target: 'conquest_approach', value: 'subversion' },
            { type: 'bounty', value: 15000000 },
            { type: 'reputation', value: 25 },
            { type: 'infamy', value: 1 },
            { type: 'loyalty', target: 'dragghen', value: 20 },
            { type: 'loyalty', target: 'suulen', value: 15 },
            { type: 'loyalty', target: 'vorreth', value: 15 },
            { type: 'loyalty', target: 'kovesse', value: -5 },
            { type: 'notification', value: true, notification: {
              type: 'grimoire',
              title: 'UNKNOWN RENEGADE ASSUMES CONTROL OF TAVVEN SHOAL',
              message: 'A gradual shift in Tavven Shoal\'s power structure has placed an Oni called Karyudon at the center of island operations. No violence reported. Wardensea has noted the change. Bounty: 15,000,000 Sovereigns.',
            }},
            { type: 'scene', target: 'conquest_subversion', value: true },
          ],
        },
      ],
    },
  ],
  currentBeat: 0,
};
