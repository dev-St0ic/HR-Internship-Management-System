import { NavLink } from "react-router-dom";
import SidebarProfile from "./SidebarProfile";
import { useAuth } from "../../../contexts/AuthContext";

const baseClass =
    "block w-full p-3 mt-1 rounded-r-lg transition-colors duration-300 flex items-center gap-3";

    const activeClass =
    "bg-gray-200 border-l-4 border-[#7C3EFF] font-medium text-[#7C3EFF] bg-gray-300/70";
    const inactiveClass = "hover:bg-gray-300/70";

    const getNavClass = ({ isActive }) =>
    `${baseClass} ${isActive ? activeClass : inactiveClass}`;

    const Sidebar = ({ links }) => {
    const { user } = useAuth();
    return (
        <nav className="fixed top-0 left-0 h-screen w-60 p-7 bg-[#FFFFFF] overflow-y-auto rounded-2xl text-gray-700 shadow-lg flex flex-col justify-between">
        <div>
            {/* LOGO */}
            <div className="flex items-center text-4xl font-medium mb-6">
            <img
                src="/image.png"
                alt="logo"
                className="w-12 h-12 rounded-full bg-violet-500"
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
        </div>

        {/* PROFILE ROLE */}
        <SidebarProfile
            userName={user?.name}
            role={user?.role}
            onLogout={user?.logout}
        />
        </nav>
    );
};

export default Sidebar;