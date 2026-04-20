import ShortcutButton from './ShortcutButton';

export default function DashboardWorkspacePanel({ quickActions, queueLinks }) {
  return (
    <section className="hr-dashboard-panel"><div className="hr-dashboard-section-heading"><div><h3>Workspace launcher</h3><p>Use the core shortcuts below to jump into the main workflows and the records that currently need action.</p></div></div><div className="hr-dashboard-workspace-groups"><div className="hr-dashboard-workspace-group"><div className="hr-dashboard-workspace-group-heading"><h4>Quick actions</h4><p>Main HR staff workspaces.</p></div><div className="hr-dashboard-toolbar-grid">{quickActions.map((action) => <ShortcutButton key={action.key} item={action} compact />)}</div></div><div className="hr-dashboard-workspace-group"><div className="hr-dashboard-workspace-group-heading"><h4>Attention queues</h4><p>Open the records that currently need action.</p></div><div className="hr-dashboard-toolbar-grid">{queueLinks.map((queue) => <ShortcutButton key={queue.key} item={queue} compact />)}</div></div></div></section>
  );
}