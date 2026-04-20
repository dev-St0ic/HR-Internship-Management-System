import { useEffect, useMemo, useState } from 'react';

import { ACTION_MESSAGE_DURATION_MS } from './pageConfig';
import { applyRecruitmentOverride, canMoveToAdminApproval, readStoredRecruitmentApplicationOverrides, RECRUITMENT_APPLICATION_OVERRIDES_KEY } from './applicationOverrides';

export function useRecruitmentActions() {
  const [applicationOverrides, setApplicationOverrides] = useState(readStoredRecruitmentApplicationOverrides);
  const [actionFeedback, setActionFeedback] = useState(null);
  const [pendingConfirmation, setPendingConfirmation] = useState(null);

  useEffect(() => { if (typeof window !== 'undefined') window.localStorage.setItem(RECRUITMENT_APPLICATION_OVERRIDES_KEY, JSON.stringify(applicationOverrides)); }, [applicationOverrides]);
  useEffect(() => { if (!actionFeedback?.message || typeof window === 'undefined') return undefined; const timeoutId = window.setTimeout(() => setActionFeedback(null), ACTION_MESSAGE_DURATION_MS); return () => window.clearTimeout(timeoutId); }, [actionFeedback]);

  const applyApplicationAction = (application, nextValues, successMessage) => {
    try { setApplicationOverrides((current) => ({ ...current, [application.id]: { ...(current[application.id] ?? {}), ...nextValues, actionUpdatedAt: new Date().toISOString() } })); setPendingConfirmation(null); setActionFeedback({ tone: 'success', message: successMessage }); }
    catch { setPendingConfirmation(null); setActionFeedback({ tone: 'error', message: `We couldn't update ${application.name} right now. Please try again.` }); }
  };

  const confirmationDialog = useMemo(() => {
    if (!pendingConfirmation) return null;
    if (pendingConfirmation.type === 'move') return { title: 'Move To Admin Approval?', message: `Send ${pendingConfirmation.application.name} to the admin approval queue? The applicant will appear in the approval tab immediately.`, confirmLabel: 'Move Applicant', tone: 'accent', onConfirm: () => applyApplicationAction(pendingConfirmation.application, { stage: 'for-admin-approval', actionStatus: 'queued' }, `${pendingConfirmation.application.name} moved to the admin approval queue.`) };
    return { title: 'Endorse Applicant?', message: `Endorse ${pendingConfirmation.application.name} for admin review? This marks the profile as endorsed by HR staff in the approval queue.`, confirmLabel: 'Endorse', tone: 'success', onConfirm: () => applyApplicationAction(pendingConfirmation.application, { stage: 'for-admin-approval', actionStatus: 'endorsed' }, `${pendingConfirmation.application.name} was endorsed for admin review.`) };
  }, [pendingConfirmation]);

  return { applicationOverrides, actionFeedback, pendingConfirmation, setPendingConfirmation, confirmationDialog, handleMoveToAdminApproval: (application) => canMoveToAdminApproval(application) && setPendingConfirmation({ type: 'move', application }), handleEndorse: (application) => application.actionStatus !== 'endorsed' && setPendingConfirmation({ type: 'endorse', application }), applyRecruitmentOverride };
}