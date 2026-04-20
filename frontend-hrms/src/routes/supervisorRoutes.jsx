import { Route } from 'react-router-dom';

import { SupervisorAttendance, SupervisorDashboard, SupervisorEvaluations, SupervisorLayout, SupervisorMyInterns, SupervisorNotifications, SupervisorSettings, SupervisorTasks } from '../portals/supervisor/Index';

export function renderSupervisorRoutes() {
  return (
    <Route path="/supervisor" element={<SupervisorLayout />}>
      <Route index element={<SupervisorDashboard />} />
      <Route path="myinterns" element={<SupervisorMyInterns />} />
      <Route path="attendance" element={<SupervisorAttendance />} />
      <Route path="tasks" element={<SupervisorTasks />} />
      <Route path="evaluations" element={<SupervisorEvaluations />} />
      <Route path="settings" element={<SupervisorSettings />} />
      <Route path="notifications" element={<SupervisorNotifications />} />
    </Route>
  );
}