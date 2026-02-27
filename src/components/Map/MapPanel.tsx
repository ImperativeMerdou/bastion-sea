import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { IslandDetail } from './IslandDetail';
import { getImagePath, getUiAsset } from '../../utils/images';
import GameIcon from '../UI/GameIcon';
import { getWardenThreatLevel, getWardenThreatDescription } from '../../systems/wardenscale';
import { getMoraleBarColor } from '../../utils/formatting';



const statusColors: Record<string, string> = {
  hidden: 'bg-ocean-700 border-ocean-600',
  discovered: 'bg-ocean-600 border-ocean-400 hover:border-amber-500 hover:shadow-lg hover:shadow-ocean-400/20',
  neutral: 'bg-ocean-500 border-ocean-300 hover:border-amber-400 hover:shadow-lg hover:shadow-ocean-300/20',
  hostile: 'bg-crimson-700 border-crimson-500 hover:border-crimson-400 hover:shadow-lg hover:shadow-crimson-500/20',
  allied: 'bg-green-800 border-green-500 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20',
  controlled: 'bg-amber-700 border-amber-400 glow-amber shadow-lg shadow-amber-500/30',
  contested: 'bg-purple-800 border-purple-500 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20',
};

const statusIcons: Record<string, string> = {
  hidden: '?',
  discovered: '◇',
  neutral: '◇',
  hostile: '◆',
  allied: '◈',
  controlled: '⬡',
  contested: '⚔',
};

const zoneLabels: Record<string, { label: string; y: number; color: string }> = {
  northern: { label: 'NORTHERN ARC', y: 3, color: 'text-blue-400/40' },
  central: { label: 'CENTRAL BELT', y: 38, color: 'text-amber-400/30' },
  southern: { label: 'SOUTHERN REACH', y: 68, color: 'text-crimson-400/30' },
};

export const MapPanel: React.FC = () => {
  const islands = useGameStore(s => s.islands);
  const selectedIsland = useGameStore(s => s.selectedIsland);
  const selectIsland = useGameStore(s => s.selectIsland);
  const mc = useGameStore(s => s.mc);
  const dayCount = useGameStore(s => s.dayCount);
  const currentIsland = useGameStore(s => s.currentIsland);
  const resources = useGameStore(s => s.resources);
  const territoryStates = useGameStore(s => s.territoryStates);
  const threatState = useGameStore(s => s.threatState);
  const tradeRoutes = useGameStore(s => s.tradeRoutes);
  const openDayPlanner = useGameStore(s => s.openDayPlanner);
  const [hoveredIsland, setHoveredIsland] = useState<string | null>(null);
  const [focusedIsland, setFocusedIsland] = useState<string | null>(null);
  const islandRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const visibleIslands = useMemo(() => islands.filter((i) => i.status !== 'hidden'), [islands]);
  const selected = islands.find((i) => i.id === selectedIsland);
  const mapBg = getImagePath('map_bg.webp');
  const controlledCount = useMemo(() => islands.filter((i) => i.status === 'controlled').length, [islands]);

  // Keyboard navigation for island nodes
  const handleMapKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't intercept if user is in an input
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.key === 'Escape') {
      if (selectedIsland) {
        e.preventDefault();
        selectIsland(null);
        setFocusedIsland(null);
      }
      return;
    }

    // Arrow keys cycle through visible islands
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      if (visibleIslands.length === 0) return;
      e.preventDefault();
      const currentFocus = focusedIsland || selectedIsland || currentIsland;
      const currentIdx = visibleIslands.findIndex(i => i.id === currentFocus);
      let nextIdx: number;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIdx = currentIdx < visibleIslands.length - 1 ? currentIdx + 1 : 0;
      } else {
        nextIdx = currentIdx > 0 ? currentIdx - 1 : visibleIslands.length - 1;
      }
      const nextId = visibleIslands[nextIdx].id;
      setFocusedIsland(nextId);
      setHoveredIsland(nextId);
      // Focus the DOM node for screen readers
      islandRefs.current[nextId]?.focus();
      return;
    }

    // Enter or Space selects focused island
    if ((e.key === 'Enter' || e.key === ' ') && focusedIsland) {
      e.preventDefault();
      selectIsland(focusedIsland);
      return;
    }
  }, [visibleIslands, focusedIsland, selectedIsland, currentIsland, selectIsland]);

  useEffect(() => {
    window.addEventListener('keydown', handleMapKeyDown);
    return () => window.removeEventListener('keydown', handleMapKeyDown);
  }, [handleMapKeyDown]);

  return (
    <div className="h-full flex bg-ocean-900" role="main" aria-label="Sea map">
      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden" role="region" aria-label="Island map navigation. Use arrow keys to move between islands, Enter to select.">
        {/* Ocean background with grid or map image */}
        <div className="absolute inset-0 bg-ocean-900">
          {mapBg ? (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{ backgroundImage: `url(${mapBg})` }}
            />
          ) : (
            /* Fallback grid lines */
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
              {Array.from({ length: 20 }, (_, i) => (
                <React.Fragment key={`grid-${i}`}>
                  <line
                    x1={`${(i + 1) * 5}%`} y1="0"
                    x2={`${(i + 1) * 5}%`} y2="100%"
                    stroke="#4a6382" strokeWidth="0.3"
                  />
                  <line
                    x1="0" y1={`${(i + 1) * 5}%`}
                    x2="100%" y2={`${(i + 1) * 5}%`}
                    stroke="#4a6382" strokeWidth="0.3"
                  />
                </React.Fragment>
              ))}
            </svg>
          )}

          {/* Vignette overlay for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10, 14, 26, 0.6) 100%)',
            }}
          />

          {/* Zone labels */}
          {Object.entries(zoneLabels).map(([zone, { label, y, color }]) => (
            <div
              key={zone}
              className={`absolute left-3 ${color} text-xs tracking-[0.4em] uppercase font-display font-bold`}
              style={{ top: `${y}%` }}
            >
              - {label} -
            </div>
          ))}

          {/* Zone dividers - gradient lines */}
          <div className="absolute left-0 right-0 h-px" style={{ top: '30%', background: 'linear-gradient(to right, transparent, rgba(74, 99, 130, 0.3) 20%, rgba(74, 99, 130, 0.3) 80%, transparent)' }} />
          <div className="absolute left-0 right-0 h-px" style={{ top: '62%', background: 'linear-gradient(to right, transparent, rgba(74, 99, 130, 0.3) 20%, rgba(74, 99, 130, 0.3) 80%, transparent)' }} />
        </div>

        {/* Routes between visible islands */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="route-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Wardensea threat zone gradient */}
            <radialGradient id="threat-zone" cx="95%" cy="5%" r="70%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#dc2626" stopOpacity={Math.min(0.3, threatState.level * 0.003)} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Wardensea threat zone overlay - visible at high/critical alert */}
          {(threatState.wardenseaAlert === 'high' || threatState.wardenseaAlert === 'critical') && (
            <rect
              x="0" y="0" width="100%" height="100%"
              fill="url(#threat-zone)"
              className={threatState.wardenseaAlert === 'critical' ? 'animate-pulse' : ''}
            />
          )}

          {/* Blockaded route overlays */}
          {threatState.blockadedRoutes.map(routeId => {
            const route = tradeRoutes.find(r => r.id === routeId);
            if (!route) return null;
            const fromIsland = islands.find(i => i.id === route.fromIsland);
            const toIsland = islands.find(i => i.id === route.toIsland);
            if (!fromIsland || !toIsland) return null;
            const midX = (fromIsland.position.x + toIsland.position.x) / 2;
            const midY = (fromIsland.position.y + toIsland.position.y) / 2;
            return (
              <React.Fragment key={`blockade-${routeId}`}>
                <line
                  x1={`${fromIsland.position.x}%`} y1={`${fromIsland.position.y}%`}
                  x2={`${toIsland.position.x}%`} y2={`${toIsland.position.y}%`}
                  stroke="#dc2626" strokeWidth="3" strokeDasharray="4 8" opacity="0.7"
                />
                <text
                  x={`${midX}%`} y={`${midY}%`}
                  fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="middle"
                  dy="-6" opacity="0.9"
                  style={{ letterSpacing: '0.1em' }}
                >
                  BLOCKADED
                </text>
              </React.Fragment>
            );
          })}
          {visibleIslands.map((island) =>
            island.routes
              .filter((route) => {
                const target = islands.find((i) => i.id === route.targetId);
                return target && target.status !== 'hidden';
              })
              .map((route) => {
                const target = islands.find((i) => i.id === route.targetId)!;
                const dangerColors: Record<string, string> = {
                  safe: '#4a6382',
                  moderate: '#d97706',
                  dangerous: '#dc2626',
                  deadly: '#7c2d12',
                };
                const isActive =
                  (currentIsland === island.id && selectedIsland === route.targetId) ||
                  (currentIsland === route.targetId && selectedIsland === island.id);
                return (
                  <React.Fragment key={`${island.id}-${route.targetId}`}>
                    {/* Route glow for active selection */}
                    {isActive && (
                      <line
                        x1={`${island.position.x}%`}
                        y1={`${island.position.y}%`}
                        x2={`${target.position.x}%`}
                        y2={`${target.position.y}%`}
                        stroke={dangerColors[route.dangerLevel]}
                        strokeWidth="3"
                        opacity="0.3"
                        filter="url(#route-glow)"
                      />
                    )}
                    <line
                      x1={`${island.position.x}%`}
                      y1={`${island.position.y}%`}
                      x2={`${target.position.x}%`}
                      y2={`${target.position.y}%`}
                      stroke={dangerColors[route.dangerLevel]}
                      strokeWidth={isActive ? '1.5' : '1'}
                      strokeDasharray={isActive ? '8 4' : '6 4'}
                      opacity={isActive ? '0.8' : '0.35'}
                    />
                  </React.Fragment>
                );
              })
          )}
        </svg>

        {/* Island Nodes */}
        {visibleIslands.map((island) => {
          const isHere = currentIsland === island.id;
          return (
            <div
              key={island.id}
              ref={(el) => { islandRefs.current[island.id] = el; }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 outline-none"
              style={{
                left: `${island.position.x}%`,
                top: `${island.position.y}%`,
              }}
              role="button"
              tabIndex={0}
              aria-label={`${island.name}, ${island.status}${isHere ? ', current location' : ''}${island.status === 'controlled' ? ', controlled territory' : ''}`}
              onClick={() => selectIsland(island.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectIsland(island.id);
                }
              }}
              onFocus={() => { setFocusedIsland(island.id); setHoveredIsland(island.id); }}
              onBlur={() => { setFocusedIsland(null); setHoveredIsland(null); }}
              onMouseEnter={() => setHoveredIsland(island.id)}
              onMouseLeave={() => setHoveredIsland(null)}
            >
              {/* Ping ring for current location */}
              {isHere && (
                <div className="absolute inset-0 -m-2 rounded-full border-2 border-green-400/40 animate-ping" />
              )}

              {/* Raid target crimson ring */}
              {threatState.raidTarget === island.id && (
                <>
                  <div className="absolute inset-0 -m-4 rounded-full border-2 border-crimson-500/60 animate-pulse" />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-crimson-900/90 border border-crimson-600 px-2 py-0.5 rounded-sm whitespace-nowrap z-20">
                    <span className="text-crimson-300 text-xs font-bold tracking-wider">
                      ⚔️ RAID {threatState.raidDay && threatState.raidDay > dayCount
                        ? `IN ${threatState.raidDay - dayCount}d`
                        : 'IMMINENT'}
                    </span>
                  </div>
                </>
              )}

              {/* Glow for selected island */}
              {selectedIsland === island.id && (
                <div className="absolute inset-0 -m-3 rounded-full bg-amber-400/10 blur-md animate-pulse-slow" />
              )}

              {/* Controlled territory subtle pulse */}
              {island.status === 'controlled' && !isHere && (
                <div className="absolute inset-0 -m-1 rounded-full border border-amber-400/20 animate-pulse-slow" />
              )}

              {/* Node */}
              <div
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-base font-bold transition-all duration-200 ${
                  statusColors[island.status]
                } ${
                  selectedIsland === island.id
                    ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-ocean-900 scale-110'
                    : hoveredIsland === island.id || focusedIsland === island.id
                      ? 'scale-105 brightness-110'
                      : ''
                }`}
              >
                {statusIcons[island.status]}
              </div>

              {/* Label */}
              <div className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-display font-bold tracking-wider transition-all duration-200 ${
                hoveredIsland === island.id || selectedIsland === island.id || focusedIsland === island.id
                  ? 'text-amber-400'
                  : isHere
                    ? 'text-green-300'
                    : 'text-ocean-300'
              }`} style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                {island.name}
              </div>

              {/* Controlled indicator */}
              {island.status === 'controlled' && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-ocean-900 border border-amber-300 shadow-lg shadow-amber-500/40">
                  K
                </div>
              )}

              {/* Territory morale mini-bar for controlled islands */}
              {island.status === 'controlled' && territoryStates[island.id] && (() => {
                const morale = territoryStates[island.id].morale;
                const barColor = getMoraleBarColor(morale);
                const borderColor = morale < 15 ? 'border-red-500/60' : morale < 30 ? 'border-orange-500/40' : 'border-ocean-500/30';
                return (
                  <>
                    {morale < 15 && (
                      <div className="absolute inset-0 rounded-full border-2 border-red-500/60 animate-ping" />
                    )}
                    <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full overflow-hidden border ${borderColor} bg-ocean-800/80`}>
                      <div className={`h-full rounded-full ${barColor} transition-all duration-500`} style={{ width: `${morale}%` }} />
                    </div>
                  </>
                );
              })()}

              {/* Ship icon for current location */}
              {isHere && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-base" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }}>
                  ⛵
                </div>
              )}

              {/* Tooltip on hover or focus */}
              {(hoveredIsland === island.id || focusedIsland === island.id) && selectedIsland !== island.id && (
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-ocean-800/95 backdrop-blur-sm border border-ocean-500 px-4 py-2.5 rounded-sm text-xs whitespace-nowrap z-20 animate-fade-in shadow-xl">
                  <p className="text-ocean-100 font-bold text-sm">{island.name}</p>
                  <p className="text-ocean-400 mt-0.5">
                    {island.controller}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-bold uppercase ${
                      island.difficulty === 'low' ? 'text-green-400' :
                      island.difficulty === 'medium' ? 'text-amber-400' :
                      island.difficulty === 'high' ? 'text-crimson-400' :
                      'text-purple-400'
                    }`}>
                      {island.difficulty.replace('_', ' ')}
                    </span>
                    {island.status === 'controlled' && (
                      <span className="text-amber-400 text-xs font-bold">YOURS</span>
                    )}
                    {isHere && (
                      <span className="text-green-400 text-xs font-bold">HERE</span>
                    )}
                  </div>
                  {/* Morale readout for controlled territories */}
                  {island.status === 'controlled' && territoryStates[island.id] && (() => {
                    const m = territoryStates[island.id].morale;
                    const mColor = m >= 60 ? 'text-green-400' : m >= 30 ? 'text-amber-400' : m >= 15 ? 'text-orange-400' : 'text-red-400';
                    const mLabel = m >= 60 ? 'STABLE' : m >= 30 ? 'RESTLESS' : m >= 15 ? 'UNREST' : 'REBELLION';
                    return (
                      <div className="flex items-center gap-2 mt-1 pt-1 border-t border-ocean-600">
                        <span className="text-ocean-500 text-xs">MORALE</span>
                        <div className="w-12 h-1.5 bg-ocean-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${m >= 60 ? 'bg-green-400' : m >= 30 ? 'bg-amber-400' : m >= 15 ? 'bg-orange-400' : 'bg-red-400'}`} style={{ width: `${m}%` }} />
                        </div>
                        <span className={`text-xs font-bold ${mColor}`}>{mLabel}</span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          );
        })}

        {/* Wardensea fleet mobilizing warning - critical threat */}
        {threatState.wardenseaAlert === 'critical' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-crimson-950/80 border border-crimson-700 px-5 py-2 rounded-sm animate-pulse">
            <p className="text-crimson-400 text-xs font-bold tracking-[0.2em] text-center">
              WARDENSEA FLEET MOBILIZING
            </p>
          </div>
        )}

        {/* Compass Rose - decorative (image or CSS fallback) */}
        <div className="absolute bottom-4 right-4 pointer-events-none" aria-hidden="true">
          {getUiAsset('compass_rose') ? (
            <div className="relative" style={{ width: 128, height: 128 }}>
              {/* Compass ring — stationary brass ring behind the rotating rose */}
              {getUiAsset('compass_ring') && (
                <img
                  src={getUiAsset('compass_ring')!}
                  alt=""
                  className="absolute inset-0 w-full h-full"
                  style={{ opacity: 0.3 }}
                  draggable={false}
                />
              )}
              <img
                src={getUiAsset('compass_rose')!}
                alt=""
                className="absolute inset-0 w-full h-full animate-compass-rotate"
                style={{ opacity: 0.4 }}
                draggable={false}
              />
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center opacity-40">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-ocean-300 text-xs font-bold tracking-widest">N</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-ocean-500 text-xs">S</div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-ocean-500 text-xs">W</div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-ocean-500 text-xs">E</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border border-ocean-500/50 rotate-45" />
                  <div className="absolute text-amber-500/50 text-xs">&#10022;</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend - improved */}
        <div className="absolute bottom-4 left-4 bg-ocean-800/90 backdrop-blur-sm border border-ocean-600 px-3 py-2.5 rounded-sm text-xs shadow-lg">
          <p className="text-brass-400 font-display font-bold mb-1.5 tracking-[0.15em] text-xs">LEGEND</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ocean-600 border border-ocean-400" />
              <span className="text-ocean-400">Discovered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-800 border border-green-500" />
              <span className="text-ocean-400">Allied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-crimson-700 border border-crimson-500" />
              <span className="text-ocean-400">Hostile</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-700 border border-amber-400" />
              <span className="text-ocean-400">Controlled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ocean-700 border-2 border-green-400 relative">
                <div className="absolute inset-0 border border-green-400/50 rounded-full animate-ping" />
              </div>
              <span className="text-ocean-400">You are here</span>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-ocean-600 space-y-1">
              <div className="flex items-center gap-2">
                <div className="border-t border-dashed border-green-400/60" style={{ width: 12 }} />
                <span className="text-ocean-500 text-xs">Safe route</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="border-t border-dashed border-amber-400/60" style={{ width: 12 }} />
                <span className="text-ocean-500 text-xs">Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="border-t border-dashed border-crimson-400/60" style={{ width: 12 }} />
                <span className="text-ocean-500 text-xs">Dangerous</span>
              </div>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-ocean-600 space-y-0.5">
              <p className="text-ocean-600 text-xs">[Arrow keys] Navigate</p>
              <p className="text-ocean-600 text-xs">[Enter] Select island</p>
              <p className="text-ocean-600 text-xs">[Esc] Deselect</p>
            </div>
          </div>
        </div>

        {/* Territory & Status Panel - top left */}
        <div className="absolute top-4 left-4 bg-ocean-800/90 backdrop-blur-sm border border-brass-500/30 px-4 py-3 rounded-sm shadow-lg space-y-3">
          {/* Bounty */}
          <div>
            <p className="text-brass-400 text-xs tracking-[0.15em] uppercase font-display">BOUNTY</p>
            <p className={`text-lg font-display font-bold ${mc.bounty > 0 ? 'text-crimson-400' : 'text-ocean-400'}`}>
              {mc.bounty > 0 ? `${(mc.bounty / 1000000).toFixed(0)}M` : '???'}
              <span className="text-ocean-500 text-xs ml-1 font-body font-normal">sovereigns</span>
            </p>
          </div>

          {/* Wardensea Threat */}
          {(() => {
            const threat = getWardenThreatLevel(mc.bounty, controlledCount);
            if (threat <= 0) return null;
            const info = getWardenThreatDescription(threat);
            return (
              <div className="border-t border-ocean-600 pt-2">
                <p className="text-brass-400 text-xs tracking-[0.15em] uppercase font-display">WARDENSEA</p>
                <p className={`text-sm font-bold ${info.color}`}>
                  {info.label}
                </p>
              </div>
            );
          })()}

          {/* Spy Operations Warning */}
          {threatState.spyOperations > 0 && (
            <div className="border-t border-ocean-600 pt-2">
              <p className="text-amber-500 text-xs font-bold tracking-wider" title={`Enemy intelligence operations draining ${threatState.spyOperations * 2} intel and ${threatState.spyOperations * 3} supplies per day`}>
                🕵️ {threatState.spyOperations} SPY OP{threatState.spyOperations > 1 ? 'S' : ''} ACTIVE
              </p>
            </div>
          )}

          {/* Territory */}
          <div className="border-t border-ocean-600 pt-2">
            <p className="text-brass-400 text-xs tracking-[0.15em] uppercase font-display">TERRITORY</p>
            <div className="flex items-baseline gap-1">
              <span className="text-gold-400 text-xl font-display font-bold">{controlledCount}</span>
              <span className="text-ocean-500 text-xs">/ {islands.length} islands</span>
            </div>
            <div className="w-full h-1.5 bg-ocean-700 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${(controlledCount / islands.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Resources mini */}
          <div className="border-t border-ocean-600 pt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div className="flex items-center gap-1">
              <GameIcon iconKey="sovereignty" fallback="⬡" className="w-4 h-4" />
              <span className="text-ocean-300">{resources.sovereigns.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <GameIcon iconKey="supplies" fallback="◈" className="w-4 h-4" />
              <span className="text-ocean-300">{resources.supplies}</span>
            </div>
            <div className="flex items-center gap-1">
              <GameIcon iconKey="materials" fallback="⬢" className="w-4 h-4" />
              <span className="text-ocean-300">{resources.materials}</span>
            </div>
            <div className="flex items-center gap-1">
              <GameIcon iconKey="intelligence" fallback="◉" className="w-4 h-4" />
              <span className="text-ocean-300">{resources.intelligence}</span>
            </div>
          </div>

          {/* Day + Rest */}
          <div className="border-t border-ocean-600 pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-brass-400 text-xs tracking-[0.15em] uppercase font-display">DAY {dayCount}</p>
            </div>
            <button
              onClick={() => openDayPlanner()}
              className="godtide-btn-primary w-full text-xs"
            >
              PLAN YOUR DAY
            </button>
          </div>
        </div>
      </div>

      {/* Island Detail Sidebar */}
      {selected && (
        <IslandDetail island={selected} onClose={() => selectIsland(null)} />
      )}
    </div>
  );
};
