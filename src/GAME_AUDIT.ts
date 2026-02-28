// =============================================
// GODTIDE: BASTION SEA - COMPLETE GAME FLOW AUDIT
// =============================================
// Audit Date: 2026-02-28
// Auditor: Total Quality Directive pass
// =============================================

// ═══════════════════════════════════════════════
// 1. ENGINE UNDERSTANDING
// ═══════════════════════════════════════════════
//
// STATE CONTROLS:
// - currentScene: StoryScene | null — which story sequence is active
// - currentScene.currentBeat: number — which beat within the scene
// - gamePhase: 'prologue' | 'act1' | 'act2' | 'act3' | 'endgame'
// - activePanel: 'story' | 'map' | 'management' | 'combat'
// - flags: Record<string, boolean | number | string> — all game flags
//
// BEAT ADVANCEMENT:
// - advanceBeat() in storyActions.ts increments currentBeat
// - Skips beats where requireFlag is not met
// - At end of beats: fires onComplete effects, chains to nextSceneId
// - If nextSceneId points to empty scene (0 beats), skips it and chains further
// - Chain limit: 10 scenes deep (MISC.SCENE_CHAIN_LIMIT)
// - If no nextSceneId or chain exhausted: currentScene = null
//
// CHOICE HANDLING:
// - makeChoice() separates effects by type: scene, combat, normal
// - Normal effects applied first (flags, resources, loyalty, etc.)
// - Scene effects load a new scene via applyEffects()
// - Combat effects start a combat encounter via applyEffects()
// - If no scene/combat effects: just advances the beat
//
// SCENE TRANSITIONS:
// - applyEffects() handles 'scene' type: loads scene from sceneRegistry
// - applyEffects() handles 'combat' type: starts combat from combatRegistry
// - applyEffects() handles 'conquer' type: conquers island
// - applyEffects() handles 'phase' type: changes game phase
// - applyEffects() handles 'panel' type: switches active panel
//
// PANEL SWITCHING:
// - setActivePanel() checks lockNavigation on currentScene
// - If lockNavigation=true: blocks switching away from 'story'
// - App.tsx renders panel based on activePanel state
//
// DAY ADVANCEMENT:
// - advanceDay() processes: economy, territory, crew duties, morale,
//   threat, loss conditions, story scene triggers, random events
// - Story triggers fire via processStorySceneTriggers():
//   - rival_intro (3+ days after tavven_conquered)
//   - orren_arrived (2+ days after tavven_conquered)
//   - act2_begin (when central belt secured)
//   - act2 scene chain (evalTriggers)
//   - act3 scene chain (evalTriggers)
//   - kirin_arrival (6+ islands or day 40+)
//   - kirin_confrontation (3+ days after kirin arrival)
//   - prime_khoss_arrival (vasshen defeated + 8+ islands + day 60+)
//
// startGame():
// - Resets ALL state
// - Sets currentScene to prologueScene with currentBeat: 0
// - Sets gamePhase to 'prologue', activePanel to 'story'

// ═══════════════════════════════════════════════
// 2. COMPLETE STORY FLOW MAP
// ═══════════════════════════════════════════════
//
// MAIN PROLOGUE CHAIN (lockNavigation: true on all):
// ─────────────────────────────────────────────────
// prologue_escape (15 beats)
//   → first_night (5 beats)
//   → tavven_arrival (7 beats, sets flag: tavven_arrival_complete)
//   → dragghen_recruitment (10 beats, recruits: dragghen)
//   → kovesse_recruitment (10 beats, recruits: kovesse)
//   → dockside_confrontation (22 beats, sets: prologue_complete, phase: act1)
//   → *** BUG: NO nextSceneId! Chain breaks here! ***
//
// INTENDED CHAIN (after dockside):
// ─────────────────────────────────────────────────
//   → vorreth_recruitment (12 beats, recruits: vorreth)
//   → crew_identity (4 beats, sets: crew name & flag)
//   → delvessa_recruitment (9 beats, recruits: delvessa)
//   → first_crew_dinner (8 beats, sets: first_crew_dinner_complete)
//   → crew_argument (9 beats, sets: crew_argument_complete)
//   → night_watch (8 beats, sets: night_watch_complete, loyalty: dragghen +5)
//   → act1_intel (11 beats, safety-net recruits all crew)
//   → act1_intel_conquest (2 beats, CONQUEST APPROACH CHOICE)
//     → conquest_force / conquest_negotiation / conquest_economic / conquest_subversion
//     → conquest_aftermath
//
// SECOND BUG: exploration_coppervein incorrectly has
//   nextSceneId: 'vorreth_recruitment'
// This was supposed to be removed in commit 5ce34cc but was missed.
// Vorreth's recruitment scene is SET AT TAVVEN SHOAL (dry dock),
// not at Coppervein. The chain from Coppervein makes no narrative sense.
//
// EXPLORATION SCENES (Act 1+, triggered by map navigation):
// ─────────────────────────────────────────────────
// explore_keldriss → (no nextSceneId, standalone)
// explore_mossbreak → (no nextSceneId, standalone)
// explore_coppervein → *** BUG: nextSceneId: 'vorreth_recruitment' - WRONG ***
// explore_durrek_garrison → (no nextSceneId, standalone)
// explore_sorrens_flat → (no nextSceneId, standalone)
// explore_mirrorwater → (no nextSceneId, standalone)
// explore_anvil_cay → (no nextSceneId, standalone)
// explore_windrow → (no nextSceneId, standalone)
// explore_ghostlight_reef → (no nextSceneId, standalone)
// explore_vess_harbour → (no nextSceneId, standalone)
// explore_noon_island → (no nextSceneId, standalone)
// explore_rotstone → (no nextSceneId, standalone)
//
// CONQUEST SCENES (triggered by beginConquest):
// ─────────────────────────────────────────────────
// conquest_keldriss, conquest_mossbreak, conquest_coppervein,
// conquest_durrek_garrison, conquest_sorrens_flat, conquest_mirrorwater,
// conquest_anvil_cay, conquest_windrow, conquest_ghostlight_reef,
// conquest_vess_harbour, conquest_noon_island
//
// ACT 2 SCENE CHAIN (triggered by processStorySceneTriggers):
// ─────────────────────────────────────────────────
// act2_begin → act2_ultimatum → act2_conqueror_contact → act2_blockade
// → act2_crew_council → act2_first_strike → act2_territory_crisis
// → act2_southern_gambit
//
// ACT 3 SCENE CHAIN:
// ─────────────────────────────────────────────────
// act3_begin → act3_vasshen → act3_conqueror_gambit → act3_ironclad
// → act3_final_council → act3_ending
//
// PERSONAL ARCS:
// ─────────────────────────────────────────────────
// Kirin: kirin_arrival → kirin_confrontation →
//   (kirin_confrontation_alliance | kirin_confrontation_rivalry |
//    kirin_confrontation_emotional) → kirin_confrontation_end
//
// Prime Khoss: prime_khoss_arrival →
//   (prime_khoss_negotiate | prime_khoss_fight)
//
// Epilogue: epilogue_view_from_below
//
// ROMANCE: delvessa_romance_01 → 02 → 03 → 04
//
// CREW EVENTS: crew_delvessa_04, crew_dragghen_04, crew_kovesse_04,
//   crew_suulen_04, crew_tessek_04, crew_orren_04, crew_vorreth_04
//
// SPECIAL: dragon_fruit_activation, crew_identity, rival_intro

// ═══════════════════════════════════════════════
// 3. SPEAKER SYSTEM MAP
// ═══════════════════════════════════════════════
//
// RESOLUTION CHAIN:
// beat.speaker → speakerToCharacter[speaker] → characterNames → portrait file
//
// WORKING SPEAKERS (21 with full portrait chain):
// ✓ karyudon, delvessa, dragghen, suulen, kovesse, tessek, orren, vorreth
// ✓ pettha_koss, tessurren, hella, rukessa, iren_saltz, captain_drezh
// ✓ maavi, maren, tessavarra, vasshen, sable_venn, kirin, prime_khoss
//
// SPEAKERS WITH PORTRAIT BUT NO characterNames/characterAccents ENTRY:
// ~ maren_kade, captain_hull, kellan_gyre, moth_calaveras, brother_ossian
// ~ merrik_sevaine, the_orchid, vessel_ahn, echo_salis, forge_mother_tessik
// ~ rikkart
// (These work for portraits but show raw ID as name and default accent color)
//
// BROKEN SPEAKERS - NO PORTRAIT, NO MAPPING (16):
// ✗ bartender, brenn, chair_ruhl, consul_duval, courier
// ✗ drest, drest_pohn, elder_veshtari, fael, gharen
// ✗ hella_foreman, maeven, matriarch_sorren, ossa
// ✗ raider_officer, varrek_dockhand
// (These show no portrait, raw speaker ID as name, default accent)
//
// NOTE: The game handles missing portraits gracefully (no crash, just no image).
// The visual impact is: these beats show dialogue with no character portrait card.
// For named NPCs this is OK. For important characters, a portrait should be added
// or mapped to a generic portrait (unknown_portrait.webp, etc.)

// ═══════════════════════════════════════════════
// 4. CHOICE MAP (CRITICAL DECISIONS)
// ═══════════════════════════════════════════════
//
// PROLOGUE:
// prologue_combat: "Show them what Forged Iron feels like"
//   → triggers combat: prologue_brawl ✓ EXISTS
//
// prologue_choice_01: Escape approach (3 options)
//   → escape_direct: infamy +5, flag: escape_style='direct'
//   → escape_smart: reputation +3, flag: escape_style='patient'
//   → escape_free_others: reputation +5, flag: escape_style='liberator', freed_prisoners=true
//   Flags checked later: escape_style checked in conquest scenes ✓
//   freed_prisoners checked in some dialogue ✓
//   Assessment: MEANINGFUL - different conquest text based on style
//
// prologue_final_choice: Dragon Fruit decision (3 options)
//   → keep_fruit: reputation +5, intelligence +3, flag: dragon_fruit_decision='kept'
//   → bite_fruit: iron +15, infamy +8, bounty +5M, flag: dragon_fruit_eaten_early=true
//   → hide_fruit: sight +10, iron +5, flag: dragon_fruit_eaten_early=true
//   Flags checked later: dragon_fruit_decision gates dragon_fruit_activation scene ✓
//   dragon_fruit_eaten_early syncs MC.dragonFruitEaten state ✓
//   Assessment: MEANINGFUL - major gameplay/narrative divergence
//
// TAVVEN ARRIVAL:
// arrival_05: Food approach (3 options)
//   → Sets flag: arrival_approach (worker/bold/silent)
//   Flag checked later: referenced in some dialogue ✓
//   Assessment: FLAVOR - minimal mechanical impact, good character establishment
//
// RECRUITMENT SCENES (dragghen, kovesse, delvessa, vorreth):
//   Each has 3 recruitment approach options
//   → Primary impact: loyalty values for recruited crew
//   → Sets flags like dragghen_approach, kovesse_approach, etc.
//   Assessment: SOMEWHAT MEANINGFUL - loyalty differences are real but small
//
// CONQUEST APPROACH (act1_intel_conquest):
//   4 options: force, negotiation, economic, subversion
//   → Each triggers different conquest scene with different beats
//   → Sets conquest_approach flag used throughout Act 1-2
//   → Different world reactions fire based on approach
//   Assessment: HIGHLY MEANINGFUL - affects entire Act 1 narrative tone
//
// ACT 2 CHOICES:
//   All Act 2 choices affect flags, resources, loyalty, and gate Act 3 content
//   Assessment: MEANINGFUL - real strategic decisions with consequences
//
// ORPHAN FLAGS (set but never checked):
//   - arrival_approach: set in tavven_arrival, minimal downstream use
//   - first_dinner_toast: set in first_crew_dinner, never checked in later scenes
//   - argument_decision: set in crew_argument, never checked directly
//     (but loyalty changes from this choice cascade through the game)
//   Assessment: These are "flavor flags" that set character tone.
//     Not true orphans since the loyalty/reputation changes matter.

// ═══════════════════════════════════════════════
// 5. CRITICAL BUGS FOUND
// ═══════════════════════════════════════════════
//
// BUG-001 [CRITICAL]: Scene chain break after dockside_confrontation
//   File: src/data/story/dockside.ts
//   Issue: Missing nextSceneId. After dockside ends, currentScene = null.
//   Impact: Player dropped to "The sea waits" screen. Entire Tavven content
//     chain (vorreth, crew_identity, delvessa, crew_dinner, argument,
//     night_watch, act1_intel, conquest choice) is UNREACHABLE.
//   Fix: Add nextSceneId: 'vorreth_recruitment' to docksideScene.
//
// BUG-002 [HIGH]: exploration_coppervein has wrong nextSceneId
//   File: src/data/story/exploration_coppervein.ts
//   Issue: nextSceneId: 'vorreth_recruitment' - but Vorreth is at Tavven,
//     not Coppervein. This was supposed to be removed in commit 5ce34cc
//     but was missed. If player explores Coppervein, they get teleported
//     to Vorreth recruitment at Tavven, which makes no narrative sense.
//   Fix: Remove nextSceneId from exploration_coppervein.
//
// BUG-003 [MEDIUM]: 16 speakers have no speakerToCharacter mapping
//   Files: Various story files
//   Impact: No portrait card shown for these speakers. Name shows as raw ID.
//   Fix: Add mappings to speakerToCharacter in images.ts. Map to generic
//     portraits where specific portraits don't exist.
//
// BUG-004 [LOW]: 11 characters have portrait files but no characterNames
//   or characterAccents entries in DialogueCards.tsx
//   Impact: Name shows as raw ID with underscores replaced by spaces.
//     Accent color defaults to gold.
//   Fix: Add entries to characterNames and characterAccents.

// ═══════════════════════════════════════════════
// 6. CONTENT GAPS
// ═══════════════════════════════════════════════
//
// - explore_rotstone has no corresponding conquest scene
//   (Rotstone may be a non-conquerable location - verify intent)
// - Suulen and Tessek have no explicit recruitment scenes
//   (they are recruited via safety net in act1_intel onComplete)
//   This means the player meets them for the first time in the intel
//   briefing without any introduction. Consider adding recruitment scenes.
// - crew_events_new.ts exists but is not imported in gameStore.ts
//   (may contain unused/WIP content)

// ═══════════════════════════════════════════════
// END OF AUDIT
// ═══════════════════════════════════════════════
export {};
