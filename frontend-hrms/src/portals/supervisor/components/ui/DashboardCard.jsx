import {
  UsersRound,
  CalendarCheck,
  ScrollText,
  BriefcaseBusiness,
} from "lucide-react";

const cards = [
  {
    key: "totalInterns",
    title: "Total Interns",
    subtitle: "Under your Supervision",
    icon: UsersRound,
  },
  {
    key: "dtrToTeview",
    title: "DTR to Review",
    subtitle: "DTR Submissions",
    icon: CalendarCheck,
  },
  {
    key: "overdueTasks",
    title: "Overdue Tasks",
    subtitle: "Across All Interns",
    icon: ScrollText,
  },
  {
    key: "avgPerformance",
    title: "Avg. Performance",
    subtitle: "Based on Evaluations",
    icon: BriefcaseBusiness,
  },
];

export default function DashboardCard({ stats }) {
  return (
    <>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between"
          >
            <div className="p-4">
              {/* Card Header */}
              <div className="mb-3 flex items-center gap-2">
                {/* Icon */}
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="text-primary" size={18} />
                </div>

                {/* Title */}
                <h1 className="text-sm text-gray-700">{card.title}</h1>
              </div>

              {/* Card Content */}
              <h1 className="text-3xl font-bold text-gray-900">
                {stats?.[card.key] ?? 0}
              </h1>
            </div>

            {/* Card Footer */}
            <div className="border-t border-gray-100 px-4 py-2">
              <span className="text-xs text-gray-400">{card.subtitle}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
