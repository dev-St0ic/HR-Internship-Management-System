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
    if (!day) return null;

    const dateStr = dayjs(day).format("YYYY-MM-DD");
    const todayStr = dayjs().format("YYYY-MM-DD");

    const hasEvent = eventDates.includes(dateStr);
    const isToday = dateStr === todayStr;

    return (
      <PickersDay
        {...DayComponentProps}
        day={day}
        selected={false} //disables MUI blue
        sx={{
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "transparent !important",
            color: "inherit !important",
          },

          borderRadius: "50%",
          transition: "all 0.2s ease",

          ...(hasEvent && {
            backgroundColor: "#7C3EFF",
            color: "white",
          }),

          ...(isToday && {
            backgroundColor: "#C4B5FD",
          }),
        }}
      />
    );
  };

  const events = [...calendarEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  return (
    <>
      {/* Mini Calendar on the right side */}
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Schedule</h2>
          <button
            onClick={() => navigate("/intern/calendar")}
            className="bg-[#7C3EFF] text-white p-3 rounded-lg"
          >
            <CalendarDays size={20} />
          </button>
        </div>

        {/* Calendar */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => {
              if (newValue) setSelectedDate(dayjs(newValue));
            }}
            slots={{
              day: (props) => renderDay(props.day, selectedDate, props),
            }}
          />
        </LocalizationProvider>

        {/* Events */}
        <div className="mt-4 border-t pt-3 max-h-60 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-3">
            {selectedDate.format("dddd, DD MMMM YYYY")}
          </h3>

          {events.length > 0 ? (
            events.map((event) => {
              const eventDate = dayjs(event.date);

              return (
                <div key={event.id} className="flex flex-col gap-3 mb-3">
                  {/* Day & Date */}
                  <div className="text-sm font-semibold">
                    {eventDate.format("dddd, MMMM D YYYY")}
                  </div>

                  <div className="flex gap-3 mb-3">
                    {/* Time */}
                    <div className="text-lg font-bold w-12">{event.time}</div>

                    {/* Line separator */}
                    <div className="w-0.5 bg-purple-400"></div>

                    {/* Details */}
                    <div>
                      <p className="text-xs text-gray-400">{event.category}</p>
                      <p className="text-sm font-medium">{event.title}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 text-sm">No event</p>
          )}
        </div>
      </div>
    </>
  );
}
