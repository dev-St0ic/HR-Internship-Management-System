import { useState, useEffect } from "react";
import {
  Search, SlidersHorizontal, User, FileText,
  Briefcase, X, Building2, GraduationCap
} from "lucide-react";

export default function Myrecruitmentpage() {
  const [tab, setTab] = useState("Application");
  const [selId, setSelId] = useState(null);
  const [search, setSearch] = useState("");
  const [f, setF] = useState({ 
    open: false, progs: [], stats: [], tProgs: [], tStats: [] 
  });
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");
    setApps(Object.values(db).filter(u => u.role === "INTERN").map(u => ({
      ...u, prog: u.course || "Program", uni: u.university || "University",
      date: u.duration?.split(" - ")[0] || "Date", hrs: u.hours || "200 hrs",
      status: "Pending",
    })));
  }, []);

  const progs = [...new Set(apps.map(a => a.prog))];
  const stats = ["Pending", "Approved", "Rejected", "Deploy"];
  const unis = [...new Set(apps.map(a => a.uni))].map((name, id) => ({
    id, name, status: "Active Partner"
  }));
  const selApp = apps.find(a => a.id === selId);

  const filtered = apps.filter(a => {
    const sMatch = (a.name || "").toLowerCase().includes(search.toLowerCase());
    const tMatch = tab === "For Admin Approval"
      ? ["Approved", "Deploy"].includes(a.status)
      : ["Pending", "Approved", "Rejected"].includes(a.status);
    return sMatch && (!f.progs.length || f.progs.includes(a.prog)) &&
           (!f.stats.length || f.stats.includes(a.status)) && tMatch;
  });

  const toggle = (l, v) => setF(p => ({
    ...p, [l]: p[l].includes(v) ? p[l].filter(i => i !== v) : [...p[l], v]
  }));
  
  const setStat = s => {
    if (selId) setApps(c => c.map(a => a.id === selId ? { ...a, status: s } : a));
  };

  const getBadge = s => {
    const c = { Pending: "bg-[#FFF9E5] text-[#D97706]", 
                Approved: "bg-green-100 text-green-700",
                Rejected: "bg-red-100 text-red-700", 
                Deploy: "bg-gray-800 text-white" };
    return `px-2.5 py-1 rounded text-xs font-semibold ${c[s] || "bg-gray-200"}`;
  };

  const btn = "flex-1 py-2.5 rounded-lg text-sm font-bold transition-colors";
  const td = "px-3 py-4 border-b border-gray-50 text-sm text-gray-600 truncate";
  const lbl = "text-[11px] uppercase tracking-wider font-semibold text-gray-400 mb-1";
  const selCls = "w-full text-sm font-semibold outline-none border-b " + 
                 "border-gray-200 pb-1.5 cursor-pointer";

  return (
    <div className="p-6 relative">
      <div className="flex gap-6 items-start">
        
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1 min-w-0">
          <div className="flex justify-between items-center mb-4">

            <div className="relative w-80">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder={tab === "Partner University" ? "Search Universities.." : "Search Applicants..."}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md 
                            text-sm outline-none focus:border-violet-400" />
            </div>
            {tab !== "Partner University" && (
              <button onClick={() => setF(p => ({ ...p, open: true, tProgs: p.progs, tStats: p.stats }))}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 
                           rounded-md text-sm text-gray-700 hover:bg-gray-50">
                <SlidersHorizontal size={16} /> Filter
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          {f.open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setF(p => ({ ...p, open: false }))} />
              <div className="absolute right-12 top-24 z-50 w-[340px] bg-white border 
                              border-gray-100 shadow-xl rounded-xl p-6">
                <div className="flex justify-between mb-5">
                  <h3 className="font-semibold text-gray-900">Filter</h3>
                  <X size={18} className="cursor-pointer text-gray-400" 
                     onClick={() => setF(p => ({ ...p, open: false }))} />
                </div>
                {[{ t: "Program", k: "tProgs", l: progs }, { t: "Status", k: "tStats", l: stats }].map(g => (
                  <div key={g.t} className="mb-6">
                    <p className={lbl}>{g.t}</p>

                    <div className={g.k === "tProgs" ? "space-y-3 max-h-48 overflow-y-auto" : "grid grid-cols-2 gap-3"}>
                      {g.l.map(i => (
                        <label key={i} className="flex gap-3 text-sm text-gray-600 cursor-pointer items-center">
                          <input type="checkbox" checked={f[g.k].includes(i)} onChange={() => toggle(g.k, i)} 
                                 className="w-4 h-4 rounded accent-violet-600 cursor-pointer" /> {i}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-3">
                  <button onClick={() => setF(p => ({ ...p, tProgs: [], tStats: [] }))} 
                          className={`${btn} bg-gray-100 hover:bg-gray-200 text-gray-700`}>Reset</button>
                  <button onClick={() => setF(p => ({ ...p, open: false, progs: p.tProgs, stats: p.tStats }))} 
                          className={`${btn} bg-violet-600 text-white hover:bg-violet-700`}>Apply</button>
                </div>
              </div>
            </>
          )}

          {/* Tabs */}
          <div className="flex border-b border-gray-100 mb-4">
            {[{ id: "Application", i: <User size={16} /> }, { id: "For Admin Approval", i: <FileText size={16} /> }, { id: "Partner University", i: <Briefcase size={16} /> }].map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); setSelId(null); setSearch(""); }}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 
                           ${tab === t.id ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500 hover:text-gray-800"}`}>
                {t.i}{t.id}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="mt-4">
            {tab === "Partner University" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-2">
                {unis.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(u => (
                  <div key={u.id} className="group flex flex-col cursor-pointer">
                    <div className="aspect-video bg-gray-50 rounded-xl flex items-center justify-center 
                                    relative overflow-hidden mb-3 border border-gray-100">
                      <GraduationCap size={48} className="text-gray-300 group-hover:scale-110 group-hover:text-violet-200 transition-all duration-500" />
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/75 text-white text-[9px] font-bold rounded">{u.status.toUpperCase()}</div>
                    </div>
                    <div className="flex gap-3 px-1">
                      <div className="w-9 h-9 rounded-full bg-violet-50 
                                text-violet-600 flex items-center 
                                justify-center shrink-0 mt-0.5 border 
                                border-violet-100">
                        <Building2 size={18} />
                    </div>
                      <div className="flex flex-col overflow-hidden">
                            <h4 className="text-gray-900 font-bold text-sm truncate group-hover:text-violet-600">{u.name}</h4>
                            <p className="text-xs text-gray-500 mt-1 truncate">Educational Institution</p>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse">
                  <thead>
                    <tr className="text-left text-gray-800 border-b border-gray-100">
                      {[{ l: "Intern Name", w: "18%" }, 
                        { l: "University", w: "28%" }, 
                        { l: "Program", w: "24%" }, 
                        { l: "Date", w: "10%" }, 
                        { l: "Hours", w: "10%" }, 
                        { l: "Status", w: "10%" }
                    ].map(h => (
                        <th key={h.l} className={`px-3 pb-3 font-semibold text-sm w-[${h.w}]`}>{h.l}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length ? filtered.map(r => (
                      <tr key={r.id} onClick={() => setSelId(r.id)} 
                          className={`cursor-pointer transition-colors 
                          ${selId === r.id ? 
                          "bg-violet-50/60" : 
                          "hover:bg-gray-50"}`}
                    >
                        <td className="px-3 py-4 border-b border-gray-50 
                                text-sm font-medium text-gray-900 
                                truncate" title={r.name}>{r.name}
                        </td>
                        {['uni', 'prog', 'date', 'hrs'].map(k => 
                        <td key={k} className={td} title={r[k]}>{r[k]}</td>)}

                        <td className="px-3 py-4 border-b border-gray-50">
                            <span className={getBadge(r.status)}>{r.status}</span>
                        </td>

                      </tr>
                    )) : <tr><td colSpan="6" className="text-center py-12 text-gray-500">No applicants found!</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Details Right Sidebar */}
        {selApp && tab !== "Partner University" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 w-[340px] shrink-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">{selApp.name}</h2>
              <button onClick={() => setSelId(null)} 
                        className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><X size={18} />
            </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
              {[
                { l: "First Name", v: selApp.firstName || "-" }, 
                { l: "Last Name", v: selApp.lastName || "-" }, 
                { l: "Program", v: selApp.prog }, 
                { l: "OJT Hours", v: selApp.hrs }, 
                { l: "Email", v: selApp.email }, 
                { l: "Phone", v: selApp.phone }
            ].map(d => (
                <div key={d.l} className="min-w-0">
                    <p className={lbl}>{d.l}</p>
                    <p className="text-sm font-semibold text-gray-900 truncate" title={d.v}>{d.v}</p>
                </div>
              ))}
              
              {tab === "For Admin Approval" && (
                <>
                  <div className="col-span-2">
                    <p className={lbl}>Department</p>
                    <select className={selCls}>
                        <option>IT</option>
                        <option>HR</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <p className={lbl}>Supervisor</p>
                    <select className={selCls}>
                        <option>Sarah (Supervisor)</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 justify-end pt-5 border-t border-gray-100">
              {tab === "For Admin Approval" ? (
                <>
                  {selApp.status !== "Deploy" && 
                  <button onClick={() => setStat("Deploy")} 
                            className={`${btn} bg-violet-600 hover:bg-violet-700 text-white`}>
                                Deploy</button>} 
                  <button onClick={() => (selApp.status === "Deploy" ? setStat("Approved") : setSelId(null))}
                            className={`${btn} bg-gray-100 hover:bg-gray-200 text-gray-700`}>
                                Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setStat("Approved")} 
                        className={`${btn} bg-violet-600 hover:bg-violet-700 text-white`}>Approve</button> 
                  <button onClick={() => setStat("Rejected")} 
                        className={`${btn} bg-red-500 hover:bg-red-600 text-white`}>Reject</button>
                </>
              )}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}