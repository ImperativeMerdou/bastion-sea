import { StoryScene } from '../../types/game';

export const primeKhossScene: StoryScene = {
  id: 'prime_khoss_arrival',
  title: 'THE QUIET STORM',
  characters: ['karyudon'],
  beats: [
    {
      id: 'pkhoss_01',
      title: 'TWELVE GREY HULLS',
      stinger: 'story_revelation',
      background: 'scene_wardensea_blockade',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse wakes you before dawn. Not with a shout. With a hand on your shoulder and a voice that is doing its best to sound professional.',
        '"Captain. You need to see this."',
        'The deck is cold. The air smells like rain that hasn\'t fallen yet. The horizon is wrong.',
      ],
    },
    {
      id: 'pkhoss_02',
      paragraphs: [
        'Twelve ships. Storm-grey hulls in formation, spread across the eastern approach. Not moving. Not anchoring. Holding position with the mechanical precision of a clock.',
        'Third Division markings. The wave crest on the mainmasts.',
        'Vorreth is at the rail. He hasn\'t moved since he saw them. His fingers are digging into the wood hard enough to leave marks.',
      ],
    },
    {
      id: 'pkhoss_03',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"Third Division." Vorreth\'s voice is wrong. Flat. Careful. "That\'s not a response fleet. That\'s a blockade group. Twelve ships, four heavy frigates, supply train in the rear."',
        'He turns to you.',
        '"That\'s a Prime\'s fleet. They sent a Prime."',
      ],
      expression: 'grim',
    },
    {
      id: 'pkhoss_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa is beside you. She hasn\'t slept either. Her eyes are on the fleet, reading it the way she reads everything: as a problem with variables.',
        '"Prime Edara Khoss. Third Prime, Third Division. Forty-seven. Career Wardensea, garrison-born. Two wars. Four commands. Undefeated in single combat."',
        'She pauses.',
        '"She\'s the one they send when admirals fail."',
      ],
      expression: 'grim',
    },
    {
      id: 'pkhoss_05',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen appears from below decks. Wrench in one hand. Damage assessment in the other. He looks at the fleet. Looks at the damage assessment. Looks at you.',
        '"Rate that fleet."',
        'Nobody asks.',
        '"Negative four. We can\'t outrun it, outgun it, or outmaneuver it. The only thing we can do is not be where it is, and it\'s everywhere."',
      ],
      expression: 'grim',
    },
    {
      id: 'pkhoss_06',
      paragraphs: [
        'A signal skiff launches from the flagship. White flag. Wardensea diplomatic protocol. The skiff crosses the glass-flat water in perfect silence, oars rising and falling in unison.',
        'The messenger is a young officer with the blank face of someone carrying a message they know is bad. He hands you a sealed cylinder. Wardensea wax. Third Division stamp.',
        'You crack the seal.',
      ],
    },
    {
      id: 'pkhoss_07',
      paragraphs: [
        'The letter is handwritten. Clean script. No flourishes.',
        '"Karyudon. I am Prime Edara Khoss, Third Division. I am authorized to offer the following terms:"',
        '"One. Full surrender of all claimed territories in the Bastion Sea."',
        '"Two. Surrender of the Western Dragon Fruit to Wardensea custody."',
        '"Three. You will submit to trial at Wardensea Central Court."',
        '"In exchange: your crew will be granted full amnesty. No charges. No records. They walk free."',
        '"These terms are non-negotiable but they are genuine. I do not bluff. I do not threaten. I inform."',
        '"You have twenty-four hours."',
        '"P. E. Khoss"',
      ],
    },
    {
      id: 'pkhoss_08',
      paragraphs: [
        'The crew reads the letter over your shoulder. The silence is specific: the silence of people doing math they don\'t want to finish.',
        'Vorreth breaks it first.',
      ],
    },
    {
      id: 'pkhoss_09',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"She means it. Every word. I served under officers like Khoss. She won\'t add conditions. She won\'t reduce the offer. And when the twenty-four hours expire, she will do exactly what the fleet is designed to do."',
        'He meets your eyes.',
        '"They sent a Prime. Not an admiral. Not a response fleet. A Prime."',
      ],
      expression: 'grim',
    },
    {
      id: 'pkhoss_10',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      expression: 'fear',
      paragraphs: [
        'Kovesse is running numbers on her Grimoire. Her tail is rigid. Bad sign.',
        '"The Grimoire feeds are going insane. Everyone in the Bastion Sea knows the fleet is here. Our territory morale is going to crater. Trade routes are already frozen. Nobody\'s going to dock at an island with twelve warships on the horizon."',
        '"Captain, we need to respond. Fast. Before the fear does more damage than the fleet."',
      ],
    },
    {
      id: 'pkhoss_choice',
      paragraphs: [
        'Twenty-four hours. Twelve ships. One Prime.',
        'The Bastion Sea waits.',
      ],
      choices: [
        {
          id: 'khoss_accept_terms',
          text: 'Accept the terms. The crew walks free. That matters more than territory.',
          consequence: 'Surrender. The crew walks.',
          available: true,
          effects: [
            { type: 'flag', target: 'khoss_response', value: 'surrender' },
            { type: 'flag', target: 'game_ending_type', value: 'surrender' },
            { type: 'flag', target: 'prime_khoss_confrontation_begun', value: true },
            { type: 'notification', value: true, notification: {
              type: 'story',
              title: 'TERMS ACCEPTED',
              message: 'The crew walks. You don\'t. The Bastion Sea will remember what you built, even if the Wardensea dismantles it.',
            }},
          ],
        },
        {
          id: 'khoss_negotiate',
          text: 'Request a meeting. Face to face. Buy time.',
          consequence: 'Diplomacy. Buy time.',
          available: true,
          effects: [
            { type: 'flag', target: 'khoss_response', value: 'negotiate' },
            { type: 'flag', target: 'khoss_negotiation_day', value: 0 },
            { type: 'loyalty', target: 'delvessa', value: 3 },
            { type: 'loyalty', target: 'vorreth', value: 3 },
            { type: 'scene', target: 'prime_khoss_negotiate', value: true },
          ],
        },
        {
          id: 'khoss_fight',
          text: 'Burn the letter. Ready the crew. If the Wardensea wants the Bastion Sea, they can bleed for it.',
          consequence: 'War. Let them bleed for it.',
          available: true,
          effects: [
            { type: 'flag', target: 'khoss_response', value: 'fight' },
            { type: 'infamy', value: 10 },
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'scene', target: 'prime_khoss_fight', value: true },
          ],
        },
      ],
    },
  ],
  currentBeat: 0,
};

// === NEGOTIATE PATH ===
export const primeKhossNegotiateScene: StoryScene = {
  id: 'prime_khoss_negotiate',
  title: 'THE QUIET STORM',
  characters: ['karyudon'],
  beats: [
    {
      id: 'pkhoss_negotiate_01',
      background: 'scene_wardensea_blockade',
      paragraphs: [
        'You write your response on the back of her letter. Four words.',
        '"Come aboard. Bring tea."',
        'The signal skiff carries it back across the glass water. Thirty minutes later, a second skiff launches. One figure. Storm-grey coat.',
        'She comes alone.',
      ],
    },
    {
      id: 'pkhoss_negotiate_02',
      speaker: 'prime_khoss',
      speakerName: 'Prime Khoss',
      paragraphs: [
        'Prime Khoss steps onto your deck. Her boots land flat, centered, the weight distributed like she\'s already measured the planks.',
        'She\'s shorter than you expected. 5\'8", maybe. The grey-streaked hair pulled back tight. The scar across her left cheekbone, thin, old, from a blade that got closer than it should have.',
        'Her eyes miss nothing. You feel them catalog the ship, the crew, the rigging, the weapon on your hip. All of it, before she\'s finished crossing the gangway.',
        'She stops ten feet away.',
        '"You requested a meeting."',
        'Her voice is quiet. Not soft.',
      ],
    },
    {
      id: 'pkhoss_negotiate_03',
      speaker: 'prime_khoss',
      speakerName: 'Prime Khoss',
      paragraphs: [
        'The negotiation takes three hours. Delvessa sits at your side. Vorreth stands behind you. Khoss sits alone across the table and drinks the tea you provided without commenting on the quality.',
        'The result: five days. A reassessment. Khoss wants to see if your territories can survive the pressure. If morale holds, trade resumes, and the islands don\'t collapse, she will know you built something real. If they crumble, she won\'t need to fire a cannon.',
        '"Five days," she says, standing. "Use them well."',
        'She leaves the teacup. Empty. On your table. In your territory.',
        'The message is not subtle.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'prime_khoss_confrontation_begun', value: true },
    { type: 'flag', target: 'khoss_negotiation_active', value: true },
  ],
};

// === FIGHT PATH ===
// Pre-fight narration, then boss fight via onComplete.
export const primeKhossFightScene: StoryScene = {
  id: 'prime_khoss_fight',
  title: 'THE QUIET STORM',
  characters: ['karyudon'],
  beats: [
    {
      id: 'pkhoss_fight_01',
      background: 'scene_wardensea_blockade',
      paragraphs: [
        'You burn the letter. Kovesse broadcasts the footage to every Grimoire in the Bastion Sea.',
        'Mossbreak sends a militia detachment. Anvil Cay sends weapons, fresh-forged, Tessik\'s best. Sorren\'s Flat sends a message, unsigned, containing the fleet\'s patrol schedule and three blind spots in the blockade formation.',
      ],
    },
    {
      id: 'pkhoss_fight_02',
      paragraphs: [
        'Khoss doesn\'t wait twenty-four hours. She comes in twelve.',
        'Alone. On a skiff. Boards your ship through the rain with her blade already drawn.',
        'No soldiers. No escort. No announcement.',
        'The Iron coming off her is visible in the rain. A low heat shimmer, like pavement in summer. She hasn\'t activated it yet.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'prime_khoss_confrontation_begun', value: true },
    { type: 'combat', target: 'prime_khoss_confrontation', value: true },
  ],
};
