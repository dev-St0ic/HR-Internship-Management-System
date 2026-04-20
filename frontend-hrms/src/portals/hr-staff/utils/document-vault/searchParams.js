import { documentVaultSections } from '../../data/documentVaultData';
import { allDocumentsSection, initialVaultFilters } from './constants';

const parseSearchParamList = (searchParams, key) => (searchParams.get(key) ?? '').split(',').map((value) => value.trim()).filter(Boolean);

export const getSectionTabs = () => [allDocumentsSection, ...documentVaultSections];
export const getRequestedSection = (searchParams) => getSectionTabs().some((section) => section.key === searchParams.get('section')) ? searchParams.get('section') : documentVaultSections[0].key;
export const createVaultFiltersFromSearchParams = (searchParams) => ({ ...initialVaultFilters, statuses: parseSearchParamList(searchParams, 'status') });