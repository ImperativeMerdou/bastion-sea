# GODTIDE: Bastion Sea — Project Context

## What This Is
Browser-based island conquest game with an Oni protagonist (Karyudon). Interactive fiction + turn-based combat + territory management. Built as a single-page React app.

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS (custom theme with `ocean-*`, `crimson-*`, `gold-*`, `iron-*` color scales)
- Zustand for state management (`gameStore.ts`)
- Create React App (CRA) build system
- Webpack requires for image loading
- All images are `.webp` format in `src/assets/images-webp/`

## Project Structure

```
src/
├── components/
│   ├── Story/          # StoryPanel (dialogue/VN), CharacterCard, DialogueCards
│   ├── Combat/         # CombatPanel (turn-based combat)
│   ├── Management/     # Crew, Territory, Shop, Captain, Ship tabs
│   ├── Map/            # MapPanel, IslandDetail
│   ├── Travel/         # TravelPanel (sea travel encounters)
│   └── UI/             # TopBar, TitleScreen, PauseMenu, TutorialOverlay, etc.
├── store/
│   ├── gameStore.ts    # Main Zustand store (2,939 lines — monolith, needs slicing)
│   ├── combatActions.ts
│   ├── saveSystem.ts
│   └── storyActions.ts
├── systems/            # Game logic (combat, economy, territory, events, audio)
│   ├── combat.ts       # Combat engine (2,310 lines)
│   ├── dayActions.ts   # Day advancement logic (extracted from gameStore)
│   ├── territory.ts    # Island control and upgrades
│   ├── seaTravel.ts    # Travel encounters and navigation
│   ├── randomEvents.ts # Random event system
│   ├── audio.ts        # Audio manager
│   ├── stingers.ts     # Music stinger system
│   └── ambience.ts     # Ambient audio
├── data/
│   ├── story/          # All story scene data (prologue, acts, romance, etc.)
│   └── combat/         # Enemy encounters and boss definitions
├── types/              # TypeScript type definitions (game.ts, combat.ts)
├── constants/          # Balance numbers (balance.ts)
├── utils/              # Image loading (images.ts), helpers
├── hooks/              # Custom React hooks (useAudio, etc.)
└── assets/
    ├── images-webp/    # All game images (portraits, backgrounds, icons, UI chrome)
    └── expressions/    # Character expression variants
```

## Critical Files — Handle With Care

| File | Lines | Notes |
|------|-------|-------|
| `store/gameStore.ts` | ~2,939 | Central state. Monolith. Touch carefully. |
| `systems/combat.ts` | ~2,310 | Combat engine. Player actions, enemy AI, turn order. |
| `components/Combat/CombatPanel.tsx` | ~2,455 | Combat UI. Complex state management with timeouts. |
| `components/Story/StoryPanel.tsx` | ~740 | Dialogue/VN rendering. Recently refactored — working well. |
| `utils/images.ts` | | Image loading via webpack require(). Can add/fix asset paths. |
| `constants/balance.ts` | ~461 | All game balance numbers. |

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
- **Orren** (Khari, electric blue)
- **Vorreth** (Black Standard, grey)
- Plus NPCs: Pettha Koss, Vasshen, Kirin, Prime Khoss, etc.

## Combat System

Turn-based with stamina costs. Key concepts:
- `CombatAction` has `staminaCost`, `cooldown`, `damage`, `effects`
- Turn order based on speed stat
- Player has Iron/Sight/King Dominion ability trees
- Enemy AI in `executeEnemyTurn()` with personality-based strategy
- `processEndOfRound()` handles status effects, cooldown ticks, passive stamina regen
- Boss encounters have phase transitions

## Known Architecture Issues

1. `gameStore.ts` is 2,939 lines — partially extracted but still a monolith
2. `CombatPanel.tsx` is 2,455 lines — uses `trackedTimeout`/`safeTimeout` extensively, needs state guards
3. Multiple `set()` calls in day advancement cause re-render thrash
4. Some dead state fields may exist (`rivalState`, `recovering_from_defeat`)

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

Save system uses `localStorage` with keys `godtide_save_0` (autosave), `godtide_save_1`, `godtide_save_2`.
