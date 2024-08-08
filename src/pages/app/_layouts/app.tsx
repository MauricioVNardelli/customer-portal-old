import clsx from "clsx";

import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { useDisclosure } from "@mantine/hooks";
import { createContext } from "react";
import { Outlet } from "react-router-dom";

type SidebarContextType = {
  opened: boolean;
  onToggle: () => void;
};

export const SidebarContext = createContext({} as SidebarContextType);

export function LayoutApp() {
  const [opened, { toggle }] = useDisclosure(true);

  let widthSideBar = " w-48 ";
  let plContent = " pl-48 ";

  if (!opened) {
    widthSideBar = " w-16 ";
    plContent = " pl-16 ";
  }

  return (
    <SidebarContext.Provider value={{ onToggle: toggle, opened: opened }}>
      <div id="layout-app" className="flex flex-row h-full">
        <div
          id="sidebar"
          className={clsx(
            "flex flex-col fixed h-full border-r shadow-md duration-300",
            widthSideBar
          )}
        >
          <Sidebar />
        </div>

        <div
          className={clsx(
            "flex flex-col items-center w-full h-full duration-300",
            plContent
          )}
        >
          <Topbar />

          <div id="content" className="h-full w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

//
