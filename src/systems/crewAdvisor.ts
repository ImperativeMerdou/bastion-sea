// =============================================
// GODTIDE: BASTION SEA - Crew Advisor System
// =============================================
// Generates short, personality-driven crew
// opinions on event choices. Makes crew feel
// like advisors, not stat modifiers.
// =============================================

import type { CrewMember } from '../types/game';

// ==========================================
// CHOICE ARCHETYPE TYPES
// ==========================================

export type ChoiceArchetype =
  | 'aggressive'
  | 'diplomatic'
  | 'risky'
  | 'cautious'
  | 'trade'
  | 'practical';

export interface CrewAdviceLine {
  crewId: string;
  text: string;
}

// ==========================================
// CREW PERSONALITY POOLS
// ==========================================
// Each crew member has lines categorized by
// whether they AGREE, WARN, or COMMENT on
// a given choice archetype.
//
// Line selection uses a hash based on the
// choice ID for deterministic but varied picks.
// ==========================================

type Stance = 'agree' | 'warn' | 'comment';

interface PersonalityPool {
  [archetype: string]: {
    stance: Stance;
    lines: string[];
  };
}

// --- DRAGGHEN ---
// Practical, food/people-focused. Gorundai shipwright.
// Worries about crew welfare. Speaks in terms of structural integrity.
const dragghen: PersonalityPool = {
  aggressive: {
    stance: 'warn',
    lines: [
      'Fighting costs more than it looks. I count the repairs.',
      'Ship takes damage, I fix it. Question is whether we can afford the downtime.',
      'Every fight is a hull inspection waiting to happen.',
      'You sure? Crew gets hurt, that is days lost. Not hours.',
      'Violence has a material cost. Just pointing that out.',
    ],
  },
  diplomatic: {
    stance: 'comment',
    lines: [
      'Talking is free. I like free.',
      'Negotiation keeps the hull intact. I vote yes.',
      'Nobody loses a limb in a conversation. Usually.',
      'Cheaper than a fight. I can work with cheaper.',
    ],
  },
  risky: {
    stance: 'warn',
    lines: [
      'You want to gamble, use your own coin. Crew eats regardless.',
      'Risk is just cost you have not calculated yet.',
      'My workshop is full of things that went wrong at sea. Think about it.',
      'I have seen risk. It looks a lot like the inside of a repair bay.',
    ],
  },
  cautious: {
    stance: 'agree',
    lines: [
      'Good. Steady. I can plan around steady.',
      'Smart call. Nothing wrong with keeping what we have.',
      'The smart move is the one where nobody bleeds.',
      'I can reinforce what we got. Give me time, not chaos.',
    ],
  },
  trade: {
    stance: 'comment',
    lines: [
      'Make sure we are not getting swindled. I know material prices.',
      'Fair deal or no deal. That is Gorundai standard.',
      'If the timber is good, I want first pick.',
      'Trade is fine. Just check the goods are not rotten.',
    ],
  },
  practical: {
    stance: 'agree',
    lines: [
      'Straightforward. I like it.',
      'No nonsense. Good.',
      'Practical is all I ask for.',
      'Fine by me. Let me know if you need hands.',
    ],
  },
};

// --- SUULEN ---
// Cautious, intel-focused. Morventhi. References things she has observed.
// Advocates for information-gathering. Quiet precision.
const suulen: PersonalityPool = {
  aggressive: {
    stance: 'warn',
    lines: [
      'We do not know their numbers. That should bother you.',
      'Aggression without intel is just noise.',
      'I would want to know more before committing to this.',
      'Three things I have not confirmed. That is three too many.',
      'We go in blind, we come out bleeding.',
    ],
  },
  diplomatic: {
    stance: 'agree',
    lines: [
      'Good. Conversations reveal more than fights.',
      'People talk when they feel safe. That is useful.',
      'I have been watching them. This could work.',
      'Negotiation gives me time to learn what they are hiding.',
    ],
  },
  risky: {
    stance: 'warn',
    lines: [
      'I count variables. Right now I count too many.',
      'The odds are not terrible. But they are not good either.',
      'I need more data before I am comfortable with this.',
      'Risk. My least favorite word.',
    ],
  },
  cautious: {
    stance: 'agree',
    lines: [
      'Patience pays. I have files that prove it.',
      'The cautious move. I approve.',
      'Wait, watch, then act. That is how you survive out here.',
      'Yes. This is correct.',
    ],
  },
  trade: {
    stance: 'comment',
    lines: [
      'I have heard things about this market. Let me check my notes.',
      'Trade partners remember faces. Could be useful later.',
      'Commerce opens doors that force breaks.',
      'I would like to observe the transaction. For my records.',
    ],
  },
  practical: {
    stance: 'comment',
    lines: [
      'Reasonable. No objections from me.',
      'I do not see a downside worth flagging.',
      'Solid choice. I will update my assessment.',
      'Fine. I will be monitoring either way.',
    ],
  },
};

// --- TESSEK ---
// Aggressive, direct. Redtide swordsman. Short sentences.
// Advocates for action. Impatient with deliberation.
const tessek: PersonalityPool = {
  aggressive: {
    stance: 'agree',
    lines: [
      'Finally.',
      'Good. I was getting stiff.',
      'About time. Point me at them.',
      'Yes. This is the right call.',
      'Let us go.',
    ],
  },
  diplomatic: {
    stance: 'warn',
    lines: [
      'Talking. Great.',
      'If they pull a weapon, I am not waiting for a handshake.',
      'Diplomacy. You mean stalling.',
      'Fine. But I am standing right behind you.',
    ],
  },
  risky: {
    stance: 'agree',
    lines: [
      'Risk means it matters. I am in.',
      'Worse odds than this did not stop me before.',
      'If it was easy, anyone could do it.',
      'Good. The interesting choices are always risky.',
    ],
  },
  cautious: {
    stance: 'warn',
    lines: [
      'We are stalling.',
      'Caution looks a lot like cowardice from where they stand.',
      'Every day we wait, they get stronger.',
      'You are the captain. But I think this is a mistake.',
    ],
  },
  trade: {
    stance: 'warn',
    lines: [
      'Coin does not solve everything.',
      'Merchants lie for a living. Remember that.',
      'I will be at the ship. Call me when something real happens.',
      'Trade. Not my area.',
    ],
  },
  practical: {
    stance: 'comment',
    lines: [
      'Fine.',
      'Works for me.',
      'No complaints.',
      'Sure. Whatever gets us moving.',
    ],
  },
};

// --- DELVESSA ---
// Strategic, financial. Kolmari. Calculates ROI.
// References costs, returns, long-term positioning.
const delvessa: PersonalityPool = {
  aggressive: {
    stance: 'comment',
    lines: [
      'Run the numbers on the losses first.',
      'Victory only counts if we can afford the aftermath.',
      'What does winning cost? What does losing cost? Compare.',
      'Aggression is an investment. Make sure the return is there.',
      'I need to see the logistics before I sign off.',
    ],
  },
  diplomatic: {
    stance: 'agree',
    lines: [
      'This is how empires work. Not swords. Agreements.',
      'A good deal compounds. A good fight does not.',
      'I have been running projections. Diplomacy is cheaper.',
      'Correct. Relationships are assets.',
    ],
  },
  risky: {
    stance: 'comment',
    lines: [
      'Quantify the downside. If you can stomach it, proceed.',
      'The expected value is... borderline. Your call.',
      'I have seen worse bets pay off. I have also seen them fail.',
      'Risk-adjusted, this is about neutral. Not great.',
    ],
  },
  cautious: {
    stance: 'agree',
    lines: [
      'Preserving capital is not glamorous, but it is correct.',
      'The safe play has a higher floor. Sometimes that matters more.',
      'Prudent. I approve.',
      'Consolidate, then expand. Classic strategy.',
    ],
  },
  trade: {
    stance: 'agree',
    lines: [
      'Trade is my language. Let me handle the margins.',
      'I have been watching this market. There is opportunity here.',
      'Commerce builds what force cannot.',
      'I will want to review the terms. But yes.',
    ],
  },
  practical: {
    stance: 'agree',
    lines: [
      'Efficient. I like efficient.',
      'Low cost, reasonable return. Approved.',
      'No objections. This makes sense.',
      'Sound decision. Carry on.',
    ],
  },
};

// --- KOVESSE ---
// Creative, opportunistic. Grimoire tech. Sees publicity angles.
// Wants to exploit situations. Irreverent. Energy.
const kovesse: PersonalityPool = {
  aggressive: {
    stance: 'comment',
    lines: [
      'Oh, this is going on the broadcast. Please say something quotable.',
      'The Grimoire audience loves a good fight. Just saying.',
      'Can I get a front-row seat? For documentation purposes.',
      'If we are doing this, I want to control the narrative afterward.',
    ],
  },
  diplomatic: {
    stance: 'comment',
    lines: [
      'Boring, but I can spin it. "Mercy of the Renegade Fleet." Has a ring.',
      'Diplomacy only trends if something almost goes wrong.',
      'Let me draft the statement. You handle the handshake.',
      'I can make this look good. Give me two minutes with the Grimoire.',
    ],
  },
  risky: {
    stance: 'agree',
    lines: [
      'Yes. Absolutely yes. This is content.',
      'The worse the odds, the better the story. I am in.',
      'Risk is just suspense with consequences. Let us go.',
      'Oh, this is going to be interesting.',
      'My favorite kind of decision. The kind that makes a good headline.',
    ],
  },
  cautious: {
    stance: 'warn',
    lines: [
      'Safe does not make headlines, Captain.',
      'The audience is watching. They did not tune in for prudence.',
      'You know what is boring? Playing it safe. You know what is boring?',
      'Fine. But do not blame me when nobody talks about us.',
    ],
  },
  trade: {
    stance: 'comment',
    lines: [
      'Trade deal. I can work with that. "Renegade fleet opens commerce." Good angle.',
      'Let me see if there is an exclusive here.',
      'Markets are boring, but market manipulation... now that is a story.',
      'I will find the angle. There is always an angle.',
    ],
  },
  practical: {
    stance: 'comment',
    lines: [
      'Practical. Not flashy. But I will find something to work with.',
      'The boring choice. Reliable, but boring.',
      'Fine. I will embellish it later.',
      'Okay, sure. Just let me know if anything explodes.',
    ],
  },
};

// --- VORRETH ---
// Military, risk-assessment. Black Standard veteran. Warns about consequences.
// References past campaigns and failures. Gravelly pragmatism.
const vorreth: PersonalityPool = {
  aggressive: {
    stance: 'comment',
    lines: [
      'Check the exits first. Then fight.',
      'I have seen commanders charge without thinking. Most of them are dead.',
      'If we commit, commit. No half-measures.',
      'Force works. But only if your supply line holds.',
      'I have done worse. Check the escape route.',
    ],
  },
  diplomatic: {
    stance: 'comment',
    lines: [
      'Talking buys time. Time is a weapon too.',
      'I have watched treaties signed over bodies. Be careful what you promise.',
      'Diplomacy with teeth behind it. That is the only kind that sticks.',
      'Words only work if they believe you would use the sword instead.',
    ],
  },
  risky: {
    stance: 'warn',
    lines: [
      'I have buried soldiers who loved risk.',
      'The odds favor the prepared. Not the bold.',
      'Recklessness killed more of my unit than the enemy did.',
      'Captain. Think about who pays if this goes wrong.',
      'I would recommend against. But you will do what you will do.',
    ],
  },
  cautious: {
    stance: 'agree',
    lines: [
      'Caution keeps people alive. I have seen the alternative.',
      'Discipline over bravado. Every time.',
      'Good. Patience is a military virtue for a reason.',
      'Hold position, assess, then move. Correct order.',
    ],
  },
  trade: {
    stance: 'comment',
    lines: [
      'Supplies matter more than glory. Trade if you need to.',
      'Commerce is logistics. I understand logistics.',
      'Make sure we are not funding our own enemies. I have seen it happen.',
      'Trade routes need protecting. Factor that in.',
    ],
  },
  practical: {
    stance: 'agree',
    lines: [
      'Solid. No complaints from me.',
      'The practical choice is usually the right one.',
      'I have no tactical objection.',
      'Proceed.',
    ],
  },
};

// --- ORREN ---
// Nervous, electrical. Khari. Agrees with whoever spoke last.
// Occasionally has a lightning-related or technical insight.
const orren: PersonalityPool = {
  aggressive: {
    stance: 'comment',
    lines: [
      'I mean... if everyone else is going, I am going too.',
      'My hands are doing the thing again. The sparking thing. Is that relevant?',
      'Okay. Okay okay okay. We can do this. Probably.',
      'I will... stay behind the people with swords. If that is okay.',
    ],
  },
  diplomatic: {
    stance: 'agree',
    lines: [
      'Talking. Yes. I am better at talking than fighting. Slightly.',
      'Good. Less chance of me accidentally shocking someone.',
      'I support this. Strongly. Very strongly.',
      'Oh thank the tides. I thought you were going to say fight.',
    ],
  },
  risky: {
    stance: 'warn',
    lines: [
      'My stomach just did something. That is usually a bad sign.',
      'I... I trust you, Captain. My nerves do not, but I do.',
      'When things go wrong for me, they go wrong electrically. Just so you know.',
      'I want to be supportive but my body is saying no.',
    ],
  },
  cautious: {
    stance: 'agree',
    lines: [
      'Yes. This. I vote this.',
      'I am fully on board with not dying today.',
      'The safe option. My favorite kind of option.',
      'Smart. Very smart. Can we do this every time?',
    ],
  },
  trade: {
    stance: 'comment',
    lines: [
      'I do not really understand markets but I trust Delvessa.',
      'Trade seems... fine? I have nothing useful to add here.',
      'If there is electrical equipment, I want to look at it.',
      'I will just... be over here. Supporting the decision. Quietly.',
    ],
  },
  practical: {
    stance: 'comment',
    lines: [
      'Makes sense to me. But I am not the expert.',
      'No objections. I think. Let me think... no, no objections.',
      'Seems reasonable. I will follow your lead.',
      'Good plan. I mean, I assume it is good. You are the captain.',
    ],
  },
};

// ==========================================
// CREW REGISTRY
// ==========================================

const crewPools: Record<string, PersonalityPool> = {
  dragghen,
  suulen,
  tessek,
  delvessa,
  kovesse,
  vorreth,
  orren,
};

// Defines which crew members are most relevant per archetype.
// First member AGREES, second WARNS/DISAGREES, third COMMENTS.
// This drives the 2-3 advice line selection.
const archetypeCastings: Record<ChoiceArchetype, [string, string, string]> = {
  aggressive: ['tessek', 'vorreth', 'delvessa'],
  diplomatic: ['delvessa', 'tessek', 'suulen'],
  risky:      ['kovesse', 'vorreth', 'dragghen'],
  cautious:   ['suulen', 'tessek', 'delvessa'],
  trade:      ['delvessa', 'dragghen', 'kovesse'],
  practical:  ['dragghen', 'vorreth', 'orren'],
};

// ==========================================
// HASH UTILITY
// ==========================================
// Deterministic selection based on choice ID.
// Same choice always gets the same advice lines,
// but different choices get variety.

function simpleHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// ==========================================
// PUBLIC API
// ==========================================

/**
 * Generate 2-3 crew advice lines for a choice.
 * Returns lines from crew members who are alive,
 * recruited, and not injured.
 *
 * @param choiceId - Unique choice identifier (for deterministic hash)
 * @param archetype - The choice archetype (aggressive, diplomatic, etc.)
 * @param crew - Current crew array
 * @returns Array of 2-3 advice lines with crew IDs
 */
export function generateCrewAdvice(
  choiceId: string,
  archetype: ChoiceArchetype,
  crew: CrewMember[],
): CrewAdviceLine[] {
  const casting = archetypeCastings[archetype];
  if (!casting) return [];

  const hash = simpleHash(choiceId);
  const result: CrewAdviceLine[] = [];

  // Pick 2-3 crew from the casting order, skip unavailable
  const availableCrewIds = new Set(
    crew.filter(m => m.recruited && m.alive && !m.injured).map(m => m.id)
  );

  for (const crewId of casting) {
    if (result.length >= 2) break; // Max 2 lines per choice
    if (!availableCrewIds.has(crewId)) continue;

    const pool = crewPools[crewId];
    if (!pool) continue;

    const archetypePool = pool[archetype];
    if (!archetypePool) continue;

    const lines = archetypePool.lines;
    if (lines.length === 0) continue;

    // Deterministic line pick: hash + crewId offset + result index
    const lineIdx = (hash + simpleHash(crewId) + result.length) % lines.length;
    result.push({
      crewId,
      text: lines[lineIdx],
    });
  }

  return result;
}

/**
 * Get the display name (first name) for a crew member.
 * Used by the UI to label advice lines.
 */
export function getCrewFirstName(crewId: string, crew: CrewMember[]): string {
  const member = crew.find(m => m.id === crewId);
  if (!member) return crewId;
  return member.name.split(' ')[0];
}
