export const ITEMS_PER_PAGE = 5;
export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const NOTIFICATIONS_BASE_TIME_KEY = 'hrStaffNotificationsBaseTime';
export const NOTIFICATIONS_SEEN_KEY = 'hrStaffSeenNotificationIds';

export const notificationTemplates = [
  { title: 'Evaluation Completed', message: (name) => `${name} finished evaluating an intern submission.`, ageMs: 30 * 1000, unread: true },
  { title: 'Interview Feedback Submitted', message: (name) => `${name} submitted interview feedback for an applicant.`, ageMs: 18 * MINUTE, unread: true },
  { title: 'Intern Application Received', message: (name) => `${name} submitted a new internship application.`, ageMs: 2 * HOUR + 10 * MINUTE, unread: false },
  { title: 'Document Review Needed', message: (name) => `${name} uploaded onboarding documents for review.`, ageMs: 1 * DAY + 2 * HOUR, unread: false },
  { title: 'Internship Application Update', message: (name) => `${name} updated the internship application details.`, ageMs: 1 * DAY + 6 * HOUR, unread: false },
  { title: 'Evaluation Completed', message: (name) => `${name} completed a performance evaluation form.`, ageMs: 3 * DAY, unread: false },
  { title: 'Attendance Alert', message: (name) => `${name} submitted an attendance exception request.`, ageMs: 4 * DAY + 5 * HOUR, unread: false },
  { title: 'Supervisor Note Added', message: (name) => `${name} received a new supervisor note in the portal.`, ageMs: 8 * DAY, unread: false },
  { title: 'Requirements Approved', message: (name) => `${name} had submitted requirements approved by HR staff.`, ageMs: 10 * DAY + 4 * HOUR, unread: false },
  { title: 'Application Assigned', message: (name) => `${name} has been assigned to an HR staff reviewer.`, ageMs: 12 * DAY, unread: false },
  { title: 'Evaluation Reopened', message: (name) => `${name} had an evaluation reopened for additional comments.`, ageMs: 14 * DAY + 2 * HOUR, unread: false },
  { title: 'Onboarding Follow-up', message: (name) => `${name} has a pending onboarding follow-up reminder.`, ageMs: 15 * DAY, unread: false },
];