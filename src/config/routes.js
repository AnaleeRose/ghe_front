import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/home.jsx";
import { CircuitLoader } from "../hooks/circuitLoader";
import { Circuit } from "../pages/circuit.jsx";
import User from "../pages/user.jsx";

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
