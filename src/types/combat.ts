// =============================================
// GODTIDE: BASTION SEA - Combat Types
// =============================================
// Hybrid narrative combat - cinematic action rounds
// where Karyudon fights like a walking siege weapon.

import type { GameNotification } from './game';

// --- Combat Action Types ---

export type ActionCategory = 'strike' | 'dominion' | 'defend' | 'crew' | 'special';
export type TargetType = 'single' | 'all' | 'self' | 'ally';
export type DamageType = 'physical' | 'dominion_iron' | 'dominion_sight' | 'dominion_king' | 'resonance';

export interface CombatAction {
  id: string;
  name: string;
  description: string;              // Shown to player
  category: ActionCategory;
  targetType: TargetType;
  damage: number;                    // Base damage (0 for non-damage actions)
  damageType: DamageType;
  accuracy: number;                  // 0-100, chance to land
  cooldown: number;                  // Rounds before reusable (0 = always available)
  currentCooldown: number;           // Tracks current cooldown state
  staminaCost: number;               // Stamina consumed
  effects?: ActionEffect[];          // Additional effects on hit
  animation: CombatAnimation;        // Visual feedback type
  flavorText: string;                // Cinematic hit description
  missText: string;                  // What happens on miss
  unlockCondition?: {                // Requirements to use
    stat?: string;
    minValue?: number;
    flag?: string;
    secondaryStat?: string;          // Optional second requirement (e.g., king_tier for Sight+King combos)
    secondaryMinValue?: number;
    requireDragonFruit?: boolean;    // Requires God Fruit consumed
  };
}

export interface ActionEffect {
  type: 'stun' | 'bleed' | 'weaken' | 'buff_defense' | 'buff_attack' |
        'heal' | 'heal_hp' | 'dominion_surge' | 'intimidate' | 'expose' | 'shield' |
        'dodge' | 'buff_accuracy' | 'crew_boost';
  value: number;
  duration: number;                  // Rounds
  chance: number;                    // 0-100, probability of applying
  description: string;
}

export type CombatAnimation =
  | 'slash'
  | 'heavy_smash'
  | 'iron_pulse'
  | 'king_pressure'
  | 'sight_flash'
  | 'counter'
  | 'block'
  | 'crew_assist'
  | 'thunder_strike'
  | 'screen_shake'
  | 'flash_white'
  | 'flash_red';

// --- Combatant Types ---

export interface StatusEffect {
  id: string;
  name: string;
  type: ActionEffect['type'];
  value: number;
  remainingRounds: number;
  icon: string;
}

export interface Combatant {
  id: string;
  name: string;
  title?: string;
  portrait?: string;
  hp: number;
  maxHp: number;
  stamina: number;
  maxStamina: number;
  attack: number;                    // Base attack modifier
  defense: number;                   // Damage reduction
  speed: number;                     // Turn order priority
  dominion: {
    iron: number;                    // 0-100 effective combat power
    sight: number;
    king: number;
  };
  actions: CombatAction[];
  statusEffects: StatusEffect[];
  isPlayer: boolean;
  isAlive: boolean;
  staminaRegen?: number;              // Passive stamina per round (default 1, dragon fruit adds more)
  stunCount?: number;                  // Times stunned this combat (for diminishing returns)
}

// --- Enemy Types ---

export type EnemyTier = 'fodder' | 'soldier' | 'elite' | 'commander' | 'prime' | 'boss';

// --- Boss Phase System ---

export interface BossPhase {
  id: string;
  name: string;                       // "SECOND WIND", "BERSERKER RAGE"
  hpThreshold: number;                // Triggers at this % HP remaining (e.g. 50 = 50%)
  narration: string[];                // Paragraphs shown during phase transition
  statChanges?: {
    attack?: number;                  // Add to current attack
    defense?: number;                 // Add to current defense
    speed?: number;                   // Add to current speed
  };
  newActions?: CombatAction[];        // Unlock new enemy moves
  heal?: number;                      // Heal this amount of HP on trigger
  aiPatternChange?: EnemyAIPattern;   // Switch AI behavior
  triggered: boolean;                 // Runtime: has this phase already fired?
}

export interface EnemyTemplate {
  id: string;
  name: string;
  title?: string;
  tier: EnemyTier;
  portrait?: string;
  hp: number;
  stamina: number;
  attack: number;
  defense: number;
  speed: number;
  dominion: { iron: number; sight: number; king: number };
  actions: CombatAction[];
  // AI behavior
  aiPattern: EnemyAIPattern;
  flavorIntro: string;               // Narrative intro when enemy appears
  flavorDefeat: string;              // Narrative text when defeated
  // Boss fight phases (optional, for named enemies)
  bossPhases?: BossPhase[];
}

export type EnemyAIPattern =
  | 'aggressive'    // Prioritizes highest-damage attacks
  | 'defensive'     // Blocks/defends when low HP
  | 'tactical'      // Targets weakest ally, uses debuffs
  | 'berserker'     // Increases damage as HP drops
  | 'support';      // Heals/buffs other enemies

// --- Combat Encounter ---

export interface CombatEncounter {
  id: string;
  title: string;                     // "DOCKSIDE BRAWL", "WARDENSEA BOARDING PARTY"
  subtitle?: string;                 // Optional flavor subtitle
  narrativeIntro: string[];          // Paragraphs before combat starts
  narrativeVictory: string[];        // Paragraphs after winning
  narrativeDefeat: string[];         // Paragraphs after losing
  background?: string;               // Scene background image
  music?: string;                    // Combat music track
  enemies: EnemyTemplate[];
  waves?: EnemyTemplate[][];         // Optional additional enemy waves
  rewards: CombatReward[];
  defeatConsequence: 'game_over' | 'story_continue' | 'retreat';
  // Crew members available for this fight
  availableCrew: string[];           // Crew IDs
  // Special conditions
  turnLimit?: number;                // Optional turn limit
  specialConditions?: string[];      // Narrative conditions ("The dock is collapsing")
  onVictoryEffects?: CombatEffect[];
  onDefeatEffects?: CombatEffect[];
  // Skip difficulty scaling for tutorial/scripted fights
  noScaling?: boolean;
}

export interface CombatReward {
  type: 'sovereigns' | 'supplies' | 'materials' | 'intelligence' |
        'reputation' | 'infamy' | 'bounty' | 'item' | 'flag';
  value: number | string | boolean;
  target?: string;
  label: string;                     // "120 Sovereigns", "+5 Reputation"
}

export interface CombatEffect {
  type: 'resource' | 'flag' | 'reputation' | 'infamy' | 'bounty' |
        'loyalty' | 'notification' | 'scene' | 'unlock' | 'recruit' |
        'phase' | 'panel' | 'conquer' | 'combat' | 'dominion';
  target?: string;
  value: number | string | boolean;
  notification?: { type: GameNotification['type']; title: string; message: string };
}

// --- Combat State (Runtime) ---

export type CombatPhase =
  | 'narrative_intro'    // Show intro text (typewriter)
  | 'player_turn'        // Player picks actions
  | 'enemy_turn'         // Enemies act (animated)
  | 'wave_transition'    // New wave of enemies arriving
  | 'victory'            // Win - show rewards + narrative
  | 'defeat';            // Loss - show consequence

export interface CombatLogEntry {
  round: number;
  actor: string;
  action: string;
  target: string;
  damage?: number;
  effects?: string[];
  isCritical?: boolean;
  text: string;                      // Narrative combat log line
  animation: CombatAnimation;
}

export interface CombatState {
  encounter: CombatEncounter;
  phase: CombatPhase;
  round: number;
  player: Combatant;
  enemies: Combatant[];
  crewAssists: CrewAssist[];         // Available crew actions this round
  selectedAction: CombatAction | null;
  selectedTarget: string | null;
  combatLog: CombatLogEntry[];
  currentWave: number;
  totalWaves: number;
  turnOrder: string[];               // Combatant IDs in speed order
  currentTurnIndex: number;
  animating: boolean;                // True during animation playback
  // King awakening tracking
  kingMeter: number;                 // 0-100, builds toward King burst
  kingBurstAvailable: boolean;
  // Anime combat tracking
  comboCount: number;                 // Consecutive hits without miss - drives combo display
  lastMoveName: string | null;        // For anime move name splash display
  // Boss phase tracking
  bossPhaseNarration: string[] | null; // Current boss phase narration to display
  bossPhaseTitle: string | null;       // Boss phase name (e.g. "SECOND WIND")
  triggeredBossPhases: string[];       // Phase IDs already triggered this combat

  // Crew combo cooldowns
  comboCooldowns: Record<string, number>;  // combo ID -> turns remaining
  // Equipment special effects active this combat
  equipmentEffects: string[];
  // God Fruit seawater weakness: true when fighting at sea (travel encounters)
  isAtSea?: boolean;
}

// --- Crew Assist (crew members provide support actions) ---

export interface CrewAssist {
  crewId: string;
  crewName: string;
  action: CombatAction;
  available: boolean;
  portrait?: string;
}

export interface CrewCombo {
  id: string;
  crewPair: [string, string];        // Two crew IDs required
  name: string;
  description: string;
  action: CombatAction;
  sharedCooldown: number;            // Turns before this combo can fire again
  currentCooldown: number;
}
