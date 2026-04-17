import DashboardCard from '../components/ui/DashboardCard';
import DashboardQuickActions from '../components/ui/DashboardQuickActions';
import DashboardRecentActivity from '../components/ui/DashboardRecentActivity';
import DashboardTopPerformers from '../components/ui/DashboardTopPerformers';

export default function SupervisorDashboard() {
  return (
    <div id="supervisor-dashboard">
      <div className="header mb-5">
        <h1 className="font-medium text-lg">Hello [Name]</h1>
        <span className="text-sm text-gray-500">
          Good Morning! Here's your Overview
        </span>
      </div>

      <div className="grid grid-cols-8 grid-rows-10 gap-4 flex wrap">
        <DashboardCard />
        <DashboardQuickActions />
        <DashboardTopPerformers />
        <DashboardRecentActivity />
      </div>
    </div>
  );
}
