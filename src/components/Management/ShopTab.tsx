import React, { useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import { buildShopInventory, getSellPrices, islandShops } from '../../systems/trade';
import { shopItemToEquipment, getEquipment } from '../../systems/equipment';
import { audioManager } from '../../systems/audio';
import { ECONOMY } from '../../constants/balance';
import { formatNumber } from '../../utils/formatting';

export const ShopTab: React.FC = () => {
  const mc = useGameStore(s => s.mc);
  const crew = useGameStore(s => s.crew);
  const resources = useGameStore(s => s.resources);
  const islands = useGameStore(s => s.islands);
  const currentIsland = useGameStore(s => s.currentIsland);
  const dayCount = useGameStore(s => s.dayCount);
  const flags = useGameStore(s => s.flags);
  const updateResources = useGameStore(s => s.updateResources);
  const updateMC = useGameStore(s => s.updateMC);
  const setFlag = useGameStore(s => s.setFlag);
  const addNotification = useGameStore(s => s.addNotification);
  const addToInventory = useGameStore(s => s.addToInventory);
  const adjustLoyalty = useGameStore(s => s.adjustLoyalty);
  const getTerritoryBonuses = useGameStore(s => s.getTerritoryBonuses);

  const currentIslandData = islands.find((i) => i.id === currentIsland);
  const isControlled = currentIslandData?.status === 'controlled';
  const tBonuses = getTerritoryBonuses();
  const hasDiplomat = crew.some(m => m.recruited && m.alive && !m.injured && m.assignment === 'diplomat');
  const diplomatShopDiscount = (hasDiplomat && isControlled) ? ECONOMY.DIPLOMAT_SHOP_DISCOUNT : 0;
  const hasShop = !!islandShops[currentIsland];

  const shopInventory = useMemo(() => hasShop
    ? buildShopInventory(currentIsland, isControlled, dayCount, flags, tBonuses.tradeDiscount, mc.reputation, mc.infamy, diplomatShopDiscount)
    : null,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [currentIsland, isControlled, dayCount, flags, tBonuses.tradeDiscount, mc.reputation, mc.infamy, diplomatShopDiscount, hasShop]);

  if (!shopInventory) return null;

  const sellPrices = getSellPrices(currentIsland);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Shop header */}
      <div>
        <h3 className="text-lg font-display font-bold text-ocean-100">
          {islandShops[currentIsland]?.name || 'Market'}
        </h3>
        <p className="text-ocean-400 text-sm mt-1 font-narration">
          {islandShops[currentIsland]?.description}
        </p>
        <div className="flex items-center gap-4 mt-3">
          <span className="text-amber-400 font-bold text-sm">
            {'\uD83D\uDCB0'} {resources.sovereigns} Sovereigns
          </span>
          {isControlled && (
            <span className="px-2 py-0.5 bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-bold rounded-sm">
              TERRITORY DISCOUNT ACTIVE
            </span>
          )}
          {tBonuses.tradeDiscount > 0 && (
            <span className="px-2 py-0.5 bg-amber-900/30 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-sm">
              -{tBonuses.tradeDiscount}% TRADE NETWORK
            </span>
          )}
          {diplomatShopDiscount > 0 && (
            <span className="px-2 py-0.5 bg-purple-900/30 border border-purple-500/30 text-purple-400 text-xs font-bold rounded-sm">
              -{diplomatShopDiscount}% DIPLOMAT
            </span>
          )}
        </div>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {shopInventory.items.map((slot) => (
          <div
            key={slot.item.id}
            className="px-4 py-3 bg-ocean-800 border border-ocean-600 rounded-sm hover:border-ocean-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{slot.item.icon}</span>
                <div>
                  <h4 className="text-ocean-100 font-bold text-sm">{slot.item.name}</h4>
                  <p className="text-ocean-400 text-xs mt-0.5 leading-relaxed">
                    {slot.item.description}
                  </p>
                  {/* Effect tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {slot.item.resourceEffect?.supplies && (
                      <span className="px-1.5 py-0.5 bg-green-900/30 text-green-400 text-xs font-bold rounded-sm">
                        +{slot.item.resourceEffect.supplies} Supplies
                      </span>
                    )}
                    {slot.item.resourceEffect?.materials && (
                      <span className="px-1.5 py-0.5 bg-amber-900/30 text-amber-400 text-xs font-bold rounded-sm">
                        +{slot.item.resourceEffect.materials} Materials
                      </span>
                    )}
                    {slot.item.resourceEffect?.intelligence && (
                      <span className="px-1.5 py-0.5 bg-purple-900/30 text-purple-400 text-xs font-bold rounded-sm">
                        +{slot.item.resourceEffect.intelligence} Intel
                      </span>
                    )}
                    {slot.item.statBonus?.attack && (
                      <span className="px-1.5 py-0.5 bg-crimson-900/30 text-crimson-400 text-xs font-bold rounded-sm">
                        +{slot.item.statBonus.attack} ATK
                      </span>
                    )}
                    {slot.item.statBonus?.defense && (
                      <span className="px-1.5 py-0.5 bg-blue-900/30 text-blue-400 text-xs font-bold rounded-sm">
                        +{slot.item.statBonus.defense} DEF
                      </span>
                    )}
                    {slot.item.statBonus?.hp && (
                      <span className="px-1.5 py-0.5 bg-green-900/30 text-green-300 text-xs font-bold rounded-sm">
                        +{slot.item.statBonus.hp} HP
                      </span>
                    )}
                    {slot.item.loyaltyBoost && (
                      <span className="px-1.5 py-0.5 bg-green-900/30 text-green-300 text-xs font-bold rounded-sm">
                        +{slot.item.loyaltyBoost} Crew Loyalty
                      </span>
                    )}
                    {slot.item.unique && (
                      <span className="px-1.5 py-0.5 bg-ocean-700 text-ocean-300 text-xs font-bold rounded-sm">
                        UNIQUE
                      </span>
                    )}
                    {shopItemToEquipment[slot.item.id] && (
                      <span className="px-1.5 py-0.5 bg-amber-900/30 text-amber-400 text-xs font-bold rounded-sm">
                        EQUIPPABLE
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right ml-3 shrink-0">
                <div className="text-amber-400 font-bold text-sm">
                  {diplomatShopDiscount > 0 && slot.preDiplomatPrice > slot.currentPrice && (
                    <span className="text-ocean-500 line-through text-xs mr-1">{slot.preDiplomatPrice}</span>
                  )}
                  {slot.currentPrice} {'\u2B21'}
                </div>
                <button
                  onClick={() => {
                    if (resources.sovereigns < slot.currentPrice) {
                      addNotification({
                        type: 'story',
                        title: 'NOT ENOUGH SOVEREIGNS',
                        message: `You need ${formatNumber(slot.currentPrice)} Sovereigns. You have ${formatNumber(resources.sovereigns)}.`,
                      });
                      return;
                    }
                    // Deduct cost and apply resource effects in one update
                    const updatedResources = { ...resources, sovereigns: resources.sovereigns - slot.currentPrice };
                    if (slot.item.resourceEffect) {
                      if (slot.item.resourceEffect.supplies) updatedResources.supplies += slot.item.resourceEffect.supplies;
                      if (slot.item.resourceEffect.materials) updatedResources.materials += slot.item.resourceEffect.materials;
                      if (slot.item.resourceEffect.intelligence) updatedResources.intelligence += slot.item.resourceEffect.intelligence;
                    }
                    updateResources(updatedResources);
                    // Check if this item is equippable gear
                    const equipId = shopItemToEquipment[slot.item.id];
                    if (equipId) {
                      const gear = getEquipment(equipId);
                      if (gear) addToInventory(gear);
                    }
                    // Apply non-equipment stat bonuses (reputation, infamy)
                    if (slot.item.statBonus) {
                      const updates: any = {};
                      if (slot.item.statBonus.reputation) updates.reputation = Math.min(100, Math.max(0, mc.reputation + slot.item.statBonus.reputation));
                      if (slot.item.statBonus.infamy) updates.infamy = Math.min(100, Math.max(0, mc.infamy + slot.item.statBonus.infamy));
                      if (Object.keys(updates).length > 0) updateMC(updates);
                    }
                    // Set flag
                    if (slot.item.setFlag) setFlag(slot.item.setFlag, true);
                    // Crew loyalty boost (rum, good food, etc.)
                    if (slot.item.loyaltyBoost) {
                      crew.filter((m) => m.recruited && m.alive).forEach((m) => {
                        adjustLoyalty(m.id, slot.item.loyaltyBoost!);
                      });
                    }
                    // SFX + Notification
                    audioManager.playSfx('purchase');
                    const isGear = !!shopItemToEquipment[slot.item.id];
                    addNotification({
                      type: 'story',
                      title: 'PURCHASED',
                      message: `Bought ${slot.item.name} for ${slot.currentPrice} Sovereigns.${
                        isGear ? ' Added to equipment inventory.' : ''
                      }${
                        slot.item.loyaltyBoost ? ` Crew loyalty +${slot.item.loyaltyBoost}.` : ''
                      }`,
                    });
                  }}
                  disabled={resources.sovereigns < slot.currentPrice}
                  className={`mt-1 px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded-sm transition-all ${
                    resources.sovereigns >= slot.currentPrice
                      ? 'bg-amber-700/60 hover:bg-amber-600/70 border border-amber-500/40 text-amber-100'
                      : 'bg-ocean-700 border border-ocean-600 text-ocean-500 cursor-not-allowed'
                  }`}
                >
                  BUY
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {shopInventory.items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-ocean-500 text-3xl mb-3">{'\uD83C\uDFEA'}</p>
          <p className="text-ocean-500 text-sm italic">
            Nothing available for purchase right now. Check back later.
          </p>
        </div>
      )}

      {/* SELL RESOURCES */}
      <div className="mt-6 pt-6 border-t border-ocean-600">
        <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-3">SELL RESOURCES</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Sell Supplies */}
          <div className="px-4 py-3 bg-ocean-800 border border-ocean-600 rounded-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm font-bold">Supplies</span>
              <span className="text-ocean-400 text-xs">{sellPrices.supplies} each</span>
            </div>
            <p className="text-ocean-500 text-xs mb-2">You have: {resources.supplies}</p>
            <div className="flex gap-2">
              {[5, 10, 25].map((amount) => (
                <button
                  key={amount}
                  disabled={resources.supplies < amount}
                  onClick={() => {
                    const fresh = useGameStore.getState().resources;
                    if (fresh.supplies < amount) return;
                    updateResources({
                      ...fresh,
                      supplies: fresh.supplies - amount,
                      sovereigns: fresh.sovereigns + amount * sellPrices.supplies,
                    });
                    addNotification({
                      type: 'story',
                      title: 'SOLD',
                      message: `Sold ${amount} supplies for ${amount * sellPrices.supplies} Sovereigns.`,
                    });
                  }}
                  className={`flex-1 px-2 py-1.5 text-xs font-bold rounded-sm transition-all ${
                    resources.supplies >= amount
                      ? 'bg-green-900/30 hover:bg-green-800/40 border border-green-500/30 text-green-300'
                      : 'bg-ocean-700 border border-ocean-600 text-ocean-500 cursor-not-allowed'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Sell Materials */}
          <div className="px-4 py-3 bg-ocean-800 border border-ocean-600 rounded-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-400 text-sm font-bold">Materials</span>
              <span className="text-ocean-400 text-xs">{sellPrices.materials} each</span>
            </div>
            <p className="text-ocean-500 text-xs mb-2">You have: {resources.materials}</p>
            <div className="flex gap-2">
              {[5, 10, 25].map((amount) => (
                <button
                  key={amount}
                  disabled={resources.materials < amount}
                  onClick={() => {
                    const fresh = useGameStore.getState().resources;
                    if (fresh.materials < amount) return;
                    updateResources({
                      ...fresh,
                      materials: fresh.materials - amount,
                      sovereigns: fresh.sovereigns + amount * sellPrices.materials,
                    });
                    addNotification({
                      type: 'story',
                      title: 'SOLD',
                      message: `Sold ${amount} materials for ${amount * sellPrices.materials} Sovereigns.`,
                    });
                  }}
                  className={`flex-1 px-2 py-1.5 text-xs font-bold rounded-sm transition-all ${
                    resources.materials >= amount
                      ? 'bg-amber-900/30 hover:bg-amber-800/40 border border-amber-500/30 text-amber-300'
                      : 'bg-ocean-700 border border-ocean-600 text-ocean-500 cursor-not-allowed'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Sell Intelligence */}
          <div className="px-4 py-3 bg-ocean-800 border border-ocean-600 rounded-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400 text-sm font-bold">Intel</span>
              <span className="text-ocean-400 text-xs">{sellPrices.intelligence} each</span>
            </div>
            <p className="text-ocean-500 text-xs mb-2">You have: {resources.intelligence}</p>
            <div className="flex gap-2">
              {[2, 5, 10].map((amount) => (
                <button
                  key={amount}
                  disabled={resources.intelligence < amount}
                  onClick={() => {
                    const fresh = useGameStore.getState().resources;
                    if (fresh.intelligence < amount) return;
                    updateResources({
                      ...fresh,
                      intelligence: fresh.intelligence - amount,
                      sovereigns: fresh.sovereigns + amount * sellPrices.intelligence,
                    });
                    addNotification({
                      type: 'story',
                      title: 'SOLD',
                      message: `Sold ${amount} intel for ${amount * sellPrices.intelligence} Sovereigns.`,
                    });
                  }}
                  className={`flex-1 px-2 py-1.5 text-xs font-bold rounded-sm transition-all ${
                    resources.intelligence >= amount
                      ? 'bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 text-purple-300'
                      : 'bg-ocean-700 border border-ocean-600 text-ocean-500 cursor-not-allowed'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
