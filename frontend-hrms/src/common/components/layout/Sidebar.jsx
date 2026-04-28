import { NavLink } from "react-router-dom";
import SidebarProfile from "./SidebarProfile";

const activeClass =
  "bg-gray-200 border-l-4 border-[#7C3EFF] font-medium text-[#7C3EFF] bg-gray-300/70";
const inactiveClass = "hover:bg-gray-300/70";

const Sidebar = ({
  links = [],
  userName,
  role,
  isCollapsed,
  setIsCollapsed,
}) => {
  const baseClass = `relative flex items-center transition-all duration-300 rounded-xl px-4 py-3 group ${
    isCollapsed ? "justify-center" : "gap-4"
  }`;

  const getNavClass = ({ isActive }) =>
    `${baseClass} ${
      isActive 
        ? "bg-[#F3F0FF] text-[#7C3EFF] font-semibold" 
        : "text-gray-500 hover:bg-gray-50"
    }`;

  return (
    <aside className={`fixed top-0 left-0 h-screen transition-all duration-300 bg-[#F8F9FA] p-4 z-40 ${
      isCollapsed ? "w-32" : "w-72" 
    }`}>
      
      <div className="bg-white h-full w-full rounded-[1.5rem] p-4 flex flex-col shadow-sm border border-gray-100 overflow-hidden">
        
        {/* LOGO SECTION */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center mb-10 transition-all duration-300 ${
            isCollapsed ? "justify-center" : "px-2"
          }`}
        >
          <img
            src="/image.png"
            alt="logo"
            className="w-12 h-12 rounded-full bg-violet-500"
          />
          {!isCollapsed && (
            <h1 className="ml-3 text-2xl font-bold tracking-tight text-gray-900">
              HRIMS
            </h1>
          )}
        </button>

        <ul className="flex-1 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={getNavClass}>
                  {({ isActive }) => (
                    <>
                      {isActive && !isCollapsed && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-8 bg-[#7C3EFF] rounded-r-md" />
                      )}
                      <span className={`${isActive ? "text-[#7C3EFF]" : "text-gray-400 group-hover:text-gray-600"}`}>
                        {Icon && <Icon size={22} />}
                      </span>
                      {!isCollapsed && <span className="text-[15px] whitespace-nowrap">{link.label}</span>}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto">
          <SidebarProfile userName={userName} role={role} isCollapsed={isCollapsed} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;