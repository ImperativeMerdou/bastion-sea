import React from 'react';
import { Island } from '../../types/game';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../systems/audio';
import { islandBonuses } from '../../systems/territory';
import { getMoraleTextColor, getMoraleBarColor, getMoraleLabel } from '../../utils/formatting';
import { ECONOMY, TRADE } from '../../constants/balance';
import { getPortrait } from '../../utils/images';

interface IslandDetailProps {
  island: Island;
  onClose: () => void;
}

const difficultyColors: Record<string, string> = {
  low: 'text-green-400',
  medium: 'text-amber-400',
  high: 'text-crimson-400',
  very_high: 'text-crimson-300',
  special: 'text-purple-400',
};

const dangerColors: Record<string, string> = {
  safe: 'text-green-400',
  moderate: 'text-amber-400',
  dangerous: 'text-crimson-400',
  deadly: 'text-crimson-300',
};

export const IslandDetail: React.FC<IslandDetailProps> = ({ island, onClose }) => {
  const islands = useGameStore(s => s.islands);
  const beginConquest = useGameStore(s => s.beginConquest);
  const currentIsland = useGameStore(s => s.currentIsland);
  const travelTo = useGameStore(s => s.travelTo);
  const resources = useGameStore(s => s.resources);
  const territoryStates = useGameStore(s => s.territoryStates);
  const crew = useGameStore(s => s.crew);
  const ship = useGameStore(s => s.ship);
  const getTerritoryBonuses = useGameStore(s => s.getTerritoryBonuses);
  const threatState = useGameStore(s => s.threatState);
  const dayCount = useGameStore(s => s.dayCount);

  const isCurrentLocation = currentIsland === island.id;
  const isRaidTarget = threatState.raidTarget === island.id;
  const canTravel = !isCurrentLocation && currentIsland !== null;

  // Find the route from current island to this one
  const currentIslandData = islands.find((i) => i.id === currentIsland);
  const routeFromCurrent = currentIslandData?.routes.find((r) => r.targetId === island.id);

  // Calculate REAL travel cost (matching travelTo logic in gameStore)
  const hasNavigator = crew.some(m => m.recruited && m.alive && !m.injured && m.assignment === 'navigator');
  const shipSpeedReduction = Math.abs(Math.min(0, ship.speed));
  const realTravelDays = routeFromCurrent
    ? Math.max(1, routeFromCurrent.travelDays - (hasNavigator ? 1 : 0) - shipSpeedReduction)
    : 0;
  const tBonuses = getTerritoryBonuses();
  const travelDiscountPct = Math.min(TRADE.TRAVEL_DISCOUNT_CAP, tBonuses.travelDiscount || 0);
  const travelSupplyCost = routeFromCurrent
    ? Math.max(1, Math.floor(realTravelDays * ECONOMY.SUPPLY_PER_TRAVEL_DAY * (1 - travelDiscountPct / 100)))
    : 0;
  const canAffordTravel = resources.supplies >= travelSupplyCost;

  return (
    <div className="w-96 bg-ocean-800 border-l border-brass-500/20 flex flex-col overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="px-6 py-4 border-b border-ocean-600 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-display font-bold text-ocean-100 tracking-wide">
              {island.name}
            </h2>
            {isCurrentLocation && (
              <span className="px-1.5 py-0.5 bg-green-700/30 border border-green-500/40 text-green-400 text-xs font-bold uppercase tracking-wider rounded-sm">
                HERE
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-bold uppercase tracking-wider ${difficultyColors[island.difficulty]}`}>
              {island.difficulty.replace('_', ' ')}
            </span>
            <span className="text-ocean-500">·</span>
            <span className="text-ocean-400 text-xs capitalize">
              {island.zone} Arc
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-ocean-400 hover:text-ocean-200 text-xl transition-colors"
          aria-label="Close island details"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
        {/* Status */}
        <div>
          <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">STATUS</h3>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-sm text-xs font-bold uppercase tracking-wider ${
              island.status === 'controlled' ? 'bg-amber-700/30 text-amber-400 border border-amber-500/30' :
              island.status === 'hostile' ? 'bg-crimson-700/30 text-crimson-400 border border-crimson-500/30' :
              'bg-ocean-700 text-ocean-300 border border-ocean-500'
            }`}>
              {island.status}
            </span>
            <span className="text-ocean-300 text-sm">- {island.controller}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">INTEL</h3>
          <p className="text-ocean-200 text-sm leading-relaxed font-narration">{island.description}</p>
        </div>

        {/* Population */}
        <div>
          <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">POPULATION</h3>
          <p className="text-ocean-200 text-lg font-bold">{island.population.toLocaleString()}</p>
        </div>

        {/* Conquest Approach (for controlled islands) */}
        {island.conquered && island.conquestApproach && (
          <div>
            <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">CONQUEST METHOD</h3>
            <span className="px-2 py-1 bg-amber-700/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider rounded-sm">
              {island.conquestApproach}
            </span>
          </div>
        )}

        {/* Territory Morale & Defense (for controlled islands) */}
        {island.status === 'controlled' && territoryStates[island.id] && (() => {
          const ts = territoryStates[island.id];
          const morale = ts.morale;
          const defense = ts.defenseRating;
          const moraleColor = getMoraleTextColor(morale);
          const moraleBarColor = getMoraleBarColor(morale);
          const moraleLabel = getMoraleLabel(morale);
          const incomeNote = morale >= 30 ? 'Full income' : morale >= 15 ? '50% income' : 'No income';
          return (
            <div>
              <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">TERRITORY STATUS</h3>
              <div className="space-y-3 bg-ocean-700/30 border border-ocean-600 rounded-sm p-3">
                {/* Raid Incoming Banner */}
                {isRaidTarget && (
                  <div className="bg-crimson-950/60 border border-crimson-700 rounded-sm px-3 py-2 animate-pulse">
                    <p className="text-crimson-400 text-xs font-bold tracking-wider">
                      ⚠️ INCOMING RAID
                      {threatState.raidDay && threatState.raidDay > dayCount
                        ? ` — ${threatState.raidDay - dayCount} day${(threatState.raidDay - dayCount) > 1 ? 's' : ''}`
                        : ' — IMMINENT'}
                      {' — Strength: '}{threatState.raidStrength}%
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-ocean-400 text-xs">
                        Defense: {defense}
                      </span>
                      <span className={`text-xs font-bold ${
                        defense >= threatState.raidStrength ? 'text-green-400' : 'text-crimson-400'
                      }`}>
                        {defense >= threatState.raidStrength ? 'LIKELY DEFENDED' : 'AT RISK'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Morale */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-ocean-300 text-xs">Morale</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${moraleColor}`}>{moraleLabel}</span>
                      <span className="text-ocean-500 text-xs">{morale}/100</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-ocean-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${moraleBarColor}`} style={{ width: `${morale}%` }} />
                  </div>
                  <p className="text-ocean-500 text-xs mt-1 italic">{incomeNote}</p>
                </div>
                {/* Defense */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-ocean-300 text-xs">Defense</span>
                    <span className="text-ocean-400 text-xs">{defense}/100</span>
                  </div>
                  <div className="w-full h-2 bg-ocean-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${defense}%` }} />
                  </div>
                </div>
                {/* Rebellion warning */}
                {morale < 15 && (
                  <div className="flex items-center gap-2 pt-1 border-t border-red-500/20">
                    <span className="text-red-400 text-xs font-bold animate-pulse">⚠ REBELLION IMMINENT</span>
                    <span className="text-red-400/60 text-xs">Island will be lost at 0 morale</span>
                  </div>
                )}
                {morale >= 15 && morale < 30 && (
                  <div className="flex items-center gap-2 pt-1 border-t border-orange-500/20">
                    <span className="text-orange-400 text-xs font-bold">⚠ REDUCED INCOME</span>
                    <span className="text-orange-400/60 text-xs">Population is restless</span>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Strategic Assessment (for unconquered islands) */}
        {!island.conquered && island.status !== 'hidden' && (() => {
          const garrisonEstimate: Record<string, { label: string; strength: string; desc: string }> = {
            low: { label: 'Minimal', strength: '⚔', desc: 'Lightly defended. A direct assault should work.' },
            medium: { label: 'Moderate', strength: '⚔⚔', desc: 'Standing garrison. Expect organized resistance.' },
            high: { label: 'Heavy', strength: '⚔⚔⚔', desc: 'Strong military presence. Prepare accordingly.' },
            very_high: { label: 'Fortress', strength: '⚔⚔⚔⚔', desc: 'Heavily fortified. Multiple approaches recommended.' },
            special: { label: 'Unknown', strength: '❓', desc: 'Intelligence insufficient. Proceed with extreme caution.' },
          };
          const garrison = garrisonEstimate[island.difficulty] || garrisonEstimate.medium;
          const bonus = islandBonuses[island.id];
          const incomePreview = bonus?.effects.filter(e => e.stat.endsWith('_per_day')) || [];
          const iconMap: Record<string, string> = {
            sovereigns_per_day: '⬡', supplies_per_day: '◈',
            materials_per_day: '⬢', intelligence_per_day: '◉',
          };

          return (
            <div>
              <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">STRATEGIC ASSESSMENT</h3>
              <div className="space-y-3 bg-ocean-700/30 border border-ocean-600 rounded-sm p-3">
                <div className="flex items-center justify-between">
                  <span className="text-ocean-300 text-xs">Garrison</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${difficultyColors[island.difficulty]}`}>{garrison.label}</span>
                    <span className="text-xs">{garrison.strength}</span>
                  </div>
                </div>
                <p className="text-ocean-500 text-xs italic">{garrison.desc}</p>
                {incomePreview.length > 0 && (
                  <>
                    <div className="border-t border-ocean-600 pt-2">
                      <span className="text-amber-400 text-xs font-bold tracking-wider">CONQUEST REWARDS</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {incomePreview.map((e, i) => (
                        <span key={i} className="px-2 py-0.5 bg-amber-900/20 border border-amber-500/20 text-amber-300 text-xs rounded-sm">
                          {iconMap[e.stat] || '+'} +{e.value}/day
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })()}

        {/* Resources */}
        {island.resources.length > 0 && (
          <div>
            <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">RESOURCES</h3>
            <div className="flex flex-wrap gap-2">
              {island.resources.map((resource) => (
                <span
                  key={resource}
                  className="px-2 py-1 bg-ocean-700 border border-ocean-500 text-ocean-200 text-xs rounded-sm capitalize"
                >
                  {resource.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Routes */}
        <div>
          <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">SEA ROUTES</h3>
          <div className="space-y-2">
            {island.routes.map((route) => {
              const target = islands.find((i) => i.id === route.targetId);
              if (!target || target.status === 'hidden') return null;
              const routeDays = Math.max(1, route.travelDays - (hasNavigator ? 1 : 0) - shipSpeedReduction);
              const routeCost = Math.max(1, Math.floor(routeDays * ECONOMY.SUPPLY_PER_TRAVEL_DAY * (1 - travelDiscountPct / 100)));
              return (
                <div
                  key={route.targetId}
                  className="flex items-center justify-between px-3 py-2 bg-ocean-700/50 border border-ocean-600 rounded-sm text-sm"
                >
                  <div>
                    <span className="text-ocean-100">{target.name}</span>
                    <span className="text-ocean-400 ml-2">{routeDays}d</span>
                    <span className="text-ocean-500 ml-1 text-xs">({routeCost} supplies)</span>
                  </div>
                  <span className={`text-xs uppercase font-bold ${dangerColors[route.dangerLevel]}`}>
                    {route.dangerLevel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* NPCs */}
        {island.npcs.length > 0 && (
          <div>
            <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">KEY FIGURES</h3>
            <div className="space-y-2">
              {island.npcs.map((npc) => {
                const portrait = getPortrait(npc.id);
                return (
                  <div
                    key={npc.id}
                    className="flex gap-3 px-3 py-2 bg-ocean-700/50 border border-ocean-600 rounded-sm"
                    title={npc.description}
                  >
                    {/* Portrait thumbnail */}
                    <div className="w-10 h-10 flex-shrink-0 rounded-sm overflow-hidden border border-ocean-500/50">
                      {portrait ? (
                        <img src={portrait} alt={npc.name} className="w-full h-full object-cover object-top" draggable={false} />
                      ) : (
                        <div className="w-full h-full bg-ocean-800 flex items-center justify-center">
                          <span className="text-lg font-bold text-ocean-500">?</span>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-ocean-100 text-sm font-bold">{npc.name}</span>
                        <span className="text-ocean-400 text-xs">{npc.race}</span>
                      </div>
                      <p className="text-ocean-300 text-xs mt-0.5">{npc.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 border-t border-ocean-600 space-y-2">
        {/* Travel button - show when player is NOT at this island and route exists */}
        {canTravel && routeFromCurrent && island.status !== 'hidden' && (
          <button
            onClick={() => travelTo(island.id)}
            disabled={!canAffordTravel}
            className={`w-full px-4 py-3 font-display font-bold text-sm tracking-wider uppercase transition-colors rounded-sm ${
              canAffordTravel
                ? 'bg-ocean-600 hover:bg-ocean-500 text-ocean-100 border border-ocean-400 hover:border-gold-500/50 hover:shadow-lg hover:shadow-ocean-400/20'
                : 'bg-ocean-700 text-ocean-500 border border-ocean-600 cursor-not-allowed'
            }`}
          >
            {canAffordTravel
              ? `SAIL TO ${island.name.toUpperCase()} (${realTravelDays}d / ${travelSupplyCost} supplies)`
              : `NEED ${travelSupplyCost} SUPPLIES TO TRAVEL`
            }
          </button>
        )}

        {/* No route message */}
        {canTravel && !routeFromCurrent && island.status !== 'hidden' && (
          <div className="text-center py-2">
            <span className="text-ocean-500 text-xs italic">No direct route from {currentIslandData?.name || 'current location'}</span>
          </div>
        )}

        {/* Conquest button - show when at island and it's unconquered */}
        {isCurrentLocation && !island.conquered && island.status !== 'hostile' && island.status !== 'hidden' && (
          <button
            onClick={() => { audioManager.playSfx('conquest_begin'); beginConquest(island.id); }}
            className="godtide-btn-danger w-full"
          >
            BEGIN CONQUEST
          </button>
        )}

        {/* Controlled territory label */}
        {island.conquered && (
          <div className="text-center">
            <span className="text-gold-400 font-display font-bold text-sm tracking-[0.15em]">TERRITORY OF KARYUDON</span>
          </div>
        )}

        {/* Current location label */}
        {isCurrentLocation && island.conquered && (
          <div className="text-center">
            <span className="text-green-400 text-xs tracking-wider">YOU ARE HERE</span>
          </div>
        )}
      </div>
    </div>
  );
};
