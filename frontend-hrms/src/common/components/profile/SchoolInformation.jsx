export default function SchoolInformation({ user }) {
  // Incase the data is missing, this will prevent crash
  const school = user?.school || {};

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
        <div key={field}>
          <p className="text-gray-400 mb-1">{field.label}</p>
          <p className="border-b border-gray-200 pb-1">
            {school[field.key] || "-"}
          </p>
        </div>
      ))}
    </div>
  );
}
