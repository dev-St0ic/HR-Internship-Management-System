import { createInternAttendanceRequests, createInternManagementInterns } from '../../../portals/hr-staff/data/internManagementData';

import { createSnapshot, createSourceSignature, cloneAttendanceRequest, cloneIntern, notifySubscribers, serviceStore, syncInternCollectionsWithSource } from './store';

export async function loadLatestInternManagementSource() {
  if (import.meta.env.DEV) {
    const moduleUrl = new URL('../../../portals/hr-staff/data/internManagementData.js', import.meta.url);
    const freshModule = await import(/* @vite-ignore */ `${moduleUrl.href}?t=${Date.now()}`);
    const interns = freshModule.createInternManagementInterns();
    return { interns, attendanceRequests: freshModule.createInternAttendanceRequests(interns) };
  }

  const interns = createInternManagementInterns();
  return { interns, attendanceRequests: createInternAttendanceRequests(interns) };
}

export async function ensureInternManagementStoreInitialized() {
  const latestSource = await loadLatestInternManagementSource();
  if (serviceStore.internsStore.length === 0 && serviceStore.attendanceRequestsStore.length === 0) {
    serviceStore.internsStore = latestSource.interns.map(cloneIntern);
    serviceStore.attendanceRequestsStore = latestSource.attendanceRequests.map(cloneAttendanceRequest);
    serviceStore.sourceSignature = createSourceSignature(latestSource.interns, latestSource.attendanceRequests);
    return true;
  }
  return syncInternCollectionsWithSource(latestSource.interns, latestSource.attendanceRequests);
}

export function ensureRealtimeSimulation(realtimeIntervalMs) {
  if (serviceStore.realtimeIntervalId !== null) return;
  serviceStore.realtimeIntervalId = window.setInterval(() => { void ensureInternManagementStoreInitialized().then((hasChanges) => { if (hasChanges) notifySubscribers(createSnapshot('live-update')); }); }, realtimeIntervalMs);
}