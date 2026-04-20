import { Link } from 'react-router-dom';

export default function ShortcutButton({ item, compact = false }) {
  return (
    <Link to={item.to} className={`hr-dashboard-shortcut-button ${compact ? 'is-compact' : ''} ${item.toneKey ? `is-${item.toneKey}` : ''}`}><span className="hr-dashboard-shortcut-icon-shell"><img src={item.icon} alt="" aria-hidden="true" className="hr-dashboard-icon" /></span><div className="hr-dashboard-shortcut-copy"><div className="hr-dashboard-shortcut-topline"><h3>{item.title}</h3>{item.badge ? <span className={item.toneKey ? `hr-dashboard-status-pill is-${item.toneKey}` : 'hr-dashboard-badge'}>{item.badge}</span> : null}</div>{item.meta ? <span className="hr-dashboard-shortcut-meta">{item.meta}</span> : null}{item.description ? <p>{item.description}</p> : null}</div></Link>
  );
}