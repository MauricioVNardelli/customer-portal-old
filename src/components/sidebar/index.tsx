import { SidebarContext } from "@/pages/app/_layouts/app";
import {
  IconBuilding,
  IconContract,
  IconHome,
  IconMenu2,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import clsx from "clsx";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarUser } from "./sidebar-user";

type menu = {
  name: string;
  src: string;
  icon?: React.ReactNode;
  isRoutePrivate?: boolean;
};

const listMenuCustomer: menu[] = [
  { name: "Dashboard", src: "/app/dashboard", icon: <IconHome stroke={1.5} /> },
  {
    name: "Contrato",
    src: "/app/contract",
    icon: <IconContract stroke={1.5} />,
  },
  {
    name: "Usuário",
    src: "/app/user",
    isRoutePrivate: true,
    icon: <IconUser stroke={1.5} />,
  },
  {
    name: "Empresa",
    src: "/app/company",
    isRoutePrivate: true,
    icon: <IconBuilding stroke={1.5} />,
  },
];

const listMenuAdmin: menu[] = [];

export function Sidebar() {
  const { isOpenSidebar, setSidebarOpen } = useContext(SidebarContext);

  function getListMenu(prListMenu: menu[]): React.ReactNode {
    return prListMenu.map((value) => (
      <li className="pt-2 " key={value.name} title={value.name}>
        <Link
          to={value.src}
          className={clsx(
            "flex flex-row w-full h-10 gap-2 p-2 rounded-md items-center",
            !isOpenSidebar && "justify-center",
            "hover:bg-gray-100 hover:text-purple-600 hover:cursor-pointer",
            "hover:dark:bg-gray-700 hover:dark:text-gray-200"
          )}
        >
          {value.icon}
          {
            <span className={clsx(!isOpenSidebar ? "hidden" : "")}>
              {value.name}
            </span>
          }
        </Link>
      </li>
    ));
  }

  return (
    <div className="h-full dark:text-gray-300 dark:bg-gray-900">
      <div className="flex w-full items-center justify-center h-12">
        <button
          onClick={() => setSidebarOpen(!isOpenSidebar)}
          className="hover:text-purple-600 hover:dark:text-gray-400"
        >
          {isOpenSidebar ? <IconX /> : <IconMenu2 />}
        </button>
      </div>
      <nav
        id="sidebar"
        className="flex flex-col justify-center items-center px-4 pb-4 h-[calc(100%-3rem)]"
      >
        <ul className="w-full h-full">
          <li id="list-menu">
            <ul className="">{getListMenu(listMenuCustomer)}</ul>
          </li>
          {listMenuAdmin.length > 0 && (
            <li id="list-menu-private">
              <p
                className={clsx(
                  "pt-8 text-sm font-semibold text-gray-500",
                  !isOpenSidebar && "flex justify-center"
                )}
              >
                Privado
              </p>
              <ul className="">{getListMenu(listMenuAdmin)}</ul>
            </li>
          )}
        </ul>
        <div id="sidebar-menu-user">
          <SidebarUser />
        </div>
      </nav>
    </div>
  );
}
