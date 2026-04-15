import { Eye, Download } from "lucide-react";
import DragDropUpload from "../../../portals/interns/components/DragDropUpload";

export default function Documents({ user, mode }) {
  const files = user?.documents || [];

  return (
    <div className="space-y-4">
      {console.log("User: ", user)}
      {/* File List */}
      <div className="grid grid-cols-3 gap-2">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-gray-200 px-4 py-3 rounded-lg"
            >
              <span className="text-sm truncate max-w-30">{file}</span>

              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Eye size={16} />
                </button>

                <button className="p-1 hover:bg-gray-100 rounded">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-400 text-sm py-4">
            No Documents Uploaded!
          </p>
        )}
      </div>

      {/*This is only for intertns and when the documents tab is active*/}
      {mode === "intern" && (
        <DragDropUpload
          label="Upload Missing Files"
          onUpload={(file) => {
            console.log("Uploaded: ", file);

            //This is where the backend hook will be placed
            //POST /users/:id/documents
          }}
        />
      )}
    </div>
  );
}
