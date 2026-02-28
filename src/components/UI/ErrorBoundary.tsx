import React from 'react';
import { useGameStore } from '../../store/gameStore';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: '' };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ errorInfo: info.componentStack || '' });
    // Emergency autosave on crash via Zustand vanilla access
    try {
      const store = useGameStore.getState();
      if (store.gamePhase !== 'prologue' || store.dayCount > 0) {
        store.saveGame(0);
      }
    } catch {
      // Silent fail - don't make the crash worse
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReturnToTitle = () => {
    this.setState({ hasError: false, error: null, errorInfo: '' });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen bg-ocean-950 flex items-center justify-center">
          <div className="max-w-lg w-full mx-4 text-center">
            {/* Storm icon */}
            <div className="text-6xl mb-6 animate-pulse">⛈️</div>

            <h1 className="text-3xl font-display font-bold text-crimson-400 mb-2 tracking-wider">
              SOMETHING BROKE
            </h1>

            <p className="text-ocean-300 text-lg mb-6">
              The Bastion Sea hit rough waters. An emergency save has been attempted.
            </p>

            {/* Error details (collapsed) */}
            <details className="mb-8 text-left">
              <summary className="text-ocean-500 text-xs cursor-pointer hover:text-ocean-400 transition-colors tracking-wider uppercase">
                Technical Details
              </summary>
              <div className="mt-2 p-3 bg-ocean-900 border border-ocean-700 rounded-sm max-h-40 overflow-y-auto">
                <p className="text-crimson-400 text-xs font-mono break-all">
                  {this.state.error?.message || 'Unknown error'}
                </p>
                {this.state.errorInfo && (
                  <pre className="text-ocean-500 text-xs mt-2 whitespace-pre-wrap break-all">
                    {this.state.errorInfo.slice(0, 500)}
                  </pre>
                )}
              </div>
            </details>

            {/* Actions */}
            <div className="flex flex-col gap-3 items-center">
              <button
                onClick={this.handleReload}
                className="px-8 py-3 bg-amber-700/80 hover:bg-amber-600/90 border border-amber-500/40 text-amber-100 font-bold text-sm tracking-widest uppercase rounded-sm transition-all w-64"
              >
                RELOAD GAME
              </button>
              <button
                onClick={this.handleReturnToTitle}
                className="px-8 py-2 bg-ocean-800 hover:bg-ocean-700 border border-ocean-600 text-ocean-300 text-xs tracking-widest uppercase rounded-sm transition-all w-64"
              >
                RETURN TO TITLE
              </button>
            </div>

            <p className="text-ocean-600 text-xs mt-8 italic">
              v1.0.0 - If this keeps happening, try clearing your browser cache.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
