import logo from '@/assets/coopermapp.png';

import { useContext } from 'react';
import { SidebarNav } from './sidebar-nav';
import { SidebarUser } from './sidebar-user';
import { SidebarContext } from '@/pages/app/_layouts/app';

export function Sidebar() {
  const { onToggle } = useContext(SidebarContext);

  return (
    <>
      <div id='sidebar-info' className='flex flex-row justify-center items-center h-24'>
        <img 
          src={logo} 
          className='w-12 rounded-lg shadow-md hover:border-2 hover:border-white hover:box-border hover:cursor-pointer' 
          onClick={onToggle} 
        />
      </div>

      <div className='flex flex-col h-full justify-between'>
        <SidebarNav />

        <div id='sidebar-user' className='flex h-16 border-t justify-center items-center'>
          <SidebarUser />
        </div>
      </div>
    </>
  );
}