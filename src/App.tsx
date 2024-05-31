import { RouterProvider } from "react-router-dom";
import { router } from '@/router'

export function App() {
  return (
    <div id="App" className="w-screen h-screen">
      <RouterProvider router={router} />
    </div>
  )
}
