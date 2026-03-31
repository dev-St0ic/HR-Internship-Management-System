import { Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OperationsPage() {
  const navigate = useNavigate();
  //Sample Data 
  const interns = [
    { name: 'John Doe', id: '345321231', university: 'CIT-U', department: 'IT Department', startDate: 'Februry 27, 2026' },
    { name: 'Jane Doe', id: '987890345', university: 'FEU', department: 'Department', startDate: 'December 14, 2025' },
    { name: 'Jonathan Doe', id: '453367122', university: 'USJR', department: 'Department', startDate: 'January 11, 2026' },
  ];

  return (
    <div className="p-6">
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
                    onClick={() => navigate(`/hr-staff/intern/${intern.id}`)}
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