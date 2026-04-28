import { Outlet } from 'react-router-dom';
import Sidebar from '../../../common/components/layout/sidebar';
import { navigation } from '../../../common/config/navigation';

const HRAdminLayout = () => {
  return (
    <div className='flex min-h-screen bg-slate-50'>
      <Sidebar links={navigation.hradmin} />
      <div className='flex-1 ml-60 p-6'>
        <main className='flex-1 p-6 bg-slate-50'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HRAdminLayout;