// =============================================
// GODTIDE: BASTION SEA - Event Context & Text Interpolation
// =============================================
// Builds game-state context for event text templates.
// Replaces tokens like {current_island}, {crew:trader},
// {reputation_desc} with real game state values.
// =============================================

import type { Island, CrewMember, CrewAssignment, GamePhase, WardenseaAlert } from '../types/game';

export interface EventContext {
  controlledIslands: string[];       // island names
  crewNames: Record<string, string>; // id -> first name
  assignedCrew: Partial<Record<CrewAssignment, string>>; // role -> first name
  reputation: number;
  infamy: number;
  bounty: number;
  reputationTier: 'unknown' | 'noticed' | 'respected' | 'feared' | 'legendary';
  currentIslandName: string;
  threatLevel: number;
  wardenseaAlert: WardenseaAlert;
  dayCount: number;
  gamePhase: GamePhase;
  crewCount: number;
  territoryCount: number;
}

/**
 * Build an EventContext snapshot from current game state.
 * Called once per advanceDay or event resolution, not per render.
 */
export function buildEventContext(opts: {
  islands: Island[];
  crew: CrewMember[];
  currentIsland: string;
  reputation: number;
  infamy: number;
  bounty: number;
  threatLevel: number;
  wardenseaAlert: WardenseaAlert;
  dayCount: number;
  gamePhase: GamePhase;
}): EventContext {
  const controlled = opts.islands.filter(i => i.status === 'controlled');
  const recruited = opts.crew.filter(m => m.recruited && m.alive);

  const crewNames: Record<string, string> = {};
  recruited.forEach(m => { crewNames[m.id] = m.name.split(' ')[0]; });

  const assignedCrew: Partial<Record<CrewAssignment, string>> = {};
  recruited.forEach(m => {
    if (m.assignment && m.assignment !== 'unassigned') {
      assignedCrew[m.assignment] = m.name.split(' ')[0];
    }
  });

  const currentIsland = opts.islands.find(i => i.id === opts.currentIsland);

  let reputationTier: EventContext['reputationTier'] = 'unknown';
  if (opts.reputation >= 80) reputationTier = 'legendary';
  else if (opts.reputation >= 60) reputationTier = 'feared';
  else if (opts.reputation >= 40) reputationTier = 'respected';
  else if (opts.reputation >= 20) reputationTier = 'noticed';

  return {
    controlledIslands: controlled.map(i => i.name),
    crewNames,
    assignedCrew,
    reputation: opts.reputation,
    infamy: opts.infamy,
    bounty: opts.bounty,
    reputationTier,
    currentIslandName: currentIsland?.name || 'the open sea',
    threatLevel: opts.threatLevel,
    wardenseaAlert: opts.wardenseaAlert,
    dayCount: opts.dayCount,
    gamePhase: opts.gamePhase,
    crewCount: recruited.length,
    territoryCount: controlled.length,
  };
}

/**
 * Replace interpolation tokens in event text with game state values.
 * Unmatched tokens stay as literal text (safe degradation).
 *
 * Supported tokens:
 *   {current_island}    - name of current island
 *   {island:random}     - random controlled island name (or "your territory")
 *   {crew:random}       - random recruited crew first name
 *   {crew:trader}       - assigned trader name (or "your crew")
 *   {crew:navigator}    - assigned navigator name (or "the navigator")
 *   {crew:lookout}      - assigned lookout name (or "the lookout")
 *   {crew:diplomat}     - assigned diplomat name (or "the diplomat")
 *   {crew:quartermaster} - assigned quartermaster name (or "the quartermaster")
 *   {reputation_desc}   - contextual reputation description
 *   {bounty_desc}       - contextual bounty description
 *   {territory_count}   - "3 islands" or "your territory"
 *   {threat_desc}       - contextual threat level description
 *   {crew_count}        - number of crew as text
 *   {day_count}         - current day number
 */
export function interpolateText(template: string, ctx: EventContext): string {
  if (!template.includes('{')) return template;

  return template.replace(/\{([^}]+)\}/g, (match, token: string) => {
    switch (token) {
      case 'current_island':
        return ctx.currentIslandName;

      case 'island:random':
        if (ctx.controlledIslands.length === 0) return 'your territory';
        return ctx.controlledIslands[Math.floor(Math.random() * ctx.controlledIslands.length)];

      case 'crew:random': {
        const names = Object.values(ctx.crewNames);
        if (names.length === 0) return 'your crew';
        return names[Math.floor(Math.random() * names.length)];
      }

      case 'crew:trader':
        return ctx.assignedCrew.trader || 'your crew';
      case 'crew:navigator':
        return ctx.assignedCrew.navigator || 'the navigator';
      case 'crew:lookout':
        return ctx.assignedCrew.lookout || 'the lookout';
      case 'crew:diplomat':
        return ctx.assignedCrew.diplomat || 'the diplomat';
      case 'crew:quartermaster':
        return ctx.assignedCrew.quartermaster || 'the quartermaster';

      case 'reputation_desc':
        return getReputationDesc(ctx);

      case 'bounty_desc':
        return getBountyDesc(ctx.bounty);

      case 'territory_count':
        if (ctx.territoryCount === 0) return 'your territory';
        if (ctx.territoryCount === 1) return '1 island';
        return `${ctx.territoryCount} islands`;

      case 'threat_desc':
        return getThreatDesc(ctx);

      case 'crew_count':
        return `${ctx.crewCount}`;

      case 'day_count':
        return `${ctx.dayCount}`;

      default:
        // Unmatched token: leave as-is
        return match;
    }
  });
}

function getReputationDesc(ctx: EventContext): string {
  switch (ctx.reputationTier) {
    case 'legendary': return 'the fear of the Renegade fleet';
    case 'feared': return 'the Oni carving a name across the Bastion Sea';
    case 'respected': return 'your growing reputation';
    case 'noticed': return 'the Oni making waves in the Central Belt';
    default: return 'your fledgling crew';
  }
}

function getBountyDesc(bounty: number): string {
  if (bounty >= 200_000_000) return `a ${Math.floor(bounty / 1_000_000)} million Sovereign bounty`;
  if (bounty >= 50_000_000) return `a serious bounty on your head`;
  if (bounty >= 10_000_000) return `a growing price on your horns`;
  if (bounty >= 1_000_000) return `a modest bounty`;
  return 'your unknown face';
}

function getThreatDesc(ctx: EventContext): string {
  if (ctx.threatLevel >= 80) return 'a fleet mobilizing against you';
  if (ctx.threatLevel >= 60) return 'patrols closing in on your waters';
  if (ctx.threatLevel >= 40) return 'Wardensea ships tightening the net';
  if (ctx.threatLevel >= 20) return 'the Wardensea watching your movements';
  return 'the open sea';
}
