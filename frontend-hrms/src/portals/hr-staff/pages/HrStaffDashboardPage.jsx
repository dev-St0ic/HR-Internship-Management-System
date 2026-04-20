import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  fetchDocumentVaultRecords,
  subscribeDocumentVaultUpdates,
} from '../../../common/api/documentVaultService';
import {
  fetchInternManagementSnapshot,
  subscribeInternManagementUpdates,
} from '../../../common/api/internManagementService';
import '../../../assets/styles/hr-staff-dashboard.css';
import '../../../assets/styles/staff-management.css';
import {
  actionIconMap,
  getThemeAsset,
  hrStaffInternManagementOperationIconMap,
  hrStaffRecruitmentTabIconMap,
  hrStaffSidebarIconMap,
} from '../../../common/config/appIconRegistry';
import { useTheme } from '../../../common/theme/ThemeProvider';
import NotificationIcon from '../components/staff-management/NotificationIcon';
import { currentHrStaffUser } from '../data/currentHrStaffUser';
import {
  documentVaultRecords,
} from '../data/documentVaultData';
import { createHrStaffDashboardSummary } from '../data/hrStaffDashboardData';
import {
  internAttendanceRequests,
  internManagementInterns,
} from '../data/internManagementData';
import { createRecruitmentApplications } from '../data/recruitmentData';
import { staffManagementDepartments } from '../data/staffManagementData';

const statIconMap = {
  interns: hrStaffSidebarIconMap['intern-management'].selected,
  approval: hrStaffRecruitmentTabIconMap['for-admin-approval'].selected,
  attendance: hrStaffInternManagementOperationIconMap['attendance-requests'],
  vault: hrStaffSidebarIconMap['document-vault'].selected,
};

const queueIconMap = {
  requirements: actionIconMap.filter,
  attendance: actionIconMap.attendance,
  evaluation: actionIconMap.edit,
  vault: actionIconMap.download,
};

const quickActionConfigs = [
  {
    key: 'recruitment',
    title: 'Review applications',
    description: 'Open the recruitment workspace and route ready profiles to the admin approval lane.',
    to: '/hr-staff/recruitment?tab=applications&scroll=workspace',
    icon: hrStaffRecruitmentTabIconMap.applications.selected,
  },
  {
    key: 'intern-management',
    title: 'Manage intern records',
    description: 'Check attendance exceptions, onboarding requirements, and internship status in one place.',
    to: '/hr-staff/intern-management?tab=interns',
    icon: hrStaffSidebarIconMap['intern-management'].selected,
  },
  {
    key: 'document-vault',
    title: 'Validate documents',
    description: 'Review MOA, NDA, COA, and endorsement files that still need HR validation.',
    to: '/hr-staff/document-vault?section=all',
    icon: hrStaffSidebarIconMap['document-vault'].selected,
  },
  {
    key: 'staff-management',
    title: 'Check department roster',
    description: 'Inspect department ownership, staff capacity, and intern distribution across the portal.',
    to: '/hr-staff/staff-management?scroll=top',
    icon: hrStaffSidebarIconMap['staff-management'].selected,
  },
];

const quickActionMetaMap = {
  recruitment: 'Applications and approvals',
  'intern-management': 'Attendance and intern status',
  'document-vault': 'Validation and file review',
  'staff-management': 'Department coverage',
};

const queueMetaMap = {
  requirements: 'Onboarding gaps',
  attendance: 'Attendance exceptions',
  evaluation: 'Evaluation follow-up',
  vault: 'Files awaiting validation',
};

const RECRUITMENT_APPLICATION_OVERRIDES_KEY = 'hrms.recruitment.applicationOverrides.v1';

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

function applyRecruitmentApplicationOverride(application, override = {}) {
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
  };
}

function formatSyncTime(value) {
  if (!value) {
    return 'Using the latest available records';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function getLatestTimestamp(values) {
  const timestamps = values
    .filter(Boolean)
    .map((value) => new Date(value).getTime())
    .filter(Number.isFinite);

  if (timestamps.length === 0) {
    return '';
  }

  return new Date(Math.max(...timestamps)).toISOString();
}

function formatDashboardValue(value) {
  return typeof value === 'number' ? value.toLocaleString() : value;
}

function DashboardStatCard({ stat }) {
  return (
    <article className="hr-dashboard-card hr-dashboard-stat-card">
      <span className="hr-dashboard-icon-shell">
        <img src={stat.icon} alt="" aria-hidden="true" className="hr-dashboard-icon" />
      </span>
      <div className="hr-dashboard-stat-copy">
        <span className="hr-dashboard-eyebrow">{stat.title}</span>
        <strong>{formatDashboardValue(stat.value)}</strong>
        <p>{stat.description}</p>
      </div>
    </article>
  );
}

function ShortcutButton({ item, compact = false }) {
  return (
    <Link to={item.to} className={`hr-dashboard-shortcut-button ${compact ? 'is-compact' : ''} ${item.toneKey ? `is-${item.toneKey}` : ''}`}>
      <span className="hr-dashboard-shortcut-icon-shell">
        <img
          src={item.icon}
          alt=""
          aria-hidden="true"
          className="hr-dashboard-icon"
        />
      </span>

      <div className="hr-dashboard-shortcut-copy">
        <div className="hr-dashboard-shortcut-topline">
          <h3>{item.title}</h3>
          {item.badge ? (
            <span className={item.toneKey ? `hr-dashboard-status-pill is-${item.toneKey}` : 'hr-dashboard-badge'}>
              {item.badge}
            </span>
          ) : null}
        </div>

        {item.meta ? <span className="hr-dashboard-shortcut-meta">{item.meta}</span> : null}
        {item.description ? <p>{item.description}</p> : null}
      </div>
    </Link>
  );
}

export default function HrStaffDashboardPage() {
  const { resolvedTheme } = useTheme();
  const latestInternVersionRef = useRef(0);
  const latestVaultVersionRef = useRef(0);
  const [internSnapshot, setInternSnapshot] = useState({
    interns: internManagementInterns,
    attendanceRequests: internAttendanceRequests,
    updatedAt: '',
  });
  const [vaultSnapshot, setVaultSnapshot] = useState({
    records: documentVaultRecords,
    updatedAt: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [recruitmentApplicationOverrides, setRecruitmentApplicationOverrides] = useState(readStoredRecruitmentApplicationOverrides);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorage = (event) => {
      if (event.key === RECRUITMENT_APPLICATION_OVERRIDES_KEY) {
        setRecruitmentApplicationOverrides(readStoredRecruitmentApplicationOverrides());
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const applyInternSnapshot = (snapshot) => {
      if (!snapshot || snapshot.version <= latestInternVersionRef.current) {
        return false;
      }

      latestInternVersionRef.current = snapshot.version;
      setInternSnapshot(snapshot);
      return true;
    };

    const applyVaultSnapshot = (snapshot) => {
      if (!snapshot || snapshot.version <= latestVaultVersionRef.current) {
        return false;
      }

      latestVaultVersionRef.current = snapshot.version;
      setVaultSnapshot(snapshot);
      return true;
    };

    const loadDashboardData = async () => {
      try {
        const [latestInternSnapshot, latestVaultSnapshot] = await Promise.all([
          fetchInternManagementSnapshot(),
          fetchDocumentVaultRecords(),
        ]);

        if (!isMounted) {
          return;
        }

        applyInternSnapshot(latestInternSnapshot);
        applyVaultSnapshot(latestVaultSnapshot);
        setLoadError('');
      } catch {
        if (isMounted) {
          setLoadError('Live sync is unavailable, showing the latest seeded records.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadDashboardData();

    const unsubscribeInternUpdates = subscribeInternManagementUpdates((snapshot) => {
      if (!isMounted) {
        return;
      }

      if (applyInternSnapshot(snapshot)) {
        setIsLoading(false);
        setLoadError('');
      }
    });

    const unsubscribeVaultUpdates = subscribeDocumentVaultUpdates((snapshot) => {
      if (!isMounted) {
        return;
      }

      if (applyVaultSnapshot(snapshot)) {
        setIsLoading(false);
        setLoadError('');
      }
    });

    return () => {
      isMounted = false;
      unsubscribeInternUpdates();
      unsubscribeVaultUpdates();
    };
  }, []);

  const recruitmentApplicationsWithOverrides = useMemo(
    () => createRecruitmentApplications(internSnapshot.interns, vaultSnapshot.records).map((application) => (
      applyRecruitmentApplicationOverride(application, recruitmentApplicationOverrides[application.id])
    )),
    [internSnapshot.interns, recruitmentApplicationOverrides, vaultSnapshot.records],
  );

  const summary = useMemo(
    () => createHrStaffDashboardSummary({
      user: currentHrStaffUser,
      departments: staffManagementDepartments,
      interns: internSnapshot.interns,
      attendanceRequests: internSnapshot.attendanceRequests,
      vaultRecords: vaultSnapshot.records,
      applications: recruitmentApplicationsWithOverrides,
    }),
    [internSnapshot.attendanceRequests, internSnapshot.interns, recruitmentApplicationsWithOverrides, vaultSnapshot.records],
  );

  const quickActions = useMemo(
    () => quickActionConfigs.map((action) => ({
      ...action,
      description: '',
      meta: quickActionMetaMap[action.key],
      badge: summary.quickActionBadges[action.key],
    })),
    [summary.quickActionBadges],
  );

  const queueLinks = useMemo(
    () => summary.queues.map((queue) => ({
      key: `queue-${queue.key}`,
      title: queue.title,
      description: '',
      meta: queueMetaMap[queue.key],
      badge: `${queue.count}`,
      to: queue.to,
      icon: getThemeAsset(queueIconMap[queue.key], resolvedTheme),
      toneKey: queue.count > 0 ? (queue.key === 'attendance' || queue.key === 'requirements' ? 'attention' : 'accent') : 'positive',
    })),
    [resolvedTheme, summary.queues],
  );

  const lastUpdatedAt = useMemo(
    () => getLatestTimestamp([internSnapshot.updatedAt, vaultSnapshot.updatedAt]),
    [internSnapshot.updatedAt, vaultSnapshot.updatedAt],
  );

  const syncMessage = loadError || (isLoading
    ? 'Syncing dashboard data'
    : `Last synced ${formatSyncTime(lastUpdatedAt)}`);

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* layout handled by parent */}</aside>

      <main className="main-content hr-dashboard-page-content">
        <div className="header-row">
          <div>
            <h2>Dashboard</h2>
            <span className="subtitle">
              Operational triage for recruitment, attendance review, document validation, and staff actions
            </span>
          </div>
          <NotificationIcon />
        </div>

        <section className="hr-dashboard-overview-card">
          <div className="hr-dashboard-overview-main">
            <p className="hr-dashboard-kicker">HR staff command center</p>
            <h1>{summary.greeting}</h1>
            <p>{summary.overviewText}</p>

            <div className="hr-dashboard-overview-metrics">
              {summary.overviewMetrics.map((metric) => (
                <div key={metric.key} className="hr-dashboard-overview-metric">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="hr-dashboard-overview-status">
            <div className={`hr-dashboard-sync-pill ${loadError ? 'is-error' : isLoading ? 'is-loading' : 'is-live'}`}>
              <img src={hrStaffSidebarIconMap.dashboard.selected} alt="" aria-hidden="true" className="hr-dashboard-icon" />
              <span>{syncMessage}</span>
            </div>

            <p>
              This page is derived from the current recruitment, intern management, document vault, and department datasets.
            </p>
          </div>
        </section>

        <section className="hr-dashboard-stats-grid" aria-label="Dashboard overview metrics">
          {summary.stats.map((stat) => (
            <DashboardStatCard
              key={stat.key}
              stat={{
                ...stat,
                icon: statIconMap[stat.key],
              }}
            />
          ))}
        </section>

        <section className="hr-dashboard-panel">
          <div className="hr-dashboard-section-heading">
            <div>
              <h3>Workspace launcher</h3>
              <p>Use the core shortcuts below to jump into the main workflows and the records that currently need action.</p>
            </div>
          </div>

          <div className="hr-dashboard-workspace-groups">
            <div className="hr-dashboard-workspace-group">
              <div className="hr-dashboard-workspace-group-heading">
                <h4>Quick actions</h4>
                <p>Main HR staff workspaces.</p>
              </div>

              <div className="hr-dashboard-toolbar-grid">
                {quickActions.map((action) => (
                  <ShortcutButton key={action.key} item={action} compact />
                ))}
              </div>
            </div>

            <div className="hr-dashboard-workspace-group">
              <div className="hr-dashboard-workspace-group-heading">
                <h4>Attention queues</h4>
                <p>Open the records that currently need action.</p>
              </div>

              <div className="hr-dashboard-toolbar-grid">
                {queueLinks.map((queue) => (
                  <ShortcutButton key={queue.key} item={queue} compact />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}