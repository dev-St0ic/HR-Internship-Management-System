import { legacyTabMap, settingsTabs } from './sections';

export function getRequestedTab(searchParams) {
  const requestedTab = searchParams.get('tab');
  if (!requestedTab) return 'account';
  if (legacyTabMap[requestedTab]) return legacyTabMap[requestedTab];
  return settingsTabs.some((tab) => tab.key === requestedTab) ? requestedTab : 'account';
}

export function getOptionLabel(options, value) {
  return options.find((option) => option.value === value)?.label ?? options[0]?.label ?? '';
}

export function formatLastSavedLabel(value) {
  if (!value) return 'Not saved yet';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

export function formatPasswordDateLabel(value) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export function validatePasswordForm(passwordForm) {
  const hasAnyPasswordInput = Object.values(passwordForm).some((value) => value.trim().length > 0);
  if (!hasAnyPasswordInput) return null;
  if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) return 'Complete all password fields before saving security changes.';
  if (passwordForm.newPassword.length < 10) return 'New password must be at least 10 characters long.';
  if (passwordForm.newPassword === passwordForm.currentPassword) return 'New password must be different from the current password.';
  if (passwordForm.newPassword !== passwordForm.confirmPassword) return 'New password and confirm password do not match.';
  return null;
}