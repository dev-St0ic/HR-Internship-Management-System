const matchesQuery = (query, values) => query.length === 0 || values.join(' ').toLowerCase().includes(query);
const matchesSelection = (selectedValues, value) => selectedValues.length === 0 || selectedValues.includes(value);

export function getActiveFilterCount(activeTab, appliedFilters) {
  const counts = activeTab === 'interns'
    ? [appliedFilters.departments.length, appliedFilters.supervisors.length, appliedFilters.roleTracks.length, appliedFilters.workModes.length, appliedFilters.internshipStatuses.length, appliedFilters.ojtProgress.length, appliedFilters.documentStatuses.length, appliedFilters.evaluationStatuses.length, appliedFilters.universities.length, appliedFilters.startedFrom ? 1 : 0, appliedFilters.startedTo ? 1 : 0]
    : [appliedFilters.requestDepartments.length, appliedFilters.requestSupervisors.length, appliedFilters.requestUniversities.length, appliedFilters.workflowStatuses.length, appliedFilters.attendanceStatuses.length, appliedFilters.issueTypes.length, appliedFilters.supportingDocuments.length, appliedFilters.requestedFrom ? 1 : 0, appliedFilters.requestedTo ? 1 : 0];
  return counts.reduce((total, count) => total + count, 0);
}

export function filterInterns(interns, appliedFilters, search) {
  const query = search.trim().toLowerCase();
  return interns.filter((intern) => matchesQuery(query, [intern.name, intern.internNumericId, intern.university, intern.department, intern.supervisorName, intern.roleTrack, intern.workMode, intern.internshipStatus, intern.ojtProgress, intern.documentStatus, intern.evaluationStatus]) && matchesSelection(appliedFilters.departments, intern.department) && matchesSelection(appliedFilters.supervisors, intern.supervisorName) && matchesSelection(appliedFilters.roleTracks, intern.roleTrack) && matchesSelection(appliedFilters.workModes, intern.workMode) && matchesSelection(appliedFilters.internshipStatuses, intern.internshipStatus) && matchesSelection(appliedFilters.ojtProgress, intern.ojtProgress) && matchesSelection(appliedFilters.documentStatuses, intern.documentStatus) && matchesSelection(appliedFilters.evaluationStatuses, intern.evaluationStatus) && matchesSelection(appliedFilters.universities, intern.university) && (!appliedFilters.startedFrom || intern.startedAt >= appliedFilters.startedFrom) && (!appliedFilters.startedTo || intern.startedAt <= appliedFilters.startedTo));
}

export function filterAttendanceRequests(attendanceRequests, appliedFilters, search) {
  const query = search.trim().toLowerCase();
  return attendanceRequests.filter((request) => matchesQuery(query, [request.internName, request.department, request.supervisorName, request.university, request.issueType, request.attendanceStatus, request.workflowStatus, request.supportingDocument]) && matchesSelection(appliedFilters.requestDepartments, request.department) && matchesSelection(appliedFilters.requestSupervisors, request.supervisorName) && matchesSelection(appliedFilters.requestUniversities, request.university) && matchesSelection(appliedFilters.workflowStatuses, request.workflowStatus) && matchesSelection(appliedFilters.attendanceStatuses, request.attendanceStatus) && matchesSelection(appliedFilters.issueTypes, request.issueType) && matchesSelection(appliedFilters.supportingDocuments, request.supportingDocument) && (!appliedFilters.requestedFrom || request.requestedAt >= appliedFilters.requestedFrom) && (!appliedFilters.requestedTo || request.requestedAt <= appliedFilters.requestedTo));
}