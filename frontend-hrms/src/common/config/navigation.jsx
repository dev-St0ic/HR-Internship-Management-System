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
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: "/hr-admin/recruitment",
      label: "Recruitment",
      icon: Users,
    },
    {
      to: "/hr-admin/intern-management",
      label: "Intern Management",
      icon: GitCompare,
    },
    {
      to: "/hr-admin/staff-management",
      label: "Staff Management",
      icon: CalendarCheck2,
    },
    {
      to: "/hr-admin/document-vault",
      label: "Document Vault",
      icon: FileText,
    },
    {
      to: "/hr-admin/reports",
      label: "Reports & Analytics",
      icon: FolderGit2,
    },
    {
      to: "/hr-admin/system-logs",
      label: "System Logs",
      icon: ScrollText,
    },
    {
      to: "/hr-admin/settings",
      label: "Settings",
      icon: Settings,
    },
  ],

  hrstaff: [
    {
      to: "/hr-staff",
      label: "Dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: "/hr-staff/recruitment",
      label: "Recruitment",
      icon: Users,
    },
    {
      to: "/hr-staff/operations",
      label: "Operations",
      icon: GitCompare,
    },
    {
      to: "/hr-staff/staff-management",
      label: "Staff Management",
      icon: CalendarCheck2,
    },
    {
      to: "/hr-staff/document-vault",
      label: "Document Vault",
      icon: FileText,
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
      to: "/supervisor/documents",
      label: "Documents",
      icon: ScrollText,
    },
    {
      to: "/supervisor/evaluations",
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