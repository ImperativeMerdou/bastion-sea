# GODTIDE: BASTION SEA -- Total Quality Directive Report

**Date:** 2026-02-28
**Commits:** 9 (fb2d5ca through c1ea7a2)
**Build Status:** Zero TypeScript errors. Zero build errors.

---

## WHAT WAS DONE

### Step 1-2: Complete Game Flow Audit + Bug Fixes

**GAME_AUDIT.ts** written and committed. Documents:
- 52+ story scenes, 200+ beats, 21 speakers with full portrait chains
- 23+ player choices mapped with consequence analysis
- Complete scene chain from prologue through epilogue
- Speaker resolution chain fully traced

**4 bugs found and fixed:**

| Bug | Severity | Fix |
|-----|----------|-----|
| BUG-001: dockside_confrontation missing nextSceneId | CRITICAL | Added `nextSceneId: 'vorreth_recruitment'`. Entire Act 1 content chain was unreachable. |
| BUG-002: exploration_coppervein wrong nextSceneId | HIGH | Removed `nextSceneId: 'vorreth_recruitment'`. Player was teleported to Tavven from Coppervein. |
| BUG-003: 16 speakers missing portrait mapping | MEDIUM | Added portrait mappings to images.ts with generic fallback portraits. |
| BUG-004: 11 characters missing names/accents | LOW | Added characterNames and characterAccents entries to DialogueCards.tsx. |

### Step 3: Story Quality Review (7 parallel agents)

**Prologue + Act 1** (10 specific beats flagged):
- Repeated closing inventory pattern (6 instances)
- Low player agency (75% watching)
- Recruitment formula repetition
- Best: Crew Argument (9.0/10), Dockside (8.3/10), Conquest Choice (9.0/10)

**Act 2-3** (18 beats flagged):
- 3 briefing scenes with identical structure (begin, blockade, council)
- Over-segmented beats across multiple scenes
- 3 single-option fake choices
- Protagonist hijack in gambit_07f
- Best: act3_vasshen (9/10), act3_final_council (9/10), epilogue (9/10)

**Exploration + Conquest** (12 exploration scenes, 12 conquest scenes reviewed):
- Average exploration score: 7.4/10
- Average conquest score: 6.9/10
- Economic conquest has zero player choices
- "Delvessa at stern rail" repeats 5 times
- One-line dialogue chains are the biggest UX friction point
- Island identities are distinct and well-realized (strongest achievement)

**Crew Events + Romance:**
- Overall 8/10. Strong voice distinctiveness (9/10)
- Romance arc: 8.5/10, well-paced

### Step 4: Systems Audit

**Combat System** (3 critical, 5 high, 7 medium bugs found):
- Missing dominion_sight damage scaling (FIXED)
- Tessurren infinite weaken stacks (FIXED, duration 99 -> 3)
- Missing heal_hp icon (FIXED)
- Exhausted enemy using slash animation (FIXED)
- State mutation in rollAccuracy/applyActionEffects (architecture risk, noted)
- Ironclad Phase 3 has no new actions (design observation)

**UI / Save / Ship** (3 critical, 5 high, 7 medium bugs found):
- PauseMenu slot 3 invisible to TitleScreen/TopBar (FIXED)
- ErrorBoundary didn't actually autosave on crash (FIXED)
- MapPanel Escape key conflict with pause menu (FIXED)
- Missing ambience volume slider in PauseMenu (noted, hook exists)
- Keyboard shortcuts bypass lockNavigation check (store guards it, low risk)

**Travel / Economy / Territory** (2 high, 8 medium bugs found):
- Template tokens never interpolated in passive events (FIXED)
- Travel event fail paths with no consequences (FIXED)
- Rebellion sets island to 'hostile' preventing reconquest (FIXED)
- advanceDay re-render thrash from multiple set() calls (known, complex)
- Empire strain morale death spiral at 8+ territories (balance observation)

### Step 5: Fixes Applied

**Combat Engine** (commit 64ae7b3):
- Added dominion_sight scaling to calculateDamage()
- Added heal_hp to getEffectIcon()
- Capped Tessurren weaken from duration 99 to 3
- Fixed exhausted enemy animation from 'slash' to 'block'

**UI** (commit 4eabc62):
- Aligned PauseMenu save slots [1,2] to match TopBar/TitleScreen
- Added stopPropagation to MapPanel Escape handler
- Interpolated template tokens in passive random event notifications
- ErrorBoundary now emergency-autosaves via Zustand getState()

**Travel/Territory** (commit abc4b94):
- Added failEffects to intimidate_boarders and outrun_sea_beast
- Changed rebellion island status from 'hostile' to 'discovered'

**Story** (commits da349a7, c1ea7a2):
- Converted protagonist hijack (gambit_07f) to player choice
- Removed empty beat blockade_05
- Trimmed council_07 recap paragraph
- Fixed conqueror_07 choice deflation
- Trimmed crisis_07 author commentary
- Trimmed a3_ending_02 island recap
- Fixed a3_ending_07 adjective pile
- Replaced repeated "crosses out a number" phrase
- Fixed em dash in epilogue title card
- Added ambush option to strike_04 single-option fake choice
- Fixed crisis_02 thesis statement

---

## REMAINING ISSUES (Not Fixed -- Require Director Decision)

### Story / Design Decisions

1. **Economic conquest has zero player choices.** This is a conquest scene where the player watches the crew do everything. Needs at minimum 2 choice points. Requires new prose.

2. **Sorrens conquest is 754 lines with 2 choices.** Player watches Delvessa negotiate for 80% of the scene. Needs 2-3 more choice points where Karyudon participates. Requires new prose.

3. **"Delvessa at stern rail at night" repeats 5 times** across Durrek, Sorrens, Mirrorwater, Anvil Cay, and Vess explorations. Replace at least 2 with different crew pairings or locations. Requires rewriting those beats.

4. **Mirrorwater (both exploration and conquest) has no conflict.** Two full scenes on one island with no antagonist, no obstacle, no tension. Needs an event or NPC who creates friction. Requires new content.

5. **One-line dialogue chains** (8-20 beats of single-sentence exchanges) are the game's biggest UX friction. Worst offenders: Coppervein exploration (8 beats), Windrow (10 beats), Sorrens conquest (20+ beats). Fix requires either consolidating beats or changing the dialogue rendering to not require a click per line.

6. **first_night scene has zero choices.** Add at least one decision point. Requires new choice content.

7. **Closing inventory pattern** ("X people, Y thing, no Z") appears in 6 scenes. Each instance should be varied.

8. **act1_intel briefing structure** -- round-table with no player choices until the conquest decision. Consider injecting micro-choices.

### Combat Balance

9. **King's Pressure is free** (0 stamina, 0 cooldown, permanent intimidate). Very powerful. Possibly intentional.

10. **Crew assists cost 0 stamina** with only cooldowns as limiters. 14 free actions available. Possibly intentional but dominant strategy.

11. **Ironclad Phase 3 has no new actions.** Mechanically hollow compared to other bosses.

12. **Expose debuff cap at -30 DEF** is silently exceeded with no UI feedback.

### Systems

13. **advanceDay fires 10-15 set() calls** causing re-render thrash. Known architectural issue. Would need batching or immer integration.

14. **Empire strain at 8+ territories** creates a morale death spiral that may be too punishing.

15. **85% event fire rate never scales down.** Late-game players see events nearly every day, which becomes exhausting.

16. **TopBar Pause button dispatches synthetic KeyboardEvent.** Fragile. Should be a direct function call.

### UX

17. **Shop tab disappears** on non-shop islands after unlock. Should show "No shop available" instead.

18. **Continue button loads by slot priority, not timestamp.** Counter-intuitive when manual save is more recent than autosave.

19. **No ambience volume slider** in PauseMenu settings. Hook supports it, UI is missing.

---

## ASSET REQUESTS

### Portraits Needed
The following generic portrait files are referenced but may not exist:
- `tavern_keeper_portrait.webp` (for bartender speaker)
- `bureaucrat_portrait.webp` (for chair_ruhl, consul_duval)
- `mine_worker_portrait.webp` (for hella_foreman)
- `unknown_portrait.webp` (for 10 minor NPCs)

The game handles missing portraits gracefully (no crash, just no image card). These are nice-to-have.

---

## FINAL VERDICT

**Build:** Clean. Zero errors.
**Prose quality:** High. Writing directive compliance is strong. Zero em dashes, zero Tier 1 kill list violations.
**Bugs fixed this session:** 15 (4 story chain, 4 combat, 4 UI, 3 travel/territory)
**Story beats edited:** 12 beats across 4 files
**Choices added:** 3 new player choices where none existed

The game's core is solid. The story is well-written with distinct character voices and meaningful choices. The combat system works but has balance observations worth reviewing. The biggest remaining issues are structural (one-line dialogue chains, passive conquest scenes, repetitive patterns) and would require new prose content to fix.
