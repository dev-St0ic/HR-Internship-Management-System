import { allDocumentsSection } from '../../utils/document-vault/constants';

export default function DocumentVaultTabsRow({ sectionTabs, activeSection, vaultRecords, appliedStatusSummary, appliedFilters, filterIcon, activeFilterCount, onSectionChange, onOpenFilters }) {
  return (
    <div className="document-vault-tabs-row">
      <div className="document-vault-tabs" role="tablist" aria-label="Document vault sections">
        {sectionTabs.map((section) => {
          const recordCount = section.key === allDocumentsSection.key ? vaultRecords.length : vaultRecords.filter((record) => record.sectionKey === section.key).length;
          return <button key={section.key} type="button" role="tab" className={`document-vault-tab ${activeSection === section.key ? 'is-active' : ''}`} aria-selected={activeSection === section.key} onClick={() => onSectionChange(section.key)}><span>{section.label}</span><span className="document-vault-tab-count">{recordCount}</span></button>;
        })}
      </div>
      <div className="document-vault-filter-summary-group">
        {appliedStatusSummary && <div className="document-vault-active-summary" title={`Active statuses: ${appliedFilters.statuses.join(', ')}`}><span className="document-vault-active-summary-label">Status:</span><span className="document-vault-active-summary-value">{appliedStatusSummary}</span></div>}
        <button type="button" className="filter-btn document-vault-filter-button" onClick={onOpenFilters}>
          <img src={filterIcon} alt="" aria-hidden="true" className="filter-btn-icon" />
          <span>Filter</span>
          {activeFilterCount > 0 && <span className="document-vault-filter-count">{activeFilterCount}</span>}
        </button>
      </div>
    </div>
  );
}