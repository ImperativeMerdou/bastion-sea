import { StoryScene } from '../../types/game';

export const rivalIntroScene: StoryScene = {
  id: 'rival_intro',
  title: 'THE AUCTION ARRIVES',
  characters: ['karyudon', 'delvessa', 'kovesse'],
  beats: [
    {
      id: 'rival_01',
      title: 'THE SHIP',
      paragraphs: [
        'The ship arrives at dawn. Sleek. White hull, gold trim, a vessel that announces money before it announces anything else. It slides into Tavven Shoal\'s harbor like a blade into a silk sheath: smooth, deliberate, and designed to make you notice.',
        'The name painted on the bow in gilt script: THE FINAL OFFER.',
      ],
    },
    {
      id: 'rival_01b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse sees it first. She\'s on the roof of Hella\'s stall, broadcasting the morning market report, when the ship rounds the breakwater. Her ears go flat.',
        '"Captain. We have a visitor."',
      ],
    },
    {
      id: 'rival_01c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You look up from Dragghen\'s breakfast. Your amber eyes track the ship. You take another bite. Chew. Swallow. Then you stand.',
        '"Nice ship."',
      ],
    },
    {
      id: 'rival_01d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"That\'s a Kolmari-built racing sloop with customs clearance from four different island chains," Delvessa says from behind her ledger. She hasn\'t looked up. She recognized the hull profile from the sound of the water displacement. "Whoever owns that vessel has more money than most islands."',
      ],
    },
    {
      id: 'rival_02',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'The gangplank drops. A giant comes down first: eight feet of Gorundai in a suit two sizes too small. He scans the dock with the professional disinterest of a man who has cleared a lot of rooms and expects to clear a lot more. His hands hang loose at his sides. They don\'t need to be near a weapon because they ARE the weapon.',
        'Then two figures, identical, walking in perfect sync. Thin, pale, dressed in matching dark coats. They don\'t speak to each other. They don\'t need to. One looks left. One looks right. They see everything.',
        'And then him.',
        'White hair slicked back. One gold eye that catches the morning sun like a coin. One glass eye that catches nothing at all. Lean, impeccably dressed, a Kolmari merchant\'s coat tailored for someone who might need to move fast in it. He walks down the gangplank with the easy confidence of a man who has never entered a room he didn\'t expect to own.',
        'He stops at the bottom. Looks at Tavven Shoal. At the new flag flying over the Harbor Board. At the market where vendors who answered to Tessurren Dolch two weeks ago now answer to an Oni.',
        'He smiles. It\'s a good smile. Warm, genuine.',
        'It does not reach the glass eye.',
      ],
    },
    {
      id: 'rival_03',
      speaker: 'sable_venn',
      speakerName: 'Sable Venn',
      paragraphs: [
        'He finds you at Hella\'s stall. Of course he does. Everyone finds you at Hella\'s stall. The fish market has become an unofficial command center, which suits Karyudon fine because it means Dragghen is always within cooking range.',
        '"Karyudon." He says your name the way an auctioneer reads a lot number. "The Oni who stared down a Kolmari agent in a fish market and then took the whole island. I\'ve been watching your broadcasts. Kovesse Grenn\'s work, yes? Excellent production value. The horns are very photogenic."',
        'He extends a hand. The hand is wearing a ring on every finger. Each ring is a different metal. Each metal is from a different island.',
        '"Sable Venn. They call me the Auction. I was going to buy this island." He looks around. At the harbor. At the flag. At you. "You got here first."',
      ],
    },
    {
      id: 'rival_04',
      speaker: 'sable_venn',
      speakerName: 'Sable Venn',
      paragraphs: [
        'He sits without being invited. Orders tea from Hella without checking the price. Tastes it, nods, leaves a sovereign on the counter that\'s worth more than the stall\'s daily take.',
        '"I had a deal," he says, casually, like he\'s mentioning weather. "Three months of negotiation with Tessurren Dolch. I was going to buy out the Kolmari position on Tavven Shoal. Assume their credit lines, take over the warehousing contract, restructure the local economy around my trade network. Clean, quiet, profitable. No blood. No bounties. No Wardensea attention." He sips. "And then an Oni fell out of the sky, punched the debt collector, and took the whole thing in a week."',
        'Delvessa is watching him with the focused attention of a former Kolmari agent assessing a current Kolmari asset. Her pen is still.',
        '"I\'m not angry," Sable continues. "I\'m impressed. Genuinely. You did in seven days what I planned for three months. Faster, louder, and with substantially more property damage." He sets his cup down. "But I want you to understand something, Karyudon."',
        'He leans forward. The gold eye is warm. The glass eye is not.',
        '"Everything has a price. This island had one. I was going to pay it. You chose to take it instead. That\'s fine. That\'s a valid business model. But the thing about taking things..." He smiles. "...is that someone can always take them back."',
      ],
    },
    {
      id: 'rival_05',
      title: 'THE FIRST PRICE',
      speaker: 'sable_venn',
      speakerName: 'Sable Venn',
      effect: 'shake',
      paragraphs: [
        'He stands. Brushes off his coat. Leaves enough money on the counter to buy the stall.',
        '"I\'m going to make you an offer, Karyudon. Not today. Today is introductions. But soon. And when I do, it will be generous. More generous than you deserve, frankly. Because I\'d rather buy a relationship than burn one."',
        'He adjusts his cuffs. Each cufflink is worth a minor island.',
        '"But if you say no..." The smile doesn\'t change. The temperature does. "...then I will buy everything around you. Your trade routes. Your supply lines. Your crew\'s loyalty. Everything that keeps this little empire of yours running. Not because I\'m petty. Because that\'s how markets work. You conquer with iron. I conquer with Sovereigns."',
        'He walks toward the gangplank. The giant falls into step behind him. The twins flank like shadows.',
        'At the bottom of the gangplank, he turns back. On his index finger, a ring of amber metal catches the sun.',
        '"I\'ll be in touch, Karyudon."',
      ],
      choices: [
        {
          id: 'rival_respond_threat',
          text: '"You want to buy what I\'ve built? Come back with a bigger ship."',
          consequence: 'Defiance. Dare him to come back with force.',
          available: true,
          effects: [
            { type: 'infamy', value: 3 },
            { type: 'flag', target: 'rival_response', value: 'defiant' },
            { type: 'flag', target: 'rival_encountered', value: true },
          ],
        },
        {
          id: 'rival_respond_interest',
          text: '"I\'m always open to good deals. Make it worth my time."',
          consequence: 'Pragmatism. Leave the door open.',
          available: true,
          effects: [
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'rival_response', value: 'pragmatic' },
            { type: 'flag', target: 'rival_encountered', value: true },
          ],
        },
        {
          id: 'rival_respond_dismiss',
          text: 'Say nothing. Let the silence be the answer.',
          consequence: 'Silence. Seven feet of conviction.',
          available: true,
          effects: [
            { type: 'infamy', value: 2 },
            { type: 'reputation', value: 2 },
            { type: 'flag', target: 'rival_response', value: 'silent' },
            { type: 'flag', target: 'rival_encountered', value: true },
          ],
        },
      ],
    },
    {
      id: 'rival_06',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'The Final Offer catches the wind and slides out of Tavven Shoal\'s harbor as smoothly as she entered. Gold trim catches the morning light. The giant stands at the stern rail, watching the island shrink.',
        'Delvessa closes her ledger. She\'s been writing since Venn sat down.',
        '"I recognized the hull. Kolmari-registered racing sloop. That narrows it to about forty people in the Bastion Sea." She taps her pen against the ledger. "Sable Venn. Ex-Kolmari. Left three years ago with capital. He\'s been buying islands since. Quietly. No bounties. No Grimoire attention."',
      ],
    },
    {
      id: 'rival_06b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"How much do you actually know about him?"',
      ],
    },
    {
      id: 'rival_06c',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She hesitates. For Delvessa, hesitation is an answer. "Not enough. He operates in spaces the Kolmari don\'t publish. I know the hull, I know the name, I know the pattern. The details..." She closes the ledger. "I\'ll need time."',
      ],
    },
    {
      id: 'rival_06d',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse appears, practically vibrating. "Captain. CAPTAIN. We have a RIVAL. A named, photogenic RIVAL with a cool ship and matching henchmen. The metrics on this are going to be INSANE."',
      ],
    },
    {
      id: 'rival_06e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You crack a knuckle. Don\'t answer Kovesse.',
        '"Good."',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'rival_encountered', value: true },
    { type: 'flag', target: 'sable_venn_introduced', value: true },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'RIVAL SPOTTED: SABLE VENN, "THE AUCTION"',
      message: 'A new player has entered the Bastion Sea game. Sable Venn, former Kolmari investment broker, visited Tavven Shoal this morning. Sources indicate he had a pre-existing deal to acquire the island before Captain Karyudon claimed it. Personal fortune estimated at 900M Sovereigns. Crew name: The Closing Bid. Ship: The Final Offer. Current disposition toward Karyudon: amused. That won\'t last.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'DELVESSA GHAL - Intelligence Brief',
      message: 'Captain. Sable Venn is not an enemy we can ignore. He operates on a different axis than the Wardensea or the Kolmari. They use force and bureaucracy. He uses money. Pure, liquid, convertible money. He can\'t fight us directly. He doesn\'t need to. He can starve our trade routes, outbid our supply contracts, and offer our crew better pay than we can match. I am already drafting economic countermeasures. But understand this: the Wardensea wants to stop us. Sable Venn wants to BUY us. In some ways, that is more dangerous.',
    }},
  ],
  currentBeat: 0,
};
