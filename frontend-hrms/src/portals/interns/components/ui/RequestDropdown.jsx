export default function RequestDropdown({ onSelect }) {
  const options = ["COC", "Evaluation", "Others"];
  return (
    <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 last:border-none">
      {options.map((item, index) => (
        <div
          key={item}
          onClick={() => onSelect(item)}
          className={`px-4 py-2 text-sm cursor-pointer transition
            hover:bg-purple-500 hover:text-white
            ${index !== options.length - 1 ? "border-b border-gray-200" : ""}
          `}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
