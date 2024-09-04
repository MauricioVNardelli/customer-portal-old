import clsx from "clsx";

import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

type SidebarContextType = {
  isOpenSidebar: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarContext = createContext({} as SidebarContextType);

export function LayoutApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div id="layout-app">
      <div
        id="layout-app-left"
        className={clsx(
          "fixed h-full border-r shadow-md duration-300 dark:border-slate-600",
          sidebarOpen ? "w-56" : "w-20"
        )}
      >
        <SidebarContext.Provider
          value={{ isOpenSidebar: sidebarOpen, setSidebarOpen: setSidebarOpen }}
        >
          <Sidebar />
        </SidebarContext.Provider>
      </div>

      <div
        id="layout-app-right"
        className={clsx(
          "flex flex-col w-full duration-300",
          sidebarOpen ? "pl-56" : "pl-20"
        )}
      >
        <Topbar />

        <div
          id="content"
          className="min-h-[calc(100vh-3rem)] w-full dark:bg-gradient-to-t from-slate-900 to-slate-950"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

//
