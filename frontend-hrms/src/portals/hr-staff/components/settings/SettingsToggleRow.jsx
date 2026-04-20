export default function SettingsToggleRow({ title, description, enabled, onToggle }) {
  return (
    <div className="settings-row">
      <div><h3>{title}</h3><p>{description}</p></div>
      <button type="button" className={`settings-toggle ${enabled ? 'is-enabled' : ''}`} onClick={onToggle} aria-pressed={enabled} aria-label={title}><span className="settings-toggle-knob" /></button>
    </div>
  );
}