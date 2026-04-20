export const ITEMS_PER_PAGE = 6;

export const initialDepartmentFilters = { designations: [], workSetups: [], internLoads: [] };
export const initialInternFilters = { assignmentMonths: [], ojtHours: [], progressStatuses: [] };

export function formatAssignmentMonth(value) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(value));
}

export function getProgressStatus(intern) {
  const requiredHours = Number(intern.ojtHours);
  const renderedHours = Number(intern.rendered);
  const completionRatio = requiredHours === 0 ? 0 : renderedHours / requiredHours;
  if (completionRatio >= 1) return 'Completed';
  if (completionRatio >= 0.75) return 'Near Completion';
  if (completionRatio > 0) return 'In Progress';
  return 'Not Started';
}

export function getInternLoadLabel(internCount) {
  if (internCount >= 4) return '4+ interns';
  if (internCount >= 2) return '2-3 interns';
  return '0-1 intern';
}