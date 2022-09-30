import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from "../pages/Home";
import { CircuitLoader } from "../hooks/CircuitLoader";
import { Circuit } from "../pages/Circuit";
import User from "../pages/User";

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
