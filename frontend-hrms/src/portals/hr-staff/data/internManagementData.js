import { staffManagementDepartments } from './staffManagementData';

export const INTERN_MANAGEMENT_PAGE_SIZE = 6;

export const internManagementOperationTabs = [
  { key: 'interns', label: 'Interns' },
  { key: 'attendance-requests', label: 'Attendance Request' },
];

export const internManagementSectionTabs = [
  { key: 'profile', label: 'Profile' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'evaluation', label: 'Evaluation' },
];

export const internManagementProfileTabs = [
  { key: 'personal-information', label: 'Personal Information' },
  { key: 'documents', label: 'Documents' },
];

export const attendanceRequestStatusOptions = ['Absent', 'On Time', 'Late', 'Excused'];

const universities = [
  'Polytechnic University of the Philippines',
  'University of Santo Tomas',
  'Far Eastern University',
  'Mapua University',
  'University of the East',
  'De La Salle University',
];

const programs = [
  'BS Information Technology',
  'BS Computer Science',
  'BS Business Administration',
  'BS Psychology',
  'BS Marketing Management',
  'BS Industrial Engineering',
];

const cities = [
  'Quezon City',
  'Pasig City',
  'Makati City',
  'Taguig City',
  'Manila',
  'Antipolo City',
];

const genderOptions = ['Female', 'Male', 'Female', 'Male', 'Female', 'Male'];

const issueTypes = [
  'Excused Absence',
  'Late',
  'Late',
  'Excused Absence',
  'Missing Time Out',
  'Excused Absence',
];

const requestWorkflowStatuses = ['Pending', 'Rejected', 'Pending', 'Approved', 'Pending', 'Approved'];

const requestAttendanceStatuses = ['Absent', 'Late', 'Late', 'Excused', 'Absent', 'Excused'];

const requestReasons = [
  'Excused absence to participate in a mandatory university activity.',
  'Reached the office late because of transport disruption on the assigned route.',
  'Submitted a late arrival note due to a university consultation before work hours.',
  'Requested absence clearance for a documented family medical appointment.',
  'Missing time-out record due to a forgotten kiosk log before leaving the office.',
  'Submitted an excused absence request for thesis defense participation.',
];

const documentTemplates = [
  { key: 'moa', name: 'MOA.pdf' },
  { key: 'certificate', name: 'Certificate of Acceptance.pdf' },
  { key: 'nda', name: 'NDA Letter.pdf' },
  { key: 'id', name: 'ID.pdf' },
  { key: 'resume', name: 'Resume.pdf' },
  { key: 'endorsement', name: 'Endorsement Letter.pdf' },
];

const taskTemplates = [
  { title: 'Task 1', priority: 'High', status: 'Completed' },
  { title: 'Task 2', priority: 'Moderate', status: 'Not Started' },
  { title: 'Task 3', priority: 'Low', status: 'In Progress' },
  { title: 'Task 4', priority: 'High', status: 'Completed' },
];

const extraTaskTemplatesByIntern = {
  'Mason Price': [
    { title: 'Task 5', priority: 'Moderate', status: 'In Progress' },
    { title: 'Task 6', priority: 'High', status: 'Not Started' },
    { title: 'Task 7', priority: 'Low', status: 'Completed' },
    { title: 'Task 8', priority: 'Moderate', status: 'In Progress' },
  ],
};

const attendanceTemplate = [
  { day: 1, checkIn: '09:28 AM', checkOut: '07:00 PM', breakDuration: '00:30 Min', workingHours: '09:02 Hrs', status: 'On Time' },
  { day: 2, checkIn: '09:20 AM', checkOut: '07:00 PM', breakDuration: '00:20 Min', workingHours: '09:20 Hrs', status: 'On Time' },
  { day: 3, checkIn: '09:25 AM', checkOut: '07:00 PM', breakDuration: '00:30 Min', workingHours: '09:05 Hrs', status: 'On Time' },
  { day: 4, checkIn: '09:45 AM', checkOut: '07:00 PM', breakDuration: '00:40 Min', workingHours: '08:35 Hrs', status: 'Late' },
  { day: 5, checkIn: '10:00 AM', checkOut: '07:00 PM', breakDuration: '00:30 Min', workingHours: '08:30 Hrs', status: 'Late' },
  { day: 6, checkIn: '09:28 AM', checkOut: '07:00 PM', breakDuration: '00:30 Min', workingHours: '09:02 Hrs', status: 'On Time' },
  { day: 7, checkIn: '09:30 AM', checkOut: '07:00 PM', breakDuration: '00:15 Min', workingHours: '09:15 Hrs', status: 'On Time' },
  { day: 8, checkIn: '09:52 AM', checkOut: '07:00 PM', breakDuration: '00:45 Min', workingHours: '08:23 Hrs', status: 'Late' },
  { day: 9, checkIn: '09:10 AM', checkOut: '07:00 PM', breakDuration: '00:30 Min', workingHours: '09:02 Hrs', status: 'On Time' },
];

const monthlyLabels = ['January 2026', 'February 2026', 'March 2026'];

const evaluationTemplates = [
  {
    evaluatorName: 'Alice Smith',
    comment:
      'Demonstrates reliable work quality and strong professionalism. Communicates clearly during discussions, takes initiative on assigned tasks, and remains punctual throughout the week.',
    criteria: [5, 4, 4, 5, 4],
  },
  {
    evaluatorName: 'Bob Lee',
    comment:
      'Maintains consistent collaboration with the assigned supervisor. Needs slight improvement in attendance preparation, but overall task ownership and documentation remain strong.',
    criteria: [4, 5, 4, 4, 4],
  },
  {
    evaluatorName: 'Catherine Jones',
    comment:
      'Shows thoughtful initiative and dependable communication with teammates. Quality output is steady and the intern adapts quickly to process feedback.',
    criteria: [4, 4, 5, 4, 5],
  },
];

const internshipStatusOptions = ['Onboarding', 'Active', 'Probation', 'Completed', 'On Hold'];

const roleTracks = {
  Finance: 'Finance Operations',
  'Human Resources': 'People Operations',
  Engineering: 'Software Engineering',
  Marketing: 'Marketing Operations',
  Operations: 'Business Operations',
};

const evaluationStatusOptions = ['Completed', 'In Progress', 'Not Started'];

const evaluationCriteriaLabels = [
  'Work Quality',
  'Communication',
  'Initiative',
  'Attendance',
  'Professionalism',
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatLongDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

function formatMonthDate(monthIndex, day) {
  const monthNumber = String(monthIndex + 1).padStart(2, '0');
  const dayNumber = String(day).padStart(2, '0');
  return formatLongDate(`2026-${monthNumber}-${dayNumber}`);
}

function buildInternNumericId(index, departmentId, employeeId, internId) {
  const rawValue = `${departmentId}${employeeId}${internId}${index + 1}`.replace(/\D/g, '');
  return rawValue.padEnd(9, `${(index + 3) % 10}`).slice(0, 9);
}

function buildEmail(name) {
  return `${slugify(name).replace(/-/g, '')}@gmail.com`;
}

function buildPhoneNumber(index) {
  return `09${String(17832000 + index * 3791).slice(0, 8)}`;
}

function buildBirthDate(index) {
  const month = String((index % 9) + 1).padStart(2, '0');
  const day = String((index % 18) + 5).padStart(2, '0');
  return `2004-${month}-${day}`;
}

function buildAddress(index) {
  return `${101 + index} ${cities[index % cities.length]} Internship St.`;
}

function buildAttendanceMonths(index) {
  return monthlyLabels.map((label, monthIndex) => ({
    label,
    remainingHours: String(Math.max(40, 210 - index * 3 - monthIndex * 18)),
    entries: attendanceTemplate.map((entry, entryIndex) => ({
      id: `${monthIndex + 1}-${entry.day}`,
      date: formatMonthDate(monthIndex + 4, entry.day + entryIndex % 2),
      checkIn: entry.checkIn,
      checkOut: entry.checkOut,
      breakDuration: entry.breakDuration,
      workingHours: entry.workingHours,
      status: entry.status,
    })),
  }));
}

function buildDocuments(index) {
  return documentTemplates.map((document, documentIndex) => ({
    id: `${document.key}-${documentIndex + 1}`,
    name: document.name,
    followUp: documentIndex === 0 && index % 2 === 0,
  }));
}

function buildTasks(startedAt, index, internName) {
  const startedAtDate = new Date(startedAt);
  const taskList = [
    ...taskTemplates,
    ...(extraTaskTemplatesByIntern[internName] ?? []),
  ];

  return taskList.map((task, taskIndex) => {
    const givenDate = new Date(startedAtDate);
    givenDate.setDate(givenDate.getDate() + taskIndex * 3);

    const deadlineDate = new Date(startedAtDate);
    deadlineDate.setDate(deadlineDate.getDate() + taskIndex * 7 + 5);

    return {
      id: `${task.title.toLowerCase().replace(/\s+/g, '-')}-${taskIndex + 1}`,
      title: task.title,
      dateGiven: formatLongDate(givenDate.toISOString()),
      deadline: formatLongDate(deadlineDate.toISOString()),
      priority: task.priority,
      status: task.status,
    };
  });
}

function buildEvaluation(index) {
  const template = evaluationTemplates[index % evaluationTemplates.length];
  const criteria = evaluationCriteriaLabels.map((label, criteriaIndex) => ({
    key: label.toLowerCase().replace(/\s+/g, '-'),
    label,
    rating: template.criteria[criteriaIndex],
  }));
  const totalScore = criteria.reduce((total, item) => total + item.rating, 0);

  return {
    evaluatorName: template.evaluatorName,
    status: evaluationStatusOptions[index % evaluationStatusOptions.length],
    comment: template.comment,
    totalScore,
    scoreLabel: totalScore >= 22 ? 'GOOD' : 'FAIR',
    criteria,
  };
}

function getInternshipStatus(index) {
  return internshipStatusOptions[index % internshipStatusOptions.length];
}

function getRoleTrack(department) {
  return roleTracks[department] ?? 'General Corporate Support';
}

function getOjtProgress(requiredHours, renderedHours) {
  const completionRatio = requiredHours === 0 ? 0 : renderedHours / requiredHours;

  if (completionRatio >= 1) {
    return 'Completed';
  }

  if (completionRatio >= 0.75) {
    return 'Near Completion';
  }

  if (completionRatio > 0) {
    return 'In Progress';
  }

  return 'Not Started';
}

function getDocumentStatus(documents) {
  if (documents.some((document) => document.followUp)) {
    return 'Missing Requirements';
  }

  return 'Complete';
}

function buildRequestDate(index) {
  const requestDate = new Date('2026-03-17T00:00:00');
  requestDate.setDate(requestDate.getDate() + index * 2);
  return requestDate.toISOString().slice(0, 10);
}

function createFlattenedInternSources(departments) {
  return departments.flatMap((department) =>
    department.employees.flatMap((employee) =>
      employee.interns.map((intern) => ({
        department,
        employee,
        intern,
      })),
    ),
  );
}

export function createInternManagementInterns(departments = staffManagementDepartments) {
  const flattenedInternSources = createFlattenedInternSources(departments);

  return flattenedInternSources.map(({ department, employee, intern }, index) => {
  const [firstName, ...lastNameParts] = intern.name.split(' ');
  const lastName = lastNameParts.join(' ') || 'Intern';
  const attendanceMonths = buildAttendanceMonths(index);
  const renderedHours = Number(intern.rendered);
  const requiredHours = Number(intern.ojtHours);
  const documents = buildDocuments(index);
  const evaluation = buildEvaluation(index);

  return {
    id: `${department.id}-${employee.id}-${intern.id}`,
    slug: `${slugify(intern.name)}-${department.id}${employee.id}${intern.id}`,
    name: intern.name,
    firstName,
    lastName,
    email: buildEmail(intern.name),
    phoneNumber: buildPhoneNumber(index),
    gender: genderOptions[index % genderOptions.length],
    dateOfBirth: buildBirthDate(index),
    internNumericId: buildInternNumericId(index, department.id, employee.id, intern.id),
    university: universities[index % universities.length],
    program: programs[index % programs.length],
    city: cities[index % cities.length],
    zipCode: `${1000 + index}`,
    address: buildAddress(index),
    department: department.name,
    startedAt: intern.date,
    startedAtLabel: formatLongDate(intern.date),
    requiredHours,
    renderedHours,
    remainingHours: String(Math.max(0, requiredHours - renderedHours)),
    workMode: employee.type,
    internshipStatus: getInternshipStatus(index),
    roleTrack: getRoleTrack(department.name),
    ojtProgress: getOjtProgress(requiredHours, renderedHours),
    supervisorName: employee.name,
    supervisorRole: employee.designation,
    avatar: employee.avatar,
    documents,
    documentStatus: getDocumentStatus(documents),
    tasks: buildTasks(intern.date, index, intern.name),
    attendanceMonths,
    evaluation,
    evaluationStatus: evaluation.status,
  };
  });
}

export function createInternAttendanceRequests(interns = createInternManagementInterns()) {
  return interns.slice(0, 14).map((intern, index) => {
  const issueDate = buildRequestDate(index);
  const requestedDate = buildRequestDate(index + 1);

  return {
    id: `request-${intern.id}`,
    internId: intern.id,
    internSlug: intern.slug,
    internName: intern.name,
    internAvatar: intern.avatar,
    department: intern.department,
    supervisorName: intern.supervisorName,
    university: intern.university,
    issueType: issueTypes[index % issueTypes.length],
    attendanceStatus: requestAttendanceStatuses[index % requestAttendanceStatuses.length],
    workflowStatus: requestWorkflowStatuses[index % requestWorkflowStatuses.length],
    date: issueDate,
    dateLabel: formatLongDate(issueDate),
    requestedAt: requestedDate,
    requestedAtLabel: formatLongDate(requestedDate),
    timeIn: index % 2 === 0 ? '' : '09:20 AM',
    timeOut: index % 3 === 0 ? '' : '07:00 PM',
    reason: requestReasons[index % requestReasons.length],
    supportingDocument: intern.documents[index % intern.documents.length].name,
  };
  });
}

export const internManagementInterns = createInternManagementInterns();

export const internAttendanceRequests = createInternAttendanceRequests(internManagementInterns);

export function getInternManagementInternBySlug(slug) {
  return internManagementInterns.find((intern) => intern.slug === slug) ?? null;
}
