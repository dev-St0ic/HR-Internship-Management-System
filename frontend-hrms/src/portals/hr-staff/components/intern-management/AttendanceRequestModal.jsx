import { useEffect, useState } from 'react';

import { actionIconMap, getThemeAsset } from '../../../../common/config/appIconRegistry';
import { useTheme } from '../../../../common/theme/ThemeProvider';
import { formatDisplayDate } from '../../utils/intern-management/helpers';
import AttendanceStatusDropdown from './AttendanceStatusDropdown';

export default function AttendanceRequestModal({ request, mode, options, onClose, onSave }) {
  const { resolvedTheme } = useTheme();
  const [draftRequest, setDraftRequest] = useState(request);
  const attendanceModalIcon = getThemeAsset(actionIconMap.attendance, resolvedTheme);
  const isReadOnly = mode === 'view';

  useEffect(() => { setDraftRequest(request); }, [request]);
  if (!request || !draftRequest) return null;

  return (
    <div className="filter-modal-overlay" onClick={onClose}><div className="intern-management-request-modal" onClick={(event) => event.stopPropagation()}><div className="intern-management-request-title-row"><div className="intern-management-request-title"><img src={attendanceModalIcon} alt="" aria-hidden="true" /><h4>{isReadOnly ? 'Attendance Request' : 'Edit Attendance'}</h4></div></div><div className="intern-management-request-form"><label><span>Intern Name</span><input type="text" value={draftRequest.internName} readOnly /></label><div className="intern-management-request-grid"><label><span>Time In</span><input type="text" value={draftRequest.timeIn} readOnly={isReadOnly} onChange={(event) => setDraftRequest((current) => ({ ...current, timeIn: event.target.value }))} /></label><label><span>Time Out</span><input type="text" value={draftRequest.timeOut} readOnly={isReadOnly} onChange={(event) => setDraftRequest((current) => ({ ...current, timeOut: event.target.value }))} /></label></div><div className="intern-management-request-grid"><label><span>Date</span><input type="text" value={formatDisplayDate(draftRequest.date)} readOnly /></label><label><span>Status</span><AttendanceStatusDropdown value={draftRequest.attendanceStatus} options={options} disabled={isReadOnly} onChange={(nextValue) => setDraftRequest((current) => ({ ...current, attendanceStatus: nextValue }))} /></label></div><label><span>Reason</span><textarea value={draftRequest.reason} readOnly /></label><div className="intern-management-supporting-document"><span>Supporting Document</span><strong>{draftRequest.supportingDocument}</strong></div></div><div className="intern-management-request-actions">{isReadOnly ? <button className="filter-cancel" type="button" onClick={onClose}>Close</button> : <><button className="filter-cancel" type="button" onClick={() => onSave({ ...draftRequest, workflowStatus: 'Rejected' })}>Reject</button><button className="filter-apply" type="button" onClick={() => onSave({ ...draftRequest, workflowStatus: 'Approved' })}>Approve</button></>}</div></div></div>
  );
}