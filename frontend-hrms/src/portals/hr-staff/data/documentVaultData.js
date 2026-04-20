import { staffManagementDepartments } from './staffManagementData';

export const DOCUMENT_VAULT_PAGE_SIZE = 6;

export const documentVaultSections = [
  {
    key: 'moa',
    label: 'MOA',
    description: 'Memorandum of Agreement files prepared for onboarding partners and interns.',
    statusCycle: ['Verified', 'Verified', 'For Review', 'Pending'],
    seed: 0,
    total: 8,
    titlePrefix: 'Memorandum_of_Agreement',
  },
  {
    key: 'nda',
    label: 'NDA',
    description: 'Confidentiality agreements ready for validation and release.',
    statusCycle: ['Verified', 'Pending', 'Verified'],
    seed: 8,
    total: 7,
    titlePrefix: 'Non_Disclosure_Agreement',
  },
  {
    key: 'coa',
    label: 'COA',
    description: 'Certificate of Acceptance copies from participating departments.',
    statusCycle: ['Verified', 'For Review', 'Verified', 'Pending'],
    seed: 15,
    total: 10,
    titlePrefix: 'Certificate_of_Acceptance',
  },
  {
    key: 'endorsement',
    label: 'Endorsement',
    description: 'Department endorsement letters and internship placement endorsements.',
    statusCycle: ['Pending', 'Verified', 'For Review', 'Verified'],
    seed: 22,
    total: 15,
    titlePrefix: 'Endorsement_Letter',
  },
];

const baseUploads = [
  '2026-01-15',
  '2026-01-22',
  '2026-02-03',
  '2026-02-10',
  '2026-02-18',
  '2026-02-24',
  '2026-03-01',
  '2026-03-05',
  '2026-03-09',
  '2026-03-12',
  '2026-03-16',
  '2026-03-20',
];

const vaultPeople = staffManagementDepartments.flatMap((department) =>
  department.employees.flatMap((employee) =>
    employee.interns.map((intern) => ({
      department: department.name,
      employeeName: employee.name,
      employeeDesignation: employee.designation,
      employeeType: employee.type,
      employeeAvatar: employee.avatar,
      internName: intern.name,
      assignedDate: intern.date,
    })),
  ),
);

function formatFileName(prefix, internName) {
  return `${prefix}_${internName.replace(/[^a-zA-Z0-9]+/g, '_')}.pdf`;
}

function buildSectionRecords(section) {
  return Array.from({ length: section.total }, (_, index) => {
    const person = vaultPeople[(section.seed + index) % vaultPeople.length];
    const uploadDate = baseUploads[(section.seed + index) % baseUploads.length];
    const status = section.statusCycle[index % section.statusCycle.length];

    return {
      id: `${section.key}-${index + 1}`,
      sectionKey: section.key,
      sectionLabel: section.label,
      fileName: formatFileName(section.titlePrefix, person.internName),
      fileType: 'PDF',
      internName: person.internName,
      internAvatar: person.employeeAvatar,
      department: person.department,
      uploadedBy: person.employeeName,
      uploadedByRole: person.employeeDesignation,
      workMode: person.employeeType,
      assignedDate: person.assignedDate,
      uploadedAt: uploadDate,
      status,
    };
  });
}

export function createDocumentVaultRecords() {
  return documentVaultSections.flatMap(buildSectionRecords);
}

export const documentVaultRecords = createDocumentVaultRecords();

export function getDocumentVaultStatuses(records = documentVaultRecords) {
  return Array.from(new Set(records.map((record) => record.status)));
}
