export const documentTemplates = [
  { key: 'moa', name: 'MOA.pdf' },
  { key: 'certificate', name: 'Certificate of Acceptance.pdf' },
  { key: 'nda', name: 'NDA Letter.pdf' },
  { key: 'id', name: 'ID.pdf' },
  { key: 'resume', name: 'Resume.pdf' },
  { key: 'endorsement', name: 'Endorsement Letter.pdf' },
];

export const taskTemplates = [
  { title: 'Task 1', priority: 'High', status: 'Completed' },
  { title: 'Task 2', priority: 'Moderate', status: 'Not Started' },
  { title: 'Task 3', priority: 'Low', status: 'In Progress' },
  { title: 'Task 4', priority: 'High', status: 'Completed' },
];

export const extraTaskTemplatesByIntern = {
  'Mason Price': [
    { title: 'Task 5', priority: 'Moderate', status: 'In Progress' },
    { title: 'Task 6', priority: 'High', status: 'Not Started' },
    { title: 'Task 7', priority: 'Low', status: 'Completed' },
    { title: 'Task 8', priority: 'Moderate', status: 'In Progress' },
  ],
};

export const attendanceTemplate = [
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

export const monthlyLabels = ['January 2026', 'February 2026', 'March 2026'];

export const evaluationTemplates = [
  { evaluatorName: 'Alice Smith', comment: 'Demonstrates reliable work quality and strong professionalism. Communicates clearly during discussions, takes initiative on assigned tasks, and remains punctual throughout the week.', criteria: [5, 4, 4, 5, 4] },
  { evaluatorName: 'Bob Lee', comment: 'Maintains consistent collaboration with the assigned supervisor. Needs slight improvement in attendance preparation, but overall task ownership and documentation remain strong.', criteria: [4, 5, 4, 4, 4] },
  { evaluatorName: 'Catherine Jones', comment: 'Shows thoughtful initiative and dependable communication with teammates. Quality output is steady and the intern adapts quickly to process feedback.', criteria: [4, 4, 5, 4, 5] },
];