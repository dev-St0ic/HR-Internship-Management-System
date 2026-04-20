import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { initialVaultFilters } from './constants';
import { createVaultFiltersFromSearchParams, getRequestedSection, getSectionTabs } from './searchParams';

export function useDocumentVaultQueryState() {
  const [searchParams] = useSearchParams();
  const sectionTabs = getSectionTabs();
  const requestedSection = getRequestedSection(searchParams);
  const requestedSearch = searchParams.get('q') ?? '';
  const requestedFilters = useMemo(() => createVaultFiltersFromSearchParams(searchParams), [searchParams]);
  const requestedFiltersKey = JSON.stringify(requestedFilters);
  const [activeSection, setActiveSection] = useState(requestedSection);
  const [search, setSearch] = useState(requestedSearch);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(requestedFilters);
  const [draftFilters, setDraftFilters] = useState(requestedFilters);

  useEffect(() => {
    if (requestedSection !== activeSection) setActiveSection(requestedSection);
    if (requestedSearch !== search) setSearch(requestedSearch);
    if (JSON.stringify(appliedFilters) !== requestedFiltersKey) { setAppliedFilters(requestedFilters); setDraftFilters(requestedFilters); }
  }, [requestedFilters, requestedFiltersKey, requestedSearch, requestedSection]);

  return {
    sectionTabs,
    activeSection,
    search,
    isFilterOpen,
    appliedFilters,
    draftFilters,
    setSearch,
    openFilters: () => { setDraftFilters(appliedFilters); setIsFilterOpen(true); },
    closeFilters: () => { setDraftFilters(appliedFilters); setIsFilterOpen(false); },
    handleToggleFilterValue: (groupKey, option) => setDraftFilters((current) => ({ ...current, [groupKey]: current[groupKey].includes(option) ? current[groupKey].filter((value) => value !== option) : [...current[groupKey], option] })),
    handleFilterDateChange: (field, value) => setDraftFilters((current) => ({ ...current, [field]: value })),
    handleApplyFilters: () => { setAppliedFilters(draftFilters); setIsFilterOpen(false); },
    handleResetFilters: () => { setDraftFilters(initialVaultFilters); setAppliedFilters(initialVaultFilters); setIsFilterOpen(false); },
    handleSectionChange: (sectionKey) => { setActiveSection(sectionKey); setSearch(''); setAppliedFilters(initialVaultFilters); setDraftFilters(initialVaultFilters); },
  };
}