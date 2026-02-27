# Writing Directive v4.5 Violation Summary

## Quick Reference: All Violations Found

### ROBOTIC PRESENTATION (§4 - HARD BAN)

#### Briefing-Style Intelligence Delivery

| File | Quote Snippet | Violation Type |
|------|---------------|----------------|
| `exploration_vess.ts` | "Harbor layout... Three concentric rings. Outer ring: patrol anchorage, supply docks, civilian moorage..." | Characters delivering info in organized chunks |
| `exploration_vess.ts` | "Every member of the crew has weighed in. Delvessa's strategic analysis. Vorreth's institutional knowledge. Kovesse's signal intelligence..." | Dialogue as bullet-point briefing |
| `exploration_anvil_cay.ts` | "Anvil Cay is the Bastion Fleet's forward operating base... Not a garrison, a FORGE. This is where Vassago builds his war..." | Information delivery as clean structured briefing |
| `exploration_durrek.ts` | "Garrison strength is approximately one hundred and twenty marines. Permanent posting... Captain Drezh. We served together..." | Sequential crew member reporting |
| `exploration_noon.ts` | "Solar zenith passage... The island sits close enough to the equatorial line that twice a year the sun passes directly overhead..." | Textbook-style explanation disguised as dialogue |
| `exploration_sorrens.ts` | "The Consortium is three families... The Sorrens, who founded the island. The Veshtari, who handle shipping logistics..." | Exposition dump as dialogue |
| `exploration_windrow.ts` | "This is Windrow. We don't have gold to steal, trade routes to hijack, or a military worth absorbing..." | Character presenting to a room |
| `exploration_ghostlight.ts` | "Her voice has the rhythm of a woman who has given this speech to every ambitious outsider..." | Character acknowledged as giving a speech |
| `exploration_vess.ts` | "Ships being armed. Not maintained. Armed. Fresh gun emplacements on vessels that were patrol craft a month ago..." | Data categorized into neat intellectual chunks |

#### Thematic Arcs Completed in Single Scene

| File | Quote Snippet | Violation Type |
|------|---------------|----------------|
| `delvessa_romance.ts` (Scene 2) | "I didn't lose my objectivity. I found it. That was the problem. The Kolmari don't want Arbiters who see clearly..." | Full emotional arc (guilt → confession → resolution) in one dialogue |
| `crew_events_new.ts` (Tessek Event 02) | "I invented him... Every technique I've named, I named because I imagined Garroden had already named a better one..." | Character confesses invented rival and reaches full thematic conclusion |

#### Characters Sounding Like They're Presenting

| File | Quote Snippet | Violation Type |
|------|---------------|----------------|
| `rival_intro.ts` | "Sable Venn. Ex-Kolmari investment broker. Left the Confederation three years ago... Current holdings: shipping contracts..." | Character information delivered as clean dossier |
| `prime_khoss.ts` | "Prime Edara Khoss. Third Prime, Third Division. Forty-seven. Career Wardensea, garrison-born..." | Pure character profile briefing |

---

### DIALOGUE PROTOCOL VIOLATIONS

#### Characters Too Articulate About Feelings/Motivations

| File | Quote Snippet | Violation Type |
|------|---------------|----------------|
| `delvessa_romance.ts` (Scene 1) | "How you fight. What you protect. Who you threaten versus who you actually hurt. They're never the same list, did you know that?" | Extremely articulate about emotional confusion |
| `delvessa_romance.ts` (Scene 4) | "I have built projections for thirty-seven military engagements... And last night, the only number in my head was four." | Over-articulation of fear with clinical precision |
| `delvessa_romance.ts` (Scene 4) | "Trying to be your strategist. Trying to do the math... I sat on that floor for six hours. I have never in my life sat anywhere for six hours without working." | Perfect self-analysis during emotional crisis |
| `crew_events_new.ts` (Suulen Event 03) | "Because through Spatial Sight, most people are small. Compressed... You're not... You fill up every room you walk into." | Too articulate/metaphorically perfect for taciturn character |
| `kirin_confrontation.ts` | "He sent me here. The deal is: bring you back. Dead or alive... Or he moves the twins somewhere I can't find them... I'm not going to do it... I'm here because I don't know how to get them out alone." | Perfectly ordered confession under emotional stress |
| `kirin_confrontation.ts` | "That day on the ship. When they took you. I knew they were coming... He was lying... He wanted you gone because you were the only person in the highlands who didn't listen to him." | Too neat delivery of painful realization |
| `exploration_anvil_cay.ts` | "I need to say something strategic. And then I need to say something that isn't." | Over-announces emotional subtext instead of showing it |

#### Characters Always Grammatically Perfect / Spoken-Like Text

| File | Quote Snippet | Violation Type |
|------|---------------|----------------|
| `exploration_vess.ts` | "Second Division has been requesting force expansion for two years. The admiralty denied it. If they're building up without authorization, it means either the orders changed or the local command has decided to act independently." | Too clean and analytical for spoken dialogue |
| `exploration_noon.ts` | "Solar zenith passage... The flat topography and reflective rock eliminate ambient shadow." | Textbook passage, not spoken language |
| `delvessa_romance.ts` (Scene 2) | "Compromised objectivity. I didn't lose my objectivity. I found it. That was the problem. The Kolmari don't want Arbiters who see clearly." | Too polished and epigrammatic for emotional confession |

#### No Subtext (Everything Explicit)

| File | Quote Snippet | Violation Type |
|------|---------------|----------------|
| `exploration_anvil_cay.ts` | "There it is. The pause before 'approaches.' The implication that lands like a thrown knife." | Narrator explaining subtext instead of letting it exist |
| `delvessa_romance.ts` (general) | Narration footnoting every emotional beat and revealing "what this really means" | Constant narrator exposition of subtext |

#### Characters Answer Every Question Directly

| File | Quote Snippet | Violation Type |
|------|---------------|----------------|
| `exploration_vess.ts` | When asked about weak points: "Fewer than you'd like" then immediately provides exact angle, exact timing of gap | No evasion or deflection |
| `exploration_anvil_cay.ts` | Every crew question answered with full detail about supply, frequencies, garrison strength | Direct answer to every query |

---

### EXPOSITION DUMPS

| File | Quote Snippet | Violation Type |
|------|---------------|----------------|
| `exploration_rotstone.ts` | "Captain, this rock is emitting a signal. Not Grimoire. Pre-Grimoire. Whatever frequency this is, it predates the communication network..." | Technical briefing disguised as dialogue |
| `exploration_durrek.ts` | "Observation post... Shift changes every four hours. Gate inspections every two. The only gap is during the commander's evening briefing: twenty minutes when the south wall has minimal coverage." | Perfect intelligence report from reconnaissance |
| `exploration_vess.ts` | "Six thousand souls in there... Twelve capital ships. Thirty support vessels. Four shore batteries with overlapping fields of fire..." | Raw data delivery as dialogue |

---

## Character Analysis

### Most Problematic Characters
1. **Vorreth Daaz** - Delivers all intelligence as clean tactical briefings with zero hedging
2. **Delvessa Ghal** - Over-articulates feelings, delivers exposition as dialogue, narration constantly explains her subtext
3. **Suulen Vassere** - Too articulate about why she follows Karyudon (metaphor too perfect)

### Strongest Characters (Dialogue Protocol)
1. **Dragghen Kolve** - Uses fragments, deflects, cooks instead of explaining
2. **Suulen Vassere in crew events 01-03** - Refuses to answer, controls information, appropriate deflection
3. **Kovesse Grenn** - Sometimes overexplains technical data but maintains unique voice

---

## File-by-File Violation Count

| File | Violation Count | Severity |
|------|-----------------|----------|
| `exploration_vess.ts` | 8 | CRITICAL |
| `delvessa_romance.ts` | 6 | HIGH |
| `exploration_anvil_cay.ts` | 4 | HIGH |
| `exploration_durrek.ts` | 3 | HIGH |
| `exploration_noon.ts` | 2 | MEDIUM |
| `kirin_confrontation.ts` | 3 | MEDIUM |
| `exploration_sorrens.ts` | 1 | MEDIUM |
| `exploration_windrow.ts` | 1 | MEDIUM |
| `exploration_ghostlight.ts` | 1 | MEDIUM |
| `exploration_rotstone.ts` | 1 | MEDIUM |
| `crew_events_new.ts` | 2 | MEDIUM |
| `rival_intro.ts` | 1 | LOW |
| `prime_khoss.ts` | 1 | LOW |

---

## Pattern Summary

**Root Cause:** Exploration and conquest scenes use a round-table intelligence briefing format where each crew member reports their specialty sequentially. This creates the "briefing panel" effect that triggers multiple violations simultaneously.

**Fix Strategy:** Make intelligence gathering messier:
- Crew members provide wrong/incomplete information
- Characters interrupt and disagree
- Someone refuses to speculate beyond their knowledge
- Information arrives out of order
- Key details are withheld or must be negotiated for
