import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';
import { dummyMetrics, dummyInternshipOverview, dummyUniversities, dummyChartDays } from '../../../common/config/mockData.jsx';

export default function ReportsAndAnalytics() {
  const metrics = dummyMetrics;
  const internshipOverview = dummyInternshipOverview;
  const universities = dummyUniversities;
  const chartDays = dummyChartDays;

  const totalIncoming = useMemo(() => internshipOverview.reduce((sum, item) => sum + item.incoming, 0), [internshipOverview]);
  const totalActive = useMemo(() => internshipOverview.reduce((sum, item) => sum + item.active, 0), [internshipOverview]);
  const totalFinalizing = useMemo(() => internshipOverview.reduce((sum, item) => sum + item.finalizing, 0), [internshipOverview]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500">Performance Tracking</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100">
          <TrendingUp size={16} />
          Export report
        </button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                  <p className={`mt-4 text-3xl font-semibold ${metric.text}`}>{metric.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${metric.accent}`}>
                  <BarChart3 size={20} className="text-white" />
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 text-xs text-slate-500">Updated monthly</div>
          </div>
        ))}
      </div>

      {/* Internship Overview */}
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Internship Overview</h2>
              <p className="text-sm text-slate-500">Incoming, active, and finalizing internships this quarter</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                <Download size={16} />
                Export
              </button>
              <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none">
                <option>All Departments</option>
              </select>
              <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none">
                <option>Week</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-end justify-between gap-4 h-[340px] px-3">
                {internshipOverview.map((item) => {
                  const total = item.incoming + item.active + item.finalizing || 1;
                  const incomingHeight = (item.incoming / total) * 100;
                  const activeHeight = (item.active / total) * 100;
                  const finalizingHeight = (item.finalizing / total) * 100;
                  return (
                    <div key={item.label} className="flex h-full flex-col items-center gap-3">
                      <div className="relative flex h-full w-8 flex-col justify-end overflow-hidden bg-slate-100">
                        <div className="bg-rose-400" style={{ height: `${finalizingHeight}%` }} />
                        <div className="bg-emerald-400" style={{ height: `${activeHeight}%` }} />
                        <div className="bg-amber-300" style={{ height: `${incomingHeight}%` }} />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-semibold text-slate-900">{totalIncoming}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Incoming</p>
                </div>
                <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-semibold text-slate-900">{totalActive}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Active</p>
                </div>
                <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-semibold text-slate-900">{totalFinalizing}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Finalizing</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">Interns by University</h3>
                  <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">Export</button>
                </div>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                  <div className="flex h-44 w-44 items-center justify-center rounded-full bg-slate-100">
                    <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white text-3xl font-semibold text-slate-900">155</div>
                  </div>
                  <div className="space-y-3">
                    {universities.map((item) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <span className={`h-3.5 w-3.5 rounded-full ${item.color}`} />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-500">Interns by university</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">Task Completion Rate</h3>
                  <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">Export</button>
                </div>
                <div className="h-[240px] overflow-hidden rounded-3xl bg-slate-100 p-4">
                  <svg viewBox="0 0 360 220" className="h-full w-full">
                    <defs>
                      <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g opacity="0.2">
                      {[0, 50, 100, 150, 200].map((y) => (
                        <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#94a3b8" strokeWidth="1" />
                      ))}
                    </g>
                    {chartDays.map((series, idx) => {
                      const pathData = series.values
                        .map((value, index) => {
                          const x = (360 / (series.values.length - 1)) * index;
                          const y = 200 - (value / 100) * 180;
                          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                        })
                        .join(' ');
                      return (
                        <g key={series.week}>
                          <path d={`${pathData} L 360 200 L 0 200 Z`} fill={`url(#gradient${idx + 1})`} />
                          <path d={pathData} fill="none" stroke={idx === 0 ? '#22c55e' : idx === 1 ? '#a855f7' : '#38bdf8'} strokeWidth="3" />
                        </g>
                      );
                    })}
                    {Array.from({ length: 6 }).map((_, index) => {
                      const x = (360 / 5) * index;
                      return <line key={index} x1={x} y1="0" x2={x} y2="200" stroke="#94a3b8" opacity="0.12" />;
                    })}
                  </svg>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Week 1</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">Week 2</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">Week 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}