import { useState } from "react";
import Header from "../../../common/components/layout/Header";
import NotificationItem from "../../../common/components/ui/NotificationItem";

export default function Notification() {
    
    const [notifications] = useState([
        
        { 
            id: 1, 
            title: "Applicant Notification 1", 
            message: "Action", 
            time: "Just Now", 
        },
        { 
            id: 2, 
            title: "Notification 2", 
            message: "Action", 
            time: "11:16 AM", 
        },
        { 
            id: 3, 
            title: "Notification 2", 
            message: "Action", 
            time: "09:00 AM", 
        },
        { 
            id: 4, 
            title: "Notification 2", 
            message: "Action", 
            time: "Yesterday", 
        },
        { 
            id: 5, 
            title: "Notification 2", 
            message: "Action", 
            time: "Yesterday", 
        },
    ]);

    return (
        <>
            <Header title="Notifications" subtitle="All Notifications" userRole="intern"/>
            
            <div className="p-6">
                <div className="bg-white rounded-xl border border-gray-200">
                    {notifications.length > 0 ? (
                        
                        notifications.map((notif) => (
                            <NotificationItem
                                key={notif.id}
                                title={notif.title}
                                message={notif.message}
                                time={notif.time}
                            />
                        ))
                        
                    ) : (
                        <div className="p-12 text-center text-sm text-gray-400">
                            No new notifications.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}