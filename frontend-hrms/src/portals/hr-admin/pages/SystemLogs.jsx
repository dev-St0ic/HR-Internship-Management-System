import { Search, Download, Filter } from 'lucide-react';

const logs = [
  {
    timestamp: '2026-04-06 | 09:12:34',
    user: 'Supervisor 1',
    role: 'Supervisor',
    action: 'Login',
    description: 'Supervisor 1 logged into the system.',
    details: 'View',
  },
  {
    timestamp: '2026-04-06 | 09:18:02',
    user: 'Intern 1',
    role: 'Intern',
    action: 'Submit Application',
    description: 'Intern 1 submitted an application.',
    details: 'View',
  },
  {
    timestamp: '2026-04-06 | 09:25:47',
    user: 'HR Staff 1',
    role: 'HR Staff',
    action: 'Update Record',
    description: 'HR Staff 1 updated intern record.',
    details: 'View',
  },
  {
    timestamp: '2026-04-06 | 09:34:21',
    user: 'Supervisor 2',
    role: 'Supervisor',
    action: 'Approve Request',
    description: 'Supervisor 2 approved a request.',
    details: 'View',
  },
];

export default function SystemLogs() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">System Logs</h1>
          <p className="text-sm text-slate-500">User Activity Logs</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-[320px]">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
            <Download size={16} />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-4 font-medium">Timestamp</th>
                <th className="px-4 py-4 font-medium">User</th>
                <th className="px-4 py-4 font-medium">Role</th>
                <th className="px-4 py-4 font-medium">Action</th>
                <th className="px-4 py-4 font-medium">Description</th>
                <th className="px-4 py-4 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-4 text-slate-900">{log.timestamp}</td>
                  <td className="px-4 py-4 text-slate-900">{log.user}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {log.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-900">{log.action}</td>
                  <td className="px-4 py-4 text-slate-900">{log.description}</td>
                  <td className="px-4 py-4 text-slate-900">
                    <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                      {log.details}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-slate-500">
          <div>Showing 1 to {logs.length} of {logs.length} records</div>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50">1</button>
            <button className="rounded-full border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50">2</button>
            <button className="rounded-full border border-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-50">3</button>
          </div>
        </div>
      </div>
    </div>
  );
}
