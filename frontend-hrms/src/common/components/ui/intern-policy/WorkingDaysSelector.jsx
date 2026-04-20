export default function WorkingDaysSelector({ days, workingDays, onToggle }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">{days.map((day) => {
      const isActive = workingDays.includes(day);
      return <button key={day} type="button" onClick={() => onToggle(day)} className="flex items-center gap-2 group"><span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">{day}</span><div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'border-green-500' : 'border-gray-300 group-hover:border-gray-400'}`}>{isActive ? <div className="w-2 h-2 rounded-full bg-green-500"></div> : null}</div></button>;
    })}</div>
  );
}