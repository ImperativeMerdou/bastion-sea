import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { getAvailableUpgrades, getShipBonuses, SHIP_UPGRADES, getShipUpgrade } from '../../systems/shipUpgrades';
import { SHIP } from '../../constants/balance';

export const ShipTab: React.FC = () => {
  const ship = useGameStore(s => s.ship);
  const resources = useGameStore(s => s.resources);
  const currentIsland = useGameStore(s => s.currentIsland);
  const dayCount = useGameStore(s => s.dayCount);
  const installShipUpgrade = useGameStore(s => s.installShipUpgrade);
  const repairShip = useGameStore(s => s.repairShip);

  const availableUpgrades = getAvailableUpgrades(ship, currentIsland, dayCount);
  const shipBonuses = getShipBonuses(ship);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Ship Header */}
      <div className="flex items-start gap-6">
        <div className="w-20 h-20 rounded-lg bg-ocean-800 border border-ocean-600 flex items-center justify-center text-4xl">
          {'\u26F5'}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-display font-bold text-ocean-100">{ship.name}</h2>
          <p className="text-ocean-400 text-sm mt-1">Your vessel. Your weapon. Your home on the sea.</p>
          {ship.upgrades.length > 0 && (
            <p className="text-amber-400/70 text-xs mt-1">{ship.upgrades.length} upgrade{ship.upgrades.length !== 1 ? 's' : ''} installed</p>
          )}
        </div>
      </div>

      {/* Ship Stats */}
      <div className="bg-ocean-800/60 rounded-lg border border-ocean-700 p-4">
        <h3 className="text-sm font-bold text-ocean-300 tracking-wider mb-3">SHIP STATUS</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Hull */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-ocean-400">Hull Integrity</span>
              <span className={ship.hull < ship.maxHull * 0.3 ? 'text-crimson-400' : ship.hull < ship.maxHull * 0.6 ? 'text-amber-400' : 'text-green-400'}>
                {ship.hull}/{ship.maxHull}
              </span>
            </div>
            <div className="w-full bg-ocean-900 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  ship.hull < ship.maxHull * 0.3 ? 'bg-crimson-500' : ship.hull < ship.maxHull * 0.6 ? 'bg-amber-500' : 'bg-green-500'
                }`}
                style={{ width: `${ship.maxHull > 0 ? (ship.hull / ship.maxHull) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Cargo */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-ocean-400">Cargo Capacity</span>
              <span className="text-ocean-200">{ship.maxCargo}</span>
            </div>
            <div className="w-full bg-ocean-900 rounded-full h-2.5">
              <div className="h-2.5 rounded-full bg-blue-500/60" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Speed */}
          <div>
            <span className="text-ocean-400 text-xs">Travel Speed</span>
            <div className="text-ocean-100 font-bold text-lg">
              {ship.speed < 0 ? (
                <span className="text-green-400">-{Math.abs(ship.speed)} day{Math.abs(ship.speed) !== 1 ? 's' : ''}</span>
              ) : (
                <span className="text-ocean-400">Standard</span>
              )}
            </div>
            <p className="text-ocean-500 text-xs">per voyage</p>
          </div>

          {/* Combat Bonuses */}
          <div>
            <span className="text-ocean-400 text-xs">Combat Bonus</span>
            <div className="flex gap-3 mt-1">
              {shipBonuses.combatAttack > 0 && (
                <span className="text-crimson-400 font-bold">+{shipBonuses.combatAttack} ATK</span>
              )}
              {shipBonuses.combatDefense > 0 && (
                <span className="text-blue-400 font-bold">+{shipBonuses.combatDefense} DEF</span>
              )}
              {shipBonuses.combatAttack === 0 && shipBonuses.combatDefense === 0 && (
                <span className="text-ocean-500 text-sm">None</span>
              )}
            </div>
          </div>
        </div>

        {/* Repair Button */}
        {ship.hull < ship.maxHull && (() => {
          const repairAmount = 25;
          const matCost = Math.ceil(repairAmount * SHIP.REPAIR_COST_PER_HP);
          const sovCost = Math.ceil(repairAmount * SHIP.REPAIR_SOV_PER_HP);
          const canRepair = resources.materials >= matCost && resources.sovereigns >= sovCost;
          return (
            <div className="mt-4 pt-3 border-t border-ocean-700">
              <button
                onClick={() => repairShip(repairAmount)}
                disabled={!canRepair}
                className="px-4 py-2 bg-green-600/20 border border-green-500/40 rounded text-green-300 text-sm font-bold hover:bg-green-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Repair +{repairAmount} Hull ({matCost} materials, {sovCost} sov)
              </button>
            </div>
          );
        })()}
      </div>

      {/* Installed Upgrades */}
      {ship.upgrades.length > 0 && (
        <div className="bg-ocean-800/60 rounded-lg border border-ocean-700 p-4">
          <h3 className="text-sm font-bold text-ocean-300 tracking-wider mb-3">INSTALLED UPGRADES</h3>
          <div className="grid grid-cols-1 gap-2">
            {ship.upgrades.map((uid) => {
              const upg = getShipUpgrade(uid);
              if (!upg) return null;
              return (
                <div key={uid} className="flex items-center gap-3 bg-ocean-900/50 rounded p-2.5">
                  <span className="text-xl">{upg.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-ocean-100 font-bold text-sm">{upg.name}</div>
                    <div className="text-ocean-400 text-xs truncate">{upg.description}</div>
                  </div>
                  <div className="flex gap-2 text-xs flex-shrink-0">
                    {upg.effects.hull && <span className="text-green-400">+{upg.effects.hull} Hull</span>}
                    {upg.effects.speed && <span className="text-cyan-400">{upg.effects.speed}d Travel</span>}
                    {upg.effects.cargo && <span className="text-blue-400">+{upg.effects.cargo} Cargo</span>}
                    {upg.effects.combatAttack && <span className="text-crimson-400">+{upg.effects.combatAttack} ATK</span>}
                    {upg.effects.combatDefense && <span className="text-blue-300">+{upg.effects.combatDefense} DEF</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Upgrades */}
      <div className="bg-ocean-800/60 rounded-lg border border-ocean-700 p-4">
        <h3 className="text-sm font-bold text-ocean-300 tracking-wider mb-3">
          AVAILABLE UPGRADES
          {availableUpgrades.length === 0 && (
            <span className="text-ocean-500 font-normal ml-2">
              (none at this location)
            </span>
          )}
        </h3>
        {availableUpgrades.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {availableUpgrades.map((upg) => {
              const canAfford = (
                resources.sovereigns >= (upg.cost.sovereigns || 0) &&
                resources.supplies >= (upg.cost.supplies || 0) &&
                resources.materials >= (upg.cost.materials || 0) &&
                resources.intelligence >= (upg.cost.intelligence || 0)
              );
              return (
                <div key={upg.id} className={`rounded-lg border p-3 transition-all ${
                  canAfford ? 'bg-ocean-900/50 border-ocean-600 hover:border-amber-500/40' : 'bg-ocean-900/30 border-ocean-700 opacity-60'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{upg.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-ocean-100 font-bold text-sm">{upg.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          upg.category === 'hull' ? 'bg-green-500/20 text-green-400' :
                          upg.category === 'sail' ? 'bg-cyan-500/20 text-cyan-400' :
                          upg.category === 'weapon' ? 'bg-crimson-500/20 text-crimson-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>{upg.category.toUpperCase()}</span>
                      </div>
                      <p className="text-ocean-400 text-xs mt-1">{upg.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        {upg.effects.hull && <span className="text-green-400">+{upg.effects.hull} Hull</span>}
                        {upg.effects.speed && <span className="text-cyan-400">{upg.effects.speed}d Travel</span>}
                        {upg.effects.cargo && <span className="text-blue-400">+{upg.effects.cargo} Cargo</span>}
                        {upg.effects.combatAttack && <span className="text-crimson-400">+{upg.effects.combatAttack} ATK</span>}
                        {upg.effects.combatDefense && <span className="text-blue-300">+{upg.effects.combatDefense} DEF</span>}
                      </div>
                      {/* Cost */}
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="text-ocean-500">Cost:</span>
                        {upg.cost.sovereigns && (
                          <span className={resources.sovereigns >= upg.cost.sovereigns ? 'text-amber-400' : 'text-crimson-400'}>
                            {upg.cost.sovereigns} Sov
                          </span>
                        )}
                        {upg.cost.materials && (
                          <span className={resources.materials >= (upg.cost.materials || 0) ? 'text-ocean-300' : 'text-crimson-400'}>
                            {upg.cost.materials} Mat
                          </span>
                        )}
                        {upg.cost.supplies && (
                          <span className={resources.supplies >= (upg.cost.supplies || 0) ? 'text-ocean-300' : 'text-crimson-400'}>
                            {upg.cost.supplies} Sup
                          </span>
                        )}
                        {upg.cost.intelligence && (
                          <span className={resources.intelligence >= (upg.cost.intelligence || 0) ? 'text-purple-400' : 'text-crimson-400'}>
                            {upg.cost.intelligence} Intel
                          </span>
                        )}
                        {upg.requiresIsland && upg.requiresIsland !== currentIsland && (
                          <span className="text-crimson-400 italic">
                            Requires Sorren's Flat
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => installShipUpgrade(upg.id)}
                      disabled={!canAfford}
                      className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded text-amber-300 text-xs font-bold hover:bg-amber-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
                    >
                      INSTALL
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-ocean-500 text-sm">
              {ship.upgrades.length >= SHIP_UPGRADES.length
                ? 'All upgrades installed. The Bastion is fully outfitted.'
                : 'No upgrades available here. Some require specific islands or prerequisites.'}
            </p>
            {!ship.upgrades.includes('reinforced_hull') && (
              <p className="text-ocean-600 text-xs mt-2">Tip: Basic hull and sail upgrades are available anywhere.</p>
            )}
          </div>
        )}
      </div>

      {/* Upgrade Tree Preview */}
      <div className="bg-ocean-800/40 rounded-lg border border-ocean-700/50 p-4">
        <h3 className="text-sm font-bold text-ocean-300 tracking-wider mb-3">UPGRADE TREE</h3>
        <div className="grid grid-cols-2 gap-4">
          {(['hull', 'sail', 'weapon', 'utility'] as const).map((cat) => {
            const catUpgrades = SHIP_UPGRADES.filter((u) => u.category === cat);
            const catColor = cat === 'hull' ? 'green' : cat === 'sail' ? 'cyan' : cat === 'weapon' ? 'red' : 'blue';
            return (
              <div key={cat}>
                <h4 className={`text-xs font-bold tracking-wider mb-2 ${
                  cat === 'hull' ? 'text-green-400' : cat === 'sail' ? 'text-cyan-400' : cat === 'weapon' ? 'text-crimson-400' : 'text-blue-400'
                }`}>{cat.toUpperCase()}</h4>
                <div className="space-y-1">
                  {catUpgrades.map((upg, i) => {
                    const installed = ship.upgrades.includes(upg.id);
                    const available = availableUpgrades.some((a) => a.id === upg.id);
                    return (
                      <div key={upg.id} className="flex items-center gap-2 text-xs">
                        {i > 0 && <span className="text-ocean-600">|</span>}
                        <span className={
                          installed ? `text-${catColor === 'red' ? 'crimson' : catColor}-400` :
                          available ? 'text-ocean-300' : 'text-ocean-600'
                        }>
                          {installed ? '\u25C6' : available ? '\u25C7' : '\u25CB'} {upg.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
