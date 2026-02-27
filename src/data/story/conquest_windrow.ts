import { StoryScene } from '../../types/game';

export const windrowConquestScene: StoryScene = {
  id: 'conquest_windrow',
  title: 'WINDROW - THE CLIFF VOTE',
  beats: [
    {
      id: 'windrow_conquest_01',
      title: 'THE COLLAPSE',
      paragraphs: [
        'You return to Windrow on a bad day.',
        'The wind is worse than you remember, a sustained howl that pins the ship sideways in the carved harbor and makes the docking ropes sing like instrument strings. Suulen fights the wheel with her whole body, threading the hull into the alcove with the grim precision of someone threading a needle in an earthquake.',
        'Something is wrong. You can feel it before the gangplank drops. The dock platform that was staffed by four workers last time is crowded with twenty, hauling rope, shouting over the gale, dragging timber beams toward the cliff stairs with the frantic energy of people who aren\'t working a shift but responding to a disaster.',
        'Drest Pohn meets you on the platform. The quarry master\'s face is grey with stone dust and something worse. His hands are bleeding, not from a fight. From digging.',
      ],
    },
    {
      id: 'windrow_conquest_01b',
      speaker: 'drest_pohn',
      speakerName: 'Drest Pohn',
      paragraphs: [
        '"Section four," he says. No greeting. No time. "The cliff face gave way two hours ago. Forty-foot collapse along the limestone-shale seam. The timber crew was on the scaffold when it went."',
      ],
    },
    {
      id: 'windrow_conquest_01c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'Your gut drops. "How many?"',
      ],
    },
    {
      id: 'windrow_conquest_01d',
      speaker: 'drest_pohn',
      speakerName: 'Drest Pohn',
      paragraphs: [
        '"Nine. Trapped under rubble on the third level. We can hear them. Two of them are calling out. The rest..." He swallows. "The rock is unstable. Every time we try to clear debris, more falls. We\'ve pulled back twice already. Chair Ruhl has called the council but they\'re arguing about approach and meanwhile--"',
      ],
    },
    {
      id: 'windrow_conquest_01e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Meanwhile people are dying inside a rock."',
      ],
    },
    {
      id: 'windrow_conquest_01f',
      speaker: 'drest_pohn',
      speakerName: 'Drest Pohn',
      paragraphs: [
        '"Yes."',
      ],
    },
    {
      id: 'windrow_conquest_01g',
      paragraphs: [
        'You look at your crew. Five faces. No one needs to be told what happens next.',
        'Dragghen is already moving. The Gorundai shoves past you down the gangplank, his boots hitting the dock at a run. He doesn\'t wait for orders. He doesn\'t ask permission. Nine people are trapped in stone and Dragghen Kolve is a miner and this is what miners DO.',
      ],
    },
    {
      id: 'windrow_conquest_01h',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Dragghen--"',
      ],
    },
    {
      id: 'windrow_conquest_01i',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"I need to see the collapse site," he shouts over the wind. "NOW. Drest, show me."',
      ],
    },
    {
      id: 'windrow_conquest_01j',
      paragraphs: [
        'Drest doesn\'t hesitate. The quarry master turns and runs. Dragghen follows. Two men built for rock, moving with the urgent purpose of people who understand that every minute inside a collapse is a minute closer to silence.',
        'You grab Danzai.',
      ],
    },
    {
      id: 'windrow_conquest_02',
      title: 'THE RESCUE',
      paragraphs: [
        'The collapse site is a wound in the cliff face.',
        'A forty-foot section of the third level has caved inward. Timber scaffolding snapped like kindling, stone slabs the size of tables stacked at lethal angles, dust still pouring from cracks in the rock above. The wind howls through the gap and carries the dust in horizontal sheets that sting exposed skin and turn the air grey.',
        'You can hear them. Through the rubble. Muffled voices. Someone coughing. Someone calling a name.',
        'A crowd of Windrow workers clusters at the edge of the debris field. Ropes, pry bars, timber braces. They have the tools. What they don\'t have is a way in. The rubble is interlocked. Pull one stone and the ones above shift. Clear one beam and the ceiling drops another foot. It\'s a puzzle made of crushing weight and the wrong answer kills everyone inside.',
        'Dragghen is at the debris wall, his hands pressed flat against the stone. Listening. Reading. His Coppervein instincts awake and burning. Seven years underground taught him to hear rock the way Suulen reads water. He taps. Listens. Moves. Taps again.',
      ],
    },
    {
      id: 'windrow_conquest_02b',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"The collapse is lateral, not vertical," he says. "The shale layer slid SIDEWAYS along the limestone. The cavity behind the rubble is still intact. The ceiling is holding. But the access point is blocked by a keystone slab." He points at a massive chunk of grey rock wedged at an angle in the debris. "Move that, and you open a crawl space to the trapped workers. But it weighs six tons and the supports around it are compromised."',
      ],
    },
    {
      id: 'windrow_conquest_02c',
      speaker: 'chair_ruhl',
      speakerName: 'Chair Ruhl',
      paragraphs: [
        'Chair Ruhl pushes through the crowd. Her face is stone. "Options?"',
      ],
    },
    {
      id: 'windrow_conquest_02d',
      paragraphs: [
        'You look at the collapse. At the keystone slab. At the crack in the cliff face where dust pours like smoke. At Dragghen, who is already calculating. At Kovesse, whose eyes are darting across the structure with an engineer\'s hunger. At Suulen, who has pressed herself against the rock and gone very still, feeling the space beyond it with her Forged Sight.',
        'Three ways in. One choice.',
      ],
      choices: [
        {
          id: 'windrow_brute_force',
          text: '"Stand back. Danzai and I will open that wall."',
          consequence: 'Brute force. Danzai opens the way.',
          available: true,
          effects: [
            { type: 'combat', target: 'windrow_cliff_rescue', value: true },
            { type: 'reputation', value: 5 },
            { type: 'infamy', value: 2 },
            { type: 'flag', target: 'windrow_brute_rescue', value: true },
          ],
        },
        {
          id: 'windrow_engineer_rescue',
          text: '"Kovesse, rig supports. Suulen, map the tunnels. We go through, not against."',
          consequence: 'Precision. Engineer the path through.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 6 },
            { type: 'loyalty', target: 'suulen', value: 6 },
            { type: 'resource', target: 'intelligence', value: 5 },
            { type: 'flag', target: 'windrow_engineer_rescue', value: true },
          ],
        },
        {
          id: 'windrow_dragghen_leads',
          text: '"Dragghen. This is yours. Tell us what to do."',
          consequence: 'Trust the miner. His call.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 10 },
            { type: 'reputation', value: 4 },
            { type: 'flag', target: 'windrow_dragghen_leads', value: true },
          ],
        },
      ],
    },
    {
      id: 'windrow_conquest_03',
      title: 'THE DIG',
      paragraphs: [
        'It takes four hours.',
        'Four hours of grinding, heaving, bracing, digging. The wind screams through the gap in the cliff face and coats everything in dust. Visibility drops to arm\'s length. Workers communicate by touch and by shout, hands on shoulders, voices raw from yelling over the gale.',
        'Dragghen is everywhere. The Gorundai moves through the rubble like he was born in it, which, in a sense, he was. He reads the stress fractures. He places the braces. He tells a fourteen-stone quarrier exactly which stone to lift and exactly when to drop it and the quarrier listens because Dragghen speaks with the authority of a man whose hands know rock the way a surgeon\'s know flesh.',
        'Karyudon works the heavy loads. Six tons of keystone slab doesn\'t move itself, and Forged Iron Dominion or not, shifting rock in an unstable collapse is not the same as swinging Danzai at a man who deserves it. The stone fights back. It shifts. It settles. It cracks in ways that make Dragghen shout "HOLD" and everyone freezes and the silence stretches until the Gorundai gives the all-clear.',
        'Kovesse rigs support beams with a speed that borders on manic. The Rathai engineer swings through the scaffolding like it\'s a jungle gym, bolting braces into place, calculating load distribution on the fly, her whiskers twitching with focus. She doesn\'t have time to broadcast. She barely has time to breathe.',
        'Suulen navigates. Her Forged Sight pierces the rubble. She can feel the voids, the stable ground, the paths through the debris that won\'t collapse when weight passes over them. She guides the rescue team through the dark with quiet directions and absolute certainty.',
        'Vorreth coordinates the surface. Crowd control, supply lines, rope teams, medical preparation. The ex-Commandant turns chaos into order with the same mechanical efficiency he brought to Durrek. People follow his instructions without questioning them because his voice is the voice of a man who has managed crises before and does not have time for your objections.',
        'Delvessa manages Chair Ruhl. That\'s not a small job. The council chair wants to be in the rubble with her people, and it takes every ounce of Delvessa\'s diplomatic skill to keep her where she\'s useful: organizing the workers, maintaining communication, keeping the crowd from surging forward every time a stone shifts.',
        'Hour three. The crawl space opens. Dragghen goes in first.',
        'Of course he does. A Coppervein miner doesn\'t send someone else into a tunnel he hasn\'t cleared himself. He squeezes through a gap that would be tight for a child and disappears into the dark, and the silence that follows is the worst silence you have ever experienced on an island made entirely of noise.',
        'Then his voice. Muffled. Echoing through stone.',
      ],
    },
    {
      id: 'windrow_conquest_03b',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"I\'VE GOT THEM. SEVEN ALIVE. TWO UNCONSCIOUS. GET THE ROPES."',
      ],
    },
    {
      id: 'windrow_conquest_03c',
      paragraphs: [
        'The cliff erupts. Workers surge forward with ropes and stretchers. Dragghen passes the first survivor through the crawl space, a young woman, nineteen maybe, dust-white, shaking, but alive. Then another. Then another. Seven workers extracted one by one through a hole in the rock, each one blinking in the grey light like they\'re seeing the sky for the first time.',
        'Dragghen comes out last. He\'s covered head to boots in grey dust and stone chips. His hands are bleeding. His eyes are wet.',
        'He doesn\'t look at you. He looks at the workers, the Windrow quarriers and timber cutters who dug beside him for four hours.',
        'Drest grabs Dragghen\'s hand. The handshake turns into a grip. Neither man lets go for a long time.',
      ],
    },
    {
      id: 'windrow_conquest_03d',
      speaker: 'drest_pohn',
      speakerName: 'Drest Pohn',
      paragraphs: [
        '"Seven out of nine," Drest says. His voice breaks on the number. Two didn\'t make it. The collapse took them before anyone could dig. "Seven out of nine because of you."',
      ],
    },
    {
      id: 'windrow_conquest_03e',
      paragraphs: [
        'Dragghen nods.',
        'The wind keeps screaming. Dragghen wipes his face with the back of his hand and leaves a streak of grey dust across his cheek.',
      ],
    },
    {
      id: 'windrow_conquest_04',
      title: 'THE VOTE',
      paragraphs: [
        'The council convenes three days later.',
        'Three days of recovery. Three days of shoring up the collapse site, treating the wounded, mourning the two who didn\'t come home. Three days of Dragghen working the cliff alongside Windrow\'s quarriers, not as a visitor, not as a crewman from a Renegade ship, but as another pair of hands that knows stone. He sleeps in the workers\' quarters. He cooks for the crews. He argues about load-bearing ratios with Drest Pohn until two in the morning and they\'re both grinning while they do it.',
        'The council chamber. The wind-still room fifty feet into the rock. Five council members. Your crew against the back wall. And this time, the room is full, forty Windrow citizens packed into the gallery. Workers. Families. The people who dug.',
        'Chair Ruhl stands. She looks tired. She looks like a woman who has buried two of her people and is making a decision she never expected to make.',
      ],
    },
    {
      id: 'windrow_conquest_04b',
      speaker: 'chair_ruhl',
      speakerName: 'Chair Ruhl',
      paragraphs: [
        '"Captain Karyudon. Your crew saved seven lives on this cliff. That is a debt Windrow acknowledges." She pauses. The silence is heavy. "You want this island under your flag. You\'ve been clear about that since the first day you set foot here. I respect the honesty, if not the ambition."',
        'She looks at the council. At the gallery. At the faces of workers who are watching you with something that wasn\'t there before, not trust, not yet, but the willingness to listen that comes after someone has bled beside you.',
        '"Windrow is a democracy. We don\'t make decisions by decree. We vote." She turns back to you. "Make your case, Captain. Tell this council why Windrow should fly under the flag of an Oni Renegade with a war club and a death wish. And make it good, because I\'m the swing vote and I haven\'t decided yet."',
      ],
    },
    {
      id: 'windrow_conquest_04c',
      paragraphs: [
        'The room waits. Forty workers. Five councillors. Your crew.',
        'Dragghen catches your eye from the back wall. He doesn\'t nod. Doesn\'t signal. Just looks at you with an expression that says: be honest. These are my people. Don\'t lie to them.',
      ],
      choices: [
        {
          id: 'windrow_promise_protection',
          text: '"The Wardensea is expanding patrols in the Southern Reach. I control Durrek Garrison. Under my flag, no patrol touches Windrow. That\'s not a promise. That\'s geography."',
          consequence: 'Strategic. Protection against a real threat.',
          available: true,
          effects: [
            { type: 'reputation', value: 5 },
            { type: 'resource', target: 'intelligence', value: 3 },
            { type: 'flag', target: 'windrow_protection_pitch', value: true },
          ],
        },
        {
          id: 'windrow_promise_trade',
          text: '"Sorren\'s Flat trades through my territory. Windrow timber, Sorren\'s markets. I connect you to the Central Belt and your exports double in six months."',
          consequence: 'Economic. Real money for real people.',
          available: true,
          effects: [
            { type: 'resource', target: 'sovereigns', value: 50 },
            { type: 'reputation', value: 4 },
            { type: 'flag', target: 'windrow_trade_pitch', value: true },
          ],
        },
        {
          id: 'windrow_honest_speech',
          text: '"I know how this sounds. I\'m an Oni with a war club telling a room full of quarriers that I want to run the whole Bastion Sea. Every island. It\'s an absurd thing to say out loud." He pauses. "But I want Windrow in it. Not because you\'re useful. Because a territory built without people like you isn\'t worth the timber holding it together."',
          consequence: 'Raw. Honest. The Karyudon way.',
          available: true,
          effects: [
            { type: 'reputation', value: 8 },
            { type: 'infamy', value: 3 },
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'flag', target: 'windrow_honest_speech', value: true },
          ],
        },
      ],
    },
    {
      id: 'windrow_conquest_05',
      title: 'THE CLIFF EDGE',
      paragraphs: [
        'The vote passes. Three to two.',
      ],
    },
    {
      id: 'windrow_conquest_05b',
      speaker: 'chair_ruhl',
      speakerName: 'Chair Ruhl',
      paragraphs: [
        'Chair Ruhl casts the deciding vote. She stands, looks at you for a long time, and says: "You sent your man into a collapsing cliff for people he\'d never met. That\'s either the bravest thing I\'ve seen or the stupidest. Either way, Windrow respects it."',
      ],
    },
    {
      id: 'windrow_conquest_05c',
      paragraphs: [
        'She marks the ballot. The gallery erupts, not in cheers, Windrow doesn\'t cheer, but in the low rumble of forty people talking at once, a sound like distant thunder. Drest Pohn grabs Dragghen\'s shoulder and squeezes. Councillor Ulla Saav is already pulling out structural diagrams and asking Kovesse about Grimoire-connected engineering systems. Councillor Voss, the eldest, the one who speaks last, catches your eye and gives you a nod that weighs more than the entire cliff face.',
        'Councillors Haal and Pohn voted against. Haal because he trusts no outsider on principle. Pohn because he\'s afraid of what happens when the Wardensea comes looking. Fair. Honest. Windrow even dissents with integrity.',
        'Vorreth is already talking defensive infrastructure with Chair Ruhl. Delvessa is drafting preliminary resource agreements at a side table, her pen moving with the quiet fury of someone who has been waiting to do this for three days. Kovesse has her Grimoire feed live: "WINDROW VOTES TO JOIN RENEGADE TERRITORY. DEMOCRATIC ISLAND CHOOSES KARYUDON. THIS IS NOT A DRILL." Suulen has vanished, probably into the cliff tunnels, mapping the structural network for future reinforcement.',
        'The crew scatters into Windrow the way they always do.',
        'But Dragghen.',
        'Dragghen is quiet. He helped win an island and he\'s standing at the edge of the council chamber like a man who doesn\'t know what to do with what he\'s feeling. You find him on the high shelf, the overlook, the exposed jut of rock above the settlement where the wind hits hardest.',
        'He\'s sitting on the edge. Legs hanging over three hundred feet of nothing. The wind rips at his hair and his coat and he doesn\'t seem to notice. He\'s looking at the settlement below: the timber frames, the rope bridges, the windbreaks, the people moving between levels with the practiced ease of mountain goats.',
        'You sit beside him. Danzai rests on the rock between you. The wind tries to shove you both off the cliff and fails, because the two heaviest people on the island are sitting on it.',
        'For a while, neither of you says anything. The wind fills the silence. It fills everything on Windrow.',
      ],
    },
    {
      id: 'windrow_conquest_05d',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"I miss Coppervein," Dragghen says. Not loud. The wind almost takes it. "Not the mines. Not the bosses. Not the pay or the dust or the cave-ins. I miss the people. I miss knowing that the man next to me in the dark understood what I understood, that the rock doesn\'t care about you, and the only thing standing between you and the mountain is the person holding the other end of the rope."',
        'He turns his hands over. Stone dust in the creases. Blood under the nails. Miner\'s hands.',
        '"These people are the same. Different rock, same understanding. They build on a cliff face in a wind that never stops because the alternative is not building at all. They don\'t give up. They don\'t leave. They dig in and they HOLD." His voice cracks.',
      ],
    },
    {
      id: 'windrow_conquest_05e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I\'m assigning you as liaison," you say. "Windrow is your post. You come and go with the ship, but this island is your responsibility."',
      ],
    },
    {
      id: 'windrow_conquest_05f',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'He looks at you. Amber eyes meet dark ones. The wind screams.',
        '"You\'re giving me a home."',
      ],
    },
    {
      id: 'windrow_conquest_05g',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I\'m giving you a job. Homes are things you build." You shrug. "You\'re good at building."',
      ],
    },
    {
      id: 'windrow_conquest_05h',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen laughs. Short. Wet. The wind tears it away.',
        '"Captain."',
      ],
    },
    {
      id: 'windrow_conquest_05i',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Dragghen."',
      ],
    },
    {
      id: 'windrow_conquest_05j',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"I\'m going to cook for these people tonight. Fix that section four collapse in the morning." He stands. The wind catches him and he leans into it, squat, rooted. "The flag can wait. The food can\'t."',
      ],
    },
    {
      id: 'windrow_conquest_05k',
      paragraphs: [
        'He\'s already walking toward the settlement before you answer. You watch him go. The quarriers watch him too. One of them, the woman he pulled out first, calls something in Gorundai dialect you don\'t catch. Dragghen calls back. She laughs. It\'s the first laughter you\'ve heard on this island.',
        'The wind picks up. The cliff creaks. You\'re going to need to send timber reinforcements from the ship if that section four collapse is as bad as Dragghen thinks.',
      ],
    },
  ],
  onComplete: [
    { type: 'conquer', target: 'windrow', value: true },
    { type: 'flag', target: 'windrow_conquered', value: true },
    { type: 'resource', target: 'sovereigns', value: 150 },
    { type: 'resource', target: 'materials', value: 20 },
    { type: 'reputation', value: 10 },
    { type: 'bounty', value: 5000000 },
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE NETWORK - SOUTHERN REACH ALERT',
      message: 'BREAKING: Windrow Island has voted to align with Renegade captain Karyudon following a cliff-face rescue operation that saved seven lives. The democratic council voted 3-2 in favor. Wardensea analysts note this is the first democratic territory to voluntarily join the Renegade fleet. Kolmari Trade Office has issued a statement calling the vote "a concerning precedent."',
    }},
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'DRAGGHEN KOLVE - Personal',
      message: 'I found something on Windrow. I don\'t have a word for it yet. It\'s not home. Coppervein was home, and you don\'t get two of those. It\'s more like... recognition. These people work the way I work. They think the way I think. They build because building is what you do when the world is trying to tear everything down. The Captain made me liaison. I think he saw it before I did. He does that sometimes, sees what people need before they know they need it. Don\'t tell him I said that. His head is big enough.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: 'WINDROW - ACQUIRED',
      message: 'Windrow aligned with the Renegade fleet by popular vote. Dragghen Kolve appointed as island liaison. Timber supply secured. Section four collapse still needs structural reinforcement. The Southern Reach is open.',
    }},
    { type: 'dominion', target: 'iron', value: 15 },
    { type: 'dominion', target: 'king', value: 25 },
  ],
  currentBeat: 0,
};
