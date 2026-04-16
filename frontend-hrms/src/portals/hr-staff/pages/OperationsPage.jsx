import { Eye, Trash2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { dummyInterns } from '../../../common/config/mockData';

export default function OperationsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHrAdmin = location.pathname.includes('/hr-admin');

  const [interns, setInterns] = useState(dummyInterns);

  // Commented out API call for interns
  // useEffect(() => {
  //   fetch('/api/interns')
  //     .then(res => res.json())
  //     .then(data => setInterns(data))
  //     .catch(err => console.error('Error fetching interns:', err));
  // }, []);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Intern Management</h1>
          <p className="text-sm text-slate-500">Daily workflows & Tracking</p>
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
          {interns.map((intern, index) => (
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
        </tbody>
      </table>
    </div>
  );
}