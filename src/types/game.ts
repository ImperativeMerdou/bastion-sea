// =============================================
// GODTIDE: BASTION SEA - Type Definitions
// =============================================

// --- Core Enums ---

export type GamePanel = 'map' | 'story' | 'management' | 'combat';
export type GamePhase = 'prologue' | 'act1' | 'act2' | 'act3' | 'endgame';
export type DominionTier = 'flicker' | 'tempered' | 'forged' | 'prime' | 'conqueror';
export type DominionExpression = 'iron' | 'sight' | 'king';
export type KorvaanStage = 'none' | 'callus' | 'ironset' | 'fleshweave' | 'nerveburn' | 'reforged';

export type IslandStatus = 'hidden' | 'discovered' | 'neutral' | 'hostile' | 'allied' | 'controlled' | 'contested';
export type ConquestApproach = 'force' | 'negotiation' | 'economic' | 'subversion';
export type CrewMood = 'loyal' | 'content' | 'uneasy' | 'disgruntled' | 'mutinous';
export type DayAction = 'rest' | 'train' | 'trade_run' | 'explore_local' | 'manage_territory' | 'defend_territory';
export type WardenseaAlert = 'low' | 'moderate' | 'high' | 'critical';
export type IslandRole = 'outpost' | 'trade_hub' | 'intel_center' | 'military' | 'unassigned';
export type CrewAssignment = 'navigator' | 'lookout' | 'trader' | 'trainer' | 'diplomat' | 'quartermaster' | 'unassigned';

// --- Character Types ---

export interface DominionStat {
  tier: DominionTier;
  level: number;         // 0-100 within tier
  xp?: number;           // partial XP toward next level (defaults 0)
}

export interface DominionProfile {
  iron: DominionStat;
  sight: DominionStat;
  king: DominionStat;
}

export interface GodFruit {
  name: string;
  type: 'element' | 'beast' | 'law' | 'mythical_beast';
  description: string;
  eaten: boolean;
  awakened: boolean;
}

export interface Character {
  id: string;
  name: string;
  epithet?: string;
  race: string;
  age: number;
  bounty: number;
  dominion: DominionProfile;
  korvaan: KorvaanStage;
  godFruit?: GodFruit;
  weapon?: string;
  portrait?: string;     // image path
  description: string;
  personality: string;
  flaw: string;
  dream: string;
}

export interface CrewMember extends Character {
  role: string;
  loyalty: number;       // 0-100
  mood: CrewMood;
  alive: boolean;
  recruited: boolean;
  backstoryRevealed: number; // 0-100, how much the player knows
  assignment?: CrewAssignment;
  injured: boolean;
  injuredUntilDay: number;  // day when injury heals (0 = not injured)
}

export interface MC extends Character {
  dragonFruitEaten: boolean;
  dragonFruitPossessed: boolean;
  reputation: number;    // 0-100, Bastion Sea fame
  infamy: number;        // 0-100, how feared
  territory: string[];   // island IDs controlled
}

// --- Crew Identity ---

export type CrewFlagDesign = 'crossed_horns' | 'dragon_anchor' | 'spike_wave' | 'custom';

export interface CrewIdentity {
  name: string;                  // crew name (e.g. "The Godtide")
  flagDesign: CrewFlagDesign;    // chosen flag style
  named: boolean;                // has the player chosen a name yet?
}

// --- Rival System ---

export interface RivalState {
  id: string;                    // rival character ID
  encountered: boolean;          // has the player met them
  encounterCount: number;        // times crossed paths
  respect: number;               // -100 to 100 (hatred to grudging respect)
  lastSeenIsland: string | null; // last known location
  defeated: boolean;             // has the player beaten them in combat
  allied: boolean;               // has the player formed a truce/alliance
}

// --- Island Villain ---

export interface IslandVillain {
  id: string;
  name: string;
  epithet: string;
  race: string;
  age: number;
  islandId: string;             // which island they control/inhabit
  description: string;
  personality: string;
  philosophy: string;           // their core belief (what makes them memorable)
  dominion: DominionProfile;
  godFruit?: GodFruit;
  weapon?: string;
  portrait?: string;
  encounterId: string;          // combat encounter ID for their boss fight
  defeated: boolean;
  fightMechanic: string;        // description of unique combat gimmick
  crewConnection?: string;      // crew member who has personal history with them
}

// --- Island & Map Types ---

export interface IslandRoute {
  targetId: string;
  travelDays: number;
  dangerLevel: 'safe' | 'moderate' | 'dangerous' | 'deadly';
  description: string;
}

export interface IslandNPC {
  id: string;
  name: string;
  race: string;
  role: string;
  disposition: number;   // -100 to 100 (hostile to allied)
  portrait?: string;
  description: string;
}

export interface Island {
  id: string;
  name: string;
  status: IslandStatus;
  controller: string;    // faction/character name
  difficulty: 'low' | 'medium' | 'high' | 'very_high' | 'special';
  zone: 'northern' | 'central' | 'southern';
  position: { x: number; y: number }; // map coordinates (0-100 percentage)
  population: number;
  description: string;
  routes: IslandRoute[];
  npcs: IslandNPC[];
  resources: string[];
  conquered: boolean;
  conquestApproach?: ConquestApproach;
  events: string[];      // active event IDs
}

// --- Story / Narrative Types ---

export interface StoryChoice {
  id: string;
  text: string;
  consequence: string;   // description for player
  requirements?: {
    stat?: string;
    minValue?: number;
    item?: string;
    crewMember?: string;
  };
  available: boolean;
  effects: StoryEffect[];
}

export interface StoryEffect {
  type: 'bounty' | 'reputation' | 'infamy' | 'loyalty' | 'resource' | 'flag' | 'flag_increment' | 'unlock' | 'scene' | 'recruit' | 'notification' | 'phase' | 'panel' | 'conquer' | 'combat' | 'dominion' | 'crew_identity';
  target?: string;
  value: number | string | boolean;
  notification?: { type: GameNotification['type']; title: string; message: string };
}

export type StingerId =
  | 'title_intro'
  | 'conquest_victory'
  | 'boss_intro'
  | 'story_revelation'
  | 'act_transition'
  | 'crew_join'
  | 'character_death'
  | 'grimoire_ping';

export interface StoryBeat {
  id: string;
  title?: string;
  paragraphs: string[];
  speaker?: string;      // character ID for dialogue
  speakerName?: string;
  characters?: string[]; // characters present in this beat (for dialogue cards)
  choices?: StoryChoice[];
  autoAdvance?: boolean;
  delay?: number;        // ms before auto-advance
  background?: string;   // background image
  music?: string;        // audio track
  effect?: string;       // screen effect (shake, flash, heavy_shake, flash_red, explosion)
  sfx?: string;          // SFX to play when this beat starts (SfxId from audio.ts)
  expression?: string;   // expression for the speaker portrait (e.g., 'angry', 'grim')
  characterExpressions?: Record<string, string>; // per-character expression overrides
  stinger?: StingerId;   // optional one-shot musical stinger for this beat
  requireFlag?: string;  // skip this beat unless this flag is truthy
}

export interface StoryScene {
  id: string;
  title: string;
  beats: StoryBeat[];
  currentBeat: number;
  characters?: string[]; // default characters present in this scene (for dialogue cards)
  nextSceneId?: string; // scene to auto-load when this one ends
  onComplete?: StoryEffect[]; // effects to apply when scene ends
  lockNavigation?: boolean; // when true, player cannot switch panels until scene ends
}

// --- Resource & Management Types ---

export interface Resources {
  sovereigns: number;      // gold
  supplies: number;        // food, water, general
  materials: number;       // building/repair
  intelligence: number;    // intel points for operations
}

// --- Global Game Flags ---

export interface GameFlags {
  [key: string]: boolean | number | string;
}

// --- Bounty Poster ---

export interface BountyPoster {
  name: string;
  epithet: string;
  race: string;
  bounty: number;
  portrait?: string;
  crimes: string[];
}

// --- Notification / Event ---

export interface GameNotification {
  id: string;
  type: 'bounty' | 'grimoire' | 'crew' | 'wardensea' | 'conqueror' | 'story';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  icon?: string;
}

export interface DailyReportEntry {
  category: 'economy' | 'territory' | 'crew' | 'event' | 'broadcast';
  icon: string;
  text: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface TradeRoute {
  id: string;
  fromIsland: string;
  toIsland: string;
  dailyIncome: number;
  daysActive: number;
}

// --- Equipment System ---

export type EquipmentSlot = 'weapon' | 'armor' | 'accessory';

export interface Equipment {
  id: string;
  name: string;
  slot: EquipmentSlot;
  description: string;
  icon: string;
  statBonus: {
    attack?: number;
    defense?: number;
    hp?: number;
    speed?: number;
    staminaRegen?: number;
  };
  specialEffect?: string;   // game flag key for special behavior
  source: string;            // where it came from (shop, boss, quest, starting)
}

// --- Ship System ---

export interface ShipUpgrade {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'hull' | 'sail' | 'weapon' | 'utility';
  effects: {
    hull?: number;          // bonus max hull points
    speed?: number;         // travel day reduction (negative = faster)
    cargo?: number;         // bonus cargo capacity
    combatDefense?: number; // defense bonus in sea combat
    combatAttack?: number;  // attack bonus in sea combat
  };
  cost: Partial<Resources>;
  requiresIsland?: string;  // must be at this island to install
  minDay?: number;
  prerequisite?: string;    // upgrade ID that must be installed first
}

export interface Ship {
  name: string;
  hull: number;
  maxHull: number;
  speed: number;            // base travel modifier (0 = normal, negative = faster)
  cargo: number;
  maxCargo: number;
  upgrades: string[];       // installed upgrade IDs
}

// --- Threat System ---

export interface ThreatState {
  level: number;                    // 0-100, derived from bounty + territory + infamy
  wardenseaAlert: WardenseaAlert;
  nextRaidDay: number;              // earliest day a new raid can trigger
  raidTarget: string | null;        // island ID being targeted
  raidDay: number | null;           // day when raid executes (null = no active raid)
  raidStrength: number;             // 0-100, how strong the incoming raid is
  blockadedRoutes: string[];        // trade route IDs currently disrupted
  blockadeEndDays: Record<string, number>; // routeId -> day blockade lifts
  spyOperations: number;            // active spy ops draining intel
  lastRaidDay: number;              // day of last raid (for min gap enforcement)
}

export type ThreatEvent =
  | { type: 'raid'; target: string; strength: number; day: number }
  | { type: 'blockade'; routeId: string; endDay: number }
  | { type: 'spy'; effect: 'intel_drain' | 'morale_hit' | 'sabotage' }
  | { type: 'bounty_hunter'; strength: number }
