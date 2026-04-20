import { BellRing, LockKeyhole, LogOut, User } from 'lucide-react';

export const navItems = [
  { label: 'Dashboard', to: '/hr-staff', end: true, iconKey: 'dashboard' },
  { label: 'Recruitment', to: '/hr-staff/recruitment', iconKey: 'recruitment' },
  { label: 'Intern Management', to: '/hr-staff/intern-management', iconKey: 'intern-management' },
  { label: 'Staff Management', to: '/hr-staff/staff-management', iconKey: 'staff-management' },
  { label: 'Document Vault', to: '/hr-staff/document-vault', iconKey: 'document-vault' },
  { label: 'Settings', to: '/hr-staff/settings', iconKey: 'settings' },
];

export const accountMenuItems = [
  { key: 'account', label: 'Account settings', icon: User, action: 'account' },
  { key: 'security', label: 'Security & password', icon: LockKeyhole, action: 'security' },
  { key: 'notifications', label: 'Notification preferences', icon: BellRing, action: 'notifications' },
  { key: 'sign-out', label: 'Sign out', icon: LogOut, action: 'sign-out', isDanger: true },
];