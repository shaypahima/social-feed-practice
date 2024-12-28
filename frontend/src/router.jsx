import { createBrowserRouter } from "react-router";
import NavbarLayout from "./components/NavbarLayout.jsx";
import WelcomePage from "./pages/Welcome.jsx";
import SignupPage from "./pages/Signup.jsx";
import LoginPage from "./pages/Login.jsx";
import FeedPage from "./pages/Feed.jsx";
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