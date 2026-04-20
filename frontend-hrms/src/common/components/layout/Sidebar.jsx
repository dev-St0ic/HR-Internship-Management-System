import { NavLink } from "react-router-dom";
import { brandAssets } from "../../config/appIconRegistry";
import { useTheme } from "../../theme/ThemeProvider";

const baseClass =
  "block w-full p-3 mt-1 rounded-r-lg transition-colors duration-300 flex items-center gap-3";

const Sidebar = ({ links }) => {
  const { isDark } = useTheme();
  const activeClass = isDark
    ? "border-l-4 border-[#7C3EFF] bg-slate-800/90 font-medium text-[#B59CFF]"
    : "bg-gray-200 border-l-4 border-[#7C3EFF] font-medium text-[#7C3EFF] bg-gray-300/70";
  const inactiveClass = isDark ? "text-slate-200 hover:bg-slate-800/70" : "hover:bg-gray-300/70";
  const getNavClass = ({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`;

  return (
    <nav className={`fixed top-0 left-0 h-screen w-60 overflow-y-auto rounded-2xl p-7 shadow-lg ${isDark ? "bg-slate-900 text-slate-200 shadow-[0_18px_44px_rgba(2,6,23,0.42)]" : "bg-[#FFFFFF] text-gray-700"}`}>
      {/* fixed top-0 left-0 h-screen w-[300px] p-7 bg-[#fafafb] overflow-y-auto */}
      {/* LOGO */}
      <div className={`mb-6 flex items-center text-4xl font-medium ${isDark ? "text-white" : ""}`}>
        <img
          src={brandAssets.logo}
          alt="logo"
          className="h-12 w-12 rounded-full object-contain"
        />
        <h1 className="ml-2">HRIMS</h1>
      </div>

      {/* NAVIGATION */}
      <ul>
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={getNavClass}>
                {Icon && <Icon size={18} />}
                <span>{link.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
