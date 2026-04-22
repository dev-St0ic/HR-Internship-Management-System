import { CalendarDays, ChevronLeft, ClipboardList, Download, Eye, FileText, Pencil, Trophy, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyAttendanceData, dummyDocuments, dummyInterns } from '../../../common/utils/mockAuth.js';

const sidePanels = [
  { key: 'profile', label: 'Profile', icon: UserRound },
  { key: 'attendance', label: 'Attendance', icon: CalendarDays },
  { key: 'tasks', label: 'Tasks', icon: ClipboardList },
  { key: 'evaluation', label: 'Evaluation', icon: Trophy },
];

const profileTabs = [
  { key: 'personal', label: 'Personal Information', icon: UserRound },
  { key: 'documents', label: 'Documents', icon: FileText },
];

export default function InternDetailPage() {
  const navigate = useNavigate();
  const { internId } = useParams();

  const [activeTab, setActiveTab] = useState('personal');
  const [activePanel, setActivePanel] = useState('profile');
  const [interns] = useState(dummyInterns);
  const [documents] = useState(dummyDocuments);
  const [attendanceData] = useState(dummyAttendanceData);
  const [intern, setIntern] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (internId) {
      const foundIntern = interns.find((item) => String(item.id) === String(internId));
      setIntern(foundIntern || null);
      setLoading(false);
    }
  }, [internId, interns]);

  const handleBackToInternManagement = () => {
    navigate('/hr-admin/internmanagement');
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Loading...</h1>
      </div>
    );
  }

  if (!intern) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Intern Not Found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The intern with ID <strong>{internId}</strong> does not exist.
        </p>
      </div>
    );
  }

  const personalFields = [
    { label: 'First Name', value: intern.firstName || intern.name?.split(' ')[0] || '-' },
    { label: 'Last Name', value: intern.lastName || intern.name?.split(' ').slice(1).join(' ') || '-' },
    { label: 'Mobile Number', value: intern.mobileNumber || '-' },
    { label: 'Email Address', value: intern.emailAddress || intern.email || '-' },
    { label: 'Date of Birth', value: intern.dateOfBirth || '-' },
    { label: 'Marital Status', value: intern.maritalStatus || 'Single' },
    { label: 'Gender', value: intern.gender || '-' },
    { label: 'Nationality', value: intern.nationality || 'Filipino' },
    { label: 'Address', value: intern.address || '-' },
    { label: 'City', value: intern.city || '-' },
    { label: 'Zip Code', value: intern.zipCode || '-' },
    { label: 'University', value: intern.university || '-' },
  ];

  return (
    <div className="space-y-5">
      <button
              onClick={handleBackToInternManagement}
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              <ChevronLeft size={16} />
              Back to Intern Management
            </button>
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{intern.name}</h1>
        <p className="text-sm text-slate-500">Intern Management &gt; {intern.name}</p>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 via-rose-100 to-violet-100 text-2xl font-semibold text-slate-700">
              {intern.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-[28px] font-semibold leading-tight text-slate-900">{intern.name}</h2>
              <p className="mt-1 text-sm text-slate-500">Intern</p>
              <p className="mt-1 text-sm text-slate-500">{intern.emailAddress || intern.email}</p>
            </div>
          </div>

          <button className="inline-flex h-11 items-center gap-2 rounded-2xl bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-700">
            <Pencil size={15} />
            Edit Profile
          </button>
        </div>

        <div className="grid gap-4 xl:grid-cols-[120px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-2 w-40">
            <nav className="space-y-2">
              {sidePanels.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActivePanel(item.key)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                      activePanel === item.key
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={15} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="marginLeft rounded-2xl border border-slate-200 bg-white p-5"  style={{marginLeft: '30px'}}>
            {activePanel === 'profile' && (
              <>
                <div className="mb-5 flex gap-6 border-b border-slate-100">
                  {profileTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`inline-flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
                          activeTab === tab.key
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Icon size={15} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {activeTab === 'personal' ? (
                  <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                    {personalFields.map((field) => (
                      <div key={field.label} className="border-b border-slate-100 pb-3">
                        <p className="mb-1 text-xs text-slate-400">{field.label}</p>
                        <p className="text-sm font-medium text-slate-800">{field.value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {documents.length > 0 ? (
                      documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-900">{doc.title}</p>
                            <p className="text-xs text-slate-500">Uploaded: {doc.uploaded}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button type="button" className="rounded-lg p-2 transition hover:bg-slate-100" title="Preview">
                              <Eye size={16} className="text-slate-600" />
                            </button>
                            <button type="button" className="rounded-lg p-2 transition hover:bg-slate-100" title="Download">
                              <Download size={16} className="text-slate-600" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">No documents available.</p>
                    )}
                  </div>
                )}
              </>
            )}

            {activePanel === 'attendance' && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Attendance</h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="border-b border-slate-200 px-4 py-3 font-medium">Date</th>
                        <th className="border-b border-slate-200 px-4 py-3 font-medium">Check In</th>
                        <th className="border-b border-slate-200 px-4 py-3 font-medium">Check Out</th>
                        <th className="border-b border-slate-200 px-4 py-3 font-medium">Break</th>
                        <th className="border-b border-slate-200 px-4 py-3 font-medium">Working Hours</th>
                        <th className="border-b border-slate-200 px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((row, index) => (
                        <tr key={index} className="border-b border-slate-100 text-slate-700">
                          <td className="px-4 py-3">{row.date}</td>
                          <td className="px-4 py-3">{row.checkIn}</td>
                          <td className="px-4 py-3">{row.checkOut}</td>
                          <td className="px-4 py-3">{row.break}</td>
                          <td className="px-4 py-3">{row.total}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-500">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activePanel === 'tasks' && (
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Tasks</h3>
                <p className="text-sm text-slate-500">Tasks section - Coming soon</p>
              </div>
            )}

            {activePanel === 'evaluation' && (
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Evaluation</h3>
                <p className="text-sm text-slate-500">Evaluation section - Coming soon</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
