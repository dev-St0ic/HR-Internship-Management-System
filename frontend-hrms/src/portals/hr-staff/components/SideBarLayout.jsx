import { Outlet, NavLink } from "react-router-dom";
import { Briefcase, Users } from "lucide-react";

export default function SideBarLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 flex flex-col justify-between shrink-0">
        {/* Top Section */}
        <div>
          {/* Logo/ Title */}
          <div className="flex items-center justify-start gap-2 mb-8">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <h1 className="text-2xl font-bold">HRMS</h1>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <SidebarItem
              icon={<Briefcase size={18} />}
              label="Operations"
              to="/hr-staff/operations"
            />
            <SidebarItem
              icon={<Users size={18} />}
              label="Recruitment"
              to="/hr-staff/recruitment"
            />
          </nav>
        </div>

        {/* Bottom Section (User Profile) */}
        <div className="flex items-center gap-3 p-2 bg-gray-200 rounded-lg">
          <div className="w-8 h-8 bg-gray-400 rounded-md"></div>
          <div>
            <p className="text-sm font-medium">HR Admin</p>
            <p className="text-xs text-gray-500">Staff</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-white p-8">
        <Outlet /> 
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, to, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition 
        ${isActive ? "bg-white shadow font-medium text-black" : "text-gray-700 hover:bg-gray-200"}`
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}