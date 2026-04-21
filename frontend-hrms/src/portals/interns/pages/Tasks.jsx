import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Folder, ChevronLeft } from "lucide-react";

import { mockTasks } from "../components/mockTasks";
import Header from "../../../common/components/layout/Header";
import DragDropUpload from "../../interns/components/DragDropUpload";
import FileDropZone from "../../interns/components/ui/FileDropzone";

export default function Tasks() {
  const location = useLocation();

  // Selected task (initialized once safely)
  const [selectedTaskId, setSelectedTaskId] = useState(
    location.state?.selectedTaskId ?? mockTasks[0]?.id,
  );

  const [viewMode, setViewMode] = useState("list");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [commentText, setCommentText] = useState("");

  const selectedTask = mockTasks.find((task) => task.id === selectedTaskId);

  // Local comments state (simulate backend)
  const [extraComments, setExtraComments] = useState([]);

  const allComments = [...(selectedTask.comments || []), ...extraComments];

  if (!selectedTask) return null;

  // Handle comment post
  const handlePostComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "You",
      message: commentText,
    };

    setExtraComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

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
              {mockTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                    selectedTaskId === task.id
                      ? "bg-purple-500 text-white"
                      : "bg-purple-100/60 hover:bg-purple-200"
                  }`}
                >
                  <Folder size={16} />
                  {task.title}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Detailed Center Area */
          <div className="col-span-2 space-y-5">
            {/* Task Information Area */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold">{selectedTask.title}</h2>
              <p className="text-gray-500 mt-2">{selectedTask.description}</p>

              {/* Upload */}
              <div className="mt-5">
                <h3 className="font-semibold mb-3">Upload Report</h3>

                <DragDropUpload onUpload={(file) => setUploadedFile(file)} />

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

                <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg">
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
                <p className="font-bold">{selectedTask.title}</p>

                <p className="text-sm text-gray-500 mt-2">
                  {selectedTask.description}
                </p>

                <p className="text-xs mt-3">Start: {selectedTask.start}</p>
                <p className="text-xs">Due: {selectedTask.due}</p>
              </>
            ) : (
              <>
                <p className="text-sm">Type: {selectedTask.type}</p>
                <p className="text-sm">Start: {selectedTask.start}</p>
                <p className="text-sm">Due: {selectedTask.due}</p>
                <p className="text-sm">
                  Submitted: {selectedTask.submitted || "None"}
                </p>
              </>
            )}
          </div>

          {/* Comments (Will alsways show on the right panel) */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold mb-3">Comments</h3>

            {allComments.length > 0 ? (
              allComments.map((c) => (
                <div key={c.id} className="mb-3">
                  <p className="text-sm font-medium">{c.author}</p>
                  <p className="text-sm text-gray-500">{c.message}</p>
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
                {selectedTask.progress}% Completed
              </h3>

              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className="bg-purple-500 h-2 rounded"
                  style={{
                    width: `${selectedTask.progress}%`,
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
