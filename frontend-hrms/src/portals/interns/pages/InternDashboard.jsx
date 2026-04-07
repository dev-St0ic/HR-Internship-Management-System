import Header from "../../../common/components/layout/Header";
import { dashboardStats } from "../../../common/config/mockData";
import { iconMap } from "../../../common/config/iconMap";
import StatCard from "../../../common/components/ui/StatCard";

export default function Dashboard() {
  const stats = dashboardStats.intern;
  return (
    <>
      <Header title="Dashboard" subtitle="Overview & activity" />
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
        </div>

        {/* Right Side */}
        <div className="col-span-1">
          <div className="bg-white p-5 rounded-2xl shadow-sm border">
            calendar
          </div>
        </div>
      </div>
    </>
  );
}
