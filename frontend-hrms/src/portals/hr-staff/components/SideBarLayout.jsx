import { Outlet } from 'react-router-dom';
import Sidebar from '../../../common/components/layout/sidebar';
import { navigation } from '../../../common/config/navigation';

const SideBarLayout = () => {
  return (
    <div className='flex min-h-screen bg-slate-50'>
      <Sidebar links={navigation.hrstaff} />
      <div className='flex-1 p-6'>
        <header className='h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8'>
          <div>
            <h2 className='text-xl font-semibold'>HR Staff</h2>
            <p className='text-sm text-slate-500'>Staff management dashboard</p>
          </div>
          <div className='text-sm text-slate-600'>Welcome, HR Staff</div>
        </header>

        <main className='flex-1 p-6 bg-slate-50'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SideBarLayout;
