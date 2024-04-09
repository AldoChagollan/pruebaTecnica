import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Users from "./Pages/Users";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/users", element: <Users /> },
]);
