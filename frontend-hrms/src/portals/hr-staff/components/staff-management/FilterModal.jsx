import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

const FilterModal = ({
  title = 'Filter',
  sections = [],
  draftFilters,
  onToggleValue,
  onApply,
  onReset,
  onClose,
}) => {
  const [sectionSearch, setSectionSearch] = useState({});
  const selectedCount = sections.reduce(
    (total, section) => total + draftFilters[section.key].length,
    0,
  );

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div className="filter-modal staff-detail-filter-modal" onClick={(event) => event.stopPropagation()}>
        <div className="staff-detail-filter-header">
          <div>
            <div className="staff-detail-filter-title-row">
              <h4>{title}</h4>
              <span className="staff-detail-filter-badge">{selectedCount} selected</span>
            </div>
            <p>Refine the visible records using the available categories.</p>
          </div>
        </div>
        <div className="staff-detail-filter-grid">
          {sections.map((section) => (
            <div
              key={section.key}
              className={`filter-section staff-detail-filter-section ${section.wide ? 'is-wide' : ''}`}
            >
              <div className="staff-detail-filter-section-header">
                <label>{section.label}</label>
                <span className="staff-detail-filter-section-count">{draftFilters[section.key].length}</span>
              </div>
              {section.options.length > 5 && (
                <label className="staff-detail-filter-search-field">
                  <Search size={15} strokeWidth={2.1} />
                  <input
                    type="text"
                    value={sectionSearch[section.key] ?? ''}
                    onChange={(event) => setSectionSearch((current) => ({
                      ...current,
                      [section.key]: event.target.value,
                    }))}
                    placeholder={`Search ${section.label.toLowerCase()}`}
                  />
                </label>
              )}
              <div
                className={`filter-options staff-detail-filter-options ${section.options.length > 5 ? 'is-scrollable' : ''} ${section.wide && section.options.length > 6 ? 'is-two-column' : ''}`}
              >
            {section.options
              .map((option) => {
                const optionValue = typeof option === 'string' ? option : option.value;
                const optionLabel = typeof option === 'string' ? option : option.label;

                return { optionValue, optionLabel };
              })
              .sort((left, right) => left.optionLabel.localeCompare(right.optionLabel, undefined, { sensitivity: 'base', numeric: true }))
              .filter((option) => option.optionLabel.toLowerCase().includes((sectionSearch[section.key] ?? '').trim().toLowerCase()))
              .map(({ optionValue, optionLabel }) => {
                const optionId = `${section.key}-${optionValue}`.replace(/\s+/g, '-').toLowerCase();

                return (
                  <div key={optionValue} className="filter-option staff-detail-filter-option">
                    <input
                      type="checkbox"
                      id={optionId}
                      checked={draftFilters[section.key].includes(optionValue)}
                      onChange={() => onToggleValue(section.key, optionValue)}
                    />
                    <label htmlFor={optionId}>{optionLabel}</label>
                  </div>
                );
              })}
              </div>
            </div>
          ))}
        </div>
        <div className="filter-actions staff-detail-filter-actions">
          <button className="filter-cancel" type="button" onClick={onReset}>Reset</button>
          <button className="filter-cancel" type="button" onClick={onClose}>Cancel</button>
          <button className="filter-apply" type="button" onClick={onApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
