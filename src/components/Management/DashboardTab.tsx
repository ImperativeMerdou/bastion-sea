import React, { useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import { calculateTerritoryUpkeep, ISLAND_ROLE_DATA, islandBonuses, territoryUpgrades } from '../../systems/territory';
import { calculateDailyUpkeep } from '../../systems/economy';
import { ECONOMY } from '../../constants/balance';
import GameIcon from '../UI/GameIcon';
import { Divider } from '../UI/Divider';
import { formatNumber, getMoraleBarColor, getMoraleTextColor } from '../../utils/formatting';

// =============================================
// EMPIRE DASHBOARD
// =============================================
// Replaces the old Resources/HOLD tab with a
// full income/cost breakdown, territory health
// overview, and crew assignment summary.
// =============================================

/** Calculate per-island income (base + upgrades, before morale/role scaling) */
function getIslandBaseIncome(islandId: string, completedUpgrades: string[]): number {
  let sov = 0;
  const bonus = islandBonuses[islandId];
  if (bonus) {
    bonus.effects.forEach(e => {
      if (e.stat === 'sovereigns_per_day') sov += e.value;
    });
  }
  const upgrades = territoryUpgrades[islandId] || [];
  completedUpgrades.forEach(uid => {
    const u = upgrades.find(up => up.id === uid);
    if (u) {
      u.effects.forEach(e => {
        if (e.stat === 'sovereigns_per_day') sov += e.value;
      });
    }
  });
  return sov;
}

/** Calculate per-island scaled sovereignty income (with morale + role) */
function getIslandScaledIncome(
  islandId: string,
  completedUpgrades: string[],
  morale: number,
  role: string,
): number {
  const baseSov = getIslandBaseIncome(islandId, completedUpgrades);
  const moraleScale = morale >= 30 ? 1.0 : morale >= 15 ? 0.5 : 0;
  const roleData = ISLAND_ROLE_DATA[role as keyof typeof ISLAND_ROLE_DATA] || ISLAND_ROLE_DATA.unassigned;
  return Math.floor(baseSov * moraleScale * roleData.incomeMultiplier);
}

/** Get the daily bonus description for a crew assignment */
function getAssignmentBonusText(
  assignment: string,
  territorySovIncome: number,
): string {
  switch (assignment) {
    case 'lookout': return `+${ECONOMY.LOOKOUT_INTEL_BONUS} intel/day`;
    case 'diplomat': return `+${ECONOMY.DIPLOMAT_MORALE_BONUS} morale/day`;
    case 'trader': {
      const bonus = Math.max(1, Math.floor(territorySovIncome * ECONOMY.TRADER_INCOME_BONUS));
      return `+${bonus} sov/day`;
    }
    case 'trainer': return `+${ECONOMY.TRAINER_XP_BONUS} dominion XP/day`;
    case 'navigator': return `-${ECONOMY.NAVIGATOR_TRAVEL_REDUCTION} travel day`;
    case 'quartermaster': return 'Supply crisis -5%';
    default: return 'None';
  }
}

// Morale colors imported from shared utils

/** Role display label */
const ROLE_LABELS: Record<string, string> = {
  outpost: 'Outpost',
  trade_hub: 'Trade Hub',
  intel_center: 'Intel Center',
  military: 'Military',
  unassigned: 'Unassigned',
};

const ASSIGNMENT_LABELS: Record<string, string> = {
  navigator: 'Navigator',
  lookout: 'Lookout',
  trader: 'Trader',
  trainer: 'Trainer',
  diplomat: 'Diplomat',
  unassigned: 'Unassigned',
};

export const DashboardTab: React.FC = () => {
  const resources = useGameStore(s => s.resources);
  const crew = useGameStore(s => s.crew);
  const islands = useGameStore(s => s.islands);
  const territoryStates = useGameStore(s => s.territoryStates);
  const tradeRoutes = useGameStore(s => s.tradeRoutes);
  const getTerritoryBonuses = useGameStore(s => s.getTerritoryBonuses);
  const threatState = useGameStore(s => s.threatState);

  const controlledIslands = useMemo(() => islands.filter(i => i.status === 'controlled'), [islands]);
  const recruitedCrew = useMemo(() => crew.filter(m => m.recruited && m.alive), [crew]);
  const bonuses = getTerritoryBonuses();

  // --- LEDGER CALCULATIONS (memoized) ---
  const ledger = useMemo(() => {
    const territorySovIncome = bonuses.dailyIncome.sovereigns || 0;
    const territorySupIncome = bonuses.dailyIncome.supplies || 0;
    const territoryMatIncome = bonuses.dailyIncome.materials || 0;
    const territoryIntelIncome = bonuses.dailyIncome.intelligence || 0;

    const activeRoutes = tradeRoutes.filter(r => !threatState.blockadedRoutes.includes(r.id));
    const tradeRouteIncome = activeRoutes.reduce((sum, r) => sum + r.dailyIncome, 0);

    let crewSovBonus = 0;
    let crewIntelBonus = 0;
    const assignedCrew = recruitedCrew.filter(m => !m.injured && m.assignment && m.assignment !== 'unassigned');
    assignedCrew.forEach(m => {
      switch (m.assignment) {
        case 'lookout': crewIntelBonus += ECONOMY.LOOKOUT_INTEL_BONUS; break;
        case 'trader': crewSovBonus += Math.max(1, Math.floor(territorySovIncome * ECONOMY.TRADER_INCOME_BONUS)); break;
      }
    });

    const totalSovIncome = territorySovIncome + tradeRouteIncome + crewSovBonus;
    const totalSupIncome = territorySupIncome;
    const totalMatIncome = territoryMatIncome;
    const totalIntelIncome = territoryIntelIncome + crewIntelBonus;

    const crewUpkeep = calculateDailyUpkeep(crew, controlledIslands.length);
    const territoryUpkeep = calculateTerritoryUpkeep(controlledIslands.length);
    const routeSupplyCost = tradeRoutes.length * ECONOMY.SUPPLY_PER_TRADE_ROUTE;
    const totalSupplyCost = crewUpkeep + territoryUpkeep + routeSupplyCost;

    const adminCost = controlledIslands.length * ECONOMY.ADMIN_COST_PER_ISLAND;
    const activeRouteCount = activeRoutes.length;
    const fleetMaintCost = activeRouteCount * ECONOMY.FLEET_MAINT_PER_ROUTE;
    let upgradeMaintCost = 0;
    for (const island of controlledIslands) {
      const ts = territoryStates[island.id];
      const islandUpgDefs = territoryUpgrades[island.id] || [];
      if (ts?.upgrades) {
        for (const upgId of ts.upgrades) {
          const upgDef = islandUpgDefs.find(u => u.id === upgId);
          if (upgDef) {
            upgradeMaintCost += Math.ceil((upgDef.cost.sovereigns || 0) * ECONOMY.UPGRADE_MAINT_RATE);
          }
        }
      }
    }
    const totalSovCost = adminCost + fleetMaintCost + upgradeMaintCost;

    return {
      territorySovIncome, territorySupIncome, territoryMatIncome, territoryIntelIncome,
      tradeRouteIncome, crewSovBonus, crewIntelBonus,
      totalSovIncome, totalSupIncome, totalMatIncome, totalIntelIncome,
      crewUpkeep, territoryUpkeep, routeSupplyCost, totalSupplyCost,
      adminCost, fleetMaintCost, upgradeMaintCost, totalSovCost,
      netSov: totalSovIncome - totalSovCost,
      netSup: totalSupIncome - totalSupplyCost,
      netMat: totalMatIncome,
      netIntel: totalIntelIncome,
    };
  }, [bonuses, tradeRoutes, threatState, recruitedCrew, crew, controlledIslands, territoryStates]);

  const {
    territorySovIncome, tradeRouteIncome, crewSovBonus,
    totalSovIncome, totalSupIncome, totalMatIncome, totalIntelIncome,
    crewUpkeep, territoryUpkeep, routeSupplyCost, totalSupplyCost,
    adminCost, fleetMaintCost, upgradeMaintCost, totalSovCost,
    netSov, netSup, netMat, netIntel,
  } = ledger;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ======================== */}
      {/* TOP: RESOURCE STOCKPILE  */}
      {/* ======================== */}
      <div>
        <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-3">STOCKPILE</h3>
        <div className="grid grid-cols-4 gap-3">
          <div className="p-3 bg-ocean-800 border border-ocean-600 rounded-sm text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <GameIcon iconKey="sovereignty" fallback="S" className="w-5 h-5" />
              <span className="text-ocean-400 text-xs tracking-wider">SOV</span>
            </div>
            <p className="text-ocean-100 text-lg font-bold">{formatNumber(resources.sovereigns)}</p>
          </div>
          <div className="p-3 bg-ocean-800 border border-ocean-600 rounded-sm text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <GameIcon iconKey="supplies" fallback="P" className="w-5 h-5" />
              <span className="text-ocean-400 text-xs tracking-wider">SUP</span>
            </div>
            <p className="text-ocean-100 text-lg font-bold">{formatNumber(resources.supplies)}</p>
          </div>
          <div className="p-3 bg-ocean-800 border border-ocean-600 rounded-sm text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <GameIcon iconKey="materials" fallback="M" className="w-5 h-5" />
              <span className="text-ocean-400 text-xs tracking-wider">MAT</span>
            </div>
            <p className="text-ocean-100 text-lg font-bold">{formatNumber(resources.materials)}</p>
          </div>
          <div className="p-3 bg-ocean-800 border border-ocean-600 rounded-sm text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <GameIcon iconKey="intelligence" fallback="I" className="w-5 h-5" />
              <span className="text-ocean-400 text-xs tracking-wider">INTEL</span>
            </div>
            <p className="text-ocean-100 text-lg font-bold">{formatNumber(resources.intelligence)}</p>
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* TOP: INCOME / COSTS SUMMARY    */}
      {/* ============================== */}
      <div>
        <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-3">DAILY LEDGER</h3>
        <div className="p-4 bg-ocean-800/60 border border-ocean-600 rounded-sm space-y-3">
          {/* Sovereignty income breakdown */}
          <div className="flex items-start justify-between">
            <span className="text-ocean-400 text-xs tracking-wider w-20 flex-shrink-0 pt-0.5">INCOME</span>
            <div className="flex-1 text-right">
              <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs">
                {territorySovIncome > 0 && (
                  <span className="text-ocean-300">Territory: <span className="text-green-400">+{territorySovIncome}</span></span>
                )}
                {tradeRouteIncome > 0 && (
                  <span className="text-ocean-300">Routes: <span className="text-green-400">+{tradeRouteIncome}</span></span>
                )}
                {crewSovBonus > 0 && (
                  <span className="text-ocean-300">Crew: <span className="text-green-400">+{crewSovBonus}</span></span>
                )}
              </div>
              <p className="text-green-400 text-sm font-bold mt-1">
                +{totalSovIncome} sov/day
                {totalSupIncome > 0 && <span className="text-ocean-300 font-normal"> | +{totalSupIncome} sup</span>}
                {totalMatIncome > 0 && <span className="text-ocean-300 font-normal"> | +{totalMatIncome} mat</span>}
                {totalIntelIncome > 0 && <span className="text-ocean-300 font-normal"> | +{totalIntelIncome} intel</span>}
              </p>
            </div>
          </div>

          {/* Divider */}
          <Divider className="my-1" />

          {/* Costs breakdown */}
          <div className="flex items-start justify-between">
            <span className="text-ocean-400 text-xs tracking-wider w-20 flex-shrink-0 pt-0.5">COSTS</span>
            <div className="flex-1 text-right">
              <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs">
                {crewUpkeep > 0 && (
                  <span className="text-ocean-300">Crew: <span className="text-crimson-400">-{crewUpkeep}</span></span>
                )}
                {territoryUpkeep > 0 && (
                  <span className="text-ocean-300">Territory: <span className="text-crimson-400">-{territoryUpkeep}</span></span>
                )}
                {routeSupplyCost > 0 && (
                  <span className="text-ocean-300">Routes: <span className="text-crimson-400">-{routeSupplyCost}</span> sup</span>
                )}
                {adminCost > 0 && (
                  <span className="text-ocean-300">Admin: <span className="text-crimson-400">-{adminCost}</span> sov</span>
                )}
                {fleetMaintCost > 0 && (
                  <span className="text-ocean-300">Fleet: <span className="text-crimson-400">-{fleetMaintCost}</span> sov</span>
                )}
                {upgradeMaintCost > 0 && (
                  <span className="text-ocean-300">Maint: <span className="text-crimson-400">-{upgradeMaintCost}</span> sov</span>
                )}
              </div>
              <p className="text-crimson-400 text-sm font-bold mt-1">
                {totalSovCost > 0 && <span>-{totalSovCost} sov/day | </span>}
                -{totalSupplyCost} sup/day
              </p>
            </div>
          </div>

          {/* Divider */}
          <Divider className="my-1" />

          {/* Net */}
          <div className="flex items-center justify-between">
            <span className="text-ocean-400 text-xs tracking-wider w-20 flex-shrink-0">NET</span>
            <div className="flex items-center gap-4 text-sm font-bold">
              <span className={netSov >= 0 ? 'text-green-400' : 'text-crimson-400'}>
                {netSov >= 0 ? '+' : ''}{netSov} sov
              </span>
              <span className={netSup >= 0 ? 'text-green-400' : 'text-crimson-400'}>
                {netSup >= 0 ? '+' : ''}{netSup} sup
              </span>
              {netMat > 0 && (
                <span className="text-green-400">+{netMat} mat</span>
              )}
              {netIntel > 0 && (
                <span className="text-green-400">+{netIntel} intel</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Supply deficit warning */}
      {netSup < 0 && (
        <div className="bg-crimson-500/10 border border-crimson-500/30 rounded-lg p-3 flex items-start gap-2">
          <span className="text-crimson-400 text-sm animate-pulse">⚠</span>
          <div>
            <p className="text-crimson-300 text-xs font-bold">SUPPLY DEFICIT</p>
            <p className="text-crimson-400/80 text-xs mt-0.5">
              Losing {Math.abs(netSup)} supplies per day. At zero supplies, territory morale drops and starvation begins after 3 days.
            </p>
          </div>
        </div>
      )}

      {/* ============================== */}
      {/* MIDDLE: TERRITORY HEALTH       */}
      {/* ============================== */}
      <div>
        <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-3">
          TERRITORY ({controlledIslands.length})
        </h3>
        {controlledIslands.length === 0 ? (
          <p className="text-ocean-500 text-xs italic">No territory controlled. Conquer islands to build your empire.</p>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {controlledIslands.map(island => {
              const state = territoryStates[island.id];
              const morale = state?.morale ?? 60;
              const defense = state?.defenseRating ?? 20;
              const role = state?.islandRole || 'unassigned';
              const completedUpgrades = state?.upgrades || [];
              const dailyIncome = getIslandScaledIncome(island.id, completedUpgrades, morale, role);

              return (
                <div
                  key={island.id}
                  className="p-3 bg-ocean-800/50 border border-ocean-700/60 rounded-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-ocean-100 text-sm font-bold">{island.name}</span>
                      <span className="text-ocean-500 text-xs tracking-wider uppercase px-1.5 py-0.5 bg-ocean-700/50 rounded-sm">
                        {ROLE_LABELS[role] || role}
                      </span>
                    </div>
                    <span className="text-amber-400 text-xs font-bold">+{dailyIncome} sov/day</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Morale bar */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-ocean-500 text-xs tracking-wider">MORALE</span>
                        <span className={`text-xs font-bold ${getMoraleTextColor(morale)}`}>{morale}</span>
                      </div>
                      <div className="w-full h-1.5 bg-ocean-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${getMoraleBarColor(morale)}`}
                          style={{ width: `${morale}%` }}
                        />
                      </div>
                    </div>
                    {/* Defense */}
                    <div className="text-center w-16">
                      <span className="text-ocean-500 text-xs tracking-wider block">DEF</span>
                      <span className="text-ocean-200 text-xs font-bold">{defense}</span>
                    </div>
                  </div>
                  {state?.underAttack && (
                    <div className="mt-2 text-xs text-crimson-400 font-bold tracking-wider uppercase animate-pulse">
                      UNDER ATTACK
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================== */}
      {/* BOTTOM: CREW ASSIGNMENTS       */}
      {/* ============================== */}
      <div>
        <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-3">
          CREW ASSIGNMENTS ({recruitedCrew.length})
        </h3>
        {recruitedCrew.length === 0 ? (
          <p className="text-ocean-500 text-xs italic">No crew recruited yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-1.5">
            {recruitedCrew.map(member => {
              const assignment = member.assignment || 'unassigned';
              const isUnassigned = assignment === 'unassigned';
              const isInjured = member.injured;
              const bonusText = isInjured
                ? 'Injured'
                : isUnassigned
                  ? 'No bonus'
                  : getAssignmentBonusText(assignment, territorySovIncome);

              return (
                <div
                  key={member.id}
                  className={`px-3 py-2 rounded-sm flex items-center justify-between ${
                    isInjured
                      ? 'bg-crimson-900/20 border border-crimson-700/30'
                      : isUnassigned
                        ? 'bg-ocean-800/30 border border-ocean-700/30'
                        : 'bg-ocean-800/50 border border-ocean-700/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${isInjured ? 'text-crimson-300' : 'text-ocean-100'}`}>
                      {member.name.split(' ')[0]}
                    </span>
                    {isInjured && (
                      <span className="text-xs text-crimson-400 font-bold tracking-wider uppercase">[INJURED]</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs tracking-wider uppercase ${
                      isInjured ? 'text-crimson-400/60'
                        : isUnassigned ? 'text-ocean-500'
                          : 'text-amber-400/80'
                    }`}>
                      {ASSIGNMENT_LABELS[assignment] || assignment}
                    </span>
                    <span className={`text-xs ${
                      isInjured ? 'text-crimson-400/60'
                        : isUnassigned ? 'text-ocean-600'
                          : 'text-ocean-300'
                    }`}>
                      {bonusText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
