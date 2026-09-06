import type { RouteObject } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage';

export const aboutRoutes: RouteObject[] = [
  {
    path: 'sobremi',
    element: <AboutPage />,
  },
];
