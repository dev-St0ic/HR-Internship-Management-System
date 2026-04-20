import { CalendarCheck, ClipboardList, FileText, LayoutDashboard, NotebookPen, Settings, User2 } from 'lucide-react';

export const internNavigation = [
  { to: '/intern', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/intern/profile', label: 'Profile', icon: User2 },
  { to: '/intern/tasks', label: 'Tasks', icon: ClipboardList },
  { to: '/intern/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/intern/documents', label: 'Documents', icon: FileText },
  { to: '/intern/evaluation', label: 'Evaluation', icon: NotebookPen },
  { to: '/intern/settings', label: 'Settings', icon: Settings },
];