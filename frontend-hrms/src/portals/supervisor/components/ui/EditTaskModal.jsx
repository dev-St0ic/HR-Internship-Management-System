import { useState } from "react";

export default function EditTaskModal({ task, intern, onClose, onUpdate }) {
  const [taskTitle, setTaskTitle] = useState(task.taskName || "");
  const [description, setDescription] = useState(task.description || "");
  const [deadline, setDeadline] = useState(task.deadline || "");
  const [deliverable, setDeliverable] = useState(task.deliverable || "");

  const handleUpdate = () => {
    onUpdate({
      taskName: taskTitle,
      description: description || "No description provided.",
      deadline,
      deliverable: deliverable || "Not uploaded",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          Edit Task
        </h2>

        <div className="space-y-4 border-t border-gray-100 pt-4">
          {/* Intern Name */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
              Select Intern
            </label>
            <input
              readOnly
              value={intern?.name || ""}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none"
            />
          </div>

          {/* Task Title */}
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

          {/* Task Description */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
              Task Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description..."
              rows="3"
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Deliverable */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-900">
              Deliverable
            </label>
            <input
              type="text"
              value={deliverable}
              onChange={(e) => setDeliverable(e.target.value)}
              placeholder="Example: Report.pdf"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Deadline */}
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

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="w-28 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="w-32 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
}
