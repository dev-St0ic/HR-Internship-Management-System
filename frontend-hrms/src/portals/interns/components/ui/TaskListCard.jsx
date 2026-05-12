import { useNavigate } from "react-router-dom";
import { Folder } from "lucide-react";

export default function TaskListCard({ tasks = [] }) {
  const navigate = useNavigate();

  //When a user clicks the task, this will route you to the tasks page on the actual task
  const handleClick = (taskId) => {
    navigate("/intern/tasks", {
      state: { selectedTaskId: taskId },
    });
  };

  //Filter that shows only active tasks
  const dashboardTasks = tasks
    .filter((task) => task.status !== "Completed")
    .slice(0, 5); // This will show only 5 tasks

  return (
    <div className="card-panel">
      {/*title*/}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold mb-3">Your Tasks for Today</h3>

        <button
          onClick={() => navigate("/intern/tasks")}
          className="text-xs text-primary font-medium hover:underline"
        >
          View All
        </button>
      </div>

      {/* Scrollable List */}
      <div className="space-y-3 max-h-50 overflow-y-auto">
        {dashboardTasks.length > 0 ? (
          dashboardTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleClick(task.id)}
              className="group flex items-center gap-3 pl-3 justify-start bg-primary-light p-3 font-medium text-primary rounded-lg cursor-pointer hover:bg-primary hover:text-white transition"
            >
              <div className="flex items-center justify-center w-6 h-6 bg-primary-light border border-primary text-primary rounded-full group-hover:bg-white transition">
                <Folder
                  size={14}
                  className="text-primary group-hover:text-primary"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="truncate text-sm">
                  {task.taskName || task.title}
                </p>

                <p className="text-xs text-gray-500 group-hover:text-primary-light transition">
                  Due: {task.deadline || "-"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center py-5">
            No active tasks.
          </p>
        )}
      </div>
    </div>
  );
}
