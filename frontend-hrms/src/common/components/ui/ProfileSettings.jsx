import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

import { accountSettingsFields, getInitialProfileSettingsData, personalInfoFields } from './profile-settings/config';
import PasswordSettingsField from './profile-settings/PasswordSettingsField';
import ProfileSettingsField from './profile-settings/ProfileSettingsField';

export default function ProfileSettings({ role }) {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState(() => getInitialProfileSettingsData(role));

    useEffect(() => {
        setFormData(getInitialProfileSettingsData(role));
    }, [role]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        console.log("Saving changes:", formData);
    };

    return (
        <form onSubmit={handleSaveChanges} className="flex flex-col gap-8 pt-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">{accountSettingsFields.slice(0, 2).map((field) => <ProfileSettingsField key={field.name} field={field} onChange={handleChange} value={formData[field.name]} />)}<PasswordSettingsField onChange={handleChange} showPassword={showPassword} toggleVisibility={() => setShowPassword((prev) => !prev)} value={formData.password} />{accountSettingsFields.slice(2).map((field) => <ProfileSettingsField key={field.name} field={field} onChange={handleChange} value={formData[field.name]} />)}</div>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                    <Lock size={14} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mb-4 -mt-2">Please contact HR to update your personal information.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">{personalInfoFields.map((field) => <ProfileSettingsField key={field.name} disabled field={field} value={formData[field.name]} />)}</div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
                <button 
                    type="button"
                    className="px-6 py-2 rounded-lg text-sm font-medium text-[#7C3EFF] bg-[#7C3EFF]/10 hover:bg-[#7C3EFF]/20 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-[#7C3EFF] hover:bg-[#7C3EFF]/90 transition-colors shadow-sm"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}