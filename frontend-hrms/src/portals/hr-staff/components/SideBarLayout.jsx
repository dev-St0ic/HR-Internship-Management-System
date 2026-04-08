import { Outlet, Link as RouterLink } from 'react-router-dom';
import Link from "@mui/material/Link";


const SideBarLayout = () => {
  return (
    <div className="hrims-layout">
      <div className="flex min-h-screen">
        <nav className="bg-slate-200 p-5 w-[250px]">
          <h2 className="font-bold text-lg mb-6">HRIMS</h2>
          <ul>
            <li className="mb-2">
              <Link component={RouterLink} to="/hr-staff/dashboard" sx={{ display: "block", px: 2, py: 1, borderRadius: 1.8, color: "text.secondary", textDecoration: "none", transition: "background-color 150ms, color 150ms, box-shadow 150ms", "&:hover": { backgroundColor: "grey.500", color: "text.primary", boxShadow: "0 6px 18px rgba(0, 0, 0, 0.36)" } }}>Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link component={RouterLink} to="/hr-staff/recruitment" sx={{ display: "block", px: 2, py: 1, borderRadius: 1.8, color: "text.secondary", textDecoration: "none", transition: "background-color 150ms, color 150ms, box-shadow 150ms", "&:hover": { backgroundColor: "grey.500", color: "text.primary", boxShadow: "0 6px 18px rgba(0, 0, 0, 0.36)" } }}>Recruitment</Link>
            </li>
            <li className="mb-2">
              <Link component={RouterLink} to="/hr-staff/intern-management" sx={{ display: "block", px: 2, py: 1, borderRadius: 1.8, color: "text.secondary", textDecoration: "none", transition: "background-color 150ms, color 150ms, box-shadow 150ms", "&:hover": { backgroundColor: "grey.500", color: "text.primary", boxShadow: "0 6px 18px rgba(0, 0, 0, 0.36)" } }}>Intern Management</Link>
            </li>
            <li className="mb-2">
              <Link component={RouterLink} to="/hr-staff/staff-management" sx={{ display: "block", px: 2, py: 1, borderRadius: 1.8, color: "#7c3aed", fontWeight: 600, backgroundColor: "#ede9fe", textDecoration: "none", transition: "background-color 150ms, color 150ms, box-shadow 150ms", boxShadow: "0 6px 18px rgba(124, 58, 237, 0.08)" }}>Staff Management</Link>
            </li>
            <li className="mb-2">
              <Link component={RouterLink} to="/hr-staff/document-vault" sx={{ display: "block", px: 2, py: 1, borderRadius: 1.8, color: "text.secondary", textDecoration: "none", transition: "background-color 150ms, color 150ms, box-shadow 150ms", "&:hover": { backgroundColor: "grey.500", color: "text.primary", boxShadow: "0 6px 18px rgba(0, 0, 0, 0.36)" } }}>Document Vault</Link>
            </li>
            <li className="mb-2">
              <Link component={RouterLink} to="/hr-staff/settings" sx={{ display: "block", px: 2, py: 1, borderRadius: 1.8, color: "text.secondary", textDecoration: "none", transition: "background-color 150ms, color 150ms, box-shadow 150ms", "&:hover": { backgroundColor: "grey.500", color: "text.primary", boxShadow: "0 6px 18px rgba(0, 0, 0, 0.36)" } }}>Settings</Link>
            </li>
          </ul>
        </nav>
        <div className="row w-full">
          <main style={{ flex: 1, padding: '0' }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default SideBarLayout;
