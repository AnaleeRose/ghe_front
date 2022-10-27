import * as React from "react";
import {
  RouterProvider,
} from "react-router-dom";

import router from "./config/routes.js";

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;