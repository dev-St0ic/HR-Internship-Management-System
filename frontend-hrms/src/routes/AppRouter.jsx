import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SupervisorLayout from "../portals/supervisor/layouts/SupervisorLayout";
import SupervisorDashboard from "../portals/supervisor/pages/SupervisorDashboard";
import SideBarLayout from "../portals/hr-staff/components/SideBarLayout";
import OperationsPage from "../portals/hr-staff/pages/OperationsPage";
import HrAdminSideBarLayout from "../portals/hr-admin/components/SideBarLayout";
import HRAdminDashboard from "../portals/hr-admin/pages/HRAdminDashboard";
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
import Settings from "../portals/interns/pages/Settings";
import Notifications from "../portals/interns/pages/Notifications";

// Temporary placeholders muna
const Home = () => <>Homee</>;

const HRStaffDashboard = () => <>HR staff dashboard page</>;

const HRAdminSectionPage = ({title}) => (
  <div>
    <h1 className='text-3xl font-bold text-slate-900'>{title}</h1>
    <p className='text-sm text-slate-500'>Welcome to {title}.</p>
  </div>
);

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

        <Route path="/login" element={<LoginPage />} />

        <Route path="/intern" element={<InternLayout />}>
          <Route index element={<InternDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="documents" element={<Documents />} />
          <Route path="evaluation" element={<Evaluation />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* temp supervisor route */}
        <Route path="/supervisor" element={<SupervisorLayout />}>
          <Route index element={<SupervisorDashboard />} />
        </Route>

        <Route path="/hr-staff" element={<SideBarLayout />}>
          <Route path="operations" element={<OperationsPage />} />
          <Route index element={<HRStaffDashboard />} />
        </Route>

        <Route path="/hr-admin" element={<HrAdminSideBarLayout />}>
          <Route index element={<HRAdminDashboard />} />
          <Route path="recruitment" element={<HRAdminSectionPage title="Recruitment" />} />
          <Route path="intern-management" element={<HRAdminSectionPage title="Intern Management" />} />
          <Route path="staff-management" element={<HRAdminSectionPage title="Staff Management" />} />
          <Route path="document-vault" element={<HRAdminSectionPage title="Document Vault" />} />
          <Route path="reports" element={<HRAdminSectionPage title="Reports & Analytics" />} />
          <Route path="system-logs" element={<HRAdminSectionPage title="System Logs" />} />
          <Route path="settings" element={<HRAdminSectionPage title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
