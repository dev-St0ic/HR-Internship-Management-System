import { Outlet, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const SideBarLayout = () => {
  return (
    <div className='flex min-h-screen bg-slate-50'>
      <nav className='bg-white border-r border-slate-200 p-5 w-[260px]'>
        <div className='mb-8'>
          <h1 className='text-xl font-bold text-indigo-700'>HRIMS</h1>
          <p className='text-xs text-slate-500'>HR Admin</p>
        </div>

        <ul className='space-y-2'>
          <li>
            <Link
              component={RouterLink}
              to='/hr-admin'
              sx={{
                display: 'block',
                px: 2,
                py: 1,
                borderRadius: 1.5,
                color: 'text.primary',
                textDecoration: 'none',
                fontWeight: 'bold',
                backgroundColor: 'grey.100',
              }}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              component={RouterLink}
              to='/hr-admin/recruitment'
              sx={{
                display: 'block',
                px: 2,
                py: 1,
                borderRadius: 1.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { backgroundColor: 'grey.100', color: 'text.primary' },
              }}
            >
              Recruitment
            </Link>
          </li>
          <li>
            <Link
              component={RouterLink}
              to='/hr-admin/intern-management'
              sx={{
                display: 'block',
                px: 2,
                py: 1,
                borderRadius: 1.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { backgroundColor: 'grey.100', color: 'text.primary' },
              }}
            >
              Intern Management
            </Link>
          </li>
          <li>
            <Link
              component={RouterLink}
              to='/hr-admin/staff-management'
              sx={{
                display: 'block',
                px: 2,
                py: 1,
                borderRadius: 1.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { backgroundColor: 'grey.100', color: 'text.primary' },
              }}
            >
              Staff Management
            </Link>
          </li>
          <li>
            <Link
              component={RouterLink}
              to='/hr-admin/document-vault'
              sx={{
                display: 'block',
                px: 2,
                py: 1,
                borderRadius: 1.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { backgroundColor: 'grey.100', color: 'text.primary' },
              }}
            >
              Document Vault
            </Link>
          </li>
          <li>
            <Link
              component={RouterLink}
              to='/hr-admin/reports'
              sx={{
                display: 'block',
                px: 2,
                py: 1,
                borderRadius: 1.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { backgroundColor: 'grey.100', color: 'text.primary' },
              }}
            >
              Reports & Analytics
            </Link>
          </li>
          <li>
            <Link
              component={RouterLink}
              to='/hr-admin/system-logs'
              sx={{
                display: 'block',
                px: 2,
                py: 1,
                borderRadius: 1.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { backgroundColor: 'grey.100', color: 'text.primary' },
              }}
            >
              System Logs
            </Link>
          </li>
          <li>
            <Link
              component={RouterLink}
              to='/hr-admin/settings'
              sx={{
                display: 'block',
                px: 2,
                py: 1,
                borderRadius: 1.5,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { backgroundColor: 'grey.100', color: 'text.primary' },
              }}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      <div className='flex flex-col flex-1'>
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
