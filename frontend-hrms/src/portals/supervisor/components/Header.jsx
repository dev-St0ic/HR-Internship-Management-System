import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { Bell, Link } from 'lucide-react';  
import { useTheme } from '../../../common/theme/ThemeProvider';

export default function Header() {
  const { isDark } = useTheme();
  const location = useLocation();

  const headerTitlePath = {
    '/s': 'Dashboard',
    '/s/myinterns': 'My Interns',
    '/s/attendance': 'Attendance',
    '/s/tasks': 'Tasks',
    '/s/evaluations': 'Evaluations',
    '/s/settings': 'Settings',
    '/s/notifications': 'Notifications',
  };

  const headerLabelsPath = {
    headerTitlePath: {
      '/s/myinterns': 'Manage and monitor your assigned interns',
      '/s/attendance': 'Monitor and review intern DTRs',
      '/s/tasks': 'Assign and monitor intern tasks',
      '/s/evaluations': 'Assess and submit intern performance evaluations',
      '/s/settings': 'Manage your personal preferences and account security.',
      '/s/notifications': 'All Notifications',
  }
};

  const headerTitle = headerTitlePath[location.pathname] || 'Dashboard';
  const headerLabel = headerLabelsPath.headerTitlePath[location.pathname] || '';

  return (
    <div className="row w-full">
      <div className={`header flex h-30 items-center justify-between px-5 ${isDark ? "text-slate-100" : ""}`}>
        <div className="header-title">
          <header className="flex items-center">
            <h1 className="font-medium text-lg">{headerTitle}</h1>
          </header>
          <span className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}>{headerLabel}</span>
        </div>
        <NavLink to="/s/notifications">
          <div className={`rounded-full p-2 cursor-pointer transition-colors duration-300 ${isDark ? "hover:bg-slate-800" : "hover:bg-gray-100"}`}>
            <Bell />
          </div>
        </NavLink>
      </div>

      <main className="m-0 flex-1 px-5">
        <Outlet />
      </main>
    </div>
  );
}