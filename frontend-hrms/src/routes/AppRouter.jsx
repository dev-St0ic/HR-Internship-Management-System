
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Temporary placeholders muna
const Home = () => (
    <>Homee</>
);

const InternDashboard = () => (
    <>Intern dashboard page</>
);

const SupervisorDashboard = () => (
    <>Supervisor dashboardpage</>
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
            <Route path="/supervisor/*" element={<SupervisorDashboard />} />
            <Route path="/hr-staff/*" element={<HRStaffDashboard />} />
            <Route path="/hr-admin/*" element={<HRAdminDashboard />} />

        </Routes>
    </BrowserRouter>
    );
};
