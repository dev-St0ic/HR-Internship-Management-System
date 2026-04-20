import AttendanceMetricCard from '../components/AttendanceMetricCard';
import AttendanceTable from '../components/AttendanceTable';
import AttendanceToolbar from '../components/AttendanceToolbar';
import { attendanceRecords, attendanceSummaryCards } from '../data/attendanceData';

export default function SupervisorAttendance() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 flex wrap">{attendanceSummaryCards.map((card) => <AttendanceMetricCard key={card.key} card={card} />)}</div>
      <AttendanceToolbar />
      <AttendanceTable records={attendanceRecords} />
    </>
  );
}