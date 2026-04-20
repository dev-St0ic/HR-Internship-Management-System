import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BellRing, ChevronDown, LogOut, LockKeyhole, User } from "lucide-react";

import EmployeeAvatar from "./staff-management/EmployeeAvatar";
import { currentHrStaffUser } from "../data/currentHrStaffUser";
import { brandAssets, getThemeAsset, hrStaffSidebarIconMap } from "../../../common/config/appIconRegistry";
import { useTheme } from "../../../common/theme/ThemeProvider";

const navItems = [
  {
    label: "Dashboard",
    to: "/hr-staff",
    end: true,
    iconKey: "dashboard",
  },
  {
    label: "Recruitment",
    to: "/hr-staff/recruitment",
    iconKey: "recruitment",
  },
  {
    label: "Intern Management",
    to: "/hr-staff/intern-management",
    iconKey: "intern-management",
  },
  {
    label: "Staff Management",
    to: "/hr-staff/staff-management",
    iconKey: "staff-management",
  },
  {
    label: "Document Vault",
    to: "/hr-staff/document-vault",
    iconKey: "document-vault",
  },
  {
    label: "Settings",
    to: "/hr-staff/settings",
    iconKey: "settings",
  },
];

function SidebarLink({ item, isDark, resolvedTheme }) {
  return (
    <li>
      <NavLink
        to={item.to}
        end={item.end}
        className={({ isActive }) =>
          `relative flex min-h-[50px] items-center gap-3 rounded-r-[20px] rounded-l-none px-4 py-2.5 transition-colors duration-200 ${
            isActive
              ? isDark
                ? "bg-slate-800/90"
                : "bg-[#F5F1FF]"
              : isDark
                ? "hover:bg-slate-800/70"
                : "hover:bg-[#F7F7FB]"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`absolute left-0 top-1 bottom-1 w-1 rounded-r-full ${
                isActive ? "bg-[#7C3EFF]" : "bg-transparent"
              }`}
            />
            <img
              src={isActive ? item.icons.selected : getThemeAsset(item.icons.unselected, resolvedTheme)}
              alt=""
              aria-hidden="true"
              className="h-6 w-6 shrink-0 object-contain"
            />
            <span
              className={`whitespace-nowrap text-[15px] leading-[1.15] ${
                isActive
                  ? "font-semibold text-[#7C3EFF]"
                  : isDark
                    ? "font-medium text-slate-200"
                    : "font-medium text-[#25263A]"
              }`}
            >
              {item.label}
            </span>
          </>
        )}
      </NavLink>
    </li>
  );
}

const accountMenuItems = [
  {
    key: "account",
    label: "Account settings",
    icon: User,
    action: "account",
  },
  {
    key: "security",
    label: "Security & password",
    icon: LockKeyhole,
    action: "security",
  },
  {
    key: "notifications",
    label: "Notification preferences",
    icon: BellRing,
    action: "notifications",
  },
  {
    key: "sign-out",
    label: "Sign out",
    icon: LogOut,
    action: "sign-out",
    isDanger: true,
  },
];


const SideBarLayout = () => {
  const { isDark, resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const themedNavItems = navItems.map((item) => ({
    ...item,
    icons: hrStaffSidebarIconMap[item.iconKey],
  }));

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setIsAccountMenuOpen(false);
  }, [location.pathname, location.search]);

  const handleAccountMenuAction = (action) => {
    if (action === "sign-out") {
      navigate("/login");
      return;
    }

    if (action === "account") {
      navigate("/hr-staff/settings");
      return;
    }

    navigate(`/hr-staff/settings?tab=${action}`);
  };

  return (
    <div className={`min-h-screen xl:pl-[320px] ${isDark ? "bg-slate-950 text-slate-100" : ""}`}>
      <nav className={`mx-0 mt-0 flex w-full flex-col overflow-y-auto rounded-none px-4 py-5 xl:fixed xl:inset-y-0 xl:left-0 xl:mx-0 xl:mt-0 xl:h-screen xl:w-[320px] xl:px-5 xl:py-6 xl:rounded-none xl:border-r xl:border-l-0 xl:border-t-0 xl:border-b-0 xl:shadow-none ${
        isDark
          ? "border border-slate-800 bg-slate-900 shadow-[0_18px_44px_rgba(2,6,23,0.42)]"
          : "border border-[#E5E7EB] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
      }`}>
        <div className="mb-6 flex items-center gap-3 px-1">
          <img
            src={brandAssets.logo}
            alt="HRIMS logo"
            className="h-[46px] w-[46px] shrink-0 object-contain"
          />
          <h1 className={`whitespace-nowrap text-[2.25rem] font-medium leading-none tracking-[0.06em] ${isDark ? "text-white" : "text-black"}`}>
            HRIMS
          </h1>
        </div>

        <ul className="space-y-1">
          {themedNavItems.map((item) => (
            <SidebarLink key={item.label} item={item} isDark={isDark} resolvedTheme={resolvedTheme} />
          ))}
        </ul>

        <div ref={accountMenuRef} className="relative mt-auto pt-4">
          <div
            className={`absolute bottom-full left-0 right-0 mb-3 overflow-hidden rounded-2xl p-2 shadow-[0_16px_40px_rgba(17,24,39,0.14)] transition-all duration-200 ${
              isDark ? "border border-slate-800 bg-slate-900" : "border border-[#E5E7EB] bg-white"
            } ${
              isAccountMenuOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0"
            }`}
            role="menu"
            aria-hidden={!isAccountMenuOpen}
          >
            {accountMenuItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.key}>
                  {item.isDanger ? <div className={`my-2 h-px ${isDark ? "bg-slate-800" : "bg-[#EEEAF7]"}`} aria-hidden="true" /> : null}
                  <button
                    type="button"
                    role="menuitem"
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-200 ${
                      item.isDanger
                        ? isDark
                          ? "text-amber-300 hover:bg-amber-500/10"
                          : "text-[#C2410C] hover:bg-[#FFF7ED]"
                        : isDark
                          ? "text-slate-100 hover:bg-slate-800"
                          : "text-[#25263A] hover:bg-[#F7F7FB]"
                    }`}
                    onClick={() => handleAccountMenuAction(item.action)}
                  >
                    <Icon size={17} strokeWidth={2.1} className="shrink-0" />
                    <span className={`text-[14px] leading-tight ${item.isDanger ? "font-semibold" : "font-medium"}`}>
                      {item.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left shadow-sm transition-colors duration-200 ${
              isDark
                ? "border-slate-800 bg-slate-900 hover:bg-slate-800"
                : "border-[#DDDDE3] bg-white hover:bg-[#FAFAFC]"
            }`}
            onClick={() => setIsAccountMenuOpen((current) => !current)}
            aria-expanded={isAccountMenuOpen}
            aria-haspopup="menu"
          >
            <EmployeeAvatar
              src={currentHrStaffUser.avatar}
              alt={currentHrStaffUser.name}
              name={currentHrStaffUser.name}
              size={52}
            />
            <span className="min-w-0 flex-1">
              <span className={`block truncate text-[15px] font-semibold leading-tight ${isDark ? "text-white" : "text-[#111111]"}`}>
                {currentHrStaffUser.name}
              </span>
              <span className={`mt-1 block truncate text-[14px] leading-tight ${isDark ? "text-slate-400" : "text-[#8B8B95]"}`}>
                {currentHrStaffUser.role}
              </span>
            </span>
            <ChevronDown
              size={20}
              strokeWidth={2.2}
              className={`shrink-0 transition-transform duration-200 ${isDark ? "text-slate-200" : "text-[#222222]"} ${isAccountMenuOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>
      </nav>

      <div className="hrims-layout min-w-0">
        <main style={{ flex: 1, padding: '0' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SideBarLayout;
