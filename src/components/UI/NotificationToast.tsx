import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { audioManager } from '../../systems/audio';

const typeStyles: Record<string, { icon: string; color: string; border: string }> = {
  bounty: { icon: '🏴‍☠️', color: 'text-crimson-400', border: 'border-crimson-500/40' },
  grimoire: { icon: '📡', color: 'text-purple-400', border: 'border-purple-500/40' },
  crew: { icon: '⚓', color: 'text-green-400', border: 'border-green-500/40' },
  wardensea: { icon: '⚔️', color: 'text-blue-400', border: 'border-blue-500/40' },
  conqueror: { icon: '🏴', color: 'text-amber-400', border: 'border-amber-500/40' },
  story: { icon: '📜', color: 'text-ocean-300', border: 'border-ocean-400/40' },
};

interface ToastData {
  id: string;
  type: string;
  title: string;
  message: string;
  visible: boolean;
  exiting: boolean;
  createdAt: number;
}

export const NotificationToast: React.FC = () => {
  const notifications = useGameStore(s => s.notifications);
  const pendingDailyReport = useGameStore(s => s.pendingDailyReport);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [shownIds, setShownIds] = useState<Set<string>>(new Set());

  // Watch for new notifications and show toasts
  useEffect(() => {
    const newNotifications = notifications.filter(
      (n) => !shownIds.has(n.id) && !n.read
    );

    if (newNotifications.length > 0) {
      const newIds = new Set(shownIds);
      const newToasts: ToastData[] = [];

      // Only show the most recent 3 unshown notifications (avoid flooding)
      newNotifications.slice(0, 3).forEach((notif) => {
        newIds.add(notif.id);
        newToasts.push({
          id: notif.id,
          type: notif.type,
          title: notif.title,
          message: notif.message,
          visible: true,
          exiting: false,
          createdAt: Date.now(),
        });
      });

      setShownIds(newIds);
      setToasts((prev) => {
        // Deduplicate by id to prevent React key collisions (StrictMode double-fire)
        const existingIds = new Set(prev.map(t => t.id));
        const unique = newToasts.filter(t => !existingIds.has(t.id));
        return [...unique, ...prev].slice(0, 5);
      });

      // Play notification sound for new toasts
      if (newToasts.length > 0) {
        audioManager.playSfx('notification');
      }
    }
  }, [notifications, shownIds]);

  // Auto-dismiss toasts - poll every 500ms to avoid timer/state conflicts
  useEffect(() => {
    if (toasts.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      setToasts((prev) => {
        let changed = false;
        const updated = prev.map((t) => {
          const age = now - t.createdAt;
          if (!t.exiting && age > 3000) {
            changed = true;
            return { ...t, exiting: true };
          }
          return t;
        }).filter((t) => {
          const age = now - t.createdAt;
          if (t.exiting && age > 3500) {
            changed = true;
            return false;
          }
          return true;
        });
        return changed ? updated : prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [toasts.length]);

  const dismissToast = (id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 500);
  };

  // Suppress toasts while daily report modal is showing
  if (pendingDailyReport) return null;
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 z-40 space-y-2 max-w-sm pointer-events-none" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => {
        const style = typeStyles[toast.type] || typeStyles.story;
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-ocean-800/95 backdrop-blur-sm border ${style.border} rounded-sm px-4 py-3 shadow-lg cursor-pointer transition-all duration-500 ${
              toast.exiting
                ? 'opacity-0 translate-x-full'
                : 'opacity-100 translate-x-0 animate-fade-in'
            }`}
            onClick={() => dismissToast(toast.id)}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">{style.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${style.color}`}>
                    {toast.type === 'grimoire' ? 'BROADCAST' : toast.type.toUpperCase()}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); dismissToast(toast.id); }}
                    aria-label="Dismiss notification"
                    className="text-ocean-500 hover:text-ocean-300 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <h4 className="text-ocean-100 text-sm font-bold mt-1 truncate">
                  {toast.title}
                </h4>
                <p className="text-ocean-300 text-xs mt-0.5 line-clamp-2">
                  {toast.message}
                </p>
              </div>
            </div>
            {/* Auto-dismiss progress bar */}
            {!toast.exiting && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ocean-700 overflow-hidden">
                <div
                  className={`h-full ${
                    toast.type === 'bounty' ? 'bg-crimson-500' :
                    toast.type === 'wardensea' ? 'bg-ocean-400' :
                    'bg-amber-500'
                  }`}
                  style={{
                    animation: 'toast-progress 3s linear forwards',
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
