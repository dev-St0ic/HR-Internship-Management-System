import React, { useEffect, useMemo, useState } from 'react';

import EmployeeAvatar from '../components/staff-management/EmployeeAvatar';
import NotificationIcon from '../components/staff-management/NotificationIcon';
import PaginationControls from '../components/staff-management/PaginationControls';
import { staffManagementDepartments } from '../data/staffManagementData';
import '../../../assets/styles/staff-management.css';

const ITEMS_PER_PAGE = 5;

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const NOTIFICATIONS_BASE_TIME_KEY = 'hrStaffNotificationsBaseTime';
const NOTIFICATIONS_SEEN_KEY = 'hrStaffSeenNotificationIds';

const notificationTemplates = [
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

function formatRelativeTime(timestamp, now) {
    const diff = Math.max(0, now - timestamp);

    if (diff < MINUTE) {
        return 'Just now';
    }

    if (diff < HOUR) {
        const minutes = Math.floor(diff / MINUTE);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }

    if (diff < DAY) {
        const hours = Math.floor(diff / HOUR);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }

    if (diff < WEEK) {
        const days = Math.floor(diff / DAY);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    }

    const weeks = Math.floor(diff / WEEK);
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
}

function getStableNotificationsBaseTime() {
    if (typeof window === 'undefined') {
        return Date.now();
    }

    const storedValue = window.localStorage.getItem(NOTIFICATIONS_BASE_TIME_KEY);
    const parsedValue = storedValue ? Number(storedValue) : NaN;

    if (Number.isFinite(parsedValue) && parsedValue > 0) {
        return parsedValue;
    }

    const createdAt = Date.now();
    window.localStorage.setItem(NOTIFICATIONS_BASE_TIME_KEY, String(createdAt));
    return createdAt;
}

function getSeenNotificationIds() {
    if (typeof window === 'undefined') {
        return [];
    }

    const storedValue = window.localStorage.getItem(NOTIFICATIONS_SEEN_KEY);

    if (!storedValue) {
        return [];
    }

    try {
        const parsedValue = JSON.parse(storedValue);
        return Array.isArray(parsedValue) ? parsedValue : [];
    } catch {
        return [];
    }
}

export default function HrStaffNotificationsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [now, setNow] = useState(() => Date.now());
    const [baseTime] = useState(() => getStableNotificationsBaseTime());
    const [seenNotificationIds, setSeenNotificationIds] = useState(() => getSeenNotificationIds());

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setNow(Date.now());
        }, MINUTE);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    const notifications = useMemo(() => {
        const people = staffManagementDepartments
            .flatMap((department) => department.employees)
            .slice(0, 12);

        return people.map((person, index) => {
            const template = notificationTemplates[index];

            return {
                id: index + 1,
                title: template.title,
                message: template.message(person.name),
                timestamp: baseTime - template.ageMs,
                name: person.name,
                avatar: person.avatar,
                unread: template.unread && !seenNotificationIds.includes(index + 1),
            };
        });
    }, [baseTime, seenNotificationIds]);

    useEffect(() => {
        if (typeof window === 'undefined' || notifications.length === 0) {
            return;
        }

        const nextSeenIds = Array.from(new Set([
            ...seenNotificationIds,
            ...notifications.map((notification) => notification.id),
        ])).sort((left, right) => left - right);

        if (nextSeenIds.length === seenNotificationIds.length) {
            return;
        }

        setSeenNotificationIds(nextSeenIds);
        window.localStorage.setItem(NOTIFICATIONS_SEEN_KEY, JSON.stringify(nextSeenIds));
    }, [notifications, seenNotificationIds]);

    const totalPages = Math.max(1, Math.ceil(notifications.length / ITEMS_PER_PAGE));
    const paginatedNotifications = notifications.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    return (
        <div className="staff-management-layout">
            <aside className="sidebar">{/* layout handled by parent */}</aside>
            <main className="main-content notifications-page-content">
                <div className="header-row">
                    <div>
                        <h2>Notifications</h2>
                        <span className="subtitle">All notifications</span>
                    </div>
                    <NotificationIcon />
                </div>

                <section className="notifications-card">
                    {notifications.length > 0 ? (
                        paginatedNotifications.map((notification) => (
                            <article key={notification.id} className="notification-row-card">
                                <div className="notification-row-main">
                                    <EmployeeAvatar
                                        src={notification.avatar}
                                        alt={notification.name}
                                        name={notification.name}
                                        size={40}
                                    />
                                    <div className="notification-row-copy">
                                        <div className="notification-row-heading">
                                            <h3>{notification.title}</h3>
                                            {notification.unread && <span className="notification-unread-dot" aria-hidden="true" />}
                                        </div>
                                        <p>{notification.message}</p>
                                    </div>
                                </div>
                                <time className="notification-row-time">{formatRelativeTime(notification.timestamp, now)}</time>
                            </article>
                        ))
                    ) : (
                        <div className="notifications-empty-state">No new notifications.</div>
                    )}
                </section>

                {totalPages > 1 && (
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        className="notifications-pagination-bar"
                    />
                )}
            </main>
        </div>
    );
}