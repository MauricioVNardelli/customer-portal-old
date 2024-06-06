import { useContext } from 'react';
import { ToolOutlined, PieChartOutlined, BookOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { SidebarContext } from '@/pages/app/_layouts/app';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

export function SidebarNav() {  
  const { opened } = useContext(SidebarContext);
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {    

    navigate(e.key);
  };

  const items: MenuItem[] = [
    { 
      key: '/app/dashboard', 
      icon: <PieChartOutlined />, 
      label: 'Dashboard'
    },
  
    {
      key: '#',
      label: 'Cooperado',
      icon: <BookOutlined />,
      children: [
        { key: '/app/contract', label: 'Recibo de repasse' }
      ],
    },
    {
      key: '3',
      label: 'Configuração',
      icon: <ToolOutlined />,
      children: [
        { key: '/app/user', label: 'Usuário' },
      ],
    },
  ];

  return (
    <div className='w-full'>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline" 
        style={{width: "100%"}}       
        //theme="dark"
        inlineCollapsed={!opened}
        items={items}
      />
    </div>
  );
};