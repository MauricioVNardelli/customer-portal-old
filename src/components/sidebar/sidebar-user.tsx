import { IconLogout2, IconSettings } from '@tabler/icons-react';
import { Avatar, Menu, Modal } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { destroyCookie } from 'nookies';
import { useContext, useState } from 'react';
import { ModalChangePassword } from './modal-change-password';
import { GetSessionUser } from '@/lib/session';
import { SidebarContext } from '@/pages/app/_layouts/app';

export function SidebarUser() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { opened } = useContext(SidebarContext);
  
  const user = GetSessionUser();
  
  function ExitHandle() {
    destroyCookie(undefined, "customer-portal.token");
  
    navigate("/");
  }

  let classNameUserName = "";

  if (!opened)
      classNameUserName = " hidden ";

  return (
    <>
      <Modal opened={openModal} onClose={() => setOpenModal(false)} title="Alterar senha" centered>
        <ModalChangePassword setOpenModal={setOpenModal} />
      </Modal>

      <Menu>
        <Menu.Target>
          <div id="topbar-user-icon" className='flex items-center'>
            <Avatar 
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
              className='hover:cursor-pointer hover:border-2'
            />            
            <p className={'text-black text-sm font-semibold ml-4 ' + classNameUserName}>{user.name}</p>
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Usuário</Menu.Label>
          
          <Menu.Item 
            leftSection={<IconSettings className="w-5 h-5"/>} 
            onClick={() => setOpenModal(true)}
          >
            Alterar senha
          </Menu.Item>

          <Menu.Item 
            color="red" 
            leftSection={<IconLogout2 className="w-5 h-5" />}
            onClick={ExitHandle}
          >          
            Sair
          </Menu.Item>

        </Menu.Dropdown>
      </Menu>
    </>
  )
}