import { BadgeCheck, Users } from 'lucide-react';

import { toneClassNameMap } from '../../utils/recruitment/pageConfig';

export default function PartnerUniversityCard({ university, fixedHeight }) {
  const pendingDocumentProfiles = Math.max(university.applicantCount - university.documentReadyCount, 0);
  const readinessPercentage = university.applicantCount === 0
    ? 0
    : Math.round((university.documentReadyCount / university.applicantCount) * 100);

  return (
    <article className="recruitment-university-card" style={fixedHeight ? { height: `${fixedHeight}px` } : undefined}>
      <div className="recruitment-university-header">
        <div className="recruitment-university-header-top">
          <div className="recruitment-university-avatar" style={{ background: university.palette.background, color: university.palette.color }} aria-hidden="true">
            {university.initials}
          </div>
          <div className="recruitment-university-copy">
            <div className="recruitment-university-title-row">
              <h3>{university.name}</h3>
            </div>
            <p>Latest submission arrived {university.latestSubmittedAtLabel}.</p>
          </div>
        </div>

        <div className="recruitment-university-title-meta">
          <span className={`recruitment-status-pill recruitment-university-relationship-pill ${toneClassNameMap[university.relationshipTone]}`}>
            {university.relationshipLabel}
          </span>
          <span className="recruitment-university-info-pill">{university.departmentCount} departments reached</span>
        </div>
      </div>

      <div className="recruitment-university-stats">
        {[{ label: 'Applicants', value: university.applicantCount }, { label: 'Admin Queue', value: university.approvalCount }, { label: 'Programs', value: university.programCount }].map((item) => (
          <div key={item.label} className="recruitment-university-stat">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="recruitment-university-section">
        <span className="recruitment-section-label">Academic Programs</span>
        <div className="recruitment-chip-list">
          {university.programs.map((program) => <span key={program} className="recruitment-chip">{program}</span>)}
        </div>
      </div>

      <div className="recruitment-university-section">
        <span className="recruitment-section-label">Departments Reached</span>
        <div className="recruitment-chip-list is-department-list">
          {university.departments.map((department) => <span key={department} className="recruitment-chip is-department">{department}</span>)}
        </div>
      </div>

      <div className="recruitment-university-footer">
        <div className="recruitment-university-panel recruitment-university-panel-readiness">
          <div className="recruitment-university-panel-heading">
            <div className="recruitment-university-panel-icon is-success" aria-hidden="true">
              <BadgeCheck size={16} strokeWidth={2.2} />
            </div>
            <div className="recruitment-university-panel-copy">
              <span className="recruitment-section-label">Document readiness</span>
              <strong>{university.documentReadyCount} of {university.applicantCount} profiles</strong>
            </div>
          </div>

          <div className="recruitment-university-progress-copy">
            <span>{readinessPercentage}% ready</span>
            <span>{pendingDocumentProfiles === 0 ? 'Clear for review' : `${pendingDocumentProfiles} pending`}</span>
          </div>

          <div className="recruitment-university-progress-track" aria-hidden="true">
            <div className="recruitment-university-progress-fill" style={{ width: `${readinessPercentage}%` }} />
          </div>

          <p className="recruitment-university-panel-note">
            {pendingDocumentProfiles === 0
              ? 'All current applicants are ready for document review.'
              : `${pendingDocumentProfiles} applicant${pendingDocumentProfiles === 1 ? '' : 's'} still need complete requirements.`}
          </p>
        </div>

        <div className="recruitment-university-panel recruitment-university-panel-featured">
          <div className="recruitment-university-panel-heading">
            <div className="recruitment-university-panel-icon is-accent" aria-hidden="true">
              <Users size={16} strokeWidth={2.2} />
            </div>
            <div className="recruitment-university-panel-copy">
              <span className="recruitment-section-label">Featured applicants</span>
              <strong>Priority candidates</strong>
            </div>
          </div>

          <div className="recruitment-university-featured-list">
            {university.featuredApplicants.map((applicant, index) => (
              <div key={applicant} className="recruitment-university-featured-item">
                <span className="recruitment-university-featured-rank">{index + 1}</span>
                <span className="recruitment-university-featured-name">{applicant}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}