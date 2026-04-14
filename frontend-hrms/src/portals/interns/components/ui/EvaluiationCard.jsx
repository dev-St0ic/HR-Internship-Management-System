import { Star, MessageSquare, Target, CalendarDays, Briefcase } from "lucide-react";

const criteriaConfig = [
  { key: "workQuality", label: "Work Quality", Icon: Star, colorClass: "bg-purple-100 text-purple-600" },
  { key: "communication", label: "Communication", Icon: MessageSquare, colorClass: "bg-blue-100 text-blue-600" },
  { key: "initiative", label: "Initiative", Icon: Target, colorClass: "bg-pink-100 text-pink-500" },
  { key: "attendance", label: "Attendance", Icon: CalendarDays, colorClass: "bg-emerald-100 text-emerald-500" },
  { key: "professionalism", label: "Professionalism", Icon: Briefcase, colorClass: "bg-yellow-100 text-yellow-600" },
];

const MiniStar = ({ filled }) => (
  <Star className={`w-5 h-5 ${filled ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
);

export default function EvaluationCard({ evaluation }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition duration-200">
      
      {/* Card Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{evaluation.internName}</h3>
          <p className="text-sm font-medium text-gray-500 mt-1">{evaluation.date}</p>
        </div>
        <span className="px-3 py-1 text-xs font-bold bg-gray-200 text-gray-700 rounded-md">
          {evaluation.status}
        </span>
      </div>

      {/* Criteria Rows */}
      <div className="space-y-4 mb-6">
        {criteriaConfig.map((criteria) => (
          <div key={criteria.key} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${criteria.colorClass}`}>
                <criteria.Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-700">{criteria.label}</span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <MiniStar
                  key={starValue}
                  filled={evaluation.ratings[criteria.key] >= starValue}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Supervisor Comments */}
      <div className="mb-6 mt-8">
        <label className="block text-sm font-bold text-gray-900 mb-3">
          Supervisor Comment
        </label>
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <p className="text-sm text-gray-700 leading-relaxed">
            {evaluation.comments}
          </p>
        </div>
      </div>

      {/* Footer Score */}
      <div className="flex justify-between items-center pt-5 mt-2 border-t border-gray-100">
        <span className="text-lg font-bold text-gray-900">
          Total: {evaluation.totalScore}/25
        </span>
        <span className="text-lg font-bold text-yellow-500 uppercase tracking-wide">
          {evaluation.grade}
        </span>
      </div>

    </div>
  );
}