import { Eye, Trash2, Search, Filter, Upload } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { dummyInterns } from '../../../common/utils/mockAuth.js';

export default function OperationsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHrAdmin = location.pathname.includes('/hr-admin');

  const [interns, setInterns] = useState(dummyInterns);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInterns = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return interns;
    }

    return interns.filter((intern) =>
      [intern.name, intern.id, intern.university, intern.department, intern.startDate]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [interns, searchTerm]);

  // Commented out API call for interns
  // useEffect(() => {
  //   fetch('/api/interns')
  //     .then(res => res.json())
  //     .then(data => setInterns(data))
  //     .catch(err => console.error('Error fetching interns:', err));
  // }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Intern Management</h1>
          <p className="text-sm text-slate-500">Daily workflows & Tracking</p>
        </div>
      </div>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-[220px]">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex h-11 items-center gap-2 rounded-2xl bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-700">
              <Upload size={16} />
              Export
            </button>
            <button className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Intern Name</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Intern ID</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">University</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Department</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Started at</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredInterns.map((intern, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">{intern.name}</td>
              <td className="py-3 px-4">{intern.id}</td>
              <td className="py-3 px-4">{intern.university}</td>
              <td className="py-3 px-4">{intern.department}</td>
              <td className="py-3 px-4">{intern.startDate}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate(isHrAdmin ? `intern/${intern.id}` : `../intern/${intern.id}`)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Eye size={18} className="text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Trash2 size={18} className="text-gray-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredInterns.length === 0 && (
            <tr>
              <td colSpan="6" className="py-8 text-center text-sm text-slate-500">
                No interns found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </section>
    </div>
  );
}
