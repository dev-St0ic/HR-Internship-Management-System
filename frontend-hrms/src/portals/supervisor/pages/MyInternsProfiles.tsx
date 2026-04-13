import { useState } from "react";
import { FileText, User, BriefcaseBusiness, Mail, ArrowDownToLine, Eye } from "lucide-react";

export default function MyInternsProfiles() {
    const [activeTab, setActiveTab] = useState("information");
    return (
        <div className="border border-gray-500/20 rounded-lg p-5">
            <div className="flex justify-start items-center gap-3 border-b pb-5 border-gray-500/20">
                <img src="/cara.png" alt="Profile" className="bg-violet-600 size-17 rounded-lg" />
                <div className="flex-row items-center text-gray-800">
                    <h1 className="font-semibold text-lg text-black">Cara Lim</h1>
                    <h2 className="text-sm flex items-center gap-1"><BriefcaseBusiness size="17" />Project Manager</h2>
                    <span className="text-sm flex items-center gap-1"><Mail size="17" />caralim@gmail.com</span>
                </div>
            </div>

            <div className="border-b border-gray-300">
                <ul className="flex text-sm font-medium text-gray-500">

                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab("information")}
                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "information"
                                ? "text-violet-600 border-violet-600"
                                : "border-transparent hover:text-violet-600 hover:border-violet-600"
                                }`}
                        >
                            <User className="mr-2" size={18} />
                            Personal Information
                        </button>
                    </li>

                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab("documents")}
                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "documents"
                                ? "text-violet-600 border-violet-600"
                                : "border-transparent hover:text-violet-600 hover:border-violet-600"
                                }`}
                        >
                            <FileText className="mr-2" size={18} />
                            Documents
                        </button>
                    </li>

                </ul>
            </div>

            <div className="border border-gray-500/20 rounded-lg p-5 mt-5">

                {activeTab === "information" && (
                    <div className=" bg-white p-6 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm text-gray-500">First Name</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">Cara</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Last Name</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">Lim</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Mobile Number</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">0912345682</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Email Address</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">caralim@gmail.com</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Date of Birth</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">July 13, 2000</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Marital Status</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">Single</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Gender</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">Female</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Nationality</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">Filipino</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Address</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">88 Dahlia Avenue, Novaliches</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">City</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">Quezon City</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">State</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">Metro Manila</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Zip Code</label>
                                <p className="border-b border-gray-300 py-1 text-gray-800">1118</p>
                            </div>
                        </div>
                    </div>

                )}

                {activeTab === "documents" && (
                    <div className="bg-white rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="flex items-center justify-between border border-gray-200 rounded-md px-5 py-3">
                                <span className="text-black">MOA.pdf</span>
                                <div className="flex items-center gap-3 text-black-500 font-medium"><Eye size="24"/><ArrowDownToLine size="24"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border border-gray-200 rounded-md px-5 py-3">
                                <span className="text-black">Certificate of Acceptance.pdf</span>
                                <div className="flex items-center gap-3 text-black-500 font-medium"><Eye size="24"/><ArrowDownToLine size="24"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border border-gray-200 rounded-md px-5 py-3">
                                <span className="text-black">NDA Letter.pdf</span>
                                <div className="flex items-center gap-3 text-black-500 font-medium"><Eye size="24"/><ArrowDownToLine size="24"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border border-gray-200 rounded-md px-5 py-3">
                                <span className="text-black">School ID.pdf</span>
                                <div className="flex items-center gap-3 text-black-500 font-medium"><Eye size="24"/><ArrowDownToLine size="24"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border border-gray-200 rounded-md px-5 py-3">
                                <span className="text-black">Resume.pdf</span>
                                <div className="flex items-center gap-3 text-black-500"><Eye size="24"/><ArrowDownToLine size="24"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border border-gray-200 rounded-md px-5 py-3">
                                <span className="text-black">Endorsement Letter.pdf</span>
                                <div className="flex items-center gap-3 text-black-500 font-medium"><Eye size="24"/><ArrowDownToLine size="24"/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div >

    )
}
