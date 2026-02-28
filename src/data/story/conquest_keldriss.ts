import { StoryScene } from '../../types/game';

export const keldrissConquestScene: StoryScene = {
  id: 'conquest_keldriss',
  title: 'KELDRISS - TAKING THE SHADOW',
  beats: [
    {
      id: 'keldriss_conquest_01',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      title: 'THE PROBLEM WITH KELDRISS',
      paragraphs: [
        'Delvessa spreads a hand-drawn map of Keldriss across the table. Suulen\'s work, clearly, because half of it shows tunnels and passages that don\'t appear on any official chart.',
        '"Keldriss has no government. No harbor master. No one to negotiate with." Delvessa taps the map and frowns at it. "Which means there\'s nothing to take. No building. No leader."',
      ],
    },
    {
      id: 'keldriss_conquest_01b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"So what runs it?"',
      ],
    },
    {
      id: 'keldriss_conquest_01c',
      speaker: 'delvessa',
      speakerName: 'Delvessa Ghal',
      paragraphs: [
        '"Money runs it. The Shadow Market moves goods nobody wants taxed. Smugglers called the Reef Runners control the routes around the island. And five information dealers, the Broker Circle, decide what gets sold and to whom." She closes the map. "The power is invisible. You can\'t storm invisible, Captain."',
      ],
    },
    {
      id: 'keldriss_conquest_01d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You crack your knuckles. "No. But I can punch the people holding it up. Then the invisible part becomes someone else\'s problem."',
      ],
    },
    {
      id: 'keldriss_conquest_02',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'Suulen materializes from the shadows. She\'s been gone for six hours. Nobody noticed her leave.',
        '"The Broker Circle is split. Two of them are Kolmari-aligned. They sell information to the Wardensea through intermediaries. Two are Renegade-sympathetic. The fifth, a woman named Ossa Veile, is neutral. She\'s the swing vote on everything."',
      ],
    },
    {
      id: 'keldriss_conquest_02b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"What does Ossa want?"',
      ],
    },
    {
      id: 'keldriss_conquest_02c',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Stability. She\'s old enough to remember when Keldriss was just a refueling stop. She built the information network herself. She doesn\'t want anyone, Kolmari, Wardensea, or you, to break what she built."',
      ],
    },
    {
      id: 'keldriss_conquest_02d',
      speaker: 'vorreth',
      speakerName: 'Vorreth Khane',
      paragraphs: [
        'Vorreth speaks from the corner. "You don\'t break it. You buy it. Or you take it. Or you become part of it."',
      ],
    },
    {
      id: 'keldriss_conquest_02e',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Three options." You lean back. "Which one sounds like me?"',
      ],
      choices: [
        {
          id: 'keldriss_intimidate',
          text: '"I walk into the Broker Circle and explain what happens to people who don\'t align with me."',
          consequence: 'Fear. The Karyudon way.',
          available: true,
          effects: [
            { type: 'flag', target: 'keldriss_approach', value: 'intimidation' },
            { type: 'infamy', value: 5 },
          ],
        },
        {
          id: 'keldriss_alliance',
          text: '"Ossa Veile built something real. I don\'t break things that work. I acquire them. Set up a meeting."',
          consequence: 'Pragmatic. Work with her, not over her.',
          available: true,
          effects: [
            { type: 'flag', target: 'keldriss_approach', value: 'alliance' },
            { type: 'loyalty', target: 'delvessa', value: 8 },
          ],
        },
        {
          id: 'keldriss_infiltrate',
          text: '"Suulen. How deep can you get into their network?"',
          consequence: 'From the inside. Suulen\'s way.',
          available: true,
          effects: [
            { type: 'flag', target: 'keldriss_approach', value: 'infiltration' },
            { type: 'loyalty', target: 'suulen', value: 10 },
          ],
        },
      ],
    },
    {
      id: 'keldriss_conquest_ossian',
      title: 'THE RUST',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        'The brawl in the market gets you attention. The wrong kind.',
        'On the second night, Suulen wakes you. She doesn\'t knock. She\'s just there, in the dark of your quarters, close enough that you can smell the pine resin on her clothes.',
        '"There\'s a monastery on the interior ridge. Not a real one. The locals call it the Cage. It\'s run by a man named Brother Ossian."',
      ],
    },
    {
      id: 'keldriss_conquest_ossian_b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Monastery."',
      ],
    },
    {
      id: 'keldriss_conquest_ossian_c',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Labor camp. Ossian collects people who owe debts to the Kolmari-aligned brokers. Takes them to the ridge. They work off what they owe." She pauses. "They never work it off. The interest compounds. Ossian controls the terms."',
      ],
    },
    {
      id: 'keldriss_conquest_ossian_d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Why are you telling me this at three in the morning?"',
      ],
    },
    {
      id: 'keldriss_conquest_ossian_e',
      speaker: 'suulen',
      speakerName: 'Suulen Vassere',
      paragraphs: [
        '"Because two of the cutthroats you beat today had his brand on their wrists. A circle with a line through it. Rust mark. He brands them with corroded Iron. The scar never heals clean."',
      ],
    },
    {
      id: 'keldriss_conquest_ossian_f',
      speaker: 'ossian',
      speakerName: 'Brother Ossian',
      effect: 'flash_crimson',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'The next morning you see him.',
        'Brother Ossian stands at the edge of the market like a stain on glass. Tall. Skeletal. Shaved head the color of tarnished copper. He wears a robe that might have been white once, before the jungle and the years and whatever lives inside him got to it. His hands hang at his sides and where his fingers brush the metal stall frame, the iron turns orange and flakes.',
        'Rust. Not a metaphor. His Iron manifests as corrosion. He doesn\'t harden. He decays. Everything he touches rots from the inside.',
        'He looks at you across the market. Doesn\'t blink. You\'ve seen a lot of people look at you since you came to the Bastion Sea, with fear, with hunger, with calculation, with hate. Ossian looks at you with serenity. The absolute calm of a man who believes suffering is currency and he is the bank.',
        '"The Oni." His voice carries without volume. A sermon voice. "I\'ve heard your broadcasts. Impressive theater. But theater burns out. Suffering endures."',
        'He smiles. It\'s the worst smile you\'ve seen in your life.',
        '"When you\'re finished playing conqueror, come to the ridge. Everyone does, eventually. The debts always come due."',
        'He doesn\'t leave. He just stops looking at you. His attention shifts to a fruit vendor two stalls down, and he starts talking to her about mangoes, and the vendor talks back like this is normal, like the rotting man who rusts metal by touching it is a regular customer with opinions about ripeness. The stall frame where his hand rested crumbles into orange dust. Nobody mentions it.',
      ],
    },
    {
      id: 'keldriss_conquest_ossian_g',
      speaker: 'fael',
      speakerName: 'Fael',
      paragraphs: [
        'Fael appears at your side. She\'s watching the treeline where Ossian vanished. Her two-fingered hand rests on her longbow.',
        '"He\'s been here longer than me. Longer than the market. The brokers answer to him, not the other way around. You want Keldriss?" She looks at you. "You\'ll have to go through the Cage first."',
      ],
    },
    {
      id: 'keldriss_conquest_03',
      title: 'THE SHADOW FALLS',
      speaker: 'ossa',
      speakerName: 'Ossa Veile',
      effect: 'shake',
      sfx: 'combat_heavy',
      paragraphs: [
        'It takes three days. Three days of meetings, threats, bribes, and one spectacular brawl in the market when the Kolmari-aligned brokers try to have you killed. Ossian\'s people. You recognize the rust marks on their wrists. They\'re good. You\'re better. Kovesse streams the whole thing.',
        'On the fourth day, Ossa Veile sends a message. One word: "Come."',
        'Her office is a cave behind a waterfall. The mist coats everything, your skin, the ironwood desk, the books on shelves carved directly into the rock. Ossa Veile sits behind the desk with a cup of tea that hasn\'t been touched and a face that has seen enough to stop being surprised by anything.',
        'She\'s old. Older than Suulen, maybe. Her hands are covered in ink stains so deep they\'ve become part of her skin. A Grimoire tablet sits dark beside her, and the walls are covered in charts. Not navigation charts. Network charts. Lines connecting names to names, debts to favors, secrets to pressure. Decades of work.',
        '"Three cutthroats in the infirmary. Two brokers hiding in the reef caves. One market stall on fire, which I assume was the Rathai." She lifts the untouched tea. Sets it back down without drinking. "You\'ve cost me a great deal of quiet, Captain."',
      ],
    },
    {
      id: 'keldriss_conquest_03b',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"The Broker Circle works for me. Not the Kolmari, not the Wardensea. In exchange, I protect the market, keep trade routes open, and stop breaking things."',
      ],
    },
    {
      id: 'keldriss_conquest_03c',
      speaker: 'ossa',
      speakerName: 'Ossa Veile',
      paragraphs: [
        '"And if I refuse?"',
      ],
    },
    {
      id: 'keldriss_conquest_03d',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        'You sit. The chair protests. You take the drink she poured but hasn\'t offered.',
        '"Then I come back tomorrow with less patience. And Kovesse puts this cave, your charts, your network, your face, on every Grimoire feed in the Bastion Sea. The Shadow Market stops being a shadow. And you lose forty years of work in an afternoon."',
      ],
    },
    {
      id: 'keldriss_conquest_03e',
      speaker: 'ossa',
      speakerName: 'Ossa Veile',
      paragraphs: [
        'Ossa doesn\'t blink. Doesn\'t flinch. She reaches over, takes the drink back from your hand, and finishes it herself.',
        '"I built this network when you were in diapers, boy. I\'ve survived six Conquerors, two Wardensea purges, and one particularly persistent Kolmari auditor who fell off a cliff." She sets the empty glass down. "You\'re not the first man to walk in here and make demands."',
      ],
    },
    {
      id: 'keldriss_conquest_03f',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"I\'m the first one you didn\'t have killed."',
        'Silence. Something changes in her face.',
      ],
    },
    {
      id: 'keldriss_conquest_03g',
      speaker: 'ossa',
      speakerName: 'Ossa Veile',
      paragraphs: [
        '"The Reef Runners report to your Morventhi. Weekly intelligence drops, non-negotiable. The market stays dark. No flags. No banners. No..." She waves at your head. "No horns."',
      ],
    },
    {
      id: 'keldriss_conquest_03h',
      speaker: 'karyudon',
      speakerName: 'Karyudon',
      paragraphs: [
        '"Horns are non-negotiable."',
      ],
    },
    {
      id: 'keldriss_conquest_03i',
      speaker: 'ossa',
      speakerName: 'Ossa Veile',
      paragraphs: [
        '"Then keep them below the treeline. This island works because nobody sees it. You\'ll learn that or you\'ll lose everything I\'m giving you."',
      ],
      choices: [
        {
          id: 'keldriss_accept_terms',
          text: '"Deal. The shadows work for me now. But the light keeps shining when I need it to."',
          consequence: 'Accept her terms. Get to work.',
          available: true,
          effects: [
            { type: 'reputation', value: 5 },
            { type: 'resource', target: 'intelligence', value: 15 },
            { type: 'loyalty', target: 'suulen', value: 5 },
            { type: 'loyalty', target: 'delvessa', value: 5 },
          ],
        },
        {
          id: 'keldriss_assert_dominance',
          text: '"Your terms are noted. Here are mine: everything you just said, plus the Broker Circle answers to me personally. Not Suulen. Not Delvessa. ME."',
          consequence: 'Total authority. My way.',
          available: true,
          effects: [
            { type: 'infamy', value: 5 },
            { type: 'reputation', value: 8 },
            { type: 'resource', target: 'intelligence', value: 10 },
            { type: 'loyalty', target: 'vorreth', value: -5 },
          ],
        },
      ],
    },
    {
      id: 'keldriss_conquest_04',
      title: 'THE NEW ORDER',
      effect: 'flash',
      sfx: 'combat_cinematic_boom',
      paragraphs: [
        'Keldriss doesn\'t change. That\'s the point. The stalls stay up. The smugglers keep smuggling. The brokers keep brokering. The difference is that you can hear it now. The information that used to flow around you flows through you.',
        'Suulen vanishes for an hour. Comes back with ink on her fingers and says nothing except: "It\'s done." She\'s been planning the dead-drop network since before you took the island. Maybe since before you arrived.',
        'You stand at the edge of Keldriss\'s harbor. The forest is dark behind you. The sea is dark ahead. A Reef Runner\'s boat cuts through the twilight without running lights, heading somewhere Suulen already knows about.',
        'Two islands. Two different kinds of power. Tavven Shoal gave you a harbor. Keldriss gives you eyes.',
      ],
    },
  ],
  onComplete: [
    { type: 'conquer', target: 'keldriss', value: true },
    { type: 'flag', target: 'keldriss_conquered', value: true },
    { type: 'bounty', value: 15000000 },
    { type: 'resource', target: 'intelligence', value: 10 },
    { type: 'notification', value: true, notification: {
      type: 'story',
      title: '🏴 KELDRISS - UNDER YOUR SHADOW',
      message: 'The Shadow Market answers to you. Intelligence flows. The Reef Runners report to Suulen. Keldriss is yours. Not by flag, but by fear and pragmatism.',
    }},
    { type: 'notification', value: true, notification: {
      type: 'grimoire',
      title: 'GRIMOIRE ALERT - KELDRISS FALLS',
      message: 'Reports indicate that the infamous smuggler\'s haven of Keldriss has come under the influence of Renegade captain Karyudon. The Kolmari Pact is reportedly furious. The Wardensea is "monitoring the situation."',
    }},
    { type: 'dominion', target: 'sight', value: 25 },
    { type: 'dominion', target: 'king', value: 15 },
    { type: 'phase', value: 'act1' },
    { type: 'panel', value: 'map' },
  ],
  currentBeat: 0,
};
