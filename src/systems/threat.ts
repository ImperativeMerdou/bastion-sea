// =============================================
// GODTIDE: BASTION SEA - Wardensea Threat System
// =============================================
// As the player grows in power, territory, and infamy,
// the Wardensea responds with increasing aggression.
// Raids on islands, blockades on trade routes, spy ops,
// and bounty hunters keep the late-game tense.
// =============================================

import type { ThreatState, ThreatEvent, WardenseaAlert, TradeRoute, GameNotification } from '../types/game';
import type { TerritoryState } from './territory';
import { ISLAND_ROLE_DATA } from './territory';
import { TERRITORY, THREAT } from '../constants/balance';

// ==========================================
// DEFAULT STATE
// ==========================================

export const DEFAULT_THREAT_STATE: ThreatState = {
  level: 0,
  wardenseaAlert: 'low',
  nextRaidDay: 15,       // no raids before day 15
  raidTarget: null,
  raidDay: null,
  raidStrength: 0,
  blockadedRoutes: [],
  blockadeEndDays: {},
  spyOperations: 0,
  lastRaidDay: 0,
};

// ==========================================
// THREAT LEVEL CALCULATION
// ==========================================

/**
 * Derive threat level from the player's current power.
 * More territory + bounty + infamy = Wardensea pays more attention.
 *
 * Bounty contributes up to 30 (at 200M+).
 * Territory contributes 8 per island (up to ~100 with 13 islands).
 * Infamy contributes 0.5 per point (up to 50).
 * Capped at 100.
 */
export function calculateThreatLevel(
  bounty: number,
  territoryCount: number,
  infamy: number,
): number {
  const bountyFactor = Math.min(THREAT.BOUNTY_FACTOR_CAP, (bounty / THREAT.BOUNTY_FACTOR_DIVISOR) * THREAT.BOUNTY_FACTOR_MULTIPLIER);
  const territoryFactor = territoryCount * THREAT.TERRITORY_THREAT_PER_ISLAND;
  const infamyFactor = infamy * THREAT.INFAMY_THREAT_MULTIPLIER;

  return Math.min(THREAT.LEVEL_MAX, Math.round(bountyFactor + territoryFactor + infamyFactor));
}

/**
 * Convert threat level to alert status for UI display.
 */
export function getAlertLevel(level: number): WardenseaAlert {
  if (level >= 75) return 'critical';
  if (level >= 50) return 'high';
  if (level >= 25) return 'moderate';
  return 'low';
}

/**
 * Get UI color for alert level.
 */
export function getAlertColor(alert: WardenseaAlert): string {
  switch (alert) {
    case 'critical': return 'text-crimson-400 animate-pulse';
    case 'high': return 'text-crimson-400';
    case 'moderate': return 'text-amber-400';
    case 'low': return 'text-green-400';
  }
}

/**
 * Get alert label for UI display.
 */
export function getAlertLabel(alert: WardenseaAlert): string {
  switch (alert) {
    case 'critical': return 'CRITICAL';
    case 'high': return 'HIGH';
    case 'moderate': return 'MODERATE';
    case 'low': return 'LOW';
  }
}

// ==========================================
// DAILY THREAT PROCESSING
// ==========================================

export interface ThreatProcessResult {
  newState: ThreatState;
  events: ThreatEvent[];
  notifications: Array<{ type: GameNotification['type']; title: string; message: string; severity: 'info' | 'warning' | 'critical' }>;
}

/**
 * Process threat events for the current day.
 * Called during advanceDay() after economy processing.
 */
export function processThreatDay(
  currentState: ThreatState,
  dayCount: number,
  bounty: number,
  territoryCount: number,
  infamy: number,
  controlledIslandIds: string[],
  tradeRoutes: TradeRoute[],
  intelligence: number,
  territoryStates: Record<string, TerritoryState>,
): ThreatProcessResult {
  const events: ThreatEvent[] = [];
  const notifications: ThreatProcessResult['notifications'] = [];

  // Calculate the "natural" threat level from bounty, territory, and infamy
  const naturalLevel = calculateThreatLevel(bounty, territoryCount, infamy);

  // Daily decay always applies: the Wardensea can't maintain peak aggression forever.
  // Equilibrium = natural level minus daily decay (the steady-state threat).
  // Current level trends toward equilibrium by DAILY_DECAY per day.
  const equilibrium = Math.max(0, naturalLevel - THREAT.DAILY_DECAY);
  let level: number;
  if (currentState.level > equilibrium) {
    // Above equilibrium: decay toward it by DAILY_DECAY per day
    level = Math.max(equilibrium, currentState.level - THREAT.DAILY_DECAY);
  } else if (currentState.level < equilibrium) {
    // Player suppressed threat below equilibrium (counter-espionage): drift back up slowly
    const gap = equilibrium - currentState.level;
    level = Math.round(currentState.level + Math.max(1, gap * 0.3));
  } else {
    level = equilibrium;
  }
  level = Math.min(THREAT.LEVEL_MAX, Math.max(0, level));
  const wardenseaAlert = getAlertLevel(level);

  let newState: ThreatState = {
    ...currentState,
    level,
    wardenseaAlert,
  };

  // --- Clear expired blockades ---
  const activeBlockades = newState.blockadedRoutes.filter(
    routeId => (newState.blockadeEndDays[routeId] || 0) > dayCount
  );
  const clearedBlockades = newState.blockadedRoutes.filter(
    routeId => (newState.blockadeEndDays[routeId] || 0) <= dayCount
  );
  if (clearedBlockades.length > 0) {
    const newEndDays = { ...newState.blockadeEndDays };
    clearedBlockades.forEach(id => delete newEndDays[id]);
    newState = {
      ...newState,
      blockadedRoutes: activeBlockades,
      blockadeEndDays: newEndDays,
    };
    notifications.push({
      type: 'wardensea',
      title: 'BLOCKADE LIFTED',
      message: `Wardensea patrol withdrawn. Trade route${clearedBlockades.length > 1 ? 's' : ''} reopened.`,
      severity: 'info',
    });
  }

  // --- Decay spy operations ---
  if (newState.spyOperations > 0) {
    // Each spy op has 40% chance to be rooted out per day
    let remainingOps = 0;
    for (let i = 0; i < newState.spyOperations; i++) {
      if (Math.random() > 0.4) remainingOps++;
    }
    newState = { ...newState, spyOperations: remainingOps };
  }

  // No threat events if level is too low or no territory
  if (level < 10 || territoryCount === 0) {
    return { newState, events, notifications };
  }

  // --- Roll for raid ---
  const minRaidGap = 5; // minimum 5 days between raids
  const canRaid = dayCount >= newState.nextRaidDay
    && dayCount - newState.lastRaidDay >= minRaidGap
    && controlledIslandIds.length > 0
    && !newState.raidTarget; // no raid already pending

  if (canRaid) {
    const raidChance = level * THREAT.RAID_CHANCE_PER_LEVEL;
    if (Math.random() < raidChance) {
      // Pick a target: prefer islands with low defense, high income value
      const target = pickRaidTarget(controlledIslandIds, territoryStates);
      const strength = Math.min(100, Math.round(level * 0.6 + Math.random() * 20));
      // Intel center grants +1 day early warning for raids
      const hasIntelCenter = controlledIslandIds.some(
        id => territoryStates[id]?.islandRole === 'intel_center'
      );
      const warningDays = 2 + Math.floor(Math.random() * 2) + (hasIntelCenter ? 1 : 0);
      const raidDay = dayCount + warningDays; // 2-3 days warning, +1 with intel center

      newState = {
        ...newState,
        raidTarget: target,
        raidDay: raidDay,
        raidStrength: strength,
      };

      events.push({ type: 'raid', target, strength, day: raidDay });
      notifications.push({
        type: 'wardensea',
        title: 'WARDENSEA RAID DETECTED',
        message: `Intelligence reports a Wardensea strike force assembling. Target: your territory. ETA: Day ${raidDay}.`,
        severity: 'critical',
      });
    }
  }

  // --- Execute pending raid ---
  if (newState.raidTarget && newState.raidDay && dayCount >= newState.raidDay) {
    const raidResult = resolveRaid(
      newState.raidTarget,
      newState.raidStrength,
      territoryStates[newState.raidTarget],
    );

    notifications.push(raidResult.notification);
    newState = {
      ...newState,
      raidTarget: null,
      raidDay: null,
      raidStrength: 0,
      lastRaidDay: dayCount,
      nextRaidDay: dayCount + minRaidGap,
    };

    // Push raid event for gameStore to apply morale damage
    // Both successful defense (minor stress damage) and failed defense (major damage)
    events.push({
      type: 'raid',
      target: raidResult.islandId,
      strength: raidResult.damageDealt,
      day: dayCount,
    });
  }

  // --- Roll for blockade ---
  const unblockedRoutes = tradeRoutes.filter(
    r => !newState.blockadedRoutes.includes(r.id)
  );
  if (unblockedRoutes.length > 0 && tradeRoutes.length >= 2) {
    const blockadeChance = level * THREAT.BLOCKADE_CHANCE_PER_LEVEL;
    if (Math.random() < blockadeChance) {
      const targetRoute = unblockedRoutes[Math.floor(Math.random() * unblockedRoutes.length)];
      const duration = 2 + Math.floor(Math.random() * 3); // 2-4 days
      const endDay = dayCount + duration;

      newState = {
        ...newState,
        blockadedRoutes: [...newState.blockadedRoutes, targetRoute.id],
        blockadeEndDays: { ...newState.blockadeEndDays, [targetRoute.id]: endDay },
      };

      events.push({ type: 'blockade', routeId: targetRoute.id, endDay });
      notifications.push({
        type: 'wardensea',
        title: 'TRADE ROUTE BLOCKADED',
        message: `A Wardensea patrol has blockaded a trade route. Income disrupted for ${duration} days.`,
        severity: 'warning',
      });
    }
  }

  // --- Roll for spy operation ---
  if (intelligence > 10 && newState.spyOperations < 3) {
    const spyChance = level * THREAT.SPY_CHANCE_PER_LEVEL;
    if (Math.random() < spyChance) {
      const effects: Array<'intel_drain' | 'morale_hit' | 'sabotage'> = ['intel_drain', 'morale_hit', 'sabotage'];
      const effect = effects[Math.floor(Math.random() * effects.length)];

      newState = { ...newState, spyOperations: newState.spyOperations + 1 };
      events.push({ type: 'spy', effect });

      const spyMessages: Record<string, string> = {
        intel_drain: 'A mole in your network is feeding Wardensea intelligence. Intel generation reduced.',
        morale_hit: 'Wardensea propaganda spreading through your territories. Morale takes a hit.',
        sabotage: 'Supply caches sabotaged. Supplies lost overnight.',
      };

      notifications.push({
        type: 'wardensea',
        title: 'SPY OPERATION DETECTED',
        message: spyMessages[effect],
        severity: 'warning',
      });
    }
  }

  // --- Roll for bounty hunter (high bounty only) ---
  if (bounty > 50_000_000) {
    const hunterChance = level * THREAT.HUNTER_CHANCE_PER_LEVEL;
    if (Math.random() < hunterChance) {
      const strength = Math.min(100, Math.round(THREAT.HUNTER_BASE_STRENGTH + bounty / THREAT.BOUNTY_FACTOR_DIVISOR + Math.random() * 20));
      events.push({ type: 'bounty_hunter', strength });
      notifications.push({
        type: 'wardensea',
        title: 'BOUNTY HUNTER',
        message: 'A licensed Wardensea hunter has picked up your trail. Combat imminent.',
        severity: 'critical',
      });
    }
  }

  return { newState, events, notifications };
}

// ==========================================
// RAID RESOLUTION
// ==========================================

interface RaidResult {
  islandId: string;
  defended: boolean;
  damageDealt: number;   // morale damage on failure
  notification: ThreatProcessResult['notifications'][0];
}

/**
 * Pick the most vulnerable island as raid target.
 * Prefers low defense + high upgrade count (valuable target).
 */
function pickRaidTarget(
  islandIds: string[],
  territoryStates: Record<string, TerritoryState>,
): string {
  if (islandIds.length === 1) return islandIds[0];

  // Score each island: lower defense = higher priority, more upgrades = more tempting
  let bestTarget = islandIds[0];
  let bestScore = -Infinity;

  islandIds.forEach(id => {
    const state = territoryStates[id];
    if (!state) return;
    // Vulnerability = inverse of defense + number of upgrades (tempting target)
    const vulnerability = (100 - state.defenseRating) + (state.upgrades.length * 10);
    if (vulnerability > bestScore) {
      bestScore = vulnerability;
      bestTarget = id;
    }
  });

  return bestTarget;
}

/**
 * Resolve a raid against an island.
 * Defense wins if defenseRating + garrison bonus > raidStrength.
 */
export function resolveRaid(
  islandId: string,
  raidStrength: number,
  territoryState: TerritoryState | undefined,
): RaidResult {
  const baseDefense = territoryState?.defenseRating ?? 20;
  // Apply island role defense multiplier (military = 1.5, outpost = 1.25, etc.)
  const role = territoryState?.islandRole || 'unassigned';
  const roleData = ISLAND_ROLE_DATA[role];
  const defense = Math.round(baseDefense * roleData.defenseMultiplier);
  // Morale adds a small bonus to defense (motivated populace helps)
  const moraleBonus = Math.floor((territoryState?.morale ?? 50) / 10);
  const totalDefense = defense + moraleBonus;

  // Add some randomness to both sides
  const defenseRoll = totalDefense + Math.floor(Math.random() * 20) - 10;
  const attackRoll = raidStrength + Math.floor(Math.random() * 20) - 10;

  const defended = defenseRoll >= attackRoll;

  if (defended) {
    return {
      islandId,
      defended: true,
      damageDealt: TERRITORY.RAID_DEFENDED_MORALE_LOSS,
      notification: {
        type: 'wardensea',
        title: 'RAID REPELLED',
        message: `Your defenses held. The Wardensea strike force was driven back. Morale dipped slightly from the stress of combat.`,
        severity: 'info',
      },
    };
  }

  // Raid succeeded: significant morale damage, income disrupted
  const moraleDamage = 20 + Math.floor(Math.random() * 10);
  return {
    islandId,
    defended: false,
    damageDealt: moraleDamage,
    notification: {
      type: 'wardensea',
      title: 'RAID SUCCESSFUL',
      message: `The Wardensea broke through your defenses. Infrastructure damaged, supplies looted. Morale shattered. Territory weakened.`,
      severity: 'critical',
    },
  };
}

// ==========================================
// DEFEND TERRITORY BONUS
// ==========================================

/**
 * Apply defense bonus from DEFEND_TERRITORY day action.
 * +15 defense rating to the target island, capped at 100.
 */
export function applyDefenseBonus(
  state: TerritoryState,
): TerritoryState {
  return {
    ...state,
    defenseRating: Math.min(100, state.defenseRating + 15),
  };
}

// ==========================================
// SPY EFFECT APPLICATION
// ==========================================

export interface SpyEffectResult {
  intelDrain: number;      // intelligence lost
  moraleDrain: number;     // morale lost per territory
  supplyLoss: number;      // supplies lost
}

/**
 * Calculate the effects of active spy operations.
 * Applied during daily processing.
 */
export function calculateSpyEffects(spyOps: number): SpyEffectResult {
  if (spyOps <= 0) return { intelDrain: 0, moraleDrain: 0, supplyLoss: 0 };

  return {
    intelDrain: spyOps * 2,       // -2 intel per spy op
    moraleDrain: spyOps,          // -1 morale per territory per spy op
    supplyLoss: spyOps * 3,       // -3 supplies per spy op
  };
}
