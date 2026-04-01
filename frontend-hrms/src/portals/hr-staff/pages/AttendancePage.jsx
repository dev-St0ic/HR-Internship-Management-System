import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const sampleAttendance = [
  { date: '2026-03-01', checkIn: '09:00 AM', checkOut: '05:30 PM', break: '00:30', total: '08:00', status: 'On Time' },
  { date: '2026-03-02', checkIn: '09:05 AM', checkOut: '05:28 PM', break: '00:30', total: '07:53', status: 'On Time' },
  { date: '2026-03-03', checkIn: '09:30 AM', checkOut: '05:20 PM', break: '00:30', total: '07:20', status: 'Late' },
  { date: '2026-03-04', checkIn: '08:58 AM', checkOut: '05:35 PM', break: '00:30', total: '08:07', status: 'On Time' },
];

export default function AttendancePage() {
  const navigate = useNavigate();
  const { internId } = useParams();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(`/hr-staff/intern/${internId}`)}
          className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          <ArrowLeft size={16} />
          Back to Profile
        </button>
        <h1 className="text-xl font-semibold">Attendance Record</h1>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Check In</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Check Out</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Break</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Working Hours</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleAttendance.map((row, idx) => (
              <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">{row.date}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{row.checkIn}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{row.checkOut}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{row.break}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{row.total}</td>
                <td className="px-4 py-3 text-sm text-gray-800">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
