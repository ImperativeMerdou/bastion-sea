import { StoryScene } from '../../types/game';

export const conquestForceScene: StoryScene = {
  id: 'conquest_force',
  title: 'THE IRON WAY',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth', 'pettha_koss'],
  beats: [
    {
      id: 'force_01',
      title: 'DAY 5 - THE DECISION',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'The crew goes quiet when you say it.',
        '"We take the Harbor Board. Tonight. By force."',
      ],
    },
    {
      id: 'force_01b',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Delvessa closes her ledger.',
        '"That\'s the least efficient approach available to us."',
      ],
    },
    {
      id: 'force_01c',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"It\'s the most honest one."',
      ],
    },
    {
      id: 'force_02',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth stands. His chair scrapes the coral floor. Everyone looks at him.',
        '"I know what happens next. I\'ve planned operations like this from the other side." He fixes you with those grey, exhausted eyes. "Pettha Koss has eight private guards. Not military. Harbor security. They carry clubs and know how to use them on drunks and petty thieves. They are not equipped for what you are."',
      ],
    },
    {
      id: 'force_02b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Good."',
      ],
    },
    {
      id: 'force_02c',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"That wasn\'t a compliment." He pauses. "You could do this cleanly. Minimal damage. Control the exits, isolate the guards, take the Board building without breaking it. Or you could do it your way: loud, fast, and burning."',
      ],
      choices: [
        {
          id: 'force_clean',
          text: '"Clean. I want the building in one piece. I need it tomorrow."',
          consequence: 'Pragmatic violence. Efficient. Controlled.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 10 },
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'flag', target: 'force_style', value: 'clean' },
          ],
        },
        {
          id: 'force_loud',
          text: '"Loud. I want this island to hear it. I want the Bastion Sea to hear it."',
          consequence: 'Karyudon\'s way. Maximum statement. Maximum consequence.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 15 },
            { type: 'loyalty', target: 'vorreth', value: -10 },
            { type: 'infamy', value: 5 },
            { type: 'flag', target: 'force_style', value: 'loud' },
          ],
        },
      ],
    },
    {
      id: 'force_03',
      title: 'MIDNIGHT',
      effect: 'flash',
      paragraphs: [
        'The Harbor Board building sits on a coral shelf above the main dock. Two stories. Stone foundation, wood upper. Three entrances: front, service door, roof hatch. Pettha Koss lives on the second floor with her schedules and her spectacles and her twenty years of making this island run.',
        'You go through the front door.',
        'Not because it\'s tactical. Because that\'s who you are.',
      ],
    },
    {
      id: 'force_04',
      paragraphs: [
        'The guards see you coming. Two of them at the door. They\'re not stupid. They know what an Oni built like a siege engine walking toward them at midnight means. One reaches for his whistle. The other raises his club.',
        'You don\'t slow down.',
      ],
      choices: [
        {
          id: 'force_fight_guards',
          text: 'Break through them. Forged Iron and a war club against harbor security.',
          consequence: 'They chose the wrong door to guard.',
          available: true,
          effects: [
            { type: 'combat', target: 'prologue_brawl', value: true },
          ],
        },
        {
          id: 'force_skip_fight',
          text: 'They see the Iron on your skin. They step aside. Smart.',
          consequence: 'Sometimes the threat is enough.',
          available: true,
          effects: [
            { type: 'reputation', value: 2 },
          ],
        },
      ],
    },
    {
      id: 'force_05',
      effect: 'shake',
      sfx: 'combat_heavy',
      paragraphs: [
        'Vorreth moves through the service entrance with Suulen. She maps the building in seconds, Forged Sight painting the interior in spatial data. Two guards on the stairs, two in the scheduling room, one outside Pettha\'s office. The tactician positions himself at the stairwell and waits.',
        'He doesn\'t need to wait long.',
        'The two guards at the stairs hear the front door explode and turn toward it. Vorreth steps out of the shadow with Greysalt drawn and a tone in the blade that makes the air taste like iron. They don\'t fight him. They are trained for harbor disputes. He was a Wardensea Commandant.',
        'It\'s over in twelve seconds.',
      ],
    },
    {
      id: 'force_06',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      sfx: 'combat_heavy',
      paragraphs: [
        'Dragghen handles the scheduling room. Two guards. He walks in carrying his cooking pot, forty pounds of cast iron, and sets it on the table.',
        '"Evening," he says.',
        'They look at the pot. They look at the Gorundai who just lifted forty pounds of iron with one hand like it was a teacup.',
        'They put their clubs on the table.',
        '"Smart choice," Dragghen says. "Dinner\'s at dawn if you want some."',
      ],
    },
    {
      id: 'force_07',
      paragraphs: [
        'You climb the stairs. The last guard, the one outside Pettha\'s office, is shaking. He\'s seen what happened downstairs. The whistle is still echoing off the harbor. You can hear boots on coral outside. People are waking up.',
        'The guard looks at your horns. Your war club. The iron hardening across your skin.',
        'He steps aside.',
        'You push open the door to Pettha Koss\'s office.',
      ],
    },
    {
      id: 'force_08',
      speaker: 'pettha_koss',
      speakerName: 'Pettha Koss',
      paragraphs: [
        'She\'s already awake. Sitting at her desk. Spectacles on. Ledger open. The woman who runs Tavven Shoal through paperwork looks up at the seven-foot Oni standing in her doorway, covered in splinters and breathing hard, and adjusts her glasses.',
        '"I assume you\'re not here for a dock reservation."',
      ],
    },
    {
      id: 'force_08b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I\'m here for the island."',
      ],
    },
    {
      id: 'force_08c',
      speaker: 'pettha_koss',
      speakerName: 'Pettha Koss',
      paragraphs: [
        'Pettha Koss looks at you for a long time. Then she closes her ledger.',
        '"The Harbor Board operates under my schedules or it doesn\'t operate. Your crew can break every door in this building and you\'ll still need someone who knows the routing tables. That\'s me. That will always be me."',
      ],
    },
    {
      id: 'force_08d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Then we work together."',
      ],
    },
    {
      id: 'force_08e',
      speaker: 'pettha_koss',
      speakerName: 'Pettha Koss',
      paragraphs: [
        '"That\'s not what this is and we both know it." She pushes her spectacles up. "But I\'ll do my job. Because the alternative is seven thousand people losing their trade routes." A pause. "Don\'t mistake cooperation for loyalty. This is management under occupation."',
      ],
    },
    {
      id: 'force_09',
      title: 'DAWN',
      effect: 'flash',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'By morning, every Grimoire on Tavven Shoal carries the same story.',
        'Kovesse has been broadcasting since the front door came down. She caught the whole thing: the guards, the stairwell, the conversation with Pettha. Twelve thousand views before sunrise. Thirty thousand by noon.',
        'The Bastion Sea knows your name now. KARYUDON. The Oni who walked through a front door and took an island.',
        'Tessurren Dolch receives word over his own Grimoire. He\'s already drafting a report to the Confederation. The Kolmari warehousing deal is dead. The debt structure he built over six months just became someone else\'s problem.',
        'And somewhere in Durrek Garrison, a Wardensea officer marks a new entry on the bounty board. An Oni with two horns and a war club. Sixty-five million Sovereigns.',
        'Not because you\'re dangerous. Because you proved it.',
      ],
    },
  ],
  nextSceneId: 'conquest_aftermath',
  onComplete: [
    { type: 'notification', value: true, notification: {
      type: 'wardensea',
      title: 'WARDENSEA ALERT - DURREK GARRISON',
      message: 'Commandant Sevaine has dispatched a reconnaissance cutter to Tavven Shoal. Expected arrival: 48 hours. Classification: Renegade Occupation - Priority 2.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'KOVESSE\'S FEED - 47K VIEWS',
      message: '"BREAKING: Full vid of the Harbor Board assault. This Oni walked through the FRONT DOOR. I cannot make this up. Your girl was on the ROOF the entire time. Follow for updates. #BastionSea #Karyudon #NewEra"',
    }},
  ],
  currentBeat: 0,
};
