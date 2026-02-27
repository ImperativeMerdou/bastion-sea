import { StoryScene } from '../../types/game';

export const conquestEconomicScene: StoryScene = {
  id: 'conquest_economic',
  title: 'THE INVISIBLE HAND',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
  beats: [
    {
      id: 'economic_01',
      title: 'DAY 4 - THE ARCHITECTURE',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa lays eleven stolen Kolmari documents on Hella\'s table. She arranges them like a surgeon arranges instruments, each one in the precise position it needs to be, in the order it will be used.',
        '"The Kolmari don\'t conquer territory. They acquire debt. Then they convert debt into leverage, leverage into dependency, dependency into control." She taps the first document. "This is Tessurren\'s contract. Here\'s the buried clause. Forty percent rent increase, year two. Every vendor who signed a Kolmari credit line, Rukessa, the spice merchants, half the rope-bridge district, is twelve months away from economic strangulation."',
        '"So we show them."',
        '"No. We show the right people. At the right time. In the right order."',
      ],
    },
    {
      id: 'economic_02',
      paragraphs: [
        'The operation takes all five crew members and three days of coordination.',
        'Day one: Suulen breaks into Tessurren\'s rented office at the harbor inn. Not through the door. Through a drainage pipe that nobody else would fit through and nobody else would think to try. She copies his communication logs. Every Grimoire message to the Confederation. Every credit adjustment. Every instruction from his superiors.',
        'The messages confirm what Delvessa suspected. Tessurren isn\'t freelancing. He\'s running a standard Kolmari acquisition playbook, one they\'ve used on forty-three frontier markets in the last decade. Tavven Shoal is Step 7 in a twelve-step process.',
        'Step 12 is "full economic integration." The Kolmari word for ownership.',
      ],
    },
    {
      id: 'economic_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Day two: Kovesse goes to work.',
        'She doesn\'t broadcast the documents directly. That\'s too obvious, too easy to dismiss as forgery. Instead, she does something smarter. She broadcasts a Grimoire story about a different island, Sorren\'s Flat, in the Central Belt, where the Kolmari completed the same playbook three years ago. The rent increases. The vendor displacement. The slow, invisible colonization.',
        '"I\'m not accusing anyone," she says into her Grimoire, live to four thousand viewers. "I\'m telling a STORY about a PLACE that EXISTS. If anyone on Tavven Shoal sees parallels, well, that\'s their intelligence, not my bias."',
        'She grins at you after the broadcast. "Plausible deniability. I learned that from watching Kolmari."',
      ],
    },
    {
      id: 'economic_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Day three: Delvessa walks into the market with Dragghen.',
        'They don\'t talk to Pettha. They talk to Rukessa. The spice vendor. The small, elderly Rathai woman with turmeric-stained hands who has been paying Kolmari credit rates for eight months and watching her margins shrink.',
        'Delvessa shows her the contract. The real one. The one with the rent clause.',
        'Rukessa reads it. Her hands shake. Not from age. From fury.',
        '"They told me three percent. Three percent for five years." Her voice cracks. "This says forty."',
        '"It says forty," Delvessa confirms. "After twelve months. Every credit line holder on Tavven Shoal is looking at the same number."',
        'Rukessa looks up. Her hands have stopped shaking.',
        '"What do you need from me?"',
        '"We need you to tell the other vendors. Not us. You. They trust you. They won\'t trust us."',
        'She nods once. Tight. Decisive.',
      ],
    },
    {
      id: 'economic_05',
      paragraphs: [
        'By evening of day three, every vendor on Tavven Shoal has seen the contract.',
        'Not through official channels. Through the network that moves faster than any schedule: market gossip, back-stall conversations, the furious whisper of honest people discovering they\'ve been played.',
        'Tessurren Dolch feels the temperature shift. The vendors who used to nod when he passed now look through him. Hella serves him cold tea and doesn\'t refill it. Even his guards seem to stand a little further away.',
        'He sends a Grimoire message to the Confederation. Suulen intercepts a copy.',
        '"Market response unfavorable. Recommend accelerated timeline."',
        'The Kolmari never accelerate unless they\'re losing.',
      ],
    },
    {
      id: 'economic_06',
      title: 'DAY 7 - THE COLLAPSE',
      paragraphs: [
        'Pettha Koss calls a public meeting at the Harbor Board. She does this twice a year, market consensus sessions, she calls them. But this one is different. The crowd is bigger. The mood is sharp.',
        'Rukessa speaks first. She holds up the contract. The real one. She reads the rent clause aloud. Her voice is steady now. She\'s had three days to convert fury into purpose.',
        'The market erupts. Not violence. Commerce runs on trust, and the Kolmari just lost all of it. Vendors line up to formally reject their credit agreements. Tessurren stands at the edge of the crowd, watching his six-month operation dissolve in thirty minutes.',
      ],
    },
    {
      id: 'economic_07',
      speaker: 'pettha_koss',
      speakerName: 'Pettha Koss',
      paragraphs: [
        'Pettha Koss finds you after the meeting. She\'s not stupid. She knows someone orchestrated this. The timing was too clean. The document appeared too conveniently. The Grimoire broadcast about Sorren\'s Flat, a story nobody was telling until three days ago, seeded the context perfectly.',
        '"I don\'t know how you got that contract," she says. "I don\'t want to know. But the island needs a security arrangement now that the Kolmari are pulling their credit lines." She studies you over her spectacles. "You happen to have one available?"',
        '"I might."',
        '"Standard protection terms. You handle security. I handle scheduling. Revenue split based on trade volume. We\'ll negotiate the specifics when I\'m not managing a financial crisis." She pauses. "You played this well, Captain. Don\'t think that means I trust you."',
        '"I wouldn\'t want you to. Trust makes people sloppy."',
        'Something that might be approval crosses her face. Or indigestion. With Pettha, it\'s hard to tell.',
      ],
    },
    {
      id: 'economic_08',
      title: 'THE QUIET VICTORY',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'The Grimoire coverage is modest. "Trade dispute at Tavven Shoal." "Kolmari deal rejected." No storming of buildings. No blood. No dramatic footage of an Oni walking through a door.',
        'Kovesse is slightly disappointed. "The views are FINE. They\'re ADEQUATE. But there\'s no HOOK. Nobody shared a clip of you reading a spreadsheet."',
        '"The spreadsheet won the island, Kovesse."',
        '"I KNOW. I just wish it had better lighting."',
        'Twenty million Sovereigns on the bounty board. Not for violence. For making the Kolmari look stupid. In some ways, that\'s worse. The Confederation doesn\'t forget public embarrassment.',
        'Delvessa says nothing. She smiles.',
      ],
    },
  ],
  nextSceneId: 'conquest_aftermath',
  onComplete: [
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'KOLMARI TRADE CONFEDERATION - CREDIT REVIEW',
      message: 'All outstanding Kolmari credit lines to Tavven Shoal merchants are under review. The Confederation has recalled agent Tessurren Dolch for debriefing. Economic countermeasures are being evaluated.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'SUULEN VASSERE - INTEL REPORT',
      message: 'Tessurren\'s final Grimoire transmissions before departure suggest the Kolmari view this as a strategic loss, not a tactical one. They won\'t send another agent. They\'ll adjust the interest rates across the entire northern arc instead. We should monitor Keldriss and Coppervein.',
    }},
  ],
  currentBeat: 0,
};
