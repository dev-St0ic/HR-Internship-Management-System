import { internshipStatusOptions, roleTracks } from './constants';

export const getInternshipStatus = (index) => internshipStatusOptions[index % internshipStatusOptions.length];
export const getRoleTrack = (department) => roleTracks[department] ?? 'General Corporate Support';

export function getOjtProgress(requiredHours, renderedHours) {
  const completionRatio = requiredHours === 0 ? 0 : renderedHours / requiredHours;
  if (completionRatio >= 1) return 'Completed';
  if (completionRatio >= 0.75) return 'Near Completion';
  if (completionRatio > 0) return 'In Progress';
  return 'Not Started';
}

export function getDocumentStatus(documents) {
  return documents.some((document) => document.followUp) ? 'Missing Requirements' : 'Complete';
}

export function createFlattenedInternSources(departments) {
  return departments.flatMap((department) =>
    department.employees.flatMap((employee) =>
      employee.interns.map((intern) => ({ department, employee, intern })),
    ),
  );
}