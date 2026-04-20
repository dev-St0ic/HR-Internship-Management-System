import { RefreshCw, Search } from 'lucide-react';

import SearchBar from '../staff-management/SearchBar';

export default function InternManagementToolbar({ search, setSearch, syncIndicator, syncTooltip, isRefreshing, onRefresh, filterIcon, activeFilterCount, onOpenFilters }) {
  const SyncIndicatorIcon = syncIndicator.icon;
  return (
    <div className="intern-management-toolbar"><div className="intern-management-search-shell"><Search size={18} className="intern-management-search-icon" /><SearchBar value={search} onChange={setSearch} placeholder="Search" /></div><div className="document-vault-toolbar-actions intern-management-toolbar-actions"><div className="document-vault-sync-indicator" aria-live="polite"><button type="button" className={`document-vault-sync-button ${syncIndicator.className}`} aria-label={syncTooltip}><SyncIndicatorIcon size={16} /></button><span className="document-vault-sync-tooltip" role="status">{syncTooltip}</span></div><button type="button" className={`document-vault-refresh-button ${isRefreshing ? 'is-refreshing' : ''}`} onClick={onRefresh} disabled={isRefreshing}><RefreshCw size={15} /><span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span></button><button type="button" className="filter-btn intern-management-toolbar-filter" onClick={onOpenFilters}><img src={filterIcon} alt="" aria-hidden="true" className="filter-btn-icon" /><span>Filter</span>{activeFilterCount > 0 ? <span className="document-vault-filter-count">{activeFilterCount}</span> : null}</button></div></div>
  );
}