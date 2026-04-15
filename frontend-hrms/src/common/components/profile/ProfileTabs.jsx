export default function ProfileTabs({ tabs, activeTab, setActiveTab }) {
  const labels = {
    personal: "Personal Information",
    school: "School Information",
    documents: "Documents",
  };

  return (
    <div className="flex gap-6 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm 
                        ${
                          isActive
                            ? "border-b-2 border-purple-500 text-purple-500 font-medium"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
          >
            {labels[tab]}
          </button>
        );
      })}
    </div>
  );
}
