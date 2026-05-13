import { useState } from "react";
import dayjs from "dayjs";
import BigCalendar from "../components/ui/BigCalendar";
import CalendarPanel from "../components/ui/CalendarPanel";
import useInternTasks from "../hooks/useInternTasks";

export default function InternCalendarPage() {
  const tasks = useInternTasks();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <>
      <div className="grid grid-cols-3 gap-6 mt-2">
        {/*Big Calendar*/}
        <div className="col-span-2">
          <BigCalendar
            tasks={tasks}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        {/*Side Panel */}
        <div>
          <CalendarPanel
            tasks={tasks}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
      </div>
    </>
  );
}
