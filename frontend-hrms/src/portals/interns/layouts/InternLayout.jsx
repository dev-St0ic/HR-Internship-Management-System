import { Outlet } from "react-router-dom";
import Sidebar from "../../../common/components/layout/Sidebar";
import { navigation } from "../../../common/config/navigation";
import { useTheme } from "../../../common/theme/ThemeProvider";

export default function InternLayout() {
  const { isDark } = useTheme();
  const userRole = "intern";

  return (
    <div className={`flex min-h-screen ${isDark ? "bg-slate-950 text-slate-100" : "bg-[#F8FAFC] text-slate-900"}`}>
      {/* Sidebar should always be visible */}
      <Sidebar links={navigation[userRole]} />

      {/* Main content area */}
      <div className="ml-60 flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
