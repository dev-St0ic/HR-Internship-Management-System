import { staffManagementDepartments } from '../staffManagementData';
import { cities, genderOptions, programs, universities } from './profileConstants';
import { issueTypes, requestAttendanceStatuses, requestReasons, requestWorkflowStatuses } from './requestConstants';
import { buildAttendanceMonths, buildDocuments, buildEvaluation, buildTasks } from './builders';
import { buildAddress, buildBirthDate, buildEmail, buildInternNumericId, buildPhoneNumber, buildRequestDate, formatLongDate, slugify } from './helpers';
import { createFlattenedInternSources, getDocumentStatus, getInternshipStatus, getOjtProgress, getRoleTrack } from './selectors';

export function createInternManagementInterns(departments = staffManagementDepartments) {
  return createFlattenedInternSources(departments).map(({ department, employee, intern }, index) => {
    const [firstName, ...lastNameParts] = intern.name.split(' ');
    const attendanceMonths = buildAttendanceMonths(index);
    const requiredHours = Number(intern.ojtHours);
    const renderedHours = Number(intern.rendered);
    const documents = buildDocuments(index);
    const evaluation = buildEvaluation(index);

    return {
      id: `${department.id}-${employee.id}-${intern.id}`,
      slug: `${slugify(intern.name)}-${department.id}${employee.id}${intern.id}`,
      name: intern.name,
      firstName,
      lastName: lastNameParts.join(' ') || 'Intern',
      email: buildEmail(intern.name),
      phoneNumber: buildPhoneNumber(index),
      gender: genderOptions[index % genderOptions.length],
      dateOfBirth: buildBirthDate(index),
      internNumericId: buildInternNumericId(index, department.id, employee.id, intern.id),
      university: universities[index % universities.length],
      program: programs[index % programs.length],
      city: cities[index % cities.length],
      zipCode: `${1000 + index}`,
      address: buildAddress(index, cities),
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