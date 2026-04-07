import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, ClipboardList, BriefcaseBusiness, Settings  } from 'lucide-react';
import SidebarProfile from './SidebarProfile';


const baseClass = "block p-3 mt-1 rounded-r-lg transition-colors duration-300";
const activeClass = "border-l-4 border-[#7C3EFF] font-medium text-[#7C3EFF] bg-gray-300/70";
const inactiveClass = "hover:bg-gray-300/70";

const getNavClass = ({ isActive }) =>
  `${baseClass} ${isActive ? activeClass : inactiveClass}`;


const sidebarNavigation = [
  {
    sidebarRole : "Supervisor",
    sidebarContent : [
      { sidebarLabel: "Dashboard", sidebarIcon: <LayoutDashboard />, navLink : "/supervisor" },
      { sidebarLabel: "My Interns", sidebarIcon: <Users />, navLink : "/supervisor/myinterns"},
      { sidebarLabel: "Attendance", sidebarIcon: <CalendarCheck />, navLink: "/supervisor/attendance"  },
      { sidebarLabel: "Tasks", sidebarIcon: <ClipboardList />, navLink: "/supervisor/tasks" },
      { sidebarLabel: "Evaluations", sidebarIcon: <BriefcaseBusiness />, navLink: "/supervisor/evaluations" },
      { sidebarLabel: "Settings", sidebarIcon: <Settings />, navLink: "/supervisor/settings" },
    ]
  }
]


export default function Sidebar() {
  return (
    <>
      {sidebarNavigation.map((navigation, index) => (
      <nav key={index} className="p-7 w-[300px] h-[calc(100vh-2rem)] sticky top-5 bottom-5 m-5 rounded-2xl text-gray-700 shadow-lg" style={{ background: '#fafafb' }}>
        
        <div className="logo-company flex items-center text-lg font-medium text-gray-700">
          <img src="image.png" alt="" className="size-15 rounded-full p-0 m-0" style={{background: '#7C3EFF'}} /> 
          <h1 className="ml-2">{navigation.sidebarRole}</h1>
        </div>
        
        <div className="nav-tab mt-5">
          <ul className="nav">
            <li>
                {navigation.sidebarContent.map((content, secondindex) => (
                <div key={secondindex}>
                  <NavLink to={content.navLink} end className={getNavClass}>
                    <div className="flex justify-start items-center gap-2">
                      {content.sidebarIcon} {content.sidebarLabel}
                    </div>
                </NavLink>
                </div>
                ))}

            </li>
          </ul>
          {/* sidebar footer */}
            <SidebarProfile />
          
        </div>
        
      </nav>
      ))}
    </>
  );
}