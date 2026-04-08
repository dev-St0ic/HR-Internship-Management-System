import React from 'react';
import { useNavigate } from 'react-router-dom';

const DepartmentCard = ({ department }) => {
  const navigate = useNavigate();
  return (
    <div className="department-card">
      <div className="department-header">
        <div>
          <h3>{department.name}</h3>
          <span className="members">{department.members} Members</span>
        </div>
        <button className="view-all-btn" onClick={() => navigate(`/hr-staff/staff-management/department/${department.id}`)}>View All</button>
      </div>
      <ul className="employee-list">
        {department.employees.map(emp => (
          <li key={emp.id} className="employee-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={emp.avatar} alt={emp.name} className="avatar" />
            <span>{emp.name}</span>
            <button
              className="arrow-btn"
              title="Go to Employee Detail"
              style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', padding: 0 }}
              onClick={() => navigate(`/hr-staff/staff-management/department/${department.id}/employee/${emp.id}`)}
            >
              <span role="img" aria-label="arrow">➔</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentCard;
