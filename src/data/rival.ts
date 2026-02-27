// =============================================
// GODTIDE: BASTION SEA - Rival Character
// =============================================
// Sable Venn, "The Auction"
// The dark mirror. Same ambition, opposite method.
// He buys what Karyudon takes. And he can't
// understand why people follow the Oni for free.
// =============================================

import type { Character, RivalState } from '../types/game';

export const rivalCharacter: Character = {
  id: 'sable_venn',
  name: 'Sable Venn',
  epithet: 'The Auction',
  race: 'Human',
  age: 27,
  bounty: 45000000,
  description:
    'Lean, pale, impeccably dressed. White hair slicked back, one gold eye, one glass eye ' +
    '(lost in a bet he won). Wears a Kolmari merchant\'s coat tailored for combat: reinforced ' +
    'silk, hidden blade sheaths. Carries no visible weapon. Fights with a Craft-grade auctioneer\'s ' +
    'gavel called Sold that weighs 40 pounds and hits like a cannon.',
  personality:
    'Talks like every conversation is a negotiation. Quotes prices. Values everything in Sovereigns, ' +
    'including people. Genuinely charming, funny, generous -- until you\'re in his way. Then he\'s the ' +
    'coldest person alive.',
  flaw:
    'Cannot comprehend loyalty that isn\'t purchased. His crew is competent but mercenary. ' +
    'The moment the money stops, so does the loyalty. He knows this. It terrifies him.',
  dream:
    'Buy the Bastion Sea. Not conquer it. Buy it. Every island, every trade route, every ship. ' +
    'A world where everything has a price and Sable Venn sets it.',
  dominion: {
    iron: { tier: 'tempered', level: 25 },
    sight: { tier: 'forged', level: 55 },
    king: { tier: 'tempered', level: 35 },
  },
  korvaan: 'none',
  weapon: 'Sold (Craft-grade auctioneer\'s gavel, Concussive Tone)',
};

// Sable's crew -- The Closing Bid
export const rivalCrew = {
  name: 'The Closing Bid',
  ship: 'The Final Offer',
  members: [
    {
      id: 'rikkart',
      name: 'Rikkart Bolm',
      epithet: 'The Margin',
      role: 'First Mate / Enforcer',
      description:
        'Eight feet of Gorundai muscle wrapped in a debt collector\'s suit two sizes too small. ' +
        'Doesn\'t talk. Doesn\'t need to. His presence IS the negotiation tactic.',
    },
    {
      id: 'lenne_dosh',
      name: 'Lenne Dosh',
      epithet: 'The Cartographer',
      role: 'Navigator / Intelligence',
      description:
        'Former Wardensea cartographer who sold classified patrol route maps to seventeen different ' +
        'buyers. Thin, nervous, brilliant. Navigates by selling secrets to whoever\'s chasing them.',
    },
    {
      id: 'pell',
      name: 'Pell',
      epithet: 'The Twins (Left)',
      role: 'Intelligence / Espionage',
      description:
        'Identical twins. Human. Age unknown. They finish each other\'s sentences and share information ' +
        'through means nobody has successfully identified. Rumored to have split a single Sight-type ' +
        'God Fruit between them.',
    },
    {
      id: 'mott',
      name: 'Mott',
      epithet: 'The Twins (Right)',
      role: 'Intelligence / Espionage',
      description:
        'The other one. Slightly more talkative. Slightly more dangerous. The distinction matters ' +
        'less than you\'d think.',
    },
  ],
};

// Sable's encounter appearances across the game
export const rivalEncounters = {
  // Act 1: First meeting at Tavven Shoal after player takes it
  introduction: {
    id: 'rival_intro',
    triggerPhase: 'act1',
    triggerDay: 3, // 3 days after act1 begins
    description: 'Sable arrives at Tavven Shoal. He wanted this island. You took it first.',
  },
  // Act 1: He steals a trade route you were building
  trade_theft: {
    id: 'rival_trade_theft',
    triggerPhase: 'act1',
    triggerCondition: 'tradeRoutes.length >= 1',
    description: 'Sable undercuts your first trade route with a better deal.',
  },
  // Act 2: He tries to buy one of your crew
  crew_temptation: {
    id: 'rival_crew_tempt',
    triggerPhase: 'act2',
    description: 'Sable offers one of your crew members triple their worth to switch sides.',
  },
  // Act 2/3: Combat encounter -- optional, player-triggered
  confrontation: {
    id: 'rival_confrontation',
    encounterId: 'rival_sable_venn',
    description: 'The Auction comes to collect. Or to be collected from.',
  },
  // Endgame: Alliance or final battle
  resolution: {
    id: 'rival_resolution',
    triggerPhase: 'act3',
    description: 'Sable makes his final play. Buy you out, or be bought.',
  },
};

export const initialRivalState: RivalState = {
  id: 'sable_venn',
  encountered: false,
  encounterCount: 0,
  respect: 0,
  lastSeenIsland: null,
  defeated: false,
  allied: false,
};
