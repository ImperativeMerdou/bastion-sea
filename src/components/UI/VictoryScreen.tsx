import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { getImagePath } from '../../utils/images';
import { epilogueScene } from '../../data/story/epilogue';

const VICTORY_BACKGROUNDS: Record<string, string> = {
  conqueror: 'victory_conqueror.webp',
  pragmatist: 'victory_pragmatist.webp',
  liberator: 'victory_liberator.webp',
};

// ==========================================
// VICTORY SCREEN - Three epilogues diverge
// ==========================================

const TITLES: Record<string, string> = {
  conqueror: "THE CONQUEROR'S SEA",
  pragmatist: "THE KING'S TIDE",
  liberator: 'THE FREE WATERS',
};

const SUBTITLES: Record<string, string> = {
  conqueror: 'The Bastion Sea bows to one name.',
  pragmatist: 'The crown sits heavy. The sea holds steady.',
  liberator: 'No masters. No chains. Only the tide.',
};

// Epilogue paragraphs - identity-specific
const EPILOGUES: Record<string, string[]> = {
  conqueror: [
    'They paint your name on the harbour walls in crimson and gold. Not out of love. Out of understanding. The Bastion Sea has a new apex predator, and every captain who once laughed at the idea of an Oni with a stolen ship now lowers their sails when your shadow crosses the horizon.',
    'The Wardensea signs a formal recognition of territorial sovereignty. Not because they want to. Because the alternative is another fleet sunk at the bottom of a channel they used to own. Admiral Vasshen\'s career is over. The officers who served under her are requesting transfers to quieter waters. There are no quieter waters.',
    'The Conquerors send an envoy. The Fifth Seat is open, reserved for the strongest. You decline the seat. You don\'t sit at tables. You build them.',
    'Delvessa calculates the new trade routes. Dragghen rebuilds the docks, rates them a five. Kovesse broadcasts to half the continent. Tessek names his final technique and registers the Vayne Style. Orren finally controls his full output. Vorreth frees the last name on his list, then falls asleep standing up at the ceremony. Suulen watches from the shadows, where the next threat is already forming.',
    'You stand on the signal tower at Vess Harbour with the Danzai on your back and the whole sea in front of you. The world didn\'t know your name six months ago. Now it can\'t forget it.',
  ],
  pragmatist: [
    'The treaties are signed in three languages. Wardensea Standard, Kolmari Commercial, and the Conqueror cipher that Suulen somehow learned overnight. Each faction keeps a copy. Each copy says the same thing: the Bastion Sea is sovereign territory under the protection of Karyudon\'s fleet.',
    'Trade routes reopen. Kolmari merchants return to the channels they abandoned, cautiously, with smaller margins and bigger insurance policies. The harbours fill with commerce instead of warships. Revenue projections climb. Delvessa tracks every coin and pretends not to smile.',
    'The islands govern themselves. Island councils handle local disputes while your fleet handles everything else. Dragghen runs the shipyard network. Every vessel is rated on a scale of one to ten. Nobody gets above a six. Vorreth builds a harbour garrison that fights like the Daaz Accord at its peak but answers to the people instead of any single captain.',
    'It isn\'t a kingdom, exactly. It\'s something new, a federation held together by trade, threat, and the simple understanding that the alternative is worse. The historians will argue about what to call it for decades.',
    'You stand on the signal tower and look at something that actually works. Not perfect. Not clean. But standing. And you built it with five people and a ship.',
  ],
  liberator: [
    'You burn the flag. Your own flag. The one Kovesse designed with the crimson horns and the gold tide-mark. You burn it in front of every island council in the Bastion Sea, and you tell them the same thing you told yourself in the prison transport: nobody owns the sea.',
    'The islands form their own councils. They argue, they compete, they make mistakes. But they make them freely. No Wardensea quotas. No Kolmari tariffs. No Conqueror tribute. Just people figuring out how to live together without someone standing over them with a sword.',
    'Vorreth stays to train the island militias. He frees all eighteen names on his list. Delvessa builds an inter-island trade network that runs on cooperation instead of coercion. Dragghen opens three shipyards across the Belt, public yards where anyone can repair their vessel, free of charge, because a sinking ship is the oldest form of captivity at sea.',
    'Kovesse broadcasts it all. The Grimoire feed becomes the voice of the Free Waters, a network of independent channels covering everything from harbour news to weather patterns. No editorial control. No censorship. Chaotic, loud, and exactly right.',
    'You don\'t stay. That was always the plan, even if nobody believed you. Suulen arranges passage north. The Kingsrun waits, the route nobody has completed in a hundred years. You leave the Danzai behind. The sea doesn\'t need another weapon. It needs what you already gave it.',
  ],
};

// Crew fate summaries based on game state
function getCrewFate(
  crewId: string,
  recruited: boolean,
  alive: boolean,
  loyalty: number,
  identity: string,
): string {
  if (!recruited) return 'Never joined the crew.';
  if (!alive) return 'Lost at sea. Remembered.';

  switch (crewId) {
    case 'dragghen':
      if (loyalty >= 80) return 'Returns to the Kolmari shipyards. Frees the remaining debt-labor workers. Builds the ship that can\'t be sunk. Rates it a six. His highest score.';
      if (loyalty >= 40) return 'Stays with the fleet. Keeps repairing. Keeps rating everything. The crew never gets above a five, and they never stop trying.';
      return 'Returns to Coppervein. Opens a quiet repair shop. Doesn\'t talk about the sea.';
    case 'tessek':
      if (loyalty >= 80) return 'Registers the Vayne Style with the Bastion Sea martial archives. Three schools adopt it within a year. Tessek claims Garroden Harsk acknowledged it. Nobody can confirm this.';
      if (loyalty >= 40) return 'Stays with the fleet. Keeps naming techniques. Keeps searching for Garroden Harsk. The crew debates whether Garroden is real. Delvessa\'s intel says no. Tessek says that proves how dangerous he is.';
      return 'Wanders the Bastion Sea alone. Developing his style. Searching for a rival worthy of the name. Some say he found one.';
    case 'orren':
      if (loyalty >= 80) return 'Masters the Storm Eel Fruit completely. Full output, zero friendly casualties. Teaches other God Fruit users at Mirrorwater. His ears still betray every emotion. Kovesse has catalogued thirty-two positions.';
      if (loyalty >= 40) return 'Stays with the fleet. The magnetism incidents decrease. The ear-reading doesn\'t. Orren accepts both.';
      return 'Returns to Tavven Shoal under Pettha Koss\'s protection. The Kolmari bounty on the fruit remains open. Orren remains free.';
    case 'vorreth':
      if (loyalty >= 80) return 'Frees all eighteen names on the list. Every single one. Then builds the Second Daaz Accord, a fleet that answers to no one and protects everyone. Falls asleep at the founding ceremony. Twice.';
      if (loyalty >= 40) return 'Stays as First Mate. Frees twelve of the eighteen. The remaining six are in facilities he hasn\'t found yet. He will.';
      return 'Leaves to hunt the remaining names on his list alone. Gets lost twice on the way out of port. Suulen draws him a map. He loses it.';

    case 'delvessa':
      if (identity === 'pragmatist' && loyalty >= 60) return 'Becomes the Bastion Sea\'s first Trade Commissioner. Revenue triples in eight months. She claims it was obvious.';
      if (loyalty >= 80) return 'Stays. Not for the money. Not for the strategy. For the view from the signal tower, and the person standing next to her.';
      if (loyalty >= 40) return 'Continues as fleet strategist. The Kolmari try to recruit her twice. She declines both times. Politely.';
      return 'Returns to the Kolmari. Takes a position that pays better and means less. Sends a letter once. It arrives unsigned.';
    case 'suulen':
      if (loyalty >= 80) return 'Disappears into the information network. Becomes the most connected person in the Bastion Sea. Nobody knows her face. Everyone knows her reach.';
      if (loyalty >= 40) return 'Maintains the shadow network. Reports arrive. Threats are handled before they materialize. Suulen is everywhere and nowhere.';
      return 'Vanishes. Completely. No word, no trace, no forwarding address. The network goes silent. Wherever Suulen is, they chose it deliberately.';
    case 'kovesse':
      if (loyalty >= 80) return 'Builds the Grimoire Broadcasting Network, GBN. Thirty channels. Two hundred thousand subscribers. She is insufferable about the metrics. Deservedly.';
      if (loyalty >= 40) return 'Keeps broadcasting. The feed grows. The audience grows. Kovesse becomes the most famous journalist in the Bastion Sea, which is exactly what she always wanted.';
      return 'Goes independent. Starts a rival broadcast network. It\'s good. Annoyingly good. She covers your story like a critic, not a crewmate.';
    // Legacy harroven case removed - replaced by tessek, orren, vorreth above
    default:
      return 'Their story continues beyond the horizon.';
  }
}

// World state epilogue
function getWorldEpilogue(flags: Record<string, unknown>): string[] {
  const lines: string[] = [];

  if (flags['vasshen_defeated']) {
    lines.push('Admiral Vasshen retires from active service. Her final report to the Wardensea Admiralty is seven pages long and contains a single recommendation: "Do not provoke the Oni."');
  } else {
    lines.push('Admiral Vasshen is reassigned to a desk posting. Her fleet is dissolved. The Second Division becomes a historical footnote.');
  }

  if (flags['conqueror_alliance'] === 'allied') {
    lines.push('The Conqueror alliance holds, uneasily. Tessavarra sends a barrel of wine and a note: "To the Sixth Seat we never filled." The wine is excellent. The message is ambiguous.');
  } else if (flags['conqueror_alliance'] === 'rejected') {
    lines.push('The Conquerors maintain their distance. Tessavarra watches from Ghostlight. The uneasy peace holds because both sides have bigger problems.');
  } else if (flags['conqueror_alliance'] === 'pending') {
    lines.push('Tessavarra never calls back. The Conqueror channel falls silent. Whatever offer was on the table, it had an expiration date. Nobody tells you when it passed.');
  }

  if (flags['blockade_resolved']) {
    lines.push('Kolmari trade returns to the Bastion Sea within weeks. The Confederation never apologizes for the blockade. They do, however, offer preferential shipping rates. For the Kolmari, that IS an apology.');
  }

  return lines;
}

export default function VictoryScreen() {
  const [dismissed, setDismissed] = useState(false);
  const [activeTab, setActiveTab] = useState<'epilogue' | 'crew' | 'world'>('epilogue');

  const flags = useGameStore((s) => s.flags);
  const dayCount = useGameStore((s) => s.dayCount);
  const crew = useGameStore((s) => s.crew);
  const islands = useGameStore((s) => s.islands);
  const mc = useGameStore((s) => s.mc);
  const startScene = useGameStore((s) => s.startScene);
  const setActivePanel = useGameStore((s) => s.setActivePanel);

  if (!flags.game_complete || dismissed) return null;

  const rulerIdentity = (flags.ruler_identity as string) || '';
  const title = TITLES[rulerIdentity] || 'GODTIDE';
  const subtitle = SUBTITLES[rulerIdentity] || 'The tide has turned.';
  const bgFile = VICTORY_BACKGROUNDS[rulerIdentity];
  const bgImage = bgFile ? getImagePath(bgFile) : null;
  const epilogue = EPILOGUES[rulerIdentity] || EPILOGUES['pragmatist'];
  const worldLines = getWorldEpilogue(flags as Record<string, unknown>);

  const territoriesConquered = islands.filter((i) => i.conquered).length;
  const crewCount = crew.filter((m) => m.recruited && m.alive).length;
  const combatVictories = Number(flags['combat_victories'] || 0);
  const bountyFormatted = mc.bounty >= 1000000 ? `${(mc.bounty / 1000000).toFixed(0)}M` : mc.bounty.toString();

  const stats = [
    { icon: '☀', label: 'Days', value: dayCount },
    { icon: '⚑', label: 'Territories', value: territoriesConquered },
    { icon: '⚓', label: 'Crew', value: crewCount },
    { icon: '★', label: 'Reputation', value: mc.reputation },
    { icon: '☠', label: 'Infamy', value: mc.infamy },
    { icon: '⚔', label: 'Victories', value: combatVictories },
    { icon: '💰', label: 'Bounty', value: bountyFormatted },
  ];

  const handleContinuePlaying = () => {
    // First dismissal after game completion: trigger the post-credits epilogue
    if (!flags.epilogue_complete) {
      startScene(epilogueScene);
      setActivePanel('story');
    }
    setDismissed(true);
  };

  const handleReturnToTitle = () => {
    window.location.reload();
  };

  const tabs: { id: 'epilogue' | 'crew' | 'world'; label: string }[] = [
    { id: 'epilogue', label: 'EPILOGUE' },
    { id: 'crew', label: 'CREW FATES' },
    { id: 'world', label: 'WORLD STATE' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ocean-950/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Background image (falls back to gradient if not generated yet) */}
      {bgImage && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 2.5 }}
        />
      )}
      <div className="absolute inset-0 bg-ocean-950/80" />
      <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col rounded-lg bg-ocean-900/90 border border-gold-500/30 shadow-[0_0_60px_rgba(196,148,58,0.15)]">
        {/* Header */}
        <div className="p-6 sm:p-8 pb-4 text-center flex-shrink-0">
          <motion.h1
            className="font-display text-3xl sm:text-4xl font-bold tracking-[0.15em] text-gold-400 mb-1"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-ocean-300 text-sm italic tracking-wide font-narration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>

          {/* Decorative rule */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500/60 text-xs">{'\u2B21'}</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          className="px-6 sm:px-8 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-0.5 py-2 px-1 rounded bg-ocean-800/60 border border-ocean-700/50"
              >
                <span className="text-base">{stat.icon}</span>
                <span className="text-ocean-400 text-xs font-display tracking-[0.15em] uppercase">{stat.label}</span>
                <span className="text-gold-400 text-sm font-bold font-display">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tab navigation */}
        <div className="px-6 sm:px-8 flex-shrink-0">
          <div className="flex gap-1 border-b border-ocean-700 mb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-display font-bold tracking-[0.15em] transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-gold-400 text-gold-400'
                    : 'border-transparent text-ocean-400 hover:text-ocean-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4">
          <AnimatePresence mode="wait">
            {activeTab === 'epilogue' && (
              <motion.div
                key="epilogue"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {epilogue.map((para, i) => (
                  <motion.p
                    key={i}
                    className="text-ocean-200 text-sm leading-relaxed font-narration"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </motion.div>
            )}

            {activeTab === 'crew' && (
              <motion.div
                key="crew"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {crew.map((member) => (
                  <div
                    key={member.id}
                    className={`p-3 rounded border-l-2 ${
                      !member.recruited
                        ? 'border-l-ocean-700 bg-ocean-800/30 opacity-50'
                        : !member.alive
                        ? 'border-l-crimson-500 bg-ocean-800/40'
                        : member.loyalty >= 80
                        ? 'border-l-amber-400 bg-ocean-800/60'
                        : member.loyalty >= 40
                        ? 'border-l-ocean-400 bg-ocean-800/60'
                        : 'border-l-crimson-400 bg-ocean-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-ocean-100 text-sm font-display font-bold">{member.name}</span>
                      <span className={`text-xs ${
                        !member.alive ? 'text-crimson-400' :
                        member.loyalty >= 80 ? 'text-amber-400' :
                        member.loyalty >= 40 ? 'text-ocean-400' : 'text-crimson-400'
                      }`}>
                        {!member.alive ? 'FALLEN' :
                         member.loyalty >= 80 ? 'LOYAL' :
                         member.loyalty >= 40 ? 'STEADY' : 'DISTANT'}
                      </span>
                    </div>
                    <p className="text-ocean-300 text-xs leading-relaxed italic font-narration">
                      {getCrewFate(member.id, member.recruited, member.alive, member.loyalty, rulerIdentity)}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'world' && (
              <motion.div
                key="world"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-gold-400 text-xs font-display font-bold tracking-[0.15em] mb-2">THE FACTIONS</h4>
                  {worldLines.map((line, i) => (
                    <p key={i} className="text-ocean-200 text-sm leading-relaxed mb-2">{line}</p>
                  ))}
                </div>
                <div>
                  <h4 className="text-gold-400 text-xs font-display font-bold tracking-[0.15em] mb-2">THE BASTION SEA</h4>
                  <p className="text-ocean-200 text-sm leading-relaxed font-narration">
                    {territoriesConquered >= 10
                      ? 'Nearly every island in the Bastion Sea flies under your influence. The trade routes run clean. The harbours prosper. For the first time in living memory, the sea has a center of gravity.'
                      : territoriesConquered >= 6
                      ? 'A significant portion of the Bastion Sea answers to your fleet. Gaps remain, islands that held out, passages that still run wild. But the shape of something new is visible, and it started with you.'
                      : 'Pockets of control in a wild sea. Your territories hold, but the Bastion Sea remains largely ungoverned. Perhaps that was the point. You never wanted everything. Just enough to matter.'}
                  </p>
                </div>
                <div>
                  <h4 className="text-gold-400 text-xs font-display font-bold tracking-[0.15em] mb-2">THE GRIMOIRE</h4>
                  <p className="text-ocean-200 text-sm leading-relaxed font-narration">
                    {mc.infamy > mc.reputation
                      ? 'The Grimoire writes your story as a cautionary tale. Children in Wardensea academies learn about the Oni of the Bastion Sea the way they learn about storms, a force of nature that cannot be reasoned with, only survived.'
                      : mc.reputation > 20
                      ? 'The Grimoire writes your story as a legend. "From prison transport to sovereign fleet". The narrative writes itself. Kovesse makes sure it writes correctly. Mostly.'
                      : 'The Grimoire writes your story as a question mark. Who was the Oni? What did they want? The answer depends on who you ask and whether they were on your side when the tide turned.'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer buttons */}
        <div className="p-6 sm:p-8 pt-4 flex-shrink-0 border-t border-ocean-700/50">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleContinuePlaying}
              className="w-full sm:w-auto px-8 py-3 text-sm font-display font-bold tracking-[0.15em] uppercase border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400 transition-colors rounded"
            >
              CONTINUE PLAYING
            </button>
            <button
              onClick={handleReturnToTitle}
              className="w-full sm:w-auto px-8 py-3 text-sm font-display font-bold tracking-[0.15em] uppercase border border-ocean-600 text-ocean-400 hover:bg-ocean-700/40 hover:border-ocean-500 hover:text-ocean-300 transition-colors rounded"
            >
              RETURN TO TITLE
            </button>
          </div>
          <div className="mt-6 text-center">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mb-4" />
            <p className="text-ocean-300/60 text-xs italic tracking-wide font-narration">
              Every tide begins with one wave.
            </p>
            {flags.epilogue_complete && (
              <p className="text-ocean-500/50 text-xs italic tracking-wider mt-1">
                Kirin&apos;s story continues.
              </p>
            )}
            <p className="text-gold-400/80 text-sm font-display font-bold tracking-[0.2em] uppercase mt-2">
              Created by Mert Akhan
            </p>
            <p className="text-ocean-600/40 text-xs mt-2 tracking-[0.4em] uppercase">
              v1.0.0
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
