export function getSectionFromPathname(pathname) {
  if (pathname.includes('/attendance/monthly-dtr')) return 'attendance-monthly-dtr';
  if (pathname.includes('/attendance')) return 'attendance';
  if (pathname.includes('/tasks')) return 'tasks';
  if (pathname.includes('/evaluation')) return 'evaluation';
  return 'profile';
}

export function getActiveProfileTab(value) {
  return value === 'documents' ? 'documents' : 'personal-information';
}

export function getSectionLabel(activeSection) {
  if (activeSection === 'attendance-monthly-dtr') return 'Attendance : Monthly DTR';
  if (activeSection === 'attendance') return 'Attendance';
  if (activeSection === 'tasks') return 'Tasks';
  if (activeSection === 'evaluation') return 'Evaluation';
  return 'Profile';
}

export function getStatusClassName(value) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

export function buildPersonalInfoItems(intern) {
  return [
    { label: 'First Name', value: intern.firstName },
    { label: 'Last Name', value: intern.lastName },
    { label: 'Mobile Number', value: intern.phoneNumber },
    { label: 'Email Address', value: intern.email },
    { label: 'Date of Birth', value: intern.dateOfBirth },
    { label: 'Gender', value: intern.gender },
    { label: 'University', value: intern.university },
    { label: 'Program', value: intern.program },
    { label: 'OJT Hours', value: `${intern.requiredHours} Hours` },
    { label: 'Address', value: intern.address },
    { label: 'City', value: intern.city },
    { label: 'Zip Code', value: intern.zipCode },
  ];
}