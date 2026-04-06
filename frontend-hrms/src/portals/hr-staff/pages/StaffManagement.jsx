import { Search, Plus, Download } from 'lucide-react';

const departments = [
  {
    title: 'IT Department',
    count: 20,
    members: [
      { name: 'John Doe', role: 'IT Intern' },
      { name: 'Jane Doe', role: 'HR Intern' },
      { name: 'Jonathan Doe', role: 'IT Intern' },
    ],
  },
  {
    title: 'Sales Department',
    count: 14,
    members: [
      { name: 'Darrell Steward', role: 'Sr. Sales Manager' },
      { name: 'Courtney Henry', role: 'BDM' },
      { name: 'Kathryn Murphy', role: 'BDE' },
    ],
  },
  {
    title: 'Project Manager Department',
    count: 18,
    members: [
      { name: 'Ronald Richards', role: 'Sr. Project Manager' },
      { name: 'Savannah Nguyen', role: 'Project Manager' },
    ],
  },
  {
    title: 'Marketing Department',
    count: 10,
    members: [
      { name: 'Brooklyn Simmons', role: 'Sr. Marketing Manager' },
      { name: 'Kristin Watson', role: 'Marketing Coordinator' },
    ],
  },
];

export default function StaffManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Staff Management</h1>
          <p className="text-sm text-slate-500">Permissions & Access Control</p>
        </div>

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
              <button className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800">View All</button>
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
    </div>
  );
}
