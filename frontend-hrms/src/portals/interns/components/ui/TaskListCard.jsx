import { useNavigate } from "react-router-dom";
import { Folder } from "lucide-react";

export default function TaskListCard({ tasks }) {
  const navigate = useNavigate();

  //When a user clicks the task, this will route you to the tasks page on the actual task
  const handleClick = (taskId) => {
    navigate("/intern/tasks", { state: { selectedTaskId: taskId } });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 transition-all">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Your tasks for today</h3>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleClick(task.id)}
            className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer hover:bg-white hover:border-violet-300 transition-all group"
          >
            <div className="flex items-center justify-center w-9 h-9 bg-white border border-slate-200 rounded-lg shadow-sm group-hover:bg-violet-50 transition-colors">
              <Folder size={16} className="text-[#7152F3]" />
            </div>
            <span className="text-[15px] font-bold text-slate-700 group-hover:text-violet-700 transition-colors">
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}