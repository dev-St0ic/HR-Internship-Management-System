import { Link as RouterLink } from 'react-router-dom';
import Link from "@mui/material/Link";

const SideBarLayout = () => {
  return (
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
              Intern Management
          </Link>
        </li>
        {/* <li><Link to="/supervisor">Dashboard</Link></li> */}
      </ul>
    </nav>
  );
};

export default SideBarLayout;
