import NotificationIcon from '../components/staff-management/NotificationIcon';
import AccountSettingsPanel from '../components/settings/AccountSettingsPanel';
import NotificationsSettingsPanel from '../components/settings/NotificationsSettingsPanel';
import SecuritySettingsPanel from '../components/settings/SecuritySettingsPanel';
import SettingsHero from '../components/settings/SettingsHero';
import SettingsTabs from '../components/settings/SettingsTabs';
import WorkspaceSettingsPanel from '../components/settings/WorkspaceSettingsPanel';
import '../../../assets/styles/staff-management.css';
import { densityOptions, digestFrequencyOptions, appearanceOptions, dateFormatOptions, genderOptions, landingPageOptions, quietHoursOptions, recoveryChannelOptions, refreshIntervalOptions, sessionTimeoutOptions, weekStartOptions } from '../utils/settings/options';
import { channelNotificationSettings, securityToggleSettings, settingsTabs, workflowNotificationSettings, workspaceToggleSettings } from '../utils/settings/sections';
import { getOptionLabel } from '../utils/settings/helpers';
import { useSettingsPageState } from '../utils/settings/useSettingsPageState';

export default function SettingsPage() {
  const state = useSettingsPageState();
  const activeTabConfig = settingsTabs.find((tab) => tab.key === state.activeTab) ?? settingsTabs[0];
  const workflowAlerts = workflowNotificationSettings.filter(({ key }) => state.draftSettings.notifications[key]).length;
  const deliveryChannels = channelNotificationSettings.filter(({ key }) => state.draftSettings.notifications[key]).length;
  const commonPanelProps = { config: activeTabConfig, draftSettings: state.draftSettings, onReset: state.resetDraftSettings };
  const panels = {
    account: <AccountSettingsPanel {...commonPanelProps} genderOptions={genderOptions} onAccountChange={state.handleAccountChange} onFieldChange={state.updateSectionField} onSave={() => state.handleSave('account', activeTabConfig.label)} />,
    security: <SecuritySettingsPanel {...commonPanelProps} passwordForm={state.passwordForm} securityToggleSettings={securityToggleSettings} sessionTimeoutOptions={sessionTimeoutOptions} recoveryChannelOptions={recoveryChannelOptions} onPasswordChange={state.handlePasswordChange} onFieldChange={state.updateSectionField} onToggle={state.toggleSectionField} onSave={() => state.handleSave('security', activeTabConfig.label)} />,
    notifications: <NotificationsSettingsPanel {...commonPanelProps} workflowNotificationSettings={workflowNotificationSettings} channelNotificationSettings={channelNotificationSettings} digestFrequencyOptions={digestFrequencyOptions} quietHoursOptions={quietHoursOptions} onFieldChange={state.updateSectionField} onToggle={state.toggleSectionField} onSave={() => state.handleSave('notifications', activeTabConfig.label)} />,
    workspace: <WorkspaceSettingsPanel {...commonPanelProps} appearanceOptions={appearanceOptions} dateFormatOptions={dateFormatOptions} landingPageOptions={landingPageOptions} refreshIntervalOptions={refreshIntervalOptions} densityOptions={densityOptions} weekStartOptions={weekStartOptions} workspaceToggleSettings={workspaceToggleSettings} onFieldChange={state.updateSectionField} onToggle={state.toggleSectionField} onSave={() => state.handleSave('workspace', activeTabConfig.label)} />,
  };

  return (
    <div className="staff-management-layout"><aside className="sidebar">{/* layout handled by parent */}</aside><main className="main-content settings-page-content"><div className="header-row"><div><h2>Settings</h2><span className="subtitle">Manage HR staff preferences and account details</span></div><NotificationIcon /></div><section className="settings-card"><SettingsHero draftSettings={state.draftSettings} workflowAlerts={workflowAlerts} deliveryChannels={deliveryChannels} landingPageLabel={getOptionLabel(landingPageOptions, state.draftSettings.workspace.landingPage)} refreshLabel={getOptionLabel(refreshIntervalOptions, state.draftSettings.workspace.autoRefresh)} /><SettingsTabs tabs={settingsTabs} activeTab={state.activeTab} onSelect={state.selectTab} />{state.banner ? <div className={`settings-banner ${state.banner.type === 'error' ? 'is-error' : 'is-success'}`}>{state.banner.text}</div> : null}{panels[state.activeTab]}</section></main></div>
  );
}