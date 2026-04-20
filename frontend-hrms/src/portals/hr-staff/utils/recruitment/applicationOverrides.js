export const RECRUITMENT_APPLICATION_OVERRIDES_KEY = 'hrms.recruitment.applicationOverrides.v1';

export function readStoredRecruitmentApplicationOverrides() {
  if (typeof window === 'undefined') return {};
  try {
    const storedValue = window.localStorage.getItem(RECRUITMENT_APPLICATION_OVERRIDES_KEY);
    if (!storedValue) return {};
    const parsedValue = JSON.parse(storedValue);
    return parsedValue && typeof parsedValue === 'object' && !Array.isArray(parsedValue) ? parsedValue : {};
  } catch {
    return {};
  }
}

export function formatActionTimestamp(value) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

export const canMoveToAdminApproval = (application) => application.documentStatus === 'Complete' && application.evaluationStatus !== 'Not Started';

export function applyRecruitmentOverride(application, override = {}) {
  const nextStage = override.stage ?? application.stage;
  const actionStatus = override.actionStatus ?? null;
  const nextStatus = actionStatus === 'queued' ? 'Queued for Admin Approval' : actionStatus === 'endorsed' ? 'Endorsed by HR Staff' : application.status;
  const nextStatusTone = actionStatus === 'queued' ? 'accent' : actionStatus === 'endorsed' ? 'success' : application.statusTone;
  return { ...application, stage: nextStage, stageLabel: nextStage === 'applications' ? 'Application' : 'For Admin Approval', status: nextStatus, statusTone: nextStatusTone, actionStatus, actionUpdatedAt: override.actionUpdatedAt ?? '', actionUpdatedAtLabel: override.actionUpdatedAt ? formatActionTimestamp(override.actionUpdatedAt) : '' };
}