import { dashboardStats } from "../../../common/config/mockData";
import { iconMap } from "../../../common/config/iconMap";
import StatCard from "../../../common/components/ui/StatCard";
import CalendarPanel from "../components/ui/CalendarPanel";
import TimeCard from "../components/ui/TimeCard";
import { mockTasks } from "../components/mockTasks";
import TaskListCard from "../components/ui/TaskListCard";
import { useAuth } from "../../../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const stats = dashboardStats.intern;

  return (
    <div className="w-full mt-2 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              return (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={Icon ? <Icon size={20} /> : null}
                  date={stat.date}
                />
              );
            })}
          </div>

          <TimeCard />
          <TaskListCard tasks={mockTasks} />
        </div>

        {/* Right Side Calendar */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <CalendarPanel />
          </div>
        </div>
      </div>
    </div>
  );
}