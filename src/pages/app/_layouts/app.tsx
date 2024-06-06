//import { Sidebar } from "@/components/ui/sidebar";
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar';
import { useDisclosure } from '@mantine/hooks';
import { parseCookies } from "nookies";
import { createContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";

type SidebarContextType = {
  opened: boolean;
  onToggle: () => void
}

export const SidebarContext = createContext({} as SidebarContextType)

export function LayoutApp() {
  const cookies = parseCookies();
  const [opened, { toggle }] = useDisclosure();
  const isAuthenticated = cookies['customer-portal.token'];

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  let classNameSideBar = " w-48 ";
  let classNameContet = " ml-48 ";

  if (!opened) {
    classNameSideBar = " w-16 ";
    classNameContet = " ml-16 ";
  }

  return (
    <SidebarContext.Provider value={{ onToggle: toggle, opened: opened }}>
      <div id='layout-app' className="flex flex-row h-full">
        <div id='sidebar' className={"flex flex-col fixed h-full border-r shadow-md transition-all duration-200 ease-in " + classNameSideBar}>
          <Sidebar />
        </div>

        <div className={"flex flex-col items-center w-full h-full transition-all duration-200 ease-in " + classNameContet}>
          <Topbar />

          <div id='content' className="h-full w-full">
            <Outlet />
          </div>
        </div>      
      </div>
    </SidebarContext.Provider>
  )
}

//