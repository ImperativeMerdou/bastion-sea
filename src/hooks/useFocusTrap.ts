import { useEffect, useRef } from 'react';

export function useFocusTrap(active: boolean = true) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const container = containerRef.current;
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const previousFocus = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(container.querySelectorAll(focusableSelector)) as HTMLElement[];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Focus first focusable element
    const focusable = container.querySelectorAll(focusableSelector);
    if (focusable.length > 0) (focusable[0] as HTMLElement).focus();

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      if (previousFocus && previousFocus.focus && document.body.contains(previousFocus)) {
        previousFocus.focus();
      }
    };
  }, [active]);

  return containerRef;
}
