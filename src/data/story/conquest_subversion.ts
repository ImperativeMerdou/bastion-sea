import { StoryScene } from '../../types/game';

export const conquestSubversionScene: StoryScene = {
  id: 'conquest_subversion',
  title: 'THE SLOW TIDE',
  characters: ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'vorreth'],
  beats: [
    {
      id: 'subversion_01',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      title: 'DAY 4 - THE LONG GAME',
      paragraphs: [
        'Kovesse stares at you like you\'ve just told her the sky is a ceiling.',
        '"You want to... NOT take the island?"',
      ],
    },
    {
      id: 'subversion_01b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I want the island to take me."',
      ],
    },
    {
      id: 'subversion_01c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"That\'s the same thing with extra steps!"',
      ],
    },
    {
      id: 'subversion_01d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"That\'s the same thing with better foundations."',
      ],
    },
    {
      id: 'subversion_01e',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth leans back in his chair. His shoulders drop half an inch.',
        '"I\'ve seen a hundred renegades take islands by force. I\'ve seen exactly three who made them work afterward. This--" he gestures at you "--this might actually work."',
      ],
    },
    {
      id: 'subversion_02',
      paragraphs: [
        'The plan is simple. Deceptively simple. The kind of simple that takes seven days of precise, exhausting work to execute.',
        'You make yourself necessary.',
        'Not through force. Not through money. Through unglamorous labor. The work that keeps an island alive, and that nobody else is willing to do.',
      ],
    },
    {
      id: 'subversion_03',
      title: 'DAY 4 - THE DOCKS',
      paragraphs: [
        'The harbor has a problem. Two supply ships collide at the eastern berth, a scheduling conflict that Pettha\'s system should have caught but didn\'t, because Tessurren\'s agents have been quietly disrupting the Board\'s information flow for weeks. Minor sabotage. Just enough to make Pettha look incompetent.',
        'You show up at the dock before anyone calls for help. Seven feet of Oni hauling rope, pulling damaged cargo from the water, lifting a broken prow with Forged Iron that makes the dock workers step back and stare.',
        'You work for six hours. By the end, your hands are raw and your back aches in places you\'d forgotten existed. The dock workers don\'t thank you. But they nod. The Oni nod is worth more.',
      ],
    },
    {
      id: 'subversion_04',
      title: 'DAY 5 - THE MARKET',
      paragraphs: [
        'Dragghen sets up a stall next to Hella\'s. He cooks. Not for money. For free. Coppervein recipes that make dock workers sit down and eat like they haven\'t tasted real food in months.',
        'You help him carry supplies. An Oni war captain hauling sacks of grain through a fish market.',
        'People talk. Not about the scary Oni who confronted the Kolmari. About the Oni who\'s been fixing docks and hauling grain and whose crew member cooks like somebody\'s mother.',
        'Suulen, meanwhile, identifies three of Tessurren\'s agents who\'ve been interfering with the Harbor Board\'s communications. She doesn\'t confront them. She reroutes their messages, feeding them false scheduling data that makes them sabotage each other instead of Pettha.',
        'By day five, Pettha\'s Board is running smoother than it has in months. She notices.',
      ],
    },
    {
      id: 'subversion_05',
      speaker: 'pettha_koss',
      speakerName: 'Pettha Koss',
      title: 'DAY 6 - THE CONVERSATION',
      paragraphs: [
        'Pettha finds you at the dock. You\'re repairing a cargo winch. Iron-hardened hands bending a warped gear back into alignment.',
        'She watches you work for a full minute before speaking.',
        '"You\'ve been on my island for a week. In that time, you\'ve repaired the eastern berth, resolved two scheduling conflicts that my own Board missed, fed half the dock crew, and neutralized the Kolmari interference network that I\'ve been trying to identify for three months."',
      ],
    },
    {
      id: 'subversion_05b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I like to keep busy."',
      ],
    },
    {
      id: 'subversion_05c',
      speaker: 'pettha_koss',
      speakerName: 'Pettha Koss',
      paragraphs: [
        '"You\'re not keeping busy. You\'re building a case." She adjusts her spectacles. "I\'ve run this island for twenty years. I know when someone is applying for a position. The question is: what position are you applying for?"',
      ],
      choices: [
        {
          id: 'subversion_honest',
          text: '"The position that keeps this island safe. Permanently."',
          consequence: 'Direct but measured. Let her define the terms.',
          available: true,
          effects: [
            { type: 'reputation', value: 5 },
            { type: 'flag', target: 'subversion_pitch', value: 'security' },
          ],
        },
        {
          id: 'subversion_ambitious',
          text: '"Partner. Not your boss. Not your employee. The person who handles the things you shouldn\'t have to."',
          consequence: 'Ambitious but respectful.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'reputation', value: 3 },
            { type: 'flag', target: 'subversion_pitch', value: 'partner' },
          ],
        },
      ],
    },
    {
      id: 'subversion_06',
      speaker: 'pettha_koss',
      speakerName: 'Pettha Koss',
      paragraphs: [
        'Pettha studies you. Not the way Delvessa studies people, calculating value. The way an engineer studies a new tool, determining fit.',
        '"The Kolmari will retaliate when they find out their interference network has been neutralized. The Wardensea patrol comes in three days. And you\'re an unknown Oni with no fleet, no established network, and a stolen God Fruit that every crew in the Bastion Sea would kill you for."',
      ],
    },
    {
      id: 'subversion_06b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"All true."',
      ],
    },
    {
      id: 'subversion_06c',
      speaker: 'pettha_koss',
      speakerName: 'Pettha Koss',
      paragraphs: [
        '"So give me one reason to formalize this arrangement instead of waiting for the next candidate."',
      ],
    },
    {
      id: 'subversion_06d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Because the next candidate won\'t fix your winch."',
      ],
    },
    {
      id: 'subversion_06e',
      speaker: 'pettha_koss',
      speakerName: 'Pettha Koss',
      paragraphs: [
        'She looks at the repaired gear. At the dock you spent six hours hauling rope on. At the food stall where Dragghen is feeding her workers.',
        '"No," she says. "They won\'t."',
      ],
    },
    {
      id: 'subversion_07',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      title: 'DAY 7 - THE INVITATION',
      paragraphs: [
        'There is no announcement. No declaration. No flag raised and no door kicked in.',
        'Pettha Koss adds a new entry to the Harbor Board scheduling system: "Security Operations - Karyudon, Captain." She files it between the tide tables and the cargo manifests, as if it\'s the most ordinary administrative adjustment in the world.',
        'Your crew is listed as harbor security. Your dock fees are waived. Your berth assignment is permanent.',
        'It\'s not conquest. It\'s employment. And somehow, it\'s more solid than any door you could have broken down.',
        'Kovesse is beside herself. "How do I BROADCAST this? \'Local Oni gets a JOB?\' That\'s not a story! That\'s a FILING!"',
      ],
    },
    {
      id: 'subversion_07b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Then don\'t broadcast it."',
      ],
    },
    {
      id: 'subversion_07c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"DON\'T--" She takes a breath. "You are going to give me an ulcer, Captain."',
      ],
    },
    {
      id: 'subversion_08',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'The Grimoire coverage is minimal. A footnote in a regional trade report. "Tavven Shoal Harbor Board expands security operations." No views. No shares. No trending topic.',
        'Fifteen million on the bounty board. The lowest number any approach would have earned. The Wardensea classifies you as "local security - monitoring." Not even a priority flag.',
        'Vorreth sits across from you at Hella\'s stall that evening. He\'s drinking storm tea. He looks at you with an expression you haven\'t seen before.',
        '"In twelve years with the Wardensea, I never once saw someone take an island this way."',
      ],
    },
    {
      id: 'subversion_08b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Is that a compliment?"',
      ],
    },
    {
      id: 'subversion_08c',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        '"It\'s an observation. The Wardensea can\'t respond to something that didn\'t happen. The Kolmari can\'t claim aggression when you\'ve been filed as harbor staff. You\'ve taken an island and left no fingerprints."',
        'He takes a sip of his tea.',
        '"It won\'t last. Eventually they\'ll notice. But by then, you\'ll have had time to build something real."',
      ],
    },
    {
      id: 'subversion_08d',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Dragghen puts a plate in front of you. Stew. His mother\'s recipe.',
        '"One down," he says.',
      ],
    },
    {
      id: 'subversion_08e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"One down."',
      ],
    },
  ],
  nextSceneId: 'conquest_aftermath',
  onComplete: [
    { type: 'notification', value: true, notification: {
      type: 'crew',
      title: 'VORRETH DAAZ - TACTICAL ASSESSMENT',
      message: 'The subversion approach gives us the smallest profile and the longest runway. The Wardensea won\'t prioritize us. The Kolmari will react economically, not militarily. We have time, but we need to use it. Recommend securing Keldriss as a supply route before expanding further.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'BASTION SEA TRADE REPORT - NORTHERN ARC',
      message: 'Minor administrative changes at Tavven Shoal. Harbor Board security expanded. Trade volume stable. No significant events reported. In other news, a Conqueror fleet was spotted near Ghostlight Reef...',
    }},
  ],
  currentBeat: 0,
};
