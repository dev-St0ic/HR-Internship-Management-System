import { User2, CalendarCheck, ClipboardList, NotebookPen } from "lucide-react";

export default function ProfileSidebar({ activeSection, setActiveSection }) {
  const menu = [
    { key: "profile", label: "Profile", icon: User2 },
    { key: "attendance", label: "Attendance", icon: CalendarCheck },
    { key: "tasks", label: "Tasks", icon: ClipboardList },
    { key: "evaluation", label: "Evaluation", icon: NotebookPen },
  ];

  return (
    <div className="w-52 bg-white border border-gray-200 rounded-xl p-3 shadow-sm self-start">
      <div className="space-y-2">
        {menu.map((item) => {
          const isActive = activeSection === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                
            ${
              isActive
                ? "bg-purple-500 text-white"
                : "hover:bg-purple-100 text-gray-600"
            }`}
            >
              <Icon
                size={20}
                className={`transition ${
                  isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
