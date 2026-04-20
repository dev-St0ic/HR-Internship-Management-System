export default function SettingsPanelHeader({ config, lastSavedLabel }) {
  return (
    <div className="settings-panel-header">
      <div><h3>{config.label}</h3><p>{config.description}</p></div>
      <span className="settings-last-saved">Last saved {lastSavedLabel}</span>
    </div>
  );
}