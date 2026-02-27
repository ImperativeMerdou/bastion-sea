// =============================================
// GODTIDE: BASTION SEA - Trade & Shop System
// =============================================
// Each island has a market with different goods.
// Prices fluctuate based on supply/demand.
// Conquered islands give you better prices.
// Trade is how you fuel the conquest machine.
// =============================================

import type { Resources } from '../types/game';

// ==========================================
// TRADE ITEM DEFINITIONS
// ==========================================

export type ItemCategory = 'supply' | 'material' | 'weapon' | 'intel' | 'luxury' | 'special';

export interface TradeItem {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;
  icon: string;
  basePrice: number;         // In Sovereigns
  /** What resource this adds to, if any */
  resourceEffect?: Partial<Resources>;
  /** Flat stat bonuses applied to MC (permanent) */
  statBonus?: {
    attack?: number;
    defense?: number;
    hp?: number;
    reputation?: number;
    infamy?: number;
  };
  /** Flag to set on purchase */
  setFlag?: string;
  /** Crew loyalty boost on purchase (all recruited crew gain this) */
  loyaltyBoost?: number;
  /** Can only buy once per game */
  unique: boolean;
  /** Minimum day to appear */
  minDay?: number;
  /** Required flag */
  requiresFlag?: string;
}

export interface ShopInventory {
  islandId: string;
  items: ShopSlot[];
}

export interface ShopSlot {
  item: TradeItem;
  stock: number;       // -1 = unlimited
  currentPrice: number; // After modifiers
  preDiplomatPrice: number; // Price before diplomat discount (for UI display)
  available: boolean;
}

// ==========================================
// GLOBAL TRADE ITEMS
// ==========================================

export const allTradeItems: TradeItem[] = [
  // === SUPPLIES ===
  {
    id: 'provisions_crate',
    name: 'Provisions Crate',
    category: 'supply',
    description: 'Hardtack, dried fish, fresh water. The basics. Dragghen rates them a two, which is generous.',
    icon: '📦',
    basePrice: 15,
    resourceEffect: { supplies: 10 },
    unique: false,
  },
  {
    id: 'premium_rations',
    name: 'Premium Rations',
    category: 'supply',
    description: 'Smoked meats, preserved fruits, and actual spices. The crew will notice the upgrade.',
    icon: '🍖',
    basePrice: 30,
    resourceEffect: { supplies: 20 },
    loyaltyBoost: 3,
    unique: false,
    minDay: 3,
  },
  {
    id: 'medical_kit',
    name: 'Medical Kit',
    category: 'supply',
    description: 'Bandages, antiseptic, bone-setting splints. Field medicine for people who can\'t afford to stop fighting.',
    icon: '🩹',
    basePrice: 25,
    resourceEffect: { supplies: 5 },
    unique: false,
  },

  // === MATERIALS ===
  {
    id: 'copper_ingots',
    name: 'Copper Ingots',
    category: 'material',
    description: 'Coppervein quality. The standard currency of shipwrights and weapon-smiths across the Bastion Sea.',
    icon: '🟤',
    basePrice: 20,
    resourceEffect: { materials: 8 },
    unique: false,
  },
  {
    id: 'ironwood_planks',
    name: 'Ironwood Planks',
    category: 'material',
    description: 'Dense as stone, light as oak. The Gorundai grow it in salt caves. Nothing else patches a hull like it.',
    icon: '🪵',
    basePrice: 35,
    resourceEffect: { materials: 15 },
    unique: false,
  },
  {
    id: 'repair_kit',
    name: 'Ship Repair Kit',
    category: 'material',
    description: 'Everything you need to patch a hull at sea. Tar, canvas, copper nails, and a prayer.',
    icon: '🔧',
    basePrice: 40,
    resourceEffect: { materials: 10, supplies: 3 },
    unique: false,
  },

  // === INTELLIGENCE ===
  {
    id: 'patrol_schedule',
    name: 'Wardensea Patrol Schedule',
    category: 'intel',
    description: 'A week\'s worth of Wardensea Second Division patrol routes. Accuracy guaranteed by the seller\'s continued survival.',
    icon: '📋',
    basePrice: 50,
    resourceEffect: { intelligence: 5 },
    unique: false,
    minDay: 3,
  },
  {
    id: 'shipping_manifest',
    name: 'Shipping Manifests',
    category: 'intel',
    description: 'Who\'s shipping what, where, and when. The Bastion Sea runs on information. Now you have some.',
    icon: '📜',
    basePrice: 30,
    resourceEffect: { intelligence: 3 },
    unique: false,
  },
  {
    id: 'conqueror_dossier',
    name: 'Conqueror Intelligence',
    category: 'intel',
    description: 'Compiled reports on Conqueror movements and territories. Expensive. Worth it.',
    icon: '🔐',
    basePrice: 100,
    resourceEffect: { intelligence: 10 },
    unique: false,
    minDay: 8,
  },

  // === WEAPONS & GEAR ===
  {
    id: 'iron_chain_mail',
    name: 'Gorundai Chain Mail',
    category: 'weapon',
    description: 'Forged by Gorundai smiths. Not delicate. Not pretty. Will stop a blade from reaching organs.',
    icon: '🛡️',
    basePrice: 80,
    statBonus: { defense: 5 },
    unique: true,
    setFlag: 'has_chain_mail',
  },
  {
    id: 'sight_lens',
    name: 'Calibrated Sight Lens',
    category: 'weapon',
    description: 'A Morventhi-crafted lens that amplifies Forged Sight. Suulen says it\'s crude but functional. Coming from her, that\'s a compliment.',
    icon: '🔮',
    basePrice: 120,
    resourceEffect: { intelligence: 3 },
    unique: true,
    setFlag: 'has_sight_lens',
    minDay: 5,
  },
  {
    id: 'danzai_spikes',
    name: 'Reinforced Danzai Spikes',
    category: 'weapon',
    description: 'Replacement iron spikes for your war club. Longer. Sharper. Dragghen shaped them from Coppervein ore. Rated his own work a five.',
    icon: '⚒️',
    basePrice: 100,
    statBonus: { attack: 5 },
    unique: true,
    setFlag: 'danzai_upgraded',
    requiresFlag: 'tavven_conquered',
  },

  // === LUXURY / SPECIAL ===
  {
    id: 'barrel_of_rum',
    name: 'Barrel of Rum',
    category: 'luxury',
    description: 'Good rum. Not great rum. But after a week at sea, the distinction stops mattering. Crew morale in a barrel.',
    icon: '🍺',
    basePrice: 20,
    resourceEffect: { supplies: 2 },
    statBonus: { reputation: 1 },
    loyaltyBoost: 5,
    unique: false,
  },
  {
    id: 'grimoire_amplifier',
    name: 'Grimoire Signal Amplifier',
    category: 'special',
    description: 'Military-grade broadcast hardware. Kovesse has been asking for one of these for weeks. "Captain, PLEASE."',
    icon: '📡',
    basePrice: 150,
    resourceEffect: { intelligence: 5 },
    statBonus: { reputation: 2 },
    unique: true,
    setFlag: 'has_grimoire_amplifier',
    requiresFlag: 'grimoire_booster_approved',
    minDay: 5,
  },

  // === ANVIL CAY ITEMS ===
  {
    id: 'bastion_plate_armor',
    name: 'Bastion Plate Armor',
    category: 'weapon',
    description: 'Conqueror-forged plate. Heavy, imposing, and built to withstand Dominion attacks. Gharen\'s personal quartermaster had good taste.',
    icon: '🛡️',
    basePrice: 180,
    statBonus: { defense: 8, hp: 15 },
    unique: true,
    setFlag: 'has_bastion_plate',
    requiresFlag: 'anvil_cay_conquered',
  },
  {
    id: 'fleet_intelligence_cache',
    name: 'Fleet Intelligence Cache',
    category: 'intel',
    description: 'Decoded Bastion Fleet communications. Conqueror patrol routes, supply schedules, and officer dossiers for the next quarter.',
    icon: '📂',
    basePrice: 120,
    resourceEffect: { intelligence: 15 },
    unique: false,
    requiresFlag: 'anvil_cay_conquered',
    minDay: 10,
  },
  {
    id: 'conqueror_iron_tonic',
    name: 'Conqueror Iron Tonic',
    category: 'supply',
    description: 'Military-grade stamina supplement. Tastes like rust and regret. Works like a charm.',
    icon: '⚗️',
    basePrice: 45,
    resourceEffect: { supplies: 25 },
    unique: false,
    requiresFlag: 'anvil_cay_conquered',
  },

  // === SORREN'S FLAT ITEMS ===
  {
    id: 'consortium_trade_license',
    name: 'Consortium Trade License',
    category: 'special',
    description: 'Official documentation granting preferred trade status across all Consortium-affiliated ports. Delvessa negotiated the terms.',
    icon: '📜',
    basePrice: 200,
    statBonus: { reputation: 2 },
    unique: true,
    setFlag: 'has_trade_license',
    requiresFlag: 'sorrens_conquered',
  },
  {
    id: 'luxury_provisions',
    name: 'Luxury Provisions',
    category: 'supply',
    description: 'Wine, aged cheese, imported spices, and preserved delicacies. Dragghen rates the packaging a five and the contents a six. His first six.',
    icon: '🍷',
    basePrice: 60,
    resourceEffect: { supplies: 30 },
    loyaltyBoost: 8,
    unique: false,
    requiresFlag: 'sorrens_conquered',
  },
  {
    id: 'sorrens_ledger_cipher',
    name: 'Sorren\'s Ledger Cipher',
    category: 'intel',
    description: 'The Consortium\'s encryption methodology for their trade ledgers. Delvessa can read every financial transaction in the Central Belt.',
    icon: '🔑',
    basePrice: 160,
    resourceEffect: { intelligence: 8 },
    unique: true,
    setFlag: 'has_ledger_cipher',
    requiresFlag: 'sorrens_conquered',
  },

  // === MIRRORWATER ITEMS ===
  {
    id: 'stillwater_tonic',
    name: 'Stillwater Tonic',
    category: 'supply',
    description: 'Brewed from Mirrorwater spring water and local herbs. Calms the mind, sharpens Sight, tastes like a quiet morning.',
    icon: '🧴',
    basePrice: 30,
    resourceEffect: { supplies: 10 },
    unique: false,
    requiresFlag: 'mirrorwater_conquered',
  },
  {
    id: 'ancient_chart_fragment',
    name: 'Ancient Chart Fragment',
    category: 'intel',
    description: 'Suulen found it in the cavern walls, a pre-Wardensea navigation chart showing currents that modern maps don\'t record.',
    icon: '🗺️',
    basePrice: 140,
    resourceEffect: { intelligence: 12 },
    unique: true,
    setFlag: 'has_ancient_chart',
    requiresFlag: 'mirrorwater_conquered',
  },

  // === WINDROW ITEMS ===
  {
    id: 'cliff_cured_timber',
    name: 'Cliff-Cured Timber',
    category: 'material',
    description: 'Wind-dried hardwood from the cliff shelves. The constant gale strips moisture and compresses the grain. Lighter than ironwood, tougher than oak. Shipwrights pay premium for this.',
    icon: '🪵',
    basePrice: 80,
    resourceEffect: { materials: 15 },
    unique: false,
    requiresFlag: 'windrow_conquered',
  },
  {
    id: 'windrow_storm_cloak',
    name: 'Windrow Storm Cloak',
    category: 'weapon',
    description: 'Heavy-weave cloak lined with wind-resistant oilskin and reinforced at the shoulders. Designed for the cliff workers who spend twelve-hour shifts in gale-force winds. Turns out it\'s also excellent armor.',
    icon: '🧥',
    basePrice: 200,
    statBonus: { defense: 5, hp: 10 },
    unique: true,
    setFlag: 'has_storm_cloak',
    requiresFlag: 'windrow_conquered',
  },
  {
    id: 'council_writ',
    name: 'Council Writ of Passage',
    category: 'intel',
    description: 'Official documentation from the Windrow Council granting safe passage through the Southern Reach wind corridor. Every island south of here respects the Council\'s seal.',
    icon: '📜',
    basePrice: 120,
    resourceEffect: { intelligence: 8 },
    unique: true,
    setFlag: 'has_council_writ',
    requiresFlag: 'windrow_conquered',
  },

  // === GHOSTLIGHT REEF ITEMS ===
  {
    id: 'reef_smoked_fish',
    name: 'Reef-Smoked Fish',
    category: 'supply',
    description: 'Deep-reef fish smoked over bioluminescent coral, the collective\'s specialty. The faint glow fades after curing, but the flavor doesn\'t. Dragghen rates the preservation method a five.',
    icon: '🐟',
    basePrice: 40,
    resourceEffect: { supplies: 20 },
    unique: false,
    requiresFlag: 'ghostlight_reef_conquered',
  },
  {
    id: 'bioluminescent_lantern',
    name: 'Bioluminescent Lantern',
    category: 'weapon',
    description: 'A sealed coral lantern containing living bioluminescent organisms from the deep reef. It never needs fuel, never goes out, and the light patterns shift with water currents. Suulen can read them like a map.',
    icon: '🏮',
    basePrice: 180,
    resourceEffect: { intelligence: 5 },
    statBonus: { defense: 5 },
    unique: true,
    setFlag: 'has_bio_lantern',
    requiresFlag: 'ghostlight_reef_conquered',
  },
  {
    id: 'leviathan_scale',
    name: 'Leviathan Scale Fragment',
    category: 'material',
    description: 'A fragment of the Reef Leviathan\'s armor plating. Dense as iron, light as bone, with a faint bioluminescent shimmer that never fades. Dragghen says it can be shaped into armor-grade material. Rates the raw material a six. One fragment is worth more than most ships.',
    icon: '🛡️',
    basePrice: 350,
    resourceEffect: { materials: 25 },
    unique: true,
    setFlag: 'has_leviathan_scale',
    requiresFlag: 'ghostlight_reef_conquered',
  },

  // === VESS HARBOUR ITEMS ===
  {
    id: 'wardensea_arms',
    name: 'Wardensea Armaments',
    category: 'weapon',
    description: 'Military-grade weapons seized from Wardensea stores. Standard issue for their southern fleet. Now standard issue for yours.',
    icon: '⚔️',
    basePrice: 300,
    statBonus: { attack: 10, defense: 5 },
    unique: true,
    setFlag: 'has_wardensea_arms',
    requiresFlag: 'vess_harbour_conquered',
  },
  {
    id: 'fleet_intelligence',
    name: 'Fleet Intelligence Dossier',
    category: 'intel',
    description: 'Detailed intelligence on Wardensea fleet movements and deployment schedules. Information that wins wars before they start.',
    icon: '📂',
    basePrice: 250,
    resourceEffect: { intelligence: 20 },
    unique: true,
    setFlag: 'has_fleet_dossier',
    requiresFlag: 'vess_harbour_conquered',
  },
  {
    id: 'military_rations',
    name: 'Military Rations',
    category: 'supply',
    description: 'Wardensea standard-issue field rations. Bland but effective. Dragghen rates them a one.',
    icon: '🥫',
    basePrice: 60,
    resourceEffect: { supplies: 25 },
    unique: false,
    requiresFlag: 'vess_harbour_conquered',
  },
];

// ==========================================
// ISLAND SHOP DEFINITIONS
// ==========================================

export interface IslandShopConfig {
  islandId: string;
  name: string;
  description: string;
  /** Item IDs available at this shop */
  itemIds: string[];
  /** Price modifier (1.0 = normal, 0.8 = 20% discount) */
  priceModifier: number;
  /** Additional discount when island is controlled */
  conqueredDiscount: number;
}

export const islandShops: Record<string, IslandShopConfig> = {
  tavven_shoal: {
    islandId: 'tavven_shoal',
    name: 'Tavven Fish Market & Supply',
    description: 'The fish market sells more than fish. If Pettha Koss doesn\'t have it, she knows who does.',
    itemIds: [
      'provisions_crate', 'premium_rations', 'medical_kit',
      'shipping_manifest', 'copper_ingots', 'barrel_of_rum',
      'danzai_spikes',
    ],
    priceModifier: 1.0,
    conqueredDiscount: 0.15,
  },
  keldriss: {
    islandId: 'keldriss',
    name: 'Keldriss Shadow Market',
    description: 'Nothing is labeled. Prices aren\'t posted. Everything is negotiable and half of it is stolen.',
    itemIds: [
      'patrol_schedule', 'shipping_manifest', 'conqueror_dossier',
      'sight_lens', 'provisions_crate', 'ironwood_planks',
    ],
    priceModifier: 0.85, // Shadow market = cheaper
    conqueredDiscount: 0.1,
  },
  coppervein: {
    islandId: 'coppervein',
    name: 'Coppervein Cooperative Store',
    description: 'Gorundai miners sell materials at fair prices. "Fair" means they profit. Just not outrageously.',
    itemIds: [
      'copper_ingots', 'ironwood_planks', 'repair_kit',
      'iron_chain_mail', 'provisions_crate', 'medical_kit',
    ],
    priceModifier: 0.9, // Mining cooperative = good material prices
    conqueredDiscount: 0.2,
  },
  mossbreak: {
    islandId: 'mossbreak',
    name: 'Mossbreak Supply Depot',
    description: 'Three taverns and a depot. The depot sells supplies, the taverns sell gossip. Budget accordingly.',
    itemIds: [
      'provisions_crate', 'barrel_of_rum', 'medical_kit',
      'patrol_schedule', 'shipping_manifest',
    ],
    priceModifier: 1.1, // Neutral ground = slightly inflated
    conqueredDiscount: 0.1,
  },
  anvil_cay: {
    islandId: 'anvil_cay',
    name: 'Anvil Cay Armory & Supply',
    description: 'Conqueror military stores, now under new management. Heavy gear, hard intel, and iron tonics that taste like they were brewed in a forge.',
    itemIds: [
      'bastion_plate_armor', 'fleet_intelligence_cache', 'conqueror_iron_tonic',
      'copper_ingots', 'ironwood_planks', 'repair_kit',
    ],
    priceModifier: 1.2, // Military markup
    conqueredDiscount: 0.25,
  },
  sorrens_flat: {
    islandId: 'sorrens_flat',
    name: 'Consortium Trade Exchange',
    description: 'Everything is labeled, priced, and taxed. The Consortium doesn\'t haggle. They present terms. Reasonable terms, admittedly.',
    itemIds: [
      'consortium_trade_license', 'luxury_provisions', 'sorrens_ledger_cipher',
      'premium_rations', 'shipping_manifest', 'conqueror_dossier',
    ],
    priceModifier: 1.0, // Fair prices
    conqueredDiscount: 0.2,
  },
  mirrorwater: {
    islandId: 'mirrorwater',
    name: 'Mirrorwater Cache',
    description: 'A small supply cache in the hidden base. Limited selection, but what\'s here is unique. Suulen curates the inventory personally.',
    itemIds: [
      'stillwater_tonic', 'ancient_chart_fragment',
      'provisions_crate', 'medical_kit',
    ],
    priceModifier: 0.7, // Hidden base = no markup
    conqueredDiscount: 0.3,
  },
  windrow: {
    islandId: 'windrow',
    name: 'Windrow Cliff Market',
    description: 'Built into the cliff shelves where the wind-powered saws run. The market sells timber, storm gear, and council documentation. Everything smells like sawdust and salt spray.',
    itemIds: [
      'cliff_cured_timber', 'windrow_storm_cloak', 'council_writ',
      'provisions_crate', 'repair_kit', 'premium_rations',
    ],
    priceModifier: 0.9, // Wind corridor = efficient trade
    conqueredDiscount: 0.25,
  },
  ghostlight_reef: {
    islandId: 'ghostlight_reef',
    name: 'Ghostlight Collective Exchange',
    description: 'The fishing collective trades from the reef platforms, half market, half dock, entirely surrounded by glowing water. Prices are fair but the selection reflects a community that lives and dies by the sea.',
    itemIds: [
      'reef_smoked_fish', 'bioluminescent_lantern', 'leviathan_scale',
      'provisions_crate', 'medical_kit', 'shipping_manifest',
    ],
    priceModifier: 1.1, // Remote location = slight markup
    conqueredDiscount: 0.2,
  },
  vess_harbour: {
    islandId: 'vess_harbour',
    name: 'Vess Harbour Military Exchange',
    description: 'Wardensea military surplus under new management. Everything here was built to outfit a southern fleet: weapons, intelligence, and rations that taste like cardboard wrapped in duty.',
    itemIds: [
      'wardensea_arms', 'fleet_intelligence', 'military_rations',
      'provisions_crate', 'medical_kit', 'repair_kit',
    ],
    priceModifier: 1.3, // Military markup
    conqueredDiscount: 0.3,
  },
};

// ==========================================
// SHOP CALCULATION FUNCTIONS
// ==========================================

/**
 * Build shop inventory for a specific island
 */
export function buildShopInventory(
  islandId: string,
  isControlled: boolean,
  dayCount: number,
  flags: Record<string, boolean | number | string>,
  tradeDiscount: number, // From territory bonuses
  reputation: number = 0, // Reputation lowers prices
  infamy: number = 0, // Infamy raises prices at neutral/hostile shops
  diplomatDiscount: number = 0, // From diplomat crew assignment on controlled islands
): ShopInventory | null {
  const shopConfig = islandShops[islandId];
  if (!shopConfig) return null;

  const items: ShopSlot[] = [];

  for (const itemId of shopConfig.itemIds) {
    const item = allTradeItems.find((t) => t.id === itemId);
    if (!item) continue;

    // Check availability
    if (item.minDay && dayCount < item.minDay) continue;
    if (item.requiresFlag && !flags[item.requiresFlag]) continue;
    if (item.unique && item.setFlag && flags[item.setFlag]) continue;

    // Calculate price
    let price = item.basePrice * shopConfig.priceModifier;
    if (isControlled) {
      price *= (1 - shopConfig.conqueredDiscount);
    }
    if (tradeDiscount > 0) {
      price *= (1 - tradeDiscount / 100);
    }
    // Reputation discount: up to 15% off at 100 rep (merchants respect you)
    if (reputation > 0) {
      price *= (1 - reputation / 100 * 0.15);
    }
    // Infamy surcharge at uncontrolled shops: up to 20% markup (fear tax)
    // Scales linearly from 0% at infamy 20 to 20% at infamy 100
    if (infamy > 20 && !isControlled) {
      price *= (1 + Math.min(infamy - 20, 80) / 80 * 0.20);
    }
    const preDiplomatPrice = Math.max(1, Math.round(price));

    // Diplomat discount: applied last, only on controlled islands
    if (diplomatDiscount > 0) {
      price *= (1 - diplomatDiscount / 100);
    }
    price = Math.max(1, Math.round(price));

    items.push({
      item,
      stock: item.unique ? 1 : -1,
      currentPrice: price,
      preDiplomatPrice,
      available: true,
    });
  }

  return {
    islandId,
    items,
  };
}

/**
 * Get sell price for resources (players can sell excess)
 */
export function getSellPrices(islandId: string): {
  supplies: number;
  materials: number;
  intelligence: number;
} {
  const config = islandShops[islandId];
  const mod = config?.priceModifier || 1.0;

  return {
    supplies: Math.max(1, Math.round(1 * mod)),    // 1 sovereign per supply
    materials: Math.max(1, Math.round(2 * mod)),    // 2 sovereigns per material
    intelligence: Math.max(1, Math.round(5 * mod)), // 5 sovereigns per intel point
  };
}
