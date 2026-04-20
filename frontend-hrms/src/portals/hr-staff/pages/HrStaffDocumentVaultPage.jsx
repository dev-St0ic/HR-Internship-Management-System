import PaginationControls from '../components/staff-management/PaginationControls';
import DocumentVaultFilterModal from '../components/document-vault/filter-modal/DocumentVaultFilterModal';
import DocumentVaultPageHeader from '../components/document-vault/DocumentVaultPageHeader';
import DocumentVaultTable from '../components/document-vault/table/DocumentVaultTable';
import DocumentVaultTabsRow from '../components/document-vault/DocumentVaultTabsRow';
import DocumentVaultToolbar from '../components/document-vault/DocumentVaultToolbar';
import { useDocumentVaultPageState } from '../utils/document-vault/useDocumentVaultPageState';
import '../../../assets/styles/staff-management.css';

export default function HrStaffDocumentVaultPage() {
  const state = useDocumentVaultPageState();

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* layout handled by parent */}</aside>
      <main className="main-content document-vault-page-content">
        <DocumentVaultPageHeader description={state.activeSectionConfig.description} />

        <section className="document-vault-card">
          <DocumentVaultToolbar search={state.search} setSearch={state.setSearch} syncIndicator={state.syncIndicator} syncTooltip={state.syncTooltip} isRefreshing={state.isRefreshing} onRefresh={state.handleManualRefresh} />
          <DocumentVaultTabsRow sectionTabs={state.sectionTabs} activeSection={state.activeSection} vaultRecords={state.vaultRecords} appliedStatusSummary={state.appliedStatusSummary} appliedFilters={state.appliedFilters} filterIcon={state.filterIcon} activeFilterCount={state.activeFilterCount} onSectionChange={state.handleSectionChange} onOpenFilters={state.openFilters} />
          <DocumentVaultTable columnWidths={state.columnWidths} totalTableWidth={state.totalTableWidth} sortConfig={state.sortConfig} paginatedRecords={state.paginatedRecords} emptyRowCount={state.emptyRowCount} downloadIcon={state.downloadIcon} onSort={state.handleSort} onResizeStart={state.handleResizeStart} onOpenPdf={state.handleOpenPdf} />

          <div className="document-vault-pagination-slot">
            {state.totalPages > 1 ? (
              <PaginationControls
                currentPage={state.currentPage}
                totalPages={state.totalPages}
                onPageChange={state.setCurrentPage}
                className="document-vault-pagination-bar"
              />
            ) : (
              <div className="document-vault-pagination-placeholder" aria-hidden="true" />
            )}
          </div>
        </section>
        <DocumentVaultFilterModal
          isOpen={state.isFilterOpen}
          statusOptions={state.statusOptions}
          availableDepartments={state.availableDepartments}
          availableHandledBy={state.availableHandledBy}
          availableWorkModes={state.availableWorkModes}
          availableFileTypes={state.availableFileTypes}
          draftFilters={state.draftFilters}
          onToggleValue={state.handleToggleFilterValue}
          onDateChange={state.handleFilterDateChange}
          onApply={state.handleApplyFilters}
          onReset={state.handleResetFilters}
          onClose={state.closeFilters}
        />
      </main>
    </div>
  );
}