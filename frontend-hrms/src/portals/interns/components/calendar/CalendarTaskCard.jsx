import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function CalendarTaskCard({ task }) {
  const today = dayjs().format("YYYY-MM-DD");
  const navigate = useNavigate();

  const isCompleted = task.status === "Completed";
  const isOverdue =
    task.status === "Overdue" ||
    (task.status !== "Completed" && task.deadline < today);

  const styles = isCompleted
    ? {
        bg: "bg-green-50",
        bar: "bg-green-500",
        text: "text-green-900",
      }
    : isOverdue
      ? {
          bg: "bg-red-50",
          bar: "bg-red-500",
          text: "text-red-900",
        }
      : {
          bg: "bg-yellow-50",
          bar: "bg-yellow-500",
          text: "text-yellow-900",
        };
  return (
    <div
      key={task.id}
      onClick={() =>
        navigate("/intern/tasks", {
          state: { selectedTaskId: task.id },
        })
      }
      className={`
      flex items-center gap-1
      rounded-md px-1.5 py-1
      w-full max-w-full
      overflow-hidden hover:shadow-md
      ${styles.bg}
    `}
    >
      {/* Left color bar */}
      <div
        className={`
        w-1 h-4 rounded-sm shrink-0 ${styles.bar}
      `}
      />

      {/* Text */}
      <div className="flex flex-col leading-tight min-w-0">
        <span className="text-[8px] text-gray-500 leading-none">Due</span>
        <span className={`text-[9px] font-semibold truncate ${styles.text}`}>
          {task.taskName}
        </span>
      </div>
    </div>
  );
}
