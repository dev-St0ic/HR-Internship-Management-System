import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPageHeader from '../common/components/layout/LandingPageHeader';
import LandingPage from '../portals/Home/pages/LandingPage';
import LoginPage from '../portals/Home/pages/LoginPage';
import ApplicationFormHeader from '../portals/interns/components/layout/ApplicationFormHeader';
import ApplicationForm from '../portals/interns/pages/ApplicationForm';
import { renderHrStaffRoutes } from './hrStaffRoutes';
import { renderInternRoutes } from './internRoutes';
import { renderSupervisorRoutes } from './supervisorRoutes';

const HRAdminDashboard = () => <>HR admin dashboard page</>;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageHeader />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/application-form" element={<ApplicationFormHeader />}>
          <Route index element={<ApplicationForm />} />
        </Route>
        {renderInternRoutes()}
        {renderSupervisorRoutes()}
        {renderHrStaffRoutes()}
        <Route path="/hr-admin/*" element={<HRAdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
