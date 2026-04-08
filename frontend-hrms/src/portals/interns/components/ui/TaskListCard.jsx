import { useNavigate } from "react-router-dom";

export default function TaskListCard({ tasks }) {
  const navigate = useNavigate();

  //When a user clicks the task, this will route you to the tasks page on the actual task
  const handleClick = (taskId) => {
    navigate(`/intern/tasks?taskIs=${taskId}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/*title*/}
      <h3 className="font-semibold mb-3">Your Tasks for Today</h3>

      {/* Scrollable List */}
      <div className="space-y-3 max-h-75 overflow-y-auto pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleClick(task.id)}
            className="bg-violet-100 p-3 rounded-lg cursor-pointer hover:bg-violet-200 transition"
          >
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
}
