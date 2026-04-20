import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useTheme } from '../../../../common/theme/ThemeProvider';
import { emptyPasswordForm } from './options';
import { cloneSettings, persistStoredSettings, readStoredSettings } from './storage';
import { formatPasswordDateLabel, getRequestedTab, validatePasswordForm } from './helpers';

export function useSettingsPageState() {
  const { setThemePreference } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedSettings, setSavedSettings] = useState(readStoredSettings);
  const [draftSettings, setDraftSettings] = useState(() => cloneSettings(readStoredSettings()));
  const [passwordForm, setPasswordForm] = useState(emptyPasswordForm);
  const [banner, setBanner] = useState(null);
  const savedThemePreferenceRef = useRef(savedSettings.workspace.appearance);
  const activeTab = getRequestedTab(searchParams);

  useEffect(() => { if (!banner) return undefined; const timeout = window.setTimeout(() => setBanner(null), 3600); return () => window.clearTimeout(timeout); }, [banner]);
  useEffect(() => { savedThemePreferenceRef.current = savedSettings.workspace.appearance; }, [savedSettings.workspace.appearance]);
  useEffect(() => { setThemePreference(draftSettings.workspace.appearance); }, [draftSettings.workspace.appearance, setThemePreference]);
  useEffect(() => () => setThemePreference(savedThemePreferenceRef.current), [setThemePreference]);

  const selectTab = (tab) => tab === 'account'
    ? searchParams.has('tab') && setSearchParams({}, { replace: true })
    : tab !== activeTab && setSearchParams((current) => { const next = new URLSearchParams(current); next.set('tab', tab); return next; }, { replace: true });
  const updateSectionField = (section, key, value) => setDraftSettings((current) => ({ ...current, [section]: { ...current[section], [key]: value } }));
  const toggleSectionField = (section, key) => setDraftSettings((current) => ({ ...current, [section]: { ...current[section], [key]: !current[section][key] } }));
  const handleAccountChange = ({ target: { name, value } }) => updateSectionField('account', name, value);
  const handlePasswordChange = ({ target: { name, value } }) => setPasswordForm((current) => ({ ...current, [name]: value }));
  const resetDraftSettings = () => { setDraftSettings(cloneSettings(savedSettings)); setPasswordForm(emptyPasswordForm); setBanner(null); };

  const handleSave = (section, successLabel) => {
    const passwordError = section === 'security' ? validatePasswordForm(passwordForm) : null;
    if (passwordError) return setBanner({ type: 'error', text: passwordError });
    const nextSettings = cloneSettings(savedSettings);
    nextSettings[section] = { ...draftSettings[section] };
    if (section === 'security' && passwordForm.newPassword) nextSettings.security.lastPasswordUpdatedLabel = formatPasswordDateLabel(new Date().toISOString());
    nextSettings.meta.lastSavedAt = new Date().toISOString();
    persistStoredSettings(nextSettings); setSavedSettings(cloneSettings(nextSettings));
    setDraftSettings((current) => ({ ...current, [section]: { ...nextSettings[section] }, meta: { ...nextSettings.meta } }));
    setPasswordForm(emptyPasswordForm); setBanner({ type: 'success', text: section === 'security' && passwordForm.newPassword ? 'Security settings saved and password details updated.' : `${successLabel} saved successfully.` });
  };

  return { activeTab, draftSettings, passwordForm, banner, selectTab, updateSectionField, toggleSectionField, handleAccountChange, handlePasswordChange, resetDraftSettings, handleSave };
}