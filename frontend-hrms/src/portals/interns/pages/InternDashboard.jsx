import { useState, useEffect } from "react";
import { iconMap } from "../../../common/config/iconMap";
import StatCard from "../../../common/components/ui/StatCard";
import GreetingHeader from "../../../common/components/ui/GreetingHeader";
import CalendarPanel from "../components/ui/CalendarPanel";
import TimeCard from "../components/ui/TimeCard";
import TaskListCard from "../components/ui/TaskListCard";
import { useAuth } from "../../../contexts/AuthContext";
import useAttendanceSummary from "../hooks/useAttendanceSummary";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { totalLogged, remaining } = useAttendanceSummary();

  const [today, setToday] = useState(new Date());

  const [usersDb] = useState(() => {
    try {
      const storedUsers = localStorage.getItem("hrims_users_db");
      return storedUsers ? JSON.parse(storedUsers) : {};
    } catch (error) {
      console.log("Failed to load users DB: ", error);
      return {};
    }
  });

  useEffect(() => {
    const now = new Date();

    // Time until next midnight
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    const timeout = setTimeout(() => {
      setToday(new Date());
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [today]);

  const intern = usersDb[currentUser?.id];
  const tasks = intern?.tasks || [];

  const todayFormatted = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const stats = [
    {
      title: "Logged",
      value: `${totalLogged.toFixed(0)}h`,
      icon: "Clock",
      date: todayFormatted,
    },
    {
      title: "Remaining",
      value: `${remaining.toFixed(0)}h`,
      icon: "Clock",
      date: todayFormatted,
    },
  ];

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
          <TaskListCard tasks={tasks} />
        </div>

        {/* Right Side */}
        <div className="col-span-1">
          <CalendarPanel tasks={tasks} />
        </div>
      </div>
    </>
  );
}
