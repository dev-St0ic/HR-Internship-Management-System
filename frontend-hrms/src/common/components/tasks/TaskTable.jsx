import { Search } from "lucide-react";

export default function TaskTable({ tasks, search, setSearch, onRowClick }) {
  const getStatusClass = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-600";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-600";
    if (status === "Overdue") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="card-panel">
      <div className="mb-5 flex items-center justify-between">
        <div className="relative w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <table className="w-full text-sm">
        <thead className="text-xs text-gray-400">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left">No. </th>
            <th className="px-4 py-3 text-left">Task Name</th>
            <th className="px-4 py-3 text-left">Start Date</th>
            <th className="px-4 py-3 text-left">Deadline</th>
            <th className="px-4 py-3 text-left">Finish Date</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr
                key={task.id}
                onClick={() => onRowClick(task)}
                className="cursor-pointer border-b border-gray-100 transition hover:bg-gray-50"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{task.taskName}</td>
                <td className="px-4 py-3">{task.startDate || "-"}</td>
                <td className="px-4 py-3">{task.deadline || "-"}</td>
                <td className="px-4 py-3">{task.finishDate || "-"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs ${getStatusClass(
                      task.status,
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-6 text-center text-gray-400">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
