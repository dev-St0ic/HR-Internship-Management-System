import { useEffect, useMemo, useRef, useState } from 'react';

import { fetchDocumentVaultRecords, subscribeDocumentVaultUpdates } from '../../../../common/api/documentVaultService';
import { fetchInternManagementSnapshot, subscribeInternManagementUpdates } from '../../../../common/api/internManagementService';
import { getThemeAsset } from '../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../common/theme/ThemeProvider';
import { currentHrStaffUser } from '../../data/currentHrStaffUser';
import { documentVaultRecords } from '../../data/documentVaultData';
import { createHrStaffDashboardSummary } from '../../data/hrStaffDashboardData';
import { internAttendanceRequests, internManagementInterns } from '../../data/internManagementData';
import { createRecruitmentApplications } from '../../data/recruitmentData';
import { staffManagementDepartments } from '../../data/staffManagementData';
import { queueIconMap, queueMetaMap, quickActionConfigs, quickActionMetaMap } from './constants';
import { formatSyncTime, getLatestTimestamp } from './helpers';
import { applyRecruitmentOverride, readStoredRecruitmentApplicationOverrides, RECRUITMENT_APPLICATION_OVERRIDES_KEY } from '../recruitment/applicationOverrides';

export function useHrStaffDashboardState() {
  const { resolvedTheme } = useTheme();
  const latestInternVersionRef = useRef(0); const latestVaultVersionRef = useRef(0);
  const [internSnapshot, setInternSnapshot] = useState({ interns: internManagementInterns, attendanceRequests: internAttendanceRequests, updatedAt: '' });
  const [vaultSnapshot, setVaultSnapshot] = useState({ records: documentVaultRecords, updatedAt: '' });
  const [isLoading, setIsLoading] = useState(true); const [loadError, setLoadError] = useState('');
  const [recruitmentApplicationOverrides, setRecruitmentApplicationOverrides] = useState(readStoredRecruitmentApplicationOverrides);

  useEffect(() => { if (typeof window === 'undefined') return undefined; const handleStorage = (event) => event.key === RECRUITMENT_APPLICATION_OVERRIDES_KEY && setRecruitmentApplicationOverrides(readStoredRecruitmentApplicationOverrides()); window.addEventListener('storage', handleStorage); return () => window.removeEventListener('storage', handleStorage); }, []);
  useEffect(() => {
    let isMounted = true;
    const applyInternSnapshot = (snapshot) => snapshot && snapshot.version > latestInternVersionRef.current && (latestInternVersionRef.current = snapshot.version, setInternSnapshot(snapshot), true);
    const applyVaultSnapshot = (snapshot) => snapshot && snapshot.version > latestVaultVersionRef.current && (latestVaultVersionRef.current = snapshot.version, setVaultSnapshot(snapshot), true);
    const loadDashboardData = async () => { try { const [latestInternSnapshot, latestVaultSnapshot] = await Promise.all([fetchInternManagementSnapshot(), fetchDocumentVaultRecords()]); if (!isMounted) return; applyInternSnapshot(latestInternSnapshot); applyVaultSnapshot(latestVaultSnapshot); setLoadError(''); } catch { if (isMounted) setLoadError('Live sync is unavailable, showing the latest seeded records.'); } finally { if (isMounted) setIsLoading(false); } };
    void loadDashboardData();
    const unsubscribeInternUpdates = subscribeInternManagementUpdates((snapshot) => isMounted && applyInternSnapshot(snapshot) && (setIsLoading(false), setLoadError('')));
    const unsubscribeVaultUpdates = subscribeDocumentVaultUpdates((snapshot) => isMounted && applyVaultSnapshot(snapshot) && (setIsLoading(false), setLoadError('')));
    return () => { isMounted = false; unsubscribeInternUpdates(); unsubscribeVaultUpdates(); };
  }, []);

  const recruitmentApplicationsWithOverrides = useMemo(() => createRecruitmentApplications(internSnapshot.interns, vaultSnapshot.records).map((application) => applyRecruitmentOverride(application, recruitmentApplicationOverrides[application.id])), [internSnapshot.interns, recruitmentApplicationOverrides, vaultSnapshot.records]);
  const summary = useMemo(() => createHrStaffDashboardSummary({ user: currentHrStaffUser, departments: staffManagementDepartments, interns: internSnapshot.interns, attendanceRequests: internSnapshot.attendanceRequests, vaultRecords: vaultSnapshot.records, applications: recruitmentApplicationsWithOverrides }), [internSnapshot.attendanceRequests, internSnapshot.interns, recruitmentApplicationsWithOverrides, vaultSnapshot.records]);
  const quickActions = useMemo(() => quickActionConfigs.map((action) => ({ ...action, description: '', meta: quickActionMetaMap[action.key], badge: summary.quickActionBadges[action.key] })), [summary.quickActionBadges]);
  const queueLinks = useMemo(() => summary.queues.map((queue) => ({ key: `queue-${queue.key}`, title: queue.title, description: '', meta: queueMetaMap[queue.key], badge: `${queue.count}`, to: queue.to, icon: getThemeAsset(queueIconMap[queue.key], resolvedTheme === 'dark' ? 'light' : resolvedTheme), toneKey: queue.count > 0 ? (queue.key === 'attendance' || queue.key === 'requirements' ? 'attention' : 'accent') : 'positive' })), [resolvedTheme, summary.queues]);
  const lastUpdatedAt = useMemo(() => getLatestTimestamp([internSnapshot.updatedAt, vaultSnapshot.updatedAt]), [internSnapshot.updatedAt, vaultSnapshot.updatedAt]);
  const syncMessage = loadError || (isLoading ? 'Syncing dashboard data' : `Last synced ${formatSyncTime(lastUpdatedAt)}`);

  return { summary, quickActions, queueLinks, isLoading, loadError, syncMessage };
}