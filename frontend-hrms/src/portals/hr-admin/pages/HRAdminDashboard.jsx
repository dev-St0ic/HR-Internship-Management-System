import { Link } from 'react-router-dom';

const HRAdminDashboard = () => {
  const menuLinks = [
    { label: 'Recruitment', path: '/hr-admin/recruitment' },
    { label: 'Intern Management', path: '/hr-admin/intern-management' },
    { label: 'Staff Management', path: '/hr-admin/staff-management' },
    { label: 'Document Vault', path: '/hr-admin/document-vault' },
    { label: 'Reports & Analytics', path: '/hr-admin/reports' },
    { label: 'System Logs', path: '/hr-admin/system-logs' },
    { label: 'Settings', path: '/hr-admin/settings' },
  ];

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900'>Welcome to HR Admin</h1>
        {/**<p className='text-sm text-slate-500'>Select an area to continue</p>**/}
      </div>

      {/**<div className='mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {menuLinks.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className='rounded-xl border border-indigo-200 px-4 py-3 text-indigo-700 font-semibold hover:bg-indigo-50'
          >
            {item.label}
          </Link>
        ))}
      </div>**/}

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {[
          { title: 'Active Interns', value: '128' },
          { title: 'Open Requisitions', value: '9' },
          { title: 'Pending Approvals', value: '5' },
          { title: 'Reports Generated', value: '44' },
        ].map((item) => (
          <div key={item.title} className='rounded-xl bg-white p-4 shadow-sm border border-slate-200'>
            <p className='text-sm text-slate-500'>{item.title}</p>
            <p className='text-2xl font-semibold text-indigo-700'>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRAdminDashboard;
