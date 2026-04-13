import Header from "../../../common/components/layout/Header";
import BigCalendar from "../components/ui/BigCalendar";
import CalendarPanel from "../components/ui/CalendarPanel";

export default function InternCalendarPage() {
  return (
    <>
      <Header title="Calendar" subtitle="Your schedule & events" />
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/*Big Calendar*/}
        <div className="col-span-2">
          <BigCalendar />
        </div>

        {/*Side Panel */}
        <div>
          <CalendarPanel />
        </div>
      </div>
    </>
  );
}
