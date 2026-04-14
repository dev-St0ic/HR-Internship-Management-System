import { Outlet } from "react-router-dom";
import Sidebar from "../../../../common/components/layout/Sidebar";
import { navigation } from "../../../../common/config/navigation";

export default function SupervisorLayout() {
  const userRole = "supervisor"; 
  
  const navLinks = navigation[userRole] || [];

  return (
    <div className="flex">
      {/* Sidebar should always be visible */}
      <Sidebar links={navLinks} />

      {/* Main content area */}
      <div className="ml-60 p-6 flex-1">
        <Outlet />
      </div>
    </div>
  );
}