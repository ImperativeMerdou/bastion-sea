import { StoryScene } from '../../types/game';

export const mossbreakArrivalScene: StoryScene = {
  id: 'explore_mossbreak',
  title: 'MOSSBREAK - THE DARK',
  characters: ['karyudon', 'dragghen', 'kovesse', 'tessek'],
  nextSceneId: 'explore_coppervein',
  beats: [
    {
      id: 'mossbreak_arrive_01',
      title: 'NEUTRAL GROUND',
      paragraphs: [
        'Two men are arguing on the dock about who owns a crab trap that neither of them has checked in three years. The moss has already settled it. The moss owns everything here.',
        'Mossbreak. Three taverns. A supply depot. Wooden platforms on volcanic stone connected by rope bridges that sway when the wind picks up. The whole place smells like damp wood and old beer.',
        'Six hundred people. Most of them passing through. The ones who stay have their reasons, and the reasons are never good.',
      ],
    },
    {
      id: 'mossbreak_arrive_02',
      paragraphs: [
        'The rule at Mossbreak is simple and unwritten: no fighting in the harbor. Settle your business at sea. The three taverns are neutral territory by mutual agreement, enforced by the bartenders, who are the closest thing this island has to a government.',
        'You walk into the first tavern. Heads turn. An Oni your size draws attention anywhere, but at Mossbreak, attention is currency. Three separate tables start evaluating you before you sit down.',
        'A Renegade crew at the back corner. Their captain, a woman with copper skin and a mechanical arm, pretending not to watch. Information brokers near the bar already writing notes. And a lone figure in the darkest corner, hooded, who doesn\'t react to anything.',
      ],
    },
    {
      id: 'mossbreak_arrive_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      expression: 'fear',
      paragraphs: [
        'Kovesse is vibrating.',
        '"Captain. CAPTAIN. That\'s Iren Saltz at the back table. She runs the Copperhand crew. Mid-tier Renegade, maybe 80 million bounty between the lot of them. She took Windrow two years ago and lost it in six months. Been drifting since."',
        '"And the brokers?"',
        '"Kolmari-adjacent. They sell information to anyone who pays. Useful. Expensive. Not to be trusted."',
        '"And the one in the corner?"',
        'Kovesse goes quiet.',
        'Kovesse quiet is wrong.',
        '"I don\'t know. And I don\'t like not knowing."',
      ],
      choices: [
        {
          id: 'mossbreak_approach_iren',
          text: 'Approach Iren Saltz. A captain who lost territory might have lessons.',
          consequence: 'Talk to the one who lost. Learn from the loss.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'mossbreak_met_iren', value: true },
          ],
        },
        {
          id: 'mossbreak_buy_info',
          text: 'Buy information from the brokers. Cold Sovereigns for cold intel.',
          consequence: 'Expensive but efficient.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 8 },
            { type: 'resource', target: 'sovereigns', value: -80 },
            { type: 'flag', target: 'mossbreak_bought_intel', value: true },
          ],
        },
        {
          id: 'mossbreak_watch_corner',
          text: 'Watch the hooded figure. Something about them doesn\'t add up.',
          consequence: 'Trust the instinct. Not everything at Mossbreak is what it looks like.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 3 },
            { type: 'loyalty', target: 'tessek', value: 3 },
            { type: 'flag', target: 'mossbreak_noticed_stranger', value: true },
          ],
        },
      ],
    },
    {
      id: 'mossbreak_arrive_04',
      title: 'THE GHOST',
      paragraphs: [
        'The hooded figure is gone.',
        'Not left. Gone. You were watching the corner and then you weren\'t, and in the gap between looking away and looking back, the chair is empty. No scrape. No rustle. No footsteps.',
        'Tessek was watching too. Redtide is half-drawn before he registers the empty chair.',
        '"CRIMSON TIDE: PHANTOM DEPARTURE READING." He resheathes. "Forged Sight at minimum. Possibly higher. Nobody reads a room\'s attention field that cleanly."',
        '"I didn\'t see them leave," Dragghen says.',
        '"That\'s the point," Tessek says.',
      ],
    },
    {
      id: 'mossbreak_arrive_05',
      paragraphs: [
        'You find her. Or she lets you find her. The distinction will never be clear with Suulen Vassere.',
        'She\'s on the dock behind the tavern, sitting on a coil of rope with her hood down. Blue-black skin. White hair cropped close. Silver-reflective eyes that catch the harbor lamps and throw them back brighter than they arrived.',
        'Morventhi. Built for darkness the way you\'re built for impact. She\'s holding two knives in her lap. Craft-grade. Resonance-tuned. The kind that sing when they cut.',
        'She doesn\'t look up when you approach. She knew you were coming before you knew you were coming.',
      ],
    },
    {
      id: 'mossbreak_arrive_06',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"You\'re loud."',
        'Two words. Delivered like a medical diagnosis.',
        '"I\'m an Oni. Loud is in the job description."',
        '"I know what you are. I know what you\'re doing. I know your crew size, your ship condition, and the three people who followed you from the tavern who think they\'re being subtle." She still hasn\'t looked up. "The brokers are Kolmari-funded. The Copperhand captain is drinking herself into early retirement. And you\'re the second person this week to try and figure out who I am."',
        '"Who was the first?"',
        'She looks up. The silver eyes catch yours. They don\'t reflect. They take.',
        '"Someone who won\'t be asking again."',
      ],
    },
    {
      id: 'mossbreak_arrive_07',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Tunnel-runner. Undersprawl born. I navigate places that don\'t exist on maps and find things that don\'t want to be found." A pause. Long. Comfortable. She doesn\'t rush to fill it. "I\'ve been moving through the Bastion Sea for three years looking for something."',
        '"What?"',
        '"A route nobody has mapped."',
        '"That\'s vague."',
        '"That\'s the point." Another pause. "I watched your broadcast from Tavven. The debt collector. You didn\'t plan it. You reacted. Your body moved before your brain caught up."',
        '"Is that a compliment?"',
        '"It\'s an observation. Planning can be taught. Instinct can\'t."',
      ],
    },
    {
      id: 'mossbreak_arrive_08',
      paragraphs: [
        'The night at Mossbreak gets interesting when a Copperhand Renegade knocks his drink on Dragghen\'s boots. Accident or insult. At Mossbreak, the distinction doesn\'t matter.',
        '"Watch your step, Gorundai."',
        'Dragghen looks at his boots. Then at you. The question is in his eyes.',
      ],
      choices: [
        {
          id: 'mossbreak_bar_fight',
          text: '"Dragghen. Break his table."',
          consequence: 'The no-fighting rule is a suggestion. Suggestions get broken.',
          available: true,
          effects: [
            { type: 'combat', target: 'mossbreak_brawl', value: true },
          ],
        },
        {
          id: 'mossbreak_defuse',
          text: 'Buy the man a drink. "Easy. The boots will dry."',
          consequence: 'Diplomacy. Costs a drink. Saves a table.',
          available: true,
          effects: [
            { type: 'resource', target: 'sovereigns', value: -5 },
            { type: 'loyalty', target: 'dragghen', value: -2 },
            { type: 'loyalty', target: 'kovesse', value: 3 },
            { type: 'reputation', value: 2 },
          ],
        },
        {
          id: 'mossbreak_let_suulen',
          text: 'Wait. Watch the corner where Suulen was sitting.',
          consequence: 'The Ghost doesn\'t need an invitation.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 5 },
            { type: 'infamy', value: 2 },
            { type: 'flag', target: 'suulen_intervened', value: true },
          ],
        },
      ],
    },
    {
      id: 'mossbreak_arrive_09',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'However it ends, Suulen is there afterward. Sitting. Waiting. As if she\'d been there the whole time.',
        '"You need a navigator," she says.',
        '"I have Dragghen."',
        '"Dragghen builds ships. He doesn\'t read water." She stands. "You need someone who can feel the current before it decides to kill you. Someone who sees in the dark. Someone who knows how to get into places that don\'t have doors."',
        'The knives disappear into her coat. You don\'t see her hands move.',
        '"I want passage. You go where I tell you there\'s a route worth mapping. In exchange, I navigate. I scout. I make sure nobody sneaks up on your loud, visible, impossible-to-miss operation."',
      ],
      choices: [
        {
          id: 'mossbreak_recruit_suulen',
          text: '"Welcome aboard. Try not to disappear without telling someone."',
          consequence: 'She\'ll disappear without telling someone. You both know it.',
          available: true,
          effects: [
            { type: 'recruit', target: 'suulen', value: true },
            { type: 'loyalty', target: 'suulen', value: 8 },
            { type: 'flag', target: 'suulen_recruited', value: true },
            { type: 'flag', target: 'suulen_approach', value: 'welcomed' },
          ],
        },
        {
          id: 'mossbreak_terms',
          text: '"Your terms are your terms. But when we\'re at sea, I need to know where you are."',
          consequence: 'Set the boundary. She\'ll decide how much of it she respects.',
          available: true,
          effects: [
            { type: 'recruit', target: 'suulen', value: true },
            { type: 'loyalty', target: 'suulen', value: 5 },
            { type: 'loyalty', target: 'dragghen', value: 3 },
            { type: 'flag', target: 'suulen_recruited', value: true },
            { type: 'flag', target: 'suulen_approach', value: 'boundaried' },
          ],
        },
        {
          id: 'mossbreak_challenge_suulen',
          text: '"Show me. Right now. Disappear and reappear behind me."',
          consequence: 'She\'s already behind you. She was behind you before you finished the sentence.',
          available: true,
          effects: [
            { type: 'recruit', target: 'suulen', value: true },
            { type: 'loyalty', target: 'suulen', value: 10 },
            { type: 'flag', target: 'suulen_recruited', value: true },
            { type: 'flag', target: 'suulen_approach', value: 'tested' },
          ],
        },
      ],
    },
    {
      id: 'mossbreak_arrive_10',
      paragraphs: [
        'Dawn. The dock. The crab-trap argument has resumed. The moss is still winning.',
        'Suulen is on the ship before anyone else wakes up. She\'s checked the rigging, the hull seams, and the navigation charts, and left notes in handwriting so small that Kovesse needs a magnifying lens to read them.',
        'The notes are accurate. The charts have been corrected.',
        'Kovesse logs the crew update across three Grimoire networks: "NEW CREW MEMBER: Suulen Vassere. Navigation, Reconnaissance. Note: verify her location before assuming she\'s absent. PERSONAL NOTE: she appeared behind me while I was typing this."',
      ],
      stinger: 'crew_join',
    },
  ],
  onComplete: [
    { type: 'flag', target: 'mossbreak_explored', value: true },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE CHATTER - Mossbreak Sighting',
      message: 'Grimoire users at Mossbreak report sighting of the Oni captain Karyudon at the harbor tavern. No incident confirmed. He bought drinks. A Morventhi tunnel-runner was seen leaving with his crew. Opinions are divided on whether this is a good sign.',
    }},
  ],
  currentBeat: 0,
};
