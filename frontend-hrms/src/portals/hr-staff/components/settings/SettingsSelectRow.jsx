import SettingsDropdown from './SettingsDropdown';

export default function SettingsSelectRow({ title, description, value, options, onChange, wide = false }) {
  return (
    <div className="settings-row">
      <div><h3>{title}</h3><p>{description}</p></div>
      <div className="settings-row-control"><SettingsDropdown value={value} options={options} onChange={onChange} wide={wide} /></div>
    </div>
  );
}