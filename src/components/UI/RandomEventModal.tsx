import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { buildEventContext, interpolateText } from '../../systems/eventContext';
import { generateCrewAdvice, getCrewFirstName } from '../../systems/crewAdvisor';
import { getPortrait } from '../../utils/images';

export const RandomEventModal: React.FC = () => {
  const pendingRandomEvent = useGameStore(s => s.pendingRandomEvent);
  const resolveRandomEventChoice = useGameStore(s => s.resolveRandomEventChoice);
  const dismissRandomEvent = useGameStore(s => s.dismissRandomEvent);
  const islands = useGameStore(s => s.islands);
  const crew = useGameStore(s => s.crew);
  const currentIsland = useGameStore(s => s.currentIsland);
  const mc = useGameStore(s => s.mc);
  const dayCount = useGameStore(s => s.dayCount);
  const gamePhase = useGameStore(s => s.gamePhase);
  const threatState = useGameStore(s => s.threatState);

  // Build event context for text interpolation
  const eventCtx = useMemo(() => buildEventContext({
    islands, crew, currentIsland,
    reputation: mc.reputation, infamy: mc.infamy, bounty: mc.bounty,
    threatLevel: threatState.level, wardenseaAlert: threatState.wardenseaAlert,
    dayCount, gamePhase,
  }), [islands, crew, currentIsland, mc.reputation, mc.infamy, mc.bounty,
    threatState.level, threatState.wardenseaAlert, dayCount, gamePhase]);

  const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);

  const isVisible = !!pendingRandomEvent;
  const trapRef = useFocusTrap(isVisible);

  // Stable refs for keyboard handler
  const dismissRef = useRef(dismissRandomEvent);
  dismissRef.current = dismissRandomEvent;
  const eventRef = useRef(pendingRandomEvent);
  eventRef.current = pendingRandomEvent;

  // Keyboard handler: Escape/Enter/Space to dismiss result, but not auto-dismiss choices
  useEffect(() => {
    if (!isVisible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        const current = eventRef.current;
        if (!current) return;
        const showResult = current.resultText !== null;
        if (showResult) {
          // Result is showing, dismiss it
          e.preventDefault();
          e.stopPropagation();
          dismissRef.current();
        }
        // If choices are showing, don't auto-dismiss. Let the player pick.
        // Escape alone should not dismiss since choices are required.
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isVisible]);

  if (!pendingRandomEvent) return null;

  const { event, resultText } = pendingRandomEvent;
  const showResult = resultText !== null;
  const choices = event.choices || [];

  return (
    <div ref={trapRef} className="fixed inset-0 z-[60] flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="random-event-title">
      <div className="absolute inset-0 bg-ocean-950/85 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-2xl bg-ocean-900 border border-ocean-600 rounded-lg shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-ocean-700">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-ocean-500 uppercase">
              {event.notification.type}
            </span>
          </div>
          <h2 id="random-event-title" className="text-amber-400 font-display text-lg font-bold tracking-[0.15em] mt-1">
            {event.notification.title}
          </h2>
        </div>

        {/* Event Description / Result */}
        <div className="px-6 py-5">
          <p className="text-ocean-200 text-sm leading-relaxed">
            {showResult ? interpolateText(resultText || '', eventCtx) : interpolateText(event.notification.message, eventCtx)}
          </p>
        </div>

        {/* Choices or Dismiss */}
        <div className="px-6 pb-6">
          {showResult ? (
            <button
              onClick={dismissRandomEvent}
              className="w-full py-3 bg-ocean-800/70 hover:bg-ocean-700/80 border border-ocean-600/50 hover:border-amber-500/40 rounded-sm text-ocean-100 font-bold text-sm tracking-wider transition-all duration-200"
            >
              CONTINUE
            </button>
          ) : (
            <div className="space-y-2">
              {choices.map((choice) => {
                const isHovered = hoveredChoice === choice.id;
                // Build color-coded consequence hints
                const hints: { text: string; color: string }[] = [];
                if (choice.effects) {
                  const e = choice.effects;
                  if (e.sovereigns && e.sovereigns > 0) hints.push({ text: `+${e.sovereigns} sov`, color: 'text-green-400' });
                  if (e.sovereigns && e.sovereigns < 0) hints.push({ text: `${e.sovereigns} sov`, color: 'text-crimson-400' });
                  if (e.supplies && e.supplies > 0) hints.push({ text: `+${e.supplies} supplies`, color: 'text-green-400' });
                  if (e.supplies && e.supplies < 0) hints.push({ text: `${e.supplies} supplies`, color: 'text-crimson-400' });
                  if (e.materials && e.materials > 0) hints.push({ text: `+${e.materials} mat`, color: 'text-green-400' });
                  if (e.materials && e.materials < 0) hints.push({ text: `${e.materials} mat`, color: 'text-crimson-400' });
                  if (e.intelligence && e.intelligence > 0) hints.push({ text: `+${e.intelligence} intel`, color: 'text-green-400' });
                  if (e.intelligence && e.intelligence < 0) hints.push({ text: `${e.intelligence} intel`, color: 'text-crimson-400' });
                }
                if (choice.reputationChange && choice.reputationChange > 0) hints.push({ text: '+reputation', color: 'text-green-400' });
                if (choice.reputationChange && choice.reputationChange < 0) hints.push({ text: '-reputation', color: 'text-crimson-400' });
                if (choice.infamyChange && choice.infamyChange > 0) hints.push({ text: '+infamy', color: 'text-amber-400' });
                if (choice.bountyChange && choice.bountyChange > 0) hints.push({ text: '+bounty', color: 'text-crimson-400' });
                if (choice.successChance !== undefined) hints.push({ text: `${choice.successChance}%`, color: 'text-ocean-300' });
                if (choice.triggerCombat) hints.push({ text: 'combat', color: 'text-crimson-300' });
                if (choice.grantEquipmentId) hints.push({ text: '+equipment', color: 'text-purple-400' });

                // Crew advisor lines
                const advice = choice.choiceArchetype
                  ? generateCrewAdvice(choice.id, choice.choiceArchetype, crew)
                  : [];

                return (
                  <button
                    key={choice.id}
                    onClick={() => resolveRandomEventChoice(choice.id)}
                    onMouseEnter={() => setHoveredChoice(choice.id)}
                    onMouseLeave={() => setHoveredChoice(null)}
                    className="w-full text-left px-5 py-3 bg-ocean-800/70 hover:bg-ocean-700/80 border border-ocean-600/50 hover:border-amber-500/40 rounded-sm transition-all duration-200 group"
                  >
                    <span className="text-ocean-100 text-sm font-medium">
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
                    {/* Consequence hints - always visible at reduced opacity, full on hover */}
                    {hints.length > 0 && (
                      <p className={`text-xs mt-1 transition-opacity duration-200 ${
                        isHovered ? 'opacity-100' : 'opacity-50'
                      }`}>
                        {hints.map((h, i) => (
                          <span key={i}>
                            {i > 0 && <span className="text-ocean-500 mx-1">/</span>}
                            <span className={h.color}>{h.text}</span>
                          </span>
                        ))}
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
};
