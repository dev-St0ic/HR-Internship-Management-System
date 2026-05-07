import {
  Clock,
  FileText,
  ClipboardCheck,
  Upload,
  UserPlus,
  CalendarCheck,
  FileClock,
  ShieldCheck,
  BriefcaseBusiness,
  CheckCircle2,
  BellRing,
  TimerReset,
  FolderOpen,
  UserCheck,
  FileBadge,
  ScrollText,
} from "lucide-react";

const activityIconMap = {
  // Attendance
  TIME_IN: Clock,
  TIME_OUT: TimerReset,
  DTR_SUBMITTED: CalendarCheck,
  ATTENDANCE_REQUEST: FileClock,

  // Tasks
  TASK_ASSIGNED: ClipboardCheck,
  TASK_SUBMITTED: CheckCircle2,
  TASK_OVERDUE: BellRing,

  // Documents
  DOCUMENT_SUBMITTED: Upload,
  DOCUMENT_REQUEST: FolderOpen,
  MOA_UPLOADED: FileBadge,

  // Recruitment
  APPLICATION_SUBMITTED: UserPlus,
  INTERN_ACCEPTED: UserCheck,

  // Evaluations
  EVALUATION_COMPLETED: ShieldCheck,

  // System
  LOGIN: BriefcaseBusiness,
  LOGOUT: ScrollText,
};

export default function RecentActivityCard({
  role,
  userId,
  limit = 5,
  initialVisible = 3,
}) {
  const activities =
    //JSON.parse(localStorage.getItem("hrims_recent_activities")) || [];
    JSON.parse(localStorage.getItem("hrims_system_logs")) || [];

  const visibleActivities = activities
    .filter((activity) => {
      if (role === "supervisor" || role === "SUPERVISOR") {
        return (
          activity.audience?.includes("supervisor") &&
          activity.supervisorId === userId
        );
      }

      if (role === "hr-staff") {
        return activity.audience?.includes("hr-staff");
      }

      if (role === "hr-admin") {
        return activity.audience?.includes("hr-admin");
      }

      return false;
    })
    .slice(0, limit);

  return (
    <div className="card-panel">
      <h2 className="mb-4 w-full border-b border-gray-200 pb-4 text-lg font-semibold text-gray-900">
        Recent Activity
      </h2>
      <div className="space-y-2">
        {/* First visible items */}
        <div className="space-y-2">
          {visibleActivities.length > 0 ? (
            <div
              className="space-y-2 overflow-y-auto pr-1 no-scrollbar"
              style={{
                maxHeight: `${initialVisible * 115}px`,
              }}
            >
              {visibleActivities.map((activity) => {
                const Icon = activityIconMap[activity.type] || FileText;

                return (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    Icon={Icon}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No recent activity yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ activity, Icon }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
        <p className="text-xs text-gray-500">{activity.description}</p>
        <p className="mt-1 text-[11px] text-gray-400">
          {new Date(activity.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
