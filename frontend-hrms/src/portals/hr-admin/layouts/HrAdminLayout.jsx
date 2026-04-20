import { Outlet } from "react-router-dom";
import Sidebar from "../../../common/components/layout/Sidebar";
import { navigation } from "../../../common/config/navigation";
import { useAuth } from "../../../contexts/AuthContext";

export default function HrAdminLayout() {
  const { currentUser } = useAuth();

  //If you are not logged in, will go to log in page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  //Map backend roles to frontend roles
  const roleMap = {
    INTERN: "intern",
    SUPERVISOR: "supervisor",
    HR_STAFF: "hr-staff",
    ADMIN: "hr-admin",
  };

  const userRole = roleMap[currentUser.role];

  return (
    <div className="flex">
      {/* Sidebar should always be visible*/}
      <Sidebar
        links={navigation[userRole]}
        role={currentUser.role}
        userName={currentUser.name}
      />
      {/* Temp Sidebar Profile Name & Role */}
      {/* Main content area */}
      <div className="ml-60 p-6 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
