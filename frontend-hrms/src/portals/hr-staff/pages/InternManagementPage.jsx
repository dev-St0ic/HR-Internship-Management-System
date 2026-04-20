import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ArrowDown, ArrowUp, ArrowUpDown, CheckCircle2, ChevronDown, Radio, RefreshCw, Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  fetchInternManagementSnapshot,
  INTERN_MANAGEMENT_POLL_INTERVAL_MS,
  refreshInternManagementSnapshot,
  removeInternManagementIntern,
  subscribeInternManagementUpdates,
  updateInternManagementAttendanceRequest,
} from '../../../common/api/internManagementService';
import ActionFeedbackBanner from '../components/staff-management/ActionFeedbackBanner';
import ConfirmationModal from '../components/staff-management/ConfirmationModal';
import EmployeeAvatar from '../components/staff-management/EmployeeAvatar';
import NotificationIcon from '../components/staff-management/NotificationIcon';
import PaginationControls from '../components/staff-management/PaginationControls';
import SearchBar from '../components/staff-management/SearchBar';
import { actionIconMap, getThemeAsset, hrStaffInternManagementOperationIconMap } from '../../../common/config/appIconRegistry';
import { useTheme } from '../../../common/theme/ThemeProvider';
import {
  attendanceRequestStatusOptions,
  INTERN_MANAGEMENT_PAGE_SIZE,
  internAttendanceRequests,
  internManagementInterns,
  internManagementOperationTabs,
} from '../data/internManagementData';
import '../../../assets/styles/staff-management.css';
import '../../../assets/styles/intern-management.css';

const initialOverviewFilters = {
  departments: [],
  supervisors: [],
  roleTracks: [],
  workModes: [],
  internshipStatuses: [],
  ojtProgress: [],
  documentStatuses: [],
  evaluationStatuses: [],
  universities: [],
  startedFrom: '',
  startedTo: '',
  workflowStatuses: [],
  issueTypes: [],
  requestDepartments: [],
  requestSupervisors: [],
  requestUniversities: [],
  attendanceStatuses: [],
  supportingDocuments: [],
  requestedFrom: '',
  requestedTo: '',
};

const operationTabIcons = hrStaffInternManagementOperationIconMap;

const INTERN_MANAGEMENT_ACTIVE_TAB_KEY = 'hrms.internManagement.activeTab';
const INTERN_MANAGEMENT_ACTION_FEEDBACK_DURATION_MS = 4000;

const internsTableColumns = [
  { key: 'internName', label: 'Intern Name', width: 280, minWidth: 220, resizable: true, sortable: true },
  { key: 'internId', label: 'Intern ID', width: 170, minWidth: 140, resizable: true, sortable: true },
  { key: 'university', label: 'University', width: 320, minWidth: 220, resizable: true, sortable: true },
  { key: 'department', label: 'Department', width: 210, minWidth: 170, resizable: true, sortable: true },
  { key: 'startedAt', label: 'Started at', width: 180, minWidth: 150, resizable: true, sortable: true },
  { key: 'action', label: 'Action', width: 110, minWidth: 96, resizable: false },
];

const attendanceRequestsTableColumns = [
  { key: 'internName', label: 'Intern Name', width: 280, minWidth: 220, resizable: true, sortable: true },
  { key: 'date', label: 'Date', width: 150, minWidth: 130, resizable: true, sortable: true },
  { key: 'issueType', label: 'Issue Type', width: 220, minWidth: 180, resizable: true, sortable: true },
  { key: 'dateRequested', label: 'Date Requested', width: 180, minWidth: 150, resizable: true, sortable: true },
  { key: 'status', label: 'Status', width: 130, minWidth: 110, resizable: true, sortable: true },
  { key: 'action', label: 'Action', width: 110, minWidth: 96, resizable: false },
];

const initialSortConfig = {
  interns: { key: 'startedAt', direction: 'desc' },
  'attendance-requests': { key: 'dateRequested', direction: 'desc' },
};

const initialInternsColumnWidths = internsTableColumns.reduce((widths, column) => {
  widths[column.key] = column.width;
  return widths;
}, {});

const initialAttendanceRequestColumnWidths = attendanceRequestsTableColumns.reduce((widths, column) => {
  widths[column.key] = column.width;
  return widths;
}, {});

function parseSearchParamList(searchParams, key) {
  return (searchParams.get(key) ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function createOverviewFiltersFromSearchParams(searchParams) {
  return {
    ...initialOverviewFilters,
    documentStatuses: parseSearchParamList(searchParams, 'documentStatus'),
    evaluationStatuses: parseSearchParamList(searchParams, 'evaluationStatus'),
    workflowStatuses: parseSearchParamList(searchParams, 'workflowStatus'),
  };
}

function getRequestedInternManagementTab(searchParams) {
  const requestedTab = searchParams.get('tab');

  return internManagementOperationTabs.some((tab) => tab.key === requestedTab)
    ? requestedTab
    : null;
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

function formatDisplayDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
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

function getSortValue(row, sortKey, activeTab) {
  if (activeTab === 'interns') {
    switch (sortKey) {
      case 'internName':
        return row.name;
      case 'internId':
        return row.internNumericId;
      case 'startedAt':
        return row.startedAt;
      default:
        return row[sortKey] ?? '';
    }
  }

  switch (sortKey) {
    case 'dateRequested':
      return row.requestedAt;
    case 'status':
      return row.workflowStatus;
    default:
      return row[sortKey] ?? '';
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

const InternManagementCalendarTransition = forwardRef(function InternManagementCalendarTransition(props, ref) {
  const { children, in: inProp, onEnter, onExited, ...other } = props;

  return (
    <Fade in={inProp} timeout={220} onEnter={onEnter} onExited={onExited}>
      <div ref={ref} {...other}>
        <Slide in={inProp} direction="up" timeout={220} mountOnEnter unmountOnExit>
          <div>{children}</div>
        </Slide>
      </div>
    </Fade>
  );
});

function OverviewFilterModal({
  isOpen,
  activeTab,
  draftFilters,
  availableDepartments,
  availableSupervisors,
  availableRoleTracks,
  availableWorkModes,
  availableInternshipStatuses,
  availableOjtProgress,
  availableDocumentStatuses,
  availableEvaluationStatuses,
  availableUniversities,
  availableWorkflowStatuses,
  availableIssueTypes,
  availableRequestDepartments,
  availableRequestSupervisors,
  availableRequestUniversities,
  availableAttendanceStatuses,
  availableSupportingDocuments,
  onToggleValue,
  onDateChange,
  onApply,
  onReset,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  const [optionSearch, setOptionSearch] = useState({
    supervisors: '',
    universities: '',
    requestSupervisors: '',
    requestUniversities: '',
  });

  const groups = activeTab === 'interns'
    ? [
        { key: 'departments', label: 'Department', options: availableDepartments },
        { key: 'supervisors', label: 'Supervisor', options: availableSupervisors },
        { key: 'roleTracks', label: 'Role / Track', options: availableRoleTracks },
        { key: 'workModes', label: 'Work Setup', options: availableWorkModes },
        { key: 'internshipStatuses', label: 'Internship Status', options: availableInternshipStatuses },
        { key: 'ojtProgress', label: 'OJT Progress', options: availableOjtProgress },
        { key: 'documentStatuses', label: 'Document Status', options: availableDocumentStatuses },
        { key: 'evaluationStatuses', label: 'Evaluation Status', options: availableEvaluationStatuses },
        { key: 'universities', label: 'University', options: availableUniversities },
      ]
    : [
        { key: 'requestDepartments', label: 'Department', options: availableRequestDepartments },
        { key: 'requestSupervisors', label: 'Supervisor', options: availableRequestSupervisors },
        { key: 'requestUniversities', label: 'University', options: availableRequestUniversities },
        { key: 'workflowStatuses', label: 'Request Status', options: availableWorkflowStatuses },
        { key: 'attendanceStatuses', label: 'Attendance Status', options: availableAttendanceStatuses },
        { key: 'issueTypes', label: 'Issue Type', options: availableIssueTypes },
        { key: 'supportingDocuments', label: 'Supporting Document', options: availableSupportingDocuments },
      ];

  const selectedFilterCount = groups.reduce(
    (total, group) => total + draftFilters[group.key].length,
    0,
  ) + (activeTab === 'interns'
    ? (draftFilters.startedFrom ? 1 : 0) + (draftFilters.startedTo ? 1 : 0)
    : (draftFilters.requestedFrom ? 1 : 0) + (draftFilters.requestedTo ? 1 : 0));

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div className="filter-modal intern-management-filter-modal" onClick={(event) => event.stopPropagation()}>
        <div className="intern-management-filter-header">
          <div>
            <div className="intern-management-filter-title-row">
              <h4>Filter {activeTab === 'interns' ? 'Interns' : 'Attendance Requests'}</h4>
              <span className="intern-management-filter-badge">
                {selectedFilterCount} selected
              </span>
            </div>
            <p>Refine the visible records using the available categories for this tab.</p>
          </div>
        </div>

        <div className="intern-management-filter-grid">
          {groups.map((group) => (
            <section key={group.key} className="filter-section intern-management-filter-section">
              <div className="intern-management-filter-section-header">
                <label>{group.label}</label>
                <span className="intern-management-filter-section-count">{draftFilters[group.key].length}</span>
              </div>
              {['supervisors', 'universities', 'requestSupervisors', 'requestUniversities'].includes(group.key) && (
                <label className="intern-management-filter-search-field">
                  <Search size={15} strokeWidth={2.1} />
                  <input
                    type="text"
                    value={optionSearch[group.key]}
                    onChange={(event) => setOptionSearch((current) => ({
                      ...current,
                      [group.key]: event.target.value,
                    }))}
                    placeholder={`Search ${group.label.toLowerCase()}`}
                  />
                </label>
              )}
              <div className="filter-options intern-management-filter-options">
                {group.options
                  .filter((option) => {
                    if (!['supervisors', 'universities', 'requestSupervisors', 'requestUniversities'].includes(group.key)) {
                      return true;
                    }

                    return option.toLowerCase().includes(optionSearch[group.key].trim().toLowerCase());
                  })
                  .map((option) => {
                  const inputId = `${group.key}-${option.replace(/\s+/g, '-').toLowerCase()}`;

                  return (
                    <label key={option} className="filter-option intern-management-filter-option" htmlFor={inputId}>
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={draftFilters[group.key].includes(option)}
                        onChange={() => onToggleValue(group.key, option)}
                      />
                      <span>{option}</span>
                    </label>
                  );
                  })}
              </div>
            </section>
          ))}
        </div>

        {activeTab === 'interns' && (
          <div className="intern-management-filter-grid">
            <section className="filter-section intern-management-filter-section intern-management-filter-section-wide intern-management-filter-date-section">
              <div className="intern-management-filter-section-header">
                <label>Start Date Range</label>
                <span className="intern-management-filter-section-count">
                  {(draftFilters.startedFrom ? 1 : 0) + (draftFilters.startedTo ? 1 : 0)}
                </span>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="intern-management-filter-date-grid">
                  <div className="intern-management-filter-date-field">
                    <span>From</span>
                    <DatePicker
                      value={draftFilters.startedFrom ? dayjs(draftFilters.startedFrom) : null}
                      onChange={(value) => onDateChange('startedFrom', value ? value.format('YYYY-MM-DD') : '')}
                      format="DD/MM/YYYY"
                      reduceAnimations={false}
                      slots={{
                        desktopTransition: InternManagementCalendarTransition,
                      }}
                      slotProps={{
                        popper: {
                          placement: 'bottom-start',
                          className: 'intern-management-filter-date-popper',
                        },
                        textField: {
                          fullWidth: true,
                          className: 'intern-management-filter-date-picker',
                        },
                      }}
                    />
                  </div>
                  <div className="intern-management-filter-date-field">
                    <span>To</span>
                    <DatePicker
                      value={draftFilters.startedTo ? dayjs(draftFilters.startedTo) : null}
                      onChange={(value) => onDateChange('startedTo', value ? value.format('YYYY-MM-DD') : '')}
                      format="DD/MM/YYYY"
                      reduceAnimations={false}
                      slots={{
                        desktopTransition: InternManagementCalendarTransition,
                      }}
                      slotProps={{
                        popper: {
                          placement: 'bottom-start',
                          className: 'intern-management-filter-date-popper',
                        },
                        textField: {
                          fullWidth: true,
                          className: 'intern-management-filter-date-picker',
                        },
                      }}
                    />
                  </div>
                </div>
              </LocalizationProvider>
            </section>
          </div>
        )}

        {activeTab === 'attendance-requests' && (
          <div className="intern-management-filter-grid">
            <section className="filter-section intern-management-filter-section intern-management-filter-section-wide intern-management-filter-date-section">
              <div className="intern-management-filter-section-header">
                <label>Request Date Range</label>
                <span className="intern-management-filter-section-count">
                  {(draftFilters.requestedFrom ? 1 : 0) + (draftFilters.requestedTo ? 1 : 0)}
                </span>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="intern-management-filter-date-grid">
                  <div className="intern-management-filter-date-field">
                    <span>From</span>
                    <DatePicker
                      value={draftFilters.requestedFrom ? dayjs(draftFilters.requestedFrom) : null}
                      onChange={(value) => onDateChange('requestedFrom', value ? value.format('YYYY-MM-DD') : '')}
                      format="DD/MM/YYYY"
                      reduceAnimations={false}
                      slots={{
                        desktopTransition: InternManagementCalendarTransition,
                      }}
                      slotProps={{
                        popper: {
                          placement: 'bottom-start',
                          className: 'intern-management-filter-date-popper',
                        },
                        textField: {
                          fullWidth: true,
                          className: 'intern-management-filter-date-picker',
                        },
                      }}
                    />
                  </div>
                  <div className="intern-management-filter-date-field">
                    <span>To</span>
                    <DatePicker
                      value={draftFilters.requestedTo ? dayjs(draftFilters.requestedTo) : null}
                      onChange={(value) => onDateChange('requestedTo', value ? value.format('YYYY-MM-DD') : '')}
                      format="DD/MM/YYYY"
                      reduceAnimations={false}
                      slots={{
                        desktopTransition: InternManagementCalendarTransition,
                      }}
                      slotProps={{
                        popper: {
                          placement: 'bottom-start',
                          className: 'intern-management-filter-date-popper',
                        },
                        textField: {
                          fullWidth: true,
                          className: 'intern-management-filter-date-picker',
                        },
                      }}
                    />
                  </div>
                </div>
              </LocalizationProvider>
            </section>
          </div>
        )}

        <div className="filter-actions intern-management-filter-actions">
          <button className="filter-cancel" type="button" onClick={onReset}>Reset</button>
          <button className="filter-cancel" type="button" onClick={onClose}>Cancel</button>
          <button className="filter-apply" type="button" onClick={onApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}

function AttendanceStatusDropdown({ value, options, onChange, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option === value) ?? options[0];

  return (
    <div
      ref={dropdownRef}
      className={`settings-dropdown settings-dropdown-full intern-management-status-dropdown ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}
    >
      <button
        type="button"
        className="settings-dropdown-trigger"
        onClick={() => {
          if (!disabled) {
            setIsOpen((current) => !current);
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
      >
        <span>{selectedOption}</span>
        <ChevronDown size={18} className="settings-dropdown-chevron" />
      </button>

      <div className="settings-dropdown-menu" role="listbox" aria-hidden={!isOpen}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`settings-dropdown-option ${option === selectedOption ? 'is-selected' : ''}`}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function AttendanceRequestModal({ request, mode, onClose, onSave }) {
  const { resolvedTheme } = useTheme();
  const [draftRequest, setDraftRequest] = useState(request);
  const attendanceModalIcon = getThemeAsset(actionIconMap.attendance, resolvedTheme);

  useEffect(() => {
    setDraftRequest(request);
  }, [request]);

  if (!request || !draftRequest) {
    return null;
  }

  const isReadOnly = mode === 'view';

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div className="intern-management-request-modal" onClick={(event) => event.stopPropagation()}>
        <div className="intern-management-request-title-row">
          <div className="intern-management-request-title">
            <img src={attendanceModalIcon} alt="" aria-hidden="true" />
            <h4>{isReadOnly ? 'Attendance Request' : 'Edit Attendance'}</h4>
          </div>
        </div>

        <div className="intern-management-request-form">
          <label>
            <span>Intern Name</span>
            <input type="text" value={draftRequest.internName} readOnly />
          </label>

          <div className="intern-management-request-grid">
            <label>
              <span>Time In</span>
              <input
                type="text"
                value={draftRequest.timeIn}
                readOnly={isReadOnly}
                onChange={(event) => setDraftRequest((current) => ({ ...current, timeIn: event.target.value }))}
              />
            </label>
            <label>
              <span>Time Out</span>
              <input
                type="text"
                value={draftRequest.timeOut}
                readOnly={isReadOnly}
                onChange={(event) => setDraftRequest((current) => ({ ...current, timeOut: event.target.value }))}
              />
            </label>
          </div>

          <div className="intern-management-request-grid">
            <label>
              <span>Date</span>
              <input
                type="text"
                value={formatDisplayDate(draftRequest.date)}
                readOnly
              />
            </label>
            <label>
              <span>Status</span>
              <AttendanceStatusDropdown
                value={draftRequest.attendanceStatus}
                options={attendanceRequestStatusOptions}
                disabled={isReadOnly}
                onChange={(nextValue) => setDraftRequest((current) => ({ ...current, attendanceStatus: nextValue }))}
              />
            </label>
          </div>

          <label>
            <span>Reason</span>
            <textarea value={draftRequest.reason} readOnly />
          </label>

          <div className="intern-management-supporting-document">
            <span>Supporting Document</span>
            <strong>{draftRequest.supportingDocument}</strong>
          </div>
        </div>

        <div className="intern-management-request-actions">
          {isReadOnly ? (
            <button className="filter-cancel" type="button" onClick={onClose}>Close</button>
          ) : (
            <>
              <button
                className="filter-cancel"
                type="button"
                onClick={() => onSave({ ...draftRequest, workflowStatus: 'Rejected' })}
              >
                Reject
              </button>
              <button
                className="filter-apply"
                type="button"
                onClick={() => onSave({ ...draftRequest, workflowStatus: 'Approved' })}
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InternManagementPage() {
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceSectionRef = useRef(null);
  const requestedTab = getRequestedInternManagementTab(searchParams);
  const requestedSearch = searchParams.get('q') ?? '';
  const requestedScroll = searchParams.get('scroll');
  const requestedFilters = useMemo(
    () => createOverviewFiltersFromSearchParams(searchParams),
    [searchParams],
  );
  const requestedFiltersKey = JSON.stringify(requestedFilters);
  const [activeTab, setActiveTab] = useState(() => {
    if (requestedTab) {
      return requestedTab;
    }

    const storedTab = window.localStorage.getItem(INTERN_MANAGEMENT_ACTIVE_TAB_KEY);

    return internManagementOperationTabs.some((tab) => tab.key === storedTab)
      ? storedTab
      : 'interns';
  });
  const [search, setSearch] = useState(requestedSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncMode, setSyncMode] = useState('Starting live sync');
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [interns, setInterns] = useState(internManagementInterns);
  const [attendanceRequests, setAttendanceRequests] = useState(internAttendanceRequests);
  const [appliedFilters, setAppliedFilters] = useState(requestedFilters);
  const [draftFilters, setDraftFilters] = useState(requestedFilters);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestModalMode, setRequestModalMode] = useState('view');
  const [sortConfig, setSortConfig] = useState(initialSortConfig);
  const [columnWidths, setColumnWidths] = useState({
    interns: initialInternsColumnWidths,
    'attendance-requests': initialAttendanceRequestColumnWidths,
  });
  const [internPendingRemoval, setInternPendingRemoval] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);
  const resizeStateRef = useRef(null);
  const latestSnapshotVersionRef = useRef(0);
  const editIcon = getThemeAsset(actionIconMap.edit, resolvedTheme);
  const filterIcon = getThemeAsset(actionIconMap.filter, resolvedTheme);
  const removeIcon = getThemeAsset(actionIconMap.remove, resolvedTheme);
  const viewIcon = getThemeAsset(actionIconMap.view, resolvedTheme);

  const applySnapshot = (snapshot, label) => {
    if (snapshot.version < latestSnapshotVersionRef.current) {
      return;
    }

    latestSnapshotVersionRef.current = snapshot.version;
    setInterns(snapshot.interns);
    setAttendanceRequests(snapshot.attendanceRequests);
    setLastSyncedAt(snapshot.updatedAt);
    setSyncMode(label);
  };

  const availableDepartments = useMemo(
    () => Array.from(new Set(interns.map((intern) => intern.department))).sort(),
    [interns],
  );

  const availableSupervisors = useMemo(
    () => Array.from(new Set(interns.map((intern) => intern.supervisorName))).sort(),
    [interns],
  );

  const availableRoleTracks = useMemo(
    () => Array.from(new Set(interns.map((intern) => intern.roleTrack))).sort(),
    [interns],
  );

  const availableWorkModes = useMemo(
    () => Array.from(new Set(interns.map((intern) => intern.workMode))).sort(),
    [interns],
  );

  const availableInternshipStatuses = useMemo(
    () => Array.from(new Set(interns.map((intern) => intern.internshipStatus))).sort(),
    [interns],
  );

  const availableOjtProgress = useMemo(
    () => Array.from(new Set(interns.map((intern) => intern.ojtProgress))).sort(),
    [interns],
  );

  const availableDocumentStatuses = useMemo(
    () => Array.from(new Set(interns.map((intern) => intern.documentStatus))).sort(),
    [interns],
  );

  const availableEvaluationStatuses = useMemo(
    () => Array.from(new Set(interns.map((intern) => intern.evaluationStatus))).sort(),
    [interns],
  );

  const availableUniversities = useMemo(
    () => Array.from(new Set(interns.map((intern) => intern.university))).sort(),
    [interns],
  );

  const availableWorkflowStatuses = useMemo(
    () => Array.from(new Set(attendanceRequests.map((request) => request.workflowStatus))).sort(),
    [attendanceRequests],
  );

  const availableRequestDepartments = useMemo(
    () => Array.from(new Set(attendanceRequests.map((request) => request.department))).sort(),
    [attendanceRequests],
  );

  const availableRequestSupervisors = useMemo(
    () => Array.from(new Set(attendanceRequests.map((request) => request.supervisorName))).sort(),
    [attendanceRequests],
  );

  const availableRequestUniversities = useMemo(
    () => Array.from(new Set(attendanceRequests.map((request) => request.university))).sort(),
    [attendanceRequests],
  );

  const availableIssueTypes = useMemo(
    () => Array.from(new Set(attendanceRequests.map((request) => request.issueType))).sort(),
    [attendanceRequests],
  );

  const availableAttendanceStatuses = useMemo(
    () => Array.from(new Set(attendanceRequests.map((request) => request.attendanceStatus))).sort(),
    [attendanceRequests],
  );

  const availableSupportingDocuments = useMemo(
    () => Array.from(new Set(attendanceRequests.map((request) => request.supportingDocument))).sort(),
    [attendanceRequests],
  );

  const activeFilterCount = useMemo(() => {
    if (activeTab === 'interns') {
      return [
        appliedFilters.departments.length,
        appliedFilters.supervisors.length,
        appliedFilters.roleTracks.length,
        appliedFilters.workModes.length,
        appliedFilters.internshipStatuses.length,
        appliedFilters.ojtProgress.length,
        appliedFilters.documentStatuses.length,
        appliedFilters.evaluationStatuses.length,
        appliedFilters.universities.length,
        appliedFilters.startedFrom ? 1 : 0,
        appliedFilters.startedTo ? 1 : 0,
      ].reduce((total, count) => total + count, 0);
    }

    return [
      appliedFilters.requestDepartments.length,
      appliedFilters.requestSupervisors.length,
      appliedFilters.requestUniversities.length,
      appliedFilters.workflowStatuses.length,
      appliedFilters.attendanceStatuses.length,
      appliedFilters.issueTypes.length,
      appliedFilters.supportingDocuments.length,
      appliedFilters.requestedFrom ? 1 : 0,
      appliedFilters.requestedTo ? 1 : 0,
    ].reduce((total, count) => total + count, 0);
  }, [activeTab, appliedFilters]);

  const filteredInterns = useMemo(() => {
    const query = search.trim().toLowerCase();

    return interns.filter((intern) => {
      const matchesSearch = query.length === 0 || [
        intern.name,
        intern.internNumericId,
        intern.university,
        intern.department,
        intern.supervisorName,
        intern.roleTrack,
        intern.workMode,
        intern.internshipStatus,
        intern.ojtProgress,
        intern.documentStatus,
        intern.evaluationStatus,
      ].join(' ').toLowerCase().includes(query);
      const matchesDepartment = appliedFilters.departments.length === 0 || appliedFilters.departments.includes(intern.department);
      const matchesSupervisor = appliedFilters.supervisors.length === 0 || appliedFilters.supervisors.includes(intern.supervisorName);
      const matchesRoleTrack = appliedFilters.roleTracks.length === 0 || appliedFilters.roleTracks.includes(intern.roleTrack);
      const matchesWorkMode = appliedFilters.workModes.length === 0 || appliedFilters.workModes.includes(intern.workMode);
      const matchesInternshipStatus = appliedFilters.internshipStatuses.length === 0 || appliedFilters.internshipStatuses.includes(intern.internshipStatus);
      const matchesOjtProgress = appliedFilters.ojtProgress.length === 0 || appliedFilters.ojtProgress.includes(intern.ojtProgress);
      const matchesDocumentStatus = appliedFilters.documentStatuses.length === 0 || appliedFilters.documentStatuses.includes(intern.documentStatus);
      const matchesEvaluationStatus = appliedFilters.evaluationStatuses.length === 0 || appliedFilters.evaluationStatuses.includes(intern.evaluationStatus);
      const matchesUniversity = appliedFilters.universities.length === 0 || appliedFilters.universities.includes(intern.university);
      const matchesStartedFrom = !appliedFilters.startedFrom || intern.startedAt >= appliedFilters.startedFrom;
      const matchesStartedTo = !appliedFilters.startedTo || intern.startedAt <= appliedFilters.startedTo;

      return matchesSearch
        && matchesDepartment
        && matchesSupervisor
        && matchesRoleTrack
        && matchesWorkMode
        && matchesInternshipStatus
        && matchesOjtProgress
        && matchesDocumentStatus
        && matchesEvaluationStatus
        && matchesUniversity
        && matchesStartedFrom
        && matchesStartedTo;
    });
  }, [appliedFilters.departments, appliedFilters.documentStatuses, appliedFilters.evaluationStatuses, appliedFilters.internshipStatuses, appliedFilters.ojtProgress, appliedFilters.roleTracks, appliedFilters.startedFrom, appliedFilters.startedTo, appliedFilters.supervisors, appliedFilters.universities, appliedFilters.workModes, interns, search]);

  const filteredAttendanceRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return attendanceRequests.filter((request) => {
      const matchesSearch = query.length === 0 || [
        request.internName,
        request.department,
        request.supervisorName,
        request.university,
        request.issueType,
        request.attendanceStatus,
        request.workflowStatus,
        request.supportingDocument,
      ].join(' ').toLowerCase().includes(query);
      const matchesDepartment = appliedFilters.requestDepartments.length === 0 || appliedFilters.requestDepartments.includes(request.department);
      const matchesSupervisor = appliedFilters.requestSupervisors.length === 0 || appliedFilters.requestSupervisors.includes(request.supervisorName);
      const matchesUniversity = appliedFilters.requestUniversities.length === 0 || appliedFilters.requestUniversities.includes(request.university);
      const matchesWorkflowStatus = appliedFilters.workflowStatuses.length === 0 || appliedFilters.workflowStatuses.includes(request.workflowStatus);
      const matchesAttendanceStatus = appliedFilters.attendanceStatuses.length === 0 || appliedFilters.attendanceStatuses.includes(request.attendanceStatus);
      const matchesIssueType = appliedFilters.issueTypes.length === 0 || appliedFilters.issueTypes.includes(request.issueType);
      const matchesSupportingDocument = appliedFilters.supportingDocuments.length === 0 || appliedFilters.supportingDocuments.includes(request.supportingDocument);
      const matchesRequestedFrom = !appliedFilters.requestedFrom || request.requestedAt >= appliedFilters.requestedFrom;
      const matchesRequestedTo = !appliedFilters.requestedTo || request.requestedAt <= appliedFilters.requestedTo;

      return matchesSearch
        && matchesDepartment
        && matchesSupervisor
        && matchesUniversity
        && matchesWorkflowStatus
        && matchesAttendanceStatus
        && matchesIssueType
        && matchesSupportingDocument
        && matchesRequestedFrom
        && matchesRequestedTo;
    });
  }, [appliedFilters.attendanceStatuses, appliedFilters.issueTypes, appliedFilters.requestDepartments, appliedFilters.requestSupervisors, appliedFilters.requestUniversities, appliedFilters.requestedFrom, appliedFilters.requestedTo, appliedFilters.supportingDocuments, appliedFilters.workflowStatuses, attendanceRequests, search]);

  const activeRows = activeTab === 'interns' ? filteredInterns : filteredAttendanceRequests;
  const sortedRows = useMemo(() => {
    const nextRows = [...activeRows];
    const currentSortConfig = sortConfig[activeTab];

    nextRows.sort((leftRow, rightRow) => {
      const result = compareSortValues(
        getSortValue(leftRow, currentSortConfig.key, activeTab),
        getSortValue(rightRow, currentSortConfig.key, activeTab),
      );

      if (result !== 0) {
        return currentSortConfig.direction === 'asc' ? result : -result;
      }

      return leftRow.id.localeCompare(rightRow.id, undefined, { numeric: true, sensitivity: 'base' });
    });

    return nextRows;
  }, [activeRows, activeTab, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / INTERN_MANAGEMENT_PAGE_SIZE));
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * INTERN_MANAGEMENT_PAGE_SIZE,
    currentPage * INTERN_MANAGEMENT_PAGE_SIZE,
  );
  const emptyRowCount = sortedRows.length > 0
    ? Math.max(0, INTERN_MANAGEMENT_PAGE_SIZE - paginatedRows.length)
    : 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, appliedFilters, search, sortConfig]);

  useEffect(() => {
    const nextTab = requestedTab ?? (() => {
      const storedTab = window.localStorage.getItem(INTERN_MANAGEMENT_ACTIVE_TAB_KEY);

      return internManagementOperationTabs.some((tab) => tab.key === storedTab)
        ? storedTab
        : 'interns';
    })();

    if (nextTab !== activeTab) {
      setActiveTab(nextTab);
    }

    if (requestedSearch !== search) {
      setSearch(requestedSearch);
    }

    if (JSON.stringify(appliedFilters) !== requestedFiltersKey) {
      setAppliedFilters(requestedFilters);
      setDraftFilters(requestedFilters);
    }
  }, [requestedFilters, requestedFiltersKey, requestedSearch, requestedTab]);

  useEffect(() => {
    let isActive = true;

    fetchInternManagementSnapshot().then((snapshot) => {
      if (isActive) {
        applySnapshot(snapshot, 'Live sync connected');
      }
    });

    const unsubscribe = subscribeInternManagementUpdates((snapshot) => {
      if (isActive) {
        applySnapshot(snapshot, 'Live update received');
      }
    });

    const pollIntervalId = window.setInterval(() => {
      fetchInternManagementSnapshot().then((snapshot) => {
        if (isActive) {
          applySnapshot(snapshot, 'Auto-refresh synced');
        }
      });
    }, INTERN_MANAGEMENT_POLL_INTERVAL_MS);

    return () => {
      isActive = false;
      unsubscribe();
      window.clearInterval(pollIntervalId);
    };
  }, []);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    window.localStorage.setItem(INTERN_MANAGEMENT_ACTIVE_TAB_KEY, activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (requestedScroll !== 'workspace' || !workspaceSectionRef.current) {
      return;
    }

    if (requestedTab && requestedTab !== activeTab) {
      return;
    }

    const targetY = Math.max(
      workspaceSectionRef.current.getBoundingClientRect().top + window.scrollY - 24,
      0,
    );

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('scroll');
    setSearchParams(nextSearchParams, { replace: true });
  }, [activeTab, requestedScroll, requestedTab, searchParams, setSearchParams]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!resizeStateRef.current) {
        return;
      }

      const { tabKey, columnKey, startX, startWidth, minWidth } = resizeStateRef.current;
      const nextWidth = Math.max(minWidth, startWidth + (event.clientX - startX));

      setColumnWidths((current) => {
        if (current[tabKey][columnKey] === nextWidth) {
          return current;
        }

        return {
          ...current,
          [tabKey]: {
            ...current[tabKey],
            [columnKey]: nextWidth,
          },
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

  useEffect(() => {
    if (!actionFeedback?.message || typeof window === 'undefined') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setActionFeedback(null);
    }, INTERN_MANAGEMENT_ACTION_FEEDBACK_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [actionFeedback]);

  const handleToggleFilterValue = (groupKey, option) => {
    setDraftFilters((current) => ({
      ...current,
      [groupKey]: current[groupKey].includes(option)
        ? current[groupKey].filter((value) => value !== option)
        : [...current[groupKey], option],
    }));
  };

  const handleResetFilters = () => {
    setDraftFilters(initialOverviewFilters);
    setAppliedFilters(initialOverviewFilters);
    setIsFilterOpen(false);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    setIsFilterOpen(false);
  };

  const handleFilterDateChange = (field, value) => {
    setDraftFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openRequestModal = (request, mode) => {
    setSelectedRequest(request);
    setRequestModalMode(mode);
  };

  const handleSaveRequest = async (nextRequest) => {
    const snapshot = await updateInternManagementAttendanceRequest(nextRequest);
    applySnapshot(snapshot, 'Attendance request updated');
    setSelectedRequest(null);
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);

    try {
      const snapshot = await refreshInternManagementSnapshot();
      applySnapshot(snapshot, 'Manual refresh complete');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRemoveIntern = (intern) => {
    setInternPendingRemoval(intern);
  };

  const handleConfirmRemoveIntern = async () => {
    if (!internPendingRemoval) {
      return;
    }

    try {
      const removedInternName = internPendingRemoval.name;
      const snapshot = await removeInternManagementIntern(internPendingRemoval.id);
      setInternPendingRemoval(null);
      applySnapshot(snapshot, 'Intern removed');
      setActionFeedback({
        tone: 'success',
        message: `${removedInternName} was removed from the interns list.`,
      });
    } catch {
      setInternPendingRemoval(null);
      setActionFeedback({
        tone: 'error',
        message: 'We could not remove the intern right now. Please try again.',
      });
    }
  };

  const syncIndicator = getSyncIndicatorState(syncMode, isRefreshing);
  const SyncIndicatorIcon = syncIndicator.icon;
  const syncTooltip = `${syncIndicator.label} • Updated ${formatSyncTime(lastSyncedAt)}`;
  const activeTableColumns = activeTab === 'interns' ? internsTableColumns : attendanceRequestsTableColumns;
  const activeTableWidth = activeTableColumns.reduce(
    (total, column) => total + columnWidths[activeTab][column.key],
    0,
  );

  const handleResizeStart = (event, columnKey, minWidth) => {
    event.preventDefault();
    event.stopPropagation();

    resizeStateRef.current = {
      tabKey: activeTab,
      columnKey,
      startX: event.clientX,
      startWidth: columnWidths[activeTab][columnKey],
      minWidth,
    };

    document.body.style.cursor = 'col-resize';
    document.body.classList.add('document-vault-is-resizing');
  };

  const handleSort = (columnKey) => {
    setSortConfig((current) => {
      const currentTabSort = current[activeTab];

      if (currentTabSort.key === columnKey) {
        return {
          ...current,
          [activeTab]: {
            key: columnKey,
            direction: currentTabSort.direction === 'asc' ? 'desc' : 'asc',
          },
        };
      }

      return {
        ...current,
        [activeTab]: {
          key: columnKey,
          direction: 'asc',
        },
      };
    });
  };

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* layout handled by parent */}</aside>
      <main className="main-content intern-management-page-content">
        <div className="header-row">
          <div>
            <h2>Operations</h2>
            <span className="subtitle">Daily Workflow &amp; Tracking</span>
          </div>
          <NotificationIcon />
        </div>

        <div className="intern-management-toolbar">
          <div className="intern-management-search-shell">
            <Search size={18} className="intern-management-search-icon" />
            <SearchBar value={search} onChange={setSearch} placeholder="Search" />
          </div>
          <div className="document-vault-toolbar-actions intern-management-toolbar-actions">
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
            <button
              type="button"
              className="filter-btn intern-management-toolbar-filter"
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

        <ActionFeedbackBanner feedback={actionFeedback} />

        <section ref={workspaceSectionRef} className="intern-management-card">
          <div className="intern-management-overview-tabs" role="tablist" aria-label="Intern management overview tabs">
            {internManagementOperationTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                className={`intern-management-overview-tab ${activeTab === tab.key ? 'is-active' : ''}`}
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
              >
                <img src={operationTabIcons[tab.key]} alt="" aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="document-vault-table-shell intern-management-table-shell">
            <div className="document-vault-table-scroll intern-management-table-scroll">
              <table className="document-vault-table intern-management-table" style={{ minWidth: `${activeTableWidth}px` }}>
                <colgroup>
                  {activeTableColumns.map((column) => (
                    <col
                      key={`${activeTab}-column-${column.key}`}
                      style={{ width: `${columnWidths[activeTab][column.key]}px` }}
                    />
                  ))}
                </colgroup>
                <thead>
                  {activeTab === 'interns' ? (
                    <tr>
                      {internsTableColumns.map((column) => (
                        <th
                          key={column.key}
                          aria-sort={
                            column.sortable
                              ? sortConfig.interns.key === column.key
                                ? sortConfig.interns.direction === 'asc'
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
                                className={`document-vault-sort-button ${sortConfig.interns.key === column.key ? 'is-active' : ''}`}
                                onClick={() => handleSort(column.key)}
                                aria-label={`Sort by ${column.label} ${sortConfig.interns.key === column.key && sortConfig.interns.direction === 'asc' ? 'descending' : 'ascending'}`}
                              >
                                <span className="document-vault-header-text">{column.label}</span>
                                {React.createElement(getHeaderSortIcon(column.key, sortConfig.interns), {
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
                  ) : (
                    <tr>
                      {attendanceRequestsTableColumns.map((column) => (
                        <th
                          key={column.key}
                          aria-sort={
                            column.sortable
                              ? sortConfig['attendance-requests'].key === column.key
                                ? sortConfig['attendance-requests'].direction === 'asc'
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
                                className={`document-vault-sort-button ${sortConfig['attendance-requests'].key === column.key ? 'is-active' : ''}`}
                                onClick={() => handleSort(column.key)}
                                aria-label={`Sort by ${column.label} ${sortConfig['attendance-requests'].key === column.key && sortConfig['attendance-requests'].direction === 'asc' ? 'descending' : 'ascending'}`}
                              >
                                <span className="document-vault-header-text">{column.label}</span>
                                {React.createElement(getHeaderSortIcon(column.key, sortConfig['attendance-requests']), {
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
                  )}
                </thead>
                <tbody>
                  {paginatedRows.length > 0 ? (
                    <>
                      {activeTab === 'interns' ? paginatedRows.map((intern) => (
                        <tr key={intern.id}>
                          <td className="intern-management-cell-name">
                            <div className="document-vault-person-cell document-vault-person-cell-with-avatar intern-management-person-cell-with-avatar">
                              <EmployeeAvatar
                                src={intern.avatar}
                                alt={intern.name}
                                name={intern.name}
                                size={30}
                                className="document-vault-person-avatar"
                              />
                              <span title={intern.name}>{intern.name}</span>
                            </div>
                          </td>
                          <td className="intern-management-cell-id">{intern.internNumericId}</td>
                          <td className="intern-management-cell-university">{intern.university}</td>
                          <td className="intern-management-cell-department">{intern.department}</td>
                          <td className="intern-management-cell-date">{intern.startedAtLabel}</td>
                          <td className="intern-management-cell-action">
                            <div className="document-vault-actions intern-management-row-actions">
                              <button
                                type="button"
                                className="document-vault-action-button intern-management-icon-button"
                                onClick={() => navigate(`/hr-staff/intern-management/intern/${intern.slug}/profile`)}
                                aria-label={`View ${intern.name}`}
                              >
                                <img src={viewIcon} alt="" aria-hidden="true" className="intern-management-action-icon" />
                              </button>
                              <button
                                type="button"
                                className="document-vault-action-button intern-management-icon-button"
                                onClick={() => handleRemoveIntern(intern)}
                                aria-label={`Remove ${intern.name}`}
                              >
                                <img src={removeIcon} alt="" aria-hidden="true" className="intern-management-action-icon" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : paginatedRows.map((request) => (
                        <tr key={request.id}>
                          <td className="intern-management-cell-name">
                            <div className="document-vault-person-cell document-vault-person-cell-with-avatar intern-management-person-cell-with-avatar">
                              <EmployeeAvatar
                                src={request.internAvatar}
                                alt={request.internName}
                                name={request.internName}
                                size={30}
                                className="document-vault-person-avatar"
                              />
                              <span title={request.internName}>{request.internName}</span>
                            </div>
                          </td>
                          <td className="intern-management-cell-date">{request.dateLabel}</td>
                          <td className="intern-management-cell-issue-type">{request.issueType}</td>
                          <td className="intern-management-cell-date">{request.requestedAtLabel}</td>
                          <td className="intern-management-cell-status">
                            <span className={`intern-management-status-pill is-${request.workflowStatus.toLowerCase()}`}>
                              {request.workflowStatus}
                            </span>
                          </td>
                          <td className="intern-management-cell-action">
                            <div className="document-vault-actions intern-management-row-actions">
                              <button
                                type="button"
                                className="document-vault-action-button intern-management-icon-button"
                                onClick={() => openRequestModal(request, 'view')}
                                aria-label={`View ${request.internName} attendance request`}
                              >
                                <img src={viewIcon} alt="" aria-hidden="true" className="intern-management-action-icon" />
                              </button>
                              <button
                                type="button"
                                className="document-vault-action-button intern-management-icon-button"
                                onClick={() => openRequestModal(request, 'edit')}
                                aria-label={`Edit ${request.internName} attendance request`}
                              >
                                <img src={editIcon} alt="" aria-hidden="true" className="intern-management-action-icon" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {Array.from({ length: emptyRowCount }, (_, index) => (
                        <tr key={`overview-placeholder-${index}`} className="intern-management-placeholder-row" aria-hidden="true">
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
                      <td colSpan="6">
                        <div className="intern-management-empty-state">
                          No records match the current search and filter settings.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="intern-management-pagination-slot">
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

        <OverviewFilterModal
          isOpen={isFilterOpen}
          activeTab={activeTab}
          draftFilters={draftFilters}
          availableDepartments={availableDepartments}
          availableSupervisors={availableSupervisors}
          availableRoleTracks={availableRoleTracks}
          availableWorkModes={availableWorkModes}
          availableInternshipStatuses={availableInternshipStatuses}
          availableOjtProgress={availableOjtProgress}
          availableDocumentStatuses={availableDocumentStatuses}
          availableEvaluationStatuses={availableEvaluationStatuses}
          availableUniversities={availableUniversities}
          availableWorkflowStatuses={availableWorkflowStatuses}
          availableIssueTypes={availableIssueTypes}
          availableRequestDepartments={availableRequestDepartments}
          availableRequestSupervisors={availableRequestSupervisors}
          availableRequestUniversities={availableRequestUniversities}
          availableAttendanceStatuses={availableAttendanceStatuses}
          availableSupportingDocuments={availableSupportingDocuments}
          onToggleValue={handleToggleFilterValue}
          onDateChange={handleFilterDateChange}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          onClose={() => {
            setDraftFilters(appliedFilters);
            setIsFilterOpen(false);
          }}
        />

        <AttendanceRequestModal
          request={selectedRequest}
          mode={requestModalMode}
          onClose={() => setSelectedRequest(null)}
          onSave={handleSaveRequest}
        />

        <ConfirmationModal
          isOpen={Boolean(internPendingRemoval)}
          title="Remove Intern?"
          message={internPendingRemoval ? `Remove ${internPendingRemoval.name} from the interns list? This updates the current intern management snapshot immediately.` : ''}
          confirmLabel="Remove Intern"
          tone="danger"
          onClose={() => setInternPendingRemoval(null)}
          onConfirm={handleConfirmRemoveIntern}
        />
      </main>
    </div>
  );
}