import React, { useState, useRef, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import {
  enqueueGalleryImageLoad,
  getCachedImageMeta,
  type ResolvedImageMeta,
} from "../services/galleryService";
import type { ImageItem } from "../../../types";

interface GalleryImageCardProps {
  image: ImageItem;
  priority?: number;
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
  priority = 0,
  initialAspectRatio = "3 / 2",
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialCached = getCachedImageMeta(image);

  const [isInView, setIsInView] = useState<boolean>(Boolean(initialCached));
  const [resolvedMeta, setResolvedMeta] = useState<ResolvedImageMeta | null>(
    initialCached || null
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(Boolean(initialCached));
  const [animatingHeight, setAnimatingHeight] = useState<number | null>(null);
  const [hasCompletedTransition, setHasCompletedTransition] = useState<boolean>(
    Boolean(initialCached)
  );

  // Exact photographic aspect ratio once resolved by the sequential queue
  const nativeAspectRatio = resolvedMeta
    ? `${resolvedMeta.width} / ${resolvedMeta.height}`
    : initialAspectRatio;

  const nativeRatioVal = resolvedMeta
    ? resolvedMeta.width / resolvedMeta.height
    : parseRatio(initialAspectRatio);

  // Observe when card enters or approaches the viewport
  useEffect(() => {
    if (isInView) return;
    const el = containerRef.current;
    if (!el) return;

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
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView]);

  // When in view, enqueue this card in the sequential cascade loader (1 by 1, top to bottom)
  useEffect(() => {
    if (!isInView || resolvedMeta) return;

    const cancelQueue = enqueueGalleryImageLoad(image, priority, (meta) => {
      setResolvedMeta(meta);
    });

    return () => {
      cancelQueue();
    };
  }, [isInView, resolvedMeta, image, priority]);

  // Smooth height + opacity transition once this card's turn in the queue completes
  useEffect(() => {
    if (!resolvedMeta || hasCompletedTransition) return;
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

    if (Math.abs(currentH - targetH) <= 2) {
      setIsLoaded(true);
      const timer = window.setTimeout(() => {
        setHasCompletedTransition(true);
      }, 650);
      return () => window.clearTimeout(timer);
    }

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
  }, [resolvedMeta, nativeRatioVal, hasCompletedTransition]);

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

      {/* Image mounts only when its turn in the queue has already downloaded & decoded it */}
      {resolvedMeta && (
        <Box
          component="img"
          src={resolvedMeta.url}
          alt={image.name}
          decoding="async"
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
