import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotificationBell() {
  // TEMP This should come from auth context or state management
  const userRole = "intern";

  // TEMP This should come from notifications state or API call
  const notifications = [
    { id: 1, message: "New task assigned", action: "View tasks" },
  ];
  const hasNotifications = notifications.length > 0;

  const path = `/${userRole}/notifications`;

  return (
    <Link
      to={path}
      className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-300 transition-colors"
    >
      <Bell size={18} />

      {/* Notification Indicator */}
      {hasNotifications && (
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-600"></span>
      )}
    </Link>
  );
}
