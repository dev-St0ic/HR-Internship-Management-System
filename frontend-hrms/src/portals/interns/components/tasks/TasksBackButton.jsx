import { ChevronLeft } from 'lucide-react';

export default function TasksBackButton({ onClick }) {
  return <div className="mt-4"><button onClick={onClick} className="flex items-center justify-center mb-4 bg-purple-500 text-white px-4 py-2 rounded-lg"><ChevronLeft size={16} />Previous</button></div>;
}