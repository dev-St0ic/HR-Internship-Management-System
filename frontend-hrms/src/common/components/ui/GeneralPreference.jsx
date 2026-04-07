import { useState } from "react";
import ToggleSwitch from "../ui/ToggleSwitch";

export default function GeneralPreferences() {
    const [settings, setSettings] = useState({
        appearance: "Light",
        dateFormat: "YYYY-MM-DD | HH:MM:SS",
        twoFactorAuth: true,
        mobilePush: true,
        desktopPush: true,
        emailNotifications: true,
    });

    const updatePreference = async (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));

    };

    return (
        <div className="flex flex-col">
            
            {/* Appearance */}
            <div className="flex justify-between items-center py-5 px-6 border-b border-gray-100">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Appearance</h3>
                    <p className="text-xs text-gray-400">Customize how your theme looks on your device</p>
                </div>
                <select 
                    value={settings.appearance}
                    onChange={(e) => updatePreference('appearance', e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-purple-500"
                >
                    <option value="Light">Light</option>
                    <option value="Dark">Dark</option>
                </select>
            </div>

            {/* Date and Time Format */}
            <div className="flex justify-between items-center py-5 px-6 border-b border-gray-100">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Date and Time Format</h3>
                    <p className="text-xs text-gray-400">Select your localization</p>
                </div>
                <select 
                    value={settings.dateFormat}
                    onChange={(e) => updatePreference('dateFormat', e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-purple-500"
                >
                    <option value="YYYY-MM-DD | HH:MM:SS">YYYY-MM-DD | HH:MM:SS</option>
                    <option value="MM/DD/YYYY | hh:mm A">MM/DD/YYYY | hh:mm A</option>
                    <option value="DD/MM/YYYY | HH:MM">DD/MM/YYYY | HH:MM</option>
                </select>
            </div>

            {/* Two-factor Authentication */}
            <div className="flex justify-between items-center py-5 px-6 border-b border-gray-100">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Two-factor Authentication</h3>
                    <p className="text-xs text-gray-400">Keep your account secure by enabling 2FA via mail</p>
                </div>
                <ToggleSwitch 
                    checked={settings.twoFactorAuth} 
                    onChange={(val) => updatePreference('twoFactorAuth', val)} 
                />
            </div>

            {/* Mobile Push Notifications */}
            <div className="flex justify-between items-center py-5 px-6 border-b border-gray-100">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Mobile Push Notifications</h3>
                    <p className="text-xs text-gray-400">Receive push notification</p>
                </div>
                <ToggleSwitch 
                    checked={settings.mobilePush} 
                    onChange={(val) => updatePreference('mobilePush', val)} 
                />
            </div>

            {/* Desktop Notification */}
            <div className="flex justify-between items-center py-5 px-6 border-b border-gray-100">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Desktop Notification</h3>
                    <p className="text-xs text-gray-400">Receive push notification in desktop</p>
                </div>
                <ToggleSwitch 
                    checked={settings.desktopPush} 
                    onChange={(val) => updatePreference('desktopPush', val)} 
                />
            </div>

            {/* Email Notifications */}
            <div className="flex justify-between items-center py-5 px-6">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Email Notifications</h3>
                    <p className="text-xs text-gray-400">Receive email notification</p>
                </div>
                <ToggleSwitch 
                    checked={settings.emailNotifications} 
                    onChange={(val) => updatePreference('emailNotifications', val)} 
                />
            </div>

        </div>
    );
}