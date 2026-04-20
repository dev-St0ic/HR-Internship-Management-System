import {
  createInternAttendanceRequests,
  createInternManagementInterns,
} from '../../portals/hr-staff/data/internManagementData';

const FETCH_DELAY_MS = 220;
export const INTERN_MANAGEMENT_POLL_INTERVAL_MS = 15000;
export const INTERN_MANAGEMENT_REALTIME_INTERVAL_MS = 12000;

const STORE_KEY = '__HRMS_INTERN_MANAGEMENT_SERVICE__';
const STORE_SCHEMA_VERSION = 2;

function cloneIntern(intern) {
  return {
    ...intern,
    documents: intern.documents.map((document) => ({ ...document })),
    tasks: intern.tasks.map((task) => ({ ...task })),
    attendanceMonths: intern.attendanceMonths.map((month) => ({
      ...month,
      entries: month.entries.map((entry) => ({ ...entry })),
    })),
    evaluation: {
      ...intern.evaluation,
      criteria: intern.evaluation.criteria.map((criterion) => ({ ...criterion })),
    },
  };
}

function cloneAttendanceRequest(request) {
  return { ...request };
}

function createSourceSignature(interns, attendanceRequests) {
  return JSON.stringify({ interns, attendanceRequests });
}

function createStore() {
  const sourceInterns = createInternManagementInterns();
  const sourceAttendanceRequests = createInternAttendanceRequests(sourceInterns);

  return {
    schemaVersion: STORE_SCHEMA_VERSION,
    internsStore: sourceInterns.map(cloneIntern),
    attendanceRequestsStore: sourceAttendanceRequests.map(cloneAttendanceRequest),
    sourceSignature: createSourceSignature(sourceInterns, sourceAttendanceRequests),
    updatedAt: new Date().toISOString(),
    version: 1,
    realtimeIntervalId: null,
    subscribers: new Set(),
  };
}

function getServiceStore() {
  const globalScope = globalThis;
  const existingStore = globalScope[STORE_KEY];

  if (existingStore && existingStore.schemaVersion !== STORE_SCHEMA_VERSION) {
    if (existingStore.realtimeIntervalId !== null) {
      window.clearInterval(existingStore.realtimeIntervalId);
    }

    globalScope[STORE_KEY] = null;
  }

  if (!globalScope[STORE_KEY]) {
    globalScope[STORE_KEY] = createStore();
  }

  return globalScope[STORE_KEY];
}

const serviceStore = getServiceStore();

if (serviceStore.realtimeIntervalId !== null) {
  window.clearInterval(serviceStore.realtimeIntervalId);
  serviceStore.realtimeIntervalId = null;
}

function delay(durationMs) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}

function createSnapshot(reason, changedIds = []) {
  return {
    interns: serviceStore.internsStore.map(cloneIntern),
    attendanceRequests: serviceStore.attendanceRequestsStore.map(cloneAttendanceRequest),
    updatedAt: serviceStore.updatedAt,
    version: serviceStore.version,
    reason,
    changedIds,
  };
}

function notifySubscribers(snapshot) {
  serviceStore.subscribers.forEach((subscriber) => {
    subscriber(snapshot);
  });
}

function syncInternCollectionsWithSource(sourceInterns, sourceAttendanceRequests) {
  const nextSignature = createSourceSignature(sourceInterns, sourceAttendanceRequests);

  if (nextSignature === serviceStore.sourceSignature) {
    return false;
  }

  const existingInternsById = new Map(serviceStore.internsStore.map((intern) => [intern.id, intern]));
  const existingRequestsById = new Map(serviceStore.attendanceRequestsStore.map((request) => [request.id, request]));

  serviceStore.internsStore = sourceInterns.map((intern) => {
    const existingIntern = existingInternsById.get(intern.id);

    if (!existingIntern) {
      return cloneIntern(intern);
    }

    return {
      ...cloneIntern(intern),
      renderedHours: existingIntern.renderedHours,
      remainingHours: existingIntern.remainingHours,
    };
  });

  serviceStore.attendanceRequestsStore = sourceAttendanceRequests.map((request) => {
    const existingRequest = existingRequestsById.get(request.id);

    if (!existingRequest) {
      return cloneAttendanceRequest(request);
    }

    return {
      ...request,
      workflowStatus: existingRequest.workflowStatus,
      attendanceStatus: existingRequest.attendanceStatus,
      timeIn: existingRequest.timeIn,
      timeOut: existingRequest.timeOut,
      reason: existingRequest.reason,
      supportingDocument: existingRequest.supportingDocument,
    };
  });

  serviceStore.sourceSignature = nextSignature;
  serviceStore.updatedAt = new Date().toISOString();
  serviceStore.version += 1;
  return true;
}

async function loadLatestInternManagementSource() {
  if (import.meta.env.DEV) {
    const moduleUrl = new URL('../../portals/hr-staff/data/internManagementData.js', import.meta.url);
    const freshModule = await import(/* @vite-ignore */ `${moduleUrl.href}?t=${Date.now()}`);
    const sourceInterns = freshModule.createInternManagementInterns();
    return {
      interns: sourceInterns,
      attendanceRequests: freshModule.createInternAttendanceRequests(sourceInterns),
    };
  }

  const sourceInterns = createInternManagementInterns();
  return {
    interns: sourceInterns,
    attendanceRequests: createInternAttendanceRequests(sourceInterns),
  };
}

async function ensureInternManagementStoreInitialized() {
  const latestSource = await loadLatestInternManagementSource();

  if (serviceStore.internsStore.length === 0 && serviceStore.attendanceRequestsStore.length === 0) {
    serviceStore.internsStore = latestSource.interns.map(cloneIntern);
    serviceStore.attendanceRequestsStore = latestSource.attendanceRequests.map(cloneAttendanceRequest);
    serviceStore.sourceSignature = createSourceSignature(latestSource.interns, latestSource.attendanceRequests);
    return true;
  }

  return syncInternCollectionsWithSource(latestSource.interns, latestSource.attendanceRequests);
}

function ensureRealtimeSimulation() {
  if (serviceStore.realtimeIntervalId !== null) {
    return;
  }

  serviceStore.realtimeIntervalId = window.setInterval(() => {
    void ensureInternManagementStoreInitialized().then((hasChanges) => {
      if (hasChanges) {
        notifySubscribers(createSnapshot('live-update'));
      }
    });
  }, INTERN_MANAGEMENT_REALTIME_INTERVAL_MS);
}

export async function fetchInternManagementSnapshot() {
  ensureRealtimeSimulation();
  await delay(FETCH_DELAY_MS);
  await ensureInternManagementStoreInitialized();
  return createSnapshot('poll-sync');
}

export async function refreshInternManagementSnapshot() {
  ensureRealtimeSimulation();
  await delay(FETCH_DELAY_MS);
  await ensureInternManagementStoreInitialized();
  return createSnapshot('manual-refresh');
}

export function subscribeInternManagementUpdates(subscriber) {
  ensureRealtimeSimulation();
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