import { StoryScene } from '../../types/game';

export const copperveinArrivalScene: StoryScene = {
  id: 'explore_coppervein',
  title: 'COPPERVEIN - THE SPARK',
  characters: ['karyudon', 'dragghen', 'kovesse', 'tessek', 'suulen'],
  nextSceneId: 'vorreth_recruitment',
  beats: [
    {
      id: 'coppervein_arrive_01',
      title: 'HOMECOMING',
      paragraphs: [
        'Dragghen hasn\'t said a word since Coppervein appeared on the horizon.',
        'The island rises from the sea like a closed fist. Volcanic stone veined with copper ore that catches the sun and turns the cliff faces green-gold, oxidation patterns shifting in the light. The harbor below is utilitarian in the specific way that Gorundai build things: no decoration, no wasted material, every crane and piling and reinforced pier exactly where it needs to be because it needs to be there.',
        'Six hundred and forty people. A mining cooperative that votes on everything. A voting hall that has been rebuilt four times because Gorundai consensus involves punching walls.',
        'Dragghen rates the approach channel a six. He hasn\'t rated anything above a five since you met him.',
      ],
    },
    {
      id: 'coppervein_arrive_02',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'grim',
      paragraphs: [
        'You dock without incident. Coppervein charges fair port fees and asks no questions. They sell copper to whoever pays and have maintained this aggressive neutrality for decades. Kolmari, Wardensea, Renegade. Ore is ore. Money is money. Politics is something that happens to other people.',
        '"I grew up here," Dragghen says.',
        'Six words. The most he\'s said about himself in a single sentence since you met him. Kovesse doesn\'t broadcast it.',
        '"Shaft Seven. Deep extraction. Five years." He\'s watching the mine entrance on the ridge above the harbor, a dark mouth in the cliff face with rail tracks running out of it. "Good ore. Fair wages. The cooperative voted on everything."',
        'He pauses.',
        '"They still do. That\'s the problem."',
      ],
    },
    {
      id: 'coppervein_arrive_03',
      paragraphs: [
        'The market is smaller than Tavven Shoal\'s and serves a single purpose: the mine. Equipment, food, medical supplies, drill bits, blasting charges. The air tastes like copper dust and forge smoke. Everything here has a fine green-brown film on it. You\'ve been on the island ten minutes and your forearms are already oxidizing.',
        'Dragghen walks through the market like a ghost returning to a house he built. People notice. An older Gorundai woman at a food stall freezes mid-motion when she sees him, a skewer of reef fish suspended between the grill and the plate.',
      ],
    },
    {
      id: 'coppervein_arrive_03b',
      speaker: 'maavi',
      speakerName: 'Maavi',
      paragraphs: [
        '"Dragghen?"',
      ],
    },
    {
      id: 'coppervein_arrive_03c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Hey, Maavi."',
      ],
    },
    {
      id: 'coppervein_arrive_03d',
      speaker: 'maavi',
      speakerName: 'Maavi',
      paragraphs: [
        '"Three years." She puts the skewer down. Picks it back up. Puts it down again. "They said you went Renegade."',
      ],
    },
    {
      id: 'coppervein_arrive_03e',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"They weren\'t wrong."',
        'She looks past him at you. At the crew. At the horns.',
      ],
    },
    {
      id: 'coppervein_arrive_03f',
      speaker: 'maavi',
      speakerName: 'Maavi',
      paragraphs: [
        '"Brought company."',
      ],
    },
    {
      id: 'coppervein_arrive_03g',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"I did."',
        'Maavi studies you with the expression of a woman who has been evaluating risk since before you were born.',
      ],
    },
    {
      id: 'coppervein_arrive_03h',
      speaker: 'maavi',
      speakerName: 'Maavi',
      paragraphs: [
        '"He eats double portions," she says to Dragghen. "Tell him the fish here is better than whatever he\'s been eating at sea. He\'ll know I\'m right."',
      ],
    },
    {
      id: 'coppervein_arrive_04',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse has been running Grimoire feeds for an hour. Trade manifests, shipping schedules, price histories. She does this when she gets quiet, which is rare enough that Dragghen noticed and rated the silence a four.',
        '"Captain." She\'s not vibrating. That\'s how you know it\'s bad. "The Kolmari have been increasing purchase orders. Thirty percent over six months. The cooperative is taking the money because the cooperative takes all money, but the margins are compressing. One buyer controlling that much of your output isn\'t trade. It\'s a leash." She flips a Grimoire tablet around so you can see the numbers. "They know. They voted on it. Sixty-three to nine in favor of maintaining current contracts."',
        '"Maintaining?"',
        '"Not resisting. Maintaining. One means you\'re choosing. The other means you\'re pretending to choose." She pauses. "I got that from the voting records. Public access. Nobody reads them. I read everything."',
      ],
      choices: [
        {
          id: 'coppervein_trade_deal',
          text: 'Propose a trade agreement. Buy copper at market rate. Give the cooperative leverage.',
          consequence: 'Business before conquest. Lead with trade.',
          available: true,
          effects: [
            { type: 'resource', target: 'sovereigns', value: -100 },
            { type: 'resource', target: 'materials', value: 15 },
            { type: 'loyalty', target: 'kovesse', value: 5 },
            { type: 'loyalty', target: 'dragghen', value: 10 },
            { type: 'flag', target: 'coppervein_trade_deal', value: true },
          ],
        },
        {
          id: 'coppervein_talk_to_dragghen',
          text: 'Let Dragghen lead. His island. His people. His call.',
          consequence: 'Some things aren\'t about strategy.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 15 },
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'flag', target: 'coppervein_dragghen_led', value: true },
          ],
        },
        {
          id: 'coppervein_gather_intel',
          text: 'Map the operation. Shipment schedules, ore grades, Kolmari contract terms.',
          consequence: 'Know the board before you play.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'infamy', value: 2 },
            { type: 'flag', target: 'coppervein_mapped', value: true },
          ],
        },
      ],
    },
    {
      id: 'coppervein_arrive_05',
      title: 'THE ACCIDENT',
      effect: 'explosion',
      sfx: 'combat_explosion',
      paragraphs: [
        'You hear the explosion from the market.',
        'Not an explosion. Something sharper. The crack of displaced air and the hum of something electrical discharging in a space that shouldn\'t have electricity. The sound a lightning strike makes when it hits water, compressed into a room.',
        'Then shouting. Gorundai shouting, which is regular shouting except louder and with more wall-punching.',
        'A mine cart rolls out of Shaft Three trailing sparks and the smell of ozone. Behind it, two miners stumble into the daylight, one of them holding his arm at an angle that says "recently electrocuted" in a language that doesn\'t need translation.',
        'And behind them, standing in the mine entrance with blue-white lightning arcing between his fingers and a look on his face like he\'d rather be dead than standing where he\'s standing: a Khari.',
      ],
    },
    {
      id: 'coppervein_arrive_06',
      effect: 'flash_crimson',
      paragraphs: [
        'Six feet. Grey-furred. Lean build, the body of a runner, built for speed rather than the mining work he\'s been doing. Amber-gold eyes. A white streak through his left ear that looks like a scar but isn\'t. He\'s wearing a dark naval jacket slightly too big for him and mine-issue boots that don\'t fit either.',
        'The electricity is the problem. It\'s crawling up his forearms in blue-white veins, crackling between his fingertips, jumping to the metal rail tracks and the ore cart and the steel support beams. He\'s trying to stop it. His fists are squeezed so hard his claws are cutting into his own palms.',
        'His ears are flat against his skull. In Khari body language, that means one thing.',
        'Terror.',
        'The miners are backing away with the distance of people who have seen this before and know the radius.',
      ],
    },
    {
      id: 'coppervein_arrive_07',
      paragraphs: [
        'You know what you\'re looking at.',
        'Not because of the electricity. Not because of the discharge pattern or the ozone or the way metal in a ten-foot radius is humming with charge. You know because you recognize the expression. The specific face a person makes when power they didn\'t ask for is doing something they can\'t control.',
        'You wore that face. On a burning ship. With a God Fruit in your hand and every cell in your body screaming at a frequency you didn\'t know existed.',
        'God Fruit user. Unawakened. Fighting his own body.',
      ],
      choices: [
        {
          id: 'coppervein_approach_calm',
          text: 'Walk toward him. Slowly. "I know what that feels like."',
          consequence: 'Truth. The only thing that works with a scared God Fruit user.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 5 },
            { type: 'flag', target: 'coppervein_orren_approach', value: 'calm' },
          ],
        },
        {
          id: 'coppervein_approach_iron',
          text: 'Activate your Iron. Let him see you absorb the discharge. Let him see it can\'t hurt you.',
          consequence: 'Demonstration. Show him what control looks like.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 3 },
            { type: 'infamy', value: 1 },
            { type: 'flag', target: 'coppervein_orren_approach', value: 'iron' },
          ],
        },
        {
          id: 'coppervein_approach_direct',
          text: '"Breathe out. Push it into the ground. The stone can take it."',
          consequence: 'Practical. Give him something to do with the panic.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 8 },
            { type: 'reputation', value: 2 },
            { type: 'flag', target: 'coppervein_orren_approach', value: 'coached' },
          ],
        },
      ],
    },
    {
      id: 'coppervein_arrive_08',
      paragraphs: [
        'The discharge fades. The lightning crawls back under his skin. His breathing is ragged and his fur is standing on end and the white streak in his ear is glowing faintly, residual charge that takes another thirty seconds to dissipate.',
        'The miners relax. The careful distances shrink back to normal distances. One of them, the one who got shocked, waves his arm experimentally and rates the experience with a Gorundai expletive that Dragghen translates as "that stung but I\'ve had worse."',
        'The Khari is staring at you.',
        'Both ears forward. In Khari body language, that means something too.',
        'He\'s listening.',
      ],
    },
    {
      id: 'coppervein_arrive_09',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      expression: 'fear',
      paragraphs: [
        '"I didn\'t mean to."',
        'Three words. He says them the way someone says "I\'m sorry" when they mean "I\'m scared and I don\'t know how to make it stop."',
        '"Storm Eel Fruit. I found it on a wreck off Tavven Shoal eight months ago. Washed up in a sealed case. I didn\'t know what it was. I thought it was. I don\'t know. A weird fruit." His ears rotate through three positions in one sentence: back, forward, one up and one down. "I bit into it and the next thing I remember is waking up on the beach with sand fused to glass in a circle around me and my hands doing this."',
        'He holds up his right hand. A spark jumps between his thumb and forefinger. He flinches from his own body.',
        '"I came to Coppervein because the cooperative doesn\'t ask questions and the mine pays by the cart. I\'ve been okay. Mostly. I can sense the ore veins through the rock. The electricity can feel metal through stone. The miners like that." A pause. "They like it less when I blow out the lighting rig on Shaft Three."',
      ],
    },
    {
      id: 'coppervein_arrive_10',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse is vibrating.',
        '"Captain. CAPTAIN. That\'s a Storm Eel Fruit user. Storm Eel. Mythical Beast class. The last confirmed Storm Eel user was Dennek Kraine, seventy years ago. He sank a Wardensea battleship by touching the hull. TOUCHING IT. The electrical output at full awakening is estimated at. Captain, are you listening? He can generate enough current to power a Grimoire relay station with his HANDS."',
      ],
    },
    {
      id: 'coppervein_arrive_10b',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"He can also hear you," Suulen says from somewhere behind you. You didn\'t hear her arrive.',
        'Orren\'s ears are flat again.',
      ],
    },
    {
      id: 'coppervein_arrive_10c',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      paragraphs: [
        '"I don\'t want to sink battleships," he says quietly. "I want to stop shocking people when I pick up a fork."',
      ],
    },
    {
      id: 'coppervein_arrive_11',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen has been watching. He walks over to Orren and looks at his hands. Not the electricity. The calluses.',
        '"Mine work. How many carts a day?"',
      ],
    },
    {
      id: 'coppervein_arrive_11b',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      paragraphs: [
        '"Twelve. Sometimes fourteen."',
      ],
    },
    {
      id: 'coppervein_arrive_11c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Good output for a non-Gorundai." He looks at the jacket. "Naval issue. Tavven Harbor Authority. You were a dock runner."',
        'Orren\'s left ear drops. The right one stays up.',
      ],
    },
    {
      id: 'coppervein_arrive_11d',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      paragraphs: [
        '"For two years. Before the. Before I found the fruit. I ran cargo manifests between the piers and the Harbor Board. Fast work. I was good at it." He touches the jacket. "I kept the jacket because it\'s the only thing I own that still fits right."',
      ],
    },
    {
      id: 'coppervein_arrive_11e',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen looks at you.',
        '"I rate him a five." A pause. "For someone who is twenty-six, scared of his own hands, and still pulling fourteen carts a day in a mine that isn\'t his. That\'s high."',
      ],
    },
    {
      id: 'coppervein_arrive_12',
      title: 'THE MINERS',
      paragraphs: [
        'The trouble comes before sunset. Not from the miners. For the miners.',
        'A Kolmari trade officer arrives on a supply barge with two escorts and a clipboard, which is the most dangerous weapon in the Bastion Sea. He walks into the voting hall. Twenty minutes later, the cooperative foreman walks out looking like someone who has been told the price of his own survival and found it reasonable.',
        'New contract terms. Fifteen percent reduction in purchase price per ton. Effective immediately. The cooperative can accept or the Kolmari will redirect their shipping to Durrek Garrison, which has been offering competitive rates.',
        'Competitive rates from Durrek Garrison, a military outpost that has never mined a gram of copper in its existence.',
        'Dragghen\'s jaw is set. The plating on his forearms has gone dark, the Gorundai equivalent of knuckles turning white.',
      ],
      choices: [
        {
          id: 'coppervein_confront_kolmari',
          text: '"Tell the Kolmari officer that Coppervein has a new trading partner."',
          consequence: 'Draw a line. Make it loud.',
          available: true,
          effects: [
            { type: 'reputation', value: 5 },
            { type: 'infamy', value: 3 },
            { type: 'loyalty', target: 'dragghen', value: 8 },
            { type: 'bounty', value: 2000000 },
            { type: 'flag', target: 'coppervein_confronted_kolmari', value: true },
          ],
        },
        {
          id: 'coppervein_dragghen_handles',
          text: 'Let Dragghen address the cooperative. His island. His people.',
          consequence: 'Some fights aren\'t yours to start.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 12 },
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'dragghen_defused_coppervein', value: true },
          ],
        },
        {
          id: 'coppervein_walk_away',
          text: 'Walk away. The cooperative makes its own decisions. That\'s the point.',
          consequence: 'Respect the vote. Even when the vote is wrong.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'loyalty', target: 'suulen', value: 3 },
            { type: 'loyalty', target: 'tessek', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'coppervein_arrive_13',
      paragraphs: [
        'However it plays out, the Kolmari officer leaves on his barge and the cooperative votes. The vote takes three minutes. Two walls get punched. Coppervein will hold its current contracts but the margins are thinner and everyone in the hall knows it.',
        'Dragghen stands outside the voting hall afterward. He doesn\'t punch a wall. That\'s worse.',
        'Orren is at the edge of the crowd, watching. His ears are doing the thing. One up. One down.',
      ],
    },
    {
      id: 'coppervein_arrive_13b',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      paragraphs: [
        '"Does he always stand like that?" Orren asks, nodding at Dragghen. "Like he\'s holding up the building?"',
      ],
    },
    {
      id: 'coppervein_arrive_13c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Yes," you say. "Since the day I met him."',
      ],
    },
    {
      id: 'coppervein_arrive_14',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      expression: 'fear',
      paragraphs: [
        'He finds you at the dock that evening. You\'re sitting on a cargo piling watching the ore cranes cycle through their last loads. Dragghen is cooking at Maavi\'s stall. The smell of reef fish and copper-rock salt carries across the harbor.',
        '"You have a God Fruit too," Orren says.',
        'Not a question.',
        '"I recognized the way you looked at me. In the mine. Nobody looks at a person having a... an episode... like that. They look at the lightning. You looked at my face."',
        'A spark jumps from his knuckle to the metal piling. He winces.',
        '"I\'ve been at Coppervein for six months. The miners are good to me. The work is honest. But I\'m getting worse. The discharge is bigger every time. Last month I magnetized an ore cart so hard they had to cut it off the rails with a torch."',
        'Both ears forward.',
        '"I don\'t know what I\'m doing. And I don\'t have anyone to ask."',
      ],
    },
    {
      id: 'coppervein_arrive_15',
      paragraphs: [
        'Orren Mahk. Twenty-six. Khari. Harbor runner from Tavven Shoal who found a God Fruit in a shipwreck and bit into it because he didn\'t know what it was. Eight months of living with power he can\'t control, working in a copper mine because the electricity is useful and nobody asks questions.',
        'His ears are forward. Listening. Hoping.',
        'Kovesse is right about the Storm Eel. Full awakening could change the shape of a battle. Could power a ship. Could sink a fleet.',
        'But that\'s not why you\'re about to say what you\'re about to say. You remember the burning ship. The iron case. The moment the Fruit touched your tongue and the world became a frequency you didn\'t have a name for.',
        'Nobody helped you.',
      ],
      choices: [
        {
          id: 'coppervein_recruit_orren',
          text: '"Come with us. I can\'t teach you control. But I can give you room to learn."',
          consequence: 'Honest. He needs room more than he needs a teacher.',
          available: true,
          effects: [
            { type: 'recruit', target: 'orren', value: true },
            { type: 'loyalty', target: 'orren', value: 10 },
            { type: 'flag', target: 'orren_recruited', value: true },
            { type: 'flag', target: 'orren_approach', value: 'honest' },
          ],
        },
        {
          id: 'coppervein_orren_purpose',
          text: '"You\'re not getting worse. You\'re getting stronger. There\'s a difference, and I need someone who can tell."',
          consequence: 'Reframe it. Give the fear a different name.',
          available: true,
          effects: [
            { type: 'recruit', target: 'orren', value: true },
            { type: 'loyalty', target: 'orren', value: 12 },
            { type: 'flag', target: 'orren_recruited', value: true },
            { type: 'flag', target: 'orren_approach', value: 'reframed' },
          ],
        },
        {
          id: 'coppervein_orren_fruit',
          text: '"I have a Dragon Fruit. Western. Mythical Beast class. We\'re the same kind of problem."',
          consequence: 'Show the card. Two God Fruit users on one crew.',
          available: true,
          effects: [
            { type: 'recruit', target: 'orren', value: true },
            { type: 'loyalty', target: 'orren', value: 15 },
            { type: 'flag', target: 'orren_recruited', value: true },
            { type: 'flag', target: 'orren_approach', value: 'shared' },
          ],
        },
      ],
    },
    {
      id: 'coppervein_arrive_16',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      expression: 'happy',
      paragraphs: [
        'His ears go straight up. Both of them. Maximum attention.',
        '"I need to tell the foreman. He\'ll want to vote on whether to release me from my contract." A pause. "The vote will take three minutes."',
        '"And if they vote no?"',
        '"They won\'t. The foreman has been asking me to leave for two months. He says I\'m a liability." The spark jumps again. He doesn\'t flinch this time. "He says it nicely. He brings it up during lunch so it doesn\'t feel official."',
      ],
    },
    {
      id: 'coppervein_arrive_16b',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        'Tessek appears from somewhere. He\'s been watching. "CRIMSON TIDE: THE LIGHTNING RECRUIT."',
      ],
    },
    {
      id: 'coppervein_arrive_16c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"That\'s not a sword move," Kovesse says.',
      ],
    },
    {
      id: 'coppervein_arrive_16d',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"It\'s a narrative move. They count."',
        'Orren\'s ears go through four positions in two seconds. He settles on one up, one slightly tilted. The crew will learn to read this one. It means: "I have no idea what\'s happening but I think I might be okay with it."',
      ],
    },
    {
      id: 'coppervein_arrive_17',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'That night. Maavi\'s stall. Dragghen cooks.',
        'He does this when the words won\'t come. Takes over the grill and works with local ingredients: copper-rock salt, reef fish, moss herbs from the mine ventilation shafts. The crew eats. Miners from the day shift join. People who haven\'t spoken in weeks share a table because the food smells like home.',
        '"I left because the Kolmari started buying control," Dragghen says, not looking up from the grill. "Slow. One contract, then two. The terms shifted. The rates adjusted. By the time the cooperative voted on whether to resist, the vote was about survival, not principle."',
        'He flips a fish. Perfectly.',
        '"I couldn\'t watch it happen. So I left." He looks at you. Then at Orren, sitting at the edge of the group with his hands in his pockets so the sparks don\'t jump to anyone\'s plate. "Found a captain who says he wants to change things. Found a kid who needs things worth changing."',
        'He rates the fish a seven.',
        'Coming from Dragghen, at Coppervein, for his own cooking: that\'s the highest compliment he knows how to give.',
      ],
      stinger: 'crew_join',
    },
    {
      id: 'coppervein_arrive_18',
      paragraphs: [
        'Dawn. The ore cranes start their cycle. The cooperative votes on the day\'s shift assignments. Two walls get punched. Democracy.',
        'Orren boards the ship carrying a canvas bag and wearing the too-big naval jacket. A spark arcs from his hand to the hull railing as he grabs it. He apologizes to the railing.',
        'Kovesse logs the crew update: "CREW ADDITION: Orren Mahk. Helmsman. God Fruit: Storm Eel (unawakened). Note: do not let him touch the navigation instruments until further notice. ALSO: his ears do a THING and I need to document all the positions."',
        'As you pull away from Coppervein, Dragghen stands at the stern. Watching the mine entrance shrink against the cliffs. His people, still voting. Still punching walls. Still pretending they have a choice about a future that someone else is buying out from under them.',
        'He doesn\'t say anything.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'coppervein_explored', value: true },
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'DRAGGHEN KOLVE - Coppervein Report',
      message: 'The cooperative is intact but strained. Kolmari purchase orders are increasing, squeezing margins. The miners remember me. Some of them remember why I left. If we come back with a real offer, not conquest, not charity, an actual partnership, they might listen. They\'re Gorundai. They\'ll vote on it either way.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE CHATTER - Coppervein Sighting',
      message: 'Unconfirmed reports of the Oni Renegade "Karyudon" visiting Coppervein mining cooperative. No incident. A Khari with unusual electrical discharge was seen boarding his vessel. The cooperative maintains neutrality. Kolmari Trade Office has flagged the visit.',
    }},
  ],
  currentBeat: 0,
};
