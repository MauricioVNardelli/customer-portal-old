import { forwardRef } from 'react';
import { IconChevronRight, IconLogout2, IconSettings } from '@tabler/icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import { destroyCookie } from 'nookies';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500} className='text-white'>
            {name}
          </Text>
        </div>

        {icon || <IconChevronRight size="1rem" className='text-white' />}
      </Group>
    </UnstyledButton>
  )
);

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
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
          name="Josemar Beulke"
        />
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