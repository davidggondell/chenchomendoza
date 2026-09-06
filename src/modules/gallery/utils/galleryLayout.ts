import { useTheme, useMediaQuery } from '@mui/material';
import type { GalleryCategory } from '../../../types';

export const GALLERY_LAYOUT = {
  photoSpacing: 1, // 8px (MUI spacing 1)
  padding: 1,
  paddingX: { xs: 1, md: 8 }, // 8px on mobile, 64px on desktop (exact match to legacy)
  containerSx: {
    minHeight: '101vh',
    backgroundImage: 'linear-gradient(to right, #F9F9F9, #ffffff)',
    padding: 1,
    paddingLeft: { xs: 1, md: 8 },
    paddingRight: { xs: 1, md: 8 },
    userSelect: 'none' as const,
  },
};

export const useGalleryColumns = (): number => {
  const theme = useTheme();
  const isL = useMediaQuery(theme.breakpoints.up('lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  return 2 + (isL ? 1 : 0) + (isXl ? 1 : 0);
};

// Realistic photographic aspect ratios:
// Landscape 3:2 -> '3 / 2' (width:height = 1.5)
// Portrait 2:3 -> '2 / 3' (width:height = 0.667)
// Panoramic -> '16 / 10'
export const getCategorySkeletonRatios = (
  category?: GalleryCategory,
  numColumns: number = 2
): string[][] => {
  // Retratos: Predominio de formato vertical (2:3) con alguna horizontal esporádica (~80% vertical)
  const portraitCol1 = ['2 / 3', '2 / 3', '3 / 2', '2 / 3'];
  const portraitCol2 = ['2 / 3', '3 / 2', '2 / 3', '2 / 3'];
  const portraitCol3 = ['3 / 2', '2 / 3', '2 / 3', '2 / 3'];
  const portraitCol4 = ['2 / 3', '2 / 3', '2 / 3', '3 / 2'];

  // Paisaje, Naturaleza, Otros e Inicio: Predominio claro de formato horizontal (3:2) con alguna vertical esporádica (~80% horizontal)
  const landscapeCol1 = ['3 / 2', '3 / 2', '2 / 3', '3 / 2'];
  const landscapeCol2 = ['3 / 2', '2 / 3', '3 / 2', '3 / 2'];
  const landscapeCol3 = ['2 / 3', '3 / 2', '3 / 2', '3 / 2'];
  const landscapeCol4 = ['3 / 2', '3 / 2', '3 / 2', '2 / 3'];

  switch (category) {
    case 'RETRATO':
      return [portraitCol1, portraitCol2, portraitCol3, portraitCol4].slice(0, numColumns);
    case 'PAISAJE':
    case 'NATURALEZA':
    case 'DEPORTES':
    case 'OTROS':
    case 'INICIO':
    default:
      return [landscapeCol1, landscapeCol2, landscapeCol3, landscapeCol4].slice(0, numColumns);
  }
};
