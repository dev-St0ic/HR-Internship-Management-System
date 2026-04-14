import { Outlet } from "react-router-dom";
import Sidebar from '../../../common/components/layout/sidebar';
import { LayoutDashboard } from 'lucide-react';

const links = [
  { to: '/supervisor', label: 'Dashboard', icon: LayoutDashboard, end: true },
];

const SupervisorLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={links} />
      <div className="flex-1 ml-60">
        <header className="h-16 border-b border-slate-200 flex items-center px-8">
          Supervisor Header
        </header>

        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SupervisorLayout;
