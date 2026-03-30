import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
{/* imports galing sa Supervisor Pages */}
import { SupervisorLayout, SupervisorDashboard, SupervisorMyInterns, SupervisorAttendance, SupervisorTasks, SupervisorEvaluations, SupervisorSettings } from "../portals/supervisor/Index";

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
            {/* '/s' means 'supervisor' */}
            <Route path="/s" element={<SupervisorLayout />}>
                <Route index element={<SupervisorDashboard />} />
                <Route path="myinterns" index element={<SupervisorMyInterns />} />
                <Route path="attendance" index element={<SupervisorAttendance />} />
                <Route path="tasks" index element={<SupervisorTasks />} />
                <Route path="evaluations" index element={<SupervisorEvaluations />} />
                <Route path="settings" index element={<SupervisorSettings />} />
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
