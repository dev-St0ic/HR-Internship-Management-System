import { useAttendance } from "../../../contexts/useAttendance";

export default function useAttendanceSummary() {
  const { records } = useAttendance();

  const totalRequired = 486;

  const totalLogged = records.reduce(
    (sum, r) => sum + (parseFloat(r.workinghours) || 0),
    0,
  );

  const remaining = Math.max(totalRequired - totalLogged, 0);

  const percentage =
    totalRequired > 0 ? ((totalLogged / totalRequired) * 100).toFixed(0) : 0;

  return {
    totalRequired,
    totalLogged,
    remaining,
    percentage,
  };
}
