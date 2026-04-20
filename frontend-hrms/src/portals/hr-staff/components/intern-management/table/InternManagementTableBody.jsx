import InternManagementInternRow from './InternManagementInternRow';
import InternManagementRequestRow from './InternManagementRequestRow';

export default function InternManagementTableBody({ activeTab, rows, emptyRowCount, navigate, onRemoveIntern, onOpenRequestModal, viewIcon, removeIcon, editIcon }) {
  if (rows.length === 0) return <tbody><tr><td colSpan="6"><div className="intern-management-empty-state">No records match the current search and filter settings.</div></td></tr></tbody>;
  return (
    <tbody>{activeTab === 'interns' ? rows.map((intern) => <InternManagementInternRow key={intern.id} intern={intern} navigate={navigate} onRemoveIntern={onRemoveIntern} viewIcon={viewIcon} removeIcon={removeIcon} />) : rows.map((request) => <InternManagementRequestRow key={request.id} request={request} onOpenRequestModal={onOpenRequestModal} viewIcon={viewIcon} editIcon={editIcon} />)}{Array.from({ length: emptyRowCount }, (_, index) => <tr key={`overview-placeholder-${index}`} className="intern-management-placeholder-row" aria-hidden="true"><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>)}</tbody>
  );
}