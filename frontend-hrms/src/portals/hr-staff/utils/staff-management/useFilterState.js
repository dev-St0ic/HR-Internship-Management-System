import { useState } from 'react';

export function useFilterState(initialFilters) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [draftFilters, setDraftFilters] = useState(initialFilters);

  const handleToggleFilterValue = (groupKey, option) => {
    setDraftFilters((current) => ({
      ...current,
      [groupKey]: current[groupKey].includes(option)
        ? current[groupKey].filter((value) => value !== option)
        : [...current[groupKey], option],
    }));
  };

  return {
    filterOpen,
    appliedFilters,
    draftFilters,
    handleToggleFilterValue,
    closeFilters: () => setFilterOpen(false),
    openFilters: () => { setDraftFilters(appliedFilters); setFilterOpen(true); },
    handleApplyFilters: () => { setAppliedFilters(draftFilters); setFilterOpen(false); },
    handleResetFilters: () => { setDraftFilters(initialFilters); setAppliedFilters(initialFilters); setFilterOpen(false); },
  };
}