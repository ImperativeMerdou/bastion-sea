# UI Overhaul Report

## Summary

7-phase UI overhaul applying premium visual polish across all game panels. Every UI chrome asset is now wired up with CSS-only fallbacks. Zero TypeScript errors, zero build warnings.

---

## Phase 1: Asset Inventory + Component Audit

**Read and catalogued:**
- All 15 UI chrome assets in `utils/images.ts` (card frames, textures, ornaments, dividers, strips, compass)
- All 45+ scene backgrounds, 30+ character portraits, 12 combat backgrounds
- Every rendering component: StoryPanel, CombatPanel, MapPanel, ManagementPanel, CharacterCard, DialogueCards, TopBar, TextureOverlay, PanelFrame, Divider, GameIcon, shared.tsx, GrimoireTab, CrewTab, DashboardTab

**Finding:** CharacterCard.tsx had NO frame overlay despite `card_frame.webp` and `card_frame_active.webp` existing. PanelFrame, Divider, dialogue_frame, and border_strips were defined but never used anywhere.

---

## Phase 2: Frame/Border Overlay System

**File:** `src/components/Story/CharacterCard.tsx`

- Added `getUiAsset` import
- Added `frameImage` variable: uses `card_frame_active` for active speakers, `card_frame` for inactive
- Added frame overlay `<img>` element: `position: absolute, inset: 0, z-index: 10, pointer-events: none`
- Active frame renders at 70% opacity, inactive at 50%
- Frame uses `objectFit: 'fill'` to stretch to card dimensions

**Pattern established:** Container (relative) -> Portrait (object-cover) -> Frame overlay (absolute, inset-0, z-[10], pointer-events-none)

---

## Phase 3: Combat Panel UI Overhaul

**File:** `src/components/Combat/CombatPanel.tsx`

### Enemy Portraits
- Expanded from 80px (w-20 h-20) to 96x96px with proper container
- Added TARGET indicator text above selected enemy
- Added rounded-lg, border, shadow styling

### HP Bars
- Changed from h-2.5/h-3 rounded-full to h-[10px] rounded with shadow-inner
- Added border (border-ocean-600/50) for depth
- Added `transition-all duration-500` for smooth damage animation
- Player HP/SP bars: same treatment (h-[10px], shadow-inner, border)

### Player Portrait
- Expanded from 48px (w-12 h-12) to 56px (w-14 h-14)

### Action Buttons
- Increased padding from py-2.5 to py-3
- Text size from text-sm to text-[15px] font-semibold
- Better visual weight for combat decision-making

### Combat Log
- Color-coded entries:
  - Player actions: `#4ECDC4` (teal) left border
  - Enemy actions: `#E8845C` (warm orange) left border
  - System messages: `#A89B8C` (neutral grey) left border
- Actor detection via `entry.actor === 'Karyudon'`

---

## Phase 4: Story Panel UI Polish

**File:** `src/components/Story/StoryPanel.tsx`

### Background
- Gradient overlay strengthened to `rgba(10, 10, 15, 0.95)` for text readability
- Solid dark backdrop below gradient

### Dialogue Box
- Background: `rgba(10, 10, 15, 0.95)`
- Gold top border: `2px solid rgba(196, 148, 58, 0.6)`
- Max height: `30vh` to prevent box dominating viewport
- Backdrop blur: 12px
- Added `dialogue_box_frame` overlay (0.06 opacity, multiply blend mode)

### Text Styling (differentiated by type)
- **Narrator text:** 600 weight, 19px, color `#F0E8DC`
- **Dialogue text:** 600 weight, 19px, color `#F5EDE1`, gold left border (3px solid accent)
- **Stage directions:** 500 weight, 17px, italic, color `#C4A882`

### Choice Buttons
- Full width, custom styled
- Background: `rgba(212, 165, 116, 0.08)`
- Border: `rgba(196, 148, 58, 0.25)` with gold hover state
- Font: 17px font-semibold font-narration
- Padding: 12px 16px
- Letter prefix (A. B. C.) in gold, xl size

### Beat Counter
- Size: 13px
- Color: `#A89B8C`
- Font: mono tracking-wider

---

## Phase 5: Map + Management Panel Pass

### MapPanel (`src/components/Map/MapPanel.tsx`)
- Island labels: fontSize 14px, fontWeight 600
- Enhanced text shadow for readability over map
- Added current location green dot indicator

### ManagementPanel (`src/components/Management/ManagementPanel.tsx`)
- Tab bar: font-semibold for inactive tabs, font-bold for active
- Active tab: gold text, gold bottom border, bg-ocean-800
- Hover state: text-ocean-200, bg-ocean-800/60
- Locked tabs: smaller text (text-xs), cursor-not-allowed

### shared.tsx PortraitImage (`src/components/Management/shared.tsx`)
- Added `getUiAsset` import
- PortraitImage wrapped in relative container
- Added card_frame overlay: absolute, inset-0, z-[2], 45% opacity

### GrimoireTab (`src/components/Management/GrimoireTab.tsx`)
- Post title: 15px font-semibold
- Post message: 15px font-medium font-narration

---

## Phase 6: TopBar Polish

**File:** `src/components/UI/TopBar.tsx`

### Stat Labels
- Font size: 14px
- Color: `#C4B8A8` (warm grey)
- Weight: font-semibold

### Stat Values
- Font size: 15px
- Color: `#F0E8DC` (warm white)
- Weight: font-bold

### Resource Values
- Same treatment as stat values (15px, `#F0E8DC`, font-bold)

### Panel Tab Buttons
- Active state: added shadow (`0 2px 8px rgba(0,0,0,0.3)`)
- Hover state: added border styling

---

## Phase 7: Apply Remaining UI Assets

### dialogue_frame -> StoryPanel
- Decorative ornamental header centered above the dialogue area
- 15% opacity, max-width 300px, h-8
- Positioned at translateY(-50%) to straddle the scene-to-dialogue boundary
- z-index 3 (above gradient, below content)

### dialogue_box_frame -> StoryPanel (done in prior session continuation)
- Subtle texture overlay inside the dialogue box
- 6% opacity, multiply blend mode
- objectFit: fill, pointer-events: none, z-[1]

### border_strips -> ManagementPanel
- Decorative strip below the crew identity header
- 40% opacity, h-[3px], objectFit: fill
- Absolute positioned at bottom of header container, z-[2]

### PanelFrame -> ManagementPanel
- Corner ornament images (100px, 40% opacity) at all four corners
- Uses separate corner_tl/tr/bl/br.webp files
- z-10, pointer-events: none, aria-hidden
- Graceful null fallback if images missing

### Divider -> DashboardTab
- Replaced 2 plain `border-t border-ocean-700/50` dividers with ornamental `<Divider />` component
- Uses divider.webp image (75% opacity) centered, with CSS gradient fallback
- Separates Income / Costs / Net sections in the daily ledger

---

## UI Asset Coverage (all wired up)

| Asset | Component | Status |
|-------|-----------|--------|
| card_frame | CharacterCard, shared.tsx | Active |
| card_frame_active | CharacterCard | Active |
| card_frame_combat | CombatPanel | Active |
| nameplate | CharacterCard | Active |
| dialogue_frame | StoryPanel | Active |
| dialogue_box_frame | StoryPanel | Active |
| corner_ornament / corner_tl/tr/bl/br | PanelFrame -> ManagementPanel | Active |
| divider | Divider -> DashboardTab | Active |
| border_strips | ManagementPanel | Active |
| compass_rose | MapPanel | Active |
| compass_ring | MapPanel | Active |
| combat_hex_frame | CombatPanel | Active |
| texture_parchment | TextureOverlay (story) | Defined |
| texture_iron | TextureOverlay (combat) | Active |
| texture_wood | TextureOverlay (management) | Active |

**Note:** `texture_parchment` (story variant) is NOT applied to StoryPanel because the story panel uses full-bleed scene background images. A parchment texture overlay would degrade the VN-style presentation. The combat and management panels have solid-color backgrounds where texture overlays enhance depth.

---

## Files Modified

1. `src/components/Story/CharacterCard.tsx` - Frame overlay system
2. `src/components/Combat/CombatPanel.tsx` - Portraits, HP bars, action buttons, combat log
3. `src/components/Story/StoryPanel.tsx` - Dialogue box, text styling, choices, dialogue_frame, dialogue_box_frame
4. `src/components/Map/MapPanel.tsx` - Island labels, current location indicator
5. `src/components/Management/ManagementPanel.tsx` - Tab bar, PanelFrame, border_strips, crew header
6. `src/components/Management/shared.tsx` - Portrait frame overlay
7. `src/components/Management/GrimoireTab.tsx` - Post text sizing
8. `src/components/Management/DashboardTab.tsx` - Divider component usage
9. `src/components/UI/TopBar.tsx` - Stat labels/values, panel buttons

---

## Build Status

- `npx tsc --noEmit`: 0 errors
- `npm run build`: 0 errors, 0 warnings
