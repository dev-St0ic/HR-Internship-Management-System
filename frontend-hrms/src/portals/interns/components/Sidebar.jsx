import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User2,
  ClipboardList,
  CalendarCheck,
  FileText,
  NotebookPen,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-100 p-4 flex flex-col justify-between">
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
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            to="/intern"
            end
          />
          <SidebarItem
            icon={<User2 size={18} />}
            label="Profile"
            to="/intern/profile"
          />
          <SidebarItem
            icon={<ClipboardList size={18} />}
            label="Tasks"
            to="/intern/tasks"
          />
          <SidebarItem
            icon={<CalendarCheck size={18} />}
            label="Attendance"
            to="/intern/attendance"
          />
          <SidebarItem
            icon={<FileText size={18} />}
            label="Documents"
            to="/intern/documents"
          />
          <SidebarItem
            icon={<NotebookPen size={18} />}
            label="Evaluation"
            to="/intern/evaluation"
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            to="/intern/settings"
          />
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center gap-3 p-2 bg-gray-200 rounded-lg">
        <div className="w-8 h-8 bg-gray-400 rounded-md"></div>
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-gray-500">Intern</p>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, to, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition 
        ${isActive ? "bg-white shadow font-medium" : "hover:bg-gray-200"}`
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}
