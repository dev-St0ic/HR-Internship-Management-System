import { useState } from "react";
import { Pencil, X } from "lucide-react";

const emptyEditRecord = {
  date: "",
  timeIn: "",
  timeOut: "",
  workinghours: "",
  status: "On Time",
};

export default function AttendanceTableOnly({
  records = [],
  getStatus,
  canEdit = false,
  onSave,
}) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editRecord, setEditRecord] = useState(emptyEditRecord);

  const handleEditClick = (record, index) => {
    setEditingIndex(index);
    setEditRecord({
      date: record.date || "",
      timeIn: record.timeIn || "",
      timeOut: record.timeOut || "",
      workinghours: record.workinghours ?? "",
      status: getStatus ? getStatus(record) : record.status || "On Time",
    });
  };

  const handleClose = () => {
    setEditingIndex(null);
    setEditRecord(emptyEditRecord);
  };

  const handleSave = () => {
    if (editingIndex === null) return;

    onSave?.(editingIndex, {
      ...editRecord,
      timeOut: editRecord.timeOut || null,
      workinghours:
        editRecord.workinghours === "" ? null : editRecord.workinghours,
    });
    handleClose();
  };

  return (
    <>
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
              {canEdit && <th className="px-4 py-3 text-right">Action</th>}
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
                  {canEdit && (
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleEditClick(rec, index)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-purple-100 hover:text-purple-600"
                        title="Edit attendance"
                        aria-label="Edit attendance"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={canEdit ? 7 : 6}
                  className="text-center py-4 text-gray-400"
                >
                  No attendance records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                Edit Attendance
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-3">
              <label className="text-sm font-medium text-gray-700">
                Date
                <input
                  value={editRecord.date}
                  onChange={(e) =>
                    setEditRecord({ ...editRecord, date: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 font-normal outline-none focus:border-purple-400"
                />
              </label>

              <label className="text-sm font-medium text-gray-700">
                Time In
                <input
                  value={editRecord.timeIn}
                  onChange={(e) =>
                    setEditRecord({ ...editRecord, timeIn: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 font-normal outline-none focus:border-purple-400"
                />
              </label>

              <label className="text-sm font-medium text-gray-700">
                Time Out
                <input
                  value={editRecord.timeOut}
                  onChange={(e) =>
                    setEditRecord({ ...editRecord, timeOut: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 font-normal outline-none focus:border-purple-400"
                />
              </label>

              <label className="text-sm font-medium text-gray-700">
                Working Hours
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editRecord.workinghours}
                  onChange={(e) =>
                    setEditRecord({
                      ...editRecord,
                      workinghours: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 font-normal outline-none focus:border-purple-400"
                />
              </label>

              <label className="text-sm font-medium text-gray-700">
                Status
                <select
                  value={editRecord.status}
                  onChange={(e) =>
                    setEditRecord({ ...editRecord, status: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 font-normal outline-none focus:border-purple-400"
                >
                  <option>On Time</option>
                  <option>Late</option>
                  <option>Absent</option>
                </select>
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
