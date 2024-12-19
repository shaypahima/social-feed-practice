import { createBrowserRouter } from "react-router";
import NavbarLayout from "./components/NavbarLayout";
import FeedPage from "./pages/Feed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        path: "/feed",
        element: <FeedPage/>
      },
    ],
  },
]);