import { ChevronDown } from 'lucide-react';

import EmployeeAvatar from '../staff-management/EmployeeAvatar';

export default function SidebarAccountMenu({ isDark, isOpen, menuRef, user, items, onAction, onToggle }) {
  return (
    <div ref={menuRef} className="relative mt-auto pt-4">
      <div className={`absolute bottom-full left-0 right-0 mb-3 overflow-hidden rounded-2xl p-2 shadow-[0_16px_40px_rgba(17,24,39,0.14)] transition-all duration-200 ${isDark ? 'border border-slate-800 bg-slate-900' : 'border border-[#E5E7EB] bg-white'} ${isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`} role="menu" aria-hidden={!isOpen}>
        {items.map((item) => {
          const Icon = item.icon;
          return <div key={item.key}>{item.isDanger ? <div className={`my-2 h-px ${isDark ? 'bg-slate-800' : 'bg-[#EEEAF7]'}`} aria-hidden="true" /> : null}<button type="button" role="menuitem" className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-200 ${item.isDanger ? (isDark ? 'text-amber-300 hover:bg-amber-500/10' : 'text-[#C2410C] hover:bg-[#FFF7ED]') : (isDark ? 'text-slate-100 hover:bg-slate-800' : 'text-[#25263A] hover:bg-[#F7F7FB]')}`} onClick={() => onAction(item.action)}><Icon size={17} strokeWidth={2.1} className="shrink-0" /><span className={`text-[14px] leading-tight ${item.isDanger ? 'font-semibold' : 'font-medium'}`}>{item.label}</span></button></div>;
        })}
      </div>
      <button type="button" className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left shadow-sm transition-colors duration-200 ${isDark ? 'border-slate-800 bg-slate-900 hover:bg-slate-800' : 'border-[#DDDDE3] bg-white hover:bg-[#FAFAFC]'}`} onClick={onToggle} aria-expanded={isOpen} aria-haspopup="menu">
        <EmployeeAvatar src={user.avatar} alt={user.name} name={user.name} size={52} />
        <span className="min-w-0 flex-1"><span className={`block truncate text-[15px] font-semibold leading-tight ${isDark ? 'text-white' : 'text-[#111111]'}`}>{user.name}</span><span className={`mt-1 block truncate text-[14px] leading-tight ${isDark ? 'text-slate-400' : 'text-[#8B8B95]'}`}>{user.role}</span></span>
        <ChevronDown size={20} strokeWidth={2.2} className={`shrink-0 transition-transform duration-200 ${isDark ? 'text-slate-200' : 'text-[#222222]'} ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
    </div>
  );
}