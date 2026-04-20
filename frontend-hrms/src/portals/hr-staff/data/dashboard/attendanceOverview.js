import { ATTENDANCE_WORKFLOW_ORDER } from './constants';
import { createKey, toPercent } from './shared';
import { createMonthlyAttendanceStats } from './attendanceBuckets';

export function createAttendanceOverview(interns, attendanceRequests) {
  const departmentRequestCounts = {};
  const issueCounts = {};

  attendanceRequests.forEach((request) => {
    issueCounts[request.issueType] = (issueCounts[request.issueType] ?? 0) + 1;
    departmentRequestCounts[request.department] = (departmentRequestCounts[request.department] ?? 0) + 1;
  });

  const { monthlyBreakdown, attendanceStatusTotals } = createMonthlyAttendanceStats(interns);
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
  const busiestDepartment = Object.entries(departmentRequestCounts).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))[0]?.[0] ?? '';
  const issueMix = Object.entries(issueCounts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 4)
    .map(([label, count]) => ({ key: createKey(label), label, count, share: toPercent(count, totalRequests) }));

  return {
    headline: totalLoggedEntries > 0 ? `${onTimeRate}% of logged attendance entries landed on time across ${monthlyBreakdown.length} tracked monthly DTR snapshots.` : 'Attendance data will appear here once monthly DTR snapshots are available.',
    supportingText: pendingReviewCount > 0 ? `${pendingReviewCount} attendance requests still need review${busiestDepartment ? `, with the heaviest request volume in ${busiestDepartment}` : ''}.` : 'No attendance requests are waiting for review right now.',
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