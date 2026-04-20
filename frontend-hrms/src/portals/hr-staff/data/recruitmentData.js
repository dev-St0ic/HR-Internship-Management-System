import AboutImg1 from '../../../assets/images/AboutImg1.jpg';
import AboutImg2 from '../../../assets/images/AboutImg2.jpg';
import AboutImg3 from '../../../assets/images/AboutImg3.jpg';
import FaqImg from '../../../assets/images/FaqImg.jpg';
import HeroImg1 from '../../../assets/images/HeroImg1.jpg';
import HeroImg2 from '../../../assets/images/HeroImg2.jpg';
import HeroImg3 from '../../../assets/images/HeroImg3.jpg';
import { documentVaultRecords } from './documentVaultData';
import { internManagementInterns } from './internManagementData';

export const RECRUITMENT_PAGE_SIZE = 6;

export const recruitmentTabs = [
  { key: 'applications', label: 'Application' },
  { key: 'for-admin-approval', label: 'For Admin Approval' },
  { key: 'partner-university', label: 'Partner University' },
];

const APPLICATION_STAGE_READY_PREVIEW_COUNT = 2;

const applicantCoverImages = [
  HeroImg1,
  HeroImg2,
  HeroImg3,
  AboutImg1,
  AboutImg2,
  AboutImg3,
  FaqImg,
];

const universityPalettes = [
  { background: 'linear-gradient(135deg, #FCE7F3 0%, #F9A8D4 100%)', color: '#831843' },
  { background: 'linear-gradient(135deg, #DBEAFE 0%, #93C5FD 100%)', color: '#1D4ED8' },
  { background: 'linear-gradient(135deg, #DCFCE7 0%, #86EFAC 100%)', color: '#166534' },
  { background: 'linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%)', color: '#92400E' },
  { background: 'linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)', color: '#5B21B6' },
  { background: 'linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 100%)', color: '#991B1B' },
];

function formatLongDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

function buildSubmittedDate(startedAt, index) {
  const submittedDate = new Date(startedAt);
  submittedDate.setDate(submittedDate.getDate() - (10 + (index % 5) * 3));
  return submittedDate.toISOString().slice(0, 10);
}

function getApplicantStatus(intern) {
  if (intern.documentStatus !== 'Complete') {
    return {
      label: 'Missing Requirements',
      tone: 'attention',
    };
  }

  if (intern.evaluationStatus === 'Completed') {
    return {
      label: 'Ready for Approval',
      tone: 'success',
    };
  }

  if (intern.evaluationStatus === 'In Progress') {
    return {
      label: 'For Final Review',
      tone: 'accent',
    };
  }

  return {
    label: 'Initial Screening',
    tone: 'neutral',
  };
}

function getApplicantStage(intern, keepInApplications = false) {
  if (keepInApplications) {
    return 'applications';
  }

  return intern.documentStatus === 'Complete' && intern.evaluationStatus !== 'Not Started'
    ? 'for-admin-approval'
    : 'applications';
}

function getUniversityInitials(name) {
  const parts = name
    .split(' ')
    .filter((part) => part.length > 2 && !['the', 'of', 'and'].includes(part.toLowerCase()));

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function getPaletteIndex(seedText = '') {
  return Array.from(seedText).reduce((total, character) => total + character.charCodeAt(0), 0) % universityPalettes.length;
}

function getUniversityPalette(name) {
  return universityPalettes[getPaletteIndex(name)];
}

function buildVaultRecordSummary(records = documentVaultRecords) {
  return records.reduce((summary, record) => {
    const currentSummary = summary.get(record.internName) ?? {
      total: 0,
      verified: 0,
      pending: 0,
      review: 0,
    };

    currentSummary.total += 1;

    if (record.status === 'Verified') {
      currentSummary.verified += 1;
    } else if (record.status === 'Pending') {
      currentSummary.pending += 1;
    } else {
      currentSummary.review += 1;
    }

    summary.set(record.internName, currentSummary);
    return summary;
  }, new Map());
}

export function createRecruitmentApplications(
  interns = internManagementInterns,
  records = documentVaultRecords,
) {
  const vaultSummary = buildVaultRecordSummary(records);
  let readyApplicationPreviewCount = 0;

  return [...interns]
    .sort((left, right) => new Date(right.startedAt) - new Date(left.startedAt))
    .map((intern, index) => {
      const isReadyForApproval = intern.documentStatus === 'Complete' && intern.evaluationStatus !== 'Not Started';
      const keepInApplications = isReadyForApproval && readyApplicationPreviewCount < APPLICATION_STAGE_READY_PREVIEW_COUNT;

      if (keepInApplications) {
        readyApplicationPreviewCount += 1;
      }

      const stage = getApplicantStage(intern, keepInApplications);
      const status = getApplicantStatus(intern);
      const submittedDocuments = intern.documents.filter((document) => !document.followUp).length;
      const requiredDocuments = intern.documents.length;
      const submittedAt = buildSubmittedDate(intern.startedAt, index);
      const vaultStats = vaultSummary.get(intern.name) ?? {
        total: 0,
        verified: 0,
        pending: 0,
        review: 0,
      };

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
        stage,
        stageLabel: stage === 'applications' ? 'Application' : 'For Admin Approval',
        status: status.label,
        statusTone: status.tone,
        requiredDocuments,
        submittedDocuments,
        missingDocuments: Math.max(requiredDocuments - submittedDocuments, 0),
        verifiedVaultDocuments: vaultStats.verified,
        vaultDocumentTotal: vaultStats.total,
        documentStatus: intern.documentStatus,
        evaluationStatus: intern.evaluationStatus,
        ojtProgress: intern.ojtProgress,
        coverImage: applicantCoverImages[index % applicantCoverImages.length],
      };
    });
}

export const recruitmentApplications = createRecruitmentApplications();

function getUniversityRelationship(applicantCount, approvalCount) {
  if (approvalCount >= 2) {
    return {
      label: 'High-priority pipeline',
      tone: 'success',
    };
  }

  if (applicantCount >= 3) {
    return {
      label: 'Active partner',
      tone: 'accent',
    };
  }

  return {
    label: 'Growing pipeline',
    tone: 'neutral',
  };
}

export function createRecruitmentPartnerUniversities(applications = recruitmentApplications) {
  const groupedUniversities = applications.reduce((groups, application) => {
    const currentGroup = groups.get(application.university) ?? {
      id: application.university.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: application.university,
      applicantCount: 0,
      approvalCount: 0,
      documentReadyCount: 0,
      programs: new Set(),
      departments: new Set(),
      featuredApplicants: [],
      latestSubmittedAt: application.submittedAt,
    };

    currentGroup.applicantCount += 1;
    currentGroup.approvalCount += application.stage === 'for-admin-approval' ? 1 : 0;
    currentGroup.documentReadyCount += application.documentStatus === 'Complete' ? 1 : 0;
    currentGroup.programs.add(application.program);
    currentGroup.departments.add(application.department);

    if (currentGroup.featuredApplicants.length < 3) {
      currentGroup.featuredApplicants.push(application.name);
    }

    if (new Date(application.submittedAt) > new Date(currentGroup.latestSubmittedAt)) {
      currentGroup.latestSubmittedAt = application.submittedAt;
    }

    groups.set(application.university, currentGroup);
    return groups;
  }, new Map());

  return Array.from(groupedUniversities.values())
    .map((university) => {
      const relationship = getUniversityRelationship(university.applicantCount, university.approvalCount);

      return {
        ...university,
        programCount: university.programs.size,
        departmentCount: university.departments.size,
        programs: Array.from(university.programs).sort(),
        departments: Array.from(university.departments).sort(),
        featuredApplicants: university.featuredApplicants,
        latestSubmittedAtLabel: formatLongDate(university.latestSubmittedAt),
        initials: getUniversityInitials(university.name),
        palette: getUniversityPalette(university.name),
        relationshipLabel: relationship.label,
        relationshipTone: relationship.tone,
      };
    })
    .sort((left, right) => {
      if (right.applicantCount !== left.applicantCount) {
        return right.applicantCount - left.applicantCount;
      }

      return left.name.localeCompare(right.name);
    });
}

export const recruitmentPartnerUniversities = createRecruitmentPartnerUniversities();