import React, { useState, useEffect, useRef } from 'react';
import { getPortrait, getExpressionPortrait, getUiAsset } from '../../utils/images';

interface CharacterCardProps {
  characterId: string;
  expression?: string;
  isActive: boolean;
  isEntering: boolean;
  accentColor: string;
  name: string;
  size: 'large' | 'small';
}

/** ARAM-style character card with portrait, glow, frame overlay, and nameplate */
export const CharacterCard: React.FC<CharacterCardProps> = ({
  characterId,
  expression,
  isActive,
  isEntering,
  accentColor,
  name,
  size,
}) => {
  // Expression crossfade state
  const [currentPortrait, setCurrentPortrait] = useState<string | null>(null);
  const [prevPortrait, setPrevPortrait] = useState<string | null>(null);
  const [crossfading, setCrossfading] = useState(false);
  const [expressionFlash, setExpressionFlash] = useState(false);
  const prevExpressionRef = useRef<string | undefined>(expression);

  // Resolve portrait path
  const resolvedPortrait = expression
    ? getExpressionPortrait(characterId, expression)
    : getPortrait(characterId);

  // Expression crossfade: when expression changes, stack old + new and fade
  useEffect(() => {
    if (resolvedPortrait && resolvedPortrait !== currentPortrait) {
      if (currentPortrait && prevExpressionRef.current !== expression) {
        // Expression changed: crossfade
        setPrevPortrait(currentPortrait);
        setCurrentPortrait(resolvedPortrait);
        setCrossfading(true);
        setExpressionFlash(true);
        const fadeTimer = setTimeout(() => {
          setPrevPortrait(null);
          setCrossfading(false);
        }, 300);
        const flashTimer = setTimeout(() => setExpressionFlash(false), 200);
        prevExpressionRef.current = expression;
        return () => { clearTimeout(fadeTimer); clearTimeout(flashTimer); };
      } else {
        // First load or same expression: direct set
        setCurrentPortrait(resolvedPortrait);
      }
    }
    prevExpressionRef.current = expression;
  }, [resolvedPortrait, expression]); // eslint-disable-line react-hooks/exhaustive-deps

  // Dimensions — large: 220x300 (VN portrait), small: 120x160 (dialogue cards)
  const w = size === 'large' ? 220 : 120;
  const h = size === 'large' ? 300 : 160;

  // UI asset images
  const nameplateImage = getUiAsset('nameplate');

  // Accent color helpers
  const glowDim = accentColor.replace(/[\d.]+\)$/, '0.15)');
  const glowMed = accentColor.replace(/[\d.]+\)$/, '0.35)');
  const glowStrong = accentColor.replace(/[\d.]+\)$/, '0.6)');
  const solidColor = accentColor.replace('rgba', 'rgb').replace(/,\s*[\d.]+\)/, ')');
  const accentBorderDim = accentColor.replace(/[\d.]+\)$/, '0.3)');

  const borderColor = isActive
    ? accentBorderDim
    : accentColor.replace(/[\d.]+\)$/, '0.15)');

  return (
    <div
      className={`relative flex flex-col items-center ${
        isEntering ? 'animate-character-card-enter' : ''
      }`}
      style={{
        width: `${w}px`,
        '--accent-glow': glowMed,
        '--accent-glow-dim': glowDim,
        '--accent-glow-strong': glowStrong,
      } as React.CSSProperties}
    >
      {/* Card wrapper — same size as portrait */}
      <div
        className={`relative rounded-lg ${
          isActive ? 'character-card-glow-active' : ''
        }`}
        style={{
          width: `${w}px`,
          height: `${h}px`,
          backgroundColor: borderColor,
          boxShadow: isActive
            ? undefined
            : `0 4px 20px rgba(0, 0, 0, 0.5), 0 0 10px ${glowDim}`,
        }}
      >
        {/* Inner clip — overflow:hidden clips the portrait only */}
        <div className="relative w-full h-full rounded-md overflow-hidden">
          {/* Portrait image(s) with crossfade */}
          <div className="absolute inset-0">
            {/* Previous portrait (fading out during crossfade) */}
            {crossfading && prevPortrait && (
              <img
                src={prevPortrait}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top"
                draggable={false}
              />
            )}

            {/* Current portrait */}
            {currentPortrait ? (
              <img
                src={currentPortrait}
                alt={name}
                className={`absolute inset-0 w-full h-full object-cover object-top portrait-idle-drift ${
                  crossfading ? 'animate-expression-crossfade' : ''
                }`}
                draggable={false}
              />
            ) : (
              <div className="w-full h-full bg-ocean-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-ocean-500">{name[0]}</span>
              </div>
            )}
          </div>

          {/* Expression change flash */}
          {expressionFlash && (
            <div
              className="absolute inset-0 pointer-events-none z-[6] animate-expression-flash"
              style={{ background: `radial-gradient(ellipse at center, ${glowStrong}, transparent 70%)` }}
            />
          )}

          {/* Bottom vignette for nameplate readability */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-[7]" />

          {/* Active speaker edge shimmer */}
          {isActive && (
            <>
              <div
                className="absolute top-0 bottom-0 left-0 w-[2px] z-[9] pointer-events-none edge-shimmer-left"
                style={{
                  backgroundImage: `linear-gradient(to top, transparent, ${accentColor.replace(/[\d.]+\)$/, '0.3)')}, transparent)`,
                  backgroundSize: '100% 200%',
                }}
              />
              <div
                className="absolute top-0 bottom-0 right-0 w-[2px] z-[9] pointer-events-none edge-shimmer-right"
                style={{
                  backgroundImage: `linear-gradient(to top, transparent, ${accentColor.replace(/[\d.]+\)$/, '0.3)')}, transparent)`,
                  backgroundSize: '100% 200%',
                }}
              />
            </>
          )}
        </div>

        {/* Nameplate — positioned at the bottom of the card */}
        <div className="absolute left-0 right-0 text-center z-[11]" style={{ bottom: '-2px' }}>
          <span
            className="font-display font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-sm relative inline-block"
            style={{
              fontSize: size === 'large' ? '14px' : '9px',
              color: solidColor,
              background: nameplateImage ? 'transparent' : 'rgba(4, 8, 16, 0.85)',
              border: nameplateImage ? 'none' : `1px solid ${accentBorderDim}`,
              textShadow: `0 0 8px ${accentColor}, 0 1px 2px rgba(0,0,0,0.9)`,
            }}
          >
            {nameplateImage && (
              <img
                src={nameplateImage}
                alt=""
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ objectFit: 'fill', opacity: 0.85, zIndex: -1 }}
                draggable={false}
              />
            )}
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};
