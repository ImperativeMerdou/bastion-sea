// =============================================
// GODTIDE: BASTION SEA - Balance Constants
// =============================================
// Every gameplay number in one place.
// Change values here, not scattered across 15 files.
// =============================================

// --- ECONOMY ---
export const ECONOMY = {
  // Crew upkeep per day (base cost per recruited crew member)
  // Reduced from 3 to 1: 7 crew at 3/each = 21/day was unrecoverable vs ~10 territory income
  CREW_UPKEEP_PER_MEMBER: 1,
  // Supply upkeep scaling: after this many islands, crew supply cost increases per member
  CREW_UPKEEP_SCALING_THRESHOLD: 4,
  // +supply/day/member per island beyond threshold (halved: 7 crew × 3 islands × 0.5 = 10.5, not 21)
  CREW_UPKEEP_SCALING_RATE: 0.5,
  // Extra crew salary per member per controlled island beyond 4 (sovereigns/day)
  CREW_SALARY_SCALING_THRESHOLD: 4,
  CREW_SALARY_PER_ISLAND: 1,
  // Supply cost per day of sea travel
  SUPPLY_PER_TRAVEL_DAY: 3,
  // Supply cost per active trade route per day
  SUPPLY_PER_TRADE_ROUTE: 1,
  // Cost to dispatch a crew member on a mission
  DISPATCH_COST: 15,
  // Starting resources
  STARTING_SOVEREIGNS: 50,
  STARTING_SUPPLIES: 30,
  STARTING_MATERIALS: 10,
  STARTING_INTELLIGENCE: 5,
  // Shop price multipliers
  SUPPLY_BUY_PRICE: 3,
  SUPPLY_SELL_PRICE: 1,
  MATERIAL_BUY_PRICE: 5,
  MATERIAL_SELL_PRICE: 2,
  // Trader crew bonus (% of daily territory sovereignty income)
  TRADER_INCOME_BONUS: 0.05,
  // Lookout daily intel bonus
  LOOKOUT_INTEL_BONUS: 2,
  // Diplomat daily morale bonus to ALL controlled territories (buffed: story-focused pacing, diplomacy matters)
  DIPLOMAT_MORALE_BONUS: 4,
  // Diplomat shop discount (%) on controlled islands
  DIPLOMAT_SHOP_DISCOUNT: 10,
  // Trainer daily XP bonus to lowest dominion
  TRAINER_XP_BONUS: 1,
  // Navigator travel day reduction
  NAVIGATOR_TRAVEL_REDUCTION: 1,
  // Administration cost per controlled island per day (sovereigns) (reduced: empire should grow, not bankrupt)
  ADMIN_COST_PER_ISLAND: 3,
  // Fleet maintenance cost per active trade route per day (sovereigns)
  FLEET_MAINT_PER_ROUTE: 3,
  // Upgrade maintenance: fraction of build cost charged per 10 days (sovereigns)
  UPGRADE_MAINT_RATE: 0.02,
} as const;

// --- TERRITORY ---
export const TERRITORY = {
  // Base supply upkeep per controlled island
  // Halved to 1: story-focused design, territory shouldn't starve the player
  BASE_ISLAND_UPKEEP: 1,
  // Quadratic scaling factor for multi-island upkeep (reduced: 7 islands = 12.25 not 19.6)
  UPKEEP_SCALING_FACTOR: 0.25,
  // Morale thresholds
  MORALE_MAX: 100,
  MORALE_HIGH: 80,
  MORALE_STABLE: 60,
  MORALE_LOW: 40,
  MORALE_CRITICAL: 20,
  MORALE_REBELLION: 0,
  // Daily morale drift (toward 50 when stable)
  MORALE_DRIFT_RATE: 1,
  // Morale penalty when supplies are in deficit (reduced: deficit warns, doesn't cascade)
  DEFICIT_MORALE_PENALTY: 2,
  // Base defense rating for new territory
  DEFAULT_DEFENSE_RATING: 20,
  // Reputation cap
  REPUTATION_MAX: 100,
  // --- Supply Crisis ---
  // Island threshold for supply strain (halved: crises are rare speed bumps, not roadblocks)
  SUPPLY_STRAIN_ISLANDS: 5,
  SUPPLY_STRAIN_CHANCE: 0.05,
  // Island threshold for logistics crisis (halved: story pacing over survival pressure)
  LOGISTICS_CRISIS_ISLANDS: 8,
  LOGISTICS_CRISIS_CHANCE: 0.10,
  // Morale penalty range from supply crisis (reduced: crises sting, don't cripple)
  CRISIS_MORALE_MIN: 2,
  CRISIS_MORALE_MAX: 5,
  // Supply income reduction during crisis
  CRISIS_SUPPLY_INCOME_PENALTY: 0.30,
  // Quartermaster role reduces crisis chance by this flat amount
  QUARTERMASTER_CRISIS_REDUCTION: 0.08,
  // --- Morale Processing ---
  // Base daily morale decay (story-focused: ~60 days before rebellion on neglected territory)
  // Players should have time to engage with story content before territory pressure mounts
  MORALE_DECAY_BASE: 0.8,
  // Additional morale decay per controlled territory (reduced: empire strain is gentle)
  // At 3 territories: -0.8 base - 0.45 = ~1.25/day. At 8: -0.8 - 1.2 = 2.0/day (capped).
  MORALE_DECAY_PER_TERRITORY: 0.15,
  // Maximum empire strain penalty (capped low: expanding shouldn't feel punishing)
  MORALE_DECAY_EMPIRE_STRAIN_CAP: 1.5,
  // Morale scaling thresholds for income/combat bonuses
  MORALE_SCALING_FULL_THRESHOLD: 30,   // >= this: 100% output
  MORALE_SCALING_HALF_THRESHOLD: 15,   // >= this: 50% output; below: 0%
  MORALE_SCALING_HALF_MULTIPLIER: 0.5,
  // At-risk threshold for warnings
  MORALE_AT_RISK_THRESHOLD: 20,
  // Threat-based morale drain divisor (-1 morale per this much threat)
  THREAT_MORALE_DRAIN_DIVISOR: 25,
  // Reputation morale boost divisor (+1 morale per this much rep)
  REPUTATION_MORALE_DIVISOR: 25,
  // Infamy morale penalty (kicks in above threshold, -1 per divisor)
  INFAMY_MORALE_PENALTY_THRESHOLD: 20,
  INFAMY_MORALE_PENALTY_DIVISOR: 25,
  // Player presence morale boost (buffed: visiting islands is the primary morale tool)
  PLAYER_PRESENCE_MORALE_BOOST: 10,
  // Upgrades morale bonus (capped)
  UPGRADE_MORALE_BONUS_CAP: 3,
  // Under attack morale penalty (reduced: raids hurt, but don't cascade into rebellion)
  UNDER_ATTACK_MORALE_PENALTY: 5,
  // Emergency recovery: threshold and multiplier for positive drift when critically low
  // Wider window + stronger bounce: player who notices and acts should be rewarded
  CRITICAL_RECOVERY_THRESHOLD: 20,
  CRITICAL_RECOVERY_MULTIPLIER: 2.5,
  // Raid defended: minor morale cost on successful defense
  RAID_DEFENDED_MORALE_LOSS: 5,
  // --- Territory Upkeep Scaling ---
  // Upkeep multiplier tiers by island count
  UPKEEP_TIER_1_MAX: 3,   // 1-3 islands: 1.0x (base)
  UPKEEP_TIER_2_MAX: 6,   // 4-6 islands: 1.5x
  UPKEEP_TIER_3_MAX: 9,   // 7-9 islands: 2.0x
  // 10+: 3.0x
  UPKEEP_MULTIPLIER_TIER_1: 1.0,
  // Softened from 1.5/2.0/3.0 to 1.25/1.6/2.2: prevents mid-game supply death spiral
  UPKEEP_MULTIPLIER_TIER_2: 1.25,
  UPKEEP_MULTIPLIER_TIER_3: 1.6,
  UPKEEP_MULTIPLIER_TIER_4: 2.2,
} as const;

// --- CREW ---
export const CREW = {
  // Loyalty range
  LOYALTY_MIN: 0,
  LOYALTY_MAX: 100,
  // Loyalty thresholds for mood changes
  LOYALTY_DEVOTED: 80,
  LOYALTY_CONTENT: 60,
  LOYALTY_NEUTRAL: 40,
  LOYALTY_DISGRUNTLED: 20,
  // Below this = mutinous
  LOYALTY_MUTINOUS: 20,
  // Daily desertion chance when mutinous (halved: losing crew should be rare, not routine)
  DESERTION_CHANCE: 0.08,
  // Loyalty bonus threshold for crew assist effectiveness
  ASSIST_LOYALTY_MIN: 60,
  ASSIST_LOYALTY_MAX: 100,
  // Crew assist effectiveness range (60% at min loyalty, 100% at max)
  ASSIST_EFFECTIVENESS_MIN: 0.6,
  ASSIST_EFFECTIVENESS_MAX: 1.0,
  // Injury recovery (days)
  INJURY_DURATION_MIN: 2,
  INJURY_DURATION_MAX: 5,
  // Backstory reveal threshold (loyalty needed)
  BACKSTORY_LOYALTY_THRESHOLD: 50,
  // --- Loyalty Breakpoints ---
  // Below this loyalty, crew refuse dangerous assignments
  LOYALTY_REFUSE_THRESHOLD: 20,
  // Below this loyalty, crew risk leaving daily
  LOYALTY_DESERT_RISK_THRESHOLD: 10,
  // Daily chance to warn about desertion when loyalty < 10
  LOYALTY_DESERT_RISK_CHANCE: 0.15,
  // Above this loyalty, crew get enhanced job performance (1.5x)
  LOYALTY_ELITE_THRESHOLD: 80,
  // Elite loyalty job bonus multiplier
  LOYALTY_ELITE_MULTIPLIER: 1.5,
} as const;

// --- COMBAT ---
export const COMBAT = {
  // Base critical hit chance (%)
  CRIT_CHANCE_BASE: 5,
  // Crit chance gained per sight level
  CRIT_PER_SIGHT_LEVEL: 0.3,
  // Crit damage multiplier
  CRIT_DAMAGE_MULTIPLIER: 1.5,
  // Defense formula: flat portion (60%) + percentage portion (40%)
  DEFENSE_FLAT_RATIO: 0.6,
  DEFENSE_PERCENT_CAP: 0.4,
  // Defense divisor (defense / this determines % reduction, capped by DEFENSE_PERCENT_CAP)
  DEFENSE_DIVISOR: 200,
  // Defense cap (maximum % damage reduction, display)
  DEFENSE_CAP: 75,
  // Damage variance range (0.85 to 1.15 = +-15%)
  DAMAGE_VARIANCE_MIN: 0.85,
  DAMAGE_VARIANCE_RANGE: 0.3,
  // Attack stat contribution to base damage
  ATTACK_STAT_MULTIPLIER: 0.65,
  // Dominion scaling (Iron/King damage bonus per level)
  DOMINION_DAMAGE_SCALING: 0.3,
  // Resonance flat bonus
  RESONANCE_FLAT_BONUS: 8,
  // Attack buff stack cap
  ATTACK_BUFF_CAP: 30,
  // Defense buff stack cap
  DEFENSE_BUFF_CAP: 25,
  // Sight accuracy bonus per level
  SIGHT_ACCURACY_BONUS: 0.2,
  // Sight evasion bonus per level (defender)
  SIGHT_EVASION_BONUS: 0.15,
  // Stun accuracy bonus
  STUN_ACCURACY_BONUS: 20,
  // Max accuracy cap
  ACCURACY_CAP: 95,
  // Expose + Pressure Point damage multiplier (was 2.0, reduced to prevent degenerate stacking)
  EXPOSE_PRESSURE_MULTIPLIER: 1.6,
  // King meter: points per action
  KING_METER_PER_ATTACK: 8,
  KING_METER_PER_DOMINION: 12,
  KING_METER_PER_DEFEND: 4,
  KING_METER_PER_KILL: 15,
  // King burst threshold
  KING_BURST_THRESHOLD: 100,
  // King's Pressure: AoE stun chance at full meter (was 70, reduced to keep boss fights tense)
  KING_PRESSURE_STUN_CHANCE: 55,
  // Stamina regen per round (base)
  STAMINA_REGEN_BASE: 5,
  // Dragon fruit bonus stamina regen
  DRAGON_STAMINA_BONUS: 3,
  // --- Karyudon stat formulas ---
  KARYUDON_BASE_HP: 270,
  KARYUDON_HP_PER_IRON: 2.0,
  KARYUDON_BASE_STAMINA: 80,
  KARYUDON_STAMINA_PER_IRON: 0.5,
  KARYUDON_BASE_ATTACK: 28,
  KARYUDON_BASE_DEFENSE: 16,
  KARYUDON_BASE_SPEED: 25,
  // Territory bonus diminishing factor in combat
  TERRITORY_BONUS_ATK_FACTOR: 0.6,
  TERRITORY_BONUS_DEF_FACTOR: 0.6,
  TERRITORY_BONUS_HP_FACTOR: 0.5,
  // Crew assist mood scaling
  CREW_MOOD_MUTINOUS: 0.0,
  CREW_MOOD_DISGRUNTLED: 0.6,
  CREW_MOOD_UNEASY: 0.85,
  // God Fruit seawater weakness: stat penalties when fighting at sea
  SEAWATER_DEFENSE_PENALTY: 8,
  SEAWATER_SPEED_PENALTY: 4,
  SEAWATER_CREW_ASSIST_MULTIPLIER: 0.7, // Orren's assist damage reduced at sea
  // Stun diminishing returns
  STUN_DIMINISH_THRESHOLD: 1,           // After this many stuns, duration starts dropping
  STUN_BOSS_CHANCE_REDUCTION: 0.5,      // Bosses/commanders: stun chance multiplied by this
  STUN_IMMUNE_AFTER: 3,                 // After this many stuns in one combat, target becomes immune
  // Turn order animation timing (ms)
  TURN_ENEMY_DELAY: 900,
  TURN_ADVANCE_DELAY: 700,
  TURN_POST_PLAYER_DELAY: 800,
  TURN_POST_SPECIAL_DELAY: 1000,
} as const;

// --- THREAT (WARDENSEA) ---
export const THREAT = {
  // Threat level range
  LEVEL_MIN: 0,
  LEVEL_MAX: 100,
  // Bounty factor: scales bounty into threat contribution
  BOUNTY_FACTOR_DIVISOR: 10_000_000,
  BOUNTY_FACTOR_MULTIPLIER: 15,
  BOUNTY_FACTOR_CAP: 20,
  // Territory factor: threat per controlled island (reduced: 7 islands = 21, not 35)
  TERRITORY_THREAT_PER_ISLAND: 3,
  // Infamy factor
  INFAMY_THREAT_MULTIPLIER: 0.4,
  // Threat decay per day (faster de-escalation: Wardensea cools down between events)
  DAILY_DECAY: 5,
  // Alert thresholds
  ALERT_PATROL: 20,
  ALERT_HEIGHTENED: 40,
  ALERT_HUNTING: 60,
  ALERT_BLOCKADE: 80,
  ALERT_FLEET: 95,
  // Raid mechanics
  RAID_MIN_GAP_DAYS: 5,
  // Reduced from 0.010: at threat 50, 0.002 × 50 = 10% daily (~1 raid per 10 days)
  RAID_CHANCE_PER_LEVEL: 0.002,
  RAID_STRENGTH_MULTIPLIER: 0.6,
  RAID_WARNING_DAYS_MIN: 2,
  RAID_WARNING_DAYS_VARIANCE: 2,
  // Raid morale damage (reduced: raids sting, don't cascade into collapse)
  RAID_MORALE_DAMAGE_BASE: 8,
  RAID_MORALE_DAMAGE_VARIANCE: 4,
  // Blockade mechanics
  // Reduced from 0.005: at threat 50, 0.0013 × 50 = 6.5% daily (~1 per 15 days)
  BLOCKADE_CHANCE_PER_LEVEL: 0.0013,
  BLOCKADE_DURATION_MIN: 2,
  BLOCKADE_DURATION_VARIANCE: 3,
  // Spy operations
  // Reduced from 0.003: at threat 50, 0.001 × 50 = 5% daily (~1 per 20 days)
  SPY_CHANCE_PER_LEVEL: 0.001,
  // Bounty hunter
  // Reduced from 0.003: at threat 50, 0.0013 × 50 = 6.5% daily (~1 per 15 days)
  HUNTER_CHANCE_PER_LEVEL: 0.0013,
  HUNTER_BASE_STRENGTH: 30,
  // Hunter combat encounter thresholds
  HUNTER_ELITE_THRESHOLD: 60,
  HUNTER_MEDIUM_THRESHOLD: 40,
  // Raid defense
  DEFENSE_ROLL_VARIANCE: 20,
  // Counter-espionage (intelligence sink)
  COUNTER_ESPIONAGE_INTEL_COST: 15,     // Intelligence spent per counter-espionage action
  COUNTER_ESPIONAGE_THREAT_REDUCTION: 10, // Threat level reduced per action (buffed: player agency)
  COUNTER_ESPIONAGE_SPY_CLEAR_CHANCE: 0.6, // 60% chance to clear one spy op
} as const;

// --- BOUNTY ---
export const BOUNTY = {
  // Starting bounty
  STARTING_BOUNTY: 0,
  // Bounty tiers (for Wardensea response scaling)
  TIER_MINOR: 1_000_000,
  TIER_NOTABLE: 10_000_000,
  TIER_DANGEROUS: 50_000_000,
  TIER_CRITICAL: 200_000_000,
  TIER_CONQUEROR: 3_000_000_000,
  // Bounty increase from island conquest (base)
  CONQUEST_BOUNTY_BASE: 5_000_000,
} as const;

// --- DOMINION ---
export const DOMINION = {
  // XP needed per level (linear)
  XP_PER_LEVEL: 10,
  // Tier boundaries (level thresholds)
  TIER_FLICKER_MAX: 20,
  TIER_TEMPERED_MAX: 50,
  TIER_FORGED_MAX: 75,
  TIER_PRIME_MAX: 95,
  // Above 95 = conqueror tier
  // Training XP per session
  TRAINING_XP_BASE: 3,
  TRAINING_XP_COMBAT: 5,
} as const;

// --- TIME ---
export const TIME = {
  // Maximum days before endgame pressure
  ENDGAME_DAY_THRESHOLD: 80,
  // Scene trigger delays (ms)
  SCENE_TRIGGER_DELAY: 1500,
  COMBAT_TRIGGER_DELAY: 500,
  // Kirin arrival conditions
  KIRIN_MIN_ISLANDS: 6,
  KIRIN_MIN_DAY: 40,
  KIRIN_CONFRONTATION_DELAY: 3,
  // Prime Khoss arrival conditions
  PRIME_MIN_ISLANDS: 8,
  PRIME_MIN_DAY: 60,
} as const;

// --- CONQUEST ---
export const CONQUEST = {
  // Approach-specific starting morale and defense
  FORCE_MORALE: 35,
  FORCE_DEFENSE: 40,
  FORCE_INFAMY: 5,
  NEGOTIATION_MORALE: 80,
  NEGOTIATION_DEFENSE: 10,
  NEGOTIATION_REPUTATION: 8,
  NEGOTIATION_INTEL: 3,
  ECONOMIC_MORALE: 55,
  ECONOMIC_DEFENSE: 15,
  ECONOMIC_SOVEREIGNS: 100,
  ECONOMIC_MATERIALS: 20,
  SUBVERSION_MORALE: 45,
  SUBVERSION_DEFENSE: 25,
  SUBVERSION_INTEL: 10,
  SUBVERSION_INFAMY: 3,
  DEFAULT_MORALE: 60,
  DEFAULT_DEFENSE: 20,
  // Reputation/Infamy modifiers on conquest outcomes
  REP_MORALE_DIVISOR: 7,         // morale += floor(rep / 7)
  INFAMY_FORCE_THRESHOLD: 20,    // infamy must exceed this for force bonus
  INFAMY_FORCE_DIVISOR: 10,      // morale += floor((inf - 20) / 10) for force
  INFAMY_PENALTY_THRESHOLD: 30,  // infamy must exceed this for non-force penalty
  INFAMY_PENALTY_DIVISOR: 15,    // morale -= floor((inf - 30) / 15) for non-force
  INFAMY_MORALE_FLOOR: 20,       // minimum morale after infamy penalty
  // Reputation bounty reduction
  REP_BOUNTY_THRESHOLD: 30,      // reputation must exceed this
  REP_BOUNTY_MAX_EFFECT: 50,     // max reputation points beyond threshold that count
  REP_BOUNTY_MULTIPLIER: 0.4,    // max % bounty reduction from reputation
} as const;

// --- DEFEAT CONSEQUENCES ---
export const DEFEAT = {
  // Resource loss percentages (halved: defeat is a narrative beat, not a progress reset)
  SUPPLY_LOSS_PERCENT: 0.15,
  SUPPLY_LOSS_FLAT: 5,
  SOVEREIGN_LOSS_PERCENT: 0.10,
  SOVEREIGN_LOSS_FLAT: 20,
  // Crew impacts (softened further: defeat is a story beat, not a mutiny trigger)
  LOYALTY_HIT: -3,
  INJURY_CHANCE: 0.25,
  INJURED_LOYALTY_HIT: -5,
  HEAL_DAYS_WITH_MEDBAY: 2,
  HEAL_DAYS_WITHOUT_MEDBAY: 3,
  // Reputation/Infamy
  REPUTATION_LOSS: 3,
  INFAMY_GAIN_MIN_ROUNDS: 3,     // combat must last > this many rounds
  INFAMY_GAIN: 1,
  // Victory injury chances by enemy tier
  VICTORY_INJURY_BOSS: 0.35,
  VICTORY_INJURY_PRIME: 0.30,
  VICTORY_INJURY_ELITE: 0.20,
} as const;

// --- DAY ACTIONS ---
export const DAY_ACTIONS = {
  // Supply costs
  TRAIN_SUPPLY_COST: 2,
  EXPLORE_SUPPLY_COST: 1,
  // Rest bonus (buffed: rest days are the primary crew recovery tool, should feel impactful)
  REST_LOYALTY_BONUS: 12,
  // Training (fallback when no event fires)
  TRAIN_XP_FALLBACK: 8,
  TRAIN_TRAINER_BONUS: 2,
  // Explore local rewards (fallback when no event fires)
  EXPLORE_MATERIAL_CHANCE: 0.35,
  EXPLORE_MATERIAL_MIN: 3,
  EXPLORE_MATERIAL_RANGE: 5,     // found = MIN + random(RANGE)
  EXPLORE_INTEL_CHANCE: 0.65,    // cumulative
  EXPLORE_INTEL_MIN: 2,
  EXPLORE_INTEL_RANGE: 4,
  EXPLORE_SOVEREIGN_CHANCE: 0.85, // cumulative
  EXPLORE_SOVEREIGN_MIN: 5,
  EXPLORE_SOVEREIGN_RANGE: 10,
} as const;

// --- TRADE ROUTES ---
export const TRADE = {
  // Establishment costs
  ROUTE_SOV_COST: 200,
  ROUTE_SOV_MIN: 50,
  ROUTE_MAT_COST: 30,
  ROUTE_MAT_MIN: 10,
  ROUTE_DISCOUNT_CAP: 50,        // max % discount from territory bonuses
  // Income
  ROUTE_DAILY_INCOME: 3,
  // Travel
  TRAVEL_DISCOUNT_CAP: 60,       // max % discount from territory bonuses
} as const;

// --- SHIP ---
export const SHIP = {
  // Repair cost (materials per HP)
  REPAIR_COST_PER_HP: 0.5,
  // Repair cost (sovereigns per HP)
  REPAIR_SOV_PER_HP: 2,
} as const;

// --- CREW BONUS ---
export const CREW_BONUS = {
  /** Sovereign cost to improve one crew member's mood */
  GIFT_COST: 75,
  /** Loyalty boost from gift (buffed: investing in crew relationships pays off) */
  GIFT_LOYALTY_BOOST: 25,
  /** Cooldown in days before same crew member can receive another gift (reduced: more frequent bonding) */
  GIFT_COOLDOWN_DAYS: 3,
} as const;

// --- TERRITORY FORTIFICATION ---
export const FORTIFICATION = {
  /** Sovereign cost to fortify a territory */
  COST: 100,
  /** Defense bonus granted */
  DEFENSE_BOOST: 15,
  /** Duration in days */
  DURATION_DAYS: 7,
} as const;

// --- DAY PLANNER RESTRICTIONS ---
export const DAY_PLANNER = {
  // Ship hull % below which exploration/trade are locked
  SHIP_DAMAGE_LOCKOUT_THRESHOLD: 0.4,
  // Number of disgruntled/mutinous crew before crew crisis triggers
  CREW_CRISIS_DISGRUNTLED_COUNT: 3,
  // Number of territories at <15 morale to show territory revolt warning
  TERRITORY_REVOLT_THRESHOLD: 2,
  // Supply threshold below which training is locked
  SUPPLY_CRISIS_LOCKOUT: 5,
} as const;

// --- MISC GAMEPLAY ---
export const MISC = {
  // Starvation game over threshold (consecutive days at 0 supplies + 0 sovereigns)
  STARVATION_DAYS: 3,
  // Scene chain limit (prevents infinite loops)
  SCENE_CHAIN_LIMIT: 10,
  // Territory role change cooldown (days)
  ROLE_CHANGE_COOLDOWN: 5,
  // Civil unrest warning threshold (morale)
  CIVIL_UNREST_THRESHOLD: 15,
  // Crew dispatch duration (days)
  DISPATCH_DURATION: 3,
  // Crew dispatch morale per day
  DISPATCH_MORALE_PER_DAY: 4,
} as const;

// --- STORY LIMITS ---
export const LIMITS = {
  // Max entries in storyHistory before oldest are trimmed
  STORY_HISTORY_MAX: 200,
  // Max notifications stored in memory
  NOTIFICATIONS_MAX: 50,
  // Max save notification truncation
  SAVE_NOTIFICATIONS_MAX: 20,
} as const;
