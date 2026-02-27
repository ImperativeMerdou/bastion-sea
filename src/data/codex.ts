// =============================================
// GODTIDE: BASTION SEA - Codex Entries
// The world, explained. No em dashes.
// =============================================

export interface CodexEntry {
  id: string;
  title: string;
  category: 'world' | 'factions' | 'races' | 'power' | 'characters';
  icon: string;
  body: string;
  unlockFlag?: string;   // if set, only visible when this game flag is true
}

export const CODEX_ENTRIES: CodexEntry[] = [
  // ===== WORLD =====
  {
    id: 'bastion_sea',
    title: 'The Bastion Sea',
    category: 'world',
    icon: '🌊',
    body: 'An ocean of islands with no central government. Power belongs to whoever can take it and hold it. Three forces compete for control: the Wardensea navy, the Kolmari trade confederation, and the independent Conqueror crews. The sea runs on Sovereigns, violence, and reputation.',
  },
  {
    id: 'sovereigns',
    title: 'Sovereigns',
    category: 'world',
    icon: '💰',
    body: 'The universal currency of the Bastion Sea. Islands trade in them, bounties are priced in them, and wars are funded by them. Your crew gets paid in Sovereigns. Run out and they stop being your crew.',
  },
  {
    id: 'grimoire',
    title: 'Grimoire Network',
    category: 'world',
    icon: '📡',
    body: 'Grimoires are communication devices powered by runestones. They broadcast news, bounty updates, and propaganda across the Bastion Sea. Think of them as the world\'s radio network. Kovesse, your engineer, operates yours. Broadcasts can reach the entire archipelago in hours.',
  },
  {
    id: 'god_fruits',
    title: 'God Fruits',
    category: 'world',
    icon: '🍐',
    body: 'God Fruits grant permanent, irreversible power. Eat one and your body changes forever. They come in four classes: Element, Beast, Law, and Mythical Beast. Mythical Beast is the rarest. Karyudon carries a Western Dragon Fruit, Mythical Beast class, stolen from a Wardensea transport. Worth more than most islands.',
  },
  {
    id: 'islands',
    title: 'Islands',
    category: 'world',
    icon: '🏝',
    body: 'The Bastion Sea is divided into three zones: Northern Arc, Central Belt, and Southern Reach. Each island has its own culture, resources, and politics. Conquer them to build territory income, but keep morale high or they rebel. Every island you take makes the Wardensea angrier.',
  },

  // ===== FACTIONS =====
  {
    id: 'wardensea',
    title: 'The Wardensea',
    category: 'factions',
    icon: '⚔',
    body: 'The Bastion Sea\'s military navy. They patrol trade routes, enforce law, and garrison key islands. Their officers are academy-trained Dominion users in storm-grey coats. They call it order. Everyone else calls it control. As your bounty grows, they send stronger fleets.',
  },
  {
    id: 'kolmari',
    title: 'Kolmari Confederation',
    category: 'factions',
    icon: '🏦',
    body: 'The trade confederation. They control commerce through credit, debt, and exclusive contracts. They don\'t need soldiers when they own the supply lines. Their agents wear blue coats and carry ledgers instead of swords. Their weapon is economic siege: raise interest rates, restrict trade, starve you out.',
  },
  {
    id: 'conquerors',
    title: 'The Conquerors',
    category: 'factions',
    icon: '🏴',
    body: 'Independent crew captains who carve territory by force. Five Seats hold the most power. They answer to nobody, sign blood contracts for mutual defense, and fight anyone who threatens their islands. You intend to surpass all of them.',
  },
  {
    id: 'renegades',
    title: 'Renegades',
    category: 'factions',
    icon: '🔥',
    body: 'The designation for anyone operating outside Wardensea law and Kolmari contracts. Not a faction, more a state of being. Renegade islands are neutral ground where information trades freely and authority is unwelcome. Mossbreak is the most famous renegade port.',
  },

  // ===== RACES =====
  {
    id: 'oni',
    title: 'Oni',
    category: 'races',
    icon: '👹',
    body: 'Highland-born, built heavy, with horns and esmer skin. Rare in the Bastion Sea. Karyudon is seven feet tall, which is average for an Oni. Their culture values directness, ambition, and hitting things very hard. When an Oni tells you they intend to conquer the world, they mean it literally.',
  },
  {
    id: 'gorundai',
    title: 'Gorundai',
    category: 'races',
    icon: '🟢',
    body: 'Grey-green skinned, thick-framed, built for endurance. Many work mines, forges, and shipyards. Your crewmate Dragghen is Gorundai. They tend to be quiet, practical, and dangerously strong when they stop being patient. Their hands are made for labor and for violence, in that order.',
  },
  {
    id: 'morventhi',
    title: 'Morventhi',
    category: 'races',
    icon: '🌙',
    body: 'Blue-black skin, silver-reflective eyes, lifespans measured in centuries. Your crewmate Suulen is 87, which means she looks thirty. Morventhi see better in darkness than daylight and value silence the way Oni value volume. They navigate by sound and resonance.',
  },
  {
    id: 'rathai',
    title: 'Rathai',
    category: 'races',
    icon: '⚙',
    body: 'Small, fast, wired for precision. Your crewmate Kovesse is four feet tall and carries three Grimoire devices. Rathai have an affinity for runestone technology that nobody fully understands, including the Rathai. They think faster than they talk, which is saying something.',
  },
  {
    id: 'khari',
    title: 'Khari',
    category: 'races',
    icon: '🐺',
    body: 'Beastkin. Humanoid with pronounced animal traits: fur, tails, claws, ears. Expression varies by hereditary lineage: canine, feline, avian, cervine. Enhanced senses, biological rather than Dominion. Your crewmate Orren is canine-lineage Khari. They travel in extended family groups called warrens, carrying news and oral histories between regions. Their songs referenced the Sundren centuries before anyone else confirmed it existed.',
  },
  {
    id: 'varrek',
    title: 'Varrek',
    category: 'races',
    icon: '⚙',
    body: 'Small (3\'4" to 4\'2"), stocky, broad hands. Scholars, inventors, systematizers. Grimoire communication protocol is Varrek-designed. Wardensea charts are Varrek-maintained. Kolmari banking runs on Varrek calculation engines. Pettha Koss, the harbor master of Tavven Shoal, is Varrek. They make themselves so useful that conquering them is worse than cooperating.',
  },
  {
    id: 'human',
    title: 'Human',
    category: 'races',
    icon: '👤',
    body: 'The most common race in the Bastion Sea. Humans fill every role from Wardensea admiral to dockworker to pirate. They lack the physical traits of other races but compensate with adaptability and sheer numbers. Delvessa and Tessek are both human: one wields a ledger, the other a nodachi.',
  },
  {
    id: 'thalessi',
    title: 'Thalessi',
    category: 'races',
    icon: '📜',
    body: 'High Elves. Tall, lean, angular features with tapered ears. Lifespans of 300 to 400 years, with physical decline only in the final two decades. Archivists, diplomats, and long-term strategists. A Thalessi politician thinks in centuries. They helped build the Masqarat and benefit from the system. Exceptional Sight Dominion users, with longevity compounding mastery over ten human lifetimes. Rare in the Bastion Sea, but a few serve in Wardensea intelligence.',
  },
  {
    id: 'lunarian',
    title: 'Lunarian',
    category: 'races',
    icon: '🪽',
    body: 'Descendants of the Silverborn. White or silver hair, faintly luminescent pale skin, functional feathered wings spanning 8 to 12 feet. Roughly 20,000 remain worldwide, scattered in isolated mountain settlements. Extraordinary Sight Dominion, documented perceiving events up to ten seconds into the future. Their oral traditions remember things the Masqarat has spent three thousand years trying to erase. A dying people who will not break.',
  },

  // ===== POWER =====
  {
    id: 'dominion',
    title: 'Dominion',
    category: 'power',
    icon: '🔥',
    body: 'The power inside every living thing. Three expressions: Iron is strength, armor, and raw force. Sight reads the world and finds openings before they exist. King is willpower so heavy it crushes weaker opponents flat. Everyone has Dominion. Most people barely use it. You are not most people.',
  },
  {
    id: 'dominion_tiers',
    title: 'Dominion Tiers',
    category: 'power',
    icon: '📊',
    body: 'Five tiers of Dominion mastery: Flicker (weakest), Tempered, Forged, Prime, Conqueror (strongest). Most people never pass Tempered. Karyudon is Forged-tier Iron, meaning his body can become harder than steel. Each tier unlocks new combat abilities and resistance levels.',
  },
  {
    id: 'korvaan',
    title: 'Korvaan',
    category: 'power',
    icon: '💀',
    body: 'The process of refining your body through sustained Dominion use. Five stages: Callus, Ironset, Fleshweave, Nerveburn, Reforged. Each stage permanently hardens the body, increases base stats, and changes how Dominion flows through you. It hurts. It works.',
    unlockFlag: 'korvaan_explained',
  },
  {
    id: 'resonance',
    title: 'Resonance & Tone',
    category: 'power',
    icon: '🔔',
    body: 'Resonance weapons vibrate at frequencies that amplify their cutting or blocking power. Each weapon has a Tone: Cutting Tone slices through armor, Dampening Tone disrupts enemy Dominion on contact. Equipment grades go from Craft (standard) to Master (rare). Suulen\'s knives use Cutting Tone. Tessek\'s nodachi Redtide also uses Cutting Tone. Dragghen\'s shield Bulkhead uses Dampening.',
    unlockFlag: 'tessek_recruited',
  },

  // ===== CHARACTERS =====
  {
    id: 'char_karyudon',
    title: 'Karyudon',
    category: 'characters',
    icon: '👹',
    body: 'You. Oni, 28, seven feet tall with esmer skin, two forward-curving horns, and amber eyes that burn bright. Your weapon is Danzai, an iron-spiked war club. You are Forged-tier Iron, carrying a stolen Mythical Beast God Fruit, and telling everyone you intend to conquer the world. You mean it.',
    unlockFlag: 'prologue_complete',
  },
  {
    id: 'char_delvessa',
    title: 'Delvessa Ghal',
    category: 'characters',
    icon: '📋',
    body: 'The Ledger. Human, 34. Former Kolmari intelligence agent who defected with eleven classified financial instruments. Forged-tier Sight Dominion. She measures people the way scales measure weight: precisely, without sentiment. Your strategist. Dry humor that surfaces without warning.',
    unlockFlag: 'delvessa_recruited',
  },
  {
    id: 'char_dragghen',
    title: 'Dragghen Kolve',
    category: 'characters',
    icon: '🛡',
    body: 'The Bulwark. Gorundai, 33. Former Kolmari drydock foreman who walked out carrying a 90-pound keel plate after the Kolmari sold his workers as debt-labor. Forged-tier Iron at level 65. Rates everything 1 to 10, never gives above 6. Fixes things compulsively. Your shipwright and living barricade.',
    unlockFlag: 'dragghen_recruited',
  },
  {
    id: 'char_suulen',
    title: 'Suulen Vassere',
    category: 'characters',
    icon: '🌑',
    body: 'The Ghost. Morventhi, 87. Ex-tunnel-runner from the Undersprawl. Forged-tier Sight at level 55. Carries twin Resonance knives with Cutting Tone. Better in darkness than daylight. The crew forgets she is in the room until she is not. Her dream is a route no one has mapped.',
    unlockFlag: 'suulen_recruited',
  },
  {
    id: 'char_kovesse',
    title: 'Kovesse Grenn',
    category: 'characters',
    icon: '📡',
    body: 'The Mouth. Rathai, 24. Expelled Grimoire technician from the Nettleworks. Four feet tall with fingers permanently stained by solder and runestone residue. Brilliant, chaotic, terrified of being boring. Runs your Grimoire broadcasts and talks faster than most people think.',
    unlockFlag: 'kovesse_recruited',
  },
  {
    id: 'char_tessek',
    title: 'Tessek Vayne',
    category: 'characters',
    icon: '🗡',
    body: 'The Red Line. Human, 28. Self-taught swordsman from Windrow Passage. Forged-tier Sight at level 60. Carries Redtide, a Master-grade nodachi with Cutting Tone. Channels Sight Dominion through the blade to see structural fault lines. Names every technique theatrically. Has an imaginary rival named Garroden Harsk.',
    unlockFlag: 'tessek_recruited',
  },
  {
    id: 'char_orren',
    title: 'Orren Mahk',
    category: 'characters',
    icon: '⚡',
    body: 'The Pulse. Khari, 26. Former harbor runner on Tavven Shoal. Ate a Storm Eel Fruit (Element class) because he was hungry. Generates bioelectric current through his skin. His ears move independently and betray every emotion. Sent by Pettha Koss to keep him alive. Still learning what his power can do.',
    unlockFlag: 'orren_recruited',
  },
  {
    id: 'char_vorreth',
    title: 'Vorreth Daaz',
    category: 'characters',
    icon: '👹',
    body: 'The Black Standard. Oni, 38. Former crew second of the Daaz Accord. Bounty of 280 million Sovereigns. Fought 32 Wardensea soldiers in six hours before capture. 18 of his old crew remain imprisoned. Your first mate. Falls asleep standing up. Cannot navigate. Bare fists that crack ship hulls.',
    unlockFlag: 'vorreth_recruited',
  },
];

export type CodexCategory = CodexEntry['category'];

export const CODEX_CATEGORIES: { id: CodexCategory; label: string; icon: string }[] = [
  { id: 'world', label: 'WORLD', icon: '🌊' },
  { id: 'factions', label: 'FACTIONS', icon: '⚔' },
  { id: 'races', label: 'RACES', icon: '👥' },
  { id: 'power', label: 'POWER', icon: '🔥' },
  { id: 'characters', label: 'CREW', icon: '⚓' },
];
