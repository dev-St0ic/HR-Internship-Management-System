import React, { useState } from 'react';
import DepartmentCard from '../../components/staff-management/DepartmentCard';
import SearchBar from '../../components/staff-management/SearchBar';
import NotificationIcon from '../../components/staff-management/NotificationIcon';
import '../../../../assets/styles/staff-management.css';

// Sample data
const departments = [
    {
      id: 5,
      name: 'Finance',
      members: 2,
      employees: [
        { id: 1, name: 'Samuel Brooks', avatar: '/assets/images/avatar21.jpg' },
        { id: 2, name: 'Tina Chen', avatar: '/assets/images/avatar22.jpg' },
      ],
    },
  {
    id: 1,
    name: 'Human Resources',
    members: 4,
    employees: [
      { id: 1, name: 'Alice Smith', avatar: '/assets/images/avatar1.jpg' },
      { id: 2, name: 'Bob Lee', avatar: '/assets/images/avatar2.jpg' },
      { id: 3, name: 'Catherine Jones', avatar: '/assets/images/avatar3.jpg' },
      { id: 4, name: 'David Kim', avatar: '/assets/images/avatar4.jpg' },
    ],
  },
  {
    id: 2,
    name: 'Engineering',
    members: 6,
    employees: [
      { id: 1, name: 'Emily Clark', avatar: '/assets/images/avatar6.jpg' },
      { id: 2, name: 'Frank Wright', avatar: '/assets/images/avatar7.jpg' },
      { id: 3, name: 'Grace Hall', avatar: '/assets/images/avatar8.jpg' },
      { id: 4, name: 'Henry Adams', avatar: '/assets/images/avatar9.jpg' },
      { id: 5, name: 'Isabella Turner', avatar: '/assets/images/avatar10.jpg' },
      { id: 6, name: 'Jackie Evans', avatar: '/assets/images/avatar11.jpg' },
    ],
  },
  {
    id: 3,
    name: 'Marketing',
    members: 3,
    employees: [
      { id: 1, name: 'Kevin Brown', avatar: '/assets/images/avatar12.jpg' },
      { id: 2, name: 'Linda Green', avatar: '/assets/images/avatar13.jpg' },
      { id: 3, name: 'Michael Scott', avatar: '/assets/images/avatar14.jpg' },
    ],
  },
  {
    id: 4,
    name: 'Operations',
    members: 5,
    employees: [
      { id: 1, name: 'Nina Patel', avatar: '/assets/images/avatar15.jpg' },
      { id: 2, name: 'Oscar Rivera', avatar: '/assets/images/avatar16.jpg' },
      { id: 3, name: 'Priya Singh', avatar: '/assets/images/avatar17.jpg' },
      { id: 4, name: 'Quentin Zhao', avatar: '/assets/images/avatar18.jpg' },
      { id: 5, name: 'Rosa Martinez', avatar: '/assets/images/avatar19.jpg' },
    ],
  },
];

const DepartmentListPage = () => {
  const [search, setSearch] = useState('');
  const filteredDepartments = departments.filter(dep => dep.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">
        {/* ... Side menu here ... */}
      </aside>
      <main className="main-content">
        <div className="header-row">
          <div>
            <h2>Management</h2>
            <span className="subtitle">Permissions & Access Control</span>
          </div>
          <NotificationIcon />
        </div>
        <div className="search-row">
          <SearchBar value={search} onChange={setSearch} placeholder="Search" />
        </div>
        <div className="departments-grid">
          {filteredDepartments.map(dep => (
            <DepartmentCard key={dep.id} department={dep} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DepartmentListPage;
