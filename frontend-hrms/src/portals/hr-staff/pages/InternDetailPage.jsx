import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight, Eye, Download } from 'lucide-react';

const interns = [
  {
    id: '345321231',
    name: 'John Doe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    mobileNumber: '09123456789',
    emailAddress: 'john.doe@example.com',
    dateOfBirth: '1999-03-15',
    gender: 'Male',
    university: 'CIT-U',
    program: 'BS Computer Science',
    ojtHours: '240',
    address: '123 Example St.',
    city: 'Cebu City',
    zipCode: '6000',
  },
  {
    id: '987890345',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    mobileNumber: '09123456788',
    emailAddress: 'jane.doe@example.com',
    dateOfBirth: '2000-05-02',
    gender: 'Female',
    university: 'FEU',
    program: 'BS Business Administration',
    ojtHours: '220',
    address: '456 Example Ave.',
    city: 'Manila',
    zipCode: '1000',
  },
];

const documents = [
  { id: 1, title: 'MOA.pdf', type: 'MOA', uploaded: '2025-12-10' },
  { id: 2, title: 'Certificate of Acceptance.pdf', type: 'Acceptance', uploaded: '2025-12-12' },
  { id: 3, title: 'NDA Letter.pdf', type: 'NDA', uploaded: '2025-12-14' },
  { id: 4, title: 'ID.pdf', type: 'ID', uploaded: '2025-12-15' },
  { id: 5, title: 'Resume.pdf', type: 'Resume', uploaded: '2025-12-16' },
  { id: 6, title: 'Endorsement Letter.pdf', type: 'Endorsement', uploaded: '2025-12-18' },
];

const attendanceData = [
  { date: 'July 01, 2023', checkIn: '09:28 AM', checkOut: '07:00 PM', break: '00:30 Min', total: '09:02 Hrs', status: 'On Time' },
  { date: 'July 02, 2023', checkIn: '09:20 AM', checkOut: '07:00 PM', break: '00:20 Min', total: '09:20 Hrs', status: 'On Time' },

];

export default function InternDetailPage() {
  const { internId } = useParams();
  const [activeTab, setActiveTab] = useState('personal');
  const [activePanel, setActivePanel] = useState('profile');

  const intern = interns.find((i) => i.id === internId) || interns[0];

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <span>Operation</span>
        <ChevronRight size={16} />
        <span className="text-gray-900 font-medium">{intern.name}</span>
        <ChevronRight size={16} />
        <span>Profile</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">Avatar</div>
            <div>
              <h1 className="text-2xl font-bold">{intern.name}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <span>✉</span>
                {intern.email}
              </p>
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-2">
            <span>✎</span>
            Edit Profile
          </button>
        </div>
        <div className="flex">
          <aside className="w-64 border-r border-gray-200 p-4 bg-gray-50">
            <nav className="space-y-2">
              {[
                { key: 'profile', label: 'Profile' },
                { key: 'attendance', label: 'Attendance' },
                { key: 'tasks', label: 'Tasks' },
                { key: 'evaluation', label: 'Evaluation' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActivePanel(item.key)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    activePanel === item.key
                      ? 'bg-white text-gray-900 font-semibold shadow-sm'
                      : 'text-gray-600 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {activePanel === 'profile' && (
            <section className="flex-1 p-6">
              <div className="flex gap-6 border-b border-gray-200 pb-4">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`pb-2 font-medium ${
                    activeTab === 'personal'
                      ? 'border-b-2 border-gray-900 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`pb-2 font-medium ${
                    activeTab === 'documents'
                      ? 'border-b-2 border-gray-900 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab('access')}
                  className={`pb-2 font-medium ${
                    activeTab === 'access'
                      ? 'border-b-2 border-gray-900 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Account Access
                </button>
              </div>

              <div className="mt-6">
                {activeTab === 'personal' && (
                  <div className="grid grid-cols-2 gap-5">
                    {[
                      { label: 'First Name', value: intern.firstName },
                      { label: 'Last Name', value: intern.lastName },
                      { label: 'Mobile Number', value: intern.mobileNumber },
                      { label: 'Email Address', value: intern.emailAddress },
                      { label: 'Date of Birth', value: intern.dateOfBirth },
                      { label: 'Gender', value: intern.gender },
                      { label: 'University', value: intern.university },
                      { label: 'Program', value: intern.program },
                      { label: 'OJT Hours', value: intern.ojtHours },
                      { label: 'Address', value: intern.address },
                      { label: 'City', value: intern.city },
                      { label: 'Zip Code', value: intern.zipCode },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
                        <p className="text-gray-900">{field.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="border border-gray-200 rounded-lg p-3 flex justify-between items-center bg-white">
                        <div>
                          <p className="font-medium text-gray-900">{doc.title}</p>
                          <p className="text-xs text-gray-500">Uploaded: {doc.uploaded}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1 rounded hover:bg-gray-100" title="Preview">
                            <Eye size={16} className="text-gray-600" />
                          </button>
                          <button className="p-1 rounded hover:bg-gray-100" title="Download">
                            <Download size={16} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'access' && (
                  <div className="text-gray-600">
                    <p className="mb-3 font-medium">Account settings will be placed here (e.g., login status, role, reset credentials).</p>
                    <p>Coming soon.</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {activePanel === 'attendance' && (
            <section className="flex-1 p-6">
              <h2 className="text-lg font-semibold mb-4">Attendance Record</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Check In</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Check Out</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Break</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Working Hours</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((row, idx) => (
                      <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800">{row.date}</td>
                        <td className="px-4 py-3 text-gray-800">{row.checkIn}</td>
                        <td className="px-4 py-3 text-gray-800">{row.checkOut}</td>
                        <td className="px-4 py-3 text-gray-800">{row.break}</td>
                        <td className="px-4 py-3 text-gray-800">{row.total}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            row.status === 'On Time' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                View Monthly DTR
              </button>
            </section>
          )}

          {activePanel === 'tasks' && (
            <section className="flex-1 p-6">
              <h2 className="text-lg font-semibold mb-4">Tasks</h2>
              <p className="text-gray-600">Tasks section - Coming soon</p>
            </section>
          )}

          {activePanel === 'evaluation' && (
            <section className="flex-1 p-6">
              <h2 className="text-lg font-semibold mb-4">Evaluation</h2>
              <p className="text-gray-600">Evaluation section - Coming soon</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
