import { useState } from "react";
import dayjs from "dayjs";
import { calendarEvents } from "../../../../common/config/mockCalendarData";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BigCalendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const startDay = startOfMonth.day(); 
  const daysInMonth = currentMonth.daysInMonth();
  const today = dayjs().format("YYYY-MM-DD");

  const days = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Current month days 
  for (let i = 1; i <= daysInMonth; i++) {
    const date = currentMonth.date(i).format("YYYY-MM-DD");
    const hasEvent = calendarEvents.some((e) => e.date === date);

    days.push({
      day: i,
      fullDate: date,
      hasEvent,
      isToday: date === today,
    });
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 transition-all duration-300">
      
      {/* 1. Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {currentMonth.format("MMMM YYYY")}
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Full Schedule Overview</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentMonth(dayjs())}
            className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all"
          >
            Today
          </button>
          <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1">
            <button
              onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-600 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-600 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Days Header */}
      <div className="grid grid-cols-7 mb-6">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            {d}
          </div>
        ))}
      </div>

      {/* 3. Calendar days */}
      <div className="grid grid-cols-7 gap-6">
        {days.map((item, index) => {
          if (!item) return <div key={index} className="h-20"></div>;

          return (
            <div 
              key={index} 
              className={`h-24 p-3 border border-slate-100 rounded-2xl relative transition-all group hover:border-violet-200 hover:bg-violet-50/30 ${
                item.isToday ? "bg-violet-50/50 border-violet-600" : "bg-white"
              }`}
            >
              {/* Date Number */}
              <span
                className={`text-base font-bold transition-colors ${
                  item.isToday ? "text-[#7C3EFF]" : "text-slate-700"
                }`}
              >
                {item.day}
              </span>

              {/* Indicator */}
              {item.hasEvent && (
                <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-[#7C3EFF] border-2 border-white ring-1 ring-violet-100 animate-pulse"></span>
              )}
              
              {/* Placeholder for tasks? */}
              {item.hasEvent && (
                <div className="mt-4 truncate text-[12px] font-bold text-violet-600 px-2 bg-white/50 rounded shadow-sm border border-violet-100">
                  Task
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}