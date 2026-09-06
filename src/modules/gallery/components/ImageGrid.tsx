import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ImageLightbox } from './ImageLightbox';
import { GalleryImageCard } from './GalleryImageCard';
import {
  GALLERY_LAYOUT,
  useGalleryColumns,
  getCategorySkeletonRatios,
} from '../utils/galleryLayout';
import type { ImageItem, GalleryCategory } from '../../../types';

interface ImageGridProps {
  images: ImageItem[];
  category?: GalleryCategory;
}

interface ColumnData {
  heightSum: number;
  items: { image: ImageItem; globalIndex: number }[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, category }) => {
  const numColumns = useGalleryColumns();
  const photoSpacing = GALLERY_LAYOUT.photoSpacing;
  const columnRatios = getCategorySkeletonRatios(category, numColumns);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Balance images across columns based on aspect ratio
  const columns: ColumnData[] = Array.from({ length: numColumns }, () => ({
    heightSum: 0,
    items: [],
  }));

  images.forEach((image, index) => {
    let minColIndex = 0;
    for (let i = 1; i < numColumns; i++) {
      if (columns[i].heightSum < columns[minColIndex].heightSum) {
        minColIndex = i;
      }
    }

    columns[minColIndex].items.push({ image, globalIndex: index });
    columns[minColIndex].heightSum += image.aspectRatio || 0.67;
  });

  const handleImageClick = (globalIndex: number) => {
    setActiveImageIndex(globalIndex);
    setLightboxOpen(true);
  };

  return (
    <>
      <Box onContextMenu={(event) => event.preventDefault()} sx={GALLERY_LAYOUT.containerSx}>
        <Box
          sx={{
            display: 'flex',
            gap: photoSpacing,
            width: '100%',
          }}
        >
          {columns.map((column, colIdx) => {
            const colRatios = columnRatios[colIdx] || columnRatios[0] || ['3 / 2'];

            return (
              <Box
                key={colIdx}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: photoSpacing,
                }}
              >
                {column.items.map(({ image, globalIndex }, itemIdx) => {
                  const initialRatio = colRatios[itemIdx % colRatios.length] || '3 / 2';

                  return (
                    <GalleryImageCard
                      key={image.id}
                      image={image}
                      initialAspectRatio={initialRatio}
                      onClick={() => handleImageClick(globalIndex)}
                    />
                  );
                })}
              </Box>
            );
          })}
        </Box>
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
