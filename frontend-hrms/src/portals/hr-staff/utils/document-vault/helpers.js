import { ArrowDown, ArrowUp, ArrowUpDown, CheckCircle2, Radio, RefreshCw } from 'lucide-react';

export const formatDisplayDate = (value) => new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(value));

export function formatSyncTime(value) {
  if (!value) return 'Waiting for sync';
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' }).format(new Date(value));
}

export function getSyncIndicatorState(syncMode, isRefreshing) {
  if (isRefreshing) return { key: 'refreshing', label: 'Manual refresh in progress', icon: RefreshCw, className: 'is-refreshing' };
  if (syncMode.includes('Live update')) return { key: 'live-update', label: 'Live update received', icon: Radio, className: 'is-live' };
  if (syncMode.includes('Auto-refresh')) return { key: 'poll-sync', label: 'Auto-refresh synced', icon: RefreshCw, className: 'is-polling' };
  if (syncMode.includes('connected')) return { key: 'connected', label: 'Live sync connected', icon: CheckCircle2, className: 'is-connected' };
  return { key: 'starting', label: 'Starting live sync', icon: RefreshCw, className: 'is-refreshing' };
}

export const getSortValue = (record, sortKey) => sortKey === 'dateAssigned' ? record.assignedDate : sortKey === 'dateUploaded' ? record.uploadedAt : sortKey === 'type' ? record.fileType : record[sortKey] ?? '';
export const compareSortValues = (leftValue, rightValue) => typeof leftValue === 'string' && typeof rightValue === 'string' ? leftValue.localeCompare(rightValue, undefined, { numeric: true, sensitivity: 'base' }) : leftValue > rightValue ? 1 : leftValue < rightValue ? -1 : 0;
export const getHeaderSortIcon = (columnKey, sortConfig) => sortConfig.key !== columnKey ? ArrowUpDown : sortConfig.direction === 'asc' ? ArrowUp : ArrowDown;