import { useState } from "react";
import Header from "../../../common/components/layout/Header";

// 1. Import your newly created reusable component!
import ToggleSwitch from "../../../common/components/ui/ToggleSwitch";

export default function Settings() {
    // State to hold all our settings values
    const [settings, setSettings] = useState({
        appearance: "Light",
        dateFormat: "YYYY-MM-DD | HH:MM:SS",
        twoFactor: true,
        mobilePush: true,
        desktopNotif: true,
        emailNotif: true
    });

    // Handle dropdown changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    // Handle toggle switch clicks
    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex flex-col h-full bg-[#F8F9FA]">
            <Header title="Settings" subtitle="Manage your account preferences" userRole="applicant" />

            <div className="p-6 md:p-8 animate-fade-in">
                <div className="card-panel flex flex-col">

                    {/* --- Appearance --- */}
                    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                        <div className="pr-4">
                            <h4 className="text-[15px] font-bold text-gray-900">Appearance</h4>
                            <p className="text-[13px] text-gray-400 mt-0.5">Customize how your theme looks on your device</p>
                        </div>
                        <select
                            name="appearance"
                            value={settings.appearance}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-lg px-3 py-1.5 text-[14px] text-gray-700 outline-none focus:border-[#7C3EFF] focus:ring-1 focus:ring-[#7C3EFF] bg-white cursor-pointer min-w-[120px]"
                        >
                            <option value="Light">Light</option>
                            <option value="Dark">Dark</option>
                            <option value="System Default">System Default</option>
                        </select>
                    </div>

                    {/* --- Date and Time Format --- */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-100">
                        <div className="pr-4">
                            <h4 className="text-[15px] font-bold text-gray-900">Date and Time Format</h4>
                            <p className="text-[13px] text-gray-400 mt-0.5">Select your localization</p>
                        </div>
                        <select
                            name="dateFormat"
                            value={settings.dateFormat}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-lg px-3 py-1.5 text-[14px] text-gray-700 outline-none focus:border-[#7C3EFF] focus:ring-1 focus:ring-[#7C3EFF] bg-white cursor-pointer"
                        >
                            <option value="YYYY-MM-DD | HH:MM:SS">YYYY-MM-DD | HH:MM:SS</option>
                            <option value="MM/DD/YYYY | hh:mm A">MM/DD/YYYY | hh:mm A</option>
                            <option value="DD/MM/YYYY | HH:MM">DD/MM/YYYY | HH:MM</option>
                        </select>
                    </div>

                    {/* --- Two-factor Authentication --- */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-100">
                        <div className="pr-4">
                            <h4 className="text-[15px] font-bold text-gray-900">Two-factor Authentication</h4>
                            <p className="text-[13px] text-gray-400 mt-0.5">Keep your account secure by enabling 2FA via mail</p>
                        </div>
                        {/* 2. Use your imported component! */}
                        <ToggleSwitch 
                            checked={settings.twoFactor} 
                            onChange={() => handleToggle('twoFactor')} 
                        />
                    </div>

                    {/* --- Mobile Push Notifications --- */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-100">
                        <div className="pr-4">
                            <h4 className="text-[15px] font-bold text-gray-900">Mobile Push Notifications</h4>
                            <p className="text-[13px] text-gray-400 mt-0.5">Receive push notification</p>
                        </div>
                        <ToggleSwitch 
                            checked={settings.mobilePush} 
                            onChange={() => handleToggle('mobilePush')} 
                        />
                    </div>

                    {/* --- Desktop Notification --- */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-100">
                        <div className="pr-4">
                            <h4 className="text-[15px] font-bold text-gray-900">Desktop Notification</h4>
                            <p className="text-[13px] text-gray-400 mt-0.5">Receive push notification in desktop</p>
                        </div>
                        <ToggleSwitch 
                            checked={settings.desktopNotif} 
                            onChange={() => handleToggle('desktopNotif')} 
                        />
                    </div>

                    {/* --- Email Notifications --- */}
                    <div className="flex items-center justify-between py-5">
                        <div className="pr-4">
                            <h4 className="text-[15px] font-bold text-gray-900">Email Notifications</h4>
                            <p className="text-[13px] text-gray-400 mt-0.5">Receive email notification</p>
                        </div>
                        <ToggleSwitch 
                            checked={settings.emailNotif} 
                            onChange={() => handleToggle('emailNotif')} 
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}