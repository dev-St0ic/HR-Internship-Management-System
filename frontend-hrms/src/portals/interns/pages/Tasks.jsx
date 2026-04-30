import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Folder, ChevronLeft } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import FileDropzone from "../../../common/components/ui/FileDropZone";

export default function Tasks() {
  const location = useLocation();
  const { currentUser } = useAuth();

  const [usersDb, setUsersDb] = useState(() => {
    try {
      const storedUsers = localStorage.getItem("hrims_users_db");
      return storedUsers ? JSON.parse(storedUsers) : {};
    } catch (error) {
      console.log("Failed to load users DB:", error);
      return {};
    }
  });

  const intern = usersDb[currentUser?.id];
  const tasks = intern?.tasks || [];

  // Selected task (initialized once safely)
  const [selectedTaskId, setSelectedTaskId] = useState(
    location.state?.selectedTaskId ?? tasks[0]?.id,
  );

  const [viewMode, setViewMode] = useState("list");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [commentText, setCommentText] = useState("");

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const updateTask = (taskId, updatedFields) => {
    const updatedUsersDb = { ...usersDb };

    updatedUsersDb[currentUser.id] = {
      ...updatedUsersDb[currentUser.id],
      tasks: updatedUsersDb[currentUser.id].tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task,
      ),
    };

    setUsersDb(updatedUsersDb);
    localStorage.setItem("hrims_users_db", JSON.stringify(updatedUsersDb));
  };

  // Handle comment post
  const handlePostComment = () => {
    if (!commentText.trim() || !selectedTask) return;

    const newComment = {
      id: crypto.randomUUID,
      author: currentUser?.name || "You",
      message: commentText,
    };

    updateTask(selectedTask.id, {
      comments: [...(selectedTask.comments || []), newComment],
    });
    setCommentText("");
  };

  const handleSubmitWork = () => {
    if (!uploadedFile || !selectedTask) return;

    updateTask(selectedTask.id, {
      deliverable: uploadedFile,
      status: "Completed",
      submitted: new Date().toLocaleDateString(),
      finishDate: new Date().toLocaleDateString(),
    });

    setUploadedFile("");
  };

  const getStatusClass = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-600";
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    if (status === "Overdue") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  if (!currentUser) return null;

  if (tasks.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold">Your Tasks</h3>
        <p className="mt-3 text-sm text-gray-400">No tasks assigned yet.</p>
      </div>
    );
  }

  if (!selectedTask) {
    setSelectedTaskId(tasks[0]?.id);
    return null;
  }

  const comments = selectedTask.comments || [];

  return (
    <>
      {/* Previous Button will only show at Detailed mode */}
      {viewMode === "detail" && (
        <div className="mt-4">
          <button
            onClick={() => setViewMode("list")}
            className="flex items-center justify-center mb-4 bg-purple-500 text-white px-4 py-2 rounded-lg"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 mt-4">
        {/* Center Area */}
        {viewMode === "list" ? (
          <div className="col-span-2 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold mb-4">Your Tasks</h3>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                    selectedTaskId === task.id
                      ? "bg-purple-500 text-white"
                      : "bg-purple-100/60 hover:bg-purple-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Folder size={16} />
                    {task.taskName}
                  </div>

                  <span
                    className={`rounded-md px-2 py-1 text-xs ${
                      selectedTask.id === task.id
                        ? "bg-white/20 text-white"
                        : getStatusClass(task.status)
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Detailed Center Area */
          <div className="col-span-2 space-y-5">
            {/* Task Information Area */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold">{selectedTask.taskName}</h2>
              <p className="text-gray-500 mt-2">
                Deadline: {selectedTask.deadline || "-"}
              </p>

              {/* Upload */}
              <div className="mt-5">
                <h3 className="font-semibold mb-3">Upload Report</h3>

                <FileDropzone
                  label="Task Deliverable"
                  fileName={uploadedFile}
                  setFileName={setUploadedFile}
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  required={false}
                  supportedText="Supported formats: PDF, DOC, DOCX, PNG, JPG"
                />

                {/* File Preview */}
                {uploadedFile && (
                  <div className="mt-3 flex justify-between items-center bg-gray-200 p-2 rounded">
                    <span>{uploadedFile.name}</span>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <button
                  onClick={handleSubmitWork}
                  className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg"
                >
                  Submit Work
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Panel*/}
        <div className="space-y-5">
          {/* Task Details Card */}
          <div
            onClick={() => setViewMode("detail")}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm cursor-pointer"
          >
            <h3 className="font-semibold mb-3">Task Details</h3>

            {viewMode === "list" ? (
              <>
                <p className="font-bold">{selectedTask.taskName}</p>

                <p className="text-sm text-gray-500 mt-2">
                  Deliverable: {selectedTask.deliverable || "Not Uploaded"}
                </p>

                <p className="text-xs mt-3">
                  Start: {selectedTask.startDate || "-"}
                </p>
                <p className="text-xs">Due: {selectedTask.deadline || "-"}</p>
              </>
            ) : (
              <>
                <p className="text-sm">
                  Start: {selectedTask.startDate || "-"}
                </p>
                <p className="text-sm">Due: {selectedTask.deadline || "-"}</p>
                <p className="text-sm">
                  Submitted: {selectedTask.submitted || "None"}
                </p>
                <p className="text-sm">
                  Status: {selectedTask.status || "Pending"}
                </p>
              </>
            )}
          </div>

          {/* Comments (Will alsways show on the right panel) */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold mb-3">Comments</h3>

            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="mb-3">
                  <p className="text-sm font-medium">{comment.author}</p>
                  <p className="text-sm text-gray-500">{comment.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No comments</p>
            )}

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-3"
              placeholder="Write a comment..."
            />

            <button
              onClick={handlePostComment}
              className="mt-2 bg-purple-500 text-white px-3 py-1 rounded"
            >
              Post
            </button>
          </div>

          {/* Progress will show only on list mode */}
          {viewMode === "list" && (
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold mb-2">
                {selectedTask.status === "Completed" ? "100" : "0"}% Completed
              </h3>

              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className="bg-purple-500 h-2 rounded"
                  style={{
                    width: selectedTask.status === "Completed" ? "100%" : "0%",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
