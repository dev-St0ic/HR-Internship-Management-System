import { internManagementOperationTabs } from '../../data/internManagementData';
import { initialOverviewFilters } from './constants';

const parseSearchParamList = (searchParams, key) => (searchParams.get(key) ?? '').split(',').map((value) => value.trim()).filter(Boolean);

export function createOverviewFiltersFromSearchParams(searchParams) {
  return { ...initialOverviewFilters, documentStatuses: parseSearchParamList(searchParams, 'documentStatus'), evaluationStatuses: parseSearchParamList(searchParams, 'evaluationStatus'), workflowStatuses: parseSearchParamList(searchParams, 'workflowStatus') };
}

export function getRequestedInternManagementTab(searchParams) {
  const requestedTab = searchParams.get('tab');
  return internManagementOperationTabs.some((tab) => tab.key === requestedTab) ? requestedTab : null;
}