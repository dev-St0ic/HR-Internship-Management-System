import { useEffect, useRef, useState } from 'react';

import { fetchInternManagementSnapshot, INTERN_MANAGEMENT_POLL_INTERVAL_MS, refreshInternManagementSnapshot, removeInternManagementIntern, subscribeInternManagementUpdates, updateInternManagementAttendanceRequest } from '../../../../common/api/internManagementService';
import { internAttendanceRequests, internManagementInterns } from '../../data/internManagementData';
import { INTERN_MANAGEMENT_ACTION_FEEDBACK_DURATION_MS } from './constants';

export function useInternManagementSync() {
  const [interns, setInterns] = useState(internManagementInterns);
  const [attendanceRequests, setAttendanceRequests] = useState(internAttendanceRequests);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncMode, setSyncMode] = useState('Starting live sync');
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);
  const latestSnapshotVersionRef = useRef(0);
  const applySnapshot = (snapshot, label) => {
    if (snapshot.version < latestSnapshotVersionRef.current) return;
    latestSnapshotVersionRef.current = snapshot.version;
    setInterns(snapshot.interns); setAttendanceRequests(snapshot.attendanceRequests); setLastSyncedAt(snapshot.updatedAt); setSyncMode(label);
  };

  useEffect(() => {
    let isActive = true;
    fetchInternManagementSnapshot().then((snapshot) => isActive && applySnapshot(snapshot, 'Live sync connected'));
    const unsubscribe = subscribeInternManagementUpdates((snapshot) => isActive && applySnapshot(snapshot, 'Live update received'));
    const pollIntervalId = window.setInterval(() => fetchInternManagementSnapshot().then((snapshot) => isActive && applySnapshot(snapshot, 'Auto-refresh synced')), INTERN_MANAGEMENT_POLL_INTERVAL_MS);
    return () => { isActive = false; unsubscribe(); window.clearInterval(pollIntervalId); };
  }, []);

  useEffect(() => {
    if (!actionFeedback?.message || typeof window === 'undefined') return undefined;
    const timeoutId = window.setTimeout(() => setActionFeedback(null), INTERN_MANAGEMENT_ACTION_FEEDBACK_DURATION_MS);
    return () => window.clearTimeout(timeoutId);
  }, [actionFeedback]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try { applySnapshot(await refreshInternManagementSnapshot(), 'Manual refresh complete'); } finally { setIsRefreshing(false); }
  };
  const handleSaveRequest = async (nextRequest) => { applySnapshot(await updateInternManagementAttendanceRequest(nextRequest), 'Attendance request updated'); };
  const removeIntern = async (intern) => {
    try { applySnapshot(await removeInternManagementIntern(intern.id), 'Intern removed'); setActionFeedback({ tone: 'success', message: `${intern.name} was removed from the interns list.` }); return true; } catch { setActionFeedback({ tone: 'error', message: 'We could not remove the intern right now. Please try again.' }); return false; }
  };

  return { interns, attendanceRequests, isRefreshing, syncMode, lastSyncedAt, actionFeedback, handleManualRefresh, handleSaveRequest, removeIntern };
}