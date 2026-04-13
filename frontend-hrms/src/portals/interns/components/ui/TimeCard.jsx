import { useState, useEffect } from "react";
import TimeButton from "./TimeButton";
import { LogIn, LogOut, Clock3 } from "lucide-react";

export default function TimeCard({ date }) {
  const [timeIn, setTimeIn] = useState(null);
  const [timeOut, setTimeOut] = useState(null);
  const [today, setToday] = useState(new Date());

  const handleTimeIn = () => {
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setTimeIn(now);
  };

  const handleTimeOut = () => {
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setTimeOut(now);
  };

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
        <p className="text-sm text-gray-400">{date}</p>
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
            <p className="text-lg font-semibold">{timeIn || "-"}</p>
          </div>

          <TimeButton
            label="Time in"
            onClick={handleTimeIn}
            variant="primary"
            disabled={!!timeIn}
            icon={LogIn}
          />
        </div>

        {/* Time Out */}
        <div className="flex flex-col items-center gap-3">
          <div className="border border-gray-200 rounded-lg p-3 text-center w-full">
            <p className="text-xs text-gray-400">Time out</p>
            <p className="text-lg font-semibold">{timeOut || "-"}</p>
          </div>

          <TimeButton
            label="Time out"
            onClick={handleTimeOut}
            variant="secondary"
            disabled={!timeIn || !!timeOut}
            icon={LogOut}
          />
        </div>
      </div>
    </div>
  );
}
