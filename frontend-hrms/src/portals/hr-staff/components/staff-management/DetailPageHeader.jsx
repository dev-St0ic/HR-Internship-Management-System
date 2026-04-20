import { Link } from 'react-router-dom';

import NotificationIcon from './NotificationIcon';

export default function DetailPageHeader({ title, breadcrumbs }) {
  return (
    <div className="header-row">
      <div>
        <h2>{title}</h2>
        <div className="subtitle">
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`}>
              {crumb.to ? <Link className="subtitle-link" to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
              {index < breadcrumbs.length - 1 ? <span className="subtitle-separator"> &gt; </span> : null}
            </span>
          ))}
        </div>
      </div>
      <NotificationIcon />
    </div>
  );
}