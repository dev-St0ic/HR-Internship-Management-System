export default function SettingsTabs({ tabs, activeTab, onSelect }) {
  return (
    <div className="settings-tabs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return <button key={tab.key} type="button" className={`settings-tab ${activeTab === tab.key ? 'is-active' : ''}`} onClick={() => onSelect(tab.key)}><Icon size={16} strokeWidth={2.1} /><span>{tab.label}</span></button>;
      })}
    </div>
  );
}