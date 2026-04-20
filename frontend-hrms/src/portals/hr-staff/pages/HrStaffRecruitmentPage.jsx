import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Eye,
  FileText,
  Search,
  ShieldCheck,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ActionFeedbackBanner from '../components/staff-management/ActionFeedbackBanner';
import ConfirmationModal from '../components/staff-management/ConfirmationModal';
import EmployeeAvatar from '../components/staff-management/EmployeeAvatar';
import NotificationIcon from '../components/staff-management/NotificationIcon';
import PaginationControls from '../components/staff-management/PaginationControls';
import SearchBar from '../components/staff-management/SearchBar';
import {
  createRecruitmentPartnerUniversities,
  recruitmentApplications,
  recruitmentTabs,
  RECRUITMENT_PAGE_SIZE,
} from '../data/recruitmentData';
import { getThemeAsset, hrStaffRecruitmentTabIconMap } from '../../../common/config/appIconRegistry';
import { useTheme } from '../../../common/theme/ThemeProvider';
import '../../../assets/styles/staff-management.css';
import '../../../assets/styles/recruitment.css';

const initialPages = {
  applications: 1,
  'for-admin-approval': 1,
  'partner-university': 1,
};

const RECRUITMENT_APPLICATION_OVERRIDES_KEY = 'hrms.recruitment.applicationOverrides.v1';
const ACTION_MESSAGE_DURATION_MS = 4000;
const PAGE_SIZE_BY_TAB = {
  applications: RECRUITMENT_PAGE_SIZE,
  'for-admin-approval': RECRUITMENT_PAGE_SIZE,
  'partner-university': 3,
};

const tabIconMap = hrStaffRecruitmentTabIconMap;

const tabSearchPlaceholders = {
  applications: 'Search applicant, university, program, or department',
  'for-admin-approval': 'Search queued applicant, reviewer, or university',
  'partner-university': 'Search university, program, or department',
};

const toneClassNameMap = {
  success: 'is-success',
  attention: 'is-attention',
  accent: 'is-accent',
  neutral: 'is-neutral',
};

function readStoredRecruitmentApplicationOverrides() {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const storedValue = window.localStorage.getItem(RECRUITMENT_APPLICATION_OVERRIDES_KEY);

    if (!storedValue) {
      return {};
    }

    const parsedValue = JSON.parse(storedValue);

    return parsedValue && typeof parsedValue === 'object' && !Array.isArray(parsedValue)
      ? parsedValue
      : {};
  } catch {
    return {};
  }
}

function formatActionTimestamp(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function canMoveToAdminApproval(application) {
  return application.documentStatus === 'Complete' && application.evaluationStatus !== 'Not Started';
}

function applyRecruitmentOverride(application, override = {}) {
  const nextStage = override.stage ?? application.stage;
  const actionStatus = override.actionStatus ?? null;
  let nextStatus = application.status;
  let nextStatusTone = application.statusTone;

  if (actionStatus === 'queued') {
    nextStatus = 'Queued for Admin Approval';
    nextStatusTone = 'accent';
  }

  if (actionStatus === 'endorsed') {
    nextStatus = 'Endorsed by HR Staff';
    nextStatusTone = 'success';
  }

  return {
    ...application,
    stage: nextStage,
    stageLabel: nextStage === 'applications' ? 'Application' : 'For Admin Approval',
    status: nextStatus,
    statusTone: nextStatusTone,
    actionStatus,
    actionUpdatedAt: override.actionUpdatedAt ?? '',
    actionUpdatedAtLabel: override.actionUpdatedAt ? formatActionTimestamp(override.actionUpdatedAt) : '',
  };
}

function matchesSearch(query, values) {
  if (!query) {
    return true;
  }

  return values.some((value) => String(value).toLowerCase().includes(query));
}

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function animateVerticalScroll(targetY, duration = 950) {
  if (typeof window === 'undefined') {
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) {
    window.scrollTo({ top: targetY });
    return;
  }

  const startTime = window.performance.now();

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo({ top: startY + distance * easedProgress });

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

function ApplicantCard({ application, onViewProfile, onMoveToAdminApproval, onEndorse, fixedHeight }) {
  const documentCompletion = Math.round((application.submittedDocuments / application.requiredDocuments) * 100);
  const isApplicationStage = application.stage === 'applications';
  const isReadyForApproval = canMoveToAdminApproval(application);
  const isEndorsed = application.actionStatus === 'endorsed';
  const PrimaryActionIcon = isApplicationStage ? ArrowRight : BadgeCheck;
  const primaryActionLabel = isApplicationStage
    ? (isReadyForApproval ? 'Move to Admin Approval' : 'Requirements Incomplete')
    : (isEndorsed ? 'Endorsed' : 'Endorse');
  const actionNote = isApplicationStage
    ? (application.documentStatus !== 'Complete'
      ? 'Complete the missing requirements before routing this applicant to admin approval.'
      : application.evaluationStatus === 'Not Started'
        ? 'Finish the initial evaluation before routing this applicant to admin approval.'
        : 'Send this applicant to the admin approval queue when the profile is ready.')
    : (isEndorsed
      ? `Endorsed ${application.actionUpdatedAtLabel}.`
      : application.actionStatus === 'queued' && application.actionUpdatedAtLabel
        ? `Moved to the admin approval queue ${application.actionUpdatedAtLabel}.`
        : 'Mark this applicant as HR-endorsed while the profile remains in the admin review queue.');

  return (
    <article className="recruitment-applicant-card" style={fixedHeight ? { height: `${fixedHeight}px` } : undefined}>
      <div
        className="recruitment-applicant-cover"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.18) 0%, rgba(15, 23, 42, 0.82) 100%), url(${application.coverImage})` }}
      >
        <div className="recruitment-applicant-cover-topline">
          <span className={`recruitment-cover-pill ${application.stage === 'for-admin-approval' ? 'is-approval' : 'is-application'}`}>
            {application.stageLabel}
          </span>
          <span className="recruitment-cover-pill is-subtle">
            {application.submittedDocuments}/{application.requiredDocuments} docs
          </span>
        </div>

        <div className="recruitment-applicant-heading">
          <EmployeeAvatar name={application.name} src="" size={52} className="recruitment-applicant-avatar" />
          <div>
            <h3>{application.name}</h3>
            <p>{application.university}</p>
          </div>
        </div>
      </div>

      <div className="recruitment-applicant-body">
        <div className="recruitment-applicant-status-row">
          <span className={`recruitment-status-pill ${toneClassNameMap[application.statusTone]}`}>
            {application.status}
          </span>
          <span className="recruitment-muted-copy">Submitted {application.submittedAtLabel}</span>
        </div>

        <div className="recruitment-meta-grid">
          <div className="recruitment-meta-item">
            <span>Program</span>
            <strong>{application.program}</strong>
          </div>
          <div className="recruitment-meta-item">
            <span>Target Department</span>
            <strong>{application.department}</strong>
          </div>
          <div className="recruitment-meta-item">
            <span>Role Track</span>
            <strong>{application.roleTrack}</strong>
          </div>
          <div className="recruitment-meta-item">
            <span>Preferred Setup</span>
            <strong>{application.workMode}</strong>
          </div>
        </div>

        <div className="recruitment-document-progress">
          <div className="recruitment-document-progress-copy">
            <span>Requirements readiness</span>
            <strong>{documentCompletion}% complete</strong>
          </div>
          <div className="recruitment-document-track" aria-hidden="true">
            <div className="recruitment-document-fill" style={{ width: `${documentCompletion}%` }} />
          </div>
        </div>

        <div className="recruitment-tag-list">
          <span className="recruitment-tag">{application.documentStatus}</span>
          <span className="recruitment-tag">{application.evaluationStatus}</span>
          <span className="recruitment-tag">{application.ojtProgress}</span>
        </div>

        <div className="recruitment-card-footer">
          <div>
            <span>Assigned Supervisor</span>
            <strong>{application.supervisorName}</strong>
          </div>
          <div>
            <span>Verified in vault</span>
            <strong>
              {application.verifiedVaultDocuments}
              {application.vaultDocumentTotal > 0 ? ` / ${application.vaultDocumentTotal}` : ''}
            </strong>
          </div>
          <div>
            <span>Internship Start</span>
            <strong>{application.startDateLabel}</strong>
          </div>
        </div>

        <div className="recruitment-card-actions">
          <button
            type="button"
            className="recruitment-action-button is-secondary"
            onClick={() => onViewProfile(application)}
          >
            <Eye size={16} strokeWidth={2} />
            <span>View Profile</span>
          </button>
          <button
            type="button"
            className="recruitment-action-button is-primary"
            onClick={() => {
              if (isApplicationStage) {
                if (isReadyForApproval) {
                  onMoveToAdminApproval(application);
                }

                return;
              }

              if (!isEndorsed) {
                onEndorse(application);
              }
            }}
            disabled={isApplicationStage ? !isReadyForApproval : isEndorsed}
          >
            <PrimaryActionIcon size={16} strokeWidth={2} />
            <span>{primaryActionLabel}</span>
          </button>
        </div>
        <p className="recruitment-action-note">{actionNote}</p>
      </div>
    </article>
  );
}

function PartnerUniversityCard({ university, fixedHeight }) {
  const pendingDocumentProfiles = Math.max(university.applicantCount - university.documentReadyCount, 0);
  const readinessPercentage = university.applicantCount === 0
    ? 0
    : Math.round((university.documentReadyCount / university.applicantCount) * 100);

  return (
    <article className="recruitment-university-card" style={fixedHeight ? { height: `${fixedHeight}px` } : undefined}>
      <div className="recruitment-university-header">
        <div className="recruitment-university-header-top">
          <div
            className="recruitment-university-avatar"
            style={{ background: university.palette.background, color: university.palette.color }}
            aria-hidden="true"
          >
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
          <span className="recruitment-university-info-pill">
            {university.departmentCount} departments reached
          </span>
        </div>
      </div>

      <div className="recruitment-university-stats">
        <div className="recruitment-university-stat">
          <span>Applicants</span>
          <strong>{university.applicantCount}</strong>
        </div>
        <div className="recruitment-university-stat">
          <span>Admin Queue</span>
          <strong>{university.approvalCount}</strong>
        </div>
        <div className="recruitment-university-stat">
          <span>Programs</span>
          <strong>{university.programCount}</strong>
        </div>
      </div>

      <div className="recruitment-university-section">
        <span className="recruitment-section-label">Academic Programs</span>
        <div className="recruitment-chip-list">
          {university.programs.map((program) => (
            <span key={program} className="recruitment-chip">{program}</span>
          ))}
        </div>
      </div>

      <div className="recruitment-university-section">
        <span className="recruitment-section-label">Departments Reached</span>
        <div className="recruitment-chip-list is-department-list">
          {university.departments.map((department) => (
            <span key={department} className="recruitment-chip is-department">{department}</span>
          ))}
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
            <div
              className="recruitment-university-progress-fill"
              style={{ width: `${readinessPercentage}%` }}
            />
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

export default function HrStaffRecruitmentPage() {
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const measureLayerRef = useRef(null);
  const workspaceCardRef = useRef(null);
  const requestedTab = searchParams.get('tab');
  const requestedSearch = searchParams.get('q') ?? '';
  const requestedScroll = searchParams.get('scroll');
  const initialActiveTab = recruitmentTabs.some((tab) => tab.key === requestedTab)
    ? requestedTab
    : 'applications';
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [search, setSearch] = useState(requestedSearch);
  const [pageByTab, setPageByTab] = useState(initialPages);
  const [applicationOverrides, setApplicationOverrides] = useState(readStoredRecruitmentApplicationOverrides);
  const [actionFeedback, setActionFeedback] = useState(null);
  const [pendingConfirmation, setPendingConfirmation] = useState(null);
  const [pendingScrollTab, setPendingScrollTab] = useState(null);
  const [measuredCardHeights, setMeasuredCardHeights] = useState({
    applications: 0,
    'for-admin-approval': 0,
    'partner-university': 0,
  });

  useEffect(() => {
    setPageByTab(initialPages);
  }, [search]);

  useEffect(() => {
    const nextActiveTab = recruitmentTabs.some((tab) => tab.key === requestedTab)
      ? requestedTab
      : 'applications';

    if (nextActiveTab !== activeTab) {
      setActiveTab(nextActiveTab);
    }

    if (requestedSearch !== search) {
      setSearch(requestedSearch);
    }
  }, [requestedSearch, requestedTab]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(
      RECRUITMENT_APPLICATION_OVERRIDES_KEY,
      JSON.stringify(applicationOverrides),
    );
  }, [applicationOverrides]);

  useEffect(() => {
    if (!actionFeedback?.message || typeof window === 'undefined') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setActionFeedback(null);
    }, ACTION_MESSAGE_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [actionFeedback]);

  useEffect(() => {
    if (!pendingScrollTab || pendingScrollTab !== activeTab || !workspaceCardRef.current) {
      return;
    }

    const targetY = Math.max(
      workspaceCardRef.current.getBoundingClientRect().top + window.scrollY - 24,
      0,
    );

    animateVerticalScroll(targetY);
    setPendingScrollTab(null);
  }, [activeTab, pendingScrollTab]);

  useEffect(() => {
    if (requestedScroll !== 'workspace' || !workspaceCardRef.current) {
      return;
    }

    if (requestedTab && requestedTab !== activeTab) {
      return;
    }

    const targetY = Math.max(
      workspaceCardRef.current.getBoundingClientRect().top + window.scrollY - 24,
      0,
    );

    animateVerticalScroll(targetY);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('scroll');
    setSearchParams(nextSearchParams, { replace: true });
  }, [activeTab, requestedScroll, requestedTab, searchParams, setSearchParams]);

  const applicationsWithState = useMemo(
    () => recruitmentApplications.map((application) => applyRecruitmentOverride(application, applicationOverrides[application.id])),
    [applicationOverrides],
  );

  const applicationQueues = useMemo(() => ({
    applications: applicationsWithState.filter((application) => application.stage === 'applications'),
    'for-admin-approval': applicationsWithState.filter((application) => application.stage === 'for-admin-approval'),
  }), [applicationsWithState]);

  const partnerUniversities = useMemo(
    () => createRecruitmentPartnerUniversities(applicationsWithState),
    [applicationsWithState],
  );

  const filteredDataByTab = useMemo(() => {
    const query = search.trim().toLowerCase();

    return {
      applications: applicationQueues.applications.filter((application) =>
        matchesSearch(query, [
          application.name,
          application.university,
          application.program,
          application.department,
          application.roleTrack,
        ]),
      ),
      'for-admin-approval': applicationQueues['for-admin-approval'].filter((application) =>
        matchesSearch(query, [
          application.name,
          application.university,
          application.department,
          application.supervisorName,
          application.status,
        ]),
      ),
      'partner-university': partnerUniversities.filter((university) =>
        matchesSearch(query, [
          university.name,
          university.relationshipLabel,
          ...university.programs,
          ...university.departments,
          ...university.featuredApplicants,
        ]),
      ),
    };
  }, [applicationQueues, partnerUniversities, search]);

  const tabCounts = useMemo(() => ({
    applications: applicationQueues.applications.length,
    'for-admin-approval': applicationQueues['for-admin-approval'].length,
    'partner-university': partnerUniversities.length,
  }), [applicationQueues, partnerUniversities]);

  const currentItems = filteredDataByTab[activeTab];
  const currentPageSize = PAGE_SIZE_BY_TAB[activeTab];
  const currentPageCount = Math.max(1, Math.ceil(currentItems.length / currentPageSize));
  const currentPage = Math.min(pageByTab[activeTab], currentPageCount);
  const currentSliceStart = (currentPage - 1) * currentPageSize;
  const currentPageItems = currentItems.slice(currentSliceStart, currentSliceStart + currentPageSize);
  const currentPlaceholderCount = currentItems.length === 0
    ? 0
    : Math.max(0, currentPageSize - currentPageItems.length);
  const currentFixedCardHeight = measuredCardHeights[activeTab] || undefined;

  const topPartnerUniversity = partnerUniversities[0] ?? null;
  const latestApplication = applicationsWithState[0] ?? null;
  const missingRequirementsCount = applicationsWithState.filter(
    (application) => application.missingDocuments > 0,
  ).length;

  const handleViewProfile = (application) => {
    navigate(`/hr-staff/intern-management/intern/${application.internSlug}/profile`);
  };

  const applyApplicationAction = (application, nextValues, successMessage) => {
    try {
      const actionUpdatedAt = new Date().toISOString();

      setApplicationOverrides((current) => ({
        ...current,
        [application.id]: {
          ...(current[application.id] ?? {}),
          ...nextValues,
          actionUpdatedAt,
        },
      }));
      setPendingConfirmation(null);
      setActionFeedback({ tone: 'success', message: successMessage });
    } catch {
      setPendingConfirmation(null);
      setActionFeedback({
        tone: 'error',
        message: `We couldn't update ${application.name} right now. Please try again.`,
      });
    }
  };

  const handleMoveToAdminApproval = (application) => {
    if (!canMoveToAdminApproval(application)) {
      return;
    }

    setPendingConfirmation({
      type: 'move',
      application,
    });
  };

  const handleEndorse = (application) => {
    if (application.actionStatus === 'endorsed') {
      return;
    }

    setPendingConfirmation({
      type: 'endorse',
      application,
    });
  };

  const selectRecruitmentTab = (tabKey) => {
    setActiveTab(tabKey);

    const nextSearchParams = new URLSearchParams(searchParams);

    if (tabKey === 'applications') {
      nextSearchParams.delete('tab');
    } else {
      nextSearchParams.set('tab', tabKey);
    }

    setSearchParams(nextSearchParams, { replace: true });
  };

  const handleHeroHighlightClick = (tabKey) => {
    selectRecruitmentTab(tabKey);
    setPendingScrollTab(tabKey);
  };

  const confirmationDialog = useMemo(() => {
    if (!pendingConfirmation) {
      return null;
    }

    if (pendingConfirmation.type === 'move') {
      return {
        title: 'Move To Admin Approval?',
        message: `Send ${pendingConfirmation.application.name} to the admin approval queue? The applicant will appear in the approval tab immediately.`,
        confirmLabel: 'Move Applicant',
        tone: 'accent',
        onConfirm: () => {
          applyApplicationAction(
            pendingConfirmation.application,
            {
              stage: 'for-admin-approval',
              actionStatus: 'queued',
            },
            `${pendingConfirmation.application.name} moved to the admin approval queue.`,
          );
        },
      };
    }

    return {
      title: 'Endorse Applicant?',
      message: `Endorse ${pendingConfirmation.application.name} for admin review? This marks the profile as endorsed by HR staff in the approval queue.`,
      confirmLabel: 'Endorse',
      tone: 'success',
      onConfirm: () => {
        applyApplicationAction(
          pendingConfirmation.application,
          {
            stage: 'for-admin-approval',
            actionStatus: 'endorsed',
          },
          `${pendingConfirmation.application.name} was endorsed for admin review.`,
        );
      },
    };
  }, [pendingConfirmation]);

  const overviewMetrics = useMemo(() => ([
    {
      key: 'applications',
      label: 'Applications',
      value: applicationsWithState.length,
      detail: 'Sample applicants sourced from current intern and document datasets',
      icon: FileText,
    },
    {
      key: 'approval',
      label: 'For Admin Approval',
      value: applicationQueues['for-admin-approval'].length,
      detail: 'Profiles ready to move into the final approval queue',
      icon: ShieldCheck,
    },
    {
      key: 'partners',
      label: 'Partner Universities',
      value: partnerUniversities.length,
      detail: topPartnerUniversity
        ? `${topPartnerUniversity.name} has the strongest current pipeline`
        : 'No partner university data available',
      icon: Building2,
    },
    {
      key: 'missing',
      label: 'Missing Requirements',
      value: missingRequirementsCount,
      detail: 'Applicants that still need at least one required document',
      icon: TriangleAlert,
    },
  ]), [applicationQueues, applicationsWithState.length, missingRequirementsCount, partnerUniversities.length, topPartnerUniversity]);

  useLayoutEffect(() => {
    if (!measureLayerRef.current || currentItems.length === 0) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const nextHeight = Array.from(
        measureLayerRef.current.querySelectorAll('.recruitment-measure-card'),
      ).reduce((maxHeight, element) => Math.max(maxHeight, Math.ceil(element.getBoundingClientRect().height)), 0);

      if (nextHeight === 0) {
        return;
      }

      setMeasuredCardHeights((current) => {
        if (current[activeTab] === nextHeight) {
          return current;
        }

        return {
          ...current,
          [activeTab]: nextHeight,
        };
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeTab, currentItems]);

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* layout handled by parent */}</aside>

      <main className="main-content recruitment-page-content">
        <div className="header-row">
          <div>
            <h2>Recruitment</h2>
            <span className="subtitle">Track applications, admin-ready profiles, and university partners from the current sample records.</span>
          </div>
          <NotificationIcon />
        </div>

        <section className="recruitment-hero">
          <div className="recruitment-hero-main">
            <span className="recruitment-eyebrow">Talent Pipeline</span>
            <h3>
              {topPartnerUniversity
                ? `${topPartnerUniversity.name} currently leads the internship pipeline.`
                : 'Recruitment data is ready to review.'}
            </h3>
            <p>
              {topPartnerUniversity && latestApplication
                ? `${topPartnerUniversity.applicantCount} applicants from ${topPartnerUniversity.name} are represented across ${topPartnerUniversity.departmentCount} departments, with ${applicationQueues['for-admin-approval'].length} records already waiting for admin approval. The latest submission on file is ${latestApplication.name}.`
                : 'Use this page to review applications, approval-ready profiles, and partner university activity.'}
            </p>

            <div className="recruitment-hero-highlights">
              <button
                type="button"
                className="recruitment-hero-highlight"
                onClick={() => handleHeroHighlightClick('applications')}
              >
                <Users size={16} strokeWidth={2} />
                {latestApplication ? `Latest applicant: ${latestApplication.name}` : 'No applicants yet'}
              </button>
              <button
                type="button"
                className="recruitment-hero-highlight"
                onClick={() => handleHeroHighlightClick('for-admin-approval')}
              >
                <ShieldCheck size={16} strokeWidth={2} />
                {applicationQueues['for-admin-approval'].length} ready for admin review
              </button>
              <button
                type="button"
                className="recruitment-hero-highlight"
                onClick={() => handleHeroHighlightClick('partner-university')}
              >
                <Building2 size={16} strokeWidth={2} />
                {partnerUniversities.length} active university partners
              </button>
            </div>
          </div>

          <div className="recruitment-metric-grid">
            {overviewMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <article key={metric.key} className="recruitment-metric-card">
                  <div className="recruitment-metric-icon">
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="recruitment-metric-label">{metric.label}</span>
                    <strong className="recruitment-metric-value">{metric.value}</strong>
                    <p>{metric.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="recruitment-toolbar">
          <div className="recruitment-search-shell">
            <Search size={18} className="recruitment-search-icon" />
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder={tabSearchPlaceholders[activeTab]}
            />
          </div>

          <div className="recruitment-toolbar-summary">
            <span className="recruitment-toolbar-summary-label">View total</span>
            <strong>{tabCounts[activeTab]}</strong>
          </div>
        </div>

        <section ref={workspaceCardRef} className="recruitment-workspace-card">
          <div className="recruitment-tabs">
            {recruitmentTabs.map((tab) => {
              const isActive = tab.key === activeTab;
              const iconSource = isActive
                ? tabIconMap[tab.key].selected
                : getThemeAsset(tabIconMap[tab.key].unselected, resolvedTheme);

              return (
                <button
                  key={tab.key}
                  type="button"
                  className={`recruitment-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => selectRecruitmentTab(tab.key)}
                >
                  <img src={iconSource} alt="" aria-hidden="true" />
                  <span>{tab.label}</span>
                  <span className="recruitment-tab-count">{tabCounts[tab.key]}</span>
                </button>
              );
            })}
          </div>

          <div className="recruitment-panel">
            <div ref={measureLayerRef} className="recruitment-measure-layer" aria-hidden="true">
              {activeTab === 'partner-university' ? (
                <div className="recruitment-university-grid">
                  {currentItems.map((university) => (
                    <div key={`measure-${university.id}`} className="recruitment-measure-card">
                      <PartnerUniversityCard university={university} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="recruitment-application-grid">
                  {currentItems.map((application) => (
                    <div key={`measure-${application.id}`} className="recruitment-measure-card">
                      <ApplicantCard
                        application={application}
                        onViewProfile={() => {}}
                        onMoveToAdminApproval={() => {}}
                        onEndorse={() => {}}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="recruitment-results-meta">
              <span>
                {currentItems.length === 0
                  ? 'No records match the current search.'
                  : `Showing ${currentSliceStart + 1}-${currentSliceStart + currentPageItems.length} of ${currentItems.length} ${activeTab === 'partner-university' ? 'partner universities' : 'applicants'}.`}
              </span>
            </div>

            <ActionFeedbackBanner feedback={actionFeedback} />

            {currentItems.length === 0 ? (
              <div className="recruitment-empty-state">
                <div>
                  <h3>No matching recruitment records</h3>
                  <p>Try a broader search term to surface applicants or partner universities from the current dataset.</p>
                </div>
              </div>
            ) : activeTab === 'partner-university' ? (
              <div className="recruitment-university-grid">
                {currentPageItems.map((university) => (
                  <PartnerUniversityCard key={university.id} university={university} fixedHeight={currentFixedCardHeight} />
                ))}
                {Array.from({ length: currentPlaceholderCount }, (_, index) => (
                  <article
                    key={`partner-placeholder-${index + 1}`}
                    className="recruitment-university-card recruitment-placeholder-card"
                    style={currentFixedCardHeight ? { height: `${currentFixedCardHeight}px` } : undefined}
                    aria-hidden="true"
                  />
                ))}
              </div>
            ) : (
              <div className="recruitment-application-grid">
                {currentPageItems.map((application) => (
                  <ApplicantCard
                    key={application.id}
                    application={application}
                    onViewProfile={handleViewProfile}
                    onMoveToAdminApproval={handleMoveToAdminApproval}
                    onEndorse={handleEndorse}
                    fixedHeight={currentFixedCardHeight}
                  />
                ))}
                {Array.from({ length: currentPlaceholderCount }, (_, index) => (
                  <article
                    key={`application-placeholder-${index + 1}`}
                    className="recruitment-applicant-card recruitment-placeholder-card"
                    style={currentFixedCardHeight ? { height: `${currentFixedCardHeight}px` } : undefined}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}

            <div className="recruitment-pagination-slot">
              {currentPageCount > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={currentPageCount}
                  onPageChange={(page) => {
                    setPageByTab((current) => ({
                      ...current,
                      [activeTab]: page,
                    }));
                  }}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      <ConfirmationModal
        isOpen={Boolean(confirmationDialog)}
        title={confirmationDialog?.title ?? ''}
        message={confirmationDialog?.message ?? ''}
        confirmLabel={confirmationDialog?.confirmLabel ?? 'Confirm'}
        tone={confirmationDialog?.tone ?? 'accent'}
        onClose={() => setPendingConfirmation(null)}
        onConfirm={() => confirmationDialog?.onConfirm?.()}
      />
    </div>
  );
}