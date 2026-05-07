import { useState, useEffect } from "react";
import {
  User2,
  Clock,
  AlertTriangle,
  Timer,
  SlidersHorizontal,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import SearchInput from "../../../common/components/ui/SearchInput";
import StatCard from "../../../common/components/ui/StatCard";
import FilterButton from "../../../common/components/ui/FilterButton";

export default function SupervisorAttendance() {
  const { currentUser } = useAuth();

  const [search, setSearch] = useState("");
  const [attendanceRows, setAttendanceRows] = useState([]);

  const [selectedFilterInterns, setSelectedFilterInterns] = useState([]);
  const [selectedAttendanceStatus, setSelectedAttendanceStatus] = useState([]);
  const [selectedConcernStatus, setSelectedConcernStatus] = useState([]);
  const [internSearch, setInternSearch] = useState("");

  useEffect(() => {
    const userDB = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");
    const attendanceDB = JSON.parse(
      localStorage.getItem("attendance_db") || "{}",
    );
    const requestDB = JSON.parse(
      localStorage.getItem("hrims_attendance_requests_db") || "[]",
    );

    const myInterns = Object.values(userDB).filter(
      (user) => user.role === "INTERN" && user.supervisorId === currentUser?.id,
    );

    const rows = myInterns.map((intern) => {
      const records = attendanceDB[intern.id] || [];
      const latestRecord = records[records.length - 1];

      const attendanceStatus = latestRecord
        ? latestRecord.timeOut
          ? latestRecord.status
          : "Missing Time Out"
        : "Absent";

      const concern = requestDB.find(
        (request) =>
          request.internId === intern.id && request.date === latestRecord?.date,
      );

      return {
        internId: intern.id,
        internName: intern.name,
        timeIn: latestRecord?.timeIn || "-",
        timeOut: latestRecord?.timeOut || "-",
        hours: latestRecord?.workinghours ?? 0,
        date: latestRecord?.date || "-",
        attendanceStatus,
        concernType: concern?.type || "-",
        concernStatus: concern?.status || "None",
      };
    });

    setAttendanceRows(rows);
  }, [currentUser]);

  const filteredRows = attendanceRows.filter((row) => {
    const matchedSearch = row.internName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesAttendanceStatus =
      selectedAttendanceStatus.length === 0 ||
      selectedAttendanceStatus.includes(row.attendanceStatus);

    const matchesConcernStatus =
      selectedConcernStatus.length === 0 ||
      selectedConcernStatus.includes(row.concernStatus);

    const matchesIntern =
      selectedFilterInterns.length === 0 ||
      selectedFilterInterns.includes(row.internId);

    return (
      matchedSearch &&
      matchesAttendanceStatus &&
      matchesConcernStatus &&
      matchesIntern
    );
  });

  const presentToday = attendanceRows.filter(
    (row) => row.timeIn !== "-",
  ).length;
  const lateToday = attendanceRows.filter(
    (row) => row.attendanceStatus === "Late",
  ).length;
  const absentToday = attendanceRows.filter(
    (row) => row.attendanceStatus === "Absent",
  ).length;
  const totalHours = attendanceRows.reduce(
    (sum, row) => sum + (parseFloat(row.hours) || 0),
    0,
  );

  const toggleFilterInterns = (internId) => {
    setSelectedFilterInterns((prev) =>
      prev.includes(internId)
        ? prev.filter((id) => id !== internId)
        : [...prev, internId],
    );
  };

  const toggleAttendanceStatus = (status) => {
    setSelectedAttendanceStatus((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status],
    );
  };

  const toggleConcernStatus = (status) => {
    setSelectedConcernStatus((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status],
    );
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <StatCard
          title="Present Today"
          value={presentToday}
          icon={<User2 size={16} />}
          date="Interns timed in"
        />

        <StatCard
          title="Late Today"
          value={lateToday}
          icon={<Clock size={16} />}
          date="Timed in late"
        />

        <StatCard
          title="Absent Today"
          value={absentToday}
          icon={<AlertTriangle size={16} />}
          date="No time record"
        />

        <StatCard
          title="Total Hours Today"
          value={`${totalHours.toFixed(2)}h`}
          icon={<Timer size={16} />}
          date="Sum of intern hours"
        />
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-5">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search interns..."
          />

          <FilterButton
            title="Filter Button"
            onCancel={() => {
              setSelectedAttendanceStatus([]);
              setSelectedConcernStatus([]);
              setSelectedFilterInterns([]);
              setInternSearch("");
            }}
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Interns
              </label>

              {/* Search Input */}
              <input
                type="text"
                value={internSearch}
                onChange={(e) => setInternSearch(e.target.value)}
                placeholder="Search intern..."
                className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
              />

              {/* Selected Interns */}
              <input
                readOnly
                value={attendanceRows
                  .filter((row) => selectedFilterInterns.includes(row.internId))
                  .map((row) => row.internName)
                  .join(", ")}
                placeholder="Selected interns..."
                className="mb-3 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs outline-none"
              />

              {/* Results only appear when typing */}
              {internSearch.trim() && (
                <div className="max-h-32 space-y-2 overflow-y-auto no-scrollbar pr-1">
                  {attendanceRows
                    .filter((row) =>
                      row.internName
                        .toLowerCase()
                        .includes(internSearch.toLowerCase()),
                    )
                    .map((row) => (
                      <label
                        key={row.internId}
                        className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilterInterns.includes(row.internId)}
                          onChange={() => toggleFilterInterns(row.internId)}
                          className="h-4 w-4 accent-primary"
                        />
                        {row.internName}
                      </label>
                    ))}
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Attendance Status
              </label>
              <div className="space-y-2">
                {["On Time", "Late", "Absent", "Missing TimeOut"].map(
                  (status) => (
                    <label
                      key={status}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAttendanceStatus.includes(status)}
                        onChange={() => toggleAttendanceStatus(status)}
                        className="ww-4 h-4 accent-primary"
                      />
                      {status}
                    </label>
                  ),
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Concern Status
              </label>

              <div className="space-y-2">
                {["None", "Pending", "Approved", "Rejected"].map((status) => (
                  <label
                    key={status}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={selectedConcernStatus.includes(status)}
                      onChange={() => toggleConcernStatus(status)}
                      className="h-4 w-4 accent-primary"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>
          </FilterButton>
        </div>

        <table className="w-full text-sm">
          <thead className="text-gray-400 text-xs text-left">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3">Intern Name</th>
              <th className="px-4 py-3">Time In</th>
              <th className="px-4 py-3">Time Out</th>
              <th className="px-4 py-3">Hours</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Attendance Status</th>
              <th className="px-4 py-3">Concern</th>
              <th className="px-4 py-3">Concern Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <tr
                  key={row.internId}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{row.internName}</td>
                  <td className="px-4 py-3">{row.timeIn}</td>
                  <td className="px-4 py-3">{row.timeOut}</td>
                  <td className="px-4 py-3">{row.hours}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">
                    <AttendanceBadge status={row.attendanceStatus} />
                  </td>
                  <td className="px-4 py-3">{row.concernType}</td>
                  <td className="px-4 py-3">
                    <ConcernBadge status={row.concernStatus} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-5 text-gray-400">
                  No attendance record found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AttendanceBadge({ status }) {
  const styles = {
    "On Time": "bg-success-light text-success",
    Late: "bg-warning-light text-yellow-600",
    Absent: "bg-red-100 text-error",
    "Missing Time Out": "bg-orange-100 text-orange-600",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs ${styles[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}

function ConcernBadge({ status }) {
  const styles = {
    None: "bg-gray-100 text-gray-500",
    Pending: "bg-warning-light text-yellow-600",
    Approved: "bg-success-light text-success",
    Rejected: "bg-red-100 text-error",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs ${styles[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}
