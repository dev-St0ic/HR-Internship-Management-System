import { getThemeAsset } from '../../../../../common/config/appIconRegistry';
import { evaluationIconMap } from '../../../utils/intern-management/detail/constants';

export default function InternManagementEvaluationSection({ evaluation, resolvedTheme, filledStarIcon, emptyStarIcon }) {
  return (
    <article className="intern-management-evaluation-card">
      <div className="intern-management-evaluation-header"><div><h3>Intern Performance Evaluation</h3><p>Evaluated By: {evaluation.evaluatorName}</p></div><span className="intern-management-status-pill is-completed">{evaluation.status}</span></div>
      <div className="intern-management-evaluation-rows">
        {evaluation.criteria.map((criterion) => (
          <div key={criterion.key} className="intern-management-evaluation-row">
            <div className="intern-management-evaluation-label"><img src={getThemeAsset(evaluationIconMap[criterion.key], resolvedTheme)} alt="" aria-hidden="true" /><span>{criterion.label}</span></div>
            <div className="intern-management-stars" aria-label={`${criterion.rating} out of 5`}>{Array.from({ length: 5 }, (_, starIndex) => <img key={`${criterion.key}-${starIndex + 1}`} src={starIndex < criterion.rating ? filledStarIcon : emptyStarIcon} alt="" aria-hidden="true" />)}</div>
          </div>
        ))}
      </div>
      <div className="intern-management-comments-box"><strong>Supervisor Comments</strong><p>{evaluation.comment}</p></div>
      <div className="intern-management-evaluation-footer"><strong>Total: {evaluation.totalScore}/25</strong><span>{evaluation.scoreLabel}</span></div>
    </article>
  );
}