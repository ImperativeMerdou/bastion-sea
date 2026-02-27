import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// KEYBOARD SHORTCUTS HELP OVERLAY
// ==========================================

interface Shortcut {
  key: string;
  description: string;
  context?: string;
}

const SHORTCUTS: Shortcut[] = [
  { key: 'ESC', description: 'Open/close pause menu', context: 'Outside combat' },
  { key: '1', description: 'Switch to Story panel', context: 'Outside combat' },
  { key: '2', description: 'Switch to Map panel', context: 'Outside combat' },
  { key: '3', description: 'Switch to Command panel', context: 'Outside combat' },
  { key: '?', description: 'Toggle this help overlay' },
  { key: 'SPACE', description: 'Advance dialogue', context: 'During story scenes' },
  { key: 'CLICK', description: 'Skip intro animation', context: 'Title screen' },
];

interface KeyboardHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardHelp: React.FC<KeyboardHelpProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ocean-950/80 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-md mx-4 bg-ocean-900 border border-ocean-600 rounded-lg shadow-2xl"
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-3 border-b border-ocean-700 flex items-center justify-between">
              <h2 className="text-amber-400 font-display text-sm font-bold tracking-[0.15em]">
                KEYBOARD SHORTCUTS
              </h2>
              <button
                onClick={onClose}
                className="text-ocean-400 hover:text-ocean-200 text-sm font-bold transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Shortcuts list */}
            <div className="p-5 space-y-2">
              {SHORTCUTS.map((shortcut) => (
                <div key={shortcut.key} className="flex items-center gap-3">
                  <kbd className="min-w-[3rem] px-2 py-1 bg-ocean-800 border border-ocean-600 rounded text-center text-xs font-mono text-ocean-200 font-bold">
                    {shortcut.key}
                  </kbd>
                  <div className="flex-1">
                    <span className="text-ocean-200 text-sm">{shortcut.description}</span>
                    {shortcut.context && (
                      <span className="text-ocean-500 text-xs ml-2">({shortcut.context})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-ocean-700 text-center">
              <p className="text-ocean-500 text-xs">
                Press <kbd className="px-1.5 py-0.5 bg-ocean-800 border border-ocean-600 rounded text-xs font-mono">?</kbd> or <kbd className="px-1.5 py-0.5 bg-ocean-800 border border-ocean-600 rounded text-xs font-mono">ESC</kbd> to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
