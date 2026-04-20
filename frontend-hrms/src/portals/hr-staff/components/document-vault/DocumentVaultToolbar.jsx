import { RefreshCw } from 'lucide-react';

import SearchBar from '../staff-management/SearchBar';

export default function DocumentVaultToolbar({ search, setSearch, syncIndicator, syncTooltip, isRefreshing, onRefresh }) {
  const SyncIndicatorIcon = syncIndicator.icon;

  return (
    <div className="document-vault-toolbar">
      <SearchBar value={search} onChange={setSearch} placeholder="Search by file, intern, department, or uploader" />
      <div className="document-vault-toolbar-actions">
        <div className="document-vault-sync-indicator" aria-live="polite">
          <button type="button" className={`document-vault-sync-button ${syncIndicator.className}`} aria-label={syncTooltip}><SyncIndicatorIcon size={16} /></button>
          <span className="document-vault-sync-tooltip" role="status">{syncTooltip}</span>
        </div>
        <button type="button" className={`document-vault-refresh-button ${isRefreshing ? 'is-refreshing' : ''}`} onClick={onRefresh} disabled={isRefreshing}>
          <RefreshCw size={15} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>
    </div>
  );
}