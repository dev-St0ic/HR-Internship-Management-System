import FilterCheckboxSection from './FilterCheckboxSection';
import FilterDateSection from './FilterDateSection';

const toOptions = (values) => values.map((value) => ({ value, label: value }));

export default function DocumentVaultFilterModal({ isOpen, statusOptions, availableDepartments, availableHandledBy, availableWorkModes, availableFileTypes, draftFilters, onToggleValue, onDateChange, onApply, onReset, onClose }) {
  if (!isOpen) return null;
  const checkboxGroups = [{ key: 'statuses', label: 'Status', options: statusOptions }, { key: 'departments', label: 'Department', options: toOptions(availableDepartments) }, { key: 'handledBy', label: 'Handled by HR Staff', options: toOptions(availableHandledBy) }, { key: 'workModes', label: 'Work Mode', options: toOptions(availableWorkModes) }, { key: 'fileTypes', label: 'File Type', options: toOptions(availableFileTypes) }];

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div className="filter-modal document-vault-filter-modal" onClick={(event) => event.stopPropagation()}>
        <div className="document-vault-filter-header"><div><h4>Filter Documents</h4><p>Refine the current document section using table-specific fields.</p></div></div>
        <div className="document-vault-filter-card-grid">{checkboxGroups.map((group) => <FilterCheckboxSection key={group.key} groupKey={group.key} label={group.label} options={group.options} selectedValues={draftFilters[group.key]} onToggleValue={onToggleValue} />)}</div>
        <div className="document-vault-filter-date-sections">
          <FilterDateSection label="Date Assigned" fromValue={draftFilters.assignedFrom} toValue={draftFilters.assignedTo} fromField="assignedFrom" toField="assignedTo" onDateChange={onDateChange} />
          <FilterDateSection label="Date Uploaded" fromValue={draftFilters.uploadedFrom} toValue={draftFilters.uploadedTo} fromField="uploadedFrom" toField="uploadedTo" onDateChange={onDateChange} />
        </div>
        <div className="filter-actions document-vault-filter-actions"><button className="filter-cancel" type="button" onClick={onReset}>Reset</button><button className="filter-cancel" type="button" onClick={onClose}>Cancel</button><button className="filter-apply" type="button" onClick={onApply}>Apply</button></div>
      </div>
    </div>
  );
}