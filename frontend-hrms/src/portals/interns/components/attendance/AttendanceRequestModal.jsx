import { useState } from "react";

export default function AttendanceRequestModal({ currentUser, onClose }) {
  const [form, setForm] = useState({
    date: "",
    requestType: "Missed Time Out",
    timeIn: "",
    timeOut: "",
    reason: "",
    supportingDocument: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const existingRequests =
      JSON.parse(localStorage.getItem("hrims_attendance_requests")) || [];

    const newRequests = {
      id: crypto.randomUUID(),
      internId: currentUser?.id,
      internName: currentUser?.name,
      department: currentUser?.department,
      supervisorId: currentUser?.supervisorId,
      date: form.date,
      requestType: form.requestType,
      timeIn: form.timeIn,
      timeOut: form.timeOut,
      reason: form.reason,
      supportingDocument: form.supportingDocument,
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "hrims_attendance_requests",
      JSON.stringify([...existingRequests, newRequests]),
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-6">
          Request Attendance Adjustment
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="font-medium">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="font-medium">Request Type</label>
            <select
              value={form.requestType}
              onChange={(e) => handleChange("requestType", e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            >
              <option>Missed Time In</option>
              <option>School Activity</option>
              <option>Technical Issues</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Revised Time In</label>
            <input
              type="time"
              value={form.timeIn}
              onChange={(e) => handleChange("timeIn", e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="font-medium">Time Out</label>
            <input
              type="time"
              value={form.timeOut}
              onChange={(e) => handleChange("timeOut", e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div className="col-span-2">
            <label className="font-medium">Reason for Request</label>
            <textarea
              value={form.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              rows="3"
              className="mt-1 w-full rounded-lg border px-3 py-2 resize-none"
              placeholder="Enter your reason..."
            />
          </div>

          <div className="col-span-2">
            <label className="font-medium">Supporting Document</label>
            <input
              type="text"
              value={form.supportingDocument}
              onChange={(e) =>
                handleChange("supportingDocument", e.target.value)
              }
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="Example: endorsement.pdf"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-primary px-5 py-2 text-sm text-white hover:bg-[#6b32df]"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
