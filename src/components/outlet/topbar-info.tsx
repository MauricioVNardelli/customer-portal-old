import logo from '@/assets/coopermapp.png';

export function TopbarInfo() {
  return (
    <div id='component-topbar-left' className='flex flex-row items-center text-white'>
      <img src={logo} className='w-12 rounded-lg' />
      <h1 className='ml-5'>NOME DO CLIENTE - NOME DO CLIENTE</h1>
    </div>
  )
}