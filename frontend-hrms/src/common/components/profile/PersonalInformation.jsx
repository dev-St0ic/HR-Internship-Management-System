export default function PersonalInformation({
  user,
  mode,
  isEditing,
  onChange,
}) {
  const editableFields = ["phone", "address", "city", "zip"];
  const canEdit = mode === "intern";

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-6 text-sm">
        {Object.entries(user?.personal || {}).map(([key, value]) => {
          const isEditable = editableFields.includes(key);

          return (
            <div key={key}>
              <p className="text-gray-400 mb-1 capitalize">{key}</p>

              {isEditing && isEditable && canEdit ? (
                <input
                  value={value || ""}
                  onChange={(e) => onChange("personal", key, e.target.value)}
                  className="border border-purple-500 rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="border-b border-gray-200 pb-1">{value || "-"}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
