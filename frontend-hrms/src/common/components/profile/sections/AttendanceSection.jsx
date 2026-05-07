import Attendance from "../../../../portals/interns/pages/Attendance";
import AttendanceTableOnly from "./AttendanceTableOnly";
import { useAttendance } from "../../../../contexts/useAttendance";

export default function AttendanceSection({ user, mode }) {
  const { getStatus, getRecordsByUser, updateAttendanceRecord } =
    useAttendance();

  const isStaff = ["ADMIN", "HR_STAFF", "SUPERVISOR"].includes(mode);
  const canEditAttendance = mode === "ADMIN";

  if (isStaff) {
    // TODO: Replace with API call
    // GET /attendance/:userId
    const records = getRecordsByUser(user.id);

    return (
      <AttendanceTableOnly
        records={records}
        getStatus={getStatus}
        canEdit={canEditAttendance}
        onSave={(recordIndex, updatedRecord) =>
          updateAttendanceRecord(user.id, recordIndex, updatedRecord)
        }
      />
    );
  }
  // Intern View Only
  return <Attendance />;
}
