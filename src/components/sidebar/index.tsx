import clsx from "clsx";
import { SidebarContext } from "@/pages/app/_layouts/app";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarUser } from "./sidebar-user";
import { AppContext } from "@/contexts/app-context";
import {
  BuildingIcon,
  Calendar1Icon,
  HomeIcon,
  MenuIcon,
  UserIcon,
  XIcon,
} from "lucide-react";

type menu = {
  name: string;
  src: string;
  icon?: React.ReactNode;
  isRoutePrivate?: boolean;
};

const listMenuCustomer: menu[] = [
  { name: "Dashboard", src: "/app/dashboard", icon: <HomeIcon /> },
  {
    name: "Agend. de pátio",
    src: "/app/scheduling",
    icon: <Calendar1Icon />,
  },
];

const listMenuAdmin: menu[] = [
  {
    name: "Usuário",
    src: "/app/user",
    isRoutePrivate: true,
    icon: <UserIcon />,
  },
  {
    name: "Empresa",
    src: "/app/company",
    isRoutePrivate: true,
    icon: <BuildingIcon />,
  },
];

export function Sidebar() {
  const { isOpenSidebar, setSidebarOpen } = useContext(SidebarContext);
  const { user } = useContext(AppContext);

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
    <div className="bg-white h-full dark:text-gray-300 dark:bg-gray-900">
      <div className="flex w-full items-center justify-center h-12">
        <button
          onClick={() => setSidebarOpen(!isOpenSidebar)}
          className="hover:text-purple-600 hover:dark:text-gray-400"
        >
          {isOpenSidebar ? <XIcon /> : <MenuIcon />}
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
          {listMenuAdmin.length > 0 && user?.role != "USUARIO" && (
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
