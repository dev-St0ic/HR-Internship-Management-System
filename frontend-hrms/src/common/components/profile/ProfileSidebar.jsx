export default function ProfileSidebar() {
  const items = ["Profile", "Attendance", "Tasks", "Evalutation"];

  return (
    <div className="w-48 border rounded-lg p-3 space-y-2">
      {items.map((item, index) => (
        <button
          key={index}
          className="p-2 rounded cursor-pointer hover:bg-gray-100"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
