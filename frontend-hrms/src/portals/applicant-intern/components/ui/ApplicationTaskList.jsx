import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ApplicationTaskList({
    documentsList = [],
    progress = 0, 
}
    
) {
    // State to toggle the documents dropdown
    const [isDocsOpen, setIsDocsOpen] = useState(true);

    const totalDocs = documentsList.length;
    const uploadedDocs = documentsList.filter(doc => doc.status === 'uploaded').length;
    

    return (
        <div className="w-full">
            <div className="space-y-6 mb-8">
                
                {/* --- Step 1: Personal Information --- */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Personal Information</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-1 rounded tracking-wide uppercase">Completed</span>
                </div>

                {/* --- Step 2: Education --- */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">Education</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-1 rounded tracking-wide uppercase">Completed</span>
                </div>

                {/* --- Step 3: Documents (Accordion) --- */}
                <div className="pb-4 border-b border-gray-100">
                    {/* Header Row (Clickable) */}
                    <div 
                        className="flex flex-col w-full cursor-pointer group"
                        onClick={() => setIsDocsOpen(!isDocsOpen)}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-[#FFCA28] text-white flex items-center justify-center shrink-0">
                                    <span className="text-xs font-bold text-white">!</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">Documents</span>
                                <span className="text-xs text-[#FFCA28] font-bold ml-2">
                                    {uploadedDocs}/{totalDocs} Uploaded
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-[#FFCA28] bg-yellow-50 px-2 py-1 rounded tracking-wide uppercase">In Progress</span>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                    className={`text-gray-400 transition-transform duration-300 ${isDocsOpen ? 'rotate-180' : ''}`}
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Expandable Checklist */}
                    {isDocsOpen && (
                        <div className="mt-4 ml-2.5 pl-6 border-l-2 border-gray-100 space-y-3 animate-fade-in bg-gray-50/50 py-4 rounded-r-lg">
                            {documentsList.map((doc, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    {doc.status === 'uploaded' ? (
                                        <div className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                    ) : (
                                        <div className="w-4 h-4 rounded-full bg-[#EF4444] text-white flex items-center justify-center shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </div>
                                    )}
                                    <span className="text-sm text-gray-700">{doc.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* --- Step 4: Screening --- */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div className="w-5 h-5 rounded-full bg-gray-200 text-white flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">Screening</span>
                </div>

                {/* --- Step 5: Decision --- */}
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-200 text-white flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">Decision</span>
                </div>
            </div>

            {/* ================= FOOTER / CONTINUE BUTTON ================= */}
            <div className="mt-8">
                {/* Progress Bar */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-medium text-gray-700">Progress: {progress}%</span>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#10B981] rounded-full transition-all duration-500" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Continue Application Button (Routed to /applicant/applications) */}
                <Link to="/applicant/applications" className="block w-full">
                    <button className="btn-primary text-[13px] tracking-wide">
                        
                        CONTINUE APPLICATION
                    </button>
                </Link>
            </div>
        </div>
    );
}