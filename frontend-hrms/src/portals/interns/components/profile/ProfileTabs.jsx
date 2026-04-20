import { FileText, GraduationCap, User2 } from 'lucide-react';

const iconMap = { user: User2, school: GraduationCap, documents: FileText };

export default function ProfileTabs({ activeTab, onChange, tabs }) {
  return (
    <div className="flex gap-6 mt-4 border-b border-gray-100">{tabs.map((tab) => { const Icon = iconMap[tab.icon]; const isActive = activeTab === tab.value; return <button key={tab.value} onClick={() => onChange(tab.value)} className={`flex items-center gap-2 pb-3 text-sm transition ${isActive ? 'border-b-2 border-violet-500 text-violet-500 font-medium' : 'text-gray-400 hover:text-gray-700'}`}><Icon size={16} /><span className="text-sm">{tab.label}</span></button>; })}</div>
  );
}