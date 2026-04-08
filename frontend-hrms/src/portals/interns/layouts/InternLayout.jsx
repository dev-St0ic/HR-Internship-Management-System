import { Outlet } from "react-router-dom";
import Sidebar from "../../../common/components/layout/Sidebar";
import { navigation } from "../../../common/config/navigation";

export default function InternLayout() {
  const userRole = "intern"; // This should ideally come from auth context or state management

  return (
    <div className="flex">
      {/* Sidebar should always be visible*/}
      <Sidebar links={navigation[userRole]} />

      {/* Main content area */}
      <div className="ml-60 p-5 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
