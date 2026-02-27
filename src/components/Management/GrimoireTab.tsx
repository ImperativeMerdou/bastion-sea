import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { getImagePath } from '../../utils/images';

const typeIcons: Record<string, { icon: string; label: string; color: string }> = {
  bounty: { icon: '\uD83C\uDFF4\u200D\u2620\uFE0F', label: 'BOUNTY', color: 'text-crimson-400' },
  grimoire: { icon: '\uD83D\uDCE1', label: 'BROADCAST', color: 'text-purple-400' },
  crew: { icon: '\u2693', label: 'CREW', color: 'text-green-400' },
  wardensea: { icon: '\u2694\uFE0F', label: 'WARDENSEA', color: 'text-blue-400' },
  conqueror: { icon: '\uD83C\uDFF4', label: 'CONQUEROR', color: 'text-amber-400' },
  story: { icon: '\uD83D\uDCDC', label: 'EVENT', color: 'text-ocean-300' },
};

export const GrimoireTab: React.FC = () => {
  const notifications = useGameStore(s => s.notifications);
  const markNotificationRead = useGameStore(s => s.markNotificationRead);
  const dayCount = useGameStore(s => s.dayCount);

  // Show in chronological order (oldest first), limited to the 40 most recent
  const sortedNotifs = [...notifications].slice(0, 40).reverse();
  const unreadNotifs = sortedNotifs.filter(n => !n.read);
  const grimoireFrame = getImagePath('grimoire_frame.webp');

  return (
    <div className="relative space-y-4 animate-fade-in">
      {grimoireFrame && (
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-10"
          style={{
            backgroundImage: `url(${grimoireFrame})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center top',
          }}
          aria-hidden="true"
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-display font-bold text-brass-400 tracking-[0.15em] uppercase">GRIMOIRE FEED</h3>
          {unreadNotifs.length > 0 && (
            <span className="px-2 py-0.5 bg-amber-700/40 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-sm">
              {unreadNotifs.length} NEW
            </span>
          )}
        </div>
        <span className="text-ocean-500 text-xs">DAY {dayCount} {'\u00B7'} {sortedNotifs.length} entries</span>
      </div>

      {sortedNotifs.length > 0 ? (
        <div className="space-y-2">
          {sortedNotifs.map((notif) => {
            const typeInfo = typeIcons[notif.type] || typeIcons.story;
            return (
              <div
                key={notif.id}
                className={`grimoire-post cursor-pointer transition-all duration-200 ${
                  notif.read
                    ? ''
                    : 'border-gold-500/30 hover:border-gold-500/50'
                } ${notif.type === 'wardensea' ? 'grimoire-post-official' : ''} ${!notif.read ? 'grimoire-post-hot' : ''}`}
                onClick={() => !notif.read && markNotificationRead(notif.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                    )}
                    <span className={`text-xs font-display font-bold uppercase tracking-wider ${typeInfo.color}`}>
                      {typeInfo.icon} {typeInfo.label}
                    </span>
                  </div>
                  <span className="text-ocean-600 text-xs font-mono">
                    {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h4 className="text-ocean-100 text-sm font-bold">{notif.title}</h4>
                <p className="text-ocean-300 text-sm mt-1 leading-relaxed font-narration">{notif.message}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-ocean-500 text-3xl mb-3">{'\uD83D\uDCE1'}</p>
          <p className="text-ocean-500 text-sm italic font-narration">
            The Grimoire is quiet. No one knows your name yet.
          </p>
          <p className="text-ocean-600 text-xs mt-1 font-body">
            Make some noise and the world will react.
          </p>
        </div>
      )}
    </div>
  );
};
