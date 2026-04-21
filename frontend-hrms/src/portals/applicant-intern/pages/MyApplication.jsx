import { useState } from "react";
import Header from "../../../common/components/layout/Header";
import { User, Briefcase, FileText } from "lucide-react";
import PersonalInformation from "../components/ui/PersonalInformation";
import { mockApplicationData } from "../../../common/config/mockApplicationData";
import Education from "../components/ui/Education";
import Documents from "../components/ui/Documents";

export default function MyApplication() {
    // State to track which tab is currently active
    const [activeTab, setActiveTab] = useState("personal");

    // Array of tabs to make rendering easy and clean
    const tabs = [
        { id: "personal", label: "Personal Information", icon: User },
        { id: "education", label: "Education", icon: Briefcase },
        { id: "documents", label: "Documents", icon: FileText },
    ];

    return (
        <div className="flex flex-col h-full bg-[#F8F9FA]">
            <Header title="My application" subtitle="Update and upload documents" userRole="applicant" />

            <div className="p-6 md:p-8 , ml-">
                
                {/* ================= TABS NAVIGATION ================= */}
                <div className="flex items-center gap-8 border-b border-gray-200 mb-6">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 pb-3 text-[15px] font-medium transition-colors relative ${
                                    isActive 
                                        ? "text-primary" 
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                <Icon size={18} />
                                {tab.label}
                                
                                {/* Active Purple Underline */}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full animate-fade-in"></div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* ================= TAB CONTENT WRAPPER ================= */}
                <div className="card-panel">
                    
                    {/* Conditional Rendering for Forms */}
                    {activeTab === "personal" && (
                        <div >
                            <PersonalInformation personalInfo={mockApplicationData.personalInfo} />
                        </div>
                    )}

                    {activeTab === "education" && (
                        <div>
                            <Education schoolInfo={mockApplicationData.schoolInfo} />
                        </div>
                    )}

                    {activeTab === "documents" && (
                        <div>
                            <Documents initialDocuments={mockApplicationData.documents} />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}