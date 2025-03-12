import { RouterProvider } from "react-router";
import { router } from "./router.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/queryClient";
import { CustomProvider } from "rsuite";
import AuthProvider from "./context/authContext.jsx";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomProvider theme="dark">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CustomProvider>
    </QueryClientProvider>
  );
}

export default App;
