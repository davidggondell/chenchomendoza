import React, { useState, useRef, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { ImageItem } from '../../../types';

interface GalleryImageCardProps {
  image: ImageItem;
  initialAspectRatio?: string;
  onClick: () => void;
}

const parseRatio = (ratioStr: string): number => {
  const parts = ratioStr.split('/').map((s) => parseFloat(s.trim()));
  if (parts.length === 2 && parts[1] > 0) {
    return parts[0] / parts[1];
  }
  return 1.5;
};

export const GalleryImageCard: React.FC<GalleryImageCardProps> = ({
  image,
  initialAspectRatio = '3 / 2',
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [imgLoaded, setImgLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatingHeight, setAnimatingHeight] = useState<number | null>(null);
  const [hasCompletedTransition, setHasCompletedTransition] = useState(false);

  // Exact photographic aspect ratio from image metadata (e.g. 1.5 for 3:2 landscape, 0.667 for 2:3 portrait)
  const nativeAspectRatio =
    image.width && image.height
      ? `${image.width} / ${image.height}`
      : image.aspectRatio
        ? `1 / ${image.aspectRatio}`
        : initialAspectRatio;

  const nativeRatioVal =
    image.width && image.height
      ? image.width / image.height
      : image.aspectRatio
        ? 1 / image.aspectRatio
        : parseRatio(initialAspectRatio);

  // Check if image is already cached / complete in browser memory
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, []);

  // Smooth height transition from skeleton ratio to native ratio once image is ready
  useEffect(() => {
    if (!imgLoaded) return;
    const container = containerRef.current;
    if (!container) return;

    const currentW = container.getBoundingClientRect().width;
    if (currentW === 0) {
      const rafId = requestAnimationFrame(() => {
        setImgLoaded(true);
      });
      return () => cancelAnimationFrame(rafId);
    }

    const currentH = container.getBoundingClientRect().height;
    const targetH = Math.round(currentW / nativeRatioVal);

    // If height difference is negligible (<= 2px), smoothly reveal without height layout shift
    if (Math.abs(currentH - targetH) <= 2) {
      setIsLoaded(true);
      setHasCompletedTransition(true);
      return;
    }

    // Lock starting height to initiate CSS transition
    setAnimatingHeight(currentH);

    let rafId2: number;
    const rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        setAnimatingHeight(targetH);
        setIsLoaded(true);
      });
    });

    return () => {
      cancelAnimationFrame(rafId1);
      cancelAnimationFrame(rafId2);
    };
  }, [imgLoaded, nativeRatioVal]);

  // Clean up fixed pixel height after animation ends so card is fully responsive
  useEffect(() => {
    if (animatingHeight !== null && isLoaded) {
      const timer = setTimeout(() => {
        setAnimatingHeight(null);
        setHasCompletedTransition(true);
      }, 750); // duration 0.7s
      return () => clearTimeout(timer);
    }
  }, [animatingHeight, isLoaded]);

  // Clear animation override on window resize for responsive stability
  useEffect(() => {
    const handleResize = () => {
      setAnimatingHeight(null);
      setHasCompletedTransition(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute styles for container depending on animation state
  const getBoxSx = () => {
    const baseSx = {
      position: 'relative' as const,
      width: '100%',
      overflow: 'hidden' as const,
      cursor: 'pointer' as const,
      backgroundColor: '#f2f2f2',
      '&:hover': {
        filter: 'brightness(60%)',
        transform: 'scale(0.97)',
      },
    };

    if (animatingHeight !== null) {
      return {
        ...baseSx,
        height: `${animatingHeight}px`,
        aspectRatio: 'unset',
        transition:
          'height 0.7s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease, transform 0.4s ease',
      };
    }

    if (hasCompletedTransition) {
      return {
        ...baseSx,
        height: 'auto',
        aspectRatio: nativeAspectRatio,
        transition: 'filter 0.4s ease, transform 0.4s ease',
      };
    }

    // Initial state: skeleton aspect ratio
    return {
      ...baseSx,
      height: 'auto',
      aspectRatio: initialAspectRatio,
      transition: 'filter 0.4s ease, transform 0.4s ease',
    };
  };

  return (
    <Box ref={containerRef} onClick={onClick} sx={getBoxSx()}>
      {/* Skeleton placeholder inside the card, fades out when image finishes loading */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isLoaded ? 0 : 1,
          pointerEvents: 'none',
          transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1,
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
          sx={{
            borderRadius: 0,
            transform: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          }}
        />
      </Box>

      {/* Real image with natural object-fit and smooth crossfade */}
      <Box
        component="img"
        ref={imgRef}
        src={image.src}
        alt={image.name}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 2,
        }}
      />
    </Box>
  );
};

export default GalleryImageCard;
