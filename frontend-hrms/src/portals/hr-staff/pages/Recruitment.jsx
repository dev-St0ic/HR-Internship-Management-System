import { Search, Funnel } from 'lucide-react';
import { useState, useEffect } from 'react';

// Dummy data for applications
const dummyApplications = [
  {
    name: 'Darlene Robertson',
    id: '345321231',
    university: 'Cebu University',
    program: 'BS Computer Science',
    date: '2026-02-15',
    status: 'Pending',
  },
  {
    name: 'Floyd Miles',
    id: '987890345',
    university: 'FEU',
    program: 'BS Business Administration',
    date: '2026-03-02',
    status: 'Pending',
  },
  {
    name: 'Carmen Reed',
    id: '453367122',
    university: 'USJR',
    program: 'BS Information Systems',
    date: '2026-03-20',
    status: 'Pending',
  },
];

export default function Recruitment() {
  const [applications, setApplications] = useState(dummyApplications);

  // Commented out API call for applications
  // useEffect(() => {
  //   fetch('/api/applications')
  //     .then(res => res.json())
  //     .then(data => setApplications(data))
  //     .catch(err => console.error('Error fetching applications:', err));
  // }, []);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Recruitment</h1>
          <p className="text-sm text-slate-500">All Talent Acquisition</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
          <Funnel size={16} />
          Filter
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-[320px]">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="flex gap-3 rounded-2xl bg-slate-50 p-2">
            <button className="rounded-2xl px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-white">Application</button>
            <button className="rounded-2xl px-4 py-2 text-sm text-slate-500 transition hover:bg-white">Partner University</button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-4 font-medium">Intern Name</th>
                <th className="px-4 py-4 font-medium">Intern ID</th>
                <th className="px-4 py-4 font-medium">University</th>
                <th className="px-4 py-4 font-medium">Program</th>
                <th className="px-4 py-4 font-medium">Date</th>
                <th className="px-4 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-4 text-slate-900">{application.name}</td>
                  <td className="px-4 py-4 text-slate-900">{application.id}</td>
                  <td className="px-4 py-4 text-slate-900">{application.university}</td>
                  <td className="px-4 py-4 text-slate-900">{application.program}</td>
                  <td className="px-4 py-4 text-slate-900">{application.date}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-slate-500">
          <div>Showing 1 to {applications.length} of {applications.length} records</div>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50">1</button>
            <button className="rounded-full border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50">2</button>
          </div>
        </div>
      </div>
    </div>
  );
}
