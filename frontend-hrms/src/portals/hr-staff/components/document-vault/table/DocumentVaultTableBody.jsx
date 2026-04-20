import { documentVaultColumns } from '../../../utils/document-vault/constants';
import DocumentVaultRecordRow from './DocumentVaultRecordRow';

export default function DocumentVaultTableBody({ paginatedRecords, emptyRowCount, downloadIcon, onOpenPdf }) {
  return (
    <tbody>
      {paginatedRecords.length > 0 ? <>{paginatedRecords.map((record) => <DocumentVaultRecordRow key={record.id} record={record} downloadIcon={downloadIcon} onOpenPdf={onOpenPdf} />)}{Array.from({ length: emptyRowCount }, (_, index) => <tr key={`empty-row-${index}`} className="document-vault-placeholder-row" aria-hidden="true">{documentVaultColumns.map((column) => <td key={column.key}>&nbsp;</td>)}</tr>)}</> : <tr><td colSpan={documentVaultColumns.length}><div className="document-vault-empty-state">No documents match the current search and filter settings.</div></td></tr>}
    </tbody>
  );
}