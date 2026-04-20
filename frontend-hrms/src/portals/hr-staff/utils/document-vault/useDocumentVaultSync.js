import { useEffect, useRef, useState } from 'react';

import { DOCUMENT_VAULT_POLL_INTERVAL_MS, fetchDocumentVaultRecords, refreshDocumentVaultRecords, subscribeDocumentVaultUpdates } from '../../../../common/api/documentVaultService';
import { documentVaultRecords } from '../../data/documentVaultData';

export function useDocumentVaultSync() {
  const [vaultRecords, setVaultRecords] = useState(documentVaultRecords);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [syncMode, setSyncMode] = useState('Starting live sync');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const latestSnapshotVersionRef = useRef(0);

  const applySnapshot = (snapshot, label) => {
    if (snapshot.version < latestSnapshotVersionRef.current) return;
    latestSnapshotVersionRef.current = snapshot.version;
    setVaultRecords(snapshot.records); setLastSyncedAt(snapshot.updatedAt); setSyncMode(label);
  };

  useEffect(() => {
    let isActive = true;
    fetchDocumentVaultRecords().then((snapshot) => isActive && applySnapshot(snapshot, 'Live sync connected'));
    const unsubscribe = subscribeDocumentVaultUpdates((snapshot) => isActive && applySnapshot(snapshot, 'Live update received'));
    const pollIntervalId = window.setInterval(() => fetchDocumentVaultRecords().then((snapshot) => isActive && applySnapshot(snapshot, 'Auto-refresh synced')), DOCUMENT_VAULT_POLL_INTERVAL_MS);
    return () => { isActive = false; unsubscribe(); window.clearInterval(pollIntervalId); };
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try { applySnapshot(await refreshDocumentVaultRecords(), 'Manual refresh complete'); } finally { setIsRefreshing(false); }
  };

  return { vaultRecords, lastSyncedAt, syncMode, isRefreshing, handleManualRefresh };
}