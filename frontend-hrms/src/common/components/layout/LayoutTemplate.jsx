import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { navigation } from "../../config/navigation";
import { useAuth } from "../../../contexts/AuthContext";

export default function LayoutTemplate({ headerConfig }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const roleMap = {
    INTERN: "intern",
    SUPERVISOR: "supervisor",
    HR_STAFF: "hr-staff",
    ADMIN: "hr-admin",
  };

  const userRole = roleMap[currentUser.role];

  const currentHeader = headerConfig[location.pathname] || {
    title: "Dashboard",
    subtitle: "",
  };

  return (
    <div className="flex">
      <Sidebar
        links={navigation[userRole]}
        role={currentUser.role}
        userName={currentUser.name}
      />

      <div className="ml-60 flex-1">
        <div className="px-6 pt-3">
          <Header
            title={currentHeader.title}
            subtitle={currentHeader.subtitle}
            userRole={userRole}
          />
        </div>
        <div className="px-6 py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
