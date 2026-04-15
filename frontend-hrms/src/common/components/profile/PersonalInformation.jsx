import { useState } from "react";

export default function PersonalInformation({ user, mode }) {
  const [isEditing, setIsEditing] = useState(false);

  const editableFields = ["phone", "address", "city", "zip"];

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 text-sm">
        {Object.entries(user.personal).map(([Key, value]) => {
          const isEditable = editableFields.includes(Key);

          return (
            <div key={Key}>
              <p className="text-gray-400 mb-1 capitalize">{Key}</p>

              {isEditing && isEditable ? (
                <input
                  defaultValue={value}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="border-b pb-1">{value}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit button only for interns and when not editing */}
      {mode === "intern" && (
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 text-sm text-purple-500"
        >
          {isEditing ? "Save Changes" : "Edit"}
        </button>
      )}

      {/* This is where the backend hook will go */}
      {/*PUT/users/:id */}
    </div>
  );
}
