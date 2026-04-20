import { createRecruitmentApplications, createRecruitmentPartnerUniversities } from './recruitmentData';
import { staffManagementDepartments } from './staffManagementData';
import { createAttendanceOverview } from './dashboard/attendanceOverview';
import { ACTIVE_INTERNSHIP_STATUSES } from './dashboard/constants';
import { createDepartmentInsights, createDepartmentMap, createDepartmentSummaries } from './dashboard/departments';
import { createRecentActivity } from './dashboard/recentActivity';
import { createSummarySections } from './dashboard/summarySections';

function createGreeting(user = {}) {
  const hour = new Date().getHours();
  const salutation = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const preferredName = user.firstName || user.name || 'HR Staff';

  return `${salutation}, ${preferredName}`;
}

export function createHrStaffDashboardSummary({
  user = {},
  departments = staffManagementDepartments,
  interns = [],
  attendanceRequests = [],
  vaultRecords = [],
  applications: providedApplications = null,
} = {}) {
  const applications = providedApplications ?? createRecruitmentApplications(interns, vaultRecords);
  const partnerUniversities = createRecruitmentPartnerUniversities(applications);
  const employeeCount = departments.reduce((total, department) => total + department.employees.length, 0);
  const totalRequiredHours = interns.reduce((total, intern) => total + intern.requiredHours, 0);
  const totalRenderedHours = interns.reduce((total, intern) => total + intern.renderedHours, 0);
  const averageCompletionRate = totalRequiredHours === 0 ? 0 : Math.round((totalRenderedHours / totalRequiredHours) * 100);
  const activeInternCount = interns.filter((intern) => ACTIVE_INTERNSHIP_STATUSES.has(intern.internshipStatus)).length;
  const probationaryInternCount = interns.filter((intern) => intern.internshipStatus === 'Probation').length;
  const pendingAttendanceCount = attendanceRequests.filter((request) => request.workflowStatus === 'Pending').length;
  const approvedAttendanceCount = attendanceRequests.filter((request) => request.workflowStatus === 'Approved').length;
  const approvalQueueCount = applications.filter((application) => application.stage === 'for-admin-approval').length;
  const applicationStageCount = applications.filter((application) => application.stage === 'applications').length;
  const missingRequirementsInterns = interns.filter((intern) => intern.documentStatus !== 'Complete');
  const evaluationFollowUpInterns = interns.filter((intern) => intern.evaluationStatus !== 'Completed');
  const vaultForReviewCount = vaultRecords.filter((record) => record.status === 'For Review').length;
  const vaultPendingCount = vaultRecords.filter((record) => record.status === 'Pending').length;
  const vaultRecordsForAttention = vaultRecords.filter((record) => record.status !== 'Verified');
  const departmentSummaries = createDepartmentSummaries(departments, interns, attendanceRequests);
  const departmentMap = createDepartmentMap(departmentSummaries);
  const summarySections = createSummarySections({
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
  });

  return {
    greeting: createGreeting(user),
    overviewText: `${activeInternCount} active placements are distributed across ${departments.length} departments, with ${pendingAttendanceCount} attendance requests pending review, ${approvalQueueCount} profiles in the admin approval lane, and ${vaultRecordsForAttention.length} vault records still requiring HR action.`,
    ...summarySections,
    attendanceOverview: createAttendanceOverview(interns, attendanceRequests),
    departmentSummaries,
    departmentMap,
    departmentInsights: createDepartmentInsights(departmentMap),
    partnerUniversityCount: partnerUniversities.length,
    partnerUniversities: partnerUniversities.slice(0, 4),
    recentActivity: createRecentActivity(applications, attendanceRequests, vaultRecords),
  };
}