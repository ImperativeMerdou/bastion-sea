import React from 'react';
import { getUiAsset } from '../../utils/images';

interface TextureOverlayProps {
  variant: 'story' | 'combat' | 'management';
  opacity?: number;
}

const textureKeys = {
  story: 'panel_texture_story',
  combat: 'panel_texture_combat',
  management: 'panel_texture_management',
} as const;

/** Renders a subtle material texture overlay on panels. Pure cosmetic. */
export const TextureOverlay: React.FC<TextureOverlayProps> = ({
  variant,
  opacity = 0.04,
}) => {
  const texturePath = getUiAsset(textureKeys[variant]);
  if (!texturePath) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        backgroundImage: `url(${texturePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'overlay',
        opacity,
      }}
      aria-hidden="true"
    />
  );
};
