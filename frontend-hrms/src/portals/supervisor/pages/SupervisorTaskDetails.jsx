import { ChevronDown, PenLine, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../../common/components/profile/ProfileHeader";
import { formatDateForDisplay } from "../../../common/utils/dateHelper";
import EditTaskModal from "../components/ui/EditTaskModal";

export default function SupervisorTaskDetails() {
  const { internId } = useParams();

  // Load users database from localStorage
  const [usersDb, setUsersDb] = useState(() => {
    try {
      const storedUsers = localStorage.getItem("hrims_users_db");
      const parsed = storedUsers ? JSON.parse(storedUsers) : {};

      // Normalize old task statuses when page loads
      Object.keys(parsed).forEach((userId) => {
        if (!parsed[userId]?.tasks) return;

        parsed[userId].tasks = parsed[userId].tasks.map((task) => {
          let updatedStatus = task.status;

          // Convert old "Pending" status to "In Progress"
          if (updatedStatus === "Pending") {
            updatedStatus = "In Progress";
          }

          // Automatically mark as Overdue if deadline passed and no submission
          if (
            updatedStatus === "In Progress" &&
            task.deadline &&
            new Date(task.deadline) < new Date() &&
            !task.submitted
          ) {
            updatedStatus = "Overdue";
          }

          return {
            ...task,
            status: updatedStatus || "In Progress",
          };
        });
      });

      localStorage.setItem("hrims_users_db", JSON.stringify(parsed));

      return parsed;
    } catch (err) {
      console.error("Failed to load users DB:", err);
      return {};
    }
  });

  // Selected intern based on URL parameter
  const intern = usersDb[internId];

  // Tasks assigned to selected intern
  const tasks = useMemo(() => intern?.tasks || [], [intern]);

  // Controls which row is expanded
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  // Controls edit modal
  const [editingTask, setEditingTask] = useState(null);

  // Task statistics
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const overdue = tasks.filter((task) => task.status === "Overdue").length;
  const total = tasks.length;

  const progress = total ? Math.round((completed / total) * 100) : 0;

  // Update task details from EditTaskModal
  const updateTask = (taskId, updatedFields) => {
    const updated = { ...usersDb };

    updated[internId] = {
      ...updated[internId],
      tasks: updated[internId].tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task,
      ),
    };

    setUsersDb(updated);
    localStorage.setItem("hrims_users_db", JSON.stringify(updated));
  };

  // Status badge styles
  const getStatusClass = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-600";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-600";
    if (status === "Overdue") return "bg-red-100 text-red-600";

    return "bg-gray-100 text-gray-600";
  };

  if (!intern) {
    return <p className="text-sm text-gray-400">Intern not found</p>;
  }

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProfileHeader user={intern} mode="SUPERVISOR" hideAction />
      </div>

      {/* Progress Card */}
      <div className="w-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-5">
          {/* Progress circle */}
          <div
            className="grid h-20 w-20 place-items-center rounded-full"
            style={{
              background: `conic-gradient(#7C3EFF ${
                progress * 3.6
              }deg, #f1f1f1 0deg)`,
            }}
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white">
              <span className="text-xs font-bold">{progress}%</span>
            </div>
          </div>

          {/* Progress text */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {progress}% Completed
            </h3>

            <p className="mt-1 text-xs">
              <span className="text-yellow-500">{inProgress} In Progress</span>{" "}
              | <span className="text-red-500">{overdue} Overdue</span> |{" "}
              <span className="text-primary">{total} Total</span>
            </p>
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-400">
            <tr className="border-b border-gray-300">
              <th className="px-4 py-3 text-left">No.</th>
              <th className="px-4 py-3 text-left">Task</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left">Finish Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {tasks.length > 0 ? (
              tasks.map((task, index) => {
                const isExpanded = expandedTaskId === task.id;

                return (
                  <>
                    {/* Main task row */}
                    <tr
                      key={task.id}
                      className="border-b border-gray-300 transition hover:bg-gray-50"
                    >
                      <td className="px-4 py-4">{index + 1}</td>

                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900">
                          {task.taskName}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        {formatDateForDisplay(task.startDate)}
                      </td>

                      <td className="px-4 py-4">
                        {formatDateForDisplay(task.deadline)}
                      </td>

                      <td className="px-4 py-4">
                        {formatDateForDisplay(task.finishDate)}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-md px-3 py-1 text-xs font-medium ${getStatusClass(
                            task.status,
                          )}`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <button
                          onClick={() =>
                            setExpandedTaskId(isExpanded ? null : task.id)
                          }
                          className="rounded-md p-1 text-gray-500 transition hover:bg-purple-100 hover:text-primary active:bg-purple-200"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </td>
                    </tr>

                    {/* Expanded gray task detail area */}
                    {isExpanded && (
                      <tr>
                        <td colSpan="7" className="px-4 pb-4">
                          <div className="relative rounded-lg bg-gray-100 p-5">
                            {/* Task description */}
                            <div>
                              <p className="mb-1 text-sm font-semibold text-gray-900">
                                Task {index + 1}
                              </p>

                              <p className="text-sm text-gray-600">
                                {task.description || "No description provided."}
                              </p>
                            </div>

                            {/* Deliverables */}
                            <div className="mt-8">
                              <p className="mb-2 text-sm font-semibold text-gray-900">
                                Deliverables
                              </p>

                              <div className="flex w-fit items-center gap-2 rounded border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">
                                <span>
                                  {task.deliverable || "No submitted document"}
                                </span>

                                {task.deliverable &&
                                  task.deliverable !== "Not uploaded" && (
                                    <Eye size={13} />
                                  )}
                              </div>
                            </div>

                            {/* Edit task button */}
                            <button
                              onClick={() => setEditingTask(task)}
                              className="absolute bottom-4 right-4 text-primary transition hover:text-primary-hover"
                            >
                              <PenLine size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-400">
                  No tasks assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          intern={intern}
          onClose={() => setEditingTask(null)}
          onUpdate={(updatedFields) => {
            updateTask(editingTask.id, updatedFields);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
