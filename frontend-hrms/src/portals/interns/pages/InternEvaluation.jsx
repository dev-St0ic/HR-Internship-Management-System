import { useState, useEffect } from "react";
import { Award, AlertCircle } from "lucide-react";
import Header from "../../../common/components/layout/Header";
import EvaluationCard from "../components/ui/EvaluiationCard";
import { useAuth } from "../../../contexts/AuthContext";

export default function InternEvaluation() {
  const { currentUser } = useAuth();
  const [evaluationHistory, setEvaluationHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const fetchEvaluations = () => {
      if (!currentUser) {
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);

      const allEvals = JSON.parse(
        localStorage.getItem("hrims_evaluations_db") || "[]",
      );
      const myData = allEvals.filter(
        (record) => record.internId === currentUser.id,
      );

      setEvaluationHistory([...myData].reverse());
    };

    fetchEvaluations();
    window.addEventListener("storage", fetchEvaluations);
    return () => window.removeEventListener("storage", fetchEvaluations);
  }, [currentUser]);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm min-h-screen font-sans">
      {!isLoggedIn ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center justify-center gap-2 font-bold mb-6 border border-red-200">
          <AlertCircle className="w-5 h-5" />
          Please go to the /login page and select an account first!
        </div>
      ) : null}

      {isLoggedIn && evaluationHistory.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <Award className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-700">
            No Evaluations Yet
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
            Your supervisor has not submitted any weekly or monthly performance
            evaluations for you yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evaluationHistory.map((evaluation) => (
            <EvaluationCard key={evaluation.id} evaluation={evaluation} />
          ))}
        </div>
      )}
    </div>
  );
}
