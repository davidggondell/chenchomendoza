import React from 'react';
import { Box, Skeleton } from '@mui/material';
import {
  GALLERY_LAYOUT,
  useGalleryColumns,
  getCategorySkeletonRatios,
} from '../utils/galleryLayout';
import type { GalleryCategory } from '../../../types';

interface GallerySkeletonProps {
  category?: GalleryCategory;
}

export const GallerySkeleton: React.FC<GallerySkeletonProps> = ({ category }) => {
  const numColumns = useGalleryColumns();
  const columnRatios = getCategorySkeletonRatios(category, numColumns);

  return (
    <Box sx={GALLERY_LAYOUT.containerSx}>
      <Box
        sx={{
          display: 'flex',
          gap: GALLERY_LAYOUT.photoSpacing,
          width: '100%',
        }}
      >
        {columnRatios.map((ratios, colIdx) => (
          <Box
            key={colIdx}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: GALLERY_LAYOUT.photoSpacing,
            }}
          >
            {ratios.map((ratio, i) => (
              <Box
                key={i}
                sx={{
                  width: '100%',
                  aspectRatio: ratio,
                  overflow: 'hidden',
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
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GallerySkeleton;
