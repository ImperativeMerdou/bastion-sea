// =============================================
// GODTIDE: BASTION SEA - Ship Upgrade Registry
// The Bastion grows teeth.
// =============================================

import { ShipUpgrade, Ship } from '../types/game';

// --- Default Ship ---

export const DEFAULT_SHIP: Ship = {
  name: 'The Bastion',
  hull: 100,
  maxHull: 100,
  speed: 0,
  cargo: 500,
  maxCargo: 500,
  upgrades: [],
};

// --- Upgrade Registry ---

export const SHIP_UPGRADES: ShipUpgrade[] = [
  // ===== HULL =====
  {
    id: 'reinforced_hull',
    name: 'Reinforced Hull',
    description: 'Iron plating bolted over the waterline. She takes hits now without flinching.',
    icon: '🛡',
    category: 'hull',
    effects: { hull: 30 },
    cost: { sovereigns: 80, materials: 15 },
    minDay: 5,
  },
  {
    id: 'ironclad_plating',
    name: 'Ironclad Plating',
    description: 'Kolmari-grade riveted steel across the entire hull. Cannonballs bounce. Rams crumple.',
    icon: '🔩',
    category: 'hull',
    effects: { hull: 60, combatDefense: 5 },
    cost: { sovereigns: 200, materials: 40 },
    prerequisite: 'reinforced_hull',
    requiresIsland: 'sorrens_flat',
    minDay: 15,
  },
  {
    id: 'leviathan_keel',
    name: 'Leviathan Keel',
    description: 'A keel carved from deep-sea creature bone. The hull flexes with the waves instead of fighting them. Practically unsinkable.',
    icon: '🐋',
    category: 'hull',
    effects: { hull: 100, combatDefense: 8 },
    cost: { sovereigns: 400, materials: 60, intelligence: 10 },
    prerequisite: 'ironclad_plating',
    minDay: 25,
  },

  // ===== SAILS =====
  {
    id: 'storm_sails',
    name: 'Storm Sails',
    description: 'Triple-stitched canvas that catches wind other sails would tear in. Faster in rough weather.',
    icon: '⛵',
    category: 'sail',
    effects: { speed: -1 },
    cost: { sovereigns: 60, materials: 10 },
    minDay: 3,
  },
  {
    id: 'windcutter_rigging',
    name: 'Windcutter Rigging',
    description: 'Redesigned mast configuration with overlapping sail planes. Cuts travel time like a knife through fog.',
    icon: '💨',
    category: 'sail',
    effects: { speed: -1 },
    cost: { sovereigns: 150, materials: 25 },
    prerequisite: 'storm_sails',
    requiresIsland: 'sorrens_flat',
    minDay: 12,
  },
  {
    id: 'resonance_engine',
    name: 'Resonance Engine',
    description: 'A Morventhi-designed engine that hums at the frequency of ocean currents. The sea itself pushes you forward.',
    icon: '⚡',
    category: 'sail',
    effects: { speed: -1 },
    cost: { sovereigns: 350, materials: 45, intelligence: 15 },
    prerequisite: 'windcutter_rigging',
    minDay: 22,
  },

  // ===== WEAPONS =====
  {
    id: 'bow_cannons',
    name: 'Bow Cannons',
    description: 'Two forward-mounted cannons. Not subtle, but effective. The Bastion announces itself.',
    icon: '💥',
    category: 'weapon',
    effects: { combatAttack: 5 },
    cost: { sovereigns: 100, materials: 20 },
    minDay: 8,
  },
  {
    id: 'broadside_battery',
    name: 'Broadside Battery',
    description: 'Six cannons per side. Turn the ship sideways and delete whatever is next to you.',
    icon: '🔥',
    category: 'weapon',
    effects: { combatAttack: 10, combatDefense: 3 },
    cost: { sovereigns: 250, materials: 35 },
    prerequisite: 'bow_cannons',
    requiresIsland: 'sorrens_flat',
    minDay: 16,
  },
  {
    id: 'iron_ram',
    name: 'Iron Ram',
    description: 'A reinforced prow built for collision. When diplomacy fails, ramming speed solves things.',
    icon: '🪓',
    category: 'weapon',
    effects: { combatAttack: 15, hull: 20 },
    cost: { sovereigns: 300, materials: 50 },
    prerequisite: 'broadside_battery',
    minDay: 20,
  },

  // ===== UTILITY =====
  {
    id: 'expanded_hold',
    name: 'Expanded Hold',
    description: 'Redesigned cargo bay with vertical stacking. More room for everything that matters.',
    icon: '📦',
    category: 'utility',
    effects: { cargo: 150 },
    cost: { sovereigns: 60, materials: 10 },
    minDay: 4,
  },
  {
    id: 'smuggler_compartments',
    name: 'Smuggler Compartments',
    description: 'Hidden spaces behind false walls. Wardensea inspections find nothing. Your crew finds everything.',
    icon: '🔒',
    category: 'utility',
    effects: { cargo: 200 },
    cost: { sovereigns: 120, materials: 20, intelligence: 5 },
    prerequisite: 'expanded_hold',
    minDay: 10,
  },
  {
    id: 'navigation_suite',
    name: 'Navigation Suite',
    description: 'A full chart room with Grimoire-linked weather tracking. Your navigator works twice as fast.',
    icon: '🧭',
    category: 'utility',
    effects: { speed: -1 },
    cost: { sovereigns: 180, materials: 15, intelligence: 10 },
    minDay: 14,
  },
  {
    id: 'medical_bay',
    name: 'Medical Bay',
    description: 'A proper infirmary belowdecks. Hammocks, clean bandages, and a locked cabinet of Rathai painkillers. Crew injuries heal a day faster.',
    icon: '🩹',
    category: 'utility',
    effects: {},
    cost: { sovereigns: 120, materials: 20, supplies: 10 },
    minDay: 8,
  },
];

// --- Helper Functions ---

/** Get an upgrade by ID */
export function getShipUpgrade(id: string): ShipUpgrade | undefined {
  return SHIP_UPGRADES.find((u) => u.id === id);
}

/** Get all upgrades available for installation (not yet installed, prereqs met, island/day OK) */
export function getAvailableUpgrades(
  ship: Ship,
  currentIsland: string,
  dayCount: number,
): ShipUpgrade[] {
  return SHIP_UPGRADES.filter((upgrade) => {
    // Already installed
    if (ship.upgrades.includes(upgrade.id)) return false;
    // Prerequisite not met
    if (upgrade.prerequisite && !ship.upgrades.includes(upgrade.prerequisite)) return false;
    // Wrong island
    if (upgrade.requiresIsland && upgrade.requiresIsland !== currentIsland) return false;
    // Too early
    if (upgrade.minDay && dayCount < upgrade.minDay) return false;
    return true;
  });
}

/** Calculate total ship bonuses from all installed upgrades */
export function getShipBonuses(ship: Ship): {
  totalHull: number;
  totalSpeed: number;
  totalCargo: number;
  combatDefense: number;
  combatAttack: number;
} {
  let bonusHull = 0;
  let bonusSpeed = 0;
  let bonusCargo = 0;
  let combatDef = 0;
  let combatAtk = 0;

  for (const upgradeId of ship.upgrades) {
    const upgrade = getShipUpgrade(upgradeId);
    if (!upgrade) continue;
    bonusHull += upgrade.effects.hull || 0;
    bonusSpeed += upgrade.effects.speed || 0;
    bonusCargo += upgrade.effects.cargo || 0;
    combatDef += upgrade.effects.combatDefense || 0;
    combatAtk += upgrade.effects.combatAttack || 0;
  }

  return {
    totalHull: ship.maxHull + bonusHull,
    totalSpeed: ship.speed + bonusSpeed,
    totalCargo: ship.maxCargo + bonusCargo,
    combatDefense: combatDef,
    combatAttack: combatAtk,
  };
}
