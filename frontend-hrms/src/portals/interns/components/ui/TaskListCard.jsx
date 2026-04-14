import { useNavigate } from "react-router-dom";
import { Folder } from "lucide-react";

export default function TaskListCard({ tasks }) {
  const navigate = useNavigate();

  //When a user clicks the task, this will route you to the tasks page on the actual task
  const handleClick = (taskId) => {
    navigate("/intern/tasks", { state: { selectedTaskId: taskId } });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      {/*title*/}
      <h3 className="font-bold mb-3">Your Tasks for Today</h3>

      {/* Scrollable List */}
      <div className="space-y-3 max-h-50 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleClick(task.id)}
            className="flex items-center gap-3 pl-3 justify-start bg-[#E7E5F5] p-3 font-medium rounded-lg cursor-pointer hover:bg-purple-200 transition"
          >
            <div className="flex items-center justify-center w-6 h-6 bg-purple-200 rounded-full">
              <Folder size={14} className=" text-[#7152F3]" />
            </div>
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
}
