import { useState, useRef, useEffect } from "react";

const internsList = [
  { id: "cara", name: "Cara Lim" },
  { id: "ana", name: "Ana Reyes" },
  { id: "juan", name: "Juan Dela Cruz" },
];

export default function InternSelector() {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleCheck = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((item) => item !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <h1 className="font-medium mb-1">Select Interns</h1>

      {/* Input Box */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 p-2 rounded cursor-pointer bg-gray-50 text-sm text-gray-600"
      >
        {selected.length > 0
          ? selected.join(", ")
          : "Select Interns..."}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded shadow-md p-3 z-10">
          {internsList.map((intern) => (
            <label
              key={intern.id}
              className="flex items-center gap-2 mb-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(intern.name)}
                onChange={() => handleCheck(intern.name)}
                className="accent-[#7C3EFF]"
              />
              <span>{intern.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}