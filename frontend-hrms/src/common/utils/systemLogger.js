export const LOG_TYPES = {
  TIME_IN: "TIME_IN",
  TIME_OUT: "TIME_OUT",
  TASK_ASSIGNED: "TASK_ASSIGNED",
  DOCUMENT_SUBMITTED: "DOCUMENT_SUBMITTED:",
  ATTENDANCE_REQUEST: "ATTENDANCE_REQUEST",
  DOCUMENT_REQUEST: "DOCUMENT_REQUEST",
  EVALUATION_COMPLETED: "EVALUATION_COMPLETED",
  APPLICATION_SUBMITTED: "EVALUATION_COMPLETED",
  DTR_SUBMITTED: "EVALUATION_COMPLETED",
  MOA_UPLOADED: "MOA_UPLOADED",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const addSystemLog = (log) => {
  const existingLogs =
    JSON.parse(localStorage.getItem("hrims_system_logs")) || [];

  const newLog = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),

    //Who did the action
    actorId: log.actorId || null,
    actorName: log.actorName || "Unknown",
    actorRole: log.actorRole || "Unknown",

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
