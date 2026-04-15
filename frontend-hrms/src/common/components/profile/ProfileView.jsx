import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileSidebar from "./ProfileSidebar";
import PersonalInformation from "./PersonalInformation";
import SchoolInformation from "./SchoolInformation";
import Documents from "./Documents";

export default function ProfileView({ user, mode = "intern" }) {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs =
    mode === "intern"
      ? ["personal", "school", "documents"]
      : ["personal", "documents"];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Profile Header */}
      <ProfileHeader user={user} mode={mode} activeTab={activeTab} />

      <div className="flex gap-6 mt-6">
        {/* HR-Admin & HR-Staff Sidebar */}
        {mode === "hr-admin" || (mode === "hr-staff" && <ProfileSidebar />)}

        <div className="flex-1">
          {/* Profile Tabs */}
          <ProfileTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "personal" && (
              <PersonalInformation user={user} mode={mode} />
            )}
            {activeTab === "school" && mode === "intern" && (
              <SchoolInformation user={user} />
            )}
            {activeTab === "documents" && <Documents user={user} mode={mode} />}
          </div>
        </div>
      </div>
    </div>
  );
}
