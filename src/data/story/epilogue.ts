import { StoryScene } from '../../types/game';

export const epilogueScene: StoryScene = {
  id: 'epilogue_view_from_below',
  title: 'THE VIEW FROM BELOW',
  characters: ['kirin'],
  beats: [
    // ============================
    // BEAT 1: THE KNEEL
    // ============================
    {
      id: 'ep_kneel_01',
      title: 'THE VIEW FROM BELOW',
      paragraphs: [
        'Vess Harbour. The day after.',
        'Kirin watched the processing from the third pier, where the fishing boats used to moor before the Wardensea converted the slips to patrol berths. The new flag was already up. Crimson and gold. Kovesse had designed it in under an hour and it looked permanent, which was the point.',
        'Captured Wardensea personnel filed through the harbour checkpoint in groups of six. Most of them looked like what they were: tired professionals who had lost a war they had expected to win. They surrendered weapons. Signed processing forms. Received meal chits for the temporary holding area in the old customs house.',
      ],
    },
    {
      id: 'ep_kneel_02',
      paragraphs: [
        'One of them was older. Thinning hair gone white at the temples, deep creases in the brown skin of his neck. He wore the insignia of a Wardensea supply officer, third rank, the kind of posting a man gets after thirty years of doing his job and never asking for more. His name tag read GOSS.',
        'Goss moved through the line without trouble. Surrendered his sidearm. Signed the forms with a hand that didn\'t shake. When the new flag went up on the harbour mast, the rope snapping taut in the offshore wind, most of the prisoners didn\'t look. They had already made the calculation.',
        'Goss looked.',
      ],
    },
    {
      id: 'ep_kneel_03',
      stinger: 'story_revelation',
      effect: 'flash_crimson',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'He did not kneel. The processing officer asked him twice. Goss stood with his hands at his sides, watching the flag, and said nothing. It was not defiance. There was no theatre in it. He simply stood the way he had stood for three decades of morning flag ceremonies, at attention, because that was where his body went when a flag moved on a mast.',
        'Karyudon was crossing the harbour. Twenty yards away. Walking with Dragghen toward the dry docks, discussing repairs, not looking for trouble. His gaze passed over the checkpoint the way it passed over everything that morning, proprietary, reflexive, the scan of a man who owned the ground beneath him and hadn\'t yet learned to be careful about it.',
        'His eyes caught on Goss. On the standing man among the kneeling.',
        'The air changed.',
        'Kirin felt it from thirty feet away. Not a push. A lean. The barometric weight of someone who did not need to speak to make a room rearrange itself. Karyudon\'s King, bleeding outward without instruction, without target, without intent. Ambient. The officers nearest the checkpoint took a half-step back. A gull veered off the pier railing and did not land again.',
        'Goss\'s knees folded. Not quickly. A slow compression, like a man being pressed down by a hand he could not see. His face did not change. His body had simply decided for him.',
        'Karyudon kept walking. He did not look back. He said something to Dragghen about hull plating.',
      ],
    },
    {
      id: 'ep_kneel_04',
      paragraphs: [
        'Kirin stayed on the third pier. His fingers had closed around the railing without his permission.',
        'His brother had not noticed. That was the thing. Not the power. Power was Karyudon\'s profession. The unconsciousness of it. King expression leaking through like heat from a furnace door, bending the room, bending the man, and the source of it already ten yards past, talking about hull plating, oblivious.',
        'Goss was kneeling on the dock. Still looking at the flag. After a moment, a younger officer helped him up. Goss did not appear injured. He appeared confused.',
        'Kirin unhooked his fingers from the railing and put his hands in his pockets.',
      ],
    },
    // ============================
    // BEAT 2: THE OPTIMIZATION
    // ============================
    {
      id: 'ep_delvessa_01',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        'He found Delvessa in the harbour office. She had claimed the space within hours of the surrender, cleared the former port captain\'s personal effects into a labeled box, and installed herself behind a desk covered in charts and supply manifests. She looked like she had been there for years.',
        '"I saw something at the checkpoint."',
        'Delvessa looked up. She had the expression she always had when interrupted: patient, precise, the attention of a woman who catalogued interruptions by their potential usefulness.',
        'He told her. The supply officer. The standing. The kneel that was not a kneel.',
      ],
    },
    {
      id: 'ep_delvessa_02',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      expression: 'grim',
      paragraphs: [
        'She listened. She did not dismiss it.',
        '"King expression at Forged tier has ambient effects," she said. "At Conqueror tier, it is closer to weather. The projection radius expands. The threshold for involuntary response in nearby targets drops. Karyudon has been operating at full output for months. There will be overflow."',
        'She set down her pen.',
        '"He maintained order during a volatile transition, Kirin. A harbour full of armed prisoners and new occupying forces. If his presence kept the processing from escalating, that is governance, not abuse."',
      ],
    },
    {
      id: 'ep_delvessa_02b',
      speaker: 'kirin',
      speakerName: 'Kirin',
      paragraphs: [
        '"The officer wasn\'t a threat."',
      ],
    },
    {
      id: 'ep_delvessa_02c',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"No," Delvessa agreed. "But King doesn\'t read threat. It reads will. The man was projecting refusal. At the volume your brother operates, that refusal registered as friction. The response was automatic."',
        'She picked her pen back up.',
        '"The officer was not harmed. I will note it in the daily assessment. Karyudon should be made aware of his ambient radius. I will raise it with him when the timing is appropriate."',
      ],
    },
    {
      id: 'ep_delvessa_03',
      paragraphs: [
        'Every sentence was reasonable. Kirin could not find the lie in any of them. That was the problem.',
        'He left the harbour office. The door closed behind him. Through the window, he could see Delvessa returning to her charts, pen moving with the same cadence it had before he entered.',
        'She would raise it with him. When the timing was appropriate. Kirin walked along the harbour wall and thought about what appropriate meant to a woman whose job was to make the machine run smoothly. Appropriate meant: when it does not destabilize anything. Appropriate meant: when I have framed it as an optimization rather than a warning.',
        'The crew would not check him. Not because they were blind. Not because they were weak. Because they loved him, and they had earned the right to, and that love was the same engine that had carried five people from a stolen ship to a conquered fortress. It was the most effective force Kirin had ever seen in his life. And it was pointed in one direction.',
      ],
    },
    // ============================
    // BEAT 3: THE BANDS
    // ============================
    {
      id: 'ep_bands_01',
      paragraphs: [
        'Night.',
        'Kirin sat on the deck of his ship. The highland vessel was still moored at the third pier, hull unpainted, sails furled. Around it, Karyudon\'s harbour operated through the dark. Lanterns on the docks. Crew members moving in pairs, carrying supplies, posting watches. Laughter from the customs house where Dragghen had turned the holding area into something that resembled a mess hall more than a prison.',
        'Good people doing good work under a flag they believed in. Kirin could hear them singing. The song was new, something Kovesse had picked up from a Grimoire broadcast, and it was about the Oni who took the fortress from the sea.',
      ],
    },
    {
      id: 'ep_bands_02',
      paragraphs: [
        'He pushed his sleeves up. The Iron-band tattoos sat on his forearms in dark ridges, the uncle\'s conditioning marks. Imprints that made it hard to disobey. Not impossible. Just hard.',
        'He had lived with them for years. Knew what they felt like from the inside: a pressure at the base of the skull when a direct order conflicted with what he wanted. A heaviness in the limbs. The slow, grinding reduction of his own will into something that fit the shape of someone else\'s purpose.',
        'He looked at the harbour. At the flag. At the lanterns moving in the dark.',
        'Two forms of control. The first kind branded you. Left marks. Hurt in ways that made you hate the hand holding the iron.',
        'The second kind felt like belonging. Like being part of something that mattered. Like gratitude for being included in the warmth of a fire someone else had built. You did not fight it because you did not want to fight it. You did not even see the walls because the room was comfortable and the door was always open and nobody ever asked you to stay. You just did.',
      ],
    },
    {
      id: 'ep_bands_03',
      paragraphs: [
        'The harbour settled. The singing faded. Kirin sat on his ship and looked at the gap between the marks on his arms and the flag on the mast, and he could not find the place where one ended and the other began. Only that the first had made him bleed. And the second hadn\'t. Not yet.',
        'He pulled his sleeves down. The offshore wind carried the smell of salt and engine oil and Dragghen\'s cooking from the customs house, warm and good.',
        'Nobody else was going to see it. He understood that now. Not Delvessa, who was the smartest person he had ever met. Not Vorreth, who had spent his life inside institutions and knew their architecture better than anyone. Not the crew, who had followed Karyudon through things that would have broken lesser people and come out the other side still believing.',
        'They loved him. Earned it. Deserved to.',
        'Kirin looked at the harbour and did not sleep for a long time.',
      ],
    },
    // ============================
    // TITLE CARD
    // ============================
    {
      id: 'ep_title_card',
      stinger: 'act_transition',
      paragraphs: [
        '\u200B',
        'GODTIDE: BASTION SEA -- END',
        '\u200B',
        'Kirin\'s story continues.',
      ],
      autoAdvance: false,
    },
  ],
  currentBeat: 0,
  onComplete: [
    { type: 'flag', target: 'epilogue_complete', value: true },
  ],
};
