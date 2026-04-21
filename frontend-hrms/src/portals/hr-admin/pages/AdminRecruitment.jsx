import { Search, Funnel, X, Eye, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { dummyApplications, dummyDocuments } from '../../../common/config/mockData.jsx';

export default function Recruitment() {
  const [applications, setApplications] = useState(dummyApplications);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('information');
  const [documents, setDocuments] = useState(dummyDocuments);
  const [view, setView] = useState('application'); 


  // Reset tab when opening modal
  const openApplicant = (applicant, index) => {
    setActiveTab('information');
    setSelectedApplicant(applicant);
    setSelectedIndex(index);
  };

  // Navigate to previous applicant
  const goToPrevious = () => {
    if (selectedIndex > 0) {
      openApplicant(applications[selectedIndex - 1], selectedIndex - 1);
    }
  };

  // Navigate to next applicant
  const goToNext = () => {
    if (selectedIndex < applications.length - 1) {
      openApplicant(applications[selectedIndex + 1], selectedIndex + 1);
    }
  };

  // Commented out API call for applications
  // useEffect(() => {
  //   fetch('/api/applications')
  //     .then(res => res.json())
  //     .then(data => setApplications(data))
  //     .catch(err => console.error('Error fetching applications:', err));
  // }, []);

  return (
    <>
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
          <div className="flex flex-col gap-4 w-full">
            <div className="relative w-full md:w-[320px]">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="flex gap-3 rounded-2xl bg-slate-50 p-2 w-full md:w-auto">
              <button
                onClick={() => setView('application')}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition flex-1 md:flex-none ${
                  view === 'application'
                    ? 'text-indigo-600 bg-white'
                    : 'text-slate-500 hover:bg-white'
                }`}
              >
                👤Application
              </button>

              <button
                onClick={() => setView('partner')}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition flex-1 md:flex-none ${
                  view === 'partner'
                    ? 'text-indigo-600 bg-white'
                    : 'text-slate-500 hover:bg-white'
                }`}
              >
                🎓Partner University
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            {view === 'application' ? (
              <div className="overflow-x-auto">
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
                    {applications.map((application, index) => (
                      <tr key={application.id} className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer" onClick={() => openApplicant(application, index)}>
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
            ) : (
              <div className="space-y-6">
                {/* TOP CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Active */}
                  <div className="flex items-center justify-between border border-emerald-300 bg-emerald-50 rounded-2xl p-4">
                    <div>
                      <p className="text-sm text-slate-500">Active MOA</p>
                      <p className="text-2xl font-bold text-slate-900">22</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-200 rounded-lg flex items-center justify-center">
                      📋
                    </div>
                  </div>

                  {/* Expiring */}
                  <div className="flex items-center justify-between border border-amber-300 bg-amber-50 rounded-2xl p-4">
                    <div>
                      <p className="text-sm text-slate-500">Expiring MOA</p>
                      <p className="text-2xl font-bold text-slate-900">10</p>
                    </div>
                    <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
                      📁
                    </div>
                  </div>

                  {/* Expired */}
                  <div className="flex items-center justify-between border border-rose-300 bg-rose-50 rounded-2xl p-4">
                    <div>
                      <p className="text-sm text-slate-500">Expired MOA</p>
                      <p className="text-2xl font-bold text-slate-900">3</p>
                    </div>
                    <div className="w-10 h-10 bg-rose-200 rounded-lg flex items-center justify-center">
                      ❌
                    </div>
                  </div>
                </div>

                {/* ADD BUTTON */}
                <div className="flex justify-end">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
                    + Add Partner University
                  </button>
                </div>

                {/* LIST */}
                <div className="space-y-3">
                  {[1,2,3,4].map((item) => (
                    <div key={item} className="flex items-center justify-between border rounded-xl p-4 hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-300 rounded-full" />
                        <div>
                          <p className="font-medium text-slate-900">University</p>
                          <p className="text-sm text-slate-500">Date</p>
                        </div>
                      </div>
                      <span>⌄</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

      {/* Applicant Profile Side Panel */}
      {selectedApplicant && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setSelectedApplicant(null)}
          />
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto border-l border-slate-200">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={goToPrevious}
                  disabled={selectedIndex === 0}
                  className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-xl">‹</span>
                </button>
                <button 
                  onClick={goToNext}
                  disabled={selectedIndex === applications.length - 1}
                  className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-xl">›</span>
                </button>
              </div>

              {/* Profile Card */}
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {selectedApplicant.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{selectedApplicant.name}</h3>
                  <p className="text-sm text-slate-500 mb-2">company@gmail.com</p>
                  <span className="inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                    {selectedApplicant.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab('information')}
                  className={`pb-2 font-medium text-sm transition ${
                    activeTab === 'information'
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Information
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`pb-2 font-medium text-sm transition ${
                    activeTab === 'documents'
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Documents
                </button>
              </div>
            </div>

            <div className="px-6 py-6">
              {activeTab === 'information' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">University</label>
                    <p className="text-slate-900 font-medium">{selectedApplicant.university}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">Program</label>
                    <p className="text-slate-900 font-medium">{selectedApplicant.program}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">Year Level</label>
                    <p className="text-slate-900 font-medium">3rd Year</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">Required Hours</label>
                    <p className="text-slate-900 font-medium">240 Hours</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">Preferred Department</label>
                    <p className="text-slate-900 font-medium">IT Department</p>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-3">
                  {documents && documents.length > 0 ? (
                    documents.map((doc) => (
                      <div key={doc.id} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between hover:bg-slate-50">
                        <div>
                          <p className="font-medium text-slate-900 text-sm">{doc.title}</p>
                          <p className="text-xs text-slate-500">Uploaded: {doc.uploaded}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-200 rounded-lg" title="Preview">
                            <Eye size={16} className="text-slate-600" />
                          </button>
                          <button className="p-2 hover:bg-slate-200 rounded-lg" title="Download">
                            <Download size={16} className="text-slate-600" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm">No documents available</p>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 px-6 py-4 flex gap-3 sticky bottom-0 bg-white">
              <button 
                onClick={() => setSelectedApplicant(null)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                Reject
              </button>
              <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                Approve
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
