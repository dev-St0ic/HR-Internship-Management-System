import FilterDateSection from './FilterDateSection';
import FilterSection from './FilterSection';
import { getOverviewFilterGroups, getSelectedFilterCount } from './groups';

export default function OverviewFilterModal({ isOpen, activeTab, draftFilters, options, onToggleValue, onDateChange, onApply, onReset, onClose }) {
  if (!isOpen) return null;
  const groups = getOverviewFilterGroups(activeTab, options);
  const selectedFilterCount = getSelectedFilterCount(activeTab, draftFilters, groups);
  return (
    <div className="filter-modal-overlay" onClick={onClose}><div className="filter-modal intern-management-filter-modal" onClick={(event) => event.stopPropagation()}><div className="intern-management-filter-header"><div><div className="intern-management-filter-title-row"><h4>Filter {activeTab === 'interns' ? 'Interns' : 'Attendance Requests'}</h4><span className="intern-management-filter-badge">{selectedFilterCount} selected</span></div><p>Refine the visible records using the available categories for this tab.</p></div></div><div className="intern-management-filter-grid">{groups.map((group) => <FilterSection key={group.key} group={group} draftFilters={draftFilters} onToggleValue={onToggleValue} />)}</div>{activeTab === 'interns' ? <FilterDateSection label="Start Date Range" count={(draftFilters.startedFrom ? 1 : 0) + (draftFilters.startedTo ? 1 : 0)} fromField="startedFrom" toField="startedTo" fromValue={draftFilters.startedFrom} toValue={draftFilters.startedTo} onDateChange={onDateChange} /> : <FilterDateSection label="Request Date Range" count={(draftFilters.requestedFrom ? 1 : 0) + (draftFilters.requestedTo ? 1 : 0)} fromField="requestedFrom" toField="requestedTo" fromValue={draftFilters.requestedFrom} toValue={draftFilters.requestedTo} onDateChange={onDateChange} />}<div className="filter-actions intern-management-filter-actions"><button className="filter-cancel" type="button" onClick={onReset}>Reset</button><button className="filter-cancel" type="button" onClick={onClose}>Cancel</button><button className="filter-apply" type="button" onClick={onApply}>Apply</button></div></div></div>
  );
}