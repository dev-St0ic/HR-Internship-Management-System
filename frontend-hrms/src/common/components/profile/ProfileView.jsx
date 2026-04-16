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

    documents: user.documents || [
      "Resume.pdf",
      "MOA.pdf",
      "NDA.pdf",
      "ID.pdf",
      "Endoresement letter.pdf",
      "Certificate of Acceptance.pdf",
    ], // fallback
  };

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const staffView = ["hr-admin", "hr-staff"].includes(mode);

  const tabs =
    mode === "intern"
      ? ["personal", "school", "documents"]
      : ["personal", "documents"];

  //This will use edited user when editing
  const displayUser = editedUser || formattedUser;

  // This will handle the edit click
  const handleEditToggle = () => {
    if (!isEditing) {
      setEditedUser(formattedUser); //This will start editing
      setIsEditing(true);
    } else {
      // This will save
      console.log("Saved Data: ", editedUser);

      //This is where you will connect backend
      //PUT /users/:id

      setIsEditing(false);
    }
  };

  // This will handle the input change
  const handleChange = (section, key, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Profile Header */}
      <ProfileHeader
        user={displayUser}
        mode={mode}
        activeTab={activeTab}
        isEditing={isEditing}
        onEditClick={handleEditToggle}
      />

      <div className="flex gap-6 mt-6">
        {/* HR-Admin & HR-Staff Sidebar */}
        {staffView && <ProfileSidebar />}

        <div className="flex-1">
          {/* Profile Tabs */}
          <ProfileTabs
            user={displayUser}
            mode={mode}
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "personal" && (
              <PersonalInformation
                user={displayUser}
                mode={mode}
                isEditing={isEditing}
                onChange={handleChange}
              />
            )}
            {activeTab === "school" && mode === "intern" && (
              <SchoolInformation user={displayUser} />
            )}
            {activeTab === "documents" && (
              <Documents user={displayUser} mode={mode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
