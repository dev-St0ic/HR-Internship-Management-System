import {
  Star,
  MessagesSquare,
  Target,
  Calendar,
  Briefcase,
} from "lucide-react";

const criteriaList = [
  {
    key: "workQuality",
    label: "Work Quality",
    Icon: Star,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    key: "communication",
    label: "Communication",
    Icon: MessagesSquare,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    key: "initiative",
    label: "Initiative",
    Icon: Target,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    key: "attendance",
    label: "Attendance",
    Icon: Calendar,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    key: "professionalism",
    label: "Professionalism",
    Icon: Briefcase,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
];

function RatingStars({ value }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            value >= star
              ? "text-yellow-400 fill-yellow-400"
              : "yext-yellow-200"
          }
        />
      ))}
    </div>
  );
}

export default function EvaluationSection({ user }) {
  // TODO: Replace localStorage evaluation fetch with backend API
  // Example:
  // GET /evaluations/:internId
  const allEvaluations = JSON.parse(
    localStorage.getItem("hrims_evaluations_db") || "[]",
  );

  const userEvaluations = allEvaluations.filter(
    (evaluation) => evaluation.internId === user.id,
  );

  const latestEvaluation =
    userEvaluations.length > 0
      ? userEvaluations[userEvaluations.length - 1]
      : null;

  if (!latestEvaluation) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Intern Performance Evaluation
        </h2>
        <p className="text-sm text-gray-400">No evaluation submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Intern Performance Evaluation
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Evaluated By: {latestEvaluation.supervisorName || "Supervisor Name"}
          </p>
        </div>

        <span className="px-3 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-600">
          {latestEvaluation.status || "Completed"}
        </span>
      </div>

      {/* Criteria */}
      <div className="space-y-4 mb-6">
        {criteriaList.map((criteria) => {
          const Icon = criteria.Icon;
          const rating = latestEvaluation.ratings?.[criteria.key] || 0;

          return (
            <div
              key={criteria.key}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${criteria.iconBg}`}
                >
                  <Icon size={16} className={criteria.iconColor} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {criteria.label}
                </span>
              </div>

              <RatingStars value={rating} />
            </div>
          );
        })}
      </div>

      {/* Comments */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-2">
          Supervisor Comments
        </h3>
        <div className="border border-gray-200 rounded-lg p-3 text-sm text-gray-600 bg-gray-50">
          {latestEvaluation.comments || "No comments provided."}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 ">
        <p className="text-base font-bold text-gray-900">
          Total: {latestEvaluation.totalScore}/25
        </p>
        <p className="text-base font-bold uppercase text-yellow-500">
          {latestEvaluation.grade}
        </p>
      </div>
    </div>
  );
}
