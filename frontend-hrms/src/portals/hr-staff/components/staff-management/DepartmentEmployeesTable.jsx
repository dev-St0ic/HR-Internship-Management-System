import EmployeeRow from './EmployeeRow';

export default function DepartmentEmployeesTable({ employees, emptyRowCount, onEditEmployee }) {
  return (
    <table className="employee-table">
      <thead><tr><th>Employee ID</th><th>Employee Name</th><th>Designation</th><th>Type</th><th>Number Of Interns</th><th>Action</th></tr></thead>
      <tbody>
        {employees.length > 0 ? <>{employees.map((employee) => <EmployeeRow key={employee.id} employee={{ ...employee, interns: employee.interns.length }} onEdit={() => onEditEmployee(employee.id)} />)}{Array.from({ length: emptyRowCount }, (_, index) => <tr key={`department-placeholder-${index}`} className="staff-management-placeholder-row" aria-hidden="true"><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>)}</> : <><tr><td colSpan="6"><div className="staff-management-empty-state">No employees match the current search and filter settings.</div></td></tr>{Array.from({ length: emptyRowCount }, (_, index) => <tr key={`department-placeholder-${index}`} className="staff-management-placeholder-row" aria-hidden="true"><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>)}</>}
      </tbody>
    </table>
  );
}