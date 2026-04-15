import Header from "../../../common/components/layout/Header";
import DragDropUpload from "../components/DragDropUpload";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext"; // Add this import!
import {
  User2,
  BriefcaseBusiness,
  FileText,
  Mail,
  PenLine,
  GraduationCap,
  Download,
  Eye,
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const { currentUser } = useAuth(); // Get the global user

  // Safety check: Don't crash if the user hasn't loaded yet
  if (!currentUser) return <div className="p-8">Loading profile...</div>;

  return (
    <>
      <Header title="Profile" subtitle="Profile Overview" />
      <div className="p-6">
        {/* Card */}
        <div className="bg-white rounded-xl shadow p-6">
          {/* Profile Top Part */}
          <div className="flex justify-between gap-3 items-center pb-5 border-b border-gray-100">
            <div className="flex items-center gap-3 ">
              <div className="w-20 h-20 bg-gray-500 rounded-md"></div>
              <div>
                {/* Dynamic User Info */}
                <h2 className="font-bold text-xl">{currentUser.name}</h2>
                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <BriefcaseBusiness size={14}></BriefcaseBusiness>
                  {currentUser.department} {currentUser.role.replace("_", " ")}
                </p>
                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <Mail size={14}></Mail>
                  {currentUser.email}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 rounded-lg text-xs text-white hover:bg-gray-300 hover:text-violet-500 transition">
              <PenLine size={14} /> Edit Profile
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-4 border-b border-gray-100">
            <Tab
              icon={<User2 size={16} />}
              label="Personal Information"
              value="personal"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <Tab
              icon={<GraduationCap size={16} />}
              label="School Information"
              value="school"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <Tab
              icon={<FileText size={16} />}
              label="Documents"
              value="documents"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "personal" && <PersonalInformation user={currentUser} />}
            {activeTab === "school" && <SchoolInformation user={currentUser} />}
            {activeTab === "documents" && <Documents />}
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
        className={`flex items-center gap-2 pb-3 text-sm transition 
          ${isActive ? "border-b-2 border-violet-500 text-violet-500 font-medium" : "text-gray-400 hover:text-gray-700"}`}
      >
        {icon}
        <span className="text-sm">{label}</span>
      </button>
    );
  }
}

// Pass the global user in as a prop
function PersonalInformation({ user }) {
  // Keys updated to match the mockAuth.js database exactly
  const fields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email Address" },
    { key: "dob", label: "Date of Birth" },
    { key: "maritalStatus", label: "Marital Status" },
    { key: "gender", label: "Gender" },
    { key: "nationality", label: "Nationality" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "zipCode", label: "Zip Code" },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
      {fields.map((field) => (
        <div key={field.key}>
          <p className="text-gray-400 text-sm mb-1">{field.label}</p>
          <p className="border-b border-gray-100 w-full pb-1 text-sm font-medium text-gray-800">
            {user[field.key] || "—"} {/* Added fallback if data is missing */}
          </p>
        </div>
      ))}
    </div>
  );
}

// Pass the global user in as a prop
function SchoolInformation({ user }) {
  const fields = [
    { key: "university", label: "University" },
    { key: "course", label: "Course" },
    { key: "hours", label: "Required Internship Hours" },
    { key: "duration", label: "Start & End Date" },
    { key: "year", label: "Current Year Level" },
    { key: "graduation", label: "Expected Graduation Date" },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm">
      {fields.map((field) => (
        <div key={field.key}>
          <p className="text-gray-400 text-sm mb-1">{field.label}</p>
          <p className="border-b border-gray-100 w-full pb-1 font-medium text-gray-800">
            {user[field.key] || "—"} 
          </p>
        </div>
      ))}
    </div>
  );
}

function Documents() {
  const files = [
    "Resume.pdf",
    "MOA.pdf",
    "NDA.pdf",
    "ID.pdf",
    "Endorsement letter.pdf", // fixed small typo from Endoresement
    "Certificate of Acceptance.pdf",
  ];

  return (
    <div className="space-y-4">
      {/* File List */}
      <div className="grid grid-cols-2 gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center border border-gray-100 px-4 py-3 rounded-lg"
          >
            <span className="text-sm font-medium text-gray-700">{file}</span>
            <div className="flex gap-2">
              <button className="p-1 text-gray-500 hover:text-violet-500 hover:bg-violet-50 rounded transition">
                <Eye size={16} />
              </button>
              <button className="p-1 text-gray-500 hover:text-violet-500 hover:bg-violet-50 rounded transition">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <div className="pt-4">
        <DragDropUpload label="Upload Missing Files" />
      </div>
    </div>
  );
}