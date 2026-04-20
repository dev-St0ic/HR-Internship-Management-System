import ApplicantCard from './ApplicantCard';
import PartnerUniversityCard from './PartnerUniversityCard';

export default function RecruitmentMeasureLayer({ activeTab, items, measureLayerRef }) {
  return <div ref={measureLayerRef} className="recruitment-measure-layer" aria-hidden="true">{activeTab === 'partner-university' ? <div className="recruitment-university-grid">{items.map((university) => <div key={`measure-${university.id}`} className="recruitment-measure-card"><PartnerUniversityCard university={university} /></div>)}</div> : <div className="recruitment-application-grid">{items.map((application) => <div key={`measure-${application.id}`} className="recruitment-measure-card"><ApplicantCard application={application} onViewProfile={() => {}} onMoveToAdminApproval={() => {}} onEndorse={() => {}} /></div>)}</div>}</div>;
}