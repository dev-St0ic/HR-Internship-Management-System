const getSortedUniqueValues = (items, field) => Array.from(new Set(items.map((item) => item[field]))).sort();

export function buildAvailableFilterOptions(interns, attendanceRequests) {
  return {
    availableDepartments: getSortedUniqueValues(interns, 'department'),
    availableSupervisors: getSortedUniqueValues(interns, 'supervisorName'),
    availableRoleTracks: getSortedUniqueValues(interns, 'roleTrack'),
    availableWorkModes: getSortedUniqueValues(interns, 'workMode'),
    availableInternshipStatuses: getSortedUniqueValues(interns, 'internshipStatus'),
    availableOjtProgress: getSortedUniqueValues(interns, 'ojtProgress'),
    availableDocumentStatuses: getSortedUniqueValues(interns, 'documentStatus'),
    availableEvaluationStatuses: getSortedUniqueValues(interns, 'evaluationStatus'),
    availableUniversities: getSortedUniqueValues(interns, 'university'),
    availableWorkflowStatuses: getSortedUniqueValues(attendanceRequests, 'workflowStatus'),
    availableRequestDepartments: getSortedUniqueValues(attendanceRequests, 'department'),
    availableRequestSupervisors: getSortedUniqueValues(attendanceRequests, 'supervisorName'),
    availableRequestUniversities: getSortedUniqueValues(attendanceRequests, 'university'),
    availableIssueTypes: getSortedUniqueValues(attendanceRequests, 'issueType'),
    availableAttendanceStatuses: getSortedUniqueValues(attendanceRequests, 'attendanceStatus'),
    availableSupportingDocuments: getSortedUniqueValues(attendanceRequests, 'supportingDocument'),
  };
}