import { ChevronLeft, ChevronRight, Download, Eye, FileText, Filter, Search, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { dummyApplications, dummyDocuments } from '../../../common/utils/mockAuth.js';

const PARTNER_SUMMARY = [
  { label: 'Active MOA', value: 22, tone: 'emerald', icon: 'M' },
  { label: 'Expiring MOA', value: 10, tone: 'amber', icon: 'E' },
  { label: 'Expired MOA', value: 3, tone: 'rose', icon: 'X' },
];

const PARTNER_ITEMS = [
  { id: 1, name: 'Cebu University', date: 'Updated Apr 02, 2026' },
  { id: 2, name: 'Polytechnic University', date: 'Updated Apr 05, 2026' },
  { id: 3, name: 'University of San Jose', date: 'Updated Apr 09, 2026' },
  { id: 4, name: 'De La Salle University', date: 'Updated Apr 10, 2026' },
];

function getStatusClasses(status) {
  if (status === 'Approved') {
    return 'bg-emerald-50 text-emerald-500';
  }

  if (status === 'Rejected') {
    return 'bg-rose-50 text-rose-500';
  }

  return 'bg-amber-50 text-amber-500';
}

export default function Recruitment() {
  const [applications, setApplications] = useState(
    dummyApplications.map((application, index) => ({
      ...application,
      status: index === 1 ? 'Rejected' : index === 2 ? 'Approved' : 'Pending',
    })),
  );
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState('information');
  const [documents] = useState(dummyDocuments);
  const [view, setView] = useState('application');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApplications = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return applications;
    }

    return applications.filter((application) =>
      [application.name, application.id, application.university, application.program, application.date, application.status]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [applications, searchTerm]);

  const openApplicant = (applicant, index) => {
    setSelectedApplicant(applicant);
    setSelectedIndex(index);
    setActiveTab('information');
  };

  const goToPrevious = () => {
    if (selectedIndex > 0) {
      openApplicant(filteredApplications[selectedIndex - 1], selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex < filteredApplications.length - 1) {
      openApplicant(filteredApplications[selectedIndex + 1], selectedIndex + 1);
    }
  };

  const handleDecision = (status) => {
    if (!selectedApplicant) {
      return;
    }

    const updated = applications.map((application) =>
      application.id === selectedApplicant.id ? { ...application, status } : application,
    );

    setApplications(updated);

    const updatedSelected = updated.find((application) => application.id === selectedApplicant.id);
    if (updatedSelected) {
      setSelectedApplicant(updatedSelected);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Recruitment</h1>
          <p className="text-sm text-slate-500">All Talent Acquisition</p>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[220px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <Filter size={16} />
            Filter
          </button>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-4 border-b border-slate-100 pb-3">
          <button
            type="button"
            onClick={() => setView('application')}
            className={`inline-flex items-center gap-2 border-b-2 pb-2 text-sm font-semibold transition ${
              view === 'application'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User size={16} />
            Application
          </button>
          <button
            type="button"
            onClick={() => setView('partner')}
            className={`inline-flex items-center gap-2 border-b-2 pb-2 text-sm font-semibold transition ${
              view === 'partner'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText size={16} />
            Partner University
          </button>
        </div>

        {view === 'application' ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_320px]">
            <div className="min-w-0 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">Intern Name</th>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">Intern ID</th>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">University</th>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">Program</th>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">Date</th>
                    <th className="border-b border-slate-100 px-3 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application, index) => (
                    <tr
                      key={`${application.id}-${index}`}
                      onClick={() => openApplicant(application, index)}
                      className={`cursor-pointer transition hover:bg-slate-50 ${
                        selectedApplicant?.id === application.id ? 'bg-slate-50/80' : ''
                      }`}
                    >
                      <td className="border-b border-slate-100 px-3 py-4 text-slate-900">{application.name}</td>
                      <td className="border-b border-slate-100 px-3 py-4 text-slate-700">{application.id}</td>
                      <td className="border-b border-slate-100 px-3 py-4 text-slate-700">{application.university}</td>
                      <td className="border-b border-slate-100 px-3 py-4 text-slate-700">{application.program}</td>
                      <td className="border-b border-slate-100 px-3 py-4 text-slate-700">{application.date}</td>
                      <td className="border-b border-slate-100 px-3 py-4">
                        <span className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${getStatusClasses(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedApplicant && (
              <aside className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    disabled={selectedIndex === 0}
                    className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    disabled={selectedIndex === filteredApplications.length - 1}
                    className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="mb-5 flex gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 via-rose-200 to-violet-200 text-xl font-semibold text-slate-700">
                    {selectedApplicant.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-[30px] font-semibold leading-tight text-slate-900">{selectedApplicant.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">company@gmail.com</p>
                    <span className={`mt-2 inline-flex rounded-md px-3 py-1 text-xs font-medium ${getStatusClasses(selectedApplicant.status)}`}>
                      {selectedApplicant.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex gap-6 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('information')}
                    className={`inline-flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
                      activeTab === 'information'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <User size={16} />
                    Information
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('documents')}
                    className={`inline-flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
                      activeTab === 'documents'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText size={16} />
                    Documents
                  </button>
                </div>

                {activeTab === 'information' ? (
                  <div className="space-y-5">
                    {[
                      ['University', selectedApplicant.university],
                      ['Program', selectedApplicant.program],
                      ['Year Level', '3rd Year'],
                      ['Required Hours', '240 Hours'],
                      ['Preferred Department', 'IT Department'],
                    ].map(([label, value]) => (
                      <div key={label} className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                        <p className="mb-1 text-xs text-slate-400">{label}</p>
                        <p className="text-sm font-medium text-slate-800">{value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => (
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
                    ))}

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleDecision('Rejected')}
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDecision('Approved')}
                        className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                )}
              </aside>
            )} 
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {PARTNER_SUMMARY.map((card) => (
                <div
                  key={card.label}
                  className={`flex items-center justify-between rounded-2xl border p-4 ${
                    card.tone === 'emerald'
                      ? 'border-emerald-200 bg-emerald-50'
                      : card.tone === 'amber'
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-rose-200 bg-rose-50'
                  }`}
                >
                  <div>
                    <p className="text-sm text-slate-500">{card.label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{card.value}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/60 text-sm font-semibold text-slate-700">
                    {card.icon}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                Add Partner University
              </button>
            </div>

            <div className="space-y-3">
              {PARTNER_ITEMS.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-violet-200" />
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
