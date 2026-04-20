export default function FilterDateSection({ label, fromValue, toValue, fromField, toField, onDateChange }) {
  return (
    <section className="filter-section document-vault-filter-card">
      <label>{label}</label>
      <div className="document-vault-date-grid">
        <label className="document-vault-date-field"><span>From</span><input type="date" value={fromValue} onChange={(event) => onDateChange(fromField, event.target.value)} /></label>
        <label className="document-vault-date-field"><span>To</span><input type="date" value={toValue} onChange={(event) => onDateChange(toField, event.target.value)} /></label>
      </div>
    </section>
  );
}