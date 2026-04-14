import { useState, useEffect } from "react";
import TimeButton from "./TimeButton";
import { LogIn, LogOut, Clock3 } from "lucide-react";
import { useAttendance } from "../../../../contexts/useAttendance";

export default function TimeCard() {
  const { records, timeIn, timeOut } = useAttendance();
  const [today, setToday] = useState(new Date());

  //This will get the latest record for today
  const latestRecord = records[records.length - 1];

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      {/*Header*/}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Time in/out</h3>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-900 mb-4">
        <Clock3 size={14} className="text-gray-900" />
        <span>Today {formattedDate}</span>
      </div>

      {/*Time Boxes */}
      <div className="grid grid-cols-2 gap-4">
        {/* Time In */}
        <div className="flex flex-col items-center gap-3">
          <div className="border border-gray-200 rounded-lg p-3 text-center w-full">
            <p className="text-xs text-gray-400">Time in</p>
            <p className="text-lg font-semibold">
              {latestRecord?.timeIn || "-"}
            </p>
          </div>

          <TimeButton
            label="Time in"
            onClick={timeIn}
            variant="primary"
            disabled={!!latestRecord && !latestRecord.timeOut}
            icon={LogIn}
          />
        </div>

        {/* Time Out */}
        <div className="flex flex-col items-center gap-3">
          <div className="border border-gray-200 rounded-lg p-3 text-center w-full">
            <p className="text-xs text-gray-400">Time out</p>
            <p className="text-lg font-semibold">
              {latestRecord?.timeOut || "-"}
            </p>
          </div>

          <TimeButton
            label="Time out"
            onClick={timeOut}
            variant="secondary"
            disabled={!latestRecord || !!latestRecord?.timeOut}
            icon={LogOut}
          />
        </div>
      </div>
    </div>
  );
}
