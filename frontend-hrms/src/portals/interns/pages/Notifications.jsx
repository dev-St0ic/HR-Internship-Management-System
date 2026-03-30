import Header from "../../../common/components/layout/Header";

export default function Notifications() {
  const dummyNotifications = {
    intern: [
      { id: 1, message: "New task assigned.", action: "View Task" },
      { id: 2, message: "Task deadline approaching.", action: "View Task" },
    ],
    supervisor: [
      { id: 3, message: "Intern submitted report.", action: "Review Task" },
    ],
  };

  const userRole = "intern"; // This will come from auth in real implementation
  const notifications = dummyNotifications[userRole] || []; // This will be fetched from API in real implementation

  return (
    <>
      <Header title="Notifications" subtitle="Your recent notifications" />
      <div className="p-6 bg-white rounded-xl shadow">
        <h1 className="text-lg font-semibold mb-4">Notifications</h1>

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className="p-4 bg-gray-100 rounded-lg">
                <p>{notif.message}</p>
                <p>{notif.action}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">
              No notifications at the moment.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
