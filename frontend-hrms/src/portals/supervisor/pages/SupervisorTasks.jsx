import { useMemo, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import TaskManagementPage from "../../../common/components/tasks/TaskManagementPage";
import AssignTaskModal from "../components/ui/AssignTaskModal";

export default function SupervisorTasks() {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [usersDb, setUsersDb] = useState(() => {
    try {
      const storedUsers = localStorage.getItem("hrims_users_db");
      return storedUsers ? JSON.parse(storedUsers) : {};
    } catch (error) {
      console.log("Failed to load users DB: ", error);
      return {};
    }
  });

  // Will get the interns under this supervisor
  const interns = useMemo(() => {
    return Object.values(usersDb).filter(
      (user) =>
        user?.role === "INTERN" && user?.supervisorId === currentUser?.id,
    );
  }, [usersDb, currentUser]);

  //Task lists form all assigned interns
  const tasks = useMemo(() => {
    return interns.flatMap((intern) =>
      (intern.tasks || []).map((task) => ({
        ...task,
        internId: intern.id,
        internName: intern.name,
        internEmail: intern.email,
        internDepartment: intern.department,
        internCourse: intern.course,
      })),
    );
  }, [interns]);

  // Update task from supervisor view
  const updateTask = (taskId, updatedFields) => {
    const updatedUsersDb = { ...usersDb };

    Object.keys(updatedUsersDb).forEach((userId) => {
      const user = updatedUsersDb[userId];

      if (user?.role !== "INTERN" || !user.tasks) return;

      updatedUsersDb[userId] = {
        ...user,
        tasks: user.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedFields } : task,
        ),
      };
    });

    setUsersDb(updatedUsersDb);
    localStorage.setItem("hrims_users_db", JSON.stringify(updatedUsersDb));
  };

  const handleAssignTask = (selectedInternIds, newTask) => {
    const updatedUsersDb = { ...usersDb };

    selectedInternIds.forEach((internId) => {
      const intern = updatedUsersDb[internId];

      if (!intern) return;

      updatedUsersDb[internId] = {
        ...intern,
        tasks: [...(intern.tasks || []), newTask],
      };
    });

    setUsersDb(updatedUsersDb);
    localStorage.setItem("hrims_users_db", JSON.stringify(updatedUsersDb));
    setIsOpen(false);
  };

  console.log("Current User:", currentUser);
  console.log("Interns:", interns);

  return (
    <>
      {/* Create New Task Buttton */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
        >
          <PlusCircle size={16} />
          Create New Task
        </button>
      </div>

      {/* Common Task Page */}
      <TaskManagementPage
        tasks={tasks}
        currentUser={currentUser}
        mode="supervisor"
        onUpdateTask={updateTask}
      />

      {/* Assign Task Modal */}
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
