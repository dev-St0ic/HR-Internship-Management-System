import PaginationControls from '../../staff-management/PaginationControls';

export default function InternManagementDetailTable({ columns, rows, emptyRowCount, totalPages, currentPage, onPageChange, renderRow, footer, usePaginationSlot = false }) {
  return (
    <>
      <div className="intern-management-table-scroll-shell">
        <table className="intern-management-table intern-management-detail-table">
          <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {rows.map(renderRow)}
            {Array.from({ length: emptyRowCount }, (_, index) => (
              <tr key={`detail-empty-row-${index}`} className="intern-management-detail-placeholder-row" aria-hidden="true">{columns.map((column) => <td key={`${column}-${index}`}>&nbsp;</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      {usePaginationSlot ? <div className="intern-management-detail-pagination-slot" aria-hidden={totalPages <= 1}>{totalPages > 1 ? <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} className="intern-management-detail-pagination" /> : null}</div> : totalPages > 1 ? <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} className="intern-management-detail-pagination" /> : null}
      {footer}
    </>
  );
}