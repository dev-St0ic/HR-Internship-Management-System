import { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarTaskCard from "../calendar/CalendarTaskCard";

export default function BigCalendar({
  tasks = [],
  selectedDate,
  onSelectDate,
}) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!task.deadline) return acc;

    if (!acc[task.deadline]) {
      acc[task.deadline] = [];
    }

    acc[task.deadline].push(task);
    return acc;
  }, {});

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
  for (let i = 1; i <= daysInMonth; i++) {
    const date = currentMonth.date(i).format("YYYY-MM-DD");

    const tasksForDate = groupedTasks[date] || [];

    days.push({
      day: i,
      fullDate: date,
      tasks: tasksForDate,
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
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          className="bg-purple-500 text-white px-3 py-1 rounded-md"
        >
          <ChevronRight size={18} />
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
      <div className="grid grid-cols-7 gap-2 text-sm">
        {days.map((item, index) => {
          if (!item) return <div key={index} className="min-h-24"></div>;

          const isSelected =
            selectedDate?.format("YYYY-MM-DD") === item.fullDate;

          return (
            <div
              key={index}
              onClick={() => onSelectDate(dayjs(item.fullDate))}
              className={`
        min-h-24 rounded-lg p-2 flex flex-col cursor-pointer transition
        ${isSelected ? "bg-purple-50 ring-1 ring-purple-300" : "hover:bg-gray-50"}
      `}
            >
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
              <div className="mt-1 space-y-1">
                {item.tasks.slice(0, 2).map((task) => (
                  <CalendarTaskCard key={task.id} task={task} />
                ))}

                {item.tasks.length > 2 && (
                  <p className="text-[10px] text-gray-400">
                    +{item.tasks.length - 2} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
