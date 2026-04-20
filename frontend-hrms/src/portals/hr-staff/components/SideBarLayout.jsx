import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { brandAssets, hrStaffSidebarIconMap } from '../../../common/config/appIconRegistry';
import { useTheme } from '../../../common/theme/ThemeProvider';
import { currentHrStaffUser } from '../data/currentHrStaffUser';
import SidebarAccountMenu from './sidebar/SidebarAccountMenu';
import SidebarLink from './sidebar/SidebarLink';
import { accountMenuItems, navItems } from './sidebar/sidebarConfig';

const SideBarLayout = () => {
  const { isDark, resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const themedNavItems = navItems.map((item) => ({ ...item, icons: hrStaffSidebarIconMap[item.iconKey] }));

  useEffect(() => {
    const handlePointerDown = (event) => !accountMenuRef.current?.contains(event.target) && setIsAccountMenuOpen(false);
    const handleKeyDown = (event) => event.key === 'Escape' && setIsAccountMenuOpen(false);
    document.addEventListener('mousedown', handlePointerDown); window.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('mousedown', handlePointerDown); window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  useEffect(() => setIsAccountMenuOpen(false), [location.pathname, location.search]);
  const handleAccountMenuAction = (action) => action === 'sign-out' ? navigate('/login') : navigate(action === 'account' ? '/hr-staff/settings' : `/hr-staff/settings?tab=${action}`);

  return (
    <div className={`min-h-screen xl:pl-[320px] ${isDark ? 'bg-slate-950 text-slate-100' : ''}`}><nav className={`mx-0 mt-0 flex w-full flex-col overflow-y-auto rounded-none px-4 py-5 xl:fixed xl:inset-y-0 xl:left-0 xl:mx-0 xl:mt-0 xl:h-screen xl:w-[320px] xl:px-5 xl:py-6 xl:rounded-none xl:border-r xl:border-l-0 xl:border-t-0 xl:border-b-0 xl:shadow-none ${isDark ? 'border border-slate-800 bg-slate-900 shadow-[0_18px_44px_rgba(2,6,23,0.42)]' : 'border border-[#E5E7EB] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]'}`}><div className="mb-6 flex items-center gap-3 px-1"><img src={brandAssets.logo} alt="HRIMS logo" className="h-[46px] w-[46px] shrink-0 object-contain" /><h1 className={`whitespace-nowrap text-[2.25rem] font-medium leading-none tracking-[0.06em] ${isDark ? 'text-white' : 'text-black'}`}>HRIMS</h1></div><ul className="space-y-1">{themedNavItems.map((item) => <SidebarLink key={item.label} item={item} isDark={isDark} resolvedTheme={resolvedTheme} />)}</ul><SidebarAccountMenu isDark={isDark} isOpen={isAccountMenuOpen} menuRef={accountMenuRef} user={currentHrStaffUser} items={accountMenuItems} onAction={handleAccountMenuAction} onToggle={() => setIsAccountMenuOpen((current) => !current)} /></nav><div className="hrims-layout min-w-0"><main style={{ flex: 1, padding: '0' }}><Outlet /></main></div></div>
  );
};

export default SideBarLayout;
