import { formatLongDate, getUniversityInitials, getUniversityPalette, getUniversityRelationship } from './helpers';

export function createRecruitmentPartnerUniversities(applications) {
  const groupedUniversities = applications.reduce((groups, application) => {
    const currentGroup = groups.get(application.university) ?? { id: application.university.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: application.university, applicantCount: 0, approvalCount: 0, documentReadyCount: 0, programs: new Set(), departments: new Set(), featuredApplicants: [], latestSubmittedAt: application.submittedAt };
    currentGroup.applicantCount += 1;
    currentGroup.approvalCount += application.stage === 'for-admin-approval' ? 1 : 0;
    currentGroup.documentReadyCount += application.documentStatus === 'Complete' ? 1 : 0;
    currentGroup.programs.add(application.program);
    currentGroup.departments.add(application.department);
    if (currentGroup.featuredApplicants.length < 3) currentGroup.featuredApplicants.push(application.name);
    if (new Date(application.submittedAt) > new Date(currentGroup.latestSubmittedAt)) currentGroup.latestSubmittedAt = application.submittedAt;
    groups.set(application.university, currentGroup);
    return groups;
  }, new Map());

  return Array.from(groupedUniversities.values()).map((university) => {
    const relationship = getUniversityRelationship(university.applicantCount, university.approvalCount);
    return {
      ...university,
      programCount: university.programs.size,
      departmentCount: university.departments.size,
      programs: Array.from(university.programs).sort(),
      departments: Array.from(university.departments).sort(),
      latestSubmittedAtLabel: formatLongDate(university.latestSubmittedAt),
      initials: getUniversityInitials(university.name),
      palette: getUniversityPalette(university.name),
      relationshipLabel: relationship.label,
      relationshipTone: relationship.tone,
    };
  }).sort((left, right) => (right.applicantCount !== left.applicantCount ? right.applicantCount - left.applicantCount : left.name.localeCompare(right.name)));
}