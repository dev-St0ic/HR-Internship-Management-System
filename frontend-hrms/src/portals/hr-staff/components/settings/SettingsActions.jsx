export default function SettingsActions({ onReset, onSave, saveLabel }) {
  return (
    <div className="settings-actions">
      <button type="button" className="settings-secondary-btn" onClick={onReset}>Discard Changes</button>
      <button type="button" className="settings-primary-btn" onClick={onSave}>{saveLabel}</button>
    </div>
  );
}