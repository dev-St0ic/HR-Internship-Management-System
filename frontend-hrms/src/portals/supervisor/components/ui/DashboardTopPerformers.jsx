import { useAuth } from "../../../../contexts/AuthContext";

export default function DashboardTopPerformers({ limit = 8 }) {
  const { currentUser } = useAuth();

  const usersDb = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");

  const evaluationDb = JSON.parse(
    localStorage.getItem("hrims_evaluations_db") || "[]",
  );

  //Will only get this supervisors evaluation
  const supervisorEvaluations = evaluationDb.filter(
    (evaluation) => evaluation.supervisorId === currentUser?.id,
  );

  //Will get the highest/latest score per intern
  const performersMap = supervisorEvaluations.reduce((acc, evaluation) => {
    const intern = usersDb[evaluation.internId];

    if (!intern) return acc;

    const existing = acc[evaluation.internId];

    //Will keep the highest score
    if (!existing || evaluation.totalScore > existing.totalScore) {
      acc[evaluation.internId] = {
        internId: evaluation.internId,
        name: intern.name || evaluation.internName,
        course: intern.department || "No course",
        totalScore: evaluation.totalScore || 0,
        avatar: intern.avatar || "",
      };
    }

    return acc;
  }, {});

  //Will sort into descending
  const topPerformer = Object.values(performersMap)
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, limit);

  return (
    <div className="card-panel">
      {/* Header */}
      <h2 className="mb-4 border-b border-gray-200 pb-4 text-lg font-semibold text-gray-900">
        Top Performers
      </h2>

      {/* Performer list */}
      <div className="space-y-4">
        {topPerformer.length > 0 ? (
          topPerformer.map((performer) => {
            const displayAvatar =
              performer.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                performer.name,
              )}&background=f3f4f6&color=374151`;

            return (
              <div
                key={performer.internId}
                className="flex items-center justify-between"
              >
                {/* Left Side */}
                <div className="flex items-center gap-3">
                  <img
                    src={displayAvatar}
                    alt={performer.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {performer.name}
                    </p>
                    <p className="text-xs text-gray-400">{performer.course}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-400">No evaluated interns yet</p>
        )}
      </div>
    </div>
  );
}
