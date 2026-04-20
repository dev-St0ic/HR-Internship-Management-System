import { BellRing, LockKeyhole, SlidersHorizontal, User } from 'lucide-react';

export const SETTINGS_STORAGE_KEY = 'hrms.hrStaff.settings.v1';
export const STORE_SCHEMA_VERSION = 1;
export const legacyTabMap = { profile: 'account', general: 'workspace' };
export const settingsTabs = [
  { key: 'account', label: 'Account', icon: User, description: 'Manage your staff identity, contact details, and account profile information.' },
  { key: 'security', label: 'Security', icon: LockKeyhole, description: 'Control password updates, sign-in protection, and access confirmation rules.' },
  { key: 'notifications', label: 'Notifications', icon: BellRing, description: 'Decide which workflows alert you and how those alerts are delivered.' },
  { key: 'workspace', label: 'Workspace', icon: SlidersHorizontal, description: 'Set the defaults used across recruitment, intern management, and document review pages.' },
];
export const securityToggleSettings = [
  { key: 'twoFactor', title: 'Two-factor Authentication', description: 'Require a second verification step whenever this HR staff account signs in.' },
  { key: 'signInAlerts', title: 'Sign-in Alerts', description: 'Notify the account owner when a new device or browser signs in.' },
  { key: 'approvalConfirmation', title: 'Sensitive Action Confirmation', description: 'Prompt for extra confirmation before approving, rejecting, or archiving records.' },
];
export const workflowNotificationSettings = [
  { key: 'recruitmentFeed', title: 'Recruitment Feed Updates', description: 'Receive alerts when new candidates enter the review pipeline.' },
  { key: 'applicationReviews', title: 'Application Reviews', description: 'Flag applications that need screening, validation, or supervisor coordination.' },
  { key: 'documentReviews', title: 'Document Review Queue', description: 'Notify you when uploaded files need review or follow-up.' },
  { key: 'attendanceRequests', title: 'Attendance Requests', description: 'Alert you when attendance disputes or requests require HR action.' },
  { key: 'staffUpdates', title: 'Staff Directory Updates', description: 'Show changes related to employee records, assignments, and staffing adjustments.' },
];
export const channelNotificationSettings = [
  { key: 'desktop', title: 'Desktop Alerts', description: 'Show browser notifications while the HR staff portal is open.' },
  { key: 'mobilePush', title: 'Mobile Push Notifications', description: 'Send push updates for urgent approvals and queue changes.' },
  { key: 'emailDigest', title: 'Email Digest', description: 'Bundle updates into your registered work email instead of sending them one by one.' },
  { key: 'weeklySummary', title: 'Weekly Summary', description: 'Receive an end-of-week summary covering pending work and completed actions.' },
];
export const workspaceToggleSettings = [
  { key: 'compactTables', title: 'Compact Tables', description: 'Show denser rows in document, recruitment, and intern review tables.' },
  { key: 'reduceMotion', title: 'Reduce Motion', description: 'Tone down page motion and animated transitions across the portal.' },
  { key: 'rememberFilters', title: 'Remember Last-used Filters', description: 'Restore your most recent filters when reopening HR workspaces.' },
];