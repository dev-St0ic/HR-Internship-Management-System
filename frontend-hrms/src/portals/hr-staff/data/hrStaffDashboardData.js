import { createRecruitmentApplications, createRecruitmentPartnerUniversities } from './recruitmentData';
import { staffManagementDepartments } from './staffManagementData';

const ACTIVE_INTERNSHIP_STATUSES = new Set(['Onboarding', 'Active', 'Probation']);
const RECENT_ACTIVITY_LIMIT = 6;
const PREVIEW_LIMIT = 3;
const ATTENDANCE_STATUS_META = {
  'On Time': { key: 'on-time', label: 'On time', tone: 'positive' },
  Late: { key: 'late', label: 'Late', tone: 'attention' },
  Excused: { key: 'excused', label: 'Excused', tone: 'accent' },
  Absent: { key: 'absent', label: 'Absent', tone: 'danger' },
};
const ATTENDANCE_STATUS_ORDER = Object.keys(ATTENDANCE_STATUS_META);
const ATTENDANCE_WORKFLOW_ORDER = [
  { status: 'Pending', key: 'pending', label: 'Pending review', tone: 'attention' },
  { status: 'Approved', key: 'approved', label: 'Approved', tone: 'positive' },
  { status: 'Rejected', key: 'rejected', label: 'Rejected', tone: 'danger' },
];

function createGreeting(user = {}) {
  const hour = new Date().getHours();
  const salutation = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const preferredName = user.firstName || user.name || 'HR Staff';

  return `${salutation}, ${preferredName}`;
}

  function createDashboardRoute(path, params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.set(key, value.join(','));
        }

        return;
      }

      if (value) {
        searchParams.set(key, value);
      }
    });

    const query = searchParams.toString();

    return query ? `${path}?${query}` : path;
  }

function uniqueValues(values = []) {
  return Array.from(new Set(values.filter(Boolean)));
}

function createKey(value = '') {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toPercent(value, total) {
  if (total === 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

function formatPreview(values, limit = PREVIEW_LIMIT) {
  const unique = uniqueValues(values);

  if (unique.length === 0) {
    return '';
  }

  if (unique.length <= limit) {
    return unique.join(', ');
  }

  return `${unique.slice(0, limit).join(', ')} +${unique.length - limit} more`;
}

function sortByNewest(left, right) {
  return new Date(right.timestamp) - new Date(left.timestamp);
}

function createDepartmentNote(department) {
  const followUps = [];

  if (department.pendingAttendanceCount > 0) {
    followUps.push(`${department.pendingAttendanceCount} attendance`);
  }

  if (department.missingRequirementsCount > 0) {
    followUps.push(`${department.missingRequirementsCount} onboarding`);
  }

  if (followUps.length === 0) {
    return 'No active follow-ups are open for this department.';
  }

  return `${followUps.join(' and ')} follow-up items need attention.`;
}

function createDepartmentSummaries(departments, interns, attendanceRequests) {
  return departments
    .map((department) => {
      const departmentInterns = interns.filter((intern) => intern.department === department.name);
      const departmentRequests = attendanceRequests.filter((request) => request.department === department.name);
      const totalRequiredHours = departmentInterns.reduce((total, intern) => total + intern.requiredHours, 0);
      const totalRenderedHours = departmentInterns.reduce((total, intern) => total + intern.renderedHours, 0);
      const activeInternCount = departmentInterns.filter((intern) => ACTIVE_INTERNSHIP_STATUSES.has(intern.internshipStatus)).length;
      const pendingAttendanceCount = departmentRequests.filter((request) => request.workflowStatus === 'Pending').length;
      const missingRequirementsCount = departmentInterns.filter((intern) => intern.documentStatus !== 'Complete').length;

      return {
        id: department.id,
        name: department.name,
        employeeCount: department.employees.length,
        internCount: departmentInterns.length,
        activeInternCount,
        pendingAttendanceCount,
        missingRequirementsCount,
        completionRate: totalRequiredHours === 0 ? 0 : Math.round((totalRenderedHours / totalRequiredHours) * 100),
        workModes: uniqueValues(department.employees.map((employee) => employee.type)),
      };
    })
    .sort((left, right) => {
      if (right.internCount !== left.internCount) {
        return right.internCount - left.internCount;
      }

      return left.name.localeCompare(right.name);
    });
}

function createAttendanceOverview(interns, attendanceRequests) {
  const monthlyBuckets = new Map();
  const departmentRequestCounts = {};
  const issueCounts = {};

  interns.forEach((intern) => {
    (intern.attendanceMonths ?? []).forEach((month, monthIndex) => {
      const monthKey = `${monthIndex}-${month.label}`;
      const currentBucket = monthlyBuckets.get(monthKey) ?? {
        key: createKey(month.label),
        label: month.label,
        monthIndex,
        totalEntries: 0,
        remainingHoursTotal: 0,
        internCount: 0,
        statusCounts: ATTENDANCE_STATUS_ORDER.reduce((counts, status) => {
          counts[status] = 0;
          return counts;
        }, {}),
      };

      currentBucket.internCount += 1;
      currentBucket.remainingHoursTotal += Number(month.remainingHours) || 0;

      (month.entries ?? []).forEach((entry) => {
        const normalizedStatus = ATTENDANCE_STATUS_META[entry.status] ? entry.status : 'On Time';
        currentBucket.statusCounts[normalizedStatus] += 1;
        currentBucket.totalEntries += 1;
      });

      monthlyBuckets.set(monthKey, currentBucket);
    });
  });

  attendanceRequests.forEach((request) => {
    issueCounts[request.issueType] = (issueCounts[request.issueType] ?? 0) + 1;
    departmentRequestCounts[request.department] = (departmentRequestCounts[request.department] ?? 0) + 1;
  });

  const attendanceStatusTotals = ATTENDANCE_STATUS_ORDER.reduce((counts, status) => {
    counts[status] = 0;
    return counts;
  }, {});

  monthlyBuckets.forEach((month) => {
    ATTENDANCE_STATUS_ORDER.forEach((status) => {
      attendanceStatusTotals[status] += month.statusCounts[status];
    });
  });

  const monthlyBreakdown = Array.from(monthlyBuckets.values())
    .sort((left, right) => left.monthIndex - right.monthIndex)
    .map((month) => {
      const lateCount = month.statusCounts.Late;
      const excusedCount = month.statusCounts.Excused;
      const absentCount = month.statusCounts.Absent;

      return {
        key: month.key,
        label: month.label,
        totalEntries: month.totalEntries,
        onTimeRate: toPercent(month.statusCounts['On Time'], month.totalEntries),
        averageRemainingHours: month.internCount === 0 ? 0 : Math.round(month.remainingHoursTotal / month.internCount),
        statusSummary: [
          lateCount > 0 ? `${lateCount} late` : null,
          excusedCount > 0 ? `${excusedCount} excused` : null,
          absentCount > 0 ? `${absentCount} absent` : null,
        ].filter(Boolean).join(' • ') || 'No exception logs recorded.',
        segments: ATTENDANCE_STATUS_ORDER
          .filter((status) => month.statusCounts[status] > 0)
          .map((status) => ({
            ...ATTENDANCE_STATUS_META[status],
            count: month.statusCounts[status],
            share: toPercent(month.statusCounts[status], month.totalEntries),
          })),
      };
    });

  const totalLoggedEntries = monthlyBreakdown.reduce((total, month) => total + month.totalEntries, 0);
  const totalOnTimeCount = attendanceStatusTotals['On Time'];
  const totalLateCount = attendanceStatusTotals.Late;
  const onTimeRate = toPercent(totalOnTimeCount, totalLoggedEntries);
  const workflowCounts = ATTENDANCE_WORKFLOW_ORDER.map((item) => ({
    ...item,
    count: attendanceRequests.filter((request) => request.workflowStatus === item.status).length,
  }));
  const pendingReviewCount = workflowCounts.find((item) => item.status === 'Pending')?.count ?? 0;
  const approvedCount = workflowCounts.find((item) => item.status === 'Approved')?.count ?? 0;
  const rejectedCount = workflowCounts.find((item) => item.status === 'Rejected')?.count ?? 0;
  const totalRequests = attendanceRequests.length;
  const busiestDepartment = Object.entries(departmentRequestCounts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))[0]?.[0] ?? '';
  const issueMix = Object.entries(issueCounts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 4)
    .map(([label, count]) => ({
      key: createKey(label),
      label,
      count,
      share: toPercent(count, totalRequests),
    }));

  return {
    headline: totalLoggedEntries > 0
      ? `${onTimeRate}% of logged attendance entries landed on time across ${monthlyBreakdown.length} tracked monthly DTR snapshots.`
      : 'Attendance data will appear here once monthly DTR snapshots are available.',
    supportingText: pendingReviewCount > 0
      ? `${pendingReviewCount} attendance requests still need review${busiestDepartment ? `, with the heaviest request volume in ${busiestDepartment}` : ''}.`
      : 'No attendance requests are waiting for review right now.',
    metricTiles: [
      {
        key: 'logged-entries',
        label: 'Logged entries',
        value: totalLoggedEntries,
        description: `${monthlyBreakdown.length} monthly DTR snapshots are currently surfaced from intern attendance records.`,
      },
      {
        key: 'on-time-rate',
        label: 'On-time rate',
        value: `${onTimeRate}%`,
        description: `${totalOnTimeCount} on-time logs versus ${totalLateCount} late check-ins across all tracked entries.`,
      },
      {
        key: 'exceptions',
        label: 'Filed exceptions',
        value: totalRequests,
        description: `${pendingReviewCount} pending review and ${approvedCount + rejectedCount} already resolved by HR staff.`,
      },
      {
        key: 'resolved',
        label: 'Resolved requests',
        value: approvedCount + rejectedCount,
        description: `${approvedCount} approved and ${rejectedCount} rejected attendance requests are already closed out.`,
      },
    ],
    monthlyBreakdown,
    workflowCounts,
    issueMix,
  };
}

function createDepartmentMap(departmentSummaries) {
  const totalInternCount = departmentSummaries.reduce((total, department) => total + department.internCount, 0);

  return departmentSummaries.map((department, index) => {
    const attentionCount = department.pendingAttendanceCount + department.missingRequirementsCount;
    const activeRate = toPercent(department.activeInternCount, department.internCount);
    let toneKey = 'accent';
    let toneLabel = 'Active ramp-up';

    if (attentionCount >= 5) {
      toneKey = 'attention';
      toneLabel = 'Needs follow-up';
    } else if (department.completionRate >= 55 && department.pendingAttendanceCount <= 2) {
      toneKey = 'positive';
      toneLabel = 'Balanced load';
    }

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

function createDepartmentInsights(departmentMap) {
  if (departmentMap.length === 0) {
    return [];
  }

  const peakLoadDepartment = [...departmentMap]
    .sort((left, right) => right.internCount - left.internCount || left.name.localeCompare(right.name))[0];
  const watchlistDepartment = [...departmentMap]
    .sort((left, right) => right.attentionCount - left.attentionCount || left.name.localeCompare(right.name))[0];
  const strongestProgressDepartment = [...departmentMap]
    .sort((left, right) => right.completionRate - left.completionRate || left.name.localeCompare(right.name))[0];

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
      detail: watchlistDepartment.attentionCount > 0
        ? `${watchlistDepartment.attentionCount} open attendance or onboarding follow-ups need attention.`
        : 'No departments currently need immediate coverage intervention.',
    },
    {
      key: 'strongest-progress',
      label: 'Strongest progress',
      value: strongestProgressDepartment.name,
      detail: `${strongestProgressDepartment.completionRate}% average completion with ${strongestProgressDepartment.activeRate}% active placements.`,
    },
  ];
}

function createRecentActivity(applications, attendanceRequests, vaultRecords) {
  const recruitmentActivity = applications.map((application) => ({
    id: `application-${application.id}`,
    categoryKey: 'recruitment',
    category: 'Recruitment',
    title: `Application received from ${application.name}`,
    description: `${application.university} • ${application.department} • ${application.stageLabel}`,
    timestamp: application.submittedAt,
      to: createDashboardRoute('/hr-staff/recruitment', {
        tab: application.stage,
        q: application.name,
      }),
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
      to: createDashboardRoute('/hr-staff/document-vault', {
        section: record.sectionKey,
        q: record.fileName,
        status: record.status,
      }),
  }));

  return [...recruitmentActivity, ...attendanceActivity, ...vaultActivity]
    .sort(sortByNewest)
    .slice(0, RECENT_ACTIVITY_LIMIT);
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

  return {
    greeting: createGreeting(user),
    overviewText: `${activeInternCount} active placements are distributed across ${departments.length} departments, with ${pendingAttendanceCount} attendance requests pending review, ${approvalQueueCount} profiles in the admin approval lane, and ${vaultRecordsForAttention.length} vault records still requiring HR action.`,
    overviewMetrics: [
      { key: 'departments', label: 'Departments', value: departments.length },
      { key: 'supervisors', label: 'Supervisors', value: employeeCount },
      { key: 'completion', label: 'Avg. completion', value: `${averageCompletionRate}%` },
    ],
    stats: [
      {
        key: 'interns',
        title: 'Tracked interns',
        value: interns.length,
        description: `${activeInternCount} active placements and ${probationaryInternCount} probationary interns`,
      },
      {
        key: 'approval',
        title: 'Admin approval queue',
        value: approvalQueueCount,
        description: `${applicationStageCount} applications still moving through initial HR review`,
      },
      {
        key: 'attendance',
        title: 'Pending attendance review',
        value: pendingAttendanceCount,
        description: `${approvedAttendanceCount} attendance requests have already been resolved`,
      },
      {
        key: 'vault',
        title: 'Vault items needing action',
        value: vaultRecordsForAttention.length,
        description: `${vaultForReviewCount} for review and ${vaultPendingCount} still pending validation`,
      },
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
        description: missingRequirementsInterns.length > 0
          ? formatPreview(missingRequirementsInterns.map((intern) => intern.name))
          : 'All tracked interns have complete onboarding files.',
          to: createDashboardRoute('/hr-staff/intern-management', {
            tab: 'interns',
            documentStatus: 'Missing Requirements',
          }),
      },
      {
        key: 'attendance',
        title: 'Attendance review',
        count: pendingAttendanceCount,
        description: pendingAttendanceCount > 0
          ? formatPreview(attendanceRequests.filter((request) => request.workflowStatus === 'Pending').map((request) => request.internName))
          : 'No attendance exceptions are waiting for review.',
          to: createDashboardRoute('/hr-staff/intern-management', {
            tab: 'attendance-requests',
            workflowStatus: 'Pending',
          }),
      },
      {
        key: 'evaluation',
        title: 'Evaluation follow-up',
        count: evaluationFollowUpInterns.length,
        description: evaluationFollowUpInterns.length > 0
          ? formatPreview(evaluationFollowUpInterns.map((intern) => intern.name))
          : 'All evaluation records are completed.',
          to: createDashboardRoute('/hr-staff/intern-management', {
            tab: 'interns',
            evaluationStatus: ['In Progress', 'Not Started'],
          }),
      },
      {
        key: 'vault',
        title: 'Vault validation',
        count: vaultRecordsForAttention.length,
        description: vaultRecordsForAttention.length > 0
          ? formatPreview(vaultRecordsForAttention.map((record) => record.internName))
          : 'Every tracked document is currently verified.',
          to: createDashboardRoute('/hr-staff/document-vault', {
            section: 'all',
            status: ['Pending', 'For Review'],
          }),
      },
    ],
    attendanceOverview: createAttendanceOverview(interns, attendanceRequests),
    departmentSummaries,
    departmentMap,
    departmentInsights: createDepartmentInsights(departmentMap),
    partnerUniversityCount: partnerUniversities.length,
    partnerUniversities: partnerUniversities.slice(0, 4),
    recentActivity: createRecentActivity(applications, attendanceRequests, vaultRecords),
  };
}