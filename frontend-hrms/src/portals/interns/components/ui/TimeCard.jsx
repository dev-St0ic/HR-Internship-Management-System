import { useState, useEffect } from "react";
import TimeButton from "./TimeButton";
import { LogIn, LogOut, Clock3 } from "lucide-react";
import { useAttendance } from "../../../../contexts/useAttendance";

export default function TimeCard() {
  const { records, timeIn, timeOut } = useAttendance();
  const [today, setToday] = useState(new Date());
  const latestRecord = records[records.length - 1];

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Time in/out</h3>
          <div className="flex items-center gap-2 text-[13px] text-slate-500 mt-1">
            <Clock3 size={14} className="text-slate-400" />
            <span>Today, {formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Time In Column */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Time in</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">
              {latestRecord?.timeIn || "--:--"}
            </p>
          </div>
          <TimeButton label="Time in" onClick={timeIn} icon={LogIn} variant="primary" />
        </div>

        {/* Time Out Column */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Time out</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">
              {latestRecord?.timeOut || "--:--"}
            </p>
          </div>
          <TimeButton label="Time out" onClick={timeOut} icon={LogOut} variant="secondary" />
        </div>
      </div>
    </div>
  );
}