import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SupervisorLayout from '../portals/supervisor/layouts/SupervisorLayout';
import SupervisorDashboard from '../portals/supervisor/pages/SupervisorDashboard';
import SideBarLayout from '../portals/hr-staff/components/SideBarLayout';
import OperationsPage from '../portals/hr-staff/pages/OperationsPage';
// Temporary placeholders muna
const Home = () => (
    <>Homee</>
);

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

            <Route path="/*" element={<Home/>} />
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
