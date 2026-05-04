import { ChevronLeft } from "lucide-react";
import NotificationBell from "../ui/NotificationBell";

export default function Header({
  title,
  subtitle,
  userRole = "intern",
  showBack = false,
  onBackClick,
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-2">
        {showBack && (
          <button
            onClick={onBackClick}
            className="mt-0.5 rounded-md p-1 text-gray-500 transition hover:bg-purple-100 hover:text-primary active:bg-purple-200"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <div>
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>

      <NotificationBell userRole={userRole} />
    </div>
  );
}
