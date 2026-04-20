import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { recruitmentTabs } from '../../data/recruitmentData';
import { initialPages } from './pageConfig';
import { animateVerticalScroll } from './scrollUtils';

const getRequestedTab = (requestedTab) => (recruitmentTabs.some((tab) => tab.key === requestedTab) ? requestedTab : 'applications');

export function useRecruitmentWorkspaceState(workspaceCardRef) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab'); const requestedSearch = searchParams.get('q') ?? ''; const requestedScroll = searchParams.get('scroll');
  const [activeTab, setActiveTab] = useState(getRequestedTab(requestedTab));
  const [search, setSearch] = useState(requestedSearch); const [pageByTab, setPageByTab] = useState(initialPages); const [pendingScrollTab, setPendingScrollTab] = useState(null);
  useEffect(() => { setPageByTab(initialPages); }, [search]);
  useEffect(() => { const nextActiveTab = getRequestedTab(requestedTab); if (nextActiveTab !== activeTab) setActiveTab(nextActiveTab); if (requestedSearch !== search) setSearch(requestedSearch); }, [requestedSearch, requestedTab]);
  useEffect(() => { if (!pendingScrollTab || pendingScrollTab !== activeTab || !workspaceCardRef.current) return; animateVerticalScroll(Math.max(workspaceCardRef.current.getBoundingClientRect().top + window.scrollY - 24, 0)); setPendingScrollTab(null); }, [activeTab, pendingScrollTab, workspaceCardRef]);
  useEffect(() => { if (requestedScroll !== 'workspace' || !workspaceCardRef.current || (requestedTab && requestedTab !== activeTab)) return; animateVerticalScroll(Math.max(workspaceCardRef.current.getBoundingClientRect().top + window.scrollY - 24, 0)); const nextSearchParams = new URLSearchParams(searchParams); nextSearchParams.delete('scroll'); setSearchParams(nextSearchParams, { replace: true }); }, [activeTab, requestedScroll, requestedTab, searchParams, setSearchParams, workspaceCardRef]);

  const selectRecruitmentTab = (tabKey) => {
    setActiveTab(tabKey);
    const nextSearchParams = new URLSearchParams(searchParams);
    tabKey === 'applications' ? nextSearchParams.delete('tab') : nextSearchParams.set('tab', tabKey);
    setSearchParams(nextSearchParams, { replace: true });
  };

  return { activeTab, search, setSearch, pageByTab, setPageByTab, selectRecruitmentTab, handleHeroHighlightClick: (tabKey) => { selectRecruitmentTab(tabKey); setPendingScrollTab(tabKey); } };
}