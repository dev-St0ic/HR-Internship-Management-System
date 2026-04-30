import { useState } from "react";
import FileDropZone from "../../../../common/components/ui/FileDropZone";

export default function AssignTaskModal({ interns = [], onClose, onAssign }) {
  const [selectedInterns, setSelectedInterns] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [deliverable, setDeliverable] = useState("");

  const toggleIntern = (internId) => {
    setSelectedInterns((prev) =>
      prev.includes(internId)
        ? prev.filter((id) => id !== internId)
        : [...prev, internId],
    );
  };

  const selectedNames = interns
    .filter((intern) => selectedInterns.includes(intern.id))
    .map((intern) => intern.name)
    .join(", ");

  const handleSubmit = () => {
    if (!taskTitle || selectedInterns.length === 0) return;

    const newTask = {
      id: crypto.randomUUID(),
      taskName: taskTitle,
      deadline: deadline || "Date",
      deliverable: deliverable || "Not uploaded",
      status: "Pending",
      startDate: new Date().toLocaleDateString(),
      finishDate: "-",
    };

    onAssign(selectedInterns, newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          Create New Task
        </h2>

        <div className="space-y-4 border-t border-gray-100 pt-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
              Select Interns
            </label>

            <input
              readOnly
              value={selectedNames}
              placeholder="Select interns..."
              className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none"
            />
            <div className="max-h-32 space-y-2 overflow-y-auto pr-1">
              {interns.length > 0 ? (
                interns.map((intern) => (
                  <label
                    key={intern.id}
                    className="flex cursor-pointer items-center gap-2 text-xs text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={selectedInterns.includes(intern.id)}
                      onChange={() => toggleIntern(intern.id)}
                      className="h-4 w-4 accent-primary"
                    />{" "}
                    {intern.name}
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-400">No interns available.</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
              Task Title
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <FileDropZone
            label="Deliverable"
            fileName={deliverable}
            setFileName={setDeliverable}
            accept=".doc,.docx,.pdf"
            required={false}
            supportedText="Supported formats: docs, pdf"
          />

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="w-28 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-32 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
}
