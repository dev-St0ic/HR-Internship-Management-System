export default function FilterCheckboxSection({ groupKey, label, options, selectedValues, onToggleValue }) {
  return (
    <section className="filter-section document-vault-filter-card">
      <label>{label}</label>
      <div className="filter-options document-vault-filter-options-grid">
        {options.map((option) => {
          const inputId = `${groupKey}-${option.value.replace(/\s+/g, '-').toLowerCase()}`;
          return <label key={option.value} className={`filter-option ${option.isDisabled ? 'is-disabled' : ''}`} htmlFor={inputId} data-tooltip={option.tooltip ?? ''} title={option.tooltip ?? ''}><input id={inputId} type="checkbox" checked={selectedValues.includes(option.value)} onChange={() => !option.isDisabled && onToggleValue(groupKey, option.value)} disabled={option.isDisabled} /><span>{option.label}</span></label>;
        })}
      </div>
    </section>
  );
}