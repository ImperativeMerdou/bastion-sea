import React, { useState, useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import {
  islandBonuses,
  territoryUpgrades,
  calculateTerritoryUpkeep,
  ISLAND_ROLE_DATA,
} from '../../systems/territory';
import { calculateTradeRouteIncome, resourceCategories } from '../../systems/economy';
import { getAlertColor, getAlertLabel } from '../../systems/threat';
import { TRADE, THREAT, FORTIFICATION } from '../../constants/balance';
import { formatNumber, getMoraleBarColor, getMoraleTextColor } from '../../utils/formatting';

// Subsystem unlock thresholds (territory-specific)
const UNLOCK_THRESHOLDS = {
  tradeRoutes: 3,
  islandRoles: 5,
} as const;

export const TerritoryTab: React.FC = () => {
  const islands = useGameStore(s => s.islands);
  const resources = useGameStore(s => s.resources);
  const territoryStates = useGameStore(s => s.territoryStates);
  const threatState = useGameStore(s => s.threatState);
  const tradeRoutes = useGameStore(s => s.tradeRoutes);
  const dayCount = useGameStore(s => s.dayCount);
  const crew = useGameStore(s => s.crew);
  const intelligence = useGameStore(s => s.resources.intelligence);
  const startTerritoryUpgrade = useGameStore(s => s.startTerritoryUpgrade);
  const setIslandRole = useGameStore(s => s.setIslandRole);
  const boostTerritoryMorale = useGameStore(s => s.boostTerritoryMorale);
  const dispatchCrewToIsland = useGameStore(s => s.dispatchCrewToIsland);
  const addNotification = useGameStore(s => s.addNotification);
  const spendResources = useGameStore(s => s.spendResources);
  const establishTradeRoute = useGameStore(s => s.establishTradeRoute);
  const getTerritoryBonuses = useGameStore(s => s.getTerritoryBonuses);
  const runCounterEspionage = useGameStore(s => s.runCounterEspionage);
  const fortifyTerritory = useGameStore(s => s.fortifyTerritory);

  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string | null>(null);

  const controlledIslands = useMemo(() => islands.filter((i) => i.status === 'controlled'), [islands]);
  const territoryCount = controlledIslands.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {controlledIslands.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-ocean-500 text-4xl mb-4">🏝️</p>
          <p className="text-ocean-400 text-lg font-display">No Territory Controlled</p>
          <p className="text-ocean-500 text-sm italic mt-2">
            Conquer islands to build your empire. Each territory provides passive bonuses.
          </p>
        </div>
      ) : (
        <>
          {/* Empire Overview */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase">KARYUDON'S EMPIRE</h3>
              <p className="text-ocean-500 text-xs mt-1">
                {territoryCount} {territoryCount === 1 ? 'island' : 'islands'} controlled · Upkeep: {calculateTerritoryUpkeep(territoryCount)} supplies/day
              </p>
            </div>
            {(() => {
              const bonuses = getTerritoryBonuses();
              return (
                <div className="text-right">
                  <span className="text-amber-400 text-xs font-bold">DAILY INCOME</span>
                  <p className="text-ocean-200 text-xs mt-1">
                    +{bonuses.dailyIncome.sovereigns || 0}⬡ +{bonuses.dailyIncome.supplies || 0}◈ +{bonuses.dailyIncome.materials || 0}⬢ +{bonuses.dailyIncome.intelligence || 0}◉
                  </p>
                </div>
              );
            })()}
          </div>

          {/* Wardensea Threat Bar */}
          {threatState.level > 0 && (
            <div className="px-4 py-3 bg-ocean-800/60 border border-ocean-600/50 rounded-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-ocean-400 tracking-wider">WARDENSEA THREAT</span>
                <span className={`text-xs font-bold tracking-wider ${getAlertColor(threatState.wardenseaAlert)}`}>
                  {getAlertLabel(threatState.wardenseaAlert)}
                </span>
              </div>
              <div className="w-full bg-ocean-900 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    threatState.level >= 75 ? 'bg-crimson-500' :
                    threatState.level >= 50 ? 'bg-orange-500' :
                    threatState.level >= 25 ? 'bg-amber-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${threatState.level}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-ocean-500">{threatState.level}/100</span>
                <div className="flex gap-3">
                  {threatState.raidTarget && (
                    <span className="text-xs text-crimson-400 font-bold">
                      RAID INCOMING
                    </span>
                  )}
                  {threatState.blockadedRoutes.length > 0 && (
                    <span className="text-xs text-amber-400/80 font-bold">
                      {threatState.blockadedRoutes.length} BLOCKADE{threatState.blockadedRoutes.length > 1 ? 'S' : ''}
                    </span>
                  )}
                  {threatState.spyOperations > 0 && (
                    <span className="text-xs text-purple-400/80 font-bold">
                      {threatState.spyOperations} SPY OP{threatState.spyOperations > 1 ? 'S' : ''}
                    </span>
                  )}
                </div>
              </div>
              {threatState.level >= 10 && (
                <button
                  onClick={runCounterEspionage}
                  disabled={intelligence < THREAT.COUNTER_ESPIONAGE_INTEL_COST}
                  className="mt-2 w-full px-3 py-1.5 text-xs font-bold tracking-wider rounded-sm border transition-colors
                    enabled:bg-ocean-700/60 enabled:border-ocean-500/50 enabled:text-ocean-200 enabled:hover:bg-ocean-600/60
                    disabled:bg-ocean-900/40 disabled:border-ocean-700/30 disabled:text-ocean-600 disabled:cursor-not-allowed"
                >
                  COUNTER-ESPIONAGE ({THREAT.COUNTER_ESPIONAGE_INTEL_COST} Intel)
                </button>
              )}
            </div>
          )}

          {/* Territory Cards */}
          <div className="space-y-3">
            {controlledIslands.map((island) => {
              const tState = territoryStates[island.id];
              const bonus = islandBonuses[island.id];
              const upgrades = territoryUpgrades[island.id] || [];
              const isSelected = selectedTerritoryId === island.id;

              return (
                <div key={island.id}>
                  {/* Territory Card Header */}
                  <div
                    onClick={() => setSelectedTerritoryId(isSelected ? null : island.id)}
                    className={`px-4 py-3 border rounded-sm cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-ocean-700 border-amber-500/50 shadow-lg shadow-amber-900/10'
                        : 'bg-ocean-800 border-ocean-600 hover:border-ocean-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-ocean-100 font-bold text-sm">
                          {island.name}
                          {bonus && <span className="text-ocean-400 font-normal ml-2 text-xs">- {bonus.name.split(' - ')[1]?.trim()}</span>}
                        </h4>
                        <p className="text-ocean-500 text-xs mt-0.5">
                          {island.conquestApproach && (
                            <span className={`font-bold mr-2 ${
                              island.conquestApproach === 'force' ? 'text-crimson-400' :
                              island.conquestApproach === 'negotiation' ? 'text-green-400' :
                              island.conquestApproach === 'economic' ? 'text-amber-400' :
                              'text-purple-400'
                            }`}>
                              {island.conquestApproach.toUpperCase()}
                            </span>
                          )}
                          Day {tState?.controlledSince || '?'} · {tState?.upgrades?.length || 0}/{upgrades.length} upgrades
                          {tState?.islandRole && tState.islandRole !== 'unassigned' && (
                            <span className="text-amber-400/80 font-bold ml-2 uppercase">[{tState.islandRole.replace('_', ' ')}]</span>
                          )}
                          {threatState.raidTarget === island.id && (
                            <span className="text-crimson-400 font-bold ml-2 animate-pulse">RAID TARGET</span>
                          )}
                          {tState && tState.morale < 15 && (
                            <span className="text-red-400 font-bold ml-2 animate-pulse">CIVIL UNREST</span>
                          )}
                          {tState && tState.morale >= 15 && tState.morale < 30 && (
                            <span className="text-yellow-400 font-bold ml-2">REDUCED INCOME</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {/* Morale */}
                        <div className="text-right">
                          <span className="text-ocean-500 text-xs uppercase tracking-wider">Morale</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-16 h-2 bg-ocean-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${getMoraleBarColor(tState?.morale || 0)}`}
                                style={{ width: `${tState?.morale || 0}%` }}
                              />
                            </div>
                            <span className={`text-xs font-mono ${getMoraleTextColor(tState?.morale || 0)}`}>
                              {tState?.morale || 0}
                            </span>
                          </div>
                        </div>
                        {/* Defense */}
                        <div className="text-right">
                          <span className="text-ocean-500 text-xs uppercase tracking-wider">Defense</span>
                          {(() => {
                            const raw = tState?.defenseRating || 0;
                            const role = tState?.islandRole || 'unassigned';
                            const mult = ISLAND_ROLE_DATA[role].defenseMultiplier;
                            const effective = Math.floor(raw * mult);
                            return (
                              <p className="text-ocean-200 text-xs font-mono mt-0.5">
                                {effective}
                                {mult !== 1 && (
                                  <span className={`ml-1 text-xs ${mult > 1 ? 'text-green-400' : 'text-red-400'}`}>
                                    ({mult > 1 ? '+' : ''}{Math.round((mult - 1) * 100)}%)
                                  </span>
                                )}
                              </p>
                            );
                          })()}
                        </div>
                        <span className="text-ocean-400 text-lg">{isSelected ? '▴' : '▾'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Territory Detail */}
                  {isSelected && (
                    <div className="mt-1 px-4 py-4 bg-ocean-800/80 border border-ocean-600 rounded-sm space-y-4 animate-fade-in">
                      {/* Daily Income Breakdown */}
                      {bonus && (() => {
                        const incomeEffects = bonus.effects.filter(e =>
                          e.stat.endsWith('_per_day')
                        );
                        // Also check upgrade income
                        const upgradeIncome: { stat: string; value: number; source: string }[] = [];
                        if (tState) {
                          tState.upgrades.forEach(uid => {
                            const upgrade = upgrades.find(u => u.id === uid);
                            if (!upgrade) return;
                            upgrade.effects.filter(e => e.stat.endsWith('_per_day')).forEach(e => {
                              upgradeIncome.push({ stat: e.stat, value: e.value, source: upgrade.name });
                            });
                          });
                        }
                        const morale = tState?.morale ?? 60;
                        const moraleMultiplier = morale >= 30 ? 1.0 : morale >= 15 ? 0.5 : 0;
                        const currentRole = tState?.islandRole || 'unassigned';
                        const roleIncomeMultiplier = ISLAND_ROLE_DATA[currentRole].incomeMultiplier;
                        const totalScale = moraleMultiplier * roleIncomeMultiplier;
                        const iconMap: Record<string, string> = {
                          sovereigns_per_day: '⬡', supplies_per_day: '◈',
                          materials_per_day: '⬢', intelligence_per_day: '◉',
                          reputation_per_day: '★',
                        };
                        const scaleLabel = totalScale === 1 ? '' :
                          `×${totalScale.toFixed(totalScale === 0.5 || totalScale === 0 ? 1 : 2)}`;
                        return (
                          <div>
                            <h5 className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-2">DAILY INCOME</h5>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
                              {incomeEffects.map((e, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                  <span className="text-ocean-400">
                                    {iconMap[e.stat] || '·'} {e.stat.replace('_per_day', '').replace('_', ' ')}
                                  </span>
                                  <span className={`font-bold ${totalScale < 1 ? (totalScale === 0 ? 'text-red-400' : 'text-yellow-400') : 'text-green-400'}`}>
                                    +{Math.floor(e.value * totalScale)}
                                    {totalScale !== 1 && <span className="text-ocean-600 font-normal ml-1">({scaleLabel})</span>}
                                  </span>
                                </div>
                              ))}
                              {upgradeIncome.map((e, i) => (
                                <div key={`u${i}`} className="flex items-center justify-between text-xs">
                                  <span className="text-green-400">
                                    {iconMap[e.stat] || '·'} {e.source}
                                  </span>
                                  <span className={`font-bold ${totalScale < 1 ? (totalScale === 0 ? 'text-red-400' : 'text-yellow-400') : 'text-green-400'}`}>
                                    +{Math.floor(e.value * totalScale)}
                                    {totalScale !== 1 && <span className="text-ocean-600 font-normal ml-1">({scaleLabel})</span>}
                                  </span>
                                </div>
                              ))}
                            </div>
                            {moraleMultiplier === 0 && (
                              <p className="text-red-400 text-xs italic">Rebellion -- no income from this territory</p>
                            )}
                            {moraleMultiplier === 0.5 && (
                              <p className="text-yellow-400 text-xs italic">Low morale reduces income by 50%</p>
                            )}
                            {roleIncomeMultiplier !== 1 && moraleMultiplier > 0 && (
                              <p className="text-ocean-400 text-xs italic">
                                Role modifier: {roleIncomeMultiplier > 1 ? '+' : ''}{Math.round((roleIncomeMultiplier - 1) * 100)}% income
                              </p>
                            )}
                          </div>
                        );
                      })()}

                      {/* Passive Bonuses (non-income) */}
                      {bonus && (() => {
                        const nonIncomeEffects = bonus.effects.filter(e => !e.stat.endsWith('_per_day'));
                        if (nonIncomeEffects.length === 0) return null;
                        return (
                          <div>
                            <h5 className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-2">PASSIVE BONUSES</h5>
                            <div className="space-y-1">
                              {nonIncomeEffects.map((effect, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <span className="text-amber-400">+</span>
                                  <span className="text-ocean-200">{effect.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Active upgrade bonuses */}
                      {tState && tState.upgrades.length > 0 && (
                        <div>
                          <h5 className="text-green-400 text-xs font-bold tracking-wider uppercase mb-2">UPGRADE BONUSES</h5>
                          <div className="space-y-1">
                            {tState.upgrades.map((uid) => {
                              const upgrade = upgrades.find((u) => u.id === uid);
                              if (!upgrade) return null;
                              return (
                                <div key={uid} className="flex items-center gap-2 text-sm">
                                  <span className="text-green-400">{upgrade.icon}</span>
                                  <span className="text-ocean-200">{upgrade.name}</span>
                                  <span className="text-ocean-500 text-xs ml-auto">
                                    {upgrade.effects.map((e) => e.description).join(', ')}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Upgrade in progress */}
                      {tState?.upgradeInProgress && (
                        <div className="px-3 py-2 bg-amber-900/20 border border-amber-500/30 rounded-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-amber-400 text-xs font-bold">🏗️ BUILDING</span>
                              <p className="text-ocean-200 text-sm mt-0.5">
                                {upgrades.find((u) => u.id === tState.upgradeInProgress!.upgradeId)?.name || 'Unknown'}
                              </p>
                            </div>
                            <span className="text-amber-400 text-xs font-mono">
                              Day {tState.upgradeInProgress.completionDay}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Available Upgrades */}
                      {upgrades.length > 0 && !tState?.upgradeInProgress && (
                        <div>
                          <h5 className="text-ocean-400 text-xs font-bold tracking-wider uppercase mb-2">AVAILABLE UPGRADES</h5>
                          <div className="space-y-2">
                            {upgrades
                              .filter((u) => !tState?.upgrades?.includes(u.id))
                              .map((upgrade) => {
                                const prereqsMet = !upgrade.requires || upgrade.requires.every((r) => tState?.upgrades?.includes(r));
                                const canAfford = Object.entries(upgrade.cost).every(
                                  ([key, value]) => resources[key as keyof typeof resources] >= (value as number)
                                );
                                const locked = !prereqsMet;

                                return (
                                  <div
                                    key={upgrade.id}
                                    className={`p-3 border rounded-sm transition-all ${
                                      locked
                                        ? 'border-ocean-700 bg-ocean-800/50 opacity-50'
                                        : canAfford
                                          ? 'border-amber-500/30 bg-ocean-800 hover:border-amber-500/60 cursor-pointer'
                                          : 'border-ocean-600 bg-ocean-800'
                                    }`}
                                    onClick={() => {
                                      if (!locked && canAfford) {
                                        startTerritoryUpgrade(island.id, upgrade.id);
                                      }
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span className="text-lg">{upgrade.icon}</span>
                                        <div>
                                          <span className={`text-sm font-bold ${locked ? 'text-ocean-500' : 'text-ocean-100'}`}>
                                            {upgrade.name}
                                          </span>
                                          <span className="text-ocean-500 text-xs ml-2">T{upgrade.tier}</span>
                                        </div>
                                      </div>
                                      {!locked && (
                                        <span className={`text-xs font-bold ${canAfford ? 'text-amber-400' : 'text-red-400'}`}>
                                          {canAfford ? `BUILD (${upgrade.daysToComplete}d)` : 'INSUFFICIENT'}
                                        </span>
                                      )}
                                      {locked && (
                                        <span className="text-ocean-600 text-xs">🔒 LOCKED</span>
                                      )}
                                    </div>
                                    <p className="text-ocean-400 text-xs mt-1">{upgrade.description}</p>
                                    <div className="flex items-center gap-3 mt-2 text-xs">
                                      {Object.entries(upgrade.cost).map(([key, value]) => (
                                        <span key={key} className={`${
                                          resources[key as keyof typeof resources] >= (value as number) ? 'text-ocean-300' : 'text-red-400'
                                        }`}>
                                          {value} {key}
                                        </span>
                                      ))}
                                    </div>
                                    {/* ROI Preview */}
                                    {!locked && (() => {
                                      const sovPerDay = upgrade.effects
                                        .filter(e => e.stat === 'sovereigns_per_day')
                                        .reduce((sum, e) => sum + e.value, 0);
                                      const supPerDay = upgrade.effects
                                        .filter(e => e.stat === 'supplies_per_day')
                                        .reduce((sum, e) => sum + e.value, 0);
                                      const matPerDay = upgrade.effects
                                        .filter(e => e.stat === 'materials_per_day')
                                        .reduce((sum, e) => sum + e.value, 0);
                                      const intPerDay = upgrade.effects
                                        .filter(e => e.stat === 'intelligence_per_day')
                                        .reduce((sum, e) => sum + e.value, 0);
                                      const hasIncome = sovPerDay > 0 || supPerDay > 0 || matPerDay > 0 || intPerDay > 0;
                                      const sovCostVal = (upgrade.cost.sovereigns || 0);
                                      const breakEven = sovPerDay > 0 ? Math.ceil(sovCostVal / sovPerDay) : null;
                                      const incomeParts: string[] = [];
                                      if (sovPerDay > 0) incomeParts.push(`+${sovPerDay} sov/day`);
                                      if (supPerDay > 0) incomeParts.push(`+${supPerDay} supplies/day`);
                                      if (matPerDay > 0) incomeParts.push(`+${matPerDay} materials/day`);
                                      if (intPerDay > 0) incomeParts.push(`+${intPerDay} intel/day`);
                                      if (!hasIncome) return null;
                                      return (
                                        <p className="text-green-400/70 text-xs mt-1.5">
                                          Income: {incomeParts.join(', ')}
                                          {breakEven != null && `. Pays for itself in ~${breakEven + upgrade.daysToComplete}d`}
                                        </p>
                                      );
                                    })()}
                                    {locked && upgrade.requires && (
                                      <p className="text-ocean-600 text-xs mt-1 italic">
                                        Requires: {upgrade.requires.map((r) => upgrades.find((u) => u.id === r)?.name || r).join(', ')}
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}

                      {/* Island Role Selection -- gated behind 5+ controlled islands */}
                      {tState && territoryCount < UNLOCK_THRESHOLDS.islandRoles && (
                        <div>
                          <h5 className="text-ocean-600 text-xs font-bold tracking-wider uppercase mb-1">
                            &#128274; ISLAND ROLE
                          </h5>
                          <p className="text-ocean-500 text-xs italic">
                            Control {UNLOCK_THRESHOLDS.islandRoles}+ islands to assign specialized roles (Trade Hub, Military, Intel Center).
                            Currently: {territoryCount} island{territoryCount !== 1 ? 's' : ''}.
                          </p>
                        </div>
                      )}
                      {tState && territoryCount >= UNLOCK_THRESHOLDS.islandRoles && (() => {
                        const currentRole = tState.islandRole || 'unassigned';
                        const cooldownRemaining = Math.max(0, 5 - (dayCount - (tState.roleChangedDay || 0)));
                        const onCooldown = cooldownRemaining > 0 && currentRole !== 'unassigned';
                        const roles: Array<{ id: 'outpost' | 'trade_hub' | 'intel_center' | 'military' | 'unassigned'; label: string; icon: string }> = [
                          { id: 'unassigned', label: 'NONE', icon: '·' },
                          { id: 'outpost', label: 'OUTPOST', icon: '🏠' },
                          { id: 'trade_hub', label: 'TRADE HUB', icon: '💰' },
                          { id: 'intel_center', label: 'INTEL', icon: '🔍' },
                          { id: 'military', label: 'MILITARY', icon: '⚔️' },
                        ];
                        return (
                          <div>
                            <h5 className="text-ocean-400 text-xs font-bold tracking-wider uppercase mb-2">
                              ISLAND ROLE
                              {onCooldown && (
                                <span className="ml-2 text-ocean-500 text-xs normal-case font-normal">
                                  (change in {cooldownRemaining}d)
                                </span>
                              )}
                            </h5>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {roles.map(({ id, label, icon }) => {
                                const isActive = currentRole === id;
                                const roleData = ISLAND_ROLE_DATA[id];
                                const disabled = onCooldown && !isActive;
                                return (
                                  <button
                                    key={id}
                                    onClick={() => !disabled && setIslandRole(island.id, id)}
                                    disabled={disabled}
                                    className={`px-2.5 py-1.5 text-xs font-bold tracking-wider rounded-sm transition-all ${
                                      isActive
                                        ? 'bg-amber-600/40 text-amber-300 border border-amber-500/50'
                                        : disabled
                                          ? 'bg-ocean-800 text-ocean-600 border border-ocean-700 cursor-not-allowed'
                                          : 'bg-ocean-700 text-ocean-300 hover:bg-ocean-600 border border-ocean-600'
                                    }`}
                                    title={roleData.description}
                                  >
                                    {icon} {label}
                                    {isActive && <span className="ml-1 text-amber-400">*</span>}
                                  </button>
                                );
                              })}
                            </div>
                            {currentRole !== 'unassigned' && (
                              <p className="text-ocean-500 text-xs italic">
                                {ISLAND_ROLE_DATA[currentRole].description}
                              </p>
                            )}
                          </div>
                        );
                      })()}

                      {/* Morale Actions - player can invest to boost morale */}
                      {tState && tState.morale < 70 && (
                        <div>
                          <h5 className="text-ocean-400 text-xs font-bold tracking-wider uppercase mb-2">MORALE ACTIONS</h5>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const cost = 30;
                                if (resources.sovereigns < cost) {
                                  addNotification({
                                    type: 'story',
                                    title: 'NOT ENOUGH SOVEREIGNS',
                                    message: `Investing requires ${formatNumber(cost)} Sovereigns. You have ${formatNumber(resources.sovereigns)}.`,
                                  });
                                  return;
                                }
                                spendResources({ sovereigns: cost });
                                boostTerritoryMorale(island.id, 15);
                                addNotification({
                                  type: 'story',
                                  title: 'INVESTED IN ' + island.name.toUpperCase(),
                                  message: 'Spent 30 Sovereigns on local commerce and infrastructure. Morale +15.',
                                });
                              }}
                              disabled={resources.sovereigns < 30}
                              className={`flex-1 px-3 py-2 text-xs font-bold tracking-wider rounded-sm transition-all ${
                                resources.sovereigns >= 30
                                  ? 'bg-amber-900/40 hover:bg-amber-800/50 border border-amber-500/30 text-amber-200'
                                  : 'bg-ocean-700 border border-ocean-600 text-ocean-500 cursor-not-allowed'
                              }`}
                            >
                              INVEST (30 Sov, +15 Morale)
                            </button>
                            <button
                              onClick={() => {
                                const cost = 10;
                                if (resources.supplies < cost) {
                                  addNotification({
                                    type: 'story',
                                    title: 'NOT ENOUGH SUPPLIES',
                                    message: `Garrisoning requires ${formatNumber(cost)} supplies. You have ${formatNumber(resources.supplies)}.`,
                                  });
                                  return;
                                }
                                spendResources({ supplies: cost });
                                boostTerritoryMorale(island.id, 8, 5);
                                addNotification({
                                  type: 'story',
                                  title: 'GARRISONED ' + island.name.toUpperCase(),
                                  message: 'Stationed supplies and personnel. Morale +8, Defense +5.',
                                });
                              }}
                              disabled={resources.supplies < 10}
                              className={`flex-1 px-3 py-2 text-xs font-bold tracking-wider rounded-sm transition-all ${
                                resources.supplies >= 10
                                  ? 'bg-blue-900/40 hover:bg-blue-800/50 border border-blue-500/30 text-blue-200'
                                  : 'bg-ocean-700 border border-ocean-600 text-ocean-500 cursor-not-allowed'
                              }`}
                            >
                              GARRISON (10 Sup, +8 Mor, +5 Def)
                            </button>
                            <button
                              onClick={() => fortifyTerritory(island.id)}
                              disabled={resources.sovereigns < FORTIFICATION.COST}
                              className={`flex-1 px-3 py-2 text-xs font-bold tracking-wider rounded-sm transition-all ${
                                resources.sovereigns >= FORTIFICATION.COST
                                  ? 'bg-purple-900/40 hover:bg-purple-800/50 border border-purple-500/30 text-purple-200'
                                  : 'bg-ocean-700 border border-ocean-600 text-ocean-500 cursor-not-allowed'
                              }`}
                            >
                              FORTIFY ({FORTIFICATION.COST} Sov, +{FORTIFICATION.DEFENSE_BOOST} Def)
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Crew Dispatch - send a crew member to stabilize morale */}
                      {tState && tState.morale < 60 && (() => {
                        const activeDispatch = tState.crewDispatched && dayCount <= tState.crewDispatched.untilDay;
                        const dispatchedCrewMember = activeDispatch
                          ? crew.find((m) => m.id === tState.crewDispatched?.crewId)
                          : null;
                        const availableCrew = crew.filter((m) => {
                          if (!m.recruited || !m.alive) return false;
                          return !Object.values(territoryStates).some(
                            (ts) => ts.crewDispatched?.crewId === m.id && dayCount <= ts.crewDispatched.untilDay
                          );
                        });

                        return (
                          <div>
                            <h5 className="text-ocean-400 text-xs font-bold tracking-wider uppercase mb-2">CREW DISPATCH</h5>
                            {activeDispatch && dispatchedCrewMember ? (
                              <div className="px-3 py-2 bg-teal-900/30 border border-teal-500/30 rounded-sm">
                                <span className="text-teal-300 text-sm font-bold">{dispatchedCrewMember.name}</span>
                                <span className="text-ocean-400 text-xs ml-2">
                                  stationed here · {tState.crewDispatched!.untilDay - dayCount} day{tState.crewDispatched!.untilDay - dayCount !== 1 ? 's' : ''} remaining · +{tState.crewDispatched!.moraleBoost}/day
                                </span>
                              </div>
                            ) : availableCrew.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {availableCrew.slice(0, 4).map((m) => (
                                  <button
                                    key={m.id}
                                    onClick={() => {
                                      if (resources.supplies < 15) {
                                        addNotification({
                                          type: 'story',
                                          title: 'NOT ENOUGH SUPPLIES',
                                          message: `Dispatching crew requires 15 supplies. You have ${formatNumber(resources.supplies)}.`,
                                        });
                                        return;
                                      }
                                      dispatchCrewToIsland(island.id, m.id);
                                    }}
                                    disabled={resources.supplies < 15}
                                    className={`px-3 py-2 text-xs font-bold tracking-wider rounded-sm transition-all ${
                                      resources.supplies >= 15
                                        ? 'bg-teal-900/40 hover:bg-teal-800/50 border border-teal-500/30 text-teal-200'
                                        : 'bg-ocean-700 border border-ocean-600 text-ocean-500 cursor-not-allowed'
                                    }`}
                                  >
                                    SEND {m.name.toUpperCase()} (15 Sup)
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <p className="text-ocean-500 text-xs italic">All crew dispatched elsewhere.</p>
                            )}
                            <p className="text-ocean-600 text-xs mt-1">Dispatched crew boosts morale +4/day for 3 days.</p>
                          </div>
                        );
                      })()}

                      {/* Under attack warning */}
                      {tState?.underAttack && (
                        <div className="px-3 py-2 bg-red-900/30 border border-red-500/40 rounded-sm animate-pulse">
                          <span className="text-red-400 text-sm font-bold">UNDER ATTACK</span>
                          <p className="text-red-300 text-xs mt-0.5">This territory is being contested. Morale drops rapidly.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Combat bonuses summary */}
          {(() => {
            const bonuses = getTerritoryBonuses();
            const hasBonus = bonuses.combatBonuses.attack > 0 || bonuses.combatBonuses.defense > 0 ||
                             bonuses.combatBonuses.hp > 0 || bonuses.travelDiscount > 0 || bonuses.tradeDiscount > 0;
            if (!hasBonus) return null;
            return (
              <div className="px-4 py-3 bg-ocean-800 border border-ocean-600 rounded-sm">
                <h5 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">EMPIRE BONUSES</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {bonuses.combatBonuses.attack > 0 && (
                    <span className="text-red-400">+{bonuses.combatBonuses.attack} ATK</span>
                  )}
                  {bonuses.combatBonuses.defense > 0 && (
                    <span className="text-blue-400">+{bonuses.combatBonuses.defense} DEF</span>
                  )}
                  {bonuses.combatBonuses.hp > 0 && (
                    <span className="text-green-400">+{bonuses.combatBonuses.hp} Max HP</span>
                  )}
                  {bonuses.combatBonuses.staminaRegen > 0 && (
                    <span className="text-blue-300">+{bonuses.combatBonuses.staminaRegen} Stamina Regen</span>
                  )}
                  {bonuses.travelDiscount > 0 && (
                    <span className="text-ocean-300">{bonuses.travelDiscount}% cheaper travel</span>
                  )}
                  {bonuses.tradeDiscount > 0 && (
                    <span className="text-amber-400">{bonuses.tradeDiscount}% trade discount</span>
                  )}
                  {bonuses.xpBonus > 0 && (
                    <span className="text-purple-400">{bonuses.xpBonus}% faster growth</span>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Trade Routes -- gated behind 3+ controlled islands */}
          {controlledIslands.length >= 2 && controlledIslands.length < UNLOCK_THRESHOLDS.tradeRoutes && (
            <div className="mt-6 pt-4 border-t border-ocean-600">
              <h3 className="text-xs font-bold text-ocean-600 tracking-wider uppercase mb-2">
                &#128274; TRADE ROUTES
              </h3>
              <p className="text-ocean-500 text-xs italic">
                Control {UNLOCK_THRESHOLDS.tradeRoutes}+ islands to establish trade routes between your territories.
                Currently: {territoryCount} island{territoryCount !== 1 ? 's' : ''}.
              </p>
            </div>
          )}
          {controlledIslands.length >= UNLOCK_THRESHOLDS.tradeRoutes && (
            <div className="mt-6 pt-4 border-t border-ocean-600">
              <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-3">TRADE ROUTES</h3>

              {/* Active routes */}
              {tradeRoutes.length > 0 && (
                <div className="space-y-2 mb-4">
                  {tradeRoutes.map((route) => {
                    const fromName = islands.find((i) => i.id === route.fromIsland)?.name || route.fromIsland;
                    const toName = islands.find((i) => i.id === route.toIsland)?.name || route.toIsland;
                    const income = route.dailyIncome;
                    const isBlockaded = threatState.blockadedRoutes?.includes(route.id);
                    return (
                      <div key={route.id} className={`px-4 py-3 bg-ocean-800 border rounded-sm ${isBlockaded ? 'border-crimson-500/40 opacity-70' : 'border-amber-500/20'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={isBlockaded ? 'text-crimson-400' : 'text-amber-400'}>⬡</span>
                            <span className="text-ocean-100 text-sm font-bold">{fromName}</span>
                            <span className="text-ocean-500 text-xs">&#8644;</span>
                            <span className="text-ocean-100 text-sm font-bold">{toName}</span>
                            {isBlockaded && (
                              <span className="text-xs font-bold text-crimson-400 bg-crimson-900/40 px-1.5 py-0.5 rounded-sm tracking-wider">BLOCKADED</span>
                            )}
                          </div>
                          <div className="text-right">
                            <span className={`text-sm font-bold ${isBlockaded ? 'text-crimson-400 line-through' : 'text-amber-400'}`}>+{income} Sov/day</span>
                            <p className="text-ocean-500 text-xs">{route.daysActive} days active</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Establish new routes */}
              {(() => {
                const pairs: { from: string; to: string; fromName: string; toName: string }[] = [];
                for (let i = 0; i < controlledIslands.length; i++) {
                  for (let j = i + 1; j < controlledIslands.length; j++) {
                    const a = controlledIslands[i];
                    const b = controlledIslands[j];
                    const alreadyExists = tradeRoutes.some(
                      (r) =>
                        (r.fromIsland === a.id && r.toIsland === b.id) ||
                        (r.fromIsland === b.id && r.toIsland === a.id)
                    );
                    if (!alreadyExists) {
                      pairs.push({ from: a.id, to: b.id, fromName: a.name, toName: b.name });
                    }
                  }
                }
                if (pairs.length === 0) return (
                  <p className="text-ocean-500 text-xs italic">
                    {tradeRoutes.length > 0 ? 'All possible routes established.' : 'Control 2+ islands to establish trade routes.'}
                  </p>
                );
                const bonuses = getTerritoryBonuses();
                const discountPct = Math.min(TRADE.ROUTE_DISCOUNT_CAP, bonuses.tradeDiscount || 0);
                const sovCost = Math.max(TRADE.ROUTE_SOV_MIN, Math.floor(TRADE.ROUTE_SOV_COST * (1 - discountPct / 100)));
                const matCost = Math.max(TRADE.ROUTE_MAT_MIN, Math.floor(TRADE.ROUTE_MAT_COST * (1 - discountPct / 100)));
                const canAfford = resources.sovereigns >= sovCost && resources.materials >= matCost;
                return (
                  <div className="space-y-2">
                    <p className="text-ocean-500 text-xs mb-2">
                      Cost: {sovCost} Sovereigns + {matCost} Materials per route.{discountPct > 0 ? ` (${discountPct}% trade discount)` : ''} Income scales with complementary resources.
                    </p>
                    {pairs.map(({ from, to, fromName, toName }) => {
                      const fromIsland = islands.find(i => i.id === from);
                      const toIsland = islands.find(i => i.id === to);
                      const fromRes = fromIsland?.resources || [];
                      const toRes = toIsland?.resources || [];
                      const fromPop = fromIsland?.population || 0;
                      const toPop = toIsland?.population || 0;
                      const initialIncome = calculateTradeRouteIncome(fromRes, toRes, fromPop, toPop, 0);
                      const matureIncome = calculateTradeRouteIncome(fromRes, toRes, fromPop, toPop, 14);
                      const fromCats = new Set(fromRes.map(r => resourceCategories[r] || 'other'));
                      const toCats = new Set(toRes.map(r => resourceCategories[r] || 'other'));
                      let complementaryCount = 0;
                      toCats.forEach(cat => { if (!fromCats.has(cat)) complementaryCount++; });
                      fromCats.forEach(cat => { if (!toCats.has(cat)) complementaryCount++; });
                      return (
                        <div key={`${from}-${to}`} className="space-y-1">
                          <button
                            onClick={() => {
                              const success = establishTradeRoute(from, to);
                              if (success) {
                                addNotification({
                                  type: 'story',
                                  title: 'TRADE ROUTE ESTABLISHED',
                                  message: `Commerce flows between ${fromName} and ${toName}. Expected +${initialIncome} sov/day, maturing to +${matureIncome} in 14 days.`,
                                });
                              }
                            }}
                            disabled={!canAfford}
                            className={`w-full px-4 py-2 text-xs font-bold tracking-wider rounded-sm transition-all flex items-center justify-between ${
                              canAfford
                                ? 'bg-amber-900/30 hover:bg-amber-800/40 border border-amber-500/30 text-amber-200'
                                : 'bg-ocean-800 border border-ocean-700 text-ocean-500 cursor-not-allowed'
                            }`}
                          >
                            <span>{fromName} &#8644; {toName}</span>
                            <span className="text-ocean-400">{sovCost}⬡ {matCost}⬢</span>
                          </button>
                          <p className="text-ocean-500 text-xs pl-1">
                            +{initialIncome} sov/day ({complementaryCount} complementary resource{complementaryCount !== 1 ? 's' : ''}
                            {matureIncome > initialIncome ? `, matures to +${matureIncome} in 14d` : ''})
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}
        </>
      )}
    </div>
  );
};
