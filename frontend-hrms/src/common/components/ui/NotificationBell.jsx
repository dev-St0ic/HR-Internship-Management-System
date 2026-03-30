import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotificationBell() {
  const hasNotifications = true;

  {
    /* Temp will be replaced by auth */
  }
  const userRole = "intern";
  const path = `/${userRole}/notifications`;

  return (
    <Link
      to={path}
      className="relative p-2 rounded-full hover:bg-gray-200 transition"
    >
      <Bell size={20} />

      {/* Notification Indicator */}
      {hasNotifications && (
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-600"></span>
      )}
    </Link>
  );
}
