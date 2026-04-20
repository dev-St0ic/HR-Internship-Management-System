import { hrStaffSidebarIconMap } from '../../../../common/config/appIconRegistry';

export default function DashboardOverviewSection({ summary, loadError, isLoading, syncMessage }) {
  return (
    <section className="hr-dashboard-overview-card"><div className="hr-dashboard-overview-main"><p className="hr-dashboard-kicker">HR staff command center</p><h1>{summary.greeting}</h1><p>{summary.overviewText}</p><div className="hr-dashboard-overview-metrics">{summary.overviewMetrics.map((metric) => <div key={metric.key} className="hr-dashboard-overview-metric"><span>{metric.label}</span><strong>{metric.value}</strong></div>)}</div></div><div className="hr-dashboard-overview-status"><div className={`hr-dashboard-sync-pill ${loadError ? 'is-error' : isLoading ? 'is-loading' : 'is-live'}`}><img src={hrStaffSidebarIconMap.dashboard.selected} alt="" aria-hidden="true" className="hr-dashboard-icon" /><span>{syncMessage}</span></div><p>This page is derived from the current recruitment, intern management, document vault, and department datasets.</p></div></section>
  );
}