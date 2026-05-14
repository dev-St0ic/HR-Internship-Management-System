import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import FileDropzone from "../ui/FileDropZone";
import TaskComments from "./TaskComments";
import { getTodayISO, formatDateForDisplay } from "../../utils/dateHelper";

export default function TaskDetailView({
  task,
  currentUser,
  mode = "intern",
  onBack,
  onUpdateTask,
  showBackButton = true,
}) {
  const [uploadedFile, setUploadedFile] = useState("");
  const [isReplacing, setIsReplacing] = useState(false);
  const [showReplaceConfirm, setShowReplaceConfirm] = useState(false);

  const comments = task?.comments || [];

  const canSubmitWork = mode === "intern";
  const canComment = mode === "intern" || mode === "supervisor";

  const hasSubmittedFile =
    task?.deliverable && task.deliverable !== "Not uploaded" && !isReplacing;

  const getDeliverableName = (deliverable) => {
    if (!deliverable || deliverable === "Not uploaded") {
      return "No submitted file yet.";
    }

    if (typeof deliverable === "string") {
      return deliverable;
    }

    return deliverable.fileName || "No submitted file yet.";
  };

  const handleSubmitWork = () => {
    if (!uploadedFile || !task) return;

    const submittedFile =
      typeof uploadedFile === "string"
        ? {
            fileName: uploadedFile,
            fileType: "Mock file",
            fileSize: "-",
            uploadedAt: getTodayISO(),
            uploadedBy: currentUser?.name || "Intern",
          }
        : {
            fileName: uploadedFile.name,
            fileType: uploadedFile.type || "Unknown file",
            fileSize: `${(uploadedFile.size / 1024).toFixed(1)} KB`,
            uploadedAt: getTodayISO(),
            uploadedBy: currentUser?.name || "Intern",
          };

    onUpdateTask(task.id, {
      deliverable: submittedFile,
      status: "Completed",
      submitted: getTodayISO(),
      finishDate: getTodayISO(),
    });

    setUploadedFile("");
    setIsReplacing(false);
    setShowReplaceConfirm(false);
  };

  const handleConfirmReplace = () => {
    onUpdateTask(task.id, {
      deliverable: "Not uploaded",
      status: "In Progress",
      submitted: "",
      finishDate: "-",
    });

    setUploadedFile("");
    setIsReplacing(true);
    setShowReplaceConfirm(false);
  };

  if (!task) return null;

  return (
    <>
      <div className="space-y-5">
        {/* BACK BUTTON */}
        {showBackButton && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
        )}

        <div className="grid grid-cols-3 gap-6">
          {/* MAIN TASK CARD */}
          <div className="col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">
                {task.taskName || task.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {task.description || "No description provided."}
              </p>

              {/* INTERN UPLOAD SECTION */}
              {canSubmitWork && (
                <div className="mt-6">
                  <h3 className="mb-4 font-semibold text-gray-900">
                    Your Work
                  </h3>

                  {hasSubmittedFile ? (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm font-medium text-gray-700">
                        Submitted File
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {getDeliverableName(task.deliverable)}
                      </p>

                      {task.deliverable?.uploadedAt && (
                        <p className="mt-1 text-xs text-gray-400">
                          Uploaded by {task.deliverable.uploadedBy} on{" "}
                          {formatDateForDisplay(task.deliverable.uploadedAt)}
                        </p>
                      )}

                      <button
                        onClick={() => setShowReplaceConfirm(true)}
                        className="mt-4 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Replace Submission
                      </button>
                    </div>
                  ) : (
                    <>
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
                        disabled={!uploadedFile}
                        className="mt-5 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Submit Work
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* NON-INTERN VIEW: SUPERVISOR / HR */}
              {!canSubmitWork && (
                <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-700">
                    Submitted File
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {getDeliverableName(task.deliverable)}
                  </p>

                  {task.deliverable?.uploadedAt && (
                    <p className="mt-1 text-xs text-gray-400">
                      Uploaded by {task.deliverable.uploadedBy} on{" "}
                      {formatDateForDisplay(task.deliverable.uploadedAt)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-5">
            {/* TASK DETAILS */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Task Details
              </h3>

              <div className="space-y-1 text-sm text-gray-800">
                <p>Type: {task.taskName || task.title || "-"}</p>
                <p>Start: {formatDateForDisplay(task.startDate)}</p>
                <p>Due: {formatDateForDisplay(task.deadline)}</p>
                <p>
                  Submitted:{" "}
                  {task.submitted
                    ? formatDateForDisplay(task.submitted)
                    : "None"}
                </p>
                <p>Status: {task.status || "In Progress"}</p>
              </div>
            </div>

            {/* COMMENTS */}
            <TaskComments
              comments={comments}
              currentUser={currentUser}
              mode={mode}
              onPostComment={(newComment) => {
                if (!canComment) return;

                onUpdateTask(task.id, {
                  comments: [...comments, newComment],
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* REPLACE SUBMISSION CONFIRMATION MODAL */}
      {showReplaceConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">
              Replace submission?
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              This will remove your submitted file and change the task status
              back to In Progress.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowReplaceConfirm(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmReplace}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
