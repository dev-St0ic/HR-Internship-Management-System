import { useState } from "react";
import TaskStatsCards from "./TaskStatsCards";
import TaskTable from "./TaskTable";
import TaskDetailView from "./TaskDetailView";

export default function TaskManagementPage({
  tasks = [],
  currentUser,
  mode = "intern",
  onUpdateTask,
}) {
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState("");

  const filteredTask = tasks.filter((task) => {
    const matchesStatus =
      activeStatus === "All" || task.status === activeStatus;

    const matchesSearch = (task.name || task.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  if (selectedTask) {
    return (
      <TaskDetailView
        task={selectedTask}
        currentUser={currentUser}
        mode={mode}
        onBack={() => setSelectedTask(null)}
        onUpdateTask={(taskId, updatedFields) => {
          onUpdateTask(taskId, updatedFields);

          setSelectedTask((prev) =>
            prev?.id === taskId ? { ...prev, ...updatedFields } : prev,
          );
        }}
      />
    );
  }

  return (
    <div className="space-y-5">
      <TaskStatsCards
        tasks={tasks}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />

      <TaskTable
        tasks={filteredTask}
        search={search}
        setSearch={setSearch}
        onRowClick={setSelectedTask}
      />
    </div>
  );
}
