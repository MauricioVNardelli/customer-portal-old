import { IconLogout2, IconSettings } from '@tabler/icons-react';
import { Avatar, Menu } from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import { destroyCookie } from 'nookies';

export function TopbarUser() {

  const navigate = useNavigate();
  function ExitHandle() {
    destroyCookie(undefined, 'customer-portal.token', {});
  
    navigate("/");
    //return <Navigate to="/" replace />;
  }

  return (
    <Menu>
      <Menu.Target>
        <div id="topbar-user-icon" className='flex items-center max-w-28'>
          <Avatar 
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
            className='hover:cursor-pointer hover:border-2'
          />
          <p className='text-white text-sm font-semibold hidden sm:block ml-4'>Josemar Beulke</p>
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Usuário</Menu.Label>
        
        <Menu.Item leftSection={<IconSettings className="w-5 h-5"/>}>
          <NavLink to='/app/user'>
            Configurações
          </NavLink>
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
  )
}