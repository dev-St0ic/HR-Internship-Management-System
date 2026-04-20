import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DepartmentEmployeesTable from '../../components/staff-management/DepartmentEmployeesTable';
import DetailPageHeader from '../../components/staff-management/DetailPageHeader';
import DetailSearchToolbar from '../../components/staff-management/DetailSearchToolbar';
import FilterModal from '../../components/staff-management/FilterModal';
import PaginationControls from '../../components/staff-management/PaginationControls';
import { actionIconMap, getThemeAsset } from '../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../common/theme/ThemeProvider';
import { staffManagementDepartments } from '../../data/staffManagementData';
import { getInternLoadLabel, initialDepartmentFilters, ITEMS_PER_PAGE } from '../../utils/staff-management/detailPageHelpers';
import { useFilterState } from '../../utils/staff-management/useFilterState';

const DepartmentDetailPage = () => {
  const { resolvedTheme } = useTheme();
  const { departmentId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page'));
  const pageFromQuery = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(pageFromQuery);
  const { appliedFilters, closeFilters, draftFilters, filterOpen, handleApplyFilters, handleResetFilters, handleToggleFilterValue, openFilters } = useFilterState(initialDepartmentFilters);
  const navigate = useNavigate();
  const filterIcon = getThemeAsset(actionIconMap.filter, resolvedTheme === 'dark' ? 'light' : resolvedTheme);
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

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* ... Side menu ... */}</aside>
      <main className="main-content detail-page-content">
        <DetailPageHeader title={department?.name || `Department ${departmentId}`} breadcrumbs={[{ label: 'Staff Management', to: '/hr-staff/staff-management' }, { label: department?.name || `Department ${departmentId}` }]} />
        <DetailSearchToolbar search={search} setSearch={setSearch} filterIcon={filterIcon} onOpenFilters={openFilters} />
        <section className="table-section"><div className="table-shell"><DepartmentEmployeesTable employees={paginatedEmployees} emptyRowCount={emptyRowCount} onEditEmployee={(employeeIdValue) => navigate(`/hr-staff/staff-management/department/${departmentId}/employee/${employeeIdValue}?page=${currentPage}`)} /></div>{totalPages > 1 ? <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> : null}</section>
        {filterOpen ? <FilterModal title="Filter Employees" sections={filterSections} draftFilters={draftFilters} onToggleValue={handleToggleFilterValue} onApply={handleApplyFilters} onReset={handleResetFilters} onClose={closeFilters} /> : null}
      </main>
    </div>
  );
};

export default DepartmentDetailPage;
