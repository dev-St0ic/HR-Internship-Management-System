import DragDropUpload from "../DragDropUpload";

export default function UploadModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-xl w-100 shadow-lg">
        <h2 className="font-bold mb-3">Upload Document</h2>

        <input
          type="text"
          placeholder="Name of Document"
          className="w-full border rounded p-2 mb-3"
        />

        <DragDropUpload />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button className="px-3 py-1 bg-purple-500 text-white rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
