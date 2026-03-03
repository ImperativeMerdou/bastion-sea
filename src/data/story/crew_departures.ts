// ==========================================
// GODTIDE: BASTION SEA - Crew Departure Scenes
// ==========================================
// Triggered when a crew member's loyalty hits the floor and stays there.
// Each scene gives the player one chance to fix things or release them.
// Departure is permanent: recruited -> false, assignment -> unassigned.
// These scenes do NOT appear in the Management tab crew event registry.
// ==========================================

import { StoryScene } from '../../types/game';

// ==========================================
// DELVESSA GHAL
// Strategist, ex-Kolmari. Treats people like
// balance sheets. Flaw and departure method:
// she will leave by reclassifying the partnership
// as a closed account.
// Pattern inversion: gives this arrangement an 8.
// ==========================================

export const delvessaDepartureScene: StoryScene = {
  id: 'crew_delvessa_depart',
  title: 'The Ledger, Reviewed',
  currentBeat: 0,
  beats: [
    {
      id: 'del_dep_1',
      paragraphs: [
        "The table is covered in papers again. It looks like strategy until you notice which papers are missing. Tactical projections. Supply forecasts. The rolling accounts. What's left are older pages. Her original contract. A list of services rendered.",
        'Delvessa Ghal is doing an exit audit.',
      ],
    },
    {
      id: 'del_dep_2',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"The arrangement has run past its productive window." Her quill keeps moving. "I want to be clear: I am not angry. This is not a rupture. It is a recalculation."',
        '"When I came aboard, the variables favored this operation. They no longer do. The math changed."',
        'The math changed. As if this were a row in a ledger. As if that\'s all it was.',
      ],
    },
    {
      id: 'del_dep_3',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        'Her quill stops. She doesn\'t look up for four seconds, which is a long time for Delvessa Ghal.',
        '"For what it\'s worth." She gathers the papers into a stack, even the old ones. "I gave this an eight."',
        'That is, you realize slowly, the highest rating you have ever heard her give anything.',
      ],
      choices: [
        {
          id: 'keep_delvessa',
          text: 'Change the math. Pay her properly. [80 Sovereigns]',
          consequence: 'She came for returns. Give her better ones.',
          available: true,
          effects: [
            { type: 'resource', target: 'sovereigns', value: -80 },
            { type: 'loyalty', target: 'delvessa', value: 25 },
            { type: 'flag', target: 'crew_delvessa_departure_averted', value: true },
            { type: 'flag', target: 'crew_delvessa_departure_warned', value: false },
            {
              type: 'notification',
              target: '',
              value: '',
              notification: {
                type: 'crew',
                title: 'DELVESSA GHAL -- RETAINED',
                message: 'She looked at the sovereigns. Ran a new calculation. Nodded once. The papers went back into their working stacks.',
              },
            },
          ],
        },
        {
          id: 'release_delvessa',
          text: 'Let her finish the calculation.',
          consequence: "She made her decision. You won't make her wrong for it.",
          available: true,
          effects: [
            { type: 'depart_crew', target: 'delvessa', value: true },
            { type: 'flag', target: 'crew_delvessa_departed', value: true },
            {
              type: 'notification',
              target: '',
              value: '',
              notification: {
                type: 'crew',
                title: 'DELVESSA GHAL HAS LEFT',
                message: 'She packed efficiently. No lingering. The chair where she used to work is just a chair again.',
              },
            },
          ],
        },
      ],
    },
  ],
};

// ==========================================
// DRAGGHEN KOLVE
// Gorundai shipwright, gruff, technical metaphors.
// Rates everything 1-10, never above a 6.
// Pattern inversion: admits what the crew *was*
// in plain language, no metaphors.
// ==========================================

export const dragghenDepartureScene: StoryScene = {
  id: 'crew_dragghen_depart',
  title: 'Structural Integrity',
  currentBeat: 0,
  beats: [
    {
      id: 'drg_dep_1',
      paragraphs: [
        'The hold is in good order. You checked three days ago and it was fine. You check now and it is still fine. But Dragghen is down here anyway, running his hands along seams that sealed months ago, tapping planks with his knuckle.',
        'Diagnosing something that is not the ship.',
      ],
    },
    {
      id: 'drg_dep_2',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        '"Hull\'s solid. Rigging\'s a four-out-of-ten but it\'ll hold." He doesn\'t stop the inspection. "Crew health, six. Supply storage, three -- we\'re going to have a vermin problem by next month if nobody moves those grain sacks."',
        '"Ship\'s fine," he says. "Not worried about the ship."',
      ],
    },
    {
      id: 'drg_dep_3',
      speaker: 'dragghen',
      speakerName: 'Dragghen Kolve',
      paragraphs: [
        'He straightens up. Tucks his knock-mallet back into his belt. Looks at you the way he looks at a faulty joint before he condemns it.',
        '"There are forty names I couldn\'t bring with me when I left the Kolmari yards. I told myself the next crew would be different." He shrugs, a motion that moves about thirty pounds of shoulder. "This one was. For a while."',
        '"I\'m not built to watch what I can\'t fix."',
      ],
      choices: [
        {
          id: 'keep_dragghen',
          text: 'Tell him what you\'re actually building. [80 Sovereigns]',
          consequence: "Pay the back wages you've been short on. Give him something to fix.",
          available: true,
          effects: [
            { type: 'resource', target: 'sovereigns', value: -80 },
            { type: 'loyalty', target: 'dragghen', value: 25 },
            { type: 'flag', target: 'crew_dragghen_departure_averted', value: true },
            { type: 'flag', target: 'crew_dragghen_departure_warned', value: false },
            {
              type: 'notification',
              target: '',
              value: '',
              notification: {
                type: 'crew',
                title: 'DRAGGHEN KOLVE -- RETAINED',
                message: "He listened to what you said. Didn't respond for a while. Then he found a grain sack that was definitely in the wrong place and moved it. Stayed.",
              },
            },
          ],
        },
        {
          id: 'release_dragghen',
          text: 'Let him go. Some things can\'t be fixed.',
          consequence: "He knows what he is. You won't ask him to be something else.",
          available: true,
          effects: [
            { type: 'depart_crew', target: 'dragghen', value: true },
            { type: 'flag', target: 'crew_dragghen_departed', value: true },
            {
              type: 'notification',
              target: '',
              value: '',
              notification: {
                type: 'crew',
                title: 'DRAGGHEN KOLVE HAS LEFT',
                message: "He patched a loose plank on his way out. Didn't say goodbye. The grain sacks are still in the wrong place.",
              },
            },
          ],
        },
      ],
    },
  ],
};

// ==========================================
// SUULEN VASSERE
// Morventhi navigator, word economy, silence.
// Observes everything, says almost nothing.
// Pattern inversion: she actually speaks -- a
// full thought, no deflection. Which is worse.
// ==========================================

export const suulenDepartureScene: StoryScene = {
  id: 'crew_suulen_depart',
  title: 'The Route Abandoned',
  currentBeat: 0,
  beats: [
    {
      id: 'sul_dep_1',
      paragraphs: [
        "She's on the bow. Standing still. You've seen Suulen still before -- it's how she usually is -- but this is different. This isn't waiting. It's the stillness of something that has already decided.",
        "Her maps are still below. Her knives are on her. The distinction matters.",
      ],
    },
    {
      id: 'sul_dep_2',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"I have been mapping a route since before you were born." She says this to the water, not to you. "Not for anyone. Just because the route existed and no one had mapped it."',
        '"I came here because I thought this was going somewhere new. I thought you were going somewhere new." A pause. "You are going somewhere. I don\'t think it\'s new."',
        '"I can\'t navigate somewhere I don\'t want to end up."',
      ],
    },
    {
      id: 'sul_dep_3',
      paragraphs: [
        "She finally looks at you. Her silver eyes don't perform anything. They're just eyes.",
        "She's waiting for you to say something or not say something. Either is fine with her.",
      ],
      choices: [
        {
          id: 'keep_suulen',
          text: 'Show her where the route actually goes. [80 Sovereigns]',
          consequence: "She came for somewhere new. Prove it's still true.",
          available: true,
          effects: [
            { type: 'resource', target: 'sovereigns', value: -80 },
            { type: 'loyalty', target: 'suulen', value: 25 },
            { type: 'flag', target: 'crew_suulen_departure_averted', value: true },
            { type: 'flag', target: 'crew_suulen_departure_warned', value: false },
            {
              type: 'notification',
              target: '',
              value: '',
              notification: {
                type: 'crew',
                title: 'SUULEN VASSERE -- RETAINED',
                message: "She listened. Said nothing. Went back below. Forty minutes later she spread a new map on the table that no one had asked for. Still here.",
              },
            },
          ],
        },
        {
          id: 'release_suulen',
          text: "Let her find her route.",
          consequence: "She was always going to go somewhere unmapped. You just have to accept it isn't here.",
          available: true,
          effects: [
            { type: 'depart_crew', target: 'suulen', value: true },
            { type: 'flag', target: 'crew_suulen_departed', value: true },
            {
              type: 'notification',
              target: '',
              value: '',
              notification: {
                type: 'crew',
                title: 'SUULEN VASSERE HAS LEFT',
                message: "She was gone before dawn. Left her maps. Took both knives.",
              },
            },
          ],
        },
      ],
    },
  ],
};
