import { CheckSquare, Clock, AlertTriangle } from "lucide-react";

export default function TaskStatsCards({
  tasks,
  activeStatus,
  setActiveStatus,
}) {
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const overdue = tasks.filter((task) => task.status === "Overdue").length;

  const cards = [
    {
      title: "Completed Tasks",
      value: completed,
      status: "Completed",
      icon: CheckSquare,
      style: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Tasks",
      value: inProgress,
      status: "In Progress",
      icon: Clock,
      style: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Overdue Tasks",
      value: overdue,
      status: "Overdue",
      icon: AlertTriangle,
      style: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeStatus === card.status;

        return (
          <button
            key={card.status}
            onClick={() => setActiveStatus(isActive ? "All" : card.status)}
            className={`card-panel transition hover:shadow-md ${
              isActive ? "border-primary" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.style}`}
              >
                <Icon size={18} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-400">
                  {card.value} {card.title.toLowerCase()}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
