import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import DetailPageHeader from '../../components/staff-management/DetailPageHeader';
import DetailSearchToolbar from '../../components/staff-management/DetailSearchToolbar';
import EmployeeInternsTable from '../../components/staff-management/EmployeeInternsTable';
import FilterModal from '../../components/staff-management/FilterModal';
import PaginationControls from '../../components/staff-management/PaginationControls';
import { actionIconMap, getThemeAsset } from '../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../common/theme/ThemeProvider';
import { staffManagementDepartments } from '../../data/staffManagementData';
import { formatAssignmentMonth, getProgressStatus, initialInternFilters, ITEMS_PER_PAGE } from '../../utils/staff-management/detailPageHelpers';
import { useFilterState } from '../../utils/staff-management/useFilterState';
const EmployeeDetailPage = () => {
  const { resolvedTheme } = useTheme();
  const { departmentId, employeeId } = useParams();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { appliedFilters, closeFilters, draftFilters, filterOpen, handleApplyFilters, handleResetFilters, handleToggleFilterValue, openFilters } = useFilterState(initialInternFilters);
  const filterIcon = getThemeAsset(actionIconMap.filter, resolvedTheme === 'dark' ? 'light' : resolvedTheme);

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

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* ... Side menu ... */}</aside>
      <main className="main-content detail-page-content">
        <DetailPageHeader title={employee ? employee.name : `Employee ${employeeId}`} breadcrumbs={[{ label: 'Staff Management', to: '/hr-staff/staff-management' }, { label: department?.name || `Department ${departmentId}`, to: `/hr-staff/staff-management/department/${departmentId}${departmentPage > 1 ? `?page=${departmentPage}` : ''}` }, { label: employee ? employee.name : `Employee ${employeeId}` }]} />
        <DetailSearchToolbar search={search} setSearch={setSearch} filterIcon={filterIcon} onOpenFilters={openFilters} addLabel="+ Add New Intern" />
        <section className="table-section"><div className="table-shell"><EmployeeInternsTable interns={paginatedInterns} emptyRowCount={emptyRowCount} /></div>{totalPages > 1 ? <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> : null}</section>
        {filterOpen ? <FilterModal title="Filter Interns" sections={filterSections} draftFilters={draftFilters} onToggleValue={handleToggleFilterValue} onApply={handleApplyFilters} onReset={handleResetFilters} onClose={closeFilters} /> : null}
      </main>
    </div>
  );
};

export default EmployeeDetailPage;
