import NotificationBell from "../ui/NotificationBell";

// 1. Add userRole to the Header's props
export default function Header({ title, subtitle, userRole = "intern" }) {
  return (
    <div className="flex items-center justify-between">
      {/* Left Part of Header */}
      <div>
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>

      {/* Right Part of Header */}
      {/* 2. Pass the prop down to the Bell component */}
      <NotificationBell userRole={userRole} />
    </div>
  );
}