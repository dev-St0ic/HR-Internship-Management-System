import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { navigation } from "../../config/navigation";
import { useAuth } from "../../../contexts/useAuth";

export default function LayoutTemplate({ headerConfig }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Map role_id to role key for navigation
  const roleMap = {
    1: "hr-admin",
    2: "hr-staff",
    3: "supervisor",
    4: "intern",
  };

  const userRole = roleMap[currentUser.role_id] || "intern";

  const currentHeader = headerConfig[location.pathname] || {
    title: "Dashboard",
    subtitle: "",
  };

  const userName = `${currentUser.first_name} ${currentUser.last_name}`;

  return (
    <div className="flex">
      <Sidebar
        links={navigation[userRole]}
        role={userRole}
        userName={userName}
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
