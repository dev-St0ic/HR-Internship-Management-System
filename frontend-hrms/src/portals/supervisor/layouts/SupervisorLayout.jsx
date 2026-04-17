import Header from "../Header";
import Sidebar from "../../../../common/components/layout/Sidebar";
import { navigation } from "../../../../common/config/navigation";
import { Outlet } from "react-router-dom";

export default function SupervisorLayout() {
  const userRole = "supervisor";
  const navLinks = navigation[userRole] || [];

  return (
    <div className="flex min-h-screen">
      <Sidebar links={navLinks} role="Supervisor" userName="Cale Andren" />

      <div className="flex-1 ml-60">
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
