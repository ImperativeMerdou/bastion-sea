import { create } from 'zustand';
import {
  GamePanel, GamePhase, GameFlags, GameNotification, DailyReportEntry,
  MC, CrewMember, Island, Resources, TradeRoute,
  StoryScene, StoryEffect, ConquestApproach, DayAction, CrewAssignment,
  Equipment, EquipmentSlot, Ship,
  CrewIdentity, CrewFlagDesign,
} from '../types/game';
import { audioManager } from '../systems/audio';
import { buildEventContext, interpolateText } from '../systems/eventContext';
import { stingerManager } from '../systems/stingers';
import { createCombatActions } from './combatActions';
import { createSaveActions } from './saveSystem';
import { createStoryActions } from './storyActions';
import { createTerritoryActions } from './territoryActions';
import { createTravelActions } from './travelActions';
import { initialMC } from '../data/mc';
import { initialCrew } from '../data/crew';
import { initialIslands } from '../data/islands';
import { prologueScene } from '../data/story/prologue';
import { firstNightScene } from '../data/story/first_night';
import { tavvenArrivalScene } from '../data/story/tavven_arrival';
import { dragghenRecruitmentScene } from '../data/story/dragghen_recruitment';
import { kovesseRecruitmentScene } from '../data/story/kovesse_recruitment';
import { docksideScene } from '../data/story/dockside';
import { delvessaRecruitmentScene } from '../data/story/delvessa_recruitment';
import { vorrethRecruitmentScene } from '../data/story/vorreth_recruitment';
import { firstCrewDinnerScene } from '../data/story/first_crew_dinner';
import { crewArgumentScene } from '../data/story/crew_argument';
import { nightWatchScene } from '../data/story/night_watch';
import { act1IntelScene, act1ConquestChoiceScene } from '../data/story/act1_intel';
import { conquestForceScene } from '../data/story/conquest_force';
import { conquestNegotiationScene } from '../data/story/conquest_negotiation';
import { conquestEconomicScene } from '../data/story/conquest_economic';
import { conquestSubversionScene } from '../data/story/conquest_subversion';
import { conquestAftermathScene } from '../data/story/conquest_aftermath';
import { keldrisArrivalScene } from '../data/story/exploration_keldriss';
import { mossbreakArrivalScene } from '../data/story/exploration_mossbreak';
import { copperveinArrivalScene } from '../data/story/exploration_coppervein';
import { durrekArrivalScene } from '../data/story/exploration_durrek';
import { keldrissConquestScene } from '../data/story/conquest_keldriss';
import { durrekConquestScene } from '../data/story/conquest_durrek';
import { copperveinConquestScene } from '../data/story/conquest_coppervein';
import { mossbreakConquestScene } from '../data/story/conquest_mossbreak';
import { sorrensArrivalScene } from '../data/story/exploration_sorrens';
import { mirrorwaterArrivalScene } from '../data/story/exploration_mirrorwater';
import { anvilCayArrivalScene } from '../data/story/exploration_anvil_cay';
import { anvilCayConquestScene } from '../data/story/conquest_anvil_cay';
import { sorrensConquestScene } from '../data/story/conquest_sorrens';
import { mirrorwaterConquestScene } from '../data/story/conquest_mirrorwater';
import { windrowArrivalScene } from '../data/story/exploration_windrow';
import { windrowConquestScene } from '../data/story/conquest_windrow';
import { ghostlightArrivalScene } from '../data/story/exploration_ghostlight';
import { ghostlightConquestScene } from '../data/story/conquest_ghostlight';
import { vessArrivalScene } from '../data/story/exploration_vess';
import { noonArrivalScene } from '../data/story/exploration_noon';
import { delvessaRomance01, delvessaRomance02, delvessaRomance03, delvessaRomance04 } from '../data/story/delvessa_romance';
import {
  delvessaEvent04, dragghenEvent04, kovesseEvent04, suulenEvent04, tessekEvent04, orrenEvent04, vorrethEvent04,
} from '../data/story/crew_events_04';
import { noonConquestScene } from '../data/story/conquest_noon_island';
import { vessConquestScene } from '../data/story/conquest_vess_harbour';
import { rotstoneArrivalScene } from '../data/story/exploration_rotstone';
import { dragonFruitActivationScene } from '../data/story/dragon_fruit_activation';
import {
  act2BeginScene, act2UltimatumScene, act2ConquerorScene, act2BlockadeScene,
  act2CouncilScene, act2FirstStrikeScene, act2CrisisScene, act2SouthernGambitScene,
} from '../data/story/act2_main';
import {
  act3BeginScene, act3VasshenScene, act3ConquerorGambitScene,
  act3IroncladScene, act3FinalCouncilScene, act3EndingScene,
} from '../data/story/act3_main';
import { crewEventRegistry } from '../data/story/crew_events';
import { crewIdentityScene } from '../data/story/crew_identity';
import { rivalIntroScene } from '../data/story/rival_intro';
import { kirinArrivalScene } from '../data/story/kirin_act2';
import {
  kirinConfrontationScene, kirinAllianceScene, kirinRivalryScene,
  kirinEmotionalScene, kirinEndScene,
} from '../data/story/kirin_confrontation';
import {
  primeKhossScene, primeKhossNegotiateScene, primeKhossFightScene,
} from '../data/story/prime_khoss';
import { epilogueScene } from '../data/story/epilogue';
// Boss encounters registered via allCombatEncounters
// import { kirinEncounter, primeKhossEncounter } from '../data/combat/boss_encounters';
import { getReadyReactions } from '../systems/worldReactions';
import { processDailyEconomy, calculateTradeRouteIncome, calculateTradeRouteSupplyCost } from '../systems/economy';
import { rollRandomEvent, scaleEventRewards } from '../systems/randomEvents';
import { CombatState, CombatEncounter } from '../types/combat';
import { allCombatEncounters } from '../data/combat/encounters';
import { ECONOMY, TERRITORY, CREW, THREAT, TIME, LIMITS, DAY_ACTIONS, TRADE, SHIP, MISC, CREW_BONUS } from '../constants/balance';
import {
  TerritoryState,
  calculateTerritoryBonuses,
  calculateTerritoryUpkeep,
  checkTerritoryMorale,
  territoryUpgrades,
} from '../systems/territory';
import { allObjectives } from '../systems/objectives';
import { TravelState } from '../systems/seaTravel';
import {
  applyDominionXP,
  getTierPromotionText,
  DominionGainResult,
} from '../systems/dominion';
import {
  getNextKorvaanStage,
  getKorvaanAdvanceReq,
  getKorvaanBonuses,
} from '../systems/korvaan';
import { canEatDragonFruit, getDragonFruitBonuses } from '../systems/godfruit';
import { generateGrimoireBroadcasts, BroadcastContext } from '../systems/grimoireBroadcasts';
import { rollDayActionEvent, DayActionEvent } from '../systems/dayActions';
import { PlayerBehaviorProfile, DEFAULT_PLAYER_PROFILE, incrementProfile, getPlayerArchetype } from '../systems/playerProfile';
import { getStartingWeapon, getEquipment } from '../systems/equipment';
import { RandomEvent } from '../systems/randomEvents';
import { DEFAULT_SHIP, getShipUpgrade } from '../systems/shipUpgrades';
import {
  DEFAULT_THREAT_STATE,
  processThreatDay,
  calculateSpyEffects,
  applyDefenseBonus,
} from '../systems/threat';
import type { ThreatState } from '../types/game';

// Combat encounter registry - all encounters accessible by ID
const combatRegistry: Record<string, CombatEncounter> = {};

/** Register a combat encounter so it can be triggered by ID */
export function registerCombatEncounter(encounter: CombatEncounter) {
  combatRegistry[encounter.id] = encounter;
}

// Auto-register all combat encounters
allCombatEncounters.forEach((enc) => registerCombatEncounter(enc));

/** Cap an array to a maximum length, keeping the most recent entries. */
const capArray = <T>(arr: T[], max: number): T[] =>
  arr.length > max ? arr.slice(arr.length - max) : arr;

/** Track pending timeouts so loadGame() can cancel stale triggers. */
const pendingTimeouts = new Set<ReturnType<typeof setTimeout>>();

/** setTimeout wrapper that auto-tracks the timeout for cancellation on load. */
function trackedTimeout(fn: () => void, ms: number): ReturnType<typeof setTimeout> {
  const id = setTimeout(() => {
    pendingTimeouts.delete(id);
    fn();
  }, ms);
  pendingTimeouts.add(id);
  return id;
}

// ==========================================
// SHARED EVENT CHOICE RESOLUTION
// ==========================================
// Unified effect application used by Random Events, Travel Events, and Day Action Events.
// Each event type calls this after its own pre-processing (crew checks, travel state, etc.).

interface ChoiceEffectFields {
  effects?: Partial<Resources>;
  failEffects?: Partial<Resources>;
  successChance?: number;
  failText?: string;
  resultText: string;
  loyaltyEffects?: Record<string, number>;
  reputationChange?: number;
  infamyChange?: number;
  bountyChange?: number;
  setFlags?: Record<string, boolean | number | string>;
  grantEquipmentId?: string;
  triggerCombat?: string;
  // Day action extras
  dominionXP?: { expression: 'iron' | 'sight' | 'king'; amount: number };
  moraleChange?: number;
}

interface ChoiceResolutionResult {
  succeeded: boolean;
  displayText: string;
  statChanges: string[];
}

/**
 * Roll success and apply the common effect pipeline for any event choice.
 * Returns the result (succeeded, displayText) so callers can handle type-specific follow-ups.
 */
function applyChoiceEffects(
  choice: ChoiceEffectFields,
  ctx: {
    get: () => GameState;
    set: (partial: Partial<GameState> | ((s: GameState) => Partial<GameState>)) => void;
    scale: boolean; // Whether to apply scaleEventRewards
  },
): ChoiceResolutionResult {
  const { get, set, scale } = ctx;
  const state = get();
  const statChanges: string[] = [];

  // --- Success roll ---
  let succeeded = true;
  let displayText = choice.resultText;
  let appliedEffects = choice.effects;

  if (choice.successChance !== undefined) {
    succeeded = Math.random() * 100 < choice.successChance;
    if (!succeeded) {
      displayText = choice.failText || 'It didn\'t work out as planned.';
      appliedEffects = choice.failEffects;
    }
  }

  // --- Resource effects (always applied, even on failure if failEffects exist) ---
  if (appliedEffects && Object.keys(appliedEffects).length > 0) {
    const res = get().resources;
    const fx = scale
      ? scaleEventRewards(appliedEffects, {
          dayCount: state.dayCount,
          gamePhase: state.gamePhase,
          territoryCount: state.islands.filter(i => i.status === 'controlled').length,
        })
      : appliedEffects;
    set({
      resources: {
        sovereigns: Math.max(0, res.sovereigns + (fx.sovereigns || 0)),
        supplies: Math.max(0, res.supplies + (fx.supplies || 0)),
        materials: Math.max(0, res.materials + (fx.materials || 0)),
        intelligence: Math.max(0, res.intelligence + (fx.intelligence || 0)),
      },
    });
    // Track stat deltas for display
    if (fx.sovereigns) statChanges.push(`${fx.sovereigns > 0 ? '+' : ''}${fx.sovereigns} Sovereigns`);
    if (fx.supplies) statChanges.push(`${fx.supplies > 0 ? '+' : ''}${fx.supplies} Supplies`);
    if (fx.materials) statChanges.push(`${fx.materials > 0 ? '+' : ''}${fx.materials} Materials`);
    if (fx.intelligence) statChanges.push(`${fx.intelligence > 0 ? '+' : ''}${fx.intelligence} Intel`);
  }

  // --- Success-gated effects ---
  if (succeeded) {
    // Loyalty
    if (choice.loyaltyEffects) {
      for (const [crewId, amount] of Object.entries(choice.loyaltyEffects)) {
        state.adjustLoyalty(crewId, amount);
      }
    }
    // Reputation + infamy (batched)
    if (choice.reputationChange || choice.infamyChange) {
      set((s: GameState) => {
        const mc = { ...s.mc };
        if (choice.reputationChange) {
          mc.reputation = Math.min(TERRITORY.REPUTATION_MAX, Math.max(0, mc.reputation + (choice.reputationChange || 0)));
        }
        if (choice.infamyChange) {
          mc.infamy = Math.min(TERRITORY.REPUTATION_MAX, Math.max(0, mc.infamy + (choice.infamyChange || 0)));
        }
        return { mc };
      });
      if (choice.reputationChange) statChanges.push(`${choice.reputationChange > 0 ? '+' : ''}${choice.reputationChange} Reputation`);
      if (choice.infamyChange) statChanges.push(`${choice.infamyChange > 0 ? '+' : ''}${choice.infamyChange} Infamy`);
    }
    // Bounty
    if (choice.bountyChange) {
      state.addBounty(choice.bountyChange);
      statChanges.push(`${choice.bountyChange > 0 ? '+' : ''}${choice.bountyChange} Bounty`);
    }
    // Flags
    if (choice.setFlags) {
      for (const [key, value] of Object.entries(choice.setFlags)) {
        state.setFlag(key, value);
      }
    }
    // Equipment
    if (choice.grantEquipmentId) {
      const gear = getEquipment(choice.grantEquipmentId);
      if (gear) {
        state.addToInventory(gear);
        statChanges.push(`Acquired: ${gear.name}`);
      }
    }
    // Dominion XP (day actions only)
    if (choice.dominionXP) {
      state.trainDominion(choice.dominionXP.expression, choice.dominionXP.amount);
      statChanges.push(`+${choice.dominionXP.amount} ${choice.dominionXP.expression.charAt(0).toUpperCase() + choice.dominionXP.expression.slice(1)} XP`);
    }
    // Territory morale (day actions only, handled by caller for targeting)
  }

  return { succeeded, displayText, statChanges };
}

// Scene registry - all scenes accessible by ID
const sceneRegistry: Record<string, StoryScene> = {
  'prologue_escape': prologueScene,
  'first_night': firstNightScene,
  'tavven_arrival': tavvenArrivalScene,
  'dragghen_recruitment': dragghenRecruitmentScene,
  'kovesse_recruitment': kovesseRecruitmentScene,
  'dockside_confrontation': docksideScene,
  'delvessa_recruitment': delvessaRecruitmentScene,
  'vorreth_recruitment': vorrethRecruitmentScene,
  'first_crew_dinner': firstCrewDinnerScene,
  'crew_argument': crewArgumentScene,
  'night_watch': nightWatchScene,
  'act1_intel': act1IntelScene,
  'crew_identity': crewIdentityScene,
  'act1_intel_conquest': act1ConquestChoiceScene,
  'rival_intro': rivalIntroScene,
  'conquest_force': conquestForceScene,
  'conquest_negotiation': conquestNegotiationScene,
  'conquest_economic': conquestEconomicScene,
  'conquest_subversion': conquestSubversionScene,
  'conquest_aftermath': conquestAftermathScene,
  'explore_keldriss': keldrisArrivalScene,
  'explore_mossbreak': mossbreakArrivalScene,
  'explore_coppervein': copperveinArrivalScene,
  'explore_durrek_garrison': durrekArrivalScene,
  'conquest_keldriss': keldrissConquestScene,
  'conquest_durrek_garrison': durrekConquestScene,
  'conquest_coppervein': copperveinConquestScene,
  'conquest_mossbreak': mossbreakConquestScene,
  'explore_sorrens_flat': sorrensArrivalScene,
  'explore_mirrorwater': mirrorwaterArrivalScene,
  'explore_anvil_cay': anvilCayArrivalScene,
  'conquest_anvil_cay': anvilCayConquestScene,
  'conquest_sorrens_flat': sorrensConquestScene,
  'conquest_mirrorwater': mirrorwaterConquestScene,
  'explore_windrow': windrowArrivalScene,
  'conquest_windrow': windrowConquestScene,
  'explore_ghostlight_reef': ghostlightArrivalScene,
  'conquest_ghostlight_reef': ghostlightConquestScene,
  'explore_vess_harbour': vessArrivalScene,
  'explore_noon_island': noonArrivalScene,
  'conquest_vess_harbour': vessConquestScene,
  'conquest_noon_island': noonConquestScene,
  'explore_rotstone': rotstoneArrivalScene,
  'delvessa_romance_01': delvessaRomance01,
  'delvessa_romance_02': delvessaRomance02,
  'delvessa_romance_03': delvessaRomance03,
  'delvessa_romance_04': delvessaRomance04,
  // Crew Events - Late Game (Act 2+)
  'crew_delvessa_04': delvessaEvent04,
  'crew_dragghen_04': dragghenEvent04,
  'crew_kovesse_04': kovesseEvent04,
  'crew_suulen_04': suulenEvent04,
  'crew_tessek_04': tessekEvent04,
  'crew_orren_04': orrenEvent04,
  'crew_vorreth_04': vorrethEvent04,
  // Act 2 - The Response
  'act2_begin': act2BeginScene,
  'act2_ultimatum': act2UltimatumScene,
  'act2_conqueror_contact': act2ConquerorScene,
  'act2_blockade': act2BlockadeScene,
  'act2_crew_council': act2CouncilScene,
  'act2_first_strike': act2FirstStrikeScene,
  'act2_territory_crisis': act2CrisisScene,
  'act2_southern_gambit': act2SouthernGambitScene,
  // Kirin Arc
  'kirin_arrival': kirinArrivalScene,
  'kirin_confrontation': kirinConfrontationScene,
  'kirin_confrontation_alliance': kirinAllianceScene,
  'kirin_confrontation_rivalry': kirinRivalryScene,
  'kirin_confrontation_emotional': kirinEmotionalScene,
  'kirin_confrontation_end': kirinEndScene,
  // Prime Khoss Arc
  'prime_khoss_arrival': primeKhossScene,
  'prime_khoss_negotiate': primeKhossNegotiateScene,
  'prime_khoss_fight': primeKhossFightScene,
  // Act 3 - Godtide
  'act3_begin': act3BeginScene,
  'act3_vasshen': act3VasshenScene,
  'act3_conqueror_gambit': act3ConquerorGambitScene,
  'act3_ironclad': act3IroncladScene,
  'act3_final_council': act3FinalCouncilScene,
  'act3_ending': act3EndingScene,
  // Dragon Fruit transformation
  'dragon_fruit_activation': dragonFruitActivationScene,
  // Post-credits epilogue
  'epilogue_view_from_below': epilogueScene,
};

// Auto-register crew event scenes so save/load works during conversations
crewEventRegistry.forEach((entry) => {
  sceneRegistry[entry.sceneId] = entry.scene;
});

export interface GameState {
  // --- Core State ---
  activePanel: GamePanel;
  gamePhase: GamePhase;
  dayCount: number;
  flags: GameFlags;
  notifications: GameNotification[];
  pendingDailyReport: DailyReportEntry[] | null;
  firedReactionIds: string[];
  firedEventIds: string[];
  grimoireBroadcastDays: Record<string, number>;
  currentIsland: string; // island the player is currently at
  gameStarted: boolean;

  // --- Characters ---
  mc: MC;
  crew: CrewMember[];

  // --- World ---
  islands: Island[];
  selectedIsland: string | null;

  // --- Resources ---
  resources: Resources;

  // --- Story ---
  currentScene: StoryScene | null;
  storyHistory: string[];
  isTyping: boolean;
  typingSpeed: number;
  typingSpeedPreset: 'slow' | 'normal' | 'fast' | 'instant';

  // --- Combat ---
  combatState: CombatState | null;

  // --- Territory ---
  territoryStates: Record<string, TerritoryState>;

  // --- Travel ---
  travelState: TravelState | null;
  firedTravelEventIds: string[];

  // --- Day Planner ---
  dayPlannerOpen: boolean;

  // --- Day Action Events ---
  pendingDayEvent: { event: DayActionEvent; resultText: string | null; actionType: DayAction; statChanges?: string[] } | null;
  firedDayEventIds: string[];

  // --- Random Event Choices ---
  pendingRandomEvent: { event: RandomEvent; resultText: string | null; statChanges?: string[] } | null;

  // --- Threat System ---
  threatState: ThreatState;

  // --- Crew Identity ---
  crewIdentity: CrewIdentity;

  // --- Trade Routes ---
  tradeRoutes: TradeRoute[];

  // --- Equipment ---
  equipment: Record<EquipmentSlot, Equipment | null>;
  inventory: Equipment[];

  // --- Ship ---
  ship: Ship;

  // --- Player Behavior Profile ---
  playerProfile: PlayerBehaviorProfile;

  // --- Panel Actions ---
  setActivePanel: (panel: GamePanel) => void;

  // --- Game Flow ---
  startGame: () => void;
  advanceDay: () => void;
  setGamePhase: (phase: GamePhase) => void;
  setFlag: (key: string, value: boolean | number | string) => void;
  getFlag: (key: string) => boolean | number | string | undefined;

  // --- MC Actions ---
  updateMC: (updates: Partial<MC>) => void;
  addBounty: (amount: number) => void;
  addTerritory: (islandId: string) => void;
  trainDominion: (expression: 'iron' | 'sight' | 'king', xp: number) => DominionGainResult | null;
  advanceKorvaan: () => boolean;
  eatDragonFruit: () => boolean;

  // --- Crew Actions ---
  recruitMember: (id: string) => void;
  updateCrewMember: (id: string, updates: Partial<CrewMember>) => void;
  adjustLoyalty: (id: string, amount: number) => void;

  // --- Island Actions ---
  selectIsland: (id: string | null) => void;
  discoverIsland: (id: string) => void;
  conquerIsland: (id: string, approach: ConquestApproach) => void;
  updateIsland: (id: string, updates: Partial<Island>) => void;
  beginConquest: (islandId: string) => void;

  // --- Travel Actions ---
  travelTo: (islandId: string) => boolean;
  resolveTravelChoice: (choiceId: string) => void;
  advanceTravel: () => void;
  completeTravelArrival: (islandId: string) => void;

  // --- Resource Actions ---
  updateResources: (updates: Partial<Resources>) => void;
  spendResources: (costs: Partial<Resources>) => boolean;

  // --- Story Actions ---
  startScene: (scene: StoryScene) => void;
  advanceBeat: () => void;
  makeChoice: (choiceId: string) => void;
  clearScene: () => void;
  setTyping: (typing: boolean) => void;
  setTypingSpeed: (preset: 'slow' | 'normal' | 'fast' | 'instant') => void;

  // --- Notification Actions ---
  addNotification: (notification: Omit<GameNotification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  dismissDailyReport: () => void;

  // --- Combat Actions ---
  startCombat: (encounterId: string) => void;
  startCombatEncounter: (encounter: CombatEncounter) => void;
  updateCombatState: (state: CombatState) => void;
  endCombat: (result: 'victory' | 'defeat') => void;

  // --- Territory Actions ---
  startTerritoryUpgrade: (islandId: string, upgradeId: string) => boolean;
  dispatchCrewToIsland: (islandId: string, crewId: string) => boolean;
  processTerritoryDay: () => void;
  getTerritoryBonuses: () => ReturnType<typeof calculateTerritoryBonuses>;
  boostTerritoryMorale: (islandId: string, moraleBoost: number, defenseBoost?: number) => void;
  fortifyTerritory: (islandId: string) => boolean;
  setIslandRole: (islandId: string, role: import('../types/game').IslandRole) => boolean;

  // --- Threat Actions ---
  runCounterEspionage: () => boolean;

  // --- Day Planner Actions ---
  openDayPlanner: () => void;
  closeDayPlanner: () => void;
  executeDayAction: (action: DayAction) => void;
  resolveDayEventChoice: (choiceId: string) => void;
  dismissDayEvent: () => void;

  // --- Crew Assignment Actions ---
  assignCrewRole: (crewId: string, role: CrewAssignment) => void;
  giveCrewGift: (crewId: string) => boolean;

  // --- Trade Route Actions ---
  establishTradeRoute: (fromIsland: string, toIsland: string) => boolean;

  // --- Equipment Actions ---
  equipItem: (itemId: string) => void;
  unequipItem: (slot: EquipmentSlot) => void;
  addToInventory: (item: Equipment) => void;

  // --- Random Event Choice Actions ---
  resolveRandomEventChoice: (choiceId: string) => void;
  dismissRandomEvent: () => void;

  // --- Ship Actions ---
  installShipUpgrade: (upgradeId: string) => boolean;
  repairShip: (amount: number) => boolean;

  // --- World Reaction Processing ---
  processWorldReactions: () => void;

  // --- Story Effect Processing ---
  applyEffects: (effects: StoryEffect[]) => void;

  // --- Save/Load ---
  saveGame: (slot?: number) => boolean;
  loadGame: (slot?: number) => boolean;
  hasSaveData: (slot?: number) => boolean;
  deleteSave: (slot?: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // --- Initial State ---
  activePanel: 'story',
  gamePhase: 'prologue',
  dayCount: 1,
  flags: {},
  notifications: [],
  pendingDailyReport: null,
  firedReactionIds: [],
  firedEventIds: [],
  grimoireBroadcastDays: {},
  currentIsland: 'tavven_shoal',
  gameStarted: false,

  mc: initialMC,
  crew: initialCrew,

  islands: initialIslands,
  selectedIsland: null,

  resources: {
    sovereigns: ECONOMY.STARTING_SOVEREIGNS,
    supplies: ECONOMY.STARTING_SUPPLIES,
    materials: ECONOMY.STARTING_MATERIALS,
    intelligence: ECONOMY.STARTING_INTELLIGENCE,
  },

  currentScene: null,
  storyHistory: [],
  isTyping: false,
  typingSpeed: 18,
  typingSpeedPreset: 'normal' as const,

  combatState: null,

  territoryStates: {},

  travelState: null,
  firedTravelEventIds: [],

  dayPlannerOpen: false,
  pendingDayEvent: null,
  firedDayEventIds: [],
  pendingRandomEvent: null,
  threatState: { ...DEFAULT_THREAT_STATE },
  crewIdentity: { name: '', flagDesign: 'crossed_horns', named: false },
  tradeRoutes: [],

  equipment: { weapon: null, armor: null, accessory: null },
  inventory: [],
  ship: { ...DEFAULT_SHIP },
  playerProfile: { ...DEFAULT_PLAYER_PROFILE },

  // --- Panel ---
  setActivePanel: (panel) => {
    const scene = get().currentScene;
    if (scene?.lockNavigation && panel !== 'story') return;
    set({ activePanel: panel });
  },

  // --- Game Flow ---
  startGame: () => {
    // Full state reset (defensive: prevents stale state if page wasn't reloaded)
    pendingTimeouts.forEach(id => clearTimeout(id));
    pendingTimeouts.clear();
    set({
      gameStarted: true,
      gamePhase: 'prologue',
      dayCount: 1,
      flags: {},
      notifications: [],
      pendingDailyReport: null,
      firedReactionIds: [],
      firedEventIds: [],
      grimoireBroadcastDays: {},
      currentIsland: 'tavven_shoal',
      mc: { ...initialMC },
      crew: initialCrew.map(c => ({ ...c })),
      islands: initialIslands.map(i => ({ ...i })),
      selectedIsland: null,
      resources: {
        sovereigns: ECONOMY.STARTING_SOVEREIGNS,
        supplies: ECONOMY.STARTING_SUPPLIES,
        materials: ECONOMY.STARTING_MATERIALS,
        intelligence: ECONOMY.STARTING_INTELLIGENCE,
      },
      activePanel: 'story',
      currentScene: { ...prologueScene, currentBeat: 0 },
      storyHistory: [],
      isTyping: true,
      typingSpeed: 18,
      typingSpeedPreset: 'normal' as const,
      combatState: null,
      territoryStates: {},
      travelState: null,
      firedTravelEventIds: [],
      dayPlannerOpen: false,
      pendingDayEvent: null,
      firedDayEventIds: [],
      pendingRandomEvent: null,
      threatState: { ...DEFAULT_THREAT_STATE },
      crewIdentity: { name: '', flagDesign: 'crossed_horns', named: false },
      tradeRoutes: [],
      equipment: { weapon: getStartingWeapon(), armor: null, accessory: null },
      inventory: [],
      ship: { ...DEFAULT_SHIP },
      playerProfile: { ...DEFAULT_PLAYER_PROFILE },
    });
  },

  advanceDay: () => {
    const state = get();

    // Guard: never advance day during combat or active story scene (prevents state corruption)
    if (state.combatState) return;

    const newDay = state.dayCount + 1;
    const report: DailyReportEntry[] = [];

    // ==========================================
    // EXTRACTED HELPERS (keep advanceDay readable)
    // ==========================================

    /** Check and fire story scene triggers based on flags, phase, and timing. */
    const processStorySceneTriggers = () => {
      // Fire a scene by ID with standard delay
      const fireScene = (sceneId: string, onFire?: () => void) => {
        const scene = sceneRegistry[sceneId];
        if (!scene) return;
        trackedTimeout(() => {
          const current = get();
          if (!current.currentScene && !current.combatState && !current.pendingRandomEvent && !current.pendingDayEvent) {
            set({ currentScene: { ...scene, currentBeat: 0 }, isTyping: true, activePanel: 'story' });
            onFire?.();
          }
        }, TIME.SCENE_TRIGGER_DELAY);
      };

      // Evaluate a trigger list (requires/excludes pattern)
      const evalTriggers = (
        triggers: { sceneId: string; requires: Record<string, boolean>; excludes: Record<string, boolean> }[],
        flags: Record<string, boolean | number | string>,
      ) => {
        for (const trigger of triggers) {
          const requiresMet = Object.entries(trigger.requires).every(([k, v]) => v ? flags[k] : !flags[k]);
          const notExcluded = Object.entries(trigger.excludes).every(([k, v]) => v ? !flags[k] : !!flags[k]);
          if (requiresMet && notExcluded) {
            fireScene(trigger.sceneId);
            return true;
          }
        }
        return false;
      };

      const ts = get();
      if (!ts.currentScene) {
        // Act 1: Rival introduction (3+ days after Tavven conquest)
        if (ts.gamePhase === 'act1' && !ts.flags['rival_encountered'] && ts.flags['tavven_conquered']) {
          const conquestDay = typeof ts.flags['tavven_conquered_day'] === 'number' ? ts.flags['tavven_conquered_day'] : 0;
          if (ts.dayCount >= conquestDay + 3) {
            fireScene('rival_intro');
          }
        }

        // Orren Mahk arrives (sent by Pettha Koss, 2+ days after Tavven conquest)
        if (ts.flags['tavven_conquered'] && !ts.flags['orren_arrived']) {
          const conquestDay = typeof ts.flags['tavven_conquered_day'] === 'number' ? ts.flags['tavven_conquered_day'] : 0;
          if (ts.dayCount >= conquestDay + 2) {
            ts.setFlag('orren_arrived', true);
            ts.recruitMember('orren');
            ts.addNotification({
              type: 'crew',
              title: 'NEW CREW: Orren Mahk',
              message: 'A nervous Khari with sparking fingers showed up on deck. Pettha Koss sent him. Says he can steer. Talk to him when you get a chance.',
            });
          }
        }

        // Phase transition: Act 1 -> Act 2 (Central Belt secured)
        if (ts.gamePhase === 'act1' && !ts.flags['act2_begun']) {
          const centralBeltSecured =
            ts.flags['coppervein_conquered'] && ts.flags['mossbreak_conquered'] &&
            ts.flags['sorrens_conquered'] && ts.flags['anvil_cay_conquered'] &&
            ts.flags['mirrorwater_conquered'];
          if (centralBeltSecured) {
            ts.setFlag('central_belt_secured', true);
            ts.setGamePhase('act2');
            fireScene('act2_begin');
            ts.addNotification({
              type: 'story',
              title: '👑 ACT 2 - THE RESPONSE',
              message: 'The Central Belt is yours. The world has noticed. The Wardensea, the Kolmari, the Conquerors, they are all watching. And they are all moving.',
            });
          }
        }

        // Act 2 scene triggers
        if (ts.gamePhase === 'act2' && ts.flags['act2_begun']) {
          evalTriggers([
            { sceneId: 'act2_ultimatum', requires: { act2_begun: true }, excludes: { ultimatum_answered: true } },
            { sceneId: 'act2_conqueror_contact', requires: { act2_begun: true }, excludes: { conqueror_contacted: true } },
            { sceneId: 'act2_blockade', requires: { ultimatum_answered: true }, excludes: { blockade_resolved: true } },
            { sceneId: 'act2_crew_council', requires: { ultimatum_answered: true, conqueror_contacted: true }, excludes: { crew_council_complete: true } },
            { sceneId: 'act2_first_strike', requires: { crew_council_complete: true }, excludes: { first_strike_survived: true } },
            { sceneId: 'act2_territory_crisis', requires: { first_strike_survived: true }, excludes: { territory_crisis_resolved: true } },
            { sceneId: 'act2_southern_gambit', requires: { territory_crisis_resolved: true }, excludes: { southern_gambit_begun: true } },
          ], ts.flags);
        }

        // Act 3 scene triggers
        if (ts.gamePhase === 'act3') {
          if (!ts.flags['act3_begun']) {
            fireScene('act3_begin');
          } else {
            evalTriggers([
              { sceneId: 'act3_vasshen', requires: { act3_begun: true }, excludes: { vasshen_confrontation_begun: true } },
              { sceneId: 'act3_conqueror_gambit', requires: { vasshen_confrontation_begun: true }, excludes: { conqueror_gambit_resolved: true } },
              { sceneId: 'act3_ironclad', requires: { conqueror_gambit_resolved: true }, excludes: { ironclad_engaged: true } },
              { sceneId: 'act3_final_council', requires: { ironclad_engaged: true }, excludes: { final_council_complete: true } },
              { sceneId: 'act3_ending', requires: { final_council_complete: true }, excludes: { game_complete: true } },
            ], ts.flags);
          }
        }

        // Kirin arc: 6+ islands OR day 40+
        if (!ts.flags['kirin_arrived']) {
          const controlledCount = ts.islands.filter(i => i.status === 'controlled').length;
          if (controlledCount >= TIME.KIRIN_MIN_ISLANDS || ts.dayCount >= TIME.KIRIN_MIN_DAY) {
            fireScene('kirin_arrival', () => {
              get().setFlag('kirin_arrival_day', get().dayCount);
            });
          }
        }

        // Kirin confrontation: 3+ days after arrival, auto-triggers
        if (ts.flags['kirin_arrived'] && !ts.flags['kirin_confrontation_complete']) {
          const arrivalDay = typeof ts.flags['kirin_arrival_day'] === 'number' ? ts.flags['kirin_arrival_day'] : 0;
          if (ts.dayCount >= arrivalDay + TIME.KIRIN_CONFRONTATION_DELAY) {
            fireScene('kirin_confrontation');
          }
        }

        // Prime Khoss: Vasshen defeated + 8+ islands + day 60+
        if (ts.flags['vasshen_defeated'] && !ts.flags['prime_khoss_confrontation_begun']) {
          const controlledCount = ts.islands.filter(i => i.status === 'controlled').length;
          if (controlledCount >= TIME.PRIME_MIN_ISLANDS && ts.dayCount >= TIME.PRIME_MIN_DAY) {
            fireScene('prime_khoss_arrival');
          }
        }
      }
    };

    /** Check loss conditions: starvation, mutiny, total defeat, territory lost. */
    const processLossConditions = (day: number) => {
      const ls = get();

      // Starvation: consecutive days with 0 supplies and 0 sovereigns
      if (ls.resources.supplies <= 0 && ls.resources.sovereigns <= 0) {
        const starveCount = ((ls.flags['starvation_days'] as number) || 0) + 1;
        ls.setFlag('starvation_days', starveCount);
        if (starveCount >= MISC.STARVATION_DAYS) {
          ls.setFlag('game_over', true);
          ls.setFlag('game_over_cause', 'starvation');
        }
      } else {
        ls.setFlag('starvation_days', 0);
      }

      // Crew mutiny: All recruited crew at mutinous or deserted
      const activeCrew = ls.crew.filter((m) => m.recruited && m.alive);
      if (activeCrew.length > 0 && activeCrew.every((m) => m.mood === 'mutinous')) {
        ls.setFlag('game_over', true);
        ls.setFlag('game_over_cause', 'crew_mutiny');
      }

      // Total defeat: 0 active crew left (all dead or deserted)
      const everHadCrew = ls.flags['has_recruited_crew'];
      if (everHadCrew && activeCrew.length === 0) {
        ls.setFlag('game_over', true);
        ls.setFlag('game_over_cause', 'total_defeat');
      }

      // Territory lost: player had territories but now has none (all rebelled)
      // Exempt during Act 3 endgame
      if (!ls.flags['game_over'] && ls.gamePhase !== 'act3' && ls.gamePhase !== 'endgame') {
        const controlledCount = ls.islands.filter((i) => i.status === 'controlled').length;
        const everConquered = ls.flags['has_conquered_territory'];
        if (everConquered && controlledCount === 0) {
          ls.setFlag('game_over', true);
          ls.setFlag('game_over_cause', 'territory_lost');
        }
      }

      // Autosave every 5 days
      if (day % 5 === 0) {
        if (!get().saveGame(0)) {
          // Autosave failed silently on day advancement
        }
      }
    };

    /** Process crew assignment bonuses and injury recovery. */
    const processCrewDuties = (
      rpt: DailyReportEntry[],
      day: number,
      terrIncome: { sovereigns: number; supplies: number; materials: number; intelligence: number },
    ) => {
      // Crew assignment bonuses (injured crew can't perform duties)
      // Loyalty breakpoints: below 20 = refuse dangerous duties, above 80 = 1.5x bonus
      const assignedCrew = state.crew.filter(m => m.recruited && m.alive && !m.injured && m.assignment && m.assignment !== 'unassigned');
      const crewBonusReport: string[] = [];
      const dangerousRoles: CrewAssignment[] = ['navigator', 'lookout', 'diplomat'];
      // Accumulate resource bonuses from crew duties, apply in one set()
      let crewIntelBonus = 0;
      let crewSovBonus = 0;
      assignedCrew.forEach(m => {
        const firstName = m.name.split(' ')[0];

        if (m.loyalty < CREW.LOYALTY_REFUSE_THRESHOLD && dangerousRoles.includes(m.assignment!)) {
          crewBonusReport.push(`${firstName} (${m.assignment}): REFUSED -- loyalty too low`);
          get().addNotification({
            type: 'crew',
            title: `${firstName.toUpperCase()} REFUSES ORDERS`,
            message: `${m.name} no longer trusts you enough to carry out ${m.assignment} duties. Raise their loyalty above ${CREW.LOYALTY_REFUSE_THRESHOLD} or reassign them.`,
          });
          return;
        }

        const eliteMultiplier = m.loyalty >= CREW.LOYALTY_ELITE_THRESHOLD ? CREW.LOYALTY_ELITE_MULTIPLIER : 1.0;
        const eliteTag = eliteMultiplier > 1.0 ? ' [ELITE]' : '';

        switch (m.assignment) {
          case 'lookout': {
            const bonus = Math.floor(ECONOMY.LOOKOUT_INTEL_BONUS * eliteMultiplier);
            crewIntelBonus += bonus;
            crewBonusReport.push(`${firstName} (Lookout): +${bonus} intel${eliteTag}`);
            break;
          }
          case 'diplomat': {
            const bonus = Math.floor(ECONOMY.DIPLOMAT_MORALE_BONUS * eliteMultiplier);
            const controlled = get().islands.filter(i => i.status === 'controlled');
            controlled.forEach(isl => {
              get().boostTerritoryMorale(isl.id, bonus);
            });
            if (controlled.length > 0) {
              crewBonusReport.push(`${firstName} (Diplomat): +${bonus} morale across ${controlled.length} territories${eliteTag}`);
            }
            break;
          }
          case 'trader': {
            const ctrlIslands = get().islands.filter(i => i.status === 'controlled');
            if (ctrlIslands.length > 0) {
              const traderBonus = Math.max(1, Math.floor(terrIncome.sovereigns * ECONOMY.TRADER_INCOME_BONUS * eliteMultiplier));
              crewSovBonus += traderBonus;
              crewBonusReport.push(`${firstName} (Trader): +${traderBonus} sov${eliteTag}`);
            }
            break;
          }
          case 'trainer': {
            const dom = get().mc.dominion;
            const expressions: Array<'iron' | 'sight' | 'king'> = ['iron', 'sight', 'king'];
            const tierRank = ['flicker', 'tempered', 'forged', 'prime', 'conqueror'];
            const totalLevel = (expr: 'iron' | 'sight' | 'king') =>
              tierRank.indexOf(dom[expr].tier) * 100 + dom[expr].level;
            const lowest = expressions.reduce((a, b) => totalLevel(a) <= totalLevel(b) ? a : b);
            const bonus = Math.floor(ECONOMY.TRAINER_XP_BONUS * eliteMultiplier);
            get().trainDominion(lowest, bonus);
            crewBonusReport.push(`${firstName} (Trainer): +${bonus} ${lowest} XP${eliteTag}`);
            break;
          }
          case 'navigator': {
            crewBonusReport.push(`${firstName} (Navigator): -1 travel day on voyages${eliteTag}`);
            break;
          }
          case 'quartermaster': {
            crewBonusReport.push(`${firstName} (Quartermaster): supply crisis resistance${eliteTag}`);
            break;
          }
        }
      });
      // Batch crew resource bonuses (lookout intel + trader sov) in one set()
      if (crewIntelBonus > 0 || crewSovBonus > 0) {
        const rr = get().resources;
        set({ resources: { ...rr, intelligence: rr.intelligence + crewIntelBonus, sovereigns: rr.sovereigns + crewSovBonus } });
      }
      if (crewBonusReport.length > 0) {
        rpt.push({
          category: 'crew',
          icon: '👥',
          text: `Crew: ${crewBonusReport.join(', ')}`,
          severity: 'info',
        });
      }

      // Crew injury recovery
      const injuredCrew = get().crew.filter(m => m.injured && m.injuredUntilDay <= day);
      if (injuredCrew.length > 0) {
        const healedNames: string[] = [];
        injuredCrew.forEach(m => {
          get().updateCrewMember(m.id, { injured: false, injuredUntilDay: 0 });
          healedNames.push(m.name.split(' ')[0]);
        });
        rpt.push({
          category: 'crew',
          icon: '💊',
          text: `Recovered: ${healedNames.join(', ')}. Back to full duty.`,
          severity: 'info',
        });
      }
      const stillInjured = get().crew.filter(m => m.injured && m.injuredUntilDay > day);
      if (stillInjured.length > 0) {
        const injNames = stillInjured.map(m => `${m.name.split(' ')[0]} (Day ${m.injuredUntilDay})`).join(', ');
        rpt.push({
          category: 'crew',
          icon: '🩹',
          text: `Still injured: ${injNames}`,
          severity: 'warning',
        });
      }
    };

    /** Process crew morale: deficit penalties, warnings, and desertions. */
    const processCrewMorale = (rpt: DailyReportEntry[], isDeficit: boolean) => {
      if (isDeficit) {
        get().crew.filter((m) => m.recruited && m.alive).forEach((m) => {
          get().adjustLoyalty(m.id, -TERRITORY.DEFICIT_MORALE_PENALTY);
        });
      }

      // Crew warnings
      const warningCrew = get().crew.filter(m => m.recruited && m.alive);
      const disgruntled = warningCrew.filter(m => m.mood === 'disgruntled' || m.mood === 'mutinous');
      if (disgruntled.length > 0) {
        const names = disgruntled.map(m => m.name.split(' ')[0]).join(', ');
        const isMutinous = disgruntled.some(m => m.mood === 'mutinous');
        rpt.push({
          category: 'crew',
          icon: isMutinous ? '🚨' : '😤',
          text: `${names} ${disgruntled.length === 1 ? 'is' : 'are'} ${isMutinous ? 'on the verge of desertion' : 'deeply unhappy'}`,
          severity: isMutinous ? 'critical' : 'warning',
        });
      }

      // Loyalty Breakpoint: Desertion Risk (loyalty < 10)
      const desertionRiskCrew = get().crew.filter(
        m => m.recruited && m.alive && m.loyalty < CREW.LOYALTY_DESERT_RISK_THRESHOLD
      );
      desertionRiskCrew.forEach(m => {
        if (Math.random() < CREW.LOYALTY_DESERT_RISK_CHANCE) {
          const firstName = m.name.split(' ')[0];
          rpt.push({
            category: 'crew',
            icon: '🚪',
            text: `${firstName} is packing their things. Loyalty critically low (${m.loyalty}). They may leave any day.`,
            severity: 'critical',
          });
          get().addNotification({
            type: 'crew',
            title: `${firstName.toUpperCase()} CONSIDERING DESERTION`,
            message: `${m.name}'s loyalty has dropped to ${m.loyalty}. They have been seen talking to smugglers about passage off the ship. Act now or lose them.`,
          });
        }
      });

      // Crew Mood Consequences: Mutinous crew have a daily chance to desert
      const currentCrew = get().crew;
      currentCrew.filter((m) => m.recruited && m.alive && m.mood === 'mutinous').forEach((m) => {
        if (Math.random() < CREW.DESERTION_CHANCE) {
          get().updateCrewMember(m.id, { recruited: false, alive: true, assignment: 'unassigned' });
          rpt.push({
            category: 'crew',
            icon: '💀',
            text: `${m.name} deserted. No note. No goodbye.`,
            severity: 'critical',
          });
          get().addNotification({
            type: 'crew',
            title: `${m.name.toUpperCase()} HAS DESERTED`,
            message: `${m.name} left in the night. No note. No goodbye. You pushed too far.`,
          });
        }
      });
    };

    const controlledIslands = state.islands.filter((i) => i.status === 'controlled');
    const currentBlockades = new Set(state.threatState.blockadedRoutes);

    /** Phase 1: Economy -- crew upkeep, territory income, sinks. Returns shared context. */
    const processDailyUpkeep = () => {
      const { newResources, upkeep, deficit } = processDailyEconomy(state.resources, state.islands, state.crew);

      let territoryIncome = { sovereigns: 0, supplies: 0, materials: 0, intelligence: 0 };
      let territoryUpkeepCost = 0;

      let repBoost = 0;
      if (controlledIslands.length > 0) {
        const bonuses = calculateTerritoryBonuses(controlledIslands, state.territoryStates);
        territoryIncome = {
          sovereigns: bonuses.dailyIncome.sovereigns || 0,
          supplies: bonuses.dailyIncome.supplies || 0,
          materials: bonuses.dailyIncome.materials || 0,
          intelligence: bonuses.dailyIncome.intelligence || 0,
        };
        territoryUpkeepCost = calculateTerritoryUpkeep(controlledIslands.length);
        if (bonuses.reputationPerDay > 0) {
          const newRep = Math.min(TERRITORY.REPUTATION_MAX, state.mc.reputation + bonuses.reputationPerDay);
          if (newRep !== state.mc.reputation) {
            repBoost = newRep - state.mc.reputation;
          }
        }
      }

      const adminCost = controlledIslands.length * ECONOMY.ADMIN_COST_PER_ISLAND;
      const routeCount = state.tradeRoutes.filter(r => r.daysActive > 0).length;
      const fleetMaintCost = routeCount * ECONOMY.FLEET_MAINT_PER_ROUTE;
      let upgradeMaintCost = 0;
      if (controlledIslands.length > 0) {
        for (const island of controlledIslands) {
          const ts = state.territoryStates[island.id];
          const islandUpgrades = territoryUpgrades[island.id] || [];
          if (ts?.upgrades) {
            for (const upgId of ts.upgrades) {
              const upgDef = islandUpgrades.find(u => u.id === upgId);
              if (upgDef) {
                upgradeMaintCost += Math.ceil((upgDef.cost.sovereigns || 0) * ECONOMY.UPGRADE_MAINT_RATE);
              }
            }
          }
        }
      }
      const totalSovSink = adminCost + fleetMaintCost + upgradeMaintCost;
      const totalSupplyUpkeep = territoryUpkeepCost;

      const finalResources = {
        sovereigns: Math.max(0, newResources.sovereigns + territoryIncome.sovereigns - totalSovSink),
        supplies: Math.max(0, newResources.supplies + territoryIncome.supplies - totalSupplyUpkeep),
        materials: Math.max(0, newResources.materials + territoryIncome.materials),
        intelligence: Math.max(0, newResources.intelligence + territoryIncome.intelligence),
      };
      const territoryDeficit = (newResources.supplies + territoryIncome.supplies - totalSupplyUpkeep) < 0;

      // Batched: day count + resources + reputation in one set()
      set((s) => ({
        dayCount: newDay,
        resources: finalResources,
        ...(repBoost > 0 ? { mc: { ...s.mc, reputation: s.mc.reputation + repBoost } } : {}),
      }));

      return { upkeep, deficit, territoryIncome, territoryUpkeepCost, totalSupplyUpkeep, totalSovSink, adminCost, fleetMaintCost, upgradeMaintCost, territoryDeficit };
    };

    /** Phase 2: Trade routes -- income, blockades, supply costs. */
    const processTradeRoutes = (rpt: DailyReportEntry[]) => {
      const routes = state.tradeRoutes;
      if (routes.length === 0) return;

      let routeIncome = 0;
      let activeCount = 0;
      let blockadedCount = 0;
      const updatedRoutes = routes.map(r => {
        const days = r.daysActive + 1;
        const isBlockaded = currentBlockades.has(r.id);
        const fromIsland = state.islands.find(i => i.id === r.fromIsland);
        const toIsland = state.islands.find(i => i.id === r.toIsland);
        const income = isBlockaded ? 0 : calculateTradeRouteIncome(
          fromIsland?.resources || [], toIsland?.resources || [],
          fromIsland?.population || 0, toIsland?.population || 0, days,
        );
        if (isBlockaded) blockadedCount++;
        else activeCount++;
        routeIncome += income;
        return { ...r, daysActive: days, dailyIncome: income };
      });

      const tradeSupplyCost = calculateTradeRouteSupplyCost(activeCount);
      const curRes = get().resources;
      set({
        tradeRoutes: updatedRoutes,
        resources: {
          ...curRes,
          supplies: Math.max(0, curRes.supplies - (tradeSupplyCost > 0 ? tradeSupplyCost : 0)),
          sovereigns: curRes.sovereigns + (routeIncome > 0 ? routeIncome : 0),
        },
      });

      if (routeIncome > 0) {
        const blockadeNote = blockadedCount > 0 ? `, ${blockadedCount} blockaded` : '';
        const supplyCostNote = tradeSupplyCost > 0 ? `, -${tradeSupplyCost} supplies upkeep` : '';
        rpt.push({ category: 'economy', icon: '🚢', text: `Trade routes: +${routeIncome} sovereigns (${activeCount} active${blockadeNote}${supplyCostNote})`, severity: 'info' });
      } else if (blockadedCount > 0) {
        rpt.push({ category: 'economy', icon: '🚫', text: `Trade routes: all ${blockadedCount} route${blockadedCount > 1 ? 's' : ''} blockaded -- no income`, severity: 'warning' });
      }
    };

    /** Phase 3: Wardensea threat -- escalation, raids, spy ops, bounty hunters. Returns combat trigger. */
    const processWardenThreat = (rpt: DailyReportEntry[]): string | null => {
      let bountyHunterCombat: string | null = null;
      const tState = get();
      const controlledIds = controlledIslands.map(i => i.id);
      const threatResult = processThreatDay(
        tState.threatState, newDay, tState.mc.bounty, controlledIslands.length,
        tState.mc.infamy, controlledIds, tState.tradeRoutes,
        tState.resources.intelligence, tState.territoryStates,
      );

      // Batch: threat state + territory underAttack sync
      {
        const ts = get().territoryStates;
        const updatedTs: Record<string, TerritoryState> = {};
        const raidTarget = threatResult.newState.raidTarget;
        Object.entries(ts).forEach(([id, s]) => {
          const shouldBeUnderAttack = (id === raidTarget);
          if (s.underAttack !== shouldBeUnderAttack) {
            updatedTs[id] = { ...s, underAttack: shouldBeUnderAttack };
          }
        });
        const hasTerritoryChanges = Object.keys(updatedTs).length > 0;
        // Batch: threat state + spy effects + territory morale drain into single set()
        const spyFx = calculateSpyEffects(threatResult.newState.spyOperations);
        const sr = get().resources;
        let batchedTs = hasTerritoryChanges ? { ...ts, ...updatedTs } : { ...ts };
        if (spyFx.moraleDrain > 0) {
          Object.entries(batchedTs).forEach(([id, s]) => {
            batchedTs[id] = { ...s, morale: Math.min(TERRITORY.MORALE_MAX, Math.max(0, s.morale - spyFx.moraleDrain)) };
          });
        }
        set({
          threatState: threatResult.newState,
          territoryStates: batchedTs,
          ...(spyFx.intelDrain > 0 || spyFx.supplyLoss > 0 ? {
            resources: { ...sr, intelligence: Math.max(0, sr.intelligence - spyFx.intelDrain), supplies: Math.max(0, sr.supplies - spyFx.supplyLoss) },
          } : {}),
        });
      }

      // Collect raid damage + bounty hunter + blockade deductions, then batch
      const raidTsUpdates: Record<string, TerritoryState> = {};
      threatResult.events.forEach(evt => {
        if (evt.type === 'raid' && evt.day === newDay) {
          const ts = get().territoryStates;
          // Use already-updated state if this territory was hit by a prior raid in this batch
          const targetState = raidTsUpdates[evt.target] ?? ts[evt.target];
          if (targetState) {
            raidTsUpdates[evt.target] = { ...targetState, morale: Math.min(TERRITORY.MORALE_MAX, Math.max(0, targetState.morale - evt.strength)) };
          }
        }
        if (evt.type === 'bounty_hunter') {
          if (evt.strength >= THREAT.HUNTER_ELITE_THRESHOLD) bountyHunterCombat = 'wardensea_hunting_party';
          else if (evt.strength >= THREAT.HUNTER_MEDIUM_THRESHOLD) bountyHunterCombat = 'wardensea_sea_ambush';
          else bountyHunterCombat = 'wardensea_patrol';
        }
      });
      const newlyBlockaded = threatResult.newState.blockadedRoutes.filter(id => !currentBlockades.has(id));
      let blockadeLoss = 0;
      if (newlyBlockaded.length > 0) {
        get().tradeRoutes.forEach(r => { if (newlyBlockaded.includes(r.id)) blockadeLoss += r.dailyIncome; });
      }
      // Single batched set for raid damage + blockade loss
      const hasRaidChanges = Object.keys(raidTsUpdates).length > 0;
      if (hasRaidChanges || blockadeLoss > 0) {
        const cur = get();
        set({
          ...(hasRaidChanges ? { territoryStates: { ...cur.territoryStates, ...raidTsUpdates } } : {}),
          ...(blockadeLoss > 0 ? { resources: { ...cur.resources, sovereigns: Math.max(0, cur.resources.sovereigns - blockadeLoss) } } : {}),
        });
      }

      // Threat notifications
      threatResult.notifications.forEach(n => {
        rpt.push({ category: 'territory' as const, icon: n.severity === 'critical' ? '🔴' : n.severity === 'warning' ? '🟡' : '🟢', text: n.title + ': ' + n.message, severity: n.severity });
        get().addNotification({ type: n.type, title: n.title, message: n.message });
      });
      if (controlledIslands.length > 0 && threatResult.newState.level > 0) {
        const alertLabel = threatResult.newState.wardenseaAlert.toUpperCase();
        rpt.push({ category: 'territory', icon: '⚡', text: `Wardensea threat: ${alertLabel} (${threatResult.newState.level}/100)`, severity: threatResult.newState.level >= THREAT.ALERT_HEIGHTENED ? 'warning' : 'info' });
      }

      return bountyHunterCombat;
    };

    /** Phase 4: Territory events -- morale drift, supply crises, rebellion checks. */
    const processTerritoryEvents = (
      rpt: DailyReportEntry[],
      territoryIncome: { sovereigns: number; supplies: number; materials: number; intelligence: number },
    ) => {
      if (controlledIslands.length > 0) {
        get().processTerritoryDay();
      }

      if (controlledIslands.length >= TERRITORY.SUPPLY_STRAIN_ISLANDS) {
        const hasQuartermaster = state.crew.some(m => m.recruited && m.alive && !m.injured && m.assignment === 'quartermaster');
        const qmReduction = hasQuartermaster ? TERRITORY.QUARTERMASTER_CRISIS_REDUCTION : 0;
        let crisisChance: number;
        let crisisLabel: string;
        if (controlledIslands.length >= TERRITORY.LOGISTICS_CRISIS_ISLANDS) {
          crisisChance = TERRITORY.LOGISTICS_CRISIS_CHANCE - qmReduction;
          crisisLabel = 'LOGISTICS CRISIS';
        } else {
          crisisChance = TERRITORY.SUPPLY_STRAIN_CHANCE - qmReduction;
          crisisLabel = 'SUPPLY STRAIN';
        }

        if (Math.random() < Math.max(0, crisisChance)) {
          const moralePenalty = TERRITORY.CRISIS_MORALE_MIN + Math.floor(Math.random() * (TERRITORY.CRISIS_MORALE_MAX - TERRITORY.CRISIS_MORALE_MIN + 1));
          const crisisStates = get().territoryStates;
          const updatedCrisisStates: Record<string, TerritoryState> = {};
          Object.entries(crisisStates).forEach(([id, s]) => {
            updatedCrisisStates[id] = { ...s, morale: Math.min(TERRITORY.MORALE_MAX, Math.max(0, s.morale - moralePenalty)) };
          });
          const supplyPenalty = Math.floor(territoryIncome.supplies * TERRITORY.CRISIS_SUPPLY_INCOME_PENALTY);
          const crisisRes = get().resources;
          set({
            territoryStates: { ...crisisStates, ...updatedCrisisStates },
            ...(supplyPenalty > 0 ? { resources: { ...crisisRes, supplies: Math.max(0, crisisRes.supplies - supplyPenalty) } } : {}),
          });
          rpt.push({ category: 'territory', icon: '📦', text: `${crisisLabel}: -${moralePenalty} morale across all territories, -${supplyPenalty} supplies. Your supply lines are overstretched.`, severity: 'critical' });
          get().addNotification({
            type: 'conqueror', title: crisisLabel,
            message: `Your supply lines are overstretched. Distant territories are feeling the strain. All territory morale dropped by ${moralePenalty} and supply income reduced by ${supplyPenalty}.${hasQuartermaster ? ' Your Quartermaster mitigated the worst of it.' : ' A Quartermaster assignment could help prevent this.'}`,
          });
        }
      }
    };

    /** Phase 5: Economy report -- net income, upkeep breakdown, deficit warnings. */
    const buildEconomyReport = (
      rpt: DailyReportEntry[],
      ctx: { upkeep: number; deficit: boolean; territoryIncome: { sovereigns: number; supplies: number; materials: number; intelligence: number }; territoryUpkeepCost: number; totalSupplyUpkeep: number; totalSovSink: number; adminCost: number; fleetMaintCost: number; upgradeMaintCost: number; territoryDeficit: boolean },
    ) => {
      if (controlledIslands.length === 0) return;

      const netSupplies = ctx.territoryIncome.supplies - ctx.upkeep - ctx.totalSupplyUpkeep;
      const netSov = ctx.territoryIncome.sovereigns - ctx.totalSovSink;
      const totalMat = ctx.territoryIncome.materials;
      const totalIntel = ctx.territoryIncome.intelligence;

      rpt.push({ category: 'economy', icon: '⬡', text: `${netSov >= 0 ? '+' : ''}${netSov} sovereigns, ${netSupplies >= 0 ? '+' : ''}${netSupplies} supplies, +${totalMat} materials, +${totalIntel} intel`, severity: 'info' });

      if (ctx.territoryUpkeepCost > 0 || ctx.totalSovSink > 0) {
        const parts: string[] = [];
        if (ctx.totalSupplyUpkeep > 0) parts.push(`${ctx.totalSupplyUpkeep} supplies`);
        if (ctx.totalSovSink > 0) parts.push(`${ctx.totalSovSink} sov (admin ${ctx.adminCost}, fleet ${ctx.fleetMaintCost}, maint ${ctx.upgradeMaintCost})`);
        rpt.push({ category: 'territory', icon: '🏗️', text: `Empire upkeep: ${parts.join(', ')}`, severity: 'info' });
      }

      const showDeficit = controlledIslands.length > 0 ? ctx.territoryDeficit : ctx.deficit;
      if (showDeficit) {
        rpt.push({ category: 'economy', icon: '⚠️', text: 'Supply deficit. Crew morale suffering.', severity: 'critical' });
      }

      state.addNotification({
        type: 'story', title: `DAY ${newDay} REPORT`,
        message: `${netSov >= 0 ? '+' : ''}${netSov} sov, ${netSupplies >= 0 ? '+' : ''}${netSupplies} supplies, +${totalMat} mat, +${totalIntel} intel.${showDeficit ? ' SUPPLY DEFICIT.' : ''}`,
      });

      const atRisk = checkTerritoryMorale(get().territoryStates);
      if (atRisk.length > 0) {
        const islandNames = atRisk.map((id) => { const island = get().islands.find((i) => i.id === id); return island?.name || id; }).join(', ');
        audioManager.playSfx('warning');
        rpt.push({ category: 'territory', icon: '🔥', text: `Rebellion risk at: ${islandNames}. Visit or invest before they slip away.`, severity: 'critical' });
      }
    };

    /** Phase 6: Random events -- roll, apply, track. */
    const processRandomEvents = (rpt: DailyReportEntry[]) => {
      const event = rollRandomEvent({ dayCount: newDay, gamePhase: get().gamePhase, flags: get().flags, firedEventIds: get().firedEventIds });
      if (!event) return;

      if (event.choices && event.choices.length > 0) {
        // Choice events: set pending + track fired in one call
        set((s) => ({
          pendingRandomEvent: { event, resultText: null },
          ...(!event.repeatable ? { firedEventIds: [...s.firedEventIds, event.id] } : {}),
        }));
        rpt.push({ category: 'event', icon: '📜', text: event.notification.title + ' (awaiting your decision)', severity: 'warning' });
      } else {
        // Auto-resolve events: batch resources + fired tracking
        const currentRes = get().resources;
        const controlledCount = get().islands.filter(i => i.status === 'controlled').length;
        const scaled = event.resourceChanges
          ? scaleEventRewards(event.resourceChanges, { dayCount: newDay, gamePhase: get().gamePhase, territoryCount: controlledCount })
          : null;
        set((s) => ({
          ...(scaled ? {
            resources: {
              sovereigns: Math.max(0, currentRes.sovereigns + (scaled.sovereigns || 0)),
              supplies: Math.max(0, currentRes.supplies + (scaled.supplies || 0)),
              materials: Math.max(0, currentRes.materials + (scaled.materials || 0)),
              intelligence: Math.max(0, currentRes.intelligence + (scaled.intelligence || 0)),
            },
          } : {}),
          ...(!event.repeatable ? { firedEventIds: [...s.firedEventIds, event.id] } : {}),
        }));
        rpt.push({ category: 'event', icon: '📜', text: event.notification.title, severity: 'info' });
        const evtState = get();
        const evtCtx = buildEventContext({
          islands: evtState.islands, crew: evtState.crew, currentIsland: evtState.currentIsland,
          reputation: evtState.mc.reputation, infamy: evtState.mc.infamy, bounty: evtState.mc.bounty,
          threatLevel: evtState.threatState.level, wardenseaAlert: evtState.threatState.wardenseaAlert,
          dayCount: newDay, gamePhase: evtState.gamePhase,
        });
        get().addNotification({ type: event.notification.type, title: interpolateText(event.notification.title, evtCtx), message: interpolateText(event.notification.message, evtCtx) });
      }
    };

    /** Phase 7: Grimoire broadcasts -- world commentary, one-shot flag cleanup. */
    const processGrimoireBroadcasts = (rpt: DailyReportEntry[]) => {
      const bState = get();
      const crewMoods: Record<string, string> = {};
      bState.crew.filter((m) => m.recruited).forEach((m) => { crewMoods[m.id] = m.mood; });
      const broadcastCtx: BroadcastContext = {
        dayCount: bState.dayCount, gamePhase: bState.gamePhase, flags: bState.flags,
        bounty: bState.mc.bounty, reputation: bState.mc.reputation, infamy: bState.mc.infamy,
        territoryCount: bState.islands.filter((i) => i.status === 'controlled').length,
        crewMoods, supplies: bState.resources.supplies, sovereigns: bState.resources.sovereigns,
        currentIsland: bState.currentIsland,
        playerArchetype: getPlayerArchetype(bState.playerProfile),
      };
      const { broadcasts, updatedDays } = generateGrimoireBroadcasts(broadcastCtx, bState.grimoireBroadcastDays);
      if (broadcasts.length > 0) {
        set({ grimoireBroadcastDays: updatedDays });
        stingerManager.play('grimoire_ping');
        broadcasts.forEach((b) => {
          rpt.push({ category: 'broadcast', icon: '📡', text: b.title, severity: 'info' });
          get().addNotification({ type: 'grimoire', title: b.title, message: b.message });
        });
      }
      if (get().flags['territory_recently_lost']) {
        get().setFlag('territory_recently_lost', false);
      }
    };

    // ==========================================
    // COORDINATOR: Call phases in order
    // ==========================================
    const upkeepCtx = processDailyUpkeep();
    processTradeRoutes(report);
    const bountyHunterCombat = processWardenThreat(report);
    processCrewDuties(report, newDay, upkeepCtx.territoryIncome);
    processTerritoryEvents(report, upkeepCtx.territoryIncome);
    buildEconomyReport(report, upkeepCtx);
    processCrewMorale(report, controlledIslands.length > 0 ? upkeepCtx.territoryDeficit : upkeepCtx.deficit);
    processRandomEvents(report);
    get().processWorldReactions();
    processGrimoireBroadcasts(report);

    // Set the daily report for modal display
    if (report.length > 0) {
      set({ pendingDailyReport: report });
    }

    // Trigger bounty hunter combat after daily report is dismissed
    if (bountyHunterCombat) {
      const combatId = bountyHunterCombat;
      // Delay combat start so the daily report shows first
      trackedTimeout(() => {
        const s = get();
        if (!s.combatState && !s.currentScene && !s.pendingRandomEvent && !s.pendingDayEvent && combatRegistry[combatId]) {
          s.startCombat(combatId);
        }
      }, TIME.COMBAT_TRIGGER_DELAY);
    }

    // === STORY SCENE TRIGGERS ===
    processStorySceneTriggers();

    // === LOSS CONDITION CHECKS ===
    processLossConditions(newDay);
  },

  setGamePhase: (phase) => {
    const oldPhase = get().gamePhase;
    set({ gamePhase: phase });
    // Act transition stinger
    if (phase !== oldPhase && (phase === 'act2' || phase === 'act3')) {
      stingerManager.play('act_transition');
    }
  },

  setFlag: (key, value) => {
    const prevFlags = get().flags;
    const extraFlags: Record<string, boolean | number | string> = {};
    // Auto-store the day when a conquest flag is first set (for relative timing)
    if (value === true && key.endsWith('_conquered') && !prevFlags[key]) {
      extraFlags[`${key}_day`] = get().dayCount;
    }
    set((state) => ({
      flags: { ...state.flags, [key]: value, ...extraFlags },
    }));

    // Check if any objective just completed from this flag change
    if (value === true) {
      const newFlags = get().flags;

      // Direct completion: flag matches an objective's completionFlag
      allObjectives.forEach((obj) => {
        if (obj.completionFlag === key && !prevFlags[obj.completionFlag]) {
          audioManager.playSfx('objective_complete');
          get().addNotification({
            type: 'story',
            title: `${obj.icon} OBJECTIVE COMPLETE`,
            message: `${obj.title} - ${obj.description}`,
          });
        }
      });

      // Synthetic objectives - check multi-flag completions
      // Northern Arc Complete: requires all 3 northern islands
      const wasNorthernComplete = prevFlags['tavven_conquered'] && prevFlags['keldriss_conquered'] && prevFlags['durrek_conquered'];
      const isNorthernComplete = newFlags['tavven_conquered'] && newFlags['keldriss_conquered'] && newFlags['durrek_conquered'];
      if (isNorthernComplete && !wasNorthernComplete) {
        get().setFlag('northern_arc_complete', true);
        const nObj = allObjectives.find((o) => o.id === 'northern_arc_complete');
        if (nObj) {
          get().addNotification({
            type: 'story',
            title: `${nObj.icon} OBJECTIVE COMPLETE`,
            message: `${nObj.title} - The Northern Arc is yours. The Conquerors will notice.`,
          });
        }
      }

      // Talked to all crew
      const crewFlags = ['delvessa_event_01_complete', 'dragghen_event_01_complete', 'kovesse_event_01_complete', 'suulen_event_01_complete', 'tessek_event_01_complete', 'orren_event_01_complete', 'vorreth_event_01_complete'];
      const wasTalkedAll = crewFlags.every((f) => prevFlags[f]);
      const isTalkedAll = crewFlags.every((f) => newFlags[f]);
      if (isTalkedAll && !wasTalkedAll) {
        get().setFlag('talked_to_all_crew', true);
        const cObj = allObjectives.find((o) => o.id === 'talk_to_crew');
        if (cObj) {
          get().addNotification({
            type: 'story',
            title: `${cObj.icon} OBJECTIVE COMPLETE`,
            message: `${cObj.title} - You know your crew. They know you.`,
          });
        }
      }
    }
  },

  getFlag: (key) => get().flags[key],

  // --- MC ---
  updateMC: (updates) => set((state) => ({
    mc: { ...state.mc, ...updates },
  })),

  addBounty: (amount) => set((state) => ({
    mc: { ...state.mc, bounty: Math.max(0, Math.min(999999999, state.mc.bounty + amount)) },
  })),

  addTerritory: (islandId) => set((state) => ({
    mc: { ...state.mc, territory: state.mc.territory.includes(islandId) ? state.mc.territory : [...state.mc.territory, islandId] },
  })),

  trainDominion: (expression, xp) => {
    const state = get();
    const tBonuses = state.getTerritoryBonuses();
    const { newProfile, result } = applyDominionXP(
      state.mc.dominion,
      expression,
      xp,
      tBonuses.xpBonus || 0,
    );

    // Update MC dominion
    state.updateMC({ dominion: newProfile });

    // Notify on tier promotion
    if (result.promoted) {
      state.addNotification({
        type: 'conqueror',
        title: `${expression.toUpperCase()} DOMINION - ${result.newTier.toUpperCase()}`,
        message: getTierPromotionText(expression, result.newTier),
      });
    }

    return result;
  },

  advanceKorvaan: () => {
    const state = get();
    const current = state.mc.korvaan;
    const req = getKorvaanAdvanceReq(current);
    if (!req) return false;

    const next = getNextKorvaanStage(current);
    if (!next) return false;

    // Check Iron dominion level
    const ironLevel = state.mc.dominion.iron.level;
    const ironTierIdx = ['flicker', 'tempered', 'forged', 'prime', 'conqueror'].indexOf(state.mc.dominion.iron.tier);
    const effectiveIron = ironTierIdx * 100 + ironLevel;
    if (effectiveIron < req.minIronLevel) return false;

    // Check combat victories
    const victories = (state.flags['combat_victories'] as number) || 0;
    if (victories < req.minCombatVictories) return false;

    // Check resources
    if (state.resources.sovereigns < req.cost.sovereigns ||
        state.resources.supplies < req.cost.supplies ||
        state.resources.materials < req.cost.materials) return false;

    // Deduct cost
    state.updateResources({
      sovereigns: state.resources.sovereigns - req.cost.sovereigns,
      supplies: state.resources.supplies - req.cost.supplies,
      materials: state.resources.materials - req.cost.materials,
    });

    // Advance stage
    state.updateMC({ korvaan: next });

    // Set flags for quest tracking and codex unlock
    state.setFlag(`korvaan_${next}`, true);
    if (!state.flags['korvaan_explained']) state.setFlag('korvaan_explained', true);

    // Grant Iron dominion XP from training
    state.trainDominion('iron', 15);

    // Notification - show the delta gained, not the total
    const oldBonuses = getKorvaanBonuses(current);
    const newBonuses = getKorvaanBonuses(next);
    state.addNotification({
      type: 'conqueror',
      title: `KORVAAN - ${next.toUpperCase()}`,
      message: `${req.completionText} (+${newBonuses.attack - oldBonuses.attack} ATK, +${newBonuses.defense - oldBonuses.defense} DEF, +${newBonuses.hp - oldBonuses.hp} HP)`,
    });

    return true;
  },

  eatDragonFruit: () => {
    const state = get();
    const victories = (state.flags['combat_victories'] as number) || 0;
    const check = canEatDragonFruit(state.mc, victories);

    if (!check.canEat) return false;

    // Consume the fruit - no going back
    state.updateMC({
      dragonFruitEaten: true,
      godFruit: state.mc.godFruit ? { ...state.mc.godFruit, eaten: true } : undefined,
    });

    // Set tracking flags
    state.setFlag('dragon_fruit_eaten', true);
    state.setFlag('dragon_fruit_eaten_day', state.dayCount);

    // Grant dominion XP - the transformation supercharges everything
    state.trainDominion('iron', 25);
    state.trainDominion('sight', 15);
    state.trainDominion('king', 20);

    // Launch the transformation scene -- this is the biggest moment in the game
    state.startScene(dragonFruitActivationScene);
    set({ activePanel: 'story' });

    // Stat notification fires after the scene completes via onComplete
    const bonuses = getDragonFruitBonuses(true, false);
    state.addNotification({
      type: 'conqueror',
      title: 'THE DRAGON AWAKENS',
      message: `You are changed. The transformation is complete. (+${bonuses.attack} ATK, +${bonuses.defense} DEF, +${bonuses.hp} HP, +${bonuses.speed} SPD, 5 dragon combat actions unlocked)`,
    });

    return true;
  },

  // --- Crew ---
  recruitMember: (id) => {
    set((state) => ({
      crew: state.crew.map((m) =>
        m.id === id && m.alive ? { ...m, recruited: true, mood: 'content' } : m
      ),
      flags: { ...state.flags, has_recruited_crew: true, [`${id}_recruited`]: true },
    }));
    // Musical stinger: new crew member recruited
    stingerManager.play('crew_join');
  },

  updateCrewMember: (id, updates) => {
    // Character death stinger: if a living crew member is killed
    if (updates.alive === false) {
      const member = get().crew.find((m) => m.id === id);
      if (member?.alive) {
        stingerManager.play('character_death');
      }
    }
    set((state) => ({
      crew: state.crew.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    }));
  },

  adjustLoyalty: (id, amount) => {
    const oldMember = get().crew.find((m) => m.id === id);
    const oldMood = oldMember?.mood;

    set((state) => ({
      crew: state.crew.map((m) => {
        if (m.id !== id) return m;
        const newLoyalty = Math.max(CREW.LOYALTY_MIN, Math.min(CREW.LOYALTY_MAX, m.loyalty + amount));
        // Derive mood from loyalty thresholds - mood is always a function of loyalty
        const newMood = newLoyalty >= CREW.LOYALTY_DEVOTED ? 'loyal'
          : newLoyalty >= CREW.LOYALTY_CONTENT ? 'content'
          : newLoyalty >= CREW.LOYALTY_NEUTRAL ? 'uneasy'
          : newLoyalty >= CREW.LOYALTY_DISGRUNTLED ? 'disgruntled'
          : 'mutinous' as const;
        return { ...m, loyalty: newLoyalty, mood: newMood };
      }),
    }));

    // Fire notifications on mood transitions
    const updatedMember = get().crew.find((m) => m.id === id);
    if (updatedMember && oldMood && updatedMember.mood !== oldMood) {
      if (updatedMember.mood === 'disgruntled') {
        audioManager.playSfx('warning');
        get().addNotification({
          type: 'crew',
          title: `${updatedMember.name.toUpperCase()} - DISGRUNTLED`,
          message: `${updatedMember.name} is losing faith. Combat assists weakened.`,
        });
      } else if (updatedMember.mood === 'mutinous') {
        audioManager.playSfx('warning');
        get().addNotification({
          type: 'crew',
          title: `${updatedMember.name.toUpperCase()} - MUTINOUS`,
          message: `${updatedMember.name} is on the verge of desertion. Assist abilities disabled.`,
        });
      } else if (updatedMember.mood === 'loyal' && amount > 0) {
        get().addNotification({
          type: 'crew',
          title: `${updatedMember.name.toUpperCase()} - LOYAL`,
          message: `${updatedMember.name} fights without hesitation. Full combat effectiveness.`,
        });
      }
    }
  },

  // --- Islands ---
  selectIsland: (id) => set({ selectedIsland: id }),

  discoverIsland: (id) => set((state) => ({
    islands: state.islands.map((i) =>
      i.id === id && i.status === 'hidden' ? { ...i, status: 'discovered' } : i
    ),
  })),

  // conquerIsland: extracted to territoryActions.ts

  updateIsland: (id, updates) => set((state) => ({
    islands: state.islands.map((i) =>
      i.id === id ? { ...i, ...updates } : i
    ),
  })),

  // beginConquest: extracted to territoryActions.ts

  // --- Travel (extracted to travelActions.ts) ---
  ...createTravelActions(set, get, sceneRegistry, combatRegistry, trackedTimeout, applyChoiceEffects),

  // --- Resources ---
  updateResources: (updates) => set((state) => {
    const merged = { ...state.resources, ...updates };
    // Clamp all resource values to 0 minimum (prevent negative resources)
    return {
      resources: {
        sovereigns: Math.max(0, merged.sovereigns),
        supplies: Math.max(0, merged.supplies),
        materials: Math.max(0, merged.materials),
        intelligence: Math.max(0, merged.intelligence),
      },
    };
  }),

  spendResources: (costs) => {
    const { resources } = get();
    const canAfford = Object.entries(costs).every(
      ([key, value]) => resources[key as keyof Resources] >= (value as number)
    );
    if (!canAfford) return false;
    set((state) => {
      const newResources = { ...state.resources };
      Object.entries(costs).forEach(([key, value]) => {
        newResources[key as keyof Resources] = Math.max(0, newResources[key as keyof Resources] - (value as number));
      });
      return { resources: newResources };
    });
    return true;
  },

  // --- Story (delegated to storyActions.ts) ---
  ...createStoryActions(set, get, sceneRegistry, capArray, trackedTimeout),

  // --- Notifications ---
  addNotification: (notification) => set((state) => {
    const newNotif = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
      timestamp: Date.now(),
      read: false,
    };
    // Deduplicate: skip if an identical title+message already exists in the last 10 entries (within 60s)
    const isDupe = state.notifications.slice(0, 10).some(
      (n) => n.title === newNotif.title && n.message === newNotif.message && (Date.now() - n.timestamp) < 60000
    );
    if (isDupe) return {};
    const updated = [newNotif, ...state.notifications];
    return { notifications: updated.length > LIMITS.NOTIFICATIONS_MAX ? updated.slice(0, LIMITS.NOTIFICATIONS_MAX) : updated };
  }),

  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
  })),

  dismissDailyReport: () => set({ pendingDailyReport: null }),

  // --- Day Planner ---
  openDayPlanner: () => {
    // Guard: don't open planner while a day event is pending resolution
    if (get().pendingDayEvent) return;
    set({ dayPlannerOpen: true });
  },
  closeDayPlanner: () => set({ dayPlannerOpen: false }),
  executeDayAction: (action: DayAction) => {
    const state = get();
    set({ dayPlannerOpen: false });

    // Deduct base supply costs upfront (before event roll)
    // This ensures costs are always paid whether or not a narrative event fires
    const baseCosts: Record<string, number> = { train: DAY_ACTIONS.TRAIN_SUPPLY_COST, explore_local: DAY_ACTIONS.EXPLORE_SUPPLY_COST };
    const cost = baseCosts[action] || 0;
    if (cost > 0) {
      const res = get().resources;
      set({ resources: { ...res, supplies: Math.max(0, res.supplies - cost) } });
    }

    // Apply base trade run earnings upfront (before event roll)
    // This ensures the player always gets provisions from trading, even if an event fires
    if (action === 'trade_run') {
      const tradeRes = get().resources;
      const baseTradeSupplies = 5 + Math.floor(Math.random() * 6); // 5-10 supplies
      set({ resources: { ...tradeRes, supplies: tradeRes.supplies + baseTradeSupplies } });
    }

    // Roll for a narrative day action event
    const aliveCrew = state.crew
      .filter(m => m.recruited && m.alive)
      .map(m => m.id);
    const event = rollDayActionEvent({
      action,
      dayCount: state.dayCount,
      flags: state.flags,
      currentIsland: state.currentIsland,
      aliveCrew,
      firedEventIds: state.firedDayEventIds,
    });

    if (event) {
      // Show the event modal instead of resolving immediately
      set({ pendingDayEvent: { event, resultText: null, actionType: action } });
      return; // Don't advance day yet - wait for choice
    }

    // No event fired - apply flat fallback bonuses (original behavior)
    switch (action) {
      case 'rest':
        state.crew.filter(m => m.recruited && m.alive).forEach(m => {
          state.adjustLoyalty(m.id, DAY_ACTIONS.REST_LOYALTY_BONUS);
        });
        break;
      case 'train': {
        const dom = state.mc.dominion;
        const expressions: Array<'iron' | 'sight' | 'king'> = ['iron', 'sight', 'king'];
        const tierRank = ['flicker', 'tempered', 'forged', 'prime', 'conqueror'];
        const totalLvl = (expr: 'iron' | 'sight' | 'king') =>
          tierRank.indexOf(dom[expr].tier) * 100 + dom[expr].level;
        const best = expressions.reduce((a, b) => totalLvl(a) >= totalLvl(b) ? a : b);
        const xp = DAY_ACTIONS.TRAIN_XP_FALLBACK;
        const hasTrainer = state.crew.find(m => m.recruited && m.alive && m.assignment === 'trainer');
        state.trainDominion(best, xp + (hasTrainer ? DAY_ACTIONS.TRAIN_TRAINER_BONUS : 0));
        // Supply cost already deducted upfront
        break;
      }
      case 'explore_local': {
        const roll = Math.random();
        const res = get().resources;
        if (roll < DAY_ACTIONS.EXPLORE_MATERIAL_CHANCE) {
          const found = DAY_ACTIONS.EXPLORE_MATERIAL_MIN + Math.floor(Math.random() * DAY_ACTIONS.EXPLORE_MATERIAL_RANGE);
          set({ resources: { ...res, materials: res.materials + found } });
          state.addNotification({ type: 'story', title: 'DISCOVERY', message: `Found ${found} materials while exploring.` });
        } else if (roll < DAY_ACTIONS.EXPLORE_INTEL_CHANCE) {
          const found = DAY_ACTIONS.EXPLORE_INTEL_MIN + Math.floor(Math.random() * DAY_ACTIONS.EXPLORE_INTEL_RANGE);
          set({ resources: { ...res, intelligence: res.intelligence + found } });
          state.addNotification({ type: 'story', title: 'INTELLIGENCE', message: `Gathered ${found} intel from local contacts.` });
        } else if (roll < DAY_ACTIONS.EXPLORE_SOVEREIGN_CHANCE) {
          const found = DAY_ACTIONS.EXPLORE_SOVEREIGN_MIN + Math.floor(Math.random() * DAY_ACTIONS.EXPLORE_SOVEREIGN_RANGE);
          set({ resources: { ...res, sovereigns: res.sovereigns + found } });
          state.addNotification({ type: 'story', title: 'SALVAGE', message: `Found ${found} sovereigns worth of salvage.` });
        } else {
          state.addNotification({ type: 'story', title: 'NOTHING FOUND', message: 'The search turned up nothing of value today.' });
        }
        // Supply cost already deducted upfront
        break;
      }
      case 'manage_territory': {
        const currentIsland = state.currentIsland;
        const island = state.islands.find(i => i.id === currentIsland);
        if (island && island.status === 'controlled') {
          state.boostTerritoryMorale(currentIsland, 5);
          state.addNotification({ type: 'story', title: 'TERRITORY MANAGED', message: `Invested time in ${island.name}. Morale improved.` });
        } else {
          state.addNotification({ type: 'story', title: 'NO TERRITORY', message: 'You don\'t control this island.' });
        }
        break;
      }
      case 'trade_run': {
        // Quick trade run: earn sovereigns from local markets
        // (base supplies already applied upfront before event roll)
        const tradeRes = get().resources;
        const tradeEarnings = 10 + Math.floor(Math.random() * 15);
        // Batch: resources + panel switch in one set()
        set({
          resources: { ...tradeRes, sovereigns: tradeRes.sovereigns + tradeEarnings },
          activePanel: 'management',
        });
        state.addNotification({
          type: 'story',
          title: 'TRADE RUN',
          message: `Spent the day trading at the local markets. Earned ${tradeEarnings} sovereigns and picked up provisions.`,
        });
        break;
      }
      case 'defend_territory': {
        // Boost defense on the raid target island
        const threat = get().threatState;
        const targetId = threat.raidTarget;
        if (targetId) {
          const ts = get().territoryStates;
          const targetTerr = ts[targetId];
          if (targetTerr) {
            set({
              territoryStates: {
                ...ts,
                [targetId]: applyDefenseBonus(targetTerr),
              },
            });
          }
          // Morale boost from active defense
          state.crew.filter(m => m.recruited && m.alive).forEach(m => {
            state.adjustLoyalty(m.id, 2);
          });
          state.addNotification({
            type: 'wardensea',
            title: 'DEFENSES FORTIFIED',
            message: `Spent the day reinforcing defenses. +15 defense rating. Crew morale boosted.`,
          });
        } else {
          state.addNotification({
            type: 'story',
            title: 'NO THREAT',
            message: 'No imminent raid detected. Spent the day on general preparations.',
          });
        }
        break;
      }
    }

    // Advance the day after flat fallback action
    audioManager.playSfx('day_advance');
    get().advanceDay();
  },

  resolveDayEventChoice: (choiceId: string) => {
    const state = get();
    const pending = state.pendingDayEvent;
    if (!pending) return;

    const choice = pending.event.choices.find((c: { id: string }) => c.id === choiceId);
    if (!choice) return;

    // Check crew requirement for this specific choice
    if (choice.requiresCrew) {
      const crewMember = state.crew.find(m => m.id === choice.requiresCrew && m.recruited && m.alive);
      if (!crewMember) return;
    }

    // Unified effect pipeline (scaled rewards, includes dominionXP + equipment)
    const { succeeded, displayText, statChanges } = applyChoiceEffects(choice, { get, set, scale: true });

    // Track player behavioral archetype
    if (choice.choiceArchetype) {
      set((s) => ({ playerProfile: incrementProfile(s.playerProfile, choice.choiceArchetype!) }));
    }

    // Day action specifics: territory morale (needs targeting logic)
    if (succeeded && choice.moraleChange) {
      const isDefend = pending.actionType === 'defend_territory';
      const targetIslandId = isDefend ? get().threatState.raidTarget : null;
      const moraleTargetId = targetIslandId || get().currentIsland;
      const island = get().islands.find(i => i.id === moraleTargetId);
      if (island && island.status === 'controlled') {
        state.boostTerritoryMorale(moraleTargetId, choice.moraleChange);
      }
    }

    // Track non-repeatable events
    if (!pending.event.repeatable) {
      set((s) => ({ firedDayEventIds: [...s.firedDayEventIds, pending.event.id] }));
    }

    // Interpolate result text with game state before display
    const st = get();
    const eventCtx = buildEventContext({
      islands: st.islands, crew: st.crew, currentIsland: st.currentIsland,
      reputation: st.mc.reputation, infamy: st.mc.infamy, bounty: st.mc.bounty,
      threatLevel: st.threatState.level, wardenseaAlert: st.threatState.wardenseaAlert,
      dayCount: st.dayCount, gamePhase: st.gamePhase,
    });
    const interpolatedText = interpolateText(displayText, eventCtx);

    // Show result text in the modal (with stat change badges)
    set({ pendingDayEvent: { ...pending, resultText: interpolatedText, statChanges } });

    // Combat trigger
    if (succeeded && choice.triggerCombat) {
      const combatId = choice.triggerCombat;
      trackedTimeout(() => {
        const s = get();
        if (!s.combatState && !s.currentScene) {
          s.startCombat(combatId);
          set({ pendingDayEvent: null });
        }
      }, 2000);
    }
  },

  dismissDayEvent: () => {
    const pending = get().pendingDayEvent;

    // If this was a defend_territory action, apply the defense bonus
    // (narrative events return early before the fallback bonus, so we apply it here)
    if (pending?.actionType === 'defend_territory') {
      const threat = get().threatState;
      const targetId = threat.raidTarget;
      if (targetId) {
        const ts = get().territoryStates;
        const targetTerr = ts[targetId];
        if (targetTerr) {
          set({
            territoryStates: {
              ...ts,
              [targetId]: applyDefenseBonus(targetTerr),
            },
          });
        }
      }
    }

    set({ pendingDayEvent: null });
    // Now advance the day
    audioManager.playSfx('day_advance');
    get().advanceDay();
  },

  // --- Crew Assignment ---
  assignCrewRole: (crewId: string, role: CrewAssignment) => {
    const state = get();
    const crewMember = state.crew.find(m => m.id === crewId);

    // Validate crew exists and is eligible
    if (!crewMember) return;
    if (!crewMember.recruited || !crewMember.alive) return;
    if (crewMember.injured && role !== 'unassigned') return;

    // Unassign anyone else with this role (except 'unassigned'), then assign
    if (role !== 'unassigned') {
      const displaced = state.crew.filter(m => m.id !== crewId && m.assignment === role);
      displaced.forEach(m => {
        state.updateCrewMember(m.id, { assignment: 'unassigned' });
      });
    }
    state.updateCrewMember(crewId, { assignment: role });
  },

  giveCrewGift: (crewId: string) => {
    const state = get();
    const member = state.crew.find(m => m.id === crewId);
    if (!member || !member.recruited || !member.alive) return false;
    if (state.resources.sovereigns < CREW_BONUS.GIFT_COST) return false;

    // Cooldown check via flags
    const lastGiftDay = (state.flags[`crew_gift_${crewId}_day`] as number) || 0;
    if (state.dayCount - lastGiftDay < CREW_BONUS.GIFT_COOLDOWN_DAYS) return false;

    // Apply loyalty boost
    const newLoyalty = Math.min(100, member.loyalty + CREW_BONUS.GIFT_LOYALTY_BOOST);
    state.updateCrewMember(crewId, { loyalty: newLoyalty });

    // Deduct cost and set cooldown flag
    set({
      resources: { ...get().resources, sovereigns: Math.max(0, get().resources.sovereigns - CREW_BONUS.GIFT_COST) },
    });
    state.setFlag(`crew_gift_${crewId}_day`, state.dayCount);

    state.addNotification({
      type: 'crew',
      title: `CREW BONUS - ${member.name.toUpperCase()}`,
      message: `Spent ${CREW_BONUS.GIFT_COST} sovereigns on provisions and morale boost for ${member.name}. Loyalty +${CREW_BONUS.GIFT_LOYALTY_BOOST}.`,
    });

    audioManager.playSfx('purchase');
    return true;
  },

  // --- Equipment ---
  equipItem: (itemId: string) => {
    const state = get();
    const item = state.inventory.find(i => i.id === itemId);
    if (!item) return;

    // If something is already in that slot, move it back to inventory
    const currentEquipped = state.equipment[item.slot];
    const newInventory = state.inventory.filter(i => i.id !== itemId);
    if (currentEquipped) {
      newInventory.push(currentEquipped);
    }

    set({
      equipment: { ...state.equipment, [item.slot]: item },
      inventory: newInventory,
    });
    audioManager.playSfx('purchase');
  },

  unequipItem: (slot: EquipmentSlot) => {
    const state = get();
    const item = state.equipment[slot];
    if (!item) return;

    set({
      equipment: { ...state.equipment, [slot]: null },
      inventory: [...state.inventory, item],
    });
  },

  addToInventory: (item: Equipment) => {
    const current = get();
    // Prevent duplicates: don't add if already in inventory or equipped
    const inInventory = current.inventory.some(i => i.id === item.id);
    const equipped = Object.values(current.equipment).some(e => e?.id === item.id);
    if (inInventory || equipped) return;
    set({ inventory: [...current.inventory, item] });
  },

  // --- Trade Routes ---
  establishTradeRoute: (fromIsland: string, toIsland: string) => {
    const state = get();
    // Both endpoints must be controlled
    const fromControlled = state.islands.find(i => i.id === fromIsland)?.status === 'controlled';
    const toControlled = state.islands.find(i => i.id === toIsland)?.status === 'controlled';
    if (!fromControlled || !toControlled) return false;

    // Check if route already exists
    const exists = state.tradeRoutes.some(r =>
      (r.fromIsland === fromIsland && r.toIsland === toIsland) ||
      (r.fromIsland === toIsland && r.toIsland === fromIsland)
    );
    if (exists) return false;

    // Cost: sovereigns + materials (meaningful investment)
    // Trade discount from territory upgrades (Keldriss black market, etc.)
    const tBonuses = state.getTerritoryBonuses();
    const discountPct = Math.min(TRADE.ROUTE_DISCOUNT_CAP, tBonuses.tradeDiscount || 0);
    const sovCost = Math.max(TRADE.ROUTE_SOV_MIN, Math.floor(TRADE.ROUTE_SOV_COST * (1 - discountPct / 100)));
    const matCost = Math.max(TRADE.ROUTE_MAT_MIN, Math.floor(TRADE.ROUTE_MAT_COST * (1 - discountPct / 100)));
    const res = state.resources;
    if (res.sovereigns < sovCost || res.materials < matCost) return false;

    set({
      resources: { ...res, sovereigns: res.sovereigns - sovCost, materials: res.materials - matCost },
      tradeRoutes: [...state.tradeRoutes, {
        id: `route_${fromIsland}_${toIsland}`,
        fromIsland,
        toIsland,
        dailyIncome: TRADE.ROUTE_DAILY_INCOME,
        daysActive: 0,
      }],
    });
    return true;
  },


  // --- Combat (delegated to combatActions.ts) ---
  ...createCombatActions(set, get, combatRegistry, sceneRegistry, capArray, trackedTimeout),

  // --- Random Event Choices ---
  resolveRandomEventChoice: (choiceId: string) => {
    const state = get();
    const pending = state.pendingRandomEvent;
    if (!pending || !pending.event.choices) return;

    const choice = pending.event.choices.find(c => c.id === choiceId);
    if (!choice) return;

    // Unified effect pipeline (scaled rewards)
    const { succeeded, displayText, statChanges } = applyChoiceEffects(choice, { get, set, scale: true });

    // Track player behavioral archetype
    if (choice.choiceArchetype) {
      set((s) => ({ playerProfile: incrementProfile(s.playerProfile, choice.choiceArchetype!) }));
    }

    // Interpolate result text with game state before display
    const rst = get();
    const rEventCtx = buildEventContext({
      islands: rst.islands, crew: rst.crew, currentIsland: rst.currentIsland,
      reputation: rst.mc.reputation, infamy: rst.mc.infamy, bounty: rst.mc.bounty,
      threatLevel: rst.threatState.level, wardenseaAlert: rst.threatState.wardenseaAlert,
      dayCount: rst.dayCount, gamePhase: rst.gamePhase,
    });
    const rInterpolatedText = interpolateText(displayText, rEventCtx);

    // Random event specifics: notification + result display
    state.addNotification({
      type: pending.event.notification.type,
      title: pending.event.notification.title,
      message: rInterpolatedText,
    });
    set({ pendingRandomEvent: { ...pending, resultText: rInterpolatedText, statChanges } });

    // Combat trigger
    if (succeeded && choice.triggerCombat) {
      const combatId = choice.triggerCombat;
      trackedTimeout(() => {
        const s = get();
        if (!s.combatState && !s.currentScene) {
          s.startCombat(combatId);
          set({ pendingRandomEvent: null });
        }
      }, 2000);
    }
  },

  dismissRandomEvent: () => {
    set({ pendingRandomEvent: null });
  },

  // --- World Reactions ---
  processWorldReactions: () => {
    const state = get();
    const readyReactions = getReadyReactions({
      dayCount: state.dayCount,
      flags: state.flags,
      storyHistory: state.storyHistory,
      gamePhase: state.gamePhase,
      firedReactionIds: state.firedReactionIds,
    });

    if (readyReactions.length > 0) {
      const newFiredIds = [...state.firedReactionIds];

      // Stagger notifications slightly so toasts don't all appear at once
      readyReactions.forEach((reaction, index) => {
        newFiredIds.push(reaction.id);

        // Fire each notification with a small delay for staggered toast appearance
        trackedTimeout(() => {
          get().addNotification({
            type: reaction.notification.type,
            title: reaction.notification.title,
            message: reaction.notification.message,
          });
        }, index * 800); // 800ms between each notification
      });

      set({ firedReactionIds: newFiredIds });
    }
  },

  // --- Territory + Counter-Espionage (extracted to territoryActions.ts) ---
  ...createTerritoryActions(set, get, sceneRegistry),

  // --- Effect Processing ---
  applyEffects: (effects) => {
    const state = get();
    effects.forEach((effect) => {
      switch (effect.type) {
        case 'bounty':
          state.addBounty(effect.value as number);
          break;
        case 'reputation':
          state.updateMC({ reputation: Math.max(0, Math.min(TERRITORY.REPUTATION_MAX, state.mc.reputation + (effect.value as number))) });
          break;
        case 'infamy':
          state.updateMC({ infamy: Math.max(0, Math.min(TERRITORY.REPUTATION_MAX, state.mc.infamy + (effect.value as number))) });
          break;
        case 'loyalty':
          if (effect.target) state.adjustLoyalty(effect.target, effect.value as number);
          break;
        case 'resource':
          if (effect.target) {
            state.updateResources({
              [effect.target]: state.resources[effect.target as keyof Resources] + (effect.value as number),
            });
          }
          break;
        case 'flag':
          if (effect.target) {
            state.setFlag(effect.target, effect.value);
            // Track day when Tavven was conquered (for rival intro timing)
            if (effect.target === 'tavven_conquered' && effect.value === true) {
              state.setFlag('tavven_conquered_day', state.dayCount);
            }
            // Dragon Fruit eaten early in prologue - sync MC state
            if (effect.target === 'dragon_fruit_eaten_early' && effect.value === true) {
              state.updateMC({
                dragonFruitEaten: true,
                godFruit: state.mc.godFruit ? { ...state.mc.godFruit, eaten: true } : undefined,
              });
              state.setFlag('dragon_fruit_eaten', true);
              state.setFlag('dragon_fruit_eaten_day', state.dayCount);
            }
          }
          break;
        case 'flag_increment':
          if (effect.target) {
            const current = (state.flags[effect.target] as number) || 0;
            state.setFlag(effect.target, current + (effect.value as number));
          }
          break;
        case 'unlock':
          if (effect.target) state.discoverIsland(effect.target);
          break;
        case 'scene':
          if (effect.target && sceneRegistry[effect.target]) {
            const nextScene = sceneRegistry[effect.target];
            set({
              currentScene: { ...nextScene, currentBeat: 0 },
              isTyping: true,
            });
          }
          break;
        case 'recruit':
          if (effect.target) state.recruitMember(effect.target);
          break;
        case 'notification':
          if (effect.notification) {
            state.addNotification({
              type: effect.notification.type,
              title: effect.notification.title,
              message: effect.notification.message,
            });
          }
          break;
        case 'phase':
          state.setGamePhase(effect.value as GamePhase);
          break;
        case 'panel':
          state.setActivePanel(effect.value as GamePanel);
          break;
        case 'conquer':
          if (effect.target) {
            const rawApproach = (state.flags['conquest_approach'] as string) || 'force';
            const approach = (['force', 'negotiation', 'economic', 'subversion'] as ConquestApproach[]).includes(rawApproach as ConquestApproach)
              ? (rawApproach as ConquestApproach)
              : 'force';
            state.conquerIsland(effect.target, approach);
          }
          break;
        case 'combat':
          if (effect.target) {
            // effect.target is the encounter ID in combatRegistry
            const encounter = combatRegistry[effect.target];
            if (encounter) {
              state.startCombatEncounter(encounter);
            }
          }
          break;
        case 'dominion':
          // effect.target = 'iron' | 'sight' | 'king', effect.value = XP amount
          if (effect.target) {
            state.trainDominion(
              effect.target as 'iron' | 'sight' | 'king',
              effect.value as number,
            );
          }
          break;
        case 'crew_identity':
          // effect.target = 'name' | 'flag', effect.value = the chosen value
          if (effect.target === 'name') {
            set({ crewIdentity: { ...get().crewIdentity, name: effect.value as string, named: true } });
          } else if (effect.target === 'flag') {
            set({ crewIdentity: { ...get().crewIdentity, flagDesign: effect.value as CrewFlagDesign } });
          }
          break;
      }
    });
  },

  // ==========================================
  // SHIP SYSTEM
  // ==========================================

  installShipUpgrade: (upgradeId) => {
    const state = get();
    const upgrade = getShipUpgrade(upgradeId);
    if (!upgrade) return false;

    // Already installed
    if (state.ship.upgrades.includes(upgradeId)) return false;

    // Check prerequisite
    if (upgrade.prerequisite && !state.ship.upgrades.includes(upgrade.prerequisite)) return false;

    // Check island requirement
    if (upgrade.requiresIsland && upgrade.requiresIsland !== state.currentIsland) return false;

    // Check day requirement
    if (upgrade.minDay && state.dayCount < upgrade.minDay) return false;

    // Check cost
    const cost = upgrade.cost;
    if ((cost.sovereigns || 0) > state.resources.sovereigns) return false;
    if ((cost.supplies || 0) > state.resources.supplies) return false;
    if ((cost.materials || 0) > state.resources.materials) return false;
    if ((cost.intelligence || 0) > state.resources.intelligence) return false;

    // Deduct cost
    const newResources = {
      sovereigns: Math.max(0, state.resources.sovereigns - (cost.sovereigns || 0)),
      supplies: Math.max(0, state.resources.supplies - (cost.supplies || 0)),
      materials: Math.max(0, state.resources.materials - (cost.materials || 0)),
      intelligence: Math.max(0, state.resources.intelligence - (cost.intelligence || 0)),
    };

    // Install upgrade and apply hull/cargo bonuses to ship
    const newShip = { ...state.ship };
    newShip.upgrades = [...newShip.upgrades, upgradeId];
    if (upgrade.effects.hull) {
      newShip.maxHull += upgrade.effects.hull;
      newShip.hull += upgrade.effects.hull; // also heal by the bonus amount
    }
    if (upgrade.effects.cargo) {
      newShip.maxCargo += upgrade.effects.cargo;
      newShip.cargo += upgrade.effects.cargo;
    }
    if (upgrade.effects.speed) {
      newShip.speed += upgrade.effects.speed;
    }

    set({ ship: newShip, resources: newResources });

    state.addNotification({
      type: 'story',
      title: 'UPGRADE INSTALLED',
      message: `${upgrade.name} installed on The Bastion. ${upgrade.description}`,
    });

    audioManager.playSfx('upgrade_complete');
    return true;
  },

  repairShip: (amount) => {
    const state = get();
    if (state.ship.hull >= state.ship.maxHull) return false;

    const matCost = Math.ceil(amount * SHIP.REPAIR_COST_PER_HP);
    const sovCost = Math.ceil(amount * SHIP.REPAIR_SOV_PER_HP);
    if (state.resources.materials < matCost || state.resources.sovereigns < sovCost) return false;

    const newHull = Math.min(state.ship.maxHull, state.ship.hull + amount);
    const actualRepair = newHull - state.ship.hull;
    const actualMatCost = Math.ceil(actualRepair * SHIP.REPAIR_COST_PER_HP);
    const actualSovCost = Math.ceil(actualRepair * SHIP.REPAIR_SOV_PER_HP);

    set({
      ship: { ...state.ship, hull: newHull },
      resources: {
        ...state.resources,
        materials: Math.max(0, state.resources.materials - actualMatCost),
        sovereigns: Math.max(0, state.resources.sovereigns - actualSovCost),
      },
    });

    state.addNotification({
      type: 'story',
      title: 'SHIP REPAIRED',
      message: `Hull repaired by ${actualRepair} points. (${actualMatCost} materials, ${actualSovCost} sovereigns)`,
    });

    return true;
  },

  // --- Save/Load (delegated to saveSystem.ts) ---
  ...createSaveActions(set, get, sceneRegistry, pendingTimeouts),

}));
