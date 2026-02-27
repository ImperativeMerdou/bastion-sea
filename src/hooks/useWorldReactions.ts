import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

/**
 * Hook that watches game state and triggers world reaction processing
 * whenever relevant conditions change (day count, flags, phase).
 *
 * This ensures reactions fire not just on day advance, but also when
 * flags change (e.g., tavven_conquered becomes true after conquest).
 */
export function useWorldReactions() {
  const dayCount = useGameStore((s) => s.dayCount);
  const gamePhase = useGameStore((s) => s.gamePhase);
  const flags = useGameStore((s) => s.flags);
  const processWorldReactions = useGameStore((s) => s.processWorldReactions);

  // Track whether we've processed for the current state to avoid double-firing
  const lastProcessedRef = useRef<string>('');

  useEffect(() => {
    // Fingerprint the full flags state so any flag change triggers processing.
    // processWorldReactions() already deduplicates via firedReactionIds, so
    // re-processing on every flag change is safe and ensures no reactions are missed.
    const stateKey = `${dayCount}_${gamePhase}_${JSON.stringify(flags)}`;

    if (stateKey !== lastProcessedRef.current) {
      lastProcessedRef.current = stateKey;
      processWorldReactions();
    }
  }, [dayCount, gamePhase, flags, processWorldReactions]);
}
