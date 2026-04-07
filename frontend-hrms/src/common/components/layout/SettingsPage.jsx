import { useState } from "react";
import Header from "./Header";
import { Settings, User, ShieldAlert } from "lucide-react";
import GeneralPreferences from "../ui/GeneralPreference";
import ProfileSettings from "../ui/ProfileSettings";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    // TODO: BACKEND / AUTH INTEGRATION
    // Replace this with your actual Auth hook or state management
    const userRole = "intern"; // TEMP: change to "supervisor" or "admin" to test role logic

    return (
        <>
            <Header 
                title="Settings" 
                subtitle="Manage your personal preferences and account security." 
            />
            
            <div className="p-6">
                {/* Card layout matching Profile.jsx */}
                <div className="bg-white rounded-xl shadow p-6">
                    
                    {/* Tabs Header */}
                    <div className="flex gap-6 mt-4 border-b border-gray-100">
                        <Tab
                            icon={<Settings size={16} />}
                            label="General Preferences"
                            value="general"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        <Tab
                            icon={<User size={16} />}
                            label="Profile"
                            value="profile"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        {(userRole === "admin" || userRole === "supervisor") && (
                            <Tab
                                icon={<ShieldAlert size={16} />}
                                label="Security Access"
                                value="security"
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        )}
                    </div>

                    {/* Tab Content Rendering */}
                    <div className="mt-6">
                        {activeTab === "general" && <GeneralPreferences />}
                        
                        {activeTab === "profile" && <ProfileSettings role={userRole}/>}

                        {activeTab === "security" && (
                            <div className="py-12 text-center text-sm text-gray-400">
                                Supervisor/Admin security settings go here.
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