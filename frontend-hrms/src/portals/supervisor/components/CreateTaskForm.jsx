import FileUpload from "./FileUpload";
import InternSelector from "./InternSelector";

export default function CreateTaskForm({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-[700px] p-6">
        
        {/* Header */}
        <div className="flex justify-between border-b border-gray-500/10 pb-4 items-center mb-4">
          <h2 className="text-lg font-semibold">Create New Task</h2>
        </div>

        {/* Form */}
        <div className="space-y-3 mb-6">
          <InternSelector />

          <h1 className="font-medium">Task Title</h1>
          <input
            type="text"
            placeholder="Enter Task title"
            className="w-full border border-gray-500/30 p-2 rounded"
          />

          <h1 className="font-medium">Deliverable</h1>
          <FileUpload onFileSelect={(file) => console.log(file)} />

          <h1 className="font-medium">Deadline</h1>
          <input
            type="date"
            className="w-full border border-gray-500/30 p-2 rounded"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button className="px-4 py-2 cursor-pointer rounded bg-[#7C3EFF] text-white hover:bg-[#6B2ECC]">
            Assign Tasks
          </button>
        </div>
      </div>
    </div>
  );
}