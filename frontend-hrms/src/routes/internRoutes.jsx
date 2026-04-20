import { Route } from 'react-router-dom';

import SettingsPage from '../common/components/layout/SettingsPage';
import InternLayout from '../portals/interns/layouts/InternLayout';
import Attendance from '../portals/interns/pages/Attendance';
import InternCalendarPage from '../portals/interns/pages/InternCalendarPage';
import InternDashboard from '../portals/interns/pages/InternDashboard';
import Documents from '../portals/interns/pages/Documents';
import Evaluation from '../portals/interns/pages/Evaluation';
import NotificationsPage from '../portals/interns/pages/InternNotificationPage';
import Profile from '../portals/interns/pages/Profile';
import Tasks from '../portals/interns/pages/Tasks';

export function renderInternRoutes() {
  return (
    <Route path="/intern" element={<InternLayout />}>
      <Route index element={<InternDashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="attendance" element={<Attendance />} />
      <Route path="documents" element={<Documents />} />
      <Route path="evaluation" element={<Evaluation />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="calendar" element={<InternCalendarPage />} />
    </Route>
  );
}