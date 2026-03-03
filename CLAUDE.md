# GODTIDE: Bastion Sea — Project Context

## What This Is
Browser-based island conquest game with an Oni protagonist (Karyudon). Interactive fiction + turn-based combat + territory management. Built as a single-page React app.

## Tech Stack
- React 19.2.4 + TypeScript 4.9.5
- Tailwind CSS (custom theme with `ocean-*`, `crimson-*`, `gold-*`, `iron-*` color scales)
- Zustand 5.0.11 for state management
- Howler.js 2.2.4 (SFX + looping music)
- Framer Motion 12.34.0 (panel transitions, animations)
- Create React App (CRA) build system
- Webpack requires for image loading
- All images are `.webp` format in `src/assets/images-webp/`

## Project Structure

```
src/
├── components/
│   ├── Story/          # StoryPanel (dialogue/VN), CharacterCard, DialogueCards
│   ├── Combat/         # CombatPanel (turn-based combat)
│   ├── Management/     # Crew, Territory, Shop, Captain, Ship, Grimoire, Dashboard tabs
│   ├── Map/            # MapPanel, IslandDetail
│   ├── Travel/         # TravelPanel (sea travel encounters)
│   └── UI/             # TopBar, TitleScreen, PauseMenu, TutorialOverlay, NotificationCenter, etc.
├── store/
│   ├── gameStore.ts       # Main Zustand store (~2,475 lines — central monolith)
│   ├── combatActions.ts   # Combat state mutations (extracted)
│   ├── storyActions.ts    # Story state mutations (extracted)
│   ├── territoryActions.ts # Territory + counter-espionage actions (extracted)
│   ├── travelActions.ts   # Travel actions (extracted)
│   └── saveSystem.ts      # Save/load/validate (version 2 schema)
├── systems/            # Game logic (~25 files, ~10k lines total)
│   ├── combat.ts           # Combat engine (~2,380 lines): AI, turn order, damage, status effects
│   ├── dayActions.ts       # Day advancement logic — 10-phase pipeline, touch carefully
│   ├── territory.ts        # Island morale, upgrades, bonuses
│   ├── seaTravel.ts        # Travel encounters and navigation
│   ├── randomEvents.ts     # 81 random event definitions + rolling logic
│   ├── economy.ts          # Crew upkeep, trade route income/costs
│   ├── threat.ts           # Wardensea raid system, blockades, spy ops
│   ├── trade.ts            # Trade route economics
│   ├── dominion.ts         # XP → tier progression, promotion text
│   ├── korvaan.ts          # Korvaan transformation stages
│   ├── godfruit.ts         # Dragon fruit transformation, stat bonuses
│   ├── equipment.ts        # Equipment definitions + stat bonuses
│   ├── shipUpgrades.ts     # Ship upgrade definitions + DEFAULT_SHIP
│   ├── playerProfile.ts    # Archetype tracking: violent, diplomatic, greedy, merciful
│   ├── worldReactions.ts   # NPC reactions to player actions
│   ├── grimoireBroadcasts.ts # World commentary generation
│   ├── objectives.ts       # Meta-objectives for player guidance
│   ├── eventContext.ts     # Text interpolation for dynamic events
│   ├── wardenscale.ts      # Difficulty scaling based on player progress
│   ├── crewAdvisor.ts      # Crew recommendation system
│   ├── audio.ts            # SFX manager (21 sounds, Howler.js)
│   ├── music.ts            # Looping background music (8 tracks, crossfade)
│   ├── stingers.ts         # One-shot musical stingers (8 types)
│   ├── audioSettings.ts    # Audio settings persistence
│   └── ambience.ts         # Procedural soundscapes (Web Audio API)
├── data/
│   ├── story/          # 56 story beat files (prologue, acts, crew events, romance, etc.)
│   ├── combat/         # Enemy encounters and boss definitions
│   ├── mc.ts           # Karyudon initial state
│   ├── crew.ts         # 7 crew members initial state
│   ├── islands.ts      # 17 islands with routes, NPCs, resources
│   └── codex.ts        # Lore/bestiary definitions
├── types/              # TypeScript type definitions (game.ts, combat.ts)
├── constants/          # Balance numbers (balance.ts — all tunable values)
├── utils/              # Image loading (images.ts), formatting.ts
├── hooks/              # Custom React hooks (useAudio.ts manages all 4 audio systems)
└── assets/
    ├── images-webp/    # All game images (portraits, backgrounds, icons, UI chrome)
    └── expressions/    # Character expression variants
```

## Critical Files — Handle With Care

| File | Lines | Notes |
|------|-------|-------|
| `store/gameStore.ts` | ~2,600 | Central state. Monolith. Touch carefully. |
| `systems/combat.ts` | ~2,380 | Combat engine. Player actions, enemy AI, turn order. |
| `components/Combat/CombatPanel.tsx` | ~2,671 | Combat UI. Complex state management with timeouts. |
| `components/Story/StoryPanel.tsx` | ~740 | Dialogue/VN rendering. Working well. |
| `utils/images.ts` | | Image loading via webpack require(). Can add/fix asset paths. |
| `constants/balance.ts` | ~461 | All game balance numbers. Change here, affects all systems. |
| `systems/dayActions.ts` | | 10-phase pipeline run each day advance. Sequence matters. |

## Audio System (4 independent systems)
- `systems/audio.ts` — SFX manager (21 sound effects, Howler.js)
- `systems/music.ts` — Looping background music (8 tracks: title, adventure, cinematic, combat, tavern, suspense, dramatic, ambient). Crossfade transitions. `getMusicTrackForContext()` maps scene to track.
- `systems/stingers.ts` — One-shot musical stingers (8 types). Separate from music.
- `systems/ambience.ts` — Procedural soundscapes (Web Audio API, not Howler)
- `hooks/useAudio.ts` — React hook managing all 4 systems reactively
- PauseMenu has MASTER, EFFECTS, MUSIC volume sliders. Music slider controls music + stingers.

## Save System
- Version 2 schema, 62 persisted fields
- Save keys: slot 0 = `godtide_autosave` (every 5 days, silent), slots 1-2 = `godtide_save_1`, `godtide_save_2`
- `loadGame()` validates type + version, reconstructs scene from `sceneRegistry[currentSceneId]`
- **Warning:** no explicit migration logic between schema versions. Defensive defaults fill missing fields.
- **Warning:** if a saved scene ID is not in sceneRegistry at load time, currentScene becomes null silently.

## Day Advancement Pipeline
`advanceDay()` runs 10 phases in sequence. Do not reorder:
1. processDailyUpkeep — crew + territory costs
2. processTradeRoutes — income + blockade losses
3. processWardenThreat — raids, spy effects, bounty hunters
4. processCrewDuties — assignment bonuses, injury recovery
5. processTerritoryEvents — supply crisis, rebellion checks
6. buildEconomyReport — net income summary
7. processRandomEvents — event rolling + choice queuing
8. processWorldReactions — NPC reactions to player actions
9. processGrimoireBroadcasts — world commentary
10. processLossConditions + processStorySceneTriggers

## Image System

Images load from `src/assets/images-webp/` via webpack `require()` calls in `utils/images.ts`. The system:
- Caches loaded images
- Returns `null` gracefully for missing files
- Portraits: `getPortrait(characterId)` → loads `{characterId}.webp`
- Expressions: `getExpressionPortrait(characterId, expression)` → loads `expressions/{characterId}_{expression}.webp`
- Backgrounds: `getSceneBackground(beatId)` → loads `bg_{beatId}.webp`
- UI assets: `getUiAsset(key)` → loads from `ui/` subdirectory

**Rule: Every image-based UI feature MUST have a CSS-only fallback.** If the `.webp` doesn't exist, the game should look fine with just CSS.

## Character System

Main characters with portraits, accent colors, and expressions defined in `DialogueCards.tsx`:
- **Karyudon** (protagonist, Oni, crimson accent)
- **Delvessa** (Kolmari, ocean blue)
- **Dragghen** (Gorundai shipwright, green)
- **Suulen** (Morventhi, purple)
- **Kovesse** (Grimoire tech, amber)
- **Tessek** (Redtide swordsman, crimson)
- **Orren** (Khari, electric blue) — late-game arrival
- **Vorreth** (Black Standard, grey)
- Plus NPCs: Pettha Koss, Vasshen, Kirin, Prime Khoss, etc.

Speaker IDs in story beats must be lowercase (DialogueCards.tsx regex matching).

## Combat System

Turn-based with stamina costs. Key concepts:
- `CombatAction` has `staminaCost`, `cooldown`, `damage`, `effects`
- Turn order based on speed stat
- Player has Iron/Sight/King Dominion ability trees
- Enemy AI in `executeEnemyTurn()` with personality-based strategy (aggressive/defensive/tactical/berserker/support)
- `processEndOfRound()` handles status effects, cooldown ticks, passive stamina regen
- Boss encounters have phase transitions (HP thresholds unlock new action pools)
- Crew assists: each recruited crew member can assist in combat if loyalty ≥ 40
- King meter fills on actions; burst at 100 = AoE stun

## Known Architecture Issues

1. `gameStore.ts` (~2,600 lines) — partially extracted but still the central monolith
2. `CombatPanel.tsx` (~2,671 lines) — uses `trackedTimeout`/`safeTimeout` extensively, state guards required
3. Multiple `set()` calls in `advanceDay()` phases cause re-render thrash (known, partially mitigated by batching)
4. No save schema migration path — field additions between versions rely on defensive defaults only

## RULES

1. **You have full permission to modify ANY file in this project.** Story data, balance, images, components, systems, types, constants — everything. Do what the prompt says.
2. **Protect the prose.** When editing story beats, don't rewrite the actual dialogue/narration text unless the prompt specifically asks for prose changes. Adding speaker fields, splitting beats, adding expression tags — all fine. The words the player reads stay as written unless told otherwise.
3. **Always `npm run build`** after changes. Zero errors.
4. **Always `npx tsc --noEmit`** for TypeScript checks.
5. **Build after EACH tier/section**, not just at the end.
6. **If a fix breaks something, revert it** — don't stack patches on broken patches.

## Writing Standard

All prose in story data follows the "MERT AKHAN AI DIRECTIVE WRITING AI PROJECT OPUS" standard:
- No hype declarations, no resolution addiction, no comfort-seeking
- Anti-AI/anti-slop prose — match the moment, don't announce it
- Strip test: remove dramatic language, is the MOMENT still powerful?
- Earned silence: use pattern inversion once per major character, don't waste it
- No em dashes in prose (use periods, commas, colons, or double-hyphens)
- Full directive in `WRITING_DIRECTIVE.md`

## Style Preferences

The director (Mert) prefers:
- Direct, practical communication — no cushioning or hedging
- Structured outputs when presenting options or plans
- Warn if something is risky, propose alternatives
- No moral lecturing, no performative accountability
- Results-focused: does it work? Does it build? Does it play correctly?

## Build & Test

```bash
npm run build          # Must complete with zero errors
npx tsc --noEmit       # Must have zero TypeScript errors
npm start              # Dev server for testing
```
