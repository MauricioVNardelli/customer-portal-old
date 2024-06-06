import { RouterProvider } from "react-router-dom";
import { router } from '@/router'

export function App() {
  return (
    <div id="App" className="h-full">
      <RouterProvider router={router} />
    </div>
  )
}
