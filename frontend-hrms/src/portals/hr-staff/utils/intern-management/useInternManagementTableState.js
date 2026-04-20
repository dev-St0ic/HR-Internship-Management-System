import { useEffect, useMemo, useState } from 'react';

import { INTERN_MANAGEMENT_PAGE_SIZE } from '../../data/internManagementData';
import { attendanceRequestsTableColumns, initialSortConfig, internsTableColumns } from './columns';
import { compareSortValues, getSortValue } from './helpers';
import { useColumnResize } from './useColumnResize';

export function useInternManagementTableState(activeTab, activeRows, search, appliedFilters) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(initialSortConfig);
  const { columnWidths, handleResizeStart: startResize } = useColumnResize();
  const sortedRows = useMemo(() => {
    const nextRows = [...activeRows];
    const currentSortConfig = sortConfig[activeTab];
    nextRows.sort((leftRow, rightRow) => {
      const result = compareSortValues(getSortValue(leftRow, currentSortConfig.key, activeTab), getSortValue(rightRow, currentSortConfig.key, activeTab));
      return result !== 0 ? (currentSortConfig.direction === 'asc' ? result : -result) : leftRow.id.localeCompare(rightRow.id, undefined, { numeric: true, sensitivity: 'base' });
    });
    return nextRows;
  }, [activeRows, activeTab, sortConfig]);

  const activeTableColumns = activeTab === 'interns' ? internsTableColumns : attendanceRequestsTableColumns;
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / INTERN_MANAGEMENT_PAGE_SIZE));
  const paginatedRows = sortedRows.slice((currentPage - 1) * INTERN_MANAGEMENT_PAGE_SIZE, currentPage * INTERN_MANAGEMENT_PAGE_SIZE);
  const emptyRowCount = sortedRows.length > 0 ? Math.max(0, INTERN_MANAGEMENT_PAGE_SIZE - paginatedRows.length) : 0;
  const activeTableWidth = activeTableColumns.reduce((total, column) => total + columnWidths[activeTab][column.key], 0);

  useEffect(() => { setCurrentPage(1); }, [activeTab, appliedFilters, search, sortConfig]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

  const handleResizeStart = (event, columnKey, minWidth) => startResize(event, activeTab, columnKey, minWidth);
  const handleSort = (columnKey) => setSortConfig((current) => current[activeTab].key === columnKey ? { ...current, [activeTab]: { key: columnKey, direction: current[activeTab].direction === 'asc' ? 'desc' : 'asc' } } : { ...current, [activeTab]: { key: columnKey, direction: 'asc' } });

  return { currentPage, setCurrentPage, sortConfig, activeTableColumns, activeTableWidth, columnWidths, paginatedRows, emptyRowCount, totalPages, handleResizeStart, handleSort };
}