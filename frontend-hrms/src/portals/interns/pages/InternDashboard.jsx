import Header from "../../../common/components/layout/Header";
import { dashboardStats } from "../../../common/config/mockData";
import { iconMap } from "../../../common/config/iconMap";
import StatCard from "../../../common/components/ui/StatCard";
import GreetingHeader from "../../../common/components/ui/GreetingHeader";
import CalendarPanel from "../components/ui/CalendarPanel";
import TimeCard from "../components/ui/TimeCard";
import { internTasksData } from "../components/mochDataTasks";
import TaskListCard from "../components/ui/TaskListCard";

export default function Dashboard() {
  const stats = dashboardStats.intern;
  return (
    <>
      <Header title="Dashboard" subtitle="Overview & activity" />
      <GreetingHeader name="Dwight Robles" />
      <div className="grid grid-cols-3 gap-6 mt-5">
        {/* Left Side */}
        <div className="col-span-2 space-y-5">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
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
          <TaskListCard tasks={internTasksData.tasks} />
        </div>

        {/* Right Side */}
        <div className="col-span-1">
          <CalendarPanel />
        </div>
      </div>
    </>
  );
}
