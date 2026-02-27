import { MC } from '../types/game';

export const initialMC: MC = {
  id: 'karyudon',
  name: 'Karyudon',
  race: 'Oni',
  age: 28,
  bounty: 0,
  description: 'Seven feet of Oni built like a siege weapon that learned to walk. Esmer skin, two thick horns curving forward, a wild mane of black hair shot through with crimson. Amber eyes that burn bright. The Wardensea prison didn\'t shrink him. If anything, the weeks of confinement compressed whatever was inside into something denser.',
  personality: 'Loud, blunt, and unapologetically ambitious. Speaks with the full weight of every word. Gets quieter under real pressure. The crew learns to read the silence.',
  flaw: 'Doesn\'t plan. He hits the first domino and rides the chain reaction. The crew\'s strategists spend half their time building plans around a man who\'s already moving.',
  dream: 'World Conqueror. He says it out loud. He means it literally.',
  dominion: {
    iron: { tier: 'flicker', level: 8 },
    sight: { tier: 'flicker', level: 5 },
    king: { tier: 'flicker', level: 0 },
  },
  korvaan: 'none',
  weapon: 'Danzai',  // Iron-spiked war club - named, feared, heavy enough to crack stone
  godFruit: {
    name: 'Western Dragon Fruit',
    type: 'mythical_beast',
    description: 'Mythical Beast-type. Transforms the user into a western dragon, winged, fire-breathing, Ancalagon-scaled. Hybrid form available. The rarest class of God Fruit in existence.',
    eaten: false,
    awakened: false,
  },
  dragonFruitEaten: false,
  dragonFruitPossessed: true,
  reputation: 0,
  infamy: 0,
  territory: [],
};
