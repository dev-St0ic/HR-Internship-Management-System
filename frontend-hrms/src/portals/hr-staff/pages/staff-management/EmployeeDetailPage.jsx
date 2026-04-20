import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import InternRow from '../../components/staff-management/InternRow';
import SearchBar from '../../components/staff-management/SearchBar';
import NotificationIcon from '../../components/staff-management/NotificationIcon';
import FilterModal from '../../components/staff-management/FilterModal';
import PaginationControls from '../../components/staff-management/PaginationControls';
import { actionIconMap, getThemeAsset } from '../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../common/theme/ThemeProvider';
import { staffManagementDepartments } from '../../data/staffManagementData';

const ITEMS_PER_PAGE = 6;
const initialInternFilters = {
  assignmentMonths: [],
  ojtHours: [],
  progressStatuses: [],
};

function formatAssignmentMonth(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

function getProgressStatus(intern) {
  const requiredHours = Number(intern.ojtHours);
  const renderedHours = Number(intern.rendered);
  const completionRatio = requiredHours === 0 ? 0 : renderedHours / requiredHours;

  if (completionRatio >= 1) {
    return 'Completed';
  }

  if (completionRatio >= 0.75) {
    return 'Near Completion';
  }

  if (completionRatio > 0) {
    return 'In Progress';
  }

  return 'Not Started';
}


const EmployeeDetailPage = () => {
  const { resolvedTheme } = useTheme();
  const { departmentId, employeeId } = useParams();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState(initialInternFilters);
  const [draftFilters, setDraftFilters] = useState(initialInternFilters);
  const filterIcon = getThemeAsset(actionIconMap.filter, resolvedTheme);

  // Find the department and employee
  const department = staffManagementDepartments.find(dep => String(dep.id) === String(departmentId));
  const employee = department?.employees.find(emp => String(emp.id) === String(employeeId));
  const employeeIndex = department?.employees.findIndex(emp => String(emp.id) === String(employeeId)) ?? -1;
  const employeeDepartmentPage = employeeIndex >= 0 ? Math.floor(employeeIndex / ITEMS_PER_PAGE) + 1 : 1;
  const departmentPageFromQuery = Number(searchParams.get('page'));
  const departmentPage = Number.isInteger(departmentPageFromQuery) && departmentPageFromQuery > 0
    ? departmentPageFromQuery
    : employeeDepartmentPage;
  const interns = employee?.interns || [];
  const assignmentMonthOptions = useMemo(
    () => Array.from(new Set(interns.map((intern) => formatAssignmentMonth(intern.date)))),
    [interns],
  );

  const ojtHourOptions = useMemo(
    () => Array.from(new Set(interns.map((intern) => intern.ojtHours))).sort((left, right) => Number(left) - Number(right)),
    [interns],
  );

  const progressStatusOptions = useMemo(
    () => Array.from(new Set(interns.map((intern) => getProgressStatus(intern)))),
    [interns],
  );

  const filterSections = useMemo(
    () => [
      { key: 'assignmentMonths', label: 'Assignment Month', options: assignmentMonthOptions },
      { key: 'ojtHours', label: 'OJT Hours', options: ojtHourOptions.map((value) => ({ value, label: `${value} hours` })) },
      { key: 'progressStatuses', label: 'Progress Status', options: progressStatusOptions },
    ],
    [assignmentMonthOptions, ojtHourOptions, progressStatusOptions],
  );

  const filteredInterns = interns.filter((intern) => {
    const progressStatus = getProgressStatus(intern);
    const assignmentMonth = formatAssignmentMonth(intern.date);
    const matchesSearch = intern.name.toLowerCase().includes(search.toLowerCase())
      || intern.date.toLowerCase().includes(search.toLowerCase())
      || intern.ojtHours.toLowerCase().includes(search.toLowerCase())
      || intern.rendered.toLowerCase().includes(search.toLowerCase());
    const matchesAssignmentMonth = appliedFilters.assignmentMonths.length === 0 || appliedFilters.assignmentMonths.includes(assignmentMonth);
    const matchesOjtHours = appliedFilters.ojtHours.length === 0 || appliedFilters.ojtHours.includes(intern.ojtHours);
    const matchesProgressStatus = appliedFilters.progressStatuses.length === 0 || appliedFilters.progressStatuses.includes(progressStatus);

    return matchesSearch && matchesAssignmentMonth && matchesOjtHours && matchesProgressStatus;
  });
  const totalPages = Math.max(1, Math.ceil(filteredInterns.length / ITEMS_PER_PAGE));
  const paginatedInterns = filteredInterns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const emptyRowCount = paginatedInterns.length > 0
    ? Math.max(0, ITEMS_PER_PAGE - paginatedInterns.length)
    : Math.max(0, ITEMS_PER_PAGE - 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, departmentId, employeeId, appliedFilters]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleToggleFilterValue = (groupKey, option) => {
    setDraftFilters((current) => ({
      ...current,
      [groupKey]: current[groupKey].includes(option)
        ? current[groupKey].filter((value) => value !== option)
        : [...current[groupKey], option],
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    setFilterOpen(false);
  };

  const handleResetFilters = () => {
    setDraftFilters(initialInternFilters);
    setAppliedFilters(initialInternFilters);
    setFilterOpen(false);
  };

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* ... Side menu ... */}</aside>
      <main className="main-content detail-page-content">
        <div className="header-row">
          <div>
            <h2>{employee ? employee.name : `Employee ${employeeId}`}</h2>
            <div className="subtitle">
              <Link className="subtitle-link" to="/hr-staff/staff-management">
                Staff Management
              </Link>
              <span className="subtitle-separator"> &gt; </span>
              <Link
                className="subtitle-link"
                to={`/hr-staff/staff-management/department/${departmentId}${departmentPage > 1 ? `?page=${departmentPage}` : ''}`}
              >
                {department?.name || `Department ${departmentId}`}
              </Link>
              <span className="subtitle-separator"> &gt; </span>
              <span>
                {employee ? employee.name : `Employee ${employeeId}`}
              </span>
            </div>
          </div>
          <NotificationIcon />
        </div>
        <div className="search-row" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search" />
          <button className="add-intern-btn">+ Add New Intern</button>
           <button className="filter-btn filter-btn-wide" onClick={() => {
            setDraftFilters(appliedFilters);
            setFilterOpen(true);
          }}>
            <img src={filterIcon} alt="" aria-hidden="true" className="filter-btn-icon" />
            Filter
          </button>
        </div>
        <section className="table-section">
          <div className="table-shell">
            <table className="intern-table">
              <thead>
                <tr>
                  <th>Intern Name</th>
                  <th>Date Assigned</th>
                  <th>OJT Hours</th>
                  <th>Hours Rendered</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInterns.length > 0 ? (
                  <>
                    {paginatedInterns.map(intern => (
                      <InternRow key={intern.id} intern={intern} />
                    ))}
                    {Array.from({ length: emptyRowCount }, (_, index) => (
                      <tr key={`employee-placeholder-${index}`} className="staff-management-placeholder-row" aria-hidden="true">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <tr>
                      <td colSpan="5">
                        <div className="staff-management-empty-state">
                          No interns match the current search and filter settings.
                        </div>
                      </td>
                    </tr>
                    {Array.from({ length: emptyRowCount }, (_, index) => (
                      <tr key={`employee-placeholder-${index}`} className="staff-management-placeholder-row" aria-hidden="true">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </section>
        {filterOpen && (
          <FilterModal
            title="Filter Interns"
            sections={filterSections}
            draftFilters={draftFilters}
            onToggleValue={handleToggleFilterValue}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
            onClose={() => setFilterOpen(false)}
          />
        )}
      </main>
    </div>
  );
};

export default EmployeeDetailPage;
