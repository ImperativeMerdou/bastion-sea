# GODTIDE: BASTION SEA -- QA REPORT

**Date:** 2026-02-25
**Build status:** CLEAN (tsc + npm run build, zero errors)
**Total fixes applied:** 219

---

## PHASE 1: SPEAKER ATTRIBUTION (49 fixes, 25 files)

Manually audited ~540+ beats across ~55 story files. Removed `speaker`, `speakerName`, and `expression` fields from beats where the content didn't match (multi-speaker ensembles, narrator prose, wrong speaker).

### Files edited:

| File | Fixes | Beat IDs |
|------|-------|----------|
| exploration_sorrens.ts | 2 | sorrens_arrive_01, sorrens_arrive_03 |
| exploration_mirrorwater.ts | 1 | mirrorwater_arrive_03 |
| exploration_ghostlight.ts | 1 | ghostlight_arrive_03 |
| exploration_vess.ts | 1 | vess_arrive_03 |
| exploration_noon.ts | 3 | noon_arrive_01, noon_arrive_02, noon_arrive_03 |
| conquest_durrek.ts | 3 | durrek_assault_01, durrek_assault_02, durrek_assault_06 |
| conquest_anvil_cay.ts | 4 | anvil_conquest_01, anvil_conquest_03, anvil_conquest_04, anvil_conquest_05 |
| conquest_windrow.ts | 3 | windrow_conquest_01, windrow_conquest_02, windrow_conquest_04 |
| conquest_force.ts | 1 | force_05 |
| conquest_aftermath.ts | 1 | aftermath_01 |
| conquest_economic.ts | 1 | economic_06 |
| conquest_mossbreak.ts | 2 | mossbreak_conquest_01, mossbreak_conquest_04 |
| conquest_coppervein.ts | 1 | coppervein_conquest_02 |
| conquest_keldriss.ts | 2 | keldriss_conquest_ossian, keldriss_conquest_03 |
| conquest_sorrens.ts | 2 | sorrens_conquest_03, sorrens_conquest_04 |
| conquest_mirrorwater.ts | 1 | mirrorwater_conquest_04 |
| conquest_ghostlight.ts | 1 | ghostlight_conquest_02 |
| conquest_noon_island.ts | 3 | noon_conquest_01, noon_conquest_02, noon_conquest_04 |
| conquest_vess_harbour.ts | 2 | vess_conquest_01, vess_conquest_06 |
| rival_intro.ts | 1 | rival_01 |
| act2_main.ts | 1 | ultimatum_02 |
| act3_main.ts | 2 | a3_council_04, a3_council_06 |
| crew_events.ts | 1 | suu_01_end |
| crew_events_new.ts | 5 | orr_02_6, kov_03_5, suu_03_3, tes_03_5, del_03_3 |
| crew_events_04.ts | 4 | del_04_end, drag_04_end, kov_04_end, suu_04_end |

---

## PHASE 2: AUDIO FIXES (4 edits, 3 files)

### Volume defaults adjusted:

| Channel | Old | New | File |
|---------|-----|-----|------|
| SFX | 0.35 | 0.30 | audio.ts, audioSettings.ts |
| Ambience | 0.15 | 0.12 | ambience.ts, audioSettings.ts |
| Stingers | 0.35 | 0.35 | (already correct) |

### Ocean-on-every-panel: NOT A BUG
The ambience resolver (`getAmbienceForContext`) is already location-based:
- Map panel: `open_sea` (correct, you're looking at the sea)
- Management panel: island-based ambience, fallback to `port_tavern`
- Story panel: scene-aware (storm, underground, tension, calm, tavern), fallback to island or `open_sea`
- Combat: `combat` or `combat_boss`
- Travel: `voyage`
- Title: `title`

### Volume sliders: ALREADY PRESENT
PauseMenu already has 4 sliders (Master, Effects, Ambience, Stingers) wired through `useAudioControls` hook with localStorage persistence via `audioSettings.ts`.

---

## PHASE 3: FULL BUG HUNT

### Banned names (Kael, Elara, Lyra, etc.): CLEAN
Zero occurrences across all story files, randomEvents.ts, and dayActions.ts.

### Captain timing: 1 EDGE CASE (not fixed)
- `dragon_fruit_activation.ts` line 98: Kovesse says "Captain" but the scene can theoretically fire before Tavven conquest (requires Iron Dominion 30+ and 3 combat victories pre-conquest, extremely unlikely in normal play).

### Karyudon expressions: CLEAN
Zero instances of Karyudon with expression field. Zero `characterExpressions` containing 'karyudon' key.

### AI slop vocabulary: 6 instances found (NOT FIXED per CLAUDE.md rule #2)
Per "Protect the prose" directive, these are flagged but not rewritten:

| File | Line | Pattern |
|------|------|---------|
| conquest_anvil_cay.ts | 143 | "cuts through the night" |
| conquest_keldriss.ts | 140 | "cuts through the twilight" |
| crew_events_new.ts | 1732 | "a voice cuts through the crowd" |
| kirin_act2.ts | 31 | "cuts through the harbor approach" |
| dragghen_recruitment.ts | 52 | "the weight of the offense" |
| crew_events_new.ts | 1361 | "sparks dance between his fingers" |

### Scene chain integrity: CLEAN
All 18 `nextSceneId` references resolve to valid registered scenes. 79 scenes in registry plus auto-registered crew events.

### Pre-recruitment appearances: SAFE
- Crew events gated by `member.recruited` check in CrewTab.tsx and ManagementPanel.tsx before `getAvailableCrewEvents()` is called.
- `dragon_fruit_activation.ts` has crew members speaking (edge case, see Captain timing above).

---

## PHASE 4: VISUAL/CSS FIXES (2 edits, 2 files)

### TopBar.tsx: z-index hierarchy fix
- Confirmation overlay: `z-[200]` changed to `z-[75]`
- Reason: z-[200] broke the established hierarchy (notifications z-40, modals z-50, events z-60, PauseMenu z-70)

### CombatPanel.tsx: disabled button accessibility
- Disabled (non-locked) combat action buttons: `opacity-40` changed to `opacity-50 text-ocean-500`
- Reason: opacity alone is insufficient for colorblind users. Added explicit text color dimming.

### Flagged but not fixed (responsive design):
- StoryPanel portrait: hardcoded 220px width, no mobile scaling
- DialogueCards: hardcoded 220/120px card sizes
- TopBar: text values can overflow on narrow phones (<375px)
- TopBar: resource tooltips 176px fixed width may extend past viewport on mobile

---

## PHASE 5: SECOND PASS SPEAKER ATTRIBUTION (166 fixes, 8 files)

### Systemic fix: `speaker: 'narrator'` removed (161 instances)
'narrator' is not a valid character ID. All instances replaced with no speaker (undefined).

| File | Instances removed |
|------|-------------------|
| delvessa_romance.ts | 46 |
| crew_events_new.ts | 65 |
| crew_events_04.ts | 32 |
| crew_events.ts | 18 |

### Individual multi-speaker fixes (5 fixes):

| File | Beat | Issue |
|------|------|-------|
| exploration_vess.ts | vess_arrive_05 | Multi-speaker (Karyudon, Delvessa, Vorreth all have dialogue) |
| conquest_force.ts | force_01 | Multi-speaker (Karyudon + Delvessa) + removed dead `expression: 'angry'` |
| conquest_force.ts | force_02 | Multi-speaker (Vorreth + Karyudon) |
| dragghen_recruitment.ts | dragghen_02 | Multi-speaker (Dragghen + Karyudon) |
| kovesse_recruitment.ts | kovesse_10 | Multi-speaker (Kovesse + Dragghen) |

---

## PHASE 6: INTEGRATION TEST

- `npx tsc --noEmit`: PASS (zero errors)
- `npm run build`: PASS (build folder ready)
- Bundle: 686.82 kB JS (gzipped), 17.35 kB CSS (gzipped)

---

## SUMMARY

| Phase | Fixes | Status |
|-------|-------|--------|
| 1. Speaker attribution (first pass) | 49 | COMPLETE |
| 2. Audio volumes + defaults | 4 | COMPLETE |
| 3. Bug hunt (names, timing, expressions, vocab, chains) | 0 fixes (6 flagged) | COMPLETE |
| 4. Visual/CSS | 2 | COMPLETE |
| 5. Speaker attribution (second pass) | 166 | COMPLETE |
| 6. Integration test | -- | PASS |
| **TOTAL** | **221** | |

### Files modified (32 total):
- 29 story data files
- 3 system files (audio.ts, ambience.ts, audioSettings.ts)
- 2 component files (TopBar.tsx, CombatPanel.tsx)
