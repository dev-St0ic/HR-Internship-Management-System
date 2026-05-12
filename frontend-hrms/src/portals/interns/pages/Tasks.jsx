import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import TaskManagementPage from "../../../common/components/tasks/TaskManagementPage";

export default function Tasks() {
  const { currentUser } = useAuth();

  const [usersDb, setUsersDb] = useState(() => {
    try {
      const storedUsers = localStorage.getItem("hrims_users_db");
      return storedUsers ? JSON.parse(storedUsers) : {};
    } catch (error) {
      console.log("Failed to load users DB: ", error);
      return {};
    }
  });

  const intern = usersDb[currentUser?.id];
  const tasks = intern?.tasks || [];

  const updateTask = (taskId, updatedFields) => {
    const updatedUsersDb = { ...usersDb };

    updatedUsersDb[currentUser?.id] = {
      ...updatedUsersDb[currentUser.id],
      tasks: (updatedUsersDb[currentUser.id].tasks || []).map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task,
      ),
    };

    setUsersDb(updatedUsersDb);
    localStorage.setItem("hrims_users_db", JSON.stringify(updatedUsersDb));
  };

  if (!currentUser) return null;

  return (
    <TaskManagementPage
      tasks={tasks}
      currentUser={currentUser}
      mode="intern"
      onUpdateTask={updateTask}
    />
  );
}
