import { NavLink } from '@mantine/core';
import { IconGauge, IconSettings, IconHeartHandshake } from '@tabler/icons-react';

export function Sidebar() {
  return (
    <div>
      <div id='title-side-bar' className='flex h-10 justify-center items-center bg-slate-300 shadow'>
        <h1 className='font-semibold'>Portal do Cliente</h1>
      </div>

      <NavLink
        label="Configuração"
        leftSection={<IconSettings size="1rem" stroke={1.5} />}
        className='hover:bg-sky-100'
      >
        <NavLink href="/app/user" label="Usuário" className='hover:bg-sky-100'/>
      </NavLink>

      <NavLink
        label="Dashboard"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        className='hover:bg-sky-100'
      >
        <NavLink href="/app/dashboard" label="Cooperado" className='hover:bg-sky-100'/>
      </NavLink>

      <NavLink
        label="Cooperado"
        leftSection={<IconHeartHandshake size="1rem" stroke={1.5} />}
        className='hover:bg-sky-100'
      >
        <NavLink href="/app/contract" label="Recibo de repasse" className='hover:bg-sky-100'/>
      </NavLink>            
    </div>
  );
}