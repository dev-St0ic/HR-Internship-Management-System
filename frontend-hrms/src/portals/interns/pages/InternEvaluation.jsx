import { useState, useEffect } from "react";
import { Award, AlertCircle } from "lucide-react";
import Header from "../../../common/components/layout/Header";
import EvaluationCard from "../components/ui/EvaluiationCard";
import { useAuth } from "../../../contexts/AuthContext"; // Import our global auth hook!

export default function InternEvaluation() {
  const { currentUser } = useAuth(); // Get the logged-in user from global state
  const [evaluationHistory, setEvaluationHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const fetchEvaluations = () => {
      // 1. Check if user exists via our Context
      if (!currentUser) {
        setIsLoggedIn(false);
        return;
      }
      
      setIsLoggedIn(true);

      // 2. Fetch the BIG global evaluations table
      const allEvals = JSON.parse(localStorage.getItem("hrims_evaluations_db") || "[]");
      
      // 3. FILTER: Only get evaluations where internId matches the current user's ID
      // This bridges Sarah's submission (saved with Alex's ID) to Alex's screen.
      const myData = allEvals.filter(record => record.internId === currentUser.id);
      
      // 4. Set state (reverse so newest is first)
      setEvaluationHistory([...myData].reverse());
    };

    fetchEvaluations();
    
    // Sync if supervisor submits while intern is looking at the page
    window.addEventListener("storage", fetchEvaluations);
    return () => window.removeEventListener("storage", fetchEvaluations);
  }, [currentUser]); // Refresh whenever the logged-in user changes

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <Header title="Evaluation" subtitle="Review performance score and feedback" />

      <div className="p-8 max-w-7xl mx-auto font-sans">
        
        {!isLoggedIn ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center justify-center gap-2 font-bold mb-6 border border-red-200">
              <AlertCircle className="w-5 h-5" />
              Please login first to view your evaluations!
            </div>
        ) : null}

        {isLoggedIn && evaluationHistory.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center shadow-sm mt-4">
            <Award className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-700">No Evaluations Yet</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
              Your supervisor has not submitted any weekly or monthly performance evaluations for you yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
            {evaluationHistory.map((evaluation) => (
              <EvaluationCard key={evaluation.id} evaluation={evaluation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}