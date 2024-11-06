import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Detail from "../pages/Detail";

const AppRouter = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    index: true,
  },
  {
    path: '/practice',
    element: <Practice />,
    index: true,
  },
  {
    path: "/detail",
    element: <Detail />,
    index: true,
  },
  {
    path: "*",
    element: <NotFound />,
    index: true,
  },
]);

export default AppRouter;