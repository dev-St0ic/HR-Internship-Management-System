export function formatSyncTime(value) {
  if (!value) return 'Using the latest available records';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

export const formatDashboardValue = (value) => (typeof value === 'number' ? value.toLocaleString() : value);
export const getLatestTimestamp = (values) => { const timestamps = values.filter(Boolean).map((value) => new Date(value).getTime()).filter(Number.isFinite); return timestamps.length === 0 ? '' : new Date(Math.max(...timestamps)).toISOString(); };