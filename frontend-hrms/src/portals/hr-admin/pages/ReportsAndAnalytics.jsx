import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';

// Dummy data for metrics
const dummyMetrics = [
  { label: 'Active Interns', value: '28', accent: 'bg-emerald-500', text: 'text-emerald-700' },
  { label: 'Incoming Interns', value: '15', accent: 'bg-amber-400', text: 'text-amber-700' },
  { label: 'Finalizing Internship', value: '5', accent: 'bg-rose-400', text: 'text-rose-700' },
];

// Dummy data for internship overview
const dummyInternshipOverview = [
  { label: 'Figma', incoming: 95, active: 45, finalizing: 48 },
  { label: 'Sketch', incoming: 55, active: 25, finalizing: 20 },
  { label: 'XD', incoming: 35, active: 40, finalizing: 38 },
  { label: 'Photoshop', incoming: 75, active: 45, finalizing: 18 },
  { label: 'Illustrator', incoming: 58, active: 95, finalizing: 45 },
  { label: 'AfterEffect', incoming: 62, active: 98, finalizing: 55 },
  { label: 'InDesign', incoming: 40, active: 45, finalizing: 20 },
  { label: 'Maya', incoming: 60, active: 85, finalizing: 32 },
  { label: 'Premiere', incoming: 55, active: 98, finalizing: 68 },
  { label: 'Final Cut', incoming: 98, active: 58, finalizing: 18 },
];

// Dummy data for universities
const dummyUniversities = [
  { name: 'University 1', color: 'bg-cyan-500' },
  { name: 'University 2', color: 'bg-amber-500' },
  { name: 'University 3', color: 'bg-violet-500' },
];

// Dummy data for chart days
const dummyChartDays = [
  { week: 'Week 1', values: [32, 46, 22, 40, 28, 56, 50, 74, 64, 84, 76, 99] },
  { week: 'Week 2', values: [22, 36, 52, 56, 44, 48, 62, 84, 82, 92, 90, 96] },
  { week: 'Week 3', values: [38, 60, 34, 52, 66, 76, 72, 94, 88, 80, 96, 90] },
];

const chartHeight = 200;

/* Helper: build a clipPath polygon string from an array of values (0-100).
   It creates points across the X axis evenly spaced and maps Y to 100 - value (so higher value is higher on chart).
*/
function buildClipPath(values) {
  if (!values || values.length === 0) return 'polygon(0 100%, 100% 100%)';
  const step = 100 / (values.length - 1);
  const points = values.map((v, i) => {
    const x = Math.round(i * step);
    const y = Math.max(0, Math.min(100, 100 - v)); // clamp 0..100
    return `${x}% ${y}%`;
  });
  // polygon needs to start at bottom-left, go through points, then bottom-right and close
  return `polygon(0 100%, ${points.join(', ')}, 100% 100%)`;
}

export default function ReportsAndAnalytics() {
  const [metrics, setMetrics] = useState(dummyMetrics);

  // Commented out API call for metrics
  // useEffect(() => {
  //   fetch('/api/metrics')
  //     .then(res => res.json())
  //     .then(data => setMetrics(data))
  //     .catch(err => console.error('Error fetching metrics:', err));
  // }, []);

  const [internshipOverview, setInternshipOverview] = useState(dummyInternshipOverview);

  // Commented out API call for internship overview
  // useEffect(() => {
  //   fetch('/api/internship-overview')
  //     .then(res => res.json())
  //     .then(data => setInternshipOverview(data))
  //     .catch(err => console.error('Error fetching internship overview:', err));
  // }, []);

  const [universities, setUniversities] = useState(dummyUniversities);

  // Commented out API call for universities
  // useEffect(() => {
  //   fetch('/api/universities')
  //     .then(res => res.json())
  //     .then(data => setUniversities(data))
  //     .catch(err => console.error('Error fetching universities:', err));
  // }, []);

  const [chartDays, setChartDays] = useState(dummyChartDays);

  // Commented out API call for chart days
  // useEffect(() => {
  //   fetch('/api/chart-days')
  //     .then(res => res.json())
  //     .then(data => setChartDays(data))
  //     .catch(err => console.error('Error fetching chart days:', err));
  // }, []);

  // Calculate max value for scaling the bars
  const maxValue = useMemo(() => Math.max(...internshipOverview.flatMap(item => [item.incoming, item.active, item.finalizing])), [internshipOverview]);

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
          <div key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-700">{metric.label}</p>
                <p className={`mt-4 text-3xl font-semibold ${metric.text}`}>{metric.value}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl ${metric.accent}`} />
                <div className="rounded-2xl bg-slate-50 p-3 text-slate-700 shadow-sm">
                  <BarChart3 size={20} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Internship Overview */}
      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Internship Overview (Incoming, Active and Finalizing)</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                <Download size={16} />
                Export
              </button>
              <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none">
                <option>All Department</option>
              </select>
              <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none">
                <option>Week</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid gap-2">
              {internshipOverview.map((item) => {
                const total = item.incoming + item.active + item.finalizing || 1;
                const incomingPct = (item.incoming / total) * 100;
                const activePct = (item.active / total) * 100;
                const finalizingPct = (item.finalizing / total) * 100;
                // left offsets for stacked segments
                const incomingLeft = 0;
                const activeLeft = incomingPct;
                const finalizingLeft = incomingPct + activePct;

                return (
                  <div key={item.label} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="w-28">{item.label}</span>

                    <div className="flex-1 h-4 rounded-full bg-slate-100 overflow-hidden relative">
                      {/* Incoming (yellow) */}
                      <div
                        className="absolute left-0 top-0 h-full rounded-l-full rounded-r-none bg-amber-300"
                        style={{ left: `${incomingLeft}%`, width: `${incomingPct}%` }}
                      />
                      {/* Active (green) */}
                      <div
                        className="absolute top-0 h-full bg-emerald-300"
                        style={{ left: `${activeLeft}%`, width: `${activePct}%` }}
                      />
                      {/* Finalizing (red) */}
                      <div
                        className="absolute top-0 h-full rounded-r-full bg-rose-400"
                        style={{ left: `${finalizingLeft}%`, width: `${finalizingPct}%` }}
                      />
                    </div>

                    <span className="w-12 font-semibold text-slate-900">{item.incoming + item.active + item.finalizing}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right side: Universities + Task Completion */}
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Interns by University</h2>
              </div>
              <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">Export</button>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-slate-100">
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white text-3xl font-semibold text-slate-900">155</div>
              </div>
              <div className="space-y-3">
                {universities.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${item.color}`} />
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
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Task Completion Rate</h2>
              </div>
              <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">Export</button>
            </div>

            <div className="h-[320px] overflow-hidden rounded-3xl bg-slate-100 p-4">
              <div className="relative h-full w-full">
                {chartDays.map((series, idx) => {
                  const clip = buildClipPath(series.values);
                  const bgClass = idx === 0 ? 'bg-cyan-300/60' : idx === 1 ? 'bg-violet-400/60' : 'bg-emerald-300/50';
                  return (
                    <div
                      key={series.week}
                      className={`absolute bottom-0 left-0 h-full w-full rounded-3xl ${bgClass}`}
                      style={{ clipPath: clip }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">Week 1</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">Week 2</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Week 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}