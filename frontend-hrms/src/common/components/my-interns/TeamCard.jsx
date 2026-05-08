import InternRow from "./InternRow";

export default function TeamCard({
  teamName,
  members,
  onViewAll,
  onViewIntern,
}) {
  return (
    <div className="card-panel">
      <div className="mb-2 flex items-start justify-between border-b border-gray-200 py-4">
        <div>
          <h3 className="font-bold text-gray-900">{teamName}</h3>
          <p className="text-xs text-gray-400">{members.length} Members</p>
        </div>

        <button
          onClick={onViewAll}
          className="text-xs font-medium text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-2">
        {members.slice(0, 5).map((intern) => (
          <InternRow
            key={intern.id}
            intern={intern}
            onClick={() => onViewIntern(intern)}
          />
        ))}
      </div>
    </div>
  );
}
