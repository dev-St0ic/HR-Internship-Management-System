import SettingsActions from './SettingsActions';
import SettingsPanelHeader from './SettingsPanelHeader';
import SettingsSelectRow from './SettingsSelectRow';
import SettingsToggleRow from './SettingsToggleRow';
import { formatLastSavedLabel } from '../../utils/settings/helpers';

export default function NotificationsSettingsPanel({ config, draftSettings, workflowNotificationSettings, channelNotificationSettings, digestFrequencyOptions, quietHoursOptions, onFieldChange, onToggle, onReset, onSave }) {
  const notifications = draftSettings.notifications;
  return (
    <div className="settings-panel">
      <SettingsPanelHeader config={config} lastSavedLabel={formatLastSavedLabel(draftSettings.meta.lastSavedAt)} />
      <div className="settings-grid-two"><div className="settings-section"><div className="settings-section-intro"><div><h3>Workflow alerts</h3><p>Choose which HR workflows should interrupt you when something needs action.</p></div></div>{workflowNotificationSettings.map((item) => <SettingsToggleRow key={item.key} title={item.title} description={item.description} enabled={notifications[item.key]} onToggle={() => onToggle('notifications', item.key)} />)}</div><div className="settings-section"><div className="settings-section-intro"><div><h3>Delivery channels</h3><p>Decide how updates reach you and when the system should stay quiet.</p></div></div>{channelNotificationSettings.map((item) => <SettingsToggleRow key={item.key} title={item.title} description={item.description} enabled={notifications[item.key]} onToggle={() => onToggle('notifications', item.key)} />)}<SettingsSelectRow title="Digest Frequency" description="Control how often summary alerts are grouped together." value={notifications.digestFrequency} options={digestFrequencyOptions} onChange={(value) => onFieldChange('notifications', 'digestFrequency', value)} wide /><SettingsSelectRow title="Quiet Hours" description="Reduce non-urgent updates during off hours or overnight windows." value={notifications.quietHours} options={quietHoursOptions} onChange={(value) => onFieldChange('notifications', 'quietHours', value)} wide /></div></div>
      <SettingsActions onReset={onReset} onSave={onSave} saveLabel="Save Notifications" />
    </div>
  );
}