import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
{
  /* imports galing sa Supervisor Pages */
}
import {
  SupervisorLayout,
  SupervisorDashboard,
  SupervisorMyInterns,
  SupervisorAttendance,
  SupervisorTasks,
  SupervisorEvaluations,
  SupervisorSettings,
  SupervisorNotifications,
} from "../portals/supervisor/Index";

import SideBarLayout from "../portals/hr-staff/components/SideBarLayout";
import OperationsPage from "../portals/hr-staff/pages/OperationsPage";
import LandingPageHeader from "../common/components/layout/LandingPageHeader";
import LandingPage from "../portals/Home/pages/LandingPage";
import ApplicationFormHeader from "../portals/interns/components/layout/ApplicationFormHeader";
import ApplicationForm from "../portals/interns/pages/ApplicationForm";
import LoginPage from "../portals/interns/pages/LoginPage";
import InternLayout from "../portals/interns/layouts/InternLayout";
import InternDashboard from "../portals/interns/pages/InternDashboard";
import Profile from "../portals/interns/pages/Profile";
import Tasks from "../portals/interns/pages/Tasks";
import Attendance from "../portals/interns/pages/Attendance";
import Documents from "../portals/interns/pages/Documents";
import Evaluation from "../portals/interns/pages/Evaluation";
import NotificationsPage from "../portals/interns/pages/InternNotificationPage";
import SettingsPage from "../common/components/layout/SettingsPage";

// Temporary placeholders muna
const Home = () => <>Homee</>;

const HRStaffDashboard = () => <>HR staff dashboard page</>;

const HRAdminDashboard = () => <>HR admin dashboard page</>;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*Landing page route*/}
        <Route path="/" element={<LandingPageHeader />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Application form intern route */}
        <Route path="/application-form" element={<ApplicationFormHeader />}>
          <Route index element={<ApplicationForm />} />
        </Route>

        <Route path="/intern" element={<InternLayout />}>
          <Route index element={<InternDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="documents" element={<Documents />} />
          <Route path="evaluation" element={<Evaluation />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* temp supervisor route */}
        <Route path="/supervisor" element={<SupervisorLayout />}>
          <Route index element={<SupervisorDashboard />} />
          <Route path="myinterns" element={<SupervisorMyInterns />} />
          <Route path="attendance" element={<SupervisorAttendance />} />
          <Route path="tasks" element={<SupervisorTasks />} />
          <Route path="evaluations" element={<SupervisorEvaluations />} />
          <Route path="settings" element={<SupervisorSettings />} />
          <Route path="notifications" element={<SupervisorNotifications />} />
        </Route>

        <Route path="/hr-staff" element={<SideBarLayout />}>
          <Route path="operations" element={<OperationsPage />} />
          <Route index element={<HRStaffDashboard />} />
        </Route>

        <Route path="/hr-admin/*" element={<HRAdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
