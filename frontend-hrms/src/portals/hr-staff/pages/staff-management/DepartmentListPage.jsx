import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DepartmentCard from '../../components/staff-management/DepartmentCard';
import SearchBar from '../../components/staff-management/SearchBar';
import NotificationIcon from '../../components/staff-management/NotificationIcon';
import { staffManagementDepartments } from '../../data/staffManagementData';
import '../../../../assets/styles/staff-management.css';

const DepartmentListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const departments = staffManagementDepartments.map((department) => ({
    ...department,
    members: department.employees.length,
  }));
  const filteredDepartments = departments.filter(dep => dep.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (searchParams.get('scroll') !== 'top') {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('scroll');
    setSearchParams(nextSearchParams, { replace: true });
  }, [searchParams, setSearchParams]);

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
