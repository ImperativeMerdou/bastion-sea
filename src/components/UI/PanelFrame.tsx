import React from 'react';
import { getImagePath } from '../../utils/images';

interface PanelFrameProps {
  variant: 'story' | 'combat' | 'management';
}

/** Decorative corner ornaments for panels. Uses 4 individual corner images. */
export const PanelFrame: React.FC<PanelFrameProps> = ({ variant }) => {
  const tl = getImagePath('ui/corner_tl.webp');
  const tr = getImagePath('ui/corner_tr.webp');
  const bl = getImagePath('ui/corner_bl.webp');
  const br = getImagePath('ui/corner_br.webp');

  if (!tl) return null;

  const cornerSize = 100;

  return (
    <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
      {tl && (
        <img
          src={tl} alt=""
          className="absolute top-0 left-0"
          style={{ width: cornerSize, height: cornerSize, opacity: 0.4 }}
          draggable={false}
        />
      )}
      {tr && (
        <img
          src={tr} alt=""
          className="absolute top-0 right-0"
          style={{ width: cornerSize, height: cornerSize, opacity: 0.4 }}
          draggable={false}
        />
      )}
      {bl && (
        <img
          src={bl} alt=""
          className="absolute bottom-0 left-0"
          style={{ width: cornerSize, height: cornerSize, opacity: 0.4 }}
          draggable={false}
        />
      )}
      {br && (
        <img
          src={br} alt=""
          className="absolute bottom-0 right-0"
          style={{ width: cornerSize, height: cornerSize, opacity: 0.4 }}
          draggable={false}
        />
      )}
    </div>
  );
};
