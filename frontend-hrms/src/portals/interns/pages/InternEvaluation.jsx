import { useState, useEffect } from "react";
import { Award, AlertCircle } from "lucide-react";
import Header from "../../../common/components/layout/Header";
import EvaluationCard from "../components/ui/EvaluiationCard";

export default function InternEvaluation() {
  const [evaluationHistory, setEvaluationHistory] = useState([]);
  const [internName, setInternName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track if they are logged in

  useEffect(() => {
    const fetchEvaluations = () => {
      const currentUser = localStorage.getItem("current_logged_in_user");
      
      if (!currentUser) {
        setIsLoggedIn(false);
        return;
      }
      
      setIsLoggedIn(true);

      const formattedName = currentUser.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setInternName(formattedName);

      const storageKey = `eval_${currentUser}`;
      const storedData = JSON.parse(localStorage.getItem(storageKey) || "[]");
      
      setEvaluationHistory(storedData.reverse());
    };

    fetchEvaluations();
    window.addEventListener("storage", fetchEvaluations);
    return () => window.removeEventListener("storage", fetchEvaluations);
  }, []);

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <Header title="Evaluation" subtitle="Review performance score and feedback" />

      <div className="p-8 max-w-7xl mx-auto font-sans">
        
        {!isLoggedIn ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center justify-center gap-2 font-bold mb-6 border border-red-200">
              <AlertCircle className="w-5 h-5" />
              Please go to the /login page and select an account first!
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
            {/* Loop through the history and render the new component! */}
            {evaluationHistory.map((evaluation) => (
              <EvaluationCard key={evaluation.id} evaluation={evaluation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}