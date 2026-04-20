import { NavLink } from 'react-router-dom';

import { getThemeAsset } from '../../../../common/config/appIconRegistry';

export default function SidebarLink({ item, isDark, resolvedTheme }) {
  return (
    <li><NavLink to={item.to} end={item.end} className={({ isActive }) => `relative flex min-h-[50px] items-center gap-3 rounded-r-[20px] rounded-l-none px-4 py-2.5 transition-colors duration-200 ${isActive ? (isDark ? 'bg-slate-800/90' : 'bg-[#F5F1FF]') : (isDark ? 'hover:bg-slate-800/70' : 'hover:bg-[#F7F7FB]')}`}>
      {({ isActive }) => <><span className={`absolute left-0 top-1 bottom-1 w-1 rounded-r-full ${isActive ? 'bg-[#7C3EFF]' : 'bg-transparent'}`} /><img src={isActive ? item.icons.selected : getThemeAsset(item.icons.unselected, resolvedTheme)} alt="" aria-hidden="true" className="h-6 w-6 shrink-0 object-contain" /><span className={`whitespace-nowrap text-[15px] leading-[1.15] ${isActive ? 'font-semibold text-[#7C3EFF]' : (isDark ? 'font-medium text-slate-200' : 'font-medium text-[#25263A]')}`}>{item.label}</span></>}
    </NavLink></li>
  );
}