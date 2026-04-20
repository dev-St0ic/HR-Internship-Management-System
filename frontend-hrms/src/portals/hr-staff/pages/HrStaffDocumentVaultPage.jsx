import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, CheckCircle2, Eye, Radio, RefreshCw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import {
  DOCUMENT_VAULT_POLL_INTERVAL_MS,
  fetchDocumentVaultRecords,
  refreshDocumentVaultRecords,
  subscribeDocumentVaultUpdates,
} from '../../../common/api/documentVaultService';
import EmployeeAvatar from '../components/staff-management/EmployeeAvatar';
import NotificationIcon from '../components/staff-management/NotificationIcon';
import PaginationControls from '../components/staff-management/PaginationControls';
import SearchBar from '../components/staff-management/SearchBar';
import { actionIconMap, getThemeAsset } from '../../../common/config/appIconRegistry';
import { useTheme } from '../../../common/theme/ThemeProvider';
import {
  DOCUMENT_VAULT_PAGE_SIZE,
  documentVaultRecords,
  documentVaultSections,
  getDocumentVaultStatuses,
} from '../data/documentVaultData';
import '../../../assets/styles/staff-management.css';

const statusClassNameMap = {
  Verified: 'is-verified',
  Pending: 'is-pending',
  'For Review': 'is-review',
};

const documentVaultStatuses = ['Pending', 'For Review', 'Verified'];

const documentVaultColumns = [
  { key: 'fileName', label: 'File Name', width: 360, minWidth: 260, resizable: true, sortable: true },
  { key: 'internName', label: 'Intern Name', width: 190, minWidth: 150, resizable: true, sortable: true },
  { key: 'dateAssigned', label: 'Date Assigned', width: 170, minWidth: 160, resizable: true, sortable: true },
  { key: 'department', label: 'Department', width: 200, minWidth: 160, resizable: true, sortable: true },
  { key: 'dateUploaded', label: 'Date Uploaded', width: 180, minWidth: 170, resizable: true, sortable: true },
  { key: 'status', label: 'Status', width: 140, minWidth: 120, resizable: true, sortable: true },
  { key: 'type', label: 'Type', width: 105, minWidth: 96, resizable: true, sortable: true },
  { key: 'action', label: 'Action', width: 110, minWidth: 96, resizable: false },
];

const initialSortConfig = {
  key: 'dateUploaded',
  direction: 'desc',
};

const initialColumnWidths = documentVaultColumns.reduce((widths, column) => {
  widths[column.key] = column.width;
  return widths;
}, {});

const initialVaultFilters = {
  statuses: [],
  departments: [],
  handledBy: [],
  workModes: [],
  fileTypes: [],
  assignedFrom: '',
  assignedTo: '',
  uploadedFrom: '',
  uploadedTo: '',
};

const allDocumentsSection = {
  key: 'all',
  label: 'All Files',
  description: 'All document vault records across every requirement section.',
};

function parseSearchParamList(searchParams, key) {
  return (searchParams.get(key) ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function createVaultFiltersFromSearchParams(searchParams) {
  return {
    ...initialVaultFilters,
    statuses: parseSearchParamList(searchParams, 'status'),
  };
}

function escapePdfText(value) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function buildSamplePdf(record) {
  const lines = [
    `${record.sectionLabel} Sample Document`,
    `File Name: ${record.fileName}`,
    `Intern: ${record.internName}`,
    `Department: ${record.department}`,
    `Handled By HR Staff: ${record.uploadedBy} (${record.uploadedByRole})`,
    `Status: ${record.status}`,
    `Assigned Date: ${record.assignedDate}`,
    `Uploaded Date: ${record.uploadedAt}`,
  ];
  const contentStream = [
    'BT',
    '/F1 16 Tf',
    '50 760 Td',
    ...lines.flatMap((line, index) => [
      `${index === 0 ? '' : '0 -24 Td'} (${escapePdfText(line)}) Tj`.trim(),
    ]),
    'ET',
  ].join('\n');
  const streamLength = contentStream.length;
  const pdfParts = [
    '%PDF-1.4',
    '1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj',
    '2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj',
    '3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj',
    '4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj',
    `5 0 obj<</Length ${streamLength}>>stream\n${contentStream}\nendstream\nendobj`,
  ];

  let offset = 0;
  const objects = pdfParts.map((part) => {
    const entry = { offset, content: `${part}\n` };
    offset += entry.content.length;
    return entry;
  });
  const xrefOffset = offset;
  const xrefEntries = ['0000000000 65535 f ', ...objects.map((object) => String(object.offset).padStart(10, '0') + ' 00000 n ')];
  const pdf = `${objects.map((object) => object.content).join('')}xref\n0 ${objects.length + 1}\n${xrefEntries.join('\n')}\ntrailer<</Size ${objects.length + 1}/Root 1 0 R>>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

function formatDisplayDate(value) {
  const date = new Date(value);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
}

function formatSyncTime(value) {
  if (!value) {
    return 'Waiting for sync';
  }

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(value));
}

function getSyncIndicatorState(syncMode, isRefreshing) {
  if (isRefreshing) {
    return {
      key: 'refreshing',
      label: 'Manual refresh in progress',
      icon: RefreshCw,
      className: 'is-refreshing',
    };
  }

  if (syncMode.includes('Live update')) {
    return {
      key: 'live-update',
      label: 'Live update received',
      icon: Radio,
      className: 'is-live',
    };
  }

  if (syncMode.includes('Auto-refresh')) {
    return {
      key: 'poll-sync',
      label: 'Auto-refresh synced',
      icon: RefreshCw,
      className: 'is-polling',
    };
  }

  if (syncMode.includes('connected')) {
    return {
      key: 'connected',
      label: 'Live sync connected',
      icon: CheckCircle2,
      className: 'is-connected',
    };
  }

  return {
    key: 'starting',
    label: 'Starting live sync',
    icon: RefreshCw,
    className: 'is-refreshing',
  };
}

function getSortValue(record, sortKey) {
  switch (sortKey) {
    case 'dateAssigned':
      return record.assignedDate;
    case 'dateUploaded':
      return record.uploadedAt;
    case 'type':
      return record.fileType;
    default:
      return record[sortKey] ?? '';
  }
}

function compareSortValues(leftValue, rightValue) {
  if (typeof leftValue === 'string' && typeof rightValue === 'string') {
    return leftValue.localeCompare(rightValue, undefined, { numeric: true, sensitivity: 'base' });
  }

  if (leftValue > rightValue) {
    return 1;
  }

  if (leftValue < rightValue) {
    return -1;
  }

  return 0;
}

function getHeaderSortIcon(columnKey, sortConfig) {
  if (sortConfig.key !== columnKey) {
    return ArrowUpDown;
  }

  return sortConfig.direction === 'asc' ? ArrowUp : ArrowDown;
}

function DocumentVaultFilterModal({
  isOpen,
  statusOptions,
  availableDepartments,
  availableHandledBy,
  availableWorkModes,
  availableFileTypes,
  draftFilters,
  onToggleValue,
  onDateChange,
  onApply,
  onReset,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  const checkboxGroups = [
    { key: 'statuses', label: 'Status', options: statusOptions },
    { key: 'departments', label: 'Department', options: availableDepartments.map((option) => ({ value: option, label: option })) },
    { key: 'handledBy', label: 'Handled by HR Staff', options: availableHandledBy.map((option) => ({ value: option, label: option })) },
    { key: 'workModes', label: 'Work Mode', options: availableWorkModes.map((option) => ({ value: option, label: option })) },
    { key: 'fileTypes', label: 'File Type', options: availableFileTypes.map((option) => ({ value: option, label: option })) },
  ];

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div className="filter-modal document-vault-filter-modal" onClick={(event) => event.stopPropagation()}>
        <div className="document-vault-filter-header">
          <div>
            <h4>Filter Documents</h4>
            <p>Refine the current document section using table-specific fields.</p>
          </div>
        </div>

        <div className="document-vault-filter-card-grid">
          {checkboxGroups.map((group) => (
            <section key={group.key} className="filter-section document-vault-filter-card">
              <label>{group.label}</label>
              <div className="filter-options document-vault-filter-options-grid">
              {group.options.map((option) => {
                const inputId = `${group.key}-${option.value.replace(/\s+/g, '-').toLowerCase()}`;

                return (
                  <label
                    key={option.value}
                    className={`filter-option ${option.isDisabled ? 'is-disabled' : ''}`}
                    htmlFor={inputId}
                    data-tooltip={option.tooltip ?? ''}
                    title={option.tooltip ?? ''}
                  >
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={draftFilters[group.key].includes(option.value)}
                      onChange={() => {
                        if (option.isDisabled) {
                          return;
                        }

                        onToggleValue(group.key, option.value);
                      }}
                      disabled={option.isDisabled}
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
              </div>
            </section>
          ))}
        </div>

        <div className="document-vault-filter-date-sections">
          <section className="filter-section document-vault-filter-card">
            <label>Date Assigned</label>
            <div className="document-vault-date-grid">
            <label className="document-vault-date-field">
              <span>From</span>
              <input
                type="date"
                value={draftFilters.assignedFrom}
                onChange={(event) => onDateChange('assignedFrom', event.target.value)}
              />
            </label>
            <label className="document-vault-date-field">
              <span>To</span>
              <input
                type="date"
                value={draftFilters.assignedTo}
                onChange={(event) => onDateChange('assignedTo', event.target.value)}
              />
            </label>
            </div>
          </section>

          <section className="filter-section document-vault-filter-card">
            <label>Date Uploaded</label>
            <div className="document-vault-date-grid">
            <label className="document-vault-date-field">
              <span>From</span>
              <input
                type="date"
                value={draftFilters.uploadedFrom}
                onChange={(event) => onDateChange('uploadedFrom', event.target.value)}
              />
            </label>
            <label className="document-vault-date-field">
              <span>To</span>
              <input
                type="date"
                value={draftFilters.uploadedTo}
                onChange={(event) => onDateChange('uploadedTo', event.target.value)}
              />
            </label>
            </div>
          </section>
        </div>

        <div className="filter-actions document-vault-filter-actions">
          <button className="filter-cancel" type="button" onClick={onReset}>Reset</button>
          <button className="filter-cancel" type="button" onClick={onClose}>Cancel</button>
          <button className="filter-apply" type="button" onClick={onApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default function HrStaffDocumentVaultPage() {
  const { resolvedTheme } = useTheme();
  const [searchParams] = useSearchParams();
  const sectionTabs = useMemo(
    () => [allDocumentsSection, ...documentVaultSections],
    [],
  );
  const requestedSection = sectionTabs.some((section) => section.key === searchParams.get('section'))
    ? searchParams.get('section')
    : documentVaultSections[0].key;
  const requestedSearch = searchParams.get('q') ?? '';
  const requestedFilters = useMemo(
    () => createVaultFiltersFromSearchParams(searchParams),
    [searchParams],
  );
  const requestedFiltersKey = JSON.stringify(requestedFilters);
  const [activeSection, setActiveSection] = useState(requestedSection);
  const [search, setSearch] = useState(requestedSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [vaultRecords, setVaultRecords] = useState(documentVaultRecords);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [syncMode, setSyncMode] = useState('Starting live sync');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(requestedFilters);
  const [draftFilters, setDraftFilters] = useState(requestedFilters);
  const [sortConfig, setSortConfig] = useState(initialSortConfig);
  const [columnWidths, setColumnWidths] = useState(() => initialColumnWidths);
  const pdfUrlCacheRef = useRef(new Map());
  const resizeStateRef = useRef(null);
  const latestSnapshotVersionRef = useRef(0);
  const downloadIcon = getThemeAsset(actionIconMap.download, resolvedTheme);
  const filterIcon = getThemeAsset(actionIconMap.filter, resolvedTheme);

  const applySnapshot = (snapshot, label) => {
    if (snapshot.version < latestSnapshotVersionRef.current) {
      return;
    }

    latestSnapshotVersionRef.current = snapshot.version;
    setVaultRecords(snapshot.records);
    setLastSyncedAt(snapshot.updatedAt);
    setSyncMode(label);
  };

  useEffect(() => {
    let isActive = true;

    fetchDocumentVaultRecords().then((snapshot) => {
      if (isActive) {
        applySnapshot(snapshot, 'Live sync connected');
      }
    });

    const unsubscribe = subscribeDocumentVaultUpdates((snapshot) => {
      if (isActive) {
        applySnapshot(snapshot, 'Live update received');
      }
    });

    const pollIntervalId = window.setInterval(() => {
      fetchDocumentVaultRecords().then((snapshot) => {
        if (isActive) {
          applySnapshot(snapshot, 'Auto-refresh synced');
        }
      });
    }, DOCUMENT_VAULT_POLL_INTERVAL_MS);

    return () => {
      isActive = false;
      unsubscribe();
      window.clearInterval(pollIntervalId);
    };
  }, []);

  useEffect(() => {
    return () => {
      pdfUrlCacheRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      pdfUrlCacheRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!resizeStateRef.current) {
        return;
      }

      const { columnKey, startX, startWidth, minWidth } = resizeStateRef.current;
      const nextWidth = Math.max(minWidth, startWidth + (event.clientX - startX));

      setColumnWidths((current) => {
        if (current[columnKey] === nextWidth) {
          return current;
        }

        return {
          ...current,
          [columnKey]: nextWidth,
        };
      });
    };

    const stopResizing = () => {
      if (!resizeStateRef.current) {
        return;
      }

      resizeStateRef.current = null;
      document.body.style.cursor = '';
      document.body.classList.remove('document-vault-is-resizing');
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', stopResizing);
      document.body.style.cursor = '';
      document.body.classList.remove('document-vault-is-resizing');
    };
  }, []);

  const activeSectionConfig = useMemo(
    () => sectionTabs.find((section) => section.key === activeSection) ?? documentVaultSections[0],
    [activeSection, sectionTabs],
  );

  const sectionRecords = useMemo(
    () => activeSection === allDocumentsSection.key
      ? vaultRecords
      : vaultRecords.filter((record) => record.sectionKey === activeSection),
    [activeSection, vaultRecords],
  );

  const availableStatuses = useMemo(
    () => new Set(getDocumentVaultStatuses(sectionRecords)),
    [sectionRecords],
  );

  const statusOptions = useMemo(
    () => [
      { value: 'All Statuses', label: 'All Statuses', isDisabled: false },
      ...documentVaultStatuses.map((status) => ({
        value: status,
        label: status,
        isDisabled: !availableStatuses.has(status),
        tooltip: !availableStatuses.has(status) ? 'No available files for that section.' : '',
      })),
    ],
    [availableStatuses],
  );

  const availableDepartments = useMemo(
    () => Array.from(new Set(sectionRecords.map((record) => record.department))).sort(),
    [sectionRecords],
  );

  const availableHandledBy = useMemo(
    () => Array.from(new Set(sectionRecords.map((record) => record.uploadedBy))).sort(),
    [sectionRecords],
  );

  const availableWorkModes = useMemo(
    () => Array.from(new Set(sectionRecords.map((record) => record.workMode))).sort(),
    [sectionRecords],
  );

  const availableFileTypes = useMemo(
    () => Array.from(new Set(sectionRecords.map((record) => record.fileType))).sort(),
    [sectionRecords],
  );

  const activeFilterCount = useMemo(() => {
    return [
      appliedFilters.statuses.length,
      appliedFilters.departments.length,
      appliedFilters.handledBy.length,
      appliedFilters.workModes.length,
      appliedFilters.fileTypes.length,
      appliedFilters.assignedFrom ? 1 : 0,
      appliedFilters.assignedTo ? 1 : 0,
      appliedFilters.uploadedFrom ? 1 : 0,
      appliedFilters.uploadedTo ? 1 : 0,
    ].reduce((total, count) => total + count, 0);
  }, [appliedFilters]);

  const appliedStatusSummary = useMemo(() => {
    if (appliedFilters.statuses.length === 0) {
      return '';
    }

    const visibleStatuses = appliedFilters.statuses.slice(0, 2).join(', ');
    const remainingCount = appliedFilters.statuses.length - 2;

    if (remainingCount > 0) {
      return `${visibleStatuses} +${remainingCount}`;
    }

    return visibleStatuses;
  }, [appliedFilters.statuses]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sectionRecords.filter((record) => {
      const matchesStatus = appliedFilters.statuses.length === 0 || appliedFilters.statuses.includes(record.status);
      const matchesDepartment = appliedFilters.departments.length === 0 || appliedFilters.departments.includes(record.department);
      const matchesHandledBy = appliedFilters.handledBy.length === 0 || appliedFilters.handledBy.includes(record.uploadedBy);
      const matchesWorkMode = appliedFilters.workModes.length === 0 || appliedFilters.workModes.includes(record.workMode);
      const matchesFileType = appliedFilters.fileTypes.length === 0 || appliedFilters.fileTypes.includes(record.fileType);
      const matchesAssignedFrom = !appliedFilters.assignedFrom || record.assignedDate >= appliedFilters.assignedFrom;
      const matchesAssignedTo = !appliedFilters.assignedTo || record.assignedDate <= appliedFilters.assignedTo;
      const matchesUploadedFrom = !appliedFilters.uploadedFrom || record.uploadedAt >= appliedFilters.uploadedFrom;
      const matchesUploadedTo = !appliedFilters.uploadedTo || record.uploadedAt <= appliedFilters.uploadedTo;
      const matchesQuery =
        query.length === 0 ||
        [record.fileName, record.internName, record.department, record.uploadedBy]
          .join(' ')
          .toLowerCase()
          .includes(query);

      return (
        matchesStatus &&
        matchesDepartment &&
        matchesHandledBy &&
        matchesWorkMode &&
        matchesFileType &&
        matchesAssignedFrom &&
        matchesAssignedTo &&
        matchesUploadedFrom &&
        matchesUploadedTo &&
        matchesQuery
      );
    });
  }, [search, sectionRecords, appliedFilters]);

  const sortedRecords = useMemo(() => {
    const nextRecords = [...filteredRecords];

    nextRecords.sort((leftRecord, rightRecord) => {
      const result = compareSortValues(
        getSortValue(leftRecord, sortConfig.key),
        getSortValue(rightRecord, sortConfig.key),
      );

      if (result !== 0) {
        return sortConfig.direction === 'asc' ? result : -result;
      }

      return leftRecord.id.localeCompare(rightRecord.id, undefined, { numeric: true, sensitivity: 'base' });
    });

    return nextRecords;
  }, [filteredRecords, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / DOCUMENT_VAULT_PAGE_SIZE));
  const paginatedRecords = sortedRecords.slice(
    (currentPage - 1) * DOCUMENT_VAULT_PAGE_SIZE,
    currentPage * DOCUMENT_VAULT_PAGE_SIZE,
  );
  const emptyRowCount = sortedRecords.length > 0
    ? Math.max(0, DOCUMENT_VAULT_PAGE_SIZE - paginatedRecords.length)
    : 0;
  const totalTableWidth = documentVaultColumns.reduce(
    (totalWidth, column) => totalWidth + columnWidths[column.key],
    0,
  );
  const syncIndicator = getSyncIndicatorState(syncMode, isRefreshing);
  const SyncIndicatorIcon = syncIndicator.icon;
  const syncTooltip = `${syncIndicator.label} • Updated ${formatSyncTime(lastSyncedAt)}`;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection, search, appliedFilters, sortConfig]);

  useEffect(() => {
    if (requestedSection !== activeSection) {
      setActiveSection(requestedSection);
    }

    if (requestedSearch !== search) {
      setSearch(requestedSearch);
    }

    if (JSON.stringify(appliedFilters) !== requestedFiltersKey) {
      setAppliedFilters(requestedFilters);
      setDraftFilters(requestedFilters);
    }
  }, [requestedFilters, requestedFiltersKey, requestedSearch, requestedSection]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleOpenPdf = (record, download = false) => {
    let pdfUrl = pdfUrlCacheRef.current.get(record.id);

    if (!pdfUrl) {
      pdfUrl = URL.createObjectURL(buildSamplePdf(record));
      pdfUrlCacheRef.current.set(record.id, pdfUrl);
    }

    if (download) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = record.fileName;
      link.click();
      return;
    }

    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);

    try {
      const snapshot = await refreshDocumentVaultRecords();
      applySnapshot(snapshot, 'Manual refresh complete');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleToggleFilterValue = (groupKey, option) => {
    setDraftFilters((current) => ({
      ...current,
      [groupKey]: current[groupKey].includes(option)
        ? current[groupKey].filter((value) => value !== option)
        : [...current[groupKey], option],
    }));
  };

  const handleFilterDateChange = (field, value) => {
    setDraftFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setDraftFilters(initialVaultFilters);
    setAppliedFilters(initialVaultFilters);
    setIsFilterOpen(false);
  };

  const handleResizeStart = (event, columnKey, minWidth) => {
    event.preventDefault();
    event.stopPropagation();

    resizeStateRef.current = {
      columnKey,
      startX: event.clientX,
      startWidth: columnWidths[columnKey],
      minWidth,
    };

    document.body.style.cursor = 'col-resize';
    document.body.classList.add('document-vault-is-resizing');
  };

  const handleSort = (columnKey) => {
    setSortConfig((current) => {
      if (current.key === columnKey) {
        return {
          key: columnKey,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        };
      }

      return {
        key: columnKey,
        direction: 'asc',
      };
    });
  };

  const handleSectionChange = (sectionKey) => {
    setActiveSection(sectionKey);
    setSearch('');
    setAppliedFilters(initialVaultFilters);
    setDraftFilters(initialVaultFilters);
  };

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* layout handled by parent */}</aside>
      <main className="main-content document-vault-page-content">
        <div className="header-row">
          <div>
            <h2>Document Vault</h2>
            <span className="subtitle">{activeSectionConfig.description}</span>
          </div>
          <NotificationIcon />
        </div>

        <section className="document-vault-card">
          <div className="document-vault-toolbar">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by file, intern, department, or uploader" />
            <div className="document-vault-toolbar-actions">
              <div className="document-vault-sync-indicator" aria-live="polite">
                <button
                  type="button"
                  className={`document-vault-sync-button ${syncIndicator.className}`}
                  aria-label={syncTooltip}
                >
                  <SyncIndicatorIcon size={16} />
                </button>
                <span className="document-vault-sync-tooltip" role="status">
                  {syncTooltip}
                </span>
              </div>
              <button
                type="button"
                className={`document-vault-refresh-button ${isRefreshing ? 'is-refreshing' : ''}`}
                onClick={handleManualRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw size={15} />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>

          <div className="document-vault-tabs-row">
            <div className="document-vault-tabs" role="tablist" aria-label="Document vault sections">
              {sectionTabs.map((section) => {
                const recordCount = section.key === allDocumentsSection.key
                  ? vaultRecords.length
                  : vaultRecords.filter((record) => record.sectionKey === section.key).length;

                return (
                  <button
                    key={section.key}
                    type="button"
                    role="tab"
                    className={`document-vault-tab ${activeSection === section.key ? 'is-active' : ''}`}
                    aria-selected={activeSection === section.key}
                    onClick={() => handleSectionChange(section.key)}
                  >
                    <span>{section.label}</span>
                    <span className="document-vault-tab-count">{recordCount}</span>
                  </button>
                );
              })}
            </div>
            <div className="document-vault-filter-summary-group">
              {appliedStatusSummary && (
                <div className="document-vault-active-summary" title={`Active statuses: ${appliedFilters.statuses.join(', ')}`}>
                  <span className="document-vault-active-summary-label">Status:</span>
                  <span className="document-vault-active-summary-value">{appliedStatusSummary}</span>
                </div>
              )}
              <button
                type="button"
                className="filter-btn document-vault-filter-button"
                onClick={() => {
                  setDraftFilters(appliedFilters);
                  setIsFilterOpen(true);
                }}
              >
                <img src={filterIcon} alt="" aria-hidden="true" className="filter-btn-icon" />
                <span>Filter</span>
                {activeFilterCount > 0 && <span className="document-vault-filter-count">{activeFilterCount}</span>}
              </button>
            </div>
          </div>

          <div className="document-vault-table-shell">
            <div className="document-vault-table-scroll">
              <table className="document-vault-table" style={{ minWidth: `${totalTableWidth}px` }}>
                <colgroup>
                  {documentVaultColumns.map((column) => (
                    <col
                      key={column.key}
                      className={`document-vault-col-${column.key}`}
                      style={{ width: `${columnWidths[column.key]}px` }}
                    />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    {documentVaultColumns.map((column) => (
                      <th
                        key={column.key}
                        aria-sort={
                          column.sortable
                            ? sortConfig.key === column.key
                              ? sortConfig.direction === 'asc'
                                ? 'ascending'
                                : 'descending'
                              : 'none'
                            : undefined
                        }
                      >
                        <div className="document-vault-header-cell">
                          {column.sortable ? (
                            <button
                              type="button"
                              className={`document-vault-sort-button ${sortConfig.key === column.key ? 'is-active' : ''}`}
                              onClick={() => handleSort(column.key)}
                              aria-label={`Sort by ${column.label} ${sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'descending' : 'ascending'}`}
                            >
                              <span className="document-vault-header-text">{column.label}</span>
                              {React.createElement(getHeaderSortIcon(column.key, sortConfig), {
                                size: 14,
                                className: 'document-vault-sort-icon',
                                'aria-hidden': true,
                              })}
                            </button>
                          ) : (
                            <span className="document-vault-header-text">{column.label}</span>
                          )}
                          {column.resizable && (
                            <button
                              type="button"
                              className="document-vault-resize-handle"
                              aria-label={`Resize ${column.label} column`}
                              onMouseDown={(event) => handleResizeStart(event, column.key, column.minWidth)}
                            />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecords.length > 0 ? (
                    <>
                      {paginatedRecords.map((record) => (
                        <tr key={record.id}>
                          <td>
                            <div className="document-vault-file-cell">
                              <span className="document-vault-file-name" title={record.fileName}>{record.fileName}</span>
                              <span className="document-vault-file-meta" title={`Handled by HR Staff ${record.uploadedBy}`}>
                                Handled by HR Staff {record.uploadedBy}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="document-vault-person-cell document-vault-person-cell-with-avatar">
                              <EmployeeAvatar
                                src={record.internAvatar}
                                alt={record.internName}
                                name={record.internName}
                                size={30}
                                className="document-vault-person-avatar"
                              />
                              <span title={record.internName}>{record.internName}</span>
                            </div>
                          </td>
                          <td className="document-vault-date-cell">{record.assignedDate}</td>
                          <td>
                            <div className="document-vault-person-cell">
                              <span title={record.department}>{record.department}</span>
                              <span>{record.workMode}</span>
                            </div>
                          </td>
                          <td className="document-vault-date-cell">{formatDisplayDate(record.uploadedAt)}</td>
                          <td>
                            <span className={`document-vault-status ${statusClassNameMap[record.status] ?? ''}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="document-vault-type-cell">{record.fileType}</td>
                          <td>
                            <div className="document-vault-actions">
                              <button
                                type="button"
                                className="document-vault-action-button"
                                onClick={() => handleOpenPdf(record)}
                                aria-label={`Preview ${record.fileName}`}
                              >
                                <Eye size={17} />
                              </button>
                              <button
                                type="button"
                                className="document-vault-action-button"
                                onClick={() => handleOpenPdf(record, true)}
                                aria-label={`Download ${record.fileName}`}
                              >
                                <img src={downloadIcon} alt="" aria-hidden="true" className="document-vault-download-icon" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {Array.from({ length: emptyRowCount }, (_, index) => (
                        <tr key={`empty-row-${index}`} className="document-vault-placeholder-row" aria-hidden="true">
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan="8">
                        <div className="document-vault-empty-state">
                          No documents match the current search and filter settings.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="document-vault-pagination-slot">
            {totalPages > 1 ? (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="document-vault-pagination-bar"
              />
            ) : (
              <div className="document-vault-pagination-placeholder" aria-hidden="true" />
            )}
          </div>
        </section>
        <DocumentVaultFilterModal
          isOpen={isFilterOpen}
          statusOptions={statusOptions}
          availableDepartments={availableDepartments}
          availableHandledBy={availableHandledBy}
          availableWorkModes={availableWorkModes}
          availableFileTypes={availableFileTypes}
          draftFilters={draftFilters}
          onToggleValue={handleToggleFilterValue}
          onDateChange={handleFilterDateChange}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          onClose={() => {
            setDraftFilters(appliedFilters);
            setIsFilterOpen(false);
          }}
        />
      </main>
    </div>
  );
}