import { ArrowDown, ArrowUp, ArrowUpDown, CheckCircle2, Radio, RefreshCw } from 'lucide-react';

export function formatSyncTime(value) {
  if (!value) return 'Waiting for sync';
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' }).format(new Date(value));
}

export function formatDisplayDate(value) {
  return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(new Date(value));
}

export function getSyncIndicatorState(syncMode, isRefreshing) {
  if (isRefreshing) return { key: 'refreshing', label: 'Manual refresh in progress', icon: RefreshCw, className: 'is-refreshing' };
  if (syncMode.includes('Live update')) return { key: 'live-update', label: 'Live update received', icon: Radio, className: 'is-live' };
  if (syncMode.includes('Auto-refresh')) return { key: 'poll-sync', label: 'Auto-refresh synced', icon: RefreshCw, className: 'is-polling' };
  if (syncMode.includes('connected')) return { key: 'connected', label: 'Live sync connected', icon: CheckCircle2, className: 'is-connected' };
  return { key: 'starting', label: 'Starting live sync', icon: RefreshCw, className: 'is-refreshing' };
}

export function getSortValue(row, sortKey, activeTab) {
  if (activeTab === 'interns') return sortKey === 'internName' ? row.name : sortKey === 'internId' ? row.internNumericId : sortKey === 'startedAt' ? row.startedAt : row[sortKey] ?? '';
  return sortKey === 'dateRequested' ? row.requestedAt : sortKey === 'status' ? row.workflowStatus : row[sortKey] ?? '';
}

export function compareSortValues(leftValue, rightValue) {
  if (typeof leftValue === 'string' && typeof rightValue === 'string') return leftValue.localeCompare(rightValue, undefined, { numeric: true, sensitivity: 'base' });
  if (leftValue > rightValue) return 1;
  if (leftValue < rightValue) return -1;
  return 0;
}

export const getHeaderSortIcon = (columnKey, sortConfig) => (sortConfig.key !== columnKey ? ArrowUpDown : sortConfig.direction === 'asc' ? ArrowUp : ArrowDown);