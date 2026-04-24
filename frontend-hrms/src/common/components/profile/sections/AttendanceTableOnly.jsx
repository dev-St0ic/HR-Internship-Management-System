export default function AttendanceTableOnly({ records = [], getStatus }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        {/* Table Header */}
        <thead className="text-gray-400 text-xs text-left">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Time In</th>
            <th className="px-4 py-3">Time Out</th>
            <th className="px-4 py-3">Break</th>
            <th className="px-4 py-3">Working Hours</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {records.length > 0 ? (
            records.map((rec, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{rec.date}</td>
                <td className="px-4 py-3">{rec.timeIn}</td>
                <td className="px-4 py-3">{rec.timeOut || "-"}</td>
                <td className="px-4 py-3">1 hr</td>
                <td className="px-4 py-3 text-left">
                  {rec.workinghours !== null && rec.workinghours !== undefined
                    ? `${rec.workinghours} hrs`
                    : "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      rec.status === "On Time"
                        ? "bg-green-100 text-green-600"
                        : rec.status === "Late"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {getStatus ? getStatus(rec) : rec.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-400">
                No attendance records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
