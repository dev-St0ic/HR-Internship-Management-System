import { useState } from "react";
import dayjs from "dayjs";
import { AttendanceContext } from "./AttendanceContext";

export const AttendanceProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const WORK_START = 9; // 9 AM
  const LATE_LIMIT = 9 * 60 + 20; // 9:20 AM in minutes
  const EARLY_LIMIT = 8 * 60 + 40; // 8:40 AM in minutes
  const WORK_END = 18; // 6 PM
  const MAX_TIME_OUT = 18 * 60 + 20; // 6:20 PM in minutes
  const BREAK_TIME = 1; // 1 hour break

  //Helper toget the current date in MMMM DD, YYYY format, can be used for validations in the future
  const getToday = () => dayjs().format("MMMM DD, YYYY");

  //Helper to get today's record, can be used for validations in the future
  const getTodayRecord = () => records.find((rec) => rec.date === getToday());

  const timeIn = () => {
    const now = dayjs();
    const minutesNow = now.hour() * 60 + now.minute();

    const existing = getTodayRecord();
    if (existing) {
      alert("You have already timed in today!");
      return;
    }

    if (minutesNow < EARLY_LIMIT) {
      alert("Too early to clock in!");
      return;
    }

    const isLate = minutesNow > LATE_LIMIT;

    setRecords((prev) => [
      ...prev,
      {
        date: getToday(),
        timeIn: now.format("hh:mm A"),
        timeInRaw: now, // Store the raw dayjs object for later calculations
        timeOut: null,
        workinghours: null,
        status: isLate ? "Late" : "On Time",
      },
    ]);
  };

  const timeOut = () => {
    const now = dayjs();
    const minutesNow = now.hour() * 60 + now.minute();

    const todayRecord = getTodayRecord();
    if (!todayRecord) {
      alert("You haven't timed in today!");
      return;
    }

    if (todayRecord.timeOut) {
      alert("You have already timed out today!");
      return;
    }

    if (minutesNow > MAX_TIME_OUT) {
      alert("Too late to clock out!");
      return;
    }

    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.date === getToday()) {
          const workedHours =
            now.diff(rec.timeInRaw, "hour", true) - BREAK_TIME;

          return {
            ...rec,
            timeOut: now.format("hh:mm A"),
            workinghours: workedHours > 0 ? workedHours.toFixed(2) : 0,
          };
        }
        return rec;
      }),
    );
  };

  // To check if Absent
  const getStatus = (rec) => {
    if (!rec.timeIn) return "Absent";
    return rec.status;
  };

  return (
    <AttendanceContext.Provider value={{ records, timeIn, timeOut, getStatus }}>
      {children}
    </AttendanceContext.Provider>
  );
};
