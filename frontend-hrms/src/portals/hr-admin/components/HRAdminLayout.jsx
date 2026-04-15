import { Outlet } from 'react-router-dom';
import Sidebar from '../../../common/components/layout/Sidebar';
import { navigation } from '../../../common/config/navigation';

const HRAdminLayout = () => {
  return (
    <div className='flex min-h-screen bg-slate-50'>
      <Sidebar links={navigation.hradmin} />
      <div className='flex-1 p-6'>
        <header className='h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8'>
          <div>
            <h2 className='text-xl font-semibold'>HR Admin</h2>
            <p className='text-sm text-slate-500'>Central administrative dashboard</p>
          </div>
          <div className='text-sm text-slate-600'>Welcome, HR Admin</div>
        </header>

        <main className='flex-1 p-6 bg-slate-50'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HRAdminLayout;