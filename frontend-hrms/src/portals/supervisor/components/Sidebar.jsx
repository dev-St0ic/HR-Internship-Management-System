import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, ClipboardList, BriefcaseBusiness, Settings  } from 'lucide-react';
import SidebarProfile from './SidebarProfile';
import { brandAssets } from '../../../common/config/appIconRegistry';
import { useTheme } from '../../../common/theme/ThemeProvider';

const baseClass = "block p-3 mt-1 rounded-r-lg transition-colors duration-300";


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
  const { isDark } = useTheme();
  const activeClass = isDark
    ? "border-l-4 border-[#7C3EFF] bg-slate-800/90 font-medium text-[#B59CFF]"
    : "border-l-4 border-[#7C3EFF] font-medium text-[#7C3EFF] bg-gray-300/70";
  const inactiveClass = isDark ? "text-slate-200 hover:bg-slate-800/70" : "hover:bg-gray-300/70";
  const getNavClass = ({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`;

  return (
    <>
      {sidebarNavigation.map((navigation, index) => (
      <nav key={index} className={`m-5 h-[calc(100vh-2rem)] w-[300px] sticky top-5 bottom-5 rounded-2xl p-7 shadow-lg ${isDark ? "bg-slate-900 text-slate-200 shadow-[0_18px_44px_rgba(2,6,23,0.42)]" : "text-gray-700"}`} style={isDark ? undefined : { background: '#fafafb' }}>
        
        <div className={`logo-company flex items-center text-lg font-medium ${isDark ? "text-white" : "text-gray-700"}`}>
          <img src={brandAssets.logo} alt="" className="size-15 rounded-full p-0 m-0 object-contain" /> 
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