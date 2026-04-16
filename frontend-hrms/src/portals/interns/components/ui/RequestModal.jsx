export default function RequestModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-xl w-87.5 shadow-lg">
        <h2 className="font-bold mb-3">Request Document</h2>

        <input
          type="text"
          placeholder="Enter document name"
          className="w-full border rounded p-2 mb-4"
        />

        <div className="flex justify-end gap-2">
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
