import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { getImagePath } from '../../utils/images';
import { formatBounty } from '../../utils/formatting';

const DEATH_BACKGROUNDS: Record<string, string> = {
  starvation: 'game_over_starvation.webp',
  crew_mutiny: 'game_over_mutiny.webp',
  total_defeat: 'game_over_defeat.webp',
  territory_lost: 'game_over_territory.webp',
};

const DEATH_CAUSES: Record<string, { title: string; flavor: string }> = {
  starvation: {
    title: 'THE SEA TAKES ITS DUE',
    flavor:
      'Your supplies ran dry. The crew held on as long as they could, rationing, fishing, drinking rainwater strained through canvas. But the Bastion Sea is not kind to those who cannot feed their own. One by one, they stopped rowing. The last thing you see is the horizon, flat and empty and indifferent.',
  },
  crew_mutiny: {
    title: 'THE CREW REMEMBERS',
    flavor:
      'They followed you out of a prison cell. They followed you across hostile waters, through storms and sieges and decisions that cost them friends. But loyalty has a breaking point, and you found it. The mutiny is quiet. No swords drawn, no speeches. They simply stop following orders. Delvessa is the one who tells you. "It\'s over, Captain. They\'re done." The ship turns back toward port. You are no longer its captain.',
  },
  total_defeat: {
    title: 'THE TIDE TURNS',
    flavor:
      'The Wardensea found you. Not a patrol. The fleet. Forty ships on the horizon, each one carrying enough iron to sink your ambitions to the ocean floor. You fought. Of course you fought. You\'re Karyudon. Fighting is the only language you\'ve ever been fluent in. But some conversations end the same way no matter how loud you shout. The last thing you hear is Admiral Vasshen\'s voice over the Grimoire: "The Oni has been neutralized. Resume standard patrol."',
  },
  territory_lost: {
    title: 'EMPIRE OF SAND',
    flavor:
      'Every island you took, you lost. Rebellion, reconquest, or simple abandonment. The territories slipped through your fingers like water. The people you claimed to rule chose someone else. The ports you garrisoned fell silent. The flags you raised came down. In the end, you controlled nothing but the deck beneath your feet, and even that felt borrowed.',
  },
};

export default function GameOverScreen() {
  const [dismissed, setDismissed] = useState(false);
  const flags = useGameStore((s) => s.flags);
  const dayCount = useGameStore((s) => s.dayCount);
  const mc = useGameStore((s) => s.mc);
  const crew = useGameStore((s) => s.crew);
  const islands = useGameStore((s) => s.islands);
  const setFlag = useGameStore((s) => s.setFlag);
  const loadGame = useGameStore((s) => s.loadGame);
  const hasSaveData = useGameStore((s) => s.hasSaveData);

  const gameOverCause = flags.game_over_cause as string;

  if (!flags.game_over || dismissed) return null;

  const cause = DEATH_CAUSES[gameOverCause] || DEATH_CAUSES.total_defeat;
  const bgFile = DEATH_BACKGROUNDS[gameOverCause] || DEATH_BACKGROUNDS.total_defeat;
  const bgImage = getImagePath(bgFile);
  const territoriesHeld = islands.filter((i) => i.status === 'controlled').length;
  const crewAlive = crew.filter((m) => m.recruited && m.alive).length;

  const stats = [
    { icon: '☀', label: 'Days Survived', value: dayCount },
    { icon: '⚔', label: 'Territories Held', value: territoriesHeld },
    { icon: '⚓', label: 'Crew Remaining', value: crewAlive },
    { icon: '💀', label: 'Bounty', value: mc.bounty > 0 ? `${formatBounty(mc.bounty)}` : '???' },
  ];

  const handleReturnToTitle = () => {
    window.location.reload();
  };

  const handleLoadSave = () => {
    // Find the most recent save by timestamp
    let bestSlot = -1;
    let bestTs = -1;
    for (const slot of [0, 1, 2]) {
      if (!hasSaveData(slot)) continue;
      try {
        const key = slot === 0 ? 'godtide_autosave' : `godtide_save_${slot}`;
        const raw = localStorage.getItem(key);
        if (raw) {
          const data = JSON.parse(raw);
          const ts = data.timestamp || 0;
          if (ts > bestTs) { bestTs = ts; bestSlot = slot; }
        }
      } catch { /* skip corrupt saves */ }
    }
    if (bestSlot >= 0) { loadGame(bestSlot); setDismissed(true); }
  };

  const hasAnySave = hasSaveData(0) || hasSaveData(1) || hasSaveData(2);

  // Allow dismissing to keep playing (roguelike mercy)
  const handleDismiss = () => {
    setFlag('game_over', false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Background image (falls back to gradient if not generated yet) */}
        {bgImage && (
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 2.0 }}
          />
        )}
        {/* Blood-red vignette overlay */}
        <div className="absolute inset-0 bg-ocean-950/85" />
        <div className="absolute inset-0 bg-gradient-radial from-crimson-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(127,29,29,0.15) 70%, rgba(0,0,0,0.5) 100%)',
        }} />

        {/* Animated red particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-crimson-500/40 rounded-full"
              initial={{
                x: `${20 + Math.random() * 60}%`,
                y: '110%',
                opacity: 0,
              }}
              animate={{
                y: '-10%',
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          className="relative max-w-2xl w-full mx-4 rounded-lg bg-ocean-950/80 border border-crimson-800/40 shadow-[0_0_60px_rgba(220,38,38,0.1)] p-8 sm:p-10"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Death icon */}
          <motion.div
            className="text-center mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
          >
            <span className="text-5xl">💀</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-center font-display text-2xl sm:text-3xl font-bold tracking-[0.15em] text-crimson-400 mb-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {cause.title}
          </motion.h1>

          {/* Decorative rule */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-crimson-500/50" />
            <span className="text-crimson-500/60 text-xs">✦</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-crimson-500/50" />
          </motion.div>

          {/* Flavor text */}
          <motion.p
            className="text-ocean-300 text-sm sm:text-base leading-relaxed text-center mb-8 italic font-narration"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {cause.flavor}
          </motion.p>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 py-3 px-2 rounded bg-ocean-900/60 border border-crimson-900/30"
              >
                <span className="text-lg">{stat.icon}</span>
                <span className="text-ocean-500 text-xs font-display tracking-[0.15em] uppercase">
                  {stat.label}
                </span>
                <span className="text-crimson-400 text-lg font-bold font-display">
                  {stat.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            {hasAnySave && (
              <button
                onClick={handleLoadSave}
                className="w-full sm:w-auto px-8 py-3 text-sm font-display font-bold tracking-[0.15em] uppercase border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400 transition-colors rounded"
              >
                LOAD LAST SAVE
              </button>
            )}
            <button
              onClick={handleDismiss}
              className="w-full sm:w-auto px-8 py-3 text-sm font-display font-bold tracking-[0.15em] uppercase border border-ocean-500/40 text-ocean-400 hover:bg-ocean-500/10 hover:border-ocean-400 transition-colors rounded"
            >
              KEEP GOING
            </button>
            <button
              onClick={handleReturnToTitle}
              className="w-full sm:w-auto px-8 py-3 text-sm font-display font-bold tracking-[0.15em] uppercase border border-ocean-600 text-ocean-400 hover:bg-ocean-700/40 hover:border-ocean-500 hover:text-ocean-300 transition-colors rounded"
            >
              RETURN TO TITLE
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
