import ConfirmationModal from '../components/staff-management/ConfirmationModal';
import '../../../assets/styles/staff-management.css';
import '../../../assets/styles/recruitment.css';
import RecruitmentHero from '../components/recruitment/RecruitmentHero';
import RecruitmentPageHeader from '../components/recruitment/RecruitmentPageHeader';
import RecruitmentToolbar from '../components/recruitment/RecruitmentToolbar';
import RecruitmentWorkspaceCard from '../components/recruitment/RecruitmentWorkspaceCard';
import { tabSearchPlaceholders } from '../utils/recruitment/pageConfig';
import { useRecruitmentPageState } from '../utils/recruitment/useRecruitmentPageState';

export default function HrStaffRecruitmentPage() {
  const state = useRecruitmentPageState();

  return (
    <div className="staff-management-layout"><aside className="sidebar">{/* layout handled by parent */}</aside><main className="main-content recruitment-page-content"><RecruitmentPageHeader /><RecruitmentHero topPartnerUniversity={state.topPartnerUniversity} latestApplication={state.latestApplication} applicationQueues={state.applicationQueues} partnerUniversities={state.partnerUniversities} overviewMetrics={state.overviewMetrics} onHighlightClick={state.handleHeroHighlightClick} /><RecruitmentToolbar search={state.search} setSearch={state.setSearch} activeTab={state.activeTab} tabCounts={state.tabCounts} tabSearchPlaceholders={tabSearchPlaceholders} /><RecruitmentWorkspaceCard state={state} /></main><ConfirmationModal isOpen={Boolean(state.confirmationDialog)} title={state.confirmationDialog?.title ?? ''} message={state.confirmationDialog?.message ?? ''} confirmLabel={state.confirmationDialog?.confirmLabel ?? 'Confirm'} tone={state.confirmationDialog?.tone ?? 'accent'} onClose={() => state.setPendingConfirmation(null)} onConfirm={() => state.confirmationDialog?.onConfirm?.()} /></div>
  );
}