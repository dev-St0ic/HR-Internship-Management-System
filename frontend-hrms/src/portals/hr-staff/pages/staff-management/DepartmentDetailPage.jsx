import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import EmployeeRow from '../../components/staff-management/EmployeeRow';
import SearchBar from '../../components/staff-management/SearchBar';
import NotificationIcon from '../../components/staff-management/NotificationIcon';
import FilterModal from '../../components/staff-management/FilterModal';
import PaginationControls from '../../components/staff-management/PaginationControls';
import { actionIconMap, getThemeAsset } from '../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../common/theme/ThemeProvider';
import { staffManagementDepartments } from '../../data/staffManagementData';

const ITEMS_PER_PAGE = 6;
const initialDepartmentFilters = {
  designations: [],
  workSetups: [],
  internLoads: [],
};

function getInternLoadLabel(internCount) {
  if (internCount >= 4) {
    return '4+ interns';
  }

  if (internCount >= 2) {
    return '2-3 interns';
  }

  return '0-1 intern';
}

const DepartmentDetailPage = () => {
  const { resolvedTheme } = useTheme();
  const { departmentId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page'));
  const pageFromQuery = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageFromQuery);
  const [appliedFilters, setAppliedFilters] = useState(initialDepartmentFilters);
  const [draftFilters, setDraftFilters] = useState(initialDepartmentFilters);
  const navigate = useNavigate();
  const filterIcon = getThemeAsset(actionIconMap.filter, resolvedTheme);
  const department = staffManagementDepartments.find(
    (entry) => String(entry.id) === String(departmentId)
  );
  const employees = department?.employees ?? [];

  const designationOptions = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.designation))).sort(),
    [employees],
  );

  const workSetupOptions = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.type))).sort(),
    [employees],
  );

  const internLoadOptions = ['0-1 intern', '2-3 interns', '4+ interns'];

  const filterSections = useMemo(
    () => [
      { key: 'designations', label: 'Designation', options: designationOptions, wide: true },
      { key: 'workSetups', label: 'Work Setup', options: workSetupOptions },
      { key: 'internLoads', label: 'Intern Load', options: internLoadOptions },
    ],
    [designationOptions, workSetupOptions],
  );

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase())
      || emp.employeeId.toLowerCase().includes(search.toLowerCase())
      || emp.designation.toLowerCase().includes(search.toLowerCase());
    const matchesDesignation = appliedFilters.designations.length === 0 || appliedFilters.designations.includes(emp.designation);
    const matchesWorkSetup = appliedFilters.workSetups.length === 0 || appliedFilters.workSetups.includes(emp.type);
    const matchesInternLoad = appliedFilters.internLoads.length === 0 || appliedFilters.internLoads.includes(getInternLoadLabel(emp.interns.length));

    return matchesSearch && matchesDesignation && matchesWorkSetup && matchesInternLoad;
  });
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE));
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const emptyRowCount = paginatedEmployees.length > 0
    ? Math.max(0, ITEMS_PER_PAGE - paginatedEmployees.length)
    : Math.max(0, ITEMS_PER_PAGE - 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, appliedFilters]);

  useEffect(() => {
    setCurrentPage(pageFromQuery);
  }, [departmentId, pageFromQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (currentPage > 1) {
      setSearchParams({ page: String(currentPage) }, { replace: true });
      return;
    }

    setSearchParams({}, { replace: true });
  }, [currentPage, setSearchParams]);

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
    setDraftFilters(initialDepartmentFilters);
    setAppliedFilters(initialDepartmentFilters);
    setFilterOpen(false);
  };

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* ... Side menu ... */}</aside>
      <main className="main-content detail-page-content">
        <div className="header-row">
          <div>
            <h2>{department?.name || `Department ${departmentId}`}</h2>
            <div className="subtitle">
              <Link className="subtitle-link" to="/hr-staff/staff-management">
                Staff Management
              </Link>
              <span className="subtitle-separator"> &gt; </span>
              <span>
                {department?.name || `Department ${departmentId}`}
              </span>
            </div>
          </div>
          <NotificationIcon />
        </div>
        <div className="search-row" style={{ display: 'flex', gap: 12 }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search" />
          <button className="filter-btn" onClick={() => {
            setDraftFilters(appliedFilters);
            setFilterOpen(true);
          }}>
            <img src={filterIcon} alt="" aria-hidden="true" className="filter-btn-icon" />
            Filter
          </button>
        </div>
        <section className="table-section">
          <div className="table-shell">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Designation</th>
                  <th>Type</th>
                  <th>Number Of Interns</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.length > 0 ? (
                  <>
                    {paginatedEmployees.map(emp => (
                      <EmployeeRow key={emp.id} employee={{ ...emp, interns: emp.interns.length }} onEdit={() => navigate(`/hr-staff/staff-management/department/${departmentId}/employee/${emp.id}?page=${currentPage}`)} />
                    ))}
                    {Array.from({ length: emptyRowCount }, (_, index) => (
                      <tr key={`department-placeholder-${index}`} className="staff-management-placeholder-row" aria-hidden="true">
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
                  <>
                    <tr>
                      <td colSpan="6">
                        <div className="staff-management-empty-state">
                          No employees match the current search and filter settings.
                        </div>
                      </td>
                    </tr>
                    {Array.from({ length: emptyRowCount }, (_, index) => (
                      <tr key={`department-placeholder-${index}`} className="staff-management-placeholder-row" aria-hidden="true">
                        <td>&nbsp;</td>
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
            title="Filter Employees"
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

export default DepartmentDetailPage;
