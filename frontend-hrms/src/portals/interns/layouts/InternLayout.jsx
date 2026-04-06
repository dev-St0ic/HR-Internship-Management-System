import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function InternLayout() {
  return (
    <div className="flex">
      {/* Sidebar should always be visible*/}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
