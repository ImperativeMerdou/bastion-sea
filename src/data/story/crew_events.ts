import { StoryScene } from '../../types/game';
import {
  dragghenEvent02, dragghenEvent03,
  kovesseEvent02, kovesseEvent03,
  suulenEvent02, suulenEvent03,
  tessekEvent02, tessekEvent03,
  orrenEvent01, orrenEvent02, orrenEvent03,
  vorrethEvent01, vorrethEvent02, vorrethEvent03,
  delvessaEvent03,
} from './crew_events_new';
import {
  delvessaEvent04, dragghenEvent04, kovesseEvent04, suulenEvent04, tessekEvent04,
  orrenEvent04, vorrethEvent04,
} from './crew_events_04';
import {
  delvessaRomance01, delvessaRomance02, delvessaRomance03, delvessaRomance04,
} from './delvessa_romance';

// ==========================================
// DELVESSA GHAL - Strategist, Ex-Kolmari
// The slow burn. Smart, controlled, drawn to
// Karyudon despite every rational instinct.
// ==========================================

export const delvessaEvent01: StoryScene = {
  id: 'crew_delvessa_01',
  title: 'Ledger and Liquor',
  beats: [
    {
      id: 'del_01_1',

      paragraphs: [
        'Corner table. Papers stacked in three neat columns, ink still wet on the top sheet. Delvessa Ghal is doing arithmetic in a bar at half past midnight, her quill scratching numbers while drunks argue about fish prices two tables over. A glass of rum sits at her elbow, full to the brim, not a sip taken. She ordered it an hour ago so the barkeep would stop hovering.',
      ],
    },
    {
      id: 'del_01_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You drop into the chair across from her. It groans. "Oi. That drink a hostage or are you planning to let it go?"',
      ],
    },
    {
      id: 'del_01_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Her quill doesn\'t stop. Her eyes don\'t lift. "It\'s a prop. I\'m working."',
      ],
    },
    {
      id: 'del_01_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"In a bar." You lean back, chair screaming under you, grinning like you\'ve already won something. "At midnight. Surrounded by people having actual fun." You tap her nearest stack of papers. "What is all this? Fourteen ways we\'re doomed?"',
      ],
    },
    {
      id: 'del_01_5',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Supply projections for the next three months." Her quill pauses. Just barely. "We\'re underfunded. Overstretched. Operating in territory the Wardensea considers its personal garden." The quill moves again, slower now. "And yes. Also calculating how many ways this collapses. The number, Captain, is not small."',
      ],
    },
    {
      id: 'del_01_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'flirt_delvessa',
          text: '"Numbers are boring. Talk to me about something that isn\'t a spreadsheet."',
          consequence: 'Steer the conversation somewhere personal.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 4 },
            { type: 'flag_increment', target: 'delvessa_flirt_count', value: 1 },
          ],
        },
        {
          id: 'business_delvessa',
          text: '"Show me the projections. I want to understand where we stand."',
          consequence: 'Take the work seriously.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 3 },
            { type: 'resource', target: 'intelligence', value: 1 },
          ],
        },
        {
          id: 'drink_delvessa',
          text: 'Take her glass, drink it yourself. "Wasting good liquor is criminal, Delvessa."',
          consequence: 'Provocative. Bold move.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 2 },
            { type: 'flag_increment', target: 'delvessa_flirt_count', value: 1 },
          ],
        },
      ],
    },
    {
      id: 'del_01_flirt',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'She looks up. The lamplight catches dark brown eyes, and for half a second you see the calculation running behind them: threat assessment, conversational vectors, three possible responses ranked by strategic value. Her fingers tighten around the quill. Then loosen. "Captain. Are you... attempting conversation with me?"',
      ],
    },
    {
      id: 'del_01_flirtb',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Hah. Every time you say \'Captain\' like that, it sounds like you\'re picking between following an order and filing a formal complaint."',
      ],
    },
    {
      id: 'del_01_flirtc',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Her lips press together. The left corner pulls. She kills it before it becomes a smile, but her grip on that quill could snap it in half. "I\'ll let you know which one I decide."',
      ],
    },
    {
      id: 'del_01_end',
      paragraphs: [
        'She goes back to her numbers. You leave her to it.',
      ],
    },
    {
      id: 'del_01_endb',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'At the door, you pause. "Delvessa. Why\'d you leave the Kolmari? Really."',
      ],
    },
    {
      id: 'del_01_endc',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"I told you. The math stopped making sense."',
      ],
    },
    {
      id: 'del_01_endd',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"That\'s the reason you give to the math. What\'s the real one?"',
      ],
    },
    {
      id: 'del_01_ende',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Silence. The quill stops. She doesn\'t look up.',
        '"The math stopped making sense."',
      ],
    },
    {
      id: 'del_01_endf',
      paragraphs: [
        'Same answer. Exact same tone. She believes it. You can tell she believes it. You can also tell, from the way she\'s gripping that quill hard enough to bend the shaft, that the answer has nothing to do with math.',
        'You leave. At the door you glance back. The prop drink is gone. Empty glass, wet ring on the table, a single drop of rum still clinging to the rim. She drank it. The woman who ordered a drink she had no intention of touching, who left the Kolmari for reasons she can\'t explain to herself, who does arithmetic at midnight in a bar because she can\'t sleep, drank the prop.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'delvessa_event_01_complete', value: true },
  ],
};

export const delvessaEvent02: StoryScene = {
  id: 'crew_delvessa_02',
  title: 'Night Air',
  beats: [
    {
      id: 'del_02_1',

      paragraphs: [
        'The harbor at night. Wind coming off the water hard enough to make the lanterns swing, throwing light in uneven arcs across the dock. Delvessa is at the dock\'s edge, hair loose for once, whipping sideways in the gale. She doesn\'t seem to notice. She\'s watching a cargo ship pull out to sea.',
      ],
    },
    {
      id: 'del_02_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"You look like a woman thinking about jumping ship."',
      ],
    },
    {
      id: 'del_02_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"If I were leaving, you wouldn\'t see me go." She doesn\'t turn around. "I was thinking about the Kolmari. About what they\'d say if they could see me now. Standing on a dock with a fugitive Oni who announces world conquest in fish markets."',
      ],
    },
    {
      id: 'del_02_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"And? What would they say?"',
      ],
    },
    {
      id: 'del_02_5',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"That I\'ve lost my mind." She turns. Hair still whipping sideways. She\'s standing closer than the dock requires. "They\'d be half right."',
      ],
    },
    {
      id: 'del_02_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'step_closer',
          text: 'Step closer. Close enough to feel the warmth. "Which half?"',
          consequence: 'Close the distance.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 5 },
            { type: 'flag_increment', target: 'delvessa_flirt_count', value: 1 },
            { type: 'flag', target: 'delvessa_dock_moment', value: true },
          ],
        },
        {
          id: 'honest_answer',
          text: '"You haven\'t lost your mind. You found something worth betting it on."',
          consequence: 'Sincere. Karyudon shows the man under the ambition.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 4 },
            { type: 'flag_increment', target: 'delvessa_sincere_count', value: 1 },
          ],
        },
        {
          id: 'deflect_joke',
          text: '"Hey, I\'m a very stable fugitive. Best-behaved Oni you\'ll ever meet."',
          consequence: 'Lighten the mood. Deflect with humor.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'del_02_close',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Whatever you chose, she nods. Closes the folio. Tucks it under her arm.',
        '"Goodnight, Captain."',
        'She walks past you. Her footsteps are quick on the dock planking.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'delvessa_event_02_complete', value: true },
  ],
};

// ==========================================
// DRAGGHEN KOLVE - Shipwright, Perfectionist
// The critical one. Rates everything on a scale
// of 1 to 10. Never gives above a 6. Fixes
// things before you know they're broken.
// ==========================================

export const dragghenEvent01: StoryScene = {
  id: 'crew_dragghen_01',
  title: 'The Rating',
  beats: [
    {
      id: 'dra_01_1',

      paragraphs: [
        'Below deck. The ceiling is low enough that you have to duck, and you still crack your horn on a crossbeam walking in. Dragghen doesn\'t notice. He\'s on one knee with his palm flat against the hull, fingers spread wide, like he\'s listening to the wood breathe. He knocks twice with a scarred knuckle. Tilts his head. Frowns. Pulls out a leather notebook no bigger than his hand and scratches something in it with a pencil stub worn down to a nub. He hasn\'t looked up once.',
      ],
    },
    {
      id: 'dra_01_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You rub your horn. "You\'ve been down here for three hours, Dragghen. Kovesse started a betting pool on when you\'d surface." You lean against a beam, and the beam flexes. You straighten up. "So. What do you think of the ship?"',
      ],
    },
    {
      id: 'dra_01_3',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'He doesn\'t stop writing. Doesn\'t look up. "Solid four."',
      ],
    },
    {
      id: 'dra_01_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"...Out of what?"',
      ],
    },
    {
      id: 'dra_01_5',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Ten." He shifts to the next plank. Tap. Tap. Deeper frown. His thumb runs along a seam, and he brings the notebook closer to his face, pencil moving in quick, tight strokes. "Keel is honest timber, not that composite garbage the Wardensea stamps out by the mile. Joints are hand-cut. Somebody cared, once." Tap. He presses his ear to the hull. Closes his eyes. Opens them. Writes. "But the caulking is fifteen years past replacement. Ribs are bowing port-side, two inches off true. And whoever installed the rudder housing..." He trails off. His nostrils flare. He crosses out the four in his notebook and writes below it. "Three and a half. I was being generous."',
      ],
    },
    {
      id: 'dra_01_6',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Hah." You fold your arms. Or try to. The ceiling is too low for folded arms when you\'re this tall, so you just sort of hold your own elbows. "Alright. What\'s a ten look like?"',
      ],
    },
    {
      id: 'dra_01_7',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'awe',
      paragraphs: [
        'He goes still. Pencil frozen mid-stroke. He looks up for the first time, and his expression is the face of a man who has just been asked about God. Quiet. Heavy. Deeply, painfully sincere. "Haven\'t found one."',
      ],
    },
    {
      id: 'dra_01_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'ask_shield',
          text: '"Tell me about the Bulkhead. Where\'d you learn to build like this?"',
          consequence: 'Ask about his past. Where it all started.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 4 },
            { type: 'flag', target: 'dragghen_backstory_01', value: true },
          ],
        },
        {
          id: 'challenge_rating',
          text: '"Rate me."',
          consequence: 'Bold request. Put yourself on the scale.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 5 },
          ],
        },
        {
          id: 'ask_fixes',
          text: '"What needs fixing first? Give me the list."',
          consequence: 'Practical. Get to work.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 3 },
            { type: 'flag', target: 'ship_assessment_done', value: true },
          ],
        },
      ],
    },
    {
      id: 'dra_01_challenge',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'satisfaction',
      paragraphs: [
        'His eyebrows climb half an inch. Then his gaze drops to your boots. Moves to your knees. Your belt. Your chest. Your shoulders. Your jaw. Your horns. Back down. You\'ve been measured by generals, prison wardens, and an Arbiter who could price your organs by looking at your posture. None of them took this long.',
        '"...Five." The pencil goes back to the notebook. "Don\'t let it go to your head."',
      ],
    },
    {
      id: 'dra_01_end',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'By the time you haul yourself back on deck, wincing at the second horn-crack on the same beam, he\'s already started repairs. The starboard railing was loose. Tightened. The galley door hinge was stripped. Replaced. Your anchor chain had two weak links. He\'ll have those done by morning. Nobody asked him to do any of it.',
        '"I just like fixing things," he says when you mention it. "Don\'t make it weird."',
        'He has been aboard for three days. He has fixed fourteen things. He has cooked dinner for the crew every night. He has memorized who doesn\'t eat shellfish and who needs their bread torn instead of sliced. A man who just likes fixing things does not memorize how his crewmates eat.',
        'You catch him on the quarterdeck at sunset, standing still with that little notebook open, pencil hovering. The sky is streaked orange and gold.',
        'He writes something. You lean over his shoulder.',
        '"Sunset: three."',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'dragghen_event_01_complete', value: true },
  ],
};

// ==========================================
// KOVESSE GRENN - Engineer, Broadcaster
// The chaotic one. Rathai genius who got expelled.
// Funny, loud, loyal in the way that hyperactive
// people are loyal - totally and without filter.
// ==========================================

export const kovesseEvent01: StoryScene = {
  id: 'crew_kovesse_01',
  title: 'Signal Strength',
  beats: [
    {
      id: 'kov_01_1',

      paragraphs: [
        'Kovesse\'s "workshop" is a closet-sized corner of the warehouse, and you use the word "corner" generously because it has expanded to consume a quarter of the floor. Stolen Grimoire parts in crates. Coils of copper wire hanging off nails. Something with glass tubes that is absolutely, without question, going to explode. She\'s cross-legged on the floor, four feet of Rathai engineer with her tongue clamped between her teeth, soldering two wires together. Sparks spit off the joint and she doesn\'t blink. You have to turn sideways to fit through the doorframe.',
      ],
    },
    {
      id: 'kov_01_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'Your horn clips a shelf. Something metal crashes behind you. "Is that--" You point at the glass-tube thing. "Is that going to blow up?"',
      ],
    },
    {
      id: 'kov_01_3',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Probably not!" She doesn\'t look up. The soldering iron hisses. "Seventy percent chance it doesn\'t! Which is actually great, that\'s way up from yesterday, yesterday was like fifty-fifty, but I rerouted the capacitor discharge through a secondary coil so now most of the excess energy bleeds off as heat instead of, y\'know--" She snaps her fingers and makes an explosion sound with her mouth. Grins up at you. She has to crane her neck so far back that her whole body tilts. "I\'m building a relay booster! If it works we can broadcast Grimoire signals three times as far, maybe four if the atmospheric conditions are right, which they usually aren\'t but that\'s a LATER problem. If it doesn\'t work--" She waves one hand in a loose circle. "Small fire. Maybe medium. I cleared the flammables. Mostly."',
      ],
    },
    {
      id: 'kov_01_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'encourage_kovesse',
          text: '"Thirty percent explosion chance? Those are the best odds we\'ve had all week. Do it."',
          consequence: 'Encourage the madness. Thirty percent is good enough odds.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 4 },
            { type: 'flag', target: 'grimoire_booster_approved', value: true },
          ],
        },
        {
          id: 'ask_expelled',
          text: '"Is this what got you expelled from Grimoire Tech?"',
          consequence: 'Ask about her past.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 3 },
            { type: 'flag', target: 'kovesse_backstory_01', value: true },
          ],
        },
        {
          id: 'help_kovesse',
          text: '"Hand me those pliers. Seven-foot Oni with steady hands. I\'m your man."',
          consequence: 'Teamwork. Hands-on.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 5 },
          ],
        },
      ],
    },
    {
      id: 'kov_01_end',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'She sets the soldering iron down, wipes her hands on her already-ruined shirt, and looks up at you. All the way up. "Captain, can I tell you something? The Grimoire Academy kicked me out because I hijacked a classified military broadcast frequency. During finals week. On purpose." Her chin lifts. Her ears twitch forward. Zero guilt. All teeth. "I broadcast the exam answers to the entire student body. \'The examination answers are on server four.\' Two hundred students passed overnight. Three professors got investigated. The Dean threw a chair." She snorts. "I\'d do it again tomorrow."',
        'She picks the iron back up. Sparks fly. She doesn\'t flinch. "I like working for someone who doesn\'t bow to rules that exist to keep small people small." She taps her own head with the pliers. "Literally small. And otherwise."',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'kovesse_event_01_complete', value: true },
  ],
};

// ==========================================
// SUULEN VASSERE - Navigator, Ghost
// The mysterious one. Morventhi tunnel-runner,
// 87 years old but looks 25. Appears and
// disappears. Knows things she shouldn't.
// ==========================================

export const suulenEvent01: StoryScene = {
  id: 'crew_suulen_01',
  title: 'The High Ground',
  beats: [
    {
      id: 'suu_01_1',

      paragraphs: [
        'The tallest building on Tavven Shoal is a four-story customs house with no roof access. No ladder. No exterior handholds. Suulen Vassere is sitting on its roof with her legs dangling over a forty-foot drop, bare feet swinging in the wind, silver-blue Morventhi eyes aimed at a horizon line that shimmers with heat. The gale up here is strong enough to snap a flag in half. It doesn\'t move her hair.',
      ],
    },
    {
      id: 'suu_01_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You pull yourself over the roof edge, panting, fingers scraped raw from the drainpipe you just free-climbed because you are too proud to admit you don\'t know how she got up here. "Oi. Do you ever use doors?"',
      ],
    },
    {
      id: 'suu_01_3',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Doors are for people who can\'t see the shortcuts." She doesn\'t turn. Doesn\'t blink. The wind gusts hard enough to make you shift your weight, and she sits in it like it isn\'t there. "Seventeen ships within range right now. Three running dark. No lights, no flags, hulls painted to match the water. Two Wardensea cutters flying merchant colors, but their keels sit six inches too deep for cargo ships. And one fishing trawler that hasn\'t cast a net in weeks." Her head tilts a fraction of an inch. "Smuggler. Running spice, probably."',
      ],
    },
    {
      id: 'suu_01_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You look out at the water. You can see maybe four ships. They all look the same. "Your eyes do that from here?"',
      ],
    },
    {
      id: 'suu_01_5',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Morventhi Spatial Sight." She says it flat. Like naming a limb. "I feel the shape of everything that takes up space. Weight. Density. The volume of air a thing displaces." Her fingers curl against the roof edge, slow, like she\'s gripping something invisible. "A ship dressed as a merchant still has the mass of a warship. Paint and flags don\'t change how much ocean it pushes aside." She turns. Silver-blue eyes on you, unblinking, and for a second it\'s like being looked at by something very old wearing a young woman\'s face. Eighty-seven years. Looks twenty-five. "Why are you up here, Captain?"',
      ],
    },
    {
      id: 'suu_01_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'honest_suulen',
          text: '"I saw you climb and wanted to know how you did it without a ladder."',
          consequence: 'Honest. No agenda.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 4 },
          ],
        },
        {
          id: 'joke_suulen',
          text: '"I was worried about you. A seven-foot Oni checking on his crew. Very touching."',
          consequence: 'Self-deprecating humor. Keep it light.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 3 },
          ],
        },
        {
          id: 'ask_about_sight',
          text: '"Tell me more about what you see. I want to understand your Dominion."',
          consequence: 'Ask about her Dominion. Show genuine interest.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 5 },
            { type: 'resource', target: 'intelligence', value: 2 },
          ],
        },
      ],
    },
    {
      id: 'suu_01_end',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Silence. The wind screams past the roof edge. She pulls her knees to her chest.',
        '"You climb well for someone your size." She says it like that\'s the end of the conversation. Her eyes go back to the horizon. Back to counting invisible ships.',
        'You wait. She doesn\'t add anything.',
      ],
    },
    {
      id: 'suu_01_endb',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"So that\'s it? I climbed a four-story drainpipe and I get a compliment about climbing?"',
      ],
    },
    {
      id: 'suu_01_endc',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"You asked why I\'m up here. I asked why you are. Neither of us answered." The corner of her mouth moves. On anyone else you\'d call it a smile. "I like high places. That\'s all you need for now."',
        'She turns back to the water. Conversation over. You sit on the roof next to her because the drainpipe going down looks worse than the drainpipe coming up, and after a while the silence stops being awkward and starts being something else. She points at a ship on the horizon.',
        '"That one\'s running dark. No lights. Hull painted to match the water." She doesn\'t look at you when she says it. "Come back tomorrow and I\'ll tell you what it was carrying."',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'suulen_event_01_complete', value: true },
  ],
};

// ==========================================
// TESSEK VAYNE - Swordsman, Sight Dominion
// The dramatic one. Names every sword technique.
// Channels Sight Dominion through his blade,
// Redtide. Chasing a rival nobody's heard of.
// ==========================================

export const tessekEvent01: StoryScene = {
  id: 'crew_tessek_01',
  title: 'The Red Line',
  beats: [
    {
      id: 'tes_01_1',
      paragraphs: [
        'Dawn on the foredeck. The sky is barely lit, grey bleeding into gold at the waterline. Tessek Vayne stands alone, barefoot on wet wood, Redtide in a two-handed grip. The blade catches the first sliver of sun and throws it back in a hard line across the deck. He inhales through his nose. Rolls his shoulders. Plants his back foot.',
      ],
    },
    {
      id: 'tes_01_1b',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"Crimson Revelation: First Light."',
        'He swings. It is, in every measurable way, a practice swing. He treats it like a declaration of war.',
      ],
    },
    {
      id: 'tes_01_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You lean against the mast with a cup of something the galley calls coffee. It tastes like bilge water and regret. "Pfft. What in the name of every god are you doing out here?"',
      ],
    },
    {
      id: 'tes_01_3',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        'He doesn\'t break form. Pivots on one heel. Another swing, and this one hums through the air with a sound like torn silk. "Crimson Revelation: Second Dawn." His voice is steady. Measured. He is performing. He knows you\'re watching and he wants you to watch. "Sight Dominion channeled through the blade, Captain. Every cut follows a fault line in the target\'s structure. Every strike reads density and grain and stress point before the edge arrives."',
      ],
    },
    {
      id: 'tes_01_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You take a sip of the terrible coffee. "So you see weak points."',
      ],
    },
    {
      id: 'tes_01_5',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"I see everything." He sheathes Redtide with a flourish that is absolutely unnecessary and points at a supply crate near the bow. His eyes narrow. His chin lifts. Shoulders square. A man about to deliver a verdict. "That crate. Second plank from the left, hairline fracture running diagonal, seventeen inches. Bottom brace bowed outward, quarter inch. Upper right nail rusted clean through the head." He drops his hand. "One solid kick to the left side. The whole thing collapses."',
      ],
    },
    {
      id: 'tes_01_6',

      paragraphs: [
        'You squint at the crate. It looks like a crate. You\'ve seen a lot of crates. This one is aggressively average.',
      ],
    },
    {
      id: 'tes_01_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'ask_garroden',
          text: '"Who taught you this? Where does a technique like Sight Dominion swordplay come from?"',
          consequence: 'Ask about his teacher. Dig into the lineage.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 3 },
            { type: 'flag', target: 'tessek_garroden_mentioned', value: true },
          ],
        },
        {
          id: 'mock_names',
          text: '"That\'s just a diagonal slash with a fancy name, Tessek."',
          consequence: 'Mock the showmanship.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 4 },
          ],
        },
        {
          id: 'ask_demonstrate',
          text: '"Show me on something real. Not a crate. Something that fights back."',
          consequence: 'Challenge him to prove it. Real target.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 5 },
          ],
        },
      ],
    },
    {
      id: 'tes_01_mock',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'angry',
      paragraphs: [
        'His left eye twitches. His grip tightens on Redtide\'s hilt and you can hear the leather creak. You think he might actually take a swing at you, which would be very foolish and very briefly entertaining.',
        '"A diagonal slash." He says it the way a priest says blasphemy. Each word bitten off at the edge. "Captain. The Crimson Revelation series accounts for blade angle, target density, material grain, and structural fault propagation across six material categories. Wood, stone, bone, metal, composite, and flesh." He holds up one finger for each. "It is not. A diagonal. Slash."',
        'He breathes. His shoulders drop an inch. The knuckles loosen. "But I will accept that from a distance it may appear... simple." The corner of his mouth curls. "That is, in fact, the point. Perfection looks effortless."',
      ],
    },
    {
      id: 'tes_01_demonstrate',
      sfx: 'combat_sword',
      paragraphs: [
        'He draws Redtide. Points the tip at a mooring rope twenty paces away, thick as your wrist, crusted with salt. His eyes narrow, irises catching a shimmer like light bending through water. Sight Dominion reading the fibers. Counting the strands. Finding the weak one.',
        'He throws. Redtide leaves his hand in a flat spin, crosses the full length of the deck in a red blur, and catches the rope at a precise point where sun and salt have eaten the core threads thin. It shears clean through with a sound like a snapped whip. The blade buries itself two inches deep in the far railing.',
        'The rope drops in two halves. He walks the twenty paces, unhurried, pulls Redtide free, and runs his thumb along the railing where the point struck. Inspects the nick. Frowns at it.',
      ],
    },
    {
      id: 'tes_01_demonstrateb',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"Clean cut. I\'ll fix the wood."',
      ],
    },
    {
      id: 'tes_01_end',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'grim',
      paragraphs: [
        'He sheathes Redtide. The motion is practiced, smooth, and just a little too slow. He\'s letting the sunrise catch the blade on the way down. Showman to the bone. "Garroden Harsk would have cut that rope before I finished drawing." He adjusts the sheath strap, pulling it one notch tighter. "But I\'ll get there."',
      ],
    },
    {
      id: 'tes_01_end_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Hah. Who the hell is Garroden Harsk?"',
      ],
    },
    {
      id: 'tes_01_end_3',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        'His chin lifts. His eyes go distant, fixed on some invisible point past the horizon. "My rival. He\'s always one step ahead."',
      ],
    },
    {
      id: 'tes_01_end_4',

      paragraphs: [
        'Nobody on the crew has ever heard of Garroden Harsk. You ask around later. Nobody in the port has either.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'tessek_event_01_complete', value: true },
  ],
};

// ==========================================
// CREW EVENT REGISTRY
// ==========================================

export interface CrewEventEntry {
  sceneId: string;
  crewId: string;
  scene: StoryScene;
  requiredFlags?: Record<string, boolean | string | number>;
  minDay?: number;
  priority: number; // Higher = shows first in the list
}

export const crewEventRegistry: CrewEventEntry[] = [
  // Delvessa
  {
    sceneId: 'crew_delvessa_01',
    crewId: 'delvessa',
    scene: delvessaEvent01,
    priority: 10,
  },
  {
    sceneId: 'crew_delvessa_02',
    crewId: 'delvessa',
    scene: delvessaEvent02,
    requiredFlags: { delvessa_event_01_complete: true },
    minDay: 5,
    priority: 9,
  },
  {
    sceneId: 'crew_delvessa_03',
    crewId: 'delvessa',
    scene: delvessaEvent03,
    requiredFlags: { delvessa_event_02_complete: true },
    minDay: 10,
    priority: 8,
  },
  // Dragghen
  {
    sceneId: 'crew_dragghen_01',
    crewId: 'dragghen',
    scene: dragghenEvent01,
    priority: 10,
  },
  {
    sceneId: 'crew_dragghen_02',
    crewId: 'dragghen',
    scene: dragghenEvent02,
    requiredFlags: { dragghen_event_01_complete: true },
    minDay: 5,
    priority: 9,
  },
  {
    sceneId: 'crew_dragghen_03',
    crewId: 'dragghen',
    scene: dragghenEvent03,
    requiredFlags: { dragghen_event_02_complete: true },
    minDay: 10,
    priority: 8,
  },
  // Kovesse
  {
    sceneId: 'crew_kovesse_01',
    crewId: 'kovesse',
    scene: kovesseEvent01,
    priority: 10,
  },
  {
    sceneId: 'crew_kovesse_02',
    crewId: 'kovesse',
    scene: kovesseEvent02,
    requiredFlags: { kovesse_event_01_complete: true },
    minDay: 5,
    priority: 9,
  },
  {
    sceneId: 'crew_kovesse_03',
    crewId: 'kovesse',
    scene: kovesseEvent03,
    requiredFlags: { kovesse_event_02_complete: true },
    minDay: 10,
    priority: 8,
  },
  // Suulen
  {
    sceneId: 'crew_suulen_01',
    crewId: 'suulen',
    scene: suulenEvent01,
    priority: 10,
  },
  {
    sceneId: 'crew_suulen_02',
    crewId: 'suulen',
    scene: suulenEvent02,
    requiredFlags: { suulen_event_01_complete: true },
    minDay: 5,
    priority: 9,
  },
  {
    sceneId: 'crew_suulen_03',
    crewId: 'suulen',
    scene: suulenEvent03,
    requiredFlags: { suulen_event_02_complete: true },
    minDay: 10,
    priority: 8,
  },
  // Tessek
  {
    sceneId: 'crew_tessek_01',
    crewId: 'tessek',
    scene: tessekEvent01,
    priority: 10,
  },
  {
    sceneId: 'crew_tessek_02',
    crewId: 'tessek',
    scene: tessekEvent02,
    requiredFlags: { tessek_event_01_complete: true },
    minDay: 5,
    priority: 9,
  },
  {
    sceneId: 'crew_tessek_03',
    crewId: 'tessek',
    scene: tessekEvent03,
    requiredFlags: { tessek_event_02_complete: true },
    minDay: 10,
    priority: 8,
  },
  // Orren
  {
    sceneId: 'crew_orren_01',
    crewId: 'orren',
    scene: orrenEvent01,
    priority: 10,
  },
  {
    sceneId: 'crew_orren_02',
    crewId: 'orren',
    scene: orrenEvent02,
    requiredFlags: { orren_event_01_complete: true },
    minDay: 5,
    priority: 9,
  },
  {
    sceneId: 'crew_orren_03',
    crewId: 'orren',
    scene: orrenEvent03,
    requiredFlags: { orren_event_02_complete: true },
    minDay: 10,
    priority: 8,
  },
  // Vorreth
  {
    sceneId: 'crew_vorreth_01',
    crewId: 'vorreth',
    scene: vorrethEvent01,
    priority: 10,
  },
  {
    sceneId: 'crew_vorreth_02',
    crewId: 'vorreth',
    scene: vorrethEvent02,
    requiredFlags: { vorreth_event_01_complete: true },
    minDay: 5,
    priority: 9,
  },
  {
    sceneId: 'crew_vorreth_03',
    crewId: 'vorreth',
    scene: vorrethEvent03,
    requiredFlags: { vorreth_event_02_complete: true },
    minDay: 10,
    priority: 8,
  },
  // === Event 04 - Late Game (Act 2+) ===
  {
    sceneId: 'crew_delvessa_04',
    crewId: 'delvessa',
    scene: delvessaEvent04,
    requiredFlags: { delvessa_event_03_complete: true, act2_begun: true },
    minDay: 15,
    priority: 7,
  },
  {
    sceneId: 'crew_dragghen_04',
    crewId: 'dragghen',
    scene: dragghenEvent04,
    requiredFlags: { dragghen_event_03_complete: true, act2_begun: true },
    minDay: 15,
    priority: 7,
  },
  {
    sceneId: 'crew_kovesse_04',
    crewId: 'kovesse',
    scene: kovesseEvent04,
    requiredFlags: { kovesse_event_03_complete: true, act2_begun: true },
    minDay: 15,
    priority: 7,
  },
  {
    sceneId: 'crew_suulen_04',
    crewId: 'suulen',
    scene: suulenEvent04,
    requiredFlags: { suulen_event_03_complete: true, act2_begun: true },
    minDay: 15,
    priority: 7,
  },
  {
    sceneId: 'crew_tessek_04',
    crewId: 'tessek',
    scene: tessekEvent04,
    requiredFlags: { tessek_event_03_complete: true, act2_begun: true },
    minDay: 15,
    priority: 7,
  },
  {
    sceneId: 'crew_orren_04',
    crewId: 'orren',
    scene: orrenEvent04,
    requiredFlags: { orren_event_03_complete: true, act2_begun: true },
    minDay: 15,
    priority: 7,
  },
  {
    sceneId: 'crew_vorreth_04',
    crewId: 'vorreth',
    scene: vorrethEvent04,
    requiredFlags: { vorreth_event_03_complete: true, act2_begun: true },
    minDay: 15,
    priority: 7,
  },
  // === Delvessa Romance Chain ===
  {
    sceneId: 'delvessa_romance_01',
    crewId: 'delvessa',
    scene: delvessaRomance01,
    requiredFlags: { delvessa_event_01_complete: true },
    minDay: 8,
    priority: 6,
  },
  {
    sceneId: 'delvessa_romance_02',
    crewId: 'delvessa',
    scene: delvessaRomance02,
    requiredFlags: { delvessa_romance_1: true },
    minDay: 12,
    priority: 5,
  },
  {
    sceneId: 'delvessa_romance_03',
    crewId: 'delvessa',
    scene: delvessaRomance03,
    requiredFlags: { delvessa_romance_2: true },
    minDay: 16,
    priority: 4,
  },
  {
    sceneId: 'delvessa_romance_04',
    crewId: 'delvessa',
    scene: delvessaRomance04,
    requiredFlags: { delvessa_romance_3: true, act2_begun: true },
    minDay: 20,
    priority: 3,
  },
];

/**
 * Get available crew events for the current game state
 */
export function getAvailableCrewEvents(
  crewId: string,
  flags: Record<string, boolean | number | string>,
  dayCount: number,
): CrewEventEntry[] {
  return crewEventRegistry
    .filter((entry) => {
      // Must match crew
      if (entry.crewId !== crewId) return false;

      // Must not be completed -- check by scene onComplete flags
      const scene = entry.scene;
      if (scene.onComplete) {
        for (const effect of scene.onComplete) {
          if (effect.type === 'flag' && typeof effect.target === 'string') {
            if (flags[effect.target]) return false;
          }
        }
      }

      // Day check
      if (entry.minDay && dayCount < entry.minDay) return false;

      // Required flags
      if (entry.requiredFlags) {
        for (const [key, required] of Object.entries(entry.requiredFlags)) {
          if (typeof required === 'boolean') {
            if (required && !flags[key]) return false;
            if (!required && flags[key]) return false;
          } else {
            if (flags[key] !== required) return false;
          }
        }
      }

      return true;
    })
    .sort((a, b) => b.priority - a.priority);
}
