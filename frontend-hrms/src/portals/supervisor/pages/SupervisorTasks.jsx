import {
  PencilLine,
  Trash2,
  Search,
  SlidersHorizontal,
  PlusCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import AssignTaskModal from "../components/ui/AssignTaskModal";

export default function SupervisorTasks() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [usersDb, setUsersDb] = useState(() => {
    try {
      const storedUsers = localStorage.getItem("hrims_users_db");
      return storedUsers ? JSON.parse(storedUsers) : {};
    } catch (error) {
      console.log("Failed to load users DB:", error);
      return {};
    }
  });

  // this will get the interns under this supervisor
  const interns = useMemo(() => {
    if (!usersDb || typeof usersDb !== "object") return [];

    return Object.values(usersDb).filter(
      (user) =>
        user?.role === "INTERN" && user?.supervisorId === currentUser?.id,
    );
  }, [usersDb, currentUser]);

  //Builds tasks rows
  const taskRows = useMemo(() => {
    return interns.flatMap((intern) => {
      const tasks = intern.tasks || [];

      return tasks.map((task) => ({
        ...task,
        internId: intern.id,
        internName: intern.name,
      }));
    });
  }, [interns]);

  // Search filter
  const filteredTasks = taskRows.filter((task) => {
    const search = searchTerm.toLowerCase();

    return (
      task.taskName.toLowerCase().includes(search) ||
      task.internName.toLowerCase().includes(search) ||
      task.status.toLowerCase().includes(search)
    );
  });

  //Assign task logic
  const handleAssignTask = (selectedInternsIds, newTask) => {
    const usersDb = JSON.parse(localStorage.getItem("hrims_users_db")) || {};

    selectedInternsIds.forEach((internId) => {
      const intern = usersDb[internId];

      if (intern) {
        usersDb[internId] = {
          ...intern,
          tasks: [...(intern.tasks || []), newTask],
        };
      }
    });

    localStorage.setItem("hrims_users_db", JSON.stringify(usersDb));

    window.location.reload();
  };

  const getStatusClass = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-600";
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    if (status === "Overdue") return "bg-red-100 text-red-600";

    return "bg-gray-100 text-gray-600";
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        {/* Top Controls */}
        <div className="mb-6 flex items-center justify-between">
          {/* Search */}
          <div className="relative w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              placeholder="Search interns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border-gray-200 py-2 pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            {/* Create task button */}
            <button
              onClick={() => {
                const storedUsers = localStorage.getItem("hrims_users_db");

                if (storedUsers) {
                  setUsersDb(JSON.parse(storedUsers));
                }

                setIsOpen(true);
              }}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-hover"
            >
              <PlusCircle size={16} />
              Create New Task
            </button>

            {/* Filter Button */}
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <SlidersHorizontal size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-xs text-gray-400">
              <tr>
                <th className="px-4 py-3 font-medium">Tasks</th>
                <th className="px-4 py-3 font-medium">Intern Name</th>
                <th className="px-4 py-3 font-medium">Deadline</th>
                <th className="px-4 py-3 font-medium">Deliverable</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredTasks.map((task) => (
                <tr
                  onClick={() => navigate(`/supervisor/tasks/${task.internId}`)}
                  key={`${task.internId}-${task.id}`}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-4 py-3">{task.taskName}</td>
                  <td className="px-4 py-3">{task.internName}</td>
                  <td className="px-4 py-3">{task.deadline}</td>
                  <td className="px-4 py-3">{task.deliverable}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs ${getStatusClass(
                        task.status,
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/supervisor/tasks/${task.internId}`);
                        }}
                        className="text-gray-700 hover:text-primary"
                      >
                        <PencilLine size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="text-gray-700 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTasks.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-sm text-gray-400"
                  >
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Modal */}
      {isOpen && (
        <AssignTaskModal
          interns={interns}
          onClose={() => setIsOpen(false)}
          onAssign={handleAssignTask}
        />
      )}
    </>
  );
}
