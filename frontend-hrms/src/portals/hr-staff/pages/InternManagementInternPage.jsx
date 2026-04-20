import { Navigate } from 'react-router-dom';

import InternManagementAttendanceSection from '../components/intern-management/detail/InternManagementAttendanceSection';
import InternManagementDetailHero from '../components/intern-management/detail/InternManagementDetailHero';
import InternManagementDetailPageHeader from '../components/intern-management/detail/InternManagementDetailPageHeader';
import InternManagementDetailSidebar from '../components/intern-management/detail/InternManagementDetailSidebar';
import InternManagementEvaluationSection from '../components/intern-management/detail/InternManagementEvaluationSection';
import InternManagementMonthlyDtrSection from '../components/intern-management/detail/InternManagementMonthlyDtrSection';
import InternManagementProfileSection from '../components/intern-management/detail/InternManagementProfileSection';
import InternManagementTasksSection from '../components/intern-management/detail/InternManagementTasksSection';
import '../../../assets/styles/staff-management.css';
import '../../../assets/styles/intern-management.css';
import { useInternManagementInternDetailState } from '../utils/intern-management/detail/useInternManagementInternDetailState';

export default function InternManagementInternPage() {
  const state = useInternManagementInternDetailState();

  if (!state.intern) {
    return <Navigate to="/hr-staff/intern-management" replace />;
  }

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* layout handled by parent */}</aside>
      <main className="main-content intern-management-detail-page-content">
        <InternManagementDetailPageHeader internName={state.intern.name} subtitleSummary={state.subtitleSummary} />

        <section className="intern-management-detail-card">
          <InternManagementDetailHero intern={state.intern} />

          <div className="intern-management-detail-body">
            <InternManagementDetailSidebar internSlug={state.intern.slug} resolvedTheme={state.resolvedTheme} />

            <div className="intern-management-detail-panel">
              {state.activePrimarySection === 'profile' ? <InternManagementProfileSection activeProfileTab={state.activeProfileTab} resolvedTheme={state.resolvedTheme} personalInfoItems={state.personalInfoItems} documents={state.intern.documents} viewIcon={state.viewIcon} downloadIcon={state.downloadIcon} onSelectProfileTab={state.handleSelectProfileTab} onOpenDocument={state.handleOpenDocument} /> : null}
              {state.activeSection === 'attendance' ? <InternManagementAttendanceSection entries={state.paginatedAttendanceEntries} emptyRowCount={state.attendanceEmptyRowCount} currentPage={state.attendancePage} totalPages={state.attendanceTotalPages} onPageChange={state.setAttendancePage} monthlyDtrIcon={state.monthlyDtrIcon} exportAttendanceIcon={state.exportAttendanceIcon} onViewMonthlyDtr={() => state.navigate(`/hr-staff/intern-management/intern/${state.intern.slug}/attendance/monthly-dtr`)} onExport={state.handleExportAttendance} /> : null}
              {state.activeSection === 'attendance-monthly-dtr' ? <InternManagementMonthlyDtrSection activeMonth={state.activeMonth} activeMonthIndex={state.activeMonthIndex} maxMonthIndex={state.intern.attendanceMonths.length - 1} entries={state.paginatedMonthlyDtrEntries} emptyRowCount={state.monthlyDtrEmptyRowCount} currentPage={state.monthlyDtrPage} totalPages={state.monthlyDtrTotalPages} onPageChange={state.setMonthlyDtrPage} onPreviousMonth={() => state.setActiveMonthIndex((current) => Math.max(0, current - 1))} onNextMonth={() => state.setActiveMonthIndex((current) => Math.min(state.intern.attendanceMonths.length - 1, current + 1))} remainingHours={state.activeMonth.remainingHours} backIcon={state.backIcon} onBack={() => state.navigate(`/hr-staff/intern-management/intern/${state.intern.slug}/attendance`)} /> : null}
              {state.activePrimarySection === 'tasks' ? <InternManagementTasksSection tasks={state.paginatedTasks} emptyRowCount={state.taskEmptyRowCount} currentPage={state.taskPage} totalPages={state.tasksTotalPages} onPageChange={state.setTaskPage} /> : null}
              {state.activePrimarySection === 'evaluation' ? <InternManagementEvaluationSection evaluation={state.intern.evaluation} resolvedTheme={state.resolvedTheme} filledStarIcon={state.filledStarIcon} emptyStarIcon={state.emptyStarIcon} /> : null}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}