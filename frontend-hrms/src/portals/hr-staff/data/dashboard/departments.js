import { ACTIVE_INTERNSHIP_STATUSES } from './constants';
import { toPercent, uniqueValues } from './shared';

function createDepartmentNote(department) {
  const followUps = [];

  if (department.pendingAttendanceCount > 0) {
    followUps.push(`${department.pendingAttendanceCount} attendance`);
  }

  if (department.missingRequirementsCount > 0) {
    followUps.push(`${department.missingRequirementsCount} onboarding`);
  }

  return followUps.length === 0
    ? 'No active follow-ups are open for this department.'
    : `${followUps.join(' and ')} follow-up items need attention.`;
}

export function createDepartmentSummaries(departments, interns, attendanceRequests) {
  return departments
    .map((department) => {
      const departmentInterns = interns.filter((intern) => intern.department === department.name);
      const departmentRequests = attendanceRequests.filter((request) => request.department === department.name);
      const totalRequiredHours = departmentInterns.reduce((total, intern) => total + intern.requiredHours, 0);
      const totalRenderedHours = departmentInterns.reduce((total, intern) => total + intern.renderedHours, 0);

      return {
        id: department.id,
        name: department.name,
        employeeCount: department.employees.length,
        internCount: departmentInterns.length,
        activeInternCount: departmentInterns.filter((intern) => ACTIVE_INTERNSHIP_STATUSES.has(intern.internshipStatus)).length,
        pendingAttendanceCount: departmentRequests.filter((request) => request.workflowStatus === 'Pending').length,
        missingRequirementsCount: departmentInterns.filter((intern) => intern.documentStatus !== 'Complete').length,
        completionRate: totalRequiredHours === 0 ? 0 : Math.round((totalRenderedHours / totalRequiredHours) * 100),
        workModes: uniqueValues(department.employees.map((employee) => employee.type)),
      };
    })
    .sort((left, right) => right.internCount - left.internCount || left.name.localeCompare(right.name));
}

export function createDepartmentMap(departmentSummaries) {
  const totalInternCount = departmentSummaries.reduce((total, department) => total + department.internCount, 0);

  return departmentSummaries.map((department, index) => {
    const attentionCount = department.pendingAttendanceCount + department.missingRequirementsCount;
    const activeRate = toPercent(department.activeInternCount, department.internCount);
    const isBalancedLoad = department.completionRate >= 55 && department.pendingAttendanceCount <= 2;
    const toneKey = attentionCount >= 5 ? 'attention' : isBalancedLoad ? 'positive' : 'accent';
    const toneLabel = attentionCount >= 5 ? 'Needs follow-up' : isBalancedLoad ? 'Balanced load' : 'Active ramp-up';

    return {
      ...department,
      to: `/hr-staff/staff-management/department/${department.id}`,
      workloadShare: toPercent(department.internCount, totalInternCount),
      activeRate,
      attentionCount,
      toneKey,
      toneLabel,
      emphasis: index === 0 ? 'wide' : 'default',
      note: createDepartmentNote(department),
    };
  });
}

export function createDepartmentInsights(departmentMap) {
  if (departmentMap.length === 0) {
    return [];
  }

  const peakLoadDepartment = [...departmentMap].sort((left, right) => right.internCount - left.internCount || left.name.localeCompare(right.name))[0];
  const watchlistDepartment = [...departmentMap].sort((left, right) => right.attentionCount - left.attentionCount || left.name.localeCompare(right.name))[0];
  const strongestProgressDepartment = [...departmentMap].sort((left, right) => right.completionRate - left.completionRate || left.name.localeCompare(right.name))[0];

  return [
    {
      key: 'peak-load',
      label: 'Peak load',
      value: peakLoadDepartment.name,
      detail: `${peakLoadDepartment.internCount} interns across ${peakLoadDepartment.employeeCount} supervisors.`,
    },
    {
      key: 'watchlist',
      label: 'Watchlist',
      value: watchlistDepartment.attentionCount > 0 ? watchlistDepartment.name : 'All departments',
      detail: watchlistDepartment.attentionCount > 0 ? `${watchlistDepartment.attentionCount} open attendance or onboarding follow-ups need attention.` : 'No departments currently need immediate coverage intervention.',
    },
    {
      key: 'strongest-progress',
      label: 'Strongest progress',
      value: strongestProgressDepartment.name,
      detail: `${strongestProgressDepartment.completionRate}% average completion with ${strongestProgressDepartment.activeRate}% active placements.`,
    },
  ];
}