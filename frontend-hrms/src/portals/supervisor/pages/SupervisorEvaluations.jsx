import EvaluationCard from '../components/EvaluationCard';
import EvaluationToolbar from '../components/EvaluationToolbar';
import { evaluationCards } from '../data/evaluationData';

export default function SupervisorEvaluations() {
  return (
    <>
      <div className="border rounded border-gray-500/20 h-full p-4 mb-4">
        <EvaluationToolbar />
        <div className="grid grid-cols-2 gap-4 mb-4 mt-6">{evaluationCards.map((evaluation) => <EvaluationCard key={`${evaluation.name}-${evaluation.month}`} evaluation={evaluation} />)}</div>
      </div>
    </>
  );
}