import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { Bell, Link } from 'lucide-react';  

export default function Header() {
  const location = useLocation();

  const headerTitlePath = {
    '/supervisor': 'Dashboard',
    '/supervisor/myinterns': 'My Interns',
    '/supervisor/attendance': 'Attendance',
    '/supervisor/tasks': 'Tasks',
    '/supervisor/documents': 'Documents',
    '/supervisor/evaluations': 'Evaluations',
    '/supervisor/settings': 'Settings',
    '/supervisor/notifications': 'Notifications',
  };

  const headerLabelsPath = {
    headerTitlePath: {
      '/supervisor/myinterns': 'Manage and monitor your assigned interns',
      '/supervisor/attendance': 'Monitor and review intern DTRs',
      '/supervisor/tasks': 'Assign and monitor intern tasks',
      '/supervisor/documents': 'View and comply with intern requests',
      '/supervisor/evaluations': 'Assess and submit intern performance evaluations',
      '/supervisor/settings': 'Manage your personal preferences and account security.',
      '/supervisor/notifications': 'All Notifications',
  }
};

  const headerTitle = headerTitlePath[location.pathname] || 'Dashboard';
  const headerLabel = headerLabelsPath.headerTitlePath[location.pathname] || '';

  return (
    <div className="row w-full">
      <div className="header flex h-30 justify-between items-center px-5">
        <div className="header-title">
          <header className="flex items-center">
            <h1 className="font-medium text-lg">{headerTitle}</h1>
          </header>
          <span className="text-gray-500 text-sm">{headerLabel}</span>
        </div>
        <NavLink to="/supervisor/notifications">
          <div className="hover:bg-gray-100 rounded-full p-2 cursor-pointer transition-colors duration-300">
            <Bell />
          </div>
        </NavLink>
      </div>

      <main className="flex-1 px-5 m-0">
        <Outlet />
      </main>
    </div>
  );
}