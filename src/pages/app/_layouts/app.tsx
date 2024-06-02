//import { Sidebar } from "@/components/ui/sidebar";
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar';
import { parseCookies } from "nookies";
import { Navigate, Outlet } from "react-router-dom";

export function LayoutApp() {
  const cookies = parseCookies();
  const isAuthenticated = cookies['customer-portal.token'];

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div id='layout-app' className="h-full">
      <header id="top-bar" className="flex h-16 border-b w-full drop-shadow-md">
        <Topbar />
      </header>      

      <div className="flex flex-row justify-center h-[calc(100%_-_4rem)]">
        <div id='side-bar' className="w-48 border-r">
          <Sidebar />
        </div>

        <div id='content' className="w-[calc(100%_-_12rem)] h-full">
          <Outlet />
        </div>
      </div>
      
    </div>
  )
}