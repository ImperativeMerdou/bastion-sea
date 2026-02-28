import { StoryScene } from '../../types/game';

export const vessArrivalScene: StoryScene = {
  id: 'explore_vess_harbour',
  title: 'VESS HARBOUR - THE LION\'S DEN',
  beats: [
    {
      id: 'vess_arrive_01',
      title: 'THE APPROACH',
      effect: 'flash',
      paragraphs: [
        'You see Vess Harbour from six miles out. That\'s the point.',
        'Grey battlements. Signal towers with mirrors that catch the sun and throw coded light across the water. Defensive batteries stacked three tiers high along a harbor wall that could stop a tsunami and look bored doing it. The fortifications don\'t suggest strength. They state it. Loudly. In a language that translates to every tongue in the Bastion Sea: come closer and find out.',
        'Warships. Everywhere. Wardensea cutters in formation patterns so clean they look painted onto the water: four-ship diamond rotations sweeping the approaches, signal flags snapping in coordinated sequences, hull markings fresh and uniform. These aren\'t the rusty patrol boats you dodged around Durrek. This is the Second Division\'s southern anchor. The real thing. Funded, maintained, and crewed by people who iron their uniforms before a watch rotation.',
      ],
    },
    {
      id: 'vess_arrive_01b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You stand at the bow. Danzai across your shoulders. Your amber eyes track the harbor wall, the gun emplacements, the choreographed sweep of warships that move like a single organism with sixty hulls.',
        '"Beautiful," you say.',
        'Delvessa appears at your elbow. Her pen is already moving in her folio.',
        'Suulen keeps the ship well outside the patrol perimeter. The Morventhi navigator has mapped the cutter rotations from observation alone: her spatial Sight reads the patterns of movement like text on a page. She knows the gaps. She\'s threading between them, staying in the blind spots where two patrol arcs overlap and neither looks twice. Masterful work. Also terrifying, because if she misses by a quarter mile, the entire southern Wardensea fleet knows you\'re here.',
      ],
    },
    {
      id: 'vess_arrive_01c',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Six thousand souls in there," Vorreth says from behind you. His voice is flat. Controlled. The voice of a man who has swallowed something sharp and is determined not to let it cut on the way down. "Twelve capital ships. Thirty support vessels. Four shore batteries with overlapping fields of fire. Signal network that can reach Durrek in forty minutes and the Kingsrun approach in twenty."',
        'You turn. Look at him. The ex-Commandant is rigid, not his usual military posture, but something tighter. Something held together by force of will. His eyes are fixed on the fortress and there\'s a recognition in them that goes deeper than tactical assessment.',
      ],
    },
    {
      id: 'vess_arrive_01d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You served here."',
      ],
    },
    {
      id: 'vess_arrive_01e',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"No. Sister division. Same doctrine, same training, same chain of command." His jaw works. "Half the officers in that fortress graduated the same academy class I did. Some of them were friends." He pauses. "Before."',
        'He doesn\'t finish the sentence.',
      ],
    },
    {
      id: 'vess_arrive_01f',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Then you know it better than anyone alive on this ship." You face the fortress again. "Good. I need you sharp. This isn\'t a fight. Not today. Today we learn."',
      ],
    },
    {
      id: 'vess_arrive_02',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      title: 'VORRETH\'S INTEL',
      paragraphs: [
        'Below deck. Charts spread across the table. Kovesse\'s Grimoire tablet throwing pale blue light across five faces planning to do something astronomically stupid in the vicinity of the most powerful military installation in the southern Bastion Sea.',
        'Vorreth takes the lead. The rigid tension doesn\'t vanish, but it channels. Becomes something useful. A man dismantling his own world because an Oni asked him to.',
        '"Harbor layout." He draws with his finger on the chart. Three rings. Traces them in silence. Then taps the western wall.',
      ],
    },
    {
      id: 'vess_arrive_02a',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Blind spot. Seventeen degrees below the waterline. Rock foundation, they couldn\'t place a lower battery. Supposed to be covered by cutter patrol, but the rotation has a ninety-second gap at shift change." His jaw works. "That hasn\'t changed since I served. Doctrine doesn\'t update itself."',
      ],
    },
    {
      id: 'vess_arrive_02b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Weak points," Delvessa says.',
      ],
    },
    {
      id: 'vess_arrive_02c',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"That is the weak point." He pulls his hand back. "Everything else works. The batteries overlap. The patrols interlock. The signal towers reach Durrek in forty minutes."',
      ],
    },
    {
      id: 'vess_arrive_02d',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen leans forward. "Six thousand people eat a lot. Where\'s it come from?"',
      ],
    },
    {
      id: 'vess_arrive_02e',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Kingsrun convoys. Twice monthly. Twelve miles of open water on the approach." Vorreth stops. Looks at Dragghen. "Four escort cutters. Minimum."',
      ],
    },
    {
      id: 'vess_arrive_02f',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse hasn\'t spoken. Her ears are forward, her eyes on Vorreth\'s chart, tracking something nobody else is thinking about.',
        '"The signal towers. Secondary channel?"',
      ],
    },
    {
      id: 'vess_arrive_02g',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Vorreth looks at her. "Shorter range. Tighter cipher. Internal coordination only. If you can crack it..."',
      ],
    },
    {
      id: 'vess_arrive_02h',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Give me until morning." She\'s already pulling components out of her pockets.',
        'Delvessa is writing. Her pen hasn\'t stopped.',
      ],
    },
    {
      id: 'vess_arrive_03',
      title: 'EYES INSIDE',
      paragraphs: [
        'The question isn\'t whether to gather intelligence. The question is how. Vess Harbour isn\'t Tavven Shoal. You can\'t walk in, buy a drink, and listen to sailors gossip. This is a military installation with six thousand trained personnel and a security apparatus that exists specifically to catch people doing exactly what you\'re about to do.',
        'Three options. Each one carries a different risk and a different reward.',
        'Suulen sits cross-legged against the bulkhead. Her eyes are half-closed. One hand resting on the hull planking like she\'s reading the harbor through the wood.',
        'Kovesse has her Grimoire tablet out. Her fingers keep twitching toward the tuning dial. She hasn\'t touched it yet, waiting for the order, but her foot is bouncing.',
        'Vorreth stands apart. Arms crossed. He keeps looking at the chart and then away from it.',
      ],
      choices: [
        {
          id: 'vess_suulen_recon',
          text: '"Send Suulen in. Tunnels and shadows."',
          consequence: 'Ghost approach. Map it from below.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'loyalty', target: 'suulen', value: 5 },
            { type: 'flag', target: 'vess_suulen_recon', value: true },
          ],
        },
        {
          id: 'vess_kovesse_comms',
          text: '"Kovesse - crack their comms."',
          consequence: 'Crack their comms. Listen in.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 12 },
            { type: 'loyalty', target: 'kovesse', value: 5 },
            { type: 'flag', target: 'vess_kovesse_comms', value: true },
          ],
        },
        {
          id: 'vess_vorreth_full',
          text: '"I want Vorreth\'s full tactical assessment. Everything."',
          consequence: 'Ask Vorreth to dig up his past.',
          available: true,
          effects: [
            { type: 'resource', target: 'intelligence', value: 8 },
            { type: 'loyalty', target: 'vorreth', value: 8 },
            { type: 'flag', target: 'vess_vorreth_full', value: true },
          ],
        },
      ],
    },
    {
      id: 'vess_arrive_04',
      title: 'THE DISCOVERY',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      effect: 'flash',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'The intelligence comes back in pieces. Each piece worse than the last.',
        'Whatever method you used, the conclusion is the same. Vess Harbour is not sitting still. The fortress is moving, not physically, but operationally. Something has shifted in the southern Wardensea command structure and the evidence is written in every supply manifest, every patrol adjustment, every signal that passes through the encrypted channels.',
        'Ships being armed. Not maintained. Armed. Fresh gun emplacements on vessels that were patrol craft a month ago. Hull reinforcements. Ammunition stockpiles that exceed standard garrison allocation by three hundred percent. The supply convoys from Kingsrun have doubled in frequency and the cargo manifests list items that don\'t belong on a defensive posting: siege equipment, boarding pikes, the heavy chain nets used for capturing vessels rather than sinking them.',
        'Delvessa spreads the intelligence across the chart table. Her face is pale. Not with fear. With recognition. She\'s seen this pattern before. In Kolmari strategic archives. In the planning documents that precede not defensive operations but offensive campaigns.',
        '"They\'re not defending," she says. "They\'re planning an offensive."',
      ],
    },
    {
      id: 'vess_arrive_04b',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Dragghen pushes back from the table and goes to check the hatch. He doesn\'t say why. He comes back and sits down again.',
        'Vorreth doesn\'t react. He already knew. Maybe not the specifics, but the shape of it, the institutional momentum that turns a garrison into a staging ground. "Second Division has been requesting force expansion for two years," he says quietly. "The admiralty denied it. If they\'re building up without authorization, it means either the orders changed or the local command has decided to act independently."',
      ],
    },
    {
      id: 'vess_arrive_04c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Against who?" Dragghen asks the question everyone is thinking.',
      ],
    },
    {
      id: 'vess_arrive_04d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa looks at the chart. The Southern Reach. The islands that aren\'t under Wardensea control. Ghostlight Reef. Windrow. The shipping lanes that connect the southern sea to the Central Belt.',
        '"Everyone," she says. "Anyone who isn\'t them."',
      ],
    },
    {
      id: 'vess_arrive_04e',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse pulls up Grimoire data: ship movement patterns over the last three months. Wardensea patrol arcs expanding. Cutter formations tightening. The defensive perimeter around Vess Harbour growing, pushing further into neutral territory with each passing week.',
        '"It\'s a net," Kovesse says. Flat. Certain. "They\'re closing the southern sea. One patrol route at a time."',
      ],
    },
    {
      id: 'vess_arrive_05',
      title: 'THE ASSESSMENT',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You lean over the navigation table, charts spread flat under lantern light. The ship drifts at the edge of Vess Harbour\'s outer patrol range, close enough to see the fortress, far enough to run. Through the cabin window, the sun drops toward the western horizon and the fortress catches the light in a way that turns iron to gold and stone to amber.',
        '"That\'s not a harbor. That\'s a weapon pointed at the sea." Low, certain. You recognize what you\'re looking at. "And it\'s pointed at everyone."',
      ],
    },
    {
      id: 'vess_arrive_05b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa leans into the doorframe behind you. Watching the fortress through the window. Cold and precise.',
        '"Including us," she says.',
      ],
    },
    {
      id: 'vess_arrive_05c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Good."',
      ],
    },
    {
      id: 'vess_arrive_05d',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Especially us."',
      ],
    },
    {
      id: 'vess_arrive_05e',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Vorreth appears behind you. He\'s been at the mainmast for a while.',
        '"You\'ll need a fleet," he says. No preamble. "Allies. Supply lines. A plan that doesn\'t rely on Danzai solving everything." He pauses. "Twelve capital warships."',
      ],
    },
    {
      id: 'vess_arrive_05f',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I know."',
      ],
    },
    {
      id: 'vess_arrive_05g',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"You\'re grinning."',
      ],
    },
    {
      id: 'vess_arrive_05h',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Twelve is a big number. I like big numbers."',
        'Vorreth exhales through his nose. He doesn\'t say anything else. He doesn\'t walk away, either.',
      ],
    },
    {
      id: 'vess_arrive_06',
      title: 'THE WITHDRAWAL',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'You pull back before the evening patrol shift. Suulen takes the helm and threads the ship through the gap she mapped on approach, a quarter-mile corridor between overlapping patrol arcs that exists for exactly fourteen minutes before the cutter rotations close it. The ship passes through without contact.',
        'No alarm. No signal flare. No cutter breaking formation.',
        'Delvessa compiles the report in her cabin, working by lamplight while the ship puts miles between itself and the fortress. Patrol routes and shift schedules. Supply chain vulnerabilities. Communication frequencies and cipher patterns. The blind spots in the western battery. The supply convoy route with its twelve-mile stretch of open water. And the big one: the mobilization. The quiet, systematic transformation of a defensive garrison into an offensive weapon.',
        'Vess Harbour is the key to the entire southern Bastion Sea. Whoever holds it controls the shipping lanes, the patrol routes, the supply lines that keep every island south of the Central Belt alive. Right now, the Wardensea holds it. And the Wardensea is getting ready to use it.',
        'You sit on the deck with your back against the mast, Danzai across your knees. The stars are out. The southern sky is different from the northern: wider, darker, the constellations unfamiliar. The fortress is a distant glow on the horizon behind you, fading as the ship gains distance.',
        '"Twelve capital ships," you say to no one.',
        'Dragghen passes you a bottle. "Twelve capital ships," the Gorundai agrees. He sits down. He doesn\'t ask if you\'re worried. You\'re already scratching approach vectors into the deck planking with a nail.',
        '"When we come back," you say, taking a long drink and passing the bottle back, "I\'m going through the front door."',
        '"Of course you are."',
        '"With Danzai."',
        '"Obviously."',
        '"And I\'m going to personally introduce myself to every officer in that command complex."',
        '"I wouldn\'t expect anything less."',
        'The bottle passes back and forth. The fortress fades to nothing behind you. Below deck, the scratch of Delvessa\'s pen on paper.',
        'The bottle is half empty by the time the fortress light disappears completely. The approach vectors scratched into the deck planking are still incomplete.',
      ],
    },
  ],
  onComplete: [
    { type: 'flag', target: 'vess_harbour_explored', value: true },
    { type: 'resource', target: 'intelligence', value: 15 },
    { type: 'reputation', value: 5 },
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA FLEET MOBILIZATION DETECTED',
      message: 'Intelligence from Vess Harbour confirms a large-scale buildup in the southern Wardensea Second Division. Ships are being armed beyond defensive allocation. Supply convoys have doubled. Shore batteries are being upgraded. This is not a garrison reinforcement. This is pre-offensive staging. The Wardensea is preparing to project force across the entire Southern Reach. Timeline unknown. Target unknown. But the direction is clear: outward.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - Tactical Brief Filed',
      message: 'Captain. I\'ve committed everything I know about Vess Harbour and Second Division operations to Delvessa\'s intelligence files. Patrol doctrine, officer tendencies, institutional blind spots, the ninety-second gap in the western battery coverage. Twenty years of service, distilled into usable intelligence for a Renegade crew. I won\'t pretend it was easy. Some of those officers were good people. Are good people. They serve with conviction. They believe in the system. I believed in it too, once. The difference is I\'ve seen what the system does when it decides an island is in the way. Vess Harbour is a weapon. And weapons don\'t choose their targets. Officers do.',
    }},
  ],
  currentBeat: 0,
};
