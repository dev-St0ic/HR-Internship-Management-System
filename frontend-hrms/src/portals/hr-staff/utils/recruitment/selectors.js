import { Building2, FileText, ShieldCheck, TriangleAlert } from 'lucide-react';

export const matchesSearch = (query, values) => !query || values.some((value) => String(value).toLowerCase().includes(query));

export function getApplicationQueues(applicationsWithState) {
  return {
    applications: applicationsWithState.filter((application) => application.stage === 'applications'),
    'for-admin-approval': applicationsWithState.filter((application) => application.stage === 'for-admin-approval'),
  };
}

export function getFilteredDataByTab(applicationQueues, partnerUniversities, search) {
  const query = search.trim().toLowerCase();
  return {
    applications: applicationQueues.applications.filter((application) => matchesSearch(query, [application.name, application.university, application.program, application.department, application.roleTrack])),
    'for-admin-approval': applicationQueues['for-admin-approval'].filter((application) => matchesSearch(query, [application.name, application.university, application.department, application.supervisorName, application.status])),
    'partner-university': partnerUniversities.filter((university) => matchesSearch(query, [university.name, university.relationshipLabel, ...university.programs, ...university.departments, ...university.featuredApplicants])),
  };
}

export const getTabCounts = (applicationQueues, partnerUniversities) => ({ applications: applicationQueues.applications.length, 'for-admin-approval': applicationQueues['for-admin-approval'].length, 'partner-university': partnerUniversities.length });

export function getOverviewMetrics(applicationsWithState, applicationQueues, partnerUniversities, missingRequirementsCount, topPartnerUniversity) {
  return [
    { key: 'applications', label: 'Applications', value: applicationsWithState.length, detail: 'Sample applicants sourced from current intern and document datasets', icon: FileText },
    { key: 'approval', label: 'For Admin Approval', value: applicationQueues['for-admin-approval'].length, detail: 'Profiles ready to move into the final approval queue', icon: ShieldCheck },
    { key: 'partners', label: 'Partner Universities', value: partnerUniversities.length, detail: topPartnerUniversity ? `${topPartnerUniversity.name} has the strongest current pipeline` : 'No partner university data available', icon: Building2 },
    { key: 'missing', label: 'Missing Requirements', value: missingRequirementsCount, detail: 'Applicants that still need at least one required document', icon: TriangleAlert },
  ];
}