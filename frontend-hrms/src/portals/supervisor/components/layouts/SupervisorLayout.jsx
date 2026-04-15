import { Outlet } from "react-router-dom";
import Sidebar from "../../../../common/components/layout/Sidebar";
import { navigation } from "../../../../common/config/navigation";

export default function SupervisorLayout() {
  const userRole = "supervisor"; 
  const navLinks = navigation[userRole] || [];

  return (
    <div className="flex">
      
      {/* ADD THE ROLE PROP HERE */}
      <Sidebar links={navLinks} 
      
      role="Supervisor" userName="Cale Andren"/>  {/* Temp Sidebar Profile Name & Role */}
      
      

      <div className="ml-60 p-6 flex-1">
        <Outlet />
      </div>
    </div>
  );
}