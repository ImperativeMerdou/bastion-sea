# GODTIDE: BASTION SEA -- Complete Asset Requirements

> Generated from full codebase audit. Every reference cross-checked against disk.
> **Rule: Karyudon does NOT get expression variants. Default portrait only.**

---

## SECTION A: CHARACTER PORTRAITS

### A1. Main Cast (Portraits)

All portraits stored in `src/assets/images-webp/`. Referenced via `characterPortraits` map in `src/utils/images.ts`.

| Character ID | Filename | ON DISK | Used In |
|---|---|---|---|
| `karyudon` | `karyudon_portrait.webp` | YES | StoryPanel, CombatPanel, DayPlanner, shared.tsx |
| `karyudon_young` | `karyudon_portrait_young.webp` | YES | Early prologue scenes |
| `karyudon_captain` | `karyudon_portrait_captain.webp` | YES | Act 2/3 default (via getKaryudonPortrait) |
| `karyudon_captain_angry` | `karyudon_portrait_captain_angry.webp` | YES | Story beats with speaker detection |
| `karyudon_captain_armed` | `karyudon_portrait_captain_armed.webp` | YES | Story beats with speaker detection |
| `karyudon_captain_smirk` | `karyudon_portrait_captain_smirk.webp` | YES | Story beats with speaker detection |
| `karyudon_hybrid` | `karyudon_portrait_hybrid.webp` | YES | Post-Dragon Fruit (via getKaryudonPortrait) |
| `delvessa` | `delvessa_portrait.webp` | YES | DialogueCards, CrewTab, DayPlanner |
| `dragghen` | `dragghen_portrait.webp` | YES | DialogueCards, CrewTab, DayPlanner |
| `suulen` | `suulen_portrait.webp` | YES | DialogueCards, CrewTab, DayPlanner |
| `kovesse` | `kovesse_portrait.webp` | YES | DialogueCards, CrewTab, DayPlanner |
| `tessek` | `tessek_portrait.webp` | YES | DialogueCards, CrewTab, DayPlanner |
| `orren` | `orren_portrait.webp` | YES | DialogueCards, CrewTab, DayPlanner |
| `vorreth` | `vorreth_portrait.webp` | YES | DialogueCards, CrewTab, DayPlanner |

### A2. NPC Portraits

| Character ID | Filename | ON DISK | Used In |
|---|---|---|---|
| `pettha_koss` | `pettha_koss_portrait.webp` | YES | DialogueCards, IslandDetail |
| `tessurren` / `tessurren_dolch` | `tessurren_portrait.webp` | YES | DialogueCards |
| `hella` | `hella_portrait.webp` | YES | DialogueCards |
| `rukessa` | `rukessa_portrait.webp` | YES | DialogueCards |
| `iren_saltz` | `iren_saltz_portrait.webp` | YES | DialogueCards |
| `captain_drezh` | `captain_drezh_portrait.webp` | YES | DialogueCards |
| `maavi` | `maavi_portrait.webp` | YES | DialogueCards |
| `maren` | `maren_portrait.webp` | YES | DialogueCards |
| `tessavarra` | `tessavarra_portrait.webp` | YES | DialogueCards |
| `vasshen` | `vasshen_portrait.webp` | YES | DialogueCards |
| `sable_venn` | `sable_venn_portrait.webp` | YES | DialogueCards |
| `rikkart` | `rikkart_portrait.webp` | YES | DialogueCards |
| `kirin_akkan` / `kirin` | `kirin_akkan_portrait.webp` | YES | DialogueCards |
| `prime_khoss` | `prime_khoss_portrait.webp` | YES | DialogueCards |

### A3. Island Villain Portraits

| Character ID | Filename | ON DISK | Used In |
|---|---|---|---|
| `kellan_gyre` | `kellan_gyre_portrait.webp` | YES | DialogueCards, story beats |
| `moth_calaveras` | `moth_calaveras_portrait.webp` | YES | DialogueCards, story beats |
| `brother_ossian` | `brother_ossian_portrait.webp` | YES | DialogueCards, story beats |
| `merrik_sevaine` | `merrik_sevaine_portrait.webp` | YES | DialogueCards, story beats |
| `maren_kade` | `maren_kade_portrait.webp` | YES | DialogueCards, story beats |
| `captain_hull` | `captain_hull_portrait.webp` | YES | DialogueCards, story beats |
| `forge_mother_tessik` | `forge_mother_tessik_portrait.webp` | YES | DialogueCards, story beats |
| `the_orchid` | `the_orchid_portrait.webp` | YES | DialogueCards, story beats |
| `vessel_ahn` | `vessel_ahn_portrait.webp` | YES | DialogueCards, story beats |
| `echo_salis` | `echo_salis_portrait.webp` | YES | DialogueCards, story beats |

### A4. Generic NPC Portraits

| Character ID | Filename | ON DISK | Used In |
|---|---|---|---|
| `wardensea_officer` | `wardensea_officer_portrait.webp` | YES | Story scenes, generic NPCs |
| `wardensea_commander` | `wardensea_commander_portrait.webp` | YES | Story scenes |
| `thalessi_officer` | `thalessi_officer_portrait.webp` | YES | Story scenes |
| `mine_worker` | `mine_worker_portrait.webp` | YES | Story scenes |
| `bureaucrat` | `bureaucrat_portrait.webp` | YES | Story scenes |
| `tavern_keeper` | `tavern_keeper_portrait.webp` | YES | Story scenes |
| `unknown` | `unknown_portrait.webp` | YES | Fallback for unrecognized speakers |

### A5. Enemy Combat Portraits

| Filename | ON DISK | Referenced in Code |
|---|---|---|
| `generic_pirate.webp` | YES | CombatPanel fallback portrait |
| `enemy_dock_thug.webp` | YES | **NOT REFERENCED** (orphaned) |
| `enemy_keldriss_smuggler.webp` | YES | **NOT REFERENCED** (orphaned) |
| `enemy_kolmari_enforcer.webp` | YES | **NOT REFERENCED** (orphaned) |
| `enemy_wardenscale.webp` | YES | **NOT REFERENCED** (orphaned) |
| `enemy_wardensea_officer.webp` | YES | **NOT REFERENCED** (orphaned) |
| `enemy_wardensea_soldier.webp` | YES | **NOT REFERENCED** (orphaned) |

> **Note:** The 6 enemy_ portraits exist on disk but are never loaded by any code path. CombatPanel uses `getPortrait(enemy.id)` which looks up `characterPortraits`, and these enemy_ filenames are not in that map. They could be wired up if enemy encounter templates reference matching IDs.

### A6. Expression Portraits

Stored in `src/assets/images-webp/expressions/`. 8 expressions per character: `angry`, `grim`, `happy`, `satisfaction`, `shock`, `fear`, `awe`, `asleep`.

| Character | Files on Disk | Status |
|---|---|---|
| `dragghen` | All 8 (angry/asleep/awe/fear/grim/happy/satisfaction/shock) | COMPLETE |
| `orren` | All 8 | COMPLETE |
| `suulen` | All 8 | COMPLETE |
| `tessek` | All 8 | COMPLETE |
| `karyudon` | 8 files present (angry/asleep/grim/satisfaction + angry_new/grim_new/happy/neutral) | **REMOVE FROM EXPRESSION_CHARACTERS** (per directive: Karyudon uses default portrait only) |
| `delvessa` | **NONE** | **MISSING -- 8 files needed** |
| `kovesse` | **NONE** | **MISSING -- 8 files needed** |

**Expression files needed (16 total):**
```
expressions/delvessa_angry.webp
expressions/delvessa_grim.webp
expressions/delvessa_happy.webp
expressions/delvessa_satisfaction.webp
expressions/delvessa_shock.webp
expressions/delvessa_fear.webp
expressions/delvessa_awe.webp
expressions/delvessa_asleep.webp
expressions/kovesse_angry.webp
expressions/kovesse_grim.webp
expressions/kovesse_happy.webp
expressions/kovesse_satisfaction.webp
expressions/kovesse_shock.webp
expressions/kovesse_fear.webp
expressions/kovesse_awe.webp
expressions/kovesse_asleep.webp
```

### A7. Miscellaneous Character Assets

| Filename | ON DISK | Referenced | Notes |
|---|---|---|---|
| `kovesse_portrait_alt.webp` | YES | NO | Orphaned alternate portrait |
| `dragon_fruit.webp` | YES | YES | CaptainTab (Dragon Fruit display) |
| `bounty_poster_bg.webp` | YES | YES | CaptainTab (bounty poster background) |

---

## SECTION B: BACKGROUND IMAGES

### B1. Scene Backgrounds

All mapped in `sceneBackgrounds` in `src/utils/images.ts`. Used by `getSceneBackground(beatId)` in StoryPanel.

| Filename | ON DISK | # Beats Using It | Scenes |
|---|---|---|---|
| `scene_prison_hold.webp` | YES | 6 | Prologue (01-05, prologue_combat) |
| `scene_transport_battle.webp` | YES | 10 | Prologue (06-12, choices, escape) |
| `scene_tavven_shoal.webp` | YES | 25+ | Arrival, intel, rival, conquest, aftermath |
| `scene_fish_market.webp` | **NO** | **15+** | **Arrival (04-07), dock, intel, identity** |
| `scene_kolmari_confrontation.webp` | YES | 8 | Dock confrontation, economic conquest |
| `scene_crew_gathering.webp` | YES | 10 | Intel, force/negotiation/economic/subversion conquest |
| `scene_harbor_board.webp` | YES | 12 | Force/negotiation/economic/subversion conquest |
| `scene_keldriss.webp` | YES | 5 | Keldriss exploration + conquest |
| `scene_keldriss_market.webp` | YES | 3 | Keldriss exploration + conquest |
| `scene_mossbreak.webp` | YES | 4 | Mossbreak exploration + conquest |
| `scene_swamp_dock.webp` | YES | 2 | Mossbreak exploration |
| `scene_coppervein.webp` | YES | 6 | Coppervein exploration + conquest |
| `scene_coppervein_voting_hall.webp` | YES | 3 | Coppervein conquest |
| `scene_mossbreak_tavern.webp` | YES | 3 | Mossbreak conquest |
| `scene_sorrens_flat.webp` | YES | 4 | Sorren's Flat exploration + conquest |
| `scene_sorrens_market.webp` | YES | 5 | Sorren's Flat exploration + conquest |
| `scene_sorrens_flat_night.webp` | YES | 1 | Sorren's conquest ending |
| `scene_mirrorwater.webp` | YES | 5 | Mirrorwater exploration + conquest |
| `scene_mirrorwater_night.webp` | YES | 3 | Mirrorwater exploration + conquest |
| `scene_anvil_cay.webp` | YES | 4 | Anvil Cay exploration + conquest |
| `scene_anvil_cay_shipyard.webp` | YES | 3 | Anvil Cay exploration + conquest |
| `scene_anvil_cay_night.webp` | YES | 3 | Anvil Cay exploration + conquest |
| `scene_windrow.webp` | YES | 8 | Windrow exploration + conquest |
| `scene_windrow_cliffs.webp` | YES | 1 | Windrow conquest |
| `scene_ghostlight_reef.webp` | YES | 5 | Ghostlight exploration + conquest |
| `scene_ghostlight_reef_night.webp` | YES | 5 | Ghostlight exploration + conquest |
| `scene_vess_harbour.webp` | YES | 6 | Vess Harbour exploration + conquest |
| `scene_vess_harbour_assault.webp` | YES | 3 | Vess Harbour conquest |
| `scene_vess_harbour_sunset.webp` | YES | 1 | Vess Harbour conquest ending |
| `scene_noon_island.webp` | YES | 9 | Noon Island exploration + conquest |
| `scene_rotstone_approach.webp` | YES | 9 | Rotstone exploration |
| `scene_durrek_garrison.webp` | **NO** | **4** | **Durrek exploration + conquest aftermath** |
| `scene_durrek_assault.webp` | **NO** | **3** | **Durrek assault scenes** |
| `scene_tavern_night.webp` | YES | 13 | Crew events (Delvessa), Kirin confrontation |
| `scene_dock_rain.webp` | YES | 3 | Crew events (Delvessa) |
| `scene_ship_galley.webp` | YES | 3 | Crew events (Dragghen) |
| `scene_ship_deck_storm.webp` | YES | 9 | Crew events (Kovesse), act2 gambit |
| `scene_ocean_night_glow.webp` | YES | 5 | Crew events (Suulen), Delvessa romance |
| `scene_rooftop_night.webp` | YES | 3 | Crew events (Suulen) |
| `scene_ship_deck.webp` | YES | 14 | Crew events, epilogue, dragon fruit |
| `scene_captains_cabin.webp` | YES | 22 | Council, ultimatum, crew events, romance, epilogue |
| `scene_ship_cabin.webp` | YES | 4 | Sorren's, Anvil, dragon fruit, Vess conquest |
| `scene_war_room.webp` | YES | 14 | Act 2 begin, crisis, Act 3 begin |
| `scene_ship_night.webp` | YES | 10 | Conqueror contact, Act 3 Vasshen |
| `scene_conqueror_overlook.webp` | YES | 10 | Conqueror contact, Act 3 conqueror, ironclad |
| `scene_wardensea_fleet.webp` | YES | 3 | Blockade, Prime Khoss |
| `scene_fleet_surrounded.webp` | YES | 5 | Blockade, Prime Khoss, Act 3 ironclad |
| `scene_naval_battle.webp` | YES | 4 | Blockade |
| `scene_harbor_siege.webp` | YES | 8 | First Strike, Act 3 ironclad |
| `scene_ship_storm_battle.webp` | YES | 2 | Ultimatum |
| `scene_dock_night.webp` | YES | 11 | Kirin arrival |
| `scene_wardensea_blockade.webp` | YES | 8 | Prime Khoss |
| `scene_cabin_invasion.webp` | YES | 1 | Prime Khoss |
| `scene_dragon_transform.webp` | **NO** | **5** | **Dragon Fruit activation (critical scene)** |
| `scene_kings_pressure.webp` | YES | 1 | King's Pressure awakening |
| `scene_archipelago_vista.webp` | YES | 9 | Act 3 ending + epilogue title card |

**MISSING SCENE BACKGROUNDS (4 files):**
```
scene_fish_market.webp          -- 15+ story beats (CRITICAL: most-used missing bg)
scene_durrek_garrison.webp      -- 4 beats (Durrek exploration + conquest)
scene_durrek_assault.webp       -- 3 beats (Durrek assault sequence)
scene_dragon_transform.webp     -- 5 beats (Dragon Fruit activation, pivotal scene)
```

### B2. Combat Backgrounds

Mapped in `combatBackgrounds` in `src/utils/images.ts`. Used by `getCombatBackground(enemyId)`.

| Filename | ON DISK | Enemy Types |
|---|---|---|
| `combat_bg_default.webp` | YES | Default fallback for all combats |
| `combat_wardensea_duel.webp` | YES | wardensea, wardensea_officer/soldier, wardenscale, kolmari_enforcer, prime_khoss |
| `combat_kings_pressure.webp` | YES | kings_pressure (Dominion ability) |
| `combat_delvessa_spar.webp` | YES | delvessa_spar |
| `combat_coppervein_hall.webp` | YES | coppervein_dispute, gorundai_miner/foreman, copperhand_officer |
| `combat_shadow_market.webp` | YES | keldriss_smuggler/cutthroat/ambush |
| `combat_iron_unleash.webp` | YES | kirin_akkan, kirin (boss fight) |

All combat backgrounds present. No missing files.

### B3. Victory/Game Over Backgrounds

| Filename | ON DISK | Used In |
|---|---|---|
| `victory_conqueror.webp` | **NO** | VictoryScreen (conqueror ending) |
| `victory_pragmatist.webp` | **NO** | VictoryScreen (pragmatist ending) |
| `victory_liberator.webp` | **NO** | VictoryScreen (liberator ending) |
| `game_over_starvation.webp` | **NO** | GameOverScreen (starvation death) |
| `game_over_mutiny.webp` | **NO** | GameOverScreen (crew mutiny death) |
| `game_over_defeat.webp` | **NO** | GameOverScreen (total defeat death) |
| `game_over_territory.webp` | **NO** | GameOverScreen (territory lost death) |

**All 7 missing.** Code has graceful CSS fallbacks, game works without them.

### B4. Other Background Assets

| Filename | ON DISK | Referenced | Notes |
|---|---|---|---|
| `title_bg.webp` | YES | YES | TitleScreen fallback background |
| `title_bg_alt.webp` | YES | YES | TitleScreen primary background (Karyudon fleet scene) |
| `map_bg.webp` | YES | YES | MapPanel ocean map background |
| `stormy_sunset.webp` | YES | NO | **Orphaned** |
| `scene_crew_battle.webp` | YES | NO | **Orphaned** |
| `scene_ship_storm.webp` | YES | NO | **Orphaned** |
| `scene_shipwreck_sunset.webp` | YES | NO | **Orphaned** |
| `title_banner.webp` | YES | NO | **Orphaned** |

---

## SECTION C: MAP ASSETS

### C1. Map Background

| Asset | Filename | ON DISK | Component |
|---|---|---|---|
| Map ocean background | `map_bg.webp` | YES | MapPanel |

### C2. Compass

| Asset | Filename | ON DISK | Component |
|---|---|---|---|
| Compass rose | `ui/compass_rose.webp` | YES | MapPanel (120s rotation animation) |
| Compass ring | `ui/compass_ring.webp` | YES | MapPanel (static frame) |

### C3. Island Markers

Islands are rendered as CSS-only circles with status colors (Tailwind classes). No island marker images exist or are referenced. Each island is a styled `<div>` with:
- Amber glow for controlled islands (`glow-amber` class)
- Green/amber/red borders for status
- Focus ring for keyboard navigation

**No island marker images needed** unless the creative director wants to replace CSS circles with custom markers.

### C4. Route Lines

Routes between islands are rendered as SVG `<line>` elements with dashed strokes. Color-coded by danger level:
- Safe: green stroke
- Moderate: amber stroke
- Dangerous: crimson stroke
- Deadly: red stroke

No image assets used for routes.

### C5. Zone Labels

Zone labels (NORTHERN ARC, CENTRAL BELT, SOUTHERN REACH) are pure CSS text overlays. No image assets.

---

## SECTION D: UI ASSETS AND STYLING

### D1. UI Chrome Images

Stored in `src/assets/images-webp/ui/`. Mapped in `uiAssets` in `src/utils/images.ts`.

| Asset Key | Filename | ON DISK | Used In |
|---|---|---|---|
| `card_frame` | `ui/card_frame.webp` | YES | CharacterCard (dialogue mode) |
| `card_frame_active` | `ui/card_frame_active.webp` | YES | CharacterCard (active speaker) |
| `card_frame_combat` | `ui/card_frame_combat.webp` | YES | CombatPanel (player portrait frame) |
| `nameplate` | `ui/nameplate.webp` | YES | CharacterCard (name banner) |
| `dialogue_frame` | `ui/dialogue_frame.webp` | YES | StoryPanel (decorative separator, 15% opacity) |
| `dialogue_box_frame` | `ui/dialogue_box_frame.webp` | YES | StoryPanel (dialogue box overlay, multiply blend 35%) |
| `corner_ornament` | `ui/corner_ornament.webp` | YES | Source sprite sheet (not directly used) |
| `corner_tl/tr/bl/br` | `ui/corner_*.webp` | YES | PanelFrame (100px, 40% opacity) |
| `divider` | `ui/divider.webp` | YES | Divider component |
| `border_strips` | `ui/border_strips.webp` | YES | Mapped but no direct use found |
| `compass_rose` | `ui/compass_rose.webp` | YES | MapPanel |
| `compass_ring` | `ui/compass_ring.webp` | YES | MapPanel |
| `combat_hex_frame` | `ui/combat_hex_frame.webp` | YES | CombatPanel (enemy portrait hex frame) |
| `panel_texture_story` | `ui/texture_parchment.webp` | **NO** | TextureOverlay (story panel texture, 4% opacity) |
| `panel_texture_combat` | `ui/texture_iron.webp` | **NO** | TextureOverlay (combat panel texture, 4% opacity) |
| `panel_texture_management` | `ui/texture_wood.webp` | **NO** | TextureOverlay (management panel texture, 4% opacity) |

**MISSING UI ASSETS (3 files):**
```
ui/texture_parchment.webp   -- Story panel subtle overlay
ui/texture_iron.webp        -- Combat panel subtle overlay
ui/texture_wood.webp        -- Management panel subtle overlay
```

### D2. Game Icons

Stored in `src/assets/images-webp/`. Mapped in `gameIcons` in `src/utils/images.ts`. Used by `GameIcon` component.

| Icon Key | Filename | ON DISK | Category |
|---|---|---|---|
| `sovereignty` | `icon_sovereignty.webp` | YES | Resource |
| `supplies` | `icon_supplies.webp` | YES | Resource |
| `materials` | `icon_materials.webp` | YES | Resource |
| `intelligence` | `icon_intelligence.webp` | YES | Resource |
| `potion` | `icon_potion.webp` | YES | Resource |
| `iron` | `icon_iron.webp` | YES | Dominion |
| `sight` | `icon_sight.webp` | YES | Dominion |
| `king` | `icon_king.webp` | YES | Dominion |
| `dragon_eye` | `icon_dragon_eye.webp` | YES | Dominion |
| `bleed` | `icon_bleed.webp` | YES | Combat Effect |
| `shield` | `icon_shield.webp` | YES | Combat Effect |
| `dodge` | `icon_dodge.webp` | YES | Combat Effect |
| `heal` | `icon_heal.webp` | YES | Combat Effect |
| `expose` | `icon_expose.webp` | YES | Combat Effect |
| `thunder` | `icon_thunder.webp` | YES | Combat Effect |
| `precision` | `icon_precision.webp` | YES | Combat Effect |
| `iron_attack` | `icon_iron_attack.webp` | YES | Combat Stance |
| `iron_defense` | `icon_iron_defense.webp` | YES | Combat Stance |
| `sight_defense` | `icon_sight_defense.webp` | YES | Combat Stance |
| `weapon_basic` | `icon_weapon_basic.webp` | YES | Weapon |
| `weapon_upgraded` | `icon_weapon_upgraded.webp` | YES | Weapon |
| `combat_attack` | `icon_combat_attack.webp` | YES | Combat Category |
| `combat_defend` | `icon_combat_defend.webp` | YES | Combat Category |
| `combat_crew` | `icon_combat_crew.webp` | YES | Combat Category |
| `iron_fist` | `icon_iron_fist.webp` | YES | Alt Style |
| `shield_energy` | `icon_shield_energy.webp` | YES | Alt Style |
| `crew_ghost` | `icon_crew_ghost.webp` | YES | Alt Style |

All 27 icons present. No missing files.

### D3. Flag Images

| Flag Design | Filename | ON DISK |
|---|---|---|
| `crossed_horns` | `flag_crossed_horns.webp` | YES |
| `dragon_anchor` | `flag_dragon_anchor.webp` | YES |
| `spike_wave` | `flag_spike_wave.webp` | YES |

All 3 flags present.

### D4. Logo and Branding

| Asset | Filename | ON DISK | Used In |
|---|---|---|---|
| Game logo | `logo_godtide.webp` | YES | TitleScreen (main logo, max 1120px wide) |
| Small icon | `icon_godtide.webp` | YES | TopBar, PauseMenu |
| Grimoire frame | `grimoire_frame.webp` | YES | GrimoireTab (10% opacity background) |

### D5. Fonts

Defined in `tailwind.config.js`:

| Font Class | Stack | Used For |
|---|---|---|
| `font-display` | Georgia, Times New Roman, serif | Scene titles, character names, headers, UI labels |
| `font-body` | Segoe UI, system-ui, -apple-system, sans-serif | Story dialogue, descriptions, body text |
| `font-mono` | Consolas, Monaco, monospace | Stats, numbers, HP bars, resource counts |

All system fonts. No custom font files needed. If the creative director wants custom fonts (e.g., a pirate/fantasy display font), they would be added to `tailwind.config.js` and loaded via `@font-face` in `index.css`.

### D6. Color Palette

Defined in `tailwind.config.js`. All CSS-only, no image assets.

| Scale | Representative Color | Usage |
|---|---|---|
| `ocean-*` (50-950) | #0a0e1a to #c4d9ef | Primary UI: backgrounds, text, borders |
| `crimson-*` (50-950) | Deep reds | Danger, damage, Karyudon accent, Iron dominion |
| `amber-*` (50-950) | #f59e0b family | Warnings, gold, Kovesse accent, focus rings |
| `iron-*` (50-950) | Greys | Neutral UI, Vorreth accent |
| `gold-*` (300-500) | #c9a84c to #e0c96d | Premium highlights |

Character accent colors (from DialogueCards.tsx):
| Character | Accent Color (RGBA) |
|---|---|
| Karyudon | `rgba(220, 38, 38, 0.5)` (crimson) |
| Delvessa | `rgba(59, 130, 246, 0.5)` (ocean blue) |
| Dragghen | `rgba(34, 197, 94, 0.5)` (green) |
| Suulen | `rgba(168, 85, 247, 0.5)` (purple) |
| Kovesse | `rgba(245, 158, 11, 0.5)` (amber) |
| Tessek | `rgba(239, 68, 68, 0.5)` (crimson) |
| Orren | `rgba(56, 189, 248, 0.5)` (electric blue) |
| Vorreth | `rgba(156, 163, 175, 0.5)` (grey) |
| Pettha Koss | `rgba(34, 197, 94, 0.5)` (green) |
| Kirin | `rgba(251, 191, 36, 0.5)` (gold) |
| Prime Khoss | `rgba(100, 116, 139, 0.5)` (slate) |
| Vasshen | `rgba(168, 85, 247, 0.5)` (purple) |
| Most NPCs | `rgba(148, 163, 184, 0.5)` (slate-300) |

---

## SECTION E: AUDIO -- MUSIC

**Music has been intentionally removed.** The `audioManager.playTrack()` and `audioManager.stopTrack()` methods are no-op stubs. The music system was replaced by:
1. **Procedural ambience** (Web Audio API synthesis, no files)
2. **Musical stingers** (one-shot 3-15 second pieces)

There are no music track files. No music tracks are needed. This is a design decision, not a gap.

---

## SECTION F: AUDIO -- SOUND EFFECTS

All SFX stored in `/public/audio/`. Loaded via Howler.js in `src/systems/audio.ts`.

### F1. SFX Inventory

| SFX ID | Filename | ON DISK | Trigger Location |
|---|---|---|---|
| `click` | `sfx_click.mp3` | YES | TitleScreen buttons, PauseMenu, CombatPanel, general UI clicks |
| `choice_select` | `sfx_choice.mp3` | YES | StoryPanel choice selection, DayPlanner choices |
| `notification` | `sfx_notification.mp3` | YES | NotificationToast on new notification |
| `day_advance` | `sfx_day_advance.mp3` | YES | Day advancement (advanceDay) |
| `conquest_begin` | `sfx_conquest.mp3` | YES | TitleScreen "New Game", conquest start |
| `travel_depart` | `sfx_travel.mp3` | YES | TravelPanel when travel begins |
| `text_advance` | `sfx_text.mp3` | YES | StoryPanel click-to-advance, DailyReportModal, WorldIntro |
| `combat_hit` | `sfx_hit.wav` | YES | CombatPanel: iron_pulse, screen_shake animations |
| `combat_sword` | `sfx_sword.wav` | YES | CombatPanel: slash, counter animations |
| `combat_heavy` | `sfx_heavy_hit.wav` | YES | CombatPanel: heavy_smash, thunder_strike, boss transitions |
| `combat_crew_assist` | `sfx_crew_assist.mp3` | YES | CombatPanel: crew assist activation |
| `combat_victory` | `sfx_victory.mp3` | YES | CombatPanel: victory end phase |
| `combat_defeat` | `sfx_defeat.mp3` | YES | CombatPanel: defeat end phase |
| `purchase` | `sfx_choice.mp3` | YES | ShopTab: item purchase (reuses choice SFX) |
| `sell` | `sfx_click.mp3` | YES | ShopTab: item sell (reuses click SFX) |
| `upgrade_complete` | `sfx_victory.mp3` | YES | Upgrade completion (reuses victory SFX) |
| `level_up` | `sfx_victory.mp3` | YES | Level up (reuses victory SFX) |
| `warning` | `sfx_notification.mp3` | YES | Warning events (reuses notification SFX) |
| `error` | `sfx_defeat.mp3` | YES | Error events (reuses defeat SFX) |
| `objective_complete` | `sfx_conquest.mp3` | YES | Objective completion (reuses conquest SFX) |

**All 13 unique SFX files present.** 19 SFX IDs mapped to 13 unique files (6 reuse existing files).

### F2. Extra Audio Files (Not Referenced)

| Filename | ON DISK | Status |
|---|---|---|
| `custom lightning attack.wav` | YES | **Orphaned** (not in sfxSources) |

> Could be wired as a dedicated `combat_lightning` or `thunder_strike` SFX instead of reusing `sfx_heavy_hit.wav`.

---

## SECTION G: AUDIO -- STINGERS

Musical stingers are one-shot 3-15 second pieces that play at key narrative moments. Defined in `src/systems/stingers.ts`. Each tries mp3 first, then wav.

### G1. Stinger Inventory

| Stinger ID | Primary File | Fallback | ON DISK | Trigger |
|---|---|---|---|---|
| `title_intro` | `stinger_title.mp3` | `stinger_title.wav` | **wav only** | TitleScreen mount (plays once) |
| `conquest_victory` | `stinger_conquest_victory.mp3` | `stinger_conquest_victory.wav` | **NO** | conquerIsland() in gameStore |
| `boss_intro` | `stinger_boss_intro.mp3` | `stinger_boss_intro.wav` | **NO** | startCombatEncounter() for boss fights |
| `story_revelation` | `stinger_revelation.mp3` | `stinger_revelation.wav` | **NO** | StoryPanel when beat.stinger = 'story_revelation' |
| `act_transition` | `stinger_act_transition.mp3` | `stinger_act_transition.wav` | **NO** | setGamePhase('act2') or setGamePhase('act3') |
| `crew_join` | `stinger_crew_join.mp3` | `stinger_crew_join.wav` | **NO** | recruitMember() in gameStore |
| `character_death` | `stinger_character_death.mp3` | `stinger_character_death.wav` | **NO** | updateCrewMember(alive=false) |
| `grimoire_ping` | `stinger_grimoire_ping.mp3` | `stinger_grimoire_ping.wav` | **wav only** | Grimoire broadcast generation in advanceDay |

**Summary: 2 of 8 stingers have audio files. 6 are missing.**

**Missing stinger files (6):**
```
/public/audio/stinger_conquest_victory.mp3  (or .wav)
/public/audio/stinger_boss_intro.mp3        (or .wav)
/public/audio/stinger_revelation.mp3        (or .wav)
/public/audio/stinger_act_transition.mp3    (or .wav)
/public/audio/stinger_crew_join.mp3         (or .wav)
/public/audio/stinger_character_death.mp3   (or .wav)
```

### G2. Story Beat Stinger Tags

These story beats have `stinger: 'story_revelation'` set:
- `dragon_fruit_02` -- Dragon Fruit bite moment
- `kirin_03` -- Kirin brother reveal
- `kconf_03` -- Twins hostage
- `pkhoss_01` -- Prime Khoss fleet arrival
- `a3_ironclad_01` -- Kolmari Ironclad

The `act_transition` stinger fires on epilogue title card (`ep_title_card`).

---

## SECTION H: AMBIENCE

The ambience system is **fully procedural** using the Web Audio API. Defined in `src/systems/ambience.ts`. **No audio files are needed.**

### H1. Ambience Types

| Type | Layers | When Active |
|---|---|---|
| `ocean` | Filtered noise waves + gentle wind | Map panel, story (default) |
| `storm` | Ocean waves + heavy wind + rain | Story scenes with storm/battle/raid keywords |
| `tavern` | Low murmur noise + fireplace crackle | Management panel, story scenes with tavern/dock/tavven |
| `combat` | Low tension drone + heartbeat pulse + metallic shimmer | Normal combat |
| `combat_boss` | Deeper drone + dissonant tension + faster heartbeat | Boss fights (enemies with bossPhases) |
| `voyage` | Deep ocean hum + ocean waves + wind | Sea travel (travelState active) |
| `title` | Harmonic sine pad (A2-E4) + gentle ocean undertone | Title screen (game not started) |
| `silence` | Nothing | Explicitly silenced |

All ambience is synthesized at runtime. Crossfade: 1.5s fade-out, 2s fade-in. Context-aware via `getAmbienceForContext()` in `src/hooks/useAudio.ts`.

---

## SECTION I: ORPHANED ASSETS

Files on disk that are not referenced by any code path.

### I1. Orphaned Images

| Filename | Location | Probable Intent |
|---|---|---|
| `stormy_sunset.webp` | images-webp/ | Unused background |
| `scene_crew_battle.webp` | images-webp/ | Unused scene background |
| `scene_ship_storm.webp` | images-webp/ | Unused scene background |
| `scene_shipwreck_sunset.webp` | images-webp/ | Unused scene background |
| `title_banner.webp` | images-webp/ | Unused title element |
| `kovesse_portrait_alt.webp` | images-webp/ | Alternate Kovesse portrait |
| `enemy_dock_thug.webp` | images-webp/ | Could wire to combat enemy portraits |
| `enemy_keldriss_smuggler.webp` | images-webp/ | Could wire to combat enemy portraits |
| `enemy_kolmari_enforcer.webp` | images-webp/ | Could wire to combat enemy portraits |
| `enemy_wardenscale.webp` | images-webp/ | Could wire to combat enemy portraits |
| `enemy_wardensea_officer.webp` | images-webp/ | Could wire to combat enemy portraits |
| `enemy_wardensea_soldier.webp` | images-webp/ | Could wire to combat enemy portraits |
| `karyudon_angry.webp` | expressions/ | Remove (Karyudon no expressions) |
| `karyudon_angry_new.webp` | expressions/ | Remove (Karyudon no expressions) |
| `karyudon_asleep.webp` | expressions/ | Remove (Karyudon no expressions) |
| `karyudon_grim.webp` | expressions/ | Remove (Karyudon no expressions) |
| `karyudon_grim_new.webp` | expressions/ | Remove (Karyudon no expressions) |
| `karyudon_happy.webp` | expressions/ | Remove (Karyudon no expressions) |
| `karyudon_neutral.webp` | expressions/ | Remove (Karyudon no expressions) |
| `karyudon_satisfaction.webp` | expressions/ | Remove (Karyudon no expressions) |

### I2. Orphaned Audio

| Filename | Location | Notes |
|---|---|---|
| `custom lightning attack.wav` | /public/audio/ | Unused. Could replace `sfx_heavy_hit.wav` for thunder attacks. |

### I3. Temp Files (Delete)

| Filename | Location |
|---|---|
| `border_strips.webp.tmp` | ui/ |
| `combat_hex_frame.webp.tmp` | ui/ |
| `compass_ring.webp.tmp` | ui/ |
| `compass_rose.webp.tmp` | ui/ |
| `corner_ornament.webp.tmp` | ui/ |
| `dialogue_box_frame.webp.tmp` | ui/ |
| `divider.webp.tmp` | ui/ |
| `nameplate.webp.tmp` | ui/ |

---

## STEP 3: PRIORITY RANKING

### CRITICAL (Gameplay broken or major scenes have no visual)

| # | Asset | Why |
|---|---|---|
| 1 | `scene_fish_market.webp` | 15+ story beats show no background. Most-used missing scene bg. Covers arrival, dock, intel, and identity scenes. |
| 2 | `scene_dragon_transform.webp` | 5 beats during Dragon Fruit activation. Pivotal narrative moment with no visual. |
| 3 | Remove `karyudon` from `EXPRESSION_CHARACTERS` set | Code tries to load Karyudon expressions, falls back silently but wastes require() calls. Per directive: default portrait only. |

### HIGH (Visible gaps in shipped experience)

| # | Asset | Why |
|---|---|---|
| 4 | `scene_durrek_garrison.webp` | 4 beats. Durrek is a major Wardensea location with no background art. |
| 5 | `scene_durrek_assault.webp` | 3 beats. Durrek assault sequence has no background. |
| 6 | Delvessa expression portraits (8 files) | Delvessa is the most-featured crew member. Expressions are tagged in story beats but all fall back to default. |
| 7 | Kovesse expression portraits (8 files) | Kovesse has significant screentime. Same fallback issue. |
| 8 | 6 missing stinger audio files | Stingers fire at conquest, boss intro, revelation, act transition, crew join, and character death. All silently skip. |

### MEDIUM (Polish, completeness)

| # | Asset | Why |
|---|---|---|
| 9 | 3 Victory screen backgrounds | VictoryScreen has CSS fallback but no unique art for conqueror/pragmatist/liberator endings. |
| 10 | 4 Game Over screen backgrounds | GameOverScreen has CSS fallback but no cause-specific art. |
| 11 | 3 panel texture overlays | TextureOverlay renders nothing. Extremely subtle (4% opacity) but adds tactile quality. |
| 12 | Wire 6 enemy_ portraits to combat encounters | Files exist but aren't in characterPortraits map. Easy code change. |

### LOW (Cleanup, nice-to-have)

| # | Asset | Why |
|---|---|---|
| 13 | Delete 8 .webp.tmp files in ui/ | Leftover conversion artifacts. |
| 14 | Delete 8 Karyudon expression files | Per directive, Karyudon uses default only. These waste disk space. |
| 15 | Wire `custom lightning attack.wav` as dedicated thunder SFX | Better audio fidelity for Orren/lightning attacks. |
| 16 | Decide fate of 5 orphaned background images | Either wire them to unused scene beats or delete. |
| 17 | Custom display font | Georgia is functional but a custom fantasy/pirate font would elevate the title screen and headers. |

---

## STEP 4: IMPLEMENTATION PLAN

### File Formats and Specs

| Asset Type | Format | Dimensions | Notes |
|---|---|---|---|
| Scene backgrounds | `.webp` | 1920x1080 recommended | Displayed full-width with CSS cover. Compress to ~200-400KB. |
| Character portraits | `.webp` | 512x700 recommended | Displayed at 220x300 (large) or 120x160 (small). Need vertical composition, face in upper 40%. |
| Expression portraits | `.webp` | 512x700 recommended | Must match base portrait framing exactly. Same character, different facial expression. |
| Combat backgrounds | `.webp` | 1920x1080 recommended | Dark atmosphere, combat arena feel. |
| Victory/Game Over backgrounds | `.webp` | 1920x1080 recommended | Full-screen with text overlay. Leave center area clear for UI text. |
| Panel textures | `.webp` | 512x512 tileable | Used at 4% opacity with mix-blend-mode. Subtle grain only. |
| Icons | `.webp` | 128x128 recommended | Displayed at 16-32px. Need to read clearly at small sizes. |
| Stinger audio | `.mp3` preferred (`.wav` fallback) | 3-15 seconds | One-shot musical moments. No loops. Clear beginning and end. |
| SFX | `.mp3` or `.wav` | < 3 seconds | Short, punchy, no reverb tail. |

### Drop Locations

```
IMAGES:     src/assets/images-webp/
EXPRESSIONS: src/assets/images-webp/expressions/
UI CHROME:  src/assets/images-webp/ui/
AUDIO:      public/audio/
```

### Code Changes Required

**1. Remove Karyudon from expression system** (Priority: CRITICAL)
- File: `src/utils/images.ts`
- Change: Remove `'karyudon'` from `EXPRESSION_CHARACTERS` Set
- Impact: Prevents unnecessary require() attempts

**2. Wire enemy portraits** (Priority: MEDIUM)
- File: `src/utils/images.ts`
- Change: Add entries to `characterPortraits` map:
  ```
  'dock_thug': 'enemy_dock_thug.webp',
  'keldriss_smuggler': 'enemy_keldriss_smuggler.webp',
  'kolmari_enforcer': 'enemy_kolmari_enforcer.webp',
  'wardenscale': 'enemy_wardenscale.webp',
  'wardensea_officer_enemy': 'enemy_wardensea_officer.webp',
  'wardensea_soldier': 'enemy_wardensea_soldier.webp',
  ```
- Note: Enemy IDs in encounter templates must match these keys

**3. Delete temp files** (Priority: LOW)
- Delete all `.webp.tmp` files in `src/assets/images-webp/ui/`

**4. Delete Karyudon expression files** (Priority: LOW)
- Delete all `karyudon_*.webp` from `src/assets/images-webp/expressions/`

**5. No code changes needed for new assets** -- The image system (`getImagePath()`) uses `try/catch` with webpack `require()`. Any file dropped into the correct directory with the correct filename will be automatically loaded on next build. Scene backgrounds, portraits, expressions, UI assets, and icons all work this way. Audio files in `/public/audio/` are loaded by Howler.js at runtime -- same automatic pickup.

### Asset Generation Prompts (for ChatGPT/image gen)

**Scene Backgrounds:**
- `scene_fish_market.webp`: "A bustling open-air fish market on a tropical coral island at golden hour. Wooden stalls, hanging lanterns, fishing nets drying, ocean visible in background. Fantasy pirate setting, oil painting style, dark atmospheric lighting."
- `scene_dragon_transform.webp`: "A ship cabin interior consumed by crackling magical energy. Red and gold light emanating from a figure transforming. Dragon scales forming on skin. Western dragon silhouette emerging. Dark fantasy, dramatic lighting, energy VFX."
- `scene_durrek_garrison.webp`: "A military fortress on a rocky island in stormy seas. Grey stone walls, watchtowers, uniformed soldiers on battlements. Storm-grey coats. Cold, disciplined atmosphere. Fantasy military base, oil painting style."
- `scene_durrek_assault.webp`: "An island military garrison under siege at night. Fires burning, soldiers fighting on walls, ships bombarding from sea. Dark fantasy naval warfare, dramatic lighting."

**Victory Screens:**
- `victory_conqueror.webp`: "An Oni warrior (crimson skin, thick horns) standing atop a conquered fortress overlooking an island archipelago at sunset. Fleet of ships below. Triumphant pose. Dark fantasy, epic scale."
- `victory_pragmatist.webp`: "A council chamber with a large table, maps spread across it. An archipelago visible through windows. Dawn light. The mood is careful, strategic, hard-won peace. Dark fantasy, diplomatic atmosphere."
- `victory_liberator.webp`: "Free islands celebrating. Fireworks over an ocean harbor. Ships with different flags sailing together. Dawn. Hope. Dark fantasy, liberation atmosphere."

**Game Over Screens:**
- `game_over_starvation.webp`: "An abandoned ship drifting in empty ocean. No wind, no land. Desperate, desolate atmosphere. Dark fantasy, bleak."
- `game_over_mutiny.webp`: "A ship deck at night, crew turning against their captain. Drawn weapons, betrayal in the torchlight. Dark fantasy, tense."
- `game_over_defeat.webp`: "A ship sinking in a naval battle. Fire on the water, enemy fleet surrounding. Dark fantasy, crushing defeat."
- `game_over_territory.webp`: "Empty streets of a conquered island. The old flag torn down. Dark fantasy, loss, abandonment."

**Stinger Audio:**
- `stinger_conquest_victory`: 5-8 seconds. Triumphant brass + percussion swell. Sharp beginning, satisfying resolution.
- `stinger_boss_intro`: 3-5 seconds. Ominous low brass + dissonant strings. Tension rise, cut.
- `stinger_revelation`: 4-6 seconds. Single piano note, then swelling strings. "The truth hits" moment.
- `stinger_act_transition`: 6-10 seconds. Epic orchestral swell. Rising energy, transition, new chapter.
- `stinger_crew_join`: 3-5 seconds. Warm brass + snare roll. "Welcome aboard" energy.
- `stinger_character_death`: 5-8 seconds. Solo cello or violin, descending. Grief without melodrama.

---

## SUMMARY: COMPLETE ASSET COUNTS

| Category | Total Referenced | On Disk | Missing |
|---|---|---|---|
| Character portraits (main cast) | 14 | 14 | 0 |
| Character portraits (NPCs) | 14 | 14 | 0 |
| Character portraits (villains) | 10 | 10 | 0 |
| Character portraits (generic) | 7 | 7 | 0 |
| Karyudon variants | 7 | 7 | 0 |
| Expression portraits | 56 expected (7 chars x 8) | 32 | **16** (delvessa 8, kovesse 8) |
| Scene backgrounds | 47 unique filenames | 43 | **4** |
| Combat backgrounds | 7 | 7 | 0 |
| Victory/Game Over backgrounds | 7 | 0 | **7** |
| UI chrome images | 16 | 13 | **3** (textures) |
| Game icons | 27 | 27 | 0 |
| Flag images | 3 | 3 | 0 |
| Logo/branding | 3 | 3 | 0 |
| SFX | 13 unique files | 13 | 0 |
| Stinger audio | 8 | 2 | **6** |
| Ambience | 0 (procedural) | N/A | 0 |
| **TOTAL MISSING** | | | **36 files** |

### Missing Files Checklist

```
CRITICAL (3):
[ ] scene_fish_market.webp
[ ] scene_dragon_transform.webp
[ ] Code: remove 'karyudon' from EXPRESSION_CHARACTERS

HIGH (22):
[ ] scene_durrek_garrison.webp
[ ] scene_durrek_assault.webp
[ ] expressions/delvessa_angry.webp
[ ] expressions/delvessa_grim.webp
[ ] expressions/delvessa_happy.webp
[ ] expressions/delvessa_satisfaction.webp
[ ] expressions/delvessa_shock.webp
[ ] expressions/delvessa_fear.webp
[ ] expressions/delvessa_awe.webp
[ ] expressions/delvessa_asleep.webp
[ ] expressions/kovesse_angry.webp
[ ] expressions/kovesse_grim.webp
[ ] expressions/kovesse_happy.webp
[ ] expressions/kovesse_satisfaction.webp
[ ] expressions/kovesse_shock.webp
[ ] expressions/kovesse_fear.webp
[ ] expressions/kovesse_awe.webp
[ ] expressions/kovesse_asleep.webp
[ ] stinger_conquest_victory.mp3
[ ] stinger_boss_intro.mp3
[ ] stinger_revelation.mp3
[ ] stinger_act_transition.mp3
[ ] stinger_crew_join.mp3
[ ] stinger_character_death.mp3

MEDIUM (10):
[ ] victory_conqueror.webp
[ ] victory_pragmatist.webp
[ ] victory_liberator.webp
[ ] game_over_starvation.webp
[ ] game_over_mutiny.webp
[ ] game_over_defeat.webp
[ ] game_over_territory.webp
[ ] ui/texture_parchment.webp
[ ] ui/texture_iron.webp
[ ] ui/texture_wood.webp

LOW (cleanup):
[ ] Delete 8 .webp.tmp files
[ ] Delete 8 Karyudon expression files
[ ] Wire 6 enemy_ portraits to characterPortraits
[ ] Wire custom lightning attack.wav
[ ] Decide fate of 5 orphaned backgrounds
```
