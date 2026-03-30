import { Outlet, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const headerTitlePath = {
    '/s': 'Dashboard',
    '/s/myinterns': 'My Interns',
    '/s/attendance': 'Attendance',
    '/s/tasks': 'Tasks',
    '/s/evaluations': 'Evaluations',
    '/s/settings': 'Settings',
  };

  const headerTitle = headerTitlePath[location.pathname] || 'Dashboard';

  return (
    <div className="row w-full">
      <header className="h-30 border-b border-slate-200 flex items-center px-5">
        <h1 className="font-medium text-lg">{headerTitle}</h1>
      </header>

      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}