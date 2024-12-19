import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import { CustomProvider } from "rsuite";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomProvider theme="dark">
        <RouterProvider router={router} />
      </CustomProvider>
    </QueryClientProvider>
  );
}

export default App;
