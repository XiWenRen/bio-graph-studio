import React, { useState, useEffect } from 'react';
import { Leaf, Bird, Sprout, Image as ImageIcon } from 'lucide-react';
import { BiologicalDomain } from '../types';
import { fetchScientificSpeciesImage } from '../services/imageService';

interface SpeciesImageProps {
  src?: string;
  alt: string;
  scientificName?: string;
  domain?: BiologicalDomain;
  className?: string;
  aspectClassName?: string;
}

export const SpeciesImage: React.FC<SpeciesImageProps> = ({
  src,
  alt,
  scientificName,
  domain = 'fauna',
  className = 'w-full h-full object-cover',
  aspectClassName
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  // When scientificName is provided, automatically query authoritative databases (Wikipedia / GBIF) if no valid src or on error
  useEffect(() => {
    let isMounted = true;
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);

    if (scientificName && (!src || src.includes('unsplash.com'))) {
      setIsResolving(true);
      fetchScientificSpeciesImage(scientificName, alt).then((verifiedUrl) => {
        if (isMounted && verifiedUrl) {
          setCurrentSrc(verifiedUrl);
          setIsResolving(false);
        } else if (isMounted) {
          setIsResolving(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [src, scientificName, alt]);

  const handleImageError = () => {
    // If original src fails, try resolving via Wikipedia / GBIF authority API if not tried yet
    if (scientificName && currentSrc !== src) {
      setHasError(true);
    } else if (scientificName) {
      setIsResolving(true);
      fetchScientificSpeciesImage(scientificName, alt).then((verifiedUrl) => {
        if (verifiedUrl && verifiedUrl !== currentSrc) {
          setCurrentSrc(verifiedUrl);
          setHasError(false);
          setIsResolving(false);
        } else {
          setHasError(true);
          setIsResolving(false);
        }
      });
    } else {
      setHasError(true);
    }
  };

  // If no source or failed to load, show biological domain specimen card
  if (!currentSrc || hasError) {
    const getDomainTheme = () => {
      switch (domain) {
        case 'flora':
          return {
            bg: 'bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950',
            border: 'border-emerald-800/60',
            text: 'text-emerald-300',
            badgeBg: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
            label: '植物界科学标本',
            Icon: Sprout
          };
        case 'fungi':
          return {
            bg: 'bg-gradient-to-br from-amber-950 via-orange-950 to-slate-950',
            border: 'border-amber-800/60',
            text: 'text-amber-300',
            badgeBg: 'bg-amber-900/60 text-amber-300 border-amber-700/50',
            label: '真菌界科学标本',
            Icon: Leaf
          };
        case 'fauna':
        default:
          return {
            bg: 'bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950',
            border: 'border-blue-800/60',
            text: 'text-blue-300',
            badgeBg: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
            label: '动物界科学标本',
            Icon: Bird
          };
      }
    };

    const theme = getDomainTheme();
    const { Icon } = theme;

    return (
      <div
        className={`w-full h-full ${aspectClassName || ''} ${theme.bg} border-b ${theme.border} flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-inner flex items-center justify-center">
            <Icon className={`w-8 h-8 ${theme.text}`} />
          </div>
          <div className="space-y-0.5 max-w-[200px]">
            <p className="text-xs font-bold text-white truncate">{alt}</p>
            {scientificName && (
              <p className="text-[10px] text-slate-400 italic truncate font-serif">{scientificName}</p>
            )}
            <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full border ${theme.badgeBg}`}>
              {theme.label}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-950 ${aspectClassName || ''}`}>
      {(!isLoaded || isResolving) && (
        <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center z-10">
          <ImageIcon className="w-6 h-6 text-slate-700" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleImageError}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </div>
  );
};
