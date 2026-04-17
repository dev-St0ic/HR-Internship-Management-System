
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function SidebarFooter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute flex justify-start bottom-2 items-center px-3 py-1 border rounded-lg border-gray-300/50 mb-5 cursor-pointer">
      {/* Profile button */}
      <div className="flex justify-between items-center gap-2"
        onClick={() => setOpen(!open)} >
        <div className="flex items-center gap-2 me-5">
          <img
            src="image.png"
            alt="profile-image"
            className="w-10 h-10 rounded-lg bg-[#7C3EFF]"
          />
          <div>
            <h1 className="font-medium m-0">[NAME]</h1>
            <p className="text-gray-500 text-sm m-0">Supervisor</p>
          </div>
        </div>
        <div className={`transform transition-transform ${open ? "rotate-180" : ""}`}>
          ▲
        </div>
      </div>

      {open && (
        <ul className="absolute bottom-full mb-2 right-0 w-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
            <LogOut className="w-4 h-4 text-gray-700" /> 
            Logout
          </li>
        </ul>
      )}
    </div>
  );
}