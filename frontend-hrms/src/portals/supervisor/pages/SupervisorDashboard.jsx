import DashboardCard from "../components/ui/DashboardCard";
import DashboardQuickActions from "../components/ui/DashboardQuickActions";
import DashboardRecentActivity from "../components/ui/DashboardRecentActivity";
import DashboardTopPerformers from "../components/ui/DashboardTopPerformers";
import GreetingHeader from "../../../common/components/ui/GreetingHeader";
import RecentActivityCard from "../../../common/components/ui/RecentActivityCard";
import { useAuth } from "../../../contexts/AuthContext";

export default function SupervisorDashboard() {
  const { currentUser } = useAuth();

  // This will get the users from local storage
  // Will soon be replaced by api calls
  const usersDb = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");

  //This will only get the interns assigned to this particular supervisor
  const assignedIntern = Object.values(usersDb).filter(
    (user) => user?.role === "INTERN" && user?.supervisorId === currentUser?.id,
  );

  // Will count the overdue tasks
  const overdueTasks = assignedIntern.reduce((total, intern) => {
    const tasks = intern.task || [];

    return total + tasks.filter((task) => task.status === "Overdue").length;
  }, 0);

  // This will get the attendance request reviews
  const attendanceRequest =
    JSON.parse(localStorage.getItem("hrims_attendance_requests")) || [];

  // Count the pending DTR/Attendance requests under the supervisors
  const dtrToReview = attendanceRequest.filter(
    (request) =>
      request?.supervisorId === currentUser?.id &&
      request?.status === "Pending",
  ).length;

  //Gets the evaluations
  //This will also be replaced by an api call
  const evaluationsDb = JSON.parse(
    localStorage.getItem("hrims_evaluations_db") || "[]",
  );

  //Will get the evaluations made by this supervisor
  const supervisorEvaluation = evaluationsDb.filter(
    (evaluation) => evaluation.supervisorId === currentUser?.id,
  );

  //This will compute the average performance from total score
  const avgPerformance =
    supervisorEvaluation.length > 0
      ? (
          supervisorEvaluation.reduce(
            (sum, evaluation) => sum + (evaluation.totalScore || 0),
            0,
          ) /
          supervisorEvaluation.length /
          5
        ).toFixed(1)
      : "0.0";

  // Stats to send to dashboard card
  const dashboardStats = {
    totalInterns: assignedIntern.length,
    dtrToReview,
    overdueTasks,
    avgPerformance,
  };

  return (
    <div id="supervisor-dashboard" className="space-y-6">
      {/* Greeting Header */}
      <GreetingHeader name={currentUser?.name} />

      {/* Stats Card */}
      <div className="grid grid-cols-4 gap-4">
        <DashboardCard stats={dashboardStats} />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-3 gap-5 ">
        {/* Left side */}
        <div className="col-span-2 space-y-5">
          <DashboardQuickActions />
          <RecentActivityCard
            role="supervisor"
            userId={currentUser?.id}
            limit={8}
          />
        </div>

        {/* Right Side */}
        <div className="col-span-1">
          <DashboardTopPerformers />
        </div>
      </div>
    </div>
  );
}
