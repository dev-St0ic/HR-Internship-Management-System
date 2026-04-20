import { PencilLine, Trash2 } from 'lucide-react';

const statusClassMap = { Approved: 'bg-green-700', Pending: 'bg-yellow-500', Completed: 'bg-green-700' };

export default function SupervisorTasksTable({ tasks }) {
  return (
    <div className="border border-gray-500/20 rounded mt-4 px-3 py-1 mb-4"><table className="table-auto w-full text-left"><thead className="border-b border-gray-500/10 text-sm"><tr className="text-gray-500"><td className="p-2">Task</td><td className="p-2">Intern Name</td><td className="p-2">Deadline</td><td className="p-2">Deliverable</td><td className="p-2">Status</td><td className="p-2">Actions</td></tr></thead><tbody className="divide-y divide-gray-500/10 text-md text-gray-700">{tasks.map((task, index) => <tr key={`${task.task}-${index}`} className="hover:bg-gray-100"><td className="p-2">{task.task}</td><td className="p-2">{task.internName}</td><td className="p-2">{task.deadline}</td><td className="p-2">{task.deliverable}</td><td className="p-2"><div className={`${statusClassMap[task.status]} px-2 py-1 rounded text-white text-xs inline-block`}><p>{task.status}</p></div></td><td className="p-2"><div className="flex justify-around mx-5"><PencilLine width={20} height={20} /> <Trash2 width={20} height={20} /></div></td></tr>)}</tbody></table></div>
  );
}