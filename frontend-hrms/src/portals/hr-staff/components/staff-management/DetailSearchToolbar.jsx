import SearchBar from './SearchBar';

export default function DetailSearchToolbar({ search, setSearch, filterIcon, onOpenFilters, addLabel }) {
  return (
    <div className="search-row" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <SearchBar value={search} onChange={setSearch} placeholder="Search" />
      {addLabel ? <button className="add-intern-btn">{addLabel}</button> : null}
      <button className={`filter-btn ${addLabel ? 'filter-btn-wide' : ''}`} onClick={onOpenFilters}>
        <img src={filterIcon} alt="" aria-hidden="true" className="filter-btn-icon" />
        Filter
      </button>
    </div>
  );
}