import type { RouteObject } from 'react-router-dom';
import { GalleryPage } from '../pages/GalleryPage';

export const galleryRoutes: RouteObject[] = [
  {
    index: true,
    element: <GalleryPage category="INICIO" />,
  },
  {
    path: 'paisaje',
    element: <GalleryPage category="PAISAJE" />,
  },
  {
    path: 'naturaleza',
    element: <GalleryPage category="NATURALEZA" />,
  },
  {
    path: 'retrato',
    element: <GalleryPage category="RETRATO" />,
  },
  {
    path: 'deportes',
    element: <GalleryPage category="DEPORTES" />,
  },
  {
    path: 'otros',
    element: <GalleryPage category="OTROS" />,
  },
];
