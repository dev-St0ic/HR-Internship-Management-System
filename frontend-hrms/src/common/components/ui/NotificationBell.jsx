import { Bell } from "lucide-react";
import { useState } from "react";
import AdminNotifications from "../../../portals/hr-admin/pages/AdminNotifications";
import { getSystemLogs } from "../../utils/systemLogger";

export default function NotificationBell({ userRole = "intern" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Get unread notifications count from system logs
  const systemLogs = getSystemLogs();
  const unreadCount = systemLogs.filter((log, index) => index < 3).length; // First 3 are unread
  const hasNotifications = unreadCount > 0;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Show notification modal for HR Admin only
  if (userRole === "hr-admin") {
    return (
      <>
        <button
          onClick={handleOpen}
          className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-300 transition-colors"
        >
          <Bell size={18} />

          {/* Notification Indicator */}
          {hasNotifications && (
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-600"></span>
          )}
        </button>

        <AdminNotifications isOpen={isOpen} onClose={handleClose} />
      </>
    );
  }

  // For other roles, return a simple bell icon placeholder
  return (
    <button className="relative p-3 rounded-xl bg-gray-100 hover:bg-gray-300 transition-colors">
      <Bell size={18} />
      {hasNotifications && (
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-600"></span>
      )}
    </button>
  );
}
