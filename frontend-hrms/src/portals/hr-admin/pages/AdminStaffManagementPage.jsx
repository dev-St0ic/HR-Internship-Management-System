import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { dummyDepartments } from '../../../common/utils/mockAuth.js';

const PAGE_SIZE_OPTIONS = [10, 15, 20];
const AVATAR_COLORS = [
  'bg-amber-100 text-amber-700',
  'bg-cyan-100 text-cyan-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
  'bg-orange-100 text-orange-700',
];
const TYPE_SEQUENCE = ['Office', 'Remote'];

export default function StaffManagement() {
  const [departments] = useState(dummyDepartments);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const activeDepartment = useMemo(
    () => departments.find((department) => department.title === selectedDepartment) ?? null,
    [departments, selectedDepartment],
  );

  const employeeRows = useMemo(() => {
    if (!activeDepartment) {
      return [];
    }

    return activeDepartment.members.map((member, index) => ({
      id: `${(index + 1).toString().padStart(3, '0')}${String(member.name.length).padStart(3, '0')}${String(
        activeDepartment.title.length,
      ).padStart(3, '0')}`,
      name: member.name,
      designation: member.role,
      type: TYPE_SEQUENCE[index % TYPE_SEQUENCE.length],
      status: 'Permanent',
      initials: member.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      avatarClass: AVATAR_COLORS[index % AVATAR_COLORS.length],
    }));
  }, [activeDepartment]);

  const filteredEmployees = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return employeeRows;
    }

    return employeeRows.filter((employee) =>
      [employee.id, employee.name, employee.designation, employee.type, employee.status]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [employeeRows, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedEmployees = filteredEmployees.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleViewAll = (departmentTitle) => {
    setSelectedDepartment(departmentTitle);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleBackToDepartments = () => {
    setSelectedDepartment(null);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {!activeDepartment ? (
        <>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-[320px]">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
                  <Plus size={16} />
                  Add New Department
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {departments.map((department) => (
              <div key={department.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{department.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{department.count} Members</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleViewAll(department.title)}
                    className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                  >
                    View All
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  {department.members.map((member) => (
                    <div key={member.name} className="rounded-3xl bg-slate-50 p-4">
                      <p className="font-semibold text-slate-900">{member.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleBackToDepartments}
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              <ChevronLeft size={16} />
              Back to Departments
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">{activeDepartment.title}</h1>
              <p className="text-sm text-slate-500">Staff Management &gt; {activeDepartment.title}</p>
            </div>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-[220px]">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex h-11 items-center gap-2 rounded-2xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                  <Plus size={16} />
                  Add New Employee
                </button>
                <button className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-0">
                <thead>
                  <tr className="text-left text-sm text-slate-400">
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">Employee ID</th>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">Employee Name</th>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">Designation</th>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">Type</th>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">Status</th>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEmployees.map((employee) => (
                    <tr key={employee.id} className="text-sm text-slate-700">
                      <td className="border-b border-slate-100 px-3 py-3">{employee.id}</td>
                      <td className="border-b border-slate-100 px-3 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${employee.avatarClass}`}>
                            {employee.initials}
                          </div>
                          <span className="font-medium text-slate-800">{employee.name}</span>
                        </div>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-3">{employee.designation}</td>
                      <td className="border-b border-slate-100 px-3 py-3">{employee.type}</td>
                      <td className="border-b border-slate-100 px-3 py-3">
                        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-500">
                          {employee.status}
                        </span>
                      </td>
                      <td className="border-b border-slate-100 px-3 py-3">
                        <div className="flex items-center justify-center gap-3 text-slate-500">
                          <button type="button" className="transition hover:text-slate-800" aria-label={`View ${employee.name}`}>
                            <Eye size={16} />
                          </button>
                          <button type="button" className="transition hover:text-slate-800" aria-label={`Edit ${employee.name}`}>
                            <Pencil size={16} />
                          </button>
                          <button type="button" className="transition hover:text-rose-500" aria-label={`Delete ${employee.name}`}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-col gap-4 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <span>Showing</span>
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
                >
                  {PAGE_SIZE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <p>
                Showing {filteredEmployees.length === 0 ? 0 : (safePage - 1) * pageSize + 1} to{' '}
                {Math.min(safePage * pageSize, filteredEmployees.length)} out of {filteredEmployees.length} records
              </p>

              <div className="flex items-center gap-2 text-slate-600">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={safePage === 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  const isActive = page === safePage;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border text-sm transition ${
                        isActive
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={safePage === totalPages}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}