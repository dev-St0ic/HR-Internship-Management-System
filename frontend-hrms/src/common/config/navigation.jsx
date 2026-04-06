import {
  LayoutDashboard,
  User2,
  ClipboardList,
  CalendarCheck,
  FileText,
  NotebookPen,
  Settings,
} from "lucide-react";

export const navigation = {
  hradmin: [],
  hrstaff: [],
  supervisor: [],
  intern: [
    {
      to: "/intern",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      end: true,
    },
    { to: "/intern/profile", label: "Profile", icon: <User2 size={18} /> },
    { to: "/intern/tasks", label: "Tasks", icon: <ClipboardList size={18} /> },
    {
      to: "/intern/attendance",
      label: "Attendance",
      icon: <CalendarCheck size={18} />,
    },
    {
      to: "/intern/documents",
      label: "Documents",
      icon: <FileText size={18} />,
    },
    {
      to: "/intern/evaluation",
      label: "Evaluation",
      icon: <NotebookPen size={18} />,
    },
    { to: "/intern/settings", label: "Settings", icon: <Settings size={18} /> },
  ],
};
