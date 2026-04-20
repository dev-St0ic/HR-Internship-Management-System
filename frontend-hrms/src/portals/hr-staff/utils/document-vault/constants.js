export const statusClassNameMap = { Verified: 'is-verified', Pending: 'is-pending', 'For Review': 'is-review' };
export const documentVaultStatuses = ['Pending', 'For Review', 'Verified'];
export const documentVaultColumns = [
  { key: 'fileName', label: 'File Name', width: 360, minWidth: 260, resizable: true, sortable: true },
  { key: 'internName', label: 'Intern Name', width: 190, minWidth: 150, resizable: true, sortable: true },
  { key: 'dateAssigned', label: 'Date Assigned', width: 170, minWidth: 160, resizable: true, sortable: true },
  { key: 'department', label: 'Department', width: 200, minWidth: 160, resizable: true, sortable: true },
  { key: 'dateUploaded', label: 'Date Uploaded', width: 180, minWidth: 170, resizable: true, sortable: true },
  { key: 'status', label: 'Status', width: 140, minWidth: 120, resizable: true, sortable: true },
  { key: 'type', label: 'Type', width: 105, minWidth: 96, resizable: true, sortable: true },
  { key: 'action', label: 'Action', width: 110, minWidth: 96, resizable: false },
];
export const initialSortConfig = { key: 'dateUploaded', direction: 'desc' };
export const createInitialColumnWidths = () => documentVaultColumns.reduce((widths, column) => ({ ...widths, [column.key]: column.width }), {});
export const initialVaultFilters = { statuses: [], departments: [], handledBy: [], workModes: [], fileTypes: [], assignedFrom: '', assignedTo: '', uploadedFrom: '', uploadedTo: '' };
export const allDocumentsSection = { key: 'all', label: 'All Files', description: 'All document vault records across every requirement section.' };