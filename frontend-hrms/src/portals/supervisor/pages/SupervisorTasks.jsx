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
import FilterButton from "../../../common/components/ui/FilterButton";

export default function SupervisorTasks() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedFilterInterns, setSelectedFilterInterns] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

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

    const matchesSearch =
      task.taskName?.toLowerCase().includes(search) ||
      task.internName?.toLowerCase().includes(search) ||
      task.status?.toLowerCase().includes(search);

    const matchesIntern =
      selectedFilterInterns.length === 0 ||
      selectedFilterInterns.includes(task.internId);

    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(task.status);

    return matchesSearch && matchesIntern && matchesStatus;
  });

  // Assign task logic
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

    // IMPORTANT: save updated data
    localStorage.setItem("hrims_users_db", JSON.stringify(usersDb));

    // IMPORTANT: update page state if you have setUsersDb
    setUsersDb(usersDb);

    // close modal
    setIsOpen(false);
  };

  const getStatusClass = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-600";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-600";
    if (status === "Overdue") return "bg-red-100 text-red-600";

    return "bg-gray-100 text-gray-600";
  };

  //Helper to check the status
  const getTaskStatus = (task) => {
    if (task.status === "Completed") return "Completed";

    if (task.deadline) {
      const today = new Date();
      const deadlineDate = new Date(task.deadline);

      today.setHours(0, 0, 0, 0);
      deadlineDate.setHours(0, 0, 0, 0);

      if (deadlineDate < today && !task.submitted) {
        return "Overdue";
      }
    }

    return task.status || "In Progress";
  };

  //helper to filter the interns
  const toggleFilterInterns = (internId) => {
    setSelectedFilterInterns((prev) =>
      prev.includes(internId)
        ? prev.filter((id) => id !== internId)
        : [...prev, internId],
    );
  };

  // helper to filter the status
  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status],
    );
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
            <FilterButton
              title="Filter Tasks"
              onCancel={() => {
                setSelectedFilterInterns([]);
                setSelectedStatuses([]);
              }}
            >
              {/* Select Interns */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Select Interns
                </label>

                <input
                  readOnly
                  value={interns
                    .filter((intern) =>
                      selectedFilterInterns.includes(intern.id),
                    )
                    .map((intern) => intern.name)
                    .join(", ")}
                  placeholder="Select interns... "
                  className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />

                <div className="max-h-32 space-y-2 overflow-y-auto pr-1">
                  {interns.map((intern) => (
                    <label
                      key={intern.id}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilterInterns.includes(intern.id)}
                        onChange={() => toggleFilterInterns(intern.id)}
                        className="h-4 w-4 accent-primary"
                      />
                      {intern.name}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Status
                </label>

                <div className="space-y-2">
                  {["In Progress", "Completed", "Overdue"].map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => toggleStatus(status)}
                        className="h-4 w-4 accent-primary"
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>
            </FilterButton>
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
                    {(() => {
                      const displayStatus = getTaskStatus(task);

                      return (
                        <span
                          className={`rounded-md px-2 py-1 text-xs ${getStatusClass(displayStatus)}`}
                        >
                          {displayStatus}
                        </span>
                      );
                    })()}
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
