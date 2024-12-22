import { createBrowserRouter } from "react-router";
import NavbarLayout from "./components/NavbarLayout";
import WelcomePage from "./pages/Welcome";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import FeedPage from "./pages/Feed";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/feed",
        element: <FeedPage />,
      },
    ],
  },
]);