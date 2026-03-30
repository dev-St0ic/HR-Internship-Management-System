import { Outlet, NavLink } from 'react-router-dom';

const baseClass = "block p-3 mt-1 rounded-r-lg transition-colors duration-300";
const activeClass = "bg-gray-300 border-l-3";
const inactiveClass = "hover:bg-gray-300/70";

const getNavClass = ({ isActive }) =>
  `${baseClass} ${isActive ? activeClass : inactiveClass}`;

const SupervisorLayout = () => {
  return (
    <div className="container mx-auto flex min-h-screen">
      <nav className="p-7 w-[300px] m-5 rounded-2xl" style={{ background: '#fafafb' }}>
        <div className="logo-company">
          <img src="image.png" alt="" className="size-15 rounded-full p-0 m-0" style={{background: '#bbbbbc'}} />
        </div>
        <div className="nav-tab mt-5">

        <ul className="nav">

          <li>
            <NavLink to="/s" end className={getNavClass}>
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/s/myinterns" className={getNavClass}>
              My Interns
            </NavLink>
          </li>

          <li>
            <NavLink to="/s/attendance" className={getNavClass}>
              Attendance
            </NavLink>
          </li>

        </ul>
          
        </div>

      </nav>
      <div className="row w-full">
        <header className="h-30 border-b border-slate-200 flex items-center px-5">
          <h1 className="font-bold text-lg">Dashboard</h1>
        </header>
        
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default SupervisorLayout;