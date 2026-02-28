import { StoryScene } from '../../types/game';

export const kovesseRecruitmentScene: StoryScene = {
  id: 'kovesse_recruitment',
  title: 'THE SIGNAL',
  characters: ['karyudon', 'dragghen', 'kovesse'],
  nextSceneId: 'dockside_confrontation',
  lockNavigation: true,
  onComplete: [
    { type: 'recruit', target: 'kovesse', value: true },
    { type: 'flag', target: 'kovesse_recruited', value: true },
  ],
  beats: [
    {
      id: 'kovesse_01',
      title: 'THE RATHAI',
      paragraphs: [
        'The Rathai finds you before you find her. This will always be how it works with Kovesse Grenn.',
        'You\'re walking back through the market when a voice hits you from everywhere at once.',
      ],
    },
    {
      id: 'kovesse_02',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      expression: 'happy',
      paragraphs: [
        '"CAPTAIN."',
        'You turn. Nobody. Turn again. A four-foot-one, green-skinned Rathai is standing on a crate behind you, which puts her at chest height, holding three Grimoire devices like a dealer holding cards.',
      ],
    },
    {
      id: 'kovesse_02b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I\'m not a captain."',
      ],
    },
    {
      id: 'kovesse_02c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      expression: 'happy',
      paragraphs: [
        '"You will be. I\'ve been broadcasting about you for two hours. Three hundred views already. \'Unknown Oni wades ashore at Tavven Shoal with Wardensea chain marks and Forged Iron, possible Renegade, possible lunatic, possibly both.\' The engagement numbers are fantastic."',
      ],
    },
    {
      id: 'kovesse_02d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You\'ve been broadcasting about me."',
      ],
    },
    {
      id: 'kovesse_02e',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"I broadcast about everything. I\'m Kovesse Grenn, best Grimoire operator between Selvaggio and the Nettleworks, expelled from the Signal Institute for \'unauthorized creative application of proprietary technology.\' Which means I made their runestones do something they didn\'t think was possible and they got scared."',
        'She takes a breath. You\'re impressed. You weren\'t sure she\'d taken one during the previous sentence.',
      ],
    },
    {
      id: 'kovesse_03',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"I\'ve been on this island for three months waiting for a story worth following. Tavven Shoal is a transit hub. People come through. Most of them are boring. Merchants, Wardensea patrols, the occasional Renegade who thinks they\'re interesting but isn\'t."',
        'She hops off the crate. Lands like a cat. The Grimoire devices don\'t rattle.',
        '"You\'re not boring. The Iron is real, the chain marks are fresh, and you waded in from open ocean on a piece of door. That\'s a story. I want to be there when it happens."',
      ],
    },
    {
      id: 'kovesse_03b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"What makes you think anything\'s going to happen?"',
      ],
    },
    {
      id: 'kovesse_03c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Because Oni don\'t wash up on islands and sit quietly. It\'s not in the species description."',
      ],
    },
    {
      id: 'kovesse_04',
      title: 'THE GRIMOIRE',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'She shows you the device. Not because you ask. Because she can\'t not show you.',
        'Three tablets, each the size of a dinner plate, each covered in runestones that glow faint amber when she touches them. The casings are scratched and dented. One has a crack across the faceplate that she\'s repaired with solder and what looks like a fish bone.',
        '"Grimoires. The Nettleworks runs on them. Every broadcast, every bounty update, every weather warning, every piece of gossip in the Bastion Sea passes through a Grimoire relay at some point." She holds one up. The runestones pulse. "Think of it as a voice that carries across oceans. The Kolmari built the relay network. They control the main channels. They decide what gets broadcast on the official feeds and what doesn\'t."',
        'She grins. All teeth.',
        '"I don\'t use the official feeds."',
      ],
    },
    {
      id: 'kovesse_05',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"The Signal Institute. That\'s where Grimoire operators train. Two years. Runestone calibration, signal modulation, relay management. Very technical. Very boring. Very controlled." She flips a tablet in her hand, catches it behind her back. "They teach you to maintain the network. They don\'t teach you to use it. There\'s a difference."',
      ],
    },
    {
      id: 'kovesse_05b',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"The Kolmari fund the Institute. The Wardensea licenses the relay network. Between them, they control what the Bastion Sea hears. Bounty updates, weather data, shipping manifests. All real. All curated. The information isn\'t fake. It\'s shaped. They broadcast what serves them and bury what doesn\'t."',
        'She taps a runestone. A feed of text scrolls across the surface. Numbers. Names. Updates.',
        '"I broadcast what\'s actually happening. No filter. No curation. No sponsor. That\'s why the Institute expelled me. Not because I broke anything. Because I made people hear things the Kolmari preferred they didn\'t."',
      ],
    },
    {
      id: 'kovesse_06',
      paragraphs: [
        'You watch the feeds scroll. Bounty numbers. Island news. Trade route disruptions. Weather patterns from six different monitoring stations. Crew sightings, ship movements, Wardensea patrol rotations. The entire Bastion Sea compressed into streams of light on runestone surfaces.',
        'This is how the world talks to itself. And one four-foot Rathai with three cracked tablets and no institutional backing is shouting into the conversation louder than anyone the Kolmari pay to keep it quiet.',
        'Information is a weapon. You\'ve always known this in the abstract. Kovesse Grenn is the first person you\'ve met who wields it like one.',
      ],
    },
    {
      id: 'kovesse_07',
      paragraphs: [
        'Dragghen has followed you from the dry dock. He\'s leaning against a piling with his arms crossed, watching the Rathai with the expression of a man who has encountered a force of nature and is waiting to see what it breaks first.',
      ],
    },
    {
      id: 'kovesse_07b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You know her?" you ask.',
      ],
    },
    {
      id: 'kovesse_07c',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Everybody knows her. She broadcast my hull repair ratings last week. Dock traffic went up twelve percent because people wanted to watch me yell at boats." He pauses. "I rated the broadcast a five. Good energy. Needs editing."',
        'Kovesse beams like she\'s been knighted.',
      ],
    },
    {
      id: 'kovesse_08',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Here\'s what I know." She counts on her fingers, which are small and quick and stained with runestone ink. "Fourteen ships in this harbor. Three for sale. Two seaworthy. One with a captain who owes a debt to the wrong people and might negotiate. The Kolmari trade office has filed six debt enforcement actions in the last month. A Wardensea cutter passes every nine days. The next one is in seven."',
        'She hasn\'t looked this up. She knows it the way you know the weight of your own fists.',
        '"A Grimoire operator doesn\'t just broadcast, Captain. She listens. And I have been listening to this island for three months. I know its heartbeat. I know where the blood is thin. I know which veins the Kolmari are squeezing and which ones they haven\'t found yet."',
        'She hops down from the crate. Barely reaches your hip.',
        '"I\'m not joining a crew. I don\'t join things. I follow stories. But your story and my signal are going to the same place. So."',
      ],
    },
    {
      id: 'kovesse_09',
      paragraphs: [
        'The sun is past noon. The fish market is hitting peak volume. You have a Gorundai shipwright already working on a hull and a Rathai broadcaster who knows this island\'s nervous system better than the people running it.',
        'Not a crew. Not yet. But the pieces are moving.',
      ],
      choices: [
        {
          id: 'kovesse_recruit_story',
          text: '"This story is going to be worth telling. I want you telling it."',
          consequence: 'Speak her language. The story is the argument.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 12 },
            { type: 'flag', target: 'kovesse_approach', value: 'story' },
          ],
        },
        {
          id: 'kovesse_recruit_signal',
          text: '"I need eyes and ears. The Kolmari have a network. I need a better one."',
          consequence: 'Practical. Use what she offers. She\'ll respect the directness.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 8 },
            { type: 'loyalty', target: 'dragghen', value: 3 },
            { type: 'flag', target: 'kovesse_approach', value: 'tactical' },
          ],
        },
        {
          id: 'kovesse_recruit_bold',
          text: '"I\'m going to do something stupid in this market before sundown. You can watch or you can help."',
          consequence: 'Honesty. The Oni approach to recruitment.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 10 },
            { type: 'infamy', value: 2 },
            { type: 'flag', target: 'kovesse_approach', value: 'bold' },
          ],
        },
      ],
    },
    {
      id: 'kovesse_10',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Her ears go straight forward. In Rathai, that\'s a yes before the mouth catches up.',
        '"I have CONDITIONS. One: I broadcast what I want, when I want. No censorship. No editing. No \'maybe don\'t mention the part where we almost died.\' Two: I get access. Front row. Every meeting, every plan, every confrontation. I\'m not crew. I\'m embedded press." She considers. "Three: someone tall carries my equipment bag. It\'s heavy and I\'m four feet tall and the strap digs into my shoulder."',
        'She looks at Dragghen.',
      ],
    },
    {
      id: 'kovesse_10b',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Don\'t look at me," Dragghen says.',
      ],
    },
    {
      id: 'kovesse_10c',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"You\'re the tallest."',
      ],
    },
    {
      id: 'kovesse_10d',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"I rate this conversation a two."',
      ],
    },
    {
      id: 'kovesse_final',
      paragraphs: [
        'Evening. Hella\'s stall. Storm tea and leftover eel. The market quieting down.',
        'Dragghen eats with the slow precision of someone who treats food seriously. Kovesse has perched on the counter, legs dangling, three Grimoires arrayed around her like an orchestra she\'s conducting. She\'s been broadcasting fragments for the last hour. "The Oni orders more tea." "The Gorundai rates the eel a seven. Repeat: SEVEN. Historic."',
        'The stars come out over Tavven Shoal. Harbor lamps come on, reflected in the dark water like a second sky.',
        'You have a shipwright who rates your Iron clean. A broadcaster who turned your arrival into a three-hundred-view story. A vendor who feeds you without asking for payment. And a name, yours, spoken aloud in a market that will remember it.',
        'Not a crew yet. Not a plan yet. But the night is warm and the tea is hot and the ship is being fixed and the signal is going out.',
        'You crack your knuckles. The Iron fades from your forearms.',
        'It\'s a start.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
};
