import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { Toaster } from "sonner";

export function App() {
  return (
    <div id="App" className="font-app antialiased">
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </div>
  );
}
