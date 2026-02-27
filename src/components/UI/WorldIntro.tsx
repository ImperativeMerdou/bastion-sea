import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '../../systems/audio';

// ==========================================
// WORLD INTRO - 4 cinematic cards before prologue
// Sets the mental framework so lore terms CLICK
// ==========================================

interface WorldIntroProps {
  onComplete: () => void;
}

interface IntroCard {
  title: string;
  lines: string[];
  accent: string;     // tailwind color class for title
  glowColor: string;  // rgba for background glow
}

const CARDS: IntroCard[] = [
  {
    title: 'THE BASTION SEA',
    lines: [
      'An ocean of islands. No single nation rules it.',
      'Power belongs to whoever can take it and hold it.',
      'The Bastion Sea runs on three currencies: Sovereigns, violence, and reputation.',
    ],
    accent: 'text-ocean-200',
    glowColor: 'rgba(14, 165, 233, 0.08)',
  },
  {
    title: 'DOMINION',
    lines: [
      'Every living thing has Dominion: the power inside your body.',
      'Three expressions. Iron is strength, armor, raw force. Sight reads the world before it moves. King is willpower so heavy it crushes others flat.',
      'Dominion has tiers: Flicker, Tempered, Forged, Prime, Conqueror. Most people never pass Tempered. You are Forged.',
    ],
    accent: 'text-amber-400',
    glowColor: 'rgba(251, 191, 36, 0.08)',
  },
  {
    title: 'THE POWERS THAT BE',
    lines: [
      'The Wardensea is the navy. They call it law. They mean control.',
      'The Kolmari Confederation is the money. They don\'t need soldiers when they own the debt.',
      'The Conquerors answer to nobody. Independent crews who take what they want. You intend to be the last one standing.',
    ],
    accent: 'text-crimson-400',
    glowColor: 'rgba(220, 38, 38, 0.06)',
  },
  {
    title: 'YOU',
    lines: [
      'You are Karyudon. Oni. Seven feet tall. Horns, amber eyes, and an iron-spiked war club called Danzai.',
      'You have Forged-tier Iron Dominion. You have a stolen God Fruit worth more than most islands. You have nothing else.',
      'The world does not know your name yet.',
    ],
    accent: 'text-amber-300',
    glowColor: 'rgba(251, 191, 36, 0.1)',
  },
];

export const WorldIntro: React.FC<WorldIntroProps> = ({ onComplete }) => {
  const [cardIndex, setCardIndex] = useState(0);

  const advance = useCallback(() => {
    audioManager.playSfx('text_advance');
    setCardIndex((i) => {
      if (i < CARDS.length - 1) {
        return i + 1;
      }
      // Last card — trigger completion outside setState
      setTimeout(() => onComplete(), 0);
      return i;
    });
  }, [onComplete]);

  const skip = useCallback(() => {
    audioManager.playSfx('click');
    onComplete();
  }, [onComplete]);

  // Keyboard: Enter/Space to advance, Escape to skip
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') { advance(); e.preventDefault(); }
      if (e.key === 'Escape') { skip(); e.preventDefault(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [advance, skip]);

  const card = CARDS[cardIndex] ?? CARDS[CARDS.length - 1];

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-ocean-950" role="dialog" aria-label="World introduction">
      {/* Background glow */}
      <motion.div
        key={`glow-${cardIndex}`}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: card.glowColor }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Skip button */}
      <button
        onClick={skip}
        aria-label="Skip introduction"
        className="absolute top-6 right-8 z-50 text-ocean-500/50 hover:text-ocean-300 text-xs tracking-[0.3em] uppercase transition-colors"
      >
        SKIP <span className="text-ocean-600/40 ml-1">[Esc]</span>
      </button>

      {/* Card counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2" role="progressbar" aria-valuenow={cardIndex + 1} aria-valuemin={1} aria-valuemax={CARDS.length} aria-label={`Card ${cardIndex + 1} of ${CARDS.length}`}>
        {CARDS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === cardIndex ? 'bg-amber-400 scale-125' : i < cardIndex ? 'bg-ocean-500' : 'bg-ocean-700'
            }`}
          />
        ))}
      </div>

      {/* Card content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cardIndex}
          className="relative z-10 max-w-xl px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Title */}
          <motion.h2
            className={`font-display font-bold text-3xl tracking-[0.25em] mb-8 ${card.accent}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {card.title}
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            className="w-16 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-ocean-400/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />

          {/* Lines */}
          <div className="space-y-5">
            {card.lines.map((line, i) => (
              <motion.p
                key={i}
                className="text-ocean-200/90 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.25, duration: 0.5 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Continue button */}
          <motion.button
            onClick={advance}
            aria-label={cardIndex < CARDS.length - 1 ? 'Continue to next card' : 'Begin the game'}
            className="mt-10 px-8 py-3 text-sm font-bold tracking-[0.2em] uppercase border border-ocean-500/40 text-ocean-300 hover:border-amber-400/60 hover:text-amber-300 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {cardIndex < CARDS.length - 1 ? 'CONTINUE' : 'BEGIN'} <span className="text-ocean-500/40 text-xs ml-1">[Enter]</span>
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
