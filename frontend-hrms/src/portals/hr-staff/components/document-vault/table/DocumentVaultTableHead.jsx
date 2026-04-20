import { documentVaultColumns } from '../../../utils/document-vault/constants';
import { getHeaderSortIcon } from '../../../utils/document-vault/helpers';

export default function DocumentVaultTableHead({ columnWidths, sortConfig, onSort, onResizeStart }) {
  return (
    <thead>
      <tr>
        {documentVaultColumns.map((column) => {
          const SortIcon = getHeaderSortIcon(column.key, sortConfig);
          const ariaSort = !column.sortable ? undefined : sortConfig.key === column.key ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none';
          return <th key={column.key} aria-sort={ariaSort}><div className="document-vault-header-cell">{column.sortable ? <button type="button" className={`document-vault-sort-button ${sortConfig.key === column.key ? 'is-active' : ''}`} onClick={() => onSort(column.key)} aria-label={`Sort by ${column.label} ${sortConfig.key === column.key && sortConfig.direction === 'asc' ? 'descending' : 'ascending'}`}><span className="document-vault-header-text">{column.label}</span><SortIcon size={14} className="document-vault-sort-icon" aria-hidden="true" /></button> : <span className="document-vault-header-text">{column.label}</span>}{column.resizable && <button type="button" className="document-vault-resize-handle" aria-label={`Resize ${column.label} column`} onMouseDown={(event) => onResizeStart(event, column.key, column.minWidth)} />}</div></th>;
        })}
      </tr>
    </thead>
  );
}