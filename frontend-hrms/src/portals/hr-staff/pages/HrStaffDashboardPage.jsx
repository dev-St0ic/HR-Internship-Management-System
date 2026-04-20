import '../../../assets/styles/hr-staff-dashboard.css';
import '../../../assets/styles/staff-management.css';
import DashboardOverviewSection from '../components/dashboard/DashboardOverviewSection';
import DashboardStatCard from '../components/dashboard/DashboardStatCard';
import DashboardWorkspacePanel from '../components/dashboard/DashboardWorkspacePanel';
import NotificationIcon from '../components/staff-management/NotificationIcon';
import { statIconMap } from '../utils/dashboard/constants';
import { useHrStaffDashboardState } from '../utils/dashboard/useHrStaffDashboardState';

export default function HrStaffDashboardPage() {
  const state = useHrStaffDashboardState();

  return (
    <div className="staff-management-layout"><aside className="sidebar">{/* layout handled by parent */}</aside><main className="main-content hr-dashboard-page-content"><div className="header-row"><div><h2>Dashboard</h2><span className="subtitle">Operational triage for recruitment, attendance review, document validation, and staff actions</span></div><NotificationIcon /></div><DashboardOverviewSection summary={state.summary} loadError={state.loadError} isLoading={state.isLoading} syncMessage={state.syncMessage} /><section className="hr-dashboard-stats-grid" aria-label="Dashboard overview metrics">{state.summary.stats.map((stat) => <DashboardStatCard key={stat.key} stat={{ ...stat, icon: statIconMap[stat.key] }} />)}</section><DashboardWorkspacePanel quickActions={state.quickActions} queueLinks={state.queueLinks} /></main></div>
  );
}