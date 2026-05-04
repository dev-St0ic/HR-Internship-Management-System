import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Folder, ChevronLeft } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import FileDropzone from "../../../common/components/ui/FileDropZone";
import {
  getTodayISO,
  formatDateForDisplay,
} from "../../../common/utils/dateHelper";

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

  const [selectedTaskId, setSelectedTaskId] = useState(
    location.state?.selectedTaskId || null,
  );

  const selectedTask =
    tasks.find((task) => task.id === selectedTaskId) || tasks[0];

  const [viewMode, setViewMode] = useState("list");
  const [uploadedFile, setUploadedFile] = useState("");
  const [commentText, setCommentText] = useState("");

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

  const handlePostComment = () => {
    if (!commentText.trim() || !selectedTask) return;

    const newComment = {
      id: crypto.randomUUID(),
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
      submitted: getTodayISO(),
      finishDate: getTodayISO(),
    });

    setUploadedFile("");
  };

  const getProgress = () => {
    return selectedTask?.status === "Completed" ? 100 : 0;
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

  const comments = selectedTask?.comments || [];

  return (
    <>
      {viewMode === "detail" && (
        <div className="mt-4">
          <button
            onClick={() => setViewMode("list")}
            className="mb-4 flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-white"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
        </div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-6">
        {/* LEFT / CENTER AREA */}
        {viewMode === "list" ? (
          <div className="col-span-2 min-h-130 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-bold">Your Tasks</h3>

            <div className="space-y-3">
              {tasks.map((task) => {
                const isSelected = selectedTask?.id === task.id;

                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg p-4 text-sm font-medium transition ${
                      isSelected
                        ? "bg-[#A855F7] text-white"
                        : "bg-purple-100/50 text-gray-900 hover:bg-purple-100"
                    }`}
                  >
                    <Folder size={18} />
                    {task.taskName}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">{selectedTask.taskName}</h2>

              <p className="mt-3 text-gray-500">
                {selectedTask.description || "No description provided."}
              </p>

              <div className="mt-6">
                <h3 className="mb-4 font-semibold">Upload Report</h3>

                <FileDropzone
                  label="Upload File"
                  fileName={uploadedFile}
                  setFileName={setUploadedFile}
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  required={false}
                  supportedText="Supported formats: All files"
                />

                <button
                  onClick={handleSubmitWork}
                  className="mt-5 rounded-lg bg-[#A855F7] px-5 py-2 text-white hover:bg-[#9333EA]"
                >
                  Submit Work
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANEL */}
        <div className="space-y-5">
          {/* TASK DETAILS */}
          <div
            onClick={() => setViewMode("detail")}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-4 text-lg font-bold">Task Details</h3>

            {viewMode === "list" ? (
              <>
                <p className="font-bold">{selectedTask.taskName}</p>

                <p className="mt-3 text-sm text-gray-500">
                  {selectedTask.description || "No description provided."}
                </p>

                <p className="mt-4 text-xs">
                  Start: {formatDateForDisplay(selectedTask.startDate)}
                </p>
                <p className="text-xs">
                  Due: {formatDateForDisplay(selectedTask.deadline)}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm">Type: {selectedTask.taskName || "-"}</p>
                <p className="text-sm">
                  Start: {formatDateForDisplay(selectedTask.startDate)}
                </p>
                <p className="text-sm">
                  Due: {formatDateForDisplay(selectedTask.deadline)}
                </p>
                <p className="text-sm">
                  Submitted:{" "}
                  {selectedTask.submitted
                    ? formatDateForDisplay(selectedTask.submitted)
                    : "None"}
                </p>
              </>
            )}
          </div>

          {/* COMMENTS */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">Comments</h3>

            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="mb-3">
                  <p className="text-sm font-semibold">{comment.author}</p>
                  <p className="text-sm text-gray-500">{comment.message}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No comments</p>
            )}

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mt-4 w-full rounded-lg border border-gray-300 p-3 text-sm"
              placeholder="Write a comment..."
              rows="3"
            />

            <button
              onClick={handlePostComment}
              className="mt-3 rounded bg-[#A855F7] px-4 py-2 text-white"
            >
              Post
            </button>
          </div>

          {/* PROGRESS */}
          {viewMode === "list" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-semibold">{getProgress()}% Completed</h3>

              <div className="h-2 w-full rounded bg-gray-200">
                <div
                  className="h-2 rounded bg-[#A855F7]"
                  style={{ width: `${getProgress()}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
