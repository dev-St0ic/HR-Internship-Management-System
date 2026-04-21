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
  SupervisorDocuments,
} from "../portals/supervisor/Index";

//Hr-Staff
import SideBarLayout from "../portals/hr-staff/components/SideBarLayout";
import HRStaffDashboard from "../portals/hr-staff/pages/HRStaffDashboard";
import OperationsPage from "../portals/hr-staff/pages/OperationsPage";
import InternDetailPage from "../portals/hr-staff/pages/InternDetailPage";
import StaffManagement from "../portals/hr-staff/pages/StaffManagement";
import DocumentVault from "../portals/hr-staff/pages/DocumentVault";
import Recruitment from "../portals/hr-staff/pages/Recruitment";

//Hr-Admin
import HrAdminSideBarLayout from "../portals/hr-admin/components/HRAdminLayout";
import HRAdminDashboard from "../portals/hr-admin/pages/HRAdminDashboard";
import ReportsAndAnalytics from "../portals/hr-admin/pages/ReportsAndAnalytics";
import SystemLogs from "../portals/hr-admin/pages/SystemLogs";
import AdminSettings from "../portals/hr-admin/pages/Settings";
import internmanagement from "../portals/hr-admin/pages/AdminInternDetailPage";
import AdminDocumentVault from "../portals/hr-admin/pages/AdminDocumentVault";
import AdminStaffManagement from "../portals/hr-admin/pages/AdminStaffManagement";
import AdminRecruitment from "../portals/hr-admin/pages/AdminRecruitment";
import AdminOperationsPage from "../portals/hr-admin/pages/AdminOperationsPage";

//Landing Page
import LandingPageHeader from "../common/components/layout/LandingPageHeader";
import LandingPage from "../portals/Home/pages/LandingPage";
import LoginPage from "../portals/Home/pages/LoginPage";

//Intern
import InternLayout from "../portals/interns/layouts/InternLayout";
import InternDashboard from "../portals/interns/pages/InternDashboard";
import Profile from "../portals/interns/pages/Profile";
import Tasks from "../portals/interns/pages/Tasks";
import Attendance from "../portals/interns/pages/Attendance";
import Documents from "../portals/interns/pages/Documents";
import NotificationsPage from "../portals/interns/pages/InternNotificationPage";
import InternCalendarPage from "../portals/interns/pages/InternCalendarPage";
import SettingsPage from "../common/components/layout/SettingsPage";
import InternEvaluation from "../portals/interns/pages/InternEvaluation";

//Application
import ApplicationForm from "../portals/Home/pages/ApplicationForm";
import ApplicationFormHeader from "../portals/Home/components/layout/ApplicationFormHeader";

//Applicant
import ApplicantLayout from "../portals/applicant-intern/components/layout/ApplicantLayout";
import ApplicantNotificationPage from "../portals/applicant-intern/pages/Notification";
import Dashboard from "../portals/applicant-intern/pages/Dashboard";
import MyApplication from "../portals/applicant-intern/pages/MyApplication";
import Settings from "../portals/applicant-intern/pages/Settings";

const HRAdminSectionPage = ({ title }) => (
  <div>
    <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
    <p className="text-sm text-slate-500">Welcome to {title}.</p>
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

        {/* Login page route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Application form intern route */}
        <Route path="/application-form" element={<ApplicationFormHeader />}>
          <Route index element={<ApplicationForm />} />
        </Route>

        {/* Applicant page route for pending interns */}
        <Route path="/applicant" element={<ApplicantLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="notifications" element={<ApplicantNotificationPage />} />
          <Route path="my-application" element={<MyApplication />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Intern Page Route*/}
        <Route path="/intern" element={<InternLayout />}>
          <Route index element={<InternDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="documents" element={<Documents />} />
          <Route path="evaluation" element={<InternEvaluation />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="calendar" element={<InternCalendarPage />} />
        </Route>

        {/* supervisor route */}
        <Route path="/supervisor" element={<SupervisorLayout />}>
          <Route index element={<SupervisorDashboard />} />
          <Route path="myinterns" element={<SupervisorMyInterns />} />
          <Route path="attendance" element={<SupervisorAttendance />} />
          <Route path="tasks" element={<SupervisorTasks />} />
          <Route path="documents" element={<SupervisorDocuments />} />
          <Route path="evaluations" element={<SupervisorEvaluations />} />
          <Route path="settings" element={<SupervisorSettings />} />
          <Route path="notifications" element={<SupervisorNotifications />} />
        </Route>

        {/* Hr-Staff Route */}
        <Route path="/hr-staff" element={<SideBarLayout />}>
          <Route index element={<HRStaffDashboard />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="operations" element={<OperationsPage />} />
          <Route path="staff-management" element={<StaffManagement />} />
          <Route path="document-vault" element={<DocumentVault />} />
          <Route path="intern/:internId" element={<InternDetailPage />} />
        </Route>

        {/* Hr-Admin Route */}
        <Route path="/hr-admin" element={<HrAdminSideBarLayout />}>
          <Route index element={<HRAdminDashboard />} />
          <Route path="recruitment" element={<AdminRecruitment />} />
          <Route path="internmanagement">
            <Route index element={<AdminOperationsPage />} />
            <Route path="intern/:internId" element={<internmanagement />} />
          </Route>
          <Route path="staffmanagement" element={<AdminStaffManagement />} />
          <Route path="documnetvault" element={<AdminDocumentVault />} />
          <Route path="reportsandanalytics" element={<ReportsAndAnalytics />} />
          <Route path="systemlogs" element={<SystemLogs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
