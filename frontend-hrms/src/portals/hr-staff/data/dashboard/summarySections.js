import { createDashboardRoute, formatPreview } from './shared';

export function createSummarySections({
  departments,
  employeeCount,
  averageCompletionRate,
  interns,
  activeInternCount,
  probationaryInternCount,
  approvalQueueCount,
  applicationStageCount,
  pendingAttendanceCount,
  approvedAttendanceCount,
  missingRequirementsInterns,
  attendanceRequests,
  evaluationFollowUpInterns,
  vaultRecordsForAttention,
  vaultForReviewCount,
  vaultPendingCount,
}) {
  return {
    overviewMetrics: [
      { key: 'departments', label: 'Departments', value: departments.length },
      { key: 'supervisors', label: 'Supervisors', value: employeeCount },
      { key: 'completion', label: 'Avg. completion', value: `${averageCompletionRate}%` },
    ],
    stats: [
      { key: 'interns', title: 'Tracked interns', value: interns.length, description: `${activeInternCount} active placements and ${probationaryInternCount} probationary interns` },
      { key: 'approval', title: 'Admin approval queue', value: approvalQueueCount, description: `${applicationStageCount} applications still moving through initial HR review` },
      { key: 'attendance', title: 'Pending attendance review', value: pendingAttendanceCount, description: `${approvedAttendanceCount} attendance requests have already been resolved` },
      { key: 'vault', title: 'Vault items needing action', value: vaultRecordsForAttention.length, description: `${vaultForReviewCount} for review and ${vaultPendingCount} still pending validation` },
    ],
    quickActionBadges: {
      recruitment: approvalQueueCount > 0 ? `${approvalQueueCount} open` : `${applicationStageCount} review`,
      'intern-management': pendingAttendanceCount > 0 ? `${pendingAttendanceCount} pending` : `${activeInternCount} active`,
      'document-vault': vaultRecordsForAttention.length > 0 ? `${vaultRecordsForAttention.length} open` : 'Verified',
      'staff-management': `${departments.length} depts`,
    },
    queues: [
      {
        key: 'requirements',
        title: 'Missing requirements',
        count: missingRequirementsInterns.length,
        description: missingRequirementsInterns.length > 0 ? formatPreview(missingRequirementsInterns.map((intern) => intern.name)) : 'All tracked interns have complete onboarding files.',
        to: createDashboardRoute('/hr-staff/intern-management', { tab: 'interns', documentStatus: 'Missing Requirements' }),
      },
      {
        key: 'attendance',
        title: 'Attendance review',
        count: pendingAttendanceCount,
        description: pendingAttendanceCount > 0 ? formatPreview(attendanceRequests.filter((request) => request.workflowStatus === 'Pending').map((request) => request.internName)) : 'No attendance exceptions are waiting for review.',
        to: createDashboardRoute('/hr-staff/intern-management', { tab: 'attendance-requests', workflowStatus: 'Pending' }),
      },
      {
        key: 'evaluation',
        title: 'Evaluation follow-up',
        count: evaluationFollowUpInterns.length,
        description: evaluationFollowUpInterns.length > 0 ? formatPreview(evaluationFollowUpInterns.map((intern) => intern.name)) : 'All evaluation records are completed.',
        to: createDashboardRoute('/hr-staff/intern-management', { tab: 'interns', evaluationStatus: ['In Progress', 'Not Started'] }),
      },
      {
        key: 'vault',
        title: 'Vault validation',
        count: vaultRecordsForAttention.length,
        description: vaultRecordsForAttention.length > 0 ? formatPreview(vaultRecordsForAttention.map((record) => record.internName)) : 'Every tracked document is currently verified.',
        to: createDashboardRoute('/hr-staff/document-vault', { section: 'all', status: ['Pending', 'For Review'] }),
      },
    ],
  };
}