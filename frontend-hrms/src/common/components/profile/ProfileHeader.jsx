import { BriefcaseBusiness, Mail, PenLine } from "lucide-react";

export default function ProfileHeader({
  user,
  mode,
  isEditing,
  onEditClick,
  activeTab,
}) {
  return (
    <div className="flex justify-between items-center pb-5 border-b border-gray-200 ">
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
      {mode === "intern" && activeTab === "personal" && (
        <button
          onClick={onEditClick}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-500 text-white rounded-lg hover:text-purple-500 hover:bg-white transition"
        >
          <PenLine size={14} />
          {isEditing ? "Save changes" : "Edit Profile"}
        </button>
      )}
    </div>
  );
}
