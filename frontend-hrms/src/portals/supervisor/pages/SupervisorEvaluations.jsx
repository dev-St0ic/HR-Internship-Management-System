import { Search, SlidersHorizontal, Star, MessageCircle, Target, NotebookPen, PenTool } from "lucide-react";
import StarRatingUI from "../components/StarRatingUI";
import { useState } from "react";
import InternEvaluationModal from "../components/ui/InternEvaluationModal";

export default function SupervisorEvaluations() {
  const [selectedIntern, setSelectedIntern] = useState(null);

  const evaluationInternData = [
  {
    internName: "Ana Reyes",
    lastEvaluated: "Feb 2026",
    evalStatus: "Completed",
    evalData: {
      evalLabel: ["Work Quality", "Communication", "Initiative", "Attendance", "Professionalism"],
      evalIcon: {
        "Work Quality" : <Star size={20} className="text-violet-600 bg-violet-600/50 rounded-full size-8 p-1" fill="currentColor" />, 
        "Communication" : <MessageCircle size={20} className="text-blue-600 bg-blue-400/50 rounded-full size-8 p-1" fill="currentColor" />, 
        "Initiative" : <Target size={20} className="text-red-500 bg-red-400/50 rounded-full size-8 p-1" />, 
        "Attendance" : <NotebookPen size={20} className="text-green-600 bg-green-500/50 rounded-full size-8 p-1" />, 
        "Professionalism" : <PenTool size={20} className="text-yellow-500 bg-yellow-300/50 rounded-full size-8 p-1" />
      },
      evalLabelRate: {
        "Work Quality": 5,
        "Communication": 4,
        "Initiative": 4,
        "Attendance": 4,
        "Professionalism": 5
      },
      evalLabelDescription: {
        "Work Quality": "Accuracy and Quality of Work",
        "Communication": "Interaction with Team Members",
        "Initiative": "Ability to work Independently",
        "Attendance": "Punctuality and Reliability",
        "Professionalism": "Workplace Behavior"
      },
      evalSupervisorComments : ["Ana has been a reliable intern with excellent work quality, excellent communication, excellent initiative, and excellent professionalism. She can improve by being more punctual in the morning. Overall, she has great potential and is a valuable asset to the team."],
      get total() {
        return Object.values(this.evalLabelRate).reduce((sum, val) => sum + val, 0);
      },
      get totalStatus() {
        const total = this.total;
        return total === 25
          ? "Perfect"
          : total >= 22
          ? "Excellent"
          : total >= 16
          ? "Good"
          : "Needs Improvement";
      }
    }
  },
  {
    internName: "Cara Lim",
    lastEvaluated: "Feb 2026",
    evalStatus: "Completed",
    evalData: {
      evalLabel: ["Work Quality", "Communication", "Initiative", "Attendance", "Professionalism"],
      evalIcon: {
        "Work Quality" : <Star size={20} className="text-violet-600 bg-violet-600/50 rounded-full size-8 p-1" fill="currentColor" />, 
        "Communication" : <MessageCircle size={20} className="text-blue-600 bg-blue-400/50 rounded-full size-8 p-1" fill="currentColor" />, 
        "Initiative" : <Target size={20} className="text-red-500 bg-red-400/50 rounded-full size-8 p-1" />, 
        "Attendance" : <NotebookPen size={20} className="text-green-600 bg-green-500/50 rounded-full size-8 p-1" />, 
        "Professionalism" : <PenTool size={20} className="text-yellow-500 bg-yellow-300/50 rounded-full size-8 p-1" />
      },
      evalLabelRate: {
        "Work Quality": 5,
        "Communication": 5,
        "Initiative": 5,
        "Attendance": 4,
        "Professionalism": 5
      },
      evalLabelDescription: {
        "Work Quality": "Accuracy and Quality of Work",
        "Communication": "Interaction with Team Members",
        "Initiative": "Ability to work Independently",
        "Attendance": "Punctuality and Reliability",
        "Professionalism": "Workplace Behavior"
      },
      evalSupervisorComments : ["Cara has been a reliable intern with excellent work quality, excellent communication, excellent initiative, and excellent professionalism. She can improve by being more punctual in the morning. Overall, she has great potential and is a valuable asset to the team."],
      get total() {
        return Object.values(this.evalLabelRate).reduce((sum, val) => sum + val, 0);
      },
      get totalStatus() {
        const total = this.total;
        return total === 25
          ? "Perfect"
          : total >= 22
          ? "Excellent"
          : total >= 16
          ? "Good"
          : "Needs Improvement";
      }
    }
  },
];

  return (
    <>
      <div className="border rounded border-gray-500/20 h-full p-4 mb-4">
        <div className="flex justify-between">
          <div className="border border-gray-500/20 w-auto rounded-lg p-2 flex items-center gap-2">
            <Search size={16} className="text-gray-500" />
            <input type="text" placeholder="Search Interns..." className="border-0 focus:outline-none" />
          </div>
          <div className="border border-gray-500/20 rounded-lg flex items-center gap-2 px-3 py-1 cursor-pointer">
            <SlidersHorizontal size={16} className="" />
            <span>Filter</span>
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-4 mb-4 mt-6">
          {evaluationInternData.map((intern, index) => (
            <div key={index} onClick={() => setSelectedIntern(intern)} className="col-span-3 row-span-3 border border-gray-500/20 rounded-lg p-4 cursor-pointer hover:shadow-md transition">
              
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-500/20 pb-2">
                <div className="flex flex-col">
                  <span className="text-md font-semibold">{intern.internName}</span>
                  <span className="text-gray-500 text-xs">{intern.lastEvaluated}</span>
                </div>
                <span className="bg-green-100 text-green-500 text-xs font-medium px-2.5 py-1 rounded">
                  {intern.evalStatus}
                </span>
              </div>

              {/* Ratings */}
              {intern.evalData.evalLabel.map((label, i) => (
                <div key={i} className="py-3">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full flex items-center justify-center">
                        {intern.evalData.evalIcon[label]}
                      </div>
                      <h1 className="text-md">{label}</h1>
                    </div>

                    <div className="flex items-center gap-1">
                      <StarRatingUI 
                        rating={intern.evalData.evalLabelRate[label]}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Summary */}
              <div className="flex justify-between mt-4 border-t border-gray-500/20 pt-2">
                <h1 className="font-semibold text-md">
                  Total: {intern.evalData.total}
                </h1>
                <h1 className="font-bold text-md uppercase text-yellow-500">
                  {intern.evalData.totalStatus}
                </h1>
              </div>

            </div>
          ))}
        </div>
                <InternEvaluationModal
          selectedIntern={selectedIntern}
          onClose={() => setSelectedIntern(null)}
        />
    
      </div>
    </>
  );
}