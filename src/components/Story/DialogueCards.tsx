import React, { useState, useEffect, useRef } from 'react';
import { speakerToCharacter } from '../../utils/images';
import { CharacterCard } from './CharacterCard';

// Character display names for the name tag
export const characterNames: Record<string, string> = {
  karyudon: 'KARYUDON',
  delvessa: 'DELVESSA',
  dragghen: 'DRAGGHEN',
  suulen: 'SUULEN',
  kovesse: 'KOVESSE',
  tessek: 'TESSEK',
  orren: 'ORREN',
  vorreth: 'VORRETH',
  pettha_koss: 'PETTHA KOSS',
  tessurren: 'TESSURREN',
  hella: 'HELLA',
  rukessa: 'RUKESSA',
  iren_saltz: 'IREN SALTZ',
  captain_drezh: 'CAPTAIN DREZH',
  maavi: 'MAAVI',
  maren: 'MAREN',
  tessavarra: 'TESSAVARRA',
  vasshen: 'VASSHEN',
  kirin_akkan: 'KIRIN',
  kirin: 'KIRIN',
  prime_khoss: 'PRIME KHOSS',
  sable_venn: 'SABLE VENN',
  // Island villains & named NPCs (BUG-004 fix)
  rikkart: 'RIKKART',
  kellan_gyre: 'KELLAN GYRE',
  moth_calaveras: 'MOTH CALAVERAS',
  brother_ossian: 'BROTHER OSSIAN',
  merrik_sevaine: 'MERRIK SEVAINE',
  maren_kade: 'MAREN KADE',
  captain_hull: 'CAPTAIN HULL',
  forge_mother_tessik: 'FORGE-MOTHER TESSIK',
  the_orchid: 'THE ORCHID',
  vessel_ahn: 'VESSEL AHN',
  echo_salis: 'ECHO SALIS',
  // Minor NPCs (BUG-003 fix)
  bartender: 'BARTENDER',
  brenn: 'BRENN',
  chair_ruhl: 'CHAIR RUHL',
  consul_duval: 'CONSUL DUVAL',
  courier: 'COURIER',
  drest: 'DREST',
  drest_pohn: 'DREST POHN',
  elder_veshtari: 'ELDER VESHTARI',
  fael: 'FAEL',
  gharen: 'GHAREN',
  hella_foreman: 'HELLA FOREMAN',
  maeven: 'MAEVEN',
  matriarch_sorren: 'MATRIARCH SORREN',
  ossa: 'OSSA',
  raider_officer: 'RAIDER OFFICER',
  varrek_dockhand: 'VARREK DOCKHAND',
};

// Character card accent colors (border glow when active)
export const characterAccents: Record<string, string> = {
  karyudon: 'rgba(220, 38, 38, 0.7)',    // crimson - Oni fire
  delvessa: 'rgba(14, 165, 233, 0.7)',    // ocean blue - Kolmari precision
  dragghen: 'rgba(34, 197, 94, 0.7)',     // green - Gorundai earth, shipwright
  suulen: 'rgba(168, 85, 247, 0.7)',      // purple - Morventhi mystery
  kovesse: 'rgba(251, 191, 36, 0.7)',     // amber - Grimoire tech glow
  tessek: 'rgba(220, 38, 38, 0.7)',       // crimson red - Redtide, swordsman
  orren: 'rgba(96, 165, 250, 0.7)',       // electric blue - Storm Eel lightning
  vorreth: 'rgba(107, 114, 128, 0.7)',    // dark grey - Oni authority, Black Standard
  pettha_koss: 'rgba(245, 158, 11, 0.6)', // warm amber
  tessurren: 'rgba(14, 165, 233, 0.6)',   // cold ocean
  hella: 'rgba(236, 72, 153, 0.6)',       // pink
  rukessa: 'rgba(220, 38, 38, 0.6)',      // crimson
  iren_saltz: 'rgba(156, 163, 175, 0.6)', // grey
  captain_drezh: 'rgba(156, 163, 175, 0.6)',
  maavi: 'rgba(245, 158, 11, 0.6)',
  maren: 'rgba(14, 165, 163, 0.6)',       // teal - reef elder, ocean-touched
  tessavarra: 'rgba(34, 197, 94, 0.6)',    // seafoam - Ghostlight collective
  vasshen: 'rgba(220, 120, 38, 0.6)',      // burnt copper - authority, warmth
  kirin_akkan: 'rgba(245, 158, 11, 0.7)', // amber - Oni, highland guilt
  kirin: 'rgba(245, 158, 11, 0.7)',        // alias for kirin_akkan
  prime_khoss: 'rgba(148, 163, 184, 0.7)', // storm grey - Wardensea authority
  sable_venn: 'rgba(139, 92, 246, 0.6)',   // violet - rival presence
  // Island villains & named NPCs (BUG-004 fix)
  rikkart: 'rgba(220, 38, 38, 0.6)',        // crimson - rival enforcer
  kellan_gyre: 'rgba(245, 158, 11, 0.6)',   // amber - smuggler lord
  moth_calaveras: 'rgba(168, 85, 247, 0.6)',// purple - exotic, dangerous
  brother_ossian: 'rgba(234, 179, 8, 0.6)', // gold - religious authority
  merrik_sevaine: 'rgba(220, 120, 38, 0.6)',// burnt copper
  maren_kade: 'rgba(14, 165, 163, 0.6)',    // teal - maritime authority
  captain_hull: 'rgba(148, 163, 184, 0.6)', // storm grey - veteran captain
  forge_mother_tessik: 'rgba(34, 197, 94, 0.6)', // green - Gorundai
  the_orchid: 'rgba(139, 92, 246, 0.6)',    // violet - mysterious
  vessel_ahn: 'rgba(14, 165, 163, 0.6)',    // teal - spiritual
  echo_salis: 'rgba(96, 165, 250, 0.6)',    // blue - Ghostlight
  // Minor NPCs (BUG-003 fix)
  bartender: 'rgba(245, 158, 11, 0.5)',     // warm amber
  brenn: 'rgba(156, 163, 175, 0.5)',        // neutral grey
  chair_ruhl: 'rgba(245, 158, 11, 0.5)',    // warm amber - authority
  consul_duval: 'rgba(14, 165, 233, 0.5)',  // ocean blue - official
  courier: 'rgba(156, 163, 175, 0.5)',      // neutral grey
  drest: 'rgba(156, 163, 175, 0.5)',        // neutral grey
  drest_pohn: 'rgba(156, 163, 175, 0.5)',   // neutral grey
  elder_veshtari: 'rgba(14, 165, 163, 0.5)',// teal - elder wisdom
  fael: 'rgba(156, 163, 175, 0.5)',         // neutral grey
  gharen: 'rgba(156, 163, 175, 0.5)',       // neutral grey
  hella_foreman: 'rgba(34, 197, 94, 0.5)',  // green - Gorundai mine
  maeven: 'rgba(156, 163, 175, 0.5)',       // neutral grey
  matriarch_sorren: 'rgba(245, 158, 11, 0.5)', // warm amber - authority
  ossa: 'rgba(156, 163, 175, 0.5)',         // neutral grey
  raider_officer: 'rgba(220, 38, 38, 0.5)', // crimson - hostile
  varrek_dockhand: 'rgba(156, 163, 175, 0.5)', // neutral grey
};

interface DialogueCardsProps {
  /** Characters present in this beat (character IDs) */
  characters: string[];
  /** Currently speaking character ID, or null for narration */
  activeSpeaker: string | null;
  /** Beat ID - used to detect speaker changes for flash animation */
  beatId: string;
  /** Expression for the active speaker (e.g., 'angry', 'grim') */
  expression?: string;
  /** Per-character expression overrides */
  characterExpressions?: Record<string, string>;
}

export const DialogueCards: React.FC<DialogueCardsProps> = ({
  characters,
  activeSpeaker,
  beatId,
  expression,
  characterExpressions,
}) => {
  const [flashId, setFlashId] = useState<string | null>(null);
  const [enteredCards, setEnteredCards] = useState<Set<string>>(new Set());
  const prevSpeakerRef = useRef<string | null>(null);
  const prevCharactersRef = useRef<string[]>([]);

  // Flash animation when speaker changes
  useEffect(() => {
    if (activeSpeaker && activeSpeaker !== prevSpeakerRef.current) {
      setFlashId(activeSpeaker);
      const timer = setTimeout(() => setFlashId(null), 600);
      prevSpeakerRef.current = activeSpeaker;
      return () => clearTimeout(timer);
    }
    prevSpeakerRef.current = activeSpeaker;
  }, [activeSpeaker, beatId]);

  // Track which cards have entered (for staggered entrance animation)
  useEffect(() => {
    const prevSet = new Set(prevCharactersRef.current);
    const newEntrants = characters.filter(c => !prevSet.has(c));
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (newEntrants.length > 0) {
      newEntrants.forEach((charId, index) => {
        const timer = setTimeout(() => {
          setEnteredCards(prev => {
            const arr = Array.from(prev);
            arr.push(charId);
            return new Set(arr);
          });
        }, index * 120);
        timers.push(timer);
      });
    }

    setEnteredCards(prev => {
      const charSet = new Set(characters);
      return new Set(Array.from(prev).filter(c => charSet.has(c)));
    });

    prevCharactersRef.current = characters;
    return () => timers.forEach(t => clearTimeout(t));
  }, [characters.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  if (characters.length === 0) return null;

  const cardCount = characters.length;

  // Gap between cards
  const gap = cardCount <= 2 ? 24 : cardCount <= 3 ? 18 : cardCount <= 5 ? 12 : 8;

  return (
    <div
      className="flex items-end justify-center relative"
      style={{ gap: `${gap}px` }}
    >
      {characters.map((charId, index) => {
        const charExpression = characterExpressions?.[charId]
          || (charId === activeSpeaker ? expression : undefined);
        const isActive = charId === activeSpeaker;
        const isFlashing = charId === flashId;
        const hasEntered = enteredCards.has(charId);
        const accent = characterAccents[charId] || 'rgba(255, 255, 255, 0.5)';
        const name = characterNames[charId] || charId.replace(/_/g, ' ').toUpperCase();

        return (
          <div
            key={charId}
            className={`relative ${
              hasEntered ? 'animate-card-enter' : 'opacity-0'
            }`}
            style={{
              transform: `scale(${isActive ? 1.0 : 0.92}) translateY(${isActive ? '-12px' : '0px'})`,
              zIndex: isActive ? 20 : 10 - index,
              filter: isActive
                ? 'none'
                : activeSpeaker
                  ? 'grayscale(50%) brightness(0.55)'
                  : 'grayscale(0%) brightness(0.8)',
              transition: 'transform 0.4s ease-out, filter 0.4s ease-out',
            }}
          >
            <CharacterCard
              characterId={charId}
              expression={charExpression}
              isActive={isActive}
              isEntering={isFlashing}
              accentColor={accent}
              name={name}
              size="small"
            />
          </div>
        );
      })}
    </div>
  );
};

// ===========================
// Helper: Detect speaker from paragraph text
// ===========================

// Speech verb list shared by named-character patterns
const DETECT_SPEECH_VERBS = 'says|murmurs|whispers|observes|notes|asks|replies|adds|warns|nods|smiles|shrugs|suggests|speaks|leans|looks|raises|crosses|tilts|turns|glances|steps|pauses|rumbles|grunts|laughs|grins|offers|chuckles|hums|chirps|announces|declares|stammers|states|tells|sighs|sneers|growls|snarls|barks|orders|commands|bounces|waves|beams|adjusts|taps|draws|sheathes|names|slashes|stands|flinches|sparks|crackles|tries|blushes|sets|rates|inspects|drops|gestures|points|perches|falls|snores|wakes|watches|calls|mutters';

// Patterns: "Name verb" (character as subject with speech/action verb)
// NOTE: Karyudon is NOT in this list. The "you say" pattern is handled separately
// with additional guards to prevent false positives from indirect references.
// NEGATION_GUARD: "says nothing" / "says no more" = character is NOT speaking, reject match
const NEG = '\\b(?!\\s+(?:nothing|no\\s+more))';
const speakerPatterns: { name: string; charId: string; pattern: RegExp }[] = [
  { name: 'Delvessa', charId: 'delvessa', pattern: new RegExp(`(?:Delvessa\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Delvessa)`, 'i') },
  { name: 'Dragghen', charId: 'dragghen', pattern: new RegExp(`(?:Dragghen\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Dragghen)`, 'i') },
  { name: 'Suulen', charId: 'suulen', pattern: new RegExp(`(?:Suulen\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Suulen)`, 'i') },
  { name: 'Kovesse', charId: 'kovesse', pattern: new RegExp(`(?:Kovesse\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Kovesse)`, 'i') },
  { name: 'Tessek', charId: 'tessek', pattern: new RegExp(`(?:Tessek\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Tessek)`, 'i') },
  { name: 'Orren', charId: 'orren', pattern: new RegExp(`(?:Orren\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Orren)`, 'i') },
  { name: 'Vorreth', charId: 'vorreth', pattern: new RegExp(`(?:Vorreth\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Vorreth)`, 'i') },
  { name: 'Pettha', charId: 'pettha_koss', pattern: new RegExp(`(?:Pettha(?:\\s+Koss)?\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Pettha)`, 'i') },
  { name: 'Tessurren', charId: 'tessurren', pattern: new RegExp(`(?:Tessurren(?:\\s+Dolch)?\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Tessurren)`, 'i') },
  { name: 'Hella', charId: 'hella', pattern: new RegExp(`(?:Hella\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Hella)`, 'i') },
  { name: 'Rukessa', charId: 'rukessa', pattern: new RegExp(`(?:Rukessa\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Rukessa)`, 'i') },
  { name: 'Iren', charId: 'iren_saltz', pattern: new RegExp(`(?:Iren(?:\\s+Saltz)?\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Iren)`, 'i') },
  { name: 'Drezh', charId: 'captain_drezh', pattern: new RegExp(`(?:(?:Captain\\s+)?Drezh\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*(?:Captain\\s+)?Drezh)`, 'i') },
  { name: 'Maavi', charId: 'maavi', pattern: new RegExp(`(?:Maavi\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Maavi)`, 'i') },
  { name: 'Maren', charId: 'maren', pattern: new RegExp(`(?:Maren\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Maren)`, 'i') },
  { name: 'Tessavarra', charId: 'tessavarra', pattern: new RegExp(`(?:Tessavarra\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Tessavarra)`, 'i') },
  { name: 'Vasshen', charId: 'vasshen', pattern: new RegExp(`(?:Vasshen\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Vasshen)`, 'i') },
  { name: 'Kirin', charId: 'kirin', pattern: new RegExp(`(?:Kirin(?:\\s+Akkan)?\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*Kirin)`, 'i') },
  { name: 'Prime Khoss', charId: 'prime_khoss', pattern: new RegExp(`(?:(?:Prime\\s+)?Khoss\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*(?:Prime\\s+)?Khoss)`, 'i') },
  { name: 'Sable Venn', charId: 'sable_venn', pattern: new RegExp(`(?:(?:Sable\\s+)?Venn\\s+(?:${DETECT_SPEECH_VERBS})${NEG}|"[^"]*"\\s*(?:Sable\\s+)?Venn)`, 'i') },
];

/**
 * Check if "you + speech verb" appears in NARRATION (outside quotes), indicating
 * Karyudon is the one speaking. Returns true only when the match is NOT inside
 * quoted dialogue (which would mean another character is saying those words).
 */
function isKaryudonSpeakingInNarration(text: string): boolean {
  // Strict speech-act verbs only (not "you look" or "you turn" which are actions, not speech)
  // Guard: "before you ask" / "if you say" = conditional/anticipated, not actual speech
  const karyudonSpeechPattern = /(?<!(?:before|if)\s)\byou\s+(?:say|growl|grunt|tell|ask|reply|mutter|announce)\b/i;

  if (!karyudonSpeechPattern.test(text)) return false;

  // Guard: make sure the match is NOT inside quoted dialogue.
  // If "you say" appears inside curly/straight quotes, it's another character
  // quoting or addressing Karyudon (e.g., Kovesse saying "you say nothing"),
  // not Karyudon actually speaking.
  // Strategy: strip all quoted dialogue, then re-test on the remaining narration.
  const withoutQuotes = text
    .replace(/\u201c[^\u201d]*\u201d/g, '')   // Remove curly-quoted strings
    .replace(/"[^"]*"/g, '');                    // Remove straight-quoted strings

  return karyudonSpeechPattern.test(withoutQuotes);
}

/**
 * Try to detect who is speaking from the beat's paragraph text.
 * Returns a character ID if detected, or null.
 * Checks for "Name says" patterns and second-person "you" (= Karyudon).
 *
 * When beatSpeaker is provided (from an explicit beat.speaker field), the Karyudon
 * "you say" heuristic is suppressed to prevent false-positive speaker swaps.
 * Named-character patterns (e.g., "Delvessa says") can still override the beat
 * speaker because those provide strong, unambiguous evidence.
 *
 * @param paragraphs - The beat's paragraph text array
 * @param beatSpeaker - Optional explicit beat.speaker charId. When set, the weaker
 *   "you say" heuristic is skipped to avoid swapping the label on beats where another
 *   character talks ABOUT "you".
 */
export function detectSpeakerFromText(paragraphs: string[], beatSpeaker?: string | null): string | null {
  const fullText = paragraphs.join(' ');

  // Check if there's even dialogue in this beat
  const hasDialogue = fullText.includes('\u201c') || fullText.includes('"');
  if (!hasDialogue) return null;

  // Check explicit named-character speaker patterns (strong evidence).
  // These CAN override an explicit beat speaker because "Delvessa says" is
  // unambiguous -- it means Delvessa is speaking, regardless of beat.speaker.
  for (const sp of speakerPatterns) {
    if (sp.pattern.test(fullText)) {
      return sp.charId;
    }
  }

  // Check for second-person narration with speech verbs (Karyudon speaking).
  // ONLY when there is NO explicit beat speaker set, because:
  // - When beat.speaker is set (e.g., 'kovesse'), lines where the speaker talks
  //   ABOUT "you" (e.g., "you say nothing") should NOT relabel the beat as Karyudon.
  // - When beat.speaker is null, "you say" in narration IS Karyudon speaking.
  // Additionally, the match must be OUTSIDE quoted dialogue to avoid false positives
  // from another character saying the words "you say".
  if (!beatSpeaker && isKaryudonSpeakingInNarration(fullText)) {
    return 'karyudon';
  }

  return null;
}

// ===========================
// Helper: Detect characters mentioned in a SINGLE beat
// ===========================

// Name-to-charId lookup for text scanning
const nameToCharId: { pattern: RegExp; charId: string }[] = [
  { pattern: /\bDelvessa\b/, charId: 'delvessa' },
  { pattern: /\bDragghen\b/, charId: 'dragghen' },
  { pattern: /\bSuulen\b/, charId: 'suulen' },
  { pattern: /\bKovesse\b/, charId: 'kovesse' },
  { pattern: /\bTessek\b/, charId: 'tessek' },
  { pattern: /\bOrren\b/, charId: 'orren' },
  { pattern: /\bVorreth\b/, charId: 'vorreth' },
  { pattern: /\bPettha\b/, charId: 'pettha_koss' },
  { pattern: /\bTessurren\b/, charId: 'tessurren' },
  { pattern: /\bHella\b/, charId: 'hella' },
  { pattern: /\bRukessa\b/, charId: 'rukessa' },
  { pattern: /\bIren\b/, charId: 'iren_saltz' },
  { pattern: /\bDrezh\b/, charId: 'captain_drezh' },
  { pattern: /\bMaavi\b/, charId: 'maavi' },
  { pattern: /\bMaren\b/, charId: 'maren' },
  { pattern: /\bTessavarra\b/, charId: 'tessavarra' },
  { pattern: /\bVasshen\b/, charId: 'vasshen' },
];

/**
 * Infer which characters are present in a SINGLE beat.
 * Only shows characters that are actively mentioned, speaking, or explicitly listed.
 * Always includes Karyudon (the MC is always present).
 * Returns max 6 characters.
 */
export function inferBeatCharacters(
  beat: { speaker?: string; paragraphs: string[]; characters?: string[] },
): string[] {
  // If the beat explicitly lists characters, use those
  if (beat.characters && beat.characters.length > 0) {
    return beat.characters;
  }

  const charSet = new Set<string>();

  // Karyudon (MC) is always present
  charSet.add('karyudon');

  // Add the speaker if there is one
  if (beat.speaker) {
    const charId = speakerToCharacter[beat.speaker] || beat.speaker;
    if (charId !== 'narrator') charSet.add(charId);
  }

  // Scan this beat's text for character name mentions
  const text = beat.paragraphs.join(' ');
  for (const nc of nameToCharId) {
    if (nc.pattern.test(text)) {
      charSet.add(nc.charId);
    }
  }

  // Also try text-based speaker detection (pass beat.speaker to suppress false positives)
  const beatSpeakerId = beat.speaker ? (speakerToCharacter[beat.speaker] || beat.speaker) : null;
  const detectedSpeaker = detectSpeakerFromText(beat.paragraphs, beatSpeakerId);
  if (detectedSpeaker) {
    charSet.add(detectedSpeaker);
  }

  // Remove narrator if it snuck in
  charSet.delete('narrator');

  const result = Array.from(charSet);

  // Cap at 6
  if (result.length > 6) {
    const crew = ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'tessek', 'orren', 'vorreth'];
    const crewPresent = result.filter(c => crew.includes(c));
    const npcsPresent = result.filter(c => !crew.includes(c));
    return [...crewPresent, ...npcsPresent].slice(0, 6);
  }

  return result;
}

// ===========================
// Helper: Detect characters present in a scene (legacy, for scene-level override)
// ===========================

/**
 * Given a StoryScene, infer which characters are likely present
 * by scanning ALL beats. Used as a fallback when scene.characters is defined.
 */
export function inferSceneCharacters(
  sceneId: string,
  beats: { speaker?: string; paragraphs: string[]; characters?: string[] }[],
  sceneCharacters?: string[]
): string[] {
  if (sceneCharacters && sceneCharacters.length > 0) {
    return sceneCharacters;
  }

  const charSet = new Set<string>();
  charSet.add('karyudon');

  for (const beat of beats) {
    if (beat.characters) {
      beat.characters.forEach(c => charSet.add(c));
    }
    if (beat.speaker) {
      const charId = speakerToCharacter[beat.speaker] || beat.speaker;
      if (charId !== 'narrator') charSet.add(charId);
    }
    const text = beat.paragraphs.join(' ');
    for (const nc of nameToCharId) {
      if (nc.pattern.test(text)) charSet.add(nc.charId);
    }
  }

  // Remove narrator if it snuck in
  charSet.delete('narrator');

  const result = Array.from(charSet);
  if (result.length > 6) {
    const crew = ['karyudon', 'delvessa', 'dragghen', 'suulen', 'kovesse', 'tessek', 'orren', 'vorreth'];
    const crewPresent = result.filter(c => crew.includes(c));
    const npcsPresent = result.filter(c => !crew.includes(c));
    return [...crewPresent, ...npcsPresent].slice(0, 6);
  }

  return result;
}
