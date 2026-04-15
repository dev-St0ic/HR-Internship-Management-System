import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileSidebar from "./ProfileSidebar";
import PersonalInformation from "./PersonalInformation";
import SchoolInformation from "./SchoolInformation";
import Documents from "./Documents";

export default function ProfileView({ user, mode }) {
  {
    /* Temporary User Data
          Also used to deal with the structure mismatch
          replace this with backend 
          await fetch(`/api/users/${id}`)
      */
  }
  const formattedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,

    personal: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      birth: user.dob,
      status: user.maritalStatus,
      gender: user.gender,
      nationality: user.nationality,
      address: user.address,
      city: user.city,
      zip: user.zipCode,
    },

    school: {
      university: user.university,
      course: user.course,
      hours: user.hours,
      duration: user.duration,
      year: user.year,
      graduation: user.graduation,
    },

    documents: user.documents || [], // fallback
  };

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  const tabs =
    mode === "intern"
      ? ["personal", "school", "documents"]
      : ["personal", "documents"];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Profile Header */}
      <ProfileHeader
        user={formattedUser}
        mode={mode}
        activeTab={activeTab}
        onEdit={() => setIsEditing(!isEditing)}
      />

      <div className="flex gap-6 mt-6">
        {/* HR-Admin & HR-Staff Sidebar */}
        {mode === "hr-admin" || (mode === "hr-staff" && <ProfileSidebar />)}

        <div className="flex-1">
          {/* Profile Tabs */}
          <ProfileTabs
            user={formattedUser}
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "personal" && (
              <PersonalInformation
                user={formattedUser}
                mode={mode}
                isEditing={isEditing}
              />
            )}
            {activeTab === "school" && mode === "intern" && (
              <SchoolInformation user={formattedUser} />
            )}
            {activeTab === "documents" && (
              <Documents user={formattedUser} mode={mode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
