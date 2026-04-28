import { useState, useRef, useEffect } from "react";
import { LogOut, ChevronUp, ChevronDown } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SidebarProfile({ isCollapsed }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const userName = currentUser?.name || "Guest";
  const role = currentUser?.role || "User";

  const displayAvatar =
    currentUser?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=f3f4f6&color=374151`;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ChevronIcon = isOpen ? ChevronDown : ChevronUp;
  const logoutBtnStyle =
    "flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition focus:ring-2 focus:ring-[#7C3EFF]/50 outline-none";

  return (
    <div className="relative mt-auto w-full" ref={menuRef}>
      {isOpen && (
        <div className="absolute bottom-full left-0 w-full mb-3 z-50">
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
              navigate("/login");
            }}
            className={logoutBtnStyle}
          >
            <LogOut size={18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      )}

<div
        className={`flex items-center w-full p-2 rounded-2xl border border-gray-100 bg-[#F9FAFB] hover:bg-gray-50 transition-all shadow-sm ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        <div className={`flex items-center min-w-0 ${isCollapsed ? "" : "gap-3 flex-1"}`}>
          <img
            src={displayAvatar}
            alt="Avatar"
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 min-w-[40px] rounded-xl object-cover flex-shrink-0 cursor-pointer border border-white shadow-sm"
          />
          
          {!isCollapsed && (
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="text-sm font-bold text-gray-900 truncate w-full">
                {userName}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate w-full">
                {role}
              </span>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-md hover:bg-gray-200 transition-colors mr-1"
          >
            <ChevronIcon size={16} className="text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}
