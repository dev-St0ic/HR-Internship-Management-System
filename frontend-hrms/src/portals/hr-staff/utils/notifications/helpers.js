import { MINUTE, HOUR, DAY, WEEK, NOTIFICATIONS_BASE_TIME_KEY, NOTIFICATIONS_SEEN_KEY, notificationTemplates } from './constants';

export function formatRelativeTime(timestamp, now) {
  const diff = Math.max(0, now - timestamp);
  if (diff < MINUTE) return 'Just now';
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)} minute${Math.floor(diff / MINUTE) === 1 ? '' : 's'} ago`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)} hour${Math.floor(diff / HOUR) === 1 ? '' : 's'} ago`;
  if (diff < WEEK) return `${Math.floor(diff / DAY)} day${Math.floor(diff / DAY) === 1 ? '' : 's'} ago`;
  return `${Math.floor(diff / WEEK)} week${Math.floor(diff / WEEK) === 1 ? '' : 's'} ago`;
}

export function getStableNotificationsBaseTime() {
  if (typeof window === 'undefined') return Date.now();
  const storedValue = window.localStorage.getItem(NOTIFICATIONS_BASE_TIME_KEY);
  const parsedValue = storedValue ? Number(storedValue) : NaN;
  if (Number.isFinite(parsedValue) && parsedValue > 0) return parsedValue;
  const createdAt = Date.now();
  window.localStorage.setItem(NOTIFICATIONS_BASE_TIME_KEY, String(createdAt));
  return createdAt;
}

export function getSeenNotificationIds() {
  if (typeof window === 'undefined') return [];
  const storedValue = window.localStorage.getItem(NOTIFICATIONS_SEEN_KEY);
  if (!storedValue) return [];
  try { const parsedValue = JSON.parse(storedValue); return Array.isArray(parsedValue) ? parsedValue : []; } catch { return []; }
}

export function createNotifications(departments, baseTime, seenNotificationIds) {
  return departments.flatMap((department) => department.employees).slice(0, 12).map((person, index) => ({ id: index + 1, title: notificationTemplates[index].title, message: notificationTemplates[index].message(person.name), timestamp: baseTime - notificationTemplates[index].ageMs, name: person.name, avatar: person.avatar, unread: notificationTemplates[index].unread && !seenNotificationIds.includes(index + 1) }));
}