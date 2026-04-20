import { useEffect, useMemo, useState } from 'react';

import NotificationsList from '../components/notifications/NotificationsList';
import NotificationIcon from '../components/staff-management/NotificationIcon';
import PaginationControls from '../components/staff-management/PaginationControls';
import { staffManagementDepartments } from '../data/staffManagementData';
import { ITEMS_PER_PAGE, MINUTE, NOTIFICATIONS_SEEN_KEY } from '../utils/notifications/constants';
import { createNotifications, formatRelativeTime, getSeenNotificationIds, getStableNotificationsBaseTime } from '../utils/notifications/helpers';
import '../../../assets/styles/staff-management.css';

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

    const notifications = useMemo(() => createNotifications(staffManagementDepartments, baseTime, seenNotificationIds), [baseTime, seenNotificationIds]);

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

                <NotificationsList notifications={paginatedNotifications} now={now} formatRelativeTime={formatRelativeTime} />

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