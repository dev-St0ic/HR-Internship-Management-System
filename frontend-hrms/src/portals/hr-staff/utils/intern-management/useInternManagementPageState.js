import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { actionIconMap, getThemeAsset } from '../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../common/theme/ThemeProvider';
import { attendanceRequestStatusOptions } from '../../data/internManagementData';
import { getActiveFilterCount, filterAttendanceRequests, filterInterns } from './filters';
import { formatSyncTime, getSyncIndicatorState } from './helpers';
import { buildAvailableFilterOptions } from './options';
import { useInternManagementQueryState } from './useInternManagementQueryState';
import { useInternManagementSync } from './useInternManagementSync';
import { useInternManagementTableState } from './useInternManagementTableState';

export function useInternManagementPageState() {
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const workspaceSectionRef = useRef(null);
  const queryState = useInternManagementQueryState(workspaceSectionRef);
  const syncState = useInternManagementSync();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestModalMode, setRequestModalMode] = useState('view');
  const [internPendingRemoval, setInternPendingRemoval] = useState(null);
  const icons = useMemo(() => ({ editIcon: getThemeAsset(actionIconMap.edit, resolvedTheme), filterIcon: getThemeAsset(actionIconMap.filter, resolvedTheme === 'dark' ? 'light' : resolvedTheme), removeIcon: getThemeAsset(actionIconMap.remove, resolvedTheme), viewIcon: getThemeAsset(actionIconMap.view, resolvedTheme) }), [resolvedTheme]);
  const availableOptions = useMemo(() => buildAvailableFilterOptions(syncState.interns, syncState.attendanceRequests), [syncState.attendanceRequests, syncState.interns]);
  const activeRows = useMemo(() => queryState.activeTab === 'interns' ? filterInterns(syncState.interns, queryState.appliedFilters, queryState.search) : filterAttendanceRequests(syncState.attendanceRequests, queryState.appliedFilters, queryState.search), [queryState.activeTab, queryState.appliedFilters, queryState.search, syncState.attendanceRequests, syncState.interns]);
  const tableState = useInternManagementTableState(queryState.activeTab, activeRows, queryState.search, queryState.appliedFilters);
  const activeFilterCount = useMemo(() => getActiveFilterCount(queryState.activeTab, queryState.appliedFilters), [queryState.activeTab, queryState.appliedFilters]);
  const syncIndicator = getSyncIndicatorState(syncState.syncMode, syncState.isRefreshing);
  const syncTooltip = `${syncIndicator.label} • Updated ${formatSyncTime(syncState.lastSyncedAt)}`;
  const openRequestModal = (request, mode) => { setSelectedRequest(request); setRequestModalMode(mode); };
  const handleConfirmRemoveIntern = async () => { if (!internPendingRemoval) return; await syncState.removeIntern(internPendingRemoval); setInternPendingRemoval(null); };

  return { ...queryState, ...syncState, ...tableState, ...availableOptions, ...icons, navigate, workspaceSectionRef, selectedRequest, setSelectedRequest, requestModalMode, openRequestModal, internPendingRemoval, setInternPendingRemoval, handleConfirmRemoveIntern, attendanceRequestStatusOptions, activeFilterCount, syncIndicator, syncTooltip, resolvedTheme };
}