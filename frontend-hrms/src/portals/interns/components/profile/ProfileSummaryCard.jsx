import { BriefcaseBusiness, Mail, PenLine } from 'lucide-react';

export default function ProfileSummaryCard({ user }) {
  return (
    <div className="flex justify-between gap-3 items-center pb-5 border-b border-gray-100"><div className="flex items-center gap-3"><div className="w-20 h-20 bg-gray-500 rounded-md" /><div><h2 className="font-bold text-xl">{user.name}</h2><p className="flex items-center gap-1 text-sm text-gray-500"><BriefcaseBusiness size={14} />{user.role}</p><p className="flex items-center gap-1 text-sm text-gray-500"><Mail size={14} />{user.email}</p></div></div><button className="flex items-center gap-2 px-4 py-2 bg-violet-500 rounded-lg text-xs text-white hover:bg-gray-300 hover:text-violet-500 transition"><PenLine size={14} /> Edit Profile</button></div>
  );
}