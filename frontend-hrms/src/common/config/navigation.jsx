import {
  LayoutDashboard,
  User2,
  ClipboardList,
  CalendarCheck,
  FileText,
  NotebookPen,
  Settings,
  Users,
  BriefcaseBusiness,
  GitCompare,
  CalendarCheck2,
  FolderGit2,
  ScrollText,
} from "lucide-react";

export const navigation = {
  hradmin: [
    {
      to: "/hr-admin",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      end: true,
    },
    {
      to: "/hr-admin/recruitment",
      label: "Recruitment",
      icon: <Users size={18} />,
    },
    {
      to: "/hr-admin/internmanagement",
      label: "Intern Management",
      icon: <GitCompare size={18} />,
    },
    {
      to: "/hr-admin/staffmanagement",
      label: "Staff Management",
      icon: <CalendarCheck2 size={18} />,
    },
    {
      to: "/hr-admin/documnetvault",
      label: "Document Vault",
      icon: <FileText size={18} />,
    },
    {
      to: "/hr-admin/reportsandanalytics",
      label: "Reports & Analytics",
      icon: <FolderGit2 size={18} />,
    },
    {
      to: "/hr-admin/systemlogs",
      label: "System Logs",
      icon: <ScrollText size={18} />,
    },
    {
      to: "/hr-admin/settings",
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ],

  hrstaff: [
    {
      to: "/hr-staff",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      end: true,
    },
    {
      to: "/hr-staff/recruitment",
      label: "Recruitment",
      icon: <Users size={18} />,
    },
    {
      to: "/hr-staff/operations",
      label: "Operations",
      icon: <GitCompare size={18} />,
    },
    {
      to: "/hr-staff/staffmanagment",
      label: "Staff Management",
      icon: <CalendarCheck2 size={18} />,
    },
    {
      to: "/hr-staff/documentvault",
      label: "Document Vault",
      icon: <FileText size={18} />,
    },
    {
      to: "/hr-staff/settings",
      label: "Settings",
      icon: <Settings size={18} />,
    },
  ],

 supervisor: [
    {
      to: "/supervisor",
      label: "Dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: "/supervisor/myinterns",
      label: "My Interns",
      icon: Users,
    },
    {
      to: "/supervisor/attendance",
      label: "Attendance",
      icon: CalendarCheck,
    },
    {
      to: "/supervisor/tasks",
      label: "Tasks",
      icon: ClipboardList,
    },
    {
      to: "/supervisor/evaluation",
      label: "Evaluation",
      icon: BriefcaseBusiness,
    },
    {
      to: "/supervisor/settings",
      label: "Settings",
      icon: Settings,
    },
  ],

  intern: [
    {
      to: "/intern",
      label: "Dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    { to: "/intern/profile", label: "Profile", icon: User2 },
    { to: "/intern/tasks", label: "Tasks", icon: ClipboardList },
    {
      to: "/intern/attendance",
      label: "Attendance",
      icon: CalendarCheck,
    },
    {
      to: "/intern/documents",
      label: "Documents",
      icon: FileText,
    },
    {
      to: "/intern/evaluation",
      label: "Evaluation",
      icon: NotebookPen,
    },
    { to: "/intern/settings", label: "Settings", icon: Settings },
  ],
};
