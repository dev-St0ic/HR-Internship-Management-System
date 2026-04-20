import React from 'react';
import { Link } from 'react-router-dom';

const NotificationIcon = () => (
  <Link to="/hr-staff/notifications" className="notification-icon" aria-label="View notifications">
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  </Link>
);

export default NotificationIcon;
