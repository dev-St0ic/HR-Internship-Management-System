export const LOG_TYPES = {
  TIME_IN: "TIME_IN",
  TIME_OUT: "TIME_OUT",
  TASK_ASSIGNED: "TASK_ASSIGNED",
  DOCUMENT_SUBMITTED: "DOCUMENT_SUBMITTED",
  ATTENDANCE_REQUEST: "ATTENDANCE_REQUEST",
  DOCUMENT_REQUEST: "DOCUMENT_REQUEST",
  EVALUATION_COMPLETED: "EVALUATION_COMPLETED",
  APPLICATION_SUBMITTED: "APPLICATION_SUBMITTED",
  DTR_SUBMITTED: "DTR_SUBMITTED",
  NEW_UNIVERSITY: "NEW_UNIVERSITY",
  NEW_INTERN: "NEW_INTERN",
  INTERN_COMPLETED: "INTERN_COMPLETED",
  MOA_UPLOADED: "MOA_UPLOADED",
  MOA_EXPIRING: "MOA_EXPIRING",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const addSystemLog = (log) => {
  const existingLogs =
    JSON.parse(localStorage.getItem("hrims_system_logs")) || [];

  const newLog = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    timestamp: new Date().toLocaleString(),

    //Who did the action
    actorId: log.actorId || null,
    actorName: log.actorName || "Unknown",
    actorRole: log.actorRole || "Unknown",
    user: log.actorName || "Unknown",
    role: log.actorRole || "Unknown",
    action: log.action || "SYSTEM_ACTIVITY",
    type: log.action || "SYSTEM_ACTIVITY",
    title: log.title || log.action || "System Activity",
    description: log.description || "Activity recorded.",

    //Who should see it in the recent activity
    audience: log.audience || [],

    //optional relationships
    supervisorId: log.supervisorId || null,
    internId: log.internId || null,

    //Extra details if needed
    metadata: log.metadata || {},
  };

  localStorage.setItem(
    "hrims_system_logs",
    JSON.stringify([newLog, ...existingLogs]),
  );
};

export const getSystemLogs = () => {
  return JSON.parse(localStorage.getItem("hrims_system_logs")) || [];
};
