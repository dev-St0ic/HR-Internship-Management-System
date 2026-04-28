import { Sun, CloudSun, Moon } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import NotificationBell from "../ui/NotificationBell";

export default function Header({ title, subtitle, userRole = "intern" }) {
  const { currentUser } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { label: "Good Morning", Icon: Sun, color: "text-yellow-400" };
    if (hour < 18) return { label: "Good Afternoon", Icon: CloudSun, color: "text-orange-400" };
    return { label: "Good Evening", Icon: Moon, color: "text-indigo-400" };
  };

  const { label, Icon, color } = getGreeting();

  const isDashboard = title.toLowerCase() === "dashboard";

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <p className="text-xs font-medium text-gray-400 tracking-wide">
            {subtitle}
          </p>
        </div>
        <NotificationBell userRole={userRole} />
      </div>

      {/* Greeting */}
      {isDashboard && (
        <div className="flex items-center gap-4 mt-2">
          <div className="p-1">
            <Icon size={44} className="text-[#FDB022]" strokeWidth={1.5} />
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-[28px] font-bold text-[#101828] tracking-tight leading-tight">
              Hello, {currentUser?.name?.split(" ")[0] || "Intern"}!
            </h2>
            <p className="text-base font-medium text-[#667085]">
              {label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}