import { Outlet } from 'react-router-dom';
import Sidebar from '../../../common/components/layout/sidebar';
import { LayoutDashboard, Users, FileText, BarChart3, Settings } from 'lucide-react';

const links = [
  { to: '/hr-staff', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/hr-staff/operations', label: 'Operations', icon: Users },
  // Add more links as needed
];

const SideBarLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={links} />
      <div className="flex-1 ml-60">
        <header className="h-16 border-b border-slate-200 flex items-center px-8">
          HR Staff Header
        </header>
        
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default SideBarLayout;
