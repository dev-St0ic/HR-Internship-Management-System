import ActionFeedbackBanner from '../components/staff-management/ActionFeedbackBanner';
import AttendanceRequestModal from '../components/intern-management/AttendanceRequestModal';
import ConfirmationModal from '../components/staff-management/ConfirmationModal';
import InternManagementPageHeader from '../components/intern-management/InternManagementPageHeader';
import InternManagementTable from '../components/intern-management/table/InternManagementTable';
import InternManagementTabs from '../components/intern-management/InternManagementTabs';
import InternManagementToolbar from '../components/intern-management/InternManagementToolbar';
import OverviewFilterModal from '../components/intern-management/filter-modal/OverviewFilterModal';
import '../../../assets/styles/staff-management.css';
import '../../../assets/styles/intern-management.css';
import { useInternManagementPageState } from '../utils/intern-management/useInternManagementPageState';

export default function InternManagementPage() {
  const state = useInternManagementPageState();
  const filterOptions = {
    availableDepartments: state.availableDepartments,
    availableSupervisors: state.availableSupervisors,
    availableRoleTracks: state.availableRoleTracks,
    availableWorkModes: state.availableWorkModes,
    availableInternshipStatuses: state.availableInternshipStatuses,
    availableOjtProgress: state.availableOjtProgress,
    availableDocumentStatuses: state.availableDocumentStatuses,
    availableEvaluationStatuses: state.availableEvaluationStatuses,
    availableUniversities: state.availableUniversities,
    availableWorkflowStatuses: state.availableWorkflowStatuses,
    availableIssueTypes: state.availableIssueTypes,
    availableRequestDepartments: state.availableRequestDepartments,
    availableRequestSupervisors: state.availableRequestSupervisors,
    availableRequestUniversities: state.availableRequestUniversities,
    availableAttendanceStatuses: state.availableAttendanceStatuses,
    availableSupportingDocuments: state.availableSupportingDocuments,
  };

  return (
    <div className="staff-management-layout"><aside className="sidebar">{/* layout handled by parent */}</aside><main className="main-content intern-management-page-content"><InternManagementPageHeader /><InternManagementToolbar search={state.search} setSearch={state.setSearch} syncIndicator={state.syncIndicator} syncTooltip={state.syncTooltip} isRefreshing={state.isRefreshing} onRefresh={state.handleManualRefresh} filterIcon={state.filterIcon} activeFilterCount={state.activeFilterCount} onOpenFilters={state.openFilters} /><ActionFeedbackBanner feedback={state.actionFeedback} /><section ref={state.workspaceSectionRef} className="intern-management-card"><InternManagementTabs activeTab={state.activeTab} onSelect={state.setActiveTab} resolvedTheme={state.resolvedTheme} /><InternManagementTable activeTab={state.activeTab} columns={state.activeTableColumns} activeTableWidth={state.activeTableWidth} columnWidths={state.columnWidths} sortConfig={state.sortConfig} rows={state.paginatedRows} emptyRowCount={state.emptyRowCount} totalPages={state.totalPages} currentPage={state.currentPage} onPageChange={state.setCurrentPage} onSort={state.handleSort} onResizeStart={state.handleResizeStart} navigate={state.navigate} onRemoveIntern={state.setInternPendingRemoval} onOpenRequestModal={state.openRequestModal} viewIcon={state.viewIcon} removeIcon={state.removeIcon} editIcon={state.editIcon} /></section><OverviewFilterModal isOpen={state.isFilterOpen} activeTab={state.activeTab} draftFilters={state.draftFilters} options={filterOptions} onToggleValue={state.handleToggleFilterValue} onDateChange={state.handleFilterDateChange} onApply={state.handleApplyFilters} onReset={state.handleResetFilters} onClose={state.closeFilters} /><AttendanceRequestModal request={state.selectedRequest} mode={state.requestModalMode} options={state.attendanceRequestStatusOptions} onClose={() => state.setSelectedRequest(null)} onSave={async (nextRequest) => { await state.handleSaveRequest(nextRequest); state.setSelectedRequest(null); }} /><ConfirmationModal isOpen={Boolean(state.internPendingRemoval)} title="Remove Intern?" message={state.internPendingRemoval ? `Remove ${state.internPendingRemoval.name} from the interns list? This updates the current intern management snapshot immediately.` : ''} confirmLabel="Remove Intern" tone="danger" onClose={() => state.setInternPendingRemoval(null)} onConfirm={state.handleConfirmRemoveIntern} /></main></div>
  );
}