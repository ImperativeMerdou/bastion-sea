import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { GameNotification } from '../../types/game';

const typeConfig: Record<string, { icon: string; color: string; label: string }> = {
  bounty: { icon: '🏴‍☠️', color: 'text-crimson-400', label: 'BOUNTY' },
  grimoire: { icon: '📡', color: 'text-purple-400', label: 'GRIMOIRE' },
  crew: { icon: '⚓', color: 'text-green-400', label: 'CREW' },
  wardensea: { icon: '⚔️', color: 'text-blue-400', label: 'WARDENSEA' },
  conqueror: { icon: '🏴', color: 'text-amber-400', label: 'CONQUEROR' },
  story: { icon: '📜', color: 'text-ocean-300', label: 'EVENT' },
};

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

interface NotificationLogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationLog: React.FC<NotificationLogProps> = ({ isOpen, onClose }) => {
  const notifications = useGameStore((s) => s.notifications);
  const markNotificationRead = useGameStore((s) => s.markNotificationRead);

  // Show newest first, deduplicate by ID
  const seen = new Set<string>();
  const sortedNotifications = [...notifications].reverse().filter((n) => {
    if (seen.has(n.id)) return false;
    seen.add(n.id);
    return true;
  }).slice(0, 50);

  // Mark all visible as read when panel opens (not on every notification change)
  React.useEffect(() => {
    if (isOpen) {
      const unread = useGameStore.getState().notifications.filter((n) => !n.read);
      unread.forEach((n) => markNotificationRead(n.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-ocean-900 border-l border-ocean-600 shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-ocean-600 bg-ocean-800/50">
              <div className="flex items-center gap-3">
                <h2 className="text-amber-400 font-display font-bold text-base tracking-wider">
                  EVENT LOG
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-crimson-700/50 border border-crimson-500/40 text-crimson-300 text-xs font-bold rounded-full">
                    {unreadCount} NEW
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-ocean-400 hover:text-ocean-200 transition-colors text-lg px-2"
              >
                ✕
              </button>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto">
              {sortedNotifications.length === 0 ? (
                <div className="flex items-center justify-center h-full text-ocean-500 text-sm">
                  No events yet.
                </div>
              ) : (
                <div className="divide-y divide-ocean-700/50">
                  {sortedNotifications.map((n: GameNotification, idx: number) => {
                    const config = typeConfig[n.type] || typeConfig.story;
                    return (
                      <motion.div
                        key={n.id}
                        className="px-5 py-3 hover:bg-ocean-800/40 transition-colors"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: Math.min(idx * 0.03, 0.3) }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg mt-0.5 flex-shrink-0">{config.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`text-xs font-bold tracking-wider ${config.color}`}>
                                {config.label}
                              </span>
                              <span className="text-ocean-600 text-xs">
                                {formatTime(n.timestamp)}
                              </span>
                            </div>
                            <h4 className="text-ocean-200 text-sm font-bold leading-snug">
                              {n.title}
                            </h4>
                            <p className="text-ocean-400 text-xs mt-0.5 leading-relaxed">
                              {n.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-ocean-600 bg-ocean-800/30">
              <p className="text-ocean-500 text-xs text-center">
                Showing last {sortedNotifications.length} events
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
