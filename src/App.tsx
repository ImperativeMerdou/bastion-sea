import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { TitleScreen } from './components/UI/TitleScreen';
import { TopBar } from './components/UI/TopBar';
import { NotificationToast } from './components/UI/NotificationToast';
import { PauseMenu } from './components/UI/PauseMenu';
import VictoryScreen from './components/UI/VictoryScreen';
import GameOverScreen from './components/UI/GameOverScreen';
import { TutorialOverlay } from './components/UI/TutorialOverlay';
import { KeyboardHelp } from './components/UI/KeyboardHelp';
import { DailyReportModal } from './components/UI/DailyReportModal';
import { DayPlannerModal } from './components/UI/DayPlannerModal';
import { RandomEventModal } from './components/UI/RandomEventModal';
import { StoryPanel } from './components/Story/StoryPanel';
import { MapPanel } from './components/Map/MapPanel';
import { ManagementPanel } from './components/Management/ManagementPanel';
import { CombatPanel } from './components/Combat/CombatPanel';
import { TravelPanel } from './components/Travel/TravelPanel';
import { useWorldReactions } from './hooks/useWorldReactions';
import { useAudioManager } from './hooks/useAudio';
import { Howler } from 'howler';
import { ambienceManager } from './systems/ambience';
import { musicManager } from './systems/music';

const panelVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' as const } },
};

const App: React.FC = () => {
  const { gameStarted, activePanel, travelState } = useGameStore();
  const [pauseMenuOpen, setPauseMenuOpen] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  const setActivePanel = useGameStore((s) => s.setActivePanel);

  // Refs to avoid re-creating the keyboard handler on every panel/state change
  const activePanelRef = useRef(activePanel);
  const gameStartedRef = useRef(gameStarted);
  useEffect(() => { activePanelRef.current = activePanel; }, [activePanel]);
  useEffect(() => { gameStartedRef.current = gameStarted; }, [gameStarted]);

  // Keyboard shortcuts: Escape = pause, 1/2/3 = panel switching
  // Uses refs so the listener is attached once and never re-created
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStartedRef.current) return;
      // Escape toggles pause
      if (e.code === 'Escape' && activePanelRef.current !== 'combat') {
        e.preventDefault();
        setPauseMenuOpen((prev) => !prev);
        return;
      }
      // ? toggles keyboard help
      if (e.key === '?') {
        e.preventDefault();
        setShowKeyboardHelp((prev) => !prev);
        return;
      }
      // Don't switch panels during combat, typing, or when pause is open
      if (activePanelRef.current === 'combat') return;
      // Panel shortcuts: 1=Story, 2=Map, 3=Crew
      if (e.key === '1') { setActivePanel('story'); return; }
      if (e.key === '2') { setActivePanel('map'); return; }
      if (e.key === '3') { setActivePanel('management'); return; }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // One-time audio unlock on first user gesture (browser autoplay policy)
  useEffect(() => {
    let unlocked = false;
    const unlockAudio = () => {
      if (unlocked) return;
      unlocked = true;
      // Resume Howler's internal AudioContext (for SFX)
      try {
        if (Howler.ctx && Howler.ctx.state === 'suspended') {
          Howler.ctx.resume();
        }
      } catch { /* Howler ctx not ready yet */ }
      // Resume ambience AudioContext and re-trigger current ambience
      ambienceManager.forceResume();
      ambienceManager.retrigger();
      // Re-trigger music: it was called on mount but Howler was suspended
      musicManager.retrigger();
      // Remove listeners after first interaction
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  // Process world reactions when game state changes
  useWorldReactions();

  // Manage background audio based on game state
  useAudioManager();

  if (!gameStarted) {
    return <TitleScreen />;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-ocean-900 overflow-hidden">
      <TopBar onPauseOpen={() => setPauseMenuOpen(true)} />
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activePanel === 'story' && (
            <motion.div key="story" className="h-full" variants={panelVariants} initial="initial" animate="animate" exit="exit">
              <StoryPanel />
            </motion.div>
          )}
          {activePanel === 'map' && (
            <motion.div key="map" className="h-full" variants={panelVariants} initial="initial" animate="animate" exit="exit">
              <MapPanel />
            </motion.div>
          )}
          {activePanel === 'management' && (
            <motion.div key="management" className="h-full" variants={panelVariants} initial="initial" animate="animate" exit="exit">
              <ManagementPanel />
            </motion.div>
          )}
          {activePanel === 'combat' && (
            <motion.div key="combat" className="h-full" variants={panelVariants} initial="initial" animate="animate" exit="exit">
              <CombatPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <NotificationToast />
      <DailyReportModal />
      <DayPlannerModal />
      <RandomEventModal />
      {travelState && <TravelPanel />}
      <TutorialOverlay />
      <PauseMenu isOpen={pauseMenuOpen} onClose={() => setPauseMenuOpen(false)} />
      <KeyboardHelp isOpen={showKeyboardHelp} onClose={() => setShowKeyboardHelp(false)} />
      <VictoryScreen />
      <GameOverScreen />
    </div>
  );
};

export default App;
