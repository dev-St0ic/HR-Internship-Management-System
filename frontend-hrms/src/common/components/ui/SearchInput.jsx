import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 w-64">
      <Search size={16} className="text-gray-400 mr-2" />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Search..."}
        className="outline-none text-sm w-full"
      />
    </div>
  );
}
