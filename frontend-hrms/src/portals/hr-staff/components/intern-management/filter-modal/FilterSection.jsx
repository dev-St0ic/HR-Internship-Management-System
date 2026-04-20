import { useState } from 'react';
import { Search } from 'lucide-react';

import { isSearchableFilterGroup } from './groups';

export default function FilterSection({ group, draftFilters, onToggleValue }) {
  const [query, setQuery] = useState('');
  const filteredOptions = group.options.filter((option) => !isSearchableFilterGroup(group.key) || option.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <section className="filter-section intern-management-filter-section"><div className="intern-management-filter-section-header"><label>{group.label}</label><span className="intern-management-filter-section-count">{draftFilters[group.key].length}</span></div>{isSearchableFilterGroup(group.key) ? <label className="intern-management-filter-search-field"><Search size={15} strokeWidth={2.1} /><input type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${group.label.toLowerCase()}`} /></label> : null}<div className="filter-options intern-management-filter-options">{filteredOptions.map((option) => { const inputId = `${group.key}-${option.replace(/\s+/g, '-').toLowerCase()}`; return <label key={option} className="filter-option intern-management-filter-option" htmlFor={inputId}><input id={inputId} type="checkbox" checked={draftFilters[group.key].includes(option)} onChange={() => onToggleValue(group.key, option)} /><span>{option}</span></label>; })}</div></section>
  );
}