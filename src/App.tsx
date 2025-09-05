import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";

import DashboardPage from "./components/pages/dashboard-page";
import LoginPage from "./components/pages/login-page";
import RegisterPage from "./components/pages/register-page";
import LandingPage from "./components/pages/landing-page";
import PrivateRoute from "./layouts/private-layout";

function App() {
  const router = createBrowserRouter([
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/dashboard",
          Component: DashboardPage
        },
      ],
    },
    {
      path: "/register",
      Component: RegisterPage,
    },
    {
      path: "/login",
      Component: LoginPage,
    },
    {
      path: "/",
      Component: LandingPage,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
