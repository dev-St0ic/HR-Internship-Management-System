export default function PersonalInformation({
  user,
  mode,
  isEditing,
  onChange,
}) {
  const personal = user?.personal || {};

  const fields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "birth", label: "Birth" },
    { key: "status", label: "Status" },
    { key: "gender", label: "Gender" },
    { key: "nationality", label: "Nationality" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "zip", label: "Zip" },
  ];

  const editableFields = ["phone", "address", "city", "zip"];
  const normalizeMode = mode?.toLowerCase();
  const canEdit = normalizeMode === "intern";

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-6 text-sm">
        {fields.map((field) => {
          const isEditable = editableFields.includes(field.key);
          const value = personal[field.key];

          return (
            <div key={field.key}>
              <p className="text-gray-400 mb-1">{field.label}</p>
              {isEditing && isEditable && canEdit ? (
                <input
                  value={value || ""}
                  onChange={(e) =>
                    onChange("personal", field.key, e.target.value)
                  }
                  className="border border-purple-500 rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="text-base border-b border-gray-200 pb-1">
                  {value || "-"}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
