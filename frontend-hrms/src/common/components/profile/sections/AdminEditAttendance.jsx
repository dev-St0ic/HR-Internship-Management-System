import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Pencil,
  X,
} from "lucide-react";

const emptyEditRecord = {
  date: "",
  timeIn: "",
  timeOut: "",
  workinghours: "",
  status: "On Time",
};

const statusOptions = ["On Time", "Late", "Absent"];

const statusStyles = {
  "On Time": "bg-green-100 text-green-700",
  Late: "bg-yellow-100 text-yellow-700",
  Absent: "bg-red-100 text-red-700",
};

const statusButtonStyles = {
  "On Time": {
    selected: "border-green-500 bg-green-100 text-green-700",
    hover: "hover:border-green-200 hover:bg-green-50 hover:text-green-700",
  },
  Late: {
    selected: "border-yellow-500 bg-yellow-100 text-yellow-700",
    hover: "hover:border-yellow-200 hover:bg-yellow-50 hover:text-yellow-700",
  },
  Absent: {
    selected: "border-red-500 bg-red-100 text-red-700",
    hover: "hover:border-red-200 hover:bg-red-50 hover:text-red-700",
  },
};

const breakHours = 1;
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatDateForInput = (date) => {
  if (!date) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "";

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDateParts = (date) => {
  if (!date) return null;

  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return null;

  return { year, month, day };
};

const formatDateForRecord = (date) => {
  if (!date) return "";

  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const formatDateForDisplay = (date) => {
  const dateParts = getDateParts(date);
  if (!dateParts) return "Select date";

  return new Date(
    dateParts.year,
    dateParts.month - 1,
    dateParts.day,
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const getCalendarMonth = (date) => {
  const dateParts = getDateParts(date);

  if (dateParts) {
    return new Date(dateParts.year, dateParts.month - 1, 1);
  }

  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1);
};

const formatDateFromParts = (year, month, day) => {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0",
  )}`;
};

const getTimeParts = (time) => {
  if (!time) return "";

  const twentyFourHourMatch = time.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFourHourMatch) {
    const hours = Number(twentyFourHourMatch[1]);
    const minutes = Number(twentyFourHourMatch[2]);

    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      return { hours, minutes };
    }
  }

  const twelveHourMatch = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!twelveHourMatch) return "";

  let hours = Number(twelveHourMatch[1]);
  const minutes = Number(twelveHourMatch[2]);
  const period = twelveHourMatch[3].toUpperCase();

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return "";

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return { hours, minutes };
};

const formatTimeFromParts = ({ hours, minutes }) => {
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )} ${period}`;
};

const formatTimeForInput = (time) => {
  const timeParts = getTimeParts(time);
  return timeParts ? formatTimeFromParts(timeParts) : "";
};

const formatTimeForRecord = (time) => {
  if (!time) return "";

  const timeParts = getTimeParts(time);
  return timeParts ? formatTimeFromParts(timeParts) : time;
};

const shiftTime = (time, direction) => {
  const timeParts = getTimeParts(time) || { hours: 9, minutes: 0 };
  const totalMinutes =
    (timeParts.hours * 60 + timeParts.minutes + direction * 15 + 24 * 60) %
    (24 * 60);
  const nextHours = Math.floor(totalMinutes / 60);
  const nextMinutes = totalMinutes % 60;

  return formatTimeFromParts({ hours: nextHours, minutes: nextMinutes });
};

const calculateWorkingHours = (timeIn, timeOut) => {
  const inParts = getTimeParts(timeIn);
  const outParts = getTimeParts(timeOut);

  if (!inParts || !outParts) return "";

  const inMinutes = inParts.hours * 60 + inParts.minutes;
  const outMinutes = outParts.hours * 60 + outParts.minutes;
  const workedMinutes = outMinutes - inMinutes - breakHours * 60;

  if (workedMinutes <= 0) return "0.00";

  return (workedMinutes / 60).toFixed(2);
};

function TimeStepper({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">
        {label}
      </label>
      <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-white focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100">
        <div className="flex flex-1 items-center gap-2 px-3">
          <Clock size={16} className="text-gray-400" />
          <input
            type="text"
            inputMode="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => onChange(formatTimeForRecord(e.target.value))}
            placeholder="09:00 AM"
            className="h-10 w-full bg-transparent text-sm text-gray-800 outline-none"
          />
        </div>
        <div className="flex w-10 flex-col border-l border-gray-200">
          <button
            type="button"
            onClick={() => onChange(shiftTime(value, 1))}
            className="flex flex-1 items-center justify-center text-gray-500 hover:bg-purple-50 hover:text-purple-700"
            aria-label={`Increase ${label}`}
            title={`Increase ${label}`}
          >
            <ChevronUp size={15} />
          </button>
          <button
            type="button"
            onClick={() => onChange(shiftTime(value, -1))}
            className="flex flex-1 items-center justify-center border-t border-gray-200 text-gray-500 hover:bg-purple-50 hover:text-purple-700"
            aria-label={`Decrease ${label}`}
            title={`Decrease ${label}`}
          >
            <ChevronDown size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function DatePickerPaper({
  selectedDate,
  visibleMonth,
  onMonthChange,
  onSelectDate,
}) {
  const selectedParts = getDateParts(selectedDate);
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const calendarDays = [
    ...Array.from({ length: firstWeekday }, (_, index) => ({
      key: `empty-${index}`,
      day: null,
    })),
    ...Array.from({ length: daysInMonth }, (_, index) => ({
      key: `day-${index + 1}`,
      day: index + 1,
    })),
  ];

  const today = new Date();
  const monthLabel = visibleMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const moveMonth = (direction) => {
    onMonthChange(new Date(year, month + direction, 1));
  };

  return (
    <div className="absolute left-0 top-full z-20 mt-2 w-full rounded-xl border border-purple-100 bg-white p-3 shadow-xl shadow-purple-900/10">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => moveMonth(-1)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-primary-light hover:text-primary"
          aria-label="Previous month"
          title="Previous month"
        >
          <ChevronLeft size={17} />
        </button>
        <p className="text-sm font-semibold text-gray-900">{monthLabel}</p>
        <button
          type="button"
          onClick={() => moveMonth(1)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-primary-light hover:text-primary"
          aria-label="Next month"
          title="Next month"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-gray-400">
        {weekdays.map((weekday) => (
          <span key={weekday} className="py-1">
            {weekday}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {calendarDays.map(({ key, day }) => {
          if (!day) return <span key={key} className="h-9" />;

          const isSelected =
            selectedParts?.year === year &&
            selectedParts?.month === month + 1 &&
            selectedParts?.day === day;
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

          return (
            <button
              key={key}
              type="button"
              onClick={() =>
                onSelectDate(formatDateFromParts(year, month + 1, day))
              }
              className={`h-9 rounded-lg text-sm font-medium transition ${
                isSelected
                  ? "bg-primary text-white shadow-sm shadow-purple-500/30"
                  : isToday
                    ? "bg-primary-light text-primary hover:bg-purple-100"
                    : "text-gray-700 hover:bg-primary-light hover:text-primary"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminEditAttendance({
  records = [],
  getStatus,
  canEdit = false,
  onSave,
}) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editRecord, setEditRecord] = useState(emptyEditRecord);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(getCalendarMonth(""));

  const updateEditRecord = (updates) => {
    setEditRecord((currentRecord) => {
      const nextRecord = { ...currentRecord, ...updates };

      if ("timeIn" in updates || "timeOut" in updates) {
        nextRecord.workinghours = calculateWorkingHours(
          nextRecord.timeIn,
          nextRecord.timeOut,
        );
      }

      return nextRecord;
    });
  };

  const handleEditClick = (record, index) => {
    const timeIn = formatTimeForInput(record.timeIn);
    const timeOut = formatTimeForInput(record.timeOut);
    const date = formatDateForInput(record.date);

    setEditingIndex(index);
    setIsCalendarOpen(false);
    setCalendarMonth(getCalendarMonth(date));
    setEditRecord({
      date,
      timeIn,
      timeOut,
      workinghours: calculateWorkingHours(timeIn, timeOut) || record.workinghours || "",
      status: getStatus ? getStatus(record) : record.status || "On Time",
    });
  };

  const handleClose = () => {
    setEditingIndex(null);
    setIsCalendarOpen(false);
    setEditRecord(emptyEditRecord);
  };

  const handleSave = () => {
    if (editingIndex === null) return;

    onSave?.(editingIndex, {
      ...editRecord,
      date: formatDateForRecord(editRecord.date),
      timeIn: formatTimeForRecord(editRecord.timeIn),
      timeOut: editRecord.timeOut ? formatTimeForRecord(editRecord.timeOut) : null,
      workinghours:
        editRecord.workinghours === "" ? null : Number(editRecord.workinghours),
    });
    handleClose();
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
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

          <tbody className="divide-y divide-gray-100">
            {records.length > 0 ? (
              records.map((rec, index) => {
                const status = getStatus ? getStatus(rec) : rec.status;

                return (
                  <tr
                    key={`${rec.date}-${index}`}
                    onClick={
                      canEdit ? () => handleEditClick(rec, index) : undefined
                    }
                    className={`transition hover:bg-gray-50 ${
                      canEdit ? "cursor-pointer" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {rec.date}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {rec.timeIn || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {rec.timeOut || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">1 hr</td>
                    <td className="px-4 py-3 text-gray-700">
                      {rec.workinghours !== null && rec.workinghours !== undefined
                        ? `${rec.workinghours} hrs`
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
                          statusStyles[status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {status || "-"}
                      </span>
                    </td>
                    {canEdit && (
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleEditClick(rec, index);
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-purple-100 hover:text-purple-700"
                          title="Edit attendance"
                          aria-label="Edit attendance"
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Edit Attendance
                </h3>
                <p className="text-xs text-gray-500">
                  Adjust the selected record details.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2">
              <div className="relative">
                <label className="mb-1 block text-xs font-semibold text-gray-700">
                  Date
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCalendarMonth(getCalendarMonth(editRecord.date));
                    setIsCalendarOpen((isOpen) => !isOpen);
                  }}
                  className={`flex h-10 w-full items-center gap-2 rounded-lg border px-3 text-left text-sm transition ${
                    isCalendarOpen
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-gray-200 hover:border-purple-200 hover:bg-primary-light/40"
                  }`}
                >
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-800">
                    {formatDateForDisplay(editRecord.date)}
                  </span>
                </button>

                {isCalendarOpen && (
                  <DatePickerPaper
                    selectedDate={editRecord.date}
                    visibleMonth={calendarMonth}
                    onMonthChange={setCalendarMonth}
                    onSelectDate={(date) => {
                      updateEditRecord({ date });
                      setCalendarMonth(getCalendarMonth(date));
                      setIsCalendarOpen(false);
                    }}
                  />
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">
                  Working Hours
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.25"
                  value={editRecord.workinghours}
                  onChange={(e) =>
                    updateEditRecord({ workinghours: e.target.value })
                  }
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Auto-updates from time in/out with a 1-hour break.
                </p>
              </div>

              <TimeStepper
                label="Time In"
                value={editRecord.timeIn}
                onChange={(timeIn) => updateEditRecord({ timeIn })}
              />

              <TimeStepper
                label="Time Out"
                value={editRecord.timeOut}
                onChange={(timeOut) => updateEditRecord({ timeOut })}
              />

              <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-semibold text-gray-700">Status</p>
                <div className="grid grid-cols-3 gap-2">
                  {statusOptions.map((status) => {
                    const isSelected = editRecord.status === status;
                    const buttonStyle = statusButtonStyles[status];

                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => updateEditRecord({ status })}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                          isSelected
                            ? buttonStyle.selected
                            : `border-gray-200 text-gray-600 ${buttonStyle.hover}`
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-100 px-5 py-4">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
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
