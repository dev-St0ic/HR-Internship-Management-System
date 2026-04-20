const createColumn = (key, label, width, minWidth, sortable = true, resizable = true) => ({ key, label, width, minWidth, sortable, resizable });
const createWidthMap = (columns) => columns.reduce((widths, column) => ({ ...widths, [column.key]: column.width }), {});

export const internsTableColumns = [
  createColumn('internName', 'Intern Name', 280, 220),
  createColumn('internId', 'Intern ID', 170, 140),
  createColumn('university', 'University', 320, 220),
  createColumn('department', 'Department', 210, 170),
  createColumn('startedAt', 'Started at', 180, 150),
  createColumn('action', 'Action', 110, 96, false, false),
];

export const attendanceRequestsTableColumns = [
  createColumn('internName', 'Intern Name', 280, 220),
  createColumn('date', 'Date', 150, 130),
  createColumn('issueType', 'Issue Type', 220, 180),
  createColumn('dateRequested', 'Date Requested', 180, 150),
  createColumn('status', 'Status', 130, 110),
  createColumn('action', 'Action', 110, 96, false, false),
];

export const initialSortConfig = {
  interns: { key: 'startedAt', direction: 'desc' },
  'attendance-requests': { key: 'dateRequested', direction: 'desc' },
};

export const createInitialColumnWidths = () => ({
  interns: createWidthMap(internsTableColumns),
  'attendance-requests': createWidthMap(attendanceRequestsTableColumns),
});