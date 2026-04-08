import React from 'react';

const EmployeeRow = ({ employee, onEdit }) => (
  <tr>
    <td>{employee.employeeId}</td>
    <td style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img src={employee.avatar} alt={employee.name} className="avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
      {employee.name}
      <button
        className="arrow-btn"
        title="Go to Employee Detail"
        style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', padding: 0 }}
        onClick={onEdit}
      >
        <span role="img" aria-label="arrow">➔</span>
      </button>
    </td>
    <td>{employee.designation}</td>
    <td>{employee.type}</td>
    <td>{employee.interns}</td>
    <td>
      <button className="action-btn" title="View"><span role="img" aria-label="view">👁️</span></button>
      <button className="action-btn" title="Edit" onClick={onEdit}><span role="img" aria-label="edit">✏️</span></button>
    </td>
  </tr>
);

export default EmployeeRow;
