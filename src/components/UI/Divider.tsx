import React from 'react';
import { getUiAsset } from '../../utils/images';

interface DividerProps {
  className?: string;
}

/** Ornamental divider: renders divider.webp image centered, or falls back to a CSS gradient line. */
export const Divider: React.FC<DividerProps> = ({ className = '' }) => {
  const dividerImage = getUiAsset('divider');

  if (dividerImage) {
    return (
      <div className={`flex justify-center ${className}`} aria-hidden="true">
        <img
          src={dividerImage}
          alt=""
          className="h-5 w-auto max-w-[400px] opacity-75"
          draggable={false}
        />
      </div>
    );
  }

  // CSS gradient fallback
  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <div
        className="w-24 h-0.5"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.5), transparent)',
        }}
      />
    </div>
  );
};
