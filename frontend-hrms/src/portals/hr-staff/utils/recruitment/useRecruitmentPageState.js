import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../../../common/theme/ThemeProvider';
import { createRecruitmentPartnerUniversities, recruitmentApplications } from '../../data/recruitmentData';
import { applyRecruitmentOverride } from './applicationOverrides';
import { getApplicationQueues, getFilteredDataByTab, getOverviewMetrics, getTabCounts } from './selectors';
import { PAGE_SIZE_BY_TAB } from './pageConfig';
import { useRecruitmentActions } from './useRecruitmentActions';
import { useRecruitmentMeasurements } from './useRecruitmentMeasurements';
import { useRecruitmentWorkspaceState } from './useRecruitmentWorkspaceState';

export function useRecruitmentPageState() {
  const { resolvedTheme } = useTheme(); const navigate = useNavigate(); const workspaceCardRef = useRef(null);
  const workspaceState = useRecruitmentWorkspaceState(workspaceCardRef); const actionState = useRecruitmentActions();
  const applicationsWithState = useMemo(() => recruitmentApplications.map((application) => applyRecruitmentOverride(application, actionState.applicationOverrides[application.id])), [actionState.applicationOverrides]);
  const applicationQueues = useMemo(() => getApplicationQueues(applicationsWithState), [applicationsWithState]);
  const partnerUniversities = useMemo(() => createRecruitmentPartnerUniversities(applicationsWithState), [applicationsWithState]);
  const filteredDataByTab = useMemo(() => getFilteredDataByTab(applicationQueues, partnerUniversities, workspaceState.search), [applicationQueues, partnerUniversities, workspaceState.search]);
  const tabCounts = useMemo(() => getTabCounts(applicationQueues, partnerUniversities), [applicationQueues, partnerUniversities]);
  const currentItems = filteredDataByTab[workspaceState.activeTab]; const currentPageSize = PAGE_SIZE_BY_TAB[workspaceState.activeTab]; const currentPageCount = Math.max(1, Math.ceil(currentItems.length / currentPageSize)); const currentPage = Math.min(workspaceState.pageByTab[workspaceState.activeTab], currentPageCount); const currentSliceStart = (currentPage - 1) * currentPageSize; const currentPageItems = currentItems.slice(currentSliceStart, currentSliceStart + currentPageSize); const currentPlaceholderCount = currentItems.length === 0 ? 0 : Math.max(0, currentPageSize - currentPageItems.length);
  const { measureLayerRef, currentFixedCardHeight } = useRecruitmentMeasurements(workspaceState.activeTab, currentItems);
  const topPartnerUniversity = partnerUniversities[0] ?? null; const latestApplication = applicationsWithState[0] ?? null; const missingRequirementsCount = applicationsWithState.filter((application) => application.missingDocuments > 0).length;
  const overviewMetrics = useMemo(() => getOverviewMetrics(applicationsWithState, applicationQueues, partnerUniversities, missingRequirementsCount, topPartnerUniversity), [applicationQueues, applicationsWithState, missingRequirementsCount, partnerUniversities, topPartnerUniversity]);

  return { ...workspaceState, ...actionState, resolvedTheme, workspaceCardRef, measureLayerRef, applicationsWithState, applicationQueues, partnerUniversities, tabCounts, currentItems, currentPage, currentPageCount, currentPageItems, currentPlaceholderCount, currentSliceStart, currentFixedCardHeight, topPartnerUniversity, latestApplication, overviewMetrics, onViewProfile: (application) => navigate(`/hr-staff/intern-management/intern/${application.internSlug}/profile`) };
}