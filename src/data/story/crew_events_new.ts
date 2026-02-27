import { StoryScene } from '../../types/game';

// ==========================================
// DRAGGHEN KOLVE - Event 02
// "Forty Names"
// The shipyard foreman's guilt. Forty workers
// he didn't free. A list carved in driftwood.
// ==========================================

export const dragghenEvent02: StoryScene = {
  id: 'crew_dragghen_02',
  title: 'Forty Names',
  beats: [
    {
      id: 'dra_02_1',

      paragraphs: [
        'Late evening. Deck quiet. Dragghen sits alone near the stern, hunched over a piece of driftwood the size of his forearm. On a six-foot-eight Gorundai, that means it\'s closer to a small plank. He\'s working a shipwright\'s awl into the grain, the tool lost between fingers thick as mooring rope. Each stroke cuts clean. Controlled. His hands could crush a deck plank but they hold the awl like a scalpel. He\'s not building anything. He\'s writing.',
      ],
    },
    {
      id: 'dra_02_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You drop down next to him. The crate groans under the weight like it\'s filing a complaint. "Writing a novel, Dragghen?"',
      ],
    },
    {
      id: 'dra_02_3',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'grim',
      paragraphs: [
        '"Names." He holds the driftwood up. Forty names in tight Gorundai script, running edge to edge. Some are barely legible, crammed into the wood wherever they\'d fit. "Workers. My crew at the Kolmari shipyard. Every one of them."',
        'He sets it down on his knee. His hands go dead still. Massive hands. Hands that bend iron. Sitting there on his thigh like sleeping animals.',
        '"Nine years I built warships for the Kolmari. Good ships. I rated my own work a consistent four." He turns the driftwood over. Runs his thumb along the edge. "End of year nine, the Kolmari restructured. Costs too high. Forty workers, my people, sold as debt-labor to the mining operations. Contracts they never signed. Debts they never owed." He sets the driftwood down too carefully, the way you handle something when your hands want to break it. "The Kolmari called it \'workforce reallocation.\'"',
      ],
    },
    {
      id: 'dra_02_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"And you walked."',
      ],
    },
    {
      id: 'dra_02_5',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Walked. Took Bulkhead off the last hull I built. Didn\'t look back." His grip tightens on the awl. The wood in his other hand creaks. "Didn\'t fight for them either. That\'s the part that sticks."',
      ],
    },
    {
      id: 'dra_02_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'dra_02_promise',
          text: '"We\'ll find them. Every name on that list."',
          consequence: 'Make a promise. Every name on that list.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'flag', target: 'dragghen_worker_promise', value: true },
          ],
        },
        {
          id: 'dra_02_why',
          text: '"Why didn\'t you fight?"',
          consequence: 'Honest question. Go straight at the guilt.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 4 },
          ],
        },
        {
          id: 'dra_02_guilt',
          text: '"Guilt doesn\'t fix things, Dragghen. Never has."',
          consequence: 'Blunt. Cut through the self-pity.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'dra_02_6',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Kh." He runs his thumb across the carved names. Forty grooves catching on his calluses. "Because they had two hundred guards and I had a shield. The math was a one. I don\'t fight ones. I survive them."',
        'Silence. The ocean fills it. Waves against the hull, salt wind, the creak of timber.',
        '"Nn." He stares at the driftwood for a long time. Then, slowly: "But a ship that can\'t be sunk might." He blinks. Turns the wood over in his hands like he\'s hearing it for the first time. "Solid answer. Five."',
      ],
    },
    {
      id: 'dra_02_end',

      paragraphs: [
        'He pockets the driftwood. Stands. Three hundred and forty pounds shifting upright, and the deck groans like a living thing beneath him. He rolls his shoulders, cracks his knuckles one hand at a time, and walks back toward the hull he\'s been reinforcing.',
        'The hammer starts up again. Faster. Heavier. Each strike landing like he means it personally. He\'s not just repairing anymore. He\'s building toward something.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'dragghen_event_02_complete', value: true },
  ],
};

// ==========================================
// DRAGGHEN KOLVE - Event 03
// "Bulkhead"
// The ship takes damage. Dragghen won't stop
// repairing it. The reason why breaks him open.
// ==========================================

export const dragghenEvent03: StoryScene = {
  id: 'crew_dragghen_03',
  title: 'Bulkhead',
  beats: [
    {
      id: 'dra_03_1',

      paragraphs: [
        'The ship took serious damage. Storm, combat, doesn\'t matter which. What matters is the three-foot gash in the lower hull and the fact that Dragghen has been awake for three days straight repairing it. Alone. He refused help from the first crew member who offered. Shook his head. Then the second. Didn\'t look up. Then Kovesse, who tried to sneak in with a welding torch and got physically lifted out of the hold like a four-foot-one sack of indignant Rathai. She kicked twice. He didn\'t notice.',
      ],
    },
    {
      id: 'dra_03_2',

      paragraphs: [
        'You find him mid-repair. Hands shaking. Sweat running down green-grey skin in sheets, dripping off his jaw. He\'s holding a hull plate in place with one arm while hammering with the other, and the plate keeps slipping because his fingers won\'t close right anymore. Three days without sleep. His body is screaming at him and he\'s ignoring it the way he ignores everything that isn\'t the job.',
      ],
    },
    {
      id: 'dra_03_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Three days, Dragghen." You lean against the bulkhead and cross your arms. "You look like a corpse that hasn\'t gotten the memo."',
      ],
    },
    {
      id: 'dra_03_4',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Hngh." He doesn\'t stop hammering. Misses the nail head. Hits it again. "My hands. My fault if it leaks." The rhythm is wrong, staggered, his whole body swaying with each swing. "Go away, Captain."',
      ],
    },
    {
      id: 'dra_03_5',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"No."',
      ],
    },
    {
      id: 'dra_03_6',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      expression: 'angry',
      paragraphs: [
        'The hammer stops. His arm drops. He leans his forehead against the hull plate and just stays there, three hundred and forty pounds held upright by nothing but the thing he\'s trying to fix. His breathing is ragged. His shoulders are shaking.',
        '"The last ship I built for the Kolmari. The big one." His voice comes out flat, pressed thin by exhaustion. "Bulkhead came from that hull." He reaches over and lays his palm against the ninety-pound keel plate shield propped against the wall. Holds it there. "Triple-layered hull. Distributed ballast. Reinforced keel. I designed that ship to be unsinkable. Rated it a six." He swallows. "Highest number I\'ve ever given anything."',
        'His voice cracks. Not much. Just enough to hear the fault line underneath.',
        '"The Kolmari used it as a prison transport." He pushes the words out like they cost him something. "My ship. My unsinkable ship. Carrying people in chains below the waterline. My workers. Some of them." His fingers press flat against the hull plate until the tips go bloodless. "I don\'t know how many." He pushes off the wall. Turns. His eyes are red and wet, furious. "So no. I don\'t let other people touch ships I\'m responsible for. Because the last time I built something perfect, it became a cage."',
      ],
    },
    {
      id: 'dra_03_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'dra_03_order',
          text: '"You\'re no good to anyone dead on your feet. Sleep. That\'s an order."',
          consequence: 'Captain\'s authority. Order him to rest.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 5 },
            { type: 'flag', target: 'dragghen_trust_deep', value: true },
          ],
        },
        {
          id: 'dra_03_help',
          text: 'Pick up a hammer. Start working on the next plate. Say nothing.',
          consequence: 'Side by side. Work next to him. Say nothing.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 4 },
          ],
        },
        {
          id: 'dra_03_truth',
          text: '"The ship isn\'t the workers, Dragghen. It\'ll survive without your guilt driving every nail."',
          consequence: 'Hard truth. Separate the guilt from the work.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'dragghen', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'dra_03_7',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'He stares at you. Red-rimmed eyes sunk deep in a face like carved granite. His throat works. A muscle in his cheek cracks. Holds.',
        '"...Rate that order?"',
      ],
    },
    {
      id: 'dra_03_8',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Ten."',
      ],
    },
    {
      id: 'dra_03_9',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'Long pause. The ship groans around them both. Salt air. Sawdust. The creak of cooling timber.',
        '"Nn." He closes his eyes. Opens them. "Fair."',
      ],
    },
    {
      id: 'dra_03_end',

      paragraphs: [
        'He sleeps. Doesn\'t walk to a bunk, doesn\'t argue, doesn\'t negotiate. Just slides down the hull and is out, Bulkhead across his lap, ninety pounds of keel plate draped over his thighs like a steel blanket. The repair holds through the night. The hull doesn\'t leak.',
        'Twelve hours later he wakes up and finds a scrap of paper tucked into Bulkhead\'s grip strap. Karyudon\'s handwriting, scratched out in charcoal. Two words: "Solid six."',
        'He reads it twice. Folds it with fingers that have stopped shaking. Slips it into his coat pocket next to the driftwood with forty names.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'dragghen_event_03_complete', value: true },
  ],
};

// ==========================================
// KOVESSE GRENN - Event 02
// "Old Frequencies"
// The Academy catches up. Someone wants
// their prodigy back. Or punished.
// ==========================================

export const kovesseEvent02: StoryScene = {
  id: 'crew_kovesse_02',
  title: 'Old Frequencies',
  beats: [
    {
      id: 'kov_02_1',

      paragraphs: [
        'Kovesse is pacing.',
        'That\'s wrong. Kovesse doesn\'t pace. She vibrates. She tinkers. She talks at double speed while doing three things with her hands. But she doesn\'t pace. Pacing means the engine in her skull hit a wall it can\'t drill through.',
        'There\'s a message canister on her workbench. Grimoire Academy seal, interlinked gears stamped in wax the color of a week-old bruise.',
      ],
    },
    {
      id: 'kov_02_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Oi." You lean in the doorway. "You going to open that or wear a trench in my deck?"',
      ],
    },
    {
      id: 'kov_02_3',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Already opened it read it read it again considered eating it." No pauses. No breath. She stops pacing. Four feet and one inch of furious Rathai, tail rigid, ears pinned flat, both hands gripping the edge of the workbench hard enough to bend the tin lip. "It\'s from Professor Tannick. Signal Theory department. He\'s the one who signed my expulsion papers."',
        'Her nostrils flare.',
        '"He wants me back."',
      ],
    },
    {
      id: 'kov_02_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Hah." You cross your arms. "Back as in \'come teach\' or back as in \'come to this dark room where nothing bad will happen\'?"',
      ],
    },
    {
      id: 'kov_02_5',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Back as in \'the Academy is under Kolmari funding review and they need results.\' Tannick says if I submit three original designs under his name he\'ll reinstate my credentials full pardon record wiped clean the whole-- pshh." She picks up the canister and squeezes until the wax seal pops and crumbles between her fingers. "He expelled me in front of two hundred people Captain. Stood up in front of the whole board and called me \'a liability to institutional integrity.\' Two hundred faces watching me walk out."',
        'Her voice doesn\'t shake. It gets faster. That\'s worse.',
        '"And now. NOW. He needs my work to save his funding." She\'s breathing hard through her nose, ears pinned flat. "The best part? The three designs he wants? I already built two of them. For you."',
      ],
    },
    {
      id: 'kov_02_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'kov_02_burn',
          text: '"Write him back. Two words: \'Build them yourself.\' Sign it with our flag."',
          consequence: 'Defiant. Burn the bridge with the Academy.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 5 },
            { type: 'flag', target: 'kovesse_academy_rejected', value: true },
          ],
        },
        {
          id: 'kov_02_consider',
          text: '"Credentials could be useful. Is there a version of this where you get what you\'re owed without giving him anything?"',
          consequence: 'Strategic. Look for leverage in the offer.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 4 },
            { type: 'flag', target: 'kovesse_academy_leverage', value: true },
          ],
        },
        {
          id: 'kov_02_your_call',
          text: '"This is your history, Kovesse. Your call. I\'ll back whatever you decide."',
          consequence: 'Trust her to choose. Her history, her call.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 3 },
            { type: 'flag', target: 'kovesse_backstory_02', value: true },
          ],
        },
      ],
    },
    {
      id: 'kov_02_6',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'She stares at the crumpled canister. Then she drops it, pulls a wire coil from her belt, and jams one end between her back teeth. Bites down. Bends. The wire squeals against enamel.',
        '"Tch. You know what Tannick never understood? I didn\'t broadcast those exam answers to cheat. The exam was rigged. Three questions based on research the Academy classified. Research we were supposed to \'discover independently.\'" She makes air quotes with one hand while her teeth keep working the wire. "They weren\'t testing intelligence. They were testing obedience. And I failed. On purpose."',
      ],
    },
    {
      id: 'kov_02_end',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'She bites through the wire. KRNK. Spits the end into a scrap bin three feet away without looking. It lands.',
        '"I don\'t need his pardon, Captain. I need a workshop and someone who doesn\'t flinch when I hand them something dangerous." She holds up the wire, already shaped into a component you\'ve never seen before. "Harmonic filter. Doubles the range on our communication array. Tannick doesn\'t even know this frequency exists."',
        'She\'s already working on the next thing. Hands moving, mind moving, everything moving. The canister is behind her. The past is scrap. She\'s already stripped it for parts.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'kovesse_event_02_complete', value: true },
  ],
};

// ==========================================
// KOVESSE GRENN - Event 03
// "The Thing That Works"
// She builds something important. A real
// moment about why she follows Karyudon.
// ==========================================

export const kovesseEvent03: StoryScene = {
  id: 'crew_kovesse_03',
  title: 'The Thing That Works',
  beats: [
    {
      id: 'kov_03_1',

      paragraphs: [
        'Thirty-one hours. You know because Dragghen has been leaving provisions outside the workshop door and counting the empties. Three plates gone. She\'s alive. The sounds from inside cycle between welding sparks, Rathai profanity, and what might be singing, if singing involved that many consonants.',
        'You push the door open. The workshop looks like someone detonated a clock factory. Gears, wire coils, solder blobs, glass shards. But in the center, on a cleared workbench, sits something new. Bread-loaf sized. Copper wire wrapped around glass components in patterns that make your eyes slide. It hums at a frequency you feel in your back teeth.',
      ],
    },
    {
      id: 'kov_03_2',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'She\'s sitting on the floor next to it. Goggles shoved up into her hair. Grease on both cheeks, one ear, and somehow the back of her neck. Her eyes are red-rimmed, pupils blown wide, and she\'s chewing on her lower lip.',
        'Kovesse Grenn is nervous. That\'s wrong. That\'s never happened before.',
        '"Captain." Her tail is curled tight against her leg. "I built something. And I need you to understand what it is before I turn it on."',
      ],
    },
    {
      id: 'kov_03_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Last time you said that, my eyebrows took a week to grow back. But go ahead."',
      ],
    },
    {
      id: 'kov_03_4',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"It\'s a Grimoire Pulse Mapper. Wide-band. It reads every active Grimoire signal in range, military, civilian, encrypted, doesn\'t matter, and maps their location in real time." She stands up. She barely reaches your chest but right now she\'s talking like she\'s eight feet tall. "Nobody has one. The Academy theorized it was possible. They couldn\'t build it. I did."',
        'She pauses. Wipes her hands on her already-ruined shirt.',
        '"This changes the war, Captain. Whoever has this can see where every Grimoire-equipped ship is. Every garrison with a broadcast tower. Every spy with a signal device. The Wardensea uses Grimoire communication for everything. With this, you\'d see them coming before they see themselves."',
      ],
    },
    {
      id: 'kov_03_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'kov_03_proud',
          text: '"Kovesse. You just handed me the eyes of a god and you\'re standing there looking worried I won\'t like it."',
          consequence: 'Reassure. It matters.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 5 },
            { type: 'flag', target: 'kovesse_trust_deep', value: true },
          ],
        },
        {
          id: 'kov_03_practical',
          text: '"What do you need to finish it? Resources, materials, time, name it."',
          consequence: 'Practical. What do you need?',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 4 },
            { type: 'flag', target: 'grimoire_mapper_funded', value: true },
            { type: 'resource', target: 'intelligence', value: 3 },
          ],
        },
        {
          id: 'kov_03_risk',
          text: '"Who else could build one if they knew it was possible?"',
          consequence: 'The strategic question.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'kovesse', value: 3 },
            { type: 'flag', target: 'grimoire_mapper_secrecy', value: true },
          ],
        },
      ],
    },
    {
      id: 'kov_03_5',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'She\'s quiet. Kovesse Grenn, quiet. That might be the rarest thing in the Bastion Sea.',
        '"Captain. Can I tell you something stupid?"',
        '"Everything you say is at least a little stupid. Go ahead."',
        '"The Academy expelled me because I broke their rules. You hired me because I break rules." She touches the Pulse Mapper. The hum changes pitch slightly under her fingers. "I keep waiting for you to tell me to stop breaking things." She swallows. "I really need you to not do that."',
      ],
    },
    {
      id: 'kov_03_end',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'She flips the switch. The Pulse Mapper lights up, a web of blue-white lines projected above the device, points of light scattered across it like stars. Each one a Grimoire signal. Each one a ship, a garrison, a piece of the board you couldn\'t see until now.',
        'Kovesse stands in the middle of it, grinning, thirty-one hours of exhaustion showing in the grease on her fur and nowhere else.',
        '"So," she says. "Where do you want to look first?"',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'kovesse_event_03_complete', value: true },
  ],
};

// ==========================================
// SUULEN VASSERE - Event 02
// "What Lives Below"
// She reveals what she saw in the tunnels
// under Kingsrun. Something that matters.
// ==========================================

export const suulenEvent02: StoryScene = {
  id: 'crew_suulen_02',
  title: 'What Lives Below',
  beats: [
    {
      id: 'suu_02_1',

      paragraphs: [
        'Suulen is waiting for you in the map room. Waiting, not appearing, not materializing from nowhere. She\'s standing at the table with a candle lit and the door open, like a normal person who uses doors. That alone tells you this is serious.',
        'There\'s a sheet of paper in front of her. She\'s drawn something on it. Lines and curves in silver ink that catch the candlelight.',
      ],
    },
    {
      id: 'suu_02_2',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Close the door."',
      ],
    },
    {
      id: 'suu_02_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You close it. "You\'re being formal. That means either someone is dead or you found something worth killing for."',
      ],
    },
    {
      id: 'suu_02_4',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      expression: 'awe',
      paragraphs: [
        '"Forty years in tunnels under Kingsrun. Spatial Sight in darkness: every stone, every air pocket, every vein of mineral has a shape I can read. I mapped six hundred miles of tunnel system. The Morventhi hired me for cartography. That\'s what I did." She taps the paper. "But in year thirty-one, I found something that wasn\'t on any map. Because it wasn\'t supposed to be there."',
        'She slides the paper toward you. The drawing shows a chamber, massive, cathedral-scale, with something in the center. A shape she\'s drawn over and over, each iteration slightly different, as if she couldn\'t quite capture what she was seeing.',
        '"There\'s a structure under Kingsrun. Deep. Older than the city above it. Older than the Morventhi. My Spatial Sight couldn\'t fully resolve it. The shape kept... shifting. Not moving. Shifting. Like it existed in more dimensions than three."',
      ],
    },
    {
      id: 'suu_02_5',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"That\'s why you spent forty years down there. You were trying to figure it out."',
      ],
    },
    {
      id: 'suu_02_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'suu_02_what_is_it',
          text: '"What do you think it is?"',
          consequence: 'Ask for her theory.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 5 },
            { type: 'flag', target: 'suulen_kingsrun_secret', value: true },
            { type: 'resource', target: 'intelligence', value: 3 },
          ],
        },
        {
          id: 'suu_02_who_knows',
          text: '"Who else knows about this?"',
          consequence: 'The strategic question. Important.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 4 },
            { type: 'flag', target: 'suulen_backstory_02', value: true },
          ],
        },
        {
          id: 'suu_02_why_now',
          text: '"You sat on this for decades. Why tell me now?"',
          consequence: 'Cutting to the real question.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'suu_02_6',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"I think it\'s a Dominion source. Not a person\'s Dominion, the raw material that Dominions draw from. A wellspring." She says it flatly, the way she says everything, but her silver-blue eyes are brighter than you\'ve ever seen them. "The Morventhi government doesn\'t know. I filed my reports with the chamber redacted. If they knew, they\'d mine it. Strip it. Turn it into a weapon or a commodity."',
        '"I\'m telling you because you\'re building something. And I wanted you to know that the world has more in it than what\'s on the surface. There are things below the sea that would change everything. If the right person found them."',
      ],
    },
    {
      id: 'suu_02_end',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      expression: 'grim',
      paragraphs: [
        'She picks up the drawing. Folds it precisely. Puts it inside her coat.',
        '"I don\'t give trust easily, Captain. I\'ve lived long enough to know what people do with secrets." She blows out the candle. In the dark, her eyes glow faintly, silver-blue pinpoints. "Don\'t make me regret this one."',
        'When you open the door and turn back, she\'s gone. The candle is still warm.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'suulen_event_02_complete', value: true },
  ],
};

// ==========================================
// SUULEN VASSERE - Event 03
// "The Shape of Trust"
// She shows Karyudon something only she
// can see. A real bridge between them.
// ==========================================

export const suulenEvent03: StoryScene = {
  id: 'crew_suulen_03',
  title: 'The Shape of Trust',
  beats: [
    {
      id: 'suu_03_1',

      paragraphs: [
        'Three in the morning. Someone is standing over your bed. You know it\'s Suulen because anyone else would be dead by now. Oni reflexes are not gentle with uninvited guests. But Suulen\'s spatial presence is different. She exists in a room the way moonlight does. You\'re aware of her before you\'re awake.',
      ],
    },
    {
      id: 'suu_03_2',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Come with me."',
      ],
    },
    {
      id: 'suu_03_3',
      speaker: 'suulen',
      speakerName: 'Suulen',
      paragraphs: [
        '"It\'s the middle of the night, Suulen."',
        '"Yes."',
        '"Normal people make plans during daylight."',
        '"I\'m eighty-seven. I\'ve spent half my life underground. \'Normal\' left a long time ago." A pause. "Please."',
        'Suulen doesn\'t say please. You get up.',
      ],
    },
    {
      id: 'suu_03_4',

      paragraphs: [
        'She leads you to the cliff on the island\'s north face. No path. She moves through the rocks like water through a channel, finding routes that shouldn\'t exist. You follow, boots scraping on stone built for someone half your size, and she never once looks back to check. She knows where you are. Spatial Sight.',
        'The cliff edge looks out over open ocean. No ships. No lanterns. Just black water and the sky.',
      ],
    },
    {
      id: 'suu_03_5',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"I want to show you what I see." She turns to face you. "Spatial Sight. Everyone asks about it. Nobody understands the answer. Words are wrong for this. Too small." She holds up her hands. "I\'m going to touch your temples. If you trust me."',
        '"What happens?"',
        '"You\'ll see what I see. For a few seconds. My Dominion can share perception through contact. I\'ve never done it with someone outside my people." Her voice is steady but her hands aren\'t quite. "I want you to understand why I follow you. And I can\'t explain it. I have to show you."',
      ],
    },
    {
      id: 'suu_03_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'suu_03_trust',
          text: 'Kneel down so she can reach. "Show me."',
          consequence: 'Complete trust. Kneel.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 5 },
            { type: 'flag', target: 'suulen_trust_deep', value: true },
            { type: 'flag', target: 'suulen_spatial_shared', value: true },
          ],
        },
        {
          id: 'suu_03_ask_first',
          text: '"Will it hurt?"',
          consequence: 'Practical caution. Fair question.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 4 },
            { type: 'flag', target: 'suulen_spatial_shared', value: true },
          ],
        },
        {
          id: 'suu_03_humor',
          text: '"If this kills me, Dragghen gets my drink supply and Kovesse gets blamed."',
          consequence: 'Humor first. Break the tension.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'suulen', value: 3 },
            { type: 'flag', target: 'suulen_spatial_shared', value: true },
          ],
        },
      ],
    },
    {
      id: 'suu_03_6',

      paragraphs: [
        'Her fingers are cool against your temples. For a heartbeat, nothing.',
        'Then the world opens.',
        'You see... no, you feel the shape of everything. The cliff beneath you, solid stone extending down four hundred feet to the seafloor, every fissure and mineral vein mapped in your awareness like a second skeleton. The ocean, not flat but volumetric, a moving architecture of currents and pressure, salt density shifting in layers. The air itself has weight and contour. You can feel a fishing boat three miles out by the displacement it makes in the water. You can feel the crew sleeping below decks by the way their breath changes the air pressure in the hold.',
        'And you can feel yourself. Seven feet of Oni, dense with muscle and Iron-hardened bone, standing on a cliff like a monument. Through Suulen\'s Sight, you\'re enormous. Not just tall. Spatially significant. A presence that reshapes the space around it just by existing.',
        'It lasts five seconds. Then it\'s gone, and the world is flat and ordinary again.',
      ],
    },
    {
      id: 'suu_03_end',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      expression: 'awe',
      paragraphs: [
        'She steps back. Her breathing is uneven. Sharing the Sight cost her something.',
        '"That\'s why I\'m still here." Her voice is quieter than usual, which is saying something. "Spatial Sight does something to you, over time. You see every wall, every boundary, every compressed space people live inside. And then you start living inside one yourself. Watching instead of moving." She looks out at the ocean. "I spent forty years mapping tunnels. Precise. Careful. Small. This crew is loud, stupid, and constantly on fire. And for the first time in decades, I don\'t feel like I\'m reading a map. I feel like I\'m on one."',
        'She pulls her coat tighter. "Forty years in tunnels, Captain. I need to be somewhere that isn\'t underground. This is the first crew that\'s given me a reason to stay on the surface."',
        'She walks back toward the base. You stay on the cliff for a while, feeling the ghost of a world with more dimensions than you knew.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'suulen_event_03_complete', value: true },
  ],
};

// ==========================================
// TESSEK VAYNE - Event 02
// "Garroden Harsk"
// The imaginary rival. Is he real? Does it
// matter? Tessek fights like he is.
// ==========================================

export const tessekEvent02: StoryScene = {
  id: 'crew_tessek_02',
  title: 'Garroden Harsk',
  beats: [
    {
      id: 'tes_02_1',

      paragraphs: [
        'Tessek is sharpening Redtide on the foredeck, blade across his knees, running a whetstone along the edge like a man at prayer. He\'s humming something. Probably naming it. Everything gets a name with Tessek.',
      ],
    },
    {
      id: 'tes_02_2',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"Captain." He doesn\'t look up from the blade. "Garroden Harsk has been sighted near Windrow Passage. Three witnesses. A merchant, a dock guard, and a woman selling fried squid who described his technique as \'the ocean folding in half.\'" He pauses. "Excellent description, honestly."',
      ],
    },
    {
      id: 'tes_02_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Garroden Harsk." You lean against the railing. "Your legendary rival. The one nobody on this ship has ever met."',
      ],
    },
    {
      id: 'tes_02_4',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"He\'s elusive. That\'s part of what makes him dangerous." Tessek holds Redtide up to the light, squinting along the edge. "I\'ve been tracking his movements for years. Every time I master a new technique, he\'s already surpassed it. When I developed Falling Star: First Verse, he\'d already cut a cliff in half with something called Falling Star: Requiem. The man is always one step ahead."',
      ],
    },
    {
      id: 'tes_02_5',

      paragraphs: [
        'You asked around. Nobody has heard of Garroden Harsk. Delvessa already ran intelligence. Nothing. Not a single record in any port ledger, bounty board, or combat registry in the Bastion Sea. The man, if he exists, has never bought a drink, booked a room, or registered a blade.',
      ],
    },
    {
      id: 'tes_02_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'tes_02_humor',
          text: '"Sounds dangerous. We should increase security. Maybe post extra guards."',
          consequence: 'Play along. Absolutely serious.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 3 },
          ],
        },
        {
          id: 'tes_02_truth',
          text: '"Tessek. He\'s not real."',
          consequence: 'The hard question.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 5 },
            { type: 'flag', target: 'tessek_garroden_truth', value: true },
          ],
        },
        {
          id: 'tes_02_engage',
          text: '"What would Garroden do right now? If he were standing here?"',
          consequence: 'Treat it seriously.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 4 },
          ],
        },
      ],
    },
    {
      id: 'tes_02_6a',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'grim',
      paragraphs: [
        'He goes quiet. Redtide rests across his knees, still. Tessek Vayne, still. That might be a first.',
        '"I invented him." The words come out flat. No theatrics, no flourish. Just a man on a deck with a sword. "I was fifteen. Living in the harbor rings at Windrow Passage. No teacher. No rival. No one who cared whether I lived or died between matches. So I made someone up. A swordsman who was always better. Always one step ahead. Someone I had to chase."',
        'He turns the whetstone over in his hand.',
        '"Pathetic? Maybe. But I\'m Forged-tier because of a ghost I made up in a harbor ring. Every technique I\'ve named, I named because I imagined Garroden had already named a better one." He almost smiles. "Having someone better out there makes you run faster. Even if they don\'t exist."',
      ],
    },
    {
      id: 'tes_02_6b',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'happy',
      paragraphs: [
        'He looks at the wind. Really looks at it, the way Sight Dominion users do, seeing fault lines in the air itself.',
        '"He\'d name the wind." A pause. His eyes track something invisible. "Horizon\'s Breath: Third Movement." He watches the wind shift. "I think I just named the wind."',
        'He grins. It\'s the grin of a man who just surprised himself.',
      ],
    },
    {
      id: 'tes_02_end',

      paragraphs: [
        'Whether Garroden Harsk is real doesn\'t matter. Tessek fights like someone is watching. He names every strike like it\'s going into a record book only he can see. And somewhere out there, in the version of the world that lives inside Tessek Vayne\'s head, a rival nods in acknowledgment.',
        'That\'s enough.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'tessek_event_02_complete', value: true },
  ],
};

// ==========================================
// TESSEK VAYNE - Event 03
// "The Pit"
// The harbor rings come calling. Old debts.
// One match. One name. That's all he needs.
// ==========================================

export const tessekEvent03: StoryScene = {
  id: 'crew_tessek_03',
  title: 'The Pit',
  beats: [
    {
      id: 'tes_03_1',

      paragraphs: [
        'The port is busy. Market stalls, dockworkers, the usual chaos. Then a man steps out of the crowd and blocks your path. Scarred face, crooked nose that\'s been broken at least four times, and a leather ledger tucked under his arm like a weapon. He\'s looking at Tessek.',
      ],
    },
    {
      id: 'tes_03_2',

      paragraphs: [
        '"Well." The scarred man\'s grin has too many teeth and not enough warmth. "Tessek Vayne. The Red Line himself. You know, I always wondered when you\'d crawl out of whatever hole you disappeared into."',
      ],
    },
    {
      id: 'tes_03_3',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"Dorum." Tessek\'s hand doesn\'t go to Redtide. That tells you everything. He\'s not afraid. He\'s annoyed. "You still running the Windrow books?"',
      ],
    },
    {
      id: 'tes_03_4',

      paragraphs: [
        'Dorum opens the ledger. It\'s thick, pages crammed with names and numbers. He flips to a page near the middle, turns it around. Tessek\'s name, written in ink that\'s faded but still legible. Three hundred and forty matches. Win percentages. And at the bottom, a number circled in red.',
        '"Three hundred and forty matches in the harbor rings. Fifteen percent of winnings owed to the house. You left without settling." Dorum closes the ledger. "The boss wants his cut. Lifetime earnings, Tessek. Or a fight."',
      ],
    },
    {
      id: 'tes_03_5',
      paragraphs: [
        'Tessek is calm. Almost serene. That\'s the most dangerous version of Tessek.',
        '"I\'ll fight. One match. Whatever name I give the finishing strike is the one that goes into the Windrow record." He looks at Dorum like he\'s already won. "That\'s my price. One official entry in the Windrow combat registry. Technique name of my choosing."',
        'Dorum squints. "That\'s it? Just a name?"',
        '"Just a name."',
      ],
    },
    {
      id: 'tes_03_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'tes_03_pay',
          text: '"How much to make the ledger disappear? I\'ll cover it."',
          consequence: 'Throw money at the problem.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 3 },
          ],
        },
        {
          id: 'tes_03_back',
          text: '"One match. Name the move. We\'ll be front row."',
          consequence: 'Back him up. One match. His rules.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 5 },
            { type: 'flag', target: 'tessek_pit_victory', value: true },
          ],
        },
        {
          id: 'tes_03_join',
          text: '"Two-man exhibition match. I\'m stepping in with you."',
          consequence: 'Step in with him. Rewrite the format.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'tessek', value: 4 },
          ],
        },
      ],
    },
    {
      id: 'tes_03_6',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      paragraphs: [
        '"I don\'t buy my way out of rings, Captain. I cut my way out." He says it without heat. Just fact. Like gravity.',
      ],
    },
    {
      id: 'tes_03_7',

      paragraphs: [
        'The ring is underground. Old stone, salt-stained, torchlight. The crowd is loud, rough, betting on blood and critiquing technique between swigs. Tessek\'s opponent is big. Claymore. Chain armor. The crowd loves him.',
        'Tessek steps in with Redtide. The nodachi is longer than he is tall. He doesn\'t look at the crowd. He looks at the fault lines. Sight Dominion turns the world into a map of weaknesses, every crack, every stress point, every place where the structure wants to break.',
        'The fight lasts nine seconds.',
      ],
    },
    {
      id: 'tes_03_8',
      speaker: 'tessek',
      speakerName: 'Tessek Vayne',
      expression: 'satisfaction',
      paragraphs: [
        'One cut. The claymore splits in two. The chain armor separates at the shoulder. The opponent is on the ground, untouched, his weapon in pieces around him. He never saw it.',
        'Tessek sheathes Redtide. Turns to Dorum. "The name."',
        '"What... what was that?"',
        '"Red Line: Genesis." He says it like it\'s always existed. Like the world just needed to catch up.',
      ],
    },
    {
      id: 'tes_03_end',

      paragraphs: [
        'The crowd is silent. They don\'t understand what happened. It was one cut. That\'s the point.',
        'Dorum writes the name in the ledger. His hand is shaking. Tessek watches him form every letter. The theatrics are gone. Just a man watching his name go into a book.',
        'He doesn\'t say anything on the walk back to the ship. Redtide hums at his hip.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'tessek_event_03_complete', value: true },
  ],
};

// ==========================================
// ORREN MAHK - Event 01
// "The Pulse"
// He didn't ask for this. He ate a fruit
// because he was hungry and now the Kolmari
// want him dead and his hands won't stop
// sparking. Pettha sent him here to survive.
// ==========================================

export const orrenEvent01: StoryScene = {
  id: 'crew_orren_01',
  title: 'The Pulse',
  beats: [
    {
      id: 'orr_01_1',

      paragraphs: [
        'New body on deck. Grey-furred Khari, amber-gold eyes, ears too tall for his head, drowning in a naval jacket two sizes too big. He\'s white-knuckling the railing with both hands and blue-white electricity is snapping between his fingers, popping off the metal bolts like tiny whip-cracks. Scorch marks on the wood where his claws grip. He doesn\'t notice. Or he does, and he can\'t stop it.',
        'Kovesse noticed first. She\'s been crouched behind her Grimoire for ten minutes, scribbling so fast the stylus is smoking. Her tail is rigid. Full research-predator mode.',
      ],
    },
    {
      id: 'orr_01_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You walk up. Seven feet of Oni bearing down on him. He flinches so hard his ears slam flat against his skull and the sparks between his fingers triple in brightness. The compass mounted on the nearest post spins twice, shudders, and settles pointing at him instead of north. "You\'re the new one. Pettha Koss sent you."',
      ],
    },
    {
      id: 'orr_01_3',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      expression: 'fear',
      paragraphs: [
        '"Yes. Sir. Captain. Sorry." He tries to let go of the railing. His left hand sticks. Magnetized. He yanks it free with a pop and a shower of sparks, shakes his fingers out like they\'re burning. "I\'m Orren. Orren Mahk. Pettha said you needed a helmsman. I can steer. I\'m good at steering. The lightning thing isn\'t usually this--" He looks at his hands. A bolt jumps between his thumb and forefinger. "...New ship. New people. It gets worse when I\'m nervous."',
        'His right ear perks up. His left ear stays flat. One up, one down. The Khari equivalent of smiling through a panic attack.',
      ],
    },
    {
      id: 'orr_01_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"What kind of fruit?"',
      ],
    },
    {
      id: 'orr_01_5',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      expression: 'grim',
      paragraphs: [
        '"Nn." He swallows. "Storm Eel." Says it the way you\'d say "live grenade" or "terminal diagnosis." "Element class. I was working cargo for Pettha, sorting a seized smuggler\'s shipment. Found it in a crate between two bags of rice. I thought it was food." He looks at you, bracing for the laugh. "I was hungry, Captain. I ate a God Fruit because I was hungry."',
        'Both ears flatten. Flat as they go.',
        '"The Kolmari had it catalogued. Forty thousand sovereigns." His throat bobs. "They put a quiet bounty on me. Not public, just... Kolmari quiet. The kind where people stop existing. Pettha said the safest place for me was on a ship that was already making enemies."',
      ],
    },
    {
      id: 'orr_01_6',

      paragraphs: [
        'Right on cue, a fork from the galley comes skating across the deck planks with a thin metallic scrape and latches onto his boot. He stares down at it. The fork stares back. Neither of them blinks.',
      ],
    },
    {
      id: 'orr_01_7',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      paragraphs: [
        '"Tch." He peels the fork off his boot and sets it on the railing. It slides back immediately, clinking against his buckle. "...That happens. A lot."',
      ],
    },
    {
      id: 'orr_01_8',

      paragraphs: [
        'Behind you, Kovesse\'s Grimoire lets out a sharp POP and the screen dies. Smoke curls from the casing. She yelps. Orren spins around, ears slamming flat, hands up, fingers crackling.',
      ],
    },
    {
      id: 'orr_01_9',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      expression: 'fear',
      paragraphs: [
        '"Ghhk-- I\'M SORRY. I didn\'t mean to-- was that me? That was me. I\'m so sorry, I can pay for-- do you need me to-- I\'m sorry."',
      ],
    },
    {
      id: 'orr_01_10',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        'Kovesse is already tapping her Grimoire back to life. Her expression is not angry. Her expression is the face of a four-foot-one Rathai who just found a new favorite toy. "DO THAT AGAIN. Wait. Don\'t do it again. Actually do it again but let me set up the measurement array first. What\'s your output frequency? Is it consistent or variable? Does it scale with emotional state? YOUR EARS. Do the ears correlate with discharge intensity? I need data. I need so much data."',
      ],
    },
    {
      id: 'orr_01_11',

      paragraphs: [
        'Orren looks at you. Help me, his eyes say. Both ears are doing something anatomically improbable. One is perked toward Kovesse, tracking her like a prey animal. The other is trying to burrow into his own skull.',
      ],
    },
    {
      id: 'orr_01_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'orr_01_welcome',
          text: '"Welcome aboard. Try not to fry the compass."',
          consequence: 'Simple. Warm. Welcome him aboard.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 5 },
            { type: 'flag', target: 'orren_welcomed', value: true },
          ],
        },
        {
          id: 'orr_01_power',
          text: '"A God Fruit user on my crew. That changes things. What can you do at full power?"',
          consequence: 'Ask about his full power.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 3 },
            { type: 'flag', target: 'orren_power_asked', value: true },
          ],
        },
        {
          id: 'orr_01_pettha',
          text: '"Pettha doesn\'t send people unless they matter. What did she say about you?"',
          consequence: 'Invoke Pettha.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 4 },
          ],
        },
      ],
    },
    {
      id: 'orr_01_after_choice',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      paragraphs: [
        'His ears settle. Not flat, not perked. Hovering at half-mast. For Orren, that is the closest thing to calm.',
        '"I\'ll try to keep the magnetism under control. The compass should be fine as long as I stay at least ten feet from it." He pauses. "Fifteen, maybe. Suulen might have to navigate by stars for a while."',
      ],
    },
    {
      id: 'orr_01_end',

      paragraphs: [
        'He walks toward the helm. The fork follows him across the deck, sliding along the planks like a tiny metal puppy. He doesn\'t notice. Kovesse does. She\'s already cataloguing ear positions.',
        'From the upper deck, Dragghen watches the compass spin as Orren passes. He pulls out his notebook. Considers.',
        '"Compass reliability: two." A pause. "Crew member: four."',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'orren_event_01_complete', value: true },
    { type: 'flag', target: 'orren_recruited', value: true },
  ],
};

// ==========================================
// VORRETH DAAZ - Event 01
// "The List"
// Eighteen names. Three crossed off. Fifteen
// remain. He's here because every island
// Karyudon takes is one step closer to the
// prisons his people are in. Then he falls
// asleep.
// ==========================================

export const vorrethEvent01: StoryScene = {
  id: 'crew_vorreth_01',
  title: 'The List',
  beats: [
    {
      id: 'vor_01_1',

      paragraphs: [
        'The new crew member is standing at the war table. Standing is generous. He\'s occupying it the way a boulder occupies a riverbed: completely, immovably, with the quiet suggestion that everything else should reroute. Six foot eleven. Dark grey skin. Two forward-curving black horns that nearly scrape the ceiling beam. Arms like anchor chain, forearms lined with thin white scars in neat rows. Forty-seven of them. You count because a man who tallies his own skin wants you to.',
        'He\'s staring at the map. Hasn\'t blinked.',
      ],
    },
    {
      id: 'vor_01_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You walk in. He doesn\'t turn. Two Oni in one room. The furniture looks nervous.',
        '"Vorreth Daaz. The Black Standard." You\'ve heard the name. Everyone has. Former crew second of the Daaz Accord. Two hundred crew. Three islands. Crushed by the Wardensea in a single night. Bounty of two hundred and eighty million sovereigns. "You showed up at my dock this morning with no ship, no weapons, and a piece of paper."',
      ],
    },
    {
      id: 'vor_01_3',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Correct." Low voice. Not quiet -- low. Chest-deep. He reaches into his coat and pulls out a piece of paper. Unfolds it. Lays it flat beside the map with two fingers, precise as a surgeon.',
        'A list. Eighteen names in steady block letters. Three crossed out with single horizontal lines. Clean strokes. No scratch marks, no hesitation. Done.',
      ],
    },
    {
      id: 'vor_01_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Eighteen."',
      ],
    },
    {
      id: 'vor_01_5',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"My crew." He taps three of the crossed-out names. Index finger. Deliberate. "Found these three. Broke them out myself over the past year." He folds the list once, then unfolds it, as if checking the names are still there. "Fifteen remain. Four prisons. Four different islands across the Bastion Sea."',
        'His finger moves to the map. Traces a line from Tavven Shoal through the chain, stopping at four points. Four prisons. Four walls between him and the names on that paper.',
        '"Every island you take is one step closer..."',
      ],
    },
    {
      id: 'vor_01_6',

      paragraphs: [
        'His eyes close. His chin drops half an inch. His breathing flattens out.',
        'Vorreth Daaz falls asleep. Standing. At the war table. Mid-sentence. Hand still on the map. Posture unchanged. Zero warning. One heartbeat he\'s an Oni warlord laying out strategic objectives, the next he\'s an Oni warlord snoring loud enough to rattle the ink bottles off the table edge.',
        'Four seconds. That\'s how fast it happened.',
      ],
    },
    {
      id: 'vor_01_7',

      paragraphs: [
        'You stare. The snoring deepens. Rhythmic. Tectonic. Kovesse would try to measure it on a seismograph.',
        'You fold your arms. You wait.',
        'Three minutes. His eyes snap open like nothing happened.',
      ],
    },
    {
      id: 'vor_01_8',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"...to the prisons."',
        'He looks at you. No embarrassment. No apology. Not even a blink. His face says: yes, that happened. It will happen again. Move on.',
        '"Hm." He cracks his neck. One side, then the other. "Don\'t need a salary. Don\'t need a title. Need a captain who takes islands." He straightens. Full height. The X-shaped scar across his chest catches lamplight through his open coat, white against dark grey. "You\'re the only Oni I\'ve met who looked at the Bastion Sea and said \'mine.\' That makes you the smartest person in this ocean or the most dangerous."',
        'His nostrils flare. Almost a smile.',
        '"Both is fine."',
      ],
    },
    {
      id: 'vor_01_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'vor_01_both',
          text: '"Both. Definitely both."',
          consequence: 'Humor. Match his energy.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'flag', target: 'vorreth_oni_respect', value: true },
          ],
        },
        {
          id: 'vor_01_list',
          text: '"Fifteen names. That\'s a lot of prisons to crack."',
          consequence: 'Acknowledge what he carries.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 4 },
            { type: 'flag', target: 'vorreth_list_acknowledged', value: true },
          ],
        },
        {
          id: 'vor_01_sleep',
          text: '"You just fell asleep standing up. Mid-sentence. At my war table."',
          consequence: 'Call him out.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'vor_01_sleep_response',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Nn." He blinks once. Slowly. "Was resting my eyes." Complete conviction. The unshakable conviction of a man who has deployed this excuse for decades and will continue deploying it until the sun burns out. "Tactical micro-rest. Conserves energy."',
      ],
    },
    {
      id: 'vor_01_end1',

      paragraphs: [
        'He folds the list. Puts it back in his coat. Looks at the map one more time.',
      ],
    },
    {
      id: 'vor_01_end2',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Hrm. One more thing." He looks at Danzai. Your weapon. Studies it the way a smith studies another smith\'s work -- slow, critical, thorough. His eyes track the blade geometry, the grip wrap, the balance point. Takes his time. Then:',
        '"Decent."',
      ],
    },
    {
      id: 'vor_01_end3',

      paragraphs: [
        'From a man with a two-hundred-and-eighty-million-sovereign bounty who punched through three feet of prison masonry to escape, "decent" lands heavier than most people\'s marriage proposals.',
        'He turns to leave. Three steps. Stops.',
      ],
    },
    {
      id: 'vor_01_end4',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Which way is the deck?"',
      ],
    },
    {
      id: 'vor_01_end5',

      paragraphs: [
        'He has been on the ship for four hours.',
        'You point. He nods. He walks in the wrong direction. You let him.',
        'Suulen appears from the shadows of the corridor, silently redirects him with a hand on his elbow, and disappears. Vorreth doesn\'t notice. Or pretends not to.',
        'From the deck above, you hear Dragghen\'s voice.',
        '"New crew member: three."',
        'Then, after a long pause:',
        '"Navigational ability: one."',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'vorreth_event_01_complete', value: true },
    { type: 'flag', target: 'vorreth_recruited', value: true },
  ],
};

// ==========================================
// ORREN MAHK - Event 02
// "Twenty Feet"
// The pulse he can't control. The kid he
// can't forget. Ears don't lie.
// ==========================================

export const orrenEvent02: StoryScene = {
  id: 'crew_orren_02',
  title: 'Twenty Feet',
  beats: [
    {
      id: 'orr_02_1',

      paragraphs: [
        'Lower deck. Lights off. Orren is curled against a cargo crate, knees to his chest, tail wound tight around his ankles. Both ears pressed flat to his skull. For a Khari, that\'s the equivalent of a human sobbing into a pillow. Orren probably doesn\'t know he\'s broadcasting it. His ears never learned to lie.',
      ],
    },
    {
      id: 'orr_02_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You sit down across from him. Don\'t turn the lights on. "Bad day or bad memory?"',
      ],
    },
    {
      id: 'orr_02_3',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      expression: 'fear',
      paragraphs: [
        '"Memory." Barely a voice. More like air shaped into a word. His amber-gold eyes glow faint in the dark, two dull coins. The only light on the lower deck. "Six months ago. Before Pettha sent me here. Market on Tavven Shoal. Buying fish." He swallows. "Normal day."',
        'His left ear twitches. Lifts half an inch. Flattens again.',
        '"A merchant shoved me. Don\'t even remember why. Being in the way, I think." He opens his hands. Sparks dance between his fingers, blue-white, crackling. "And my fruit just-- everything. Full output. Every direction."',
      ],
    },
    {
      id: 'orr_02_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"How far?"',
      ],
    },
    {
      id: 'orr_02_5',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      expression: 'fear',
      paragraphs: [
        '"Twenty feet." His throat bobs. "Everyone in that radius dropped. Just-- collapsed. Strings cut." His voice cracks on the next word. "Three hospitalized. One was a kid. Eight years old. She was buying candied nuts with her mother."',
        'The sparks die. His fingers curl shut. Knuckles pale under grey fur.',
        '"She was fine. They all were. Headaches, disorientation, nothing permanent. But I--" He presses his forehead against his knees. Curls tighter. "I saw her hit the ground, Captain. Eight years old. Candied nuts rolling across the cobblestones. Because a man shoved me and I couldn\'t hold it together."',
        'His tail tightens around his ankles.',
        '"Haven\'t gone above forty percent since."',
      ],
    },
    {
      id: 'orr_02_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'orr_02_train',
          text: '"Train harder. Control comes from practice, not fear."',
          consequence: 'Direct. Push harder.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 4 },
            { type: 'flag', target: 'orren_train_harder', value: true },
          ],
        },
        {
          id: 'orr_02_gentle',
          text: '"Control matters more than power. And the kid is alive. You pulled it back, Orren."',
          consequence: 'Gentle. Encouragement.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 5 },
            { type: 'flag', target: 'orren_control_path', value: true },
          ],
        },
        {
          id: 'orr_02_reframe',
          text: '"You knocked out a market square and the worst casualty was a headache? Your fruit is holding back for you."',
          consequence: 'Reframe it.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'orr_02_6',
      paragraphs: [
        'He looks up. Amber-gold eyes wet, catching light that shouldn\'t be there. "You... really think so?"',
        '"Nn. A Storm Eel at full output should have done a lot worse than headaches, Orren. Something in you was already pulling back. Even when you couldn\'t think straight, the fruit held."',
        'He\'s quiet. Processing. Orren processes things the way he handles everything -- careful, slow, like the world might shatter if he moves too fast.',
      ],
    },
    {
      id: 'orr_02_end',

      paragraphs: [
        'His ears are still flat. But the left one lifts. Just slightly. One up, one down.',
        'In Khari, that\'s confusion. But it\'s also the first shape hope takes before it knows what it is.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'orren_event_02_complete', value: true },
  ],
};

// ==========================================
// ORREN MAHK - Event 03
// "The Kolmari Invoice"
// They want the fruit back. They can't have
// the fruit. They want Orren instead.
// ==========================================

export const orrenEvent03: StoryScene = {
  id: 'crew_orren_03',
  title: 'The Kolmari Invoice',
  beats: [
    {
      id: 'orr_03_1',

      paragraphs: [
        'Blue coat at the dock. Kolmari trade agent. You clock him by the coat, the posture, and the ledger clutched in front of his chest like a breastplate. Hair slicked back so tight it looks shellacked. He has the pinched expression of a man who has never been punched but suspects, on some cellular level, that it\'s overdue.',
      ],
    },
    {
      id: 'orr_03_2',

      paragraphs: [
        '"I\'m here regarding asset recovery." He opens the ledger. His voice is nasal and precise. "The Storm Eel Fruit, catalog designation KTC-4471, was seized cargo valued at forty thousand sovereigns. Your crew member consumed stolen Kolmari property." He looks at Orren. "We require compensation. Or the return of the asset."',
      ],
    },
    {
      id: 'orr_03_3',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"He ate it."',
      ],
    },
    {
      id: 'orr_03_4',

      paragraphs: [
        '"Yes. Since the asset cannot be... un-consumed--" He clears his throat. "--the Kolmari Trade Consortium is prepared to accept the bearer as collateral. Indentured service until the debt is cleared. Standard terms. Very reasonable."',
        'Orren is behind you. Ears flat. Both of them. Pressed so hard against his skull they might leave marks. His hands are shaking and sparks pop between his knuckles, bright enough to cast shadows on the dock planks. Terrified. Trying not to show it. Failing at every frequency.',
      ],
    },
    {
      id: 'orr_03_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'orr_03_leave',
          text: '"The only thing leaving this dock is you. Walking or swimming, your choice."',
          consequence: 'Intimidation. The Oni way.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 5 },
            { type: 'flag', target: 'kolmari_invoice_refused', value: true },
          ],
        },
        {
          id: 'orr_03_orren',
          text: 'Step aside. Let Orren handle this.',
          consequence: 'Let him handle it himself.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 4 },
            { type: 'flag', target: 'orren_stood_up', value: true },
          ],
        },
        {
          id: 'orr_03_negotiate',
          text: '"How much to make this go away? Let\'s talk numbers."',
          consequence: 'Negotiate. Throw money at it.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'orren', value: 3 },
            { type: 'resource', target: 'sovereigns', value: -5 },
          ],
        },
      ],
    },
    {
      id: 'orr_03_5a',

      paragraphs: [
        'The agent goes white. Not pale -- white. Clutches the ledger to his ribs like a child gripping a stuffed animal during a thunderstorm.',
      ],
    },
    {
      id: 'orr_03_5b',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      expression: 'angry',
      paragraphs: [
        'Orren steps forward. Ears still flat. But his chin lifts. His hands open at his sides and the sparks between his fingers surge bright enough to turn the dock planks blue.',
        '"I ate it because I was hungry." His voice shakes. Every word wobbles. But it\'s LOUD. "Invoice that."',
        'One pulse. Precise. The ledger\'s leather cover curls inward, pages catching orange at the edges. The agent drops it with a yelp like a kicked dog, spins, and runs down the dock without looking back. His shoes slap the wet planks all the way to the street.',
      ],
    },
    {
      id: 'orr_03_5c',

      paragraphs: [
        'Delvessa materializes at the agent\'s elbow with a sheet of paper and a pen. The negotiation takes forty-five seconds. Delvessa explains tax exemptions, maritime salvage law, and a jurisdictional loophole that makes the Storm Eel Fruit technically unclaimed cargo. The agent\'s confident expression dissolves into confusion, then defeat. They settle for five sovereigns. The agent walks away looking like he\'s been mugged by accounting.',
      ],
    },
    {
      id: 'orr_03_6',

      paragraphs: [
        'When it\'s over, Orren is shaking. Not from the fruit. Just regular fear catching up now that the adrenaline has burned off. His hands won\'t stop sparking. His tail is rigid behind him.',
        'Kovesse puts an arm around his shoulder. Has to stand on tiptoes. Barely reaches. Four foot one of Rathai engineer consoling six feet of trembling Khari. The height difference is absurd. She doesn\'t care.',
      ],
    },
    {
      id: 'orr_03_7',
      speaker: 'kovesse',
      speakerName: 'Kovesse Grenn',
      paragraphs: [
        '"Your ears were at a solid fourteen out of fourteen scared."',
      ],
    },
    {
      id: 'orr_03_8',
      speaker: 'orren',
      speakerName: 'Orren Mahk',
      paragraphs: [
        '"Tch. I hate the ear thing." His left ear perks up anyway. Traitorous, traitorous ear.',
      ],
    },
    {
      id: 'orr_03_end',

      paragraphs: [
        'Dragghen watches from the railing. Arms crossed. Face unreadable. Orren catches his eye.',
        '"Rate that performance?"',
        'Dragghen considers it. The way he considers everything. Load-bearing capacity, structural integrity, whether something will hold under pressure.',
        '"Five."',
        'Orren\'s tail wags once. Just once. "I\'ll take it."',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'orren_event_03_complete', value: true },
  ],
};

// ==========================================
// VORRETH DAAZ - Event 02
// "The Daaz Accord"
// Two hundred crew. Three islands. One night
// that ended everything. He's not bitter.
// That's what makes it worse.
// ==========================================

export const vorrethEvent02: StoryScene = {
  id: 'crew_vorreth_02',
  title: 'The Daaz Accord',
  beats: [
    {
      id: 'vor_02_1',

      paragraphs: [
        'Night. Vorreth at the prow. Awake. That alone is wrong. Vorreth Daaz can drop unconscious mid-word, standing, mug in hand, and the coffee never spills. The fact that he\'s vertical and staring at the horizon with both eyes open means something behind those eyes is keeping him up by force.',
      ],
    },
    {
      id: 'vor_02_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You approach. He doesn\'t turn. "You\'re awake. Should I be worried?"',
      ],
    },
    {
      id: 'vor_02_3',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Anniversary." He says it to the water. Doesn\'t look at you. "Four years tonight."',
        'He doesn\'t wait for the question. Vorreth tells stories the way he fights: forward, no feints, no pacing.',
        '"The Daaz Accord. Two hundred crew. Three islands." His grip tightens on the railing. The wood groans. "We weren\'t conquerors. Outer islands couldn\'t afford Wardensea taxation, so we stood between them and the tax ships. Ran supply lines. Kept trade routes breathing." He exhales through his nose. Hard. "The outer islands called us pirates. We called ourselves the same. Pirates who kept the lights on in places nobody else cared about."',
      ],
    },
    {
      id: 'vor_02_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"What happened?"',
      ],
    },
    {
      id: 'vor_02_5',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Wardensea. One night. Three Forged-tier officers and a battle fleet." His voice doesn\'t waver. No anger. No bitterness. Facts, laid out like bones on a table. "Hit all three islands at once. I fought for six hours. Thirty-two soldiers. Hand to hand. King Dominion against steel." His jaw sets. "When three Forged-tier officers finally pinned me, I was the last one standing on my ship."',
        '"Barren Gate prison. Two years." He looks up. Stars. His throat works. "Stone walls. Iron bars. No sky."',
        'Silence. Then:',
        '"Broke out when a storm weakened the eastern wall. Punched through three feet of masonry." His mouth twitches. Gone before it finishes. "Guards heard me coming. Was not quiet about it."',
        '"Heh." The smile dies. "Eighteen crew still inside. Four islands. Four prisons. I had two hands and no ship." He turns to you. First time. Moonlight catches the X-shaped scar through his open shirt, white against dark grey. "That\'s why I\'m here."',
      ],
    },
    {
      id: 'vor_02_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'vor_02_promise',
          text: '"Your list becomes our list. Every name."',
          consequence: 'A promise between Oni. Unbreakable.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'flag', target: 'vorreth_crew_promise', value: true },
          ],
        },
        {
          id: 'vor_02_why',
          text: '"Why didn\'t you break them all out?"',
          consequence: 'Challenge him.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 4 },
          ],
        },
        {
          id: 'vor_02_respect',
          text: '"Six hours against the Wardensea. That\'s not losing. That\'s making them earn it."',
          consequence: 'Respect between Oni.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 3 },
          ],
        },
      ],
    },
    {
      id: 'vor_02_6',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Oni quiet. The deck creaks under his weight and even that sound seems to hush itself.',
        '"They were stronger. Wasn\'t enough." No self-pity. Pure assessment. A fighter measuring the gap between where he was and where he needs to be. His fists clench on the railing. "Next time I won\'t be weaker."',
        '"Thirty-two." He says the number like a prayer. Or an oath. Or both.',
      ],
    },
    {
      id: 'vor_02_end',

      paragraphs: [
        'He falls asleep. Standing. At the prow. One hand on the railing, chin dropping, and the snoring kicks in within seconds. Deep. Rumbling. The deck planks vibrate under your boots.',
        'Suulen materializes from nowhere. Drapes a blanket over his shoulders without breaking stride. Doesn\'t slow down.',
        '"He does this."',
        'Gone. He snores louder. The blanket doesn\'t move. Neither does the hand on the railing. Two hundred and eighty million sovereigns of sleeping Oni, wrapped in a wool blanket by a woman who weighs a third of what he does.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'vorreth_event_02_complete', value: true },
  ],
};

// ==========================================
// VORRETH DAAZ - Event 03
// "Thirty-Two"
// A Wardensea officer recognizes the monster
// of Barren Gate. Vorreth handles it the
// Vorreth way. Then falls asleep.
// ==========================================

export const vorrethEvent03: StoryScene = {
  id: 'crew_vorreth_03',
  title: 'Thirty-Two',
  beats: [
    {
      id: 'vor_03_1',

      paragraphs: [
        'Port day. Vorreth beside you. Six foot eleven of dark grey Oni, black horns, forty-seven tally marks carved into his forearms. People part around him without deciding to. Same reflex that makes you walk around a standing stone in a field.',
        'He\'s mid-sentence. Breakfast. Vorreth discusses breakfast with the tactical gravity most people reserve for war councils.',
      ],
    },
    {
      id: 'vor_03_2',

      paragraphs: [
        'Then a voice cuts through the crowd.',
        '"That\'s the monster of Barren Gate."',
        'A young Wardensea officer. Maybe twenty-five. Blue uniform, brass buttons, academy posture. His partner, older, smarter, is already reaching for his arm to pull him away.',
      ],
    },
    {
      id: 'vor_03_3',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        'Vorreth turns. Slow. The whole port holds its breath.',
        '"Hm." His voice is calm. Conversational. A man discussing rain. "Thirty-two soldiers. Six hours. Counted every one." He looks at the young officer. The officer\'s hand is on his weapon. Hand trembling on the grip. "Did they teach you that at the academy?" His head tilts. Half an inch. "Or did they leave it out?"',
      ],
    },
    {
      id: 'vor_03_4',

      paragraphs: [
        'The older partner grabs the young officer by the collar. Yanks him backward. Hard. Smart partner. They melt into the crowd. The young one doesn\'t look back. His sword hand is still shaking.',
        'Vorreth watches them go. No anger. No satisfaction. Flat. Patient. A man who\'s heard "monster" so many times the word lost its teeth.',
      ],
    },
    {
      id: 'vor_03_5',

      paragraphs: [
        'Then he falls asleep.',
        'Standing. Middle of the port. Chin drops. Snoring starts instantly, like the confrontation burned through whatever reserve of consciousness he was running on.',
        'You grab his arm -- solid as a ship timber -- and steer him to a bench. He sleeps for four minutes. Eyes snap open. Picks up the sentence from before the Wardensea interrupted.',
      ],
    },
    {
      id: 'vor_03_6',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"...anyway, the eggs were overcooked. Two out of ten. Where were we?"',
      ],
    },
    {
      id: 'vor_03_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'vor_03_practical',
          text: '"Thirty-two is impressive. But let\'s not start a fight in the middle of a port."',
          consequence: 'Practical. Fair enough.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 3 },
          ],
        },
        {
          id: 'vor_03_humor',
          text: '"Monster of Barren Gate. That\'s a good epithet. Better than \'The Black Standard.\'"',
          consequence: 'Humor between Oni. Lean into the epithet.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 4 },
          ],
        },
        {
          id: 'vor_03_solidarity',
          text: '"Next time a Wardensea officer calls you monster, I\'ll show them what a real one looks like."',
          consequence: 'Oni solidarity.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'vorreth', value: 5 },
            { type: 'flag', target: 'vorreth_monster_bonded', value: true },
          ],
        },
      ],
    },
    {
      id: 'vor_03_7',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"Heh." Full grin. Both tusks out. The kind of expression that makes small children either laugh or dive behind their parents. "Monster and monster. Wardensea won\'t know what hit them." He claps your shoulder. Your knees buckle. King Dominion doesn\'t do gentle.',
      ],
    },
    {
      id: 'vor_03_8',

      paragraphs: [
        'He falls asleep again. On the bench. Snoring loud enough to scatter a seagull off the dock railing. Three minutes.',
      ],
    },
    {
      id: 'vor_03_end',
      speaker: 'vorreth',
      speakerName: 'Vorreth Daaz',
      paragraphs: [
        '"...which way is the ship?"',
      ],
    },
    {
      id: 'vor_03_end2',

      paragraphs: [
        'Suulen points left. Without looking up from the book she\'s reading. Doesn\'t even turn the page. This has happened before. Many times.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'vorreth_event_03_complete', value: true },
  ],
};

// ==========================================
// DELVESSA GHAL - Event 03
// "The Ledger's Margin"
// The slow burn deepens. Real vulnerability.
// The walls come down - not all at once,
// but enough.
// ==========================================

export const delvessaEvent03: StoryScene = {
  id: 'crew_delvessa_03',
  title: 'The Ledger\'s Margin',
  beats: [
    {
      id: 'del_03_1',

      paragraphs: [
        'Command room. Hour past midnight. Nobody should be here. Delvessa is. Ledger open, but she\'s not writing. She\'s staring at a page near the back -- not supply projections, not trade calculations. Something older. The paper yellowed, ink faded from dark brown to rust.',
        'She closes it when she hears you. Not fast enough. Her thumb was pressed into the margin hard enough to dent it.',
      ],
    },
    {
      id: 'del_03_2',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"That page looked personal."',
      ],
    },
    {
      id: 'del_03_3',
      paragraphs: [
        '"Tch. Everything in this ledger is personal. It\'s my handwriting." Automatic. Practiced. The deflection of a woman who has had this conversation with herself a hundred times. But she doesn\'t tell you to leave. Doesn\'t close the book all the way. "It\'s a letter. Four years old. Never sent."',
        '"To whom?"',
        'She adjusts her glasses, though they don\'t need adjusting. "My mother. Vessen Province. Kolmari territory." She presses her palm flat on the ledger. Holding it shut. Pressing down like it might bleed. "She thinks I\'m still filing trade audits in a government office. She thinks I have a pension."',
      ],
    },
    {
      id: 'del_03_4',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Four years is a long time to not send a letter."',
      ],
    },
    {
      id: 'del_03_5',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"What do I say? \'Dear Mother. I\'ve abandoned my career and joined an Oni warlord. The food is good. I may be committing treason. Please water my plants.\'" Thin humor. Brittle. Her nails press white crescents into the leather cover. "If I send a letter, the Kolmari track the route. Track the route, find you. Find you, find her." She exhales. Controlled. "A Ledger Agent\'s mother, harboring knowledge of a fugitive\'s location. The penalty is confiscation. Property. Savings. Everything she built."',
        'She opens the ledger. The letter is short. A few lines in handwriting looser than anything else in the book. Less controlled. More human.',
        '"I calculate everything." Her voice drops. "And every time, the math says the same thing: the safest thing I can do for my mother is stay gone."',
      ],
    },
    {
      id: 'del_03_choice',

      paragraphs: [''],
      choices: [
        {
          id: 'del_03_close',
          text: 'Sit next to her. Close enough that your arm touches hers. "You don\'t have to choose between her and this forever. I\'ll build something big enough that the Kolmari can\'t touch her."',
          consequence: 'A promise bigger than flirting.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 5 },
            { type: 'flag', target: 'delvessa_mother_promise', value: true },
            { type: 'flag', target: 'delvessa_vulnerable_moment', value: true },
          ],
        },
        {
          id: 'del_03_practical',
          text: '"Suulen can route a letter through six dead drops. Untraceable. Say the word and it\'s done."',
          consequence: 'Practical. Solve the problem.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 4 },
            { type: 'flag', target: 'delvessa_letter_sent', value: true },
          ],
        },
        {
          id: 'del_03_understand',
          text: '"I spent two years in a cell. Didn\'t write anyone because there was no one to write. At least you have someone worth protecting."',
          consequence: 'Share your own scars.',
          available: true,
          effects: [
            { type: 'loyalty', target: 'delvessa', value: 4 },
            { type: 'flag', target: 'delvessa_vulnerable_moment', value: true },
            { type: 'flag', target: 'karyudon_backstory_shared', value: true },
          ],
        },
      ],
    },
    {
      id: 'del_03_6',

      paragraphs: [
        'She doesn\'t cry. Delvessa Ghal doesn\'t cry. She calculates. She plans. She controls. But her breathing shifts. Just slightly. A hitch between exhale and inhale that you\'d only catch sitting this close.',
        'She turns the page. The letter vanishes under supply routes and trade margins. Buried again.',
      ],
    },
    {
      id: 'del_03_7',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"You know what the Ledger Agency taught me? Everything has a cost. Every decision. Every loyalty. Every--" She stops. Throat bobs. Starts again. "You can put a number on it. I believed that for years." She looks at you. Not sideways. Not the calculated assessment. Straight on. Eyes open. Guard down. "You are the most expensive decision I\'ve ever made. And I can\'t find the line in the ledger where I regret it."',
        'Her hand moves from the book to the table. The space between you. Not reaching. Just... closer. One inch. One inch of closed distance that hits harder than a confession.',
      ],
    },
    {
      id: 'del_03_end',

      paragraphs: [
        'You don\'t close the gap. Neither does she. But neither of you pulls back, and in the mathematics of Delvessa Ghal, holding still is the bravest thing a person can do.',
        'She goes back to her numbers. You stay. The candle burns low. Wax pools on the table edge. She doesn\'t ask you to leave. You don\'t.',
      ],
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'delvessa_event_03_complete', value: true },
  ],
};
