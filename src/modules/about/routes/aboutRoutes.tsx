import type { RouteObject } from "react-router-dom";
import { AboutPage } from "../pages/AboutPage";
import { TrajectoryPage } from "../pages/TrajectoryPage";

export const aboutRoutes: RouteObject[] = [
  {
    path: "sobremi",
    element: <AboutPage />,
  },
  {
    path: "trayectoria",
    element: <TrajectoryPage />,
  },
];
