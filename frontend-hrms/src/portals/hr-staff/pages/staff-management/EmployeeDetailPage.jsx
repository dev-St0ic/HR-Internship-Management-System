import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InternRow from '../../components/staff-management/InternRow';
import SearchBar from '../../components/staff-management/SearchBar';
import NotificationIcon from '../../components/staff-management/NotificationIcon';
import FilterModal from '../../components/staff-management/FilterModal';

// Department and employee data (should match DepartmentListPage)
const departments = [
  {
    id: 5,
    name: 'Finance',
    employees: [
      { id: 1, name: 'Samuel Brooks', interns: [
        { id: 1, name: 'Intern 1', date: 'Date', ojtHours: 'Hours', rendered: 'Hours' },
        { id: 2, name: 'Intern 2', date: 'Date', ojtHours: 'Hours', rendered: 'Hours' },
      ] },
      { id: 2, name: 'Tina Chen', interns: [
        { id: 1, name: 'Intern 3', date: 'Date', ojtHours: 'Hours', rendered: 'Hours' },
        { id: 2, name: 'Intern 4', date: 'Date', ojtHours: 'Hours', rendered: 'Hours' },
      ] },
    ],
  },
  {
    id: 1,
    name: 'Human Resources',
    employees: [
      { id: 1, name: 'Alice Smith', interns: [
        { id: 1, name: 'Intern 1', date: 'Date', ojtHours: 'Hours', rendered: 'Hours' },
        { id: 2, name: 'Intern 2', date: 'Date', ojtHours: 'Hours', rendered: 'Hours' },
      ] },
      { id: 2, name: 'Bob Lee', interns: [
        { id: 1, name: 'Intern 3', date: 'Date', ojtHours: 'Hours', rendered: 'Hours' },
      ] },
      { id: 3, name: 'Catherine Jones', interns: [
        { id: 1, name: 'Intern 4', date: 'Date', ojtHours: 'Hours', rendered: 'Hours' },
      ] },
      { id: 4, name: 'David Kim', interns: [
        { id: 1, name: 'Intern 5', date: 'Date', ojtHours: 'Hours', rendered: 'Hours' },
      ] },
    ],
  },
  // Add other departments as needed
  {
    id: 2,
    name: 'Engineering',
    employees: [],
  },
  {
    id: 3,
    name: 'Marketing',
    employees: [],
  },
  {
    id: 4,
    name: 'Operations',
    employees: [],
  },
];


const EmployeeDetailPage = () => {
  const { departmentId, employeeId } = useParams();
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Find the department and employee
  const department = departments.find(dep => String(dep.id) === String(departmentId));
  const employee = department?.employees.find(emp => String(emp.id) === String(employeeId));
  const interns = employee?.interns || [];
  const filteredInterns = interns.filter(intern => intern.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* ... Side menu ... */}</aside>
      <main className="main-content">
        <div className="header-row">
          <div>
            <h2>{employee ? employee.name : `Employee ${employeeId}`}</h2>
            <span className="subtitle">Staff Management &gt; Department {department?.name || departmentId} &gt; {employee ? employee.name : `Employee ${employeeId}`}</span>
          </div>
          <NotificationIcon />
        </div>
        <div className="search-row" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search" />
          <button className="add-intern-btn">+ Add New Intern</button>
          <button className="filter-btn" onClick={() => setFilterOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6, verticalAlign: 'middle' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-.293.707l-6.414 6.414A1 1 0 0 0 14 13.414V19a1 1 0 0 1-1.447.894l-4-2A1 1 0 0 1 8 17.118V13.414a1 1 0 0 0-.293-.707L1.293 6.707A1 1 0 0 1 1 6V4z" />
            </svg>
            Filter
          </button>
        </div>
        <table className="intern-table">
          <thead>
            <tr>
              <th>Intern Name</th>
              <th>Date Assigned</th>
              <th>OJT Hours</th>
              <th>Hours Rendered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterns.map(intern => (
              <InternRow key={intern.id} intern={intern} />
            ))}
          </tbody>
        </table>
        {filterOpen && <FilterModal type="intern" onClose={() => setFilterOpen(false)} />}
      </main>
    </div>
  );
};

export default EmployeeDetailPage;
