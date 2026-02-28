import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import { useGameStore } from '../../store/gameStore';
import {
  CombatState, CombatAction, CombatLogEntry,
  CombatAnimation, CrewAssist,
} from '../../types/combat';
import {
  executePlayerAction, playerEndTurn, executeEnemyTurn, processEndOfRound,
  checkCombatEnd, spawnNextWave, predictEnemyIntent, checkBossPhases,
  getAvailableCombos, computeTurnOrder, advanceTurnIndex,
} from '../../systems/combat';
import { COMBAT } from '../../constants/balance';
import { CrewCombo } from '../../types/combat';
import { getPortrait, getKaryudonPortrait, getCombatBackground, getImagePath } from '../../utils/images';
import GameIcon from '../UI/GameIcon';
import { audioManager } from '../../systems/audio';
import { TextureOverlay } from '../UI/TextureOverlay';


// ==========================================
// COMBAT PANEL - Where Karyudon breaks things
// Danzai in hand. Iron in the blood. Let's go.
// ==========================================

/** Map Dominion tier names to numeric values for unlock checks */
const TIER_RANK: Record<string, number> = {
  flicker: 1, tempered: 2, forged: 3, prime: 4, conqueror: 5,
};

/** Check if an action's unlock conditions are met */
function checkStatRequirement(
  stat: string,
  minValue: number,
  state: CombatState,
  mc: { dominion: { iron: { tier: string }; sight: { tier: string }; king: { tier: string } }; dragonFruitEaten: boolean },
): boolean {
  if (stat === 'kingMeter') return state.kingMeter >= minValue;
  if (stat === 'hp') return state.player.hp >= minValue;
  if (stat === 'sight_tier') return (TIER_RANK[mc.dominion.sight.tier] || 0) >= minValue;
  if (stat === 'iron_tier') return (TIER_RANK[mc.dominion.iron.tier] || 0) >= minValue;
  if (stat === 'king_tier') return (TIER_RANK[mc.dominion.king.tier] || 0) >= minValue;
  return true;
}

function isActionUnlocked(
  action: CombatAction,
  state: CombatState,
  mc: { dominion: { iron: { tier: string }; sight: { tier: string }; king: { tier: string } }; dragonFruitEaten: boolean },
): boolean {
  const cond = action.unlockCondition;
  if (!cond) return true; // No condition = always available

  // Check Dragon Fruit requirement (God Fruit abilities)
  if (cond.requireDragonFruit && !mc.dragonFruitEaten) {
    return false;
  }

  // Check primary stat requirement
  if (cond.stat && !checkStatRequirement(cond.stat, cond.minValue || 0, state, mc)) {
    return false;
  }

  // Check secondary stat requirement (e.g., Sight+King combo abilities)
  if (cond.secondaryStat && !checkStatRequirement(cond.secondaryStat, cond.secondaryMinValue || 0, state, mc)) {
    return false;
  }

  return true;
}

/** Convert tier number to readable name */
const TIER_NAME: Record<number, string> = {
  1: 'Flicker', 2: 'Tempered', 3: 'Forged', 4: 'Prime', 5: 'Conqueror',
};

/** Get a human-readable description of an ability's unlock requirements */
function getUnlockDescription(action: CombatAction): string | null {
  const cond = action.unlockCondition;
  if (!cond) return null;

  const parts: string[] = [];

  if (cond.requireDragonFruit) {
    parts.push('Dragon Fruit');
  }

  if (cond.stat) {
    if (cond.stat === 'kingMeter') {
      parts.push(`King Meter ${cond.minValue || 0}%`);
    } else if (cond.stat === 'hp') {
      parts.push(`HP >= ${cond.minValue || 0}`);
    } else if (cond.stat === 'iron_tier') {
      parts.push(`Iron: ${TIER_NAME[cond.minValue || 0] || cond.minValue}`);
    } else if (cond.stat === 'sight_tier') {
      parts.push(`Sight: ${TIER_NAME[cond.minValue || 0] || cond.minValue}`);
    } else if (cond.stat === 'king_tier') {
      parts.push(`King: ${TIER_NAME[cond.minValue || 0] || cond.minValue}`);
    }
  }

  if (cond.secondaryStat) {
    if (cond.secondaryStat === 'iron_tier') {
      parts.push(`Iron: ${TIER_NAME[cond.secondaryMinValue || 0] || cond.secondaryMinValue}`);
    } else if (cond.secondaryStat === 'sight_tier') {
      parts.push(`Sight: ${TIER_NAME[cond.secondaryMinValue || 0] || cond.secondaryMinValue}`);
    } else if (cond.secondaryStat === 'king_tier') {
      parts.push(`King: ${TIER_NAME[cond.secondaryMinValue || 0] || cond.secondaryMinValue}`);
    }
  }

  return parts.length > 0 ? parts.join(' + ') : null;
}

// ==========================================
// ANIMATION STATE REDUCER
// Consolidates 25+ animation-related useState hooks into one reducer
// to reduce per-render overhead and enable batch updates.
// ==========================================

interface AnimationState {
  shakeScreen: 'light' | 'heavy' | false;
  flashScreen: string | null;
  activeAnimation: string | null;
  showDamageNumber: {
    id: string; damage: number; x: number; y: number; isCrit: boolean; isSpecial: boolean;
  } | null;
  hurtEnemyId: string | null;
  playerHurt: boolean;
  showRoundBanner: boolean;
  killedEnemyId: string | null;
  showSlashTrail: boolean;
  showImpactBurst: { x: number; y: number; color: string } | null;
  showMoveName: string | null;
  showChargeGlow: boolean;
  comboDisplay: number;
  showCrewEntry: string | null;
  showEffectProc: string | null;
  showKingBurst: boolean;
  showLightningBolts: boolean;
  showSpeedLines: boolean;
  showCritFreeze: boolean;
  showCallout: string | null;
  showVsSplash: boolean;
  showInnerMonologue: string | null;
  showCinemaBars: boolean;
  showDominionAura: boolean;
  showTurnPulse: boolean;
  showDramaticZoom: boolean;
}

const initialAnimState: AnimationState = {
  shakeScreen: false,
  flashScreen: null,
  activeAnimation: null,
  showDamageNumber: null,
  hurtEnemyId: null,
  playerHurt: false,
  showRoundBanner: false,
  killedEnemyId: null,
  showSlashTrail: false,
  showImpactBurst: null,
  showMoveName: null,
  showChargeGlow: false,
  comboDisplay: 0,
  showCrewEntry: null,
  showEffectProc: null,
  showKingBurst: false,
  showLightningBolts: false,
  showSpeedLines: false,
  showCritFreeze: false,
  showCallout: null,
  showVsSplash: false,
  showInnerMonologue: null,
  showCinemaBars: false,
  showDominionAura: false,
  showTurnPulse: false,
  showDramaticZoom: false,
};

type AnimAction =
  | { type: 'SET'; field: keyof AnimationState; value: AnimationState[keyof AnimationState] }
  | { type: 'RESET' }
  | { type: 'BATCH'; updates: Partial<AnimationState> };

function animReducer(state: AnimationState, action: AnimAction): AnimationState {
  switch (action.type) {
    case 'SET': return { ...state, [action.field]: action.value };
    case 'RESET': return initialAnimState;
    case 'BATCH': return { ...state, ...action.updates };
    default: return state;
  }
}

export const CombatPanel: React.FC = () => {
  const combatState = useGameStore(s => s.combatState);
  const updateCombatState = useGameStore(s => s.updateCombatState);
  const endCombat = useGameStore(s => s.endCombat);
  const startCombatEncounter = useGameStore(s => s.startCombatEncounter);
  const crew = useGameStore(s => s.crew);
  const gamePhase = useGameStore(s => s.gamePhase);
  const mc = useGameStore(s => s.mc);

  // --- Animation state consolidated into a single reducer ---
  const [anim, animDispatch] = useReducer(animReducer, initialAnimState);

  // --- Functional states (semantically distinct, kept as individual useState) ---
  const [narrativeIndex, setNarrativeIndex] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState<'main' | 'crew' | null>('main');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'strike' | 'dominion' | 'defend' | 'special'>('all');
  const [showFullLog, setShowFullLog] = useState(false);
  const [bossPhaseIdx, setBossPhaseIdx] = useState(0);
  const [failedPortraits, setFailedPortraits] = useState<Set<string>>(new Set());
  const logRef = useRef<HTMLDivElement>(null);
  const prevKingBurstRef = useRef(false);
  const hasShownVs = useRef(false);
  const vsActiveRef = useRef(false);
  const hasShownFirstBlood = useRef(false);
  const lastHpRef = useRef<number | null>(null);
  const advanceCombatRef = useRef<(state: CombatState) => void>(() => {});
  const handleNarrativeClickRef = useRef<() => void>(() => {});

  // Timeout registry: tracks all pending timers, clears on unmount
  const pendingTimers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const safeTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      pendingTimers.current.delete(id);
      fn();
    }, ms);
    pendingTimers.current.add(id);
    return id;
  }, []);
  useEffect(() => {
    const timers = pendingTimers.current;
    return () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  const state = combatState;

  // Auto-scroll combat log
  useEffect(() => {
    if (logRef.current && state) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.combatLog.length]);

  // King Burst activation drama
  useEffect(() => {
    if (!state) return;
    if (state.kingBurstAvailable && !prevKingBurstRef.current) {
      // KING HAS AWAKENED - dramatic activation
      animDispatch({ type: 'BATCH', updates: { showKingBurst: true, flashScreen: 'purple', shakeScreen: 'heavy' } });
      audioManager.playSfx('combat_heavy');
      safeTimeout(() => {
        animDispatch({ type: 'BATCH', updates: { flashScreen: null, shakeScreen: false } });
      }, 600);
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showKingBurst', value: false }), 2500);
    }
    prevKingBurstRef.current = state.kingBurstAvailable;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.kingBurstAvailable]);

  // Reset combo display and narrative index on phase transitions
  useEffect(() => {
    if (state && (state.phase === 'narrative_intro' || state.phase === 'victory' || state.phase === 'defeat')) {
      animDispatch({ type: 'SET', field: 'comboDisplay', value: 0 });
      setNarrativeIndex(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.phase]);

  // === SHONEN: VS Splash on combat start (skippable via click or any key) ===
  useEffect(() => {
    if (state && state.phase === 'player_turn' && !hasShownVs.current) {
      hasShownVs.current = true;
      vsActiveRef.current = true;
      animDispatch({ type: 'BATCH', updates: { showVsSplash: true, showCinemaBars: true } });
      audioManager.playSfx('combat_heavy');
      safeTimeout(() => {
        vsActiveRef.current = false;
        animDispatch({ type: 'BATCH', updates: { showVsSplash: false, showCinemaBars: false } });
      }, 2200);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.phase]);

  // === SHONEN: Turn pulse on player turn ===
  useEffect(() => {
    if (state && state.phase === 'player_turn' && !state.animating && state.round > 1) {
      animDispatch({ type: 'SET', field: 'showTurnPulse', value: true });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showTurnPulse', value: false }), 1800);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.phase, state?.round]);

  // === SHONEN: Inner monologue at dramatic moments ===
  useEffect(() => {
    if (!state) return;
    const hpPercent = state.player.maxHp > 0 ? state.player.hp / state.player.maxHp : 0.5;
    const prevHp = lastHpRef.current;
    lastHpRef.current = hpPercent;

    // Low HP trigger -- first time dropping below 25%
    if (prevHp !== null && prevHp >= 0.25 && hpPercent < 0.25 && hpPercent > 0) {
      const lowHpLines = [
        '"Not yet... I haven\'t shown them anything yet."',
        '"Is this all I have? No. Not today."',
        '"Danzai feels heavier. Good. That means I\'m still holding it."',
        '"They think this is the end. They\'re wrong."',
      ];
      animDispatch({ type: 'SET', field: 'showInnerMonologue', value: lowHpLines[Math.floor(Math.random() * lowHpLines.length)] });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showInnerMonologue', value: null }), 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.player.hp]);

  // Reset shonen refs when combat changes
  useEffect(() => {
    hasShownVs.current = false;
    hasShownFirstBlood.current = false;
    lastHpRef.current = null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.encounter.id]);

  // Auto-select target + stun check: on player_turn, handle stun skip and auto-targeting
  useEffect(() => {
    if (!state || state.phase !== 'player_turn' || state.animating) return;

    // Check if player is stunned -- auto-skip turn if so
    if (state.player.statusEffects.some(e => e.type === 'stun')) {
      const stunLog: CombatLogEntry = {
        round: state.round,
        actor: state.player.name,
        action: 'Stunned',
        target: '',
        text: `${state.player.name} is stunned and cannot act!`,
        animation: 'slash',
      };
      const stunState: CombatState = {
        ...state,
        combatLog: [...state.combatLog, stunLog],
        animating: true,
      };
      updateCombatState(stunState);
      // After brief delay, advance to next combatant in turn order
      safeTimeout(() => {
        advanceCombatRef.current(stunState);
      }, COMBAT.TURN_POST_PLAYER_DELAY);
      return;
    }

    const alive = state.enemies.filter(e => e.isAlive);
    if (alive.length === 0) return;

    // If selected target is dead, clear it
    if (state.selectedTarget) {
      const targetAlive = alive.find(e => e.id === state.selectedTarget);
      if (!targetAlive) {
        // Target died -- auto-select next alive enemy
        updateCombatState({ ...state, selectedTarget: alive[0].id });
      }
      return; // Already have a valid target
    }

    // No target selected -- auto-select first alive enemy
    updateCombatState({ ...state, selectedTarget: alive[0].id });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.phase, state?.animating, state?.enemies]);

  // ==========================================
  // ENHANCED ANIMATION SYSTEM
  // ==========================================

  const triggerAnimation = useCallback((
    animation: CombatAnimation,
    damage?: number,
    targetId?: string,
    isCritical?: boolean,
    isSpecial?: boolean,
  ) => {
    animDispatch({ type: 'SET', field: 'activeAnimation', value: animation });

    // Screen shake - heavy for big moves, light for basic hits
    const heavyAnimations: CombatAnimation[] = ['screen_shake', 'thunder_strike', 'king_pressure'];
    const lightAnimations: CombatAnimation[] = ['heavy_smash', 'slash', 'counter'];

    if (heavyAnimations.includes(animation)) {
      animDispatch({ type: 'SET', field: 'shakeScreen', value: 'heavy' });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'shakeScreen', value: false }), 600);
    } else if (lightAnimations.includes(animation) && damage && damage > 20) {
      animDispatch({ type: 'SET', field: 'shakeScreen', value: 'light' });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'shakeScreen', value: false }), 400);
    }

    // Flash effects by animation type
    if (animation === 'flash_white' || animation === 'iron_pulse') {
      animDispatch({ type: 'SET', field: 'flashScreen', value: 'white' });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'flashScreen', value: null }), 250);
    }
    if (animation === 'flash_red') {
      animDispatch({ type: 'BATCH', updates: { flashScreen: 'red', playerHurt: true } });
      safeTimeout(() => animDispatch({ type: 'BATCH', updates: { flashScreen: null, playerHurt: false } }), 400);
    }
    if (animation === 'thunder_strike') {
      animDispatch({ type: 'BATCH', updates: { flashScreen: 'thunder', showLightningBolts: true } });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'flashScreen', value: null }), 350);
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showLightningBolts', value: false }), 1000);
    }
    if (animation === 'king_pressure') {
      animDispatch({ type: 'BATCH', updates: { flashScreen: 'purple', shakeScreen: 'heavy', showLightningBolts: true } });
      safeTimeout(() => {
        animDispatch({ type: 'BATCH', updates: { flashScreen: null, shakeScreen: false } });
      }, 800);
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showLightningBolts', value: false }), 1000);
    }

    // Enemy hurt animation
    if (targetId && targetId !== 'karyudon') {
      animDispatch({ type: 'SET', field: 'hurtEnemyId', value: targetId });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'hurtEnemyId', value: null }), 350);
    }

    // Player hurt when taking damage
    if (targetId === 'karyudon' && damage && damage > 0) {
      animDispatch({ type: 'BATCH', updates: { playerHurt: true, flashScreen: 'red' } });
      safeTimeout(() => animDispatch({ type: 'BATCH', updates: { playerHurt: false, flashScreen: null } }), 400);
    }

    // Damage number popup - scaled by damage amount
    if (damage && damage > 0) {
      const big = isCritical || isSpecial || damage > 45;
      animDispatch({ type: 'SET', field: 'showDamageNumber', value: {
        id: targetId || 'unknown',
        damage,
        x: Math.random() * 30 + 35,
        y: targetId === 'karyudon' ? 65 : 15 + Math.random() * 15,
        isCrit: isCritical || false,
        isSpecial: big,
      }});
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showDamageNumber', value: null }), big ? 1600 : 1200);
    }

    // --- ANIME OVERLAY TRIGGERS ---

    // SFX by animation type
    if (animation === 'slash') audioManager.playSfx('combat_sword');
    if (animation === 'heavy_smash') audioManager.playSfx('combat_heavy');
    if (animation === 'iron_pulse') audioManager.playSfx('combat_explosion');
    if (animation === 'thunder_strike') audioManager.playSfx('combat_explosion');
    if (animation === 'crew_assist') audioManager.playSfx('combat_crew_assist');
    if (animation === 'counter') audioManager.playSfx('combat_sword');
    if (animation === 'screen_shake') audioManager.playSfx('combat_hit');
    if (animation === 'king_pressure') audioManager.playSfx('combat_explosion');

    // Layer crunch on critical hits for extra impact
    if (isCritical && damage && damage > 0) {
      audioManager.playSfx('combat_crunch');
    }

    // Slash trail for physical strikes
    if (animation === 'slash' || animation === 'heavy_smash') {
      animDispatch({ type: 'SET', field: 'showSlashTrail', value: true });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showSlashTrail', value: false }), 450);
    }

    // Impact burst for enemy hits
    if (damage && damage > 0 && targetId && targetId !== 'karyudon') {
      const burstColor = animation === 'iron_pulse' || animation === 'thunder_strike'
        ? 'rgba(139, 92, 246, 0.6)'
        : animation === 'king_pressure'
          ? 'rgba(168, 85, 247, 0.8)'
          : isCritical
            ? 'rgba(251, 191, 36, 0.6)'
            : 'rgba(255, 255, 255, 0.5)';
      animDispatch({ type: 'SET', field: 'showImpactBurst', value: {
        x: 40 + Math.random() * 20,
        y: 15 + Math.random() * 15,
        color: burstColor
      }});
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showImpactBurst', value: null }), 550);
    }

    // Charge glow for specials
    if (isSpecial || animation === 'thunder_strike' || animation === 'king_pressure') {
      animDispatch({ type: 'SET', field: 'showChargeGlow', value: true });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showChargeGlow', value: false }), 500);
    }

    // Move name splash for specials
    if (isSpecial || animation === 'thunder_strike' || animation === 'king_pressure') {
      const moveName = animation === 'thunder_strike' ? 'THUNDER DANZAI'
        : animation === 'king_pressure' ? 'KING\'S PRESSURE'
        : animation === 'iron_pulse' ? 'FORGED IRON'
        : 'SPECIAL';
      animDispatch({ type: 'SET', field: 'showMoveName', value: moveName });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showMoveName', value: null }), 1300);
    }

    // === SHONEN: Speed lines on all attacks ===
    if (damage && damage > 0 && targetId !== 'karyudon') {
      animDispatch({ type: 'SET', field: 'showSpeedLines', value: true });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showSpeedLines', value: false }), 600);
    }

    // === SHONEN: Critical hit freeze-frame ===
    if (isCritical && damage && damage > 0) {
      animDispatch({ type: 'SET', field: 'showCritFreeze', value: true });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showCritFreeze', value: false }), 500);
    }

    // === SHONEN: Dramatic zoom on specials ===
    if (isSpecial || animation === 'thunder_strike' || animation === 'king_pressure') {
      animDispatch({ type: 'BATCH', updates: { showDramaticZoom: true, showDominionAura: true } });
      safeTimeout(() => animDispatch({ type: 'BATCH', updates: { showDramaticZoom: false, showDominionAura: false } }), 1000);
    }

    // === SHONEN: First Blood callout ===
    if (damage && damage > 0 && targetId !== 'karyudon' && !hasShownFirstBlood.current) {
      hasShownFirstBlood.current = true;
      animDispatch({ type: 'SET', field: 'showCallout', value: 'FIRST BLOOD' });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showCallout', value: null }), 1500);
    }

    safeTimeout(() => animDispatch({ type: 'SET', field: 'activeAnimation', value: null }), 600);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==========================================
  // TURN ORDER SEQUENCER
  // ==========================================

  /**
   * Core turn sequencer. Advances to the next combatant in speed order.
   * If it's the player's turn: hands control to the player (phase: player_turn).
   * If it's an enemy's turn: auto-executes their action, then advances again.
   * If the round is complete: processes end-of-round effects and starts fresh.
   */
  const advanceCombat = useCallback((currentState: CombatState) => {
    const { nextId, newIndex, roundComplete } = advanceTurnIndex(currentState);

    if (roundComplete) {
      // Round is over. Process end-of-round effects, then start a new round.
      safeTimeout(() => {
        // Check combat end before ticking (e.g., all enemies dead from last action)
        const preEndPhase = checkCombatEnd(currentState);
        if (preEndPhase) {
          if (preEndPhase === 'victory') audioManager.playSfx('combat_victory');
          if (preEndPhase === 'defeat') audioManager.playSfx('combat_defeat');
          updateCombatState({ ...currentState, phase: preEndPhase, animating: false });
          return;
        }

        // Tick effects, cooldowns, stamina regen, round counter
        const roundEndState = processEndOfRound(currentState);

        // Check for bleed/poison deaths from end-of-round ticks
        const postEndPhase = checkCombatEnd(roundEndState);
        if (postEndPhase) {
          if (postEndPhase === 'victory') audioManager.playSfx('combat_victory');
          if (postEndPhase === 'defeat') audioManager.playSfx('combat_defeat');
          updateCombatState({ ...roundEndState, phase: postEndPhase, animating: false });
          return;
        }

        // Recompute turn order for new round (speed buffs/debuffs may have changed order)
        roundEndState.turnOrder = computeTurnOrder(roundEndState);
        roundEndState.currentTurnIndex = -1; // Will be advanced to 0

        // Round transition banner
        animDispatch({ type: 'SET', field: 'showRoundBanner', value: true });
        safeTimeout(() => animDispatch({ type: 'SET', field: 'showRoundBanner', value: false }), 1500);

        // Start the new round's first turn
        advanceCombat(roundEndState);
      }, COMBAT.TURN_ADVANCE_DELAY);
      return;
    }

    // Update the turn index in state
    currentState = { ...currentState, currentTurnIndex: newIndex };

    if (!nextId) return; // Shouldn't happen, but safety

    // Is it the player's turn?
    if (nextId === 'karyudon') {
      updateCombatState({
        ...currentState,
        phase: 'player_turn',
        animating: false,
      });
      setShowActionMenu('main');
      return;
    }

    // It's an enemy's turn. Execute it automatically.
    const enemy = currentState.enemies.find((e) => e.id === nextId);
    if (!enemy || !enemy.isAlive) {
      // Dead enemy slipped through, advance again
      advanceCombat(currentState);
      return;
    }

    safeTimeout(() => {
      const { newState, logEntry } = executeEnemyTurn(currentState, enemy.id);

      if (logEntry.damage && logEntry.damage > 0) {
        triggerAnimation(logEntry.animation || 'flash_red', logEntry.damage, 'karyudon', logEntry.isCritical);
      } else if (logEntry.effects && logEntry.effects.length > 0) {
        triggerAnimation(logEntry.animation || 'slash');
      }

      // Show enemy move name for heavy attacks
      if (logEntry.action && logEntry.action !== 'Stunned' && logEntry.action !== 'Exhausted') {
        const isHeavy = logEntry.damage && logEntry.damage > 30;
        if (isHeavy) {
          animDispatch({ type: 'SET', field: 'showMoveName', value: `${enemy.name.toUpperCase()} - ${logEntry.action.toUpperCase()}` });
          safeTimeout(() => animDispatch({ type: 'SET', field: 'showMoveName', value: null }), 1100);
        }
      }

      // Preserve the updated turn index
      newState.currentTurnIndex = newIndex;
      updateCombatState({ ...newState, animating: true });

      // Check if player died
      if (newState.player.hp <= 0) {
        safeTimeout(() => {
          audioManager.playSfx('combat_defeat');
          updateCombatState({ ...newState, phase: 'defeat', animating: false });
        }, 800);
        return;
      }

      // Continue to next combatant in order
      advanceCombat(newState);
    }, COMBAT.TURN_ENEMY_DELAY);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerAnimation, updateCombatState]);

  // Keep ref in sync for use by useEffect stun handler
  advanceCombatRef.current = advanceCombat;

  // ==========================================
  // PLAYER ACTION HANDLER
  // ==========================================

  const handlePlayerAction = useCallback((action: CombatAction, targetId?: string) => {
    if (!state || state.phase !== 'player_turn' || state.animating) return;

    audioManager.playSfx('combat_hit');

    // Check stamina
    if (state.player.stamina < action.staminaCost) return;

    // Check cooldown
    if (action.currentCooldown > 0) return;

    // Check unlock conditions (Sight tier, King meter, etc.)
    if (!isActionUnlocked(action, state, mc)) return;

    // For single-target actions, require a target
    if (action.targetType === 'single' && !targetId) {
      const aliveEnemies = state.enemies.filter((e) => e.isAlive);
      if (aliveEnemies.length === 1) {
        targetId = aliveEnemies[0].id;
      } else {
        return;
      }
    }

    // Execute action
    const { newState, logEntry } = executePlayerAction(state, action, targetId);

    // Check if any enemies just died
    newState.enemies.forEach((enemy) => {
      const oldEnemy = state.enemies.find((e) => e.id === enemy.id);
      if (oldEnemy && oldEnemy.isAlive && !enemy.isAlive) {
        animDispatch({ type: 'SET', field: 'killedEnemyId', value: enemy.id });
        safeTimeout(() => animDispatch({ type: 'SET', field: 'killedEnemyId', value: null }), 1000);
        // === SHONEN: FINAL BLOW / CRUSHED callout ===
        const allDead = newState.enemies.every((e) => !e.isAlive);
        const callout = allDead ? 'FINISHED' : 'CRUSHED';
        animDispatch({ type: 'BATCH', updates: { showCallout: callout, showCritFreeze: true } });
        safeTimeout(() => animDispatch({ type: 'BATCH', updates: { showCallout: null, showCritFreeze: false } }), 1500);
      }
    });

    // Combo tracking - consecutive hits fuel the counter
    if (logEntry.damage && logEntry.damage > 0) {
      const newCombo = (state.comboCount || 0) + 1;
      newState.comboCount = newCombo;
      newState.lastMoveName = action.name;
      animDispatch({ type: 'SET', field: 'comboDisplay', value: newCombo });
      // === SHONEN: Combo milestone callouts ===
      if (newCombo === 5) {
        animDispatch({ type: 'SET', field: 'showCallout', value: 'RELENTLESS' });
        safeTimeout(() => animDispatch({ type: 'SET', field: 'showCallout', value: null }), 1500);
      } else if (newCombo === 10) {
        animDispatch({ type: 'SET', field: 'showCallout', value: 'UNSTOPPABLE' });
        safeTimeout(() => animDispatch({ type: 'SET', field: 'showCallout', value: null }), 1500);
      }
    } else {
      newState.comboCount = 0;
      animDispatch({ type: 'SET', field: 'comboDisplay', value: 0 });
    }

    // Effect proc display
    if (logEntry.effects && logEntry.effects.length > 0) {
      animDispatch({ type: 'SET', field: 'showEffectProc', value: `+${logEntry.effects[0].toUpperCase()}` });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showEffectProc', value: null }), 1100);
    }

    // Trigger enhanced animation
    const isSpecial = action.category === 'special';
    triggerAnimation(logEntry.animation, logEntry.damage, targetId, logEntry.isCritical, isSpecial);

    // Move name override for specials/dominion with actual action name
    if (action.category === 'special' || action.category === 'dominion') {
      animDispatch({ type: 'SET', field: 'showMoveName', value: action.name.toUpperCase() });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showMoveName', value: null }), 1300);
    }

    // Mark animating -- keep selectedTarget so player doesn't have to re-click
    newState.animating = true;
    newState.selectedAction = null;
    updateCombatState(newState);

    // After animation, check boss phase trigger, combat end, or proceed to enemy turns
    safeTimeout(() => {
      // Check boss phase trigger before combat end (boss might heal above 0)
      const bossPhaseState = checkBossPhases(newState);
      if (bossPhaseState) {
        // Boss phase triggered -- show narration, then continue to enemy turns
        updateCombatState(bossPhaseState);
        audioManager.playSfx('combat_cinematic_boom');
        return;
      }

      const endPhase = checkCombatEnd(newState);
      if (endPhase) {
        if (endPhase === 'wave_transition') {
          // Spawn next wave with fresh turn order
          const waveState = spawnNextWave(newState);
          animDispatch({ type: 'SET', field: 'showRoundBanner', value: true });
          safeTimeout(() => animDispatch({ type: 'SET', field: 'showRoundBanner', value: false }), 1500);
          // Start the new wave's first turn via speed order
          advanceCombat(waveState);
        } else {
          if (endPhase === 'victory') audioManager.playSfx('combat_victory');
          if (endPhase === 'defeat') audioManager.playSfx('combat_defeat');
          updateCombatState({ ...newState, phase: endPhase, animating: false });
        }
        return;
      }

      // Advance to next combatant in speed order
      advanceCombat(newState);
    }, isSpecial ? COMBAT.TURN_POST_SPECIAL_DELAY : COMBAT.TURN_POST_PLAYER_DELAY);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, triggerAnimation, updateCombatState, advanceCombat]);



  // ==========================================
  // CREW ASSIST HANDLER
  // ==========================================

  const handleCrewAssist = useCallback((assist: CrewAssist) => {
    if (!state || state.phase !== 'player_turn' || state.animating) return;
    if (assist.action.currentCooldown > 0) return;

    // For single-target assists, use selected target or auto-target first alive enemy
    const targetId = assist.action.targetType === 'single'
      ? (state.selectedTarget || state.enemies.find(e => e.isAlive)?.id)
      : undefined;

    // Mood scaling is already applied in getCrewAssists (combat.ts line 784-803)
    const { newState, logEntry } = executePlayerAction(state, assist.action, targetId);
    triggerAnimation(logEntry.animation, logEntry.damage, logEntry.target, logEntry.isCritical);

    // Show crew portrait entry
    const crewPortrait = assist.portrait || null;
    if (crewPortrait) {
      animDispatch({ type: 'SET', field: 'showCrewEntry', value: crewPortrait });
      safeTimeout(() => animDispatch({ type: 'SET', field: 'showCrewEntry', value: null }), 600);
    }
    // Show crew move name
    animDispatch({ type: 'SET', field: 'showMoveName', value: `${assist.crewName.toUpperCase()} - ${assist.action.name.toUpperCase()}` });
    safeTimeout(() => animDispatch({ type: 'SET', field: 'showMoveName', value: null }), 1300);

    // King's Domain: crew assists cost no cooldown while buff is active
    const hasKingsDomain = newState.player.statusEffects.some(
      (e) => e.name.includes('(Domain)')
    );
    newState.crewAssists = newState.crewAssists.map((ca) =>
      ca.crewId === assist.crewId && ca.action.id === assist.action.id
        ? { ...ca, action: { ...ca.action, currentCooldown: hasKingsDomain ? 0 : ca.action.cooldown + 1 } }
        : ca
    );

    newState.animating = true;
    updateCombatState(newState);

    safeTimeout(() => {
      // Check boss phase trigger before combat end (boss might heal above 0)
      const bossPhaseState = checkBossPhases(newState);
      if (bossPhaseState) {
        updateCombatState(bossPhaseState);
        audioManager.playSfx('combat_cinematic_boom');
        return;
      }

      const endPhase = checkCombatEnd(newState);
      if (endPhase) {
        if (endPhase === 'victory') audioManager.playSfx('combat_victory');
        if (endPhase === 'defeat') audioManager.playSfx('combat_defeat');
        updateCombatState({ ...newState, phase: endPhase, animating: false });
        return;
      }
      advanceCombat(newState);
    }, COMBAT.TURN_POST_PLAYER_DELAY);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, crew, triggerAnimation, updateCombatState, advanceCombat]);

  // ==========================================
  // CREW COMBO HANDLER
  // ==========================================

  const handleCrewCombo = useCallback((combo: CrewCombo) => {
    if (!state || state.phase !== 'player_turn' || state.animating) return;
    // Check cooldown from combat state
    const cd = state.comboCooldowns[combo.id] || 0;
    if (cd > 0) return;

    // For single-target combos, use selected target or auto-target first alive enemy
    const targetId = combo.action.targetType === 'single'
      ? (state.selectedTarget || state.enemies.find(e => e.isAlive)?.id)
      : undefined;

    const { newState, logEntry } = executePlayerAction(state, combo.action, targetId);
    const isSpecial = true;
    triggerAnimation(logEntry.animation, logEntry.damage, logEntry.target, logEntry.isCritical, isSpecial);

    // Show combo move name dramatically
    animDispatch({ type: 'SET', field: 'showMoveName', value: combo.name });
    safeTimeout(() => animDispatch({ type: 'SET', field: 'showMoveName', value: null }), 1600);

    audioManager.playSfx('combat_crew_assist');

    // Set combo cooldown (+1 because end-of-round ticks immediately on same round)
    newState.comboCooldowns = {
      ...newState.comboCooldowns,
      [combo.id]: combo.sharedCooldown + 1,
    };

    newState.animating = true;
    updateCombatState(newState);

    safeTimeout(() => {
      // Check boss phase
      const bossPhaseState = checkBossPhases(newState);
      if (bossPhaseState) {
        updateCombatState(bossPhaseState);
        audioManager.playSfx('combat_cinematic_boom');
        return;
      }
      const endPhase = checkCombatEnd(newState);
      if (endPhase) {
        if (endPhase === 'victory') audioManager.playSfx('combat_victory');
        if (endPhase === 'defeat') audioManager.playSfx('combat_defeat');
        updateCombatState({ ...newState, phase: endPhase, animating: false });
        return;
      }
      advanceCombat(newState);
    }, COMBAT.TURN_POST_SPECIAL_DELAY);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, triggerAnimation, updateCombatState, advanceCombat]);

  // ==========================================
  // NARRATIVE PHASE HANDLERS
  // ==========================================

  const handleNarrativeClick = useCallback(() => {
    if (!state) return;

    if (state.phase === 'narrative_intro') {
      const intro = state.encounter.narrativeIntro;
      if (narrativeIndex < intro.length - 1) {
        setNarrativeIndex((prev) => prev + 1);
      } else {
        // Intro done. Start first round using speed-based turn order.
        // currentTurnIndex is -1 from initialization, so advanceCombat
        // will advance to index 0 (the fastest combatant).
        setNarrativeIndex(0);
        advanceCombat(state);
      }
    } else if (state.phase === 'victory') {
      const victory = state.encounter.narrativeVictory;
      if (narrativeIndex < victory.length - 1) {
        setNarrativeIndex((prev) => prev + 1);
      } else {
        endCombat('victory');
      }
    } else if (state.phase === 'defeat') {
      const defeat = state.encounter.narrativeDefeat;
      if (narrativeIndex < defeat.length - 1) {
        setNarrativeIndex((prev) => prev + 1);
      } else {
        endCombat('defeat');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, narrativeIndex, updateCombatState, endCombat, advanceCombat]);

  // Keep narrative ref in sync for keyboard handler
  handleNarrativeClickRef.current = handleNarrativeClick;

  // ==========================================
  // KEYBOARD CONTROLS
  // ==========================================
  // Number keys: select actions. Tab: toggle menu. Enter/Space: advance narrative.
  // Arrow keys or Q/E: cycle target. Escape: toggle combat log.

  useEffect(() => {
    if (!state) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const key = e.key;

      // --- SKIP VS SPLASH: any key ---
      if (vsActiveRef.current) {
        e.preventDefault();
        vsActiveRef.current = false;
        animDispatch({ type: 'BATCH', updates: { showVsSplash: false, showCinemaBars: false } });
        return;
      }

      // --- NARRATIVE ADVANCE: Enter or Space ---
      if (key === 'Enter' || key === ' ') {
        // Boss phase narration
        if (state.bossPhaseNarration && state.bossPhaseNarration.length > 0) {
          e.preventDefault();
          // Find and click the boss phase overlay (it uses onClick on its container div)
          const overlay = document.querySelector('[data-combat-boss-phase]');
          if (overlay) (overlay as HTMLElement).click();
          return;
        }
        // Narrative screens (intro, victory, defeat)
        if (state.phase === 'narrative_intro' || state.phase === 'victory' || state.phase === 'defeat') {
          e.preventDefault();
          handleNarrativeClickRef.current();
          return;
        }
      }

      // R key: retry combat on defeat (only on final defeat paragraph)
      if (key === 'r' && state.phase === 'defeat') {
        const defeatLen = state.encounter.narrativeDefeat.length;
        if (narrativeIndex >= defeatLen - 1) {
          e.preventDefault();
          startCombatEncounter(state.encounter);
          return;
        }
      }

      // --- PLAYER TURN CONTROLS ---
      if (state.phase === 'player_turn' && !state.animating) {
        // Tab: toggle between main and crew action menus
        if (key === 'Tab') {
          e.preventDefault();
          setShowActionMenu(prev => prev === 'main' ? 'crew' : 'main');
          return;
        }

        // Escape: toggle combat log
        if (key === 'Escape') {
          e.preventDefault();
          setShowFullLog(prev => !prev);
          return;
        }

        // Arrow keys or Q/E: cycle enemy target
        const alive = state.enemies.filter(en => en.isAlive);
        if ((key === 'ArrowLeft' || key === 'ArrowRight' || key === 'q' || key === 'e') && alive.length > 1) {
          e.preventDefault();
          const currentIdx = alive.findIndex(en => en.id === state.selectedTarget);
          let nextIdx: number;
          if (key === 'ArrowRight' || key === 'e') {
            nextIdx = currentIdx < alive.length - 1 ? currentIdx + 1 : 0;
          } else {
            nextIdx = currentIdx > 0 ? currentIdx - 1 : alive.length - 1;
          }
          updateCombatState({ ...state, selectedTarget: alive[nextIdx].id });
          return;
        }

        // Number keys 1-9: select action from current tab
        const num = parseInt(key, 10);
        if (num >= 1 && num <= 9) {
          e.preventDefault();

          if (showActionMenu === 'main') {
            // Main actions: filter by category tab, then index
            const actions = categoryFilter === 'all'
              ? state.player.actions
              : state.player.actions.filter(a => {
                  const cat = a.category === 'crew' ? 'special' : a.category;
                  return cat === categoryFilter;
                });
            const idx = num - 1;
            if (idx < actions.length) {
              const action = actions[idx];
              const isLocked = !isActionUnlocked(action, state, mc);
              const onCooldown = action.currentCooldown > 0;
              const noStamina = state.player.stamina < action.staminaCost;
              const disabled = isLocked || onCooldown || noStamina;
              if (disabled) return;
              const needsTarget = action.targetType === 'single' && alive.length > 1;
              if (needsTarget && !state.selectedTarget) return;
              handlePlayerAction(action, state.selectedTarget || undefined);
            }
          } else if (showActionMenu === 'crew') {
            // Crew tab: combos first, then assists
            const availableCombos = getAvailableCombos(crew);
            const comboCount = availableCombos.length;
            const idx = num - 1;

            if (idx < comboCount) {
              // It's a combo
              const combo = availableCombos[idx];
              const cd = state.comboCooldowns[combo.id] || 0;
              if (cd > 0) return;
              handleCrewCombo(combo);
            } else {
              // It's a crew assist (after combos)
              const assistIdx = idx - comboCount;
              if (assistIdx < state.crewAssists.length) {
                const assist = state.crewAssists[assistIdx];
                if (assist.action.currentCooldown > 0) return;
                handleCrewAssist(assist);
              }
            }
          }
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, showActionMenu, mc, crew]);

  // Early return AFTER all hooks (React rules of hooks)
  if (!state) return null;

  // ==========================================
  // RENDER HELPERS
  // ==========================================

  /** Estimate effective damage vs target (no crit, no variance, no shields). */
  const estimateEffectiveDamage = (action: CombatAction, target?: typeof state.enemies[0]): number | null => {
    if (action.damage <= 0 || !target) return null;
    const player = state.player;

    // Base damage
    let base = action.damage + Math.floor(player.attack * COMBAT.ATTACK_STAT_MULTIPLIER);

    // Dominion scaling
    if (action.damageType === 'dominion_iron') base += Math.floor(player.dominion.iron * COMBAT.DOMINION_DAMAGE_SCALING);
    else if (action.damageType === 'dominion_king') base += Math.floor(player.dominion.king * COMBAT.DOMINION_DAMAGE_SCALING);
    else if (action.damageType === 'resonance') base += COMBAT.RESONANCE_FLAT_BONUS;

    // Attack buffs
    const atkBuffs = Math.min(COMBAT.ATTACK_BUFF_CAP, player.statusEffects
      .filter(e => e.type === 'buff_attack').reduce((s, e) => s + e.value, 0));
    base += atkBuffs;

    // Crew boost
    base += player.statusEffects.filter(e => e.type === 'crew_boost').reduce((s, e) => s + e.value, 0);

    // Weakened
    const weakened = player.statusEffects.filter(e => e.type === 'weaken').reduce((s, e) => s + e.value, 0);
    base = Math.max(1, base - weakened);

    // Target defense
    let def = target.defense;
    const exposeReduction = Math.min(COMBAT.EXPOSE_CAP, target.statusEffects.filter(e => e.type === 'expose').reduce((s, e) => s + e.value, 0));
    def = Math.max(0, def - exposeReduction);
    const defBuffs = Math.min(COMBAT.DEFENSE_BUFF_CAP, target.statusEffects.filter(e => e.type === 'buff_defense').reduce((s, e) => s + e.value, 0));
    def += defBuffs;

    // Defense reduction
    const flatRed = Math.floor(def * COMBAT.DEFENSE_FLAT_RATIO);
    const pctRed = 1 - Math.min(COMBAT.DEFENSE_PERCENT_CAP, def / COMBAT.DEFENSE_DIVISOR);
    return Math.max(1, Math.floor((base - flatRed) * pctRed));
  };

  const getHpColor = (hp: number, maxHp: number): string => {
    if (maxHp <= 0) return 'bg-red-500';
    const pct = hp / maxHp;
    if (pct > 0.5) return 'bg-green-500';
    if (pct > 0.25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryColor = (category: CombatAction['category']): string => {
    switch (category) {
      case 'strike': return 'border-red-500/50 hover:border-red-400 hover:bg-red-900/30';
      case 'dominion': return 'border-purple-500/50 hover:border-purple-400 hover:bg-purple-900/30';
      case 'special': return 'border-amber-500/50 hover:border-amber-400 hover:bg-amber-900/30';
      case 'defend': return 'border-blue-500/50 hover:border-blue-400 hover:bg-blue-900/30';
      case 'crew': return 'border-green-500/50 hover:border-green-400 hover:bg-green-900/30';
      default: return 'border-ocean-500/50';
    }
  };

  const renderCategoryIcon = (category: CombatAction['category']): React.ReactNode => {
    switch (category) {
      case 'strike': return <GameIcon iconKey="combat_attack" fallback="⚔️" className="w-5 h-5" />;
      case 'defend': return <GameIcon iconKey="combat_defend" fallback="🛡️" className="w-5 h-5" />;
      case 'dominion': return <span>⚡</span>;
      case 'special': return <span>🔥</span>;
      case 'crew': return <GameIcon iconKey="combat_crew" fallback="👥" className="w-5 h-5" />;
      default: return <span>✦</span>;
    }
  };

  // ==========================================
  // NARRATIVE PHASES (Intro / Victory / Defeat)
  // ==========================================

  if (state.phase === 'narrative_intro' || state.phase === 'victory' || state.phase === 'defeat') {
    const paragraphs = state.phase === 'narrative_intro'
      ? state.encounter.narrativeIntro
      : state.phase === 'victory'
        ? state.encounter.narrativeVictory
        : state.encounter.narrativeDefeat;

    return (
      <div
        className="h-full flex flex-col bg-ocean-900 cursor-pointer select-none relative"
        onClick={handleNarrativeClick}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/90 to-ocean-900/60" />

        {state.phase === 'victory' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-amber-500/5" />
            {/* Shonen victory energy particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div key={`victory_particle_${i}`} className="absolute w-1 h-1 bg-amber-400/40 rounded-full energy-particle"
                  style={{
                    left: `${15 + i * 10}%`,
                    bottom: '10%',
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${1.5 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          </>
        )}
        {state.phase === 'defeat' && (
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-red-900/10 to-transparent" />
        )}

        <div className="relative z-10 h-full flex flex-col">
          {/* Title */}
          <div className="px-8 pt-8 pb-4">
            <h2 className={`font-display font-bold tracking-wider drop-shadow-lg ${
              state.phase === 'victory'
                ? 'text-4xl text-amber-400 animate-slam-in'
                : state.phase === 'defeat'
                  ? 'text-4xl text-red-400 animate-slam-in'
                  : 'text-2xl text-crimson-400 animate-fade-in'
            }`}>
              {state.phase === 'narrative_intro' && state.encounter.title}
              {state.phase === 'victory' && '⚔️ VICTORY ⚔️'}
              {state.phase === 'defeat' && '💀 DEFEAT'}
            </h2>
            {state.encounter.subtitle && state.phase === 'narrative_intro' && (
              <p className="text-ocean-400 text-sm italic font-narration mt-1 animate-fade-in"
                 style={{ animationDelay: '200ms' }}>
                {state.encounter.subtitle}
              </p>
            )}
            <div className={`h-0.5 mt-3 transition-all duration-700 ${
              state.phase === 'victory' ? 'w-48 bg-gradient-to-r from-amber-500 to-transparent' :
              state.phase === 'defeat' ? 'w-32 bg-gradient-to-r from-red-500 to-transparent' :
              'w-24 bg-crimson-500/50'
            }`} />
          </div>

          {/* Narrative text */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
            {paragraphs.slice(0, narrativeIndex + 1).map((para, i) => (
              <p key={`narrative_${i}`} className="text-ocean-100 text-lg leading-relaxed font-narration font-medium story-line story-text-shadow"
                 style={{ animationDelay: `${i * 50}ms` }}>
                {para}
              </p>
            ))}

            {/* Victory rewards + combat stats */}
            {state.phase === 'victory' && narrativeIndex >= paragraphs.length - 1 && (() => {
              // Calculate combat stats from log
              const playerHits = state.combatLog.filter(l => l.actor === 'Karyudon' && l.damage && l.damage > 0);
              const totalDamage = playerHits.reduce((sum, l) => sum + (l.damage || 0), 0);
              const crits = playerHits.filter(l => l.isCritical).length;
              const enemiesDefeated = state.enemies.filter(e => !e.isAlive).length;

              return (
                <div className="mt-8 space-y-3 animate-fade-in">
                  <div className="w-full h-px bg-gradient-to-r from-amber-500/50 via-amber-500/20 to-transparent mb-4" />

                  {/* Combat stats */}
                  <div className="flex items-center gap-6 mb-4 text-xs">
                    <div className="text-center">
                      <span className="text-ocean-500 uppercase tracking-wider block font-display">Rounds</span>
                      <span className="text-ocean-200 font-display font-bold text-lg">{state.round}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-ocean-500 uppercase tracking-wider block font-display">Damage</span>
                      <span className="text-crimson-400 font-display font-bold text-lg">{totalDamage}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-ocean-500 uppercase tracking-wider block font-display">Crits</span>
                      <span className="text-gold-400 font-display font-bold text-lg">{crits}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-ocean-500 uppercase tracking-wider block font-display">Defeated</span>
                      <span className="text-ocean-200 font-display font-bold text-lg">{enemiesDefeated}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-ocean-500 uppercase tracking-wider block">HP Left</span>
                      <span className={`font-bold text-lg ${(state.player.maxHp > 0 ? state.player.hp / state.player.maxHp : 0) > 0.5 ? 'text-green-400' : (state.player.maxHp > 0 ? state.player.hp / state.player.maxHp : 0) > 0.2 ? 'text-amber-400' : 'text-crimson-400'}`}>
                        {Math.floor(state.player.hp)}
                      </span>
                    </div>
                  </div>

                  <p className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-3">
                    ✦ SPOILS OF WAR ✦
                  </p>
                  {state.encounter.rewards.map((reward, i) => (
                    <div key={i} className="flex items-center gap-3 text-ocean-200 text-sm animate-fade-in"
                         style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                      <span className="text-amber-400 text-lg">+</span>
                      <span className="font-bold">{reward.label}</span>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Defeat consequences hint + retry */}
            {state.phase === 'defeat' && narrativeIndex >= paragraphs.length - 1 && (
              <div className="mt-8 animate-fade-in">
                <div className="w-full h-px bg-gradient-to-r from-red-500/50 via-red-500/20 to-transparent mb-4" />
                <p className="text-red-400/80 text-sm italic mb-6">
                  The crew drags you back. Danzai still in hand. This isn't over.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startCombatEncounter(state.encounter);
                    }}
                    className="px-6 py-3 bg-crimson-600 hover:bg-crimson-500 text-white font-display font-bold tracking-wider rounded border border-crimson-400/30 transition-colors"
                    aria-label="Retry this fight"
                  >
                    RETRY FIGHT
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      endCombat('defeat');
                    }}
                    className="px-6 py-3 bg-ocean-700 hover:bg-ocean-600 text-ocean-200 font-display tracking-wider rounded border border-ocean-500/30 transition-colors"
                    aria-label="Accept defeat and continue"
                  >
                    ACCEPT DEFEAT
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Continue prompt */}
          <div className="px-8 py-4">
            <p className="text-ocean-400 text-sm italic tracking-wider animate-pulse">
              {state.phase === 'defeat' && narrativeIndex >= paragraphs.length - 1
               ? '[R] Retry · [Enter] Accept defeat'
               : state.phase === 'defeat' ? '[Enter] Continue...' :
               narrativeIndex < paragraphs.length - 1 ? '[Enter] Continue...' :
               state.phase === 'victory' ? '[Enter] Claim your spoils...' :
               '[Enter] Fight...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // BOSS PHASE NARRATION OVERLAY
  // ==========================================

  if (state.bossPhaseNarration && state.bossPhaseNarration.length > 0) {
    const phaseNarration = state.bossPhaseNarration;
    const handleBossPhaseClick = () => {
      if (bossPhaseIdx < phaseNarration.length - 1) {
        setBossPhaseIdx(bossPhaseIdx + 1);
      } else {
        // Clear narration and proceed to enemy turns
        const clearedState = {
          ...state,
          bossPhaseNarration: null,
          bossPhaseTitle: null,
          animating: true, // keep animating=true to prevent race condition during transition
        };
        setBossPhaseIdx(0);
        // Check combat end after phase (boss might have healed)
        const endPhase = checkCombatEnd(clearedState);
        if (endPhase) {
          updateCombatState({ ...clearedState, phase: endPhase, animating: false });
        } else {
          // Proceed to next combatant in turn order
          updateCombatState(clearedState);
          advanceCombat(clearedState);
        }
      }
    };

    return (
      <div
        className="h-full flex flex-col bg-ocean-900 cursor-pointer select-none relative"
        data-combat-boss-phase
        onClick={handleBossPhaseClick}
      >
        {/* Dramatic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-crimson-900/30 via-ocean-900/95 to-crimson-900/20" />
        <div className="absolute inset-0 animate-combat-shake-heavy" style={{ animationDuration: '0.3s' }}>
          <div className="absolute inset-0 bg-crimson-500/5" />
        </div>
        {/* Shonen cinema bars for boss phase */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-black cinema-bar-top" />
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black cinema-bar-bottom" />

        <div className="relative z-10 h-full flex flex-col">
          {/* Phase title */}
          <div className="px-8 pt-10 pb-4">
            <p className="text-crimson-500 text-xs font-bold tracking-[0.3em] uppercase mb-2 animate-fade-in">
              PHASE SHIFT
            </p>
            <h2 className="text-4xl font-display font-bold text-crimson-400 tracking-wider animate-slam-in drop-shadow-lg">
              {state.bossPhaseTitle || 'NEW PHASE'}
            </h2>
            <div className="h-0.5 w-32 bg-gradient-to-r from-crimson-500 to-transparent mt-3" />
          </div>

          {/* Narration text */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
            {phaseNarration.slice(0, bossPhaseIdx + 1).map((para, i) => (
              <p
                key={i}
                className="text-ocean-100 text-lg leading-relaxed font-narration font-medium story-line story-text-shadow"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Continue prompt */}
          <div className="px-8 py-4">
            <p className="text-crimson-400/70 text-sm italic tracking-wider animate-pulse">
              {bossPhaseIdx < phaseNarration.length - 1
                ? '[Enter] Continue...'
                : '[Enter] Resume combat...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ACTIVE COMBAT UI
  // ==========================================

  const aliveEnemies = state.enemies.filter((e) => e.isAlive);
  const selectedTarget = state.selectedTarget;
  const kingPercent = Math.min(100, state.kingMeter);

  return (
    <div className={`h-full flex flex-col bg-ocean-900 relative overflow-hidden select-none ${
      anim.shakeScreen === 'heavy' ? 'animate-combat-shake-heavy' :
      anim.shakeScreen === 'light' ? 'animate-combat-shake' : ''
    } ${kingPercent > 50 ? 'animate-king-border' : ''} ${
      anim.showDramaticZoom ? 'animate-dramatic-zoom' : ''
    }`}>
      {/* Texture overlay + panel frame */}
      <TextureOverlay variant="combat" />

      {/* Combat background image — visible and atmospheric */}
      {(() => {
        const enemyId = state.enemies[0]?.id;
        const bgImg = getCombatBackground(enemyId);
        return bgImg ? (
          <div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: `url(${bgImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.4) saturate(0.8)',
            }}
          />
        ) : null;
      })()}
      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, transparent 30%, rgba(4,8,16,0.7) 100%)' }}
      />

      {/* Screen flash overlay */}
      {anim.flashScreen && (
        <div className={`absolute inset-0 z-50 pointer-events-none ${
          anim.flashScreen === 'white' ? 'bg-white/30' :
          anim.flashScreen === 'red' ? 'bg-red-500/25 animate-player-hurt' :
          anim.flashScreen === 'purple' ? 'bg-purple-500/35 animate-king-pulse' :
          anim.flashScreen === 'thunder' ? 'animate-thunder-flash bg-amber-300/40' : ''
        }`} />
      )}

      {/* ===== ANIME OVERLAY EFFECTS ===== */}

      {/* Slash Trail - diagonal light sweep */}
      {anim.showSlashTrail && (
        <div className="absolute inset-0 z-40 pointer-events-none animate-slash-trail"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.4) 48%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 52%, transparent 60%)',
          }}
        />
      )}

      {/* ===== LIGHTNING / HAKI VFX ===== */}
      {anim.showLightningBolts && (
        <>
          {/* Afterglow - full screen amber electrical tint */}
          <div className="absolute inset-0 z-40 pointer-events-none animate-lightning-afterglow"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 40%, transparent 70%)',
            }}
          />

          {/* Haki crackling border - electrical energy at screen edges */}
          <div className="absolute inset-0 z-40 pointer-events-none animate-haki-crackle"
            style={{
              boxShadow: 'inset 0 0 60px 15px rgba(251,191,36,0.2), inset 0 0 120px 30px rgba(251,146,36,0.08)',
            }}
          />

          {/* PRIMARY BOLT - top-left to center-right, main jagged path */}
          <svg className="absolute inset-0 z-50 pointer-events-none animate-lightning-bolt" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points="15,2 18,12 12,18 20,25 14,32 22,38 16,42 25,48 18,55 28,60 22,65 30,72"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Core glow - amber */}
            <polyline
              points="15,2 18,12 12,18 20,25 14,32 22,38 16,42 25,48 18,55 28,60 22,65 30,72"
              fill="none"
              stroke="rgba(251,191,36,0.8)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'blur(2px)' }}
            />
            {/* Outer glow - crimson/amber bloom */}
            <polyline
              points="15,2 18,12 12,18 20,25 14,32 22,38 16,42 25,48 18,55 28,60 22,65 30,72"
              fill="none"
              stroke="rgba(220,80,20,0.4)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'blur(6px)' }}
            />
          </svg>

          {/* SECONDARY BOLT - top-right diagonal, fork pattern */}
          <svg className="absolute inset-0 z-50 pointer-events-none animate-lightning-fork" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points="82,5 78,15 85,22 76,30 82,36 74,44 80,50 72,58"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
            <polyline
              points="82,5 78,15 85,22 76,30 82,36 74,44 80,50 72,58"
              fill="none"
              stroke="rgba(251,191,36,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ filter: 'blur(2px)' }}
            />
            {/* Fork branch - splits at midpoint */}
            <polyline
              points="76,30 70,35 74,40 66,48 72,52"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.35"
              strokeLinecap="round"
            />
            <polyline
              points="76,30 70,35 74,40 66,48 72,52"
              fill="none"
              stroke="rgba(251,191,36,0.5)"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ filter: 'blur(2px)' }}
            />
          </svg>

          {/* TERTIARY BOLTS - thin background flickers */}
          <svg className="absolute inset-0 z-40 pointer-events-none animate-lightning-flicker" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Small bolt left side */}
            <polyline
              points="8,20 12,28 6,34 14,40"
              fill="none"
              stroke="rgba(251,191,36,0.5)"
              strokeWidth="0.4"
              strokeLinecap="round"
            />
            <polyline
              points="8,20 12,28 6,34 14,40"
              fill="none"
              stroke="rgba(251,191,36,0.3)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ filter: 'blur(3px)' }}
            />
            {/* Small bolt right side */}
            <polyline
              points="92,35 88,42 94,48 86,55"
              fill="none"
              stroke="rgba(251,191,36,0.4)"
              strokeWidth="0.35"
              strokeLinecap="round"
            />
            {/* Bottom crackle */}
            <polyline
              points="40,80 45,85 38,90 48,95"
              fill="none"
              stroke="rgba(251,191,36,0.35)"
              strokeWidth="0.3"
              strokeLinecap="round"
            />
            <polyline
              points="60,75 55,82 62,86 54,92"
              fill="none"
              stroke="rgba(251,191,36,0.3)"
              strokeWidth="0.3"
              strokeLinecap="round"
            />
          </svg>

          {/* CENTER IMPACT - large bolt striking down to enemy zone */}
          <svg className="absolute inset-0 z-50 pointer-events-none animate-lightning-bolt" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points="48,0 52,8 46,14 54,20 48,26 55,30 50,35 56,40 49,45"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="48,0 52,8 46,14 54,20 48,26 55,30 50,35 56,40 49,45"
              fill="none"
              stroke="rgba(251,191,36,0.9)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'blur(2px)' }}
            />
            <polyline
              points="48,0 52,8 46,14 54,20 48,26 55,30 50,35 56,40 49,45"
              fill="none"
              stroke="rgba(220,80,20,0.35)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'blur(8px)' }}
            />
            {/* Fork from center bolt */}
            <polyline
              points="54,20 60,24 56,30 64,34"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.4"
              strokeLinecap="round"
            />
            <polyline
              points="48,26 42,30 46,36 38,40"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="0.35"
              strokeLinecap="round"
            />
          </svg>
        </>
      )}

      {/* === SHONEN: Speed Lines overlay === */}
      {anim.showSpeedLines && (
        <div className="absolute inset-0 z-30 pointer-events-none animate-speed-lines rounded-full"
          style={{
            left: '-20%', right: '-20%', top: '-20%', bottom: '-20%',
          }}
        />
      )}

      {/* === SHONEN: Crit Freeze overlay === */}
      {anim.showCritFreeze && (
        <div className="absolute inset-0 z-30 pointer-events-none animate-crit-freeze" />
      )}

      {/* === SHONEN: Dramatic callout text === */}
      {anim.showCallout && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="animate-callout-dramatic">
            <span className="text-5xl md:text-6xl font-display font-black text-white tracking-[0.15em]"
              style={{
                textShadow: '0 0 30px rgba(251,191,36,0.6), 0 0 60px rgba(251,191,36,0.3), 0 4px 8px rgba(0,0,0,0.8)',
                WebkitTextStroke: '1px rgba(251,191,36,0.4)',
              }}>
              {anim.showCallout}
            </span>
          </div>
        </div>
      )}

      {/* === SHONEN: VS Splash on combat start (click or key to skip) === */}
      {anim.showVsSplash && state && (
        <div
          className="absolute inset-0 z-[60] flex items-center justify-center cursor-pointer"
          onClick={() => {
            vsActiveRef.current = false;
            animDispatch({ type: 'BATCH', updates: { showVsSplash: false, showCinemaBars: false } });
          }}
        >
          {/* Left panel -- player name */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-ocean-950/95 to-ocean-950/70 animate-vs-left flex items-center justify-end pr-6">
            <span className="text-gold-400 font-display font-black text-3xl tracking-[0.15em]"
              style={{ textShadow: '0 0 20px rgba(196,148,58,0.5), 0 0 40px rgba(196,148,58,0.2)' }}>
              KARYUDON
            </span>
          </div>
          {/* Right panel -- enemy name */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-crimson-950/95 to-crimson-950/70 animate-vs-right flex items-center justify-start pl-6">
            <span className="text-crimson-400 font-display font-black text-3xl tracking-wider"
              style={{ textShadow: '0 0 20px rgba(220,38,38,0.4)' }}>
              {state.enemies[0]?.name.toUpperCase() || 'ENEMY'}
            </span>
          </div>
          {/* VS text */}
          <span className="relative z-10 text-7xl font-display font-black text-white animate-vs-text"
            style={{
              textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(251,191,36,0.3)',
              WebkitTextStroke: '2px rgba(251,191,36,0.5)',
            }}>
            VS
          </span>
        </div>
      )}

      {/* === SHONEN: Inner monologue === */}
      {anim.showInnerMonologue && (
        <div className="absolute inset-x-0 bottom-40 z-50 pointer-events-none flex items-center justify-center px-8 animate-inner-monologue">
          <div className="bg-ocean-950/90 border-l-2 border-amber-500/60 px-6 py-3 max-w-md">
            <p className="text-amber-200/90 text-sm italic font-narration leading-relaxed story-text-shadow">
              {anim.showInnerMonologue}
            </p>
          </div>
        </div>
      )}

      {/* === SHONEN: Cinema black bars === */}
      {anim.showCinemaBars && (
        <>
          <div className="absolute top-0 left-0 right-0 z-[55] bg-black cinema-bar-top" />
          <div className="absolute bottom-0 left-0 right-0 z-[55] bg-black cinema-bar-bottom" />
        </>
      )}

      {/* === SHONEN: Turn pulse indicator === */}
      {anim.showTurnPulse && (
        <div className="absolute inset-x-0 top-1/3 z-30 pointer-events-none flex items-center justify-center animate-turn-pulse">
          <div className="bg-amber-500/10 border-y border-amber-500/30 px-16 py-2">
            <span className="text-amber-400 font-display font-bold text-lg tracking-[0.3em]"
              style={{ textShadow: '0 0 15px rgba(251,191,36,0.4)' }}>
              YOUR MOVE
            </span>
          </div>
        </div>
      )}

      {/* Impact Burst - radial flash at hit point */}
      {anim.showImpactBurst && (
        <div className="absolute z-40 pointer-events-none animate-impact-burst"
          style={{
            left: `${anim.showImpactBurst.x}%`,
            top: `${anim.showImpactBurst.y}%`,
            width: '120px',
            height: '120px',
            marginLeft: '-60px',
            marginTop: '-60px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${anim.showImpactBurst.color} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Move Name Splash Banner - anime style */}
      {anim.showMoveName && (
        <div className="absolute inset-x-0 top-1/4 z-50 pointer-events-none animate-move-splash flex items-center justify-center">
          <div className="bg-ocean-900/90 border-y-2 border-amber-500/80 px-8 py-2 transform -skew-x-6">
            <span className="text-amber-300 font-display font-black text-2xl tracking-[0.2em] drop-shadow-lg"
              style={{ textShadow: '0 0 20px rgba(251,191,36,0.5), 0 0 40px rgba(251,191,36,0.3)' }}>
              {anim.showMoveName}
            </span>
          </div>
        </div>
      )}

      {/* Combo Counter - top-right */}
      {anim.comboDisplay >= 2 && (
        <div className="absolute top-3 right-4 z-40 pointer-events-none animate-combo-pulse">
          <div className="text-right">
            <span className="text-amber-400 font-display font-black text-3xl drop-shadow-lg"
              style={{ textShadow: '0 0 15px rgba(251,191,36,0.4)' }}>
              x{anim.comboDisplay}
            </span>
            <p className="text-amber-500/70 text-xs font-bold tracking-widest">COMBO</p>
          </div>
        </div>
      )}

      {/* Crew Entry Portrait Slide */}
      {anim.showCrewEntry && (
        <div className="absolute left-0 bottom-32 z-40 pointer-events-none animate-crew-entry">
          <div className="w-16 h-16 rounded-sm border-2 border-green-400 overflow-hidden shadow-lg shadow-green-500/30">
            <img src={anim.showCrewEntry} alt="Crew" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Effect Proc Text - status effect float-up */}
      {anim.showEffectProc && (
        <div className="absolute z-40 pointer-events-none animate-effect-proc"
          style={{ left: '45%', top: '25%' }}>
          <span className="text-purple-300 font-display font-bold text-lg tracking-wider"
            style={{ textShadow: '0 0 10px rgba(168,85,247,0.6)' }}>
            {anim.showEffectProc}
          </span>
        </div>
      )}

      {/* KING BURST ACTIVATION - Full screen dramatic moment */}
      {anim.showKingBurst && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          {/* Purple vignette */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-900/30 to-purple-950/60 animate-pulse-slow" />
          {/* Central burst text */}
          <div className="text-center animate-move-name-splash">
            <div className="text-purple-300/60 text-sm tracking-[0.5em] font-display uppercase mb-2">
              Dormant King
            </div>
            <div className="text-5xl md:text-7xl font-display font-black text-purple-200 tracking-wider drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]"
                 style={{ textShadow: '0 0 60px rgba(168,85,247,0.5), 0 0 120px rgba(168,85,247,0.3)' }}>
              A W A K E N S
            </div>
            <div className="mt-4 text-amber-400/80 text-xs tracking-[0.4em] font-display uppercase">
              King's Pressure Unlocked
            </div>
          </div>
          {/* Purple particle lines radiating outward */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-purple-400/20 rounded-full animate-impact-burst" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-400/10 rounded-full animate-impact-burst" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      )}

      {/* Damage number popup - scaled by hit weight */}
      {anim.showDamageNumber && (
        <div
          className={`absolute z-40 pointer-events-none font-display font-bold drop-shadow-lg ${
            anim.showDamageNumber.isSpecial
              ? 'animate-damage-mega text-6xl'
              : anim.showDamageNumber.isCrit
                ? 'animate-damage-float-big text-4xl'
                : 'animate-damage-float text-2xl'
          } ${
            anim.showDamageNumber.isCrit
              ? 'text-amber-300'
              : anim.showDamageNumber.isSpecial
                ? 'text-purple-300'
                : anim.showDamageNumber.id === 'karyudon'
                  ? 'text-red-400'
                  : 'text-white'
          }`}
          style={{
            left: `${anim.showDamageNumber.x}%`,
            top: `${anim.showDamageNumber.y}%`,
            textShadow: anim.showDamageNumber.isSpecial
              ? '0 0 20px rgba(251, 191, 36, 0.6), 0 2px 4px rgba(0,0,0,0.8)'
              : '0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          {anim.showDamageNumber.isCrit && '💥 '}
          -{anim.showDamageNumber.damage}
        </div>
      )}

      {/* Round transition banner */}
      {anim.showRoundBanner && (
        <div className="absolute inset-x-0 top-1/3 z-30 flex items-center justify-center pointer-events-none animate-round-banner">
          <div className="bg-ocean-900/90 border-y border-crimson-500/50 px-12 py-3">
            <span className="text-crimson-400 font-display font-bold text-xl tracking-widest">
              ROUND {state.round}
            </span>
          </div>
        </div>
      )}

      {/* Top: Round counter + King Meter — fixed header */}
      <div className="h-10 px-4 flex items-center justify-between bg-ocean-900/90 border-b border-ocean-600/60 backdrop-blur-sm relative z-20 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-crimson-400 font-display font-bold text-sm tracking-wider">
            ROUND {state.round}
          </span>
          <span className={`text-xs font-bold tracking-wider ${
            state.phase === 'player_turn' ? 'text-amber-400' : 'text-red-400'
          }`}>
            {state.phase === 'player_turn' ? '▶ YOUR TURN' : '◀ ENEMY TURN'}
          </span>

          {/* Turn Order Tracker */}
          <div className="flex items-center gap-1 ml-2" title="Turn order (by speed)">
            {state.turnOrder.map((id, idx) => {
              const isPlayer = id === 'karyudon';
              const combatant = isPlayer ? state.player : state.enemies.find(e => e.id === id);
              const isAlive = combatant?.isAlive ?? false;
              const isCurrent = idx === state.currentTurnIndex;
              const hasActed = idx < state.currentTurnIndex || state.currentTurnIndex === -1;
              return (
                <div
                  key={id}
                  className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                    !isAlive
                      ? 'bg-ocean-800 border-ocean-700 opacity-30'
                      : isCurrent
                        ? isPlayer
                          ? 'bg-amber-400 border-amber-300 shadow-sm shadow-amber-400/50 scale-125'
                          : 'bg-crimson-400 border-crimson-300 shadow-sm shadow-crimson-400/50 scale-125'
                        : hasActed
                          ? isPlayer
                            ? 'bg-amber-800 border-amber-700 opacity-60'
                            : 'bg-crimson-800 border-crimson-700 opacity-60'
                          : isPlayer
                            ? 'bg-amber-600 border-amber-500'
                            : 'bg-crimson-600 border-crimson-500'
                  }`}
                  title={`${combatant?.name || id}${isCurrent ? ' (acting)' : ''}${!isAlive ? ' (dead)' : ''}`}
                />
              );
            })}
          </div>
        </div>

        {/* King Meter - enhanced */}
        <div className="flex items-center gap-2 group relative">
          <span className={`text-xs font-bold tracking-wider ${
            kingPercent >= 100 ? 'text-purple-300 animate-pulse' : 'text-purple-500'
          }`}>
            KING
          </span>
          <div className={`w-36 h-2.5 bg-ocean-700 rounded-full overflow-hidden relative ${
            kingPercent >= 100 ? 'animate-king-glow' : ''
          }`}>
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                kingPercent >= 100
                  ? 'bg-gradient-to-r from-purple-500 to-purple-300 shadow-lg shadow-purple-500/50'
                  : kingPercent > 60
                    ? 'bg-gradient-to-r from-purple-700 to-purple-500'
                    : 'bg-purple-700'
              }`}
              style={{ width: `${kingPercent}%` }}
            />
          </div>
          {state.kingBurstAvailable && (
            <span className="text-purple-200 text-xs font-black tracking-[0.3em] animate-pulse px-2 py-0.5 bg-purple-600/40 rounded-sm border border-purple-400/50 shadow-lg shadow-purple-500/30"
                  style={{ textShadow: '0 0 10px rgba(168,85,247,0.5)' }}>
              UNLEASH
            </span>
          )}
          {/* King Meter Tooltip */}
          <div className="absolute top-full right-0 mt-1 px-3 py-2 bg-ocean-900/95 border border-purple-500/40 rounded-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 w-56">
            <p className="text-purple-300 text-xs font-bold tracking-wider mb-1">KING DOMINION</p>
            <p className="text-ocean-300 text-xs leading-relaxed">
              Builds when you take damage. At 100%, unleash a devastating King Burst that damages all enemies and applies intimidate.
            </p>
            <p className="text-ocean-500 text-xs mt-1 font-mono">{Math.floor(kingPercent)}/100</p>
          </div>
        </div>
      </div>

      {/* ===== ENEMY ARENA — visual centerpiece ===== */}
      <div className="flex-[4] relative flex flex-wrap items-center justify-center gap-6 px-6 py-4 z-10 min-h-0">
        {/* Target selection prompt */}
        {state.phase === 'player_turn' && aliveEnemies.length > 1 && !selectedTarget && (
          <div className="absolute top-2 left-0 right-0 text-center z-20">
            <span className="text-crimson-300 text-xs font-bold tracking-wider animate-pulse">
              SELECT TARGET — Click or [&#8592;] [&#8594;]
            </span>
          </div>
        )}

        {/* Alive enemies as portrait cards */}
        {aliveEnemies.map((enemy) => {
          const isHurt = anim.hurtEnemyId === enemy.id;
          const isKilled = anim.killedEnemyId === enemy.id;
          const hpPercent = enemy.maxHp > 0 ? (enemy.hp / enemy.maxHp) * 100 : 0;

          return (
            <div key={enemy.id} className="flex flex-col items-center gap-1.5" style={{ width: 'clamp(100px, 30vw, 140px)' }}>
              {/* Portrait container — simple CSS border, no frame overlay */}
              <div
                style={{ width: 'clamp(110px, 35vw, 164px)', height: 'clamp(134px, 42vw, 200px)', position: 'relative' }}
                className={`cursor-pointer transition-all duration-200
                  ${selectedTarget === enemy.id ? 'scale-110' : ''}
                  ${isHurt ? 'animate-enemy-hurt' : ''}
                  ${isKilled ? 'animate-enemy-shatter' : ''}`}
                onClick={() => {
                  if (state.phase === 'player_turn' && !state.animating) {
                    updateCombatState({ ...state, selectedTarget: enemy.id });
                  }
                }}
              >
                {enemy.portrait && !failedPortraits.has(enemy.id) ? (
                  <img
                    src={enemy.portrait}
                    alt={enemy.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '4px', border: '3px solid #8B0000', boxShadow: '0 0 10px rgba(139,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.3)' }}
                    onError={() => setFailedPortraits(prev => new Set(prev).add(enemy.id))}
                  />
                ) : !failedPortraits.has(enemy.id) && getImagePath('generic_pirate.webp') ? (
                  <img
                    src={getImagePath('generic_pirate.webp')!}
                    alt={enemy.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '4px', border: '3px solid #8B0000', boxShadow: '0 0 10px rgba(139,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.3)' }}
                    onError={() => setFailedPortraits(prev => new Set(prev).add(enemy.id))}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '3px solid #8B0000', boxShadow: '0 0 10px rgba(139,0,0,0.3)' }} className="bg-gradient-to-b from-ocean-600 to-ocean-800">
                    <span className="text-3xl">&#9876;</span>
                  </div>
                )}
                {/* Selected target indicator */}
                {selectedTarget === enemy.id && (
                  <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
                    <span className="text-crimson-400 text-xs font-display font-bold tracking-wider animate-pulse drop-shadow-lg">&#9660; TARGET</span>
                  </div>
                )}
              </div>

              {/* Name */}
              <span className="text-ocean-100 text-sm font-display font-bold text-center leading-tight">{enemy.name}</span>
              {enemy.title && (
                <span className="text-ocean-400 text-xs italic font-narration text-center -mt-1">{enemy.title}</span>
              )}

              {/* HP Bar — outside portrait, wider, color-coded, 10px height */}
              <div className="w-full px-1">
                <div className="w-full h-[10px] bg-ocean-800 rounded overflow-hidden border border-ocean-600/50 shadow-inner">
                  <div
                    className={`h-full rounded hp-bar-damage transition-all duration-500 ${getHpColor(enemy.hp, enemy.maxHp)}`}
                    style={{ width: `${hpPercent}%` }}
                  />
                </div>
                <span className="text-ocean-400 text-xs text-center block mt-0.5 font-mono font-medium">
                  {Math.floor(enemy.hp)}/{Math.floor(enemy.maxHp)}
                </span>
              </div>

              {/* Status effects row */}
              {enemy.statusEffects.length > 0 && (
                <div className="flex gap-1 justify-center flex-wrap">
                  {enemy.statusEffects.map((e) => (
                    <span key={e.id} className="text-xs bg-ocean-800/60 px-1 py-0.5 rounded border border-ocean-700/40" title={e.name}>
                      <GameIcon iconKey={e.type} fallback={e.icon} className="w-4 h-4" />
                    </span>
                  ))}
                  {/* Expose cap indicator */}
                  {enemy.statusEffects.filter(e => e.type === 'expose').reduce((s, e) => s + e.value, 0) >= COMBAT.EXPOSE_CAP && (
                    <span className="text-xs bg-amber-900/60 px-1.5 py-0.5 rounded border border-amber-500/40 text-amber-400 font-bold" title={`Expose capped at -${COMBAT.EXPOSE_CAP} DEF`}>
                      EXPOSED MAX
                    </span>
                  )}
                </div>
              )}

              {/* Intent badge */}
              {state.phase === 'player_turn' && (() => {
                const intent = predictEnemyIntent(state, enemy.id);
                if (!intent) return null;
                const intentColorMap: Record<string, string> = {
                  attack: 'text-crimson-400 bg-crimson-900/30 border-crimson-500/30',
                  defend: 'text-blue-400 bg-blue-900/30 border-blue-500/30',
                  debuff: 'text-purple-400 bg-purple-900/30 border-purple-500/30',
                  stun: 'text-amber-400 bg-amber-900/30 border-amber-500/30',
                  exhausted: 'text-ocean-500 bg-ocean-800/50 border-ocean-600/30',
                  special: 'text-amber-300 bg-amber-900/30 border-amber-500/30',
                };
                const colors = intentColorMap[intent.category] || intentColorMap.attack;
                return (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${colors}`}>
                    <span className="text-xs">{intent.icon}</span>
                    <span className="tracking-wider text-xs uppercase">{intent.label}</span>
                  </div>
                );
              })()}
            </div>
          );
        })}

        {/* Dead enemies — small and faded */}
        {state.enemies.filter((e) => !e.isAlive).map((enemy) => (
          <div key={enemy.id} className="flex flex-col items-center opacity-20 w-20">
            <span className="text-2xl">&#128128;</span>
            <span className="text-ocean-600 text-xs line-through text-center">{enemy.name}</span>
          </div>
        ))}

        {/* Combat Log Ticker — overlays bottom of arena */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-2 pointer-events-none">
          <div className="bg-ocean-950/80 backdrop-blur-sm rounded border border-ocean-700/40 px-3 py-2 max-h-20 md:max-h-24 overflow-hidden">
            {state.combatLog.length === 0 ? (
              <div className="text-xs text-ocean-500 italic font-narration py-0.5">The fight begins...</div>
            ) : (
              state.combatLog.slice(-3).map((entry, i) => {
                const isPlayer = entry.actor === 'Karyudon';
                return (
                  <div key={`ticker-${entry.round}-${i}`} className={`text-xs py-0.5 flex items-start gap-1.5
                    ${isPlayer ? 'text-ocean-200' : 'text-red-300/80'}`}>
                    {entry.isCritical && <span className="text-amber-400 font-bold shrink-0">&#9733;</span>}
                    <span className={`font-semibold shrink-0
                      ${isPlayer ? 'text-[#4ECDC4]' : 'text-[#E8845C]'}`}>
                      {entry.actor}
                    </span>
                    <span className="italic truncate font-medium">{entry.text}</span>
                    {entry.damage && entry.damage > 0 && (
                      <span className={`shrink-0 font-bold px-1 rounded text-xs
                        ${isPlayer ? 'text-[#4ECDC4]' : 'text-[#E8845C]'}`}>
                        {entry.damage} DMG
                      </span>
                    )}
                    {entry.effects && entry.effects.length > 0 && (
                      <span className="text-purple-400 text-xs font-semibold shrink-0">
                        [{entry.effects.join(', ')}]
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          {/* Expand button */}
          <button
            onClick={() => setShowFullLog(true)}
            className="pointer-events-auto text-ocean-500 text-xs tracking-wider hover:text-ocean-300 mt-1 ml-auto block"
          >
            &#9650; FULL LOG ({state.combatLog.length})
          </button>
        </div>
      </div>

      {/* Full Log Modal Overlay */}
      {showFullLog && (
        <div className="absolute inset-0 z-40 bg-ocean-950/95 backdrop-blur-md flex flex-col animate-fade-in"
          onClick={(e) => e.stopPropagation()}>
          <div className="px-4 py-3 border-b border-ocean-700 flex items-center justify-between shrink-0">
            <span className="text-brass-400 text-xs font-display font-bold tracking-[0.15em]">COMBAT LOG</span>
            <button onClick={() => setShowFullLog(false)}
              className="text-ocean-400 hover:text-ocean-200 text-sm transition-colors">CLOSE</button>
          </div>
          <div ref={logRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-0.5 godtide-scrollbar">
            {state.combatLog.map((entry, i) => {
              const isPlayer = entry.actor === 'Karyudon';
              const isSystem = !isPlayer && !entry.actor;
              return (
                <div key={`log-${entry.round}-${i}`} className={`text-sm py-1.5 combat-log-entry border-l-2 pl-3 ${
                  isPlayer
                    ? 'text-ocean-200 border-l-[#4ECDC4]/60'
                    : isSystem
                      ? 'text-[#A89B8C] border-l-[#A89B8C]/40'
                      : 'text-red-300/80 border-l-[#E8845C]/50'
                }`}>
                  <span className="text-ocean-600 text-xs mr-1.5 font-mono font-medium">R{entry.round}</span>
                  {entry.isCritical && <span className="text-amber-400 font-bold text-base">&#9733; </span>}
                  <span className={`font-semibold ${
                    isPlayer ? 'text-[#4ECDC4]' : isSystem ? 'text-[#A89B8C]' : 'text-[#E8845C]'
                  }`}>
                    {entry.actor}
                  </span>
                  {' - '}
                  <span className="italic font-medium">{entry.text}</span>
                  {entry.damage && entry.damage > 0 && (
                    <span className={`ml-2 font-bold px-1.5 py-0.5 rounded text-xs ${
                      isPlayer
                        ? 'bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/20'
                        : 'bg-[#E8845C]/10 text-[#E8845C] border border-[#E8845C]/20'
                    }`}>
                      {entry.damage} DMG
                    </span>
                  )}
                  {entry.effects && entry.effects.length > 0 && (
                    <span className="text-purple-400 text-xs ml-1 font-semibold">
                      [{entry.effects.join(', ')}]
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== PLAYER HUD + ACTIONS — bottom section ===== */}
      <div className={`shrink-0 flex-[5.5] flex flex-col min-h-0 ${
        anim.playerHurt ? 'bg-red-900/20' : ''
      } transition-colors duration-300 relative z-20`}>
        {/* Player HUD Bar — compact */}
        <div className="px-4 py-2.5 bg-ocean-800/95 border-y border-ocean-600/60 flex items-center gap-4 shrink-0">
          {/* Player portrait — simple CSS border, no frame overlay */}
          <div style={{ width: '146px', height: '182px', flexShrink: 0, position: 'relative' }}>
            {/* Charge glow effect */}
            {anim.showChargeGlow && (
              <div
                className="animate-charge-glow"
                style={{ position: 'absolute', inset: 0, zIndex: 10, borderRadius: '0.5rem', boxShadow: 'inset 0 0 20px rgba(251,191,36,0.6), 0 0 30px rgba(251,191,36,0.4)', pointerEvents: 'none' }}
              />
            )}
            {(() => {
              const portraitSrc = getKaryudonPortrait(gamePhase, mc.dragonFruitEaten) || getPortrait('karyudon');
              return portraitSrc && !failedPortraits.has('karyudon') ? (
                <img
                  src={portraitSrc}
                  alt="Karyudon"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '4px', border: '3px solid #D4A574', boxShadow: '0 0 10px rgba(212,165,116,0.3), inset 0 0 20px rgba(0,0,0,0.3)' }}
                  onError={() => setFailedPortraits(prev => new Set(prev).add('karyudon'))}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', border: '3px solid #D4A574', boxShadow: '0 0 10px rgba(212,165,116,0.3)' }} className="bg-gradient-to-b from-crimson-700 to-crimson-900">
                  <span className="text-2xl">&#128123;</span>
                </div>
              );
            })()}
          </div>

          {/* Name + Bars */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gold-400 text-sm font-bold font-display tracking-[0.15em]">KARYUDON</span>
              {/* God Fruit seawater weakness indicator */}
              {state.isAtSea && mc.dragonFruitEaten && (
                <span className="text-xs bg-blue-900/50 border border-blue-500/30 px-1.5 py-0.5 rounded text-blue-300 font-bold" title="God Fruit weakened by seawater proximity">
                  &#127754; SEAWATER
                </span>
              )}
              {/* Status effects with hover tooltips */}
              <div className="flex gap-1 ml-auto">
                {state.player.statusEffects.map((e) => (
                  <span key={e.id} className="text-xs bg-ocean-700/50 px-1.5 py-0.5 rounded group relative cursor-help inline-flex items-center">
                    <GameIcon iconKey={e.type} fallback={e.icon} className="w-4 h-4" />
                    <span className="text-ocean-400 text-xs ml-0.5 font-mono">{e.remainingRounds}</span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-40 bg-ocean-900/95 border border-ocean-500/50 rounded-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 p-2">
                      <p className="text-ocean-100 text-xs font-bold inline-flex items-center gap-1"><GameIcon iconKey={e.type} fallback={e.icon} className="w-3.5 h-3.5" /> {e.name}</p>
                      <p className="text-ocean-400 text-xs mt-0.5">
                        {e.type === 'buff_defense' ? `Defense +${e.value}` :
                         e.type === 'buff_attack' ? `Attack +${e.value}` :
                         e.type === 'buff_accuracy' ? `Accuracy +${e.value}%` :
                         e.type === 'weaken' ? `Attack -${e.value}` :
                         e.type === 'stun' ? 'Cannot act' :
                         e.type === 'bleed' ? `${e.value} dmg/turn` :
                         e.type === 'expose' ? `Defense -${e.value}${state.player.statusEffects.filter(se => se.type === 'expose').reduce((s, se) => s + se.value, 0) >= COMBAT.EXPOSE_CAP ? ' (CAPPED)' : ''}` :
                         e.type === 'shield' ? `Absorbs ${e.value} dmg` :
                         e.type === 'heal' ? `+${e.value} stamina/turn` :
                         e.type === 'intimidate' ? `Accuracy -${e.value}%` :
                         e.type === 'dodge' ? `Dodge next ${e.value} attack${e.value > 1 ? 's' : ''}` :
                         e.type === 'dominion_surge' ? `Dominion power surge` :
                         e.type === 'crew_boost' ? `Crew assists enhanced` :
                         'Active effect'}
                      </p>
                      <p className="text-ocean-500 text-xs mt-0.5">{e.remainingRounds}t left</p>
                    </div>
                  </span>
                ))}
              </div>
            </div>
            {/* HP + SP side by side */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 flex-1">
                <span className={`text-xs font-semibold w-5 ${(state.player.maxHp > 0 ? state.player.hp / state.player.maxHp : 0) < 0.25 ? 'text-red-400 animate-pulse' : 'text-red-400'}`}>HP</span>
                <div className="flex-1 h-[10px] bg-ocean-700 rounded overflow-hidden border border-ocean-600/40 shadow-inner">
                  <div
                    className={`h-full rounded hp-bar-damage transition-all duration-500 ${getHpColor(state.player.hp, state.player.maxHp)}`}
                    style={{ width: `${state.player.maxHp > 0 ? (state.player.hp / state.player.maxHp) * 100 : 0}%` }}
                  />
                </div>
                <span className={`text-xs font-mono font-medium w-16 text-right ${(state.player.maxHp > 0 ? state.player.hp / state.player.maxHp : 0) < 0.25 ? 'text-red-400' : 'text-ocean-300'}`}>
                  {Math.floor(state.player.hp)}/{Math.floor(state.player.maxHp)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-1">
                <span className={`text-xs font-semibold w-5 ${state.player.stamina < 10 ? 'text-blue-300 animate-pulse' : 'text-blue-400'}`}>SP</span>
                <div className="flex-1 h-[10px] bg-ocean-700 rounded overflow-hidden border border-ocean-600/40 shadow-inner">
                  <div
                    className="h-full rounded bg-blue-400 stamina-bar-fill transition-all duration-500"
                    style={{ width: `${state.player.maxStamina > 0 ? (state.player.stamina / state.player.maxStamina) * 100 : 0}%` }}
                  />
                </div>
                <span className={`text-xs font-mono font-medium w-16 text-right ${state.player.stamina < 10 ? 'text-blue-300' : 'text-ocean-300'}`}>
                  {Math.floor(state.player.stamina)}/{Math.floor(state.player.maxStamina)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {state.phase === 'player_turn' && !state.animating && (
          <div className="bg-ocean-900/95 border-t border-ocean-700/50 px-4 py-3 flex-1 min-h-0 overflow-y-auto">
            {/* Tab toggles */}
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setShowActionMenu('main')}
                className={`px-3 py-1.5 text-xs font-display font-bold tracking-wider rounded-sm transition-all ${
                  showActionMenu === 'main'
                    ? 'bg-ocean-600 text-gold-400 border border-gold-500/40 shadow-sm shadow-gold-500/10'
                    : 'text-ocean-400 hover:text-ocean-200 border border-ocean-600'
                }`}
              >
                ACTIONS
              </button>
              <button
                onClick={() => setShowActionMenu('crew')}
                className={`px-3 py-1.5 text-xs font-display font-bold tracking-wider rounded-sm transition-all ${
                  showActionMenu === 'crew'
                    ? 'bg-ocean-600 text-green-400 border border-green-500/40 shadow-sm shadow-green-500/10'
                    : 'text-ocean-400 hover:text-ocean-200 border border-ocean-600'
                }`}
              >
                CREW ({state.crewAssists.filter((ca) => ca.action.currentCooldown === 0).length})
                {state.crewAssists.some((ca) => {
                  const cm = crew.find((c) => c.id === ca.crewId);
                  return cm && (cm.mood === 'uneasy' || cm.mood === 'disgruntled');
                }) && <span className="text-orange-400 ml-1">⚠</span>}
              </button>
              <span className="text-xs font-mono text-ocean-600 self-center ml-auto">[Tab]</span>
            </div>

            {/* Main Actions Grid — category filter tabs + 3 columns (2 on narrow) */}
            {showActionMenu === 'main' && (() => {
              // Compute which categories have actions
              const categoryCounts: Record<string, number> = {};
              state.player.actions.forEach(a => {
                const cat = a.category === 'crew' ? 'special' : a.category; // crew actions show under special
                categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
              });
              const allCategories = ['strike', 'dominion', 'defend', 'special'] as const;
              const availableCategories = allCategories.filter(c => (categoryCounts[c] || 0) > 0);
              const filteredActions = categoryFilter === 'all'
                ? state.player.actions
                : state.player.actions.filter(a => {
                    const cat = a.category === 'crew' ? 'special' : a.category;
                    return cat === categoryFilter;
                  });

              return (<>
              {/* Category filter tabs */}
              {availableCategories.length > 1 && (
                <div className="flex gap-1 mb-1.5 flex-wrap">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-2 py-0.5 text-xs font-bold tracking-wider rounded-sm border transition-all ${
                      categoryFilter === 'all'
                        ? 'bg-ocean-700 text-ocean-100 border-ocean-400/50'
                        : 'text-ocean-500 border-ocean-700/50 hover:text-ocean-300'
                    }`}
                  >
                    ALL ({state.player.actions.length})
                  </button>
                  {availableCategories.map(cat => {
                    const label = cat === 'strike' ? '⚔ STRIKE'
                      : cat === 'dominion' ? '✦ DOMINION'
                      : cat === 'defend' ? '🛡 DEFEND'
                      : '⚡ SPECIAL';
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-2 py-0.5 text-xs font-bold tracking-wider rounded-sm border transition-all ${
                          categoryFilter === cat
                            ? cat === 'strike' ? 'bg-red-900/40 text-red-300 border-red-500/50'
                            : cat === 'dominion' ? 'bg-purple-900/40 text-purple-300 border-purple-500/50'
                            : cat === 'defend' ? 'bg-blue-900/40 text-blue-300 border-blue-500/50'
                            : 'bg-amber-900/40 text-amber-300 border-amber-500/50'
                            : 'text-ocean-500 border-ocean-700/50 hover:text-ocean-300'
                        }`}
                      >
                        {label} ({categoryCounts[cat] || 0})
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto">
                {filteredActions
                  .map((action, actionIdx) => {
                    const isLocked = !isActionUnlocked(action, state, mc);
                    const onCooldown = action.currentCooldown > 0;
                    const noStamina = state.player.stamina < action.staminaCost;
                    const disabled = isLocked || onCooldown || noStamina;
                    const needsTarget = action.targetType === 'single' && aliveEnemies.length > 1;
                    const isKingAbility = action.damageType === 'dominion_king';
                    const isSpecial = action.category === 'special';
                    const unlockDesc = isLocked ? getUnlockDescription(action) : null;
                    const keyHint = actionIdx < 9 ? actionIdx + 1 : null;
                    const targetEnemy = action.damage > 0 && selectedTarget
                      ? aliveEnemies.find(en => en.id === selectedTarget)
                      : (action.damage > 0 && action.targetType === 'all' && aliveEnemies.length > 0 ? aliveEnemies[0] : undefined);
                    const effDmg = targetEnemy ? estimateEffectiveDamage(action, targetEnemy) : null;

                    return (
                      <div key={action.id} className="relative group">
                        <button
                          onClick={() => {
                            if (disabled) return;
                            if (needsTarget && !selectedTarget) return;
                            handlePlayerAction(action, selectedTarget || undefined);
                          }}
                          disabled={disabled}
                          title={isLocked ? (unlockDesc || 'Locked') : `${action.description}${action.effects?.length ? '\nEffects: ' + action.effects.map(e => e.type).join(', ') : ''}${action.cooldown > 0 ? `\nCooldown: ${action.cooldown} rounds` : ''}`}
                          className={`w-full combat-action-btn text-left px-3 py-3 border rounded transition-all duration-150 bg-ocean-800/60 ${
                            isLocked
                              ? 'border-ocean-700/50 bg-ocean-900/70 opacity-50 cursor-not-allowed'
                              : disabled
                                ? 'border-ocean-700 bg-ocean-800/50 opacity-50 cursor-not-allowed text-ocean-500'
                                : getCategoryColor(action.category)
                          } ${
                            !isLocked && isKingAbility
                              ? 'border-purple-400 bg-purple-900/30 shadow-lg shadow-purple-500/20'
                              : ''
                          } ${
                            !isLocked && isSpecial && !disabled
                              ? 'shadow-sm shadow-amber-500/10'
                              : ''
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            {keyHint && !isLocked && (
                              <span className="text-xs font-mono text-ocean-500 bg-ocean-800 border border-ocean-600 rounded px-1 leading-tight">{keyHint}</span>
                            )}
                            {isLocked
                              ? <span className="text-base">&#128274;</span>
                              : <span className="text-base">{renderCategoryIcon(action.category)}</span>
                            }
                            <span className={`font-semibold tracking-wide ${
                              isLocked ? 'text-ocean-500 text-sm' :
                              isSpecial ? 'text-amber-300 text-[17px]' :
                              isKingAbility ? 'text-purple-300 text-[17px]' :
                              'text-ocean-100 text-[17px]'
                            }`}>
                              {action.name}
                            </span>
                          </div>
                          {isLocked ? (
                            <div className="flex items-center gap-1 mt-1.5">
                              <span className="text-ocean-500 text-xs italic tracking-wide">
                                {unlockDesc || 'Locked'}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-1.5">
                              {action.damage > 0 && (
                                <span className={`text-sm font-bold ${
                                  isSpecial ? 'text-amber-400' : 'text-red-400'
                                }`}>
                                  {effDmg !== null && effDmg !== action.damage ? (
                                    <>{effDmg}<span className="text-ocean-500 font-normal">~</span></>
                                  ) : (
                                    action.damage
                                  )}
                                </span>
                              )}
                              <span className="text-blue-300/80 text-xs">{action.staminaCost} SP</span>
                              {action.accuracy < 100 && (
                                <span className="text-ocean-400 text-xs">{action.accuracy}%</span>
                              )}
                              {onCooldown && (
                                <span className="text-ocean-500 text-xs ml-auto bg-ocean-700/50 px-1 rounded">
                                  CD {action.currentCooldown}
                                </span>
                              )}
                            </div>
                          )}
                        </button>
                        {/* Action tooltip on hover */}
                        <div className="absolute bottom-full left-0 mb-1 w-56 bg-ocean-900/95 border border-ocean-500/50 rounded-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 p-2.5">
                          <p className="text-ocean-100 text-xs font-bold mb-1">{action.name}</p>
                          <p className="text-ocean-300 text-xs leading-relaxed mb-1.5">{action.description}</p>
                          {isLocked && unlockDesc && (
                            <p className="text-amber-400 text-xs font-bold mb-1.5">
                              🔒 Requires: {unlockDesc}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
                            {action.damage > 0 && <span className="text-red-400">⚔ {action.damage} {action.damageType.replace('dominion_', '').replace('_', ' ')}</span>}
                            {effDmg !== null && effDmg !== action.damage && (
                              <span className="text-amber-300">→ ~{effDmg} effective</span>
                            )}
                            <span className="text-blue-300">⚡ {action.staminaCost} stamina</span>
                            <span className="text-ocean-400">◎ {action.accuracy}% hit</span>
                            {action.cooldown > 0 && <span className="text-ocean-500">⏱ {action.cooldown}r cooldown</span>}
                            <span className="text-ocean-500">🎯 {action.targetType}</span>
                          </div>
                          {action.effects && action.effects.length > 0 && (
                            <div className="mt-1.5 pt-1.5 border-t border-ocean-700">
                              {action.effects.map((eff, ei) => (
                                <p key={ei} className="text-purple-300 text-xs">
                                  {eff.chance < 100 ? `${eff.chance}% ` : ''}{eff.description}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              </>);
            })()}

            {/* Catch Breath - always visible during player turn */}
            {showActionMenu === 'main' && (
              <button
                onClick={() => {
                  if (!state || state.phase !== 'player_turn' || state.animating) return;
                  audioManager.playSfx('click');
                  const { newState, logEntry } = playerEndTurn(state);
                  const recoveryAmount = Math.max(8, Math.floor(state.player.maxStamina * 0.20));
                  const updatedState: CombatState = {
                    ...newState,
                    combatLog: [...newState.combatLog, logEntry].slice(-100),
                    animating: true,
                  };
                  updatedState.comboCount = 0;
                  updateCombatState(updatedState);
                  triggerAnimation('block', undefined, undefined, false, false);
                  animDispatch({ type: 'SET', field: 'showEffectProc', value: `+${recoveryAmount} SP` });
                  safeTimeout(() => animDispatch({ type: 'SET', field: 'showEffectProc', value: null }), 1200);
                  safeTimeout(() => {
                    advanceCombatRef.current(updatedState);
                  }, COMBAT.TURN_POST_PLAYER_DELAY);
                }}
                disabled={!state || state.phase !== 'player_turn' || state.animating}
                className="flex-1 px-3 py-2.5 border border-green-600/60 rounded bg-green-900/30 hover:bg-green-800/40 hover:border-green-400/60 transition-all mt-2 text-left disabled:opacity-40 disabled:cursor-not-allowed"
                title="Skip your attack to recover stamina. Use when low on SP."
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">&#129683;</span>
                  <span className="text-xs font-bold text-green-300">CATCH BREATH</span>
                  <span className="text-green-400/80 text-xs ml-2">End turn, +{Math.max(8, Math.floor(state.player.maxStamina * 0.20))} SP</span>
                </div>
              </button>
            )}

            {/* Crew Combos - Golden Buttons */}
            {showActionMenu === 'crew' && (() => {
              const availableCombos = getAvailableCombos(crew);
              if (availableCombos.length === 0) return null;
              return (
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Crew Combos</span>
                    <div className="flex-1 h-px bg-amber-500/30" />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {availableCombos.map((combo, comboIdx) => {
                      const cd = state.comboCooldowns[combo.id] || 0;
                      const onCooldown = cd > 0;
                      const crew1 = crew.find(c => c.id === combo.crewPair[0]);
                      const crew2 = crew.find(c => c.id === combo.crewPair[1]);
                      const pairNames = `${crew1?.name || combo.crewPair[0]} + ${crew2?.name || combo.crewPair[1]}`;
                      const comboKeyHint = comboIdx < 9 ? comboIdx + 1 : null;

                      return (
                        <button
                          key={combo.id}
                          onClick={() => { if (!onCooldown) handleCrewCombo(combo); }}
                          disabled={onCooldown || state.animating}
                          className={`combat-action-btn text-left p-3 border-2 rounded transition-all duration-200 ${
                            onCooldown
                              ? 'border-ocean-700 bg-ocean-800/50 opacity-50 cursor-not-allowed text-ocean-500'
                              : 'border-amber-500/70 hover:border-amber-400 hover:bg-amber-900/20 bg-gradient-to-r from-amber-950/40 to-ocean-800/60 hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                          }`}
                          title={combo.description}
                        >
                          <div className="flex items-center gap-2">
                            {comboKeyHint && (
                              <span className="text-xs font-mono text-ocean-500 bg-ocean-800 border border-ocean-600 rounded px-1 leading-tight">{comboKeyHint}</span>
                            )}
                            <span className="text-amber-400 text-sm">&#9733;</span>
                            <span className="text-amber-300 text-xs font-bold tracking-wide">{combo.name}</span>
                            <span className="text-amber-400 text-sm">&#9733;</span>
                            <span className="flex-1" />
                            {onCooldown && (
                              <span className="text-ocean-400 text-xs bg-ocean-700/60 px-1.5 py-0.5 rounded">
                                CD {cd}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-amber-200/60 text-xs">{pairNames}</span>
                            <span className="text-amber-500/40">|</span>
                            {combo.action.damage > 0 && (
                              <span className="text-red-400 text-xs font-bold">{combo.action.damage} DMG</span>
                            )}
                            <span className="text-amber-200/50 text-xs italic truncate flex-1">
                              {combo.action.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Crew Assists Grid */}
            {showActionMenu === 'crew' && (() => {
              const comboOffset = getAvailableCombos(crew).length;
              return (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto">
                {state.crewAssists.map((assist, assistIdx) => {
                  const onCooldown = assist.action.currentCooldown > 0;
                  const crewMember = crew.find((c) => c.id === assist.crewId);
                  const mood = crewMember?.mood || 'content';
                  const moodScale = mood === 'disgruntled' ? 0.6 : mood === 'uneasy' ? 0.85 : 1.0;
                  const hasPenalty = moodScale < 1.0;
                  const moodColor = mood === 'loyal' ? 'text-green-400' : mood === 'content' ? 'text-ocean-300' : mood === 'uneasy' ? 'text-amber-400' : mood === 'disgruntled' ? 'text-orange-400' : 'text-red-400';
                  const moodBorder = mood === 'disgruntled' ? 'border-orange-500/50 hover:border-orange-400' : mood === 'uneasy' ? 'border-amber-500/40 hover:border-amber-400' : 'border-green-500/50 hover:border-green-400';
                  const assistKeyNum = comboOffset + assistIdx + 1;
                  const assistKeyHint = assistKeyNum <= 9 ? assistKeyNum : null;

                  return (
                    <button
                      key={`${assist.crewId}_${assist.action.id}`}
                      onClick={() => {
                        if (onCooldown) return;
                        handleCrewAssist(assist);
                      }}
                      disabled={onCooldown}
                      className={`combat-action-btn text-left p-2.5 border rounded-sm transition-all duration-150 ${
                        onCooldown
                          ? 'border-ocean-700 bg-ocean-800/50 opacity-35 cursor-not-allowed'
                          : `${moodBorder} hover:bg-green-900/20 bg-ocean-800/60`
                      }`}
                      title={`${assist.action.description}${hasPenalty ? ` (${Math.round(moodScale * 100)}% effectiveness - ${mood})` : ''}`}
                    >
                      <div className="flex items-center gap-1.5">
                        {assistKeyHint && (
                          <span className="text-xs font-mono text-ocean-500 bg-ocean-800 border border-ocean-600 rounded px-1 leading-tight">{assistKeyHint}</span>
                        )}
                        <span className={`text-xs font-bold ${hasPenalty ? moodColor : 'text-green-400'}`}>{assist.crewName}</span>
                        <span className={`text-xs ${moodColor}`}>{mood === 'loyal' ? '★' : mood === 'disgruntled' ? '▼' : mood === 'uneasy' ? '~' : ''}</span>
                        <span className="text-ocean-500 text-xs">-</span>
                        <span className="text-ocean-100 text-xs font-bold">{assist.action.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        {assist.action.damage > 0 && (
                          <span className={`text-xs font-bold ${hasPenalty ? 'text-orange-400' : 'text-red-400'}`}>
                            {assist.action.damage} DMG
                            {hasPenalty && <span className="text-orange-500/60 text-xs ml-0.5">({Math.round(moodScale * 100)}%)</span>}
                          </span>
                        )}
                        <span className="text-ocean-400 text-xs italic truncate flex-1">
                          {assist.action.description.length > 30 ? `${assist.action.description.slice(0, 30)}...` : assist.action.description}
                        </span>
                        {onCooldown && (
                          <span className="text-ocean-500 text-xs bg-ocean-700/50 px-1 rounded">
                            CD {assist.action.currentCooldown}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
                {state.crewAssists.length === 0 && (
                  <p className="col-span-2 md:col-span-3 text-ocean-500 text-sm italic text-center py-4">
                    No crew recruited yet.
                  </p>
                )}
              </div>
              );
            })()}
          </div>
        )}

        {/* Animating indicator */}
        {state.animating && (
          <div className="px-4 pb-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 bg-crimson-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-crimson-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-crimson-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
