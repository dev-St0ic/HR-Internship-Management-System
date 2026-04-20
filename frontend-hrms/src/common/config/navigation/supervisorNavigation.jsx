import { BriefcaseBusiness, CalendarCheck, ClipboardList, LayoutDashboard, Settings, Users } from 'lucide-react';

export const supervisorNavigation = [
  { to: '/supervisor', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
  { to: '/supervisor/myinterns', label: 'My Interns', icon: <Users size={18} /> },
  { to: '/supervisor/attendance', label: 'Attendance', icon: <CalendarCheck size={18} /> },
  { to: '/supervisor/tasks', label: 'Tasks', icon: <ClipboardList size={18} /> },
  { to: '/supervisor/evaluation', label: 'Evaluation', icon: <BriefcaseBusiness size={18} /> },
  { to: '/supervisor/settings', label: 'Settings', icon: <Settings size={18} /> },
];