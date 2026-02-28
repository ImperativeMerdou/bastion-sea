// =============================================
// GODTIDE: BASTION SEA - Territory & Base Building
// =============================================
// Each conquered island provides unique passive bonuses.
// Upgrading territories costs resources but compounds power.
// Holding territory stretches supply lines - empire pressure.

import { Island, Resources, IslandRole } from '../types/game';
import { TERRITORY } from '../constants/balance';

// ==========================================
// TERRITORY BONUS DEFINITIONS
// ==========================================

export interface TerritoryBonus {
  id: string;
  islandId: string;
  name: string;
  description: string;
  type: 'income' | 'combat' | 'crew' | 'intelligence' | 'trade' | 'special';
  effects: TerritoryEffect[];
}

export interface TerritoryEffect {
  stat: 'sovereigns_per_day' | 'supplies_per_day' | 'materials_per_day' |
        'intelligence_per_day' | 'attack_bonus' | 'defense_bonus' |
        'crew_hp_bonus' | 'stamina_regen' | 'trade_discount' |
        'travel_cost_reduction' | 'reputation_per_day' | 'xp_bonus';
  value: number;
  description: string;
}

export interface TerritoryUpgrade {
  id: string;
  islandId: string;
  name: string;
  description: string;
  tier: 1 | 2 | 3;
  cost: Partial<Resources>;
  daysToComplete: number;
  effects: TerritoryEffect[];
  requires?: string[];  // Upgrade IDs that must be completed first
  icon: string;
}

export interface TerritoryState {
  islandId: string;
  controlledSince: number;           // Day number when conquered
  upgrades: string[];                 // Completed upgrade IDs
  upgradeInProgress?: {
    upgradeId: string;
    completionDay: number;
  };
  morale: number;                     // 0-100, population happiness
  defenseRating: number;              // 0-100, how hard to retake
  underAttack: boolean;
  /** Crew member dispatched for morale boost - cleared after duration expires */
  crewDispatched?: {
    crewId: string;
    untilDay: number;                // Day when crew returns
    moraleBoost: number;             // Daily morale bonus
  };
  /** Island specialization role */
  islandRole: IslandRole;
  /** Day when role was last changed (cooldown: 5 days) */
  roleChangedDay: number;
}

// ==========================================
// ISLAND PASSIVE BONUSES (Unlocked on conquest)
// ==========================================

export const islandBonuses: Record<string, TerritoryBonus> = {
  tavven_shoal: {
    id: 'tavven_base',
    islandId: 'tavven_shoal',
    name: 'Tavven Shoal - Trade Hub',
    description: 'Fish market + harbor scheduling = steady income. Pettha Koss keeps the gears turning.',
    type: 'income',
    effects: [
      { stat: 'sovereigns_per_day', value: 50, description: '+50 Sovereigns/day (harbor fees)' },
      { stat: 'supplies_per_day', value: 5, description: '+5 Supplies/day (fish market)' },
      { stat: 'intelligence_per_day', value: 1, description: '+1 Intel/day (gossip hub)' },
    ],
  },
  keldriss: {
    id: 'keldriss_base',
    islandId: 'keldriss',
    name: 'Keldriss - Shadow Market',
    description: 'Ungovernable, untaxable, invaluable. Everything is available if you know who to ask.',
    type: 'intelligence',
    effects: [
      { stat: 'intelligence_per_day', value: 3, description: '+3 Intel/day (shadow network)' },
      { stat: 'sovereigns_per_day', value: 20, description: '+20 Sovereigns/day (black market cut)' },
      { stat: 'trade_discount', value: 10, description: '10% cheaper purchases' },
    ],
  },
  coppervein: {
    id: 'coppervein_base',
    islandId: 'coppervein',
    name: 'Coppervein - Mining Cooperative',
    description: 'Gorundai miners produce the best copper in the Bastion Sea. Materials and equipment flow.',
    type: 'trade',
    effects: [
      { stat: 'materials_per_day', value: 8, description: '+8 Materials/day (copper mining)' },
      { stat: 'sovereigns_per_day', value: 30, description: '+30 Sovereigns/day (ore sales)' },
      { stat: 'defense_bonus', value: 5, description: '+5 DEF (Gorundai-forged gear)' },
    ],
  },
  mossbreak: {
    id: 'mossbreak_base',
    islandId: 'mossbreak',
    name: 'Mossbreak - Neutral Ground',
    description: 'Three taverns and a supply depot. Not much to conquer, but everything to listen to.',
    type: 'intelligence',
    effects: [
      { stat: 'intelligence_per_day', value: 4, description: '+4 Intel/day (Renegade gossip)' },
      { stat: 'reputation_per_day', value: 1, description: '+1 Reputation/day (neutral ground cred)' },
    ],
  },
  durrek_garrison: {
    id: 'durrek_base',
    islandId: 'durrek_garrison',
    name: 'Durrek Garrison - Military Outpost',
    description: 'Former Wardensea garrison. Taking this sends a message. Holding it sends a bigger one.',
    type: 'combat',
    effects: [
      { stat: 'attack_bonus', value: 8, description: '+8 ATK (military armory)' },
      { stat: 'defense_bonus', value: 8, description: '+8 DEF (fortified position)' },
      { stat: 'crew_hp_bonus', value: 20, description: '+20 Max HP (training grounds)' },
    ],
  },
  sorrens_flat: {
    id: 'sorrens_base',
    islandId: 'sorrens_flat',
    name: "Sorren's Flat - Shipyard",
    description: 'The only proper shipyard in the Central Belt. Ships get fixed. Ships get built.',
    type: 'special',
    effects: [
      { stat: 'materials_per_day', value: 3, description: '+3 Materials/day (shipyard scraps)' },
      { stat: 'sovereigns_per_day', value: 40, description: '+40 Sovereigns/day (repair fees)' },
      { stat: 'travel_cost_reduction', value: 20, description: '20% cheaper travel (better ships)' },
    ],
  },
  anvil_cay: {
    id: 'anvil_base',
    islandId: 'anvil_cay',
    name: 'Anvil Cay - Fortress Island',
    description: 'Natural fortress. Volcanic walls. The Bastion Fleet used it for resupply. Now it\'s yours.',
    type: 'combat',
    effects: [
      { stat: 'defense_bonus', value: 12, description: '+12 DEF (fortress walls)' },
      { stat: 'supplies_per_day', value: 8, description: '+8 Supplies/day (military stores)' },
      { stat: 'stamina_regen', value: 3, description: '+3 Stamina regen/round in combat' },
    ],
  },
  mirrorwater: {
    id: 'mirrorwater_base',
    islandId: 'mirrorwater',
    name: 'Mirrorwater - Mystic Lagoon',
    description: 'The still waters show what shouldn\'t be visible. Sight users come here to train.',
    type: 'special',
    effects: [
      { stat: 'intelligence_per_day', value: 5, description: '+5 Intel/day (Sight visions)' },
      { stat: 'xp_bonus', value: 15, description: '15% faster Dominion growth' },
    ],
  },
  windrow: {
    id: 'windrow_base',
    islandId: 'windrow',
    name: 'Windrow - Storm Harbor',
    description: 'Southern Reach gateway. Controls the wind corridor that every ship must pass through.',
    type: 'trade',
    effects: [
      { stat: 'sovereigns_per_day', value: 80, description: '+80 Sovereigns/day (toll revenue)' },
      { stat: 'intelligence_per_day', value: 2, description: '+2 Intel/day (shipping manifests)' },
      { stat: 'travel_cost_reduction', value: 15, description: '15% cheaper travel (wind routes)' },
    ],
  },
  ghostlight_reef: {
    id: 'ghostlight_base',
    islandId: 'ghostlight_reef',
    name: 'Ghostlight Reef - Bioluminescent Fishery',
    description: 'The reef glows. The fish are plentiful. The collective knows every current. Control the reef, feed the fleet.',
    type: 'income',
    effects: [
      { stat: 'supplies_per_day', value: 10, description: '+10 Supplies/day (reef fishing)' },
      { stat: 'intelligence_per_day', value: 3, description: '+3 Intel/day (reef watchers)' },
      { stat: 'sovereigns_per_day', value: 40, description: '+40 Sovereigns/day (fish trade)' },
    ],
  },
  vess_harbour: {
    id: 'vess_harbour_base',
    islandId: 'vess_harbour',
    name: 'Vess Harbour - Southern Fortress',
    description: 'The Wardensea\'s southern stronghold. Military infrastructure, intelligence networks, and a harbour that controls the deep southern routes.',
    type: 'combat',
    effects: [
      { stat: 'sovereigns_per_day', value: 60, description: '+60 Sovereigns/day (military port fees)' },
      { stat: 'supplies_per_day', value: 5, description: '+5 Supplies/day (military stores)' },
      { stat: 'materials_per_day', value: 5, description: '+5 Materials/day (naval salvage)' },
      { stat: 'intelligence_per_day', value: 8, description: '+8 Intel/day (Wardensea intelligence network)' },
    ],
  },
  noon_island: {
    id: 'noon_island_base',
    islandId: 'noon_island',
    name: 'Noon Island - Shadowless Waypoint',
    description: 'A small, strange island where shadows vanish at midday. Not much to hold, but the waypoint has its uses.',
    type: 'intelligence',
    effects: [
      { stat: 'sovereigns_per_day', value: 10, description: '+10 Sovereigns/day (waypoint tolls)' },
      { stat: 'supplies_per_day', value: 3, description: '+3 Supplies/day (island foraging)' },
      { stat: 'intelligence_per_day', value: 2, description: '+2 Intel/day (waypoint observations)' },
    ],
  },
};

// ==========================================
// TERRITORY UPGRADES
// ==========================================

export const territoryUpgrades: Record<string, TerritoryUpgrade[]> = {
  tavven_shoal: [
    {
      id: 'tavven_expanded_docks',
      islandId: 'tavven_shoal',
      name: 'Expanded Docks',
      description: 'Bigger docks, more ships, more fees. Pettha Koss draws up the expansion plans.',
      tier: 1,
      cost: { sovereigns: 200, materials: 50 },
      daysToComplete: 3,
      effects: [
        { stat: 'sovereigns_per_day', value: 30, description: '+30 Sovereigns/day' },
        { stat: 'supplies_per_day', value: 3, description: '+3 Supplies/day' },
      ],
      icon: '🏗️',
    },
    {
      id: 'tavven_grimoire_tower',
      islandId: 'tavven_shoal',
      name: 'Grimoire Relay Tower',
      description: 'Kovesse designs a broadcast tower. Information flows faster. Propaganda flows fastest.',
      tier: 1,
      cost: { sovereigns: 150, materials: 30, intelligence: 10 },
      daysToComplete: 2,
      effects: [
        { stat: 'intelligence_per_day', value: 3, description: '+3 Intel/day' },
        { stat: 'reputation_per_day', value: 1, description: '+1 Reputation/day' },
      ],
      icon: '📡',
    },
    {
      id: 'tavven_fortifications',
      islandId: 'tavven_shoal',
      name: 'Harbor Fortifications',
      description: 'Vorreth designs defensive positions. If the Wardensea comes, they bleed for every foot.',
      tier: 2,
      cost: { sovereigns: 400, materials: 100 },
      daysToComplete: 5,
      effects: [
        { stat: 'defense_bonus', value: 10, description: '+10 DEF (fortified harbor)' },
      ],
      requires: ['tavven_expanded_docks'],
      icon: '🏰',
    },
    {
      id: 'tavven_trade_network',
      islandId: 'tavven_shoal',
      name: 'Regional Trade Network',
      description: 'Delvessa establishes contracts with six neighboring islands. The money compounds.',
      tier: 3,
      cost: { sovereigns: 800, materials: 50, intelligence: 20 },
      daysToComplete: 7,
      effects: [
        { stat: 'sovereigns_per_day', value: 60, description: '+60 Sovereigns/day' },
        { stat: 'trade_discount', value: 15, description: '15% cheaper purchases' },
      ],
      requires: ['tavven_expanded_docks', 'tavven_grimoire_tower'],
      icon: '💰',
    },
  ],
  coppervein: [
    {
      id: 'coppervein_deep_shafts',
      islandId: 'coppervein',
      name: 'Deep Shaft Expansion',
      description: 'Dragghen knows the geological survey from his shipyard days. The cooperative votes to dig deeper.',
      tier: 1,
      cost: { sovereigns: 300, materials: 80 },
      daysToComplete: 4,
      effects: [
        { stat: 'materials_per_day', value: 5, description: '+5 Materials/day' },
        { stat: 'sovereigns_per_day', value: 20, description: '+20 Sovereigns/day' },
      ],
      icon: '⛏️',
    },
    {
      id: 'coppervein_forge',
      islandId: 'coppervein',
      name: 'War Forge',
      description: 'A Gorundai forge built for weapons, not trade goods. The crew gets proper equipment.',
      tier: 2,
      cost: { sovereigns: 500, materials: 150 },
      daysToComplete: 5,
      effects: [
        { stat: 'attack_bonus', value: 8, description: '+8 ATK (forged weapons)' },
        { stat: 'defense_bonus', value: 5, description: '+5 DEF (forged armor)' },
      ],
      requires: ['coppervein_deep_shafts'],
      icon: '🔨',
    },
  ],
  keldriss: [
    {
      id: 'keldriss_smuggler_network',
      islandId: 'keldriss',
      name: 'Smuggler Network',
      description: 'The locals don\'t like government. They do like profit. Suulen builds a shadow logistics web.',
      tier: 1,
      cost: { sovereigns: 200, intelligence: 15 },
      daysToComplete: 3,
      effects: [
        { stat: 'intelligence_per_day', value: 2, description: '+2 Intel/day' },
        { stat: 'trade_discount', value: 8, description: '8% cheaper purchases' },
      ],
      icon: '🕸️',
    },
    {
      id: 'keldriss_safe_houses',
      islandId: 'keldriss',
      name: 'Safe House Chain',
      description: 'Hidden rooms across the island. Bolt holes, dead drops, meeting spots. The infrastructure of paranoia.',
      tier: 1,
      cost: { sovereigns: 150, materials: 40 },
      daysToComplete: 2,
      effects: [
        { stat: 'defense_bonus', value: 5, description: '+5 DEF (hidden defenses)' },
        { stat: 'intelligence_per_day', value: 1, description: '+1 Intel/day' },
      ],
      icon: '🏚️',
    },
    {
      id: 'keldriss_black_market',
      islandId: 'keldriss',
      name: 'Black Market Expansion',
      description: 'Formalize the informal. Tax the untaxable. Keldriss becomes the place where anything can be bought.',
      tier: 2,
      cost: { sovereigns: 500, intelligence: 20, materials: 30 },
      daysToComplete: 5,
      effects: [
        { stat: 'sovereigns_per_day', value: 40, description: '+40 Sovereigns/day' },
        { stat: 'trade_discount', value: 12, description: '12% cheaper purchases' },
      ],
      requires: ['keldriss_smuggler_network'],
      icon: '💎',
    },
  ],
  mossbreak: [
    {
      id: 'mossbreak_tavern_network',
      islandId: 'mossbreak',
      name: 'Tavern Intelligence Ring',
      description: 'Three taverns, three bartenders, three sets of ears. Every conversation gets reported.',
      tier: 1,
      cost: { sovereigns: 100, intelligence: 5 },
      daysToComplete: 2,
      effects: [
        { stat: 'intelligence_per_day', value: 3, description: '+3 Intel/day' },
      ],
      icon: '🍺',
    },
    {
      id: 'mossbreak_neutral_haven',
      islandId: 'mossbreak',
      name: 'Neutral Haven Declaration',
      description: 'Declare Mossbreak an open port under your protection. Traders flock. Information flows.',
      tier: 2,
      cost: { sovereigns: 300, materials: 50 },
      daysToComplete: 4,
      effects: [
        { stat: 'sovereigns_per_day', value: 25, description: '+25 Sovereigns/day (docking fees)' },
        { stat: 'reputation_per_day', value: 2, description: '+2 Reputation/day (fair governance)' },
        { stat: 'intelligence_per_day', value: 2, description: '+2 Intel/day (trader gossip)' },
      ],
      requires: ['mossbreak_tavern_network'],
      icon: '🏴',
    },
  ],
  durrek_garrison: [
    {
      id: 'durrek_armory',
      islandId: 'durrek_garrison',
      name: 'Captured Armory',
      description: 'The Wardensea left behind weapons, armor, and enough ammunition to outfit a small army.',
      tier: 1,
      cost: { sovereigns: 200, materials: 60 },
      daysToComplete: 3,
      effects: [
        { stat: 'attack_bonus', value: 5, description: '+5 ATK (military weapons)' },
        { stat: 'defense_bonus', value: 5, description: '+5 DEF (military armor)' },
      ],
      icon: '⚔️',
    },
    {
      id: 'durrek_training_grounds',
      islandId: 'durrek_garrison',
      name: 'Training Grounds',
      description: 'Vorreth turns the old drill yard into a proper training camp. Your crew trains harder.',
      tier: 1,
      cost: { sovereigns: 250, materials: 40 },
      daysToComplete: 4,
      effects: [
        { stat: 'crew_hp_bonus', value: 15, description: '+15 Max HP (combat training)' },
        { stat: 'stamina_regen', value: 2, description: '+2 Stamina regen/round' },
      ],
      icon: '🎯',
    },
    {
      id: 'durrek_watchtower',
      islandId: 'durrek_garrison',
      name: 'Northern Watchtower',
      description: 'See everything that enters the Northern Arc. Early warning. Tactical advantage.',
      tier: 2,
      cost: { sovereigns: 400, materials: 100, intelligence: 10 },
      daysToComplete: 5,
      effects: [
        { stat: 'intelligence_per_day', value: 4, description: '+4 Intel/day (patrol monitoring)' },
        { stat: 'defense_bonus', value: 8, description: '+8 DEF (early warning)' },
      ],
      requires: ['durrek_armory'],
      icon: '🗼',
    },
    {
      id: 'durrek_flagship_berth',
      islandId: 'durrek_garrison',
      name: 'Flagship Berth',
      description: 'A proper military dock for capital ships. A berth that says "we\'re not going anywhere."',
      tier: 3,
      cost: { sovereigns: 800, materials: 200 },
      daysToComplete: 7,
      effects: [
        { stat: 'attack_bonus', value: 10, description: '+10 ATK (naval superiority)' },
        { stat: 'crew_hp_bonus', value: 10, description: '+10 Max HP (proper medical bay)' },
        { stat: 'travel_cost_reduction', value: 10, description: '10% cheaper travel (military logistics)' },
      ],
      requires: ['durrek_training_grounds', 'durrek_watchtower'],
      icon: '🚢',
    },
  ],
  sorrens_flat: [
    {
      id: 'sorrens_drydock',
      islandId: 'sorrens_flat',
      name: 'Expanded Drydock',
      description: 'Double the repair capacity. Ships from across the Bastion Sea line up to pay for your facilities.',
      tier: 1,
      cost: { sovereigns: 350, materials: 100 },
      daysToComplete: 4,
      effects: [
        { stat: 'sovereigns_per_day', value: 35, description: '+35 Sovereigns/day (repair fees)' },
        { stat: 'materials_per_day', value: 2, description: '+2 Materials/day (salvage)' },
      ],
      icon: '🔧',
    },
    {
      id: 'sorrens_shipyard',
      islandId: 'sorrens_flat',
      name: 'Combat Shipyard',
      description: 'Stop fixing other people\'s ships. Start building your own. Kovesse draws up the designs.',
      tier: 2,
      cost: { sovereigns: 600, materials: 200, intelligence: 10 },
      daysToComplete: 6,
      effects: [
        { stat: 'attack_bonus', value: 6, description: '+6 ATK (naval weapons)' },
        { stat: 'defense_bonus', value: 6, description: '+6 DEF (armored hulls)' },
        { stat: 'travel_cost_reduction', value: 15, description: '15% cheaper travel (fast ships)' },
      ],
      requires: ['sorrens_drydock'],
      icon: '⚓',
    },
  ],
  anvil_cay: [
    {
      id: 'anvil_war_dock',
      islandId: 'anvil_cay',
      name: 'War Dock Restoration',
      description: 'Restore the Conqueror dry docks to full operational capacity. Dragghen oversees the conversion. Rates the existing infrastructure a three.',
      tier: 1,
      cost: { sovereigns: 400, materials: 120 },
      daysToComplete: 4,
      effects: [
        { stat: 'defense_bonus', value: 8, description: '+8 DEF (reinforced docks)' },
        { stat: 'materials_per_day', value: 5, description: '+5 Materials/day (shipyard production)' },
      ],
      icon: '⚓',
    },
    {
      id: 'anvil_weapons_vault',
      islandId: 'anvil_cay',
      name: 'Weapons Vault',
      description: 'The forge still burns. Turn Conqueror steel into Renegade arms. Dragghen knows the metallurgy.',
      tier: 2,
      cost: { sovereigns: 600, materials: 200 },
      daysToComplete: 5,
      effects: [
        { stat: 'attack_bonus', value: 12, description: '+12 ATK (forged weapons)' },
        { stat: 'crew_hp_bonus', value: 15, description: '+15 Max HP (better armor)' },
      ],
      requires: ['anvil_war_dock'],
      icon: '⚔️',
    },
    {
      id: 'anvil_fleet_command',
      islandId: 'anvil_cay',
      name: 'Fleet Command Center',
      description: 'Convert Gharen\'s command post into your own. Intelligence, logistics, and a very large chair.',
      tier: 3,
      cost: { sovereigns: 1000, materials: 150, intelligence: 25 },
      daysToComplete: 7,
      effects: [
        { stat: 'intelligence_per_day', value: 6, description: '+6 Intel/day (fleet intelligence)' },
        { stat: 'defense_bonus', value: 10, description: '+10 DEF (command coordination)' },
        { stat: 'travel_cost_reduction', value: 20, description: '20% cheaper travel (fleet logistics)' },
      ],
      requires: ['anvil_weapons_vault'],
      icon: '🏛️',
    },
  ],
  mirrorwater: [
    {
      id: 'mirrorwater_concealed_docking',
      islandId: 'mirrorwater',
      name: 'Concealed Docking',
      description: 'Three hidden berths inside the cavern. Camouflage netting, signal dampening, zero visibility from open water.',
      tier: 1,
      cost: { sovereigns: 250, materials: 80 },
      daysToComplete: 3,
      effects: [
        { stat: 'defense_bonus', value: 8, description: '+8 DEF (concealed position)' },
        { stat: 'travel_cost_reduction', value: 10, description: '10% cheaper travel (hidden staging)' },
      ],
      icon: '🫥',
    },
    {
      id: 'mirrorwater_sight_shrine',
      islandId: 'mirrorwater',
      name: 'Sight Training Shrine',
      description: 'The still waters amplify Forged Sight. Suulen designs a meditation platform over the lagoon.',
      tier: 2,
      cost: { sovereigns: 400, materials: 60, intelligence: 15 },
      daysToComplete: 5,
      effects: [
        { stat: 'xp_bonus', value: 20, description: '20% faster Dominion growth' },
        { stat: 'intelligence_per_day', value: 4, description: '+4 Intel/day (Sight training)' },
      ],
      requires: ['mirrorwater_concealed_docking'],
      icon: '🔮',
    },
  ],
  windrow: [
    {
      id: 'windrow_timber_mill',
      islandId: 'windrow',
      name: 'Cliff Timber Mill',
      description: 'Wind-powered saws built into the cliff shelves. The corridor funnels constant gale-force air, free energy, infinite lumber. The locals have been doing this for decades. Now they do it for you.',
      tier: 1,
      cost: { sovereigns: 180, materials: 25 },
      daysToComplete: 3,
      effects: [
        { stat: 'materials_per_day', value: 5, description: '+5 Materials/day (wind-powered lumber)' },
        { stat: 'defense_bonus', value: 5, description: '+5 DEF (cliff fortifications)' },
      ],
      icon: '🪵',
    },
    {
      id: 'windrow_council_hall',
      islandId: 'windrow',
      name: 'Council Hall Expansion',
      description: 'Windrow governs by council. Expand the hall, expand the governance. Better administration means better morale, better logistics, better everything.',
      tier: 2,
      cost: { sovereigns: 250, materials: 35 },
      daysToComplete: 4,
      effects: [
        { stat: 'reputation_per_day', value: 3, description: '+3 Reputation/day (improved governance)' },
        { stat: 'crew_hp_bonus', value: 8, description: '+8 Max HP (better logistics)' },
      ],
      requires: ['windrow_timber_mill'],
      icon: '🏛️',
    },
    {
      id: 'windrow_wind_wall',
      islandId: 'windrow',
      name: 'Wind-Wall Fortifications',
      description: 'Use the wind corridor as a weapon. Angled walls and channeled gale-force gusts turn the approach into a death trap for any fleet stupid enough to attack head-on. The wind doesn\'t charge rent.',
      tier: 3,
      cost: { sovereigns: 400, materials: 50, intelligence: 15 },
      daysToComplete: 6,
      effects: [
        { stat: 'defense_bonus', value: 15, description: '+15 DEF (wind-wall fortifications)' },
        { stat: 'travel_cost_reduction', value: 15, description: '15% cheaper travel (wind-assisted routes)' },
      ],
      requires: ['windrow_council_hall'],
      icon: '🌬️',
    },
  ],
  ghostlight_reef: [
    {
      id: 'ghostlight_deep_fishery',
      islandId: 'ghostlight_reef',
      name: 'Deep Reef Fishery',
      description: 'With the Leviathan gone, the fishing collective expands into the deep channels. Reef fish, kelp harvests, and deep-current shellfish. The Southern Reach eats well tonight.',
      tier: 1,
      cost: { sovereigns: 150, materials: 20 },
      daysToComplete: 3,
      effects: [
        { stat: 'supplies_per_day', value: 8, description: '+8 Supplies/day (deep reef fishing)' },
      ],
      icon: '🐟',
    },
    {
      id: 'ghostlight_beacon_network',
      islandId: 'ghostlight_reef',
      name: 'Bioluminescent Beacon Network',
      description: 'The reef\'s natural bioluminescence, harnessed and amplified. Coral lanterns mounted on channel markers create a navigation and communication network visible for miles. Suulen designed the signal patterns. Ships can read the light-language from open water.',
      tier: 2,
      cost: { sovereigns: 300, intelligence: 20 },
      daysToComplete: 5,
      effects: [
        { stat: 'intelligence_per_day', value: 6, description: '+6 Intel/day (beacon surveillance)' },
        { stat: 'travel_cost_reduction', value: 20, description: '20% cheaper travel (beacon navigation)' },
      ],
      requires: ['ghostlight_deep_fishery'],
      icon: '💡',
    },
  ],
};

// ==========================================
// ISLAND ROLE MULTIPLIERS
// ==========================================

export interface RoleMultipliers {
  incomeMultiplier: number;
  defenseMultiplier: number;
  intelPerDay: number;
  description: string;
}

export const ISLAND_ROLE_DATA: Record<IslandRole, RoleMultipliers> = {
  outpost: {
    incomeMultiplier: 1.0,
    defenseMultiplier: 1.25,
    intelPerDay: 0,
    description: 'Balanced. +25% defense.',
  },
  trade_hub: {
    incomeMultiplier: 1.5,
    defenseMultiplier: 0.75,
    intelPerDay: 0,
    description: '+50% income, -25% defense.',
  },
  intel_center: {
    incomeMultiplier: 0.85,
    defenseMultiplier: 1.0,
    intelPerDay: 3,
    description: '+3 intel/day, -15% income.',
  },
  military: {
    incomeMultiplier: 0.75,
    defenseMultiplier: 1.5,
    intelPerDay: 0,
    description: '+50% defense, -25% income.',
  },
  unassigned: {
    incomeMultiplier: 1.0,
    defenseMultiplier: 1.0,
    intelPerDay: 0,
    description: 'No specialization.',
  },
};

/**
 * Change an island's role. Returns null if on cooldown.
 */
export function changeIslandRole(
  state: TerritoryState,
  newRole: IslandRole,
  currentDay: number,
): TerritoryState | null {
  // 5-day cooldown between role changes
  if (currentDay - state.roleChangedDay < 5) return null;
  return {
    ...state,
    islandRole: newRole,
    roleChangedDay: currentDay,
  };
}

// ==========================================
// TERRITORY CALCULATIONS
// ==========================================

/**
 * Calculate total passive bonuses from all controlled territories
 */
export function calculateTerritoryBonuses(
  controlledIslands: Island[],
  territoryStates: Record<string, TerritoryState>,
): {
  dailyIncome: Partial<Resources>;
  combatBonuses: { attack: number; defense: number; hp: number; staminaRegen: number };
  travelDiscount: number;
  tradeDiscount: number;
  reputationPerDay: number;
  xpBonus: number;
} {
  let dailyIncome: Partial<Resources> = {
    sovereigns: 0,
    supplies: 0,
    materials: 0,
    intelligence: 0,
  };
  let combatBonuses = { attack: 0, defense: 0, hp: 0, staminaRegen: 0 };
  let travelDiscount = 0;
  let tradeDiscount = 0;
  let reputationPerDay = 0;
  let xpBonus = 0;

  controlledIslands.forEach((island) => {
    const state = territoryStates[island.id];

    // Morale-based scaling -- unhappy populace produces less AND fights worse
    // >= 30 morale: full bonuses
    // 15-29 morale: 50% (civil unrest, work slowdowns, demoralized garrison)
    // < 15 morale: 0% (open defiance, populace refuses to cooperate)
    const morale = state?.morale ?? 60;
    const moraleScale = morale >= TERRITORY.MORALE_SCALING_FULL_THRESHOLD ? 1.0 : morale >= TERRITORY.MORALE_SCALING_HALF_THRESHOLD ? TERRITORY.MORALE_SCALING_HALF_MULTIPLIER : 0;

    // Collect per-island income and combat into temp buckets so we can scale them
    const islandIncome: Partial<Resources> = { sovereigns: 0, supplies: 0, materials: 0, intelligence: 0 };
    const islandCombat = { attack: 0, defense: 0, hp: 0, staminaRegen: 0 };

    // Base island bonus
    const bonus = islandBonuses[island.id];
    if (bonus) {
      bonus.effects.forEach((effect) => {
        // Route income and combat effects to per-island buckets for scaling
        if (['sovereigns_per_day', 'supplies_per_day', 'materials_per_day', 'intelligence_per_day'].includes(effect.stat)) {
          applyEffect(effect, islandIncome, islandCombat, () => {}, () => {}, () => {}, () => {});
        } else if (['attack_bonus', 'defense_bonus', 'crew_hp_bonus', 'stamina_regen'].includes(effect.stat)) {
          applyEffect(effect, islandIncome, islandCombat, () => {}, () => {}, () => {}, () => {});
        } else {
          applyEffect(effect, dailyIncome, combatBonuses, (v) => { travelDiscount += v; },
            (v) => { tradeDiscount += v; }, (v) => { reputationPerDay += v; }, (v) => { xpBonus += v; });
        }
      });
    }

    // Upgrade bonuses
    if (state) {
      const upgrades = territoryUpgrades[island.id] || [];
      state.upgrades.forEach((upgradeId) => {
        const upgrade = upgrades.find((u) => u.id === upgradeId);
        if (upgrade) {
          upgrade.effects.forEach((effect) => {
            if (['sovereigns_per_day', 'supplies_per_day', 'materials_per_day', 'intelligence_per_day'].includes(effect.stat)) {
              applyEffect(effect, islandIncome, islandCombat, () => {}, () => {}, () => {}, () => {});
            } else if (['attack_bonus', 'defense_bonus', 'crew_hp_bonus', 'stamina_regen'].includes(effect.stat)) {
              applyEffect(effect, islandIncome, islandCombat, () => {}, () => {}, () => {}, () => {});
            } else {
              applyEffect(effect, dailyIncome, combatBonuses, (v) => { travelDiscount += v; },
                (v) => { tradeDiscount += v; }, (v) => { reputationPerDay += v; }, (v) => { xpBonus += v; });
            }
          });
        }
      });
    }

    // Apply island role multipliers
    const role = state?.islandRole || 'unassigned';
    const roleData = ISLAND_ROLE_DATA[role];
    const roleIncomeScale = roleData.incomeMultiplier;

    // Apply morale + role scaling to this island's income contribution
    const totalIncomeScale = moraleScale * roleIncomeScale;
    dailyIncome.sovereigns = (dailyIncome.sovereigns || 0) + Math.floor((islandIncome.sovereigns || 0) * totalIncomeScale);
    dailyIncome.supplies = (dailyIncome.supplies || 0) + Math.floor((islandIncome.supplies || 0) * totalIncomeScale);
    dailyIncome.materials = (dailyIncome.materials || 0) + Math.floor((islandIncome.materials || 0) * totalIncomeScale);
    dailyIncome.intelligence = (dailyIncome.intelligence || 0) + Math.floor((islandIncome.intelligence || 0) * totalIncomeScale) + Math.floor(roleData.intelPerDay * moraleScale);

    // Apply role defense multiplier + morale scaling to combat bonuses from this island
    // Military islands get +50% defense, trade hubs get -25% defense, etc.
    // Rebellious territories contribute nothing to your war machine
    combatBonuses.attack += Math.floor(islandCombat.attack * moraleScale);
    combatBonuses.defense += Math.floor(islandCombat.defense * moraleScale * roleData.defenseMultiplier);
    combatBonuses.hp += Math.floor(islandCombat.hp * moraleScale);
    combatBonuses.staminaRegen += Math.floor(islandCombat.staminaRegen * moraleScale);
  });

  return { dailyIncome, combatBonuses, travelDiscount, tradeDiscount, reputationPerDay, xpBonus };
}

function applyEffect(
  effect: TerritoryEffect,
  income: Partial<Resources>,
  combat: { attack: number; defense: number; hp: number; staminaRegen: number },
  addTravel: (v: number) => void,
  addTrade: (v: number) => void,
  addRep: (v: number) => void,
  addXp: (v: number) => void,
) {
  switch (effect.stat) {
    case 'sovereigns_per_day': income.sovereigns = (income.sovereigns || 0) + effect.value; break;
    case 'supplies_per_day': income.supplies = (income.supplies || 0) + effect.value; break;
    case 'materials_per_day': income.materials = (income.materials || 0) + effect.value; break;
    case 'intelligence_per_day': income.intelligence = (income.intelligence || 0) + effect.value; break;
    case 'attack_bonus': combat.attack += effect.value; break;
    case 'defense_bonus': combat.defense += effect.value; break;
    case 'crew_hp_bonus': combat.hp += effect.value; break;
    case 'stamina_regen': combat.staminaRegen += effect.value; break;
    case 'travel_cost_reduction': addTravel(effect.value); break;
    case 'trade_discount': addTrade(effect.value); break;
    case 'reputation_per_day': addRep(effect.value); break;
    case 'xp_bonus': addXp(effect.value); break;
  }
}

/**
 * Calculate territory upkeep cost (more territory = more upkeep).
 *
 * Uses non-linear scaling tiers to punish unchecked expansion:
 *  1-3 islands: base cost (1x multiplier)
 *  4-6 islands: 1.5x per-island upkeep
 *  7-9 islands: 2.0x per-island upkeep
 *  10+:         3.0x per-island upkeep
 *
 * Each island still pays base(3) + quadratic ramp, but the tier
 * multiplier applies on top, creating sharp jumps at 4, 7, and 10.
 */
export function calculateTerritoryUpkeep(controlledCount: number): number {
  if (controlledCount <= 0) return 0;

  let total = 0;
  for (let i = 1; i <= controlledCount; i++) {
    // Base cost per island: linear + quadratic ramp using position
    const baseCost = TERRITORY.BASE_ISLAND_UPKEEP + Math.floor((i - 1) * TERRITORY.UPKEEP_SCALING_FACTOR);

    // Determine tier multiplier based on which island this is
    let multiplier: number;
    if (i <= TERRITORY.UPKEEP_TIER_1_MAX) {
      multiplier = TERRITORY.UPKEEP_MULTIPLIER_TIER_1;
    } else if (i <= TERRITORY.UPKEEP_TIER_2_MAX) {
      multiplier = TERRITORY.UPKEEP_MULTIPLIER_TIER_2;
    } else if (i <= TERRITORY.UPKEEP_TIER_3_MAX) {
      multiplier = TERRITORY.UPKEEP_MULTIPLIER_TIER_3;
    } else {
      multiplier = TERRITORY.UPKEEP_MULTIPLIER_TIER_4;
    }

    total += Math.floor(baseCost * multiplier);
  }

  return total;
}

/**
 * Check if any territories are at risk of rebellion
 */
export function checkTerritoryMorale(
  territoryStates: Record<string, TerritoryState>,
): string[] {
  const atRisk: string[] = [];
  Object.entries(territoryStates).forEach(([islandId, state]) => {
    if (state.morale < TERRITORY.MORALE_AT_RISK_THRESHOLD) {
      atRisk.push(islandId);
    }
  });
  return atRisk;
}

/**
 * Process daily territory morale changes.
 *
 * Base decay: -2/day (territories need constant attention)
 * Without active management, islands decay in ~25 days.
 * Recovery sources: player presence (+5), diplomat (+3), dispatch (+4), upgrades (+1 each),
 * reputation bonus, INVEST action (+15 via manage_territory).
 */
export function processTerritoryMorale(
  state: TerritoryState,
  playerPresent: boolean,
  supplyDeficit: boolean,
  currentDay?: number,
  reputation: number = 0,
  infamy: number = 0,
  threatLevel: number = 0,
  controlledCount: number = 1,
): TerritoryState {
  let moraleChange = 0;

  // Base daily decay: all territories lose morale passively
  // This is the core pressure mechanic -- you MUST invest attention
  moraleChange -= TERRITORY.MORALE_DECAY_BASE;

  // Empire strain: more territories = faster morale bleed (capped to prevent death spiral)
  // Smooth scaling: 3 islands = -0.45, 6 = -0.9, 10 = -1.5 (cap). No floor -- gradual pressure.
  const rawEmpireStrain = controlledCount * TERRITORY.MORALE_DECAY_PER_TERRITORY;
  const territoryCountDecay = Math.min(rawEmpireStrain, TERRITORY.MORALE_DECAY_EMPIRE_STRAIN_CAP);
  moraleChange -= territoryCountDecay;

  // Threat penalty: higher threat = faster morale drain
  if (threatLevel > 0) {
    moraleChange -= Math.floor(threatLevel / TERRITORY.THREAT_MORALE_DRAIN_DIVISOR);
  }

  // Reputation stabilizes morale: +1 per 25 rep (people respect your rule)
  if (reputation > 0) {
    moraleChange += Math.floor(reputation / TERRITORY.REPUTATION_MORALE_DIVISOR);
  }
  // Infamy destabilizes morale (fear corrodes loyalty)
  if (infamy > TERRITORY.INFAMY_MORALE_PENALTY_THRESHOLD) {
    moraleChange -= Math.floor((infamy - TERRITORY.INFAMY_MORALE_PENALTY_THRESHOLD) / TERRITORY.INFAMY_MORALE_PENALTY_DIVISOR);
  }

  // Player presence boosts morale significantly
  if (playerPresent) moraleChange += TERRITORY.PLAYER_PRESENCE_MORALE_BOOST;

  // Upgrades boost morale (+1 per upgrade, caps contribution at 3)
  moraleChange += Math.min(TERRITORY.UPGRADE_MORALE_BONUS_CAP, state.upgrades.length);

  // Dispatched crew boosts morale
  const dispatch = state.crewDispatched;
  const dispatchActive = dispatch && currentDay != null && currentDay < dispatch.untilDay;
  if (dispatchActive) {
    moraleChange += dispatch.moraleBoost;
  }

  // Supply deficit tanks morale harder
  if (supplyDeficit) moraleChange -= TERRITORY.DEFICIT_MORALE_PENALTY;

  // Under attack tanks morale
  if (state.underAttack) moraleChange -= TERRITORY.UNDER_ATTACK_MORALE_PENALTY;

  // Emergency recovery: if morale is critically low (<15), double positive drift
  if (state.morale < TERRITORY.CRITICAL_RECOVERY_THRESHOLD && moraleChange > 0) {
    moraleChange = Math.round(moraleChange * TERRITORY.CRITICAL_RECOVERY_MULTIPLIER);
  }

  return {
    ...state,
    morale: Math.max(0, Math.min(100, state.morale + moraleChange)),
    // Clear expired dispatch
    crewDispatched: dispatchActive ? state.crewDispatched : undefined,
  };
}

/**
 * Dispatch a crew member to a territory for morale recovery.
 * Duration: 3 days, +4 morale per day, costs 15 supplies.
 */
export function dispatchCrewToTerritory(
  state: TerritoryState,
  crewId: string,
  currentDay: number,
): TerritoryState {
  return {
    ...state,
    crewDispatched: {
      crewId,
      untilDay: currentDay + 3,
      moraleBoost: 4,
    },
  };
}

/**
 * Get morale status label and color for UI display
 */
export function getMoraleStatus(morale: number): { label: string; color: string } {
  if (morale >= TERRITORY.MORALE_HIGH) return { label: 'THRIVING', color: 'text-green-400' };
  if (morale >= TERRITORY.MORALE_STABLE) return { label: 'STABLE', color: 'text-ocean-300' };
  if (morale >= TERRITORY.MORALE_LOW) return { label: 'RESTLESS', color: 'text-amber-400' };
  if (morale >= TERRITORY.MORALE_CRITICAL) return { label: 'UNREST', color: 'text-orange-400' };
  if (morale > 0) return { label: 'REVOLT', color: 'text-crimson-400' };
  return { label: 'REBELLION', color: 'text-crimson-300 animate-pulse' };
}

/**
 * Check if a territory has fully rebelled (morale 0 for too long)
 * Returns island IDs that should be lost to rebellion
 */
export function processRebellions(
  territoryStates: Record<string, TerritoryState>,
): string[] {
  const rebelled: string[] = [];
  Object.entries(territoryStates).forEach(([islandId, state]) => {
    if (state.morale <= 0) {
      rebelled.push(islandId);
    }
  });
  return rebelled;
}
