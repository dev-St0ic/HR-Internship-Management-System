import { ATTENDANCE_STATUS_META, ATTENDANCE_STATUS_ORDER } from './constants';
import { createKey, toPercent } from './shared';

function createEmptyStatusCounts() {
  return ATTENDANCE_STATUS_ORDER.reduce((counts, status) => ({ ...counts, [status]: 0 }), {});
}

export function createMonthlyAttendanceStats(interns) {
  const monthlyBuckets = new Map();

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
        statusCounts: createEmptyStatusCounts(),
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

  const attendanceStatusTotals = createEmptyStatusCounts();
  monthlyBuckets.forEach((month) => {
    ATTENDANCE_STATUS_ORDER.forEach((status) => {
      attendanceStatusTotals[status] += month.statusCounts[status];
    });
  });

  const monthlyBreakdown = Array.from(monthlyBuckets.values())
    .sort((left, right) => left.monthIndex - right.monthIndex)
    .map((month) => ({
      key: month.key,
      label: month.label,
      totalEntries: month.totalEntries,
      onTimeRate: toPercent(month.statusCounts['On Time'], month.totalEntries),
      averageRemainingHours: month.internCount === 0 ? 0 : Math.round(month.remainingHoursTotal / month.internCount),
      statusSummary: [
        month.statusCounts.Late > 0 ? `${month.statusCounts.Late} late` : null,
        month.statusCounts.Excused > 0 ? `${month.statusCounts.Excused} excused` : null,
        month.statusCounts.Absent > 0 ? `${month.statusCounts.Absent} absent` : null,
      ].filter(Boolean).join(' • ') || 'No exception logs recorded.',
      segments: ATTENDANCE_STATUS_ORDER
        .filter((status) => month.statusCounts[status] > 0)
        .map((status) => ({
          ...ATTENDANCE_STATUS_META[status],
          count: month.statusCounts[status],
          share: toPercent(month.statusCounts[status], month.totalEntries),
        })),
    }));

  return { monthlyBreakdown, attendanceStatusTotals };
}