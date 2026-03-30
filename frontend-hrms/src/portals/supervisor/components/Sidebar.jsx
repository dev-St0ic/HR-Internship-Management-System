import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, ClipboardList, BriefcaseBusiness, Settings  } from 'lucide-react';
import SidebarProfile from './SidebarProfile';


const baseClass = "block p-3 mt-1 rounded-r-lg transition-colors duration-300";
const activeClass = "border-l-4 border-[#7C3EFF] font-medium text-[#7C3EFF] bg-gray-300/70";
const inactiveClass = "hover:bg-gray-300/70";

const getNavClass = ({ isActive }) =>
  `${baseClass} ${isActive ? activeClass : inactiveClass}`;


export default function Sidebar() {
  return (
    <nav className="p-7 w-[300px] h-[calc(100vh-2rem)] sticky top-5 bottom-5 m-5 rounded-2xl text-gray-700 shadow-lg" style={{ background: '#fafafb' }}>
      <div className="logo-company flex items-center text-lg font-medium text-gray-700">
        <img src="image.png" alt="" className="size-15 rounded-full p-0 m-0" style={{background: '#7C3EFF'}} /> 
        <h1 className="ml-2">SUPERVISOR</h1>
      </div>
      <div className="nav-tab mt-5">

        <ul className="nav">

          <li>
            <NavLink to="/s" end className={getNavClass}>
              <div className="flex justify-start items-center gap-2">
                <LayoutDashboard /> Dashboard
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/s/myinterns" className={getNavClass}>
              <div className="flex justify-start items-center gap-2">
                <Users /> My Interns
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/s/attendance" className={getNavClass}>
              <div className="flex justify-start items-center gap-2">
                <CalendarCheck /> Attendance
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/s/tasks" className={getNavClass}>
              <div className="flex justify-start items-center gap-2">
                <ClipboardList /> Tasks
              </div>
            </NavLink>  
          </li>
          
          <li>
            <NavLink to="/s/evaluations" className={getNavClass}> 
              <div className="flex justify-start items-center gap-2">
                <BriefcaseBusiness /> Evaluations
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/s/settings" className={getNavClass}>
              <div className="flex justify-start items-center gap-2">
                <Settings /> Settings
              </div>
            </NavLink>
          </li>

        </ul>
        {/* sidebar footer */}
          <SidebarProfile />
        
      </div>
    </nav>
  );
}