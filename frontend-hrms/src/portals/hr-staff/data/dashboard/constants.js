export const ACTIVE_INTERNSHIP_STATUSES = new Set(['Onboarding', 'Active', 'Probation']);
export const RECENT_ACTIVITY_LIMIT = 6;
export const PREVIEW_LIMIT = 3;

export const ATTENDANCE_STATUS_META = {
  'On Time': { key: 'on-time', label: 'On time', tone: 'positive' },
  Late: { key: 'late', label: 'Late', tone: 'attention' },
  Excused: { key: 'excused', label: 'Excused', tone: 'accent' },
  Absent: { key: 'absent', label: 'Absent', tone: 'danger' },
};

export const ATTENDANCE_STATUS_ORDER = Object.keys(ATTENDANCE_STATUS_META);

export const ATTENDANCE_WORKFLOW_ORDER = [
  { status: 'Pending', key: 'pending', label: 'Pending review', tone: 'attention' },
  { status: 'Approved', key: 'approved', label: 'Approved', tone: 'positive' },
  { status: 'Rejected', key: 'rejected', label: 'Rejected', tone: 'danger' },
];