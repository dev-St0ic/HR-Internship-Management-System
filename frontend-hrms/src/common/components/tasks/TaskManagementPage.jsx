import { useState } from "react";
import TaskStatsCards from "./TaskStatsCards";
import TaskTable from "./TaskTable";
import TaskDetailView from "./TaskDetailView";

export default function TaskManagementPage({
  tasks = [],
  currentUser,
  mode = "intern",
  onUpdateTask,
  showBackButton = true,
}) {
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      activeStatus === "All" || task.status === activeStatus;

    const matchesSearch = (task.taskName || task.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // DETAIL VIEW
  if (selectedTask) {
    return (
      <TaskDetailView
        task={selectedTask}
        currentUser={currentUser}
        mode={mode}
        onBack={() => setSelectedTask(null)}
        onUpdateTask={(taskId, updatedFields) => {
          onUpdateTask(taskId, updatedFields);

          // Keep selected task updated visually
          setSelectedTask((prev) =>
            prev?.id === taskId ? { ...prev, ...updatedFields } : prev,
          );
        }}
        showBackButton={showBackButton}
      />
    );
  }

  // LIST VIEW
  return (
    <div className="space-y-5">
      <TaskStatsCards
        tasks={tasks}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />

      <TaskTable
        tasks={filteredTasks}
        search={search}
        setSearch={setSearch}
        onRowClick={setSelectedTask}
      />
    </div>
  );
}
