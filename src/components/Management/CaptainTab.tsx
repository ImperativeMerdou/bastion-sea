import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { EquipmentSlot } from '../../types/game';
import { getImagePath } from '../../utils/images';
import {
  getKorvaanDisplay,
  getKorvaanBonuses,
  getKorvaanAdvanceReq,
  getKorvaanIndex,
} from '../../systems/korvaan';
import {
  canEatDragonFruit,
  getDragonFruitBonuses,
  getEatRequirements,
} from '../../systems/godfruit';
import { PortraitImage, DominionBar } from './shared';
import { getMoraleTextColor } from '../../utils/formatting';

export const CaptainTab: React.FC = () => {
  const mc = useGameStore(s => s.mc);
  const resources = useGameStore(s => s.resources);
  const flags = useGameStore(s => s.flags);
  const advanceKorvaan = useGameStore(s => s.advanceKorvaan);
  const eatDragonFruit = useGameStore(s => s.eatDragonFruit);
  const equipment = useGameStore(s => s.equipment);
  const inventory = useGameStore(s => s.inventory);
  const equipItem = useGameStore(s => s.equipItem);
  const unequipItem = useGameStore(s => s.unequipItem);
  const territoryStates = useGameStore(s => s.territoryStates);
  const islands = useGameStore(s => s.islands);

  const dragonFruitImg = getImagePath('dragon_fruit.webp');
  const bountyPosterBg = getImagePath('bounty_poster_bg.webp');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* MC Header */}
      <div className="flex items-start gap-6">
        <PortraitImage characterId="karyudon" fallback="&#x1F479;" />
        <div className="flex-1">
          <h2 className="text-2xl font-display font-bold text-ocean-100">{mc.name}</h2>
          <p className="text-ocean-400 text-sm mt-1">
            {mc.race} · Age {mc.age} · 7'0"
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className={`relative ${mc.bounty > 0 ? 'px-2 py-1 rounded' : ''}`}>
              {mc.bounty > 0 && bountyPosterBg && (
                <img src={bountyPosterBg} alt="" className="absolute inset-0 w-full h-full object-cover rounded opacity-20" />
              )}
              <span className="text-ocean-500 text-xs relative">BOUNTY</span>
              <p className={`font-bold relative ${mc.bounty > 0 ? 'text-crimson-400' : 'text-ocean-300'}`}>
                {mc.bounty > 0 ? `${(mc.bounty / 1000000).toFixed(0)}M \u2B21` : 'UNKNOWN'}
              </p>
            </div>
            <div>
              <span className="text-ocean-500 text-xs">REPUTATION</span>
              <p className="text-ocean-200 font-bold">{mc.reputation}/100</p>
            </div>
            <div>
              <span className="text-ocean-500 text-xs">INFAMY</span>
              <p className="text-ocean-200 font-bold">{mc.infamy}/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dominion */}
      <div>
        <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-3">DOMINION</h3>
        <div className="space-y-2">
          <DominionBar label="Iron" tier={mc.dominion.iron.tier} level={mc.dominion.iron.level} showLevel />
          <DominionBar label="Sight" tier={mc.dominion.sight.tier} level={mc.dominion.sight.level} showLevel />
          <DominionBar label="King" tier={mc.dominion.king.tier} level={mc.dominion.king.level} showLevel />
        </div>
        {/* Expression Balance */}
        {(() => {
          const tiers = ['flicker', 'tempered', 'forged', 'prime', 'conqueror'];
          const ironPow = tiers.indexOf(mc.dominion.iron.tier) * 100 + mc.dominion.iron.level;
          const sightPow = tiers.indexOf(mc.dominion.sight.tier) * 100 + mc.dominion.sight.level;
          const kingPow = tiers.indexOf(mc.dominion.king.tier) * 100 + mc.dominion.king.level;
          const total = ironPow + sightPow + kingPow || 1;
          const ironPct = Math.round((ironPow / total) * 100);
          const sightPct = Math.round((sightPow / total) * 100);
          const kingPct = 100 - ironPct - sightPct;
          const max = Math.max(ironPow, sightPow, kingPow);
          const min = Math.min(ironPow, sightPow, kingPow);
          const spread = max - min;
          const focusLabel = spread > 80 ? 'Specialist' : spread > 40 ? 'Focused' : 'Balanced';
          const focusColor = spread > 80 ? 'text-amber-400' : spread > 40 ? 'text-ocean-300' : 'text-green-400';
          return (
            <div className="mt-2">
              <div className="flex h-1.5 rounded-full overflow-hidden bg-ocean-800 border border-ocean-700">
                <div className="bg-red-500/70" style={{ width: `${ironPct}%` }} title={`Iron ${ironPct}%`} />
                <div className="bg-blue-400/70" style={{ width: `${sightPct}%` }} title={`Sight ${sightPct}%`} />
                <div className="bg-purple-500/70" style={{ width: `${kingPct}%` }} title={`King ${kingPct}%`} />
              </div>
              <p className="text-ocean-600 text-xs mt-1 flex justify-between">
                <span>Build: <span className={focusColor}>{focusLabel}</span></span>
                <span className="text-ocean-700">{ironPct}% / {sightPct}% / {kingPct}%</span>
              </p>
            </div>
          );
        })()}
        <p className="text-ocean-600 text-xs mt-1.5 italic">
          Dominion grows through combat, conquest, and critical decisions.
        </p>
      </div>

      {/* Korvaan Body Refinement */}
      {(() => {
        const display = getKorvaanDisplay(mc.korvaan);
        const bonuses = getKorvaanBonuses(mc.korvaan);
        const req = getKorvaanAdvanceReq(mc.korvaan);
        const stageIdx = getKorvaanIndex(mc.korvaan);
        const progressPct = (stageIdx / 5) * 100;

        const ironTierIdx = ['flicker', 'tempered', 'forged', 'prime', 'conqueror'].indexOf(mc.dominion.iron.tier);
        const effectiveIron = ironTierIdx * 100 + mc.dominion.iron.level;
        const victories = (flags['combat_victories'] as number) || 0;
        const canTrain = req && effectiveIron >= req.minIronLevel &&
          victories >= req.minCombatVictories &&
          resources.sovereigns >= req.cost.sovereigns &&
          resources.supplies >= req.cost.supplies &&
          resources.materials >= req.cost.materials;

        return (
          <div>
            <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-3">KORVAAN</h3>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-lg ${display.color}`}>{display.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold tracking-wider ${display.color}`}>{display.label}</span>
                  <span className="text-ocean-500 text-xs font-mono">{stageIdx}/5</span>
                </div>
                <div className="w-full h-2 bg-ocean-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      stageIdx >= 5 ? 'bg-crimson-400' :
                      stageIdx >= 3 ? 'bg-amber-500' :
                      stageIdx >= 1 ? 'bg-ocean-300' :
                      'bg-ocean-600'
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Current bonuses */}
            {stageIdx > 0 && (
              <div className="flex gap-3 text-xs mb-2">
                <span className="text-crimson-400">+{bonuses.attack} ATK</span>
                <span className="text-blue-400">+{bonuses.defense} DEF</span>
                <span className="text-green-400">+{bonuses.hp} HP</span>
                {bonuses.staminaRegen > 0 && (
                  <span className="text-blue-300">+{bonuses.staminaRegen} Stamina Regen</span>
                )}
              </div>
            )}

            {/* Training button */}
            {req && (
              <>
                <button
                  onClick={() => {
                    if (canTrain) {
                      advanceKorvaan();
                    }
                  }}
                  disabled={!canTrain}
                  className={`w-full mt-1 px-3 py-2 text-xs font-bold tracking-wider rounded-sm transition-all ${
                    canTrain
                      ? 'bg-amber-900/40 hover:bg-amber-800/50 border border-amber-500/30 text-amber-200'
                      : 'bg-ocean-800 border border-ocean-600 text-ocean-500 cursor-not-allowed'
                  }`}
                >
                  {req.label}
                  <span className="block text-xs font-normal mt-0.5 opacity-70">
                    {req.cost.sovereigns}{'\u2B21'} {req.cost.supplies}{'\u25C8'} {req.cost.materials}{'\u2B22'}
                  </span>
                </button>
                {/* Requirements checklist when can't train */}
                {!canTrain && (
                  <div className="mt-2 space-y-1">
                    {(() => {
                      const checks = [
                        { met: effectiveIron >= req.minIronLevel, label: `Iron Dominion ${req.minIronLevel}+`, current: `${effectiveIron}` },
                        { met: victories >= req.minCombatVictories, label: `${req.minCombatVictories} combat victories`, current: `${victories}` },
                        { met: resources.sovereigns >= req.cost.sovereigns, label: `${req.cost.sovereigns} Sovereigns`, current: `${resources.sovereigns}` },
                        { met: resources.supplies >= req.cost.supplies, label: `${req.cost.supplies} Supplies`, current: `${resources.supplies}` },
                        { met: resources.materials >= req.cost.materials, label: `${req.cost.materials} Materials`, current: `${resources.materials}` },
                      ];
                      const remaining = checks.filter(c => !c.met).length;
                      return (
                        <>
                          <p className="text-ocean-500 text-xs font-bold tracking-wider">
                            {remaining} requirement{remaining !== 1 ? 's' : ''} remaining:
                          </p>
                          {checks.map((c, i) => {
                            const isFirstUnmet = !c.met && checks.slice(0, i).every(prev => prev.met);
                            return (
                              <div key={i} className={`flex items-center gap-2 text-xs ${c.met ? 'text-green-400' : isFirstUnmet ? 'text-amber-400 font-medium' : 'text-ocean-500'}`}>
                                <span>{c.met ? '\u2713' : '\u2717'}</span>
                                <span>{c.label}</span>
                                {!c.met && <span className={`ml-auto ${isFirstUnmet ? 'text-amber-500' : 'text-ocean-600'}`}>({c.current})</span>}
                              </div>
                            );
                          })}
                        </>
                      );
                    })()}
                  </div>
                )}
              </>
            )}
            {!req && (
              <p className="text-crimson-300 text-xs italic">Body refinement complete. The body is the weapon.</p>
            )}
          </div>
        );
      })()}

      {/* Dragon Fruit Status */}
      {mc.dragonFruitPossessed && (() => {
        const victories = (flags['combat_victories'] as number) || 0;
        const eatCheck = canEatDragonFruit(mc, victories);
        const bonuses = getDragonFruitBonuses(mc.dragonFruitEaten, mc.godFruit?.awakened || false);
        const eatReq = getEatRequirements();

        return (
          <div className={`px-4 py-3 border rounded-sm ${mc.dragonFruitEaten ? 'bg-crimson-600/20 border-crimson-400/40' : 'bg-crimson-700/20 border-crimson-500/30'}`}>
            <div className="flex items-center gap-3 mb-2">
              {dragonFruitImg ? (
                <img src={dragonFruitImg} alt="Dragon Fruit" className="w-10 h-10 object-contain" />
              ) : (
                <span className="text-2xl">&#x1F409;</span>
              )}
              <div>
                <h3 className="text-crimson-400 font-bold text-sm">Western Dragon Fruit</h3>
                <p className="text-ocean-300 text-xs mt-0.5">
                  {mc.dragonFruitEaten
                    ? 'CONSUMED - Mythical Beast transformation active'
                    : 'UNEATEN - Carried as cargo. The most valuable object in the Bastion Sea.'
                  }
                </p>
              </div>
            </div>

            {mc.dragonFruitEaten ? (
              <div className="space-y-1 mt-2">
                <div className="flex gap-3 text-xs">
                  <span className="text-crimson-300">+{bonuses.attack} ATK</span>
                  <span className="text-ocean-300">+{bonuses.defense} DEF</span>
                  <span className="text-green-400">+{bonuses.hp} HP</span>
                  <span className="text-amber-300">+{bonuses.speed} SPD</span>
                  {bonuses.staminaRegen > 0 && <span className="text-blue-300">+{bonuses.staminaRegen} Stamina/turn</span>}
                </div>
                <p className="text-crimson-400/80 text-xs italic">
                  5 dragon combat actions unlocked. Hybrid form active.
                </p>
                {!mc.godFruit?.awakened && (
                  <p className="text-ocean-500 text-xs italic">Awakening: dormant. Something greater sleeps within.</p>
                )}
              </div>
            ) : (
              <div className="space-y-2 mt-2">
                <div className="text-xs space-y-1">
                  {(() => {
                    const ironLevel = ['flicker','tempered','forged','prime','conqueror'].indexOf(mc.dominion.iron.tier) * 100 + mc.dominion.iron.level;
                    const ironMet = ironLevel >= eatReq.minIronLevel;
                    const vicMet = victories >= eatReq.minCombatVictories;
                    return (
                      <>
                        <p className={ironMet ? 'text-green-400' : 'text-ocean-400'}>
                          {ironMet ? '✓' : '○'} Iron Dominion: {ironLevel}/{eatReq.minIronLevel}
                        </p>
                        <p className={vicMet ? 'text-green-400' : 'text-ocean-400'}>
                          {vicMet ? '✓' : '○'} Combat Victories: {victories}/{eatReq.minCombatVictories}
                        </p>
                      </>
                    );
                  })()}
                </div>
                <button
                  onClick={() => eatDragonFruit()}
                  disabled={!eatCheck.canEat}
                  className={`w-full py-2 text-xs font-bold tracking-wider rounded-sm transition-all ${
                    eatCheck.canEat
                      ? 'bg-crimson-600 hover:bg-crimson-500 text-white cursor-pointer'
                      : 'bg-ocean-800 text-ocean-500 cursor-not-allowed'
                  }`}
                >
                  {eatCheck.canEat ? 'EAT THE DRAGON FRUIT' : eatCheck.reason || 'Requirements not met'}
                </button>
                {!eatCheck.canEat && eatCheck.reason && (
                  <p className="text-ocean-500 text-xs italic">{eatCheck.reason}</p>
                )}
              </div>
            )}
          </div>
        );
      })()}

      {/* Equipment */}
      {(() => {
        const slotLabels: Record<EquipmentSlot, string> = { weapon: 'WEAPON', armor: 'ARMOR', accessory: 'ACCESSORY' };
        const slotIcons: Record<EquipmentSlot, string> = { weapon: '\u2694\uFE0F', armor: '\uD83D\uDEE1\uFE0F', accessory: '\uD83D\uDC8E' };
        const slots: EquipmentSlot[] = ['weapon', 'armor', 'accessory'];

        const totalBonus = { attack: 0, defense: 0, hp: 0, speed: 0, staminaRegen: 0 };
        for (const s of slots) {
          const item = equipment[s];
          if (item?.statBonus) {
            if (item.statBonus.attack) totalBonus.attack += item.statBonus.attack;
            if (item.statBonus.defense) totalBonus.defense += item.statBonus.defense;
            if (item.statBonus.hp) totalBonus.hp += item.statBonus.hp;
            if (item.statBonus.speed) totalBonus.speed += item.statBonus.speed;
            if (item.statBonus.staminaRegen) totalBonus.staminaRegen += item.statBonus.staminaRegen;
          }
        }
        const hasAnyBonus = totalBonus.attack > 0 || totalBonus.defense > 0 || totalBonus.hp > 0 || totalBonus.speed !== 0 || totalBonus.staminaRegen > 0;

        return (
          <div>
            <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-3">EQUIPMENT</h3>

            {/* Three equipment slots */}
            <div className="space-y-2">
              {slots.map((slot) => {
                const item = equipment[slot];
                const slotInventory = inventory.filter(i => i.slot === slot);

                return (
                  <div key={slot} className="group">
                    <div className={`px-4 py-3 rounded-sm border transition-all ${
                      item
                        ? 'bg-ocean-800/80 border-amber-500/30'
                        : 'bg-ocean-800/40 border-ocean-700/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item ? item.icon : slotIcons[slot]}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold tracking-wider ${item ? 'text-amber-400' : 'text-ocean-500'}`}>
                              {item ? item.name : `[${slotLabels[slot]}]`}
                            </span>
                            {item && (
                              <button
                                onClick={() => unequipItem(slot)}
                                className="text-ocean-500 hover:text-ocean-300 text-xs font-bold tracking-wider transition-colors"
                                title="Unequip"
                              >
                                {'\u2715'}
                              </button>
                            )}
                          </div>
                          {item ? (
                            <div className="flex gap-2 text-xs mt-0.5 flex-wrap">
                              {item.statBonus.attack && item.statBonus.attack > 0 && <span className="text-crimson-400">+{item.statBonus.attack} ATK</span>}
                              {item.statBonus.defense && item.statBonus.defense > 0 && <span className="text-blue-400">+{item.statBonus.defense} DEF</span>}
                              {item.statBonus.hp && item.statBonus.hp > 0 && <span className="text-green-400">+{item.statBonus.hp} HP</span>}
                              {item.statBonus.speed && item.statBonus.speed > 0 && <span className="text-amber-300">+{item.statBonus.speed} SPD</span>}
                              {item.statBonus.speed && item.statBonus.speed < 0 && <span className="text-ocean-500">{item.statBonus.speed} SPD</span>}
                              {item.statBonus.staminaRegen && item.statBonus.staminaRegen > 0 && <span className="text-blue-300">+{item.statBonus.staminaRegen} Stam/turn</span>}
                            </div>
                          ) : (
                            <p className="text-ocean-600 text-xs mt-0.5 italic">Empty slot</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Swap options from inventory */}
                    {slotInventory.length > 0 && (
                      <div className="ml-6 mt-1 space-y-1">
                        {slotInventory.map((invItem) => (
                          <button
                            key={invItem.id}
                            onClick={() => equipItem(invItem.id)}
                            className="w-full text-left px-3 py-2 bg-ocean-800/40 hover:bg-ocean-700/60 border border-ocean-600/30 hover:border-amber-500/30 rounded-sm transition-all flex items-center gap-2"
                          >
                            <span className="text-sm">{invItem.icon}</span>
                            <div className="flex-1 min-w-0">
                              <span className="text-ocean-200 text-xs font-medium">{invItem.name}</span>
                              <div className="flex gap-2 text-xs mt-0.5 flex-wrap">
                                {invItem.statBonus.attack && invItem.statBonus.attack > 0 && <span className="text-crimson-400/70">+{invItem.statBonus.attack} ATK</span>}
                                {invItem.statBonus.defense && invItem.statBonus.defense > 0 && <span className="text-blue-400/70">+{invItem.statBonus.defense} DEF</span>}
                                {invItem.statBonus.hp && invItem.statBonus.hp > 0 && <span className="text-green-400/70">+{invItem.statBonus.hp} HP</span>}
                                {invItem.statBonus.speed && invItem.statBonus.speed > 0 && <span className="text-amber-300/70">+{invItem.statBonus.speed} SPD</span>}
                                {invItem.statBonus.speed && invItem.statBonus.speed < 0 && <span className="text-ocean-500/70">{invItem.statBonus.speed} SPD</span>}
                                {invItem.statBonus.staminaRegen && invItem.statBonus.staminaRegen > 0 && <span className="text-blue-300/70">+{invItem.statBonus.staminaRegen} Stam</span>}
                              </div>
                            </div>
                            <span className="text-ocean-500 text-xs font-bold shrink-0">EQUIP</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total equipment bonus summary */}
            {hasAnyBonus && (
              <div className="flex gap-3 text-xs mt-3 px-1">
                <span className="text-ocean-500 font-bold">TOTAL:</span>
                {totalBonus.attack > 0 && <span className="text-crimson-400">+{totalBonus.attack} ATK</span>}
                {totalBonus.defense > 0 && <span className="text-blue-400">+{totalBonus.defense} DEF</span>}
                {totalBonus.hp > 0 && <span className="text-green-400">+{totalBonus.hp} HP</span>}
                {totalBonus.speed > 0 && <span className="text-amber-300">+{totalBonus.speed} SPD</span>}
                {totalBonus.speed < 0 && <span className="text-ocean-500">{totalBonus.speed} SPD</span>}
                {totalBonus.staminaRegen > 0 && <span className="text-blue-300">+{totalBonus.staminaRegen} Stam/turn</span>}
              </div>
            )}
          </div>
        );
      })()}

      {/* Territory */}
      <div>
        <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">TERRITORY</h3>
        {mc.territory.length > 0 ? (
          <div className="space-y-1">
            {mc.territory.map((id) => {
              const tState = territoryStates[id];
              const island = islands.find(i => i.id === id);
              const morale = tState?.morale ?? 50;
              const moraleColor = getMoraleTextColor(morale);
              const moraleIcon = morale < 20 ? '🔥' : morale < 40 ? '⚠' : morale >= 80 ? '✦' : '';
              return (
                <div key={id} className="flex items-center justify-between px-3 py-2 bg-ocean-800 border border-amber-500/20 rounded-sm text-sm">
                  <span className="text-ocean-200 capitalize">{island?.name || id.replace('_', ' ')}</span>
                  <span className={`text-xs font-mono ${moraleColor}`}>
                    {moraleIcon && <span className="mr-1">{moraleIcon}</span>}
                    {morale}%
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-ocean-500 text-sm italic">No territory claimed. Yet.</p>
        )}
      </div>

      {/* Dream */}
      <div>
        <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">AMBITION</h3>
        <p className="text-ocean-200 text-sm italic font-display">
          "{mc.dream}"
        </p>
      </div>
    </div>
  );
};
