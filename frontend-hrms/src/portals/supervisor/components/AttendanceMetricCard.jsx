import { ClockAlert, Timer, UserCheck, UserX } from 'lucide-react';

const iconMap = {
  present: UserCheck,
  late: ClockAlert,
  absent: UserX,
  hours: Timer,
};

export default function AttendanceMetricCard({ card }) {
  const Icon = iconMap[card.icon];

  return (
    <div className="border border-gray-500/20 rounded shadow mt-2 flex flex-col justify-between">
      <div className="p-3"><div className="flex items-center mb-2"><div className="bg-gray-500/10 rounded-lg w-10 h-10 mr-2 flex items-center justify-center"><Icon className="text-[#7C3EFF]" size={20} /></div><h1 className="text-sm sm:text-base">{card.label}</h1></div><h1 className="font-bold text-2xl sm:text-3xl">{card.value}</h1></div>
      <div className="border-t border-gray-500/20 px-3"><span className="text-xs text-gray-500">{card.detail}</span></div>
    </div>
  );
}