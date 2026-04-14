import { Star, MessageSquare, Target, Calendar, Briefcase } from "lucide-react";

// The full list of criteria and their specific Figma icons
const criteriaList = [
  { key: "workQuality", label: "Work Quality", Icon: Star },
  { key: "communication", label: "Communication", Icon: MessageSquare },
  { key: "initiative", label: "Initiative", Icon: Target },
  { key: "attendance", label: "Attendance", Icon: Calendar },
  { key: "professionalism", label: "Professionalism", Icon: Briefcase },
];

const MiniStar = ({ filled }) => (
  <Star className={`w-4 h-4 ${filled ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
);

export default function EvaluationCard({ intern, onEvaluateClick }) {
  const hasEvaluations = intern.evalCount > 0;
  
  // Grab the exact data from the most recently submitted evaluation
  const latestEval = hasEvaluations ? intern.evaluationHistory[intern.evaluationHistory.length - 1] : null;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
      <div>
        {/* Header Section */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{intern.name}</h3>
            <p className="text-sm text-gray-400 font-medium">
              {latestEval ? latestEval.date : "Pending Evaluation"}
            </p>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-md ${hasEvaluations ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
            {hasEvaluations ? 'Completed' : 'Pending'}
          </span>
        </div>

        {/* Dynamic Body Section */}
        {hasEvaluations ? (
          <div className="space-y-3 mt-6">
            
            {/* Accurately mapping the exact submitted stars per criteria! */}
            {criteriaList.map((criteria) => (
              <div key={criteria.key} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-indigo-50 shadow-sm text-indigo-500">
                    <criteria.Icon className="w-4 h-4" />
                  </span>
                  <span className="font-medium">{criteria.label}</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <MiniStar 
                      key={starValue} 
                      /* This exact line pulls the real data from the modal submission */
                      filled={latestEval.ratings[criteria.key] >= starValue} 
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Total Score Footer */}
            <div className="flex justify-between items-center font-bold mt-5 pt-4 border-t border-gray-100 text-gray-800">
              <span>Total: {latestEval.totalScore}/25</span>
              <span className="text-yellow-500 flex items-center gap-1.5 uppercase text-sm">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> {latestEval.grade}
              </span>
            </div>
          </div>
        ) : (
          /* Empty State matching the dashed Figma box */
          <div className="h-56 mt-6 flex items-center justify-center border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
              <p className="text-sm text-gray-400">Evaluation not yet submitted</p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button 
        onClick={onEvaluateClick} 
        className="w-full mt-6 py-2.5 bg-indigo-50 text-indigo-600 font-bold text-sm rounded-lg hover:bg-indigo-100 transition-colors"
      >
        {hasEvaluations ? "Evaluate Again" : "Evaluate Intern"}
      </button>
    </div>
  );
}