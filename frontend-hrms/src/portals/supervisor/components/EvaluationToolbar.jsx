import { Search, SlidersHorizontal } from 'lucide-react';

export default function EvaluationToolbar() {
  return (
    <div className="flex justify-between"><div className="border border-gray-500/20 w-auto rounded-lg p-2 flex items-center gap-2"><Search size={16} className="text-gray-500" /><input type="text" placeholder="Search Interns..." className="border-0 focus:outline-none" /></div><div className="border border-gray-500/20 rounded-lg flex items-center gap-2 px-3 py-1 cursor-pointer"><SlidersHorizontal size={16} /><span>Filter</span></div></div>
  );
}