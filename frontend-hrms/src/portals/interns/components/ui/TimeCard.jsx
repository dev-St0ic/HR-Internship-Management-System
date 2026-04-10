import { useState } from "react";
import TimeButton from "./TimeButton";

export default function TimeCard({ date }) {
  const [timeIn, setTimeIn] = useState(null);
  const [timeOut, setTimeOut] = useState(null);

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

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/*Header*/}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Time in/out</h3>
        <p className="text-sm text-gray-400">{date}</p>
      </div>

      {/*Time Boxes */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-400">Time in</p>
          <p className="text-lg font-semibold">{timeIn || "-"}</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-400">Time out</p>
          <p className="text-lg font-semibold">{timeOut || "-"}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <TimeButton
          label="Time in"
          onClick={handleTimeIn}
          variant="primary"
          disabled={!!timeIn}
        />
        <TimeButton
          label="Time out"
          onClick={handleTimeOut}
          variant="secondary"
          disabled={!!timeOut}
        />
      </div>
    </div>
  );
}
