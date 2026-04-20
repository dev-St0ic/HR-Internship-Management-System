import { Eye } from 'lucide-react';

import EmployeeAvatar from '../../staff-management/EmployeeAvatar';
import { statusClassNameMap } from '../../../utils/document-vault/constants';
import { formatDisplayDate } from '../../../utils/document-vault/helpers';

export default function DocumentVaultRecordRow({ record, downloadIcon, onOpenPdf }) {
  return (
    <tr>
      <td><div className="document-vault-file-cell"><span className="document-vault-file-name" title={record.fileName}>{record.fileName}</span><span className="document-vault-file-meta" title={`Handled by HR Staff ${record.uploadedBy}`}>Handled by HR Staff {record.uploadedBy}</span></div></td>
      <td><div className="document-vault-person-cell document-vault-person-cell-with-avatar"><EmployeeAvatar src={record.internAvatar} alt={record.internName} name={record.internName} size={30} className="document-vault-person-avatar" /><span title={record.internName}>{record.internName}</span></div></td>
      <td className="document-vault-date-cell">{record.assignedDate}</td>
      <td><div className="document-vault-person-cell"><span title={record.department}>{record.department}</span><span>{record.workMode}</span></div></td>
      <td className="document-vault-date-cell">{formatDisplayDate(record.uploadedAt)}</td>
      <td><span className={`document-vault-status ${statusClassNameMap[record.status] ?? ''}`}>{record.status}</span></td>
      <td className="document-vault-type-cell">{record.fileType}</td>
      <td><div className="document-vault-actions"><button type="button" className="document-vault-action-button" onClick={() => onOpenPdf(record)} aria-label={`Preview ${record.fileName}`}><Eye size={17} /></button><button type="button" className="document-vault-action-button" onClick={() => onOpenPdf(record, true)} aria-label={`Download ${record.fileName}`}><img src={downloadIcon} alt="" aria-hidden="true" className="document-vault-download-icon" /></button></div></td>
    </tr>
  );
}