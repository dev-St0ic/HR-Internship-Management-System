const searchableGroupKeys = ['supervisors', 'universities', 'requestSupervisors', 'requestUniversities'];

export const isSearchableFilterGroup = (groupKey) => searchableGroupKeys.includes(groupKey);

export function getOverviewFilterGroups(activeTab, options) {
  return activeTab === 'interns'
    ? [{ key: 'departments', label: 'Department', options: options.availableDepartments }, { key: 'supervisors', label: 'Supervisor', options: options.availableSupervisors }, { key: 'roleTracks', label: 'Role / Track', options: options.availableRoleTracks }, { key: 'workModes', label: 'Work Setup', options: options.availableWorkModes }, { key: 'internshipStatuses', label: 'Internship Status', options: options.availableInternshipStatuses }, { key: 'ojtProgress', label: 'OJT Progress', options: options.availableOjtProgress }, { key: 'documentStatuses', label: 'Document Status', options: options.availableDocumentStatuses }, { key: 'evaluationStatuses', label: 'Evaluation Status', options: options.availableEvaluationStatuses }, { key: 'universities', label: 'University', options: options.availableUniversities }]
    : [{ key: 'requestDepartments', label: 'Department', options: options.availableRequestDepartments }, { key: 'requestSupervisors', label: 'Supervisor', options: options.availableRequestSupervisors }, { key: 'requestUniversities', label: 'University', options: options.availableRequestUniversities }, { key: 'workflowStatuses', label: 'Request Status', options: options.availableWorkflowStatuses }, { key: 'attendanceStatuses', label: 'Attendance Status', options: options.availableAttendanceStatuses }, { key: 'issueTypes', label: 'Issue Type', options: options.availableIssueTypes }, { key: 'supportingDocuments', label: 'Supporting Document', options: options.availableSupportingDocuments }];
}

export function getSelectedFilterCount(activeTab, draftFilters, groups) {
  return groups.reduce((total, group) => total + draftFilters[group.key].length, 0) + (activeTab === 'interns' ? (draftFilters.startedFrom ? 1 : 0) + (draftFilters.startedTo ? 1 : 0) : (draftFilters.requestedFrom ? 1 : 0) + (draftFilters.requestedTo ? 1 : 0));
}