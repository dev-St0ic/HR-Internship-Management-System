import { User2, GraduationCap, FileText } from "lucide-react";

export default function ProfileTabs({ tabs, activeTab, setActiveTab }) {
  const config = {
    personal: { label: "Personal Information", icon: User2 },
    school: { label: "School Information", icon: GraduationCap },
    documents: { label: "Documents", icon: FileText },
  };

  return (
    <div className="flex gap-6 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        const Icon = config[tab].icon;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center justify-center gap-2 pb-3 transition
                        ${
                          isActive
                            ? "border-b-2 border-purple-500 text-purple-500 font-medium"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
          >
            <Icon size={16} />
            {config[tab].label}
          </button>
        );
      })}
    </div>
  );
}
