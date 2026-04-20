import { Folder } from 'lucide-react';

export default function TasksListPanel({ selectedTaskId, tasks, onSelect }) {
  return (
    <div className="col-span-2 bg-white p-5 rounded-xl border border-gray-200 shadow-sm"><h3 className="font-bold mb-4">Your Tasks</h3><div className="space-y-3">{tasks.map((task) => <div key={task.id} onClick={() => onSelect(task.id)} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${selectedTaskId === task.id ? 'bg-purple-500 text-white' : 'bg-purple-100/60 hover:bg-purple-200'}`}><Folder size={16} />{task.title}</div>)}</div></div>
  );
}