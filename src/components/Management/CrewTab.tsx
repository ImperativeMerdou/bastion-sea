import React, { useState, useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import { CrewMember, CrewAssignment } from '../../types/game';
import { getPortrait } from '../../utils/images';
import { getAvailableCrewEvents, getNextBlockedCrewEvent, BlockedReason } from '../../data/story/crew_events';
import { DominionBar, PortraitImage, moodColors } from './shared';
import { CREW_BONUS } from '../../constants/balance';

// Crew job assignments require 2+ controlled islands
const CREW_ASSIGNMENTS_THRESHOLD = 2;

// ==========================================
// LOCKED STATE COPY
// Per-character + per-reason. Writing Directive compliant.
// No em dashes, no hype, no resolution.
// ==========================================

const CREW_LOCKED_FLAVOR: Record<string, string> = {
  delvessa: "She hasn't decided what to do with you yet.",
  dragghen: "A Gorundai doesn't open a door until he trusts the frame.",
  suulen: "She watches. She waits. Not yet.",
  kovesse: "Entertained isn't invested. She hasn't crossed that line with you.",
  tessek: "You've fought beside him. That's not the same as knowing him.",
  orren: "He has questions he hasn't asked yet.",
  vorreth: "He keeps his own counsel. That hasn't changed.",
};

const CREW_LOCKED_HINT: Record<BlockedReason, string> = {
  loyalty: "Build toward it. Keep your word.",
  day: "Give it more time.",
  prerequisite: "There's a conversation that needs to happen first.",
  act: "The campaign needs to go further before this opens.",
  flirt: "She hasn't seen that side of you yet.",
};

const CREW_ALL_DONE: Record<string, string> = {
  delvessa: "Everything she was willing to share, she's shared.",
  dragghen: "He's said what he had to say.",
  suulen: "What needed saying has been said.",
  kovesse: "She's told you more than she tells most people.",
  tessek: "You know the shape of him. He knows you.",
  orren: "He asked what he came to ask. You answered.",
  vorreth: "The walls are lower than they were.",
};

const CrewCard: React.FC<{ member: CrewMember; selected: boolean; onClick: () => void; hasEvent?: boolean }> = ({
  member, selected, onClick, hasEvent,
}) => {
  const portrait = getPortrait(member.id);
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 border cursor-pointer transition-all duration-200 rounded-sm relative ${
        selected
          ? 'bg-ocean-700 border-amber-500/50'
          : hasEvent
            ? 'bg-ocean-800 border-amber-500/30 hover:border-amber-400/60'
            : 'bg-ocean-800 border-ocean-600 hover:border-ocean-400'
      } ${!member.recruited ? 'opacity-50' : ''} ${member.injured ? 'border-l-2 border-l-crimson-500/70' : ''}`}
    >
      {/* New conversation badge */}
      {hasEvent && (
        <div className="absolute -top-1 -right-1 flex items-center gap-1 px-1.5 py-0.5 bg-amber-600/90 rounded-sm text-xs font-bold text-amber-100 tracking-wider animate-pulse shadow-lg shadow-amber-900/30">
          💬
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {portrait ? (
            <img
              src={portrait}
              alt={member.name}
              className={`w-8 h-8 rounded-full object-cover border ${hasEvent ? 'border-amber-400/60' : 'border-ocean-500'}`}
            />
          ) : (
            <div className={`w-8 h-8 rounded-full bg-ocean-700 border flex items-center justify-center text-ocean-300 text-xs font-bold ${hasEvent ? 'border-amber-400/60' : 'border-ocean-500'}`}>
              {member.name[0]}
            </div>
          )}
          <div>
            <h3 className="text-ocean-100 font-bold text-sm">{member.name}</h3>
            <p className="text-ocean-400 text-xs">
              {member.epithet} · {member.race}
              {member.injured ? (
                <span className="ml-1.5 text-crimson-400 uppercase font-bold">[INJURED]</span>
              ) : member.assignment && member.assignment !== 'unassigned' ? (
                <span className="ml-1.5 text-amber-400/80 uppercase">[{member.assignment}]</span>
              ) : null}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <span className={`text-xs font-bold uppercase ${moodColors[member.mood]}`}>
              {member.mood}
            </span>
            {member.loyalty <= 20 && member.mood !== 'mutinous' && (
              <span className="text-red-400 text-xs animate-pulse" title="Near mutiny threshold">▼</span>
            )}
            {member.loyalty >= 75 && member.mood !== 'loyal' && (
              <span className="text-green-400 text-xs" title="Approaching loyalty">▲</span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-16 h-1.5 bg-ocean-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  member.loyalty > 70 ? 'bg-green-500' :
                  member.loyalty > 40 ? 'bg-amber-500' :
                  'bg-crimson-500'
                }`}
                style={{ width: `${member.loyalty}%` }}
              />
            </div>
            <span className="text-ocean-400 text-xs">{member.loyalty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CrewTab: React.FC = () => {
  const crew = useGameStore(s => s.crew);
  const flags = useGameStore(s => s.flags);
  const dayCount = useGameStore(s => s.dayCount);
  const islands = useGameStore(s => s.islands);
  const resources = useGameStore(s => s.resources);
  const assignCrewRole = useGameStore(s => s.assignCrewRole);
  const giveCrewGift = useGameStore(s => s.giveCrewGift);
  const startScene = useGameStore(s => s.startScene);
  const setActivePanel = useGameStore(s => s.setActivePanel);

  const [selectedCrewId, setSelectedCrewId] = useState<string | null>(null);

  const recruitedCrew = useMemo(() => crew.filter((m) => m.recruited), [crew]);
  const selectedMember = crew.find((m) => m.id === selectedCrewId);
  const territoryCount = useMemo(() => islands.filter((i) => i.status === 'controlled').length, [islands]);

  // Count crew members with available conversations (memoized - expensive)
  const crewEventCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const member of crew) {
      if (!member.recruited) continue;
      const available = getAvailableCrewEvents(member.id, flags, dayCount, member.loyalty);
      counts[member.id] = available.length;
    }
    return counts;
  }, [crew, flags, dayCount]);

  return (
    <div className="flex gap-4 h-full animate-fade-in">
      {/* Crew List */}
      <div className="w-72 space-y-2">
        <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-3">
          CREW ({recruitedCrew.length}/{crew.length})
        </h3>

        {/* Crew conversation alert banner */}
        {Object.values(crewEventCounts).some(c => c > 0) && (
          <button
            onClick={() => {
              const memberId = Object.entries(crewEventCounts).find(([, c]) => c > 0)?.[0];
              if (memberId) setSelectedCrewId(memberId);
            }}
            className="w-full px-3 py-2.5 bg-amber-600/20 border border-amber-500/40 rounded text-left transition-all hover:bg-amber-600/30 hover:border-amber-400/60 mb-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-amber-300 text-lg animate-pulse">💬</span>
              <div>
                <p className="text-amber-300 text-xs font-bold tracking-wider">
                  NEW CONVERSATIONS ({Object.values(crewEventCounts).filter(c => c > 0).length})
                </p>
                <p className="text-amber-400/70 text-xs mt-0.5">
                  Someone's been waiting to talk.
                </p>
              </div>
            </div>
          </button>
        )}

        {crew.map((member) => (
          <CrewCard
            key={member.id}
            member={member}
            selected={selectedCrewId === member.id}
            hasEvent={crewEventCounts[member.id] > 0}
            onClick={() => setSelectedCrewId(member.id)}
          />
        ))}
      </div>

      {/* Selected Member Detail */}
      {selectedMember && (
        <div className="flex-1 bg-ocean-800 border border-ocean-600 rounded-sm p-5 space-y-4 animate-fade-in">
          <div className="flex items-start gap-4">
            <PortraitImage characterId={selectedMember.id} fallback={selectedMember.name[0]} size="w-20 h-28" />
            <div>
              <h2 className="text-xl font-display font-bold text-ocean-100">
                {selectedMember.name}
              </h2>
              <p className="text-amber-400 text-sm">{selectedMember.epithet}</p>
              <p className="text-ocean-400 text-xs mt-1">
                {selectedMember.race} · Age {selectedMember.age} · {selectedMember.role}
              </p>
              {selectedMember.bounty > 0 && (
                <p className="text-crimson-400 text-xs font-bold mt-1">
                  BOUNTY: {(selectedMember.bounty / 1000000).toFixed(0)}M ⬡
                </p>
              )}
            </div>
          </div>

          {/* Injury Banner */}
          {selectedMember.injured && (
            <div className="bg-crimson-900/40 border border-crimson-600/50 rounded-sm px-4 py-2 flex items-center gap-3">
              <span className="text-crimson-400 text-lg">🩹</span>
              <div>
                <p className="text-crimson-300 text-sm font-bold">INJURED</p>
                <p className="text-crimson-400/80 text-xs">
                  Recovering until Day {selectedMember.injuredUntilDay}. Cannot assist in combat or perform ship duties.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <DominionBar label="Iron" tier={selectedMember.dominion?.iron?.tier ?? 'flicker'} level={selectedMember.dominion?.iron?.level ?? 0} />
            <DominionBar label="Sight" tier={selectedMember.dominion?.sight?.tier ?? 'flicker'} level={selectedMember.dominion?.sight?.level ?? 0} />
            <DominionBar label="King" tier={selectedMember.dominion?.king?.tier ?? 'flicker'} level={selectedMember.dominion?.king?.level ?? 0} />
          </div>

          {selectedMember.weapon && (
            <div>
              <h4 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-1">WEAPON</h4>
              <p className="text-ocean-200 text-sm">{selectedMember.weapon}</p>
            </div>
          )}

          <div>
            <h4 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-1">PERSONALITY</h4>
            <p className="text-ocean-200 text-sm leading-relaxed">{selectedMember.personality}</p>
          </div>

          <div>
            <h4 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-1">FLAW</h4>
            <p className="text-crimson-300 text-sm leading-relaxed italic">{selectedMember.flaw}</p>
          </div>

          <div>
            <h4 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-1">DREAM</h4>
            <p className="text-ocean-200 text-sm italic font-display">"{selectedMember.dream}"</p>
          </div>

          {/* Crew Bonus - spend sovereigns to boost loyalty */}
          {selectedMember.recruited && selectedMember.alive && (() => {
            const lastGiftDay = (flags[`crew_gift_${selectedMember.id}_day`] as number) || 0;
            const onCooldown = dayCount - lastGiftDay < CREW_BONUS.GIFT_COOLDOWN_DAYS;
            const canAfford = resources.sovereigns >= CREW_BONUS.GIFT_COST;
            const atMax = selectedMember.loyalty >= 100;
            const cooldownLeft = CREW_BONUS.GIFT_COOLDOWN_DAYS - (dayCount - lastGiftDay);
            return (
              <div className="pt-2 border-t border-ocean-700/50">
                <button
                  onClick={() => giveCrewGift(selectedMember.id)}
                  disabled={onCooldown || !canAfford || atMax}
                  className="px-4 py-2 bg-amber-600/20 border border-amber-500/40 rounded-sm text-amber-300 text-xs font-bold hover:bg-amber-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  title={atMax ? 'Loyalty already at maximum' : onCooldown ? `Available in ${cooldownLeft} day${cooldownLeft !== 1 ? 's' : ''}` : !canAfford ? `Need ${CREW_BONUS.GIFT_COST} sovereigns` : `Spend ${CREW_BONUS.GIFT_COST} sov to boost loyalty by ${CREW_BONUS.GIFT_LOYALTY_BOOST}`}
                >
                  Crew Bonus ({CREW_BONUS.GIFT_COST} sov) +{CREW_BONUS.GIFT_LOYALTY_BOOST} loyalty
                </button>
                {onCooldown && !atMax && (
                  <p className="text-ocean-500 text-xs mt-1">Available in {cooldownLeft} day{cooldownLeft !== 1 ? 's' : ''}</p>
                )}
              </div>
            );
          })()}

          {/* Crew Assignment -- gated behind 2+ controlled islands */}
          {selectedMember.recruited && territoryCount < CREW_ASSIGNMENTS_THRESHOLD ? (
            <div className="px-4 py-3 bg-ocean-800/50 border border-ocean-700 rounded-sm">
              <h4 className="text-xs font-bold text-ocean-600 tracking-wider uppercase mb-1">
                &#128274; SHIP ASSIGNMENT
              </h4>
              <p className="text-ocean-500 text-xs italic">
                Control {CREW_ASSIGNMENTS_THRESHOLD}+ islands to unlock crew job assignments.
                Currently: {territoryCount} island{territoryCount !== 1 ? 's' : ''}.
              </p>
            </div>
          ) : selectedMember.recruited && (
            <div>
              <h4 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase mb-2">
                SHIP ASSIGNMENT
                {selectedMember.injured && <span className="ml-2 text-crimson-400 text-xs normal-case">(unavailable while injured)</span>}
              </h4>
              <div className="flex flex-wrap gap-2">
                {([
                  { role: 'unassigned' as CrewAssignment, label: 'NONE', desc: 'No active duty' },
                  { role: 'navigator' as CrewAssignment, label: 'NAVIGATOR', desc: '-1 travel day' },
                  { role: 'lookout' as CrewAssignment, label: 'LOOKOUT', desc: '+2 intel/day' },
                  { role: 'trader' as CrewAssignment, label: 'TRADER', desc: '+5% territory income' },
                  { role: 'trainer' as CrewAssignment, label: 'TRAINER', desc: '+2 XP when training' },
                  { role: 'diplomat' as CrewAssignment, label: 'DIPLOMAT', desc: '+2 morale/day to ALL territories, -10% shop prices' },
                  { role: 'quartermaster' as CrewAssignment, label: 'QUARTERMASTER', desc: 'Reduces supply crisis chance' },
                ]).map(({ role, label, desc }) => {
                  const isActive = (selectedMember.assignment || 'unassigned') === role;
                  const otherAssigned = role !== 'unassigned' && crew.some(
                    (m) => m.id !== selectedMember.id && m.recruited && m.alive && m.assignment === role
                  );
                  const isDisabled = otherAssigned || (selectedMember.injured && role !== 'unassigned');
                  return (
                    <button
                      key={role}
                      onClick={() => !isDisabled && assignCrewRole(selectedMember.id, role)}
                      disabled={isDisabled}
                      className={`px-3 py-2 text-xs font-bold tracking-wider rounded-sm transition-all ${
                        isActive
                          ? 'bg-amber-600/40 text-amber-300 border border-amber-500/50'
                          : isDisabled
                            ? 'bg-ocean-800 text-ocean-600 border border-ocean-700 cursor-not-allowed'
                            : 'bg-ocean-700 text-ocean-300 hover:bg-ocean-600 border border-ocean-600'
                      }`}
                      title={selectedMember.injured ? 'Injured -- cannot assign duties' : otherAssigned ? `Another crew member is assigned as ${label}` : desc}
                    >
                      {label}
                      {isActive && <span className="ml-1 text-amber-400">*</span>}
                    </button>
                  );
                })}
              </div>
              {(selectedMember.assignment && selectedMember.assignment !== 'unassigned') && (
                <p className="text-ocean-500 text-xs mt-1.5 italic">
                  {selectedMember.assignment === 'navigator' && 'Charting faster routes. Travel time reduced by 1 day.'}
                  {selectedMember.assignment === 'lookout' && 'Scanning the horizon. +2 Intelligence per day.'}
                  {selectedMember.assignment === 'trader' && 'Working the markets. +5% daily territory sovereignty income.'}
                  {selectedMember.assignment === 'trainer' && 'Drilling with the captain. +2 bonus Dominion XP when training.'}
                  {selectedMember.assignment === 'diplomat' && 'Managing territory relations. +2 morale/day to ALL controlled territories.'}
                  {selectedMember.assignment === 'quartermaster' && 'Managing supply lines. Reduces supply crisis chance by 8%.'}
                </p>
              )}
            </div>
          )}

          {/* Relationship depth + conversation action */}
          {selectedMember.recruited && (() => {
            const available = getAvailableCrewEvents(selectedMember.id, flags, dayCount, selectedMember.loyalty);
            const blocked = available.length === 0
              ? getNextBlockedCrewEvent(selectedMember.id, flags, dayCount, selectedMember.loyalty)
              : null;

            const completionFlags = [
              `${selectedMember.id}_event_01_complete`,
              `${selectedMember.id}_event_02_complete`,
              `${selectedMember.id}_event_03_complete`,
              `${selectedMember.id}_event_04_complete`,
            ];
            const completedCount = completionFlags.filter(f => !!flags[f]).length;

            return (
              <div className="mt-4 space-y-3">
                {/* Bond depth dots + Trust level */}
                <div className="flex items-center justify-between pt-2 border-t border-ocean-700/30">
                  {/* Bond dots (left) */}
                  <div className="flex items-center gap-2">
                    <span className="text-ocean-600 text-[10px] font-bold tracking-[0.12em] uppercase">Bond</span>
                    <div className="flex items-center gap-1.5">
                      {completionFlags.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full border transition-all ${
                            i < completedCount
                              ? 'bg-amber-500/70 border-amber-400/60'
                              : i === completedCount
                                ? 'bg-transparent border-ocean-400/80'
                                : 'bg-transparent border-ocean-700/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Trust level (right) -- visible on same screen as locked state */}
                  <div className="flex items-center gap-2">
                    <span className="text-ocean-600 text-[10px] font-bold tracking-[0.12em] uppercase">Trust</span>
                    <div className="w-20 h-1.5 bg-ocean-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          selectedMember.loyalty > 70 ? 'bg-green-500/70' :
                          selectedMember.loyalty > 40 ? 'bg-amber-500/70' :
                          'bg-crimson-500/70'
                        }`}
                        style={{ width: `${selectedMember.loyalty}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-bold uppercase ${moodColors[selectedMember.mood]}`}>
                      {selectedMember.mood}
                    </span>
                  </div>
                </div>

                {/* Action: available, locked, or all done */}
                {available.length > 0 ? (
                  <button
                    onClick={() => {
                      const event = available[0];
                      startScene({ ...event.scene, currentBeat: 0 });
                      setActivePanel('story');
                    }}
                    className="w-full px-4 py-3 bg-amber-700/60 hover:bg-amber-600/70 border border-amber-500/40 text-amber-100 font-bold text-sm tracking-widest uppercase transition-all rounded-sm flex items-center justify-center gap-2"
                  >
                    <span>💬</span> TALK TO {selectedMember.name.split(' ')[0].toUpperCase()}
                  </button>
                ) : blocked ? (
                  <div className="px-4 py-3 bg-ocean-900/50 border border-ocean-700/50 rounded-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-ocean-600 text-base mt-0.5 select-none">&#128274;</span>
                      <div>
                        <p className="text-ocean-300/80 text-sm italic leading-relaxed">
                          {CREW_LOCKED_FLAVOR[selectedMember.id] ?? "Not yet."}
                        </p>
                        <p className="text-ocean-500 text-xs mt-2">
                          {CREW_LOCKED_HINT[blocked.reason]}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-3 bg-ocean-900/40 border border-ocean-700/30 rounded-sm">
                    <p className="text-ocean-500 text-sm italic leading-relaxed">
                      {CREW_ALL_DONE[selectedMember.id] ?? "Nothing left unsaid. For now."}
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

          {!selectedMember.recruited && (
            <div className="mt-4 px-4 py-3 bg-ocean-900/50 border border-ocean-700/40 rounded-sm">
              <p className="text-ocean-500 text-sm italic">Not yet arrived. Their story begins elsewhere.</p>
            </div>
          )}
        </div>
      )}

      {!selectedMember && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-ocean-500 text-sm italic">Select a crew member to view details.</p>
        </div>
      )}
    </div>
  );
};
