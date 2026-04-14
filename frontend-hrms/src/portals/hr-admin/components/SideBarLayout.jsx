import { Outlet } from 'react-router-dom';
import Sidebar from '../../../common/components/layout/sidebar';
import { LayoutDashboard, Users, FileText, BarChart3, Settings, Shield, UserCheck } from 'lucide-react';

const links = [
  { to: '/hr-admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/hr-admin/recruitment', label: 'Recruitment', icon: UserCheck },
  { to: '/hr-admin/intern-management', label: 'Intern Management', icon: Users },
  { to: '/hr-admin/staff-management', label: 'Staff Management', icon: UserCheck },
  { to: '/hr-admin/document-vault', label: 'Document Vault', icon: FileText },
  { to: '/hr-admin/reports', label: 'Reports & Analytics', icon: BarChart3 },
  { to: '/hr-admin/system-logs', label: 'System Logs', icon: Shield },
  { to: '/hr-admin/settings', label: 'Settings', icon: Settings },
];

const SideBarLayout = () => {
  return (
    <div className='flex min-h-screen bg-slate-50'>
      <Sidebar links={links} />
      <div className='flex flex-col flex-1 ml-60'>
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

export default SideBarLayout;
