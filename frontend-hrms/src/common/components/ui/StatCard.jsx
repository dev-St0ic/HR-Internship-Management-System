export default function StatCard({ title, value, icon, change, date }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 -200">
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 bg-violet-50 text-[#7152F3] rounded-xl flex items-center justify-center border border-violet-100/50">
              {icon}
            </div>
          )}
          <p className="text-sm font-semibold text-slate-500">{title}</p>
        </div>
        
        {change && (
          <span className="text-[11px] font-bold bg-slate-50 text-slate-500 px-2.5 py-1 rounded-lg border border-slate-100">
            {change}
          </span>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
          {value}
        </h2>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <p className="text-xs font-medium text-slate-400">
          {date}
        </p>
      </div>
    </div>
  );
}
