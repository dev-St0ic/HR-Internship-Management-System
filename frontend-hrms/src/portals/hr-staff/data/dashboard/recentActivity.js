import { RECENT_ACTIVITY_LIMIT } from './constants';
import { createDashboardRoute, sortByNewest } from './shared';

export function createRecentActivity(applications, attendanceRequests, vaultRecords) {
  const recruitmentActivity = applications.map((application) => ({
    id: `application-${application.id}`,
    categoryKey: 'recruitment',
    category: 'Recruitment',
    title: `Application received from ${application.name}`,
    description: `${application.university} • ${application.department} • ${application.stageLabel}`,
    timestamp: application.submittedAt,
    to: createDashboardRoute('/hr-staff/recruitment', { tab: application.stage, q: application.name }),
  }));

  const attendanceActivity = attendanceRequests.map((request) => ({
    id: `attendance-${request.id}`,
    categoryKey: 'intern-management',
    category: 'Intern Management',
    title: `${request.internName} submitted an attendance request`,
    description: `${request.issueType} • ${request.workflowStatus} • ${request.department}`,
    timestamp: request.requestedAt,
    to: createDashboardRoute('/hr-staff/intern-management', {
      tab: 'attendance-requests',
      q: request.internName,
      workflowStatus: request.workflowStatus,
    }),
  }));

  const vaultActivity = vaultRecords.map((record) => ({
    id: `vault-${record.id}`,
    categoryKey: 'document-vault',
    category: 'Document Vault',
    title: `${record.internName} uploaded a ${record.sectionLabel} file`,
    description: `${record.fileName} • ${record.status}`,
    timestamp: record.uploadedAt,
    to: createDashboardRoute('/hr-staff/document-vault', { section: record.sectionKey, q: record.fileName, status: record.status }),
  }));

  return [...recruitmentActivity, ...attendanceActivity, ...vaultActivity]
    .sort(sortByNewest)
    .slice(0, RECENT_ACTIVITY_LIMIT);
}