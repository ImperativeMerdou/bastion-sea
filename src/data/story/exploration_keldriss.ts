import { StoryScene } from '../../types/game';

export const keldrisArrivalScene: StoryScene = {
  id: 'explore_keldriss',
  title: 'KELDRISS - THE BLADE',
  characters: ['karyudon', 'dragghen', 'kovesse'],
  beats: [
    {
      id: 'keldriss_arrive_01',
      title: 'THE SMUGGLER\'S HAVEN',
      paragraphs: [
        'The island doesn\'t want to be found.',
        'No lighthouse. No harbor markers. The approach channel cuts back through reef coral that has to be navigated by Sight because the water hides the rocks until they\'re scraping your hull. Dragghen rates the channel a two. He means it as a compliment. Anything hard to reach is hard to attack.',
        'Keldriss sits low in the water, more canopy than settlement, the kind of place that grew around the trees instead of cutting them down. Pine and salt in the air, plus something chemical underneath. Refining oil. Somebody on this island is processing goods that don\'t appear on any trade manifest.',
        'No dock. A stretch of volcanic rock where someone hammered in cleats and called it infrastructure. No harbor master. No scheduling board. No flag.',
        'You like it immediately.',
      ],
    },
    {
      id: 'keldriss_arrive_02',
      paragraphs: [
        'Eyes in the treeline. Not one pair. Dozens. The locals watch you the way forest animals watch a new predator: motionless, patient, waiting to see what you eat.',
        'A woman steps out of the canopy. Salt-white hair cropped close, longbow across her back, a face carved from the same volcanic rock as the dock. She\'s missing the last two fingers on her left hand.',
        '"No fees. No protection. You anchor at your own risk. Cause trouble, you swim." She looks you up and down. Takes her time. "You\'re bigger than the broadcasts suggested."',
        '"Kovesse has bad camera angles."',
        'The woman doesn\'t smile. Her eyes narrow a fraction.',
        '"Name\'s Fael. If you need something, ask. If you need someone, don\'t."',
      ],
    },
    {
      id: 'keldriss_arrive_03',
      paragraphs: [
        'The market is a web of stalls under canvas stretched between tree trunks. Everything is available if you know who to ask. Weapons the Wardensea has banned. Navigation charts that official cartographers don\'t acknowledge. Information that nobody is supposed to have.',
        'At a table near the dock edge, a massive Oni sits with his arms folded and his eyes closed. Dark coat, two forward-curving horns, an X-shaped scar visible at his chest. Tally marks up both forearms. He looks asleep, but his breathing is too controlled for sleep.',
      ],
      choices: [
        {
          id: 'keldriss_trade',
          text: 'Browse the market. See what Keldriss has to offer.',
          consequence: 'Browse. Spend. Learn what\'s for sale in a place with no rules.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'resource', target: 'sovereigns', value: -50 },
            { type: 'flag', target: 'keldriss_visited_market', value: true },
          ],
        },
        {
          id: 'keldriss_gather_intel',
          text: 'Hire a local information broker. Pay for what Keldriss knows.',
          consequence: 'Money talks. The market has ears for sale.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'resource', target: 'sovereigns', value: -75 },
            { type: 'flag', target: 'keldriss_intel_purchased', value: true },
          ],
        },
        {
          id: 'keldriss_announce',
          text: 'Make yourself known. Let Keldriss see the Oni who took Tavven Shoal.',
          consequence: 'Loud. Risky. But you don\'t hide.',
          available: true,
          effects: [
            { type: 'reputation', value: 5 },
            { type: 'infamy', value: 3 },
            { type: 'bounty', value: 2000000 },
            { type: 'flag', target: 'keldriss_announced', value: true },
          ],
        },
      ],
    },
    {
      id: 'keldriss_arrive_04',
      title: 'THE SWORDSMAN',
      paragraphs: [
        'The trouble finds you at the market edge. Not the kind you expected.',
        'A man is fighting three men at the clearing behind the stalls and he is winning, which is the wrong word because winning implies effort. He\'s practicing. The three men are the practice.',
        'Five-ten. Lean. Hawk-nosed, dark hair tied back. Thin scar across the bridge of his nose. Dark red coat, open at the chest. A nodachi on his back that he hasn\'t drawn because he doesn\'t need to. He\'s beating three armed men with a stick he picked up off the ground.',
      ],
    },
    {
      id: 'keldriss_arrive_05',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'happy',
      sfx: 'combat_sword',
      paragraphs: [
        '"CRIMSON TIDE: SEVEN-FOLD LOTUS DEFLECTION."',
        'He says it out loud. While fighting. He names the move while he\'s doing the move. It\'s a diagonal parry. Objectively, it is a diagonal parry. He has given a diagonal parry a name that sounds like a painting in a museum.',
        'One of the three men swings a club at his head. He steps sideways without looking.',
        '"WIND READING: AUTUMN GATE EVASION."',
        'That was a sidestep. He named a sidestep.',
        'The third man charges. Tessek plants the stick, vaults over the man\'s shoulders, lands behind him, and taps him on the back of the head.',
        '"MIDNIGHT REVERSAL: CRANE WALKS BACKWARD."',
        'A crowd has gathered. Half of them are entertained. The other half are trying to figure out if he\'s serious.',
        'He is absolutely serious.',
      ],
    },
    {
      id: 'keldriss_arrive_06',
      paragraphs: [
        'The three men give up. Not because they can\'t continue. Because the naming is getting to them. Hard to fight a man who announces every move like it\'s a chapter title in a novel about himself.',
        'The swordsman tosses the stick. His eyes find you in the crowd the way a compass finds north.',
      ],
    },
    {
      id: 'keldriss_arrive_06b',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"You\'re the Oni."',
      ],
    },
    {
      id: 'keldriss_arrive_06c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I\'m an Oni. Whether I\'m the one you mean depends on what you\'ve heard."',
      ],
    },
    {
      id: 'keldriss_arrive_06d',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"I\'ve heard you broke eight chains. I\'ve heard you took a God Fruit off a burning ship. I\'ve heard you\'re building something at Tavven Shoal." He walks toward you. Every step is measurement. "I\'m Tessek Vayne. I practice the Vayne Style. It\'s a sword art. I developed it myself. It\'s going to be in the history books."',
      ],
    },
    {
      id: 'keldriss_arrive_06e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"After the ones I write?"',
      ],
    },
    {
      id: 'keldriss_arrive_06f',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'happy',
      paragraphs: [
        'He grins. Sharp. Genuine.',
        '"We\'ll see which chapter comes first."',
      ],
    },
    {
      id: 'keldriss_arrive_07',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        'Over drinks at a stall that serves something called "pine liquor" which tastes exactly like its name suggests:',
        '"I\'ve been on Keldriss for two months. Training. There\'s a man named Garroden Harsk who\'s one step ahead of me. Always one step. I\'ve been chasing him across the Bastion Sea for three years."',
      ],
    },
    {
      id: 'keldriss_arrive_07b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Have you ever actually met him?"',
      ],
    },
    {
      id: 'keldriss_arrive_07c',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'grim',
      paragraphs: [
        'Tessek\'s face goes blank. Not blank like empty. Blank like a loaded weapon.',
        '"Not yet. But his sword style. It leaves marks. A cut pattern on a dock post in Windrow. A deflection scar on a Wardensea officer\'s shield at Sorren\'s Flat. He\'s out there. He\'s ahead of me. And I will find him."',
      ],
    },
    {
      id: 'keldriss_arrive_07d',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen leans over to you and speaks very quietly.',
        '"Nobody else has ever seen this person. I asked around. Three ports. Zero sightings."',
      ],
    },
    {
      id: 'keldriss_arrive_08',
      paragraphs: [
        'Tessek Vayne. Twenty-eight. Human. Self-taught swordsman from Windrow Passage. Master-grade nodachi called Redtide. Korvaan at the fleshweave stage: reinforced bones, inhuman reaction time. Sight at Forged level, which explains how he reads three opponents while naming every technique.',
        'One of the most skilled fighters you\'ve encountered.',
        'Also: insane about his imaginary rival.',
      ],
      choices: [
        {
          id: 'keldriss_recruit_tessek',
          text: '"I\'m building a crew. I could use a swordsman who names his moves."',
          consequence: 'Direct. He\'ll respect it or he won\'t.',
          available: true,
          effects: [
            { type: 'recruit', target: 'tessek', value: true },
            { type: 'loyalty', target: 'tessek', value: 8 },
            { type: 'flag', target: 'tessek_recruited', value: true },
            { type: 'flag', target: 'tessek_approach', value: 'direct' },
          ],
        },
        {
          id: 'keldriss_spar_tessek',
          text: '"Show me the Vayne Style. For real. Not with a stick."',
          consequence: 'Let the sword talk. Then decide.',
          available: true,
          effects: [
            { type: 'recruit', target: 'tessek', value: true },
            { type: 'loyalty', target: 'tessek', value: 12 },
            { type: 'flag', target: 'tessek_recruited', value: true },
            { type: 'flag', target: 'tessek_approach', value: 'sparred' },
          ],
        },
        {
          id: 'keldriss_ask_garroden',
          text: '"Tell me more about Garroden Harsk."',
          consequence: 'The way to a swordsman\'s heart is through his rival.',
          available: true,
          effects: [
            { type: 'recruit', target: 'tessek', value: true },
            { type: 'loyalty', target: 'tessek', value: 15 },
            { type: 'flag', target: 'tessek_recruited', value: true },
            { type: 'flag', target: 'tessek_approach', value: 'rival' },
          ],
        },
      ],
    },
    {
      id: 'keldriss_arrive_09',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'happy',
      paragraphs: [
        'He joins immediately. No negotiation. No conditions.',
        '"CRIMSON TIDE: THE CAPTAIN\'S ACCORD."',
      ],
      stinger: 'crew_join',
    },
    {
      id: 'keldriss_arrive_09b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"That\'s a handshake."',
      ],
    },
    {
      id: 'keldriss_arrive_09c',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'happy',
      paragraphs: [
        '"It\'s a named handshake. There\'s a difference."',
      ],
    },
    {
      id: 'keldriss_arrive_09d',
      paragraphs: [
        'Dragghen rates the recruitment a five. Kovesse is already designing his broadcast profile. She tags his entry: "combat asset, personality liability."',
      ],
    },
    {
      id: 'keldriss_arrive_09e',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'happy',
      paragraphs: [
        'Tessek reads it over her shoulder.',
        '"I\'m keeping that. It\'s going on the back of my coat."',
      ],
    },
    {
      id: 'keldriss_arrive_10',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'That evening at the dock. Dragghen and smoked fish wrapped in leaves.',
        '"I talked to a shipwright in the back stalls. Old Gorundai. Hands like mine." He unwraps the fish. Steam rises between you. "Builds smuggling boats. Fast, quiet, designed to slip Wardensea patrols. Beautiful work. Illegal as hell."',
        'He tears the fish in half. Hands you the bigger piece.',
        '"This place is what Coppervein could have been if nobody had ever tried to own it. I don\'t know if that\'s a good thing or a warning."',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'keldriss_explored', value: true },
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'KELDRISS ASSESSMENT',
      message: 'Keldriss has potential as an intelligence hub. The information market extends further than the physical stalls suggest. With the right approach, we could establish a permanent source here without the overhead of conquest. Tessek named his bunk assignment. He\'s calling it "Crimson Tide: The Resting Chamber."',
    }},
  ],
  currentBeat: 0,
};
