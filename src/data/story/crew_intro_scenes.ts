import { StoryScene } from '../../types/game';

// ==========================================
// CREW INTRO INTERRUPT SCENES
// Auto-fire in Act 1 after Tavven conquest.
// These establish each crew member as a person
// before the player has time to take them for granted.
//
// Pattern for dual-ending beats:
//   Each choice sets a scene-local path flag (string value).
//   Ending beats use requireFlagValue to gate on that path.
// ==========================================

// ==========================================
// DELVESSA GHAL
// ==========================================

export const delvessaIntro01: StoryScene = {
  id: 'crew_delvessa_intro_01',
  title: 'The Work',
  currentBeat: 0,
  beats: [
    {
      id: 'del_i01_1',
      paragraphs: [
        'Below deck, in the space that is becoming her corner by habit: a sea chart, three ledgers, and Delvessa Ghal working through something with the focused silence of a person who does not consider focus a performance.',
        'She does not look up when you enter. She is tracking Wardensea patrol patterns: dates, intervals, apparent routes. The chart has seventeen annotation marks in her handwriting, each the size of a fruit fly.',
      ],
    },
    {
      id: 'del_i01_2',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Patrol cycle is twenty-two days," she says, without preamble, to the chart. "Second Division rotates in from Kingsrun on the seventh. Third arrives from Volneth on the fifteenth. There is an eight-day window where neither is at full strength in the central channels." She taps the gap. "That is when we move."',
      ],
    },
    {
      id: 'del_i01_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: ['"This good for all three months?"'],
    },
    {
      id: 'del_i01_4',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"For six weeks. After that, the cycles shift when they realize we are using them." She pauses. The quill lifts from the page. "They already know someone is using them, actually. This annotation here--" she points to a mark on the fourteenth "--does not match the intelligence we have. The window closes a day earlier. I miscalculated."',
        'She says it without apology, without performance. A statement of fact, recorded.',
      ],
    },
    {
      id: 'del_i01_choice',
      paragraphs: [''],
      choices: [
        {
          id: 'del_i01_correct',
          text: '"Show me the source data. We can reconstruct the right window."',
          consequence: 'You are not interested in the error. You want the fix.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 3 },
            { type: 'flag', target: 'delvessa_intro_01_seen', value: true },
          ],
        },
        {
          id: 'del_i01_approve',
          text: '"The rest is solid. Good work."',
          consequence: 'You saw what she built, not what she missed.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 1 },
            { type: 'flag', target: 'delvessa_intro_01_seen', value: true },
            { type: 'flag_increment', target: 'delvessa_approval_count', value: 1 },
          ],
        },
      ],
    },
    {
      id: 'del_i01_end',
      paragraphs: [
        'She returns to the chart. The quill moves again, but slower. The annotation error gets crossed out and rewritten in the margin. She does not thank you for either response.',
        'The work continues. You are, for now, part of its perimeter.',
      ],
    },
  ],
};

export const delvessaIntro02: StoryScene = {
  id: 'crew_delvessa_intro_02',
  title: 'The Other Chart',
  currentBeat: 0,
  beats: [
    {
      id: 'del_i02_1',
      paragraphs: [
        'Deep into the night watch: the ship settles into its quiet creaks and the only light below comes from Delvessa\'s corner. Tonight the chart on her table is not a Wardensea patrol grid. It is a coastal survey. Old. Kolmari cartography, pencil marks in a different hand than hers, faded to near-nothing. She is tracing something with one finger, not writing. Just following.',
      ],
    },
    {
      id: 'del_i02_2',
      paragraphs: [
        'She hears you on the ladder. Her hand does not move. She does not fold the chart away.',
      ],
    },
    {
      id: 'del_i02_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"My father made this one," she says. Not to you, quite. To the chart. "He was a surveyor. The Confederation hired him to map the western shelf. He was methodical. Very good at finding what others missed."',
        'A pause. "He was also very good at not coming home on time."',
      ],
    },
    {
      id: 'del_i02_choice',
      paragraphs: [''],
      choices: [
        {
          id: 'del_i02_ask',
          text: '"What happened to him?"',
          consequence: 'She may or may not answer.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 3 },
            { type: 'flag', target: 'delvessa_intro_02_seen', value: true },
            { type: 'flag', target: 'scene_del_i02_path', value: 'asked' },
          ],
        },
        {
          id: 'del_i02_leave',
          text: 'Leave her with it.',
          consequence: 'Some things are not yours to ask about.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 2 },
            { type: 'flag', target: 'delvessa_intro_02_seen', value: true },
            { type: 'flag', target: 'scene_del_i02_path', value: 'left' },
          ],
        },
      ],
    },
    {
      id: 'del_i02_end_ask',
      requireFlagValue: { flag: 'scene_del_i02_path', value: 'asked' },
      paragraphs: [
        '"Retired," she says. "Kolmari pension. He measures his garden now. One point three hectares, exactly. He sent me the dimensions in his last letter." She folds the chart, carefully. "He was always measuring things. I suppose that came down to me."',
        'She looks up for the first time. Something crosses her face that is not in her professional vocabulary.',
        '"You should sleep, Captain. The window we discussed closes in six weeks."',
      ],
    },
    {
      id: 'del_i02_end_leave',
      requireFlagValue: { flag: 'scene_del_i02_path', value: 'left' },
      paragraphs: [
        'She hears you go back up the ladder. The tracing continues for another hour, visible through the hatch gap as a single moving light in the dark.',
      ],
    },
  ],
};

// ==========================================
// DRAGGHEN ORISS
// ==========================================

export const dragghenIntro01: StoryScene = {
  id: 'crew_dragghen_intro_01',
  title: 'The Patch',
  currentBeat: 0,
  beats: [
    {
      id: 'drag_i01_1',
      paragraphs: [
        'Port-side hull, just above the waterline: Dragghen up to his elbows in the planking where the prison transport\'s ram left a stress fracture three days ago. He has been at it since first light. His shirt is somewhere else. The planks around him are laid out in order of replacement priority, a taxonomy only he can read.',
      ],
    },
    {
      id: 'drag_i01_2',
      speaker: 'dragghen',
      speakerName: 'Dragghen Oriss',
      paragraphs: [
        '"She\'s been split at the knee-joint since before she was ours," he says, not looking up, his voice carrying the particular Gorundai flatness that means he is concentrating. "Previous owner patched it with the wrong grain. Cross-grain, can you imagine. Held for maybe a year. Cracking now." He pushes on a plank and it gives two millimeters. He grunts. "Been giving since the crossing."',
      ],
    },
    {
      id: 'drag_i01_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: ['"How long to fix it properly?"'],
    },
    {
      id: 'drag_i01_4',
      speaker: 'dragghen',
      speakerName: 'Dragghen Oriss',
      paragraphs: [
        '"Day and a half if I have the timber I need. Four days if I have to source it locally." He sits back on his heels. "She\'s a good ship, though. Older than she looks. Gorundai construction in the original frame -- you can see it in the joint work. Whoever built her knew what they were doing." He almost sounds surprised.',
      ],
    },
    {
      id: 'drag_i01_choice',
      paragraphs: [''],
      choices: [
        {
          id: 'drag_i01_help',
          text: '[Pick up the nearest tool and start working.] You do not ask what needs doing.',
          consequence: 'Some conversations happen through action.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 4 },
            { type: 'flag', target: 'dragghen_intro_01_seen', value: true },
            { type: 'flag', target: 'scene_drag_i01_path', value: 'helped' },
          ],
        },
        {
          id: 'drag_i01_ask',
          text: '"What do you need from Tavven?"',
          consequence: 'Get him what he needs.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 2 },
            { type: 'flag', target: 'dragghen_intro_01_seen', value: true },
            { type: 'flag', target: 'scene_drag_i01_path', value: 'asked' },
          ],
        },
      ],
    },
    {
      id: 'drag_i01_end_help',
      requireFlagValue: { flag: 'scene_drag_i01_path', value: 'helped' },
      paragraphs: [
        'You pick up the mallet. Find the angle he was using. Begin.',
        'Dragghen watches for four seconds -- which, for Dragghen, is a significant pause -- and then turns back to his own work without comment.',
        'You work side by side for the next hour. He does not explain what he is doing. He does not have to.',
      ],
    },
    {
      id: 'drag_i01_end_ask',
      requireFlagValue: { flag: 'scene_drag_i01_path', value: 'asked' },
      paragraphs: [
        '"Two good spars and green caulk if they have it," he says. "White if not." He goes back to the planking without watching whether you leave.',
        'You get him what he asked for. When you return, he has already pulled three boards. He takes the materials without looking up. Works faster after that.',
      ],
    },
  ],
};

export const dragghenIntro02: StoryScene = {
  id: 'crew_dragghen_intro_02',
  title: 'The Gorundai Question',
  currentBeat: 0,
  beats: [
    {
      id: 'drag_i02_1',
      paragraphs: [
        'Evening. Dragghen has been carrying something for days -- you have seen it in the way he goes quiet when the others talk about your Dominion, the way he looks at your horns when he thinks you are not watching.',
        'He catches you on the deck alone. He scratches the back of his neck. The Gorundai tell, when they want to say something but have not decided yet whether to say it.',
      ],
    },
    {
      id: 'drag_i02_2',
      speaker: 'dragghen',
      speakerName: 'Dragghen Oriss',
      paragraphs: ['"You don\'t have to answer this."'],
    },
    {
      id: 'drag_i02_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: ['"Ask it anyway."'],
    },
    {
      id: 'drag_i02_4',
      speaker: 'dragghen',
      speakerName: 'Dragghen Oriss',
      paragraphs: [
        '"When you fought those soldiers at the docks -- the ones I thought were going to kill you -- you took hits that would have put a Gorundai down." He is direct, now that he has started. "I want to know if you can die. Not because I want you to. Because I need to know whether to get in front of you or stay behind you."',
      ],
    },
    {
      id: 'drag_i02_choice',
      paragraphs: [''],
      choices: [
        {
          id: 'drag_i02_honest',
          text: '"Yes. I can die. It just takes more."',
          consequence: 'The truth, without softening it.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 3 },
            { type: 'flag', target: 'dragghen_intro_02_seen', value: true },
            { type: 'flag', target: 'scene_drag_i02_path', value: 'honest' },
          ],
        },
        {
          id: 'drag_i02_deflect',
          text: '"Stay behind me. That is what I hired you for."',
          consequence: 'Answer that is also a deflection.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 1 },
            { type: 'flag', target: 'dragghen_intro_02_seen', value: true },
            { type: 'flag', target: 'scene_drag_i02_path', value: 'deflect' },
          ],
        },
      ],
    },
    {
      id: 'drag_i02_end_honest',
      requireFlagValue: { flag: 'scene_drag_i02_path', value: 'honest' },
      paragraphs: [
        'Dragghen nods. Just once. The thing he was carrying goes somewhere it can stay.',
        '"Get in front," he says, processing this. "But not all the way. I\'ll mind the gap."',
        'He goes back to his work. You notice, from that point on, he stops watching the hits land on you with the expression of a man watching a bridge decide whether to collapse.',
      ],
    },
    {
      id: 'drag_i02_end_deflect',
      requireFlagValue: { flag: 'scene_drag_i02_path', value: 'deflect' },
      paragraphs: [
        'He takes that without protest. Nods once.',
        '"Fair enough."',
        'He goes below. The question has not left his face. He will find the answer eventually, in his own way. Gorundai usually do.',
      ],
    },
  ],
};

// ==========================================
// SUULEN VAREK
// ==========================================

export const suulenIntro01: StoryScene = {
  id: 'crew_suulen_intro_01',
  title: 'The Dead Zone',
  currentBeat: 0,
  beats: [
    {
      id: 'sul_i01_1',
      paragraphs: [
        'She is at the navigation table late, when the lamp oil is burning low and everyone else is asleep or gambling in the hold. The chart in front of her is a standard Bastion Sea survey, except for a section near Rotstone that she has circled and unmarked three times.',
        'Her Sight is active. You can tell because the air near her hands has a faint texture -- not visible exactly, more like the quality of light changes.',
      ],
    },
    {
      id: 'sul_i01_2',
      speaker: 'suulen',
      speakerName: 'Suulen Varek',
      paragraphs: [
        '"Here." She does not look up, but she knows you are there. Morventhi always know. "The chart says forty fathoms. My Sight says the bottom is wrong. Not deeper or shallower. Wrong. Like the chart was drawn from a place that no longer exists."',
      ],
    },
    {
      id: 'sul_i01_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: ['"How old is the chart?"'],
    },
    {
      id: 'sul_i01_4',
      speaker: 'suulen',
      speakerName: 'Suulen Varek',
      paragraphs: [
        '"Forty years. Wardensea survey during the first expansion." Her finger traces the circle. "The sea moves. Currents redirect. Shelves shift. But this is different. This is a space that does not want to be charted." She is utterly calm describing a navigational anomaly the way most people describe cloud cover. "I am telling you because if we ever sail there, we go slow."',
      ],
    },
    {
      id: 'sul_i01_choice',
      paragraphs: [''],
      choices: [
        {
          id: 'sul_i01_ask_sight',
          text: '"What does your Sight actually see there? Describe it."',
          consequence: 'You want to understand how she reads the world.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 3 },
            { type: 'flag', target: 'suulen_intro_01_seen', value: true },
            { type: 'flag', target: 'scene_sul_i01_path', value: 'sight' },
          ],
        },
        {
          id: 'sul_i01_note',
          text: '"Noted. Mark it on the operational chart."',
          consequence: 'You heard her. That is enough.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 2 },
            { type: 'flag', target: 'suulen_intro_01_seen', value: true },
            { type: 'flag', target: 'scene_sul_i01_path', value: 'noted' },
          ],
        },
      ],
    },
    {
      id: 'sul_i01_end_ask',
      requireFlagValue: { flag: 'scene_sul_i01_path', value: 'sight' },
      paragraphs: [
        '"Water under Sight is not shapes," she says. "It is pressures. Intentions. Most water wants to go somewhere -- to move toward something, away from something. This water does not want anything." She pauses. "When I was training in the Undersprawl, my teacher called it a dead zone. Not dangerous. Just empty in a way that has no explanation."',
        'She looks at you for the first time in this conversation. Her eyes are the grey of the Morventhi coast at low tide.',
        '"I have only seen two others. Both had history."',
      ],
    },
    {
      id: 'sul_i01_end_note',
      requireFlagValue: { flag: 'scene_sul_i01_path', value: 'noted' },
      paragraphs: [
        'She marks it. One small annotation in her tight, precise script: "Verify: floor integrity. Do not approach fast."',
        'She closes the chart and opens another. The dead zone is documented. Her night continues.',
      ],
    },
  ],
};

export const suulenIntro02: StoryScene = {
  id: 'crew_suulen_intro_02',
  title: 'The Shore',
  currentBeat: 0,
  beats: [
    {
      id: 'sul_i02_1',
      paragraphs: [
        'Before dawn. The ship is the quietest it gets: the watch change two hours away, the sea flat enough that the planks barely talk. Suulen is at the bow rail, watching a strip of coast just emerging from the dark.',
        'She is not doing anything. Not charting, not calibrating. Just watching.',
      ],
    },
    {
      id: 'sul_i02_2',
      paragraphs: [
        'The coast is a Morventhi settlement, one of the small ones: three lights, a jetty, fishing skiffs. You have sailed past it twice. She has not mentioned it.',
      ],
    },
    {
      id: 'sul_i02_choice',
      paragraphs: [''],
      choices: [
        {
          id: 'sul_i02_sit',
          text: '[Sit with her. Say nothing.]',
          consequence: 'Presence is sometimes enough.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 4 },
            { type: 'flag', target: 'suulen_intro_02_seen', value: true },
            { type: 'flag', target: 'scene_sul_i02_path', value: 'sit' },
          ],
        },
        {
          id: 'sul_i02_ask',
          text: '"Do you know someone there?"',
          consequence: 'Ask directly.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 2 },
            { type: 'flag', target: 'suulen_intro_02_seen', value: true },
            { type: 'flag', target: 'scene_sul_i02_path', value: 'asked' },
          ],
        },
      ],
    },
    {
      id: 'sul_i02_end_sit',
      requireFlagValue: { flag: 'scene_sul_i02_path', value: 'sit' },
      paragraphs: [
        'You sit beside her on the rail. Not close. Just present.',
        'She does not move. Does not speak. The coast slides slowly past as the ship continues south, and after a while the three lights disappear behind a headland.',
        'Suulen stays at the rail for another ten minutes, watching the dark where the lights had been. Then she pushes off and goes below without a word.',
        'Later you realize: she never looked at you once. But when she passed, her shoulder brushed yours. Deliberately, you think.',
      ],
    },
    {
      id: 'sul_i02_end_ask',
      requireFlagValue: { flag: 'scene_sul_i02_path', value: 'asked' },
      paragraphs: [
        '"Knew," she says. "My first crew. Before the Undersprawl." A pause. "Most of them moved north. I heard three are still there."',
        'She does not continue. The coast keeps moving.',
        '"You do not need to feel sympathy," she adds, flat and unhurried. "It is not a sad story. It is just an old one."',
        'She watches until the lights disappear, then goes below to start the day\'s navigation work.',
      ],
    },
  ],
};
