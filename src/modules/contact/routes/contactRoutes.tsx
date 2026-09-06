import type { RouteObject } from 'react-router-dom';
import { ContactPage } from '../pages/ContactPage';

export const contactRoutes: RouteObject[] = [
  {
    path: 'contacto',
    element: <ContactPage />,
  },
];
