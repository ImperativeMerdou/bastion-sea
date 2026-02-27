import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import { getSceneBackground, speakerToCharacter, getPortrait, getExpressionPortrait, getUiAsset } from '../../utils/images';
import { audioManager } from '../../systems/audio';
import { stingerManager } from '../../systems/stingers';
import { detectSpeakerFromText, characterNames, characterAccents } from './DialogueCards';


/** Detect if a paragraph is primarily dialogue (starts with a quote mark) */
function isDialogueLine(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.startsWith('\u201c') || trimmed.startsWith('"') || trimmed.startsWith('\u2018');
}

/**
 * Try to detect which character is speaking a specific dialogue line.
 * Looks at the line itself and surrounding context for "Name says" patterns.
 */
/** Shared verb lists for speaker detection patterns */
const SPEECH_VERBS = 'says?|said|asks?|asked|replies?|replied|murmurs?|whispers?|growls?|grunts?|warns?|observes?|notes?|adds?|suggests?|speaks?|announces?|declares?|states?|stammers?|rumbles?|mutters?|sneers?|snarls?|barks?|orders?|commands?|tells?|calls?|offers?';
const ACTION_VERBS = 'turns|looks|leans|steps|pauses|nods|shrugs|sits|stands|stares|watches|waits|sighs|crosses|raises|drops|holds|opens|closes|reaches|points|gestures|frowns|scowls|grins|smiles|laughs|chuckles';
const OBJECT_VERBS = 'find|see|spot|notice|watch|approach|reach|join|face|meet|hear';

/**
 * Check a single text line for character attribution patterns.
 * Returns the character ID if a known character is detected as the speaker/subject.
 *
 * When `speechOnly` is true, only matches speech verbs and post-quote attribution.
 * This is used for preceding-narration-line checks to prevent false positives where
 * a character doing a physical action (e.g., "Dragghen laughs") mislabels the NEXT
 * dialogue line as that character speaking.
 */
function detectSpeakerInLine(text: string, speechOnly: boolean = false, suppressKaryudon: boolean = false): string | null {
  for (const [name, charId] of Object.entries(speakerToCharacter)) {
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (speechOnly) {
      // Strict mode for preceding-narration-line checks:
      // Only match when Name is at a SENTENCE boundary (start of text or after sentence-ending
      // punctuation) followed by a speech verb. This prevents false positives like
      // "something Kovesse said" where Kovesse is in a subordinate clause, not the subject.
      // Guard: "says nothing" / "says no more" = character is NOT speaking
      if (new RegExp(`(?:^|[.!?]\\s+)${esc}\\s+(?:${SPEECH_VERBS})\\b(?!\\s+(?:nothing|no\\s+more))`, 'i').test(text)) return charId;
      // Post-quote attribution (also strict: requires quote mark immediately before Name)
      if (new RegExp(`[\u201d"']\\s*${esc}\\s+(?:says?|said|asks?|replied)`, 'i').test(text)) return charId;
    } else {
      // Full mode for current-line checks: match Name + verb anywhere in text
      // "Name says/asks/growls..." (character as subject with speech verb)
      // Guard: "says nothing" / "says no more" = character is NOT speaking, don't attribute
      if (new RegExp(`${esc}\\s+(?:${SPEECH_VERBS})\\b(?!\\s+(?:nothing|no\\s+more))`, 'i').test(text)) return charId;
      // "Name turns/looks/sits..." (character as subject with action verb)
      if (new RegExp(`${esc}\\s+(?:${ACTION_VERBS})`, 'i').test(text)) return charId;
      // "find/see/spot Name" (character as object)
      if (new RegExp(`(?:${OBJECT_VERBS})\\s+${esc}\\b`, 'i').test(text)) return charId;
      // '"dialogue" Name verb' (post-quote attribution)
      if (new RegExp(`[\u201d"']\\s*${esc}\\s+(?:says?|said|asks?|replied)`, 'i').test(text)) return charId;
    }
  }
  // "you say/growl/ask" → Karyudon (POV character)
  // SKIP when suppressKaryudon is true (beat has explicit speaker that shouldn't be overridden
  // by a weaker heuristic like "you say" appearing in another character's dialogue)
  if (!suppressKaryudon) {
    // Strip quoted dialogue before matching: "you say" inside quotes means another
    // character is talking about/to Karyudon, not Karyudon speaking
    const withoutQuotes = text
      .replace(/\u201c[^\u201d]*\u201d/g, '')
      .replace(/"[^"]*"/g, '');
    // Guard: "before you ask" / "if you say" = conditional/anticipated, not actual speech
    if (/(?<!(?:before|if)\s)\byou\s+(?:say|growl|grunt|tell|ask|reply|mutter|announce)/i.test(withoutQuotes)) return 'karyudon';
  }
  return null;
}

/**
 * Detect who is speaking a dialogue line by checking the line itself and the preceding
 * narration line for character attribution.
 *
 * When `hasBeatSpeaker` is true, the preceding-narration-line check uses strict mode
 * (speech verbs only). This prevents action verbs like "Dragghen laughs" from overriding
 * an explicit beat speaker. When no beat speaker exists, the full verb set is used for
 * the prev-line check to maximize correct attribution.
 */
function detectLineSpeaker(line: string, allParagraphs: string[], lineIndex: number, hasBeatSpeaker: boolean = false): string | null {
  // Check the line itself for speaker patterns.
  // When beat has explicit speaker, suppress the weak "you say" → karyudon heuristic
  // to prevent false matches like Vorreth saying "the way you say things" being labeled
  // as KARYUDON. Named character patterns (Delvessa says, etc.) still override because
  // they're unambiguous.
  const result = detectSpeakerInLine(line, false, hasBeatSpeaker);
  if (result) return result;

  // Check the narration line immediately before this dialogue for character attribution.
  // When the beat has an explicit speaker, use speechOnly=true to prevent action verbs
  // from overriding the beat speaker (fixes BUG-014: "Dragghen laughs" mislabeling
  // Suulen's dialogue as DRAGGHEN). Without a beat speaker, use full detection.
  // Also pass hasBeatSpeaker as suppressKaryudon for the same "you say" protection.
  if (lineIndex > 0) {
    const prevLine = allParagraphs[lineIndex - 1];
    if (prevLine && !isDialogueLine(prevLine)) {
      const prevResult = detectSpeakerInLine(prevLine, hasBeatSpeaker, hasBeatSpeaker);
      if (prevResult) return prevResult;
    }
  }

  return null;
}

/**
 * Check if a narration line's second-person language ("you/your") implies
 * that the NEXT dialogue line is Karyudon (the POV character) responding.
 * e.g. "She glances at your horns..." → next quote is Karyudon's reply.
 */
function narratorImpliesProtagonist(narrationLine: string): boolean {
  // Only trigger when "you" is the SUBJECT of the sentence (sentence-initial or after period/comma).
  // "He stares at you" should NOT imply protagonist is speaking.
  // "You turn to face them" SHOULD imply protagonist is about to speak.
  return /(?:^|[.!?]\s+)You\b/.test(narrationLine) || /^Your\b/.test(narrationLine);
}

/**
 * Check if a narration line contains an embedded quote with pronoun attribution.
 * Returns 'other' if "he/she says" pattern found OR if the line has a he/she subject
 * AND contains a quote (indicating an NPC spoke inline).
 * Returns 'karyudon' if "you say" pattern found, null otherwise.
 * This establishes who JUST spoke, so the next dialogue line can alternate.
 */
function detectInlineSpeaker(narrationLine: string): 'karyudon' | 'other' | null {
  // Strip quoted dialogue before matching "you say" to avoid false positives
  // where another character's dialogue contains "you say" (e.g. Vorreth saying
  // "The way you say things you know from experience")
  const withoutQuotes = narrationLine
    .replace(/\u201c[^\u201d]*\u201d/g, '')
    .replace(/"[^"]*"/g, '');
  // "you say/ask/growl" etc. → Karyudon spoke inline
  // Guard: "before you ask" / "if you say" = conditional/anticipated, not actual speech
  if (/(?<!(?:before|if)\s)\byou\s+(?:say|ask|growl|grunt|reply|tell|mutter)\b/i.test(withoutQuotes)) {
    return 'karyudon';
  }
  // "he/she says/asks" etc. with a quote nearby → an NPC spoke inline
  if (/\b(?:he|she)\s+(?:says?|asks?|replies?|growls?|murmurs?|whispers?|grunts?|warns?|adds?|notes?)/i.test(narrationLine) &&
      /[""\u201c\u201d]/.test(narrationLine)) {
    return 'other';
  }
  // Broader: narration line starts with "He/She" (NPC as subject) AND contains a quote mark.
  // Even without explicit speech verbs, the NPC is the actor and the quote is theirs.
  // e.g. 'She glances at your horns... "Wardensea guest?"'
  if (/^(?:He|She)\b/.test(narrationLine) && /[""\u201c\u201d]/.test(narrationLine)) {
    return 'other';
  }
  // Broadest: narration line with a third-person NPC subject (article + noun) and an embedded quote.
  // e.g. 'A Varrek dockhand holds up a hand. "Cargo or crew?"'
  // e.g. 'The vendor watches you. "Storm tea," she says.'
  // The NPC spoke inline. This helps set up turn-taking even for unnamed NPCs.
  if (/^(?:A|An|The)\s+/i.test(narrationLine) && /[""\u201c\u201d]/.test(narrationLine)) {
    return 'other';
  }
  return null;
}

export const StoryPanel: React.FC = () => {
  const currentScene = useGameStore(s => s.currentScene);
  const advanceBeat = useGameStore(s => s.advanceBeat);
  const makeChoice = useGameStore(s => s.makeChoice);
  const isTyping = useGameStore(s => s.isTyping);
  const setTyping = useGameStore(s => s.setTyping);
  const typingSpeed = useGameStore(s => s.typingSpeed);

  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [allLinesComplete, setAllLinesComplete] = useState(false);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [prevBgImage, setPrevBgImage] = useState<string | null>(null);
  const [bgTransition, setBgTransition] = useState(false);
  const [screenEffect, setScreenEffect] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const dialogueScrollRef = useRef<HTMLDivElement>(null);
  const prevSpeakerRef = useRef<string | null>(null);

  const beat = currentScene?.beats[currentScene.currentBeat];

  // Get the active speaker's character ID.
  // Explicit beat.speaker takes priority; text-based detection is a fallback.
  // When beat.speaker is explicitly 'narrator', auto-detection is suppressed
  // to prevent false speaker labels on multi-speaker narration beats.
  const activeSpeaker = useMemo(() => {
    if (beat?.speaker) {
      const id = speakerToCharacter[beat.speaker] || beat.speaker;
      if (id === 'narrator') return null; // Explicit narrator: suppress auto-detection
      return id;
    }
    // No explicit speaker: try auto-detection.
    // Pass null as beatSpeaker so the Karyudon "you say" heuristic is allowed.
    if (beat?.paragraphs && beat.paragraphs.length > 0) return detectSpeakerFromText(beat.paragraphs, null);
    return null;
  }, [beat?.speaker, beat?.paragraphs]);

  // The featured character for this beat — ONLY show when there's an identified speaker.
  // Pure narration beats (no speaker, no detected dialogue) should NOT show a portrait card.
  const featuredCharacter = activeSpeaker;
  // Use expression portrait if the beat specifies one for the speaker
  const featuredExpression = featuredCharacter
    ? (beat?.characterExpressions?.[featuredCharacter] || (featuredCharacter === activeSpeaker ? beat?.expression : undefined))
    : undefined;
  const featuredPortrait = featuredCharacter
    ? (featuredExpression ? getExpressionPortrait(featuredCharacter, featuredExpression) : getPortrait(featuredCharacter))
    : null;
  const featuredName = featuredCharacter
    ? (beat?.speakerName || characterNames[featuredCharacter] || featuredCharacter.replace(/_/g, ' ').toUpperCase())
    : null;
  const featuredAccent = featuredCharacter
    ? (characterAccents[featuredCharacter] || 'rgba(251, 191, 36, 0.7)')
    : 'rgba(100, 140, 200, 0.5)';
  // Track previous speaker for downstream components
  useEffect(() => {
    if (featuredCharacter && featuredCharacter !== prevSpeakerRef.current) {
      prevSpeakerRef.current = featuredCharacter;
    }
  }, [featuredCharacter]);

  // Background crossfade
  useEffect(() => {
    if (beat) {
      const bg = getSceneBackground(beat.id);
      if (bg && bg !== bgImage) {
        setPrevBgImage(bgImage);
        setBgImage(bg);
        setBgTransition(true);
        const timer = setTimeout(() => {
          setPrevBgImage(null);
          setBgTransition(false);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [beat?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset state when beat changes
  useEffect(() => {
    if (beat) {
      setShowChoices(false);
      setShowHistory(false);

      // Instant mode: show everything immediately
      if (typingSpeed === 0) {
        const paras = beat.paragraphs || [];
        setDisplayedLines(paras);
        setCurrentLineIndex(paras.length);
        setCurrentCharIndex(0);
        setAllLinesComplete(true);
        setTyping(false);
        if (beat.choices && beat.choices.length > 0) {
          setTimeout(() => setShowChoices(true), 100);
        }
      } else {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setAllLinesComplete(false);
        setTyping(true);
      }

      if (beat.effect) {
        // 'explosion' is a combo effect: red flash + heavy shake
        if (beat.effect === 'explosion') {
          setScreenEffect('heavy_shake');
          setTimeout(() => setScreenEffect(null), 700);
        } else {
          setScreenEffect(beat.effect);
          const duration =
            beat.effect === 'shake' ? 500 :
            beat.effect === 'heavy_shake' ? 700 :
            beat.effect === 'flash' ? 400 :
            beat.effect === 'flash_red' ? 500 :
            beat.effect === 'flash_crimson' ? 500 :
            600;
          setTimeout(() => setScreenEffect(null), duration);
        }
      }

      // Play SFX if tagged on this beat
      if (beat.sfx) {
        audioManager.playSfx(beat.sfx as any);
      }

      // Play stinger if tagged on this beat
      if (beat.stinger) {
        stingerManager.play(beat.stinger);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat?.id, setTyping, typingSpeed]);

  // Typewriter effect
  useEffect(() => {
    if (!beat || !isTyping || allLinesComplete || typingSpeed === 0) return;

    const paragraphs = beat.paragraphs || [];
    if (paragraphs.length === 0 || currentLineIndex >= paragraphs.length) {
      setAllLinesComplete(true);
      setTyping(false);
      if (beat.choices && beat.choices.length > 0) {
        setTimeout(() => setShowChoices(true), 300);
      }
      return;
    }

    const currentLine = paragraphs[currentLineIndex];
    if (!currentLine || currentCharIndex >= currentLine.length) {
      if (currentLine) {
        setDisplayedLines((prev) => [...prev, currentLine]);
      }
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentCharIndex((prev) => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timer);
  // Use beat?.id instead of beat to avoid stale closure when beat object changes mid-type
  }, [beat?.id, isTyping, currentLineIndex, currentCharIndex, allLinesComplete, setTyping, typingSpeed]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll dialogue to bottom when new lines appear
  useEffect(() => {
    if (dialogueScrollRef.current) {
      dialogueScrollRef.current.scrollTop = dialogueScrollRef.current.scrollHeight;
    }
  }, [displayedLines, currentCharIndex]);

  // Scroll history to bottom when opened
  useEffect(() => {
    if (showHistory && historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [showHistory]);

  // Click handler
  const handleClick = useCallback(() => {
    if (!beat) return;

    if (isTyping && !allLinesComplete) {
      // Partial skip: complete the current paragraph, not all text
      const paras = beat.paragraphs || [];
      const currentLine = paras[currentLineIndex];
      if (currentLine) {
        const nextIndex = currentLineIndex + 1;
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex(nextIndex);
        setCurrentCharIndex(0);
        // If that was the last paragraph, mark complete
        if (nextIndex >= paras.length) {
          setAllLinesComplete(true);
          setTyping(false);
          if (beat.choices && beat.choices.length > 0) {
            setTimeout(() => setShowChoices(true), 100);
          }
        }
      }
    } else if (allLinesComplete && !beat.choices) {
      audioManager.playSfx('text_advance');
      advanceBeat();
    }
  }, [beat, isTyping, allLinesComplete, currentLineIndex, advanceBeat, setTyping]);

  const handleChoice = useCallback((choiceId: string) => {
    audioManager.playSfx('choice_select');
    setShowChoices(false);
    makeChoice(choiceId);
  }, [makeChoice]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keys when a modal is open
      const dialogOpen = document.querySelector('[role="dialog"]');
      if (dialogOpen) return;

      if (!beat) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleClick();
        return;
      }

      if (showChoices && beat.choices) {
        const availableChoices = beat.choices.filter(c => c.available);
        let choiceIndex = -1;

        if (e.code >= 'Digit1' && e.code <= 'Digit9') {
          choiceIndex = parseInt(e.code.replace('Digit', '')) - 1;
        }
        if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
          choiceIndex = e.code.charCodeAt(3) - 65;
        }

        if (choiceIndex >= 0 && choiceIndex < availableChoices.length) {
          handleChoice(availableChoices[choiceIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [beat, handleClick, handleChoice, showChoices]);

  // === EMPTY STATE: auto-advance if scene exists but beat is missing ===
  useEffect(() => {
    if (currentScene && !beat) {
      // Guard: empty scenes (0 beats) are handled by scene chain logic in storyActions.
      // Don't auto-advance here or it creates a tight render loop.
      if (currentScene.beats.length === 0) {
        return;
      }
      const store = useGameStore.getState();
      const timer = setTimeout(() => store.advanceBeat(), 0);
      return () => clearTimeout(timer);
    }
  }, [currentScene, beat]);

  // Detect emotional intensity from beat content for ambient effects
  const emotionalTone = useMemo(() => {
    if (!beat || !beat.paragraphs) return null;
    const text = beat.paragraphs.join(' ').toLowerCase();
    if (text.includes('blood') || text.includes('scream') || text.includes('kill') || text.includes('die') || text.includes('death')) return 'intense';
    if (text.includes('laugh') || text.includes('smile') || text.includes('grin') || text.includes('cheer')) return 'warm';
    if (text.includes('storm') || text.includes('thunder') || text.includes('lightning') || text.includes('rain')) return 'storm';
    if (text.includes('power') || text.includes('dominion') || text.includes('king') || text.includes('conquer')) return 'power';
    return null;
  }, [beat?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Compute per-line speaker info for displayed lines
  // Uses a multi-pass approach:
  //   1. Explicit detection (regex patterns for "Name says", "you say", etc.)
  //   2. Preceding narration cues ("She glances at your..." → next line is Karyudon)
  //   3. Turn-taking heuristic (dialogue alternates between beat speaker and Karyudon)
  //   4. Beat-level speaker as final fallback
  const lineSpeakers = useMemo(() => {
    if (!beat) return [];
    const paragraphs = beat.paragraphs || [];
    if (paragraphs.length === 0) return [];
    const beatSpeaker = activeSpeaker; // The beat-level speaker
    // Whether the beat has an explicit speaker field (not auto-detected).
    // When true, prev-line action-verb matches should NOT override the beat speaker.
    const hasBeatSpeaker = !!(beat.speaker && beat.speaker !== 'narrator');
    const result: Array<{ speakerId: string | null; speakerName: string | null; accentColor: string; showTag: boolean }> = [];
    let lastShownSpeaker: string | null = null;
    // Track the last DIALOGUE speaker for turn-taking (not reset by narration lines)
    let lastDialogueSpeaker: string | null = null;
    // Track whether there's been a narration line between dialogue lines
    let narrationGap = false;

    for (let i = 0; i < paragraphs.length; i++) {
      const line = paragraphs[i];
      const isDlg = isDialogueLine(line);

      if (!isDlg) {
        // Narration: no speaker tag, but check for inline dialogue that establishes turn-taking
        // e.g. 'she says. "Cargo or crew?"' → an NPC just spoke, next standalone quote alternates
        const inlineSpeaker = detectInlineSpeaker(line);
        if (inlineSpeaker === 'karyudon') {
          lastDialogueSpeaker = 'karyudon';
          // Inline speaker detection means someone spoke IN this narration.
          // The next dialogue line should alternate, so do NOT set narrationGap.
          narrationGap = false;
        } else if (inlineSpeaker === 'other') {
          // An NPC spoke inline. Use beat speaker if available, otherwise mark as generic 'other'.
          lastDialogueSpeaker = (beatSpeaker && beatSpeaker !== 'karyudon') ? beatSpeaker : '__other__';
          // Same: inline speaker means this narration IS dialogue setup, not a gap.
          narrationGap = false;
        } else {
          // Pure narration with no embedded dialogue. This IS a gap that resets turn-taking.
          narrationGap = true;
        }
        result.push({ speakerId: null, speakerName: null, accentColor: featuredAccent, showTag: false });
        continue;
      }

      // === Pass 1: Explicit per-line detection (always runs, even with beat speaker) ===
      let lineSpeakerId: string | null = detectLineSpeaker(line, paragraphs, i, hasBeatSpeaker);

      // === Pass 2: Preceding narration cues ===
      if (!lineSpeakerId && i > 0) {
        const prevLine = paragraphs[i - 1];
        if (prevLine && !isDialogueLine(prevLine)) {
          // Check if the narration line explicitly attributes via "Name verb" pattern.
          // When the beat has an explicit speaker, use speechOnly=true to prevent action
          // verbs (laughs, drops, sits) from overriding the beat speaker. Without a beat
          // speaker, use full detection to maximize correct attribution.
          // Also pass hasBeatSpeaker as suppressKaryudon to prevent "you say" in quotes
          // from overriding explicit beat speakers.
          lineSpeakerId = detectSpeakerInLine(prevLine, hasBeatSpeaker, hasBeatSpeaker);

          // If narration uses second-person ("you/your") AND there's no beat speaker,
          // the next dialogue is likely Karyudon (the POV character).
          // Only apply this for beats without a speaker — otherwise it overrides
          // legitimate beat-speaker lines after narration mentioning "you".
          if (!lineSpeakerId && !beatSpeaker && narratorImpliesProtagonist(prevLine)) {
            lineSpeakerId = 'karyudon';
          }
        }
      }

      // === Pass 3: Turn-taking heuristic ===
      // Only alternate speakers when dialogue lines are CONSECUTIVE (no narration gap).
      // When there's narration between dialogue lines, the conversation "resets"
      // and the next dialogue defaults to the beat speaker (Pass 4).
      if (!lineSpeakerId && lastDialogueSpeaker && !narrationGap) {
        if (lastDialogueSpeaker === 'karyudon') {
          // Last line was Karyudon. Next unattributed line is the other speaker.
          // Use beat speaker if known, otherwise '__other__' (unnamed NPC).
          lineSpeakerId = (beatSpeaker && beatSpeaker !== 'karyudon') ? beatSpeaker : '__other__';
        } else {
          // Last line was someone else. Next unattributed line is likely Karyudon.
          lineSpeakerId = 'karyudon';
        }
      }

      // === Pass 4: Beat speaker fallback ===
      // Only if nothing else worked and the beat has a non-narrator speaker
      if (!lineSpeakerId && beatSpeaker && beatSpeaker !== 'narrator') {
        lineSpeakerId = beatSpeaker;
      }

      // '__other__' is used for unnamed NPCs in turn-taking — no name tag shown
      const isAnonymousNpc = lineSpeakerId === '__other__';
      const speakerName = lineSpeakerId && !isAnonymousNpc
        ? (characterNames[lineSpeakerId] || lineSpeakerId.replace(/_/g, ' ').toUpperCase())
        : null;
      const accent = lineSpeakerId && !isAnonymousNpc
        ? (characterAccents[lineSpeakerId] || 'rgba(251, 191, 36, 0.7)')
        : featuredAccent;

      // Show tag only when speaker changes from last shown speaker
      const showTag = isDlg && lineSpeakerId !== null && lineSpeakerId !== lastShownSpeaker;

      result.push({ speakerId: lineSpeakerId, speakerName, accentColor: accent, showTag });

      if (lineSpeakerId) {
        lastShownSpeaker = lineSpeakerId;
        lastDialogueSpeaker = lineSpeakerId;
      }
      // Reset narration gap: this dialogue line was processed, next consecutive
      // dialogue can use turn-taking
      narrationGap = false;
    }

    return result;
  }, [beat?.id, beat?.paragraphs, activeSpeaker, featuredAccent]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentScene || !beat) {
    return (
      <div className="h-full flex items-center justify-center bg-ocean-900">
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className="text-center relative z-10 animate-fade-in">
          <p className="text-ocean-300 text-2xl font-narration italic mb-2">
            The sea waits.
          </p>
          <p className="text-ocean-500 text-sm font-body mb-8">
            No active story. Choose your next move.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => useGameStore.getState().setActivePanel('map')}
              className="godtide-btn-primary"
            >
              OPEN MAP
            </button>
            <button
              onClick={() => useGameStore.getState().setActivePanel('management')}
              className="godtide-btn-primary"
            >
              VIEW CREW
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentlyTypingLine = beat.paragraphs[currentLineIndex]?.substring(0, currentCharIndex);
  // Get speaker info for the currently typing line
  const typingLineSpeaker = lineSpeakers[currentLineIndex] || null;

  return (
    <div
      className={`h-full relative bg-ocean-900 cursor-pointer select-none overflow-hidden ${
        screenEffect === 'shake' ? 'animate-combat-shake' :
        screenEffect === 'heavy_shake' ? 'animate-combat-shake-heavy' :
        ''
      }`}
      onClick={handleClick}
    >
      {/* === SCREEN FLASH === */}
      {screenEffect === 'flash' && (
        <div className="absolute inset-0 z-50 bg-white animate-speaker-flash pointer-events-none" />
      )}
      {screenEffect === 'flash_red' && (
        <div className="absolute inset-0 z-50 bg-red-600 animate-speaker-flash pointer-events-none" />
      )}
      {screenEffect === 'flash_crimson' && (
        <div className="absolute inset-0 z-50 bg-crimson-600 animate-speaker-flash pointer-events-none" />
      )}

      {/* === SHONEN: Emotional atmosphere overlays === */}
      {emotionalTone === 'intense' && (
        <div className="absolute inset-0 z-[2] pointer-events-none animate-emotion-pulse"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(220,38,38,0.15) 0%, transparent 70%)' }}
        />
      )}
      {emotionalTone === 'power' && (
        <div className="absolute inset-0 z-[2] pointer-events-none animate-emotion-pulse"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(168,85,247,0.12) 0%, transparent 70%)' }}
        />
      )}
      {emotionalTone === 'warm' && (
        <div className="absolute inset-0 z-[2] pointer-events-none animate-emotion-pulse"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.08) 0%, transparent 70%)' }}
        />
      )}

      {/* === BACKGROUND IMAGE — fills entire panel === */}
      {prevBgImage && bgTransition && (
        <div
          className="absolute inset-0 bg-cover bg-center z-[1]"
          style={{
            backgroundImage: `url(${prevBgImage})`,
            animation: 'fadeOut 1.2s ease-out forwards',
          }}
        />
      )}
      {bgImage ? (
        <div
          className={`absolute inset-0 bg-cover bg-center z-[1] ${bgTransition ? 'animate-fade-in' : ''}`}
          style={{
            backgroundImage: `url(${bgImage})`,
            ...(bgTransition ? { animationDuration: '1.2s' } : {}),
          }}
        />
      ) : (
        /* Fallback atmospheric background when scene image is missing */
        <div className="absolute inset-0 z-[1]" style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(30, 58, 95, 0.6) 0%, rgba(10, 14, 26, 0.95) 70%)',
        }} />
      )}

      {/* === SCENE TITLE — overlays at top center === */}
      {beat.title && (
        <div className="absolute top-4 left-0 right-0 z-10 text-center">
          <h2 className="scene-title-card animate-fade-in">
            {beat.title}
          </h2>
        </div>
      )}

      {/* === DIALOGUE AREA — anchored to bottom, never moves === */}
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: '31%', minHeight: '180px' }}>

        {/* Decorative dialogue frame header — ornamental separator */}
        {getUiAsset('dialogue_frame') && (
          <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none z-[3]" style={{ transform: 'translateY(-50%)' }}>
            <img
              src={getUiAsset('dialogue_frame')!}
              alt=""
              className="h-8 w-auto max-w-[300px]"
              style={{ opacity: 0.15 }}
              draggable={false}
            />
          </div>
        )}

        {/* Gradient fade from transparent to dark — stronger darkening for readability */}
        <div className="absolute inset-x-0 top-0 h-20 pointer-events-none z-0"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(10, 10, 15, 0.95))' }}
        />

        {/* Solid dark background for text readability */}
        <div className="absolute inset-x-0 top-20 bottom-0 z-0" style={{ background: 'rgba(10, 10, 15, 0.95)' }} />

        {/* Content: portrait + dialogue side by side */}
        <div className="relative h-full flex items-stretch px-4 pb-1 gap-4 z-[1]" style={{ paddingTop: '2rem' }}>

          {/* Portrait — bottom left, CSS gold border with glow. Hidden on mobile for space. */}
          {featuredCharacter && featuredPortrait && (
            <div className="hidden md:block" style={{ flexShrink: 0, alignSelf: 'flex-end', marginBottom: '28px', textAlign: 'center' as const }}>
              <div style={{ width: '255px', height: '319px' }}>
                <img
                  src={featuredPortrait}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: '4px',
                    border: '3px solid #D4A574',
                    boxShadow: '0 0 10px rgba(212,165,116,0.3), inset 0 0 20px rgba(0,0,0,0.3)',
                  }}
                />
              </div>
              <div style={{
                marginTop: '4px',
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                color: '#D4A574',
              }}>
                {featuredName}
              </div>
            </div>
          )}

          {/* Dialogue box — fills remaining width, stretches to fill available space */}
          <div className="flex-1 min-w-0 flex flex-col relative" style={{ marginBottom: '28px' }}>

            <div
              className="dialogue-box relative rounded-md overflow-hidden dialogue-box-glow-active flex-1 flex flex-col"
              style={{
                background: 'rgba(10, 10, 15, 0.95)',
                '--accent-glow': featuredAccent.replace(/[\d.]+\)$/, '0.15)'),
                '--accent-glow-dim': featuredAccent.replace(/[\d.]+\)$/, '0.06)'),
                border: `1px solid ${featuredAccent.replace(/[\d.]+\)$/, '0.2)')}`,
                borderTop: `2px solid rgba(196, 148, 58, 0.6)`,
                backdropFilter: 'blur(12px)',
                maxHeight: '30vh',
              } as React.CSSProperties}
            >
              {/* Dialogue box frame overlay — decorative, very subtle */}
              {getUiAsset('dialogue_box_frame') && (
                <img
                  src={getUiAsset('dialogue_box_frame')!}
                  alt=""
                  className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                  style={{ objectFit: 'fill', opacity: 0.06, mixBlendMode: 'multiply' }}
                  draggable={false}
                />
              )}

              <div
                ref={dialogueScrollRef}
                className="px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-ocean-700 scrollbar-track-transparent flex-1"
              >
                {/* Text content with per-line speaker tags */}
                <div className="space-y-2">
                  {displayedLines.map((line, i) => {
                    // Skip empty/whitespace-only paragraphs
                    if (!line || !line.trim()) return null;
                    const speakerInfo = lineSpeakers[i];
                    const isDlg = isDialogueLine(line);
                    const lineAccent = speakerInfo?.accentColor || featuredAccent;
                    const lineSolid = lineAccent.replace('rgba', 'rgb').replace(/,\s*[\d.]+\)/, ')');

                    return (
                      <div key={`line-${i}`}>
                        {/* Speaker name tag — shown when speaker changes */}
                        {speakerInfo?.showTag && speakerInfo.speakerName && (
                          <div className="mb-1 animate-nametag">
                            <span
                              className="speaker-name"
                              style={{
                                color: lineSolid,
                                textShadow: `0 0 10px ${lineAccent}, 0 0 20px ${lineAccent.replace(/[\d.]+\)$/, '0.3)')}`,
                              }}
                            >
                              {speakerInfo.speakerName}
                            </span>
                          </div>
                        )}
                        <p
                          className={`leading-[1.8] font-narration story-line story-text-shadow ${
                            isDlg
                              ? 'text-base md:text-[22px] font-semibold pl-3'
                              : line.startsWith('*') || line.startsWith('[')
                                ? 'text-sm md:text-[20px] font-medium italic'
                                : 'text-base md:text-[22px] font-semibold'
                          }`}
                          style={isDlg ? {
                            color: '#F5EDE1',
                            borderLeft: `3px solid ${lineAccent.replace(/[\d.]+\)$/, '0.6)')}`,
                            animationDelay: `${i * 30}ms`,
                          } : line.startsWith('*') || line.startsWith('[') ? {
                            color: '#C4A882',
                            animationDelay: `${i * 30}ms`,
                          } : {
                            color: '#F0E8DC',
                            animationDelay: `${i * 30}ms`,
                          }}
                        >
                          {line}
                        </p>
                      </div>
                    );
                  })}

                  {/* Currently typing */}
                  {!allLinesComplete && currentlyTypingLine && (() => {
                    const isDlg = isDialogueLine(beat.paragraphs[currentLineIndex]);
                    const lineAccent = typingLineSpeaker?.accentColor || featuredAccent;
                    const lineSolid = lineAccent.replace('rgba', 'rgb').replace(/,\s*[\d.]+\)/, ')');

                    return (
                      <div>
                        {typingLineSpeaker?.showTag && typingLineSpeaker.speakerName && (
                          <div className="mb-1 animate-nametag">
                            <span
                              className="speaker-name"
                              style={{
                                color: lineSolid,
                                textShadow: `0 0 10px ${lineAccent}, 0 0 20px ${lineAccent.replace(/[\d.]+\)$/, '0.3)')}`,
                              }}
                            >
                              {typingLineSpeaker.speakerName}
                            </span>
                          </div>
                        )}
                        <p className={`leading-[1.8] font-narration story-text-shadow ${
                          isDlg
                            ? 'text-[22px] font-semibold pl-3'
                            : 'text-[22px] font-semibold'
                        }`}
                          style={isDlg ? {
                            color: '#F5EDE1',
                            borderLeft: `3px solid ${lineAccent.replace(/[\d.]+\)$/, '0.6)')}`,
                          } : {
                            color: '#F0E8DC',
                          }}
                        >
                          {currentlyTypingLine}
                          <span className="typewriter-cursor" />
                        </p>
                      </div>
                    );
                  })()}
                </div>

                {/* Continue prompt */}
                {allLinesComplete && !beat.choices && (
                  <div className="mt-3 text-right animate-fade-in">
                    <span className="text-ocean-500 text-sm tracking-wider inline-flex items-center gap-2 font-display">
                      <span className="text-xs uppercase tracking-[0.15em]">continue</span>
                      <span className="animate-bounce text-gold-500/60" style={{ animationDuration: '1.5s' }}>
                        &#9662;
                      </span>
                    </span>
                  </div>
                )}

                {/* === CHOICES — inside the dialogue box === */}
                {showChoices && beat.choices && (
                  <div className="mt-4 space-y-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    {beat.choices.filter(c => c.available).map((choice, i) => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoice(choice.id)}
                        className="w-full text-left animate-fade-in group rounded border transition-all duration-200 hover:border-gold-400/60 hover:shadow-lg hover:shadow-gold-500/10"
                        style={{
                          animationDelay: `${i * 100}ms`,
                          background: 'rgba(212, 165, 116, 0.08)',
                          borderColor: 'rgba(196, 148, 58, 0.25)',
                          padding: '12px 16px',
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-gold-400 font-display font-bold text-xl mt-0.5 group-hover:text-gold-300 flex-shrink-0">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          <div className="min-w-0">
                            <p className="text-ocean-100 font-narration font-semibold group-hover:text-white transition-colors leading-relaxed text-base md:text-xl">
                              {choice.text}
                            </p>
                            {choice.consequence && (
                              <p className="text-ocean-400 text-xs mt-1 italic font-body opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                {choice.consequence}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar — flush at very bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-1.5 flex justify-between items-center bg-ocean-950/80 backdrop-blur-sm border-t border-ocean-800/30 z-[2]">
          <span className="text-brass-400 text-xs tracking-wider uppercase font-display">
            {currentScene.title}
          </span>
          <div className="flex items-center gap-3">
            {currentScene.currentBeat > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setShowHistory(!showHistory); }}
                className={`text-xs tracking-wider transition-colors ${
                  showHistory
                    ? 'text-amber-400 font-bold'
                    : 'text-ocean-500 hover:text-ocean-300'
                }`}
              >
                {showHistory ? '\u25BC LOG' : '\u25B2 LOG'}
              </button>
            )}
            <span className="text-[#A89B8C] tracking-wider font-mono" style={{ fontSize: '15px' }}>
              {currentScene.currentBeat + 1} / {currentScene.beats.length}
            </span>
          </div>
        </div>
      </div>

      {/* Story History Overlay */}
      {showHistory && currentScene.currentBeat > 0 && (
        <div
          className="absolute inset-0 z-30 bg-ocean-950/95 backdrop-blur-md flex flex-col animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 py-3 border-b border-ocean-700 flex items-center justify-between flex-shrink-0">
            <h3 className="text-amber-400 font-display text-sm font-bold tracking-[0.15em]">
              STORY LOG - {currentScene.title}
            </h3>
            <button
              onClick={() => setShowHistory(false)}
              className="text-ocean-400 hover:text-ocean-200 text-sm font-bold tracking-wider transition-colors"
            >
              CLOSE
            </button>
          </div>
          <div ref={historyRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {currentScene.beats.slice(0, currentScene.currentBeat).map((pastBeat, beatIdx) => (
              <div key={pastBeat.id || beatIdx} className="space-y-2 max-w-3xl mx-auto">
                {pastBeat.title && (
                  <h4 className="text-amber-500/70 font-display text-xs font-bold tracking-wider uppercase">
                    {pastBeat.title}
                  </h4>
                )}
                {!pastBeat.title && <div className="w-8 h-px bg-ocean-700 my-1" />}
                {pastBeat.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className={`text-base leading-relaxed font-narration ${
                      isDialogueLine(p)
                        ? 'text-ocean-200 pl-3 border-l-2 border-ocean-600/50'
                        : 'text-ocean-400'
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
            {displayedLines.length > 0 && (
              <div className="space-y-2 border-t border-ocean-600/30 pt-4 max-w-3xl mx-auto">
                <h4 className="text-amber-400/80 font-display text-xs font-bold tracking-wider uppercase">
                  {beat?.title || 'NOW'}
                </h4>
                {displayedLines.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className={`text-base leading-relaxed font-narration ${
                      isDialogueLine(p)
                        ? 'text-ocean-100 pl-3 border-l-2 border-gold-500/30'
                        : 'text-ocean-300'
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
