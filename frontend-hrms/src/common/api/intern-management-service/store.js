import { createInternAttendanceRequests, createInternManagementInterns } from '../../../portals/hr-staff/data/internManagementData';

const STORE_KEY = '__HRMS_INTERN_MANAGEMENT_SERVICE__';
const STORE_SCHEMA_VERSION = 2;

export const FETCH_DELAY_MS = 220;

export function cloneIntern(intern) {
  return { ...intern, documents: intern.documents.map((document) => ({ ...document })), tasks: intern.tasks.map((task) => ({ ...task })), attendanceMonths: intern.attendanceMonths.map((month) => ({ ...month, entries: month.entries.map((entry) => ({ ...entry })) })), evaluation: { ...intern.evaluation, criteria: intern.evaluation.criteria.map((criterion) => ({ ...criterion })) } };
}

export function cloneAttendanceRequest(request) {
  return { ...request };
}

export function createSourceSignature(interns, attendanceRequests) {
  return JSON.stringify({ interns, attendanceRequests });
}

function createStore() {
  const sourceInterns = createInternManagementInterns();
  const sourceAttendanceRequests = createInternAttendanceRequests(sourceInterns);
  return { schemaVersion: STORE_SCHEMA_VERSION, internsStore: sourceInterns.map(cloneIntern), attendanceRequestsStore: sourceAttendanceRequests.map(cloneAttendanceRequest), sourceSignature: createSourceSignature(sourceInterns, sourceAttendanceRequests), updatedAt: new Date().toISOString(), version: 1, realtimeIntervalId: null, subscribers: new Set() };
}

function getServiceStore() {
  const globalScope = globalThis;
  const existingStore = globalScope[STORE_KEY];
  if (existingStore && existingStore.schemaVersion !== STORE_SCHEMA_VERSION) {
    if (existingStore.realtimeIntervalId !== null) window.clearInterval(existingStore.realtimeIntervalId);
    globalScope[STORE_KEY] = null;
  }
  if (!globalScope[STORE_KEY]) globalScope[STORE_KEY] = createStore();
  return globalScope[STORE_KEY];
}

export const serviceStore = getServiceStore();

if (serviceStore.realtimeIntervalId !== null) {
  window.clearInterval(serviceStore.realtimeIntervalId);
  serviceStore.realtimeIntervalId = null;
}

export function delay(durationMs) {
  return new Promise((resolve) => { window.setTimeout(resolve, durationMs); });
}

export function createSnapshot(reason, changedIds = []) {
  return { interns: serviceStore.internsStore.map(cloneIntern), attendanceRequests: serviceStore.attendanceRequestsStore.map(cloneAttendanceRequest), updatedAt: serviceStore.updatedAt, version: serviceStore.version, reason, changedIds };
}

export function notifySubscribers(snapshot) {
  serviceStore.subscribers.forEach((subscriber) => { subscriber(snapshot); });
}

export function syncInternCollectionsWithSource(sourceInterns, sourceAttendanceRequests) {
  const nextSignature = createSourceSignature(sourceInterns, sourceAttendanceRequests);
  if (nextSignature === serviceStore.sourceSignature) return false;
  const existingInternsById = new Map(serviceStore.internsStore.map((intern) => [intern.id, intern]));
  const existingRequestsById = new Map(serviceStore.attendanceRequestsStore.map((request) => [request.id, request]));
  serviceStore.internsStore = sourceInterns.map((intern) => { const existingIntern = existingInternsById.get(intern.id); return existingIntern ? { ...cloneIntern(intern), renderedHours: existingIntern.renderedHours, remainingHours: existingIntern.remainingHours } : cloneIntern(intern); });
  serviceStore.attendanceRequestsStore = sourceAttendanceRequests.map((request) => { const existingRequest = existingRequestsById.get(request.id); return existingRequest ? { ...request, workflowStatus: existingRequest.workflowStatus, attendanceStatus: existingRequest.attendanceStatus, timeIn: existingRequest.timeIn, timeOut: existingRequest.timeOut, reason: existingRequest.reason, supportingDocument: existingRequest.supportingDocument } : cloneAttendanceRequest(request); });
  serviceStore.sourceSignature = nextSignature;
  serviceStore.updatedAt = new Date().toISOString();
  serviceStore.version += 1;
  return true;
}