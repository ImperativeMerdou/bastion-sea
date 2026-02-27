import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../systems/audio';
import { formatBounty } from '../../utils/formatting';

// Category icons and colors
const categoryStyles: Record<string, { icon: string; color: string; bgColor: string; label: string }> = {
  combat: { icon: '⚔️', color: 'text-crimson-400', bgColor: 'bg-crimson-900/30', label: 'ENCOUNTER' },
  storm: { icon: '⛈️', color: 'text-blue-400', bgColor: 'bg-blue-900/30', label: 'STORM' },
  discovery: { icon: '🔍', color: 'text-amber-400', bgColor: 'bg-amber-900/30', label: 'DISCOVERY' },
  crew: { icon: '👥', color: 'text-green-400', bgColor: 'bg-green-900/30', label: 'CREW' },
  trade: { icon: '💰', color: 'text-yellow-400', bgColor: 'bg-yellow-900/30', label: 'TRADE' },
  omen: { icon: '👁️', color: 'text-purple-400', bgColor: 'bg-purple-900/30', label: 'OMEN' },
  wardensea: { icon: '⚓', color: 'text-gray-400', bgColor: 'bg-gray-900/30', label: 'WARDENSEA' },
};

// Isolated wave animation component - only this re-renders at 20fps, not the entire TravelPanel
const WaveAnimation: React.FC = React.memo(() => {
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full animate-wave-slow">
          <path
            fill="#1e3a5f"
            d={`M0,${160 + Math.sin(waveOffset * 0.02) * 20}
              C360,${200 + Math.sin(waveOffset * 0.02 + 2) * 30}
              720,${140 + Math.sin(waveOffset * 0.02 + 4) * 25}
              1440,${180 + Math.sin(waveOffset * 0.02 + 6) * 20}
              V320H0Z`}
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-15">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full animate-wave-fast">
          <path
            fill="#2a5080"
            d={`M0,${200 + Math.sin(waveOffset * 0.03 + 1) * 15}
              C480,${170 + Math.sin(waveOffset * 0.03 + 3) * 20}
              960,${210 + Math.sin(waveOffset * 0.03 + 5) * 18}
              1440,${190 + Math.sin(waveOffset * 0.03 + 7) * 15}
              V320H0Z`}
          />
        </svg>
      </div>
    </>
  );
});

export const TravelPanel: React.FC = () => {
  const travelState = useGameStore(s => s.travelState);
  const resolveTravelChoice = useGameStore(s => s.resolveTravelChoice);
  const advanceTravel = useGameStore(s => s.advanceTravel);
  const islands = useGameStore(s => s.islands);
  const storeTypingSpeed = useGameStore(s => s.typingSpeed);

  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [typedResult, setTypedResult] = useState('');
  const [isTypingResult, setIsTypingResult] = useState(false);

  // Play travel depart SFX when travel begins
  const hasTravelState = !!travelState;
  useEffect(() => {
    if (hasTravelState) {
      audioManager.playSfx('travel_depart');
    }
  }, [hasTravelState]);

  // Type out event description
  useEffect(() => {
    if (!travelState?.currentEvent || travelState.eventResolved) return;

    const text = travelState.currentEvent.description;

    // Instant mode
    if (storeTypingSpeed === 0) {
      setTypedText(text);
      setTypedResult('');
      setIsTyping(false);
      setIsTypingResult(false);
      setShowChoices(true);
      return;
    }

    setTypedText('');
    setTypedResult('');
    setIsTyping(true);
    setIsTypingResult(false);
    setShowChoices(false);

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        setTimeout(() => setShowChoices(true), 300);
      }
    }, storeTypingSpeed);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelState?.currentEvent?.id, travelState?.eventResolved, storeTypingSpeed]);

  // Type out choice result
  useEffect(() => {
    if (!travelState?.choiceResult) return;

    const text = travelState.choiceResult;

    // Instant mode
    if (storeTypingSpeed === 0) {
      setTypedResult(text);
      setIsTypingResult(false);
      return;
    }

    setTypedResult('');
    setIsTypingResult(true);
    setShowChoices(false);

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedResult(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsTypingResult(false);
      }
    }, storeTypingSpeed);

    return () => clearInterval(timer);
  }, [travelState?.choiceResult, storeTypingSpeed]);

  const skipTyping = useCallback(() => {
    if (isTyping && travelState?.currentEvent) {
      setTypedText(travelState.currentEvent.description);
      setIsTyping(false);
      setShowChoices(true);
    } else if (isTypingResult && travelState?.choiceResult) {
      setTypedResult(travelState.choiceResult);
      setIsTypingResult(false);
    }
  }, [isTyping, isTypingResult, travelState]);

  // Keyboard handler for travel events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keys when a modal is open
      const dialogOpen = document.querySelector('[role="dialog"]');
      if (dialogOpen) return;

      if (!travelState) return;

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (isTyping || isTypingResult) {
          skipTyping();
        } else if (travelState.eventResolved) {
          audioManager.playSfx('text_advance');
          advanceTravel();
        }
        return;
      }

      // Number keys select choices (1-9)
      if (showChoices && !travelState.eventResolved && travelState.currentEvent) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= travelState.currentEvent.choices.length) {
          const choice = travelState.currentEvent.choices[num - 1];
          audioManager.playSfx('choice_select');
          resolveTravelChoice(choice.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [travelState, isTyping, isTypingResult, showChoices, skipTyping, advanceTravel, resolveTravelChoice]);

  if (!travelState) return null;

  const fromIsland = islands.find((i) => i.id === travelState.fromIsland);
  const toIsland = islands.find((i) => i.id === travelState.toIsland);
  const event = travelState.currentEvent;
  const style = event ? categoryStyles[event.category] || categoryStyles.crew : null;

  // Progress percentage -- each event is one segment, resolving it adds half a segment
  const eventCount = travelState.events.length;
  const progress = eventCount > 0
    ? ((travelState.currentDay + (travelState.eventResolved ? 0.5 : 0)) / eventCount) * 100
    : (travelState.complete ? 100 : 0);

  return (
    <div className="fixed inset-0 z-[55] flex flex-col" onClick={skipTyping} role="dialog" aria-modal="true" aria-label="Sea travel">
      {/* Animated ocean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-900 via-ocean-800 to-[#0a1628] overflow-hidden">
        {/* Wave layers - isolated component so only waves re-render at 20fps */}
        <WaveAnimation />

        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full animate-twinkle"
              style={{
                left: `${(i * 37 + 11) % 100}%`,
                top: `${(i * 23 + 7) % 50}%`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0.3 + (i % 3) * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Top bar - Route info */}
      <div className="relative z-10 px-8 py-4 flex items-center justify-between border-b border-ocean-700/50 bg-ocean-900/60 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="text-ocean-400 text-xs uppercase tracking-widest">AT SEA</div>
          <div className="text-ocean-100 font-display text-lg">
            {fromIsland?.name || '???'} <span className="text-ocean-500 mx-2">→</span> {toIsland?.name || '???'}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-ocean-400 text-xs">
            <span className="text-ocean-300 font-bold">{travelState.totalDays}</span> day voyage
          </div>
          <div className={`text-xs font-bold uppercase tracking-wider ${
            travelState.dangerLevel === 'safe' ? 'text-green-400' :
            travelState.dangerLevel === 'moderate' ? 'text-amber-400' :
            travelState.dangerLevel === 'dangerous' ? 'text-crimson-400' :
            'text-crimson-300'
          }`}>
            {travelState.dangerLevel}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 h-1 bg-ocean-800/50">
        <div
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-12">
        {event ? (
          <div className="max-w-2xl w-full">
            {/* Event category badge */}
            {style && (
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm ${style.bgColor} border border-ocean-600/30 mb-6 animate-fade-in`}>
                <span>{style.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-widest ${style.color}`}>{style.label}</span>
              </div>
            )}

            {/* Event title */}
            <h2 className="text-3xl font-display font-bold text-ocean-100 mb-6 tracking-wide animate-fade-in">
              {event.title}
            </h2>

            {/* Event description (typewriter) */}
            {!travelState.eventResolved && (
              <div className="mb-8">
                <p className="text-ocean-200 text-lg leading-relaxed font-narration font-medium">
                  {typedText}
                  {isTyping && <span className="animate-pulse text-amber-400">▌</span>}
                </p>
              </div>
            )}

            {/* Choice result text */}
            {travelState.eventResolved && travelState.choiceResult && (
              <div className="mb-8">
                <p className="text-ocean-200 text-lg leading-relaxed font-narration font-medium">
                  {typedResult}
                  {isTypingResult && <span className="animate-pulse text-amber-400">▌</span>}
                </p>
              </div>
            )}

            {/* Choices */}
            {showChoices && !travelState.eventResolved && (
              <div className="space-y-3 animate-fade-in">
                {event.choices.map((choice, idx) => (
                  <button
                    key={choice.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      audioManager.playSfx('choice_select');
                      resolveTravelChoice(choice.id);
                    }}
                    className="w-full text-left px-5 py-4 bg-ocean-800/70 hover:bg-ocean-700/80 border border-ocean-600/50 hover:border-amber-500/40 rounded-sm transition-all duration-200 group"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-amber-500/60 font-mono text-xs mt-1 w-4">{idx + 1}</span>
                      <span className="text-ocean-100 group-hover:text-amber-200 transition-colors">
                        {choice.text}
                      </span>
                    </div>
                    {/* Show required crew */}
                    {choice.requiresCrew && (
                      <div className="ml-6 mt-1 text-ocean-500 text-xs">
                        Requires: {choice.requiresCrew}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Continue button (after choice resolved) */}
            {travelState.eventResolved && !isTypingResult && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  audioManager.playSfx('text_advance');
                  advanceTravel();
                }}
                className="mt-8 px-8 py-3 bg-amber-700/80 hover:bg-amber-600/90 border border-amber-500/40 text-amber-100 font-bold text-sm tracking-widest uppercase rounded-sm transition-all animate-fade-in"
              >
                {travelState.currentDay >= travelState.events.length - 1
                  ? `ARRIVE AT ${toIsland?.name?.toUpperCase() || 'DESTINATION'}`
                  : 'CONTINUE VOYAGE'}
              </button>
            )}

            {/* Effect summary (after choice) */}
            {travelState.eventResolved && travelState.selectedChoice && !isTypingResult && (
              <EffectSummary choice={travelState.selectedChoice} succeeded={travelState.choiceSucceeded} />
            )}
          </div>
        ) : (
          /* No event - should be transitioning */
          <div className="text-center animate-fade-in">
            <div className="text-ocean-400 text-lg">The sea stretches on...</div>
          </div>
        )}
      </div>

      {/* Ship icon at bottom */}
      <div className="relative z-10 h-16 flex items-center justify-center">
        <div
          className="text-2xl transition-all duration-1000"
          style={{ transform: `translateX(${(progress - 50) * 3}px)` }}
        >
          ⛵
        </div>
      </div>
    </div>
  );
};

// Small component showing resource/stat changes from a choice
const EffectSummary: React.FC<{ choice: import('../../systems/seaTravel').TravelChoice; succeeded: boolean }> = ({ choice, succeeded }) => {
  const effects: string[] = [];

  // Use failEffects on failure, success effects on success
  const resourceEffects = succeeded ? choice.effects : (choice.failEffects || {});
  if (resourceEffects) {
    if (resourceEffects.sovereigns) effects.push(`${resourceEffects.sovereigns > 0 ? '+' : ''}${resourceEffects.sovereigns} Sovereigns`);
    if (resourceEffects.supplies) effects.push(`${resourceEffects.supplies > 0 ? '+' : ''}${resourceEffects.supplies} Supplies`);
    if (resourceEffects.materials) effects.push(`${resourceEffects.materials > 0 ? '+' : ''}${resourceEffects.materials} Materials`);
    if (resourceEffects.intelligence) effects.push(`${resourceEffects.intelligence > 0 ? '+' : ''}${resourceEffects.intelligence} Intel`);
  }
  // Loyalty, bounty, rep, infamy only apply on success
  if (succeeded && choice.loyaltyEffects) {
    Object.entries(choice.loyaltyEffects).forEach(([crewId, amount]) => {
      const val = amount as number;
      const name = crewId.charAt(0).toUpperCase() + crewId.slice(1);
      effects.push(`${val > 0 ? '+' : ''}${val} ${name} Loyalty`);
    });
  }
  if (succeeded && choice.bountyChange) effects.push(`${choice.bountyChange > 0 ? '+' : ''}${formatBounty(Math.abs(choice.bountyChange))} Bounty`);
  if (succeeded && choice.reputationChange) effects.push(`${choice.reputationChange > 0 ? '+' : ''}${choice.reputationChange} Reputation`);
  if (succeeded && choice.infamyChange) effects.push(`${choice.infamyChange > 0 ? '+' : ''}${choice.infamyChange} Infamy`);

  if (effects.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2 animate-fade-in">
      {effects.map((eff, i) => (
        <span
          key={i}
          className={`px-2 py-1 rounded-sm text-xs font-bold tracking-wider ${
            eff.startsWith('+') ? 'bg-green-900/30 text-green-400 border border-green-500/30'
            : eff.startsWith('-') ? 'bg-crimson-900/30 text-crimson-400 border border-crimson-500/30'
            : 'bg-ocean-700 text-ocean-300 border border-ocean-500'
          }`}
        >
          {eff}
        </span>
      ))}
    </div>
  );
};
