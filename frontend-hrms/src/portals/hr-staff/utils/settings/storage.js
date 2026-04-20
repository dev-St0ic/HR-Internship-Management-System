import { currentHrStaffUser } from '../../data/currentHrStaffUser';
import { SETTINGS_STORAGE_KEY, STORE_SCHEMA_VERSION } from './sections';

function mergeSettings(defaultSettings, storedSettings = {}) {
  return {
    account: { ...defaultSettings.account, ...storedSettings.account },
    security: { ...defaultSettings.security, ...storedSettings.security },
    notifications: { ...defaultSettings.notifications, ...storedSettings.notifications },
    workspace: { ...defaultSettings.workspace, ...storedSettings.workspace },
    meta: { ...defaultSettings.meta, ...storedSettings.meta },
  };
}

export function createDefaultSettings() {
  return {
    account: { username: currentHrStaffUser.name, email: currentHrStaffUser.email, firstName: currentHrStaffUser.firstName, lastName: currentHrStaffUser.lastName, mobileNumber: currentHrStaffUser.mobileNumber, gender: currentHrStaffUser.gender },
    security: { twoFactor: true, signInAlerts: true, approvalConfirmation: true, sessionTimeout: '30', recoveryChannel: 'work-email', lastPasswordUpdatedLabel: 'No recorded change yet' },
    notifications: { recruitmentFeed: true, applicationReviews: true, documentReviews: true, attendanceRequests: true, staffUpdates: false, desktop: true, mobilePush: true, emailDigest: true, weeklySummary: false, digestFrequency: 'daily', quietHours: 'after-hours' },
    workspace: { appearance: 'light', dateFormat: 'ymd24', density: 'comfortable', landingPage: 'dashboard', autoRefresh: '15', weekStart: 'monday', compactTables: false, reduceMotion: false, rememberFilters: true },
    meta: { lastSavedAt: null },
  };
}

export function cloneSettings(settings) {
  return mergeSettings(settings, {});
}

export function readStoredSettings() {
  const defaultSettings = createDefaultSettings();
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const storedValue = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!storedValue) return defaultSettings;
    const parsedValue = JSON.parse(storedValue);
    return !parsedValue || parsedValue.version !== STORE_SCHEMA_VERSION || !parsedValue.settings ? defaultSettings : mergeSettings(defaultSettings, parsedValue.settings);
  } catch {
    return defaultSettings;
  }
}

export function persistStoredSettings(settings) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ version: STORE_SCHEMA_VERSION, settings }));
}