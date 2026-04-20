import Header from "../../../common/components/layout/Header";
import { dashboardStats } from "../../../common/config/mockData";
import { iconMap } from "../../../common/config/iconMap";
import StatCard from "../../../common/components/ui/StatCard";
import GreetingHeader from "../../../common/components/ui/GreetingHeader";
import CalendarPanel from "../components/ui/CalendarPanel";
import TimeCard from "../components/ui/TimeCard";
import { mockTasks } from "../components/mockTasks";
import TaskListCard from "../components/ui/TaskListCard";
import { useAuth } from "../../../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const stats = dashboardStats.intern;
  return (
    <>
      <GreetingHeader name={currentUser?.name} />
      <div className="grid grid-cols-3 gap-8 mt-5 px-6 max-w-7xl mx-auto">
        {/* Left Side */}
        <div className="col-span-2 space-y-5 max-w-3xl">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.icon];

              return (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={Icon ? <Icon size={18} /> : null}
                  date={stat.date}
                />
              );
            })}
          </div>

          {/* Other Component */}
          <TimeCard />
          <TaskListCard tasks={mockTasks} />
        </div>

        {/* Right Side */}
        <div className="col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-full">
            <CalendarPanel />
          </div>
        </div>
      </div>
    </>
  );
}
