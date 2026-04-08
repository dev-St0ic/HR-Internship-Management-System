import { useState } from "react";
import dayjs from "dayjs";
import {
  LocalizationProvider,
  DateCalendar,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { calendarEvents } from "../../../../common/config/mockCalendarData";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

export default function CalendarPanel() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const navigate = useNavigate();

  //For converting event dates into a quick lookup
  const eventDates = calendarEvents.map((e) => e.date);

  //This is the function for highlighting the event
  const renderDay = (day, _value, DayComponentProps) => {
    if (!day) return null; // this will prevent crash

    const dateStr = dayjs(day).format("YYYY-MM-DD");
    const hasEvent = eventDates.includes(dateStr);

    return (
      <PickersDay
        {...DayComponentProps}
        day={day}
        sx={{
          ...(hasEvent && {
            backgroundColor: "#8b5cf6",
            color: "white",
            borderRadius: "50%",
          }),
        }}
      />
    );
  };

  //This is for filtering the events
  const events = calendarEvents.filter(
    (e) => e.date === selectedDate.format("YYYY-MM-DD"),
  );

  return (
    <>
      {/* Mini Calendar on the right side */}
      <div className=" bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">My Schedule</h2>
          <button
            onClick={() => navigate("/intern/calendar")}
            className="bg-purple-500 text-white p-2 rounded-lg"
          >
            <CalendarDays size={14} />
          </button>
        </div>

        {/* Calendar */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate || dayjs()}
            onChange={(newValue) => {
              if (newValue) {
                setSelectedDate(dayjs(newValue));
              }
            }}
            renderDay={renderDay}
          />
        </LocalizationProvider>

        {/* Events */}
        <div className="mt-4 border-t pt-3 max-h-40 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-2">
            {selectedDate.format("dddd, DD MMMM YYYY")}
          </h3>

          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="flex gap-3 mb-3">
                {/* Time */}
                <div className="text-sm font-semibold w-16">{event.time}</div>

                {/* Line separator */}
                <div className="w-0.5 bg-purple-400"></div>

                {/* Details */}
                <div>
                  <p className="text-xs text-gray-400">{event.category}</p>
                  <p className="text-sm font-medium">{event.title}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No event</p>
          )}
        </div>
      </div>
    </>
  );
}
