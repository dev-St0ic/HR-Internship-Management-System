import { useState } from "react";
import dayjs from "dayjs";
import { calendarEvents } from "../../../../common/utils/mockAuth.js";

export default function BigCalendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const startDay = startOfMonth.day(); // This starts on Sunday
  const daysInMonth = currentMonth.daysInMonth();

  const today = dayjs().format("YYYY-MM-DD");

  //This is for the calendar grid
  const days = [];

  //Space for the dates of the last month
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  //This is for the current month days
  for (let i = 1; i < daysInMonth; i++) {
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
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      {/*Controlls at the top */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setCurrentMonth(dayjs())}
          className="bg-gray-100 px-3 py-1 rounded-md text-sm"
        >
          Today
        </button>

        <button
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          className="bg-purple-500 text-white px-3 py-1 rounded-md"
        >
          {"<"}
        </button>

        <button
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          className="bg-purple-500 text-white px-3 py-1 rounded-md"
        >
          {">"}
        </button>
      </div>

      {/* This is the Month Title */}
      <h2 className="font-lg font-semibold mb-4">
        {currentMonth.format("MMMM YYYY")}
      </h2>

      {/* This is the header for the Days */}
      <div className="grid grid-cols-7 text-sm text-gray-400 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/*This is the Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-6 text-sm">
        {days.map((item, index) => {
          if (!item) return <div key={index}></div>;

          return (
            <div key={index} className="h-12 relative">
              {/*This is the date Number */}
              <span
                className={`
                                text-sm
                                ${item.isToday ? "font-bold text-purple-600" : "text-gray-700"}
                                `}
              >
                {item.day}
              </span>

              {/* Event indicator */}
              {item.hasEvent && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
