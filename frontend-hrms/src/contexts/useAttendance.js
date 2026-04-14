import { useContext } from "react";
import { AttendanceContext } from "./AttendanceContext";

export const useAttendance = () => {
  return useContext(AttendanceContext);
};
