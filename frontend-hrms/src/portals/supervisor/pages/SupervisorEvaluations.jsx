import { useState, useEffect } from "react";
import EvaluationCard from "../components/ui/evaluations/EvaluationCard"; // Adjust path if needed
import EvaluationModal from "../components/ui/evaluations/EvaluationModal"; // Adjust path if needed
import {useAuth} from "../../../contexts/AuthContext"

export default function SupervisorEvaluations() {
  const { currentUser } = useAuth(); // Gets Sarah's data
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);

  // When page loads, fetch the real database instead of the hardcoded list
  useEffect(() => {
    const loadInternData = () => {
      // 1. Get ALL users and filter out only the Interns (Alex, Chloe, David)
      const usersDb = JSON.parse(localStorage.getItem("hrims_users_db") || "{}");
      const allInterns = Object.values(usersDb).filter(user => user.role === "INTERN");

      // 2. Get the global evaluations table we created
      const evalsDb = JSON.parse(localStorage.getItem("hrims_evaluations_db") || "[]");
      
      // 3. Map the evaluations to their respective interns
      const updatedInterns = allInterns.map(intern => {
        // Find all evaluations belonging specifically to THIS intern
        const internHistory = evalsDb.filter(evalRecord => evalRecord.internId === intern.id);
        
        return {
          ...intern,
          evaluationHistory: internHistory,
          evalCount: internHistory.length
        };
      });
      
      setInterns(updatedInterns);
    };

    loadInternData();
  }, []); 

  const handleEvaluationSubmit = (newEvaluationData) => {
    // 1. Check if we actually have a selected intern before doing anything
    if (!selectedIntern) return;

    // 2. Get the global evaluations table
    const existingHistory = JSON.parse(localStorage.getItem("hrims_evaluations_db") || "[]");
    
    // 3. Create the record USING the selectedIntern we have right now
    const newRecord = {
        ...newEvaluationData,
        supervisorId: currentUser?.id || "unknown", 
        supervisorName: currentUser?.name || "Supervisor", 
        internId: selectedIntern.id, // This is where it was crashing
    };

    // 4. Save to localStorage
    const updatedHistory = [...existingHistory, newRecord];
    localStorage.setItem("hrims_evaluations_db", JSON.stringify(updatedHistory));
    
    // 5. Update local UI state
    setInterns(prevInterns => prevInterns.map(i => {
      if (i.id === selectedIntern.id) {
        const updatedInternHistory = [...(i.evaluationHistory || []), newRecord];
        return { 
            ...i, 
            evaluationHistory: updatedInternHistory, 
            evalCount: updatedInternHistory.length 
        };
      }
      return i;
    }));
    
    // 6. ONLY NOW reset the selected intern to null to close the modal
    setSelectedIntern(null); 
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Weekly Evaluations</h1>
        <p className="text-gray-500">Conduct ongoing performance evaluations for your interns.</p>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interns.map((intern) => (
          <EvaluationCard
            key={intern.id} 
            intern={intern} 
            onEvaluateClick={() => setSelectedIntern(intern)} 
          />
        ))}
      </div>

      {/* The Modal */}
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