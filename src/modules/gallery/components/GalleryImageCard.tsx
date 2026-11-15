import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, Skeleton } from "@mui/material";
import type { ImageItem } from "../../../types";

interface GalleryImageCardProps {
  image: ImageItem;
  initialAspectRatio?: string;
  onClick: () => void;
}

const parseRatio = (ratioStr: string): number => {
  const parts = ratioStr.split("/").map((s) => parseFloat(s.trim()));
  if (parts.length === 2 && parts[1] > 0) {
    return parts[0] / parts[1];
  }
  return 1.5;
};

export const GalleryImageCard: React.FC<GalleryImageCardProps> = ({
  image,
  initialAspectRatio = "3 / 2",
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const decodeStartedRef = useRef(false);

  const [isInView, setIsInView] = useState(false);
  const [imgDecoded, setImgDecoded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatingHeight, setAnimatingHeight] = useState<number | null>(null);
  const [hasCompletedTransition, setHasCompletedTransition] = useState(false);

  // Exact photographic aspect ratio from image metadata
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

  // Pre-decode bitmap off the main thread BEFORE starting the height + opacity transition
  const handleImageReady = useCallback((imgEl: HTMLImageElement) => {
    if (decodeStartedRef.current) return;
    decodeStartedRef.current = true;

    const finalize = () => {
      setImgDecoded(true);
    };

    if (typeof imgEl.decode === "function") {
      imgEl.decode().then(finalize).catch(finalize);
    } else {
      finalize();
    }
  }, []);

  // Only activate Skeleton and <img> when the card is in or near the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || isInView) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView]);

  // If image is already cached in browser memory once in view, decode off-thread first
  useEffect(() => {
    const imgEl = imgRef.current;
    if (isInView && imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      handleImageReady(imgEl);
    }
  }, [isInView, handleImageReady]);

  // Smooth height transition from skeleton ratio to native ratio once bitmap is already decoded in GPU
  useEffect(() => {
    if (!imgDecoded) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const currentW = rect.width;
    if (currentW === 0) {
      const rafId = requestAnimationFrame(() => {
        setIsLoaded(true);
        setHasCompletedTransition(true);
      });
      return () => cancelAnimationFrame(rafId);
    }

    const currentH = rect.height;
    const targetH = Math.round(currentW / nativeRatioVal);

    // If height difference is negligible (<= 2px), reveal without height animation
    if (Math.abs(currentH - targetH) <= 2) {
      setIsLoaded(true);
      const timer = window.setTimeout(() => {
        setHasCompletedTransition(true);
      }, 650);
      return () => window.clearTimeout(timer);
    }

    // Lock starting height to initiate smooth CSS transition
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
  }, [imgDecoded, nativeRatioVal]);

  // Clean up fixed pixel height and unmount Skeleton after animation ends
  useEffect(() => {
    if (animatingHeight !== null && isLoaded) {
      const timer = window.setTimeout(() => {
        setAnimatingHeight(null);
        setHasCompletedTransition(true);
      }, 720);
      return () => window.clearTimeout(timer);
    }
  }, [animatingHeight, isLoaded]);

  // Clear animation override on window resize for responsive stability
  useEffect(() => {
    const handleResize = () => {
      setAnimatingHeight(null);
      if (isLoaded) {
        setHasCompletedTransition(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded]);

  const getBoxSx = () => {
    const baseSx = {
      position: "relative" as const,
      width: "100%",
      overflow: "hidden" as const,
      cursor: "pointer" as const,
      backgroundColor: "rgba(0, 0, 0, 0.06)",
      contain: "layout paint",
      "@media (hover: hover) and (pointer: fine)": {
        "&:hover": {
          filter: "brightness(60%)",
          transform: "scale(0.97)",
        },
      },
    };

    if (animatingHeight !== null) {
      return {
        ...baseSx,
        height: `${animatingHeight}px`,
        aspectRatio: "unset",
        transition:
          "height 0.65s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease, transform 0.4s ease",
      };
    }

    if (hasCompletedTransition) {
      return {
        ...baseSx,
        height: "auto",
        aspectRatio: nativeAspectRatio,
        transition: "filter 0.4s ease, transform 0.4s ease",
      };
    }

    // Initial state: skeleton aspect ratio matching GallerySkeleton
    return {
      ...baseSx,
      height: "auto",
      aspectRatio: initialAspectRatio,
      transition: "filter 0.4s ease, transform 0.4s ease",
    };
  };

  return (
    <Box ref={containerRef} onClick={onClick} sx={getBoxSx()}>
      {/* Skeleton wave is ONLY mounted when in view and unmounts as soon as transition finishes */}
      {isInView && !hasCompletedTransition && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: isLoaded ? 0 : 1,
            pointerEvents: "none",
            willChange: "opacity",
            transition: "opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
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
              transform: "none",
              backgroundColor: "rgba(0, 0, 0, 0.08)",
            }}
          />
        </Box>
      )}

      {/* Real image with async off-thread decoding and smooth crossfade */}
      {isInView && (
        <Box
          component="img"
          ref={imgRef}
          src={image.src}
          alt={image.name}
          loading="lazy"
          decoding="async"
          onLoad={(e) => handleImageReady(e.currentTarget)}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: isLoaded ? 1 : 0,
            willChange: hasCompletedTransition ? "auto" : "opacity",
            transition: "opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 2,
          }}
        />
      )}
    </Box>
  );
};

export default GalleryImageCard;
