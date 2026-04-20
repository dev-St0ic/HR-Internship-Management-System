import { formatDashboardValue } from '../../utils/dashboard/helpers';

export default function DashboardStatCard({ stat }) {
  return (
    <article className="hr-dashboard-card hr-dashboard-stat-card"><span className="hr-dashboard-icon-shell"><img src={stat.icon} alt="" aria-hidden="true" className="hr-dashboard-icon" /></span><div className="hr-dashboard-stat-copy"><span className="hr-dashboard-eyebrow">{stat.title}</span><strong>{formatDashboardValue(stat.value)}</strong><p>{stat.description}</p></div></article>
  );
}