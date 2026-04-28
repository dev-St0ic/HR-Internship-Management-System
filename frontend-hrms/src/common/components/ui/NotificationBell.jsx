import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

// 1. Accept userRole as a prop here
export default function NotificationBell({ userRole = "intern" }) {
  // TEMP This should come from notifications state or API call
  const notifications = [
    { id: 1, message: "New task assigned", action: "View tasks" },
  ];
  const hasNotifications = notifications.length > 0;

  // 2. The path is now dynamic based on the prop!
  const path = `/${userRole}/notifications`;

  return (
    <Link
      to={path}
      className="relative p-4 rounded-xl bg-gray-100 hover:bg-gray-300 transition-colors"
    >
      <Bell size={18} />

      {/* Notification Indicator */}
      {hasNotifications && (
        <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-red-600 border-2 border-white"></span>
      )}
    </Link>
  );
}