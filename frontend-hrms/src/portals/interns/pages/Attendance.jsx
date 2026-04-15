import Header from "../../../common/components/layout/Header";
import { useAttendance } from "../../../contexts/useAttendance";
import { useState } from "react";
import { LogIn, LogOut } from "lucide-react";

export default function Attendance() {
  const { records, timeIn, timeOut, getStatus } = useAttendance();
  const [activeAction, setActiveAction] = useState(null); // "timeIn" or "timeOut"

  //Will come from backend in the future, for now we will hardcode it
  const totalRequired = 486;
  const totalLogged = records.reduce(
    (sum, r) => sum + (parseFloat(r.workinghours) || 0),
    0,
  );
  const remaining = totalRequired - totalLogged;

  return (
    <>
      <Header title="Attendance" subtitle="Attendance tracking" />
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mt-6">
        {/* Top Stats Area */}
        <div className="grid grid-cols-3 border-b border-gray-200 mb-6">
          <div className="p-4 pt-0 text-center">
            <h2 className="text-xl font-semibold text-gray-700">REQUIRED</h2>
            <h1 className="text-5xl p-4 font-bold">
              {totalRequired}
              <span className="text-3xl text-gray-400">h</span>
            </h1>
            <p className="text-xs text-gray-400">total hours</p>
          </div>

          <div className="p-4 pt-0 text-center border-x border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">LOGGED</h2>
            <h1 className="text-5xl p-4 font-bold">
              {totalLogged.toFixed(0)}
              <span className="text-3xl text-gray-400">h</span>
            </h1>
            <p className="text-xs text-gray-400">
              {((totalLogged / totalRequired) * 100 || 0).toFixed(0)}% Complete
            </p>
          </div>

          <div className="p-4 pt-0 text-center">
            <h2 className="text-xl font-semibold text-gray-700">REMAINING</h2>
            <h1 className="text-5xl p-4 font-bold">
              {remaining.toFixed(0)}
              <span className="text-3xl text-gray-400">h</span>
            </h1>
            <p className="text-xs text-gray-400">hours to go</p>
          </div>
        </div>

        {/* Main content Area */}
        <div className="grid grid-cols-4 gap-6">
          {/* Left Button Area */}
          <div className="flex flex-col gap-3 w-60">
            <button
              onClick={() => {
                setActiveAction("timeIn");
                timeIn();
              }}
              className={`p-3 rounded-lg transition ${
                activeAction === "timeIn"
                  ? "bg-purple-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <LogIn size={20} className="inline-block mr-2" />
              Time In
            </button>

            <button
              onClick={() => {
                setActiveAction("timeOut");
                timeOut();
              }}
              className={`p-3 rounded-lg transition ${
                activeAction === "timeOut"
                  ? "bg-purple-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <LogOut size={20} className="inline-block mr-2" />
              Time Out
            </button>
          </div>

          {/* Right Table Area */}
          <div className="col-span-3">
            <div className="bg-white rounded-xl p-4 h-100 overflow-y-auto">
              <table className="w-full text-sm">
                {/* Table Header */}
                <thead className="text-gray-400 text-xs text-left">
                  <tr className="border-b border-gray-200 shadow-sm">
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Time In</th>
                    <th className="px-4 py-3 text-left">Time Out</th>
                    <th className="px-4 py-3 text-left">Break</th>
                    <th className="px-4 py-3 text-left">Working Hours</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {records.map((rec, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 shadow-sm hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-left">{rec.date}</td>
                      <td className="px-4 py-3 text-left">{rec.timeIn}</td>
                      <td className="px-4 py-3 text-left">
                        {rec.timeOut || "-"}
                      </td>
                      <td className="px-4 py-3 text-left">1 hr</td>

                      <td className="px-4 py-3 text-left">
                        {rec.workinghours && rec.workinghours > 0
                          ? `${rec.workinghours} hrs`
                          : "-"}
                      </td>

                      {/* Status with color coding */}
                      <td className="px-4 py-3 text-left">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            rec.status === "On Time"
                              ? "bg-green-100 text-green-600"
                              : rec.status === "Late"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                          }`}
                        >
                          {getStatus(rec)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
