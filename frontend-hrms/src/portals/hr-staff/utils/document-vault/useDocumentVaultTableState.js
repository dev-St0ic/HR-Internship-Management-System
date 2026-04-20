import { useEffect, useRef, useState } from 'react';

import { DOCUMENT_VAULT_PAGE_SIZE } from '../../data/documentVaultData';
import { createInitialColumnWidths, documentVaultColumns, initialSortConfig } from './constants';
import { compareSortValues, getSortValue } from './helpers';

export function useDocumentVaultTableState(filteredRecords, activeSection, search, appliedFilters) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(initialSortConfig);
  const [columnWidths, setColumnWidths] = useState(createInitialColumnWidths);
  const resizeStateRef = useRef(null);
  const sortedRecords = [...filteredRecords].sort((leftRecord, rightRecord) => { const result = compareSortValues(getSortValue(leftRecord, sortConfig.key), getSortValue(rightRecord, sortConfig.key)); return result !== 0 ? (sortConfig.direction === 'asc' ? result : -result) : leftRecord.id.localeCompare(rightRecord.id, undefined, { numeric: true, sensitivity: 'base' }); });
  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / DOCUMENT_VAULT_PAGE_SIZE));
  const paginatedRecords = sortedRecords.slice((currentPage - 1) * DOCUMENT_VAULT_PAGE_SIZE, currentPage * DOCUMENT_VAULT_PAGE_SIZE);
  const emptyRowCount = sortedRecords.length > 0 ? Math.max(0, DOCUMENT_VAULT_PAGE_SIZE - paginatedRecords.length) : 0;
  const totalTableWidth = documentVaultColumns.reduce((totalWidth, column) => totalWidth + columnWidths[column.key], 0);

  useEffect(() => { setCurrentPage(1); }, [activeSection, search, appliedFilters, sortConfig]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);
  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!resizeStateRef.current) return;
      const { columnKey, startX, startWidth, minWidth } = resizeStateRef.current;
      const nextWidth = Math.max(minWidth, startWidth + (event.clientX - startX));
      setColumnWidths((current) => current[columnKey] === nextWidth ? current : { ...current, [columnKey]: nextWidth });
    };
    const stopResizing = () => {
      if (!resizeStateRef.current) return;
      resizeStateRef.current = null; document.body.style.cursor = ''; document.body.classList.remove('document-vault-is-resizing');
    };
    window.addEventListener('mousemove', handlePointerMove); window.addEventListener('mouseup', stopResizing);
    return () => { window.removeEventListener('mousemove', handlePointerMove); window.removeEventListener('mouseup', stopResizing); document.body.style.cursor = ''; document.body.classList.remove('document-vault-is-resizing'); };
  }, []);

  return {
    currentPage,
    setCurrentPage,
    sortConfig,
    columnWidths,
    paginatedRecords,
    emptyRowCount,
    totalPages,
    totalTableWidth,
    handleResizeStart: (event, columnKey, minWidth) => { event.preventDefault(); event.stopPropagation(); resizeStateRef.current = { columnKey, startX: event.clientX, startWidth: columnWidths[columnKey], minWidth }; document.body.style.cursor = 'col-resize'; document.body.classList.add('document-vault-is-resizing'); },
    handleSort: (columnKey) => setSortConfig((current) => current.key === columnKey ? { key: columnKey, direction: current.direction === 'asc' ? 'desc' : 'asc' } : { key: columnKey, direction: 'asc' }),
  };
}