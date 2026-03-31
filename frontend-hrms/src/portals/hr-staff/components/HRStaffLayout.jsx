import { Outlet } from 'react-router-dom';
import SideBarLayout from './sideBarLayout';
import StaffHeader from './StaffHeader';

const HRStaffLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SideBarLayout />
      <div className="flex flex-col w-full">
        <StaffHeader />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HRStaffLayout;
