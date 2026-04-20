export const INTERN_MANAGEMENT_POLL_INTERVAL_MS = 15000;
export const INTERN_MANAGEMENT_REALTIME_INTERVAL_MS = 12000;
import { ensureInternManagementStoreInitialized, ensureRealtimeSimulation } from './intern-management-service/source';
import { createSnapshot, delay, FETCH_DELAY_MS, notifySubscribers, serviceStore, cloneAttendanceRequest } from './intern-management-service/store';

export async function fetchInternManagementSnapshot() {
  ensureRealtimeSimulation(INTERN_MANAGEMENT_REALTIME_INTERVAL_MS);
  await delay(FETCH_DELAY_MS);
  await ensureInternManagementStoreInitialized();
  return createSnapshot('poll-sync');
}

export async function refreshInternManagementSnapshot() {
  ensureRealtimeSimulation(INTERN_MANAGEMENT_REALTIME_INTERVAL_MS);
  await delay(FETCH_DELAY_MS);
  await ensureInternManagementStoreInitialized();
  return createSnapshot('manual-refresh');
}

export function subscribeInternManagementUpdates(subscriber) {
  ensureRealtimeSimulation(INTERN_MANAGEMENT_REALTIME_INTERVAL_MS);
  serviceStore.subscribers.add(subscriber);

  return () => {
    serviceStore.subscribers.delete(subscriber);
  };
}

export async function updateInternManagementAttendanceRequest(nextRequest) {
  await ensureInternManagementStoreInitialized();

  const requestIndex = serviceStore.attendanceRequestsStore.findIndex((request) => request.id === nextRequest.id);

  if (requestIndex === -1) {
    return createSnapshot('request-update');
  }

  serviceStore.attendanceRequestsStore[requestIndex] = cloneAttendanceRequest(nextRequest);
  serviceStore.updatedAt = new Date().toISOString();
  serviceStore.version += 1;

  const snapshot = createSnapshot('request-update', [nextRequest.id]);
  notifySubscribers(snapshot);
  return snapshot;
}

export async function removeInternManagementIntern(internId) {
  await ensureInternManagementStoreInitialized();

  const changedIds = [internId];
  serviceStore.internsStore = serviceStore.internsStore.filter((intern) => intern.id !== internId);
  serviceStore.attendanceRequestsStore = serviceStore.attendanceRequestsStore.filter((request) => request.internId !== internId);
  serviceStore.updatedAt = new Date().toISOString();
  serviceStore.version += 1;

  const snapshot = createSnapshot('intern-removed', changedIds);
  notifySubscribers(snapshot);
  return snapshot;
}