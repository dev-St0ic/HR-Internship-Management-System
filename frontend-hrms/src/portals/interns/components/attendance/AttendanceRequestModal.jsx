import { useState } from "react";
import { X } from "lucide-react";
import FileDropzone from "../../../../common/components/ui/FileDropZone";

export default function AttendanceRequestModal({ currentUser, onClose }) {
  const [form, setForm] = useState({
    date: "",
    requestType: "",
    timeIn: "",
    timeOut: "",
    reason: "",
  });

  const [supportingDocument, setSupportingDocument] = useState("");

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
      supportingDocument: supportingDocument || null,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Request Attendance Adjustment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Request Type
            </label>
            <select
              value={form.requestType}
              onChange={(e) => handleChange("requestType", e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select request type</option>
              <option value="Missed Time In">Missed Time In</option>
              <option value="School Activity">School Activity</option>
              <option value="Technical Issues">Technical Issues</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Revised Time In
            </label>
            <input
              type="time"
              value={form.timeIn}
              onChange={(e) => handleChange("timeIn", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Time Out
            </label>
            <input
              type="time"
              value={form.timeOut}
              onChange={(e) => handleChange("timeOut", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="col-span-2">
            <FileDropzone
              label="Supporting Document"
              fileName={supportingDocument}
              setFileName={setSupportingDocument}
              accept=".pdf, .doc, .docx, .png, .jpg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-hover"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
