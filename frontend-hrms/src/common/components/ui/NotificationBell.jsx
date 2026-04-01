import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotificationBell() {
  const navigate = useNavigate();

  {
    /* Temporary Notification */
  }
  const hasNotifications = true;

  return (
    <button onClick={() => navigate("/intern/notifications")}
        className="relative p-2 rounded-full hover:bg-gray-200 transition"
    >
      <Bell size={20} />

      {/* Notification Indicator */}
      {hasNotifications && (
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-600"></span>
      )}
    </button>
  );
}
