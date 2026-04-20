import { useState } from "react";
import dayjs from "dayjs";

export default function BigCalendar() {
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const startOfMonth = currentMonth.startOf("month");
    const startDay = startOfMonth.day(); // 0 is Sunday
    const daysInMonth = currentMonth.daysInMonth();

    const today = dayjs().format("YYYY-MM-DD");

    const days = [];

    // Empty slots for previous month's days
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }

    // Current month's days (Fixed the bug: changed < to <= so it includes the last day!)
    for (let i = 1; i <= daysInMonth; i++) {
        const date = currentMonth.date(i).format("YYYY-MM-DD");

        days.push({
            day: i,
            fullDate: date,
            isToday: date === today,
        });
    }

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm h-full">
            
            {/* --- Controls & Month Title --- */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    {currentMonth.format("MMMM YYYY")}
                </h2>
                
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentMonth(dayjs())}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Today
                    </button>
                    <div className="flex gap-1.5">
                        <button
                            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
                            className="bg-[#7C3EFF] hover:bg-[#6A32E6] text-white p-2 rounded-lg transition-colors shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button
                            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
                            className="bg-[#7C3EFF] hover:bg-[#6A32E6] text-white p-2 rounded-lg transition-colors shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Days Header --- */}
            <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="py-2">{d}</div>
                ))}
            </div>

            {/* --- Calendar Grid --- */}
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-sm border-t border-gray-100 pt-6">
                {days.map((item, index) => {
                    if (!item) return <div key={`empty-${index}`} className="h-24 rounded-xl"></div>;

                    return (
                        <div 
                            key={item.fullDate} 
                            className={`h-24 p-2 rounded-xl border transition-all flex flex-col ${
                                item.isToday 
                                    ? "border-[#7C3EFF] bg-purple-50 shadow-sm" 
                                    : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                            }`}
                        >
                            <span
                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                                    item.isToday 
                                        ? "bg-[#7C3EFF] text-white font-bold shadow-md" 
                                        : "text-gray-700 font-medium"
                                }`}
                            >
                                {item.day}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}