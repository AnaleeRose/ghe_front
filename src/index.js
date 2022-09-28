import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import router from "./config/routes";
// import Team, { teamLoader } from "./routes/team";




ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);