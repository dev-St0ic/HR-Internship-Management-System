import { useState } from "react";
import { Star } from "lucide-react";

const criteriaList = [
    { key: "workQuality", label: "Work Quality", desc: "Accuracy and quality of work" },
    { key: "communication", label: "Communication", desc: "Interaction with team members" },
    { key: "initiative", label: "Initiative", desc: "Ability to work independently" },
    { key: "attendance", label: "Attendance", desc: "Punctuality and reliability" },
    { key: "professionalism", label: "Professionalism", desc: "Workplace behavior" },
    ];

    export default function EvaluationModal({ intern, onClose, onSubmit }) {
    const [evaluation, setEvaluation] = useState({
        ratings: { workQuality: 0, communication: 0, initiative: 0, attendance: 0, professionalism: 0 },
        comments: "",
    });

    const handleRatingChange = (criteriaKey, value) => {
        setEvaluation(prev => ({ ...prev, ratings: { ...prev.ratings, [criteriaKey]: value } }));
    };

    const totalScore = Object.values(evaluation.ratings).reduce((a, b) => a + b, 0);
    const grade = totalScore >= 20 ? "EXCELLENT" : totalScore >= 15 ? "GOOD" : "NEEDS IMPROVEMENT";

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (totalScore === 0) return alert("Please provide ratings before submitting!");
        
        const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        alert(`Evaluation successfully submited for ${intern.name}`);

        onSubmit({
        internName: intern.name,
        date: formattedDate,
        ratings: evaluation.ratings,
        comments: evaluation.comments,
        totalScore,
        grade,
        status: "Completed",
        id: Date.now() 
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl">
            
            <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Evaluation for {intern.name}</h2>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6">
            
            {/* Table Header (From Figma) */}
            <div className="flex text-xs font-medium text-gray-400 mb-2 px-3">
                <div className="w-1/3">Criteria</div>
                <div className="w-1/3">Description</div>
                <div className="w-1/3 text-right">Rating</div>
            </div>

            {/* Star Rating Table */}
            <div className="border border-gray-100 rounded-xl divide-y divide-gray-100">
                {criteriaList.map((criteria) => (
                <div key={criteria.key} className="flex items-center p-3.5 hover:bg-gray-50 transition-colors">
                    <div className="w-1/3 text-sm font-medium text-gray-700">{criteria.label}</div>
                    <div className="w-1/3 text-sm text-gray-500">{criteria.desc}</div>
                    <div className="w-1/3 flex justify-end gap-1">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                        <Star 
                        key={starValue} 
                        onClick={() => handleRatingChange(criteria.key, starValue)}
                        className={`w-6 h-6 cursor-pointer transition-all ${
                            evaluation.ratings[criteria.key] >= starValue 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-200 hover:text-yellow-200 hover:fill-yellow-200"
                        }`} 
                        />
                    ))}
                    </div>
                </div>
                ))}
            </div>

            {/* The Legend (From Figma) */}
            <div className="flex justify-between text-xs text-gray-400 px-2 mt-3 mb-6">
                <span>1 - Poor</span>
                <span>2 - Needs Improvement</span>
                <span>3 - Satisfactory</span>
                <span>4 - Good</span>
                <span>5 - Excellent</span>
            </div>

            <div className="flex justify-between items-center border border-gray-200 rounded-lg p-4 mb-6">
                <span className="font-bold text-gray-900 text-base">Total Score</span>
                <span className="font-bold text-gray-900 text-base">{totalScore} / 25</span>
                <div className="w-32 flex justify-end">
                {totalScore > 0 ? (
                    <span className="text-yellow-500 flex items-center gap-1.5 font-bold uppercase tracking-wide text-sm">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500"/> {grade}
                    </span>
                ) : (
                    <span className="text-gray-300 font-bold uppercase tracking-wide text-sm">--</span>
                )}
                </div>
            </div>

            {/* Comments Section */}
            <div className="mb-6">
                <label className="block font-bold text-gray-900 mb-2 text-sm">Supervisor Comments</label>
                <textarea 
                required
                className="w-full border border-gray-200 rounded-lg p-3 h-24 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-sm text-gray-700"
                value={evaluation.comments}
                onChange={(e) => setEvaluation({...evaluation, comments: e.target.value})}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-indigo-500 rounded-lg text-sm font-semibold text-white hover:bg-indigo-600 transition-colors">
                Submit Evaluation
                </button>
            </div>

            </form>
        </div>
        </div>
    );
}