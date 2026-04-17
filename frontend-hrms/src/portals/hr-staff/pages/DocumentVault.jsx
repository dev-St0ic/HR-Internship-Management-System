import { Search, Upload, Download, Filter, FolderOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { dummyFolders } from '../../../common/config/mockData.jsx';

export default function DocumentVault() {
  const [folders, setFolders] = useState(dummyFolders);

  // Commented out API call for folders
  // useEffect(() => {
  //   fetch('/api/document-folders')
  //     .then(res => res.json())
  //     .then(data => setFolders(data))
  //     .catch(err => console.error('Error fetching folders:', err));
  // }, []);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Document Vault</h1>
          <p className="text-sm text-slate-500">Compliance & Record Keeping</p>
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
          <button className="inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            <Upload size={16} />
            Upload
          </button>
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
        <div className="grid gap-4 sm:grid-cols-3">
          {folders.map((folder) => (
            <div key={folder.title} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className={`${folder.color} flex h-14 w-14 items-center justify-center rounded-3xl`}>
                <FolderOpen size={24} className="text-slate-700" />
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">{folder.title}</p>
                <p className="mt-1 text-sm text-slate-500">{folder.files} files</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
          <FolderOpen size={40} className="mb-4 text-slate-400" />
          <p className="text-sm">Select a folder above or use the search bar to find a record</p>
        </div>
      </div>
    </div>
  );
}
