import { CalendarCheck2, FileText, GitCompare, LayoutDashboard, Settings, Users } from 'lucide-react';

export const hrStaffNavigation = [
  { to: '/hr-staff', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
  { to: '/hr-staff/recruitment', label: 'Recruitment', icon: <Users size={18} /> },
  { to: '/hr-staff/intern-management', label: 'Intern Management', icon: <GitCompare size={18} /> },
  { to: '/hr-staff/staffmanagment', label: 'Staff Management', icon: <CalendarCheck2 size={18} /> },
  { to: '/hr-staff/documentvault', label: 'Document Vault', icon: <FileText size={18} /> },
  { to: '/hr-staff/settings', label: 'Settings', icon: <Settings size={18} /> },
];