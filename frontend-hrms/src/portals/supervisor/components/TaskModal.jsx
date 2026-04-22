
const TaskModal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex justify-center items-center transition"  >
      <div className="bg-white p-5 rounded shadow-md w-96">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

        <div className="mb-4">{children}</div>

        <div className="flex justify-end gap-2">
          {footer ? (
            footer
          ) : (
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;