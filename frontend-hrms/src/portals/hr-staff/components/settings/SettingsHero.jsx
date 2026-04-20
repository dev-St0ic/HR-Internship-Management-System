export default function SettingsHero({ draftSettings, workflowAlerts, deliveryChannels, landingPageLabel, refreshLabel }) {
  return (
    <div className="settings-hero">
      <div className="settings-hero-copy">
        <span className="settings-eyebrow">HR Staff Control Center</span>
        <h3>Replace shallow profile toggles with settings that actually run the workspace.</h3>
        <p>Manage account identity, password protection, notification routing, and the defaults used throughout recruitment, intern management, and document handling.</p>
      </div>
      <div className="settings-summary-grid">
        <div className="settings-summary-card"><span className="settings-summary-label">Security posture</span><strong className="settings-summary-value">{draftSettings.security.twoFactor ? 'Protected' : 'Needs review'}</strong><span className="settings-summary-meta">Password status: {draftSettings.security.lastPasswordUpdatedLabel}</span></div>
        <div className="settings-summary-card"><span className="settings-summary-label">Alert coverage</span><strong className="settings-summary-value">{workflowAlerts} workflow alerts</strong><span className="settings-summary-meta">{deliveryChannels} delivery channels currently enabled</span></div>
        <div className="settings-summary-card"><span className="settings-summary-label">Workspace defaults</span><strong className="settings-summary-value">{landingPageLabel} first</strong><span className="settings-summary-meta">Refresh: {refreshLabel}</span></div>
      </div>
    </div>
  );
}