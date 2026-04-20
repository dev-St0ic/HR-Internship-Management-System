import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DepartmentListPage from '../portals/hr-staff/pages/staff-management/DepartmentListPage';
import DepartmentDetailPage from '../portals/hr-staff/pages/staff-management/DepartmentDetailPage';
import EmployeeDetailPage from '../portals/hr-staff/pages/staff-management/EmployeeDetailPage';
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
import InternManagementPage from '../portals/hr-staff/pages/InternManagementPage';
import InternManagementInternPage from '../portals/hr-staff/pages/InternManagementInternPage';
import LandingPageHeader from "../common/components/layout/LandingPageHeader";
import LandingPage from "../portals/Home/pages/LandingPage";
import ApplicationFormHeader from "../portals/interns/components/layout/ApplicationFormHeader";
import ApplicationForm from "../portals/interns/pages/ApplicationForm";
import InternLayout from "../portals/interns/layouts/InternLayout";
import InternDashboard from "../portals/interns/pages/InternDashboard";
import Profile from "../portals/interns/pages/Profile";
import Tasks from "../portals/interns/pages/Tasks";
import Attendance from "../portals/interns/pages/Attendance";
import Documents from "../portals/interns/pages/Documents";
import Evaluation from "../portals/interns/pages/Evaluation";
import NotificationsPage from "../portals/interns/pages/InternNotificationPage";
import InternCalendarPage from "../portals/interns/pages/InternCalendarPage";
import SettingsPage from "../common/components/layout/SettingsPage";
import LoginPage from "../portals/Home/pages/LoginPage";
import HRStaffSettingsPage from '../portals/hr-staff/pages/SettingsPage';
import HrStaffNotificationsPage from '../portals/hr-staff/pages/HrStaffNotificationsPage';
import HrStaffDocumentVaultPage from '../portals/hr-staff/pages/HrStaffDocumentVaultPage';
import HrStaffDashboardPage from '../portals/hr-staff/pages/HrStaffDashboardPage';
import HrStaffRecruitmentPage from '../portals/hr-staff/pages/HrStaffRecruitmentPage';

// Temporary placeholders muna
const Home = () => <>Homee</>;

const HRAdminDashboard = () => <>HR admin dashboard page</>;

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

        <Route path="/intern" element={<InternLayout />}>
          <Route index element={<InternDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="documents" element={<Documents />} />
          <Route path="evaluation" element={<Evaluation />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="calendar" element={<InternCalendarPage />} />
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
          <Route path="operations" element={<Navigate to="/hr-staff/intern-management" replace />} />
          <Route path="recruitment" element={<HrStaffRecruitmentPage />} />
          <Route path="intern-management" element={<InternManagementPage />} />
          <Route path="intern-management/intern/:internSlug/profile" element={<InternManagementInternPage />} />
          <Route path="intern-management/intern/:internSlug/attendance" element={<InternManagementInternPage />} />
          <Route path="intern-management/intern/:internSlug/attendance/monthly-dtr" element={<InternManagementInternPage />} />
          <Route path="intern-management/intern/:internSlug/tasks" element={<InternManagementInternPage />} />
          <Route path="intern-management/intern/:internSlug/evaluation" element={<InternManagementInternPage />} />
          <Route index element={<HrStaffDashboardPage />} />
          <Route path="settings" element={<HRStaffSettingsPage />} />
          <Route path="notifications" element={<HrStaffNotificationsPage />} />
          <Route path="document-vault" element={<HrStaffDocumentVaultPage />} />
          {/* Staff Management Routes */}
          <Route path="staff-management" >
            <Route index element={<DepartmentListPage />} />
            <Route path="department/:departmentId" element={<DepartmentDetailPage />} />
            <Route path="department/:departmentId/employee/:employeeId" element={<EmployeeDetailPage />} />
          </Route>
        </Route>

        <Route path="/hr-admin/*" element={<HRAdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
