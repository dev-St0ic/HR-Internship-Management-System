import { useState, useEffect } from "react";
import EvaluationCard from "../components/ui/evaluations/EvaluationCard";
import EvaluationModal from "../components/ui/evaluations/EvaluationModal";

// Base directory of interns
const internDirectory = [
  { id: "cara_lim", name: "Cara Lim" },
  { id: "juan_dela_cruz", name: "Juan Dela Cruz" },
  { id: "ana_reyes", name: "Ana Reyes" },
  { id: "maria_lopez", name: "Maria Lopez" },
];

export default function SupervisorEvaluations() {
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);

  // When page loads, check localStorage to see how many evaluations each intern has
  useEffect(() => {
    const loadInternData = () => {
      const updatedInterns = internDirectory.map(intern => {
        const storageKey = `eval_${intern.id}`;
        const existingData = JSON.parse(localStorage.getItem(storageKey) || "[]");
        
        return {
          ...intern,
          evaluationHistory: existingData,
          evalCount: existingData.length
        };
      });
      setInterns(updatedInterns);
    };

    loadInternData();
  }, []); // Empty dependency array so it only runs on mount

  const handleEvaluationSubmit = (newEvaluationData) => {
    const storageKey = `eval_${selectedIntern.id}`;
    
    // 1. Get the existing array (or an empty array if this is the first time)
    const existingHistory = JSON.parse(localStorage.getItem(storageKey) || "[]");
    
    // 2. Add the new evaluation to the array
    const updatedHistory = [...existingHistory, newEvaluationData];
    
    // 3. Save the array back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(updatedHistory));
    
    // 4. Trigger the storage event to update the Intern tab
    window.dispatchEvent(new Event("storage"));
    
    // 5. UPDATE THE LOCAL UI STATE PROPERLY!
    // Instead of just setting status="Completed", we actually update their history array and count
    setInterns(interns.map(i => 
      i.id === selectedIntern.id 
        ? { 
            ...i, 
            evaluationHistory: updatedHistory, 
            evalCount: updatedHistory.length 
          } 
        : i
    ));
    
    // 6. Close modal
    setSelectedIntern(null); 
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Weekly Evaluations</h1>
        <p className="text-gray-500">Conduct ongoing performance evaluations for your interns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interns.map((intern) => (
          <EvaluationCard
            key={intern.id} 
            intern={intern} 
            onEvaluateClick={() => setSelectedIntern(intern)} 
          />
        ))}
      </div>

      {selectedIntern && (
        <EvaluationModal
          intern={selectedIntern} 
          onClose={() => setSelectedIntern(null)} 
          onSubmit={handleEvaluationSubmit} 
        />
      )}
    </div>
  );
}