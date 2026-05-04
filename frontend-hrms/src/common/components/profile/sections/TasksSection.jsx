export default function TasksSection({ user }) {
  // TODO: Replace localStorage task fetch with backend API
  // Example:
  // GET /tasks/:internId

  const usersDb = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");
  const latestUser = usersDb[user.id];
  const userTasks = latestUser?.tasks || user?.tasks || [];

  const statusStyles = {
    Completed: "bg-green-100 text-green-600",
    "In Progress": "bg-yellow-100 text-yellow-600",
    Overdue: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <table className="w-full text-sm">
        <thead className="text-gray-400 text-xs text-left">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3">Tasks</th>
            <th className="px-4 py-3">Date Given</th>
            <th className="px-4 py-3">Deadline</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {userTasks.length > 0 ? (
            userTasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  <p className="font-medium">{task.taskName || task.title}</p>
                </td>

                <td className="px-4 py-3">
                  {task.startDate || task.dateGiven || "-"}
                </td>

                <td className="px-4 py-3">{task.deadline || "-"}</td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs ${
                      statusStyles[task.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {task.status || "In Progress"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-400">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
