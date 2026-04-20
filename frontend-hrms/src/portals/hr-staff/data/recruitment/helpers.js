import { universityPalettes } from './constants';

export function formatLongDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

export function buildSubmittedDate(startedAt, index) {
  const submittedDate = new Date(startedAt);
  submittedDate.setDate(submittedDate.getDate() - (10 + (index % 5) * 3));
  return submittedDate.toISOString().slice(0, 10);
}

export function getApplicantStatus(intern) {
  if (intern.documentStatus !== 'Complete') return { label: 'Missing Requirements', tone: 'attention' };
  if (intern.evaluationStatus === 'Completed') return { label: 'Ready for Approval', tone: 'success' };
  if (intern.evaluationStatus === 'In Progress') return { label: 'For Final Review', tone: 'accent' };
  return { label: 'Initial Screening', tone: 'neutral' };
}

export function getApplicantStage(intern, keepInApplications = false) {
  if (keepInApplications) return 'applications';
  return intern.documentStatus === 'Complete' && intern.evaluationStatus !== 'Not Started' ? 'for-admin-approval' : 'applications';
}

export function getUniversityInitials(name) {
  return name.split(' ').filter((part) => part.length > 2 && !['the', 'of', 'and'].includes(part.toLowerCase())).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

export function getUniversityPalette(name) {
  const paletteIndex = Array.from(name).reduce((total, character) => total + character.charCodeAt(0), 0) % universityPalettes.length;
  return universityPalettes[paletteIndex];
}

export function buildVaultRecordSummary(records) {
  return records.reduce((summary, record) => {
    const currentSummary = summary.get(record.internName) ?? { total: 0, verified: 0, pending: 0, review: 0 };
    currentSummary.total += 1;
    currentSummary[record.status === 'Verified' ? 'verified' : record.status === 'Pending' ? 'pending' : 'review'] += 1;
    summary.set(record.internName, currentSummary);
    return summary;
  }, new Map());
}

export function getUniversityRelationship(applicantCount, approvalCount) {
  if (approvalCount >= 2) return { label: 'High-priority pipeline', tone: 'success' };
  if (applicantCount >= 3) return { label: 'Active partner', tone: 'accent' };
  return { label: 'Growing pipeline', tone: 'neutral' };
}