// =============================================
// GODTIDE: BASTION SEA - Island Villains
// =============================================
// Each island has a PERSON, not just a faction.
// One Piece rule: every arc has a villain you
// remember by name, by philosophy, by the fight.
// These are the people standing between Karyudon
// and the top of the world.
// =============================================

import type { IslandVillain } from '../types/game';

export const islandVillains: IslandVillain[] = [
  // ==========================================
  // TAVVEN SHOAL - Tessurren Dolch, "The Squeeze"
  // ==========================================
  {
    id: 'tessurren_dolch',
    name: 'Tessurren Dolch',
    epithet: 'The Squeeze',
    race: 'Human',
    age: 42,
    islandId: 'tavven_shoal',
    description:
      'Thin, precise, smells like expensive soap. Kolmari debt agent who treats foreclosure ' +
      'like an art form. Wears a tailored grey suit that costs more than most houses on the ' +
      'island. Carries a weighted ledger chain -- Craft-grade links that bind targets in ' +
      'contract-inscribed iron.',
    personality:
      'Polite to the syllable. Never raises his voice. The quieter he gets, the worse the deal. ' +
      'Genuinely believes debt is a natural force, like gravity. Not cruel. Worse: efficient.',
    philosophy: 'Debt is gravity. Everyone falls.',
    dominion: {
      iron: { tier: 'flicker', level: 15 },
      sight: { tier: 'tempered', level: 40 },
      king: { tier: 'flicker', level: 10 },
    },
    weapon: 'Ledger Chain (Craft-grade, Binding Tone)',
    encounterId: 'boss_tessurren',
    defeated: false,
    fightMechanic:
      'Every turn he is alive, you lose 5 Sovereigns. His attacks apply "Debt" stacks that ' +
      'reduce your ATK by 3 per stack. Beat him fast or go broke. Sight abilities can "audit" ' +
      'his chains and remove Debt stacks.',
  },

  // ==========================================
  // WINDROW ISLAND - Kellan Gyre, "The Updraft"
  // ==========================================
  {
    id: 'kellan_gyre',
    name: 'Kellan Gyre',
    epithet: 'The Updraft',
    race: 'Human',
    age: 61,
    islandId: 'windrow',
    description:
      'Tall, gaunt, wild white beard, stands on cliff edges in storms for fun. Former Wardensea ' +
      'meteorologist who went native thirty years ago. The wind listens to him. Or he listens to ' +
      'the wind. He stopped caring which.',
    personality:
      'Speaks in weather metaphors. Calm as a summer sea until provoked, then Category 5. Laughs ' +
      'during storms. Cries when the wind dies. Genuinely loves Windrow and its people.',
    philosophy: 'The sea belongs to the wind. The wind belongs to no one.',
    dominion: {
      iron: { tier: 'flicker', level: 5 },
      sight: { tier: 'forged', level: 60 },
      king: { tier: 'flicker', level: 15 },
    },
    weapon: 'Storm Staff (Craft-grade, Gale Tone)',
    encounterId: 'boss_kellan_gyre',
    defeated: false,
    fightMechanic:
      'His attacks change direction randomly -- high evasion, low HP. Every 2 turns, wind shifts: ' +
      'all attacks (yours and his) get +20 or -20 accuracy based on wind direction. A speed puzzle. ' +
      'Sight abilities predict the wind shift.',
  },

  // ==========================================
  // GHOSTLIGHT REEF - Moth Calaveras, "The Lantern"
  // ==========================================
  {
    id: 'moth_calaveras',
    name: 'Moth Calaveras',
    epithet: 'The Lantern',
    race: 'Human',
    age: 53,
    islandId: 'ghostlight',
    description:
      'Short, round, covered in bioluminescent tattoos that pulse faintly in the dark. Runs the ' +
      'reef\'s cave network as an underground smuggling empire. Laughs constantly. The laugh echoes ' +
      'in the caves and you can never tell where it\'s coming from.',
    personality:
      'Gregarious, warm, maternal -- until the lights go out. In the dark she becomes something ' +
      'else entirely. Every smuggler in the southern sea owes her a favor.',
    philosophy: 'The law is a hallway. I prefer windows.',
    dominion: {
      iron: { tier: 'flicker', level: 10 },
      sight: { tier: 'tempered', level: 30 },
      king: { tier: 'tempered', level: 35 },
    },
    godFruit: {
      name: 'Anglerfish Fruit',
      type: 'beast',
      description: 'Beast-type. Produces hypnotic bioluminescent light. Lure. Blind. Vanish.',
      eaten: true,
      awakened: false,
    },
    encounterId: 'boss_moth_calaveras',
    defeated: false,
    fightMechanic:
      'The arena goes DARK every 3 turns. She attacks from stealth with bonus damage. You need ' +
      'Sight abilities or crew assists (Kovesse\'s Grimoire light, Suulen\'s spatial sense) to ' +
      'reveal her position. When lit, she\'s fragile.',
  },

  // ==========================================
  // KELDRISS - Brother Ossian, "The Rust"
  // ==========================================
  {
    id: 'brother_ossian',
    name: 'Brother Ossian',
    epithet: 'The Rust',
    race: 'Human',
    age: 55,
    islandId: 'keldriss',
    description:
      'Tall, skeletal, shaved head, every sentence sounds like scripture. Runs a "monastery" that ' +
      'is actually a forced labor camp. His skin is the color of tarnished copper and where his ' +
      'Iron manifests, other people\'s metal decays.',
    personality:
      'Serene in a way that makes your skin crawl. Speaks softly. Never blinks enough. ' +
      'Genuinely believes suffering purifies the soul. His followers are either terrified or broken.',
    philosophy: 'Suffering is the only honest currency.',
    dominion: {
      iron: { tier: 'forged', level: 50 },
      sight: { tier: 'flicker', level: 5 },
      king: { tier: 'tempered', level: 25 },
    },
    weapon: 'Bare hands (Iron manifests as corrosive touch)',
    encounterId: 'boss_brother_ossian',
    defeated: false,
    fightMechanic:
      'Debuff-heavy. Reduces your ATK and DEF by 5 every turn (Rust stacks). You need to burst ' +
      'him down before he makes you useless. Immune to Iron-type damage. Sight and King abilities ' +
      'bypass his Rust aura.',
    crewConnection: undefined,
  },

  // ==========================================
  // DURREK GARRISON - Merrik Sevaine, "The Schedule"
  // ==========================================
  {
    id: 'merrik_sevaine',
    name: 'Merrik Sevaine',
    epithet: 'The Schedule',
    race: 'Human',
    age: 39,
    islandId: 'durrek',
    description:
      'Average height, average build, average face. The most dangerous man in the northern reach ' +
      'because nothing about him is wasted. Every movement is calculated. Every word serves a ' +
      'purpose. He irons his uniform before every watch rotation. His patrol routes have not ' +
      'deviated by a single minute in three years.',
    personality:
      'Methodical, fair, incorruptible. Not evil. Not cruel. Just utterly committed to order. ' +
      'The kind of officer who follows illegal orders because the chain of command is sacred. ' +
      'Vorreth knows him from the academy. That personal connection hurts.',
    philosophy: 'Discipline is freedom from uncertainty.',
    dominion: {
      iron: { tier: 'tempered', level: 35 },
      sight: { tier: 'tempered', level: 35 },
      king: { tier: 'flicker', level: 20 },
    },
    weapon: 'Wardensea Officer\'s Saber (Regulation, Cutting Tone)',
    encounterId: 'boss_merrik_sevaine',
    defeated: false,
    fightMechanic:
      'Gets a free counterattack every turn. Predictable but relentless. You MUST use status ' +
      'effects (stun, expose, intimidate) to break his pattern. If you attack without debuffing ' +
      'first, he punishes you every time.',
    crewConnection: 'vorreth',
  },

  // ==========================================
  // COPPERVEIN - Maren Kade, "The Seam"
  // ==========================================
  {
    id: 'maren_kade',
    name: 'Maren Kade',
    epithet: 'The Seam',
    race: 'Gorundai',
    age: 45,
    islandId: 'coppervein',
    description:
      '6\'4", muscular, hands scarred from decades of mine work. Former miner who climbed the ' +
      'ranks by being the hardest worker AND the most ruthless manager. Bought the island from ' +
      'the Kolmari with money she extracted from the labor of people she used to work beside.',
    personality:
      'Blunt, physical, respects strength above all else. Not gratuitously cruel, but views ' +
      'suffering as the price of survival. "I dug myself out" is her answer to everything. ' +
      'Dragghen left because of her.',
    philosophy: 'I dug myself out. Nobody helped me. Nobody helps anyone. That\'s the lesson.',
    dominion: {
      iron: { tier: 'forged', level: 55 },
      sight: { tier: 'flicker', level: 10 },
      king: { tier: 'flicker', level: 10 },
    },
    weapon: 'Seam-Splitter (mining pick, Craft-grade, Shatter Tone)',
    encounterId: 'boss_maren_kade',
    defeated: false,
    fightMechanic:
      'The ground shakes every 2 turns, dealing 15 damage to everyone (including her allies). ' +
      'She has high HP and Iron-boosted defense. Her tremor attack can\'t be dodged. Use Sight ' +
      'to predict the quake timing and block on the right turn.',
    crewConnection: 'dragghen',
  },

  // ==========================================
  // SORREN'S FLAT - The Orchid
  // ==========================================
  {
    id: 'the_orchid',
    name: 'The Orchid',
    epithet: 'The Orchid',
    race: 'Unknown',
    age: 0, // unknown
    islandId: 'sorrens_flat',
    description:
      'Appears as an elderly person of ambiguous gender, always holding a teacup, never seen ' +
      'standing. Runs the richest island in the Bastion Sea from a tea house. Nobody knows their ' +
      'real name, race, or age. The teacup has never been empty.',
    personality:
      'Speaks in questions that are actually answers. Never lies, but the truth is always three ' +
      'layers deeper than you think. The only person in the Bastion Sea who has never been ' +
      'surprised by anything.',
    philosophy: 'I don\'t sell information. I sell the future. The past is free.',
    dominion: {
      iron: { tier: 'flicker', level: 0 },
      sight: { tier: 'prime', level: 80 },
      king: { tier: 'tempered', level: 30 },
    },
    encounterId: '', // No combat -- this island cannot be taken by force
    defeated: false,
    fightMechanic:
      'No fight. The Orchid cannot be beaten in combat. This island is conquered through ' +
      'negotiation only. The Orchid offers you a deal -- and the deal is always fair, which ' +
      'is the most terrifying thing about them.',
  },

  // ==========================================
  // MOSSBREAK - Captain Hull, "The Barnacle"
  // ==========================================
  {
    id: 'captain_hull',
    name: 'Captain Hull',
    epithet: 'The Barnacle',
    race: 'Human',
    age: 72,
    islandId: 'mossbreak',
    description:
      'Old pirate. Ancient. Been on this island for 40 years. Missing one leg, one arm, both ' +
      'replaced with Craft-grade prosthetics that are better than the originals. The prosthetic ' +
      'arm is a cannon. The prosthetic leg has a hidden blade. He built them himself.',
    personality:
      'Grumpy, stubborn, secretly sentimental. Calls everyone "kid" including people older than ' +
      'him. Fights dirty because fair fights are for people with all their limbs. Deep down, he\'s ' +
      'lonely and looking for someone worthy to pass the island to.',
    philosophy: 'I was here first. That\'s all the law there is.',
    dominion: {
      iron: { tier: 'tempered', level: 30 },
      sight: { tier: 'flicker', level: 15 },
      king: { tier: 'flicker', level: 10 },
    },
    godFruit: {
      name: 'Tortoise Fruit',
      type: 'beast',
      description: 'Beast-type. Near-indestructible shell mode. The ultimate tank.',
      eaten: true,
      awakened: false,
    },
    weapon: 'Prosthetic Arm Cannon / Hidden Leg Blade',
    encounterId: 'boss_captain_hull',
    defeated: false,
    fightMechanic:
      'Highest DEF in the game. Shell mode activates at 50% HP (doubles DEF for 3 turns). ' +
      'Barely takes damage from physical attacks. You need armor-piercing (Dominion attacks) ' +
      'or sustained DPS. Endurance test. After defeat, becomes an NPC ally.',
  },

  // ==========================================
  // ANVIL CAY - Forge-Mother Tessik, "The Hammer"
  // ==========================================
  {
    id: 'forge_mother_tessik',
    name: 'Forge-Mother Tessik',
    epithet: 'The Hammer',
    race: 'Gorundai',
    age: 58,
    islandId: 'anvil_cay',
    description:
      '4\'10", arms thicker than most people\'s legs. Master weaponsmith. The best in the Bastion ' +
      'Sea. Her forge burns at temperatures that would melt standard tools -- she uses her bare ' +
      'hands. Forged Iron radiates from her skin like heat shimmer.',
    personality:
      'Judges people by their weapons. Finds Danzai "crude but honest." Speaks in crafting ' +
      'metaphors. Hates mass-produced Wardensea equipment with a passion that borders on religious. ' +
      'Respects anyone who fights with something they care about.',
    philosophy: 'A weapon tells you what its wielder believes in. Yours believes in breaking things.',
    dominion: {
      iron: { tier: 'prime', level: 70 },
      sight: { tier: 'flicker', level: 10 },
      king: { tier: 'flicker', level: 5 },
    },
    weapon: 'Bare hands (Prime Iron forge heat)',
    encounterId: 'boss_forge_mother',
    defeated: false,
    fightMechanic:
      'She upgrades her own weapon MID-FIGHT. Phase 1: punches (moderate damage). Phase 2: she ' +
      'forges gauntlets from the arena floor (high damage + burn). Phase 3: she forges a warhammer ' +
      'from molten iron (devastating). End it before Phase 3 or die. After defeat, she offers to ' +
      'upgrade Danzai (permanent weapon enhancement).',
  },

  // ==========================================
  // ROTSTONE - No villain (abandoned/mysterious island)
  // ==========================================

  // ==========================================
  // NOON ISLAND - Vessel Ahn, "The Noon Sun"
  // ==========================================
  {
    id: 'vessel_ahn',
    name: 'Vessel Ahn',
    epithet: 'The Noon Sun',
    race: 'Morventhi',
    age: 203,
    islandId: 'noon_island',
    description:
      'Ancient Morventhi elder. Skin like polished obsidian, eyes that glow faintly gold. ' +
      'Hasn\'t moved from the island\'s central shrine in forty years. The shrine moves ' +
      'around her instead. Noon Island\'s geography literally rearranges to protect her.',
    personality:
      'Speaks in present tense about the past and past tense about the future. Not insane. ' +
      'Her Sight is so advanced that time is non-linear to her. Peaceful, wise, terrifying ' +
      'because she already knows how your conversation ends.',
    philosophy: 'You will have already decided. I am merely waiting for you to notice.',
    dominion: {
      iron: { tier: 'flicker', level: 0 },
      sight: { tier: 'prime', level: 90 },
      king: { tier: 'forged', level: 45 },
    },
    encounterId: 'boss_vessel_ahn',
    defeated: false,
    fightMechanic:
      'Predicts your attacks before you make them. Every action you select, she has a 50% chance ' +
      'to counter it before it lands. Sight abilities reduce her prediction accuracy. King ' +
      'abilities override her foresight entirely. The fight is about willpower vs perception.',
    crewConnection: 'suulen',
  },

  // ==========================================
  // MIRRORWATER - (Optional late-game island)
  // ==========================================
  {
    id: 'echo_salis',
    name: 'Echo Salis',
    epithet: 'The Reflection',
    race: 'Human',
    age: 33,
    islandId: 'mirrorwater',
    description:
      'Identical to Karyudon in build but inverted: pale skin, white horns (prosthetic), silver ' +
      'eyes. A human who surgically modified themselves to look Oni. Obsessed with Karyudon since ' +
      'the Grimoire broadcasts began. Not a fan. A replacement.',
    personality:
      'Unsettling calm. Copies Karyudon\'s speech patterns. Has memorized every broadcast Kovesse ' +
      'has aired. Believes they can become Karyudon better than Karyudon can.',
    philosophy: 'You showed the world what strength looks like. I am the improved version.',
    dominion: {
      iron: { tier: 'forged', level: 45 },
      sight: { tier: 'tempered', level: 30 },
      king: { tier: 'flicker', level: 10 },
    },
    weapon: 'Replica Danzai (poorly made, breaks mid-fight)',
    encounterId: 'boss_echo_salis',
    defeated: false,
    fightMechanic:
      'Copies your last attack each turn. If you use Iron, he uses Iron. If you defend, he defends. ' +
      'Predictable once you figure out the pattern -- use varied abilities to keep him off balance. ' +
      'His weapon breaks at 50% HP, weakening his physical attacks permanently.',
    crewConnection: 'kovesse',
  },
];

// Helper to get villain for a specific island
export function getVillainForIsland(islandId: string): IslandVillain | undefined {
  return islandVillains.find((v) => v.islandId === islandId);
}

// Helper to get villain by ID
export function getVillainById(villainId: string): IslandVillain | undefined {
  return islandVillains.find((v) => v.id === villainId);
}
