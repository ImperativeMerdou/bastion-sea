import React, { useState, useEffect, useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { DayAction } from '../../types/game';
import { getAlertColor, getAlertLabel } from '../../systems/threat';
import { DAY_PLANNER } from '../../constants/balance';
import { buildEventContext, interpolateText } from '../../systems/eventContext';
import { generateCrewAdvice, getCrewFirstName } from '../../systems/crewAdvisor';
import { getPortrait } from '../../utils/images';

interface ActionCard {
  action: DayAction;
  icon: string;
  title: string;
  description: string;
  cost?: string;
  disabled?: boolean;
  disabledReason?: string;
  urgent?: boolean; // highlight for time-sensitive actions
}

export const DayPlannerModal: React.FC = () => {
  const dayPlannerOpen = useGameStore(s => s.dayPlannerOpen);
  const closeDayPlanner = useGameStore(s => s.closeDayPlanner);
  const executeDayAction = useGameStore(s => s.executeDayAction);
  const resources = useGameStore(s => s.resources);
  const currentIsland = useGameStore(s => s.currentIsland);
  const islands = useGameStore(s => s.islands);
  const crew = useGameStore(s => s.crew);
  const dayCount = useGameStore(s => s.dayCount);
  const pendingDayEvent = useGameStore(s => s.pendingDayEvent);
  const resolveDayEventChoice = useGameStore(s => s.resolveDayEventChoice);
  const dismissDayEvent = useGameStore(s => s.dismissDayEvent);
  const threatState = useGameStore(s => s.threatState);
  const ship = useGameStore(s => s.ship);
  const territoryStates = useGameStore(s => s.territoryStates);
  const mc = useGameStore(s => s.mc);
  const gamePhase = useGameStore(s => s.gamePhase);

  // Build event context for text interpolation (memoized per relevant state)
  const eventCtx = useMemo(() => buildEventContext({
    islands, crew, currentIsland,
    reputation: mc.reputation, infamy: mc.infamy, bounty: mc.bounty,
    threatLevel: threatState.level, wardenseaAlert: threatState.wardenseaAlert,
    dayCount, gamePhase,
  }), [islands, crew, currentIsland, mc.reputation, mc.infamy, mc.bounty,
    threatState.level, threatState.wardenseaAlert, dayCount, gamePhase]);

  const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const trapRef = useFocusTrap(dayPlannerOpen || !!pendingDayEvent);

  // Reset processing state when planner reopens
  useEffect(() => {
    if (dayPlannerOpen) setProcessing(false);
  }, [dayPlannerOpen]);

  // Keyboard shortcuts for event choices and ESC to close
  useEffect(() => {
    if (!dayPlannerOpen && !pendingDayEvent) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (pendingDayEvent?.resultText !== null && pendingDayEvent?.resultText !== undefined) {
          dismissDayEvent();
        } else if (!pendingDayEvent) {
          closeDayPlanner();
        }
        return;
      }
      // Enter/Space to dismiss event result
      if ((e.key === 'Enter' || e.key === ' ') && pendingDayEvent?.resultText !== null && pendingDayEvent?.resultText !== undefined) {
        e.preventDefault();
        dismissDayEvent();
        return;
      }
      // Number keys for event choices
      if (pendingDayEvent && pendingDayEvent.resultText === null) {
        const num = parseInt(e.key, 10);
        const choices = pendingDayEvent.event.choices.filter(c => {
          if (!c.requiresCrew) return true;
          return crew.some(m => m.id === c.requiresCrew && m.recruited && m.alive);
        });
        if (num >= 1 && num <= choices.length) {
          resolveDayEventChoice(choices[num - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dayPlannerOpen, pendingDayEvent, closeDayPlanner, dismissDayEvent, resolveDayEventChoice, crew]);

  // Show nothing if planner isn't open AND no pending event
  if (!dayPlannerOpen && !pendingDayEvent) return null;

  const island = islands.find(i => i.id === currentIsland);
  const isControlled = island?.status === 'controlled';
  const hasTrainer = crew.some(m => m.recruited && m.alive && m.assignment === 'trainer');

  // Threat info
  const raidIncoming = threatState.raidTarget !== null && threatState.raidDay !== null;
  const raidDaysLeft = raidIncoming ? ((threatState.raidDay || 0) - dayCount) : 0;
  const raidTargetIsland = raidIncoming
    ? islands.find(i => i.id === threatState.raidTarget)
    : null;

  // If there's a pending event, show the event UI
  if (pendingDayEvent) {
    const { event, resultText } = pendingDayEvent;
    const showResult = resultText !== null;

    // Filter choices by crew requirements
    const availableChoices = event.choices.filter(c => {
      if (!c.requiresCrew) return true;
      return crew.some(m => m.id === c.requiresCrew && m.recruited && m.alive);
    });

    return (
      <div ref={trapRef} className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="day-event-title">
        <div className="absolute inset-0 bg-ocean-950/85 backdrop-blur-sm" />

        <div
          className="relative z-10 w-full max-w-2xl bg-ocean-900 border border-ocean-600 rounded-lg shadow-2xl animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Event Header */}
          <div className="px-6 py-4 border-b border-ocean-700">
            <h2 id="day-event-title" className="text-amber-400 font-display text-lg font-bold tracking-[0.15em]">
              {event.title}
            </h2>
          </div>

          {/* Event Description / Result */}
          <div className="px-6 py-5">
            <p className={`text-ocean-200 text-sm leading-relaxed ${showResult ? 'animate-fade-in' : ''}`}>
              {showResult ? interpolateText(resultText || '', eventCtx) : interpolateText(event.description, eventCtx)}
            </p>
          </div>

          {/* Choices or Dismiss */}
          <div className="px-6 pb-6">
            {showResult ? (
              <button
                onClick={dismissDayEvent}
                className="w-full py-3 bg-ocean-800/70 hover:bg-ocean-700/80 border border-ocean-600/50 hover:border-amber-500/40 rounded-sm text-ocean-100 font-bold text-sm tracking-wider transition-all duration-200 animate-fade-in"
              >
                CONTINUE <span className="text-ocean-500 text-xs ml-1">[Enter]</span>
              </button>
            ) : (
              <div className="space-y-2">
                {availableChoices.map((choice, choiceIdx) => {
                  const isHovered = hoveredChoice === choice.id;
                  // Build consequence hint
                  const hints: string[] = [];
                  if (choice.effects) {
                    const e = choice.effects;
                    if (e.sovereigns && e.sovereigns > 0) hints.push(`+${e.sovereigns} sov`);
                    if (e.sovereigns && e.sovereigns < 0) hints.push(`${e.sovereigns} sov`);
                    if (e.supplies && e.supplies > 0) hints.push(`+${e.supplies} supplies`);
                    if (e.supplies && e.supplies < 0) hints.push(`${e.supplies} supplies`);
                    if (e.materials && e.materials > 0) hints.push(`+${e.materials} mat`);
                    if (e.materials && e.materials < 0) hints.push(`${e.materials} mat`);
                    if (e.intelligence && e.intelligence > 0) hints.push(`+${e.intelligence} intel`);
                    if (e.intelligence && e.intelligence < 0) hints.push(`${e.intelligence} intel`);
                  }
                  if (choice.loyaltyEffects) {
                    const entries = Object.entries(choice.loyaltyEffects);
                    const pos = entries.filter(([, v]) => v > 0).length;
                    const neg = entries.filter(([, v]) => v < 0).length;
                    if (pos > 0) hints.push(`+loyalty (${pos})`);
                    if (neg > 0) hints.push(`-loyalty (${neg})`);
                  }
                  if (choice.reputationChange && choice.reputationChange > 0) hints.push('+reputation');
                  if (choice.reputationChange && choice.reputationChange < 0) hints.push('-reputation');
                  if (choice.infamyChange && choice.infamyChange > 0) hints.push('+infamy');
                  if (choice.dominionXP) hints.push(`+${choice.dominionXP.amount} ${choice.dominionXP.expression} XP`);
                  if (choice.moraleChange && choice.moraleChange > 0) hints.push('+morale');
                  if (choice.moraleChange && choice.moraleChange < 0) hints.push('-morale');
                  if (choice.successChance !== undefined) hints.push(`${choice.successChance}% success`);
                  if (choice.triggerCombat) hints.push('combat');
                  if (choice.grantEquipmentId) hints.push('+equipment');

                  // Crew advisor lines (only when archetype is tagged)
                  const advice = choice.choiceArchetype
                    ? generateCrewAdvice(choice.id, choice.choiceArchetype, crew)
                    : [];

                  return (
                    <button
                      key={choice.id}
                      onClick={() => resolveDayEventChoice(choice.id)}
                      onMouseEnter={() => setHoveredChoice(choice.id)}
                      onMouseLeave={() => setHoveredChoice(null)}
                      className="w-full text-left px-5 py-3 bg-ocean-800/70 hover:bg-ocean-700/80 border border-ocean-600/50 hover:border-amber-500/40 rounded-sm transition-all duration-200 group"
                    >
                      <span className="text-ocean-100 text-sm font-medium">
                        <span className="text-amber-500/50 font-mono text-xs mr-2">{choiceIdx + 1}</span>
                        {choice.text}
                      </span>
                      {/* Crew advisor lines */}
                      {advice.length > 0 && (
                        <div className="mt-1.5 space-y-1">
                          {advice.map((a) => {
                            const portrait = getPortrait(a.crewId);
                            return (
                              <div key={a.crewId} className="flex items-start gap-1.5">
                                {portrait ? (
                                  <img src={portrait} alt="" className="w-4 h-4 rounded-full object-cover flex-shrink-0 mt-0.5 opacity-70" />
                                ) : (
                                  <span className="w-4 h-4 rounded-full bg-ocean-700 flex-shrink-0 mt-0.5 flex items-center justify-center text-[8px] text-ocean-400 font-bold">
                                    {getCrewFirstName(a.crewId, crew)[0]}
                                  </span>
                                )}
                                <p className="text-xs text-ocean-400 italic leading-snug">
                                  <span className="text-ocean-500 not-italic font-bold text-xs uppercase tracking-wider">
                                    {getCrewFirstName(a.crewId, crew)}:
                                  </span>{' '}
                                  {a.text}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {/* Consequence hints - hover reveal */}
                      {hints.length > 0 && (
                        <p className={`text-xs mt-1 transition-opacity duration-200 ${
                          isHovered ? 'opacity-100 text-amber-400/70' : 'opacity-0'
                        }`}>
                          {hints.join(' / ')}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- Condition-Based Action Restrictions ---
  // Ship damage: can't explore or trade when hull is critical
  const shipDamaged = ship && ship.hull < ship.maxHull * DAY_PLANNER.SHIP_DAMAGE_LOCKOUT_THRESHOLD;

  // Crew crisis: 3+ disgruntled/mutinous crew = can't train or explore
  const crisisCrewCount = crew.filter(m =>
    m.recruited && m.alive && (m.mood === 'disgruntled' || m.mood === 'mutinous')
  ).length;
  const crewCrisis = crisisCrewCount >= DAY_PLANNER.CREW_CRISIS_DISGRUNTLED_COUNT;

  // Territory emergency: 2+ territories with morale < 15
  const revoltCount = Object.values(territoryStates).filter(ts => ts.morale < 15).length;
  const territoryRevolt = revoltCount >= DAY_PLANNER.TERRITORY_REVOLT_THRESHOLD;

  // Supply crisis: supplies critically low
  const supplyCrisis = resources.supplies < DAY_PLANNER.SUPPLY_CRISIS_LOCKOUT;

  // Normal day planner action selection
  const actions: ActionCard[] = [
    {
      action: 'rest',
      icon: '🛏️',
      title: 'REST',
      description: 'Take the day easy. Crew morale heals slightly.',
    },
    {
      action: 'train',
      icon: '⚔️',
      title: 'TRAIN',
      description: `Train your Dominion. +8 XP to your strongest expression.${hasTrainer ? ' (+2 bonus from Trainer)' : ''}`,
      cost: '2 supplies',
      disabled: resources.supplies < 2 || crewCrisis || supplyCrisis,
      disabledReason: crewCrisis ? 'Crew refuses to train' : supplyCrisis ? 'Supplies too low' : 'Not enough supplies',
    },
    {
      action: 'explore_local',
      icon: '🔍',
      title: 'EXPLORE',
      description: 'Search the area for materials, intel, or salvage.',
      cost: '1 supply',
      disabled: resources.supplies < 1 || shipDamaged || crewCrisis,
      disabledReason: shipDamaged ? 'Ship too damaged to explore safely' : crewCrisis ? 'Crew refuses to leave the ship' : 'Not enough supplies',
    },
    {
      action: 'manage_territory',
      icon: '🏗️',
      title: 'MANAGE TERRITORY',
      description: isControlled
        ? `Invest time in ${island?.name}. +5 morale.`
        : 'You don\'t control this island.',
      disabled: !isControlled,
      disabledReason: 'No controlled territory here',
      urgent: territoryRevolt && isControlled,
    },
    {
      action: 'trade_run',
      icon: '💰',
      title: 'TRADE RUN',
      description: 'Trade local markets for coin and provisions.',
      disabled: !!shipDamaged,
      disabledReason: shipDamaged ? 'Ship too damaged for trade voyages' : undefined,
    },
  ];

  // Add DEFEND TERRITORY action if raid is incoming
  if (raidIncoming) {
    actions.push({
      action: 'defend_territory',
      icon: '🛡️',
      title: 'DEFEND TERRITORY',
      description: `Fortify ${raidTargetIsland?.name || 'target'}. +15 defense rating, +morale.`,
      urgent: true,
    });
  }

  const handleAction = (action: DayAction) => {
    if (processing) return;
    setProcessing(true);
    executeDayAction(action);
  };

  return (
    <div
      ref={trapRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={closeDayPlanner}
      role="dialog"
      aria-modal="true"
      aria-labelledby="day-planner-title"
    >
      <div className="absolute inset-0 bg-ocean-950/80 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-2xl bg-ocean-900 border border-ocean-600 rounded-lg shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-ocean-700 flex items-center justify-between">
          <div>
            <h2 id="day-planner-title" className="text-amber-400 font-display text-lg font-bold tracking-[0.15em]">
              PLAN YOUR DAY
            </h2>
            <p className="text-ocean-500 text-xs mt-1">
              {island?.name || 'At sea'} - Choose how to spend the day
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Threat level indicator */}
            {threatState.level > 0 && (
              <div className="text-right">
                <p className="text-xs text-ocean-500 tracking-wider">WARDENSEA THREAT</p>
                <p className={`text-xs font-bold tracking-wider ${getAlertColor(threatState.wardenseaAlert)}`}>
                  {getAlertLabel(threatState.wardenseaAlert)} ({threatState.level})
                </p>
              </div>
            )}
            <button
              onClick={closeDayPlanner}
              className="text-ocean-400 hover:text-ocean-200 text-sm font-bold tracking-wider transition-colors"
            >
              ESC
            </button>
          </div>
        </div>

        {/* Raid Warning Banner */}
        {raidIncoming && (
          <div className={`mx-6 mt-4 px-4 py-3 rounded-sm border ${
            raidDaysLeft <= 1
              ? 'bg-crimson-950/60 border-crimson-700 animate-pulse'
              : 'bg-amber-950/40 border-amber-700/60'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{raidDaysLeft <= 1 ? '🔴' : '🟡'}</span>
              <div>
                <p className={`text-xs font-bold tracking-wider ${
                  raidDaysLeft <= 1 ? 'text-crimson-400' : 'text-amber-400'
                }`}>
                  WARDENSEA RAID INCOMING
                </p>
                <p className="text-xs text-ocean-300 mt-0.5">
                  Target: {raidTargetIsland?.name || 'Unknown'} -- ETA: {
                    raidDaysLeft <= 0 ? 'TODAY' : `${raidDaysLeft} day${raidDaysLeft > 1 ? 's' : ''}`
                  } -- Strength: {threatState.raidStrength}/100
                </p>
                <p className="text-xs text-ocean-400 mt-1 italic">
                  {raidDaysLeft <= 1
                    ? 'Use DEFEND TERRITORY to bolster defenses. Failure causes heavy morale damage.'
                    : 'Defend your territory before the raid arrives or risk losing morale and control.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Blockade Warning */}
        {threatState.blockadedRoutes.length > 0 && (
          <div className="mx-6 mt-3 px-4 py-2 rounded-sm border bg-ocean-800/40 border-ocean-600/50">
            <p className="text-xs text-amber-400/80 font-bold tracking-wider">
              TRADE BLOCKADE ACTIVE -- {threatState.blockadedRoutes.length} route{threatState.blockadedRoutes.length > 1 ? 's' : ''} disrupted
            </p>
          </div>
        )}

        {/* Condition Warnings */}
        {shipDamaged && (
          <div className="mx-6 mt-3 px-4 py-2 rounded-sm border bg-crimson-950/40 border-crimson-700/50">
            <p className="text-xs text-crimson-400 font-bold tracking-wider">
              SHIP DAMAGED -- Hull at {Math.round((ship.hull / ship.maxHull) * 100)}%. Exploration and trade runs locked.
            </p>
          </div>
        )}
        {crewCrisis && (
          <div className="mx-6 mt-3 px-4 py-2 rounded-sm border bg-amber-950/40 border-amber-700/50">
            <p className="text-xs text-amber-400 font-bold tracking-wider">
              CREW CRISIS -- {crisisCrewCount} crew members disgruntled or mutinous. Rest to recover morale.
            </p>
          </div>
        )}
        {territoryRevolt && (
          <div className="mx-6 mt-3 px-4 py-2 rounded-sm border bg-amber-950/40 border-amber-700/50">
            <p className="text-xs text-amber-400 font-bold tracking-wider">
              TERRITORIES IN REVOLT -- {revoltCount} territories near rebellion. Manage or lose them.
            </p>
          </div>
        )}
        {supplyCrisis && !shipDamaged && !crewCrisis && (
          <div className="mx-6 mt-3 px-4 py-2 rounded-sm border bg-crimson-950/40 border-crimson-700/50">
            <p className="text-xs text-crimson-400 font-bold tracking-wider">
              SUPPLIES CRITICAL -- {resources.supplies} remaining. Trade or rest.
            </p>
          </div>
        )}

        {/* Action Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((card) => (
            <button
              key={card.action}
              onClick={() => !card.disabled && !processing && handleAction(card.action)}
              disabled={card.disabled || processing}
              className={`text-left px-5 py-4 rounded-sm border transition-all duration-200 ${
                card.disabled
                  ? 'bg-ocean-800/40 border-ocean-700 cursor-not-allowed opacity-50'
                  : card.urgent
                    ? 'bg-crimson-950/40 hover:bg-crimson-900/50 border-crimson-700/60 hover:border-crimson-500/60 cursor-pointer'
                    : 'bg-ocean-800/70 hover:bg-ocean-700/80 border-ocean-600/50 hover:border-amber-500/40 cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{card.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-sm tracking-wider ${
                      card.urgent ? 'text-crimson-300' : 'text-ocean-100'
                    }`}>
                      {card.title}
                    </span>
                    {card.cost && (
                      <span className={`text-xs ${card.disabled ? 'text-crimson-500' : 'text-ocean-500'}`}>
                        {card.cost}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${card.disabled ? 'text-ocean-600' : 'text-ocean-400'}`}>
                    {card.disabled ? card.disabledReason : card.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
