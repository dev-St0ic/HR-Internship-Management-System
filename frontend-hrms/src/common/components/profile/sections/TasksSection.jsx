export default function TasksSection({ user }) {
  // TODO: Replace localStorage task fetch with backend API
  // Example:
  // GET /tasks/:internId

  const allTasks = JSON.parse(localStorage.getItem("hrims_tasks_db") || "[]");
  const userTasks = allTasks.filter((task) => task.internId === user.id);

  const priorityStyle = {
    High: "text-red-500",
    Moderate: "text-yellow-500",
    Low: "text-green-500",
  };

  const statusStyles = {
    Completed: "text-green-600",
    "In Progress": "text-blue-600",
    "Not Started": "test-gray-500",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <table className="w-full text-sm">
        <thead className="text-gray-400 text-xs text-left">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3">Tasks</th>
            <th className="px-4 py-3">Date Given</th>
            <th className="px-4 py-3">Deadline</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {userTasks.length > 0 ? (
            userTasks.map((tasks) => (
              <tr
                key={tasks.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{tasks.title}</td>
                <td className="px-4 py-3">{tasks.dateGiven || "-"}</td>
                <td className="px-4 py-3">{tasks.deadline || "-"}</td>
                <td
                  className={`px-4 py-3 ${
                    priorityStyle[tasks.priority] || "text-gray-700"
                  }`}
                >
                  {tasks.priority || "-"}
                </td>
                <td
                  className={`px-4 py-3 ${
                    statusStyles[tasks.status] || "text-gray-700"
                  }`}
                >
                  {tasks.status || "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
