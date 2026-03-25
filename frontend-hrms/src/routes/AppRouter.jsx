
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SupervisorLayout from '../portals/supervisor/layouts/SupervisorLayout';
import SupervisorDashboard from '../portals/supervisor/pages/SupervisorDashboard';
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

            <Route path="/hr-staff/*" element={<HRStaffDashboard />} />
            <Route path="/hr-admin/*" element={<HRAdminDashboard />} />

        </Routes>
    </BrowserRouter>
    );
};
