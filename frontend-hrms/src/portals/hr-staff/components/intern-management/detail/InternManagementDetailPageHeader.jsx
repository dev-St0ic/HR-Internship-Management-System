import { Link } from 'react-router-dom';

import NotificationIcon from '../../staff-management/NotificationIcon';

export default function InternManagementDetailPageHeader({ internName, subtitleSummary }) {
  return (
    <div className="header-row">
      <div>
        <h2>{internName}</h2>
        <div className="subtitle"><Link className="subtitle-link" to="/hr-staff/intern-management">Intern Management</Link><span className="subtitle-separator"> &gt; </span><span>{subtitleSummary}</span></div>
      </div>
      <NotificationIcon />
    </div>
  );
}