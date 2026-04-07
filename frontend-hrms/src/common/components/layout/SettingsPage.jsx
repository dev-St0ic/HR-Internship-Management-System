import { useState } from "react";
import Header from "./Header";
import { Settings, User, ShieldAlert, Lock, Users } from "lucide-react";
import GeneralPreferences from "../ui/GeneralPreference";
import ProfileSettings from "../ui/ProfileSettings";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    const userRole = "supervisor"; // TEMP: change to "intern", "supervisor", "hr-admin", "hr-staff" to test role logic
    
    const tabs = [
        { id: "general", label: "General Preferences", icon: <Settings size={16} /> },
    ];

    // Inject HR Admin specific tabs
    if (userRole === "hr-admin") {
        tabs.push({ id: "intern-policy", label: "Intern Policy", icon: <Users size={16} /> });
        tabs.push({ id: "rbac", label: "RBAC", icon: <Lock size={16} /> });
    } 
    

    // Everyone gets Profile last
    tabs.push({ id: "profile", label: "Profile", icon: <User size={16} /> });

    return (
        <>
            <Header 
                title="Settings" 
                subtitle="Manage your personal preferences and account security." 
            />
            
            <div className="p-6">
                <div className="bg-white rounded-xl shadow p-6">
                    
                    {/* Tabs Header */}
                    <div className="flex gap-6 mt-4 border-b border-gray-100">
                        {tabs.map((tab) => (
                            <Tab
                                key={tab.id}
                                icon={tab.icon}
                                label={tab.label}
                                value={tab.id}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        ))}
                    </div>

                    {/* Tab Content Rendering */}
                    <div className="mt-6">
                        
                        {/* Common Tabs */}
                        {activeTab === "general" && <GeneralPreferences />}
                        {activeTab === "profile" && <ProfileSettings role={userRole} />}

                        {/* HR Admin Tabs (Placeholders) */}
                        {activeTab === "intern-policy" && (
                            <div className="py-12 text-center text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                                Intern Policy settings will go here.
                            </div>
                        )}
                        {activeTab === "rbac" && (
                            <div className="py-12 text-center text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                                Role-Based Access Control (RBAC) settings will go here.
                            </div>
                        )}

                        
                    </div>

                </div>
            </div>
        </>
    );

    function Tab({ icon, label, value, activeTab, setActiveTab }) {
        const isActive = activeTab === value;

        return (
            <button
                onClick={() => setActiveTab(value)}
                className={`flex items-center gap-2 pb-3 text-sm transition mb-[-1px]
                    ${isActive 
                        ? "border-b-2 border-[#7C3EFF] text-[#7C3EFF] font-semibold" 
                        : "text-gray-400 hover:text-gray-700 border-b-2 border-transparent"}`}
            >
                {icon}
                <span>{label}</span>
            </button>
        );
    }
}