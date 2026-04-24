import { BriefcaseBusiness, Mail, PenLine, CornerDownLeft } from "lucide-react";

export default function ProfileHeader({
  user,
  mode,
  activeTab,
  isEditing,
  onEditClick,
  onBackClick,
}) {
  const isIntern = mode === "INTERN";

  return (
    <div className="flex justify-between items-center pb-5 border-b border-gray-200 ">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gray-400 rounded-md"></div>

        <div>
          <h2 className="font-bold text-xl">{user.name}</h2>
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <BriefcaseBusiness size={14} />
            {user.role}
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <Mail size={14} />
            {user.email}
          </p>
        </div>
      </div>

      {/* This is only for intern and when the personal tab is active */}
      {isIntern && activeTab === "personal" ? (
        <button
          onClick={onEditClick}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:text-purple-500 hover:bg-primary-hover transition"
        >
          <PenLine size={14} />
          {isEditing ? "Save changes" : "Edit Profile"}
        </button>
      ) : (
        <button
          onClick={onBackClick}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white font-semibold border border-gray-200 rounded-lg hover:bg-primary-hover transition"
        >
          <CornerDownLeft size={16} />
          Return
        </button>
      )}
    </div>
  );
}
