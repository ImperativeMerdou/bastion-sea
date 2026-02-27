import { StoryScene } from '../../types/game';

export const vorrethRecruitmentScene: StoryScene = {
  id: 'vorreth_recruitment',
  title: 'THE STANDARD',
  characters: ['karyudon', 'vorreth', 'dragghen', 'kovesse'],
  nextSceneId: 'crew_identity',
  onComplete: [
    { type: 'recruit', target: 'vorreth', value: true },
    { type: 'flag', target: 'vorreth_recruited', value: true },
  ],
  beats: [
    {
      id: 'vor_01',
      title: 'THE OTHER ONI',
      paragraphs: [
        'He arrives three days after you do.',
        'You\'re at the dry dock with Dragghen, looking at the ship Kovesse found. It\'s called the Fallow Tide and Dragghen rates it a five, which he says with the same tone a chef uses to say "edible." The hull needs work. The rigging is salvageable. The previous captain had a debt problem and an exit strategy that involved leaving the Bastion Sea permanently.',
        'Dragghen is under the hull when the dock goes quiet. Not market-quiet. Different. The quiet that happens when something walks into a space and the space adjusts.',
        'You feel it before you see him. Another Oni. The Iron resonance. Like recognizing a voice in a crowd.',
      ],
    },
    {
      id: 'vor_02',
      paragraphs: [
        'Six-eleven. Dark grey skin. Two forward-curving black horns, thicker than yours. Heavy muscular build under an open black captain\'s coat. An X-shaped scar across his chest, visible because the coat is unbuttoned, because he doesn\'t care who sees it.',
        'Forty-seven tally marks scarred into his forearms. One per major fight. You count them because an Oni counts another Oni\'s marks the way a sailor reads another sailor\'s knots. Automatically.',
        'No weapon. His hands are enough. You can tell from the Korvaan scarring on his knuckles, the deliberate Iron-hardening that turns fists into hull-crackers.',
        'He walks down the dock. The dockworkers move. Not fast, not scared, but with the instinctive physics that large things generate.',
        'He stops ten feet from you.',
      ],
    },
    {
      id: 'vor_03',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Karyudon."',
        'He knows your name. Of course he does. Kovesse has been broadcasting it for three days.',
        '"You\'re the one who faced down the Kolmari agent." His voice is low and steady, carries without raising. The voice of someone who has commanded crews and knows that volume is a waste of energy. "The broadcasts don\'t do you justice. You\'re bigger in person."',
      ],
    },
    {
      id: 'vor_03b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"So are you."',
      ],
    },
    {
      id: 'vor_03c',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"I\'m Vorreth Daaz. Formerly of the Daaz Accord."',
      ],
    },
    {
      id: 'vor_04',
      paragraphs: [
        'The Daaz Accord. You know the name. Every Oni knows the name. A Renegade crew that held the southern corridors for six years. 280 million combined bounty. Led by Vorreth\'s captain, Douren Daaz, until the Wardensea cornered them off Noon Island and broke the crew in a three-day running battle.',
        'The survivors scattered. Most were caught. Some weren\'t.',
        'Vorreth is one of the ones who wasn\'t.',
      ],
    },
    {
      id: 'vor_05',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"I\'ve been watching you for two days. Not from the crowd. You wouldn\'t have spotted me in the crowd. I watched from the harbor wall, the fish market roof, and Hella\'s back kitchen, which she gave me access to because I fixed her grill exhaust. I wanted to see how you operate before I introduced myself."',
        'He folds his arms. The tally marks move across his forearms like a record.',
        '"You operate loud. You think with your feet. You make decisions at contact speed and backfill the strategy later. Your Iron is clean but your perimeter awareness is poor, your intelligence operation is three days old and already compromised by your own broadcaster, and your financial position is, to be generous, fictional."',
      ],
    },
    {
      id: 'vor_06',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"You also stood in front of a Kolmari debt collector and said no when nobody else in that market would. You recruited a shipwright and a broadcaster in the same afternoon by being yourself instead of being strategic. And you haven\'t lied to anyone since you arrived. Not once. I checked."',
        'He lets that sit.',
        '"I\'ve served two captains. The first one was smarter than you. Better planner, better politician, better at the long game. The Wardensea killed him because smart isn\'t the same thing as right."',
        'He meets your eyes. Oni to Oni. The same amber, the same Iron heat.',
        '"I think you might be the kind of person who\'s right. I came to find out."',
      ],
    },
    {
      id: 'vor_07',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen has emerged from under the hull. He\'s holding a wrench and watching Vorreth the way he watches everything: with professional evaluation.',
        '"Vorreth Daaz. Former Daaz Accord. 280 million bounty, personal count probably half of that." He wipes grease from the wrench. "I rate his entrance a seven. Dramatically appropriate. Could have been an eight if he\'d arrived by sea."',
      ],
    },
    {
      id: 'vor_07b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Vorreth looks at Dragghen.',
        '"You rate things."',
      ],
    },
    {
      id: 'vor_07c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Everything has a rating."',
      ],
    },
    {
      id: 'vor_07d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"I see." Vorreth\'s expression doesn\'t change. "What do you rate me?"',
      ],
    },
    {
      id: 'vor_07e',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Too early to tell. I\'ll need more data."',
        'The corner of Vorreth\'s mouth moves. One millimeter. For an Oni, that\'s a belly laugh.',
      ],
    },
    {
      id: 'vor_08',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse is broadcasting. One of her Grimoires is already pulling data.',
        '"280 million bounty," Kovesse says, reading off the screen. "Just him."',
      ],
    },
    {
      id: 'vor_08b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Just me."',
      ],
    },
    {
      id: 'vor_08c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"The Wardensea considers you Priority B. One tier below active Conquerors. They have a standing capture order. Twelve ports. You just walked into one of them."',
      ],
    },
    {
      id: 'vor_08d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"I know." He doesn\'t blink. "I walked in anyway."',
        'Across the dock, a dark-haired woman in Kolmari-cut clothing closes a ledger and watches the exchange. She\'s been at the harbor three days running.',
      ],
    },
    {
      id: 'vor_09',
      paragraphs: [
        'The dock is quiet. The four of you standing in a loose circle around a ship that\'s rated a five by a man who doesn\'t give sevens lightly. Two Oni, a Gorundai, and a Rathai.',
        'You look at Vorreth Daaz. Forty-seven fights scarred into his arms. A dead crew behind him. A Wardensea capture order over his head. And he walked into a harbor because a broadcast told him an Oni said no to a debt collector.',
      ],
      choices: [
        {
          id: 'vor_accept',
          text: '"I could use someone who knows how to lose and keeps going."',
          consequence: 'Honest. Maybe too honest. But Oni respect direct.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 10 },
            { type: 'flag', target: 'vorreth_approach', value: 'honest' },
          ],
        },
        {
          id: 'vor_challenge',
          text: '"Forty-seven fights. How many of those did you win?"',
          consequence: 'Test the record. Make him prove the marks.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'loyalty', target: 'dragghen', value: 3 },
            { type: 'flag', target: 'vorreth_approach', value: 'challenged' },
          ],
        },
        {
          id: 'vor_question',
          text: '"You said your last captain was smarter. What makes you think I\'m different?"',
          consequence: 'Ask the question he came here to answer.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 8 },
            { type: 'flag', target: 'vorreth_approach', value: 'questioned' },
          ],
        },
      ],
    },
    {
      id: 'vor_10',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'He considers your words. Takes his time. Vorreth Daaz doesn\'t rush conversations the way he doesn\'t rush fights.',
        '"Forty-four wins. Two draws. One loss." He touches the X-scar on his chest. "The loss is the one that taught me the most."',
        'He extends his hand. Oni greeting. Forearm to forearm, Iron to Iron.',
        '"I have eighteen names on a list. People from the Accord who are still in Wardensea custody or worse. I need resources and reach to get them out. You\'re building something. I want to be part of it."',
        'He looks at the ship. At the crew forming around it.',
        '"Also, your ship needs a first mate. I\'ve done it before. I was good at it."',
      ],
    },
    {
      id: 'vor_11',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You clasp his forearm. Iron to Iron. The resonance hums between you, two Oni acknowledging each other the way two mountains acknowledge each other: by existing in the same range.',
        '"Welcome to whatever this is."',
      ],
    },
    {
      id: 'vor_11b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"That\'s the worst crew pitch I\'ve ever heard."',
      ],
    },
    {
      id: 'vor_11c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Give it time. We\'re still writing the speech."',
      ],
    },
    {
      id: 'vor_12',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse is broadcasting so hard that one of her Grimoires is overheating. She\'s holding it at arm\'s length while continuing to talk into the other two.',
        '"Two Oni. TWO ONI in the same crew. Do you know the last time that happened? The Bloodtide Compact, fourteen years ago. They held the Western Reach for NINE MONTHS. I need a crew name. I need a flag design. Captain. CAPTAIN. We need branding."',
      ],
    },
    {
      id: 'vor_12b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Vorreth watches her with the flat, calm expression of a man who has encountered something he does not understand and is content to observe it from a safe distance.',
        '"Is she always like this?"',
      ],
    },
    {
      id: 'vor_12c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Since about four hours after we met," Dragghen says.',
      ],
    },
    {
      id: 'vor_12d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"I rate her a six," Vorreth says.',
      ],
    },
    {
      id: 'vor_12e',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen\'s head turns sharply. "You rate things?"',
      ],
    },
    {
      id: 'vor_12f',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"I can learn."',
      ],
    },
    {
      id: 'vor_final',
      paragraphs: [
        'Three.',
        'A shipwright. A broadcaster. A first mate with forty-seven fights behind him and eighteen names he needs to save.',
        'The Fallow Tide sits in dry dock. Dragghen is already making a list of what it needs. Kovesse is designing a crew identity broadcast. Vorreth is standing at the bow rail, arms folded, watching the harbor with the patience of someone who has waited before and can wait again.',
        'You\'re standing at the stern. The sun is going down over Tavven Shoal and the harbor lamps are coming on and somewhere in this island, in the debt ledgers and the trade routes and the unspoken agreements that hold this place together, there are cracks. And cracks are where you start.',
        'Four people. One ship. No money. No reputation. No territory.',
        'You grin.',
        'It\'s enough.',
      ],
      autoAdvance: false,
      stinger: 'crew_join',
    },
  ],
  currentBeat: 0,
};
