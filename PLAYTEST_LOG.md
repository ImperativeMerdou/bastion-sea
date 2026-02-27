# PLAYTEST LOG - Act 1 Full Playthrough
**Date:** 2026-02-25
**Tester:** Claude QA Bot
**Build:** Post-SESSION_REPORT (typography + audio + speaker fixes)

---

## Bugs Found

### BUG-001: DialogueCards auto-detection swaps speaker labels in multi-speaker beats
- **Severity:** MEDIUM
- **Location:** DialogueCards.tsx auto-detection logic
- **Scenes affected:** dragghen_recruitment (beat dragghen_02), kovesse_recruitment (beat kovesse_02)
- **Description:** When a beat contains dialogue from multiple characters, the auto-detection algorithm assigns speaker labels incorrectly. In kovesse_02 (which has `speaker: 'kovesse'`), Kovesse's lines are labeled KARYUDON and Karyudon's response is labeled KOVESSE. Same pattern in dragghen_02 where Dragghen's dialogue gets the KARYUDON label.
- **Root cause:** The detection algorithm appears to match character names mentioned IN the text rather than identifying who is speaking. When Kovesse talks ABOUT Karyudon, her line gets labeled KARYUDON.
- **Impact:** Cosmetic. Text is still readable and context makes speakers clear, but labels are misleading.
- **Fix:** Investigate DialogueCards.tsx speaker detection logic. May need to rely on `speaker` field when set and disable auto-detection for multi-speaker beats.

---

## Playtest Progress

- [x] Title Screen
- [x] Prologue (prologue_escape) -- 16 beats, 1 combat, 2 choices. All clean.
- [x] First Night (first_night) -- 5 beats. Karyudon card, background transition. Clean.
- [x] Tavven Arrival (tavven_arrival) -- 3+ beats. Hella NPC card. Clean.
- [x] Dockside (dockside) -- merged into tavven_arrival. Hella choice (3 options). Clean.
- [x] Dragghen Recruitment (dragghen_recruitment) -- 11 beats, 1 choice. BUG-001 on beat 2.
- [ ] Kovesse Recruitment (kovesse_recruitment) -- BUG-001 on beat 2. In progress.
- [ ] Exploration Keldriss (exploration_keldriss / tessek_recruitment)
- [ ] Exploration Mossbreak (exploration_mossbreak)
- [ ] Suulen Recruitment (suulen_recruitment)
- [ ] Exploration Coppervein (exploration_coppervein)
- [ ] Orren Recruitment (orren_recruitment)
- [ ] Vorreth Recruitment (vorreth_recruitment)
- [ ] Crew Naming (crew_naming)
- [ ] Delvessa Recruitment (delvessa_recruitment)
- [ ] First Crew Dinner (first_crew_dinner)
- [ ] Crew Argument (crew_argument)
- [ ] Night Watch (night_watch)
- [ ] Act 1 Intel (act1_intel)
- [ ] Panel Testing (Map, Management, Combat)
- [ ] Edge Cases
