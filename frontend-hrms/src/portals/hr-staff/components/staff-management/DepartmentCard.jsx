import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import EmployeeAvatar from './EmployeeAvatar';

const DepartmentCard = ({ department }) => {
  const navigate = useNavigate();
  const previewEmployees = department.employees.slice(0, 6);

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
        {previewEmployees.map(emp => (
          <li key={emp.id} className="employee-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <EmployeeAvatar src={emp.avatar} alt={emp.name} name={emp.name} className="avatar" />
            <span>{emp.name}</span>
            <button
              className="arrow-btn"
              title="Go to Employee Detail"
              style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', padding: 0 }}
              onClick={() => navigate(`/hr-staff/staff-management/department/${department.id}/employee/${emp.id}`)}
            >
              <ChevronRight aria-hidden="true" size={24} strokeWidth={2} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentCard;
