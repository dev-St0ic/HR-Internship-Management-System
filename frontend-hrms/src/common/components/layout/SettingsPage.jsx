import { useState } from "react";
import { Settings, User, ShieldAlert, Lock, Users } from "lucide-react";
import GeneralPreferences from "../ui/GeneralPreference";
import ProfileSettings from "../ui/ProfileSettings";
import InternPolicySettings from "../ui/InternPolicySettings";
import RBACSettings from "../ui/RBACSettings";
import { useAuth } from "../../../contexts/useAuth";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const { currentUser } = useAuth();

  //This will map the backend roles then change to frontend roles
  const roleMap = {
    ADMIN: "hr-admin",
    HR_STAFF: "hr-staff",
    SUPERVISOR: "supervisor",
    INTERN: "intern",
    APPLICANT: "applicant"
  };

  const userRole = roleMap[currentUser?.role] || "intern";

  const tabs = [
    {
      id: "general",
      label: "General Preferences",
      icon: <Settings size={16} />,
    },
  ];

  // Inject HR Admin specific tabs
  if (userRole === "hr-admin") {
    tabs.push({
      id: "intern-policy",
      label: "Intern Policy",
      icon: <Users size={16} />,
    });
    tabs.push({ id: "rbac", label: "RBAC", icon: <Lock size={16} /> });
  }

  // Everyone gets Profile last
  tabs.push({ id: "profile", label: "Profile", icon: <User size={16} /> });

  return (
    <>
      <div className="p-6">
        <div className="bg-white rounded-xl shadow p-6">
          {/* Tabs Header */}
          <div className="flex gap-6 mt-4 border-b border-gray-100">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
                value={tab.id}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </div>

          {/* Tab Content Rendering */}
          <div className="mt-1">
            {/* Common Tabs */}
            {activeTab === "general" && <GeneralPreferences />}
            {activeTab === "profile" && <ProfileSettings role={userRole} />}

            {/* HR Admin Tabs (Placeholders) */}
            {activeTab === "intern-policy" && <InternPolicySettings />}
            {activeTab === "rbac" && <RBACSettings />}
          </div>
        </div>
      </div>
    </>
  );

  function Tab({ icon, label, value, activeTab, setActiveTab }) {
    const isActive = activeTab === value;

    return (
      <button
        onClick={() => setActiveTab(value)}
        className={`flex items-center gap-2 pb-3 text-sm transition mb-[-1px]
                    ${
                      isActive
                        ? "border-b-2 border-[#7C3EFF] text-[#7C3EFF] font-semibold"
                        : "text-gray-400 hover:text-gray-700 border-b-2 border-transparent"
                    }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  }
}
