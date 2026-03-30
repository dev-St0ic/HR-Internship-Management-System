import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SupervisorLayout from '../portals/supervisor/layouts/SupervisorLayout';
import SupervisorDashboard from '../portals/supervisor/pages/SupervisorDashboard';
import SideBarLayout from '../portals/hr-staff/components/SideBarLayout';
import OperationsPage from '../portals/hr-staff/pages/OperationsPage';
import LandingPageHeader from "../common/components/layout/LandingPageHeader";
import LandingPage from "../portals/Home/pages/LandingPage";
import ApplicationFormHeader from "../portals/interns/components/layout/ApplicationFormHeader";
import ApplicationForm from "../portals/interns/pages/ApplicationForm";
import LoginPage from "../portals/interns/pages/LoginPage";
// Temporary placeholders muna


const InternDashboard = () => (
    <>Intern dashboard page</>
);

const HRStaffDashboard = () => (
    <>HR staff dashboard page</>
);

const HRAdminDashboard = () => (
    <>HR admin dashboard page</>
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


            <Route path="/intern/*" element={<InternDashboard />} />

            {/* temp supervisor route */}
            <Route path="/supervisor" element={<SupervisorLayout />}>
                <Route index element={<SupervisorDashboard />} />
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
