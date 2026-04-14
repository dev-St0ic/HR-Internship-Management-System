import { Outlet } from "react-router-dom";
import Sidebar from '../../../common/components/layout/sidebar';
import {
  LayoutDashboard,
  User2,
  ClipboardList,
  CalendarCheck,
  FileText,
  NotebookPen,
  Settings,
  Bell,
} from "lucide-react";

const links = [
  { to: '/intern', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/intern/profile', label: 'Profile', icon: User2 },
  { to: '/intern/tasks', label: 'Tasks', icon: ClipboardList },
  { to: '/intern/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/intern/documents', label: 'Documents', icon: FileText },
  { to: '/intern/evaluation', label: 'Evaluation', icon: NotebookPen },
  { to: '/intern/settings', label: 'Settings', icon: Settings },
  { to: '/intern/notifications', label: 'Notifications', icon: Bell },
];

export default function InternLayout() {
  return (
    <div className="flex">
      <Sidebar links={links} />
      <div className="flex-1 ml-60 p-6">
        <Outlet />
      </div>
    </div>
  );
}
