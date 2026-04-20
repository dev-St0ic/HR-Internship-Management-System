import { documentVaultRecords } from '../documentVaultData';
import { internManagementInterns } from '../internManagementData';
import { applicantCoverImages } from './assets';
import { APPLICATION_STAGE_READY_PREVIEW_COUNT } from './constants';
import { buildSubmittedDate, buildVaultRecordSummary, formatLongDate, getApplicantStage, getApplicantStatus } from './helpers';

export function createRecruitmentApplications(interns = internManagementInterns, records = documentVaultRecords) {
  const vaultSummary = buildVaultRecordSummary(records);
  let readyApplicationPreviewCount = 0;

  return [...interns].sort((left, right) => new Date(right.startedAt) - new Date(left.startedAt)).map((intern, index) => {
    const isReadyForApproval = intern.documentStatus === 'Complete' && intern.evaluationStatus !== 'Not Started';
    const keepInApplications = isReadyForApproval && readyApplicationPreviewCount < APPLICATION_STAGE_READY_PREVIEW_COUNT;
    const vaultStats = vaultSummary.get(intern.name) ?? { total: 0, verified: 0, pending: 0, review: 0 };
    const submittedAt = buildSubmittedDate(intern.startedAt, index);
    if (keepInApplications) readyApplicationPreviewCount += 1;

    const status = getApplicantStatus(intern);
    return {
      id: `recruitment-${intern.id}`,
      internId: intern.id,
      internSlug: intern.slug,
      name: intern.name,
      firstName: intern.firstName,
      lastName: intern.lastName,
      university: intern.university,
      program: intern.program,
      department: intern.department,
      roleTrack: intern.roleTrack,
      workMode: intern.workMode,
      supervisorName: intern.supervisorName,
      supervisorRole: intern.supervisorRole,
      submittedAt,
      submittedAtLabel: formatLongDate(submittedAt),
      startDateLabel: intern.startedAtLabel,
      stage: getApplicantStage(intern, keepInApplications),
      stageLabel: keepInApplications || !isReadyForApproval ? 'Application' : 'For Admin Approval',
      status: status.label,
      statusTone: status.tone,
      requiredDocuments: intern.documents.length,
      submittedDocuments: intern.documents.filter((document) => !document.followUp).length,
      missingDocuments: Math.max(intern.documents.filter((document) => document.followUp).length, 0),
      verifiedVaultDocuments: vaultStats.verified,
      vaultDocumentTotal: vaultStats.total,
      documentStatus: intern.documentStatus,
      evaluationStatus: intern.evaluationStatus,
      ojtProgress: intern.ojtProgress,
      coverImage: applicantCoverImages[index % applicantCoverImages.length],
    };
  });
}