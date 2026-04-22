import { useState } from "react";
import { PencilLine, Trash2 } from "lucide-react";
import TaskModal from "../TaskModal"; // reusable modal (from previous answer)

export default function TaskActionsCell({ rowData }) {
  const [modalType, setModalType] = useState(null);

  const closeModal = () => setModalType(null);

  const handleDelete = () => {
    console.log("Deleting:", rowData);
    closeModal();
  };

  return (
    <>
      <td className="p-2">
        <div className="flex justify-around mx-5">
          <PencilLine
            width={20}
            height={20}
            className="cursor-pointer text-blue-500"
            onClick={() => setModalType("edit")}
          />
          <Trash2
            width={20}
            height={20}
            className="cursor-pointer text-red-500"
            onClick={() => setModalType("delete")}
          />
        </div>
      </td>

      {/* EDIT MODAL */}
      <TaskModal
        isOpen={modalType === "edit"}
        onClose={closeModal}
        title="Edit Task"
        footer={
          <>
            <button onClick={closeModal} className="px-3 py-1 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-400">
              Cancel
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
              Save
            </button>
          </>
        }
      >
        <input
          className="border p-2 w-full"
          defaultValue={rowData.taskName}
        />
      </TaskModal>

      {/* DELETE MODAL */}
      <TaskModal
        isOpen={modalType === "delete"}
        onClose={closeModal}
        title="Confirm Delete"
        footer={
          <>
            <button onClick={closeModal} className="px-3 py-1 bg-gray-400 text-white rounded cursor-pointer hover:bg-gray-500">
              Cancel
            </button>
            <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600">
              Delete
            </button>
          </>
        }
      >
        <p>Delete "{rowData.taskName}"?</p>
      </TaskModal>
    </>
  );
}