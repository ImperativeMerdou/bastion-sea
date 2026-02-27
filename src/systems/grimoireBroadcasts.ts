// =============================================
// GODTIDE: BASTION SEA - Grimoire Broadcast System
// =============================================
// Kovesse doesn't just report the news - she MAKES it.
// Dynamic broadcasts generated from game state.
// These aren't pre-authored. They're combinatorial.
// The Grimoire is the Bastion Sea's only news source
// and Kovesse decides what the world hears.
// =============================================

import type { GamePhase } from '../types/game';
import type { PlayerArchetype } from './playerProfile';

// ==========================================
// BROADCAST TYPES
// ==========================================

interface BroadcastTemplate {
  id: string;
  /** Phase this template can fire in */
  phases: GamePhase[];
  /** Minimum day count */
  minDay: number;
  /** How often this template can generate (days between broadcasts) */
  cooldown: number;
  /** Condition function - receives game state snapshot */
  condition: (ctx: BroadcastContext) => boolean;
  /** Generate the broadcast title and message */
  generate: (ctx: BroadcastContext) => { title: string; message: string } | null;
}

export interface BroadcastContext {
  dayCount: number;
  gamePhase: GamePhase;
  flags: Record<string, unknown>;
  bounty: number;
  reputation: number;
  infamy: number;
  territoryCount: number;
  crewMoods: Record<string, string>; // crewId -> mood string
  supplies: number;
  sovereigns: number;
  currentIsland: string;
  playerArchetype: PlayerArchetype;
  /** Last day this template fired (set by engine before calling generate) */
  _lastFired?: number;
}

// ==========================================
// BROADCAST TEMPLATES
// ==========================================

const broadcastTemplates: BroadcastTemplate[] = [
  // ======================
  // BOUNTY MILESTONES
  // ======================
  {
    id: 'grimoire_bounty_milestone',
    phases: ['act1', 'act2', 'act3'],
    minDay: 3,
    cooldown: 5,
    condition: (ctx) => ctx.bounty >= 10000000,
    generate: (ctx) => {
      const mil = ctx.bounty / 1000000;
      if (mil >= 200) {
        return {
          title: 'KOVESSE GRENN - SPECIAL EDITION BROADCAST',
          message: `"Two hundred million Sovereigns. I want every single person listening to stop what they're doing and think about that number. Two. Hundred. Million. The Wardensea could BUY an island for that price. They could fund a fleet. They could retire every officer south of the Central Belt. Instead they're spending it on one man. One Oni. One captain who washed up on Tavven Shoal with nothing but a war club and a dream that sounded insane. It doesn't sound insane anymore. It sounds like the future. This is Kovesse Grenn, live from the ship that the entire world wants to sink, and I have NEVER been more proud to be on this frequency."`,
        };
      }
      if (mil >= 100) {
        return {
          title: 'KOVESSE GRENN - PRIORITY BROADCAST',
          message: `"One hundred million Sovereigns. For one person. Let me put that in perspective for you: the last time the Wardensea posted a nine-figure bounty, it was for Vassago Moren, the most dangerous Conqueror in thirty years. He'd been operating for a DECADE. Karyudon hit that number in months. The admiralty had to requisition new bounty paper because they ran out of space for the zeroes. I'm not making that up. I asked. This isn't a bounty anymore, people. This is the Wardensea admitting they're scared. And honestly? They should be."`,
        };
      }
      if (mil >= 50) {
        return {
          title: 'KOVESSE GRENN - GRIMOIRE UPDATE',
          message: `"Fifty million and climbing. The bounty board in Port Corvasse had to add another column. I'm told the clerk who updates it has started drinking before his shift because he can't believe the numbers he's writing. Fifty million for an Oni who was in a prison transport six months ago. There's a lesson in there about what happens when you lock up the wrong person, but the Wardensea treasurer is too busy hyperventilating to hear it."`,
        };
      }
      if (mil >= 30) {
        return {
          title: 'KOVESSE GRENN - GRIMOIRE REPORT',
          message: `"Thirty million Sovereigns. That's more than the annual budget of three islands I could name. One man is now officially worth more than a territory. The Wardensea put thirty million on his head and you know what the Captain said when I told him? He LAUGHED. Said it was insulting. Said he thought he'd done enough for at least fifty. I love this crew."`,
        };
      }
      return {
        title: 'KOVESSE GRENN - GRIMOIRE NOTICE',
        message: `"New name on the serious money board today: Karyudon. Ten million Sovereigns. For the uninitiated, that's the number where the Wardensea stops calling you a pirate and starts calling you a problem. I've been following this captain since Tavven Shoal and let me tell you something, listeners: ten million is the beginning. This man doesn't stop. He doesn't slow down. And every time someone tells him he can't do something, he does it on Grimoire so the whole sea watches. Remember this broadcast. You heard the name here first."`,
      };
    },
  },

  // ======================
  // TERRITORY COMMENTARY
  // ======================
  {
    id: 'grimoire_territory_growing',
    phases: ['act1', 'act2'],
    minDay: 5,
    cooldown: 8,
    condition: (ctx) => ctx.territoryCount >= 3,
    generate: (ctx) => {
      if (ctx.territoryCount >= 8) {
        return {
          title: '📻 GRIMOIRE ANALYSIS',
          message: `"Eight islands. Karyudon controls eight islands. We're past 'pirate' and past 'warlord.' The word people are using now, the one the Kolmari traders whisper when they think I can't hear, is 'king.' Whether that's prophecy or paranoia depends on who you ask."`,
        };
      }
      if (ctx.territoryCount >= 6) {
        return {
          title: '📻 GRIMOIRE ANALYSIS',
          message: `"Six territories under one banner. The last person to hold this much of the Bastion Sea was Admiral Vasshen's predecessor, and he had the entire Wardensea navy. Karyudon did it with a crew of five and an attitude problem."`,
        };
      }
      if (ctx.territoryCount >= 4) {
        return {
          title: '📻 GRIMOIRE REPORT',
          message: `"Four islands, and the Central Belt is shaking. Trade routes are shifting. Merchants who used to pay Wardensea tariffs are now paying Karyudon's rates, which are lower. Funny how economics works when you cut out the middleman with a sword."`,
        };
      }
      return {
        title: '📻 GRIMOIRE NOTE',
        message: `"Three islands under Karyudon's flag. The pattern is forming. This isn't raiding. It's conquest. Whether the Bastion Sea is ready for that depends on how many more islands he takes before someone stops him."`,
      };
    },
  },

  // ======================
  // TERRITORY LOSS / REBELLION
  // ======================
  {
    id: 'grimoire_territory_lost',
    phases: ['act1', 'act2', 'act3'],
    minDay: 5,
    cooldown: 6,
    condition: (ctx) => !!ctx.flags['territory_recently_lost'],
    generate: (ctx) => {
      const islandName = ctx.flags['last_rebellion_island'] as string || 'an island';
      if (ctx.territoryCount === 0) {
        return {
          title: '📻 KOVESSE GRENN - BREAKING',
          message: `"It's over. ${islandName} was the last one. Every island Karyudon held is gone. Rebellion, reconquest, or simple abandonment. The empire that shook the Bastion Sea now controls nothing but the deck of one ship. I've seen empires crumble before, but never this fast. The question isn't whether Karyudon can take it back. The question is whether there's anything left to take."`,
        };
      }
      if (ctx.territoryCount <= 2) {
        return {
          title: '📻 GRIMOIRE ALERT',
          message: `"${islandName} has fallen to rebellion. That's the pattern now: conquest, decline, collapse. Karyudon's empire is shrinking faster than it grew. The remaining territories are watching. When the people you rule see that rebellion works, the idea spreads. I've seen it before. It spreads fast."`,
        };
      }
      return {
        title: '📻 GRIMOIRE REPORT',
        message: `"Rebellion in ${islandName}. The garrison was overrun. Population took the docks at dawn and the flag came down by midday. The Wardensea is already circling, smelling blood. Every power in the Bastion Sea just updated their maps. One less island under the Oni's flag. The question on everyone's mind: is this the first crack, or the last?"`,
      };
    },
  },

  // ======================
  // TERRITORY UNREST WARNING
  // ======================
  {
    id: 'grimoire_territory_unrest',
    phases: ['act1', 'act2', 'act3'],
    minDay: 8,
    cooldown: 10,
    condition: (ctx) => ctx.territoryCount >= 2 && !ctx.flags['territory_recently_lost'],
    generate: (ctx) => {
      // Only fire as general "cracks forming" commentary when player has territory but hasn't lost any recently
      if (ctx.territoryCount >= 5 && ctx.infamy > ctx.reputation) {
        return {
          title: '📻 GRIMOIRE OBSERVATION',
          message: `"Reports from the outer territories: discontent. Not rebellion. Not yet. But the word 'yet' is doing a lot of heavy lifting in that sentence. Karyudon rules by force, and force requires presence. You can't be everywhere. The people know that."`,
        };
      }
      return null;
    },
  },

  // ======================
  // REPUTATION VS INFAMY
  // ======================
  {
    id: 'grimoire_reputation_high',
    phases: ['act1', 'act2', 'act3'],
    minDay: 7,
    cooldown: 10,
    condition: (ctx) => ctx.reputation >= 40 && ctx.reputation > ctx.infamy * 2,
    generate: (ctx) => {
      if (ctx.reputation >= 70) {
        return {
          title: '📻 GRIMOIRE EDITORIAL',
          message: `"I've been doing this job for fourteen years. I've covered wars, coups, trade crashes, and one actual hurricane. I have never seen public opinion shift this fast. Karyudon isn't just popular. He's becoming necessary. People are starting to plan their futures around him. That's either leadership or cult of personality, and I can't tell which yet."`,
        };
      }
      return {
        title: '📻 GRIMOIRE OBSERVATION',
        message: `"An interesting development: Karyudon's reputation is growing faster than his bounty. People are talking about fair treatment, better trade rates, protection from pirates. The Wardensea offers the same things, on paper. The difference is that Karyudon actually delivers."`,
      };
    },
  },
  {
    id: 'grimoire_infamy_high',
    phases: ['act1', 'act2', 'act3'],
    minDay: 7,
    cooldown: 10,
    condition: (ctx) => ctx.infamy >= 40 && ctx.infamy > ctx.reputation * 2,
    generate: (ctx) => {
      if (ctx.infamy >= 70) {
        return {
          title: '📻 GRIMOIRE WARNING',
          message: `"I want to be clear about what I'm reporting. This isn't a freedom fighter. This isn't a revolutionary with a cause. Karyudon rules through fear, and the people he's conquered know it. Doors lock when his ship appears on the horizon. That's not respect. That's survival instinct. I broadcast from a hidden location for a reason."`,
        };
      }
      return {
        title: '📻 GRIMOIRE REPORT',
        message: `"Karyudon's infamy is spreading faster than his name. Stories about burned docks, forced surrenders, and broken negotiations. The Bastion Sea has had tyrants before. The question is whether this one is building something or just breaking things."`,
      };
    },
  },

  // ======================
  // WARDENSEA COMMENTARY
  // ======================
  {
    id: 'grimoire_wardensea_pressure',
    phases: ['act2', 'act3'],
    minDay: 1,
    cooldown: 12,
    condition: (ctx) => !!ctx.flags['act2_begun'] && ctx.bounty >= 30000000,
    generate: (ctx) => {
      if (ctx.flags['vasshen_defeated']) {
        return {
          title: '📻 GRIMOIRE BREAKING',
          message: `"This just in: Admiral Vasshen's First Division has been defeated. I'm going to repeat that because I'm not sure I believe it myself. The First Division, the Wardensea's finest, broken by a crew of five and an Oni with a stolen heirloom. The balance of power in the Bastion Sea just fundamentally changed."`,
        };
      }
      const ultimatumResponse = ctx.flags['ultimatum_response'] as string;
      if (ultimatumResponse === 'public_rejection') {
        return {
          title: '📻 GRIMOIRE ANALYSIS',
          message: `"Karyudon rejected the Wardensea's ultimatum publicly. Publicly. Not quietly, not through back channels. He said no where everyone could hear it. That's either supreme confidence or a death wish. The Wardensea doesn't get rejected. They get even."`,
        };
      }
      if (ultimatumResponse === 'private_rejection') {
        return {
          title: '📻 GRIMOIRE INTELLIGENCE',
          message: `"Word through back channels: Karyudon sent a sealed response to the Wardensea ultimatum. No broadcast. No spectacle. A private 'no' to the most powerful navy in the Bastion Sea. Quieter than I expected. Arguably smarter. Vasshen hates being embarrassed more than she hates being refused."`,
        };
      }
      if (ultimatumResponse === 'stalled') {
        return {
          title: '📻 GRIMOIRE OBSERVATION',
          message: `"Interesting development: Karyudon hasn't rejected the ultimatum. Hasn't accepted it either. He's stalling. And the clock is ticking. Vasshen gave fourteen days and she meant fourteen days. Whether this buys enough time or just delays the inevitable depends on what he does with those days."`,
        };
      }
      return {
        title: '📻 GRIMOIRE INTELLIGENCE',
        message: `"The Wardensea is repositioning. Fleet movements along the southern corridor. Supply convoys rerouting through Durrek Garrison. If you're a merchant sailing the Central Belt, I'd recommend having your papers in order and your prayers ready."`,
      };
    },
  },

  // ======================
  // CONQUEROR ACTIVITY
  // ======================
  {
    id: 'grimoire_conqueror_news',
    phases: ['act2', 'act3'],
    minDay: 1,
    cooldown: 14,
    condition: (ctx) => !!ctx.flags['conqueror_contacted'],
    generate: (ctx) => {
      const alliance = ctx.flags['conqueror_alliance'];
      if (alliance === 'allied') {
        return {
          title: '📻 GRIMOIRE EXCLUSIVE',
          message: `"Rumors of an alliance between Karyudon and the Conquerors. Unconfirmed. But the Conqueror vessel Ghost-Sight was spotted in Karyudon's waters, and it left without violence. That's either diplomacy or the most polite reconnaissance in naval history. I'm investigating."`,
        };
      }
      if (alliance === 'rejected') {
        return {
          title: '📻 GRIMOIRE RUMOR',
          message: `"Word from Ghostlight Reef: the Conquerors aren't happy. Whatever Tessavarra offered, Karyudon turned it down. That takes brass. Or stupidity. Possibly both. Either way, keep your eyes on the horizon. Rejected allies have a way of becoming creative enemies."`,
        };
      }
      return {
        title: '📻 GRIMOIRE RUMOR',
        message: `"The Conquerors are moving. Not their usual pattern: hunting grounds, territorial sweeps. These are targeted movements. Something in the Bastion Sea has their attention. My sources say it's the same thing that has everyone else's attention. Three guesses who."`,
      };
    },
  },

  // ======================
  // KOLMARI TRADE NEWS
  // ======================
  {
    id: 'grimoire_kolmari_trade',
    phases: ['act2', 'act3'],
    minDay: 1,
    cooldown: 12,
    condition: (ctx) => !!ctx.flags['ultimatum_answered'] || !!ctx.flags['blockade_resolved'],
    generate: (ctx) => {
      if (ctx.flags['blockade_resolved']) {
        return {
          title: '📻 GRIMOIRE MARKET REPORT',
          message: `"The Kolmari blockade has ended. Trade lanes reopening. Supply prices dropping. Whatever Karyudon did, force, diplomacy, or something between, it worked. The merchants are moving again and the Confederation is quietly pretending the whole thing never happened."`,
        };
      }
      return {
        title: '📻 GRIMOIRE ECONOMIC ALERT',
        message: `"The Kolmari Confederation has imposed a trade blockade on Karyudon's territories. Supply ships turned back at the reef line. Prices are spiking. For the common sailor, this means hunger. For Karyudon, it means a problem that can't be solved with a sword. Maybe."`,
      };
    },
  },

  // ======================
  // CREW MORALE COMMENTARY
  // ======================
  {
    id: 'grimoire_crew_trouble',
    phases: ['act1', 'act2', 'act3'],
    minDay: 8,
    cooldown: 10,
    condition: (ctx) => {
      const moods = Object.values(ctx.crewMoods);
      return moods.filter((m) => m === 'disgruntled' || m === 'mutinous').length >= 2;
    },
    generate: () => ({
      title: '📻 GRIMOIRE INSIDER',
      message: `"Sources close to Karyudon's crew report tension on board. Arguments overheard. Silences where there used to be laughter. Every captain knows: a ship breaks from the inside first. The crew is the foundation. If it cracks, everything built on top comes down."`,
    }),
  },

  // ======================
  // SUPPLY CRISIS
  // ======================
  {
    id: 'grimoire_supply_crisis',
    phases: ['act1', 'act2', 'act3'],
    minDay: 5,
    cooldown: 8,
    condition: (ctx) => ctx.supplies <= 5 && ctx.sovereigns <= 20,
    generate: () => ({
      title: '📻 GRIMOIRE OBSERVATION',
      message: `"Word on the docks is that Karyudon's fleet is running lean. Very lean. Cargo holds echoing, crew checking rations twice. An empire runs on supply lines, and right now those lines are threadbare. The question every power in the Bastion Sea is asking: is this the moment?"`,
    }),
  },

  // ======================
  // GENERAL FLAVOR - Early Game
  // ======================
  {
    id: 'grimoire_early_flavor',
    phases: ['prologue', 'act1'],
    minDay: 2,
    cooldown: 6,
    condition: (ctx) => ctx.dayCount <= 15,
    generate: (ctx) => {
      const pool = [
        {
          title: '📻 GRIMOIRE WEATHER',
          message: `"Calm seas north of the Belt. Moderate swells along the southern corridor. The Storm Season is three weeks out. Plan accordingly. Also, someone stole a Wardensea patrol boat near Keldriss. Unrelated, probably."`,
        },
        {
          title: '📻 GRIMOIRE MARKET',
          message: `"Copper prices steady at Coppervein. Silk moving well through Sorrens Flat. And for those interested in less legitimate commerce: the smuggling lanes around Mossbreak are busy. I'm not endorsing. I'm informing."`,
        },
        {
          title: '📻 GRIMOIRE LOCAL',
          message: `"Tavven Shoal's new management continues to settle in. Opinions are divided: some say it's an improvement, others say they preferred when the biggest problem was overpriced fish. Such is the nature of regime change."`,
        },
      ];
      // Seeded random selection based on day (deterministic per day, but not predictable cycle)
      const seed = ((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0;
      return pool[seed % pool.length];
    },
  },

  // ======================
  // WORLD NEWS - Beyond the Player
  // ======================
  {
    id: 'grimoire_world_conquerors',
    phases: ['act2', 'act3'],
    minDay: 12,
    cooldown: 15,
    condition: (ctx) => ctx.territoryCount >= 3,
    generate: (ctx) => {
      const pool = [
        {
          title: '\u{1F4FB} GRIMOIRE - CONQUEROR WATCH',
          message: `"The Five are restless. Vassago Moren's Bastion Fleet just ran live-fire exercises in the Denn Corridor, seventeen ships moving in formation. Daeshara tripled her eastern garrison. Goltieri bought another trade route. Kuldhara's storms are getting worse. Senmovar hasn't moved at all, which is somehow the most alarming thing on this list. When the Conquerors all start moving at once, it means something changed. Three guesses what. First two don't count."`,
        },
        {
          title: '\u{1F4FB} GRIMOIRE - CONQUEROR ANALYSIS',
          message: `"The Vassago-Daeshara debate hit four million subscribers this week. For context: the entire Wardensea has 82,000 personnel. Four million people are arguing about which Conqueror would win in a fight. Gorune Vassik published a thirty-page breakdown with frame analysis. Hollenne Tavk published a one-sentence prediction and was probably right. The Bastion Sea does not have an attention deficit. It has an attention surplus pointed directly at the people who could break the world."`,
        },
        {
          title: '\u{1F4FB} GRIMOIRE - INTELLIGENCE BRIEF',
          message: `"Interesting development from Montalvo: Dessaren Goltieri, the Smiling Sovereign, just raised port fees by 3%. That's nothing, right? Wrong. Every crew that runs the Kingsrun passes through Montalvo. A 3% increase across twelve hundred operatives and three hundred ship transits per season is a fortune. He's not conquering territory. He's taxing the future. Delvessa called it 'elegant.' She did not mean it as a compliment."`,
        },
      ];
      const seed = ((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0;
      return pool[seed % pool.length];
    },
  },

  // ======================
  // KINGSRUN SEASON
  // ======================
  {
    id: 'grimoire_kingsrun_season',
    phases: ['act1', 'act2', 'act3'],
    minDay: 8,
    cooldown: 18,
    condition: (ctx) => ctx.territoryCount >= 2,
    generate: (ctx) => {
      const pool = [
        {
          title: '\u{1F4FB} KINGSRUN WATCH - Season Update',
          message: `"Kingsrun season update: of forty-two registered crews, eleven have passed Brannach. Six reached Ossengaard. Two made it to Kassuran Spire. None past Vossgrave. The deep Kingsrun is eating them. It always does. But every year they go, and every year the ones who come back have that look. The one that says they saw something that changed what they thought was possible. That look is the entire engine of Renegade culture."`,
        },
        {
          title: '\u{1F4FB} KINGSRUN WATCH - Ourseva Report',
          message: `"Ourseva Denn's clinic at Kelvanni patched up six crews this week. Burns from Brannach, reef cuts from Gallun's Tooth, and one case of what she calls 'deep-water anxiety,' which is a polite term for a man who saw a deepcaller surface at four hundred feet and hasn't stopped shaking. Ourseva's debt ledger grows. She's been healing Kingsrun crews for two hundred and eight years. She built the clinic on the salvage of the crew she couldn't save."`,
        },
        {
          title: '\u{1F4FB} KINGSRUN WATCH - Threshold Report',
          message: `"One crew reached the Threshold this season. The Corsair's Gambit, out of Selvaggio. Captain Rossune Tavk, a 38-year-old Human with no God Fruit, no Conqueror backing, and a crew of nine. They stopped at the Threshold, read their crew roster aloud, carved their names on the mast, and turned back. They didn't attempt the Vorrenmaw. Nobody has since the Sovereign King. But they made it to the door, and that's more than anyone else can say this year."`,
        },
      ];
      const seed = ((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0;
      return pool[seed % pool.length];
    },
  },

  // ======================
  // NAMED COMMENTATORS
  // ======================
  {
    id: 'grimoire_commentator_color',
    phases: ['act1', 'act2', 'act3'],
    minDay: 10,
    cooldown: 14,
    condition: (ctx) => ctx.bounty >= 20000000,
    generate: (ctx) => {
      const pool = [
        {
          title: '\u{1F4FB} GRIMOIRE - DRUSSARA KENN',
          message: `"Bounty analyst Drussara Kenn published her latest MEAB breakdown: 'Karyudon's bounty composition is 35% combat assessment, 25% territorial disruption, 22% ideological danger, and 18% economic damage. The ideological component is climbing faster than the combat score. The Wardensea is more afraid of what he represents than what he can break. That has historically been the inflection point.'"`,
        },
        {
          title: '\u{1F4FB} GRIMOIRE - FAN CULTURE',
          message: `"Gorune Vassik's latest phonk edit, Kuldhara's lightning strike at Kassuran Spire set to bass-boosted percussion, just hit 900 million views. Nine hundred million. For context: the world's population is six billion. That means one in every seven sentient beings has watched a sixty-second clip of an Oni hitting a rock with lightning while drums play. Kovesse says this is the greatest achievement in Grimoire history. I am not qualified to disagree."`,
        },
        {
          title: '\u{1F4FB} GRIMOIRE - COMMUNITY',
          message: `"The BullFox discourse has reached twelve thousand pieces of fan art. For the uninitiated: 'BullFox' is the fan pairing of Mavrokka Deshaan and Tomoe Gallacs, who have met exactly once and spent the entire encounter trying to kill each other. The fan community has decided this is romantic. Dossen Trell published an eighty-page analysis. Mavrokka reportedly saw it and said a word that crashed two Grimoire relay stations."`,
        },
      ];
      const seed = ((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0;
      return pool[seed % pool.length];
    },
  },

  // ======================
  // CIVILIAN LIFE
  // ======================
  {
    id: 'grimoire_civilian_life',
    phases: ['act2', 'act3'],
    minDay: 12,
    cooldown: 16,
    condition: (ctx) => ctx.territoryCount >= 4,
    generate: (ctx) => {
      const pool = [
        {
          title: '\u{1F4FB} GRIMOIRE - THE GROUND',
          message: `"People forget this part. Below the bounties and the Conquerors and the territory maps, there are six billion people who just want to eat dinner. A Rathai girl in the Nettleworks soldering Grimoire components for one Copper Bit an hour. A Gorundai farmer in the Verossian Range carrying eighty pounds of water twice a day. A fishmonger at Tavven Shoal who doesn't care who's in charge as long as the eel stall stays open. This is the ground. This is what the power sits on."`,
        },
        {
          title: '\u{1F4FB} GRIMOIRE MARKET REPORT',
          message: `"Trade update: copper prices steady at Coppervein, silk moving through Sorrens Flat at seasonal highs, and reef rum is up 12% because apparently everyone in the Bastion Sea decided to drink at the same time. The Kolmari's official trade index says the economy is 'stable.' Delvessa says 'stable' is a word people use when they can't explain why it hasn't collapsed yet."`,
        },
        {
          title: '\u{1F4FB} GRIMOIRE LOCAL COLOR',
          message: `"Spotted on the Black-band: a nine-hour argument between a Wardensea Lieutenant and a bounty hunter about the rules of bones. The dice game. Not human remains. Though by hour seven, the distinction was narrowing. Final score: disputed. Both parties claim victory. Both parties were asked to leave the tavern. Selvaggio is, as always, itself."`,
        },
      ];
      const seed = ((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0;
      return pool[seed % pool.length];
    },
  },

  // ======================
  // BOUNTY CULTURE
  // ======================
  {
    id: 'grimoire_bounty_culture',
    phases: ['act2', 'act3'],
    minDay: 15,
    cooldown: 18,
    condition: (ctx) => ctx.bounty >= 50000000,
    generate: (ctx) => {
      const pool = [
        {
          title: '\u{1F4FB} GRIMOIRE - BOUNTY ANALYSIS',
          message: `"Brundak Kesh captured another bounty target this week. His method remains unchanged: he buys the target drinks until they pass out, then carries them to the nearest Wardensea outpost. Zero kills in a fourteen-year career. Thirty-four successful captures. He calls it 'hospitality-based conflict resolution.' The Wardensea calls it 'technically legal.' I call it the funniest thing in professional violence."`,
        },
        {
          title: '\u{1F4FB} GRIMOIRE - THREAT ASSESSMENT',
          message: `"A reminder for anyone who doesn't follow the numbers: the historical top ten bounties are dominated by current figures. Seven of the ten highest bounties ever posted are active today. Vassago Moren at 5.89 billion. Kuorren Vasseg at 5.74 billion. Senmovar at 5.1 billion. The Wardensea has never spent this much money being afraid of this many people at the same time. And somewhere below the Conqueror line, climbing fast: Karyudon."`,
        },
      ];
      const seed = ((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0;
      return pool[seed % pool.length];
    },
  },

  // ======================
  // KOVESSE BROADCAST EXPLOIT
  // ======================
  {
    id: 'grimoire_exploit_callback',
    phases: ['act2', 'act3'],
    minDay: 25,
    cooldown: 15,
    condition: (ctx) => !!ctx.flags['grimoire_exploit_saved'],
    generate: () => ({
      title: '\u{1F4FB} GRIMOIRE - KOVESSE GRENN',
      message: `"Remember that broadcast exploit I saved? The one you told me to sit on until we needed it? I've been very patient, Captain. But the time is coming. One broadcast, on every frequency in the Bastion Sea, unblockable and unjammable. Whatever you want the world to hear, I can make it happen. Just say the word."`,
    }),
  },

  // ======================
  // PLAYER ARCHETYPE EDITORIALS
  // ======================
  {
    id: 'grimoire_player_conqueror',
    phases: ['act1', 'act2', 'act3'],
    minDay: 15,
    cooldown: 10,
    condition: (ctx) => ctx.playerArchetype === 'conqueror',
    generate: (ctx) => {
      const pool = [
        {
          title: '📻 GRIMOIRE ANALYSIS',
          message: `"Commentators across the Belt are debating whether Karyudon's expansion pace is sustainable. I have a counter-question: when has the Captain ever cared about sustainable? He takes what he wants. The rest of us update our maps."`,
        },
        {
          title: '📻 GRIMOIRE EDITORIAL',
          message: `"People keep calling him a pirate. Pirates steal and run. Karyudon takes and stays. There's a word for that, and the Wardensea refuses to use it: conqueror. Maybe if they said it out loud, they'd take the threat more seriously."`,
        },
        {
          title: '📻 GRIMOIRE REPORT',
          message: `"A merchant I know calls him 'the tide that doesn't go out.' Every island he touches, the old order washes away. You can argue about whether that's good or bad. You can't argue it's happening."`,
        },
        {
          title: '📻 GRIMOIRE COMMENTARY',
          message: `"The Kolmari Trade Authority released a report this morning calling Karyudon's approach 'aggressively territorial.' Three pages of analysis. The summary: he fights, he wins, he keeps the land. Revolutionary insight, truly."`,
        },
        {
          title: '📻 GRIMOIRE NOTE',
          message: `"Heard a dockhand in Coppervein say something interesting: 'The Oni doesn't negotiate because he doesn't need to.' Cold reading. Accurate reading."`,
        },
      ];
      const hash = (((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0) % pool.length;
      return pool[hash];
    },
  },
  {
    id: 'grimoire_player_diplomat',
    phases: ['act1', 'act2', 'act3'],
    minDay: 15,
    cooldown: 10,
    condition: (ctx) => ctx.playerArchetype === 'diplomat',
    generate: (ctx) => {
      const pool = [
        {
          title: '📻 GRIMOIRE ANALYSIS',
          message: `"Analysts are having trouble with Karyudon. He doesn't fit the profile. Conquerors fight. This one talks. And the infuriating thing? The talking works. Trade agreements, nonaggression pacts, territorial handshakes. All done at a table, not a battlefield."`,
        },
        {
          title: '📻 GRIMOIRE EDITORIAL',
          message: `"The Renegade captain's preference for negotiation has certain Wardensea officers genuinely confused. They trained to fight pirates. Nobody trained them to argue with a diplomat who happens to carry a war club."`,
        },
        {
          title: '📻 GRIMOIRE REPORT',
          message: `"Sorren's Flat, Mossbreak, Coppervein. Three islands that changed flags without a shot fired. There's a pattern here, and it's not the pattern anyone expected from an Oni with a bounty that size."`,
        },
        {
          title: '📻 GRIMOIRE COMMENTARY',
          message: `"A Kolmari friend told me, 'He runs his fleet the way we run our banks: with contracts, not cannons.' Coming from a Kolmari, that's the highest compliment available."`,
        },
        {
          title: '📻 GRIMOIRE NOTE',
          message: `"The crews on other ships talk about Karyudon differently now. Less 'terrifying Oni' and more 'the one you can deal with.' In the Bastion Sea, that reputation might be worth more than any bounty."`,
        },
      ];
      const hash = (((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0) % pool.length;
      return pool[hash];
    },
  },
  {
    id: 'grimoire_player_merchant',
    phases: ['act1', 'act2', 'act3'],
    minDay: 15,
    cooldown: 10,
    condition: (ctx) => ctx.playerArchetype === 'merchant',
    generate: (ctx) => {
      const pool = [
        {
          title: '📻 GRIMOIRE MARKET REPORT',
          message: `"Trade volume in Renegade-controlled waters is up three hundred percent. No exaggeration. The Captain runs tighter margins than the Kolmari traders, and they know it. Some of them are furious. Most of them are signing deals."`,
        },
        {
          title: '📻 GRIMOIRE ANALYSIS',
          message: `"You want to understand Karyudon? Follow the money. Every decision he makes has a profit angle. Island conquests become trade hubs. Rivals become suppliers. The man doesn't think in battles. He thinks in margins."`,
        },
        {
          title: '📻 GRIMOIRE REPORT',
          message: `"Delvessa keeps the books, but the Captain sets the prices. And the prices are interesting: low enough to undercut Wardensea tariffs, high enough to fund expansion. Classic vertical integration. The Kolmari are taking notes."`,
        },
        {
          title: '📻 GRIMOIRE EDITORIAL',
          message: `"A naval intelligence officer described the Renegade fleet as 'a commercial enterprise with military capability.' She meant it as criticism. Delvessa framed the quote and hung it in the chart room."`,
        },
        {
          title: '📻 GRIMOIRE NOTE',
          message: `"Market rumor: three independent trading companies are asking for Renegade protection contracts. Not Wardensea. Renegade. When the pirates provide better trade infrastructure than the government, the government has a problem."`,
        },
      ];
      const hash = (((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0) % pool.length;
      return pool[hash];
    },
  },
  {
    id: 'grimoire_player_liberator',
    phases: ['act1', 'act2', 'act3'],
    minDay: 15,
    cooldown: 10,
    condition: (ctx) => ctx.playerArchetype === 'liberator',
    generate: (ctx) => {
      const pool = [
        {
          title: '📻 GRIMOIRE REPORT',
          message: `"Reports from liberated territories paint an unusual picture. A conqueror who listens. A warlord who rebuilds. The populations in Renegade-held islands are better fed than most Wardensea protectorates. Make of that what you will."`,
        },
        {
          title: '📻 GRIMOIRE EDITORIAL',
          message: `"The word 'liberator' is circulating in the outer islands. Not 'pirate.' Not 'conqueror.' Liberator. The Wardensea press office released a statement calling it propaganda. The people using the word aren't reading Wardensea press releases."`,
        },
        {
          title: '📻 GRIMOIRE ANALYSIS',
          message: `"Karyudon's mercy has a cost. Spared enemies become future threats. Rebuilt towns demand resources. But it also has a return: loyalty that money can't buy and fear can't manufacture. Ask anyone in Tavven. They chose to stay."`,
        },
        {
          title: '📻 GRIMOIRE COMMENTARY',
          message: `"A Gorundai dockmaster told me: 'He could have burned us. He fixed the piers instead.' Simple math to some people. Incomprehensible to the Wardensea, apparently."`,
        },
        {
          title: '📻 GRIMOIRE NOTE',
          message: `"Recruitment at Renegade-held ports is up. Volunteers, not conscripts. People lining up to serve a captain who treats the conquered like citizens. The Wardensea hasn't seen defection rates like this in a generation."`,
        },
      ];
      const hash = (((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0) % pool.length;
      return pool[hash];
    },
  },
  {
    id: 'grimoire_player_pragmatist',
    phases: ['act2', 'act3'],
    minDay: 20,
    cooldown: 12,
    condition: (ctx) => ctx.playerArchetype === 'pragmatist',
    generate: (ctx) => {
      const pool = [
        {
          title: '📻 GRIMOIRE ANALYSIS',
          message: `"Wardensea intelligence admits difficulty profiling the Renegade captain's strategy. He fights when fighting works. Negotiates when talking works. Trades when the margins are right. There's no ideology to exploit. Just results."`,
        },
        {
          title: '📻 GRIMOIRE EDITORIAL',
          message: `"The most dangerous kind of enemy is the one you can't predict. Conquerors attack. Diplomats negotiate. Karyudon does whatever the situation requires, and the admirals keep reaching for playbooks that don't apply."`,
        },
        {
          title: '📻 GRIMOIRE REPORT',
          message: `"Three different Kolmari analysts gave me three different profiles for Karyudon. One called him a warlord. One called him a merchant. One called him a statesman. They're all right. That's the problem."`,
        },
        {
          title: '📻 GRIMOIRE COMMENTARY',
          message: `"Vorreth said something that stuck with me: 'The Captain doesn't have a style. He has a situation.' I've been watching for months. That's the most accurate assessment I've heard."`,
        },
        {
          title: '📻 GRIMOIRE NOTE',
          message: `"Predictability is a weakness. Every fleet, every empire, every conqueror before Karyudon had a pattern. The Wardensea found the pattern and used it. They're still looking for his."`,
        },
      ];
      const hash = (((ctx.dayCount + (ctx._lastFired || 0)) * 2654435761) >>> 0) % pool.length;
      return pool[hash];
    },
  },

  // ======================
  // ENDGAME
  // ======================
  {
    id: 'grimoire_endgame',
    phases: ['act3'],
    minDay: 1,
    cooldown: 8,
    condition: (ctx) => !!ctx.flags['act3_begun'],
    generate: (ctx) => {
      if (ctx.flags['final_council_complete']) {
        return {
          title: '📻 GRIMOIRE - FINAL BROADCAST',
          message: `"This is Kovesse, signing on from an undisclosed location. If you're hearing this, the Bastion Sea is about to change forever. Whatever happens next, whatever Karyudon becomes, remember that I was here. Broadcasting. Until the end."`,
        };
      }
      if (ctx.territoryCount >= 10) {
        return {
          title: '📻 GRIMOIRE SPECIAL REPORT',
          message: `"The Bastion Sea has a new geography. Not the kind you find on maps. The kind you find in the way people talk, trade, and plan. Every conversation starts with 'What will Karyudon do?' Every deal runs through his waters. This isn't influence. This is gravity."`,
        };
      }
      return {
        title: '📻 GRIMOIRE ACT 3',
        message: `"We're in the endgame. I can feel it. The Wardensea is mobilizing. The Conquerors are circling. The Kolmari are calculating. And in the center of all of it: one crew, one ship, one absurdly dangerous Oni. However this ends, I'll be broadcasting."`,
      };
    },
  },
];

// ==========================================
// BROADCAST GENERATION ENGINE
// ==========================================

/**
 * Check which broadcasts should fire given the current game state.
 * Returns an array of notifications to add.
 * Tracks cooldowns via flags in the format: `grimoire_broadcast_${templateId}_lastDay`.
 */
export function generateGrimoireBroadcasts(
  ctx: BroadcastContext,
  firedBroadcastDays: Record<string, number>,
): { broadcasts: Array<{ title: string; message: string }>; updatedDays: Record<string, number> } {
  const broadcasts: Array<{ title: string; message: string }> = [];
  const updatedDays = { ...firedBroadcastDays };

  // Generate up to 2 broadcasts per day for richer world feedback
  let generated = 0;
  const maxPerCycle = 2;

  // Shuffle template evaluation order per day to avoid priority bias
  // (earlier templates always winning when multiple qualify)
  const shuffledTemplates = [...broadcastTemplates];
  const dayShuffle = ((ctx.dayCount * 2654435761) >>> 0);
  for (let i = shuffledTemplates.length - 1; i > 0; i--) {
    const j = ((dayShuffle + i * 1597334677) >>> 0) % (i + 1);
    [shuffledTemplates[i], shuffledTemplates[j]] = [shuffledTemplates[j], shuffledTemplates[i]];
  }

  for (const template of shuffledTemplates) {
    if (generated >= maxPerCycle) break;

    // Phase check
    if (!template.phases.includes(ctx.gamePhase)) continue;

    // Day check
    if (ctx.dayCount < template.minDay) continue;

    // Cooldown check (grimoire amplifier halves cooldowns)
    const lastFired = firedBroadcastDays[template.id] || 0;
    const effectiveCooldown = ctx.flags['has_grimoire_amplifier']
      ? Math.max(1, Math.floor(template.cooldown * 0.5))
      : template.cooldown;
    if (ctx.dayCount - lastFired < effectiveCooldown) continue;

    // Condition check
    if (!template.condition(ctx)) continue;

    // Generate (inject lastFired so seeded pools can avoid repeats)
    ctx._lastFired = firedBroadcastDays[template.id] || 0;
    const result = template.generate(ctx);
    if (result) {
      broadcasts.push(result);
      updatedDays[template.id] = ctx.dayCount;
      generated++;
    }
  }

  return { broadcasts, updatedDays };
}
