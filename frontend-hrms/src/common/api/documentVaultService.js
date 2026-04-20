import { createDocumentVaultRecords } from '../../portals/hr-staff/data/documentVaultData';

const FETCH_DELAY_MS = 220;
export const DOCUMENT_VAULT_POLL_INTERVAL_MS = 15000;

const STORE_KEY = '__HRMS_DOCUMENT_VAULT_SERVICE__';
const STORE_SCHEMA_VERSION = 2;

function cloneRecord(record) {
  return { ...record };
}

function createSourceSignature(sourceRecords) {
  return JSON.stringify(sourceRecords);
}

function createStore() {
  const sourceRecords = createDocumentVaultRecords();

  return {
    schemaVersion: STORE_SCHEMA_VERSION,
    recordsStore: sourceRecords.map(cloneRecord),
    sourceSignature: createSourceSignature(sourceRecords),
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

async function loadLatestSourceRecords() {
  if (import.meta.env.DEV) {
    const moduleUrl = new URL('../../portals/hr-staff/data/documentVaultData.js', import.meta.url);
    const freshModule = await import(/* @vite-ignore */ `${moduleUrl.href}?t=${Date.now()}`);
    return freshModule.createDocumentVaultRecords();
  }

  return createDocumentVaultRecords();
}

function syncStoreWithSourceRecords(sourceRecords) {
  const nextSignature = createSourceSignature(sourceRecords);

  if (nextSignature === serviceStore.sourceSignature) {
    return;
  }

  serviceStore.recordsStore = sourceRecords.map(cloneRecord);

  serviceStore.sourceSignature = nextSignature;
  serviceStore.updatedAt = new Date().toISOString();
  serviceStore.version += 1;
}

async function ensureRecordsStoreInitialized() {
  const sourceRecords = await loadLatestSourceRecords();

  if (serviceStore.recordsStore.length === 0) {
    serviceStore.recordsStore = sourceRecords.map(cloneRecord);
    serviceStore.sourceSignature = createSourceSignature(sourceRecords);
    return;
  }

  syncStoreWithSourceRecords(sourceRecords);
}

function buildSnapshot(reason, changedIds = []) {
  return {
    records: serviceStore.recordsStore.map(cloneRecord),
    updatedAt: serviceStore.updatedAt,
    version: serviceStore.version,
    reason,
    changedIds,
  };
}

export async function fetchDocumentVaultRecords() {
  await delay(FETCH_DELAY_MS);
  await ensureRecordsStoreInitialized();
  return buildSnapshot('poll-sync');
}

export async function refreshDocumentVaultRecords() {
  await delay(FETCH_DELAY_MS);
  await ensureRecordsStoreInitialized();
  return buildSnapshot('manual-refresh');
}

export function subscribeDocumentVaultUpdates(subscriber) {
  serviceStore.subscribers.add(subscriber);

  return () => {
    serviceStore.subscribers.delete(subscriber);
  };
}