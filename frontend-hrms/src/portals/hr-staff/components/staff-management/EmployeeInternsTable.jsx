import InternRow from './InternRow';

export default function EmployeeInternsTable({ interns, emptyRowCount }) {
  return (
    <table className="intern-table">
      <thead><tr><th>Intern Name</th><th>Date Assigned</th><th>OJT Hours</th><th>Hours Rendered</th><th>Action</th></tr></thead>
      <tbody>
        {interns.length > 0 ? <>{interns.map((intern) => <InternRow key={intern.id} intern={intern} />)}{Array.from({ length: emptyRowCount }, (_, index) => <tr key={`employee-placeholder-${index}`} className="staff-management-placeholder-row" aria-hidden="true"><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>)}</> : <><tr><td colSpan="5"><div className="staff-management-empty-state">No interns match the current search and filter settings.</div></td></tr>{Array.from({ length: emptyRowCount }, (_, index) => <tr key={`employee-placeholder-${index}`} className="staff-management-placeholder-row" aria-hidden="true"><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>)}</>}
      </tbody>
    </table>
  );
}