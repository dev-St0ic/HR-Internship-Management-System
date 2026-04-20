import { Navigate, Route } from 'react-router-dom';

import SideBarLayout from '../portals/hr-staff/components/SideBarLayout';
import HrStaffDashboardPage from '../portals/hr-staff/pages/HrStaffDashboardPage';
import HrStaffDocumentVaultPage from '../portals/hr-staff/pages/HrStaffDocumentVaultPage';
import InternManagementInternPage from '../portals/hr-staff/pages/InternManagementInternPage';
import InternManagementPage from '../portals/hr-staff/pages/InternManagementPage';
import HrStaffNotificationsPage from '../portals/hr-staff/pages/HrStaffNotificationsPage';
import HrStaffRecruitmentPage from '../portals/hr-staff/pages/HrStaffRecruitmentPage';
import SettingsPage from '../portals/hr-staff/pages/SettingsPage';
import DepartmentDetailPage from '../portals/hr-staff/pages/staff-management/DepartmentDetailPage';
import DepartmentListPage from '../portals/hr-staff/pages/staff-management/DepartmentListPage';
import EmployeeDetailPage from '../portals/hr-staff/pages/staff-management/EmployeeDetailPage';

export function renderHrStaffRoutes() {
  return (
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
      <Route path="settings" element={<SettingsPage />} />
      <Route path="notifications" element={<HrStaffNotificationsPage />} />
      <Route path="document-vault" element={<HrStaffDocumentVaultPage />} />
      <Route path="staff-management"><Route index element={<DepartmentListPage />} /><Route path="department/:departmentId" element={<DepartmentDetailPage />} /><Route path="department/:departmentId/employee/:employeeId" element={<EmployeeDetailPage />} /></Route>
    </Route>
  );
}