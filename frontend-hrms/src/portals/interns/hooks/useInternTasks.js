import { useAuth } from "../../../contexts/AuthContext";

export default function useInternTasks() {
  const { currentUser } = useAuth();

  if (!currentUser?.id) return [];

  try {
    const usersDb = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");
    const latestUser = usersDb[currentUser.id];

    return latestUser?.tasks || currentUser?.tasks || [];
  } catch (error) {
    console.error("Failed to intern tasks: ", error);
    return [];
  }
}
