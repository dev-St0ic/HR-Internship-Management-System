export const INTERN_MANAGEMENT_PAGE_SIZE = 6;

export const internManagementOperationTabs = [
  { key: 'interns', label: 'Interns' },
  { key: 'attendance-requests', label: 'Attendance Request' },
];

export const internManagementSectionTabs = [
  { key: 'profile', label: 'Profile' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'evaluation', label: 'Evaluation' },
];

export const internManagementProfileTabs = [
  { key: 'personal-information', label: 'Personal Information' },
  { key: 'documents', label: 'Documents' },
];

export const attendanceRequestStatusOptions = ['Absent', 'On Time', 'Late', 'Excused'];
export const internshipStatusOptions = ['Onboarding', 'Active', 'Probation', 'Completed', 'On Hold'];
export const evaluationStatusOptions = ['Completed', 'In Progress', 'Not Started'];
export const evaluationCriteriaLabels = ['Work Quality', 'Communication', 'Initiative', 'Attendance', 'Professionalism'];

export const roleTracks = {
  Finance: 'Finance Operations',
  'Human Resources': 'People Operations',
  Engineering: 'Software Engineering',
  Marketing: 'Marketing Operations',
  Operations: 'Business Operations',
};