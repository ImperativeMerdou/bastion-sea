import { StoryScene } from '../../types/game';

export const copperveinConquestScene: StoryScene = {
  id: 'conquest_coppervein',
  title: 'COPPERVEIN - THE COOPERATIVE VOTES',
  beats: [
    {
      id: 'coppervein_conquest_01',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'grim',
      title: 'THE PROPOSAL',
      paragraphs: [
        'You return to Coppervein with a plan. A business plan.',
        '"They\'re Gorundai," Dragghen says, standing at the prow as the copper cliffs rise from the sea. "You can\'t buy them. You can\'t scare them. You have to convince them that what you\'re offering is better than what they have."',
      ],
    },
    {
      id: 'coppervein_conquest_01b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"And if I can\'t?"',
      ],
    },
    {
      id: 'coppervein_conquest_01c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Then you leave. Because taking Coppervein by force means killing miners. And if you do that--" His jaw sets. "--you do it without me."',
      ],
    },
    {
      id: 'coppervein_conquest_01d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa clears her throat. "He\'s right about the approach. But he\'s also right that we need this island. Coppervein controls forty percent of the region\'s copper production. Whoever holds Coppervein holds the raw materials for every ship, every weapon, every Grimoire relay in the Bastion Sea."',
      ],
    },
    {
      id: 'coppervein_conquest_01e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Then we convince them."',
      ],
    },
    {
      id: 'coppervein_conquest_01f',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Or you could just walk in there and be you," Kovesse suggests. "Seven-foot Oni with world conquest ambitions and a spiked war club. That\'s a persuasive argument all by itself."',
      ],
    },
    {
      id: 'coppervein_conquest_01g',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"That\'s not persuasion, Kovesse."',
      ],
    },
    {
      id: 'coppervein_conquest_01h',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"It\'s aspirational marketing."',
      ],
    },
    {
      id: 'coppervein_conquest_02',
      title: 'THE VOTING HALL',
      speaker: 'hella_foreman',
      speakerName: 'Foreman Hella',
      paragraphs: [
        'The Coppervein Cooperative meets in a building that has been rebuilt four times. The walls bear the scars of previous disagreements: fist-shaped dents in the copper-reinforced panels, a crack in the floor from someone stamping too hard during a labor dispute in Year Three.',
        'Two hundred miners sit on stone benches. They\'re Gorundai, mostly, thick-limbed, stone-skinned, built for endurance. A few humans. One Morventhi who runs deep-shaft surveys. They look at you the way miners look at everything: measuring the weight, estimating the value, calculating the cost.',
        'Foreman Hella speaks first. She\'s broad-shouldered even by Gorundai standards, with copper dust permanently embedded in the creases of her face.',
        '"The Oni Renegade Karyudon requests an audience with the Cooperative. He has a proposal. The Cooperative will hear it. Then we vote."',
        'She looks at you. "You have ten minutes. Talk fast."',
      ],
    },
    {
      id: 'coppervein_conquest_02b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You grin. "I don\'t do anything fast."',
        'Three miners laugh. That\'s a start.',
      ],
    },
    {
      id: 'coppervein_conquest_03',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      title: 'THE PITCH',
      paragraphs: [
        'You stand in front of two hundred miners and do something that surprises even Delvessa.',
        'You tell the truth.',
        '"I\'m building something. Not a crew. An empire. Not a territory. A new order. The Kolmari own your margins. The Wardensea patrols your shipping lanes. Every year, your neutrality costs more and buys less. You know it. I know it. The question isn\'t whether Coppervein needs a partner. It\'s whether you\'ll choose one before one is chosen for you."',
        'Silence.',
        '"I\'m not here to buy your ore. I\'m here to buy your future. Protected shipping lanes. Guaranteed trade routes through my territories. Military defense agreements. And one thing the Kolmari will never offer: a seat at the table. Not as a supplier. As a partner."',
        'Dragghen stands behind you. He hasn\'t said a word. He doesn\'t need to. Every miner in this hall knows who he is. The boy from Shaft Seven who left. Who came back with an Oni and a dream.',
      ],
      choices: [
        {
          id: 'coppervein_partner_deal',
          text: '"I\'m offering a full partnership. Shared profits, shared defense, shared risk. Coppervein stays Gorundai. It just stops being alone."',
          consequence: 'Honest. Partnership.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 15 },
            { type: 'loyalty', target: 'delvessa', value: 8 },
            { type: 'reputation', value: 8 },
            { type: 'flag', target: 'coppervein_partnership', value: true },
          ],
        },
        {
          id: 'coppervein_protection_offer',
          text: '"Here\'s the deal: you sell to me first, at fair rates. I protect your ships. Anyone who touches Coppervein ore answers to this." Raise the Danzai.',
          consequence: 'Protection. Strength talks.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: -5 },
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'infamy', value: 3 },
            { type: 'flag', target: 'coppervein_protection', value: true },
          ],
        },
        {
          id: 'coppervein_kolmari_ultimatum',
          text: '"The Kolmari are coming for this island. Not this year. Not next year. But they\'re coming. I\'m offering you a wall. The question is whether you build it now or wish you had later."',
          consequence: 'Fear. The truth as a weapon.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 10 },
            { type: 'loyalty', target: 'dragghen', value: -3 },
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'flag', target: 'coppervein_ultimatum', value: true },
          ],
        },
      ],
    },
    {
      id: 'coppervein_conquest_kade',
      title: 'THE SEAM',
      speaker: 'maren_kade',
      speakerName: 'Maren Kade',
      paragraphs: [
        'The hall goes quiet when she walks in.',
        'Maren Kade is six-foot-four. Gorundai, thick-shouldered, hands scarred so deep the calluses have calluses. Her forearms are grey with raw Iron, not refined, not elegant, just hard. Thirty years of mine work compressed into a body that could punch through a support beam and has, twice, during contract disputes.',
        'She walks past you like you\'re a piece of furniture. Takes a position at the front of the hall. Doesn\'t sit. Doesn\'t need to. Every miner in this room watched her climb from Shaft Three to Foreman to Manager to the woman who keeps the lights on and the ore moving.',
        '"I\'ve heard the pitch." Her voice fills the hall the way rock dust fills lungs: slowly, completely. "Pretty words from a big outsider with a bigger stick. I dug this island out of the dirt with my hands. Not with speeches. Not with partnership proposals. With these."',
        'She holds up her palms. The scars are a map of thirty years underground.',
        '"Every Sovereign this cooperative earns comes out of a hole I climbed into first. I broke my back in Shaft Seven before this boy was born." She doesn\'t look at Dragghen. She doesn\'t need to. Everyone knows who she means. "I made Coppervein profitable. I made us worth buying. And that means I get to say who buys."',
        'Dragghen\'s jaw is tight. His hands are flat on his thighs. He\'s not looking at Kade. He\'s looking at the wall of names beside the door. The miners who went down and didn\'t come back. He knows some of them. He knows whose shifts they were working when the shafts collapsed.',
        '"The Kolmari pay on time. They pay in full. They don\'t show up with horns and clubs and ask for a vote." Kade turns to the hall. "This is MY mine. You work it because I let you work it. You want to hand that to a Renegade with a bounty? Go ahead. Vote. But remember who fills the payroll when the Kolmari pull their contracts and this island goes dark."',
        'Silence.',
      ],
    },
    {
      id: 'coppervein_conquest_04',
      title: 'THE VOTE',
      speaker: 'hella_foreman',
      speakerName: 'Foreman Hella',
      paragraphs: [
        'The Cooperative votes.',
        'It takes three minutes. Gorundai consensus is efficient: state your position, hear the counter, punch a wall if you disagree. Fourteen walls are punched. Two benches break. One miner cries, which in Gorundai culture is considered a valid form of political expression.',
        'Kade stands at the front. Arms crossed. Iron shimmering under her skin. She watches each stone drop like she\'s counting debts.',
        'Foreman Hella counts the stones. White for yes. Copper for no.',
        'The pile grows. You watch. Dragghen watches. Delvessa has her ledger open but she\'s not writing. She\'s holding her breath.',
        'Hella straightens.',
        '"One hundred and thirty-seven white. Sixty-three copper."',
      ],
    },
    {
      id: 'coppervein_conquest_04b',
      speaker: 'maren_kade',
      speakerName: 'Maren Kade',
      paragraphs: [
        'Kade doesn\'t move. Her face doesn\'t change. But the Iron in her forearms pulses, and two miners near her step back without thinking about it.',
        '"This isn\'t over," she says. Not to you. Not to Hella. To the hall. To the rock. To the island that she built with her hands and just lost with a vote. She walks out. The door frame cracks where her shoulder hits it. She doesn\'t look back.',
        'Dragghen exhales like he\'s been underwater for ten years.',
      ],
    },
    {
      id: 'coppervein_conquest_05',
      speaker: 'hella_foreman',
      speakerName: 'Foreman Hella',
      title: 'COPPER AND IRON',
      paragraphs: [
        'You shake Hella\'s hand. It\'s like gripping warm stone.',
        '"The Cooperative has voted to accept your proposal. Coppervein enters into a formal alliance with the Karyudon fleet." She squeezes. Hard. "But understand this, Oni: we voted you in. We can vote you out. This is Coppervein. The rock decides."',
      ],
    },
    {
      id: 'coppervein_conquest_05b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Fine."',
        'Dragghen is standing by the voting hall door. As the miners file out and the hall empties, he walks to the wall of Shaft Seven memorials. Names carved in copper. Miners who went down and didn\'t come back.',
        'He touches one name. You don\'t ask whose.',
      ],
    },
    {
      id: 'coppervein_conquest_05c',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'On the walk back to the dock, Delvessa falls into step beside you. She has her folio open.',
        '"Sixty-three voted no," she says. "That\'s forty percent opposition. We need to address the Kade faction before the first supply shipment or we\'ll have labor disruptions within a week."',
      ],
    },
    {
      id: 'coppervein_conquest_05d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Already thinking about it."',
      ],
    },
    {
      id: 'coppervein_conquest_05e',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I have a preliminary proposal. You won\'t like the cost."',
      ],
    },
    {
      id: 'coppervein_conquest_05f',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"When do I ever?"',
      ],
    },
  ],
  onComplete: [
    { type: 'conquer', target: 'coppervein', value: true },
    { type: 'flag', target: 'coppervein_conquered', value: true },
    { type: 'bounty', value: 15000000 },
    { type: 'resource', target: 'materials', value: 25 },
    { type: 'resource', target: 'sovereigns', value: 150 },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: '⛏️ COPPERVEIN - ALLIED',
      message: 'The Gorundai Mining Cooperative has voted to join the Karyudon alliance. Copper shipments now flow through your network. Dragghen Kolve has come home.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE - KOLMARI TRADE OFFICE ALERT',
      message: 'The Coppervein Cooperative has entered a formal alliance with the Oni Renegade Karyudon. This represents a significant disruption to projected copper acquisition timelines. Emergency session of the Kolmari Arbiter Council has been called.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'DRAGGHEN KOLVE - Personal',
      message: 'I left this island because I couldn\'t watch it get swallowed. I came back and it voted to stand. The captain did that. Not with a club. With words. I didn\'t think he had it in him. I was wrong about a lot of things.',
    }},
    { type: 'dominion', target: 'king', value: 25 },
    { type: 'dominion', target: 'sight', value: 15 },
    { type: 'unlock', target: 'sorrens_flat', value: true },
    { type: 'unlock', target: 'anvil_cay', value: true },
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};
