// =============================================
// GODTIDE: BASTION SEA - Economy System
// =============================================
// Handles daily resource income/consumption and
// end-of-day economy calculations.
// =============================================

import type { Island, Resources, CrewMember } from '../types/game';
import { ECONOMY } from '../constants/balance';

// --- Island income is handled by the territory system (territory.ts) ---
// The territory system's calculateTerritoryBonuses() provides island income
// with proper morale scaling and role multipliers applied.

/**
 * Calculate daily crew upkeep costs (supplies).
 * Base: each living recruited crew member costs CREW_UPKEEP_PER_MEMBER supplies/day.
 * Scaling: after CREW_UPKEEP_SCALING_THRESHOLD islands, cost per member increases
 * by CREW_UPKEEP_SCALING_RATE per additional island.
 *
 * At 4 islands: 1/day/member. At 7 islands: 4/day/member. At 10: 7/day/member.
 * Empire strain: bigger fleets eat more when running a bigger operation.
 */
export function calculateDailyUpkeep(crew: CrewMember[], controlledIslandCount: number = 0): number {
  const crewCount = crew.filter((m) => m.recruited && m.alive).length;
  const extraIslands = Math.max(0, controlledIslandCount - ECONOMY.CREW_UPKEEP_SCALING_THRESHOLD);
  const perMember = ECONOMY.CREW_UPKEEP_PER_MEMBER + extraIslands * ECONOMY.CREW_UPKEEP_SCALING_RATE;
  return crewCount * perMember;
}

/**
 * Process a full day's economy: subtract crew upkeep only.
 * Island income is handled separately by the territory system
 * (calculateTerritoryBonuses in territory.ts) which applies
 * morale scaling and role multipliers.
 */
export function processDailyEconomy(
  resources: Resources,
  islands: Island[],
  crew: CrewMember[],
): {
  newResources: Resources;
  upkeep: number;
  deficit: boolean;
} {
  const controlledCount = islands.filter(i => i.status === 'controlled').length;
  const upkeep = calculateDailyUpkeep(crew, controlledCount);
  const crewCount = crew.filter(m => m.recruited && m.alive).length;
  const extraIslands = Math.max(0, controlledCount - ECONOMY.CREW_SALARY_SCALING_THRESHOLD);
  const crewSalary = extraIslands * crewCount * ECONOMY.CREW_SALARY_PER_ISLAND;

  const newResources: Resources = {
    sovereigns: Math.max(0, resources.sovereigns - crewSalary),
    supplies: Math.max(0, resources.supplies - upkeep),
    materials: resources.materials,
    intelligence: resources.intelligence,
  };

  // Check if we're in deficit (supplies ran out)
  const deficit = resources.supplies - upkeep < 0;

  return { newResources, upkeep, deficit };
}

// --- Trade Route Value ---

/** Resource categories for complementary trade value calculation. */
export const resourceCategories: Record<string, string> = {
  fish: 'food',
  fresh_water: 'food',
  trade_goods: 'commerce',
  luxury_goods: 'commerce',
  timber: 'materials',
  copper: 'materials',
  iron_ore: 'materials',
  vethrstone: 'rare',
  unknown_minerals: 'rare',
  ship_repairs: 'military',
  weapons: 'military',
  military_supplies: 'military',
  intelligence: 'intel',
  information: 'intel',
  navigation_charts: 'intel',
  contraband: 'commerce',
  recruits: 'military',
  skilled_labor: 'materials',
  hidden_anchorage: 'military',
  bioluminescent_coral: 'rare',
  waypoint: 'commerce',
  mystery: 'rare',
};

/**
 * Calculate trade route daily income based on complementary resources + population.
 *
 * Formula:
 *   base(10) + complementaryBonus(0-15) + populationFactor(0-8) + maturityBonus(0-7)
 *   Cap: 40 sov/day per route
 *
 * Complementary routes (different resource categories) earn more.
 * High population islands generate more trade volume.
 * Routes mature over time (first few days ramp up).
 */
export function calculateTradeRouteIncome(
  fromResources: string[],
  toResources: string[],
  fromPopulation: number,
  toPopulation: number,
  daysActive: number,
): number {
  const base = 10;

  // Complementary bonus: count unique category pairs
  const fromCats = new Set(fromResources.map(r => resourceCategories[r] || 'other'));
  const toCats = new Set(toResources.map(r => resourceCategories[r] || 'other'));
  let complementary = 0;
  toCats.forEach(cat => {
    if (!fromCats.has(cat)) complementary++;
  });
  fromCats.forEach(cat => {
    if (!toCats.has(cat)) complementary++;
  });
  const complementaryBonus = Math.min(15, complementary * 4);

  // Population factor: avg of both populations, scaled
  const avgPop = (fromPopulation + toPopulation) / 2;
  const populationFactor = Math.min(8, Math.floor(avgPop / 750));

  // Maturity bonus: ramps up over 14 days, caps at +7
  const maturityBonus = Math.min(7, Math.floor(daysActive / 2));

  return Math.min(40, base + complementaryBonus + populationFactor + maturityBonus);
}

/**
 * Calculate total supply cost for active trade routes.
 * Each active (non-blockaded) route costs ECONOMY.SUPPLY_PER_TRADE_ROUTE per day.
 */
export function calculateTradeRouteSupplyCost(activeRouteCount: number): number {
  return activeRouteCount * ECONOMY.SUPPLY_PER_TRADE_ROUTE;
}

// --- Travel cost calculations ---

export interface TravelCost {
  days: number;
  supplies: number;
}

/**
 * Calculate the cost to travel between two islands.
 * Uses the route data if available, otherwise estimates.
 */
export function calculateTravelCost(from: Island, to: Island): TravelCost | null {
  const route = from.routes.find((r) => r.targetId === to.id);
  if (!route) return null; // No direct route

  return {
    days: route.travelDays,
    supplies: route.travelDays * ECONOMY.SUPPLY_PER_TRAVEL_DAY,
  };
}

