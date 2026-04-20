import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { internManagementOperationTabs } from '../../data/internManagementData';
import { INTERN_MANAGEMENT_ACTIVE_TAB_KEY, initialOverviewFilters } from './constants';
import { createOverviewFiltersFromSearchParams, getRequestedInternManagementTab } from './searchParams';

const getStoredTab = () => {
  const storedTab = window.localStorage.getItem(INTERN_MANAGEMENT_ACTIVE_TAB_KEY);
  return internManagementOperationTabs.some((tab) => tab.key === storedTab) ? storedTab : 'interns';
};

export function useInternManagementQueryState(workspaceSectionRef) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = getRequestedInternManagementTab(searchParams);
  const requestedSearch = searchParams.get('q') ?? '';
  const requestedScroll = searchParams.get('scroll');
  const requestedFilters = useMemo(() => createOverviewFiltersFromSearchParams(searchParams), [searchParams]);
  const requestedFiltersKey = JSON.stringify(requestedFilters);
  const [activeTab, setActiveTab] = useState(() => requestedTab ?? getStoredTab());
  const [search, setSearch] = useState(requestedSearch);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(requestedFilters);
  const [draftFilters, setDraftFilters] = useState(requestedFilters);

  useEffect(() => {
    const nextTab = requestedTab ?? getStoredTab();
    if (nextTab !== activeTab) setActiveTab(nextTab);
    if (requestedSearch !== search) setSearch(requestedSearch);
    if (JSON.stringify(appliedFilters) !== requestedFiltersKey) { setAppliedFilters(requestedFilters); setDraftFilters(requestedFilters); }
  }, [requestedFilters, requestedFiltersKey, requestedSearch, requestedTab]);

  useEffect(() => { window.localStorage.setItem(INTERN_MANAGEMENT_ACTIVE_TAB_KEY, activeTab); }, [activeTab]);

  useEffect(() => {
    if (requestedScroll !== 'workspace' || !workspaceSectionRef.current || (requestedTab && requestedTab !== activeTab)) return;
    const targetY = Math.max(workspaceSectionRef.current.getBoundingClientRect().top + window.scrollY - 24, 0);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('scroll');
    setSearchParams(nextSearchParams, { replace: true });
  }, [activeTab, requestedScroll, requestedTab, searchParams, setSearchParams, workspaceSectionRef]);

  const handleToggleFilterValue = (groupKey, option) => setDraftFilters((current) => ({ ...current, [groupKey]: current[groupKey].includes(option) ? current[groupKey].filter((value) => value !== option) : [...current[groupKey], option] }));
  const handleResetFilters = () => { setDraftFilters(initialOverviewFilters); setAppliedFilters(initialOverviewFilters); setIsFilterOpen(false); };
  const handleApplyFilters = () => { setAppliedFilters(draftFilters); setIsFilterOpen(false); };
  const handleFilterDateChange = (field, value) => setDraftFilters((current) => ({ ...current, [field]: value }));
  const openFilters = () => { setDraftFilters(appliedFilters); setIsFilterOpen(true); };
  const closeFilters = () => { setDraftFilters(appliedFilters); setIsFilterOpen(false); };

  return { activeTab, setActiveTab, search, setSearch, isFilterOpen, openFilters, closeFilters, appliedFilters, draftFilters, handleToggleFilterValue, handleResetFilters, handleApplyFilters, handleFilterDateChange };
}