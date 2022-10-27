import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home.jsx";
import { CircuitLoader } from "../hooks/CircuitLoader.jsx";
import { Circuit } from "../pages/Circuit.jsx";
import User from "../pages/User.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "circuit/:id",
    element: <Circuit />,
    loader: CircuitLoader,
  },
  {
    path: "/users",
    element: <User />
  },
  {
    path: "/user",
    element: <User />
  },
]);

export default router;
