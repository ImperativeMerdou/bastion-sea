import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

// ==========================================
// TUTORIAL TIPS - Context-sensitive guidance
// ==========================================

interface TutorialTip {
  id: string;
  /** Which panel triggers this tip */
  panel: string;
  /** Title of the tip */
  title: string;
  /** Explanation text */
  body: string;
  /** Icon */
  icon: string;
  /** Flag that must be true to show (e.g., 'tavven_conquered') */
  requiresFlag?: string;
  /** Flag that must NOT be set (tip already seen) */
  seenFlag: string;
  /** Only show after this day */
  minDay?: number;
}

const TIPS: TutorialTip[] = [
  {
    id: 'map_intro',
    panel: 'map',
    title: 'THE MAP',
    body: 'Click islands to view intel and plan your next move. Sail to islands by clicking SAIL in the island panel. Advance days with REST & ADVANCE to earn income from conquered territories.',
    icon: '🗺️',
    seenFlag: 'tip_map_seen',
  },
  {
    id: 'management_intro',
    panel: 'management',
    title: 'CREW MANAGEMENT',
    body: 'Check crew loyalty, manage your captain\'s stats, and upgrade conquered territories. The SHOP tab appears when you\'re docked at an island with a market - buy gear, supplies, and unique items.',
    icon: '⚓',
    seenFlag: 'tip_management_seen',
  },
  {
    id: 'conquest_intro',
    panel: 'map',
    title: 'CONQUEST',
    body: 'When you\'re at an island, click CONQUER to take control. Choose your approach - force, negotiation, economics, or subversion. Each approach costs different resources and affects crew loyalty differently.',
    icon: '⚔️',
    requiresFlag: 'tavven_conquered',
    seenFlag: 'tip_conquest_seen',
    minDay: 3,
  },
  {
    id: 'territory_intro',
    panel: 'management',
    title: 'TERRITORY',
    body: 'Conquered islands generate daily income - sovereigns, supplies, and intel. Keep morale high by visiting territories and building upgrades. If morale drops to zero, the island rebels!',
    icon: '🏰',
    requiresFlag: 'tavven_conquered',
    seenFlag: 'tip_territory_seen',
    minDay: 4,
  },
  {
    id: 'shop_intro',
    panel: 'management',
    title: 'SHOP AVAILABLE',
    body: 'The island market is open! Switch to the SHOP tab to buy supplies, weapons, and unique gear. Controlled islands give you discounts. You can also sell excess resources for Sovereigns.',
    icon: '🏪',
    requiresFlag: 'tavven_conquered',
    seenFlag: 'tip_shop_seen',
    minDay: 3,
  },
  {
    id: 'bounty_intro',
    panel: 'map',
    title: 'BOUNTY & THE WARDENSEA',
    body: 'Every aggressive action increases your bounty. Higher bounties attract stronger Wardensea patrols and tougher encounters. Manage your infamy carefully - or embrace it.',
    icon: '🏴‍☠️',
    requiresFlag: 'keldriss_explored',
    seenFlag: 'tip_bounty_seen',
  },
  // === COMBAT TUTORIALS ===
  {
    id: 'combat_intro',
    panel: 'combat',
    title: 'COMBAT - THE BASICS',
    body: 'Choose actions from your combat deck. Each costs STAMINA - when you\'re out, you can only rest. Watch your HP bar and manage stamina carefully. Use DEFEND to reduce incoming damage and recover stamina.',
    icon: '⚔️',
    seenFlag: 'tip_combat_seen',
  },
  {
    id: 'combat_dominion',
    panel: 'combat',
    title: 'DOMINION POWERS',
    body: 'Iron, Sight, and King - three expressions of Dominion. Iron hits hard and tanks damage. Sight reads enemies and lands crits. King commands the battlefield. Train Dominion in the Captain tab to unlock stronger combat actions.',
    icon: '🔥',
    seenFlag: 'tip_dominion_seen',
    minDay: 3,
  },
  {
    id: 'combat_crew_assist',
    panel: 'combat',
    title: 'CREW ASSISTS',
    body: 'Your crew fights alongside you! Each crew member offers unique assist abilities - shields, debuffs, healing, and damage. Higher crew loyalty means stronger assists. Mutinous crew won\'t help at all.',
    icon: '🤝',
    requiresFlag: 'prologue_combat_won',
    seenFlag: 'tip_crew_assist_seen',
    minDay: 4,
  },
  {
    id: 'combat_status_effects',
    panel: 'combat',
    title: 'STATUS EFFECTS',
    body: 'Bleed, stun, weaken, expose - status effects stack and persist across turns. Bleed deals damage each turn. Stun skips your turn. Weaken reduces attack power. Expose lowers defense. Plan around them.',
    icon: '💀',
    seenFlag: 'tip_status_effects_seen',
    minDay: 6,
  },
  {
    id: 'combat_king_meter',
    panel: 'combat',
    title: 'KING DOMINION METER',
    body: 'The King meter builds as you fight. At 100%, it unleashes a devastating King expression - massive damage and battlefield control. Building King requires aggressive play and landing hits consistently.',
    icon: '👑',
    seenFlag: 'tip_king_meter_seen',
    minDay: 8,
  },
  // === TRAVEL TUTORIAL ===
  {
    id: 'travel_intro',
    panel: 'travel',
    title: 'SEA TRAVEL',
    body: 'Sailing between islands costs supplies and takes days. Longer routes are cheaper but slower. Events happen at sea - crew conversations, storms, discoveries, and enemy patrols. Choose your responses wisely.',
    icon: '⛵',
    seenFlag: 'tip_travel_seen',
  },
  // === ACT 2 GUIDANCE ===
  {
    id: 'act2_intro',
    panel: 'map',
    title: 'THE WORLD RESPONDS',
    body: 'Act 2 is about consolidation and survival. Factions push back - the Wardensea sends fleets, the Kolmari impose blockades, and the Conquerors come calling. Keep your crew loyal, your territories stable, and your enemies guessing.',
    icon: '🌊',
    requiresFlag: 'act2_begun',
    seenFlag: 'tip_act2_seen',
  },
  {
    id: 'territory_morale',
    panel: 'management',
    title: 'TERRITORY MORALE',
    body: 'Conquered territories lose morale over time. Visit your territories to boost morale, build upgrades to stabilize them, and dispatch crew to handle local problems. If morale hits zero - rebellion.',
    icon: '📉',
    seenFlag: 'tip_morale_seen',
    minDay: 10,
    requiresFlag: 'tavven_conquered',
  },

  {
    id: 'day_planner',
    panel: 'map',
    title: 'DAY PLANNER',
    body: 'Click PLAN YOUR DAY on the map to spend your 5 daily actions. Train combat skills, gather intel, boost morale, repair your ship, or rest. Assign crew to ship roles for passive daily bonuses. Every day counts.',
    icon: '📋',
    requiresFlag: 'tavven_conquered',
    seenFlag: 'tip_day_planner_seen',
    minDay: 3,
  },
  {
    id: 'trade_routes',
    panel: 'management',
    title: 'TRADE ROUTES',
    body: 'Control multiple islands to establish trade routes between them. Routes generate scaling income that grows over 14 days to maturity. Islands with complementary resources earn bonus income. Check the Territory tab for route details.',
    icon: '💰',
    requiresFlag: 'tavven_conquered',
    seenFlag: 'tip_trade_routes_seen',
    minDay: 8,
  },

  {
    id: 'equipment_intro',
    panel: 'management',
    title: 'EQUIPMENT',
    body: 'Open the Captain tab to equip weapons, armor, and accessories. Each piece boosts combat stats. Some items have special effects: Sight Lens boosts crit chance, Bio Lantern grants dodge, Stormheart Amulet adds lightning damage. Check the Shop tab for new gear.',
    icon: '\u{2694}',
    requiresFlag: 'tavven_conquered',
    seenFlag: 'tip_equipment_seen',
    minDay: 5,
  },
  {
    id: 'grimoire_intro',
    panel: 'management',
    title: 'GRIMOIRE BROADCASTS',
    body: 'The Grimoire tab tracks Kovesse\'s broadcasts and world news. As your bounty grows and territory expands, you\'ll see faction reactions, market shifts, and crew commentary. Check it regularly. The world is watching.',
    icon: '\u{1F4E1}',
    requiresFlag: 'tavven_conquered',
    seenFlag: 'tip_grimoire_broadcasts_seen',
    minDay: 6,
  },

  // === LORE TIPS ===
  {
    id: 'lore_dominion',
    panel: 'management',
    title: 'DOMINION',
    body: 'Iron, Sight, and King are the three expressions of Dominion, the power inside every living thing. Iron is raw strength and defense. Sight reads the world and finds openings. King is willpower that crushes weaker opponents. Train them in the Captain tab.',
    icon: '🔥',
    seenFlag: 'tip_lore_dominion',
    minDay: 1,
  },
  {
    id: 'lore_tiers',
    panel: 'management',
    title: 'DOMINION TIERS',
    body: 'Dominion tiers measure strength: Flicker, Tempered, Forged, Prime, Conqueror. Most people never pass Tempered. Karyudon is Forged-tier Iron, which means his body can become harder than steel.',
    icon: '📊',
    seenFlag: 'tip_lore_tiers',
    requiresFlag: 'tip_lore_dominion',
    minDay: 2,
  },
  {
    id: 'lore_god_fruit',
    panel: 'management',
    title: 'GOD FRUITS',
    body: 'God Fruits grant permanent, irreversible power. Eat one and your body changes forever. They come in four classes: Element, Beast, Law, and Mythical Beast. Karyudon carries a Western Dragon Fruit, Mythical Beast class, the rarest there is.',
    icon: '🍐',
    seenFlag: 'tip_lore_god_fruit',
    minDay: 3,
  },
  {
    id: 'lore_grimoire',
    panel: 'management',
    title: 'THE GRIMOIRE NETWORK',
    body: 'Grimoires are communication devices powered by runestones. They broadcast news, bounty updates, and propaganda across the Bastion Sea. Think of them as the world\'s radio network. Your engineer Kovesse runs yours.',
    icon: '📡',
    seenFlag: 'tip_lore_grimoire',
    requiresFlag: 'kovesse_recruited',
    minDay: 4,
  },
  {
    id: 'lore_wardensea',
    panel: 'map',
    title: 'THE WARDENSEA',
    body: 'The Wardensea is the Bastion Sea\'s military navy. They patrol trade routes, enforce law, and garrison key islands. Their officers are academy-trained Dominion users. As your bounty grows, they send stronger fleets after you.',
    icon: '⚔',
    seenFlag: 'tip_lore_wardensea',
    requiresFlag: 'keldriss_explored',
    minDay: 5,
  },
  {
    id: 'lore_kolmari',
    panel: 'map',
    title: 'THE KOLMARI',
    body: 'The Kolmari Trade Confederation controls commerce through credit, debt, and exclusive contracts. They don\'t need soldiers when they own the supply lines. Their agents wear blue coats and carry ledgers instead of swords.',
    icon: '🏦',
    seenFlag: 'tip_lore_kolmari',
    minDay: 4,
  },
  {
    id: 'lore_races_oni',
    panel: 'management',
    title: 'THE ONI',
    body: 'Oni are highland-born, built heavy, with horns and esmer skin. They are rare in the Bastion Sea. Karyudon is seven feet tall, which is average for an Oni. Their culture values directness, ambition, and hitting things very hard.',
    icon: '👹',
    seenFlag: 'tip_lore_oni',
    minDay: 2,
  },
  {
    id: 'lore_korvaan',
    panel: 'management',
    title: 'KORVAAN',
    body: 'Korvaan is the process of refining your body through Dominion. Stages go from Callus to Ironset to Fleshweave to Nerveburn to Reforged. Each stage hardens the body further. It hurts. It works.',
    icon: '💀',
    seenFlag: 'tip_lore_korvaan',
    minDay: 8,
  },
  {
    id: 'lore_resonance',
    panel: 'management',
    title: 'RESONANCE WEAPONS',
    body: 'Resonance weapons vibrate at frequencies that amplify their cutting or blocking power. Each has a Tone: Cutting Tone slices through armor, Dampening Tone disrupts enemy Dominion. Craft-grade is standard. Master-grade is rare.',
    icon: '🔔',
    seenFlag: 'tip_lore_resonance',
    requiresFlag: 'tessek_recruited',
  },
  {
    id: 'lore_king_meter',
    panel: 'combat',
    title: 'KING EXPRESSION',
    body: 'King Dominion is raw willpower. In combat, it builds through aggression. At 100% it unleashes King\'s Pressure, a wave of will that paralyzes weaker opponents. It is not a technique. It is the weight of who you are.',
    icon: '👑',
    seenFlag: 'tip_lore_king',
    requiresFlag: 'tip_king_meter_seen',
    minDay: 10,
  },
  {
    id: 'lore_conquerors',
    panel: 'map',
    title: 'THE CONQUERORS',
    body: 'Conquerors are independent crew captains who carve territory by force. Five Seats hold the most power. They answer to nobody, sign blood contracts, and fight anyone who threatens their islands. You intend to surpass all of them.',
    icon: '🏴',
    seenFlag: 'tip_lore_conquerors',
    minDay: 6,
  },
  {
    id: 'lore_gorundai',
    panel: 'management',
    title: 'THE GORUNDAI',
    body: 'Gorundai are grey-green skinned, thick-framed, built for endurance. Many work mines, forges, and shipyards. Dragghen is Gorundai. They tend to be quiet, practical, and dangerously strong when they stop being patient.',
    icon: '🟢',
    seenFlag: 'tip_lore_gorundai',
    requiresFlag: 'dragghen_recruited',
    minDay: 3,
  },
  {
    id: 'lore_morventhi',
    panel: 'management',
    title: 'THE MORVENTHI',
    body: 'Morventhi have blue-black skin, silver-reflective eyes, and lifespans measured in centuries. Suulen is 87, which means she looks thirty. They see better in darkness than daylight and value silence the way Oni value volume.',
    icon: '🌙',
    seenFlag: 'tip_lore_morventhi',
    requiresFlag: 'suulen_recruited',
    minDay: 5,
  },
  {
    id: 'lore_rathai',
    panel: 'management',
    title: 'THE RATHAI',
    body: 'Rathai are small, fast, and wired for precision. Kovesse is 4 feet tall and carries three Grimoire devices. The race has an affinity for runestone technology that nobody fully understands, including the Rathai.',
    icon: '⚙',
    seenFlag: 'tip_lore_rathai',
    requiresFlag: 'kovesse_recruited',
    minDay: 4,
  },
  {
    id: 'lore_sovereigns',
    panel: 'management',
    title: 'SOVEREIGNS',
    body: 'Sovereigns are the Bastion Sea\'s universal currency. Islands trade in them, bounties are priced in them, and wars are funded by them. Your crew gets paid in them. Run out and they stop being your crew.',
    icon: '💰',
    seenFlag: 'tip_lore_sovereigns',
    minDay: 2,
  },
];

// Module-level dismissed set — survives component remounts (including StrictMode double-fire)
const globalDismissedIds = new Set<string>();

export const TutorialOverlay: React.FC = () => {
  const activePanel = useGameStore(s => s.activePanel);
  const flags = useGameStore(s => s.flags);
  const setFlag = useGameStore(s => s.setFlag);
  const dayCount = useGameStore(s => s.dayCount);
  const gameStarted = useGameStore(s => s.gameStarted);
  const travelState = useGameStore(s => s.travelState);
  const [currentTip, setCurrentTip] = useState<TutorialTip | null>(null);

  // After dismissing, block ALL new tips until the panel changes.
  // This is a ref (not state) to avoid triggering re-renders that cascade.
  const blockedUntilPanelChangeRef = useRef<boolean>(false);

  // Track the previous effectivePanel to detect real panel changes.
  const prevPanelRef = useRef<string | null>(null);

  // Determine effective panel (travel overlay is separate from activePanel)
  const effectivePanel = travelState ? 'travel' : activePanel;

  // Reset block when the panel actually changes
  if (prevPanelRef.current !== null && prevPanelRef.current !== effectivePanel) {
    blockedUntilPanelChangeRef.current = false;
  }
  prevPanelRef.current = effectivePanel;

  // Derive a stable key from only the tutorial-relevant flags instead of the entire flags object.
  // This prevents the effect from re-firing on every unrelated flag change in the game.
  const tipFlagsKey = useMemo(() => {
    const seenFlags = TIPS.map(t => t.seenFlag).filter(f => flags[f]);
    const reqFlags = TIPS.map(t => t.requiresFlag).filter((f): f is string => !!f && !!flags[f]);
    return [...seenFlags, ...reqFlags].sort().join(',');
  }, [flags]);

  useEffect(() => {
    if (!gameStarted) return;
    // CRITICAL: After dismissing a tip, block all tips until panel changes.
    // This prevents the "dismiss one → next one immediately appears" cascade.
    if (blockedUntilPanelChangeRef.current) return;

    // Find the first applicable tip for this panel
    const tip = TIPS.find((t) => {
      if (t.panel !== effectivePanel) return false;
      if (globalDismissedIds.has(t.id)) return false;
      if (flags[t.seenFlag]) return false;
      if (t.requiresFlag && !flags[t.requiresFlag]) return false;
      if (t.minDay && dayCount < t.minDay) return false;
      return true;
    });

    // Only set a NEW tip, never re-set the same one
    if (tip) {
      setCurrentTip(prev => (prev?.id === tip.id ? prev : tip));
    } else {
      setCurrentTip(null);
    }
    // NOTE: currentTip is intentionally NOT in the dependency array.
    // The effect should only re-run when external conditions change
    // (panel, tip-relevant flags, day), NOT when the tip itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectivePanel, tipFlagsKey, dayCount, gameStarted]);

  // Ref always holds the latest tip — immune to stale closures
  const currentTipRef = useRef<TutorialTip | null>(null);
  currentTipRef.current = currentTip;

  const handleDismiss = useCallback((e?: React.MouseEvent) => {
    // Stop the click from reaching anything behind the overlay (e.g. combat narrative)
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    // Use ref to avoid stale closure — currentTip state can be null by the time
    // React batches the click event, but the ref always has the latest value.
    const tip = currentTipRef.current;
    if (tip) {
      // Immediately mark as dismissed in module-level set (survives remounts)
      globalDismissedIds.add(tip.id);
      // Persist the flag for save/load
      setFlag(tip.seenFlag, true);
    }
    // Block ALL further tips until the player navigates to a different panel
    blockedUntilPanelChangeRef.current = true;
    setCurrentTip(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFlag]);

  // Belt-and-suspenders: don't render if already dismissed or flag already set
  const tipIsStillValid = currentTip
    && !flags[currentTip.seenFlag]
    && !globalDismissedIds.has(currentTip.id)
    && !blockedUntilPanelChangeRef.current;

  return (
    <AnimatePresence mode="wait">
      {tipIsStillValid && (
        <motion.div
          key={currentTip.id}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[55] max-w-lg w-[90%]"
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="bg-ocean-800/95 backdrop-blur-sm border border-amber-500/30 rounded-lg shadow-xl shadow-amber-900/20 p-4 relative">
            {/* Glow accent */}
            <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0 mt-0.5">{currentTip.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-amber-400 font-bold text-sm tracking-wider">
                    {currentTip.title}
                  </h3>
                  <span className="px-1.5 py-0.5 bg-amber-900/30 border border-amber-500/20 text-amber-400/70 text-xs font-bold rounded">
                    TIP
                  </span>
                </div>
                <p className="text-ocean-200 text-sm leading-relaxed">
                  {currentTip.body}
                </p>
              </div>
              <button
                onClick={(e) => handleDismiss(e)}
                className="flex-shrink-0 text-ocean-400 hover:text-ocean-200 transition-colors text-lg leading-none mt-0.5 px-1"
                title="Got it"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={(e) => handleDismiss(e)}
                className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-amber-700/30 hover:bg-amber-600/40 border border-amber-500/30 text-amber-300 rounded-sm transition-all"
              >
                GOT IT
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
