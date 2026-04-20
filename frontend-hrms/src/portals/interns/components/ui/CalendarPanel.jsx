import { useState } from "react";
import dayjs from "dayjs";
import {
  LocalizationProvider,
  DateCalendar,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { calendarEvents } from "../../../../common/config/mockCalendarData";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import CalendarEventList from "./calendar/CalendarEventList";
import { getEventDates, getSortedCalendarEvents, renderCalendarDay } from "./calendar/calendarPanelUtils";

export default function CalendarPanel() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const navigate = useNavigate();
  const eventDates = getEventDates(calendarEvents);
  const events = getSortedCalendarEvents(calendarEvents);

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

        <CalendarEventList events={events} selectedDate={selectedDate} />
      </div>
    </>
  );
}
