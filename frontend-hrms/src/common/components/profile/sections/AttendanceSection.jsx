import Attendance from "../../../../portals/interns/pages/Attendance";
import AttendanceTableOnly from "./AttendanceTableOnly";
import { useAttendance } from "../../../../contexts/useAttendance";

export default function AttendanceSection({ user, mode }) {
  const { getStatus, getRecordsByUser } = useAttendance();

  const isStaff = ["ADMIN", "HR_STAFF", "SUPERVISOR"].includes(mode);

  if (isStaff) {
    // TODO: Replace with API call
    // GET /attendance/:userId
    const records = getRecordsByUser(user.id);

    return <AttendanceTableOnly records={records} getStatus={getStatus} />;
  }
  // Intern View Only
  return <Attendance />;
}
