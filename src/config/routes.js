import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from "../pages/home";
import { Circuit, circuitLoader } from "../pages/circuit";
import User from "../pages/user";

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
    loader: circuitLoader,
  },
  {
    path: "user",
    element: <User />
  },
  {
    path: "user",
    element: <User />
  },
]);

export default router;