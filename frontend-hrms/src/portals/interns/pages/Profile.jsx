import Header from "../../../common/components/layout/Header";
import DragDropUpload from "../components/DragDropUpload";
import { useState } from "react";
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

  {
    /* Temporary User Data */
  }
  const user = {
    name: "John Doe",
    role: "Intern",
    email: "johndoe@gmail.com",
  };

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
                {/* Temporary User Info */}
                <h2 className="font-bold text-xl">{user.name}</h2>
                <p className="flex items-center gap-1 text-sm text-gray-500">
                  {" "}
                  <BriefcaseBusiness size={14}></BriefcaseBusiness>
                  {user.role}
                </p>
                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <Mail size={14}></Mail>
                  {user.email}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 rounded-lg text-xs text-white hover:bg-gray-300 hover:text-black">
              Edit Profile <PenLine size={14} />
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
            {activeTab === "personal" && <PersonalInformation />}
            {activeTab === "school" && <SchoolInformation />}
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
          ${isActive ? "border-b-2 border-black font-medium" : "text-gray-400 hover:text-gray-700"}`}
      >
        {icon}
        <span className="text-sm">{label}</span>
      </button>
    );
  }
}

function PersonalInformation() {
  {
    /* Temporary Personal Information Data */
  }
  const fields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email Address" },
    { key: "birth", label: "Date of Birth" },
    { key: "status", label: "Marital Status" },
    { key: "gender", label: "Gender" },
    { key: "nationality", label: "Nationality" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "zip", label: "Zip Code" },
  ];

  const userData = {
    firstName: "John",
    lastName: "Doe",
    phone: "0912345678",
    email: "companyemail@gmail.com",
    birth: "01/01/2000",
    status: "Single",
    gender: "Male",
    nationality: "Filipino",
    address: "Address",
    city: "City",
    zip: "Zip Code",
  };

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
      {fields.map((field) => (
        <div key={field.key}>
          <p className="text-gray-400 text-sm mb-1">{field.label}</p>
          <p className="border-b border-gray-100 w-full pb-1 text-sm">
            {userData[field.key]}
          </p>
        </div>
      ))}
    </div>
  );
}

function SchoolInformation() {
  {
    /* Temporary School Information Data */
  }
  const fields = [
    { key: "university", label: "University" },
    { key: "course", label: "Course" },
    { key: "hours", label: "Required Internship Hours" },
    { key: "duration", label: "Start & End Date" },
    { key: "year", label: "Current Year Level" },
    { key: "graduation", label: "Expected Graduation Date" },
  ];
  const userData = {
    university: "FEU",
    course: "Bachelore of Science in Computer Science",
    hours: "120 hours",
    duration: "Feb 16, 2026 - May 30, 2026",
    year: "4th Year",
    graduation: "July 2026",
  };

  return (
    <div className="grid grid-cols-2 gap-6 text-sm">
      {fields.map((field) => (
        <div key={field.key}>
          <p className="text-gray-400 text-sm mb-1">{field.label}</p>
          <p className="border-b border-gray-100 w-full pb-1">
            {userData[field.key]}
          </p>
        </div>
      ))}
    </div>
  );
}

function Documents() {
  {
    /* Temporary Documents Data */
  }

  const files = [
    "Resume.pdf",
    "MOA.pdf",
    "NDA.pdf",
    "ID.pdf",
    "Endoresement letter.pdf",
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
            <span className="text-sm">{file}</span>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                {" "}
                <Eye size={16}></Eye>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                {" "}
                <Download size={16}></Download>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <DragDropUpload label="Upload Missing Files" />
    </div>
  );
}
