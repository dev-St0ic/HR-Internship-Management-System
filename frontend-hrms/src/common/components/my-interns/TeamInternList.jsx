import { ChevronLeft, Trash, Eye } from "lucide-react";

export default function TeamInternList({
  teamName,
  members,
  onBack,
  onViewIntern,
  onDeleteIntern,
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
      >
        <ChevronLeft size={16} />
        Back to Teams
      </button>

      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">{teamName}</h2>
        <p className="text-sm text-gray-400">{members.length} Members</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-200 shadpw-sm">
              <th className="px-3">Intern Name</th>
              <th className="px-3">Intern ID</th>
              <th className="px-3">University</th>
              <th className="px-3">Department</th>
              <th className="px-3">Started At</th>
              <th className="px-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((intern) => (
              <tr
                key={intern.id}
                onClick={() => onViewIntern(intern)}
                className="cursor-pointer border-b border-gray-200 shadow-sm transition hover:bg-purple-100"
              >
                <td className="px-3 py-3">{intern.name}</td>
                <td className="px-3">{intern.id}</td>
                <td className="px-3">{intern.university}</td>
                <td className="px-3">{intern.department}</td>
                <td className="px-3">
                  {intern.duration ? intern.duration.split(" - ")[0] : "N/A"}
                </td>
                <td className="px-3">
                  <span className="flex justify-center items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewIntern(intern);
                      }}
                      className="rounded p-2 hover:bg-primary-hover hover:text-white"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteIntern(intern.id);
                      }}
                      className="rounded p-2 hover:bg-primary-hover hover:text-white"
                    >
                      <Trash size={16} />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
