import { Avatar, Menu, Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ModalChangePassword } from "./modal-change-password";
import { SidebarContext } from "@/pages/app/_layouts/app";
import { AppContext } from "@/contexts/app-context";
import { LogOutIcon } from "lucide-react";

export function SidebarUser() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const { isOpenSidebar } = useContext(SidebarContext);
  const { SignOut, user } = useContext(AppContext);

  function ExitHandle() {
    const companyCode = localStorage.getItem("companyCode");

    SignOut();

    navigate("/auth/" + companyCode);
  }

  let classNameUserName = "";

  if (!isOpenSidebar) classNameUserName = " hidden ";

  return (
    <>
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Alterar senha"
        centered
      >
        <ModalChangePassword setOpenModal={setOpenModal} />
      </Modal>

      <Menu>
        <Menu.Target>
          <div id="topbar-user-icon" className="flex items-center">
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
              className="hover:cursor-pointer hover:border-2"
            />
            <p
              className={
                "text-black text-sm font-semibold ml-4 " + classNameUserName
              }
            >
              {user?.name}
            </p>
          </div>
        </Menu.Target>
        <Menu.Dropdown className="dark:bg-slate-800">
          <Menu.Label>Usuário</Menu.Label>

          {/*<Menu.Item
            leftSection={<IconSettings className="w-5 h-5" />}
            onClick={() => setOpenModal(true)}
            className="dark:text-white hover:dark:bg-gray-700"
          >
            Alterar senha
          </Menu.Item>*/}

          <Menu.Item
            color="red"
            leftSection={<LogOutIcon className="w-5 h-5" />}
            onClick={ExitHandle}
          >
            Sair
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
