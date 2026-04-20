import { actionIconMap, hrStaffInternManagementOperationIconMap, hrStaffRecruitmentTabIconMap, hrStaffSidebarIconMap } from '../../../../common/config/appIconRegistry';

export const statIconMap = {
  interns: hrStaffSidebarIconMap['intern-management'].selected,
  approval: hrStaffRecruitmentTabIconMap['for-admin-approval'].selected,
  attendance: hrStaffInternManagementOperationIconMap['attendance-requests'].selected,
  vault: hrStaffSidebarIconMap['document-vault'].selected,
};

export const queueIconMap = { requirements: actionIconMap.filter, attendance: actionIconMap.attendance, evaluation: actionIconMap.edit, vault: actionIconMap.download };
export const quickActionMetaMap = { recruitment: 'Applications and approvals', 'intern-management': 'Attendance and intern status', 'document-vault': 'Validation and file review', 'staff-management': 'Department coverage' };
export const queueMetaMap = { requirements: 'Onboarding gaps', attendance: 'Attendance exceptions', evaluation: 'Evaluation follow-up', vault: 'Files awaiting validation' };

export const quickActionConfigs = [
  { key: 'recruitment', title: 'Review applications', description: 'Open the recruitment workspace and route ready profiles to the admin approval lane.', to: '/hr-staff/recruitment?tab=applications&scroll=workspace', icon: hrStaffRecruitmentTabIconMap.applications.selected },
  { key: 'intern-management', title: 'Manage intern records', description: 'Check attendance exceptions, onboarding requirements, and internship status in one place.', to: '/hr-staff/intern-management?tab=interns', icon: hrStaffSidebarIconMap['intern-management'].selected },
  { key: 'document-vault', title: 'Validate documents', description: 'Review MOA, NDA, COA, and endorsement files that still need HR validation.', to: '/hr-staff/document-vault?section=all', icon: hrStaffSidebarIconMap['document-vault'].selected },
  { key: 'staff-management', title: 'Check department roster', description: 'Inspect department ownership, staff capacity, and intern distribution across the portal.', to: '/hr-staff/staff-management?scroll=top', icon: hrStaffSidebarIconMap['staff-management'].selected },
];