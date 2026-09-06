import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '../components/RootLayout';
import { NotFoundPage } from '../pages/NotFoundPage';
import { galleryRoutes } from '../../gallery/routes/galleryRoutes';
import { aboutRoutes } from '../../about/routes/aboutRoutes';
import { contactRoutes } from '../../contact/routes/contactRoutes';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      ...galleryRoutes,
      ...aboutRoutes,
      ...contactRoutes,
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
