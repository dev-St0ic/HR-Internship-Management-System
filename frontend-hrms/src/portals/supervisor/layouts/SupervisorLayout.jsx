import { Outlet, Link } from 'react-router-dom';

const SupervisorLayout = () => {
  return (
    <div className="flex min-h-screen">
      <nav className="bg-slate-200 p-5 w-[250px]">
        <h2>Supervisor Sidebar</h2>
        <ul>
          {/* <li><Link to="/supervisor">Dashboard</Link></li> */}
        </ul>
      </nav>
      <div className="row w-full">
        <header className="h-16 border-b border-slate-200 flex items-center px-8">
          Supervisor Header
        </header>
        
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default SupervisorLayout;