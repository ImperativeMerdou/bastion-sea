// =============================================
// GODTIDE: BASTION SEA - Equipment System
// =============================================
// Persistent gear with stat bonuses that affect combat.
// Items come from shops, boss drops, quest rewards.
// Three slots: weapon, armor, accessory.
// =============================================

import type { Equipment } from '../types/game';

// ==========================================
// EQUIPMENT REGISTRY
// ==========================================

/** All equipment in the game, keyed by item ID */
export const equipmentRegistry: Record<string, Equipment> = {

  // === WEAPON SLOT ===

  danzai_base: {
    id: 'danzai_base',
    name: 'Danzai War Club',
    slot: 'weapon',
    description: 'Iron-spiked Gorundai war club. Karyudon\'s weapon since before the escape. Heavy, brutal, reliable.',
    icon: '🔨',
    statBonus: { attack: 8 },
    source: 'starting',
  },
  danzai_spikes: {
    id: 'danzai_spikes',
    name: 'Reinforced Danzai',
    slot: 'weapon',
    description: 'Replacement iron spikes shaped from Coppervein ore. Longer. Sharper. The Danzai hits harder now.',
    icon: '⚒️',
    statBonus: { attack: 13 },
    source: 'shop',
  },
  wardensea_arms: {
    id: 'wardensea_arms',
    name: 'Wardensea Armaments',
    slot: 'weapon',
    description: 'Military-grade weapons seized from Wardensea stores. Standard issue for their southern fleet. Now standard issue for yours.',
    icon: '⚔️',
    statBonus: { attack: 15, defense: 3 },
    source: 'shop',
  },
  leviathan_fang: {
    id: 'leviathan_fang',
    name: 'Leviathan Fang Blade',
    slot: 'weapon',
    description: 'Carved from the tooth of the Reef Leviathan. The edge never dulls. It hums when Dominion flows through it.',
    icon: '🦷',
    statBonus: { attack: 18, speed: 3 },
    specialEffect: 'leviathan_weapon',
    source: 'quest',
  },

  // === ARMOR SLOT ===

  iron_chain_mail: {
    id: 'iron_chain_mail',
    name: 'Gorundai Chain Mail',
    slot: 'armor',
    description: 'Forged by Gorundai smiths. Not delicate. Not pretty. Will stop a blade from reaching organs.',
    icon: '🛡️',
    statBonus: { defense: 5 },
    source: 'shop',
  },
  bastion_plate_armor: {
    id: 'bastion_plate_armor',
    name: 'Bastion Plate Armor',
    slot: 'armor',
    description: 'Conqueror-forged plate. Heavy, imposing, and built to withstand Dominion attacks.',
    icon: '🛡️',
    statBonus: { defense: 8, hp: 15 },
    source: 'shop',
  },
  windrow_storm_cloak: {
    id: 'windrow_storm_cloak',
    name: 'Windrow Storm Cloak',
    slot: 'armor',
    description: 'Heavy-weave cloak reinforced at the shoulders. Designed for cliff workers in gale-force winds. Also excellent armor.',
    icon: '🧥',
    statBonus: { defense: 5, hp: 10 },
    source: 'shop',
  },
  leviathan_scale_armor: {
    id: 'leviathan_scale_armor',
    name: 'Leviathan Scale Armor',
    slot: 'armor',
    description: 'Dragghen shaped a leviathan scale fragment into armor plating. Dense as iron, light as bone. Faint bioluminescent shimmer. He rated the material a six. His highest score yet.',
    icon: '🐉',
    statBonus: { defense: 12, hp: 25 },
    specialEffect: 'leviathan_armor',
    source: 'quest',
  },
  ironclad_warden_plate: {
    id: 'ironclad_warden_plate',
    name: 'Ironclad Warden Plate',
    slot: 'armor',
    description: 'Stripped from a Wardensea Ironclad captain. The best armor in the Bastion Sea, forged for people who expected to never lose.',
    icon: '⚙️',
    statBonus: { defense: 14, hp: 20, speed: -2 },
    source: 'boss',
  },

  // === ACCESSORY SLOT ===

  sight_lens: {
    id: 'sight_lens',
    name: 'Calibrated Sight Lens',
    slot: 'accessory',
    description: 'A Morventhi-crafted lens that amplifies Forged Sight. Crude but functional, according to Suulen.',
    icon: '🔮',
    statBonus: { speed: 4 },
    specialEffect: 'has_sight_lens',
    source: 'shop',
  },
  bioluminescent_lantern: {
    id: 'bioluminescent_lantern',
    name: 'Bioluminescent Lantern',
    slot: 'accessory',
    description: 'A sealed coral lantern containing living organisms from the deep reef. Light patterns shift with water currents. Suulen reads them like a map.',
    icon: '🏮',
    statBonus: { defense: 5, speed: 2 },
    specialEffect: 'has_bio_lantern',
    source: 'shop',
  },
  conqueror_signet: {
    id: 'conqueror_signet',
    name: 'Conqueror\'s Signet Ring',
    slot: 'accessory',
    description: 'A heavy iron ring bearing the mark of a Bastion Sea Conqueror. The weight of it reminds you what you\'re becoming.',
    icon: '💍',
    statBonus: { attack: 3, defense: 3, hp: 10 },
    source: 'quest',
  },
  stormheart_amulet: {
    id: 'stormheart_amulet',
    name: 'Stormheart Amulet',
    slot: 'accessory',
    description: 'Forged from storm-glass and Dominion-infused iron. The heart of a tempest, captured and worn. Crackles in combat.',
    icon: '⚡',
    statBonus: { attack: 5, speed: 5, staminaRegen: 1 },
    specialEffect: 'stormheart',
    source: 'boss',
  },
  ancient_compass: {
    id: 'ancient_compass',
    name: 'Ancient Navigator\'s Compass',
    slot: 'accessory',
    description: 'Pre-Wardensea navigation instrument found in the Mirrorwater caverns. The needle doesn\'t point north. It points toward danger.',
    icon: '🧭',
    statBonus: { speed: 6, hp: 5 },
    specialEffect: 'has_ancient_compass',
    source: 'quest',
  },
};

/** Map from shop TradeItem IDs to Equipment IDs for weapon-category items */
export const shopItemToEquipment: Record<string, string> = {
  iron_chain_mail: 'iron_chain_mail',
  danzai_spikes: 'danzai_spikes',
  bastion_plate_armor: 'bastion_plate_armor',
  windrow_storm_cloak: 'windrow_storm_cloak',
  sight_lens: 'sight_lens',
  bioluminescent_lantern: 'bioluminescent_lantern',
  wardensea_arms: 'wardensea_arms',
};

/** Look up an equipment item by ID. Returns a fresh copy. */
export function getEquipment(id: string): Equipment | null {
  const template = equipmentRegistry[id];
  if (!template) return null;
  return { ...template };
}

/** Get the starting weapon (Danzai base) */
export function getStartingWeapon(): Equipment {
  return { ...equipmentRegistry.danzai_base };
}
