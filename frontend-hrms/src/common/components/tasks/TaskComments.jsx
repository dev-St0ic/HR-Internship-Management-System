import { useState } from "react";

export default function TaskComments({
  comments = [],
  currentUser,
  mode = "intern",
  onPostComment,
}) {
  const [commentText, setCommentText] = useState("");

  const canComment = mode === "intern" || mode === "supervisor";

  const handlePost = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: crypto.randomUUID(),
      author: currentUser?.name || "User",
      role: currentUser?.role || mode,
      message: commentText,
      createdAt: new Date().toISOString(),
    };

    onPostComment(newComment);
    setCommentText("");
  };

  return (
    <div className="card-panel">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Comments:</h3>

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment}
              className="rounded-lg border border-gray-100 bg-white p-3"
            >
              <p className="text-sm font-semibold text-gray-900">
                {comment.author}
              </p>
              <p className="mt-1 text-sm text-gray-500">{comment.message}</p>

              {comment.createdAt && (
                <p className="mt-2 text-[11px] text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">No comments</p>
      )}

      {canComment && (
        <>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="mt-4 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Write a comment..."
            rows="3"
          />

          <button
            onClick={handlePost}
            className="mt-3 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            Post Comment
          </button>
        </>
      )}

      {!canComment && comments.length > 0 && (
        <p className="mt-4 text-xs text-gray-400">
          Comments are view only for this role.
        </p>
      )}
    </div>
  );
}
