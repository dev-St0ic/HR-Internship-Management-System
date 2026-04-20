import { Search } from 'lucide-react';

import SearchBar from '../staff-management/SearchBar';

export default function RecruitmentToolbar({ search, setSearch, activeTab, tabCounts, tabSearchPlaceholders }) {
  return <div className="recruitment-toolbar"><div className="recruitment-search-shell"><Search size={18} className="recruitment-search-icon" /><SearchBar value={search} onChange={setSearch} placeholder={tabSearchPlaceholders[activeTab]} /></div><div className="recruitment-toolbar-summary"><span className="recruitment-toolbar-summary-label">View total</span><strong>{tabCounts[activeTab]}</strong></div></div>;
}