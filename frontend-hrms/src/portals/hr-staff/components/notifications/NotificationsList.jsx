import EmployeeAvatar from '../staff-management/EmployeeAvatar';

export default function NotificationsList({ notifications, now, formatRelativeTime }) {
  return (
    <section className="notifications-card">
      {notifications.length > 0 ? notifications.map((notification) => (
        <article key={notification.id} className="notification-row-card">
          <div className="notification-row-main">
            <EmployeeAvatar src={notification.avatar} alt={notification.name} name={notification.name} size={40} />
            <div className="notification-row-copy"><div className="notification-row-heading"><h3>{notification.title}</h3>{notification.unread ? <span className="notification-unread-dot" aria-hidden="true" /> : null}</div><p>{notification.message}</p></div>
          </div>
          <time className="notification-row-time">{formatRelativeTime(notification.timestamp, now)}</time>
        </article>
      )) : <div className="notifications-empty-state">No new notifications.</div>}
    </section>
  );
}