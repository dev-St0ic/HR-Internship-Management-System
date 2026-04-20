import { CalendarCheck2, FileText, FolderGit2, LayoutDashboard, ScrollText, Settings, Users, GitCompare } from 'lucide-react';

export const hrAdminNavigation = [
  { to: '/hr-admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
  { to: '/hr-admin/recruitment', label: 'Recruitment', icon: <Users size={18} /> },
  { to: '/hr-admin/internmanagement', label: 'Intern Management', icon: <GitCompare size={18} /> },
  { to: '/hr-admin/staffmanagement', label: 'Staff Management', icon: <CalendarCheck2 size={18} /> },
  { to: '/hr-admin/documnetvault', label: 'Document Vault', icon: <FileText size={18} /> },
  { to: '/hr-admin/reportsandanalytics', label: 'Reports & Analytics', icon: <FolderGit2 size={18} /> },
  { to: '/hr-admin/systemlogs', label: 'System Logs', icon: <ScrollText size={18} /> },
  { to: '/hr-admin/settings', label: 'Settings', icon: <Settings size={18} /> },
];