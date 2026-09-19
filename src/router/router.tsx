import { createBrowserRouter } from "react-router";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ProjectPage from "../pages/ProjectPage";
import RootLayout from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/projects/:slug",
        Component: ProjectPage,
      },
    ],
  },
]);