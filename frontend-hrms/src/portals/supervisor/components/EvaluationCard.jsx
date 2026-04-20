import { MessageCircle, NotebookPen, PenTool, Star, Target } from 'lucide-react';

import StarRatingUI from './StarRatingUI';

const criterionIconMap = {
  work: { Icon: Star, shellClass: 'bg-violet-500/80', iconClass: 'text-violet-600', fill: true },
  communication: { Icon: MessageCircle, shellClass: 'bg-blue-500/50', iconClass: 'text-blue-600', fill: true },
  initiative: { Icon: Target, shellClass: 'bg-red-500/50', iconClass: 'text-red-500' },
  attendance: { Icon: NotebookPen, shellClass: 'bg-green-500/50', iconClass: 'text-green-600' },
  professionalism: { Icon: PenTool, shellClass: 'bg-yellow-500/50', iconClass: 'text-yellow-500' },
};

export default function EvaluationCard({ evaluation }) {
  return (
    <div className="border border-gray-500/20 rounded-lg p-4"><div className="flex justify-between items-center border-b border-gray-500/20 pb-2"><div className="flex flex-col"><span className="text-md font-semibold">{evaluation.name}</span><span className="text-gray-500 text-xs">{evaluation.month}</span></div><span className={`${evaluation.status === 'Completed' ? 'bg-green-100 text-green-500' : 'bg-yellow-100 text-yellow-500'} text-xs font-medium px-2.5 py-1 rounded`}>{evaluation.status}</span></div>{evaluation.criteria ? <><div className="py-3">{evaluation.criteria.map((criterion) => { const { Icon, fill, iconClass, shellClass } = criterionIconMap[criterion.icon]; return <div key={criterion.label} className="py-2 flex justify-between"><div className="flex justify-start items-center gap-2"><div className={`size-8 rounded-full flex items-center justify-center ${shellClass}`}><Icon size={20} className={iconClass} fill={fill ? 'currentColor' : 'none'} /></div><h1 className="text-md">{criterion.label}</h1></div><div className="star flex items-center gap-1"><StarRatingUI rating={criterion.rating} totalStars={5} /></div></div>; })}</div><div className="flex justify-between mt-4 border-t border-gray-500/20 pt-2"><h1 className="font-semibold text-md">Total: {evaluation.total}</h1><h1 className="font-bold text-md uppercase text-yellow-500">{evaluation.score}</h1></div></> : <div className="flex justify-center items-center h-32"><h1 className="text-gray-500 text-sm">Evaluation not yet submitted</h1></div>}</div>
  );
}