import React, { useState, useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import { getFlagImage } from '../../utils/images';
import { getAvailableCrewEvents } from '../../data/story/crew_events';
import { islandShops } from '../../systems/trade';
import { getAvailableUpgrades } from '../../systems/shipUpgrades';
import { CaptainTab } from './CaptainTab';
import { ShipTab } from './ShipTab';
import { DashboardTab } from './DashboardTab';
import { ShopTab } from './ShopTab';
import { GrimoireTab } from './GrimoireTab';
import { CrewTab } from './CrewTab';
import { TerritoryTab } from './TerritoryTab';
import { TextureOverlay } from '../UI/TextureOverlay';
import { PanelFrame } from '../UI/PanelFrame';
import { getUiAsset } from '../../utils/images';


type ManagementTab = 'crew' | 'captain' | 'dashboard' | 'territory' | 'grimoire' | 'shop' | 'ship';

// --- Progressive Unlock Configuration ---
// Defines when each tab/subsystem becomes available based on controlled island count.
// Tabs not listed here are always available.
const TAB_UNLOCK_REQUIREMENTS: Partial<Record<ManagementTab, { minIslands: number; unlockText: string }>> = {
  territory: { minIslands: 1, unlockText: 'Conquer your first island to unlock Territory management' },
  shop: { minIslands: 2, unlockText: 'Control 2+ islands to unlock the Shop' },
};

export const ManagementPanel: React.FC = () => {
  const crew = useGameStore(s => s.crew);
  const notifications = useGameStore(s => s.notifications);
  const dayCount = useGameStore(s => s.dayCount);
  const islands = useGameStore(s => s.islands);
  const flags = useGameStore(s => s.flags);
  const currentIsland = useGameStore(s => s.currentIsland);
  const tradeRoutes = useGameStore(s => s.tradeRoutes);
  const ship = useGameStore(s => s.ship);
  const crewIdentity = useGameStore(s => s.crewIdentity);
  const [activeTab, setActiveTab] = useState<ManagementTab>('dashboard');

  const recruitedCrew = useMemo(() => crew.filter((m) => m.recruited), [crew]);
  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);
  const controlledIslands = useMemo(() => islands.filter((i) => i.status === 'controlled'), [islands]);
  const territoryCount = controlledIslands.length;
  const hasShop = !!islandShops[currentIsland];

  // Count total crew conversations available (for tab badge)
  const totalCrewEvents = useMemo(() => {
    let total = 0;
    for (const member of crew) {
      if (!member.recruited) continue;
      total += getAvailableCrewEvents(member.id, flags, dayCount).length;
    }
    return total;
  }, [crew, flags, dayCount]);

  const availableUpgrades = useMemo(() => getAvailableUpgrades(ship, currentIsland, dayCount), [ship, currentIsland, dayCount]);

  type TabDef = { id: ManagementTab; label: string; badge?: number; locked: boolean; lockText?: string };
  const baseTabs: TabDef[] = [
    { id: 'dashboard', label: 'DASHBOARD', locked: false },
    { id: 'captain', label: 'CAPTAIN', locked: false },
    { id: 'crew', label: 'CREW', badge: totalCrewEvents > 0 ? totalCrewEvents : undefined, locked: false },
    { id: 'ship', label: 'SHIP', badge: availableUpgrades.length > 0 ? availableUpgrades.length : undefined, locked: false },
    { id: 'shop', label: 'SHOP', locked: false },
    { id: 'territory', label: 'TERRITORY', badge: territoryCount > 0 ? territoryCount : undefined, locked: false },
    { id: 'grimoire', label: 'GRIMOIRE', badge: unreadCount, locked: false },
  ];
  const tabs = baseTabs.map((tab): TabDef => {
    const req = TAB_UNLOCK_REQUIREMENTS[tab.id];
    if (req && territoryCount < req.minIslands) {
      return { ...tab, locked: true, lockText: req.unlockText, badge: undefined };
    }
    return tab;
  }).filter((tab) => {
    // Shop tab is hidden entirely if no shop on this island (preserving existing behavior)
    // But if locked, still show it greyed out so players know it exists
    if (tab.id === 'shop' && !hasShop && !tab.locked) return false;
    return true;
  });

  // Safety: if the current activeTab is locked or not in the visible tabs list, fall back to 'dashboard'
  const currentTabEntry = tabs.find((t) => t.id === activeTab);
  const effectiveTab = (!currentTabEntry || currentTabEntry.locked) ? 'dashboard' : activeTab;

  return (
    <div className="h-full flex flex-col bg-ocean-900 relative overflow-hidden">
      {/* Texture overlay + panel frame */}
      <TextureOverlay variant="management" />
      <PanelFrame variant="management" />

      {/* Crew Identity Header */}
      {crewIdentity.named && (
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-2 bg-ocean-950/80 border-b border-ocean-700/50">
            <div className="flex items-center gap-2">
              {getFlagImage(crewIdentity.flagDesign) && (
                <img
                  src={getFlagImage(crewIdentity.flagDesign)!}
                  alt="crew flag"
                  className="w-5 h-5 rounded-sm object-cover border border-ocean-700/50"
                />
              )}
              <span className="text-gold-400 text-xs font-display font-bold tracking-[0.3em] uppercase">{crewIdentity.name}</span>
              <span className="text-ocean-500 text-xs">|</span>
              <span className="text-ocean-400 text-xs tracking-wider">DAY {dayCount}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-ocean-500">
              <span>{recruitedCrew.length} CREW</span>
              <span>{territoryCount} ISLANDS</span>
              <span>{tradeRoutes.length} ROUTES</span>
            </div>
          </div>
          {/* Decorative border strip below header */}
          {getUiAsset('border_strips') && (
            <img
              src={getUiAsset('border_strips')!}
              alt=""
              className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none z-[2]"
              style={{ objectFit: 'fill', opacity: 0.4 }}
              draggable={false}
            />
          )}
        </div>
      )}
      {/* Tab Bar */}
      <div className="flex border-b border-ocean-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.locked && setActiveTab(tab.id)}
            disabled={tab.locked}
            title={tab.locked ? tab.lockText : undefined}
            className={`flex-1 px-4 py-3 font-display tracking-wider transition-all duration-200 relative ${
              tab.locked
                ? 'text-ocean-600 cursor-not-allowed bg-ocean-900/50 text-xs font-bold'
                : effectiveTab === tab.id
                  ? 'text-gold-400 border-b-2 border-gold-400 bg-ocean-800 font-bold text-sm'
                  : 'text-ocean-400 hover:text-ocean-200 hover:bg-ocean-800/60 font-semibold text-sm'
            }`}
          >
            {tab.locked && <span className="mr-1 text-ocean-600">&#128274;</span>}
            {tab.label}
            {!tab.locked && tab.badge && tab.badge > 0 && (
              <span className={`absolute top-1 right-2 w-5 h-5 rounded-full text-xs text-white flex items-center justify-center font-bold ${
                tab.id === 'crew' ? 'bg-amber-500 animate-pulse' : 'bg-crimson-500'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* CAPTAIN TAB */}
        {effectiveTab === 'captain' && <CaptainTab />}

        {/* CREW TAB */}
        {effectiveTab === 'crew' && <CrewTab />}

        {/* DASHBOARD TAB */}
        {effectiveTab === 'dashboard' && <DashboardTab />}

        {/* SHIP TAB */}
        {effectiveTab === 'ship' && <ShipTab />}

        {/* TERRITORY TAB */}
        {effectiveTab === 'territory' && <TerritoryTab />}

        {/* SHOP TAB */}
        {effectiveTab === 'shop' && hasShop && <ShopTab />}

        {/* GRIMOIRE TAB */}
        {effectiveTab === 'grimoire' && <GrimoireTab />}
      </div>
    </div>
  );
};
