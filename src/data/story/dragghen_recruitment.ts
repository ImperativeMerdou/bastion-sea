import { StoryScene } from '../../types/game';

export const dragghenRecruitmentScene: StoryScene = {
  id: 'dragghen_recruitment',
  title: 'THE DRY DOCK',
  characters: ['karyudon', 'dragghen'],
  nextSceneId: 'kovesse_recruitment',
  lockNavigation: true,
  onComplete: [
    { type: 'recruit', target: 'dragghen', value: true },
    { type: 'flag', target: 'dragghen_recruited', value: true },
  ],
  beats: [
    {
      id: 'dragghen_01',
      title: 'THE GORUNDAI',
      paragraphs: [
        'You find him at the dry dock.',
        'Or rather, you find a pair of grey-green legs sticking out from underneath a fishing skiff and the sound of someone swearing at a hull joint in Gorundai, which is a language that sounds like gravel being fed through a metal grinder even when the speaker is paying you a compliment.',
        'He is not paying anyone a compliment. He\'s telling the skiff\'s keel beam exactly what he thinks of the shipwright who installed it, and his opinion is colorful enough that two dockworkers have stopped to listen with the expressions of men receiving an education.',
      ],
    },
    {
      id: 'dragghen_02',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'He slides out from under the hull. Six-eight, three-forty, grey-green skin with natural plating across his forearms and shoulders. Short-cropped dark hair. Battered leather work apron over chainmail. "Large" stopped being the relevant adjective several meals ago.',
        'He sees you and stops.',
        'His eyes go to the Iron on your forearms. Not your face, not your horns, not the prison clothes. The Iron. He studies it the way he was studying the hull joint: assessing the craftsmanship.',
        '"Forged," he says. Not a question.',
      ],
    },
    {
      id: 'dragghen_02b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Forged."',
      ],
    },
    {
      id: 'dragghen_02c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Your Iron tracks clean. No wobble at the edges. Either somebody trained you right or you figured it out yourself, and I\'m guessing nobody trained you because nobody trains Oni to that level without keeping them on a leash." He wipes his hands on the apron. "You\'re the one who waded in this morning. The dock\'s been talking."',
      ],
    },
    {
      id: 'dragghen_02d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Good things?"',
      ],
    },
    {
      id: 'dragghen_02e',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Depends on who you ask. I rate the entrance a four. Would\'ve been a six if you\'d come in on a boat."',
      ],
    },
    {
      id: 'dragghen_03',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'His name is Dragghen Kolve. Former drydock foreman for the Kolmari shipping fleet. Quit, or was quit, depending on which version of the story he\'s telling. He\'s been at Tavven Shoal for six weeks, taking repair work, sleeping on whatever hull he\'s fixing, and quietly going out of his mind because there isn\'t a ship in this harbor that deserves his full attention.',
        'He doesn\'t say any of this directly. You piece it together from the way he talks about the skiff he\'s repairing ("garbage fasteners, garbage keel, garbage everything, I give it a two"), the dock ("adequate facilities, poor maintenance, three"), and Tavven Shoal in general ("interesting harbor, terrible infrastructure, best food I\'ve had in years").',
      ],
    },
    {
      id: 'dragghen_03b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You rate everything?"',
      ],
    },
    {
      id: 'dragghen_03c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Everything has a rating. People just don\'t like hearing it."',
      ],
    },
    {
      id: 'dragghen_04',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'He gives you the tour because he can\'t help it. The dry dock is his territory the way the fish market is Hella\'s: he\'s been here six weeks and already reorganized the tool storage, fixed the crane winch, and repaired three vessels that the previous repairman had declared unfixable.',
        '"He said unfixable," Dragghen says, pointing at a fishing sloop in the far berth. "I said incompetent. There\'s a difference. The hull had a stress fracture along the third plank line. Fourteen-inch spread. He wanted to patch it with tar and copper sheet." He pauses for the weight of the offense to land. "Copper sheet."',
        'You nod like you understand. You don\'t.',
        '"Copper expands differently than pine under thermal load. The sheet pulls away from the caulk in warm water. Three months, maybe four, the patch fails mid-voyage and your cargo is swimming." He taps the hull. Solid. "I replaced the plank. Gorundai carvel method. Full backing frame. It\'ll hold for twenty years."',
      ],
    },
    {
      id: 'dragghen_05',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'You learn three things about Gorundai in the first hour.',
        'First: they build for the thing after the thing. A Gorundai shipwright doesn\'t ask what the ship does. He asks what the ship will need to survive. Load capacity is secondary to structural integrity. Speed is secondary to hull life. A Gorundai-built vessel is not the fastest in any harbor. It is the last one still floating when the storm clears.',
        'Second: they don\'t sell their work. They place it. A Gorundai craftsman will turn down a commission if the buyer doesn\'t understand what they\'re getting. Dragghen has refused three repair jobs this week because the captains wanted speed over quality. "I don\'t fix boats for people who\'ll break them again," he says. "That\'s not repair. That\'s enabling."',
        'Third: they feed people. It\'s reflexive. Dragghen has been cooking for the dockworkers since his second day here. Not because they asked. Because somewhere deep in the Gorundai cultural architecture, the act of feeding someone is the first step toward being responsible for them, and being responsible for things is what Gorundai do instead of sleeping.',
      ],
    },
    {
      id: 'dragghen_06',
      title: 'THE SHIP',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"There\'s a ship."',
        'He says it the way someone mentions a sunset they saw once. Casual. But his hands stop moving, which means it matters.',
        '"End of the east pier. Berth fourteen. She\'s called the Fallow Tide. Thirty-two-foot sloop, shallow draft, rigged for coastal running. Previous captain had a debt problem and an exit strategy that involved leaving the Bastion Sea permanently." He picks up a wrench. Puts it down. Picks it up again. "I\'ve been looking at her for two weeks."',
      ],
    },
    {
      id: 'dragghen_06b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Looking?"',
      ],
    },
    {
      id: 'dragghen_06c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Not buying. Looking. There\'s a difference." He leads you to the east pier. "She\'s a five. Which is the highest I\'ve rated anything in this harbor that I didn\'t build myself."',
      ],
    },
    {
      id: 'dragghen_07',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'The Fallow Tide sits in berth fourteen like a fighter between rounds. Hull scarred, rigging frayed, deck boards salt-bleached to the color of old bone. But the lines are good. The proportions are right. Whatever this ship was built for, somebody who knew what they were doing built it.',
        'Dragghen walks the hull length with his hands behind his back, which is how Gorundai shipwrights inspect a vessel they\'re pretending not to be interested in.',
        '"Keel is sound. Mast step needs reinforcing. The rigging is salvageable if you replace the standing lines and half the running gear. Hull planking is tight below the waterline, loose above. The rudder post has play. The previous captain didn\'t maintain her and she\'s angry about it."',
      ],
    },
    {
      id: 'dragghen_07b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You talk about ships like they\'re people."',
      ],
    },
    {
      id: 'dragghen_07c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Ships are better than people. Ships don\'t lie about what\'s wrong with them. You just have to know where to look."',
      ],
    },
    {
      id: 'dragghen_08',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'grim',
      paragraphs: [
        'He leans against the piling. Crosses his arms. The plating on his forearms catches the afternoon light.',
        '"I left the Kolmari because they started selling people," he says, unprompted, like it\'s a fact about the weather. "Debt-labor contracts. Forty shipyard workers I\'d trained, signed over to a mining consortium because the numbers worked out. Legal, technically. I punched through the foreman\'s desk on my way out. They rated the desk damage at six hundred Sovereigns."',
        'He dips a hand into his apron pocket. Pulls out a heat-seed from Coppervein, cracks it between his teeth.',
        '"I rate the desk a one. It deserved it."',
        'He watches the harbor. The fishing boats. The Kolmari trade office with its limp flag.',
        '"I\'ve been waiting six weeks for a reason to fix a ship that matters. Not a fishing skiff. Not a cargo hauler. Something that goes somewhere and does something and has a captain who knows the difference between a vessel and a vehicle."',
      ],
    },
    {
      id: 'dragghen_09',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'He looks at you. At the torn prison scraps. At the chain marks. At the Iron that tracked clean enough to impress a Gorundai master craftsman.',
        '"You need a ship. I need a ship that needs me." He shrugs. One shoulder. Gorundai shrug. It means more than a human shrug. It means: I have evaluated this situation and arrived at a conclusion I\'m willing to act on. "The Fallow Tide is a five. I can make her a seven. Maybe an eight, given time and materials."',
      ],
    },
    {
      id: 'dragghen_09b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I can\'t pay you."',
      ],
    },
    {
      id: 'dragghen_09c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"I didn\'t ask for pay."',
      ],
      choices: [
        {
          id: 'dragghen_recruit_honest',
          text: '"I\'m going to take this island. And then the next one. I need someone who builds things that last."',
          consequence: 'Honest. Direct. He\'ll either respect it or walk.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 10 },
            { type: 'flag', target: 'dragghen_approach', value: 'honest' },
          ],
        },
        {
          id: 'dragghen_recruit_ship',
          text: '"Show me the Fallow Tide. Walk me through every problem. I want to know what we\'re working with."',
          consequence: 'Speak his language. The ship is the argument.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 12 },
            { type: 'flag', target: 'dragghen_approach', value: 'technical' },
          ],
        },
        {
          id: 'dragghen_recruit_food',
          text: '"You\'ve been feeding dockworkers for six weeks. Cook for a crew instead."',
          consequence: 'Name what he\'s already doing. Give it a frame.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 8 },
            { type: 'reputation', value: 2 },
            { type: 'flag', target: 'dragghen_approach', value: 'feeding' },
          ],
        },
      ],
    },
    {
      id: 'dragghen_10',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'He doesn\'t answer right away. He sits with it the way you\'d sit with a heavy thing you\'re not sure you want to pick up.',
        'Then he stands. Walks to the Fallow Tide. Puts one hand on her hull. The plating on his forearms darkens. Iron, responding to contact with something that needs fixing.',
        '"I\'m going to start on the keel reinforcement tonight. Mast step tomorrow. I\'ll need timber, pitch, and six hundred feet of standing rigging." He looks at you over his shoulder. "You\'re paying for materials. Eventually. When you have money. Which you don\'t."',
      ],
    },
    {
      id: 'dragghen_10b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I\'ll figure it out."',
      ],
    },
    {
      id: 'dragghen_10c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"I know." He pulls a tool roll from his bag and unties it on the dock boards. Twenty-two instruments, each one in its place. "That\'s a three. The figuring-it-out part. You\'ll get better."',
      ],
    },
    {
      id: 'dragghen_final',
      paragraphs: [
        'A Gorundai shipwright is fixing a ship for you. He hasn\'t called it joining. He hasn\'t used the word crew. He\'s just started working on a hull that belongs to nobody and acting like it belongs to both of you.',
        'That\'s how Gorundai say yes. They don\'t say it. They build it.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
};
