import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home.jsx";
import { CircuitLoader } from "../hooks/CircuitLoader.jsx";
import { AdminUsersLoader } from "../hooks/AdminUsersLoader.jsx";
import { Circuit } from "../pages/Circuit.jsx";
import { User, UserDiscordLogin, UserLogin, UserLogout, UserLinkTracker } from "../pages/User.jsx";
import { TeamCreate, TeamDelete, TeamManage } from "../pages/Team.jsx";
import { Admin, AdminUsers, AdminTrackers } from "../pages/Admin.jsx";
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
    path: "/user",
    element: <User />
  },
  {
    path: "/user/:id",
    element: <User />
  },
  {
    path: "/user/login",
    element: <UserLogin />,
    // loader: AuthLoader,
  },
  {
    path: "/user/discord",
    element: <UserDiscordLogin />,
    // loader: AuthLoader,
  },
  {
    path: "/user/logout",
    element: <UserLogout />,
  },
  {
    path: "/user/tracker",
    element: <UserLinkTracker />,
  },
  {
    path: "/team/create",
    element: <TeamCreate />,
  },
  {
    path: "/team/delete",
    element: <TeamDelete />,
  },
  {
    path: "/team/manage/:id",
    element: <TeamManage />,
  },
  {
    path: "/admin/",
    element: <Admin />,
  },
  {
    path: "/admin/users",
    element: <AdminUsers />,
    loader: AdminUsersLoader,
  },
  {
    path: "/admin/trackers",
    element: <AdminTrackers />,
  },
  
]);

export default router;
