import { Outlet, Link as RouterLink } from 'react-router-dom';
import Link from "@mui/material/Link";


const SideBarLayout = () => {
  return (
    <div className="flex min-h-screen">
      <nav className="bg-slate-200 p-5 w-[250px]">
        <h2>HR Staff Sidebar</h2>
        <ul>
          <li className="mb-2">
            <Link component={RouterLink} to="/hr-staff/operations" sx={{
                display: "block",
                px: 2,
                py: 1,
                borderRadius: 1.8,
                color: "text.secondary",
                textDecoration: "none",
                transition: "background-color 150ms, color 150ms, box-shadow 150ms",
                "&:hover": {
                    backgroundColor: "grey.500",
                    color: "text.primary",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.36)",
                },
                }}
            >
                Operations
            </Link>
          </li>
          {/* <li><Link to="/supervisor">Dashboard</Link></li> */}
        </ul>
      </nav>
      <div className="row w-full">
        <header className="h-16 border-b border-slate-200 flex items-center px-8">
          HR Staff Header
        </header>
        
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default SideBarLayout;
