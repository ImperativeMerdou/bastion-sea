import { StoryScene } from '../../types/game';

export const sorrensArrivalScene: StoryScene = {
  id: 'explore_sorrens_flat',
  title: "SORREN'S FLAT - THE COUNTING HOUSE",
  beats: [
    {
      id: 'sorrens_arrive_01',
      title: 'THE MONEY ISLAND',
      paragraphs: [
        'The customs officer charges you a berthing fee before your feet hit the dock. Three languages on the receipt. She doesn\'t look up.',
        'Behind her: matching uniforms on every dock worker. Posted rates on every berth. The island rises barely twenty feet above the waterline, a plateau of weathered stone that someone, centuries ago, decided was worth more as a ledger than a coastline.',
        'Delvessa is the happiest you\'ve ever seen her.',
      ],
    },
    {
      id: 'sorrens_arrive_01b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"This," she says, adjusting her coat, "is a serious place."',
      ],
    },
    {
      id: 'sorrens_arrive_01c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"It\'s a rock with a bank on it."',
      ],
    },
    {
      id: 'sorrens_arrive_01d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Exactly. Serious."',
      ],
    },
    {
      id: 'sorrens_arrive_02',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'The Trade Consortium runs Sorren\'s Flat the way the Kolmari run everything: with numbers, contracts, and the quiet understanding that money is the only god that answers prayers. But unlike the Kolmari, the Consortium has no government, no flag, no allegiance. They sell to everyone and owe nothing to anyone.',
        '"Three families," Delvessa explains, walking through the commercial district like she\'s come home. "The Sorrens, who founded the island. The Veshtari, who handle shipping logistics. The Duvals, who control warehousing. They compete viciously and cooperate reluctantly and the result is an economy that runs like a watch."',
        '"You sound like you admire them."',
        '"I admire competence." She glances at you. "In all its forms."',
        'She turns back to the street before you can answer.',
      ],
    },
    {
      id: 'sorrens_arrive_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'The commercial district is pristine. Cobblestone streets. Gas lanterns. Actual glass in the windows. After Keldriss and Mossbreak, Sorren\'s Flat looks like someone tried to build civilization on a sea rock and almost succeeded.',
        'Kovesse is suspicious. "Nobody is this organized without hiding something, Captain."',
      ],
    },
    {
      id: 'sorrens_arrive_03b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Vorreth disagrees. "Not everything is a conspiracy, Grenn. Some places function."',
      ],
    },
    {
      id: 'sorrens_arrive_03c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Name one."',
      ],
    },
    {
      id: 'sorrens_arrive_03d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Vorreth opens his mouth. Closes it. "Fair point."',
        'The market is where the money moves. Trade goods from every corner of the Bastion Sea pass through here: copper from Coppervein, timber from Windrow, fish from Ghostlight, even Wardensea surplus that someone technically isn\'t supposed to be selling. Everything has a price. Everything has a ledger entry.',
      ],
      choices: [
        {
          id: 'sorrens_meet_consortium',
          text: 'Request a meeting with the Trade Consortium leadership. Introduce yourself properly.',
          consequence: 'Announce your presence. Formally.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 8 },
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'sorrens_met_consortium', value: true },
          ],
        },
        {
          id: 'sorrens_delvessa_leads',
          text: 'Let Delvessa take point. She speaks their language.',
          consequence: 'Her territory. Her rules.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'resource', target: 'sovereigns', value: -40 },
            { type: 'loyalty', target: 'delvessa', value: 8 },
            { type: 'flag', target: 'sorrens_delvessa_led', value: true },
          ],
        },
        {
          id: 'sorrens_trade_hard',
          text: 'Skip the politics. Buy what you need. Sell what you don\'t. Move on.',
          consequence: 'Pure transaction. No strings.',
          available: true,
          effects: [
            { type: 'resource', target: 'supplies', value: 15 },
            { type: 'resource', target: 'sovereigns', value: -60 },
            { type: 'flag', target: 'sorrens_traded', value: true },
          ],
        },
      ],
    },
    {
      id: 'sorrens_arrive_04',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Trouble at Sorren\'s Flat doesn\'t come with fists. It comes with contracts.',
        'A courier approaches your group in the market square. Immaculately dressed. Not a hair displaced. He carries a sealed document and the expression of someone who considers himself above whatever situation he\'s delivering.',
        '"Captain Karyudon." Flat. Certain. "The Veshtari family extends an invitation to discuss trade arrangements. At your earliest convenience."',
        '"Earliest convenience" at Sorren\'s Flat means now. Delvessa can tell from the seal.',
        '"That\'s a Priority Summons," she says quietly. "They want to know if you\'re a buyer, a seller, or a problem."',
        '"Which one are we?"',
        '"Depends on the conversation."',
      ],
      choices: [
        {
          id: 'sorrens_accept_meeting',
          text: 'Accept the invitation. See what the Veshtari want.',
          consequence: 'Enter their house. Play their game. Bring Delvessa.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 6 },
            { type: 'resource', target: 'sovereigns', value: 50 },
            { type: 'reputation', value: 2 },
            { type: 'flag', target: 'sorrens_veshtari_meeting', value: true },
          ],
        },
        {
          id: 'sorrens_decline_meeting',
          text: '"Tell the Veshtari that Karyudon doesn\'t do summons. I do arrivals."',
          consequence: 'Reject the power play. Make them come to you.',
          available: true,
          effects: [
            { type: 'infamy', value: 3 },
            { type: 'reputation', value: 1 },
            { type: 'loyalty', target: 'kovesse', value: 3 },
            { type: 'flag', target: 'sorrens_declined_veshtari', value: true },
          ],
        },
        {
          id: 'sorrens_counter_offer',
          text: '"Tell them Karyudon has a counter-proposal. Dinner. My ship. Bring wine."',
          consequence: 'Flip the script. Host them instead.',
          available: true,
          effects: [
            { type: 'resource', target: 'sovereigns', value: -30 },
            { type: 'loyalty', target: 'delvessa', value: 5 },
            { type: 'loyalty', target: 'dragghen', value: 3 },
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'sorrens_hosted_veshtari', value: true },
          ],
        },
      ],
    },
    {
      id: 'sorrens_arrive_05',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Later. The ship. Delvessa reviewing numbers by lamplight, glasses catching the flame.',
        '"Assessment?" you ask from the doorway.',
        '"Sorren\'s Flat is the economic hub of the Central Belt. Control the trade here, you control the flow of goods to six other islands." She pushes her glasses up. "The Consortium is stable, but uncomfortable. The Kolmari have been pressuring them for exclusive contracts, and they don\'t like being cornered."',
        '"Sounds familiar."',
        '"Everything in the Bastion Sea sounds familiar if you listen long enough." She looks up. "The question is whether we want Sorren\'s Flat as a trade partner or a territory."',
        '"Why not both?"',
        '"Because those are very different conversations, Captain. And they require very different approaches."',
        'The word "approaches" carries weight she doesn\'t explain.',
        '"I\'ll think about it."',
        '"You do that."',
      ],
    },
    {
      id: 'sorrens_arrive_06',
      paragraphs: [
        'Sorren\'s Flat doesn\'t inspire loyalty. It inspires calculation. Every interaction is a transaction, every relationship has terms.',
        'But it works. The island functions. People eat, trade, prosper. In a sea full of chaos, function has value.',
        'As you prepare to depart, Delvessa stands at the stern rail. The island\'s gas lanterns reflect on the water like scattered coins.',
      ],
    },
    {
      id: 'sorrens_arrive_06b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"We need this island," she says. Not asks.',
      ],
    },
    {
      id: 'sorrens_arrive_06c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I know."',
      ],
    },
    {
      id: 'sorrens_arrive_06d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Good. Then start thinking about the price." She straightens her coat. "Everything has a price at Sorren\'s Flat. The trick is making sure you\'re the one setting it."',
        'You set sail south. The Central Belt is wider than the Northern Arc, and every island in it has an opinion about who you are.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'sorrens_flat_explored', value: true },
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'DELVESSA GHAL - Sorren\'s Flat Assessment',
      message: 'The Consortium is worth more as an ally than a conquest, initially. Their trade networks reach every island in the Central Belt and half the Southern Reach. If we can establish preferred trade status, the economic benefits alone would fund territorial expansion. Recommend diplomatic approach. Also, their wine is excellent.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE CHATTER - Trade Alert',
      message: 'Renegade captain Karyudon spotted at Sorren\'s Flat commercial district. No incident. Reports indicate formal contact with Consortium representatives. Kolmari Trade Office has flagged the visit. Market analysts are adjusting copper futures.',
    }},
  ],
  currentBeat: 0,
};
