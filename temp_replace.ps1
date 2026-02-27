$f = 'C:\Users\User\Desktop\bastion-sea-main\src\data\story\crew_events_new.ts'
$c = Get-Content $f -Raw

# Replace Kovesse dialogue in orr_01_10
$old = "Kovesse is already tapping her Grimoire back to life. Her expression is not angry. Her expression is the face of a four-foot-one Rathai who just found a new favorite toy. `"DO THAT AGAIN. Wait. Don't do it again. Actually do it again but let me set up the measurement array first. What's your output frequency? Is it consistent or variable? Does it scale with emotional state? YOUR EARS. Do the ears correlate with discharge intensity? I need data. I need so much data.`""
$new = "Kovesse is already slapping her Grimoire back to life, blowing smoke off the casing. She is not angry. Her pupils are blown wide. Her claws are clicking against the screen. `"DO THAT AGAIN.`" She catches herself. `"Wait. Don't do it again. Actually do it again but let me set up the measurement array first. What's your output frequency? Consistent or variable? Does it scale with emotional state?`" She jabs a claw at his head. `"YOUR EARS. Do the ears correlate with discharge intensity? I need data. I need SO much data.`""
$c = $c.Replace($old, $new)

# Replace orr_01_11 narrator
$old = "Orren looks at you with the expression of a man who has made a terrible mistake by boarding this ship. Both ears are doing something complicated. One is perked toward Kovesse. The other is trying to retreat into his skull."
$new = "Orren looks at you. Help me, his eyes say. Both ears are doing something anatomically improbable. One is perked toward Kovesse, tracking her like a prey animal. The other is trying to burrow into his own skull."
$c = $c.Replace($old, $new)

# Replace choice consequences in orr_01_choice
$old = "Simple. Warm. His ears both perk up for the first time."
$new = "Simple. Warm. Both ears shoot up. First time since he came aboard."
$c = $c.Replace($old, $new)

$old = "His ears flatten. Full power is a topic he doesn't like."
$new = "Both ears slam flat. His fingers curl. Full power is not a topic he survives."
$c = $c.Replace($old, $new)

$old = "He straightens. Pettha believing in him means something."
$new = "His spine straightens. His chin lifts. Pettha believing in him means everything."
$c = $c.Replace($old, $new)

# Replace orr_01_after_choice
$old = "His ears settle. Not flat, not perked. Somewhere in between. Neutral. For Orren, neutral is as good as it gets."
$new = "His ears settle. Not flat, not perked. Hovering at half-mast. For Orren, that is the closest thing to calm."
$c = $c.Replace($old, $new)

$old = "`"I'll try to keep the magnetism under control. The compass should be fine as long as I stay at least ten feet from it.`" He pauses. `"Fifteen, maybe. Suulen might have to navigate by stars for a while.`""
$new = "`"I'll try to keep the magnetism under control. The compass should be fine as long as I stay at least ten feet from it.`" He glances at the compass, which is still pointing at him. `"Fifteen. Maybe twenty. Suulen might have to navigate by stars for a while.`""
$c = $c.Replace($old, $new)

# Replace orr_01_end
$old = "He walks toward the helm. The fork follows him across the deck, sliding along the planks like a tiny metal puppy. He doesn't notice. Kovesse does. She's already cataloguing ear positions."
$new = "He walks toward the helm. The fork follows him across the deck, scraping along the planks with dogged devotion. He doesn't notice. Kovesse does. She is already cataloguing ear positions in a notebook she has labeled VARREK AURICULAR RESPONSE INDEX."
$c = $c.Replace($old, $new)

$old = "From the upper deck, Dragghen watches the compass spin as Orren passes it. He pulls out his notebook."
$new = "From the upper deck, Dragghen watches the compass spin as Orren passes. He pulls out his notebook. Considers."
$c = $c.Replace($old, $new)

$old = "`"Compass: two.`""
$new = "`"Compass reliability: two.`" A pause. `"Crew member: four.`""
$c = $c.Replace($old, $new)

Set-Content $f -Value $c -NoNewline
Write-Output "Orren Event 01 complete"
