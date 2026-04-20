import { useMemo } from 'react';

import { actionIconMap, getThemeAsset } from '../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../common/theme/ThemeProvider';
import { documentVaultSections, getDocumentVaultStatuses } from '../../data/documentVaultData';
import { allDocumentsSection, documentVaultStatuses } from './constants';
import { formatSyncTime, getSyncIndicatorState } from './helpers';
import { useDocumentVaultPdfCache } from './useDocumentVaultPdfCache';
import { useDocumentVaultQueryState } from './useDocumentVaultQueryState';
import { useDocumentVaultSync } from './useDocumentVaultSync';
import { useDocumentVaultTableState } from './useDocumentVaultTableState';

export function useDocumentVaultPageState() {
  const { resolvedTheme } = useTheme();
  const queryState = useDocumentVaultQueryState();
  const syncState = useDocumentVaultSync();
  const pdfState = useDocumentVaultPdfCache();
  const activeSectionConfig = queryState.sectionTabs.find((section) => section.key === queryState.activeSection) ?? documentVaultSections[0];
  const sectionRecords = queryState.activeSection === allDocumentsSection.key ? syncState.vaultRecords : syncState.vaultRecords.filter((record) => record.sectionKey === queryState.activeSection);
  const availableStatuses = new Set(getDocumentVaultStatuses(sectionRecords));
  const statusOptions = [{ value: 'All Statuses', label: 'All Statuses', isDisabled: false }, ...documentVaultStatuses.map((status) => ({ value: status, label: status, isDisabled: !availableStatuses.has(status), tooltip: !availableStatuses.has(status) ? 'No available files for that section.' : '' }))];
  const availableDepartments = Array.from(new Set(sectionRecords.map((record) => record.department))).sort();
  const availableHandledBy = Array.from(new Set(sectionRecords.map((record) => record.uploadedBy))).sort();
  const availableWorkModes = Array.from(new Set(sectionRecords.map((record) => record.workMode))).sort();
  const availableFileTypes = Array.from(new Set(sectionRecords.map((record) => record.fileType))).sort();
  const activeFilterCount = [queryState.appliedFilters.statuses.length, queryState.appliedFilters.departments.length, queryState.appliedFilters.handledBy.length, queryState.appliedFilters.workModes.length, queryState.appliedFilters.fileTypes.length, queryState.appliedFilters.assignedFrom ? 1 : 0, queryState.appliedFilters.assignedTo ? 1 : 0, queryState.appliedFilters.uploadedFrom ? 1 : 0, queryState.appliedFilters.uploadedTo ? 1 : 0].reduce((total, count) => total + count, 0);
  const appliedStatusSummary = queryState.appliedFilters.statuses.length === 0 ? '' : queryState.appliedFilters.statuses.length > 2 ? `${queryState.appliedFilters.statuses.slice(0, 2).join(', ')} +${queryState.appliedFilters.statuses.length - 2}` : queryState.appliedFilters.statuses.join(', ');
  const filteredRecords = sectionRecords.filter((record) => { const query = queryState.search.trim().toLowerCase(); return (queryState.appliedFilters.statuses.length === 0 || queryState.appliedFilters.statuses.includes(record.status)) && (queryState.appliedFilters.departments.length === 0 || queryState.appliedFilters.departments.includes(record.department)) && (queryState.appliedFilters.handledBy.length === 0 || queryState.appliedFilters.handledBy.includes(record.uploadedBy)) && (queryState.appliedFilters.workModes.length === 0 || queryState.appliedFilters.workModes.includes(record.workMode)) && (queryState.appliedFilters.fileTypes.length === 0 || queryState.appliedFilters.fileTypes.includes(record.fileType)) && (!queryState.appliedFilters.assignedFrom || record.assignedDate >= queryState.appliedFilters.assignedFrom) && (!queryState.appliedFilters.assignedTo || record.assignedDate <= queryState.appliedFilters.assignedTo) && (!queryState.appliedFilters.uploadedFrom || record.uploadedAt >= queryState.appliedFilters.uploadedFrom) && (!queryState.appliedFilters.uploadedTo || record.uploadedAt <= queryState.appliedFilters.uploadedTo) && (query.length === 0 || [record.fileName, record.internName, record.department, record.uploadedBy].join(' ').toLowerCase().includes(query)); });
  const tableState = useDocumentVaultTableState(filteredRecords, queryState.activeSection, queryState.search, queryState.appliedFilters);
  const syncIndicator = getSyncIndicatorState(syncState.syncMode, syncState.isRefreshing);
  const syncTooltip = `${syncIndicator.label} • Updated ${formatSyncTime(syncState.lastSyncedAt)}`;
  return { ...queryState, ...syncState, ...pdfState, ...tableState, activeSectionConfig, statusOptions, availableDepartments, availableHandledBy, availableWorkModes, availableFileTypes, activeFilterCount, appliedStatusSummary, syncIndicator, syncTooltip, downloadIcon: getThemeAsset(actionIconMap.download, resolvedTheme), filterIcon: getThemeAsset(actionIconMap.filter, resolvedTheme === 'dark' ? 'light' : resolvedTheme) };
}