import React, { useState, useEffect, useRef, useMemo } from "react";
import { Box } from "@mui/material";
import { ImageLightbox } from "./ImageLightbox";
import { GalleryImageCard } from "./GalleryImageCard";
import {
  GALLERY_LAYOUT,
  useGalleryColumns,
  getCategorySkeletonRatios,
} from "../utils/galleryLayout";
import type { ImageItem, GalleryCategory } from "../../../types";

interface ImageGridProps {
  images: ImageItem[];
  category?: GalleryCategory;
}

interface ColumnData {
  heightSum: number;
  items: { image: ImageItem; globalIndex: number }[];
}

const INITIAL_BATCH_SIZE = 10;
const BATCH_INCREMENT = 8;

export const ImageGrid: React.FC<ImageGridProps> = ({ images, category }) => {
  const numColumns = useGalleryColumns();
  const photoSpacing = GALLERY_LAYOUT.photoSpacing;
  const columnRatios = getCategorySkeletonRatios(category, numColumns);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const loadMoreSentinelRef = useRef<HTMLDivElement>(null);

  // Reset progressive batch count when switching gallery category
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [category, images]);

  const hasMore = visibleCount < images.length;

  // Progressive rendering on scroll: mount next batch of cards as user approaches bottom
  useEffect(() => {
    const sentinel = loadMoreSentinelRef.current;
    if (!sentinel || !hasMore) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisibleCount(images.length);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, images.length));
        }
      },
      { rootMargin: "500px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, visibleCount, images.length]);

  // Balance only the currently rendered slice across columns in deterministic order
  const columns = useMemo(() => {
    const cols: ColumnData[] = Array.from({ length: numColumns }, () => ({
      heightSum: 0,
      items: [],
    }));

    const slice = images.slice(0, visibleCount);
    slice.forEach((image, index) => {
      let minColIndex = 0;
      for (let i = 1; i < numColumns; i++) {
        if (cols[i].heightSum < cols[minColIndex].heightSum) {
          minColIndex = i;
        }
      }

      cols[minColIndex].items.push({ image, globalIndex: index });
      cols[minColIndex].heightSum += image.aspectRatio || 0.67;
    });

    return cols;
  }, [images, visibleCount, numColumns]);

  const handleImageClick = (globalIndex: number) => {
    setActiveImageIndex(globalIndex);
    setLightboxOpen(true);
  };

  return (
    <>
      <Box onContextMenu={(event) => event.preventDefault()} sx={GALLERY_LAYOUT.containerSx}>
        <Box
          sx={{
            display: "flex",
            gap: photoSpacing,
            width: "100%",
          }}
        >
          {columns.map((column, colIdx) => {
            const colRatios = columnRatios[colIdx] || columnRatios[0] || ["3 / 2"];

            return (
              <Box
                key={colIdx}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: photoSpacing,
                }}
              >
                {column.items.map(({ image, globalIndex }, itemIdx) => {
                  const initialRatio = colRatios[itemIdx % colRatios.length] || "3 / 2";

                  return (
                    <GalleryImageCard
                      key={image.id}
                      image={image}
                      priority={globalIndex}
                      initialAspectRatio={initialRatio}
                      onClick={() => handleImageClick(globalIndex)}
                    />
                  );
                })}
              </Box>
            );
          })}
        </Box>

        {/* Sentinel for progressive batch rendering */}
        {hasMore && (
          <Box
            ref={loadMoreSentinelRef}
            sx={{ width: "100%", height: "1px", pointerEvents: "none" }}
          />
        )}
      </Box>

      <ImageLightbox
        open={lightboxOpen}
        images={images}
        initialIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

export default ImageGrid;
