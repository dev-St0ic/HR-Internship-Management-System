import DashboardCard from "../components/ui/DashboardCard";
import DashboardQuickActions from "../components/ui/DashboardQuickActions";
import DashboardRecentActivity from "../components/ui/DashboardRecentActivity";
import DashboardTopPerformers from "../components/ui/DashboardTopPerformers";
import GreetingHeader from "../../../common/components/ui/GreetingHeader";
import { useAuth } from "../../../contexts/AuthContext";

export default function SupervisorDashboard() {
  const { currentUser } = useAuth();
  return (
    <div id="supervisor-dashboard">
      <div className="header mb-5">
        <GreetingHeader name={currentUser?.name} />
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
