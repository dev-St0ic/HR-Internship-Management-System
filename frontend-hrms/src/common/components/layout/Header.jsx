import NotificationBell from "../ui/NotificationBell";

export default function Header({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between ">
      {/* Left Part of Header */}
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>

      {/* Right Part of Header */}
      <NotificationBell />
    </div>
  );
}
