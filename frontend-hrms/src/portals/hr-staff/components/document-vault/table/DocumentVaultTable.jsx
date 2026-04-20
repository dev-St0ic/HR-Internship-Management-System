import { documentVaultColumns } from '../../../utils/document-vault/constants';
import DocumentVaultTableBody from './DocumentVaultTableBody';
import DocumentVaultTableHead from './DocumentVaultTableHead';

export default function DocumentVaultTable({ columnWidths, totalTableWidth, sortConfig, paginatedRecords, emptyRowCount, downloadIcon, onSort, onResizeStart, onOpenPdf }) {
  return (
    <div className="document-vault-table-shell"><div className="document-vault-table-scroll"><table className="document-vault-table" style={{ minWidth: `${totalTableWidth}px` }}><colgroup>{documentVaultColumns.map((column) => <col key={column.key} className={`document-vault-col-${column.key}`} style={{ width: `${columnWidths[column.key]}px` }} />)}</colgroup><DocumentVaultTableHead columnWidths={columnWidths} sortConfig={sortConfig} onSort={onSort} onResizeStart={onResizeStart} /><DocumentVaultTableBody paginatedRecords={paginatedRecords} emptyRowCount={emptyRowCount} downloadIcon={downloadIcon} onOpenPdf={onOpenPdf} /></table></div></div>
  );
}