import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BellRing, ChevronDown, LockKeyhole, SlidersHorizontal, User } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import NotificationIcon from '../components/staff-management/NotificationIcon';
import EmployeeAvatar from '../components/staff-management/EmployeeAvatar';
import { currentHrStaffUser } from '../data/currentHrStaffUser';
import { useTheme } from '../../../common/theme/ThemeProvider';
import '../../../assets/styles/staff-management.css';

const appearanceOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System Default' },
];

const dateFormatOptions = [
  { value: 'ymd24', label: 'YYYY-MM-DD | HH:MM:SS' },
  { value: 'mdy12', label: 'MM/DD/YYYY | HH:MM AM/PM' },
  { value: 'dmy24', label: 'DD/MM/YYYY | HH:MM:SS' },
];

const densityOptions = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
  { value: 'spacious', label: 'Spacious' },
];

const landingPageOptions = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'recruitment', label: 'Recruitment' },
  { value: 'intern-management', label: 'Intern Management' },
  { value: 'document-vault', label: 'Document Vault' },
];

const refreshIntervalOptions = [
  { value: 'off', label: 'Manual Refresh Only' },
  { value: '15', label: 'Every 15 minutes' },
  { value: '30', label: 'Every 30 minutes' },
  { value: '60', label: 'Every 60 minutes' },
];

const weekStartOptions = [
  { value: 'monday', label: 'Monday' },
  { value: 'sunday', label: 'Sunday' },
];

const sessionTimeoutOptions = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '60', label: '60 minutes' },
  { value: '120', label: '2 hours' },
];

const recoveryChannelOptions = [
  { value: 'work-email', label: 'Work Email' },
  { value: 'sms', label: 'Mobile Number (SMS)' },
];

const digestFrequencyOptions = [
  { value: 'realtime', label: 'Real-time' },
  { value: 'daily', label: 'Daily summary' },
  { value: 'weekly', label: 'Weekly summary' },
];

const quietHoursOptions = [
  { value: 'none', label: 'Disabled' },
  { value: 'after-hours', label: 'After working hours' },
  { value: 'overnight', label: 'Overnight only' },
];

const genderOptions = [
  { value: 'Prefer not to say', label: 'Prefer not to say' },
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Non-binary', label: 'Non-binary' },
];

const SETTINGS_STORAGE_KEY = 'hrms.hrStaff.settings.v1';
const STORE_SCHEMA_VERSION = 1;

const settingsTabs = [
  {
    key: 'account',
    label: 'Account',
    icon: User,
    description: 'Manage your staff identity, contact details, and account profile information.',
  },
  {
    key: 'security',
    label: 'Security',
    icon: LockKeyhole,
    description: 'Control password updates, sign-in protection, and access confirmation rules.',
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: BellRing,
    description: 'Decide which workflows alert you and how those alerts are delivered.',
  },
  {
    key: 'workspace',
    label: 'Workspace',
    icon: SlidersHorizontal,
    description: 'Set the defaults used across recruitment, intern management, and document review pages.',
  },
];

const legacyTabMap = {
  profile: 'account',
  general: 'workspace',
};

const securityToggleSettings = [
  {
    key: 'twoFactor',
    title: 'Two-factor Authentication',
    description: 'Require a second verification step whenever this HR staff account signs in.',
  },
  {
    key: 'signInAlerts',
    title: 'Sign-in Alerts',
    description: 'Notify the account owner when a new device or browser signs in.',
  },
  {
    key: 'approvalConfirmation',
    title: 'Sensitive Action Confirmation',
    description: 'Prompt for extra confirmation before approving, rejecting, or archiving records.',
  },
];

const workflowNotificationSettings = [
  {
    key: 'recruitmentFeed',
    title: 'Recruitment Feed Updates',
    description: 'Receive alerts when new candidates enter the review pipeline.',
  },
  {
    key: 'applicationReviews',
    title: 'Application Reviews',
    description: 'Flag applications that need screening, validation, or supervisor coordination.',
  },
  {
    key: 'documentReviews',
    title: 'Document Review Queue',
    description: 'Notify you when uploaded files need review or follow-up.',
  },
  {
    key: 'attendanceRequests',
    title: 'Attendance Requests',
    description: 'Alert you when attendance disputes or requests require HR action.',
  },
  {
    key: 'staffUpdates',
    title: 'Staff Directory Updates',
    description: 'Show changes related to employee records, assignments, and staffing adjustments.',
  },
];

const channelNotificationSettings = [
  {
    key: 'desktop',
    title: 'Desktop Alerts',
    description: 'Show browser notifications while the HR staff portal is open.',
  },
  {
    key: 'mobilePush',
    title: 'Mobile Push Notifications',
    description: 'Send push updates for urgent approvals and queue changes.',
  },
  {
    key: 'emailDigest',
    title: 'Email Digest',
    description: 'Bundle updates into your registered work email instead of sending them one by one.',
  },
  {
    key: 'weeklySummary',
    title: 'Weekly Summary',
    description: 'Receive an end-of-week summary covering pending work and completed actions.',
  },
];

const workspaceToggleSettings = [
  {
    key: 'compactTables',
    title: 'Compact Tables',
    description: 'Show denser rows in document, recruitment, and intern review tables.',
  },
  {
    key: 'reduceMotion',
    title: 'Reduce Motion',
    description: 'Tone down page motion and animated transitions across the portal.',
  },
  {
    key: 'rememberFilters',
    title: 'Remember Last-used Filters',
    description: 'Restore your most recent filters when reopening HR workspaces.',
  },
];

const emptyPasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const SettingsDropdown = ({ value, options, onChange, wide = false, fullWidth = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  const updateMenuPosition = () => {
    if (!dropdownRef.current) {
      return;
    }

    const rect = dropdownRef.current.getBoundingClientRect();
    const viewportPadding = 12;
    const menuGap = 8;
    const menuWidth = rect.width;
    const estimatedMenuHeight = Math.min(options.length * 46 + 16, 280);
    const left = Math.min(
      Math.max(viewportPadding, rect.left),
      window.innerWidth - menuWidth - viewportPadding,
    );
    const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
    const spaceAbove = rect.top - viewportPadding;
    const shouldOpenUpward = spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow;
    const maxHeight = Math.max(120, Math.min(280, shouldOpenUpward ? spaceAbove - menuGap : spaceBelow - menuGap));

    setMenuStyle({
      top: shouldOpenUpward
        ? Math.max(viewportPadding, rect.top - Math.min(estimatedMenuHeight, maxHeight) - menuGap)
        : rect.bottom + menuGap,
      left,
      width: menuWidth,
      maxHeight,
      transformOrigin: shouldOpenUpward ? 'bottom center' : 'top center',
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedTrigger = dropdownRef.current?.contains(event.target);
      const clickedMenu = menuRef.current?.contains(event.target);

      if (!clickedTrigger && !clickedMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    updateMenuPosition();

    const handleViewportChange = () => {
      updateMenuPosition();
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`settings-dropdown ${wide ? 'settings-dropdown-wide' : ''} ${fullWidth ? 'settings-dropdown-full' : ''} ${isOpen ? 'is-open' : ''}`}
    >
      <button
        type="button"
        className="settings-dropdown-trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{selectedOption.label}</span>
        <ChevronDown size={18} className="settings-dropdown-chevron" />
      </button>

      {isOpen && menuStyle
        ? createPortal(
            <div
              ref={menuRef}
              className="settings-dropdown-menu is-portal-open"
              role="listbox"
              style={{
                position: 'fixed',
                top: menuStyle.top,
                left: menuStyle.left,
                width: menuStyle.width,
              }}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`settings-dropdown-option ${option.value === selectedOption.value ? 'is-selected' : ''}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

function createDefaultSettings() {
  return {
    account: {
      username: currentHrStaffUser.name,
      email: currentHrStaffUser.email,
      firstName: currentHrStaffUser.firstName,
      lastName: currentHrStaffUser.lastName,
      mobileNumber: currentHrStaffUser.mobileNumber,
      gender: currentHrStaffUser.gender,
    },
    security: {
      twoFactor: true,
      signInAlerts: true,
      approvalConfirmation: true,
      sessionTimeout: '30',
      recoveryChannel: 'work-email',
      lastPasswordUpdatedLabel: 'No recorded change yet',
    },
    notifications: {
      recruitmentFeed: true,
      applicationReviews: true,
      documentReviews: true,
      attendanceRequests: true,
      staffUpdates: false,
      desktop: true,
      mobilePush: true,
      emailDigest: true,
      weeklySummary: false,
      digestFrequency: 'daily',
      quietHours: 'after-hours',
    },
    workspace: {
      appearance: 'light',
      dateFormat: 'ymd24',
      density: 'comfortable',
      landingPage: 'dashboard',
      autoRefresh: '15',
      weekStart: 'monday',
      compactTables: false,
      reduceMotion: false,
      rememberFilters: true,
    },
    meta: {
      lastSavedAt: null,
    },
  };
}

function cloneSettings(settings) {
  return {
    account: { ...settings.account },
    security: { ...settings.security },
    notifications: { ...settings.notifications },
    workspace: { ...settings.workspace },
    meta: { ...settings.meta },
  };
}

function readStoredSettings() {
  const defaultSettings = createDefaultSettings();

  if (typeof window === 'undefined') {
    return defaultSettings;
  }

  try {
    const storedValue = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (!storedValue) {
      return defaultSettings;
    }

    const parsedValue = JSON.parse(storedValue);

    if (!parsedValue || parsedValue.version !== STORE_SCHEMA_VERSION || !parsedValue.settings) {
      return defaultSettings;
    }

    return {
      account: {
        ...defaultSettings.account,
        ...parsedValue.settings.account,
      },
      security: {
        ...defaultSettings.security,
        ...parsedValue.settings.security,
      },
      notifications: {
        ...defaultSettings.notifications,
        ...parsedValue.settings.notifications,
      },
      workspace: {
        ...defaultSettings.workspace,
        ...parsedValue.settings.workspace,
      },
      meta: {
        ...defaultSettings.meta,
        ...parsedValue.settings.meta,
      },
    };
  } catch {
    return defaultSettings;
  }
}

function persistStoredSettings(settings) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    SETTINGS_STORAGE_KEY,
    JSON.stringify({
      version: STORE_SCHEMA_VERSION,
      settings,
    }),
  );
}

function getRequestedTab(searchParams) {
  const requestedTab = searchParams.get('tab');

  if (!requestedTab) {
    return 'account';
  }

  if (legacyTabMap[requestedTab]) {
    return legacyTabMap[requestedTab];
  }

  return settingsTabs.some((tab) => tab.key === requestedTab) ? requestedTab : 'account';
}

function getOptionLabel(options, value) {
  return options.find((option) => option.value === value)?.label ?? options[0]?.label ?? '';
}

function formatLastSavedLabel(value) {
  if (!value) {
    return 'Not saved yet';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatPasswordDateLabel(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function validatePasswordForm(passwordForm) {
  const hasAnyPasswordInput = Object.values(passwordForm).some((value) => value.trim().length > 0);

  if (!hasAnyPasswordInput) {
    return null;
  }

  if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    return 'Complete all password fields before saving security changes.';
  }

  if (passwordForm.newPassword.length < 10) {
    return 'New password must be at least 10 characters long.';
  }

  if (passwordForm.newPassword === passwordForm.currentPassword) {
    return 'New password must be different from the current password.';
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    return 'New password and confirm password do not match.';
  }

  return null;
}

const SettingsPage = () => {
  const { setThemePreference } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = getRequestedTab(searchParams);
  const [savedSettings, setSavedSettings] = useState(readStoredSettings);
  const [draftSettings, setDraftSettings] = useState(() => cloneSettings(readStoredSettings()));
  const [passwordForm, setPasswordForm] = useState(emptyPasswordForm);
  const [banner, setBanner] = useState(null);
  const savedThemePreferenceRef = useRef(savedSettings.workspace.appearance);

  useEffect(() => {
    if (!banner) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setBanner(null);
    }, 3600);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [banner]);

  useEffect(() => {
    savedThemePreferenceRef.current = savedSettings.workspace.appearance;
  }, [savedSettings.workspace.appearance]);

  useEffect(() => {
    setThemePreference(draftSettings.workspace.appearance);
  }, [draftSettings.workspace.appearance, setThemePreference]);

  useEffect(() => () => {
    setThemePreference(savedThemePreferenceRef.current);
  }, [setThemePreference]);

  const selectTab = (tab) => {
    if (tab === activeTab) {
      return;
    }

    if (tab === 'account') {
      if (searchParams.has('tab')) {
        setSearchParams({}, { replace: true });
      }
      return;
    }

    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('tab', tab);
      return nextParams;
    }, { replace: true });
  };

  const updateSectionField = (section, key, value) => {
    setDraftSettings((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: value,
      },
    }));
  };

  const toggleSectionField = (section, key) => {
    setDraftSettings((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: !current[section][key],
      },
    }));
  };

  const handleAccountChange = (event) => {
    const { name, value } = event.target;
    updateSectionField('account', name, value);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetDraftSettings = () => {
    setDraftSettings(cloneSettings(savedSettings));
    setPasswordForm(emptyPasswordForm);
    setBanner(null);
  };

  const handleSave = (section) => {
    if (section === 'security') {
      const passwordValidationError = validatePasswordForm(passwordForm);

      if (passwordValidationError) {
        setBanner({
          type: 'error',
          text: passwordValidationError,
        });
        return;
      }
    }

    const nextSettings = cloneSettings(savedSettings);

    nextSettings[section] = {
      ...draftSettings[section],
    };

    if (section === 'security' && passwordForm.newPassword) {
      nextSettings.security.lastPasswordUpdatedLabel = formatPasswordDateLabel(new Date().toISOString());
    }

    nextSettings.meta.lastSavedAt = new Date().toISOString();

    persistStoredSettings(nextSettings);
    setSavedSettings(cloneSettings(nextSettings));
    setDraftSettings((current) => ({
      ...current,
      [section]: {
        ...nextSettings[section],
      },
      meta: {
        ...nextSettings.meta,
      },
    }));
    setPasswordForm(emptyPasswordForm);
    setBanner({
      type: 'success',
      text:
        section === 'security' && passwordForm.newPassword
          ? 'Security settings saved and password details updated.'
          : `${settingsTabs.find((tab) => tab.key === section)?.label ?? 'Settings'} saved successfully.`,
    });
  };

  const activeTabConfig = settingsTabs.find((tab) => tab.key === activeTab) ?? settingsTabs[0];
  const activeWorkflowAlerts = workflowNotificationSettings.filter(
    ({ key }) => draftSettings.notifications[key],
  ).length;
  const activeDeliveryChannels = channelNotificationSettings.filter(
    ({ key }) => draftSettings.notifications[key],
  ).length;

  return (
    <div className="staff-management-layout">
      <aside className="sidebar">{/* layout handled by parent */}</aside>
      <main className="main-content settings-page-content">
        <div className="header-row">
          <div>
            <h2>Settings</h2>
            <span className="subtitle">Manage HR staff preferences and account details</span>
          </div>
          <NotificationIcon />
        </div>

        <section className="settings-card">
          <div className="settings-hero">
            <div className="settings-hero-copy">
              <span className="settings-eyebrow">HR Staff Control Center</span>
              <h3>Replace shallow profile toggles with settings that actually run the workspace.</h3>
              <p>
                Manage account identity, password protection, notification routing, and the defaults used
                throughout recruitment, intern management, and document handling.
              </p>
            </div>

            <div className="settings-summary-grid">
              <div className="settings-summary-card">
                <span className="settings-summary-label">Security posture</span>
                <strong className="settings-summary-value">
                  {draftSettings.security.twoFactor ? 'Protected' : 'Needs review'}
                </strong>
                <span className="settings-summary-meta">
                  Password status: {draftSettings.security.lastPasswordUpdatedLabel}
                </span>
              </div>

              <div className="settings-summary-card">
                <span className="settings-summary-label">Alert coverage</span>
                <strong className="settings-summary-value">{activeWorkflowAlerts} workflow alerts</strong>
                <span className="settings-summary-meta">
                  {activeDeliveryChannels} delivery channels currently enabled
                </span>
              </div>

              <div className="settings-summary-card">
                <span className="settings-summary-label">Workspace defaults</span>
                <strong className="settings-summary-value">
                  {getOptionLabel(landingPageOptions, draftSettings.workspace.landingPage)} first
                </strong>
                <span className="settings-summary-meta">
                  Refresh: {getOptionLabel(refreshIntervalOptions, draftSettings.workspace.autoRefresh)}
                </span>
              </div>
            </div>
          </div>

          <div className="settings-tabs">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.key}
                  type="button"
                  className={`settings-tab ${activeTab === tab.key ? 'is-active' : ''}`}
                  onClick={() => selectTab(tab.key)}
                >
                  <Icon size={16} strokeWidth={2.1} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {banner ? (
            <div className={`settings-banner ${banner.type === 'error' ? 'is-error' : 'is-success'}`}>
              {banner.text}
            </div>
          ) : null}

          {activeTab === 'account' && (
            <div className="settings-panel">
              <div className="settings-panel-header">
                <div>
                  <h3>{activeTabConfig.label}</h3>
                  <p>{activeTabConfig.description}</p>
                </div>
                <span className="settings-last-saved">
                  Last saved {formatLastSavedLabel(draftSettings.meta.lastSavedAt)}
                </span>
              </div>

              <div className="settings-section">
                <div className="settings-section-body">
                  <div className="settings-profile-header">
                    <EmployeeAvatar
                      name={draftSettings.account.username}
                      src={currentHrStaffUser.avatar}
                      size={64}
                    />
                    <div>
                      <h3>{draftSettings.account.username}</h3>
                      <p>{draftSettings.account.email}</p>
                    </div>
                  </div>

                  <div className="settings-metadata-grid">
                    <div className="settings-metadata-card">
                      <span className="settings-metadata-label">Role</span>
                      <strong className="settings-metadata-value">{currentHrStaffUser.role}</strong>
                    </div>
                    <div className="settings-metadata-card">
                      <span className="settings-metadata-label">Mobile contact</span>
                      <strong className="settings-metadata-value">{draftSettings.account.mobileNumber}</strong>
                    </div>
                    <div className="settings-metadata-card">
                      <span className="settings-metadata-label">Latest save</span>
                      <strong className="settings-metadata-value">
                        {formatLastSavedLabel(draftSettings.meta.lastSavedAt)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <div className="settings-section-intro">
                  <div>
                    <h3>Identity and contact</h3>
                    <p>Keep the details used for notices, approvals, and account recovery up to date.</p>
                  </div>
                </div>

                <div className="settings-section-body">
                  <div className="settings-form-grid">
                    <label className="settings-field">
                      <span>User Name</span>
                      <input
                        name="username"
                        value={draftSettings.account.username}
                        onChange={handleAccountChange}
                      />
                    </label>
                    <label className="settings-field">
                      <span>Work Email</span>
                      <input
                        type="email"
                        name="email"
                        value={draftSettings.account.email}
                        onChange={handleAccountChange}
                      />
                    </label>
                    <label className="settings-field">
                      <span>First Name</span>
                      <input
                        name="firstName"
                        value={draftSettings.account.firstName}
                        onChange={handleAccountChange}
                      />
                    </label>
                    <label className="settings-field">
                      <span>Last Name</span>
                      <input
                        name="lastName"
                        value={draftSettings.account.lastName}
                        onChange={handleAccountChange}
                      />
                    </label>
                    <label className="settings-field">
                      <span>Mobile Number</span>
                      <input
                        name="mobileNumber"
                        value={draftSettings.account.mobileNumber}
                        onChange={handleAccountChange}
                      />
                    </label>
                    <div className="settings-field">
                      <span>Gender</span>
                      <SettingsDropdown
                        value={draftSettings.account.gender}
                        options={genderOptions}
                        onChange={(value) => updateSectionField('account', 'gender', value)}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button type="button" className="settings-secondary-btn" onClick={resetDraftSettings}>
                  Discard Changes
                </button>
                <button type="button" className="settings-primary-btn" onClick={() => handleSave('account')}>
                  Save Account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-panel">
              <div className="settings-panel-header">
                <div>
                  <h3>{activeTabConfig.label}</h3>
                  <p>{activeTabConfig.description}</p>
                </div>
                <span className="settings-last-saved">
                  Last saved {formatLastSavedLabel(draftSettings.meta.lastSavedAt)}
                </span>
              </div>

              <div className="settings-grid-two">
                <div className="settings-section">
                  <div className="settings-section-intro">
                    <div>
                      <h3>Password and session rules</h3>
                      <p>Change password details and set the recovery and timeout rules used by this account.</p>
                    </div>
                  </div>

                  <div className="settings-section-body">
                    <div className="settings-form-grid">
                      <label className="settings-field">
                        <span>Current Password</span>
                        <input
                          type="password"
                          name="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter current password"
                        />
                      </label>
                      <label className="settings-field">
                        <span>New Password</span>
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="At least 10 characters"
                        />
                      </label>
                      <label className="settings-field">
                        <span>Confirm New Password</span>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="Repeat the new password"
                        />
                      </label>
                      <div className="settings-field">
                        <span>Session Timeout</span>
                        <SettingsDropdown
                          value={draftSettings.security.sessionTimeout}
                          options={sessionTimeoutOptions}
                          onChange={(value) => updateSectionField('security', 'sessionTimeout', value)}
                          fullWidth
                        />
                      </div>
                      <div className="settings-field settings-field-wide">
                        <span>Recovery Channel</span>
                        <SettingsDropdown
                          value={draftSettings.security.recoveryChannel}
                          options={recoveryChannelOptions}
                          onChange={(value) => updateSectionField('security', 'recoveryChannel', value)}
                          fullWidth
                        />
                      </div>
                    </div>

                    <p className="settings-inline-note">
                      Use at least 10 characters, avoid reusing the current password, and rotate it whenever HR approvals are being handled by a new device.
                    </p>

                    <div className="settings-metadata-grid">
                      <div className="settings-metadata-card">
                        <span className="settings-metadata-label">Password status</span>
                        <strong className="settings-metadata-value">
                          {draftSettings.security.lastPasswordUpdatedLabel}
                        </strong>
                      </div>
                      <div className="settings-metadata-card">
                        <span className="settings-metadata-label">Recovery route</span>
                        <strong className="settings-metadata-value">
                          {getOptionLabel(recoveryChannelOptions, draftSettings.security.recoveryChannel)}
                        </strong>
                      </div>
                      <div className="settings-metadata-card">
                        <span className="settings-metadata-label">Timeout rule</span>
                        <strong className="settings-metadata-value">
                          {getOptionLabel(sessionTimeoutOptions, draftSettings.security.sessionTimeout)}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <div className="settings-section-intro">
                    <div>
                      <h3>Access protection</h3>
                      <p>Require stronger confirmation for sign-ins and sensitive record changes.</p>
                    </div>
                  </div>

                  {securityToggleSettings.map((item) => (
                    <div key={item.key} className="settings-row">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <button
                        type="button"
                        className={`settings-toggle ${draftSettings.security[item.key] ? 'is-enabled' : ''}`}
                        onClick={() => toggleSectionField('security', item.key)}
                        aria-pressed={draftSettings.security[item.key]}
                        aria-label={item.title}
                      >
                        <span className="settings-toggle-knob" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="settings-actions">
                <button type="button" className="settings-secondary-btn" onClick={resetDraftSettings}>
                  Discard Changes
                </button>
                <button type="button" className="settings-primary-btn" onClick={() => handleSave('security')}>
                  Save Security
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-panel">
              <div className="settings-panel-header">
                <div>
                  <h3>{activeTabConfig.label}</h3>
                  <p>{activeTabConfig.description}</p>
                </div>
                <span className="settings-last-saved">
                  Last saved {formatLastSavedLabel(draftSettings.meta.lastSavedAt)}
                </span>
              </div>

              <div className="settings-grid-two">
                <div className="settings-section">
                  <div className="settings-section-intro">
                    <div>
                      <h3>Workflow alerts</h3>
                      <p>Choose which HR workflows should interrupt you when something needs action.</p>
                    </div>
                  </div>

                  {workflowNotificationSettings.map((item) => (
                    <div key={item.key} className="settings-row">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <button
                        type="button"
                        className={`settings-toggle ${draftSettings.notifications[item.key] ? 'is-enabled' : ''}`}
                        onClick={() => toggleSectionField('notifications', item.key)}
                        aria-pressed={draftSettings.notifications[item.key]}
                        aria-label={item.title}
                      >
                        <span className="settings-toggle-knob" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="settings-section">
                  <div className="settings-section-intro">
                    <div>
                      <h3>Delivery channels</h3>
                      <p>Decide how updates reach you and when the system should stay quiet.</p>
                    </div>
                  </div>

                  {channelNotificationSettings.map((item) => (
                    <div key={item.key} className="settings-row">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <button
                        type="button"
                        className={`settings-toggle ${draftSettings.notifications[item.key] ? 'is-enabled' : ''}`}
                        onClick={() => toggleSectionField('notifications', item.key)}
                        aria-pressed={draftSettings.notifications[item.key]}
                        aria-label={item.title}
                      >
                        <span className="settings-toggle-knob" />
                      </button>
                    </div>
                  ))}

                  <div className="settings-row">
                    <div>
                      <h3>Digest Frequency</h3>
                      <p>Control how often summary alerts are grouped together.</p>
                    </div>
                    <div className="settings-row-control">
                      <SettingsDropdown
                        value={draftSettings.notifications.digestFrequency}
                        options={digestFrequencyOptions}
                        onChange={(value) => updateSectionField('notifications', 'digestFrequency', value)}
                        wide
                      />
                    </div>
                  </div>

                  <div className="settings-row">
                    <div>
                      <h3>Quiet Hours</h3>
                      <p>Reduce non-urgent updates during off hours or overnight windows.</p>
                    </div>
                    <div className="settings-row-control">
                      <SettingsDropdown
                        value={draftSettings.notifications.quietHours}
                        options={quietHoursOptions}
                        onChange={(value) => updateSectionField('notifications', 'quietHours', value)}
                        wide
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button type="button" className="settings-secondary-btn" onClick={resetDraftSettings}>
                  Discard Changes
                </button>
                <button
                  type="button"
                  className="settings-primary-btn"
                  onClick={() => handleSave('notifications')}
                >
                  Save Notifications
                </button>
              </div>
            </div>
          )}

          {activeTab === 'workspace' && (
            <div className="settings-panel">
              <div className="settings-panel-header">
                <div>
                  <h3>{activeTabConfig.label}</h3>
                  <p>{activeTabConfig.description}</p>
                </div>
                <span className="settings-last-saved">
                  Last saved {formatLastSavedLabel(draftSettings.meta.lastSavedAt)}
                </span>
              </div>

              <div className="settings-grid-two">
                <div className="settings-section">
                  <div className="settings-section-intro">
                    <div>
                      <h3>Display and routing defaults</h3>
                      <p>Choose the view, refresh, and date standards that shape your daily HR workflow.</p>
                    </div>
                  </div>

                  <div className="settings-row">
                    <div>
                      <h3>Appearance</h3>
                      <p>Control the theme shown across the HR staff workspace. Changes preview immediately until you save or reset.</p>
                    </div>
                    <div className="settings-row-control">
                      <SettingsDropdown
                        value={draftSettings.workspace.appearance}
                        options={appearanceOptions}
                        onChange={(value) => updateSectionField('workspace', 'appearance', value)}
                      />
                    </div>
                  </div>

                  <div className="settings-row">
                    <div>
                      <h3>Date and Time Format</h3>
                      <p>Choose the date format used in records, reports, and queues.</p>
                    </div>
                    <div className="settings-row-control">
                      <SettingsDropdown
                        value={draftSettings.workspace.dateFormat}
                        options={dateFormatOptions}
                        onChange={(value) => updateSectionField('workspace', 'dateFormat', value)}
                        wide
                      />
                    </div>
                  </div>

                  <div className="settings-row">
                    <div>
                      <h3>Default Landing Page</h3>
                      <p>Choose which HR staff page opens first when entering the portal.</p>
                    </div>
                    <div className="settings-row-control">
                      <SettingsDropdown
                        value={draftSettings.workspace.landingPage}
                        options={landingPageOptions}
                        onChange={(value) => updateSectionField('workspace', 'landingPage', value)}
                        wide
                      />
                    </div>
                  </div>

                  <div className="settings-row">
                    <div>
                      <h3>Refresh Interval</h3>
                      <p>Set how often data-heavy HR pages refresh automatically.</p>
                    </div>
                    <div className="settings-row-control">
                      <SettingsDropdown
                        value={draftSettings.workspace.autoRefresh}
                        options={refreshIntervalOptions}
                        onChange={(value) => updateSectionField('workspace', 'autoRefresh', value)}
                        wide
                      />
                    </div>
                  </div>

                  <div className="settings-row">
                    <div>
                      <h3>Table Density</h3>
                      <p>Adjust how much information fits into list-heavy HR views.</p>
                    </div>
                    <div className="settings-row-control">
                      <SettingsDropdown
                        value={draftSettings.workspace.density}
                        options={densityOptions}
                        onChange={(value) => updateSectionField('workspace', 'density', value)}
                      />
                    </div>
                  </div>

                  <div className="settings-row">
                    <div>
                      <h3>Week Starts On</h3>
                      <p>Set the weekday used first in scheduling and attendance views.</p>
                    </div>
                    <div className="settings-row-control">
                      <SettingsDropdown
                        value={draftSettings.workspace.weekStart}
                        options={weekStartOptions}
                        onChange={(value) => updateSectionField('workspace', 'weekStart', value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <div className="settings-section-intro">
                    <div>
                      <h3>Interaction rules</h3>
                      <p>Fine-tune how the workspace behaves while reviewing high-volume HR tasks.</p>
                    </div>
                  </div>

                  {workspaceToggleSettings.map((item) => (
                    <div key={item.key} className="settings-row">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <button
                        type="button"
                        className={`settings-toggle ${draftSettings.workspace[item.key] ? 'is-enabled' : ''}`}
                        onClick={() => toggleSectionField('workspace', item.key)}
                        aria-pressed={draftSettings.workspace[item.key]}
                        aria-label={item.title}
                      >
                        <span className="settings-toggle-knob" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="settings-actions">
                <button type="button" className="settings-secondary-btn" onClick={resetDraftSettings}>
                  Discard Changes
                </button>
                <button type="button" className="settings-primary-btn" onClick={() => handleSave('workspace')}>
                  Save Workspace
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;