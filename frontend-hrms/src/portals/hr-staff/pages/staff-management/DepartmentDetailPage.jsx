import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeRow from '../../components/staff-management/EmployeeRow';
import SearchBar from '../../components/staff-management/SearchBar';
import NotificationIcon from '../../components/staff-management/NotificationIcon';
import FilterModal from '../../components/staff-management/FilterModal';

// Sample data for employees
const employees = [
  { id: 1, name: 'Alice Smith', designation: 'Manager', type: 'Office', interns: 5, employeeId: '345321231', avatar: '/assets/images/avatar1.jpg' },
  { id: 2, name: 'Bob Lee', designation: 'Developer', type: 'Remote', interns: 3, employeeId: '445521232', avatar: '/assets/images/avatar2.jpg' },
  { id: 3, name: 'Catherine Jones', designation: 'Designer', type: 'Office', interns: 2, employeeId: '355309230', avatar: '/assets/images/avatar3.jpg' },
  { id: 4, name: 'David Kim', designation: 'QA Engineer', type: 'Office', interns: 1, employeeId: '315121737', avatar: '/assets/images/avatar4.jpg' },
  { id: 5, name: 'Emily Clark', designation: 'Support', type: 'Remote', interns: 0, employeeId: '369328232', avatar: '/assets/images/avatar6.jpg' },
];

const DepartmentDetailPage = () => {
  const { departmentId } = useParams();
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  const filteredEmployees = employees.filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* ... Side menu ... */}</aside>
      <main className="main-content">
        <div className="header-row">
          <div>
            <h2>Department {departmentId}</h2>
            <span className="subtitle">Staff Management &gt; Department {departmentId}</span>
          </div>
          <NotificationIcon />
        </div>
        <div className="search-row" style={{ display: 'flex', gap: 12 }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search" />
          <button className="filter-btn" onClick={() => setFilterOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6, verticalAlign: 'middle' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-.293.707l-6.414 6.414A1 1 0 0 0 14 13.414V19a1 1 0 0 1-1.447.894l-4-2A1 1 0 0 1 8 17.118V13.414a1 1 0 0 0-.293-.707L1.293 6.707A1 1 0 0 1 1 6V4z" />
            </svg>
            Filter
          </button>
        </div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Type</th>
              <th>Number Of Interns</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <EmployeeRow key={emp.id} employee={emp} onEdit={() => navigate(`/hr-staff/staff-management/department/${departmentId}/employee/${emp.id}`)} />
            ))}
          </tbody>
        </table>
        {filterOpen && <FilterModal type="employee" onClose={() => setFilterOpen(false)} />}
      </main>
    </div>
  );
};

export default DepartmentDetailPage;
