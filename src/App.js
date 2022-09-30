import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  RouterProvider,
} from "react-router-dom";

import router from "./config/Route";

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;