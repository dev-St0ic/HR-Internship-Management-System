import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import {
  Users, CheckCircle, Activity, Building2,
  FileText, Briefcase, BarChart, ChevronDown
} from "lucide-react";

export default function MyDashboardPage() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({ tot: 0, cmp: 0, act: 0, uni: 0 });

  useEffect(() => {
    const db = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");
    const interns = Object.values(db).filter(u => u.role === "INTERN");
    
    setStats({
      tot: interns.length,
      cmp: interns.filter(u => u.status === "Completed").length,
      act: interns.filter(u => ["Deploy", "Active", "Approved"]
            .includes(u.status)).length,
      uni: new Set(interns.map(u => u.university).filter(Boolean)).size
    });
  }, []);

  // Dynamic Math for Percentages
  const actP = stats.tot ? Math.round((stats.act / stats.tot) * 100) : 0;
  const cmpP = stats.tot ? Math.round((stats.cmp / stats.tot) * 100) : 0;

  const kpis = [
    { t: "Total Interns", v: stats.tot, p: "100%", 
      c: "text-primary", bg: "bg-primary-light", i: <Users size={16} /> },
    { t: "Completed", v: stats.cmp, p: `${cmpP}%`, 
      c: "text-primary", bg: "bg-primary-light", i: <CheckCircle size={16}/>},
    { t: "Active Interns", v: stats.act, p: `${actP}%`, 
      c: "text-primary", bg: "bg-primary-light", i: <Activity size={16} /> },
    { t: "Universities", v: stats.uni, p: "100%", 
      c: "text-primary", bg: "bg-primary-light", i: <Building2 size={16} />}
  ];

  const acts = [
    { t: "New application submitted", d: "Description", 
      bg: "bg-blue-300" },
    { t: "Supervisor evaluation completed", d: "Description", 
      bg: "bg-success" },
    { t: "New DTR submitted", d: "Description", 
      bg: "bg-blue-300" },
    { t: "MOA uploaded", d: "Description", 
      bg: "bg-blue-300" }
  ];

  // Charts
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const card = "bg-white rounded-2xl shadow-sm border border-gray-100 p-6";
  const btnBase = "flex items-center justify-center gap-2 px-6 py-3 " +
                  "rounded-lg text-sm font-bold transition";

  const userName = currentUser?.name || currentUser?.firstName || "User";

  return (
    <div className="p-6 relative">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Hello {userName}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Good Morning</p>
      </div>

      {/* First row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
                      gap-5 mb-6">
        {kpis.map((k, idx) => (
          <div key={idx} className={card}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center 
                              justify-center ${k.bg} ${k.c}`}>
                {k.i}
              </div>
              <h3 className="text-sm font-semibold text-gray-700">
                {k.t}
              </h3>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900">
                {k.v}
              </span>
              <div className="flex items-center gap-1 bg-success-light 
                              text-success px-2 py-1 rounded 
                              text-[10px] font-bold">
                <span>▲</span> {k.p}
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-4">
              Update: March 16, 2026
            </p>
          </div>
        ))}
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Quick Actions */}
        <div className={`lg:col-span-2 ${card}`}>
          <h3 className="text-base font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className={`${btnBase} border border-primary-light 
                                text-primary bg-primary-light/50 
                                hover:bg-primary-light`}>
              <FileText size={16} /> Review Application
            </button>
            <button className={`${btnBase} bg-primary text-white 
                                hover:bg-primary-hover shadow-sm`}>
              <Briefcase size={16} /> Assign Department
            </button>
            <button className={`${btnBase} bg-primary text-white 
                                hover:opacity-90 shadow-sm`}>
              <BarChart size={16} /> Generate Report
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${card} row-span-2`}>
          <h3 className="text-base font-bold text-gray-900 mb-6">
            Recent Activity
          </h3>
          <div className="flex flex-col gap-6">
            {acts.map((a, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full shrink-0 
                                ${a.bg}`}></div>
                <div className="flex flex-col mt-0.5">
                  <h4 className="text-sm font-bold text-gray-900 
                                 leading-tight">
                    {a.t}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {a.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Chart */}
        <div className={`lg:col-span-2 ${card}`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-base font-bold text-gray-900">
              Attendance Overview
            </h3>
            <button className="flex items-center gap-2 px-3 py-1.5 
                               border border-gray-200 rounded-md 
                               text-xs font-semibold text-gray-600">
              Today <ChevronDown size={14} />
            </button>
          </div>

          <div className="h-64 flex items-end justify-between 
                          gap-2 pt-4 relative">
            <div className="absolute left-0 top-0 bottom-6 flex flex-col 
                            justify-between text-xs text-gray-400 
                            font-medium w-8">
              <span>100%</span><span>80%</span><span>60%</span>
              <span>40%</span><span>20%</span><span>0</span>
            </div>

            <div className="w-full pl-10 flex justify-between 
                            items-end h-full pb-6 relative">
              {days.map((d, i) => {
                const j1 = [0, 3, -2, 1, -4, 2, -1][i]; 
                const j2 = [0, -1, 2, -1, 3, -1, 1][i];
                
                const baseAct = actP || 50; 
                const baseCmp = cmpP || 30;

                const pAct = Math.max(0, baseAct + j1);
                const pCmp = Math.max(0, baseCmp + j2);
                const pRem = Math.max(0, 100 - pAct - pCmp);

                return (
                  <div key={d} className="flex flex-col items-center 
                                          justify-end gap-2 w-full h-full">
                    <div className="w-3 h-full flex flex-col justify-end 
                                    gap-1 rounded-full overflow-hidden">
                      <div className="w-full bg-error transition-all" 
                           style={{ height: `${pRem}%` }}></div>
                      <div className="w-full bg-warning transition-all" 
                           style={{ height: `${pCmp}%` }}></div>
                      <div className="w-full bg-primary transition-all" 
                           style={{ height: `${pAct}%` }}></div>
                    </div>
                    <span className="text-[11px] font-medium text-gray-500 
                                     absolute -bottom-1">
                      {d}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}