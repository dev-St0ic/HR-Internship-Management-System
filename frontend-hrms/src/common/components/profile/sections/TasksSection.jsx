import TaskManagementPage from "../../tasks/TaskManagementPage";

export default function TasksSection({ user, mode = "hr-staff" }) {
  // TODO: Replace localStorage task fetch with backend API
  // Example:
  // GET /tasks/:internId

  const usersDb = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");

  const latestUser = usersDb[user.id];
  const userTasks = latestUser?.tasks || user?.tasks || [];

  const updateTask = () => {
    // HR Admin / HR Staff is view-only for now.
    // No upload, no comments, no editing.
  };

  return (
    <TaskManagementPage
      tasks={userTasks}
      currentUser={user}
      mode={mode}
      onUpdateTask={updateTask}
    />
  );
}
